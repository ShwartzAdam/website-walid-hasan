import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/FinalCta";
import { CapabilitiesShowcase } from "@/components/home/CapabilitiesShowcase";
import { EquipmentGallery } from "@/components/home/EquipmentGallery";
import { Hero } from "@/components/home/Hero";
import { ProjectMap } from "@/components/home/ProjectMap";
import { StatCounter } from "@/components/home/StatCounter";
import { BuildStory } from "@/components/story/BuildStory";
import { ProjectFeature } from "@/components/projects/ProjectFeature";
import { ArrowIcon } from "@/components/ui/Icons";
import { Media } from "@/components/ui/Media";
import { PendingBadge } from "@/components/ui/PendingBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { heroMedia, story, storyImage } from "@/content/company";
import { categories, equipmentCategories } from "@/content/taxonomy";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getCapabilities,
  getClients,
  getCredentials,
  getEquipment,
  getFeaturedProjects,
  getProjects,
  getStats,
  getTestimonials,
  isPending,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { href } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/",
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  const featured = getFeaturedProjects(4);
  const allProjects = getProjects();
  const capabilities = getCapabilities();
  const stats = getStats();
  const credentials = getCredentials();
  const equipment = getEquipment();
  const clients = getClients();
  const testimonials = getTestimonials();

  const mapProjects = allProjects
    .filter((p) => p.coordinates)
    .map((p) => ({
      slug: p.slug,
      title: p.title[locale],
      location: p.location[locale],
      category: categories[p.categories[0]][locale],
      coordinates: p.coordinates!,
      image: p.hero,
    }));

  return (
    <>
      {/* 6.1 Hero — best available hero asset (drone video → photo → generated) */}
      <Hero locale={locale} image={heroMedia.image} video={heroMedia.video} />

      {/* 6.2 Intro */}
      <section id="intro" className="bg-paper py-28 md:py-44">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow text-steel">{dict.home.introEyebrow}</p>
          </Reveal>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="font-display text-headline font-bold tracking-display">{dict.home.introHeadline}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-steel md:text-xl">{dict.home.introBody}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core visual story: GROUND → INFRASTRUCTURE → DEVELOPMENT → COMMUNITY */}
      <BuildStory locale={locale} />

      {/* 6.3 Capabilities */}
      {capabilities.length > 0 && (
        <section className="bg-ink py-24 text-paper md:py-36">
          <div className="container-x">
            <SectionHeading eyebrow={dict.home.capabilitiesEyebrow} title={dict.home.capabilitiesHeadline} className="mb-14 md:mb-20" />
            <CapabilitiesShowcase
              locale={locale}
              items={capabilities.map(({ id, title, short, image }) => ({ id, title, short, image }))}
            />
          </div>
        </section>
      )}

      {/* 6.4 Selected projects */}
      {featured.length > 0 && (
        <section className="bg-paper py-24 md:py-36">
          <div className="container-x">
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
              <SectionHeading eyebrow={dict.home.projectsEyebrow} title={dict.home.projectsHeadline} />
              <Link href={href(locale, "/projects")} className="btn btn-ghost-dark">
                {dict.common.allProjects}
                <ArrowIcon />
              </Link>
            </div>
            <div className="space-y-20 md:space-y-28">
              {featured.map((project, i) => (
                <ProjectFeature key={project.slug} project={project} locale={locale} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6.5 Numbers */}
      {stats.length > 0 && (
        <section className="border-t border-sand bg-concrete py-24 md:py-32">
          <div className="container-x">
            <Reveal>
              <p className="eyebrow mb-14 text-steel">{dict.home.numbersEyebrow}</p>
            </Reveal>
            <dl className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((s, i) => (
                <Reveal key={s.id} delay={i * 0.08} className="flex flex-col items-start border-t border-ink pt-6">
                  <dt className="order-2 mt-3 text-steel">{s.label[locale]}</dt>
                  <dd className="order-1 font-display text-[clamp(3rem,6vw,5.5rem)] leading-none font-bold">
                    <StatCounter value={s.value} raw={s.raw} suffix={s.suffix} locale={locale} />
                  </dd>
                  <PendingBadge verification={s.verification} locale={locale} className="order-3 mt-4" />
                </Reveal>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* 6.6 Project map */}
      {mapProjects.length > 0 && (
        <section className="bg-ink py-24 text-paper md:py-36">
          <div className="container-x">
            <SectionHeading eyebrow={dict.home.mapEyebrow} title={dict.home.mapHeadline} className="mb-14" />
            <ProjectMap locale={locale} projects={mapProjects} />
          </div>
        </section>
      )}

      {/* 6.7 Equipment */}
      {equipment.length > 0 && (
        <section className="border-t border-graphite bg-ink py-24 text-paper md:py-36">
          <div className="container-x">
            <div className="mb-6 grid gap-6 md:grid-cols-12">
              <SectionHeading eyebrow={dict.home.equipmentEyebrow} title={dict.home.equipmentHeadline} className="md:col-span-7" />
              <Reveal className="self-end md:col-span-5">
                <p className="text-lg text-sand">{dict.home.equipmentBody}</p>
              </Reveal>
            </div>
            <EquipmentGallery
              locale={locale}
              items={equipment.map((e) => ({
                id: e.id,
                name: e.name,
                quantity: e.quantity,
                model: [e.manufacturer, e.model].filter(Boolean).join(" ") || undefined,
                image: e.image,
                pending: isPending(e),
                categoryLabel: equipmentCategories[e.category][locale],
              }))}
            />
          </div>
        </section>
      )}

      {/* 6.8 Company story */}
      <section className="bg-paper py-24 md:py-36">
        <div className="container-x grid items-center gap-12 md:grid-cols-12">
          <Reveal className="relative md:col-span-6">
            <Media image={storyImage} locale={locale} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/5] w-full" />
          </Reveal>
          <div className="md:col-span-5 md:col-start-8">
            <SectionHeading eyebrow={dict.home.storyEyebrow} title={dict.home.storyHeadline} />
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-steel">{story.summary[locale]}</p>
              <PendingBadge verification={story.verification} locale={locale} className="mt-4" />
              <Link
                href={href(locale, "/about")}
                className="mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 font-semibold hover:border-signal hover:text-signal-deep"
              >
                {dict.common.learnMore}
                <ArrowIcon />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6.9 Certifications & registration */}
      {credentials.length > 0 && (
        <section className="bg-concrete py-24 md:py-32">
          <div className="container-x">
            <SectionHeading eyebrow={dict.home.credentialsEyebrow} title={dict.home.credentialsHeadline} className="mb-14" />
            <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {credentials.map((c, i) => (
                <li key={c.id} className="border-t border-ink/15 py-8">
                  <Reveal delay={i * 0.08}>
                    <p className="text-sm text-steel">{c.label[locale]}</p>
                    <p dir="ltr" className="mt-4 text-start font-display text-6xl font-bold tabular-nums rtl:text-end">
                      {c.value}
                    </p>
                    {c.detail && <p className="mt-3 text-sm text-steel">{c.detail[locale]}</p>}
                    <PendingBadge verification={c.verification} locale={locale} className="mt-4" />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Testimonials — only real quotes with permission */}
      {testimonials.length > 0 && (
        <section className="bg-ink py-24 text-paper md:py-32">
          <div className="container-x">
            <p className="eyebrow mb-12 text-stone">{dict.home.testimonialsEyebrow}</p>
            <ul className="grid gap-12 md:grid-cols-2">
              {testimonials.map((t) => (
                <li key={t.id}>
                  <figure>
                    <blockquote className="font-display text-2xl leading-snug font-semibold md:text-3xl">“{t.quote[locale]}”</blockquote>
                    <figcaption className="mt-6 text-sm text-sand">
                      <span className="font-semibold text-paper">{t.name}</span> · {t.position[locale]}, {t.company[locale]}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 6.10 Clients — only organizations with confirmed permission */}
      {clients.length > 0 && (
        <section className="bg-paper py-20">
          <div className="container-x">
            <p className="eyebrow mb-10 text-steel">{dict.home.clientsEyebrow}</p>
            <ul className="grid grid-cols-2 gap-px bg-sand sm:grid-cols-3 lg:grid-cols-6">
              {clients.map((c) => (
                <li key={c.id} className="flex aspect-[3/2] items-center justify-center bg-paper p-6 text-center text-sm text-steel">
                  {c.logo ? <Media image={c.logo} locale={locale} sizes="200px" className="h-full w-full" tone="light" /> : c.name[locale]}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 6.11 Final CTA */}
      <FinalCta locale={locale} />
    </>
  );
}
