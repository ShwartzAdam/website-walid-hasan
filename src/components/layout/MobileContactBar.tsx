import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { telHref, whatsappHref } from "@/lib/contact-links";
import { href } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";

/** Sticky mobile CTA (PRD §12): WhatsApp, call and project inquiry always in reach. */
export function MobileContactBar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_auto_1fr] gap-px border-t border-graphite bg-graphite pb-[env(safe-area-inset-bottom)] md:hidden">
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 items-center gap-2 bg-ink px-5 text-sm font-semibold text-paper"
      >
        <WhatsAppIcon className="text-[#25D366]" />
        <span>{dict.common.whatsapp}</span>
      </a>
      <a href={telHref()} className="flex min-h-14 items-center gap-2 bg-ink px-5 text-sm font-semibold text-paper">
        <PhoneIcon />
        <span>{dict.common.call}</span>
      </a>
      <Link
        href={href(locale, "/contact")}
        data-track="cta_click"
        data-track-label="mobile_bar_start_project"
        className="flex min-h-14 items-center justify-center bg-signal px-4 text-sm font-bold text-ink"
      >
        {dict.nav.startProject}
      </Link>
    </div>
  );
}
