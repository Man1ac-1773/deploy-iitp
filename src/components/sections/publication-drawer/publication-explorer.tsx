"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import type { Publication } from "@/types/publication";
import { PublicationDetailSheet } from "./publication-detail-sheet";
import { PublicationListItem } from "./publication-list-item";

type PublicationExplorerProps = {
  publications: readonly Publication[];
};

export function PublicationExplorer({
  publications,
}: PublicationExplorerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedPublication =
    publications.find((publication) => publication.id === selectedId) ?? null;

  return (
    <>
      <section
        id="publications"
        aria-labelledby="publications-heading"
        className="flex flex-col gap-8 sm:gap-10"
      >
        <div className="flex flex-col gap-3 border-b border-border/40 pb-6">
          <div className="flex items-center justify-between">
            <SectionLabel>Publications</SectionLabel>
            <span className="font-mono text-xs tracking-wider text-accent/70 font-semibold">03 // ARCHIVE</span>
          </div>
          <SectionHeading as="h2" id="publications-heading" className="uppercase font-bold">
            Publication explorer
          </SectionHeading>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Select a publication to open its contextual drawer with abstract,
            topics, and reference links.
          </p>
        </div>

        <div
          role="list"
          className="flex flex-col border-t border-border"
        >
          {publications.map((publication) => (
            <div key={publication.id} role="listitem">
              <PublicationListItem
                publication={publication}
                isSelected={selectedId === publication.id}
                onSelect={setSelectedId}
              />
            </div>
          ))}
        </div>
      </section>

      <PublicationDetailSheet
        publication={selectedPublication}
        open={selectedId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedId(null);
          }
        }}
      />
    </>
  );
}
