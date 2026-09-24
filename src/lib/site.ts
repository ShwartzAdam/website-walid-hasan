import { defaultLocale, type Locale } from "@/i18n/config";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** Build a locale-prefixed path: href("he", "/projects") → "/he/projects". */
export function href(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Strip the locale prefix from a pathname: "/ar/projects/x" → "/projects/x". */
export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/(he|ar|en)(?=\/|$)/, "");
  return stripped || "/";
}

export const fallbackLocale = defaultLocale;
