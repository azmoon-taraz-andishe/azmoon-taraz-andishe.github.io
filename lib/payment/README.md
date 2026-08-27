# Payment

Gateway-agnostic payment for course enrollment and consultation booking.

## Flow

```
client (PayButton / booking form)
  └─ POST /api/payment/create   { kind, itemId, payerName?, payerMobile? }
       ├─ price looked up server-side in lib/catalog.ts (client never sends an amount)
       ├─ order sealed into a signed token (lib/payment/order-token.ts)
       ├─ gateway.createPayment()  ->  { redirectUrl, token }
       └─ 200 { redirectUrl }
  └─ browser navigates to redirectUrl (bank page)

bank → POST /api/payment/callback?o=<order-token>
       ├─ verifyOrder(o)                 -> { kind, itemId, amountRial }
       ├─ gateway.parseCallback(req)     -> { token, reference, succeededHint }
       ├─ gateway.verifyPayment()        -> { ok, refId, cardPan }
       ├─ TODO: fulfill order (enroll / confirm slot), idempotent on refId
       └─ 303 redirect → /payment/result?status=success|failed
```

## Switching gateway

1. Add `lib/payment/gateways/<name>.ts` implementing `PaymentGateway` from `../types`.
2. Register it in `lib/payment/index.ts` `GATEWAYS`.
3. Set `PAYMENT_GATEWAY=<name>` (+ that gateway's credentials).

No route handler or UI change. All amounts crossing the `PaymentGateway`
boundary are in **Rial**; each adapter converts to what its API expects
(PayPing → Toman).

## Before production

- **Persist orders in a DB.** The signed-token approach is stateless and does
  not stop a callback from being replayed. Add an orders table with a unique
  constraint on the gateway ref id and do fulfillment there.
- Fill in real prices in `lib/catalog.ts` and keep them in sync with the
  `/academy/[slug]` pages (or drive both from one source).
- This app can no longer be a static export (`next.config.ts`). Deploy to a
  Node host the gateway can reach (Iranian gateway APIs are commonly geo-fenced
  to Iran).
- Set `NEXT_PUBLIC_SITE_URL` to the real origin so callback URLs are correct.
- Consider capturing `payer` contact + requested slot before redirect.

## Local testing

PayPing must be able to POST to your callback URL, so expose your dev server
with a tunnel (e.g. `cloudflared tunnel --url http://localhost:3000`) and set
`NEXT_PUBLIC_SITE_URL` to the tunnel URL.
