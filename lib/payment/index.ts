import type { PaymentGateway } from "@/lib/payment/types";
import { paypingGateway } from "@/lib/payment/gateways/payping";

/**
 * Registry of available gateways. Add a new one here and it becomes selectable
 * via the PAYMENT_GATEWAY env var — no other code changes.
 */
const GATEWAYS: Record<string, PaymentGateway> = {
  payping: paypingGateway,
  // zibal: zibalGateway,
  // zarinpal: zarinpalGateway,
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
  return gateway;
}

export type { PaymentGateway } from "@/lib/payment/types";
