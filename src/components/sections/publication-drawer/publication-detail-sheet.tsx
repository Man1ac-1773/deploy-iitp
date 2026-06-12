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
            
            {/* Advanced Academic Metadata Block */}
            {(displayPub.volume || displayPub.issue || displayPub.pages || displayPub.status || displayPub.location || displayPub.dates || displayPub.correspondingAuthor) ? (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[10px] font-mono tracking-wide text-muted-foreground/80">
                {displayPub.status ? <span className="text-accent/80 border border-accent/20 px-1 py-0.5 rounded-sm">STATUS: {displayPub.status.toUpperCase()}</span> : null}
                {displayPub.volume ? <span>VOL: {displayPub.volume}</span> : null}
                {displayPub.issue ? <span>ISSUE: {displayPub.issue}</span> : null}
                {displayPub.pages ? <span>PP: {displayPub.pages}</span> : null}
                {displayPub.dates ? <span>DATES: {displayPub.dates}</span> : null}
                {displayPub.location ? <span>LOC: {displayPub.location}</span> : null}
                {displayPub.correspondingAuthor ? <span className="text-accent/60">[ CORRESPONDING AUTHOR ]</span> : null}
              </div>
            ) : null}
          </SheetHeader>

          <div className="flex flex-col gap-6 px-6 py-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  The Core Problem
                </h3>
                <p className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                  {displayPub.abstract}
                </p>
              </div>

              {displayPub.researchSummary ? (
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    The Engineering Approach
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                    {displayPub.researchSummary}
                  </p>
                </div>
              ) : null}

              {displayPub.impact ? (
                <div className="flex flex-col gap-4 mt-2">
                  <h3 className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Global Impact
                  </h3>
                  <div className="border-l-2 border-accent pl-4 py-1">
                    <p className="text-lg font-serif italic text-foreground sm:text-xl">
                      "{displayPub.impact}"
                    </p>
                  </div>
                </div>
              ) : null}
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
                        className="inline-flex items-center justify-center border border-accent/40 bg-accent/5 px-4 py-2 mt-2 text-sm font-mono tracking-widest text-accent uppercase hover:bg-accent hover:text-background transition-colors duration-300 w-fit rounded-sm"
                      >
                        [ Read Paper ]
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
