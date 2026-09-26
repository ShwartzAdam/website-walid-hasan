# Walid Hasan — corporate website

Website for **Walid Hasan Infrastructure, Development & Earthworks**, available in Hebrew, Arabic and English.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Motion and Leaflet. Content lives in typed data files and is ready to move to a headless CMS later.

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev          # http://localhost:3000 → redirects to /he (or the language picked earlier)
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` / `npm run typecheck` | ESLint and TypeScript checks |
| `npm run check:content` | Launch gate: NEEDS_CONFIRMATION claims, uncleared web assets, translations |
| `npm run inventory` | Asset inventory → `docs/ASSET-INVENTORY.md` / `.csv` |
| `npm run generate:illustrations` | Regenerate the GENERATED engineering illustrations |

## Structure

```
src/
  app/[locale]/…        Pages: home, about, capabilities(/[slug]), projects(/[slug]), contact
  app/api/contact       Project inquiry endpoint (multipart, file upload)
  app/sitemap.ts        hreflang-aware sitemap (strict mode only)
  app/robots.ts
  proxy.ts              "/" → Hebrew, or the language the visitor picked (cookie)
  content/              All content as typed data (see docs/CONTENT.md)
  i18n/                 Locale config and UI dictionaries (he / ar / en)
  lib/                  Content repository, SEO, structured data, analytics
  components/           UI (home sections, project cards/explorer, contact form…)
```

## Implemented from the PRD

- **Languages (§4):** `/he`, `/ar` and `/en` URLs, each with its own translated content. Hebrew and Arabic are RTL and English is LTR, set with `lang`/`dir` on `<html>`. Layouts use logical CSS properties, arrows point the right way in each direction, and each language has its own typefaces (Heebo, IBM Plex Sans Arabic + Noto Kufi Arabic, Archivo).
- **Homepage (§6):** every section is built: hero (with adaptive video support), intro, interactive capabilities (hover on desktop, swipe on mobile), alternating editorial projects, animated numbers, project map, equipment gallery, company story, credentials, clients (shown only with permission) and a full-screen closing CTA.
- **Projects (§7–8):** listing filterable by category, location and year, with filters kept in the URL. The detail page has hero, facts, overview/stats, challenge, execution, results, scope, gallery, related projects and a CTA.
- **Capabilities (§10):** an index page plus one SEO landing page per capability.
- **About (§9)** and **Contact (§11):** professional inquiry form with project type, scope and file upload (validated on client and server, with a honeypot), plus WhatsApp, phone and email links and an office map.
- **Mobile (§12):** sticky WhatsApp / Call / Start a Project bar, swipe galleries, and a full-screen menu.
- **Motion (§13):** text and image reveals, hero parallax, number counters and filter transitions. Everything respects `prefers-reduced-motion`.
- **SEO (§17):** per-page metadata, canonical URLs, hreflang (+ x-default), Open Graph and Twitter cards, generated OG image, sitemap, robots, and JSON-LD (`GeneralContractor`, `Service`, `BreadcrumbList`, project `CreativeWork`).
- **Performance (§18):** pages are statically generated. Images use `next/image` (AVIF/WebP), Leaflet loads only when the map scrolls into view, and videos load adaptively.
- **Assets (Asset Strategy):** every image slot follows the order Original → Web → Generated → Placeholder. Generated engineering drawings (plans, sections, profiles, equipment elevations) are always labelled as illustrations. The research findings are recorded with their sources in `docs/ASSET-INVENTORY.md`. See `docs/CONTENT.md`.
- **Accessibility (§20):** semantic landmarks, skip link, visible focus states, labelled form fields with announced errors, and a list alternative to the map.
- **Analytics (§21):** GA4 through `NEXT_PUBLIC_GA_ID`. It tracks form submissions and errors, WhatsApp, phone and email clicks, project views, filter usage, language selection and CTA clicks.

## GitHub Pages (static preview)

The workflow `.github/workflows/pages.yml` publishes a static build to
`https://shwartzadam.github.io/website-walid-hasan/` whenever `main` or
`claude/walid-hasan-website-jqtwcg` is pushed. It can also be run by hand
from the Actions tab.

**First-time setup:** go to repository **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**, then re-run the workflow.

Pages only serves static files, so `npm run build:pages` makes these changes:

- `proxy.ts` and `/api/contact` are left out of the static build (and restored afterwards).
- `/` becomes a small page that sends visitors to `/he/`, or to the language they picked earlier on the site.
- The contact form posts to `NEXT_PUBLIC_CONTACT_ENDPOINT` if you set one as a repository variable, for example a Formspree or Basin form URL. If not, it opens the visitor's email app with the details filled in; files can't be attached that way.
- Images are served without Next's optimisation server.

Optional repository variables are `CONTENT_MODE`, `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_CONTACT_ENDPOINT`.

To try the static build locally:

```bash
NEXT_PUBLIC_BASE_PATH=/website-walid-hasan npm run build:pages   # output in ./out
```

For the production launch, a Node host such as Vercel is still recommended. It adds server-side language detection, the contact API with file uploads, and image optimisation.

## Analytics (GA4)

Measurement ID: **`G-J1WMN9Q01T`**. It is the default for every production build (Vercel, GitHub Pages), so no hosting setup is needed. Set `NEXT_PUBLIC_GA_ID` to use a different ID, or to `off` to disable tracking. Development builds (`npm run dev`) are never tracked. The standard Google tag is rendered into each page's HTML, so Google's tag check detects it.

### What is tracked

| Event | When | Parameters |
| --- | --- | --- |
| `page_view` | every page, including in-site navigation | `page_title`, `page_location`, `page_path`, `site_language` |
| `button_click` | every link or button click | `button_text` (visible text), `button_id`, `link_url`, `section_name`, `page` |
| `scroll_depth` | 25 / 50 / 75 / 90 / 100 % of each page | `percent_scrolled`, `page_path` |
| `section_view` | a page section actually seen (half of it on screen) | `section_name`, `section_index`, `page_path` |
| `whatsapp_click`, `phone_click`, `email_click` | contact links | `page` |
| `contact_form_submit` / `contact_form_error`, `cta_click`, `project_view`, `project_filter`, `language_select` | PRD §21 conversions | event specific |

GA4 adds sessions, users, new vs returning, country and city, device, browser and traffic source on its own. It does **not** identify individual people, and the site deliberately collects no personal data.

### One-time setup in Google Analytics

1. **Admin → Data streams → (web stream) → Enhanced measurement**:
   - Under *Page views → Advanced*, switch off **"Page changes based on browser history events"**. The site sends page views itself; leaving it on double-counts.
   - Switch off **Scrolls**. The site's `scroll_depth` event is more detailed than GA4's single 90% scroll event.
2. **Admin → Custom definitions → Create custom dimension** (event scope) for `button_text`, `section_name`, `site_language` and `link_url`, plus a custom metric for `percent_scrolled`. Without these, the parameters are collected but can't be used in reports.
3. To see individual visits, use **Reports → Realtime** (live) or **Explore → User explorer**: pick a visitor to see their page views, clicks and scroll depth in order. Use **Explore → Free form** with the `button_click` event and the `button_text` dimension to rank the buttons.

Before launch, check whether the site needs a cookie-consent banner under the Israeli Privacy Protection Law (Amendment 13).

## Environment

See `.env.example`. The key settings:

- `NEXT_PUBLIC_SITE_URL`: the canonical origin.
- `CONTENT_MODE`: `preview` (default, `noindex`) or `strict` (launch).
- `RESEND_API_KEY` + `CONTACT_TO_EMAIL`, or `CONTACT_WEBHOOK_URL`: where inquiries are sent. Without either one, production returns 503 instead of silently dropping leads.
- `NEXT_PUBLIC_MAP_TILE_URL` / `NEXT_PUBLIC_MAP_ATTRIBUTION`: optional. Swap the default CARTO basemap for Mapbox or another provider.

## Before launch (PRD §29)

- [ ] Company confirms every NEEDS_CONFIRMATION item and adds more projects (`npm run check:content` passes).
- [ ] Original photos, video and logo replace the generated assets where possible (`docs/ASSET-INVENTORY.md`).
- [ ] Real contact details (phone, WhatsApp, email, address, coordinates) confirmed.
- [ ] Credentials verified against the Registrar of Contractors.
- [ ] Photography delivered with confirmed usage rights.
- [ ] Hebrew and Arabic copy reviewed by native speakers, and RTL tested on real devices.
- [ ] Contact delivery configured and tested end to end, including attachments.
- [ ] GA4 and Search Console configured. Cookie consent reviewed against Israeli privacy law (Amendment 13).
- [ ] Deploy with `CONTENT_MODE=strict` and the production `NEXT_PUBLIC_SITE_URL`.
- [ ] Choose the CMS based on the company's editing workflow (PRD §19, §23).
