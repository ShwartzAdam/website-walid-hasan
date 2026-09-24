/**
 * Launch gate for PRD §15 / §29: lists every unverified claim, every image
 * without confirmed usage rights, every missing photo and every empty
 * translation. Exits with code 1 while anything is outstanding.
 *
 *   npm run check:content            # full report
 *   npm run check:content -- --quiet # summary only
 */
import { capabilities } from "../src/content/capabilities";
import * as company from "../src/content/company";
import { projects } from "../src/content/projects";
import type { MediaImage, Verification } from "../src/content/types";
import { locales } from "../src/i18n/config";

type Issue = { kind: "unverified" | "rights" | "photo" | "translation"; where: string; detail?: string };
const issues: Issue[] = [];
const quiet = process.argv.includes("--quiet");

function checkVerification(where: string, v: Verification) {
  if (v.status === "unverified") issues.push({ kind: "unverified", where, detail: v.notes });
}

function checkImage(where: string, img: MediaImage) {
  if (!img.src) issues.push({ kind: "photo", where, detail: img.brief });
  else if (!img.rightsConfirmed) issues.push({ kind: "rights", where, detail: img.src });
}

/** Walk any object and flag Localized values with a missing / empty language. */
function checkTranslations(where: string, value: unknown) {
  if (!value || typeof value !== "object") return;
  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj);
  if (keys.length > 0 && keys.every((k) => (locales as readonly string[]).includes(k))) {
    for (const l of locales) {
      const v = obj[l];
      if (v === undefined || v === "" || (Array.isArray(v) && v.length === 0)) {
        issues.push({ kind: "translation", where, detail: `missing ${l}` });
      }
    }
    return;
  }
  for (const [k, v] of Object.entries(obj)) {
    if (k === "verification") continue;
    checkTranslations(`${where}.${k}`, v);
  }
}

for (const p of projects) {
  const w = `project:${p.slug}`;
  checkVerification(w, p.verification);
  checkImage(`${w}.hero`, p.hero);
  p.images.forEach((img, i) => checkImage(`${w}.images[${i}]`, img));
  if (p.heroVideo && !p.heroVideo.rightsConfirmed) issues.push({ kind: "rights", where: `${w}.heroVideo` });
  checkTranslations(w, p);
}
for (const c of capabilities) {
  checkVerification(`capability:${c.id}`, c.verification);
  checkImage(`capability:${c.id}.image`, c.image);
  checkTranslations(`capability:${c.id}`, c);
}
for (const s of company.stats) checkVerification(`stat:${s.id}`, s.verification);
for (const c of company.credentials) checkVerification(`credential:${c.id}`, c.verification);
for (const e of company.equipment) {
  checkVerification(`equipment:${e.id}`, e.verification);
  checkImage(`equipment:${e.id}.image`, e.image);
}
for (const p of company.leadership) {
  checkVerification(`person:${p.id}`, p.verification);
  checkImage(`person:${p.id}.image`, p.image);
}
company.timeline.forEach((t, i) => checkVerification(`timeline[${i}]`, t.verification));
checkVerification("story", company.story.verification);
checkVerification("values", company.valuesVerification);
checkVerification("contact", company.contact.verification);
checkImage("story.image", company.storyImage);
for (const c of company.clients) {
  checkVerification(`client:${c.id}`, c.verification);
  if (!c.permissionConfirmed) issues.push({ kind: "rights", where: `client:${c.id}`, detail: "naming/logo permission" });
}

const labels: Record<Issue["kind"], string> = {
  unverified: "Unverified claims",
  rights: "Usage rights not confirmed",
  photo: "Photos still pending",
  translation: "Missing translations",
};

for (const kind of Object.keys(labels) as Issue["kind"][]) {
  const list = issues.filter((i) => i.kind === kind);
  console.log(`\n${labels[kind]}: ${list.length}`);
  if (!quiet) for (const i of list) console.log(`  - ${i.where}${i.detail ? ` — ${i.detail}` : ""}`);
}

if (issues.length > 0) {
  console.log(`\n✖ ${issues.length} content item(s) block launch. Keep CONTENT_MODE=preview until resolved.`);
  process.exit(1);
}
console.log("\n✓ All content verified — ready for CONTENT_MODE=strict.");
