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
(PayPing → Toman; ZarinPal stays Rial with `currency: "IRR"`).

Registered adapters: `payping`, `zarinpal`, `mock`.

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

### 1. Mock gateway — no bank, no tunnel (default in `.env.example`)

```
PAYMENT_GATEWAY=mock
PAYMENT_SECRET=<any 16+ chars>
```

`npm run dev`, open a course or the booking form, click through. The `mock`
gateway sends you to an in-app fake bank page (`/payment/mock`) with
**پرداخت موفق** / **انصراف** buttons that post straight back to the real
callback → verify → `/payment/result`. Set `MOCK_VERIFY=fail` to exercise the
"paid but not verified" branch. `mock` is refused when `NODE_ENV=production`
unless `ALLOW_MOCK_PAYMENT=1`.

### 2. ZarinPal sandbox — real gateway pages, fake money

Closest thing to production without spending money. Still needs a public
callback URL (ZarinPal redirects the browser there), so run a tunnel:

```
cloudflared tunnel --url http://localhost:3000     # or ngrok / localtunnel
PAYMENT_GATEWAY=zarinpal
ZARINPAL_SANDBOX=1
ZARINPAL_MERCHANT_ID=00000000-0000-0000-0000-000000000000   # any 36 chars in sandbox
NEXT_PUBLIC_SITE_URL=https://<your-tunnel>.trycloudflare.com
```

On the sandbox pay page any card number / OTP is accepted and you choose
success or failure. `sandbox.zarinpal.com` is generally reachable from outside
Iran, unlike the production hosts.

### 3. Real PayPing

PayPing must reach your callback URL and your machine must reach
`api.payping.ir` (VPN to Iran if you're outside). Expose the dev server:

```
cloudflared tunnel --url http://localhost:3000
PAYMENT_GATEWAY=payping
PAYPING_TOKEN=<real token>
NEXT_PUBLIC_SITE_URL=https://<your-tunnel>.trycloudflare.com
```

PayPing has no public sandbox — test with a small real amount and refund it
from the PayPing panel.
