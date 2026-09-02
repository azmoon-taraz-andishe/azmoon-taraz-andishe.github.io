import { Vazirmatn } from "next/font/google";
import Link from "next/link";
import Logo from "@/components/Logo";
import { AuthProvider } from "@/context/AuthContext";
import "@/app/globals.css";

// Persian/Arabic UI font. Exposed as `--font-vazirmatn`, which `globals.css`
// feeds into `--font-sans` (and thus `font-sans` / the body font-family).
const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="bg-[var(--bg-canvas)] text-[var(--text-primary)] min-h-screen flex flex-col font-sans">
        <AuthProvider>
          {/* Global Header */}
          <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <Logo size="md" />

              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--text-secondary)]">
                <Link
                  href="/"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  صفحه اصلی
                </Link>
                <Link
                  href="/services"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  خدمات
                </Link>
                <Link
                  href="/laws"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  قوانین و قراردادها
                </Link>
                <Link
                  href="/academy"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  آکادمی
                </Link>
                <Link
                  href="/blog"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  مقالات
                </Link>
                <Link
                  href="/dashboard"
                  className="hover:text-[var(--text-primary)] transition-colors font-bold text-[var(--brand-primary)]"
                >
                  حساب کاربری
                </Link>
              </nav>

              <div className="flex items-center gap-4">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)] transition-colors"
                >
                  ورود / ثبت‌نام
                </Link>
                <Link
                  href="/booking"
                  className="hidden sm:inline-flex px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-[var(--brand-primary)] hover:opacity-90 transition-opacity shadow-md"
                >
                  رزرو مشاوره
                </Link>
              </div>
            </div>
          </header>

          {/* Main Content View */}
          <main className="flex-grow">{children}</main>

          {/* Global Footer */}
          <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-12 px-6 lg:px-16 mt-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-[var(--text-secondary)]">
              <Logo size="sm" />
              <p className="text-center md:text-right">
                تمامی حقوق محفوظ است &copy; ۱۴۰۵ | ارائه تخصصی راهکارهای مالی و
                مالیاتی
              </p>
              <div className="flex gap-6">
                <Link href="/laws" className="hover:underline">
                  بانک قوانین
                </Link>
                <Link href="/blog" className="hover:underline">
                  مجله مالی
                </Link>
                <Link href="/dashboard" className="hover:underline">
                  پنل کاربری
                </Link>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
