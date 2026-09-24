"use client";

import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/lib/site";
import { ArrowIcon, PinIcon } from "@/components/ui/Icons";
import { Media } from "@/components/ui/Media";
import type { MediaImage } from "@/content/types";

export interface MapProject {
  slug: string;
  title: string;
  location: string;
  category: string;
  coordinates: [number, number];
  image: MediaImage;
}

const TILE_URL =
  process.env.NEXT_PUBLIC_MAP_TILE_URL || "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_ATTRIBUTION =
  process.env.NEXT_PUBLIC_MAP_ATTRIBUTION ||
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

/**
 * Minimal interactive project map (PRD §6.6). Leaflet is only downloaded once
 * the map scrolls near the viewport. The list next to it doubles as the
 * mobile / keyboard / screen-reader alternative.
 */
export function ProjectMap({ locale, projects }: { locale: Locale; projects: MapProject[] }) {
  const dict = getDictionary(locale);
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markers = useRef<Map<string, Marker>>(new Map());
  const [active, setActive] = useState<string>(projects[0]?.slug ?? "");

  useEffect(() => {
    const el = container.current;
    if (!el || projects.length === 0) return;
    let cancelled = false;

    const init = async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || mapRef.current) return;
      const map = L.map(el, {
        center: [31.9, 35.0],
        zoom: 7,
        minZoom: 6,
        maxZoom: 14,
        scrollWheelZoom: false,
        zoomControl: false,
        attributionControl: true,
      });
      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.tileLayer(TILE_URL, { attribution: TILE_ATTRIBUTION, subdomains: "abcd", maxZoom: 19 }).addTo(map);

      for (const p of projects) {
        const marker = L.marker(p.coordinates, {
          title: p.title,
          alt: p.title,
          keyboard: true,
          icon: L.divIcon({ className: "", html: `<span class="map-marker" data-slug="${p.slug}"></span>`, iconSize: [18, 18] }),
        })
          .addTo(map)
          .on("click", () => setActive(p.slug));
        markers.current.set(p.slug, marker);
      }
      map.fitBounds(L.latLngBounds(projects.map((p) => p.coordinates)).pad(0.6), { maxZoom: 9 });
      mapRef.current = map;
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void init();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);

    const registry = markers.current;
    return () => {
      cancelled = true;
      io.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
      registry.clear();
    };
  }, [projects]);

  useEffect(() => {
    for (const [slug, marker] of markers.current) {
      marker.getElement()?.querySelector(".map-marker")?.classList.toggle("is-active", slug === active);
    }
    const p = projects.find((x) => x.slug === active);
    if (p && mapRef.current) mapRef.current.panTo(p.coordinates, { animate: true });
  }, [active, projects]);

  const current = projects.find((p) => p.slug === active);

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="relative lg:col-span-8">
        <div
          ref={container}
          dir="ltr"
          role="region"
          aria-label={dict.a11y.mapLabel}
          className="aspect-[4/5] w-full bg-asphalt sm:aspect-[16/11] lg:aspect-auto lg:h-[70vh]"
        />
        {current && (
          <div className="pointer-events-none absolute inset-x-3 bottom-3 z-[500] sm:inset-x-auto sm:start-4 sm:bottom-4 sm:w-80">
            <Link
              href={href(locale, `/projects/${current.slug}`)}
              className="pointer-events-auto flex gap-4 bg-ink/95 p-3 text-paper backdrop-blur hover:text-signal"
            >
              <Media image={current.image} locale={locale} sizes="96px" className="aspect-square w-24 shrink-0" />
              <span className="flex min-w-0 flex-col justify-between py-1">
                <span>
                  <span className="block text-xs text-stone">{current.category}</span>
                  <span className="mt-1 block font-display text-lg leading-tight font-bold">{current.title}</span>
                  <span className="mt-1 block text-xs text-sand">{current.location}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-signal">
                  {dict.common.viewProject} <ArrowIcon className="h-3 w-3" />
                </span>
              </span>
            </Link>
          </div>
        )}
      </div>
      <div className="lg:col-span-4">
        <h3 className="eyebrow mb-4 text-stone">{dict.home.mapListTitle}</h3>
        <ul className="divide-y divide-graphite border-y border-graphite">
          {projects.map((p) => (
            <li key={p.slug}>
              <button
                type="button"
                onClick={() => setActive(p.slug)}
                aria-pressed={p.slug === active}
                className={`flex w-full items-center gap-3 py-4 text-start transition-colors ${
                  p.slug === active ? "text-signal" : "text-sand hover:text-paper"
                }`}
              >
                <PinIcon className="shrink-0" />
                <span className="min-w-0">
                  <span className="block font-semibold">{p.title}</span>
                  <span className="block text-xs text-stone">
                    {p.location} · {p.category}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
