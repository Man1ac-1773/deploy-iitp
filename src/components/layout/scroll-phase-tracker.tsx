"use client";

import { useScrollPhase } from "@/hooks/use-scroll-phase";
import { useEffect } from "react";

export function ScrollPhaseTracker() {
  const phase = useScrollPhase();

  useEffect(() => {
    document.documentElement.dataset.scrollPhase = phase;

    return () => {
      delete document.documentElement.dataset.scrollPhase;
    };
  }, [phase]);

  return null;
}
