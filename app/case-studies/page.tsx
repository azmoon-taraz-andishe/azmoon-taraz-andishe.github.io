import Link from 'next/link';

export default function CaseStudiesPage() {
  const cases = [
    {
      id: 'tax-penalty-reduction-manufacturing',
      title: 'کاهش ۸۰ درصدی جرایم مالیاتی سنگین کارخانه تولیدی مواد غذایی',
      category: 'دفاع مالیاتی و ارزش افزوده',
      clientType: 'شرکت تولیدی (سهامی خاص)',
      impact: 'صرفه‌جویی ۱.۲ میلیارد تومانی',
      excerpt: 'چگونه با بازبینی تخصصی دفاتر قانونی و اصلاح مستندات هزینه‌های سربار، رأی هیأت حل اختلاف به نفع شرکت برگشت.',
      type: 'success',
    },
    {
      id: 'ledger-audit-rejection-rescue',
      title: 'اصلاح ساختار هزینه‌ها و نجات دفاتر قانونی از خطر «رد دفاتر» در ارزیابی نهایی',
      category: 'حسابرسی و اصلاح دفاتر',
      clientType: 'شرکت بازرگانی بین‌المللی',
      impact: 'جلوگیری از علی‌الرأس شدن مالیات',
      excerpt: 'بررسی ریشه‌ای مغایرت‌های بانکی و اصلاح ثبت‌های حسابداری پیش از ورود بازرسان مالیاتی.',
      type: 'success',
    },
    {
      id: 'cost-accounting-failure-analysis',
      title: 'تحلیل یک شکست: چرا سیستم سنتی بهای تمام شده شرکت صنعتی منجر به زیان پنهان شد؟',
      category: 'حسابداری صنعتی',
      clientType: 'صنایع فلزی و قطعه‌سازی',
      impact: 'بازطراحی سیستم بهای تمام شده',
      excerpt: 'بررسی اشتباهات رایج در تخصیص سربار ماشین‌آلات و نحوه اصلاح آن برای جلوگیری از قیمت‌گذاری اشتباه محصول.',
      type: 'analysis',
    },
  ];

  return (
    <div dir="rtl" className="max-w-7xl mx-auto py-16 px-6 lg:px-16 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
          تجربیات واقعی و پرونده‌های اجرایی
        </span>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)]">
          بررسی سناریوهای موفقیت و خطاهای رایج مالی
        </h1>
        <p className="text-[var(--text-secondary)]">
          نگاهی شفاف به چالش‌های پیچیده مالی و مالیاتی شرکت‌ها و راهکارهای تخصصی تیم ما برای حل آن‌ها.
        </p>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cases.map((item) => (
          <div
            key={item.id}
            className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-md hover:border-[var(--brand-primary)] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--bg-canvas)] text-[var(--brand-primary)] border border-[var(--border-subtle)]">
                  {item.category}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-[var(--brand-success)]">
                  {item.impact}
                </span>
              </div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3 leading-snug hover:text-[var(--brand-primary)] transition-colors">
                <Link href={`/case-studies/${item.id}`}>{item.title}</Link>
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                {item.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span>نوع کارفرما: {item.clientType}</span>
              <Link
                href={`/case-studies/${item.id}`}
                className="font-semibold text-[var(--brand-primary)] hover:underline inline-flex items-center gap-1"
              >
                مشاهده جزئیات پرونده &larr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}