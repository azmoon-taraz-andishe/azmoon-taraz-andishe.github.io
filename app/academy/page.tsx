import Link from 'next/link';

export default function AcademyPage() {
  const courses = [
    {
      id: 'industrial-accounting-pro',
      title: 'استقرار سیستم بهای تمام شده و حسابداری صنعتی',
      category: 'بازار کار پیشرفته',
      duration: 'ساعت ۴۰ ساعت',
      level: 'متوسط تا پیشرفته',
      price: '۴,۸۰۰,۰۰۰ تومان',
      description: 'آموزش عملی محاسبه بهای تمام شده کالای ساخته شده، سربار و کنترل‌های انبار در صنایع تولیدی.',
    },
    {
      id: 'tax-rules-defense',
      title: 'قوانین مالیاتی، تحریر دفاتر و لایحه‌نویسی دفاعی',
      category: 'امور مالیاتی',
      duration: '۳۰ ساعت',
      level: 'تخصصی',
      price: '۳,900,000 تومان',
      description: 'تسلط کامل بر ماده‌های کلیدی قانون مالیات‌های مستقیم، ارزش افزوده و نحوه دفاع در هیأت‌های حل اختلاف.',
    },
    {
      id: 'excel-for-finance',
      title: 'اکسل پیشرفته و داشبوردهای مدیریتی مالی',
      category: 'مهارت‌های کاربردی',
      duration: '۲۰ ساعت',
      level: 'مقدماتی تا پیشرفته',
      price: '۲,۵۰۰,۰۰۰ تومان',
      description: 'طراحی مدل‌های مالی، توابع پیچیده، ابزارهای تحلیل داده و ساخت داشبوردهای گزارش‌دهی مدیریت.',
    },
  ];

  return (
    <div dir="rtl" className="max-w-7xl mx-auto py-16 px-6 lg:px-16">
      {/* Academy Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
          آکادمی تخصصی مالی و مالیاتی
        </span>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)]">
          مهارت‌های کلیدی بازار کار مالی را از متخصصان بیاموزید
        </h1>
        <p className="text-[var(--text-secondary)]">
          دوره‌های کاربردی، پروژه‌محور و متناسب با آخرین استانداردهای حسابداری و قوانین مالیاتی ایران.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-md hover:border-[var(--brand-primary)] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--bg-canvas)] text-[var(--brand-primary)] border border-[var(--border-subtle)]">
                  {course.category}
                </span>
                <span className="text-xs text-[var(--text-secondary)]">{course.duration}</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 leading-snug">
                {course.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                {course.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <span className="font-bold text-[var(--brand-accent)] text-lg">{course.price}</span>
              <Link
                href={`/academy/${course.id}`}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[var(--brand-primary)] hover:opacity-90 transition-opacity"
              >
                جزئیات و ثبت‌نام
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}