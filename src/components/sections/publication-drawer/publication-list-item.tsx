import { Badge } from "@/components/ui/badge";
import type { Publication } from "@/types/publication";
import { cn } from "@/lib/utils";
import { PublicationModalTrigger } from "./publication-modal";

const TYPE_LABELS: Record<Publication["type"], string> = {
  journal: "Journal",
  conference: "Conference",
  workshop: "Workshop",
  preprint: "Preprint",
};

type PublicationListItemProps = {
  publication: Publication;
};

export function PublicationListItem({
  publication,
}: PublicationListItemProps) {
  return (
    <PublicationModalTrigger
      publication={publication}
      className={cn(
        "flex w-full flex-col gap-3 border-b border-border py-6 px-4 sm:px-6 rounded-sm text-left transition-colors duration-300",
        "hover:bg-card/60 focus-visible:bg-card/60 focus-visible:outline-none",
      )}
    >
      <div className="flex flex-wrap items-center gap-3 font-mono text-mini tracking-widest text-accent/80 uppercase">
        <span className="tabular-nums">[{publication.year}]</span>
        <span>// {TYPE_LABELS[publication.type]}</span>
      </div>

      <span className="text-base leading-snug font-medium tracking-tight text-foreground sm:text-lg">
        {publication.title}
      </span>

      <span className="text-sm text-muted-foreground">
        {publication.authors.join(", ")} · {publication.venue}
      </span>
    </PublicationModalTrigger>
  );
}
