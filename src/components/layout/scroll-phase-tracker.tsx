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

    // Viewport Scroll-Reveal Observer
    const revealCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      root: null,
      rootMargin: "0px 0px -10% 0px", // Animates when entering 10% above screen bottom
      threshold: 0.05,
    });

    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll(".scroll-reveal");
      revealElements.forEach((el) => revealObserver.observe(el));
    }, 100);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      document.documentElement.style.removeProperty("--scroll-progress");
      delete document.documentElement.dataset.scrollPhase;
      clearTimeout(timer);
      revealObserver.disconnect();
    };
  }, []);

  return null;
}
