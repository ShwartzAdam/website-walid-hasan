import type { MediaImage } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";

/** Interior page hero — dark, full-bleed, headline-led. */
export function PageHero({
  locale,
  eyebrow,
  title,
  body,
  image,
  children,
}: {
  locale: Locale;
  eyebrow?: string;
  title: string;
  body?: string;
  image?: MediaImage;
  children?: React.ReactNode;
}) {
  return (
    <section className={`relative flex items-end overflow-hidden bg-ink text-paper ${image ? "min-h-[80svh]" : "min-h-[60svh]"}`}>
      {image ? (
        <>
          <Media image={image} locale={locale} sizes="100vw" priority className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" aria-hidden />
        </>
      ) : (
        <div className="survey-grid absolute inset-0" aria-hidden />
      )}
      <div className="container-x relative pt-36 pb-16 md:pb-20">
        {eyebrow && (
          <Reveal>
            <p className="eyebrow mb-6 text-sand">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className="max-w-6xl font-display text-[clamp(2.75rem,8vw,8.5rem)] leading-[0.92] font-extrabold tracking-display">
            {title}
          </h1>
        </Reveal>
        {body && (
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg text-sand md:text-xl">{body}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
