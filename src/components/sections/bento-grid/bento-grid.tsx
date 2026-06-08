import type { BentoCardData } from "@/types/bento";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BentoCard } from "./bento-card";

type BentoGridProps = {
  cards: readonly BentoCardData[];
  className?: string;
  children?: ReactNode;
};

export function BentoGrid({ cards, className, children }: BentoGridProps) {
  return (
    <div
      data-bento-grid
      className={cn(
        "grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:auto-rows-[minmax(12rem,auto)] bg-transparent",
        className,
      )}
    >
      {children ??
        cards.map((card) => <BentoCard key={card.id} card={card} />)}
    </div>
  );
}
