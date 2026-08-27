import Link from 'next/link';

const CASE_STUDY_SLUGS = [
  'tax-penalty-reduction-manufacturing',
  'ledger-audit-rejection-rescue',
  'cost-accounting-failure-analysis',
];

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export default function CaseStudyDetail() {
  return (
    <article dir="rtl" className="max-w-4xl mx-auto py-16 px-6 space-y-10">
      
      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            دفاع مالیاتی و ارزش افزوده
          </span>
          <span className="text-xs text-[var(--text-secondary)]">کارفرما: شرکت تولیدی مواد غذایی</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] leading-tight">
          کاهش ۸۰ درصدی جرایم مالیاتی سنگین کارخانه تولیدی مواد غذایی
        </h1>
      </div>

      {/* Impact Metric Highlight Box */}
      <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-xs text-[var(--text-secondary)] block mb-1">نتیجه نهایی پروژه:</span>
          <h3 className="text-xl font-bold text-[var(--brand-success)]">صرفه‌جویی ۱.۲ میلیارد تومانی در جرایم و تعدیل مالیات بر درآمد</h3>
        </div>
        <Link
          href="/booking"
          className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-[var(--brand-primary)] text-white hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          درخواست مشاوره مشابه
        </Link>
      </div>

      {/* Case Study Content Breakdown */}
      <div className="space-y-8 text-[var(--text-secondary)] leading-loose text-base">
        
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-[var(--text-primary)]">۱. شرح چالش و مسئله اولیه (The Challenge)</h3>
          <p>
            این شرکت تولیدی پس از ارزیابی سالانه توسط ممیزان مالیاتی با برگ تشخیص سنگینی روبه‌رو شد. اصلی‌ترین دلایل این اختلاف، عدم ثبت دقیق هزینه‌های سربار ساخت، مغایرت در صورت معاملات فصلی و ثبت ناقص اسناد انبارگردانی پایان سال بود که سازمان امور مالیاتی را وادار به صدور برگ تشخیص با ضریب علی‌الرأس کرده بود.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-[var(--text-primary)]">۲. اقدام و راهکار تیم ما (Our Intervention)</h3>
          <p>
            تیم کارشناسی ما با استقرار در محل شرکت، فرآیند زیر را اجرا کرد:
          </p>
          <ul className="space-y-2 pr-4 list-disc marker:text-[var(--brand-primary)]">
            <li>بازبینی کامل سند به سندِ دفاتر قانونی روزنامه و کل مربوط به سال مالی مورد اعتراض.</li>
            <li>اصلاح و تطبیق صورت‌های انبار با کاردکس‌های تولید و اسناد گمرکی مواد اولیه.</li>
            <li>تهیه لایحه دفاعیه مستند بر اساس تبصره‌های ماده ۹۷ و ماده ۲۳۸ قانون مالیات‌های مستقیم.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-[var(--text-primary)]">۳. نتیجه نهایی و دستاورد (The Result)</h3>
          <p>
            با ارائه لایحه مستند دفاعی و حضور کارشناسان ما در جلسات هیأت حل اختلاف مالیاتی، ممیزان مالیاتی اسناد اصلاح‌شده را پذیرفتند. در نتیجه، درآمد مشمول مالیات تعدیل شد و بیش از ۸۰ درصد جرایم غیرقابل بخشش مشمول بخشودگی کامل گردید.
          </p>
        </div>

      </div>

      {/* Back Link */}
      <div className="pt-8 border-t border-[var(--border-subtle)] flex justify-between items-center">
        <Link href="/case-studies" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">
          &larr; بازگشت به آرشیو پرونده‌ها و سناریوها
        </Link>
      </div>
    </article>
  );
}