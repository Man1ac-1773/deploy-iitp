"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Patent, BookItem } from "@/data/activities";

export type ActivityItem = 
  | ({ type: "patent" } & Patent)
  | ({ type: "book" } & BookItem);

type ActivityDetailSheetProps = {
  item: ActivityItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ActivityDetailSheet({
  item,
  open,
  onOpenChange,
}: ActivityDetailSheetProps) {
  const [activeItem, setActiveItem] = useState<ActivityItem | null>(null);

  useEffect(() => {
    if (item) {
      setActiveItem(item);
    }
  }, [item]);

  const displayItem = activeItem || item;

  if (!displayItem) {
    return null;
  }

  const isPatent = displayItem.type === "patent";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 overflow-hidden border-l border-border bg-popover p-0 sm:max-w-xl"
      >
        <div key={`laser-${displayItem.title}`} className="laser-scan-line-vertical" />
        <div key={displayItem.title} className="flex flex-col flex-1 animate-reveal-content relative overflow-y-auto">
          <SheetHeader className="gap-4 border-b border-border px-6 py-8">
            <div className="flex flex-wrap items-center gap-4 pr-8 font-mono text-[10px] tracking-wider text-accent/80">
              <span>// {isPatent ? "INTELLECTUAL PROPERTY" : "AUTHORED TEXTBOOK"}</span>
              {isPatent && (
                <span className="bg-accent/10 text-accent px-1.5 py-0.5 rounded-sm">
                  {displayItem.status.toUpperCase()}
                </span>
              )}
            </div>

            <SheetTitle className="text-left text-xl leading-snug font-medium tracking-tight sm:text-2xl">
              {displayItem.title}
            </SheetTitle>

            <SheetDescription className="text-left text-sm leading-relaxed text-muted-foreground">
              {isPatent ? displayItem.description : displayItem.publisher}
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-6 px-6 py-8">
            <div className="flex flex-col gap-6">
              {!isPatent && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Description
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                    {displayItem.description}
                  </p>
                </div>
              )}

              {isPatent && (
                <>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      Inventors
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/90 font-mono">
                      {displayItem.inventors.join(", ")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 mt-2">
                    <h3 className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      Patent Application ID
                    </h3>
                    <div className="border-l-2 border-accent pl-4 py-1">
                      <p className="text-lg font-mono text-foreground sm:text-xl">
                        {displayItem.number}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {displayItem.link ? (
              <>
                <Separator />
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Links
                  </h3>
                  <div className="flex flex-col gap-2">
                    <a
                      href={displayItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center border border-accent/40 bg-accent/5 px-4 py-2 mt-2 text-sm font-mono tracking-widest text-accent uppercase hover:bg-accent hover:text-background transition-colors duration-300 w-fit rounded-sm"
                    >
                      [ {isPatent ? "View Registry" : "View Publisher"} ]
                    </a>
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
