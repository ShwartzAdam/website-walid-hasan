import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Pure (client-safe) "pending verification" tag. Decide visibility on the server. */
export function PendingTag({ locale, title, className = "" }: { locale: Locale; title?: string; className?: string }) {
  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1.5 border border-dashed border-signal/70 bg-ink/70 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-signal uppercase backdrop-blur-sm rtl:tracking-normal ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
      {getDictionary(locale).common.pendingVerification}
    </span>
  );
}
