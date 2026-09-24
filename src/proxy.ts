import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * Hebrew is the primary language (PRD §4), so "/" always opens the Hebrew site —
 * unless the visitor has already picked a language with the switcher (cookie).
 * The browser's language is deliberately not used: most Israeli devices are set to English.
 */
function preferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  return isLocale(cookie) ? cookie : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, metadata routes and any file with an extension.
  matcher: ["/((?!_next|api|sitemap.xml|robots.txt|manifest.webmanifest|.*\\..*).*)"],
};
