import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PendingBadge } from "@/components/ui/PendingBadge";
import { Reveal } from "@/components/ui/Reveal";
import { equipmentCategories } from "@/content/taxonomy";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCapabilities, getCapability, getProjectsForCapability, isPending } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { href, siteUrl } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getCapabilities().map((c) => ({ locale, slug: c.id })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/capabilities/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const capability = getCapability(slug);
  if (!isLocale(locale) || !capability) return {};
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: `/capabilities/${slug}`,
    title: `${capability.title[locale]} — ${dict.nav.capabilities}`,
    description: capability.description[locale],
  });
}

export default async function CapabilityPage({ params }: PageProps<"/[locale]/capabilities/[slug]">) {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  const capability = getCapability(slug);
  if (!capability) notFound();
  const dict = getDictionary(locale);
  const projects = getProjectsForCapability(capability.id).slice(0, 3);

  return (
    <>
      <PageHero locale={locale} eyebrow={dict.nav.capabilities} title={capability.title[locale]} image={capability.image}>
        <PendingBadge verification={capability.verification} locale={locale} className="mt-6" />
      </PageHero>

      <section className="bg-paper py-20 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-8">
            <p className="font-display text-[clamp(1.5rem,3vw,2.75rem)] leading-snug font-semibold">
              {capability.description[locale]}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-20 text-paper md:py-28">
        <div className="container-x grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="eyebrow mb-8 text-stone">{dict.capabilities.scopeTitle}</h2>
            <ol>
              {capability.scope[locale].map((item, i) => (
                <li key={item} className="border-b border-graphite">
                  <Reveal delay={i * 0.05} className="flex items-baseline gap-6 py-5 text-xl md:text-2xl">
                    <span className="text-xs text-stone tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {item}
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <h2 className="eyebrow mb-8 text-stone">{dict.capabilities.equipmentTitle}</h2>
            <ul className="flex flex-wrap gap-2">
              {capability.equipment.map((e) => (
                <li key={e} className="border border-graphite px-4 py-2 text-sm text-sand">
                  {equipmentCategories[e][locale]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="bg-paper py-20 md:py-28">
          <div className="container-x">
            <h2 className="mb-12 font-display text-title font-bold">{dict.capabilities.relatedProjectsTitle}</h2>
            <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} locale={locale} pending={isPending(p)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta locale={locale} headline={dict.capabilities.ctaHeadline} fullScreen={false} label={`capability_${capability.id}_cta`} />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: capability.title[locale],
            description: capability.description[locale],
            serviceType: capability.title.en,
            areaServed: { "@type": "Country", name: "Israel" },
            provider: { "@id": `${siteUrl}/#organization` },
          },
          breadcrumbSchema([
            { name: dict.nav.home, path: href(locale) },
            { name: dict.nav.capabilities, path: href(locale, "/capabilities") },
            { name: capability.title[locale], path: href(locale, `/capabilities/${capability.id}`) },
          ]),
        ]}
      />
    </>
  );
}
