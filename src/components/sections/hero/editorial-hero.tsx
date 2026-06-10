"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
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
      
      nameRef.current.style.webkitTextFillColor = `rgba(255, 255, 255, ${fillOpacity})`;
      nameRef.current.style.webkitTextStroke = `${strokeWidth}px rgba(255, 255, 255, ${ratio * 0.8})`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize once
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      data-hero-root
      data-transition-phase="hero"
      aria-labelledby="hero-heading"
      className={cn(
        "hero-stage relative flex h-dvh min-h-dvh w-full flex-col overflow-hidden",
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
            <p className="font-mono text-[11px] font-semibold tracking-[0.25em] text-accent/80 uppercase">
              [SYS.STATE: NOISE_SUPPRESSION_ACTIVE]
            </p>
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/40 mt-1">
              EDGE_NODES_ACTIVE: 124 // UPTIME: 99.9%
            </p>
          </div>
        </div>

        {/* Center/Lower Massive Identity */}
        <div
          data-transition-id="professor-identity"
          className="flex flex-col gap-6 mt-auto mb-16 md:mb-24"
          style={{ opacity: 0, animation: "fadeIn 0.8s ease-out 0.2s forwards" }}
        >
          <div className="flex flex-col md:flex-row md:items-end gap-8 sm:gap-12">
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

            {professor.heroImage && (
              <motion.div 
                style={{ opacity: 0, animation: "fadeIn 1.5s ease-out 0.5s forwards" }}
                className="flex flex-col gap-2 p-2 sm:p-3 rounded-md border border-border/40 bg-surface/30 backdrop-blur-md shadow-2xl mb-1 sm:mb-2"
              >
                <div className="relative shrink-0 w-32 h-40 sm:w-48 sm:h-64 rounded-sm overflow-hidden border border-border/50">
                  <Image 
                    src={professor.heroImage} 
                    alt={`Portrait of ${professor.fullName}`} 
                    fill 
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div className="flex items-center justify-between px-1 py-0.5">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-muted-foreground uppercase">
                      Active
                    </span>
                  </div>
                  <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-muted-foreground uppercase">
                    ID: RM-124
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-6 mt-8 sm:mt-12 ml-1 sm:ml-3">
            <div className="h-[1px] w-12 sm:w-24 bg-accent/40" aria-hidden="true" />
            <p className="text-lg sm:text-xl text-foreground/80 font-medium tracking-tight">
              {professor.role}
            </p>
            <p className="font-mono text-[11px] tracking-widest text-muted-foreground/60 uppercase hidden sm:block" aria-hidden="true">
              // RESEARCH DOMAIN: FEDERATED LEARNING & FOG COMPUTING
            </p>
          </div>
        </div>

        {/* Bottom Scroll Anchor */}
        <div className="flex w-full items-end justify-between" style={{ opacity: 0, animation: "fadeIn 0.8s ease-out 0.4s forwards" }}>
          <span className="font-mono text-[11px] tracking-widest text-muted-foreground/30 uppercase" aria-hidden="true">
            SYS.PORTFOLIO.V2 // {new Date().getFullYear()}
          </span>
          <a
            href="#research"
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
