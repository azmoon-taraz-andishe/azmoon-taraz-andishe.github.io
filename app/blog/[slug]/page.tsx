import Link from 'next/link';

export default function ArticleDetail({ params }: { params: { slug: string } }) {
  return (
    <article dir="rtl" className="max-w-4xl mx-auto py-16 px-6">
      
      {/* Article Header */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
            بخشنامه‌های مالیاتی
          </span>
          <span className="text-xs text-[var(--text-secondary)]">خرداد ۱۴۰۵ • ۵ دقیقه مطالعه</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] leading-tight">
          تغییرات کلیدی قانون مالیات‌های مستقیم در سال ۱۴۰۵؛ چه چیزی برای شرکت‌ها تغییر کرده است؟
        </h1>
      </div>

      {/* Featured Banner / Image Placeholder */}
      <div className="w-full h-72 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] mb-10 shadow-inner">
        تصویر گرافیکی یا اینفوگرافیک بخشنامه
      </div>

      {/* Article Content Body */}
      <div className="space-y-6 text-[var(--text-secondary)] leading-loose text-base">
        <p>
          با ابلاغ اصلاحیه جدید قوانین مالیاتی، ساختار رسیدگی به دفاتر قانونی و نرخ‌های مالیاتی دستخوش تغییراتی شده است که تمامی مدیران مالی و حسابداران صنعتی باید نسبت به آن هوشیار باشند. در این مقاله به بررسی بندهای کلیدی و راهکارهای جلوگیری از جرایم مالیاتی می‌پردازیم.
        </p>

        <h3 className="text-xl font-bold text-[var(--text-primary)] pt-4">مهم‌ترین تغییرات مواد قانون مالیات‌های مستقیم</h3>
        <p>
          مطابق با الحاقات جدید، شفافیت در تراکنش‌های بانکی تجاری و تطبیق آن با سامانه مودیان از اولویت‌های اصلی سازمان امور مالیاتی کشور است. شرکت‌هایی که فرآیند تحریر دفاتر خود را با استانداردهای جدید مطابقت ندهند، با ریسک رد دفاتر مواجه خواهند شد.
        </p>

        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border-r-4 border-[var(--brand-accent)] border border-[var(--border-subtle)] my-6">
          <h4 className="font-bold text-[var(--text-primary)] mb-2">نکته طلایی مشاوران ما:</h4>
          <p className="text-sm">
            پیش از ارسال نهایی اظهارنامه، حتماً مغایرت‌های حساب‌های پش‌پرداخت و تنخواه‌گردان‌ها را بررسی و اصلاح فرمایید تا در هیأت‌های حل اختلاف با مشکل مواجه نشوید.
          </p>
        </div>
      </div>

      {/* Share / Back Link */}
      <div className="mt-12 pt-6 border-t border-[var(--border-subtle)] flex justify-between items-center">
        <Link href="/blog" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">
          &larr; بازگشت به آرشیو مقالات
        </Link>
        <span className="text-xs text-[var(--text-secondary)]">اشتراک‌گذاری در شبکه‌های اجتماعی</span>
      </div>
    </article>
  );
}