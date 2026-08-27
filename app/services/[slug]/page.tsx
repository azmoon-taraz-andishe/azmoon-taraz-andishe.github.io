import Link from 'next/link';

const SERVICE_SLUGS = [
  'industrial-accounting',
  'tax-services',
  'ledger-audit',
  'financial-management',
];

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export default function ServiceDetail() {
  // In a real app, you would fetch service data based on params.slug
  return (
    <div dir="rtl" className="max-w-4xl mx-auto py-16 px-6 space-y-12">
      
      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
          جزئیات خدمت تخصصی
        </span>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] leading-tight">
          حسابداری صنعتی و بهای تمام شده
        </h1>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
          استقرار سیستم‌های پیشرفته محاسبه بهای تمام شده و کنترل‌های داخلی ویژه کارخانجات و شرکت‌های تولیدی و صنعتی.
        </p>
      </div>

      {/* Call to Action Banner */}
      <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-lg flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">نیاز به مشاوره اختصاصی دارید؟</h3>
          <p className="text-sm text-[var(--text-secondary)]">کارشناسان ما آماده بررسی ساختار مالی مجموعه شما هستند.</p>
        </div>
        <Link
          href="/booking"
          className="px-6 py-3 rounded-xl font-bold text-white bg-[var(--brand-primary)] hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          رزرو وقت مشاوره
        </Link>
      </div>

      {/* Detailed Description */}
      <div className="space-y-6 text-[var(--text-secondary)] leading-loose text-base">
        <h3 className="text-xl font-bold text-[var(--text-primary)] pt-4">چرا حسابداری صنعتی برای صنایع حیاتی است؟</h3>
        <p>
          محاسبه دقیق هزینه‌های مستقیم و غیرمقیم، سربار ساخت و تخصیص درست آن به محصولات، پایه‌ریزی استراتژی قیمت‌گذاری و کنترل سودآوری شرکت است. بدون سیستم بهای تمام شده استاندارد، مدیریت قادر به تصمیم‌گیری بهینه نخواهد بود.
        </p>

        <h3 className="text-xl font-bold text-[var(--text-primary)] pt-4">مراحل اجرای پروژه در مجموعه شما</h3>
        <ul className="space-y-3 pr-4 list-disc marker:text-[var(--brand-primary)]">
          <li>بررسی و عارضه‌یابی وضعیت فعلی ثبت اسناد انبار و تولید</li>
          <li>طراحی کدینگ اختصاصی متناسب با نوع فعالیت صنعتی</li>
          <li>استقرار مکانیزم‌های تخصیص سربار و محاسبه قیمت تمام شده واحد</li>
          <li>آموزش پرسنل حسابداری داخلی و ارائه گزارش‌های مدیریتی</li>
        </ul>
      </div>

      {/* Back Link */}
      <div className="pt-8 border-t border-[var(--border-subtle)] flex justify-between items-center">
        <Link href="/services" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">
          &larr; بازگشت به لیست خدمات
        </Link>
      </div>
    </div>
  );
}