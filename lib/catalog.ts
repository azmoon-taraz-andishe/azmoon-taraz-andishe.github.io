import type { OrderKind } from "@/lib/payment/order-token";

/**
 * Server-side price list. The amount charged is ALWAYS looked up here from a
 * (kind, itemId) pair sent by the client — the client never sends a price.
 *
 * TODO: these are placeholders. Replace with real figures (and ideally move to a
 * CMS / DB). Course prices should match what each /academy/[slug] page shows.
 * Amounts are in Rial.
 */

export interface CatalogItem {
  itemId: string;
  title: string;
  amountRial: number;
}

const COURSES: Record<string, CatalogItem> = {
  "industrial-accounting-pro": {
    itemId: "industrial-accounting-pro",
    title: "استقرار سیستم بهای تمام شده و حسابداری صنعتی",
    amountRial: 48_000_000, // ۴٬۸۰۰٬۰۰۰ تومان
  },
  "tax-rules-defense": {
    itemId: "tax-rules-defense",
    title: "قوانین مالیاتی، تحریر دفاتر و لایحه‌نویسی دفاعی",
    amountRial: 39_000_000, // ۳٬۹۰۰٬۰۰۰ تومان
  },
  "excel-for-finance": {
    itemId: "excel-for-finance",
    title: "اکسل پیشرفته و داشبوردهای مدیریتی مالی",
    amountRial: 25_000_000, // ۲٬۵۰۰٬۰۰۰ تومان
  },
};

const CONSULTATIONS: Record<string, CatalogItem> = {
  tax: { itemId: "tax", title: "مشاوره و دفاع مالیاتی", amountRial: 8_000_000 },
  industrial: {
    itemId: "industrial",
    title: "حسابداری صنعتی و بهای تمام شده",
    amountRial: 8_000_000,
  },
  audit: {
    itemId: "audit",
    title: "بررسی و اصلاح دفاتر قانونی",
    amountRial: 6_000_000,
  },
  management: {
    itemId: "management",
    title: "مدیریت مالی و بودجه‌بندی",
    amountRial: 6_000_000,
  },
};

export function lookupCatalogItem(
  kind: OrderKind,
  itemId: string,
): CatalogItem | null {
  const table = kind === "course" ? COURSES : CONSULTATIONS;
  return table[itemId] ?? null;
}
