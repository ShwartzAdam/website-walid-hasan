import { Archivo, Heebo, IBM_Plex_Sans_Arabic, Noto_Kufi_Arabic } from "next/font/google";
import type { Locale } from "@/i18n/config";

// Hebrew is the primary market language, so only Heebo is preloaded.
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
  preload: false,
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
  preload: false,
});

const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-kufi",
  display: "swap",
  preload: false,
});

export const fontVariables = [heebo.variable, archivo.variable, plexArabic.variable, kufi.variable].join(" ");

/** Maps each locale to its heading/body font variables (consumed by globals.css). */
export const localeFontStyle: Record<Locale, React.CSSProperties> = {
  he: {
    ["--font-heading" as string]: "var(--font-heebo)",
    ["--font-body" as string]: "var(--font-heebo)",
  },
  ar: {
    ["--font-heading" as string]: "var(--font-kufi)",
    ["--font-body" as string]: "var(--font-plex-arabic)",
  },
  en: {
    ["--font-heading" as string]: "var(--font-archivo)",
    ["--font-body" as string]: "var(--font-archivo)",
  },
};
