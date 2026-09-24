import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { telHref, whatsappHref } from "@/lib/contact-links";
import { href } from "@/lib/site";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

/** Closing call to action (PRD §6.11) — every page ends by leading to contact (§22). */
export function FinalCta({
  locale,
  headline,
  body,
  fullScreen = true,
  label = "final_cta",
}: {
  locale: Locale;
  headline?: string;
  body?: string;
  fullScreen?: boolean;
  label?: string;
}) {
  const dict = getDictionary(locale);
  return (
    <section
      className={`survey-grid relative flex items-center overflow-hidden bg-ink text-paper ${
        fullScreen ? "min-h-svh" : "py-28 md:py-40"
      }`}
    >
      <div className="container-x relative py-24">
        <Reveal>
          <h2 className="max-w-5xl font-display text-display font-extrabold tracking-display">
            {headline ?? dict.home.finalHeadline}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-xl text-sand md:text-2xl">{body ?? dict.home.finalBody}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-12 flex flex-wrap gap-3">
          <Link
            href={href(locale, "/contact")}
            className="btn btn-primary"
            data-track="cta_click"
            data-track-label={label}
          >
            {dict.nav.startProject}
            <ArrowIcon />
          </Link>
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
            <WhatsAppIcon />
            {dict.common.whatsapp}
          </a>
          <a href={telHref()} className="btn btn-ghost-light">
            <PhoneIcon />
            {dict.common.call}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
