import type { Localized } from "@/i18n/config";

/**
 * PRD §15: "No unsupported claims should be published."
 * Every factual content item carries its evidence. In `CONTENT_MODE=strict`
 * anything still `unverified` is hidden from the site (see lib/content.ts).
 */
export type VerificationStatus = "unverified" | "public-source" | "company-confirmed";

export interface Verification {
  status: VerificationStatus;
  /** URL or description of the public source / who at the company confirmed it. */
  source?: string;
  /** ISO date the item was last checked. */
  checkedAt?: string;
  notes?: string;
}

export interface MediaImage {
  /** Path under /public or an absolute URL. Omit while the photo is still pending. */
  src?: string;
  width?: number;
  height?: number;
  alt: Localized;
  /** What the photographer should capture — shown on the placeholder until `src` exists. */
  brief?: string;
  credit?: string;
  /** PRD §29: image usage rights must be confirmed before launch. */
  rightsConfirmed: boolean;
}

export interface MediaVideo {
  src: string;
  /** Lower-bitrate rendition served to small screens / Save-Data users. */
  mobileSrc?: string;
  poster: MediaImage;
  rightsConfirmed: boolean;
}

export type CategoryId =
  | "residential-development"
  | "roads"
  | "infrastructure"
  | "earthworks"
  | "water"
  | "sewer"
  | "drainage"
  | "public-infrastructure";

export type CapabilityId =
  | "earthworks"
  | "infrastructure"
  | "roads"
  | "water"
  | "sewer"
  | "drainage"
  | "development"
  | "retaining-walls";

export type RegionId = "north" | "haifa" | "center" | "jerusalem" | "south" | "tel-aviv";

export interface ProjectStatistic {
  value: string;
  label: Localized;
}

export interface Project {
  slug: string;
  title: Localized;
  location: Localized;
  region: RegionId;
  /** Completion year, or start year when `ongoing`. */
  year?: number;
  ongoing?: boolean;
  client?: Localized;
  categories: CategoryId[];
  capabilities: CapabilityId[];
  /** One-line type shown on cards, e.g. "Infrastructure & Development". */
  type: Localized;
  summary: Localized;
  description: Localized;
  challenge?: Localized;
  scope: Localized<string[]>;
  execution?: Localized;
  result?: Localized;
  statistics: ProjectStatistic[];
  hero: MediaImage;
  heroVideo?: MediaVideo;
  images: MediaImage[];
  /** [latitude, longitude] */
  coordinates?: [number, number];
  featured: boolean;
  /** Sort order for featured lists (lower first). */
  order?: number;
  verification: Verification;
}

export interface Capability {
  id: CapabilityId;
  title: Localized;
  short: Localized;
  description: Localized;
  scope: Localized<string[]>;
  equipment: EquipmentCategoryId[];
  image: MediaImage;
  verification: Verification;
}

export type EquipmentCategoryId = "excavators" | "loaders" | "trucks" | "compactors" | "graders" | "other";

export interface EquipmentItem {
  id: string;
  category: EquipmentCategoryId;
  name: Localized;
  /** Number of units, if confirmed. */
  count?: number;
  image: MediaImage;
  verification: Verification;
}

export interface Credential {
  id: string;
  label: Localized;
  value: string;
  detail?: Localized;
  verification: Verification;
}

export interface CompanyStat {
  id: string;
  /** Numeric part is animated when present. */
  value: number | string;
  suffix?: string;
  /** Render without thousands separators (years, licence numbers). */
  raw?: boolean;
  label: Localized;
  verification: Verification;
}

export interface TimelineEntry {
  year: string;
  title: Localized;
  body: Localized;
  verification: Verification;
}

export interface Person {
  id: string;
  name: Localized;
  role: Localized;
  bio?: Localized;
  image: MediaImage;
  verification: Verification;
}

export interface Client {
  id: string;
  name: Localized;
  logo?: MediaImage;
  /** PRD §6.10 — may only be shown once the organization can legally be named / logo use is approved. */
  permissionConfirmed: boolean;
  verification: Verification;
}

export interface ContactDetails {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: Localized;
  hours: Localized;
  coordinates?: [number, number];
  social: { facebook?: string; instagram?: string; linkedin?: string; youtube?: string };
  verification: Verification;
}
