import Logo from "@/components/Logo";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

// Configure Vazirmatn font with Persian/Arabic subset support
const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "گروه مالی و مالیاتی",
  description: "خدمات تخصصی حسابداری، مدیریت مالی و مالیاتی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="min-h-screen flex flex-col antialiased font-sans">
        <ThemeProvider>
          {/* Global Header */}
          <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <Logo size="md" />

              <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]">
                <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">صفحه اصلی</Link>
                <Link href="/services" className="hover:text-[var(--text-primary)] transition-colors">خدمات</Link>
                <Link href="/academy" className="hover:text-[var(--text-primary)] transition-colors">آکادمی</Link>
                <Link href="/blog" className="hover:text-[var(--text-primary)] transition-colors">مقالات و اخبار</Link>
              </nav>

              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Link
                  href="/booking"
                  className="hidden sm:inline-flex px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-[var(--brand-primary)] hover:opacity-90 transition-opacity shadow-md"
                >
                  رزرو مشاوره
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          {/* Global Footer */}
          <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-12 px-6 text-center text-sm text-[var(--text-secondary)]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <p>تمامی حقوق برای گروه تخصصی مالی محفوظ است © ۱۴۰۵</p>
              <div className="flex gap-6">
                <Link href="/about" className="hover:underline">درباره ما</Link>
                <Link href="/contact" className="hover:underline">تماس با ما</Link>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}