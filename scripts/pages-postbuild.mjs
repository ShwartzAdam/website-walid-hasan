/**
 * Finishes the static export for GitHub Pages:
 *  - out/index.html: replaces proxy.ts — sends "/" to /he (the primary
 *    language), or to the language the visitor picked earlier (NEXT_LOCALE cookie).
 *  - out/404.html: sends unknown paths to the right language's home page.
 *  - out/.nojekyll: stops Jekyll from dropping the "_next" asset folder.
 */
import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = "out";
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const locales = ["he", "ar", "en"];

const detect = `
(function () {
  var base = ${JSON.stringify(base)};
  var locales = ${JSON.stringify(locales)};
  var m = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]+)/);
  // Hebrew by default; only a language the visitor chose on the site overrides it.
  var pick = m && locales.indexOf(m[1]) !== -1 ? m[1] : null;
  location.replace(base + "/" + (pick || "he") + "/");
})();`;

const page = (title, extraHead = "") => `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${title}</title>
${extraHead}
<script>${detect}</script>
<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0c0d0e;color:#ecebe6;font:16px system-ui,sans-serif}a{color:#e3a82b;margin:0 .75rem}</style>
</head>
<body>
<p>
  <a href="${base}/he/" hreflang="he">עברית</a>
  <a href="${base}/ar/" hreflang="ar">العربية</a>
  <a href="${base}/en/" hreflang="en">English</a>
</p>
</body>
</html>
`;

if (!existsSync(out)) {
  console.error("pages-postbuild: ./out not found — run the static build first.");
  process.exit(1);
}

writeFileSync(join(out, "index.html"), page("Walid Hasan", `<noscript><meta http-equiv="refresh" content="0; url=${base}/he/"></noscript>`));
writeFileSync(join(out, "404.html"), page("Walid Hasan — 404"));
writeFileSync(join(out, ".nojekyll"), "");
console.log(`pages-postbuild: wrote index.html, 404.html, .nojekyll (base path "${base || "/"}")`);
