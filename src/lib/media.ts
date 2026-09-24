import type { IllustrationId, MediaImage } from "@/content/types";
import { contentMode } from "./mode";

export type ResolvedMedia =
  | { kind: "photo"; src: string }
  | { kind: "illustration"; id: IllustrationId }
  | { kind: "placeholder" };

/**
 * Asset priority (Asset Strategy): Original → Web → Generated → Placeholder.
 * A photo is used when it is VERIFIED, or — in preview only — when it still
 * needs company approval or is a web find without cleared rights.
 */
export function resolveMedia(image: MediaImage): ResolvedMedia {
  if (image.src) {
    const cleared =
      image.status === "verified" ||
      (image.status === "web" && (image.source?.permission === "granted" || image.source?.permission === "not-required"));
    if (cleared || (contentMode === "preview" && image.status !== "missing" && image.status !== "generated")) {
      return { kind: "photo", src: image.src };
    }
  }
  if (image.illustration) return { kind: "illustration", id: image.illustration };
  return { kind: "placeholder" };
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function illustrationSrc(id: IllustrationId | `story-${string}`) {
  return `${basePath}/generated/${id}.svg`;
}

/** next/image does not prefix basePath onto unoptimized local sources (static export). */
export function withBasePath(src: string) {
  return src.startsWith("/") && !src.startsWith("//") ? `${basePath}${src}` : src;
}
