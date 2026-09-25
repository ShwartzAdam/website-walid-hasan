"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { illustrationSrc } from "@/lib/media";

const LAYERS = ["story-ground", "story-infrastructure", "story-development", "story-community"] as const;

/**
 * GROUND → INFRASTRUCTURE → DEVELOPMENT → COMMUNITY (Asset Strategy, "Core Visual Story").
 * A pinned plan drawing that builds up layer by layer as the visitor scrolls.
 * The drawing is a GENERATED illustration and is labelled as such.
 */
export function BuildStory({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const stages = dict.home.buildStages;
  const ref = useRef<HTMLElement>(null);
  // 0 → 1 across the pinned section. A plain rAF-throttled listener keeps the
  // layers in lock-step with the scroll position on every browser.
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        setProgress(total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const active = Math.min(stages.length - 1, Math.floor(progress * stages.length * 0.999 + 0.08));

  return (
    <section ref={ref} className="relative bg-ink text-paper" style={{ height: `${stages.length * 55 + 50}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div style={{ transform: `scale(${1.12 - 0.12 * progress})` }} className="absolute inset-0 will-change-transform" aria-hidden>
          {LAYERS.map((id, i) => {
            // Each layer fades in across the first part of its own stage.
            const start = i / LAYERS.length;
            const opacity = i === 0 ? 1 : Math.min(1, Math.max(0, (progress - (start - 0.06)) / 0.16));
            return (
              // eslint-disable-next-line @next/next/no-img-element -- static SVG layers
              <img
                key={id}
                src={illustrationSrc(id as `story-${string}`)}
                alt=""
                style={{ opacity }}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            );
          })}
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60 md:bg-gradient-to-r md:from-ink/90 md:via-ink/20 md:to-transparent md:rtl:bg-gradient-to-l"
          aria-hidden
        />

        <div className="container-x relative flex h-full flex-col justify-between pt-28 pb-24 md:pb-16">
          <div>
            <p className="eyebrow mb-5 text-sand">{dict.home.buildEyebrow}</p>
            <h2 className="max-w-xl font-display text-headline font-bold tracking-display">{dict.home.buildHeadline}</h2>
          </div>

          <ol className="max-w-md space-y-1">
            {stages.map((stage, i) => (
              <li
                key={stage.title}
                aria-current={i === active ? "step" : undefined}
                className={`relative border-s-2 ps-5 transition-all duration-500 ${
                  i === active ? "border-signal opacity-100" : i < active ? "border-sand/40 opacity-50" : "border-graphite opacity-35"
                }`}
              >
                <p className="flex items-baseline gap-3 py-1">
                  <span className="text-xs text-stone tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-2xl font-bold uppercase md:text-3xl rtl:normal-case">{stage.title}</span>
                </p>
                <p
                  className={`overflow-hidden text-sand transition-all duration-500 ${
                    i === active ? "max-h-24 pb-3 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {stage.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <span className="absolute end-4 bottom-20 bg-ink/70 px-1.5 py-0.5 text-[10px] tracking-wider text-sand/80 uppercase md:end-8 md:bottom-6 rtl:tracking-normal">
          {dict.common.illustration}
        </span>
      </div>
    </section>
  );
}
