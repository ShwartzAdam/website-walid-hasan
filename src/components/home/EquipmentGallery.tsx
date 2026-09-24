"use client";

import { useRef } from "react";
import type { EquipmentItem } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ArrowIcon } from "@/components/ui/Icons";
import { Media } from "@/components/ui/Media";
import { PendingTag } from "@/components/ui/PendingTag";

interface Props {
  locale: Locale;
  items: (Pick<EquipmentItem, "id" | "name" | "count" | "image"> & { pending: boolean; categoryLabel: string })[];
}

/** Horizontal, scroll-snapped equipment gallery (PRD §6.7). Direction-aware for RTL. */
export function EquipmentGallery({ locale, items }: Props) {
  const dict = getDictionary(locale);
  const track = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollBy({ left: dir * (rtl ? -1 : 1) * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-6 flex justify-end gap-2">
        <button type="button" onClick={() => scrollBy(-1)} aria-label={dict.a11y.previous} className="border border-graphite p-3 hover:border-signal hover:text-signal">
          <ArrowIcon className="rotate-180" />
        </button>
        <button type="button" onClick={() => scrollBy(1)} aria-label={dict.a11y.next} className="border border-graphite p-3 hover:border-signal hover:text-signal">
          <ArrowIcon />
        </button>
      </div>
      <ul
        ref={track}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 sm:-mx-8 sm:px-8 xl:-mx-14 xl:px-14"
      >
        {items.map((item) => (
          <li key={item.id} className="w-[75vw] shrink-0 snap-start sm:w-[45vw] lg:w-[30vw] xl:w-[26rem]">
            <figure>
              <div className="relative">
                <Media image={item.image} locale={locale} sizes="(min-width: 1024px) 30vw, 75vw" className="aspect-[4/3] w-full" />
                {item.pending && <PendingTag locale={locale} className="absolute start-3 top-3" />}
              </div>
              <figcaption className="flex items-baseline justify-between border-b border-graphite py-4">
                <span>
                  <span className="block text-xs text-stone">{item.categoryLabel}</span>
                  <span className="mt-1 block font-display text-xl font-bold">{item.name[locale]}</span>
                </span>
                {item.count !== undefined && (
                  <span className="font-display text-3xl font-bold text-signal tabular-nums">×{item.count}</span>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
