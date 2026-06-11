"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

function HashScroller() {
  const lenis = useLenis();
  useEffect(() => {
    if (lenis && window.location.hash) {
      const target = document.querySelector(window.location.hash) as HTMLElement | null;
      if (target) {
        // Use a slight timeout to ensure layout is ready
        setTimeout(() => {
          lenis.scrollTo(target, { immediate: true });
        }, 100);
      }
    }
  }, [lenis]);
  return null;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <HashScroller />
      {children}
    </ReactLenis>
  );
}
