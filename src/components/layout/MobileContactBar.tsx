"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { telHref, whatsappHref } from "@/lib/contact-links";
import { href, stripLocale } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";

/**
 * Sticky mobile CTA (PRD §12): WhatsApp, call and project inquiry always in reach.
 * On the contact page the form is already on screen, so only WhatsApp and call remain.
 */
export function MobileContactBar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const onContact = stripLocale(usePathname() ?? "/").startsWith("/contact");
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 grid ${onContact ? "grid-cols-2" : "grid-cols-[auto_auto_1fr]"} gap-px border-t border-graphite bg-graphite pb-[env(safe-area-inset-bottom)] md:hidden`}
    >
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 items-center justify-center gap-2 bg-ink px-5 text-sm font-semibold text-paper"
      >
        <WhatsAppIcon className="text-[#25D366]" />
        <span>{dict.common.whatsapp}</span>
      </a>
      <a href={telHref()} className="flex min-h-14 items-center justify-center gap-2 bg-ink px-5 text-sm font-semibold text-paper">
        <PhoneIcon />
        <span>{dict.common.call}</span>
      </a>
      {!onContact && (
        <Link
          href={href(locale, "/contact")}
          data-track="cta_click"
          data-track-label="mobile_bar_start_project"
          className="flex min-h-14 items-center justify-center bg-signal px-4 text-sm font-bold text-ink"
        >
          {dict.nav.startProject}
        </Link>
      )}
    </div>
  );
}
