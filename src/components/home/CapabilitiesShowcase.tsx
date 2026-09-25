"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Capability } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/lib/site";
import { ArrowIcon } from "@/components/ui/Icons";
import { Media } from "@/components/ui/Media";

interface Props {
  locale: Locale;
  items: Pick<Capability, "id" | "title" | "short" | "image">[];
}

/**
 * PRD §6.3 — interactive capability list. Desktop: hovering / focusing a
 * capability swaps the image and reveals its description. Mobile: swipeable cards.
 */
export function CapabilitiesShowcase({ locale, items }: Props) {
  const dict = getDictionary(locale);
  const [active, setActive] = useState(0);
  const current = items[active];
  if (!current) return null;

  return (
    <>
      {/* Desktop */}
      <div className="hidden gap-12 lg:grid lg:grid-cols-12">
        <ul className="lg:col-span-7">
          {items.map((item, i) => (
            <li key={item.id} className="border-t border-graphite last:border-b">
              <Link
                href={href(locale, `/capabilities/${item.id}`)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-describedby={i === active ? "capability-desc" : undefined}
                className="group flex items-baseline gap-6 py-5"
              >
                <span className="w-8 text-xs tabular-nums text-stone">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={`font-display text-[clamp(2rem,4.2vw,4.25rem)] leading-none font-bold uppercase transition-colors duration-500 rtl:normal-case ${
                    i === active ? "text-paper" : "text-stone group-hover:text-sand"
                  }`}
                >
                  {item.title[locale]}
                </span>
                <ArrowIcon
                  className={`ms-auto h-6 w-6 transition-all duration-500 ${
                    i === active ? "translate-x-0 text-signal opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>
        <div className="lg:col-span-5">
          <div className="sticky top-28">
            <div className="relative aspect-[4/5] overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={current.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Media image={current.image} locale={locale} sizes="40vw" className="h-full w-full" />
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                id="capability-desc"
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="mt-6 max-w-md text-lg text-sand"
              >
                {current.short[locale]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: horizontal swipe cards */}
      <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:hidden">
        {items.map((item, i) => (
          <li key={item.id} className="w-[78vw] max-w-sm shrink-0 snap-start">
            <Link href={href(locale, `/capabilities/${item.id}`)} className="block">
              <Media image={item.image} locale={locale} sizes="80vw" className="aspect-[4/5] w-full" />
              <div className="border-b border-graphite py-5">
                <span className="text-xs tabular-nums text-stone">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-3xl font-bold uppercase rtl:normal-case">{item.title[locale]}</h3>
                <p className="mt-2 text-sm text-sand">{item.short[locale]}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-signal">
                  {dict.common.learnMore}
                  <ArrowIcon />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
