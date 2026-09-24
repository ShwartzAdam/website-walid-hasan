type IconProps = { className?: string };

/** Directional arrow that points "forward" in the current reading direction. */
export function ArrowIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`h-4 w-4 rtl:-scale-x-100 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowDownIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M12 4v15M6 13l6 6 6-6" strokeLinecap="square" />
    </svg>
  );
}

export function PhoneIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`h-5 w-5 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 4h3.5l1.5 4.5-2.25 1.5a11 11 0 0 0 6.25 6.25L15.5 14l4.5 1.5V19a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
    </svg>
  );
}

export function MailIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`h-5 w-5 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`h-5 w-5 ${className}`} fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.16-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.06.9.9-2.98-.2-.31a8.2 8.2 0 1 1 6.84 3.72Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.13-.16.24-.63.8-.78.96-.14.17-.29.19-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.76 4.76 0 0 0 1 2.53 10.9 10.9 0 0 0 4.18 3.7c1.56.67 2.17.73 2.95.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function MenuIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`h-6 w-6 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 8h18M3 16h18" />
    </svg>
  );
}

export function CloseIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`h-6 w-6 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="m5 5 14 14M19 5 5 19" />
    </svg>
  );
}

export function PinIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`h-5 w-5 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}
