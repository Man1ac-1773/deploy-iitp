"use client";

import type { BentoCardData } from "@/types/bento";
import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BentoCard } from "./bento-card";
import { BentoModal } from "./bento-modal";
import { AnimatePresence, LayoutGroup } from "framer-motion";

type BentoGridProps = {
  cards: readonly BentoCardData[];
  className?: string;
  children?: ReactNode;
};

export function BentoGrid({ cards, className, children }: BentoGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedCard = cards.find((c) => c.id === selectedId) ?? null;

  return (
    <>
      <div
        data-bento-grid
        className={cn(
          "grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:auto-rows-[minmax(12rem,auto)] bg-transparent relative z-10",
          className,
        )}
      >
        {children ??
          cards.map((card) => (
            <BentoCard 
              key={card.id} 
              card={card} 
              onClick={() => setSelectedId(card.id)} 
            />
          ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedCard && (
          <BentoModal 
            card={selectedCard} 
            onClose={() => setSelectedId(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
