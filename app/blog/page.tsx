import Link from 'next/link';
import { getAllPosts } from '@/data/posts';

export default function BlogArchivePage() {
  const posts = getAllPosts();

  return (
    <div dir="rtl" className="max-w-7xl mx-auto py-16 px-6 lg:px-16 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
          آرشیو مقالات و یادداشت‌ها
        </span>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)]">
          دانش‌نامه تخصصی مالی، حسابداری و مالیاتی
        </h1>
        <p className="text-[var(--text-secondary)]">
          مجموعه‌ای از مقالات کاربردی برای ارتقای دانش مالی مدیران، حسابداران و صاحبان کسب‌وکار.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
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

              <h2 className="text-xl font-bold text-[var(--text-primary)] leading-snug hover:text-[var(--brand-primary)] transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

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
                مطالعه کامل مقاله &larr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}