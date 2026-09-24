import type { Localized } from "@/i18n/config";

// ─── Content verification (Asset Strategy §5, PRD §15) ──────────────────────
/**
 * VERIFIED            confirmed by the company or an authoritative public source — publishable.
 * NEEDS_CONFIRMATION  found, but the company must confirm — shown only in preview, with a badge.
 * DO_NOT_PUBLISH      never shown (kept for reference / internal use).
 */
export type ContentStatus = "verified" | "needs-confirmation" | "do-not-publish";

export interface Verification {
  status: ContentStatus;
  /** What the confirmation rests on. */
  basis?: "company" | "public-source" | "prd";
  /** Human-readable source, e.g. "Ministry of Finance recognised-contractor registry". */
  source?: string;
  url?: string;
  /** ISO date the item was found / last checked. */
  checkedAt?: string;
  notes?: string;
}

// ─── Assets (Asset Strategy — priority Original → Web → Generated → Placeholder)
/**
 * VERIFIED            original company material, approved for use.
 * WEB                 found online — source and usage rights must be checked before production.
 * GENERATED           created by us — never presented as documentation of real work.
 * NEEDS_CONFIRMATION  material exists but the company must approve it.
 * MISSING             nothing suitable yet.
 */
export type AssetStatus = "verified" | "web" | "generated" | "needs-confirmation" | "missing";

export type IllustrationId =
  | "topography"
  | "earthworks"
  | "road"
  | "network"
  | "water"
  | "sewer"
  | "drainage"
  | "retaining"
  | "neighborhood"
  | "residential"
  | "public"
  | "equipment-excavator"
  | "equipment-loader"
  | "equipment-dump-truck"
  | "equipment-roller"
  | "equipment-grader"
  | "equipment-bulldozer"
  | "equipment-crusher";

export interface AssetSource {
  /** Where the file / information was found. */
  url?: string;
  /** ISO date found. */
  foundAt?: string;
  /** What this asset proves (e.g. "company owns a Volvo EC300E"). */
  proves?: string;
  permission: "granted" | "not-required" | "requested" | "unknown";
  credit?: string;
  confidence?: "high" | "medium" | "low";
}

export interface MediaImage {
  /** Photo / video-poster file (original or permitted web material). */
  src?: string;
  width?: number;
  height?: number;
  /** Status of `src`. With no `src`, "missing". */
  status: AssetStatus;
  source?: AssetSource;
  alt: Localized;
  /** Shot list: what the real photo should show. */
  brief?: string;
  /** GENERATED fallback used when no usable photo exists. Always labelled on the site. */
  illustration?: IllustrationId;
}

export interface MediaVideo {
  src: string;
  /** Lower-bitrate rendition served to small screens / Save-Data users. */
  mobileSrc?: string;
  poster: MediaImage;
  status: AssetStatus;
  source?: AssetSource;
}

// ─── Taxonomy ────────────────────────────────────────────────────────────────
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
  | "residential-development"
  | "retaining-walls"
  | "public-infrastructure"
  | "pumping-stations";

export type RegionId = "north" | "haifa" | "center" | "tel-aviv" | "jerusalem" | "south" | "judea-samaria";

export type EquipmentCategoryId =
  | "excavators"
  | "loaders"
  | "dump-trucks"
  | "bulldozers"
  | "graders"
  | "compactors"
  | "rollers"
  | "specialized";

// ─── Content types ───────────────────────────────────────────────────────────
export interface ProjectStatistic {
  value: string;
  label: Localized;
}

export interface Project {
  slug: string;
  title: Localized;
  location: Localized;
  /** Omit when unknown — never guess. */
  region?: RegionId;
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
  /** Gallery — tag each image with its phase where known. */
  images: (MediaImage & { phase?: "drone" | "before" | "during" | "after" | "machinery" | "team" })[];
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

export interface EquipmentItem {
  id: string;
  category: EquipmentCategoryId;
  name: Localized;
  manufacturer?: string;
  model?: string;
  /** Number of units, if confirmed. */
  quantity?: number;
  description?: Localized;
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
  relationship?: Localized;
  relatedProject?: string;
  /** Asset Strategy §9 — may only be shown once naming / logo use is approved. */
  permissionConfirmed: boolean;
  verification: Verification;
}

export interface Testimonial {
  id: string;
  quote: Localized;
  name: string;
  position: Localized;
  company: Localized;
  project?: string;
  photo?: MediaImage;
  permissionConfirmed: boolean;
  verification: Verification;
}

export interface ContactDetails {
  phone: string;
  phoneDisplay: string;
  mobile?: string;
  whatsapp: string;
  email: string;
  /** Inbox that receives website leads, if different from `email`. */
  leadEmail?: string;
  contactPerson?: Localized;
  address: Localized;
  hours: Localized;
  coordinates?: [number, number];
  googleMapsUrl?: string;
  wazeUrl?: string;
  social: { facebook?: string; instagram?: string; linkedin?: string; youtube?: string };
  verification: Verification;
}
