/**
 * GA4 event helper (PRD §21). No-ops when GA is not configured or during SSR.
 */
export type AnalyticsEvent =
  | "contact_form_submit"
  | "contact_form_error"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "project_view"
  | "project_filter"
  | "language_select"
  | "cta_click";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
