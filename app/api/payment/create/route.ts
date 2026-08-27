import { NextResponse } from "next/server";
import { getGateway } from "@/lib/payment";
import { PaymentError } from "@/lib/payment/types";
import { type OrderKind, signOrder } from "@/lib/payment/order-token";
import { lookupCatalogItem } from "@/lib/catalog";
import { siteOrigin } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CreateBody {
  kind: OrderKind;
  itemId: string;
  payerName?: string;
  payerMobile?: string;
}

export async function POST(req: Request) {
  let body: CreateBody;
  try {
    body = (await req.json()) as CreateBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (
    (body.kind !== "course" && body.kind !== "consultation") ||
    !body.itemId
  ) {
    return NextResponse.json(
      { error: "kind and itemId are required" },
      { status: 400 },
    );
  }

  const item = lookupCatalogItem(body.kind, body.itemId);
  if (!item) {
    return NextResponse.json({ error: "Unknown item" }, { status: 404 });
  }

  // Price is fixed here, server-side, and sealed into the order token.
  const orderToken = signOrder({
    kind: body.kind,
    itemId: item.itemId,
    amountRial: item.amountRial,
  });

  const callbackUrl = `${siteOrigin(req)}/api/payment/callback?o=${encodeURIComponent(orderToken)}`;

  try {
    const { redirectUrl } = await getGateway().createPayment({
      amountRial: item.amountRial,
      orderId: orderToken.slice(0, 40), // gateway-side ref for their dashboard/logs
      description:
        body.kind === "course"
          ? `ثبت‌نام دوره: ${item.title}`
          : `رزرو مشاوره: ${item.title}`,
      callbackUrl,
      payerName: body.payerName,
      payerIdentity: body.payerMobile,
    });

    return NextResponse.json({ redirectUrl });
  } catch (err) {
    const message =
      err instanceof PaymentError ? err.message : "Payment gateway error";
    console.error("[payment:create]", err);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
