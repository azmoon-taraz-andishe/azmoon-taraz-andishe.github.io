import Link from 'next/link';

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 lg:px-16 text-center lg:text-right border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
              مشاور امین مالی و مالیاتی شما
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-[var(--text-primary)]">
              راهبری مالی دقیق، <span className="text-[var(--brand-accent)]">آرامش مالیاتی</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              ارائه تخصصی خدمات حسابداری صنعتی، اصلاح دفاتر قانونی، تنظیم اظهارنامه‌های مالیاتی و برگزاری دوره‌های کاربردی بازار کار.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/booking"
                className="inline-flex justify-center items-center px-6 py-3 rounded-xl font-medium text-white bg-[var(--brand-primary)] hover:opacity-90 transition-opacity shadow-lg"
              >
                رزرو مشاوره تخصصی
              </Link>
              <Link
                href="/academy"
                className="inline-flex justify-center items-center px-6 py-3 rounded-xl font-medium border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] transition-colors"
              >
                مشاهده دوره‌های آموزشی
              </Link>
            </div>
          </div>
          
          {/* Hero Visual Card / Graphic placeholder */}
          <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl relative">
            <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">آخرین بخشنامه‌های کلیدی</h3>
            <ul className="space-y-3 text-right">
              <li className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-sm">
                <span className="font-semibold text-[var(--brand-accent)]">خرداد ۱۴۰۵:</span> اصلاحیه جدید مواد قانون مالیات‌های مستقیم ابلاغ شد.
              </li>
              <li className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-sm">
                <span className="font-semibold text-[var(--brand-accent)]">اردیبهشت ۱۴۰۵:</span> مهلت جدید ارسال ارزش افزوده فصل بهار.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 px-6 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">خدمات تخصصی ما</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            مجموعه‌ای کامل از راهکارهای مالی و مالیاتی ویژه شرکت‌های تجاری، صنعتی و اصناف.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "حسابداری صنعتی و بازرگانی", desc: "استقرار سیستم‌های بهای تمام شده و کنترل‌های داخلی." },
            { title: "خدمات و مشاوره مالیاتی", desc: "دفاع مالیاتی، تنظیم اظهارنامه و کاهش ریسک جرایم." },
            { title: "بررسی و اصلاح دفاتر", desc: "حسابرسی داخلی و رفع مغایرت‌های قانونی دفاتر قانونی." },
            { title: "مشاوره مدیریت مالی", desc: "تحلیل بودجه، جریان نقدینگی و داشبوردهای مدیریتی." }
          ].map((service, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--brand-primary)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-[var(--brand-primary)] mb-4 font-bold text-lg">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{service.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{service.desc}</p>
              </div>
              <Link href="/services" className="mt-6 text-sm font-semibold text-[var(--brand-primary)] hover:underline inline-flex items-center gap-1">
                اطلاعات بیشتر &larr;
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}