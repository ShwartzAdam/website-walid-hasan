import Image from "next/image";
import type { MediaImage } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { illustrationSrc, resolveMedia, withBasePath } from "@/lib/media";

interface MediaProps {
  image: MediaImage;
  locale: Locale;
  /** Responsive `sizes` hint for next/image. */
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Tone of the placeholder when nothing else is available. */
  tone?: "dark" | "light";
  /** Hide the "Illustration" tag (only for purely decorative, clearly abstract use). */
  hideIllustrationLabel?: boolean;
}

/**
 * Renders the best available asset, in the Asset Strategy's priority order:
 * original/permitted photo → GENERATED illustration (always labelled, never
 * passed off as documentation) → an explicit "photo pending" placeholder.
 */
export function Media({ image, locale, sizes, priority, className = "", tone = "dark", hideIllustrationLabel }: MediaProps) {
  const alt = image.alt[locale];
  const dict = getDictionary(locale);
  const resolved = resolveMedia(image);

  if (resolved.kind === "photo") {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={withBasePath(resolved.src)} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  if (resolved.kind === "illustration") {
    return (
      <div className={`relative overflow-hidden bg-asphalt ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation needed */}
        <img
          src={illustrationSrc(resolved.id)}
          alt={`${alt} — ${dict.common.illustration}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {!hideIllustrationLabel && (
          <span className="pointer-events-none absolute end-2 bottom-2 bg-ink/70 px-1.5 py-0.5 text-[10px] tracking-wider text-sand/80 uppercase backdrop-blur-sm rtl:tracking-normal">
            {dict.common.illustration}
          </span>
        )}
      </div>
    );
  }

  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden ${dark ? "bg-asphalt text-stone" : "bg-sand text-steel"} ${className}`}
    >
      <div className={`absolute inset-0 ${dark ? "survey-grid" : ""}`} aria-hidden />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 text-[11px] leading-snug sm:p-5">
        <span className="font-semibold tracking-[0.14em] uppercase rtl:tracking-normal">{dict.common.photoPending}</span>
        {image.brief && (
          <span dir="ltr" className="max-w-sm text-start opacity-80 rtl:text-end">
            {image.brief}
          </span>
        )}
      </div>
    </div>
  );
}
