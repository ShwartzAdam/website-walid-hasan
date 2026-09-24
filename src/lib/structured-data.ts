import { company, contact } from "@/content/company";
import type { Project } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { absoluteUrl, href, siteUrl } from "./site";

/** Organization / GeneralContractor (a schema.org LocalBusiness subtype). */
export function organizationSchema(locale: Locale) {
  const dict = getDictionary(locale);
  // Contact details are only emitted once verified, so search engines never index placeholders.
  const contactVerified = contact.verification.status === "verified";
  const sameAs = Object.values(contact.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${siteUrl}/#organization`,
    name: company.legalName[locale],
    alternateName: [company.legalName.en, company.legalName.he, company.legalName.ar].filter(
      (n) => n !== company.legalName[locale],
    ),
    url: absoluteUrl(href(locale)),
    description: dict.meta.defaultDescription,
    areaServed: { "@type": "Country", name: "Israel" },
    knowsAbout: dict.common.tagline,
    ...(contactVerified && {
      telephone: contact.phone,
      email: contact.email,
      address: { "@type": "PostalAddress", streetAddress: contact.address[locale], addressCountry: "IL" },
      ...(contact.coordinates && {
        geo: { "@type": "GeoCoordinates", latitude: contact.coordinates[0], longitude: contact.coordinates[1] },
      }),
    }),
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** A completed project described as a CreativeWork produced by the contractor. */
export function projectSchema(project: Project, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title[locale],
    description: project.description[locale],
    url: absoluteUrl(href(locale, `/projects/${project.slug}`)),
    inLanguage: locale,
    genre: project.type[locale],
    ...(project.year && { dateCreated: String(project.year) }),
    locationCreated: {
      "@type": "Place",
      name: project.location[locale],
      ...(project.coordinates && {
        geo: { "@type": "GeoCoordinates", latitude: project.coordinates[0], longitude: project.coordinates[1] },
      }),
    },
    creator: { "@id": `${siteUrl}/#organization` },
    ...(project.hero.src && { image: absoluteUrl(project.hero.src) }),
  };
}
