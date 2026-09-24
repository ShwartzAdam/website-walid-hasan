# Content guide

All site content lives in `src/content/` as typed data. The site reads it only through `src/lib/content.ts`, so moving to a headless CMS later (Sanity, Contentful or Strapi, PRD §16/§19) only means changing that one file.

| File | What it holds |
| --- | --- |
| `projects.ts` | Projects: the main content type (PRD §7–8) |
| `capabilities.ts` | Capability pages (`/capabilities/<id>`) |
| `company.ts` | Stats, credentials, story, timeline, leadership, values, equipment, clients, contact details |
| `taxonomy.ts` | Category, region and equipment labels in all three languages |

Every text field is `Localized`, so it has `he`, `ar` and `en`. Hebrew and Arabic must be written or reviewed by native speakers. They should not be machine translations (PRD §4).

## Verification rule (PRD §15)

> No unsupported claims should be published.

Every factual item has a `verification` block:

```ts
verification: {
  status: "unverified" | "public-source" | "company-confirmed",
  source: "https://… or 'Walid Hasan, phone call 2026-10-02'",
  checkedAt: "2026-10-02",
  notes: "…",
}
```

- **`CONTENT_MODE=preview`** (default) shows everything. Unverified items carry a dashed **Pending verification** tag. The whole site is `noindex`, `robots.txt` blocks all crawlers and the sitemap is empty.
- **`CONTENT_MODE=strict`** hides every `unverified` item and enables indexing, the sitemap and robots. **Production launch uses strict.**

Run `npm run check:content` to list unverified claims, missing photos, images without confirmed usage rights and missing translations. It exits non-zero until everything is resolved.

Clients (PRD §6.10) also need `permissionConfirmed: true` before they are shown.

## Adding a project

1. Copy an entry in `src/content/projects.ts`. Give it a unique URL-safe `slug`; the page will live at `/{he,ar,en}/projects/<slug>`.
2. Fill `title`, `location`, `type`, `summary` and `description` in all three languages. `challenge`, `execution` and `result` are optional sections.
3. Set `region`, `year` (or `ongoing: true`), `categories` (these drive the filters) and `capabilities` (these drive related projects and capability pages).
4. Add `coordinates: [lat, lng]` to show the project on the map.
5. Set `featured: true` and an `order` to show it in the homepage's Selected Projects.
6. Set `verification` once the facts are confirmed.

## Photography (PRD §14)

- Put optimised originals (JPEG/WebP, at least 2560px on the long edge) in `public/images/projects/<slug>/`.
- Set `src`, `width`, `height` and `rightsConfirmed: true` on the image. `next/image` serves AVIF/WebP at responsive sizes and lazy-loads.
- Until `src` is set, the site shows a "photo pending" slot with the `brief` text, which doubles as the shot list for the photographer.
- Hero video: set `heroVideo` with `src`, an optional `mobileSrc` (a lighter encode) and a `poster` image. The video is skipped for users with reduced motion or Save-Data.

## Research database (PRD §24)

`docs/research-database.csv` is the template for the research log. It has one row per fact, with a source, date, confidence and permission status. Each content item's `verification.source` should point back to a row there.
