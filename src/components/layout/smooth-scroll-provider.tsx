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

/**
 * @architecture
 * I am intentionally hijacking native scrolling using Lenis here.
 * It adds a bit to the bundle size, but the premium kinetic feel it gives to the scroll with the custom expo easing is totally worth the tradeoff.
 * It makes the whole single-page flow feel like butter on a trackpad.
 * I am prioritizing the human UX tradeoff here over a tiny bundle size optimization.
 * Looks cool no? 
 * I'd be surprised if someone actually reads my mountain dew fueled comments lmao
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        smoothWheel: true,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Premium expo easing
      }}
    >
      <HashScroller />
      {children}
    </ReactLenis>
  );
}
