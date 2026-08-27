'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.');
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div dir="rtl" className="max-w-6xl mx-auto py-16 px-6 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
          ارتباط با ما
        </span>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)]">
          راه‌های ارتباطی و دفتر مرکزی
        </h1>
        <p className="text-[var(--text-secondary)]">
          برای هماهنگی جلسات حضوری، مشاوره تخصصی یا ارسال اسناد، از طریق راه‌های زیر با ما در ارتباط باشید.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Contact Information Cards */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3 shadow-sm">
            <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span>📍</span> آدرس دفتر مرکزی
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              تهران، خیابان ولیعصر، تقاطع میرداماد، برج اداری، طبقه ۵، واحد ۵۲
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3 shadow-sm">
            <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span>📞</span> تلفن‌های تماس
            </h3>
            <p className="text-sm text-[var(--text-secondary)]" dir="ltr">
              021 - 88776655 <br />
              021 - 88776644
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3 shadow-sm">
            <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span>✉️</span> پست الکترونیک
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              info@hadame-financial.ir
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl">
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">ارسال پیام مستقیم به تیم پشتیبانی</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">نام و نام خانوادگی</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="مثال: علی هنرمند"
                  className="w-full p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">شماره تماس</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  className="w-full p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">ایمیل (اختیاری)</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">متن پیام یا درخواست</label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="شرح درخواست مشاوره یا سوالات مالیاتی..."
                className="w-full p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-white bg-[var(--brand-primary)] hover:opacity-90 transition-opacity shadow-lg cursor-pointer"
            >
              ارسال پیام
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}