import type { Verification } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { contentMode } from "@/lib/mode";
import { PendingTag } from "./PendingTag";

/**
 * Marks NEEDS_CONFIRMATION content in preview mode so reviewers never mistake
 * draft claims for approved facts (PRD §15, Asset Strategy §5).
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
  if (contentMode === "strict" || verification.status !== "needs-confirmation") return null;
  return <PendingTag locale={locale} title={verification.notes} className={className} />;
}
