import crypto from "node:crypto";

/**
 * A pending order needs to survive the round-trip to the bank and come back
 * trustworthy. A real deployment should persist orders in a database (for
 * idempotency, replay protection and fulfillment tracking). As a scaffold we
 * instead sign the order into an opaque, tamper-proof token that travels in the
 * callback URL. The amount is therefore fixed server-side at creation time and
 * can never be altered by the client or the gateway.
 *
 * Limitation: this is stateless, so it does NOT by itself prevent a callback
 * from being replayed. Add a "seen tokens" / orders table before production.
 */

export type OrderKind = "course" | "consultation";

export interface OrderPayload {
  kind: OrderKind;
  itemId: string;
  amountRial: number;
  /** issued-at, seconds */
  iat: number;
}

const MAX_AGE_SECONDS = 60 * 60; // a checkout must complete within an hour

function secret(): string {
  const s = process.env.PAYMENT_SECRET;
  if (!s || s.length < 16) {
    throw new Error(
      "PAYMENT_SECRET is missing or too short (need >= 16 chars)",
    );
  }
  return s;
}

function b64url(buf: Buffer): string {
  return buf.toString("base64url");
}

export function signOrder(payload: Omit<OrderPayload, "iat">): string {
  const full: OrderPayload = { ...payload, iat: Math.floor(Date.now() / 1000) };
  const body = b64url(Buffer.from(JSON.stringify(full)));
  const sig = b64url(
    crypto.createHmac("sha256", secret()).update(body).digest(),
  );
  return `${body}.${sig}`;
}

export function verifyOrder(token: string): OrderPayload {
  const [body, sig] = token.split(".");
  if (!body || !sig) throw new Error("Malformed order token");

  const expected = b64url(
    crypto.createHmac("sha256", secret()).update(body).digest(),
  );
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    throw new Error("Bad order token signature");
  }

  const payload = JSON.parse(
    Buffer.from(body, "base64url").toString(),
  ) as OrderPayload;
  if (Math.floor(Date.now() / 1000) - payload.iat > MAX_AGE_SECONDS) {
    throw new Error("Order token expired");
  }
  return payload;
}
