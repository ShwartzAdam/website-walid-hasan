import Image from "next/image";
import type { MediaImage } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface MediaProps {
  image: MediaImage;
  locale: Locale;
  /** Responsive `sizes` hint for next/image. */
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Tone of the placeholder when the photo is still pending. */
  tone?: "dark" | "light";
}

/**
 * Renders a project/company photo with next/image (AVIF/WebP, responsive, lazy),
 * or — while the real photograph is still being produced — an intentional
 * "photo pending" slot showing the shot brief, so layouts can be reviewed
 * without resorting to stock photography (PRD §14).
 */
export function Media({ image, locale, sizes, priority, className = "", tone = "dark" }: MediaProps) {
  const alt = image.alt[locale];
  if (image.src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={image.src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  const dict = getDictionary(locale);
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden ${dark ? "bg-asphalt text-stone" : "bg-sand text-steel"} ${className}`}
    >
      <div className={`absolute inset-0 ${dark ? "survey-grid" : ""}`} aria-hidden />
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-40"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 800 600"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M-50 ${120 + i * 55} C 150 ${60 + i * 58}, 300 ${220 + i * 40}, 480 ${140 + i * 52} S 760 ${90 + i * 60}, 860 ${170 + i * 50}`}
            />
          ))}
        </g>
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 text-[11px] leading-snug sm:p-5">
        <span className="font-semibold tracking-[0.14em] uppercase rtl:tracking-normal">
          {dict.common.photoPending}
        </span>
        {image.brief && (
          <span dir="ltr" className="max-w-sm text-start opacity-80 rtl:text-end">
            {image.brief}
          </span>
        )}
      </div>
    </div>
  );
}
