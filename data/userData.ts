export interface UserSession {
  id: string;
  topic: string;
  consultant: string;
  date: string;
  status: "planned" | "completed" | "cancelled";
  notes?: string;
}

export interface PurchasedCourse {
  id: string;
  title: string;
  progress: number; // percentage 0-100
  instructor: string;
  nextLesson: string;
}

export interface SearchRecord {
  id: string;
  query: string;
  date: string;
  category: "قوانین" | "مقالات" | "دوره‌ها";
}

export const MOCK_USER = {
  name: "علی هنرمند",
  email: "ali.honarmand@zagrosdataware.com",
  phone: "09120000000",
  role: "مدیرعامل / صاحب کسب‌وکار",
};

export const MOCK_SESSIONS: UserSession[] = [
  {
    id: "s1",
    topic: "مشاوره دفاع مالیاتی و بررسی عملکرد سامانه مؤدیان",
    consultant: "تیم تخصصی مالیاتی",
    date: "۲۰ شهریور ۱۴۰۵ - ساعت ۱۶:۰۰",
    status: "planned",
    notes: "آماده‌سازی صورت‌های سود و زیان فصل بهار",
  },
  {
    id: "s2",
    topic: "استقرار سیستم بهای تمام شده صنعتی",
    consultant: "واحد حسابداری صنعتی",
    date: "۱۰ خرداد ۱۴۰۵ - ساعت ۱۱:۰۰",
    status: "completed",
    notes: "بررسی تخصیص هزینه‌های سربار ساخت",
  },
];

export const MOCK_COURSES: PurchasedCourse[] = [
  {
    id: "c1",
    title: "دوره جامع حسابداری صنعتی و بهای تمام شده پیشرفته",
    progress: 75,
    instructor: "دکتر مهدوی",
    nextLesson: "جلسه ۱۲: محاسبه انحرافات سربار",
  },
  {
    id: "c2",
    title: "کارگاه عملی ارسال فاکتور الکترونیکی و سامانه مؤدیان",
    progress: 100,
    instructor: "واحد فنی گروه مالی",
    nextLesson: "دوره تکمیل‌شده - دریافت گواهینامه",
  },
];

export const MOCK_SEARCH_HISTORY: SearchRecord[] = [
  {
    id: "sh1",
    query: "ماده ۹۷ قانون مالیات‌های مستقیم",
    date: "دیروز",
    category: "قوانین",
  },
  {
    id: "sh2",
    query: "نمونه قرارداد کار موقت",
    date: "۳ روز پیش",
    category: "قوانین",
  },
  {
    id: "sh3",
    query: "خطاهای رایج سامانه مؤدیان",
    date: "هفته گذشته",
    category: "مقالات",
  },
  {
    id: "sh4",
    query: "بهینه‌سازی جریان نقدینگی",
    date: "۲ هفته پیش",
    category: "دوره‌ها",
  },
];
