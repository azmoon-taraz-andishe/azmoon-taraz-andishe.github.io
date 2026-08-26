import Link from 'next/link';

export default function BlogPage() {
  const articles = [
    {
      id: 'tax-amendment-1405',
      title: 'تغییرات کلیدی قانون مالیات‌های مستقیم در سال ۱۴۰۵؛ چه چیزی برای شرکت‌ها تغییر کرده است؟',
      category: 'بخشنامه‌های مالیاتی',
      date: 'خرداد ۱۴۰۵',
      readTime: '۵ دقیقه مطالعه',
      excerpt: 'تحلیل جامع مواد اصلاح شده قانون مالیات‌های مستقیم و تاثیر آن بر معافیت‌های مالیاتی شرکت‌های تولیدی و بازرگانی.',
      urgent: true,
    },
    {
      id: 'vat-seasonal-deadline',
      title: 'راهنمای جامع ارسال اظهارنامه ارزش افزوده فصل بهار و جلوگیری از جرایم دیرکرد',
      category: 'آموزش کاربردی',
      date: 'اردیبهشت ۱۴۰۵',
      readTime: '۷ دقیقه مطالعه',
      excerpt: 'نکات کلیدی در تطبیق صورت معاملات فصلی، سامانه مودیان و سامانه ارزش افزوده پیش از موعد مقرر.',
      urgent: false,
    },
    {
      id: 'industrial-cost-accounting-pitfalls',
      title: '۵ خطای رایج در محاسبه بهای تمام شده در صنایع تولیدی و روش‌های اصلاح آن‌ها',
      category: 'حسابداری صنعتی',
      date: 'فروردین ۱۴۰۵',
      readTime: '۱۰ دقیقه مطالعه',
      excerpt: 'بررسی اشتباهات متداول در تخصیص سربار کارخانه و تاثیر مستقیم آن بر صورت‌های مالی و سود و زیان.',
      urgent: false,
    },
  ];

  return (
    <div dir="rtl" className="max-w-7xl mx-auto py-16 px-6 lg:px-16 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
          مرکز دانش، اخبار و مقالات مالیاتی
        </span>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)]">
          آخرین قوانین، بخشنامه‌ها و مقالات تخصصی
        </h1>
        <p className="text-[var(--text-secondary)]">
          به‌روزترین تحلیل‌های حقوقی و مالیاتی را برای هدایت امن کسب‌وکار خود دنبال کنید.
        </p>
      </div>

      {/* Urgent Tax Ticker / Banner */}
      <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 text-xs font-bold bg-amber-500 text-white rounded-lg">فوری</span>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            آخرین مهلت ارسال گزارش‌های فصلی و ارزش افزوده رو به پایان است. برای مشاوره فوری با تیم حقوقی تماس بگیرید.
          </p>
        </div>
        <Link
          href="/booking"
          className="px-4 py-2 text-sm font-semibold rounded-xl bg-[var(--brand-primary)] text-white hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          درخواست مشاوره اضطراری
        </Link>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-md hover:border-[var(--brand-primary)] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--bg-canvas)] text-[var(--brand-primary)] border border-[var(--border-subtle)]">
                  {article.category}
                </span>
                <span className="text-xs text-[var(--text-secondary)]">{article.readTime}</span>
              </div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3 leading-snug hover:text-[var(--brand-primary)] transition-colors">
                <Link href={`/blog/${article.id}`}>{article.title}</Link>
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span>{article.date}</span>
              <Link
                href={`/blog/${article.id}`}
                className="font-semibold text-[var(--brand-primary)] hover:underline inline-flex items-center gap-1"
              >
                مطالعه کامل مقاله &larr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}