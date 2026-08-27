/**
 * Internal canonical currency unit is **Rial**. Iranian gateways disagree on the
 * unit they expect (ZarinPal/Zibal use Rial, PayPing uses Toman), so every
 * amount crossing the app boundary is Rial and each adapter converts as needed.
 */

export const RIAL_PER_TOMAN = 10;

export function rialToToman(rial: number): number {
  if (!Number.isInteger(rial) || rial < 0) {
    throw new Error(`Invalid Rial amount: ${rial}`);
  }
  if (rial % RIAL_PER_TOMAN !== 0) {
    // Bank rails settle in Toman; a sub-Toman Rial amount is a bug upstream.
    throw new Error(`Rial amount ${rial} is not a whole Toman`);
  }
  return rial / RIAL_PER_TOMAN;
}

export function tomanToRial(toman: number): number {
  return toman * RIAL_PER_TOMAN;
}

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** "۱٬۲۰۰٬۰۰۰ تومان" — for display only. */
export function formatToman(rial: number): string {
  const toman = rialToToman(rial);
  const grouped = toman.toLocaleString("en-US").replace(/,/g, "٬");
  const fa = grouped.replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
  return `${fa} تومان`;
}
