import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { PendingBadge } from "@/components/ui/PendingBadge";
import { contact } from "@/content/company";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { mailHref, telHref, whatsappHref } from "@/lib/contact-links";
import { pageMetadata } from "@/lib/seo";
import { href } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "/contact", title: dict.meta.contact.title, description: dict.meta.contact.description });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  const dict = getDictionary(locale);
  const t = dict.contact;
  const mapQuery = contact.coordinates ? contact.coordinates.join(",") : null;

  const direct = [
    { href: whatsappHref(), label: dict.common.whatsapp, value: contact.phoneDisplay, icon: <WhatsAppIcon />, external: true },
    { href: telHref(), label: dict.common.call, value: contact.phoneDisplay, icon: <PhoneIcon />, ltr: true },
    { href: mailHref(), label: dict.common.email, value: contact.email, icon: <MailIcon />, ltr: true },
  ];

  return (
    <>
      <PageHero locale={locale} eyebrow={dict.nav.contact} title={t.headline} body={t.body} />

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="mb-10 font-display text-title font-bold">{t.formTitle}</h2>
            <ContactForm locale={locale} />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <h2 className="eyebrow mb-6 text-steel">{t.directTitle}</h2>
              <ul className="divide-y divide-sand border-y border-sand">
                {direct.map((d) => (
                  <li key={d.label}>
                    <a
                      href={d.href}
                      {...(d.external && { target: "_blank", rel: "noopener noreferrer" })}
                      className="group flex items-center gap-4 py-5 hover:text-signal-deep"
                    >
                      <span className="flex h-11 w-11 items-center justify-center bg-ink text-paper group-hover:bg-signal group-hover:text-ink">
                        {d.icon}
                      </span>
                      <span>
                        <span className="block text-sm text-steel">{d.label}</span>
                        <span className="block font-semibold" dir={d.ltr ? "ltr" : undefined}>
                          {d.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <h2 className="eyebrow mt-12 mb-4 text-steel">{t.officeTitle}</h2>
              <p className="flex items-start gap-3">
                <PinIcon className="mt-0.5 shrink-0" />
                {contact.address[locale]}
              </p>
              <h2 className="eyebrow mt-10 mb-4 text-steel">{t.hoursTitle}</h2>
              <p>{contact.hours[locale]}</p>
              <PendingBadge verification={contact.verification} locale={locale} className="mt-6" />

              {mapQuery && (
                <iframe
                  title={t.officeTitle}
                  src={`https://maps.google.com/maps?q=${mapQuery}&z=14&hl=${locale}&output=embed`}
                  className="mt-10 aspect-[4/3] w-full border-0 grayscale"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
          </aside>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: dict.nav.home, path: href(locale) },
          { name: dict.nav.contact, path: href(locale, "/contact") },
        ])}
      />
    </>
  );
}
