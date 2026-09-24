import Link from "next/link";
import type { Project } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/lib/site";
import { ArrowIcon } from "@/components/ui/Icons";
import { Media } from "@/components/ui/Media";
import { PendingTag } from "@/components/ui/PendingTag";

/** "2023", "2025 — Ongoing", or null when the year is not yet confirmed. */
export function projectYearLabel(project: Project, locale: Locale): string | null {
  const dict = getDictionary(locale);
  if (project.ongoing) return project.year ? `${project.year} — ${dict.common.ongoing}` : dict.common.ongoing;
  return project.year ? String(project.year) : null;
}

/** Grid card used on listings and related-project rows. Client-safe. */
export function ProjectCard({
  project,
  locale,
  pending,
  tone = "light",
}: {
  project: Project;
  locale: Locale;
  pending: boolean;
  tone?: "light" | "dark";
}) {
  const muted = tone === "dark" ? "text-stone" : "text-steel";
  return (
    <Link href={href(locale, `/projects/${project.slug}`)} className="group block">
      <div className="relative overflow-hidden">
        <Media
          image={project.hero}
          locale={locale}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[4/3] w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
        />
        {pending && <PendingTag locale={locale} className="absolute start-3 top-3" />}
      </div>
      <div className="flex items-start justify-between gap-4 pt-5">
        <div>
          <p className={`text-xs ${muted}`}>
            {[project.location[locale], projectYearLabel(project, locale)].filter(Boolean).join(" · ")}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold">{project.title[locale]}</h3>
          <p className={`mt-1 text-sm ${muted}`}>{project.type[locale]}</p>
        </div>
        <ArrowIcon className="mt-1 h-5 w-5 shrink-0 transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      </div>
    </Link>
  );
}
