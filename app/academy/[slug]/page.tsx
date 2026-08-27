import Link from 'next/link';
import { notFound } from 'next/navigation';
import PayButton from '@/components/PayButton';
import { lookupCatalogItem } from '@/lib/catalog';
import { formatToman } from '@/lib/payment/money';

const COURSE_SLUGS = [
  'industrial-accounting-pro',
  'tax-rules-defense',
  'excel-for-finance',
];

export function generateStaticParams() {
  return COURSE_SLUGS.map((slug) => ({ slug }));
}

export default async function CourseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = lookupCatalogItem('course', slug);
  if (!course) {
    notFound();
  }

  return (
    <div dir="rtl" className="max-w-5xl mx-auto py-16 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Content Info */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
              دوره تخصصی بازار کار
            </span>
            <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mt-3 mb-4">
              استقرار سیستم بهای تمام شده و حسابداری صنعتی
            </h1>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              این دوره به صورت کاملاً کاربردی برای حسابدارانی که قصد ورود به بخش مالی صنایع تولیدی و کارخانجات را دارند طراحی شده است. مباحث از صفر تا صدِ سربار، انبار و محاسبه قیمت تمام شده واحد محصول را پوشش می‌دهد.
            </p>
          </div>

          {/* Syllabus Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-3">
              سرفصل‌های آموزشی دوره
            </h3>
            <ul className="space-y-3">
              {[
                "مفاهیم پایه و طبقه بندی هزینه‌ها در صنایع تولیدی",
                "سیستم‌های هزینه‌یابی سفارش کار و مرحله‌ای (مداوم)",
                "روش‌های تسهیم هزینه‌های سربار ساخت",
                "کنترل موجودی، انبار و گزارش‌دهی ضایعات عادی و غیرعادی",
                "تحلیل و پیاده‌سازی عملیاتی در نرم‌افزارهای مالی"
              ].map((item, idx) => (
                <li key={idx} className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[var(--brand-primary)] text-white text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enrollment Sticky Sidebar */}
        <div className="space-y-6">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-xl sticky top-28 space-y-6">
            <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-4">
              <span className="text-sm text-[var(--text-secondary)]">مبلغ سرمایه‌گذاری:</span>
              <span className="text-2xl font-extrabold text-[var(--brand-accent)]">{formatToman(course.amountRial)}</span>
            </div>

            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li className="flex justify-between">
                <span>مدت زمان دوره:</span>
                <strong className="text-[var(--text-primary)]">۴۰ ساعت آموزشی</strong>
              </li>
              <li className="flex justify-between">
                <span>نوع برگزاری:</span>
                <strong className="text-[var(--text-primary)]">آنلاین + فایل‌های ضبط شده</strong>
              </li>
              <li className="flex justify-between">
                <span>گواهینامه:</span>
                <strong className="text-[var(--text-primary)]">معتبر و قابل ترجمه</strong>
              </li>
            </ul>

            <PayButton kind="course" itemId={course.itemId}>
              ثبت‌نام در دوره آموزشی
            </PayButton>
          </div>
        </div>

      </div>

      <div className="mt-12 pt-6 border-t border-[var(--border-subtle)]">
        <Link href="/academy" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">
          &larr; بازگشت به لیست دوره‌های آکادمی
        </Link>
      </div>
    </div>
  );
}