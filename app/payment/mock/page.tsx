import { notFound } from "next/navigation";
import { formatToman } from "@/lib/payment/money";

/**
 * Fake bank page for the `mock` gateway (local development only). Posts the
 * chosen outcome straight back to the real payment callback.
 */
export default async function MockBankPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.ALLOW_MOCK_PAYMENT !== "1"
  ) {
    notFound();
  }

  const sp = await searchParams;
  const get = (k: string) =>
    (Array.isArray(sp[k]) ? sp[k]?.[0] : sp[k]) as string | undefined;

  const callback = get("callback");
  const token = get("token");
  const amountRial = Number(get("amountRial") ?? 0);
  const desc = get("desc");

  if (!callback || !token) notFound();

  return (
    <div dir="rtl" className="max-w-md mx-auto py-20 px-6">
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 shadow-xl space-y-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand-accent)]">
          درگاه آزمایشی (MOCK)
        </p>
        <h1 className="text-xl font-extrabold text-[var(--text-primary)]">
          درگاه پرداخت شبیه‌سازی‌شده
        </h1>

        {desc && <p className="text-sm text-[var(--text-secondary)]">{desc}</p>}

        <div className="text-3xl font-extrabold text-[var(--text-primary)]">
          {formatToman(amountRial)}
        </div>

        <form
          method="POST"
          action={callback}
          className="flex flex-col gap-3 pt-2"
        >
          <input type="hidden" name="token" value={token} />
          <button
            type="submit"
            name="status"
            value="1"
            className="w-full py-3 rounded-xl font-bold text-white bg-emerald-600 hover:opacity-90 transition-opacity"
          >
            پرداخت موفق
          </button>
          <button
            type="submit"
            name="status"
            value="0"
            className="w-full py-3 rounded-xl font-semibold border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-canvas)] transition-colors"
          >
            انصراف / پرداخت ناموفق
          </button>
        </form>
      </div>
    </div>
  );
}
