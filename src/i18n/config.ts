export const locales = ["he", "ar", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "he";

export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  he: "rtl",
  ar: "rtl",
  en: "ltr",
};

/** Native names, used by the language switcher. */
export const localeNames: Record<Locale, string> = {
  he: "עברית",
  ar: "العربية",
  en: "English",
};

export const localeShortNames: Record<Locale, string> = {
  he: "עב",
  ar: "ع",
  en: "EN",
};

export const ogLocale: Record<Locale, string> = {
  he: "he_IL",
  ar: "ar_IL",
  en: "en_US",
};

/** BCP 47 tags used for hreflang and Intl formatting. */
export const localeTag: Record<Locale, string> = {
  he: "he-IL",
  ar: "ar-IL",
  en: "en",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** A value that exists independently in every supported language. */
export type Localized<T = string> = Record<Locale, T>;
