import type { OrderKind } from "@/lib/payment/order-token";

export interface StartPaymentInput {
  kind: OrderKind;
  itemId: string;
  payerName?: string;
  payerMobile?: string;
}

/**
 * Client helper: create a payment on the server and hand the browser off to the
 * gateway. On success it navigates away and never resolves; on failure it throws
 * with a Persian message suitable for display.
 */
export async function startPayment(input: StartPaymentInput): Promise<never> {
  const res = await fetch("/api/payment/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = (await res.json().catch(() => ({}))) as {
    redirectUrl?: string;
    error?: string;
  };
  if (!res.ok || !data.redirectUrl) {
    throw new Error(data.error ?? "خطا در ایجاد تراکنش پرداخت");
  }

  window.location.assign(data.redirectUrl);
  return new Promise<never>(() => {});
}
