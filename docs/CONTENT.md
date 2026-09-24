# Content & asset guide

All site content lives in `src/content/` as typed data. The site reads it only through `src/lib/content.ts`, so moving to a headless CMS later (PRD §16/§19) only means changing that one file.

| File | What it holds |
| --- | --- |
| `projects.ts` | Projects: the main content type (PRD §7–8) |
| `capabilities.ts` | Capability pages (`/capabilities/<id>`) |
| `company.ts` | Hero media, stats, credentials, story, timeline, leadership, values, equipment, clients, testimonials, contact |
| `asset-inventory.ts` | Research sources and required assets (Asset Strategy "Asset Inventory") |
| `taxonomy.ts` | Category, region and equipment labels in all three languages |

Every text field is `Localized`, so it has `he`, `ar` and `en`. Hebrew and Arabic must be written or reviewed by native speakers.

## Content status (PRD §15, Asset Strategy §5)

Every factual item has a `verification` block:

```ts
verification: {
  status: "verified" | "needs-confirmation" | "do-not-publish",
  basis: "company" | "public-source" | "prd",
  source: "Ministry of Finance — recognised contractors registry",
  url: "https://…",
  checkedAt: "2026-09-24",
  notes: "…",
}
```

| Status | Preview (`CONTENT_MODE=preview`) | Launch (`CONTENT_MODE=strict`) |
| --- | --- | --- |
| **VERIFIED** | shown | shown |
| **NEEDS_CONFIRMATION** | shown, with a dashed "Pending verification" tag | hidden |
| **DO_NOT_PUBLISH** | hidden | hidden |

The preview is `noindex`, `robots.txt` blocks all crawlers and the sitemap is empty. Strict mode enables indexing. **Production launch uses strict.**

## Asset priority (Asset Strategy)

Every image slot is a `MediaImage`. `src/lib/media.ts` picks what to show in this order:

1. **Original**: company material (`src` + `status: "verified"`).
2. **Web**: a public find (`src` + `status: "web"` + `source` with `url`, `proves`, `permission`). In strict mode it is used only when `permission` is `granted` or `not-required`.
3. **Generated**: `illustration: "<id>"`, an engineering-drawing SVG from `public/generated/`. It is **always labelled "Illustration"** on the site and never presented as documentation of real work.
4. **Placeholder**: a "photo pending" slot showing the shot `brief`.

Rules that are built in:

- People (team, management) are never generated. Their slots fall back to the placeholder.
- A section is never left empty just because a photo is missing; the generated tier fills it.
- The illustrations are regenerated deterministically with `npm run generate:illustrations` (`scripts/generate-illustrations.mjs`). They contain numbers and symbols only, no words, so they work in all three languages.
- The homepage "From ground to community" story stacks four transparent layers (`story-ground`, `story-infrastructure`, `story-development`, `story-community`) and reveals them as the visitor scrolls.

### Adding real photos

1. Put the optimised originals (at least 2560px on the long edge) in `public/images/projects/<slug>/`.
2. On the image, set `src`, `width` and `height`, and set `status: "verified"`. For a web find, use `status: "web"` plus a `source` with `url`, `proves` and `permission`.
3. Keep the `illustration` as a fallback. It is only used while the photo can't be shown.
4. Run `npm run inventory` to refresh `docs/ASSET-INVENTORY.md`.

## Adding a project

1. Copy an entry in `src/content/projects.ts`. Give it a unique URL-safe `slug`; the page lives at `/{he,ar,en}/projects/<slug>`.
2. Fill `title`, `location`, `type`, `summary` and `description` in all three languages. `challenge`, `execution` and `result` are optional sections.
3. Set `categories` (these drive the filters) and `capabilities` (these drive related projects and capability pages). Set `region` and `year` only when known; never guess them.
4. Add `coordinates: [lat, lng]` to show the project on the map.
5. Set `featured: true` and an `order` to show it in the homepage's Selected Projects.
6. Set `verification` with the source. Never publish facts, amounts or clients that haven't been verified.

## Commands

| Command | What it does |
| --- | --- |
| `npm run check:content` | Launch gate. Blocks on NEEDS_CONFIRMATION items, uncleared web assets and missing translations. Lists generated and placeholder slots as follow-ups. |
| `npm run inventory` | Writes `docs/ASSET-INVENTORY.md` and `docs/asset-inventory.csv` |
| `npm run generate:illustrations` | Regenerates `public/generated/*.svg` |
