import { capabilities as allCapabilities } from "@/content/capabilities";
import {
  clients as allClients,
  credentials as allCredentials,
  equipment as allEquipment,
  stats as allStats,
  testimonials as allTestimonials,
} from "@/content/company";
import { projects as allProjects } from "@/content/projects";
import type { CapabilityId, CategoryId, Project, Verification } from "@/content/types";
import { contentMode } from "./mode";

/**
 * Content repository. Pages read content only through these functions so the
 * source can later move to a headless CMS (PRD §16, §19) without touching UI code.
 */

export { contentMode };

/** DO_NOT_PUBLISH is never shown; NEEDS_CONFIRMATION only in preview. */
export function isPublishable(item: { verification: Verification }): boolean {
  const { status } = item.verification;
  if (status === "do-not-publish") return false;
  return contentMode === "preview" || status === "verified";
}

export function isPending(item: { verification: Verification }): boolean {
  return item.verification.status === "needs-confirmation";
}

function byFeaturedOrder(a: Project, b: Project) {
  return (a.order ?? 99) - (b.order ?? 99) || (b.year ?? 0) - (a.year ?? 0);
}

export function getProjects(): Project[] {
  return allProjects
    .filter(isPublishable)
    .sort((a, b) => (b.year ?? 9999) - (a.year ?? 9999) || byFeaturedOrder(a, b));
}

export function getFeaturedProjects(limit = 4): Project[] {
  return getProjects().filter((p) => p.featured).sort(byFeaturedOrder).slice(0, limit);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  return getProjects()
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({
      p,
      score:
        p.categories.filter((c) => project.categories.includes(c)).length * 2 +
        p.capabilities.filter((c) => project.capabilities.includes(c)).length +
        (p.region && p.region === project.region ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

export function getProjectsForCapability(id: CapabilityId): Project[] {
  return getProjects().filter((p) => p.capabilities.includes(id));
}

export function getProjectsForCategory(id: CategoryId): Project[] {
  return getProjects().filter((p) => p.categories.includes(id));
}

export function getCapabilities() {
  return allCapabilities.filter(isPublishable);
}

export function getCapability(id: string) {
  return getCapabilities().find((c) => c.id === id);
}

export function getStats() {
  return allStats.filter(isPublishable);
}

export function getCredentials() {
  return allCredentials.filter(isPublishable);
}

export function getEquipment() {
  return allEquipment.filter(isPublishable);
}

/** Clients additionally require explicit naming/logo permission (PRD §6.10). */
export function getClients() {
  return allClients.filter((c) => c.permissionConfirmed && isPublishable(c));
}

/** Testimonials need explicit permission too (Asset Strategy §10). */
export function getTestimonials() {
  return allTestimonials.filter((t) => t.permissionConfirmed && isPublishable(t));
}
