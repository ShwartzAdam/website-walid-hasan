"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { GA_ID, initAnalytics, track, trackPageView } from "@/lib/analytics";

/**
 * GA4: loads gtag.js, sends a page_view on every route change (initial load
 * and client-side navigation), and tracks phone / WhatsApp / email links and
 * any element marked with data-track through one delegated click listener.
 */
export function Analytics({ locale }: { locale: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;
    initAnalytics();
    // Wait a tick so the new page's <title> (streamed metadata) is in place.
    const id = window.setTimeout(() => {
      trackPageView({
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: document.title,
        site_language: locale,
      });
    }, 150);
    return () => window.clearTimeout(id);
  }, [pathname, locale]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("a, button");
      if (!el) return;
      const explicit = el.dataset.track;
      const label = el.dataset.trackLabel;
      const url = el instanceof HTMLAnchorElement ? el.href : "";
      if (explicit) track(explicit as Parameters<typeof track>[0], { label, locale });
      else if (url.startsWith("tel:")) track("phone_click", { locale, page: location.pathname });
      else if (url.startsWith("mailto:")) track("email_click", { locale, page: location.pathname });
      else if (/wa\.me|whatsapp\.com/.test(url)) track("whatsapp_click", { locale, page: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [locale]);

  if (!GA_ID) return null;
  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />;
}
