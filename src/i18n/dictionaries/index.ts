import type { Locale } from "../config";
import ar from "./ar";
import en, { type Dictionary } from "./en";
import he from "./he";

const dictionaries: Record<Locale, Dictionary> = { he, ar, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
