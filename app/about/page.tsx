import Link from 'next/link';

export default function AboutPage() {
  return (
    <div dir="rtl" className="max-w-5xl mx-auto py-16 px-6 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
          درباره گروه تخصصی مالی
        </span>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)]">
          مهارت، تجربه و دقت در خدمت توسعه کسب‌وکار شما
        </h1>
        <p className="text-[var(--text-secondary)]">
          ما تیمی از خبرگان حسابداری، حسابرسی، مدیریت مالی و حقوق مالیاتی هستیم که با سال‌ها تجربه اجرایی، راهگشای چالش‌های پیچیده مالی شرکت‌ها و کارخانجات صنعتی هستیم.
        </p>
      </div>

      {/* Vision & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[var(--brand-primary)]"></span>
            چشم‌انداز و ماموریت ما
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            هدف ما ایجاد شفافیت مالی، به حداقل رساندن ریسک‌های حقوقی و مالیاتی، و استقرار ساختارهای حرفه‌ای بهای تمام شده برای صنایع است تا مدیران بتوانند با خیال آسوده روی توسعه کسب‌وکار خود تمرکز کنند.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[var(--brand-accent)]"></span>
            چرا ما را انتخاب کنید؟
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            ترکیبی از دانش آکادمیک به‌روز، تسلط کامل بر آخرین اصلاحیه قوانین مالیاتی، تجربه عملی در صنایع تولیدی و بازرگانی، و تعهد کامل به محرمانگی اطلاعات مالی کارفرمایان.
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-[var(--text-primary)] text-center">ارزش‌های کلیدی مجموعه</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center space-y-2">
            <h4 className="font-bold text-[var(--text-primary)]">دقت و صحت حداکثری</h4>
            <p className="text-xs text-[var(--text-secondary)]">بازبینی چندمرحله‌ای اسناد پیش از ارسال به مراجع قانونی.</p>
          </div>
          <div className="p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center space-y-2">
            <h4 className="font-bold text-[var(--text-primary)]">به‌روز بودن</h4>
            <p className="text-xs text-[var(--text-secondary)]">رصد لحظه‌ای بخشنامه‌ها و تغییرات قوانین مالیاتی.</p>
          </div>
          <div className="p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center space-y-2">
            <h4 className="font-bold text-[var(--text-primary)]">پاسخگویی مسئولانه</h4>
            <p className="text-xs text-[var(--text-secondary)]">همراهی مستمر با کارفرما در تمام مراحل دفاع مالیاتی.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center space-y-6 shadow-md">
        <h3 className="text-xl font-bold text-[var(--text-primary)]">آماده همکاری یا دریافت مشاوره هستید؟</h3>
        <div className="flex justify-center gap-4">
          <Link
            href="/booking"
            className="px-6 py-3 rounded-xl font-bold text-white bg-[var(--brand-primary)] hover:opacity-90 transition-opacity shadow"
          >
            رزرو وقت مشاوره
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl font-medium border border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:bg-[var(--bg-surface-hover)] transition-colors"
          >
            تماس با ما
          </Link>
        </div>
      </div>

    </div>
  );
}