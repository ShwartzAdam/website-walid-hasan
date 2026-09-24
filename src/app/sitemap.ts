import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { contentMode, getCapabilities, getProjects } from "@/lib/content";
import { languageAlternates } from "@/lib/seo";
import { absoluteUrl, href } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Draft previews are not indexable, so they publish an empty sitemap.
  if (contentMode !== "strict") return [];

  const paths: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/projects", priority: 0.9 },
    { path: "/capabilities", priority: 0.8 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    ...getProjects().map((p) => ({ path: `/projects/${p.slug}`, priority: 0.8 })),
    ...getCapabilities().map((c) => ({ path: `/capabilities/${c.id}`, priority: 0.7 })),
  ];
  const lastModified = new Date();

  return paths.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: absoluteUrl(href(locale, path)),
      lastModified,
      priority,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
