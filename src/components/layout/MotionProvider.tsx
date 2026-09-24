"use client";

import { MotionConfig } from "motion/react";

/** Global motion settings — respects the OS "reduce motion" preference (PRD §13). */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
