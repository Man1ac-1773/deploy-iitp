"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

type EditorialHeroProps = {
  className?: string;
};

export function EditorialHero({ className }: EditorialHeroProps) {
  const { professor } = siteConfig;
  const nameRef = useRef<HTMLSpanElement>(null);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 800], [0, 200]);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      if (!nameRef.current) return;
      const scrollY = window.scrollY;
      const maxScroll = Math.min(window.innerHeight * 0.8, 600); // 80% of screen height
      const ratio = Math.min(scrollY / maxScroll, 1);
      
      // As scroll ratio goes 0 -> 1
      // Fill opacity goes 1 -> 0
      // Stroke width goes 0 -> 1.5px
      const fillOpacity = Math.max(0, 1 - ratio * 1.5); // fades out a bit faster
      const strokeWidth = ratio * 1.5;
      
      const isDark = document.documentElement.classList.contains('dark');
      const rgb = isDark ? '255, 255, 255' : '30, 41, 59';
      
      nameRef.current.style.webkitTextFillColor = `rgba(${rgb}, ${fillOpacity})`;
      nameRef.current.style.webkitTextStroke = `${strokeWidth}px rgba(${rgb}, ${ratio * 0.8})`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize once
    handleScroll();
    
    
    // Create an observer to re-run handleScroll when the dark class changes on HTML
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          handleScroll();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      data-hero-root
      data-transition-phase="hero"
      aria-labelledby="hero-heading"
      className={cn(
        "hero-stage relative flex h-dvh min-h-dvh w-full flex-col overflow-x-hidden",
        className,
      )}
    >

      {/* Massive Typography Hero Container */}
      <div className="relative z-10 flex size-full flex-col justify-between p-6 sm:p-12 md:p-16 lg:p-24">
        
        {/* Portrait has been moved to the identity block below */}
        {/* Top Header - Strategic Balance */}
        <div className="flex w-full items-start justify-between" style={{ opacity: 0, animation: "fadeIn 0.8s ease-out 0s forwards" }}>
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[11px] font-bold tracking-[0.35em] text-foreground/80 uppercase">
              {siteConfig.lab}
            </p>
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/60 uppercase">
              {professor.affiliation}
            </p>
          </div>
          <div className="text-right" aria-hidden="true">
            <p className="font-mono text-[11px] font-semibold tracking-[0.25em] text-accent uppercase">
              H-INDEX: 12 // i10-INDEX: 15
            </p>
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground mt-1">
              CITATIONS: 450+ // PUBLICATIONS: 45
            </p>
          </div>
        </div>

        {/* Center/Lower Massive Identity (Split-Screen Anchor) */}
        <div
          data-transition-id="professor-identity"
          className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16 xl:gap-24 mt-auto mb-16 md:mb-24 w-full"
          style={{ opacity: 0, animation: "fadeIn 0.8s ease-out 0.2s forwards" }}
        >
          {/* Left Side: Typography and Bio (60%) */}
          <div className="flex flex-col gap-6 lg:w-[60%] shrink-0">
            <div className="flex flex-col gap-4">
              <span className="block font-mono text-xs sm:text-sm font-semibold tracking-[0.4em] text-accent/90 uppercase ml-1 sm:ml-2">
                {professor.honorific}
              </span>
              <h1
                id="hero-heading"
                className="hero-name w-full max-w-full font-semibold text-foreground uppercase"
                style={{ 
                  fontSize: "var(--hero-name-size, clamp(3.5rem, 8vw, 8rem))", 
                  lineHeight: "0.9", 
                  letterSpacing: "-0.02em",
                  marginLeft: "-0.04em" // optically align the text
                }}
              >
                <span 
                  ref={nameRef}
                  data-transition-target="professor-name" 
                  className="block transition-colors duration-100 ease-out"
                  style={{
                    WebkitTextFillColor: "rgba(255, 255, 255, 1)",
                    WebkitTextStroke: "0px rgba(255, 255, 255, 0)"
                  }}
                >
                  {professor.name}
                </span>
              </h1>
            </div>

            <div className="flex flex-col gap-8 mt-4 ml-1 sm:ml-3">
              <div className="flex flex-wrap items-center gap-6">
                <div className="h-[1px] w-12 sm:w-24 bg-accent/40" aria-hidden="true" />
                <p className="text-lg sm:text-xl text-foreground/80 font-medium tracking-tight">
                  {professor.role}
                </p>
                <p className="font-mono text-[11px] tracking-widest text-muted-foreground/60 uppercase hidden sm:block" aria-hidden="true">
                  // {professor.affiliation}
                </p>
              </div>
              
              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground/90 font-light">
                {professor.bio}
              </p>
            </div>
          </div>

          {/* Right Side: Massive Portrait Anchor (40%) */}
          {professor.heroImage && (
            <motion.div 
              style={{ opacity: 0, animation: "fadeIn 1.5s ease-out 0.5s forwards" }}
              className="relative w-full sm:w-[80%] md:w-[60%] lg:w-[40%] aspect-[4/5] shadow-2xl shrink-0 ml-auto lg:ml-0 xl:ml-auto p-3 bg-black/5 dark:bg-background/80 border border-black/10 dark:border-border/50 rounded-none dark:rounded-lg"
            >
              <div className="relative w-full h-full overflow-hidden border border-black/5 dark:border-transparent rounded-none dark:rounded-lg">
                <Image 
                  src={professor.heroImage} 
                  alt={`Portrait of ${professor.fullName}`} 
                  fill 
                  className="object-cover object-top dark:contrast-100 dark:saturate-100 contrast-[1.05] saturate-[1.1]"
                  priority
                />
              </div>
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg pointer-events-none hidden dark:block" />
            </motion.div>
          )}
        </div>

        {/* Bottom Scroll Anchor */}
        <div className="flex w-full items-end justify-between" style={{ opacity: 0, animation: "fadeIn 0.8s ease-out 0.4s forwards" }}>
          <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase" aria-hidden="true">
            ACADEMIC.PORTFOLIO // {new Date().getFullYear()}
          </span>
          <a
            href="#research"
            onClick={(e) => {
              if (lenis) {
                e.preventDefault();
                lenis.scrollTo("#research");
                document.getElementById('research')?.focus({ preventScroll: true });
              }
            }}
            aria-label="Explore Research"
            className="group flex flex-col items-end gap-3 text-muted-foreground"
          >
            <span className="font-mono text-[11px] font-bold tracking-[0.24em] uppercase text-foreground/60 group-hover:text-accent transition-colors duration-300">
              Explore Research
            </span>
            <div className="relative h-12 w-[1px] overflow-hidden bg-border" aria-hidden="true">
              <div className="absolute inset-x-0 top-0 h-1/2 bg-accent animate-pulse" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
