"use client";

import { Badge } from "@/components/ui/badge";
import type { Publication } from "@/types/publication";
import { cn } from "@/lib/utils";

const TYPE_LABELS: Record<Publication["type"], string> = {
  journal: "Journal",
  conference: "Conference",
  workshop: "Workshop",
  preprint: "Preprint",
};

type PublicationListItemProps = {
  publication: Publication;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export function PublicationListItem({
  publication,
  isSelected,
  onSelect,
}: PublicationListItemProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      aria-label={`Open details for ${publication.title}`}
      onClick={() => onSelect(publication.id)}
      className={cn(
        "flex w-full flex-col gap-3 border-b border-border py-6 text-left",
        "hover:bg-card/60 focus-visible:bg-card/60 focus-visible:outline-none",
        isSelected && "bg-card/40",
      )}
    >
      <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-widest text-accent/80 uppercase">
        <span className="tabular-nums">[{publication.year}]</span>
        <span>// {TYPE_LABELS[publication.type]}</span>
      </div>

      <span className="text-base leading-snug font-medium tracking-tight text-foreground sm:text-lg">
        {publication.title}
      </span>

      <span className="text-sm text-muted-foreground">
        {publication.authors.join(", ")} · {publication.venue}
      </span>
    </button>
  );
}
