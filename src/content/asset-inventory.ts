import type { AssetStatus } from "./types";

/**
 * Asset Inventory (Asset Strategy — "Existing Research Assets").
 *
 * One row per research source or required asset. Media attached to content
 * (project heroes, equipment images…) is added automatically by
 * `npm run inventory`, which writes docs/ASSET-INVENTORY.md and .csv.
 */
export interface InventoryItem {
  id: string;
  category:
    | "Brand"
    | "Hero"
    | "Company"
    | "Capabilities"
    | "Projects"
    | "Equipment"
    | "Credentials"
    | "Clients"
    | "Testimonials"
    | "Video"
    | "Map"
    | "Contact";
  item: string;
  status: AssetStatus;
  source?: string;
  url?: string;
  dateFound?: string;
  whatItProves?: string;
  usagePermission?: "granted" | "not-required" | "requested" | "unknown" | "n/a";
  confidence?: "high" | "medium" | "low";
  relatedProject?: string;
  /** What the site currently shows for this item. */
  finalStatus: string;
  notes?: string;
}

const FOUND = "2026-09-24";

export const inventory: InventoryItem[] = [
  // ── Research sources ──────────────────────────────────────────────────────
  {
    id: "R-mof-registry",
    category: "Credentials",
    item: "Recognised contractor listing — company 513785527",
    status: "web",
    source: "Ministry of Finance — recognised contractors registry",
    url: "https://asset.mof.gov.il/contractorRepository/s/",
    dateFound: FOUND,
    whatItProves: "Registered name \"וליד חסן תשתיות עפר ופיתוח בע״מ\", company no. 513785527, certificate 13.11.2024–13.11.2026, sub-branches 200 and 260",
    usagePermission: "not-required",
    confidence: "high",
    finalStatus: "Shown as NEEDS_CONFIRMATION (credentials, timeline)",
    notes: "Registry needs login; details read from search-engine snippets. Confirm with the company's certificate.",
  },
  {
    id: "R-classifications",
    category: "Credentials",
    item: "Contractor no. 28803 · G1 · G5 · B4 · B1",
    status: "needs-confirmation",
    source: "Earlier research (Asset Strategy §8)",
    dateFound: FOUND,
    whatItProves: "Contractor number and classifications",
    usagePermission: "not-required",
    confidence: "medium",
    finalStatus: "Shown as NEEDS_CONFIRMATION",
    notes: "One public summary described the 200 classification as G4 — check G5 against the certificate.",
  },
  {
    id: "R-facebook-page",
    category: "Company",
    item: "Company Facebook page",
    status: "web",
    source: "Facebook — page titled \"וליד חסן תשתיות עפר ופיתוח בע״מ\"",
    url: "https://www.facebook.com/100063619101665/",
    dateFound: FOUND,
    whatItProves: "Official social presence; albums and videos of company works",
    usagePermission: "requested",
    confidence: "high",
    finalStatus: "Linked in footer (social)",
    notes: "Ask the company for the original files behind the album photos and videos — best source of real project imagery.",
  },
  {
    id: "R-facebook-album",
    category: "Projects",
    item: "Company Facebook photo album",
    status: "web",
    url: "https://www.facebook.com/100063619101665/albums/116975663112678/",
    dateFound: FOUND,
    whatItProves: "Photos of company works",
    usagePermission: "requested",
    confidence: "high",
    finalStatus: "Not used — originals requested",
  },
  {
    id: "R-facebook-video",
    category: "Video",
    item: "Company Facebook video",
    status: "web",
    url: "https://www.facebook.com/100063619101665/videos/2738968216172908/",
    dateFound: FOUND,
    whatItProves: "Video footage of company works (candidate for hero / project video)",
    usagePermission: "requested",
    confidence: "high",
    finalStatus: "Not used — original file requested",
  },
  {
    id: "R-bruchin-amana",
    category: "Projects",
    item: "Post \"עבודות בברוכין פרויקט אמנה\"",
    status: "web",
    source: "Company Facebook page",
    url: "https://www.facebook.com/100063619101665/posts/100757044734540/",
    dateFound: FOUND,
    whatItProves: "Company carried out works in Bruchin for an Amana project",
    usagePermission: "requested",
    confidence: "medium",
    relatedProject: "bruchin-amana",
    finalStatus: "Project page shown as NEEDS_CONFIRMATION with GENERATED illustration",
  },
  {
    id: "R-volvo-ec300e",
    category: "Equipment",
    item: "Volvo EC300E excavator delivery post",
    status: "web",
    source: "Volvo dealer Gilboa — Facebook",
    url: "https://www.facebook.com/gilboa.volvo/posts/1391925860922845/",
    dateFound: FOUND,
    whatItProves: "Company took delivery of a new Volvo EC300E",
    usagePermission: "unknown",
    confidence: "medium",
    finalStatus: "Equipment item NEEDS_CONFIRMATION with GENERATED drawing",
  },
  {
    id: "R-metso-lt1213s",
    category: "Equipment",
    item: "Metso LT1213S crusher delivery post",
    status: "web",
    source: "M. Bar (Metso supplier) — Facebook",
    url: "https://www.facebook.com/mbar.ltd/posts/636146386581775/",
    dateFound: FOUND,
    whatItProves: "Company received a Metso LT1213S mobile crusher",
    usagePermission: "unknown",
    confidence: "medium",
    finalStatus: "Equipment item NEEDS_CONFIRMATION with GENERATED drawing",
  },
  {
    id: "R-waze",
    category: "Contact",
    item: "Waze business listing",
    status: "needs-confirmation",
    source: "Earlier research",
    dateFound: FOUND,
    whatItProves: "Business location",
    usagePermission: "not-required",
    confidence: "medium",
    finalStatus: "Not used — address/phone still placeholders",
    notes: "Add the listing URL and use it as contact.wazeUrl once the company confirms the address.",
  },
  {
    id: "R-duns",
    category: "Contact",
    item: "Dun's Guide listing",
    status: "needs-confirmation",
    source: "Earlier research",
    dateFound: FOUND,
    whatItProves: "Company details (address, phone, activity)",
    usagePermission: "not-required",
    confidence: "medium",
    finalStatus: "Not used",
    notes: "Search results mostly surface an unrelated confectionery with a similar name — match on company number.",
  },
  {
    id: "R-dapei-zahav",
    category: "Contact",
    item: "Dapei Zahav listing \"וליד חסן, טירה\"",
    status: "web",
    url: "https://www.d.co.il/80063860/37290/",
    dateFound: FOUND,
    whatItProves: "Possibly the company's contact details in Tira — NOT confirmed to be the same business",
    usagePermission: "not-required",
    confidence: "low",
    finalStatus: "Not used",
  },
  {
    id: "R-municipal",
    category: "Projects",
    item: "Municipal / regional-council documents and public tenders",
    status: "needs-confirmation",
    source: "Earlier research",
    dateFound: FOUND,
    whatItProves: "Public projects and clients",
    usagePermission: "not-required",
    confidence: "medium",
    finalStatus: "Not yet linked to project pages",
    notes: "Add each document as its own row with URL and related project.",
  },

  // ── Required assets still missing ─────────────────────────────────────────
  {
    id: "A-logo",
    category: "Brand",
    item: "Original logo (SVG), white / black versions, mark",
    status: "generated",
    finalStatus: "Interim GENERATED mark + typeset wordmark in the header, favicon",
    notes: "No logo found online (Facebook blocked for research). Replace public/brand/* with the company's files.",
  },
  {
    id: "A-hero-video",
    category: "Hero",
    item: "Drone / wide project video + poster + mobile crop",
    status: "missing",
    finalStatus: "GENERATED topography illustration",
    notes: "Company Facebook video is the first candidate.",
  },
  {
    id: "A-team",
    category: "Company",
    item: "Walid Hasan portrait, management, site teams, group photo",
    status: "missing",
    finalStatus: "Placeholder — people are never generated",
  },
  {
    id: "A-yard",
    category: "Company",
    item: "Office, equipment yard, vehicles, active site",
    status: "missing",
    finalStatus: "GENERATED illustrations in company sections",
  },
  {
    id: "A-clients",
    category: "Clients",
    item: "Client names & logos with permission",
    status: "missing",
    finalStatus: "Section hidden",
    notes: "Amana (Bruchin) is a candidate — needs permission.",
  },
  {
    id: "A-testimonials",
    category: "Testimonials",
    item: "Client quotes with permission",
    status: "missing",
    finalStatus: "Section hidden",
  },
  {
    id: "A-contact",
    category: "Contact",
    item: "Phone, mobile, WhatsApp, email, address, hours, contact person, lead email",
    status: "missing",
    finalStatus: "Placeholders marked NEEDS_CONFIRMATION",
  },
];
