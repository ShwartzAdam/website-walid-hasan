"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Counts up to `value` once visible (PRD §13 "number animation"). */
export function StatCounter({ value, raw, suffix = "", locale }: { value: number | string; raw?: boolean; suffix?: string; locale: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const numeric = typeof value === "number";
  const format = (n: number) => (raw ? String(Math.round(n)) : Math.round(n).toLocaleString(locale === "en" ? "en-US" : "he-IL"));
  const [display, setDisplay] = useState(() => (numeric ? format(value as number) : String(value)));

  useEffect(() => {
    if (!numeric || !inView || reduce) return;
    const target = value as number;
    // Years and licence numbers count up over their last few hundred only, so they stay recognisable.
    const from = raw ? Math.max(0, target - Math.min(target, 400)) : 0;
    const controls = animate(from, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(format(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, numeric, value]);

  return (
    <span ref={ref} dir="ltr" className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
