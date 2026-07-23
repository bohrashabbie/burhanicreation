export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const dictionaries = {
  en: () => import("@/dictionaries/en").then((m) => m.default),
  ar: () => import("@/dictionaries/ar").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();

export interface Bilingual {
  en: string;
  ar: string;
}

export interface BilingualList {
  en: string[];
  ar: string[];
}
