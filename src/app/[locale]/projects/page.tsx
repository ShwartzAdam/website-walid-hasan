import type { Metadata } from "next";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProjects, isPending } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { href } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "/projects", title: dict.meta.projects.title, description: dict.meta.projects.description });
}

export default async function ProjectsPage({ params }: PageProps<"/[locale]/projects">) {
  const locale = (await params).locale as Locale;
  const dict = getDictionary(locale);
  const projects = getProjects();

  return (
    <>
      <PageHero locale={locale} title={dict.projects.heroHeadline} body={dict.projects.heroBody} />
      <section className="bg-paper py-12 md:py-16">
        <div className="container-x">
          <ProjectsExplorer
            locale={locale}
            projects={projects}
            pendingSlugs={projects.filter(isPending).map((p) => p.slug)}
          />
        </div>
      </section>
      <FinalCta locale={locale} headline={dict.projects.ctaHeadline} fullScreen={false} label="projects_cta" />
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.nav.home, path: href(locale) },
          { name: dict.nav.projects, path: href(locale, "/projects") },
        ])}
      />
    </>
  );
}
