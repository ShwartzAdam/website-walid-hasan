import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Media } from "@/components/ui/Media";
import { PendingBadge } from "@/components/ui/PendingBadge";
import { Reveal } from "@/components/ui/Reveal";
import { approach, leadership, story, storyImage, timeline, values, valuesVerification } from "@/content/company";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCapabilities, getCredentials, isPublishable } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { href } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "/about", title: dict.meta.about.title, description: dict.meta.about.description });
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Reveal className="md:col-span-3">
      <h2 className="eyebrow text-steel">{children}</h2>
    </Reveal>
  );
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = (await params).locale as Locale;
  const dict = getDictionary(locale);
  const people = leadership.filter(isPublishable);
  const history = timeline.filter(isPublishable);
  const credentials = getCredentials();
  const showValues = isPublishable({ verification: valuesVerification });

  return (
    <>
      <PageHero locale={locale} eyebrow={dict.nav.about} title={dict.about.heroHeadline} image={storyImage} />

      {/* Company */}
      <section className="bg-paper py-20 md:py-32">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <SectionLabel>{dict.about.companyTitle}</SectionLabel>
          <div className="md:col-span-8">
            <Reveal>
              <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-snug font-semibold">{story.summary[locale]}</p>
            </Reveal>
            <PendingBadge verification={story.verification} locale={locale} className="mt-6" />
          </div>
        </div>
      </section>

      {/* History */}
      {history.length > 0 && (
        <section className="bg-concrete py-20 md:py-28">
          <div className="container-x grid gap-10 md:grid-cols-12">
            <SectionLabel>{dict.about.historyTitle}</SectionLabel>
            <ol className="relative md:col-span-9">
              {history.map((t, i) => (
                <li key={i} className="grid gap-4 border-t border-sand py-8 md:grid-cols-9">
                  <p dir="ltr" className="font-display text-4xl font-bold text-signal-deep tabular-nums md:col-span-2 rtl:text-end">
                    {t.year}
                  </p>
                  <div className="md:col-span-7">
                    <h3 className="font-display text-2xl font-bold">{t.title[locale]}</h3>
                    <p className="mt-2 text-steel">{t.body[locale]}</p>
                    <PendingBadge verification={t.verification} locale={locale} className="mt-3" />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Leadership */}
      {people.length > 0 && (
        <section className="bg-paper py-20 md:py-28">
          <div className="container-x grid gap-10 md:grid-cols-12">
            <SectionLabel>{dict.about.leadershipTitle}</SectionLabel>
            <ul className="grid gap-10 sm:grid-cols-2 md:col-span-9 lg:grid-cols-3">
              {people.map((p) => (
                <li key={p.id}>
                  <Media image={p.image} locale={locale} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[3/4] w-full" />
                  <h3 className="mt-5 font-display text-2xl font-bold">{p.name[locale]}</h3>
                  <p className="text-steel">{p.role[locale]}</p>
                  {p.bio && <p className="mt-3 text-sm text-steel">{p.bio[locale]}</p>}
                  <PendingBadge verification={p.verification} locale={locale} className="mt-3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Approach */}
      <section className="bg-ink py-20 text-paper md:py-28">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <h2 className="eyebrow text-stone">{dict.about.approachTitle}</h2>
          </Reveal>
          <ol className="grid gap-px bg-graphite md:col-span-9 md:grid-cols-3">
            {approach.map((a, i) => (
              <li key={i} className="bg-ink p-6 md:p-8">
                <Reveal delay={i * 0.08}>
                  <p className="text-xs text-stone tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-6 font-display text-2xl font-bold">{a.title[locale]}</h3>
                  <p className="mt-3 text-sand">{a.body[locale]}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <SectionLabel>{dict.about.experienceTitle}</SectionLabel>
          <div className="md:col-span-9">
            <ul className="flex flex-wrap gap-2">
              {getCapabilities().map((c) => (
                <li key={c.id}>
                  <Link
                    href={href(locale, `/capabilities/${c.id}`)}
                    className="block border border-sand px-5 py-3 font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    {c.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
            {credentials.length > 0 && (
              <dl className="mt-12 grid gap-px bg-sand sm:grid-cols-3">
                {credentials.map((c) => (
                  <div key={c.id} className="bg-paper py-6 pe-6">
                    <dt className="text-sm text-steel">{c.label[locale]}</dt>
                    <dd dir="ltr" className="mt-2 font-display text-4xl font-bold tabular-nums rtl:text-end">
                      {c.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </section>

      {/* Values — only those demonstrable in practice (PRD §9) */}
      {showValues && (
        <section className="border-t border-sand bg-paper py-20 md:py-28">
          <div className="container-x grid gap-10 md:grid-cols-12">
            <SectionLabel>{dict.about.valuesTitle}</SectionLabel>
            <div className="md:col-span-9">
              <ul className="grid gap-10 md:grid-cols-3">
                {values.map((v, i) => (
                  <li key={i}>
                    <Reveal delay={i * 0.08}>
                      <h3 className="font-display text-3xl font-bold">{v.title[locale]}</h3>
                      <p className="mt-3 text-steel">{v.body[locale]}</p>
                    </Reveal>
                  </li>
                ))}
              </ul>
              <PendingBadge verification={valuesVerification} locale={locale} className="mt-8" />
            </div>
          </div>
        </section>
      )}

      <FinalCta locale={locale} fullScreen={false} label="about_cta" />
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.nav.home, path: href(locale) },
          { name: dict.nav.about, path: href(locale, "/about") },
        ])}
      />
    </>
  );
}
