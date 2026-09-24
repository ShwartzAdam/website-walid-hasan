/**
 * Content publishing mode — inlined at build time (next.config `env`) so
 * server and client components always agree.
 *   preview: NEEDS_CONFIRMATION content and unpermitted WEB assets are shown (with badges); noindex.
 *   strict:  only VERIFIED content and cleared assets; indexable. Production launch mode.
 */
export const contentMode: "preview" | "strict" = process.env.CONTENT_MODE === "strict" ? "strict" : "preview";
