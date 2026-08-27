'use client';

export default function EnrollButton() {
  return (
    <button
      type="button"
      onClick={() => alert('هدایت به درگاه پرداخت یا ثبت نام تکمیلی...')}
      className="w-full py-4 rounded-xl font-bold text-white bg-[var(--brand-primary)] hover:opacity-90 transition-opacity text-center cursor-pointer"
    >
      ثبت‌نام در دوره آموزشی
    </button>
  );
}
