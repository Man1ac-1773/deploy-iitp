"use client";

import { useEffect, useState } from "react";

export type ScrollPhase = "hero" | "portfolio";

type UseScrollPhaseOptions = {
  threshold?: number;
};

/**
 * Tracks document scroll past the hero viewport.
 * Ready for Framer Motion scroll-linked transitions — not wired to UI yet.
 */
export function useScrollPhase({
  threshold = 1,
}: UseScrollPhaseOptions = {}): ScrollPhase {
  const [phase, setPhase] = useState<ScrollPhase>("hero");

  useEffect(() => {
    const heroHeight = () => window.innerHeight * threshold;

    const updatePhase = () => {
      setPhase(window.scrollY >= heroHeight() ? "portfolio" : "hero");
    };

    updatePhase();
    window.addEventListener("scroll", updatePhase, { passive: true });
    window.addEventListener("resize", updatePhase);

    return () => {
      window.removeEventListener("scroll", updatePhase);
      window.removeEventListener("resize", updatePhase);
    };
  }, [threshold]);

  return phase;
}
