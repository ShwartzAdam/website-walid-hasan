"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { locales, localeNames, localeShortNames, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { track } from "@/lib/analytics";
import { href, stripLocale } from "@/lib/site";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";

const NAV = ["projects", "capabilities", "about", "contact"] as const;

function rememberLocale(l: Locale) {
  document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; samesite=lax`;
  track("language_select", { language: l });
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname() ?? "/";
  const rest = stripLocale(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (key: string) => rest === `/${key}` || rest.startsWith(`/${key}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-paper transition-colors duration-500 ${
        scrolled || open ? "bg-ink/92 backdrop-blur-md" : "bg-gradient-to-b from-ink/60 to-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href={href(locale)} className="group flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-display text-lg font-bold tracking-[0.12em] rtl:tracking-normal md:text-xl">
            {dict.common.brand}
          </span>
          <span className="mt-1 text-[10px] tracking-[0.2em] text-sand/70 uppercase rtl:tracking-normal">
            {dict.common.tagline.join(" · ")}
          </span>
        </Link>

        <nav aria-label={dict.a11y.mainNav} className="hidden items-center gap-8 lg:flex">
          {NAV.map((key) => (
            <Link
              key={key}
              href={href(locale, `/${key}`)}
              aria-current={isActive(key) ? "page" : undefined}
              className={`relative py-2 text-sm font-medium transition-colors hover:text-signal ${
                isActive(key) ? "text-signal" : ""
              }`}
            >
              {dict.nav[key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ul className="hidden items-center gap-1 text-xs sm:flex" aria-label={dict.a11y.language}>
            {locales.map((l) => (
              <li key={l}>
                <Link
                  href={href(l, rest)}
                  hrefLang={l}
                  lang={l}
                  aria-current={l === locale ? "true" : undefined}
                  title={localeNames[l]}
                  onClick={() => rememberLocale(l)}
                  className={`block px-2 py-1.5 transition-colors ${
                    l === locale ? "text-signal" : "text-sand/70 hover:text-paper"
                  }`}
                >
                  <span aria-hidden>{localeShortNames[l]}</span>
                  <span className="sr-only">{localeNames[l]}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={href(locale, "/contact")}
            data-track="cta_click"
            data-track-label="header_start_project"
            className="btn btn-primary hidden min-h-11 px-5 text-sm md:inline-flex"
          >
            {dict.nav.startProject}
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="-me-2 p-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.a11y.closeMenu : dict.a11y.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-ink md:top-20 lg:hidden"
          >
            <nav aria-label={dict.a11y.mainNav} className="container-x flex h-full flex-col justify-between py-10">
              <ul className="space-y-2">
                {(["home", ...NAV] as const).map((key, i) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={key === "home" ? href(locale) : href(locale, `/${key}`)}
                      onClick={() => setOpen(false)}
                      className="block py-2 font-display text-4xl font-bold hover:text-signal"
                    >
                      {dict.nav[key]}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <ul className="mt-10 flex gap-6 border-t border-graphite pt-6 text-sm" aria-label={dict.a11y.language}>
                {locales.map((l) => (
                  <li key={l}>
                    <Link
                      href={href(l, rest)}
                      hrefLang={l}
                      lang={l}
                      aria-current={l === locale ? "true" : undefined}
                      onClick={() => {
                        rememberLocale(l);
                        setOpen(false);
                      }}
                      className={l === locale ? "text-signal" : "text-sand"}
                    >
                      {localeNames[l]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
