import { SectionLabel } from "@/components/shared/typography/section-label";
import type { BentoCardData } from "@/types/bento";
import { cn } from "@/lib/utils";

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

  return (
    <article
      id={card.id}
      aria-labelledby={`${card.id}-title`}
      data-bento-span={card.span}
      className={cn(
        "flex min-h-44 flex-col bg-background p-6 sm:min-h-48 sm:p-8 lg:min-h-0 lg:p-10",
        SPAN_CLASSES[card.span],
        className,
      )}
    >
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
