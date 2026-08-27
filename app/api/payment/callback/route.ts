import { NextResponse } from "next/server";
import { getGateway } from "@/lib/payment";
import { verifyOrder } from "@/lib/payment/order-token";
import { lookupCatalogItem } from "@/lib/catalog";
import { siteOrigin } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// PayPing posts application/x-www-form-urlencoded here; other gateways may GET.
async function handle(req: Request) {
  const origin = siteOrigin(req);
  const result = new URL("/payment/result", origin);

  const orderToken = new URL(req.url).searchParams.get("o");
  if (!orderToken) {
    result.searchParams.set("status", "failed");
    result.searchParams.set("reason", "missing-order");
    return NextResponse.redirect(result, 303);
  }

  try {
    const order = verifyOrder(orderToken);
    const item = lookupCatalogItem(order.kind, order.itemId);
    result.searchParams.set("kind", order.kind);
    result.searchParams.set("item", order.itemId);
    if (item) result.searchParams.set("title", item.title);

    const gateway = getGateway();
    const callback = await gateway.parseCallback(req);

    if (!callback.succeededHint) {
      result.searchParams.set("status", "failed");
      result.searchParams.set("reason", "cancelled");
      return NextResponse.redirect(result, 303);
    }

    const verified = await gateway.verifyPayment({
      token: callback.token,
      reference: callback.reference,
      amountRial: order.amountRial,
    });

    if (verified.ok) {
      // TODO: fulfill the order here (enroll the user / confirm the booking slot),
      // idempotently keyed on verified.refId.
      result.searchParams.set("status", "success");
      if (verified.refId) result.searchParams.set("ref", verified.refId);
    } else {
      result.searchParams.set("status", "failed");
      result.searchParams.set("reason", "unverified");
    }
    return NextResponse.redirect(result, 303);
  } catch (err) {
    console.error("[payment:callback]", err);
    result.searchParams.set("status", "failed");
    result.searchParams.set("reason", "error");
    return NextResponse.redirect(result, 303);
  }
}

export async function POST(req: Request) {
  return handle(req);
}

export async function GET(req: Request) {
  return handle(req);
}
