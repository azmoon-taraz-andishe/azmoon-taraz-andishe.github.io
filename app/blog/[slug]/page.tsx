import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/data/posts';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article dir="rtl" className="max-w-4xl mx-auto py-16 px-6 space-y-10">
      
      {/* Header Info */}
      <div className="space-y-4 border-b border-[var(--border-subtle)] pb-8">
        <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 font-medium">
            {post.category}
          </span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] leading-tight">
          {post.title}
        </h1>

        <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-medium">
          {post.excerpt}
        </p>
      </div>

      {/* Body Content */}
      <div className="space-y-6 text-[var(--text-secondary)] leading-loose text-base">
        {post.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="pt-10 border-t border-[var(--border-subtle)] flex justify-between items-center">
        <Link href="/blog" className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">
          &larr; بازگشت به آرشیو مقالات
        </Link>
        <Link href="/booking" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[var(--brand-primary)] hover:opacity-90 transition-opacity">
          مشاوره تخصصی در این زمینه
        </Link>
      </div>
    </article>
  );
}