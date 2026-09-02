"use client";

import Link from "next/link";
import { useState } from "react";
import { LAWS_DATABASE, type LawItem, searchLaws } from "@/data/lawsData";

export default function LawsAndContractsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("همه");

  // Filter based on both the search box and the category tab
  const categories = [
    "همه",
    "قوانین مالیاتی",
    "استانداردهای حسابداری",
    "قوانین تجاری",
    "نمونه قراردادها",
  ];

  const results = searchLaws(searchTerm).filter((item) => {
    if (selectedCategory === "همه") return true;
    return item.category === selectedCategory;
  });

  return (
    <div dir="rtl" className="max-w-7xl mx-auto py-16 px-6 lg:px-16 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
          مرجع جامع قوانین و قراردادها
        </span>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)]">
          بانک اطلاعات قوانین مالی، حسابداری و مالیاتی ایران
        </h1>
        <p className="text-[var(--text-secondary)]">
          جستجوی هوشمند در بخشنامه‌ها، استانداردهای حسابداری، مواد قانونی و
          الگوهای تاییدشده قراردادهای تجاری.
        </p>
      </div>

      {/* Smart Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجوی عنوان قانون، کلیدواژه (مثل ماده ۹۷، ارزش افزوده، قرارداد کار)..."
            className="w-full p-4 pr-12 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-md focus:outline-none focus:border-[var(--brand-primary)] text-base"
          />
          <span className="absolute right-4 top-4 text-xl text-[var(--text-secondary)]">
            🔍
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              selectedCategory === cat
                ? "bg-[var(--brand-primary)] text-white shadow"
                : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.length > 0 ? (
          results.map((item: LawItem) => (
            <div
              key={item.id}
              className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-sm hover:border-[var(--brand-primary)] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-[var(--bg-canvas)] text-[var(--brand-primary)] font-medium border border-[var(--border-subtle)]">
                    {item.category}
                  </span>
                  <span className="text-[var(--text-secondary)]">
                    {item.reference}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-[var(--text-primary)] leading-snug">
                  {item.title}
                </h2>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap gap-1.5">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[10px] rounded bg-[var(--bg-canvas)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 text-[var(--text-secondary)] space-y-2">
            <p className="text-lg font-bold">
              نتیجه‌ای مطابق با جستجوی شما یافت نشد.
            </p>
            <p className="text-sm">
              لطفاً کلیدواژه‌های دیگر یا دسته‌بندی دیگری را امتحان کنید.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
