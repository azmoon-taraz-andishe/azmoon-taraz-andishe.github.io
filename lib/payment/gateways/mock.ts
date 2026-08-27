import type {
  CreatePaymentInput,
  CreatePaymentResult,
  ParsedCallback,
  PaymentGateway,
  VerifyPaymentInput,
  VerifyPaymentResult,
} from "@/lib/payment/types";

/**
 * Fake gateway for local development. It never talks to a bank: `createPayment`
 * sends the browser to an in-app "bank" page (`/payment/mock`) with a success /
 * cancel button, and `verifyPayment` succeeds unless MOCK_VERIFY=fail.
 *
 * Enable with PAYMENT_GATEWAY=mock. Refused in production unless
 * ALLOW_MOCK_PAYMENT=1.
 */
export const mockGateway: PaymentGateway = {
  id: "mock",

  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    const token = `mock_${Math.random().toString(36).slice(2, 12)}`;
    const origin = new URL(input.callbackUrl).origin;

    const bank = new URL("/payment/mock", origin);
    bank.searchParams.set("callback", input.callbackUrl);
    bank.searchParams.set("token", token);
    bank.searchParams.set("amountRial", String(input.amountRial));
    bank.searchParams.set("desc", input.description);

    return { token, redirectUrl: bank.toString() };
  },

  async parseCallback(req: Request): Promise<ParsedCallback> {
    const fields: Record<string, string> = {};
    new URL(req.url).searchParams.forEach((v, k) => {
      fields[k] = v;
    });
    if (req.method === "POST") {
      try {
        const form = await req.formData();
        form.forEach((v, k) => {
          fields[k] = String(v);
        });
      } catch {
        /* query string only */
      }
    }

    const token = fields.token ?? "";
    return {
      token,
      reference: fields.reference || token,
      succeededHint: fields.status === "1",
    };
  },

  async verifyPayment(input: VerifyPaymentInput): Promise<VerifyPaymentResult> {
    if (process.env.MOCK_VERIFY === "fail") {
      return { ok: false, rawStatus: "mock-forced-fail" };
    }
    return {
      ok: true,
      refId: `MOCK-${input.token}`,
      cardPan: "6037-99**-****-1234",
      rawStatus: "mock-ok",
    };
  },
};
