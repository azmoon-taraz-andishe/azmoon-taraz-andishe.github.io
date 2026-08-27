"use client";

import { useState } from "react";
import { type StartPaymentInput, startPayment } from "@/lib/pay-client";

interface PayButtonProps extends StartPaymentInput {
  children: React.ReactNode;
  className?: string;
  /** Run before payment; return an error string to abort. */
  validate?: () => string | null;
}

export default function PayButton({
  children,
  className = "",
  validate,
  ...payload
}: PayButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    const validationError = validate?.();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      await startPayment(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطای نامشخص");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold text-white bg-[var(--brand-primary)] hover:opacity-90 transition-opacity text-center cursor-pointer disabled:opacity-60 disabled:cursor-wait ${className}`}
      >
        {loading ? "در حال انتقال به درگاه پرداخت…" : children}
      </button>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 text-center">
          {error}
        </p>
      )}
    </div>
  );
}
