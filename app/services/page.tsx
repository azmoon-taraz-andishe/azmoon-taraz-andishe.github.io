import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      id: 'industrial-accounting',
      title: 'حسابداری صنعتی و بازرگانی',
      category: 'خدمات تخصصی شرکت‌ها',
      desc: 'استقرار سیستم‌های بهای تمام شده، حسابداری انبار، کنترل‌های داخلی و بهینه‌سازی جریان مالی کارخانجات و شرکت‌های بازرگانی.',
      features: ['محاسبه دقیق بهای تمام شده محصول', 'کنترل انبار و انبارگردانی', 'طراحی كدینگ حسابداری صنعتی'],
    },
    {
      id: 'tax-services',
      title: 'خدمات و مشاوره مالیاتی',
      category: 'امور حقوقی و مالیاتی',
      desc: 'تنظیم اظهارنامه‌های مالیاتی، تهیه صورت معاملات فصلی، ارسال ارزش افزوده و دفاع تخصصی در هیأت‌های حل اختلاف.',
      features: ['دفاع مالیاتی و کاهش جرایم', 'تنظیم اظهارنامه عملکرد', 'مشاوره تخصصی ماده‌های قانون مالیات'],
    },
    {
      id: 'ledger-audit',
      title: 'بررسی و اصلاح دفاتر قانونی',
      category: 'حسابرسی داخلی',
      desc: 'بازبینی پیش از موعد اسناد حسابداری، رفع مغایرت‌های بانکی و اصلاح دفاتر روزنامه و کل جهت جلوگیری از رد دفاتر.',
      features: ['حسابرسی داخلی پیشگیرانه', 'اصلاح سند به سند دفاتر', 'آماده‌سازی برای ممیزی مالیاتی'],
    },
    {
      id: 'financial-management',
      title: 'مشاوره مدیریت مالی',
      category: 'راهبری مدیریت',
      desc: 'تحلیل بودجه، پیش‌بینی جریان نقدینگی (Cash Flow)، طراحی داشبوردهای مدیریتی و مشاوره سرمایه‌گذاری.',
      features: ['تحلیل جریان نقدینگی و بودجه‌بندی', 'طراحی داشبوردهای گزارش‌دهی مدیران', 'مشاوره تصمیم‌گیری‌های استراتژیک'],
    },
  ];

  return (
    <div dir="rtl" className="max-w-7xl mx-auto py-16 px-6 lg:px-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
          راهکارهای تخصصی کسب‌وکار
        </span>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)]">
          خدمات جامع مالی، حسابداری و مالیاتی
        </h1>
        <p className="text-[var(--text-secondary)]">
          پشتیبانی حرفه‌ای از ساختار مالی شرکت‌ها، کارخانجات و اصناف با بهره‌گیری از متخصصان مجرب.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-8 shadow-md hover:border-[var(--brand-primary)] transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--bg-canvas)] text-[var(--brand-primary)] border border-[var(--border-subtle)]">
                {service.category}
              </span>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {service.title}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {service.desc}
              </p>
              
              <ul className="space-y-2 pt-2">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="text-xs text-[var(--text-secondary)] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]"></span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <Link
                href={`/services/${service.id}`}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[var(--brand-primary)] hover:opacity-90 transition-opacity"
              >
                اطلاعات بیشتر و ثبت درخواست
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}