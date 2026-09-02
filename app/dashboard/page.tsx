"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function UserDashboardPage() {
  const { isAuthenticated, user, plannedSessions, purchasedCourses, logout } =
    useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  return (
    <div dir="rtl" className="max-w-7xl mx-auto py-12 px-6 lg:px-16 space-y-10">
      {/* User Header */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
            پنل اختصاصی اعضا
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
            سلام، {user.name}
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            {user.email} &bull; {user.role}
          </p>
        </div>

        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="px-4 py-2 rounded-xl text-xs font-semibold border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
        >
          خروج از حساب
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Planned Sessions List */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              جلسات مشاوره پیش‌رو
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
              {plannedSessions.length} جلسه فعال
            </span>
          </div>

          <div className="space-y-4">
            {plannedSessions.length > 0 ? (
              plannedSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-2"
                >
                  <div className="flex justify-between items-center text-xs text-[var(--text-secondary)]">
                    <span className="font-semibold text-[var(--brand-accent)]">
                      {session.date}
                    </span>
                    <span>مشاور: {session.consultant}</span>
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)]">
                    {session.topic}
                  </h3>
                  {session.notes && (
                    <p className="text-xs text-[var(--text-secondary)]">
                      یادداشت: {session.notes}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--text-secondary)] text-center py-6">
                هیچ جلسه مشاوره برنامه‌ریزی‌نشده‌ای وجود ندارد.
              </p>
            )}
          </div>
        </div>

        {/* Purchased Courses List */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              دوره‌های آموزشی خریداری‌شده
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
              {purchasedCourses.length} دوره
            </span>
          </div>

          <div className="space-y-4">
            {purchasedCourses.length > 0 ? (
              purchasedCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] space-y-3"
                >
                  <div className="flex justify-between items-center text-xs text-[var(--text-secondary)]">
                    <span>مدرس: {course.instructor}</span>
                    <span className="font-bold text-[var(--brand-primary)]">
                      {course.progress}% تکمیل‌شده
                    </span>
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)]">
                    {course.title}
                  </h3>
                  <div className="w-full bg-[var(--bg-surface)] rounded-full h-1.5 border border-[var(--border-subtle)] overflow-hidden">
                    <div
                      className="bg-[var(--brand-primary)] h-full rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--text-secondary)] text-center py-6">
                دوره‌ای خریداری نشده است.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
