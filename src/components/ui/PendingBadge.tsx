import type { Verification } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { contentMode } from "@/lib/content";
import { PendingTag } from "./PendingTag";

/**
 * Server-side marker on content that has not yet been verified (preview mode only).
 * Keeps reviewers from mistaking draft claims for approved facts (PRD §15).
 */
export function PendingBadge({
  verification,
  locale,
  className,
}: {
  verification: Verification;
  locale: Locale;
  className?: string;
}) {
  if (contentMode === "strict" || verification.status !== "unverified") return null;
  return <PendingTag locale={locale} title={verification.notes} className={className} />;
}
