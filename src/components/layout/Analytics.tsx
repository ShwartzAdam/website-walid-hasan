"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { GA_ID, initAnalytics, track, trackPageView } from "@/lib/analytics";

const SCROLL_MILESTONES = [25, 50, 75, 90, 100];

/** Human-readable name of the page section an element sits in (its heading or eyebrow label). */
function sectionName(el: Element | null): string | undefined {
  const section = el?.closest("section, header, footer");
  if (!section) return undefined;
  if (section.tagName === "HEADER") return "header";
  if (section.tagName === "FOOTER") return "footer";
  const label =
    section.getAttribute("aria-label") ||
    section.querySelector("h1, h2")?.textContent ||
    section.querySelector(".eyebrow")?.textContent;
  return label?.replace(/\s+/g, " ").trim().slice(0, 80) || undefined;
}

/** The visible text of a clicked link / button (falls back to aria-label / title). */
function visibleText(el: HTMLElement): string {
  return (el.textContent?.replace(/\s+/g, " ").trim() || el.getAttribute("aria-label") || el.getAttribute("title") || "").slice(0, 100);
}

/**
 * GA4:
 *  - page_view on every route change (initial load and client-side navigation);
 *  - button_click for every link / button, with its label, target and section;
 *  - scroll_depth milestones and section_view for each section actually seen;
 *  - the specific conversion events (WhatsApp, phone, email, data-track CTAs).
 */
export function Analytics({ locale }: { locale: string }) {
  const pathname = usePathname();

  // Page views + scroll depth + section views, reset for every page.
  useEffect(() => {
    if (!GA_ID) return;
    initAnalytics();
    const page = window.location.pathname;
    // Wait a tick so the new page's <title> (streamed metadata) is in place.
    const timer = window.setTimeout(() => {
      trackPageView({
        page_location: window.location.href,
        page_path: page,
        page_title: document.title,
        site_language: locale,
      });
    }, 150);

    const reached = new Set<number>();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - window.innerHeight;
        const percent = scrollable <= 0 ? 100 : Math.round((window.scrollY / scrollable) * 100);
        for (const m of SCROLL_MILESTONES) {
          if (percent >= m && !reached.has(m)) {
            reached.add(m);
            track("scroll_depth", { percent_scrolled: m, page_path: page, site_language: locale });
          }
        }
      });
    };
    const seen = new Set<Element>();
    let sections: Element[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Seen = half of it on screen, or (for sections taller than the screen) half the screen filled by it.
          const visible = entry.intersectionRatio >= 0.5 || entry.intersectionRect.height >= window.innerHeight * 0.5;
          if (!visible || seen.has(entry.target)) continue;
          seen.add(entry.target);
          track("section_view", {
            section_name: sectionName(entry.target) ?? `section ${sections.indexOf(entry.target) + 1}`,
            section_index: sections.indexOf(entry.target) + 1,
            page_path: page,
            site_language: locale,
          });
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    // The new page renders (and scroll resets) after navigation; start measuring once it is in place.
    const observeTimer = window.setTimeout(() => {
      sections = Array.from(document.querySelectorAll("main section"));
      sections.forEach((s) => observer.observe(s));
      window.addEventListener("scroll", onScroll, { passive: true });
    }, 300);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(observeTimer);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname, locale]);

  // Clicks: one delegated listener for every link and button.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("a, button, [role=button]");
      if (!el) return;
      const url = el instanceof HTMLAnchorElement ? el.href : "";
      const common = { locale, page: location.pathname };

      track("button_click", {
        ...common,
        button_text: visibleText(el),
        button_id: el.dataset.trackLabel,
        link_url: url || undefined,
        section_name: sectionName(el),
        element: el.tagName.toLowerCase(),
      });

      const explicit = el.dataset.track;
      if (explicit) track(explicit as Parameters<typeof track>[0], { label: el.dataset.trackLabel, locale });
      else if (url.startsWith("tel:")) track("phone_click", common);
      else if (url.startsWith("mailto:")) track("email_click", common);
      else if (/wa\.me|whatsapp\.com/.test(url)) track("whatsapp_click", common);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [locale]);

  if (!GA_ID) return null;
  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />;
}
