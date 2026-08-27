import type { PaymentGateway } from "@/lib/payment/types";
import { paypingGateway } from "@/lib/payment/gateways/payping";
import { zarinpalGateway } from "@/lib/payment/gateways/zarinpal";
import { mockGateway } from "@/lib/payment/gateways/mock";

/**
 * Registry of available gateways. Add a new one here and it becomes selectable
 * via the PAYMENT_GATEWAY env var — no other code changes.
 */
const GATEWAYS: Record<string, PaymentGateway> = {
  payping: paypingGateway,
  zarinpal: zarinpalGateway, // has a sandbox: ZARINPAL_SANDBOX=1
  mock: mockGateway, // local dev only, see gateways/mock.ts
  // zibal: zibalGateway,
};

export const DEFAULT_GATEWAY = "payping";

export function getGateway(
  id: string = process.env.PAYMENT_GATEWAY ?? DEFAULT_GATEWAY,
): PaymentGateway {
  const gateway = GATEWAYS[id];
  if (!gateway) {
    throw new Error(
      `Unknown PAYMENT_GATEWAY "${id}". Available: ${Object.keys(GATEWAYS).join(", ")}`,
    );
  }
  if (
    gateway.id === "mock" &&
    process.env.NODE_ENV === "production" &&
    process.env.ALLOW_MOCK_PAYMENT !== "1"
  ) {
    throw new Error("Mock payment gateway is disabled in production");
  }
  return gateway;
}

export type { PaymentGateway } from "@/lib/payment/types";
