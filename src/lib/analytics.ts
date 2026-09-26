/**
 * GA4 helpers (PRD §21). Everything no-ops when GA is not configured or during SSR.
 *
 * Page views are sent manually (see components/layout/Analytics.tsx) because the
 * site navigates client-side: gtag's automatic page_view only fires on the first
 * load. Sessions (session_start, engaged sessions, engagement time) are derived
 * by GA4 from the same tag — no extra code needed.
 */
/**
 * The site's GA4 measurement ID (public — it is served in every page). Used by
 * production builds on any host (Vercel, GitHub Pages) unless NEXT_PUBLIC_GA_ID
 * overrides it; NEXT_PUBLIC_GA_ID=off disables tracking. Dev builds stay untracked.
 */
const DEFAULT_GA_ID = "G-J1WMN9Q01T";
const configured = process.env.NEXT_PUBLIC_GA_ID;
export const GA_ID =
  configured === "off"
    ? undefined
    : configured || (process.env.NODE_ENV === "production" ? DEFAULT_GA_ID : undefined);

export type AnalyticsEvent =
  | "contact_form_submit"
  | "contact_form_error"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "project_view"
  | "project_filter"
  | "language_select"
  | "cta_click"
  // Every click on a link or button (label, target, page section).
  | "button_click"
  // Scroll milestones per page: 25 / 50 / 75 / 90 / 100 %.
  | "scroll_depth"
  // A page section seen by the visitor (at least half of it on screen).
  | "section_view";

declare global {
  interface Window {
    dataLayer?: unknown[];
    /** Set by the inline tag in the page HTML once GA4 is configured. */
    __ga4Configured?: boolean;
    gtag?: (...args: unknown[]) => void;
  }
}

let initialised = false;

/**
 * Creates the gtag queue and configures GA4 once per page load. Commands are
 * queued in dataLayer and replayed when gtag.js arrives, so nothing is lost
 * if the script loads after the first page view.
 */
export function initAnalytics() {
  if (!GA_ID || typeof window === "undefined" || initialised) return;
  initialised = true;
  // Normally the inline tag in the HTML (components/layout/Analytics.tsx) has already done this.
  if (window.__ga4Configured) return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    // gtag.js requires the real `arguments` object, not an array.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });
}

export function trackPageView(params: { page_location: string; page_path: string; page_title: string; site_language: string }) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", params);
}

export function track(event: AnalyticsEvent, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
