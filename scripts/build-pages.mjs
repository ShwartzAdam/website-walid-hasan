/**
 * Static build for GitHub Pages.
 *
 * `output: "export"` cannot include the proxy (middleware) or the POST-only
 * /api/contact route, so they are moved aside for the duration of the build
 * and always restored afterwards — the server build is unaffected.
 *
 *   NEXT_PUBLIC_BASE_PATH=/website-walid-hasan npm run build:pages
 */
import { execSync } from "node:child_process";
import { existsSync, renameSync, rmSync } from "node:fs";

const aside = [
  ["src/proxy.ts", ".pages-aside/proxy.ts"],
  ["src/app/api", ".pages-aside/api"],
];

rmSync(".pages-aside", { recursive: true, force: true });
execSync("mkdir -p .pages-aside");
for (const [from, to] of aside) if (existsSync(from)) renameSync(from, to);

try {
  execSync("npx next build", {
    stdio: "inherit",
    env: { ...process.env, STATIC_EXPORT: "true", NEXT_PUBLIC_STATIC_EXPORT: "true" },
  });
  execSync("node scripts/pages-postbuild.mjs", { stdio: "inherit" });
} finally {
  for (const [from, to] of aside) if (existsSync(to)) renameSync(to, from);
  rmSync(".pages-aside", { recursive: true, force: true });
}
