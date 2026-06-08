"use client";

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
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 overflow-y-auto border-l border-border bg-popover p-0 sm:max-w-xl"
      >
        {publication ? (
          <>
            <SheetHeader className="gap-4 border-b border-border px-6 py-8">
              <div className="flex flex-wrap items-center gap-2 pr-8">
                <Badge variant="outline">{TYPE_LABELS[publication.type]}</Badge>
                <Badge variant="secondary">{publication.year}</Badge>
                {publication.citationCount !== undefined ? (
                  <Badge variant="ghost">
                    {publication.citationCount} citations
                  </Badge>
                ) : null}
              </div>

              <SheetTitle className="text-left text-xl leading-snug font-medium tracking-tight sm:text-2xl">
                {publication.title}
              </SheetTitle>

              <SheetDescription className="text-left text-sm leading-relaxed">
                {publication.authors.join(", ")}
              </SheetDescription>

              <p className="text-sm text-muted-foreground">
                {publication.venue}
              </p>
            </SheetHeader>

            <div className="flex flex-col gap-6 px-6 py-8">
              <div className="flex flex-col gap-3">
                <h3 className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  Abstract
                </h3>
                <p className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                  {publication.abstract}
                </p>
              </div>

              {publication.tags.length > 0 ? (
                <>
                  <Separator />
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {publication.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}

              {publication.doi || publication.url ? (
                <>
                  <Separator />
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      Links
                    </h3>
                    <div className="flex flex-col gap-2">
                      {publication.doi ? (
                        <a
                          href={`https://doi.org/${publication.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-foreground hover:text-primary"
                        >
                          doi:{publication.doi}
                        </a>
                      ) : null}
                      {publication.url ? (
                        <a
                          href={publication.url}
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
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
