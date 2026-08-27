import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-3 font-extrabold tracking-tight ${sizeClasses[size]} ${className}`}>
      {/* Brand Icon Graphic */}
      <div className="w-9 h-9 rounded-xl bg-[var(--brand-primary)] flex items-center justify-center shadow-md text-[var(--brand-accent)]">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>

      {/* Brand Typography */}
      <span className="text-[var(--text-primary)]">
        گروه تخصصی <span className="text-[var(--brand-primary)] dark:text-[var(--brand-accent)]">مالی</span>
      </span>
    </Link>
  );
}