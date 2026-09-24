"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Fires a single analytics event when mounted (e.g. project_view). */
export function TrackView({ event, params }: { event: AnalyticsEvent; params: Record<string, string> }) {
  const key = JSON.stringify(params);
  useEffect(() => {
    track(event, JSON.parse(key));
  }, [event, key]);
  return null;
}
