/**
 * Launch gate (PRD §15/§29, Asset Strategy): lists every NEEDS_CONFIRMATION
 * claim, every WEB asset without cleared rights, every slot still relying on a
 * GENERATED illustration or placeholder, and missing translations.
 * Exits with code 1 while anything blocks a strict (production) launch.
 *
 *   npm run check:content            # full report
 *   npm run check:content -- --quiet # summary only
 */
import { capabilities } from "../src/content/capabilities";
import * as company from "../src/content/company";
import { projects } from "../src/content/projects";
import type { Verification } from "../src/content/types";
import { locales } from "../src/i18n/config";
import { collectMedia } from "./collect-media";

type Kind = "confirm" | "rights" | "generated" | "missing" | "translation";
const issues: { kind: Kind; where: string; detail?: string; blocking: boolean }[] = [];
const quiet = process.argv.includes("--quiet");

function checkVerification(where: string, v: Verification) {
  if (v.status === "needs-confirmation") issues.push({ kind: "confirm", where, detail: v.notes, blocking: true });
}

function checkTranslations(where: string, value: unknown) {
  if (!value || typeof value !== "object") return;
  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj);
  if (keys.length > 0 && keys.every((k) => (locales as readonly string[]).includes(k))) {
    for (const l of locales) {
      const v = obj[l];
      if (v === undefined || v === "" || (Array.isArray(v) && v.length === 0))
        issues.push({ kind: "translation", where, detail: `missing ${l}`, blocking: true });
    }
    return;
  }
  for (const [k, v] of Object.entries(obj)) if (k !== "verification" && k !== "source") checkTranslations(`${where}.${k}`, v);
}

// Content claims
for (const p of projects) {
  checkVerification(`project:${p.slug}`, p.verification);
  checkTranslations(`project:${p.slug}`, p);
}
for (const c of capabilities) {
  checkVerification(`capability:${c.id}`, c.verification);
  checkTranslations(`capability:${c.id}`, c);
}
for (const s of company.stats) checkVerification(`stat:${s.id}`, s.verification);
for (const c of company.credentials) checkVerification(`credential:${c.id}`, c.verification);
for (const e of company.equipment) checkVerification(`equipment:${e.id}`, e.verification);
for (const p of company.leadership) checkVerification(`person:${p.id}`, p.verification);
company.timeline.forEach((t, i) => checkVerification(`timeline[${i}]`, t.verification));
checkVerification("story", company.story.verification);
checkVerification("values", company.valuesVerification);
checkVerification("contact", company.contact.verification);
for (const c of company.clients) if (!c.permissionConfirmed) issues.push({ kind: "rights", where: `client:${c.id}`, detail: "naming/logo permission", blocking: true });
for (const t of company.testimonials) if (!t.permissionConfirmed) issues.push({ kind: "rights", where: `testimonial:${t.id}`, detail: "quote permission", blocking: true });

// Media — GENERATED and placeholders are allowed at launch (the site must stay complete) but are reported.
for (const { where, image } of collectMedia()) {
  if (image.src && image.status === "web" && !["granted", "not-required"].includes(image.source?.permission ?? ""))
    issues.push({ kind: "rights", where, detail: image.source?.url, blocking: true });
  else if (image.src && image.status === "needs-confirmation") issues.push({ kind: "confirm", where, detail: "photo awaiting company approval", blocking: true });
  else if (!image.src && image.illustration) issues.push({ kind: "generated", where, detail: image.illustration, blocking: false });
  else if (!image.src) issues.push({ kind: "missing", where, detail: image.brief, blocking: false });
}

const labels: Record<Kind, string> = {
  confirm: "NEEDS_CONFIRMATION (blocks strict launch)",
  rights: "Usage rights / permission not cleared (blocks strict launch)",
  translation: "Missing translations (blocks strict launch)",
  generated: "Slots using a GENERATED illustration (allowed, replace when originals arrive)",
  missing: "Slots showing a placeholder (allowed, replace when originals arrive)",
};
for (const kind of Object.keys(labels) as Kind[]) {
  const list = issues.filter((i) => i.kind === kind);
  console.log(`\n${labels[kind]}: ${list.length}`);
  if (!quiet) for (const i of list) console.log(`  - ${i.where}${i.detail ? ` — ${i.detail}` : ""}`);
}

const blocking = issues.filter((i) => i.blocking).length;
if (blocking > 0) {
  console.log(`\n✖ ${blocking} item(s) block a strict launch. Keep CONTENT_MODE=preview until resolved.`);
  process.exit(1);
}
console.log("\n✓ Nothing blocks CONTENT_MODE=strict. (GENERATED/placeholder slots are listed above for follow-up.)");
