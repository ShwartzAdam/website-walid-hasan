import Link from "next/link";
import { company, contact } from "@/content/company";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { mailHref, telHref, whatsappHref } from "@/lib/contact-links";
import { href } from "@/lib/site";
import { LogoMark } from "@/components/ui/Logo";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();
  const social = Object.entries(contact.social).filter(([, url]) => !!url);
  return (
    <footer className="bg-ink pb-24 text-sand md:pb-0">
      <div className="container-x grid gap-12 border-t border-graphite py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="flex items-center gap-3 font-display text-3xl font-bold text-paper">
            <LogoMark className="h-10 w-10" />
            {dict.common.brand}
          </p>
          <p className="mt-3 text-sm text-stone">{company.legalName[locale]}</p>
          <dl className="mt-6 space-y-1 text-sm">
            <div className="flex gap-2">
              <dt>{dict.footer.companyNumberLabel}:</dt>
              <dd dir="ltr" className="text-paper tabular-nums">{company.companyNumber}</dd>
            </div>
            <div className="flex gap-2">
              <dt>{dict.footer.licenseLabel}:</dt>
              <dd dir="ltr" className="text-paper tabular-nums">{company.licenseNumber}</dd>
            </div>
          </dl>
        </div>
        <nav className="md:col-span-3" aria-label={dict.footer.explore}>
          <p className="eyebrow mb-5 text-stone">{dict.footer.explore}</p>
          <ul className="space-y-3 text-sm">
            {(["projects", "capabilities", "about", "contact"] as const).map((key) => (
              <li key={key}>
                <Link href={href(locale, `/${key}`)} className="hover:text-signal">
                  {dict.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="eyebrow mb-5 text-stone">{dict.footer.contact}</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={telHref()} className="hover:text-signal" dir="ltr">
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="hover:text-signal">
                {dict.common.whatsapp}
              </a>
            </li>
            <li>
              <a href={mailHref()} className="hover:text-signal">
                {contact.email}
              </a>
            </li>
            <li className="text-stone">{contact.address[locale]}</li>
          </ul>
          {social.length > 0 && (
            <ul className="mt-6 flex gap-4 text-sm">
              {social.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-signal">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-graphite py-6 text-xs text-stone sm:flex-row sm:justify-between">
        <p>
          © {year} {company.legalName[locale]}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
