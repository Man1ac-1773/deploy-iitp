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
