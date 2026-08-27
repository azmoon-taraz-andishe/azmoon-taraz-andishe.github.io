import {
  type CreatePaymentInput,
  type CreatePaymentResult,
  type ParsedCallback,
  type PaymentGateway,
  PaymentError,
  type VerifyPaymentInput,
  type VerifyPaymentResult,
} from "@/lib/payment/types";

// ZarinPal Payment Gateway REST API v4. Docs: https://www.zarinpal.com/docs/paymentGateway/
// `amount` is sent in Rial (currency: "IRR"), which is our canonical unit — no conversion.
// Set ZARINPAL_SANDBOX=1 to use https://sandbox.zarinpal.com (accepts any 36-char merchant_id
// and any OTP/card on the pay page).

interface Endpoints {
  request: string;
  verify: string;
  startPay: (authority: string) => string;
}

function endpoints(): Endpoints {
  // Test override: point every ZarinPal call at one base origin.
  const override = process.env.ZARINPAL_BASE_URL?.replace(/\/$/, "");
  if (override) {
    return {
      request: `${override}/pg/v4/payment/request.json`,
      verify: `${override}/pg/v4/payment/verify.json`,
      startPay: (a) => `${override}/pg/StartPay/${a}`,
    };
  }
  if (process.env.ZARINPAL_SANDBOX === "1") {
    return {
      request: "https://sandbox.zarinpal.com/pg/v4/payment/request.json",
      verify: "https://sandbox.zarinpal.com/pg/v4/payment/verify.json",
      startPay: (a) => `https://sandbox.zarinpal.com/pg/StartPay/${a}`,
    };
  }
  return {
    request: "https://api.zarinpal.com/pg/v4/payment/request.json",
    verify: "https://api.zarinpal.com/pg/v4/payment/verify.json",
    startPay: (a) => `https://www.zarinpal.com/pg/StartPay/${a}`,
  };
}

function merchantId(): string {
  const id = process.env.ZARINPAL_MERCHANT_ID;
  if (!id) throw new PaymentError("ZARINPAL_MERCHANT_ID is not set");
  return id;
}

interface ZarinResponse<T> {
  data: T | [];
  errors: { code?: number; message?: string } | unknown[];
}

async function post<T>(url: string, body: unknown): Promise<ZarinResponse<T>> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "ZarinPal Rest Api v4",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const json = (await res.json().catch(() => null)) as ZarinResponse<T> | null;
  if (!json) {
    throw new PaymentError(`ZarinPal ${url} returned non-JSON (${res.status})`);
  }
  return json;
}

function errorText(errors: ZarinResponse<unknown>["errors"]): string {
  if (Array.isArray(errors))
    return errors.length ? JSON.stringify(errors) : "unknown error";
  return `${errors.code ?? "?"}: ${errors.message ?? "unknown error"}`;
}

export const zarinpalGateway: PaymentGateway = {
  id: "zarinpal",

  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    const ep = endpoints();
    const json = await post<{
      code: number;
      authority: string;
      message?: string;
    }>(ep.request, {
      merchant_id: merchantId(),
      amount: input.amountRial,
      currency: "IRR",
      callback_url: input.callbackUrl,
      description: input.description,
      metadata: input.payerIdentity
        ? { mobile: input.payerIdentity, email: undefined }
        : undefined,
    });

    const data = json.data;
    if (Array.isArray(data) || data.code !== 100 || !data.authority) {
      throw new PaymentError(
        `ZarinPal request failed: ${errorText(json.errors)}`,
      );
    }

    return { token: data.authority, redirectUrl: ep.startPay(data.authority) };
  },

  async parseCallback(req: Request): Promise<ParsedCallback> {
    // ZarinPal redirects (GET) to callback_url?Authority=...&Status=OK|NOK
    const params = new URL(req.url).searchParams;
    const authority = params.get("Authority") ?? params.get("authority") ?? "";
    const status = params.get("Status") ?? params.get("status");

    if (!authority)
      throw new PaymentError("ZarinPal callback missing Authority");

    return {
      token: authority,
      succeededHint: status === "OK",
    };
  },

  async verifyPayment(input: VerifyPaymentInput): Promise<VerifyPaymentResult> {
    const ep = endpoints();
    const json = await post<{
      code: number;
      ref_id: number;
      card_pan?: string;
      message?: string;
    }>(ep.verify, {
      merchant_id: merchantId(),
      amount: input.amountRial,
      authority: input.token,
    });

    const data = json.data;
    if (!Array.isArray(data) && (data.code === 100 || data.code === 101)) {
      return {
        ok: true,
        alreadyVerified: data.code === 101,
        refId: data.ref_id != null ? String(data.ref_id) : undefined,
        cardPan: data.card_pan,
        rawStatus: data.code,
      };
    }

    return {
      ok: false,
      rawStatus: Array.isArray(data)
        ? errorText(json.errors)
        : (data.code ?? "unknown"),
    };
  },
};
