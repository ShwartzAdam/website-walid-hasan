import Link from "next/link";
import type { Project } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { isPending } from "@/lib/content";
import { href } from "@/lib/site";
import { ArrowIcon } from "@/components/ui/Icons";
import { Media } from "@/components/ui/Media";
import { PendingBadge } from "@/components/ui/PendingBadge";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { projectYearLabel } from "./ProjectCard";

/** Large editorial project block (PRD §6.4). Alternates image side for rhythm. */
export function ProjectFeature({ project, locale, index }: { project: Project; locale: Locale; index: number }) {
  const dict = getDictionary(locale);
  const flip = index % 2 === 1;
  const stat = project.statistics[0];
  const year = projectYearLabel(project, locale);
  return (
    <article className="grid items-end gap-8 md:grid-cols-12 md:gap-12">
      <ImageReveal className={`relative md:col-span-8 ${flip ? "md:order-2" : ""}`}>
        <Link href={href(locale, `/projects/${project.slug}`)} className="group block overflow-hidden" tabIndex={-1} aria-hidden>
          <Media
            image={project.hero}
            locale={locale}
            sizes="(min-width: 768px) 66vw, 100vw"
            className="aspect-[16/10] w-full transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.03]"
          />
        </Link>
        {isPending(project) && (
          <PendingBadge verification={project.verification} locale={locale} className="absolute start-3 top-3" />
        )}
      </ImageReveal>
      <Reveal className={`md:col-span-4 ${flip ? "md:order-1" : ""}`}>
        <p className="font-display text-6xl font-bold text-signal tabular-nums md:text-7xl">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-4 font-display text-title font-bold uppercase rtl:normal-case">
          <Link href={href(locale, `/projects/${project.slug}`)} className="hover:text-signal-deep">
            {project.title[locale]}
          </Link>
        </h3>
        <dl className="mt-5 space-y-1 text-sm text-steel">
          <div className="flex gap-2">
            <dt className="sr-only">{dict.common.category}</dt>
            <dd className="font-semibold text-ink">{project.type[locale]}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="sr-only">{dict.common.location}</dt>
            <dd>{project.location[locale]}</dd>
            {year && (
              <>
                <span aria-hidden>·</span>
                <dt className="sr-only">{dict.common.year}</dt>
                <dd className="tabular-nums">{year}</dd>
              </>
            )}
          </div>
        </dl>
        {stat && (
          <p className="mt-6 border-t border-sand pt-4">
            <span className="font-display text-3xl font-bold tabular-nums">{stat.value}</span>{" "}
            <span className="text-sm text-steel">{stat.label[locale]}</span>
          </p>
        )}
        <p className="mt-4 max-w-sm text-steel">{project.summary[locale]}</p>
        <Link
          href={href(locale, `/projects/${project.slug}`)}
          className="mt-6 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold hover:border-signal hover:text-signal-deep"
        >
          {dict.common.viewProject}
          <ArrowIcon />
        </Link>
      </Reveal>
    </article>
  );
}
