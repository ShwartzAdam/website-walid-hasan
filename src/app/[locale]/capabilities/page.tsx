import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ArrowIcon } from "@/components/ui/Icons";
import { Media } from "@/components/ui/Media";
import { PendingBadge } from "@/components/ui/PendingBadge";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCapabilities } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { href } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/capabilities">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/capabilities",
    title: dict.meta.capabilities.title,
    description: dict.meta.capabilities.description,
  });
}

export default async function CapabilitiesPage({ params }: PageProps<"/[locale]/capabilities">) {
  const locale = (await params).locale as Locale;
  const dict = getDictionary(locale);
  const capabilities = getCapabilities();

  return (
    <>
      <PageHero locale={locale} eyebrow={dict.nav.capabilities} title={dict.capabilities.heroHeadline} body={dict.capabilities.heroBody} />
      <section className="bg-paper py-20 md:py-32">
        <ul className="container-x space-y-20 md:space-y-32">
          {capabilities.map((c, i) => (
            <li key={c.id} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
              <ImageReveal className={`relative md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
                <Link href={href(locale, `/capabilities/${c.id}`)} tabIndex={-1} aria-hidden className="block">
                  <Media image={c.image} locale={locale} sizes="(min-width: 768px) 58vw, 100vw" className="aspect-[16/10] w-full" />
                </Link>
              </ImageReveal>
              <Reveal className={`md:col-span-5 ${i % 2 ? "md:order-1" : ""}`}>
                <p className="text-xs text-steel tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 font-display text-headline font-bold uppercase rtl:normal-case">
                  <Link href={href(locale, `/capabilities/${c.id}`)} className="hover:text-signal-deep">
                    {c.title[locale]}
                  </Link>
                </h2>
                <p className="mt-6 text-lg text-steel">{c.description[locale]}</p>
                <PendingBadge verification={c.verification} locale={locale} className="mt-4" />
                <Link
                  href={href(locale, `/capabilities/${c.id}`)}
                  className="mt-8 flex w-fit items-center gap-2 border-b border-ink pb-1 font-semibold hover:border-signal hover:text-signal-deep"
                >
                  {dict.common.learnMore}
                  <ArrowIcon />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <FinalCta locale={locale} fullScreen={false} label="capabilities_cta" />
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.nav.home, path: href(locale) },
          { name: dict.nav.capabilities, path: href(locale, "/capabilities") },
        ])}
      />
    </>
  );
}
