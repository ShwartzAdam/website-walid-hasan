"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { MediaImage, MediaVideo } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/lib/site";
import { ArrowDownIcon, ArrowIcon } from "@/components/ui/Icons";
import { Media } from "@/components/ui/Media";

interface HeroProps {
  locale: Locale;
  image: MediaImage;
  video?: MediaVideo;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero({ locale, image, video }: HeroProps) {
  const dict = getDictionary(locale);
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-svh min-h-[36rem] items-end overflow-hidden bg-ink text-paper">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {video ? (
          <HeroVideo video={video} locale={locale} />
        ) : (
          <Media image={image} locale={locale} sizes="100vw" priority className="h-full w-full" />
        )}
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/20" aria-hidden />

      <motion.div style={{ opacity: fade }} className="container-x relative pb-24 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="eyebrow mb-6 text-sand"
        >
          {dict.common.tagline.join(" · ")}
        </motion.p>
        <h1 className="font-display text-display font-extrabold tracking-display">
          <span className="block overflow-hidden pb-[0.08em] rtl:pb-[0.16em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.25 }}
            >
              {dict.common.brand}
            </motion.span>
          </span>
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.55 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Link
            href={href(locale, "/projects")}
            className="btn btn-primary"
            data-track="cta_click"
            data-track-label="hero_explore"
          >
            {dict.common.exploreWork}
            <ArrowIcon />
          </Link>
          <Link
            href={href(locale, "/contact")}
            className="btn btn-ghost-light"
            data-track="cta_click"
            data-track-label="hero_contact"
          >
            {dict.common.contactUs}
          </Link>
        </motion.div>
      </motion.div>

      <a
        href="#intro"
        className="absolute end-4 bottom-24 hidden flex-col items-center gap-3 text-xs text-sand sm:end-8 md:bottom-10 md:flex"
      >
        <span className="[writing-mode:vertical-rl]">{dict.a11y.scrollDown}</span>
        <ArrowDownIcon className="motion-safe:animate-bounce" />
      </a>
    </section>
  );
}

function HeroVideo({ video, locale }: { video: MediaVideo; locale: Locale }) {
  const dict = getDictionary(locale);
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Adaptive loading (PRD §18): no video for reduced-motion or Save-Data users,
  // the lighter rendition on small screens. The source is attached imperatively
  // so nothing is downloaded before we know which rendition (if any) to use.
  useEffect(() => {
    const el = ref.current;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (!el || reduce || conn?.saveData) return;
    const small = window.matchMedia("(max-width: 767px)").matches;
    el.src = small && video.mobileSrc ? video.mobileSrc : video.src;
    void el.play().catch(() => undefined);
  }, [reduce, video]);

  return (
    <div className="relative h-full w-full">
      <Media image={video.poster} locale={locale} sizes="100vw" priority className="absolute inset-0" />
      <video
        ref={ref}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        onLoadedData={() => setReady(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {ready && (
        <button
          type="button"
          onClick={() => (playing ? ref.current?.pause() : ref.current?.play())}
          className="absolute end-4 top-24 z-10 border border-paper/40 bg-ink/40 px-3 py-2 text-xs text-paper sm:end-8 md:top-28"
        >
          {playing ? dict.a11y.pauseVideo : dict.a11y.playVideo}
        </button>
      )}
    </div>
  );
}
