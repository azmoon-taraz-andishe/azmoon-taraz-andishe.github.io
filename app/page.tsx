import Link from 'next/link';
import { getLatestPosts, getAllPosts } from '@/data/posts';

export default function Home() {
  const latestPosts = getLatestPosts(3); // For the bottom blog grid
  
  // Filter category items for the hero section's key latest notes (e.g., Tax News / Tax updates)
  const taxNotes = getAllPosts()
    .filter((post) => post.category === 'اخبار مالیاتی')
    .slice(0, 2);

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
          
          {/* Hero Visual Card / Reverted Design filtered by Tax Notes category */}
          <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl relative">
            <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">آخرین بخشنامه‌های کلیدی</h3>
            <ul className="space-y-3 text-right">
              {taxNotes.map((note) => (
                <li key={note.slug} className="p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-sm">
                  <Link href={`/blog/${note.slug}`} className="block hover:opacity-80 transition-opacity">
                    <span className="font-semibold text-[var(--brand-accent)]">{note.date}:</span> {note.title}
                  </Link>
                </li>
              ))}
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
              <Link href={`/services`} className="mt-6 text-sm font-semibold text-[var(--brand-primary)] hover:underline inline-flex items-center gap-1">
                اطلاعات بیشتر &larr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Blog Cards Section */}
      <section className="py-16 px-6 lg:px-16 max-w-7xl mx-auto w-full border-t border-[var(--border-subtle)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
              مجله تخصصی مالی و مالیاتی
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[var(--text-primary)]">
              آخرین مقالات و یادداشت‌های تحلیلی
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-primary)] hover:underline whitespace-nowrap"
          >
            مشاهده همه مقالات &larr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-sm hover:border-[var(--brand-primary)] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-[var(--text-secondary)]">
                  <span className="px-2.5 py-1 rounded-md bg-[var(--bg-canvas)] text-[var(--brand-primary)] font-medium border border-[var(--border-subtle)]">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-lg font-bold text-[var(--text-primary)] leading-snug hover:text-[var(--brand-primary)] transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
                <span>{post.readTime}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-semibold text-[var(--brand-primary)] hover:underline"
                >
                  مطالعه مقاله &larr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}