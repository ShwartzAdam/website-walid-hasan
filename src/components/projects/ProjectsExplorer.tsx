"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import type { CategoryId, Project, RegionId } from "@/content/types";
import { categories, regions } from "@/content/taxonomy";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { track } from "@/lib/analytics";
import { ProjectCard } from "./ProjectCard";

type Filters = { region: RegionId | ""; category: CategoryId | ""; year: string };
const EMPTY: Filters = { region: "", category: "", year: "" };

/**
 * Filterable project grid (PRD §7): location, category, year.
 * Filters are mirrored into the query string so a filtered view can be shared.
 */
export function ProjectsExplorer({
  locale,
  projects,
  pendingSlugs,
}: {
  locale: Locale;
  projects: Project[];
  pendingSlugs: string[];
}) {
  const dict = getDictionary(locale);
  const [filters, setFilters] = useState<Filters>(EMPTY);

  // Hydrate from the URL once on mount (the page itself is statically generated).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const region = q.get("location") ?? "";
    const category = q.get("category") ?? "";
    const next: Filters = {
      region: region in regions ? (region as RegionId) : "",
      category: category in categories ? (category as CategoryId) : "",
      year: q.get("year") ?? "",
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (next.region || next.category || next.year) setFilters(next);
  }, []);

  const update = (patch: Partial<Filters>) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    const q = new URLSearchParams();
    if (next.region) q.set("location", next.region);
    if (next.category) q.set("category", next.category);
    if (next.year) q.set("year", next.year);
    const qs = q.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
    const [key, value] = Object.entries(patch)[0] ?? [];
    if (key) track("project_filter", { filter: key, value: String(value || "all"), locale });
  };

  const options = useMemo(() => {
    const regionIds = [...new Set(projects.map((p) => p.region).filter((r): r is RegionId => !!r))];
    const categoryIds = [...new Set(projects.flatMap((p) => p.categories))];
    const years = [...new Set(projects.map((p) => p.year).filter((y): y is number => !!y))].sort((a, b) => b - a);
    return { regionIds, categoryIds, years };
  }, [projects]);

  const results = projects.filter(
    (p) =>
      (!filters.region || p.region === filters.region) &&
      (!filters.category || p.categories.includes(filters.category)) &&
      (!filters.year || String(p.year) === filters.year),
  );

  const active = filters.region || filters.category || filters.year;
  const pending = new Set(pendingSlugs);

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 mb-12 border-y border-sand bg-paper/95 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8 md:top-20 xl:-mx-14 xl:px-14">
        <div className="flex flex-wrap items-end gap-3 md:gap-6">
          <FilterSelect
            label={dict.projects.filterCategory}
            value={filters.category}
            allLabel={dict.projects.filterAll}
            onChange={(v) => update({ category: v as CategoryId | "" })}
            options={options.categoryIds.map((id) => ({ value: id, label: categories[id][locale] }))}
          />
          <FilterSelect
            label={dict.projects.filterLocation}
            value={filters.region}
            allLabel={dict.projects.filterAll}
            onChange={(v) => update({ region: v as RegionId | "" })}
            options={options.regionIds.map((id) => ({ value: id, label: regions[id][locale] }))}
          />
          <FilterSelect
            label={dict.projects.filterYear}
            value={filters.year}
            allLabel={dict.projects.filterAll}
            onChange={(v) => update({ year: v })}
            options={options.years.map((y) => ({ value: String(y), label: String(y) }))}
          />
          <div className="ms-auto flex items-center gap-4 text-sm">
            <p aria-live="polite" className="text-steel">
              {dict.projects.resultsCount(results.length)}
            </p>
            {active && (
              <button type="button" onClick={() => update(EMPTY)} className="font-semibold underline underline-offset-4 hover:text-signal-deep">
                {dict.projects.clearFilters}
              </button>
            )}
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <p className="py-24 text-center text-lg text-steel">{dict.projects.noResults}</p>
      ) : (
        <motion.ul layout className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={p} locale={locale} pending={pending.has(p.slug)} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  allLabel,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  allLabel: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex min-w-[9rem] flex-1 flex-col gap-1 text-xs text-steel sm:flex-none">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 border border-sand bg-paper px-3 text-sm font-semibold text-ink focus:border-ink"
      >
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
