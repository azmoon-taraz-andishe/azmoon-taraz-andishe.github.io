'use client';

import { useState } from 'react';
import { startPayment } from '@/lib/pay-client';
import { lookupCatalogItem } from '@/lib/catalog';
import { formatToman } from '@/lib/payment/money';

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    serviceType: 'tax',
    format: 'online',
    date: '',
    time: '',
    fullName: '',
    phone: '',
    company: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fee = lookupCatalogItem('consultation', formData.serviceType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.date || !formData.fullName.trim() || !formData.phone.trim()) {
      setError('لطفاً تاریخ، نام و شماره موبایل را کامل وارد کنید.');
      return;
    }

    setSubmitting(true);
    try {
      // TODO: persist the requested slot (date/time/format/description) server-side
      // and tie it to the payment before redirecting.
      await startPayment({
        kind: 'consultation',
        itemId: formData.serviceType,
        payerName: formData.fullName,
        payerMobile: formData.phone,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در اتصال به درگاه پرداخت');
      setSubmitting(false);
    }
  };

  return (
    <div dir="rtl" className="max-w-4xl mx-auto py-16 px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-3">رزرو وقت مشاوره تخصصی</h1>
        <p className="text-[var(--text-secondary)]">
          با کارشناسان ارشد مالی، حسابرسی و مالیاتی ما گفت‌وگو کنید و راهکار دریافت کنید.
        </p>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Step 1: Service & Format */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
              ۱. انتخاب نوع خدمت و نحوه برگزاری
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">نوع خدمت</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
                >
                  <option value="tax">مشاوره و دفاع مالیاتی</option>
                  <option value="industrial">حسابداری صنعتی و بهای تمام شده</option>
                  <option value="audit">بررسی و اصلاح دفاتر قانونی</option>
                  <option value="management">مدیریت مالی و بودجه‌بندی</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">نحوه مشاوره</label>
                <select
                  name="format"
                  value={formData.format}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
                >
                  <option value="online">آنلاین (ویدیو کنفرانس)</option>
                  <option value="inperson">حضوری (دفتر مرکزی)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Date & Time */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
              ۲. انتخاب تاریخ و ساعت
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">تاریخ پیشنهادی</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">ساعت مشاوره</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
                >
                  <option value="10:00">ساعت ۱۰:۰۰ الی ۱۱:۳۰</option>
                  <option value="12:00">ساعت ۱۲:۰۰ الی ۱۳:۳۰</option>
                  <option value="16:00">ساعت ۱۶:۰۰ الی ۱۷:۳۰</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Client Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
              ۳. اطلاعات تماس و کسب‌وکار
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">نام و نام خانوادگی</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="مثال: علی هنرمند"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">شماره موبایل</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">نام شرکت / کسب‌وکار</label>
                <input
                  type="text"
                  name="company"
                  placeholder="نام مجموعه شما"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">شرح مختصر مسئله یا چالش مالی</label>
              <textarea
                name="description"
                rows={4}
                placeholder="توضیح کوتاه درباره پرونده مالیاتی، مغایرت دفاتر یا نیاز سیستم صنعتی..."
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)] resize-none"
              ></textarea>
            </div>
          </div>

          {fee && (
            <div className="flex justify-between items-center border-t border-[var(--border-subtle)] pt-4 text-sm">
              <span className="text-[var(--text-secondary)]">هزینه رزرو این مشاوره:</span>
              <strong className="text-[var(--brand-accent)] text-lg">{formatToman(fee.amountRial)}</strong>
            </div>
          )}

          {error && <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-xl font-bold text-white bg-[var(--brand-primary)] hover:opacity-90 transition-opacity shadow-lg text-center disabled:opacity-60 disabled:cursor-wait"
          >
            {submitting ? 'در حال انتقال به درگاه پرداخت…' : 'پرداخت و ثبت نهایی درخواست مشاوره'}
          </button>
        </form>
      </div>
    </div>
  );
}