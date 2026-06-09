"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Publication } from "@/types/publication";

const TYPE_LABELS: Record<Publication["type"], string> = {
  journal: "Journal",
  conference: "Conference",
  workshop: "Workshop",
  preprint: "Preprint",
};

type PublicationDetailSheetProps = {
  publication: Publication | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PublicationDetailSheet({
  publication,
  open,
  onOpenChange,
}: PublicationDetailSheetProps) {
  const [activePublication, setActivePublication] = useState<Publication | null>(null);

  useEffect(() => {
    if (publication) {
      setActivePublication(publication);
    }
  }, [publication]);

  const displayPub = activePublication || publication;

  if (!displayPub) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 overflow-hidden border-l border-border bg-popover p-0 sm:max-w-xl"
      >
        <div key={`laser-${displayPub.id}`} className="laser-scan-line-vertical" />
        <div key={displayPub.id} className="flex flex-col flex-1 animate-reveal-content relative overflow-y-auto">
          <SheetHeader className="gap-4 border-b border-border px-6 py-8">
            <div className="flex flex-wrap items-center gap-4 pr-8 font-mono text-[10px] tracking-wider text-accent/80">
              <span>[ {displayPub.year} ]</span>
              <span>// {TYPE_LABELS[displayPub.type].toUpperCase()}</span>
              {displayPub.citationCount !== undefined ? (
                <span>// {displayPub.citationCount} CITATIONS</span>
              ) : null}
            </div>

            <SheetTitle className="text-left text-xl leading-snug font-medium tracking-tight sm:text-2xl">
              {displayPub.title}
            </SheetTitle>

            <SheetDescription className="text-left text-sm leading-relaxed">
              {displayPub.authors.join(", ")}
            </SheetDescription>

            <p className="text-sm text-muted-foreground">{displayPub.venue}</p>
          </SheetHeader>

          <div className="flex flex-col gap-6 px-6 py-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Abstract
              </h3>
              <p className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                {displayPub.abstract}
              </p>
            </div>

            {displayPub.tags.length > 0 ? (
              <>
                <Separator />
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Topics
                  </h3>
                  <div className="flex flex-wrap gap-2 font-mono text-[9px] text-foreground">
                    {displayPub.tags.map((tag) => (
                      <span key={tag} className="border border-border/80 px-2 py-0.5 bg-surface/50 rounded-sm">
                        {tag.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : null}

            {displayPub.doi || displayPub.url ? (
              <>
                <Separator />
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Links
                  </h3>
                  <div className="flex flex-col gap-2">
                    {displayPub.doi ? (
                      <a
                        href={`https://doi.org/${displayPub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground hover:text-primary"
                      >
                        doi:{displayPub.doi}
                      </a>
                    ) : null}
                    {displayPub.url ? (
                      <a
                        href={displayPub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground hover:text-primary"
                      >
                        View publication
                      </a>
                    ) : null}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
