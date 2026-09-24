import type { Metadata } from "next";
import { locales, localeTag, ogLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { absoluteUrl, href } from "./site";

interface PageMetaInput {
  locale: Locale;
  /** Path without locale prefix, e.g. "/projects". */
  path: string;
  title: string;
  description: string;
  image?: string;
  /** Use the title as-is instead of applying the site template. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
}

export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeTag[l]] = absoluteUrl(href(l, path));
  languages["x-default"] = absoluteUrl(href("he", path));
  return languages;
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  absoluteTitle,
  type = "website",
}: PageMetaInput): Metadata {
  const dict = getDictionary(locale);
  const url = absoluteUrl(href(locale, path));
  const images = image ? [{ url: image }] : undefined;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: dict.meta.siteName,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images && { images }),
    },
  };
}
