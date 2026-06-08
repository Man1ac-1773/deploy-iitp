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
        "grid grid-cols-1 gap-px bg-muted-foreground/15 sm:gap-px lg:grid-cols-12 lg:auto-rows-[minmax(12rem,auto)]",
        className,
      )}
    >
      {children ??
        cards.map((card) => <BentoCard key={card.id} card={card} />)}
    </div>
  );
}
