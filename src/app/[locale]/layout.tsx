import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { fontVariables, localeFontStyle } from "../fonts";
import { Analytics } from "@/components/layout/Analytics";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/JsonLd";
import { isLocale, localeDirection, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { contentMode } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import { organizationSchema } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0c0d0e",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.home.title, template: `%s | ${dict.meta.siteName}` },
    description: dict.meta.defaultDescription,
    applicationName: dict.meta.siteName,
    formatDetection: { telephone: false },
    // Draft content must never be indexed (PRD §15); strict mode is the launch mode.
    robots: contentMode === "strict" ? { index: true, follow: true } : { index: false, follow: false },
    ...(process.env.GOOGLE_SITE_VERIFICATION && {
      verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
    }),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} dir={localeDirection[locale]} className={fontVariables} style={localeFontStyle[locale]}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="fixed start-4 top-4 z-[100] -translate-y-24 bg-signal px-4 py-3 font-semibold text-ink focus:translate-y-0"
        >
          {dict.a11y.skipToContent}
        </a>
        <MotionProvider>
          <SiteHeader locale={locale} />
          <main id="main">{children}</main>
          <SiteFooter locale={locale} />
          <MobileContactBar locale={locale} />
        </MotionProvider>
        <JsonLd data={organizationSchema(locale)} />
        <Analytics locale={locale} />
      </body>
    </html>
  );
}
