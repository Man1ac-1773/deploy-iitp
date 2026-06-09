"use client";

import { useEffect } from "react";

export function ScrollPhaseTracker() {
  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const height = window.innerHeight;
          const progress = Math.max(0, Math.min(1, scrollY / (height || 1)));
          document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
          
          if (scrollY >= height) {
            document.documentElement.dataset.scrollPhase = "portfolio";
          } else {
            document.documentElement.dataset.scrollPhase = "hero";
          }
          ticking = false;
        });
      }
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      document.documentElement.style.removeProperty("--scroll-progress");
      delete document.documentElement.dataset.scrollPhase;
    };
  }, []);

  return null;
}
