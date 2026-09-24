"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * GA4 loader plus a single delegated click listener that tracks every
 * phone / WhatsApp / email link and any element marked with data-track.
 */
export function Analytics({ locale }: { locale: string }) {
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
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
