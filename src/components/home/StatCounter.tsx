"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `value` once visible (PRD §13 "number animation").
 * `raw` values (years, licence numbers) are identifiers, not quantities, so they never animate:
 * a count-up would show wrong numbers on the way.
 */
export function StatCounter({ value, raw, suffix = "", locale }: { value: number | string; raw?: boolean; suffix?: string; locale: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const numeric = typeof value === "number";
  const format = (n: number) => (raw ? String(Math.round(n)) : Math.round(n).toLocaleString(locale === "en" ? "en-US" : "he-IL"));
  const [display, setDisplay] = useState(() => (numeric ? format(value as number) : String(value)));

  useEffect(() => {
    if (!numeric || raw || !inView || reduce) return;
    const controls = animate(0, value as number, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(format(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, numeric, raw, value]);

  return (
    <span ref={ref} dir="ltr" className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
