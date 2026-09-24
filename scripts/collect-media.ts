/** Walks all content and returns every media slot with where it is used. Shared by check-content and inventory. */
import { capabilities } from "../src/content/capabilities";
import * as company from "../src/content/company";
import { projects } from "../src/content/projects";
import type { MediaImage } from "../src/content/types";

export interface MediaSlot {
  where: string;
  category: string;
  image: MediaImage;
  relatedProject?: string;
}

export function collectMedia(): MediaSlot[] {
  const slots: MediaSlot[] = [];
  slots.push({ where: "home.hero", category: "Hero", image: company.heroMedia.image });
  slots.push({ where: "company.story", category: "Company", image: company.storyImage });
  for (const p of projects) {
    slots.push({ where: `project:${p.slug}.hero`, category: "Projects", image: p.hero, relatedProject: p.slug });
    p.images.forEach((img, i) => slots.push({ where: `project:${p.slug}.images[${i}]`, category: "Projects", image: img, relatedProject: p.slug }));
  }
  for (const c of capabilities) slots.push({ where: `capability:${c.id}`, category: "Capabilities", image: c.image });
  for (const e of company.equipment) slots.push({ where: `equipment:${e.id}`, category: "Equipment", image: e.image });
  for (const p of company.leadership) slots.push({ where: `person:${p.id}`, category: "Company", image: p.image });
  return slots;
}
