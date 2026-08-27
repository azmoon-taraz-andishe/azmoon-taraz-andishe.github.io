import {
  type CreatePaymentInput,
  type CreatePaymentResult,
  type ParsedCallback,
  type PaymentGateway,
  PaymentError,
  type VerifyPaymentInput,
  type VerifyPaymentResult,
} from "@/lib/payment/types";
import { rialToToman } from "@/lib/payment/money";

// PayPing "v3" REST API. Docs: https://docs.payping.ir  (OpenAPI: https://cdn.payping.ir/statics/openapi.json)
// IMPORTANT: PayPing amounts are in TOMAN, not Rial.
const BASE_URL = process.env.PAYPING_BASE_URL ?? "https://api.payping.ir";

interface PayPingConfig {
  token: string;
}

function readConfig(): PayPingConfig {
  const token = process.env.PAYPING_TOKEN;
  if (!token) {
    throw new PaymentError("PAYPING_TOKEN is not set");
  }
  return { token };
}

async function call(
  path: string,
  token: string,
  body: unknown,
): Promise<Response> {
  return fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    // gateway calls must never be cached
    cache: "no-store",
  });
}

async function readError(res: Response): Promise<string> {
  try {
    const j = await res.json();
    return (
      j?.detail ||
      j?.title ||
      j?.metaData?.errors?.join?.("; ") ||
      JSON.stringify(j)
    );
  } catch {
    return `${res.status} ${res.statusText}`;
  }
}

function extract(
  obj: Record<string, unknown>,
  ...keys: string[]
): string | undefined {
  for (const k of keys) {
    const direct = obj[k];
    if (direct != null && direct !== "") return String(direct);
    // case-insensitive fallback (PayPing has used both `refId` and `refid`)
    const hit = Object.keys(obj).find(
      (o) => o.toLowerCase() === k.toLowerCase(),
    );
    if (hit && obj[hit] != null && obj[hit] !== "") return String(obj[hit]);
  }
  return undefined;
}

export const paypingGateway: PaymentGateway = {
  id: "payping",

  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    const { token } = readConfig();
    const amountToman = rialToToman(input.amountRial);

    const res = await call("/v3/pay", token, {
      amount: amountToman,
      returnUrl: input.callbackUrl,
      clientRefId: input.orderId,
      description: input.description,
      payerName: input.payerName,
      payerIdentity: input.payerIdentity,
    });

    if (!res.ok) {
      throw new PaymentError(`PayPing create failed: ${await readError(res)}`);
    }

    const data = (await res.json()) as { paymentCode?: string; url?: string };
    if (!data.paymentCode) {
      throw new PaymentError("PayPing create returned no paymentCode");
    }

    return {
      token: data.paymentCode,
      redirectUrl: data.url ?? `${BASE_URL}/v3/pay/start/${data.paymentCode}`,
    };
  },

  async parseCallback(req: Request): Promise<ParsedCallback> {
    // PayPing POSTs application/x-www-form-urlencoded to returnUrl. Older
    // integrations received a GET query string; handle both.
    const fields: Record<string, unknown> = {};

    const url = new URL(req.url);
    url.searchParams.forEach((v, k) => {
      fields[k] = v;
    });

    if (req.method === "POST") {
      const ct = req.headers.get("content-type") ?? "";
      try {
        if (ct.includes("application/json")) {
          Object.assign(fields, await req.json());
        } else {
          const form = await req.formData();
          form.forEach((v, k) => {
            fields[k] = typeof v === "string" ? v : v.name;
          });
        }
      } catch {
        // keep whatever we got from the query string
      }
    }

    // `data` may arrive as a nested JSON string.
    if (typeof fields.data === "string") {
      try {
        Object.assign(fields, JSON.parse(fields.data));
      } catch {
        /* not JSON, ignore */
      }
    }

    const status = extract(fields, "status");
    const errorCode = extract(fields, "errorCode");
    const token = extract(fields, "paymentCode", "code");
    const succeededHint = status === "1" || (status == null && !errorCode);

    // A failed/cancelled callback may omit the payment code — that's fine, we
    // only need it to run verify on a success.
    if (succeededHint && !token) {
      throw new PaymentError("PayPing success callback missing paymentCode");
    }

    return {
      token: token ?? "",
      reference: extract(fields, "paymentRefId", "refId"),
      orderId: extract(fields, "clientRefId"),
      succeededHint,
    };
  },

  async verifyPayment(input: VerifyPaymentInput): Promise<VerifyPaymentResult> {
    const { token } = readConfig();
    const amountToman = rialToToman(input.amountRial);

    if (!input.reference) {
      throw new PaymentError(
        "PayPing verify requires the paymentRefId reference",
      );
    }

    const body = {
      paymentRefId: Number(input.reference),
      paymentCode: input.token,
      amount: amountToman,
    };

    // 202 / 502 mean "still processing" — retry a few times.
    for (let attempt = 0; attempt < 4; attempt++) {
      const res = await call("/v3/pay/verify", token, body);

      if (res.ok) {
        const data = (await res.json()) as {
          paymentRefId?: number;
          cardNumber?: string;
        };
        return {
          ok: true,
          refId:
            data.paymentRefId != null
              ? String(data.paymentRefId)
              : input.reference,
          cardPan: data.cardNumber,
          rawStatus: res.status,
        };
      }

      if (res.status === 409) {
        const j = await res.json().catch(() => ({}) as Record<string, unknown>);
        const code = (j as { metaData?: { code?: number } }).metaData?.code;
        if (code === 110) {
          const msg = (
            j as {
              metaData?: {
                message?: { paymentRefId?: number; cardNumber?: string };
              };
            }
          ).metaData?.message;
          return {
            ok: true,
            alreadyVerified: true,
            refId:
              msg?.paymentRefId != null
                ? String(msg.paymentRefId)
                : input.reference,
            cardPan: msg?.cardNumber,
            rawStatus: 409,
          };
        }
        return { ok: false, rawStatus: 409 };
      }

      if (res.status === 202 || res.status === 502) {
        await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
        continue;
      }

      return { ok: false, rawStatus: `${res.status}: ${await readError(res)}` };
    }

    return { ok: false, rawStatus: "verify still processing after retries" };
  },
};
