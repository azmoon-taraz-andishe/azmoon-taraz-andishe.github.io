/**
 * Gateway-agnostic payment contract.
 *
 * Every supported Iranian gateway follows the same two-phase redirect model:
 *   1. server -> gateway: "create a payment for N, call me back at URL"  => token + redirect URL
 *   2. user pays on the bank page, gateway redirects/calls back with the token
 *   3. server -> gateway: "verify token for N"                            => confirmed ref id
 *
 * To add a gateway: implement `PaymentGateway` in `lib/payment/gateways/<name>.ts`
 * and register it in `lib/payment/index.ts`. Nothing else in the app imports a
 * concrete gateway.
 */

export interface CreatePaymentInput {
  /** Amount in **Rial** (canonical internal unit). */
  amountRial: number;
  /** Our own order id; echoed back on callback so we can match it. */
  orderId: string;
  description: string;
  /** Absolute URL the gateway sends the payer back to. */
  callbackUrl: string;
  payerName?: string;
  /** Payer mobile (preferred) or email. */
  payerIdentity?: string;
}

export interface CreatePaymentResult {
  /** Send the browser here (top-level navigation). */
  redirectUrl: string;
  /** Opaque gateway payment token; persist it with the order. */
  token: string;
}

export interface VerifyPaymentInput {
  /** Gateway payment token (from `CreatePaymentResult.token` / the callback). */
  token: string;
  /** Secondary reference some gateways require at verify time (e.g. PayPing paymentRefId). */
  reference?: string;
  /** Amount in **Rial**, must match what was charged. */
  amountRial: number;
}

export interface VerifyPaymentResult {
  ok: boolean;
  /** Bank tracking id to show the customer / store on the order. */
  refId?: string;
  /** Masked PAN, when the gateway returns it. */
  cardPan?: string;
  /** True when the gateway reports the token was already verified before. */
  alreadyVerified?: boolean;
  /** Raw gateway status for logging. */
  rawStatus: string | number;
}

/** Parsed, normalized form of whatever the gateway sends to `callbackUrl`. */
export interface ParsedCallback {
  token: string;
  reference?: string;
  orderId?: string;
  /** Gateway's own "did the payer pay" hint, before we call verify. */
  succeededHint: boolean;
}

export interface PaymentGateway {
  readonly id: string;
  createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult>;
  /** Extract token/reference from the gateway's callback request. */
  parseCallback(req: Request): Promise<ParsedCallback>;
  verifyPayment(input: VerifyPaymentInput): Promise<VerifyPaymentResult>;
}

export class PaymentError extends Error {
  constructor(
    message: string,
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = "PaymentError";
  }
}
