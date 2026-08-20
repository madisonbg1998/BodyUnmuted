import 'server-only';

// Add a new code by setting its env var here and in .env.local /
// .env.local.example — each maps to an alternate Adhara commerce price id.
const DISCOUNT_CODES: Record<string, string | undefined> = {
  TESTFREE: process.env.DISCOUNT_CODE_TESTFREE_PRICE_ID,
};

export function resolveDiscountCode(code: string | undefined | null): string | undefined {
  if (!code) return undefined;
  return DISCOUNT_CODES[code.trim().toUpperCase()];
}
