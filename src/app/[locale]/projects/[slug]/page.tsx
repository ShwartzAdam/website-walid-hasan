import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { TrackView } from "@/components/TrackView";
import { ProjectCard, projectYearLabel } from "@/components/projects/ProjectCard";
import { ArrowIcon } from "@/components/ui/Icons";
import { Media } from "@/components/ui/Media";
import { PendingBadge } from "@/components/ui/PendingBadge";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { categories } from "@/content/taxonomy";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProject, getProjects, getRelatedProjects, isPending } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, href } from "@/lib/site";
import { breadcrumbSchema, projectSchema } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getProjects().map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  return pageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: `${project.title[locale]} — ${project.type[locale]}`,
    description: project.summary[locale],
    image: project.hero.src ? absoluteUrl(project.hero.src) : undefined,
    type: "article",
  });
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  const project = getProject(slug);
  if (!project) notFound();
  const dict = getDictionary(locale);
  const related = getRelatedProjects(project, 3);

  const facts: [string, string][] = [
    [dict.common.location, project.location[locale]],
    [dict.common.client, project.client?.[locale] ?? dict.common.toBeConfirmed],
    [dict.common.year, projectYearLabel(project, locale) ?? dict.common.toBeConfirmed],
    [dict.common.category, project.categories.map((c) => categories[c][locale]).join(" · ")],
    [dict.common.scope, project.type[locale]],
  ];

  const sections = [
    { id: "challenge", title: dict.projects.challenge, body: project.challenge?.[locale] },
    { id: "execution", title: dict.projects.execution, body: project.execution?.[locale] },
    { id: "results", title: dict.projects.results, body: project.result?.[locale] },
  ].filter((s): s is { id: string; title: string; body: string } => !!s.body);

  return (
    <>
      <TrackView event="project_view" params={{ project: project.slug, locale }} />
      <PageHero locale={locale} eyebrow={project.type[locale]} title={project.title[locale]} image={project.hero}>
        <PendingBadge verification={project.verification} locale={locale} className="mt-6" />
      </PageHero>

      {/* Project information */}
      <section className="border-b border-sand bg-paper">
        <div className="container-x">
          <dl className="grid grid-cols-2 gap-x-6 md:grid-cols-5">
            {facts.map(([label, value]) => (
              <div key={label} className="border-t border-sand py-6 pe-4 md:border-t-0">
                <dt className="text-xs tracking-[0.16em] text-steel uppercase rtl:tracking-normal">{label}</dt>
                <dd className="mt-2 font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Overview + statistics */}
      <section className="bg-paper py-20 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <h2 className="eyebrow text-steel">{dict.projects.overview}</h2>
          </Reveal>
          <div className="md:col-span-9">
            <Reveal>
              <p className="font-display text-[clamp(1.5rem,3vw,2.75rem)] leading-snug font-semibold">
                {project.description[locale]}
              </p>
            </Reveal>
            {project.statistics.length > 0 && (
              <dl className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
                {project.statistics.map((s) => (
                  <Reveal key={s.label.en} className="flex flex-col border-t border-ink pt-4">
                    <dt className="order-2 mt-2 text-sm text-steel">{s.label[locale]}</dt>
                    <dd className="order-1 font-display text-5xl font-bold tabular-nums">{s.value}</dd>
                  </Reveal>
                ))}
              </dl>
            )}
          </div>
        </div>
      </section>

      {/* Challenge / Execution / Results */}
      {sections.length > 0 && (
        <section className="bg-concrete py-20 md:py-28">
          <div className="container-x divide-y divide-sand">
            {sections.map((s) => (
              <Reveal key={s.id} className="grid gap-6 py-10 md:grid-cols-12">
                <h2 className="font-display text-2xl font-bold md:col-span-3">{s.title}</h2>
                <p className="text-lg leading-relaxed text-steel md:col-span-8 md:col-start-5">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Scope of work */}
      <section className="bg-ink py-20 text-paper md:py-28">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <h2 className="font-display text-headline font-bold">{dict.projects.scopeOfWork}</h2>
          </Reveal>
          <ol className="md:col-span-7 md:col-start-6">
            {project.scope[locale].map((item, i) => (
              <li key={item} className="border-b border-graphite">
                <Reveal delay={i * 0.05} className="flex items-baseline gap-6 py-5 text-xl">
                  <span className="text-xs text-stone tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery */}
      {project.images.length > 0 && (
        <section className="bg-paper py-20 md:py-28">
          <div className="container-x">
            <h2 className="eyebrow mb-10 text-steel">{dict.projects.gallery}</h2>
            <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
              {project.images.map((img, i) => (
                <li key={i} className={i % 3 === 0 ? "md:col-span-2" : ""}>
                  <ImageReveal>
                    <Media
                      image={img}
                      locale={locale}
                      sizes={i % 3 === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                      className={i % 3 === 0 ? "aspect-[16/9] w-full" : "aspect-[4/5] w-full"}
                    />
                  </ImageReveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-sand bg-paper py-20 md:py-28">
          <div className="container-x">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-title font-bold">{dict.projects.related}</h2>
              <Link href={href(locale, "/projects")} className="inline-flex items-center gap-2 text-sm font-semibold hover:text-signal-deep">
                {dict.common.allProjects}
                <ArrowIcon />
              </Link>
            </div>
            <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} locale={locale} pending={isPending(p)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta locale={locale} headline={dict.projects.ctaHeadline} fullScreen={false} label="project_detail_cta" />

      <JsonLd
        data={[
          projectSchema(project, locale),
          breadcrumbSchema([
            { name: dict.nav.home, path: href(locale) },
            { name: dict.nav.projects, path: href(locale, "/projects") },
            { name: project.title[locale], path: href(locale, `/projects/${project.slug}`) },
          ]),
        ]}
      />
    </>
  );
}
