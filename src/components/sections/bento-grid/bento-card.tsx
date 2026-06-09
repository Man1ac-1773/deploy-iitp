"use client";

import { SectionLabel } from "@/components/shared/typography/section-label";
import type { BentoCardData } from "@/types/bento";
import { cn } from "@/lib/utils";
import { useRef, type MouseEvent } from "react";

const SPAN_CLASSES = {
  "feature-tall":
    "lg:col-span-8 lg:row-span-2 lg:row-start-1 lg:col-start-1",
  "sidebar-top": "lg:col-span-4 lg:row-span-1 lg:row-start-1 lg:col-start-9 z-10",
  "sidebar-bottom":
    "lg:col-span-4 lg:row-span-1 lg:row-start-2 lg:col-start-9 z-20",
  wide: "lg:col-span-12 lg:row-span-1 lg:row-start-3 lg:col-start-1",
} as const;

type BentoCardProps = {
  card: BentoCardData;
  className?: string;
};

export function BentoCard({ card, className }: BentoCardProps) {
  const isFeature = card.span === "feature-tall";
  const cardRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  // Map card IDs to index numbers
  const CARD_INDEXES: Record<string, string> = {
    "research-areas": "01",
    awards: "02",
    teaching: "03",
    projects: "04",
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      id={card.id}
      aria-labelledby={`${card.id}-title`}
      data-bento-span={card.span}
      className={cn(
        "flex min-h-44 flex-col bg-surface/30 backdrop-blur-md border border-border/40 hover:border-accent/40 shadow-xl shadow-black/20 transition-all duration-300 p-6 sm:min-h-48 sm:p-8 lg:min-h-0 lg:p-10 rounded-sm relative group overflow-hidden",
        SPAN_CLASSES[card.span],
        className,
      )}
    >
      {/* Radial Background Hover Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: "radial-gradient(500px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(91, 141, 239, 0.05), transparent 80%)",
        }}
      />
      
      {/* Radial Glowing Border Mask Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 border border-accent/15"
        style={{
          maskImage: "radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black 30%, transparent 70%)",
        }}
      />

      {/* Domain-specific SVG Metaphor Overlays (Federated Learning & Fog) */}
      {card.id === "research-areas" && (
        <svg className="absolute bottom-2 right-2 size-32 text-accent/10 pointer-events-none select-none transition-all duration-500 group-hover:text-accent/25" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" className="fill-none stroke-currentColor stroke-[0.8] stroke-dasharray-[2_2]" />
          <circle cx="50" cy="50" r="15" className="fill-none stroke-currentColor stroke-[0.8]" />
          <circle cx="50" cy="50" r="3" className="fill-accent-warm/70" />
          <path d="M 50,20 L 50,35 M 50,65 L 50,80 M 20,50 L 35,50 M 65,50 L 80,50" stroke="currentColor" strokeWidth="1" />
          <text x="50" y="8" textAnchor="middle" fontSize="5" fill="currentColor" className="font-mono font-bold tracking-widest">GLOBAL.MODEL</text>
        </svg>
      )}
 
      {card.id === "awards" && (
        <svg className="absolute bottom-2 right-2 size-28 text-accent/10 pointer-events-none select-none transition-all duration-500 group-hover:text-accent/25" viewBox="0 0 100 100">
          <path d="M 10,80 Q 30,80 50,50 T 90,20" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M 10,80 Q 30,60 50,30 T 90,10" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 1.5" className="text-accent-warm/50" />
          <circle cx="90" cy="20" r="2" fill="currentColor" className="text-accent-warm" />
          <text x="70" y="25" textAnchor="middle" fontSize="5" fill="currentColor" className="font-mono">ACCURACY_PEAK</text>
        </svg>
      )}
 
      {card.id === "teaching" && (
        <svg className="absolute bottom-2 right-2 size-28 text-accent/10 pointer-events-none select-none transition-all duration-500 group-hover:text-accent/25" viewBox="0 0 100 100">
          {/* Drone/UAV Topology Grid */}
          <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M 40,40 L 60,60 M 60,40 L 40,60" stroke="currentColor" strokeWidth="1" className="text-accent-warm/80" />
          <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <text x="50" y="15" textAnchor="middle" fontSize="5" fill="currentColor" className="font-mono">UAV.GRID.COORD</text>
        </svg>
      )}
 
      {card.id === "projects" && (
        <svg className="absolute bottom-2 right-2 size-32 text-accent/10 pointer-events-none select-none transition-all duration-500 group-hover:text-accent/25" viewBox="0 0 100 100">
          {/* Signal vs Noise Rectification */}
          <path d="M 10,50 L 20,20 L 30,80 L 40,10 L 50,90 L 60,30 L 70,70 L 80,40 L 90,50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-destructive/40" />
          <path d="M 10,50 Q 25,45 50,50 T 90,50" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-warm" />
          <text x="50" y="90" textAnchor="middle" fontSize="5" fill="currentColor" className="font-mono font-bold">NOISE_RECTIFICATION</text>
        </svg>
      )}

      <span className="font-mono text-[9px] tracking-wider text-muted-foreground/30 absolute top-4 right-4 group-hover:text-accent/60 transition-colors duration-300">
        [ {CARD_INDEXES[card.id] || "00"} ]
      </span>
      <div className="flex flex-1 flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-3">
          <SectionLabel>{card.label}</SectionLabel>
          <h3
            id={`${card.id}-title`}
            className={cn(
              "text-balance font-medium tracking-tight text-foreground",
              isFeature
                ? "text-2xl sm:text-3xl lg:text-4xl"
                : "text-xl sm:text-2xl",
            )}
          >
            {card.title}
          </h3>
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-base">
            {card.description}
          </p>
        </div>

        <ul
          className={cn(
            "flex flex-col gap-2 border-t border-muted-foreground/15 pt-5",
            isFeature && "sm:gap-2.5",
          )}
        >
          {card.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm text-foreground/90 sm:text-base"
            >
              <span
                aria-hidden
                className="mt-[0.55em] size-1 shrink-0 rounded-full bg-accent"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
