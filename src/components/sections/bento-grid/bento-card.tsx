"use client";

import { SectionLabel } from "@/components/shared/typography/section-label";
import type { BentoCardData } from "@/types/bento";
import { cn } from "@/lib/utils";
import { useRef, type MouseEvent } from "react";

const SPAN_CLASSES = {
  "feature-tall":
    "lg:col-span-7 lg:row-span-2 lg:row-start-1 lg:col-start-1",
  "sidebar-top": "lg:col-span-5 lg:row-span-1 lg:row-start-1 lg:col-start-8",
  "sidebar-bottom":
    "lg:col-span-5 lg:row-span-1 lg:row-start-2 lg:col-start-8",
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
        "flex min-h-44 flex-col bg-surface/20 border border-border/40 hover:border-accent/30 transition-all duration-300 p-6 sm:min-h-48 sm:p-8 lg:min-h-0 lg:p-10 rounded-sm relative group overflow-hidden",
        SPAN_CLASSES[card.span],
        className,
      )}
    >
      {/* Radial Background Hover Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(91, 141, 239, 0.05), transparent 80%)",
        }}
      />
      
      {/* Radial Glowing Border Mask Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-accent/25"
        style={{
          maskImage: "radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black 20%, transparent 80%)",
        }}
      />

      {/* Domain-specific SVG Metaphor Overlays */}
      {card.id === "research-areas" && (
        <svg className="absolute bottom-2 right-2 size-28 text-accent/5 pointer-events-none select-none transition-all duration-500 group-hover:text-accent/12" viewBox="0 0 100 100">
          <path d="M 10,10 L 90,10 M 10,50 L 90,50 M 10,90 L 90,90 M 10,10 L 10,90 M 50,10 L 50,90 M 90,10 L 90,90" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          <text x="30" y="32" textAnchor="middle" fontSize="6.5" fill="currentColor" className="font-mono font-bold">U<tspan fontSize="4" dy="2">RSU</tspan></text>
          <text x="70" y="30" textAnchor="middle" fontSize="6.5" fill="currentColor" className="font-mono font-bold">U<tspan fontSize="4" dy="2">user</tspan></text>
          <text x="30" y="70" textAnchor="middle" fontSize="6.5" fill="currentColor" className="font-mono font-bold">u<tspan fontSize="4" dy="2">RSU</tspan></text>
          <text x="70" y="70" textAnchor="middle" fontSize="6.5" fill="currentColor" className="font-mono font-bold">u<tspan fontSize="4" dy="2">user</tspan></text>
        </svg>
      )}

      {card.id === "awards" && (
        <svg className="absolute bottom-2 right-2 size-28 text-accent/5 pointer-events-none select-none transition-all duration-500 group-hover:text-accent/12" viewBox="0 0 100 100">
          <path d="M 10,15 L 90,15 M 10,50 L 90,50 M 10,85 L 90,85" stroke="currentColor" strokeWidth="0.6" />
          <path d="M 50,15 L 50,85" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" />
          <text x="30" y="28" textAnchor="middle" fontSize="5.5" fill="currentColor" className="font-mono">ASK: p<tspan fontSize="3.5" dy="1.5">i</tspan></text>
          <text x="70" y="26.5" textAnchor="middle" fontSize="5.5" fill="currentColor" className="font-mono">BID: v<tspan fontSize="3.5" dy="1.5">j</tspan></text>
          <path d="M 20,40 L 40,40 M 60,40 L 80,40" stroke="currentColor" strokeWidth="1" />
          <path d="M 30,65 L 70,65" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1 1" />
          <circle cx="50" cy="65" r="1.5" fill="currentColor" className="text-accent-warm" />
          <text x="50" y="77" textAnchor="middle" fontSize="5" fill="currentColor" className="font-mono">Equilibrium p*</text>
        </svg>
      )}

      {card.id === "teaching" && (
        <svg className="absolute bottom-2 right-2 size-28 text-accent/5 pointer-events-none select-none transition-all duration-500 group-hover:text-accent/12" viewBox="0 0 100 100">
          <path d="M 5,90 L 95,90" stroke="currentColor" strokeWidth="0.6" />
          <path d="M 10,90 Q 35,90 50,15 T 90,90" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <line x1="50" y1="15" x2="50" y2="90" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
          <text x="50" y="8" textAnchor="middle" fontSize="6.5" fill="currentColor" className="font-mono">f(x | μ, σ²)</text>
        </svg>
      )}

      {card.id === "projects" && (
        <svg className="absolute bottom-2 right-2 size-28 text-accent/5 pointer-events-none select-none transition-all duration-500 group-hover:text-accent/12" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
          <path d="M 46,22 L 54,22 M 50,22 L 50,28" stroke="currentColor" strokeWidth="0.8" />
          <path d="M 46,78 L 54,78 M 50,78 L 50,72" stroke="currentColor" strokeWidth="0.8" />
          <text x="50" y="18" textAnchor="middle" fontSize="6" fill="currentColor" className="font-mono font-bold">STATE (s<tspan fontSize="4" dy="1.5">t</tspan>)</text>
          <text x="50" y="86.5" textAnchor="middle" fontSize="6" fill="currentColor" className="font-mono font-bold">ACTION (a<tspan fontSize="4" dy="1.5">t</tspan>)</text>
          <text x="84" y="52" textAnchor="middle" fontSize="6" fill="currentColor" className="font-mono font-bold">AGENT</text>
          <text x="16" y="52" textAnchor="middle" fontSize="6" fill="currentColor" className="font-mono font-bold">ENV</text>
          <path d="M 68,32 A 28,28 0 0,1 78,50" stroke="currentColor" strokeWidth="0.8" fill="none" />
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
