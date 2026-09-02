"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleFakeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier.trim()) {
      login(identifier);
      router.push("/dashboard");
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-[75vh] flex items-center justify-center px-6 py-12"
    >
      <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
            ورود شبیه‌سازی‌شده
          </span>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">
            حساب کاربری
          </h1>
          <p className="text-xs text-[var(--text-secondary)]">
            ایمیل یا شماره موبایل خود را وارد کنید تا به پنل جلسات و دوره‌ها وارد
            شوید.
          </p>
        </div>

        <form onSubmit={handleFakeLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--text-primary)]">
              شناسه کاربری (ایمیل / موبایل)
            </label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="ali@zagrosdataware.com"
              className="w-full p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[var(--brand-primary)] hover:opacity-90 transition-opacity shadow-md cursor-pointer"
          >
            ورود سریع به داشبورد
          </button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            &larr; بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}
