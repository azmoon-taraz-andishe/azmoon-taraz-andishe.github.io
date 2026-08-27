import Link from "next/link";

const REASONS: Record<string, string> = {
  "missing-order": "اطلاعات سفارش یافت نشد.",
  cancelled: "پرداخت توسط شما لغو شد یا ناموفق بود.",
  unverified:
    "پرداخت نزد درگاه تأیید نشد. در صورت کسر وجه، مبلغ طی ۷۲ ساعت بازمی‌گردد.",
  error: "خطای غیرمنتظره در پردازش پرداخت رخ داد.",
};

export default async function PaymentResultPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const get = (k: string) =>
    (Array.isArray(sp[k]) ? sp[k]?.[0] : sp[k]) as string | undefined;

  const success = get("status") === "success";
  const kind = get("kind");
  const title = get("title");
  const ref = get("ref");
  const reason = get("reason");

  return (
    <div
      dir="rtl"
      className="max-w-xl mx-auto py-20 px-6 text-center space-y-6"
    >
      <div
        className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl ${
          success
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
            : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300"
        }`}
      >
        {success ? "✓" : "✕"}
      </div>

      <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">
        {success ? "پرداخت با موفقیت انجام شد" : "پرداخت ناموفق بود"}
      </h1>

      {title && (
        <p className="text-[var(--text-secondary)]">
          {kind === "course" ? "دوره" : "مشاوره"}:{" "}
          <strong className="text-[var(--text-primary)]">{title}</strong>
        </p>
      )}

      {success && ref && (
        <p className="text-sm text-[var(--text-secondary)]">
          کد رهگیری پرداخت:{" "}
          <span className="font-mono text-[var(--text-primary)]">{ref}</span>
        </p>
      )}

      {!success && reason && (
        <p className="text-sm text-[var(--text-secondary)]">
          {REASONS[reason] ?? reason}
        </p>
      )}

      <div className="flex justify-center gap-4 pt-4">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[var(--brand-primary)] hover:opacity-90 transition-opacity"
        >
          بازگشت به صفحه اصلی
        </Link>
        {!success && (
          <Link
            href={kind === "course" ? "/academy" : "/booking"}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
          >
            تلاش مجدد
          </Link>
        )}
      </div>
    </div>
  );
}
