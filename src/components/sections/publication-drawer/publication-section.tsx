"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { publications } from "@/data/publications";
import { PublicationListItem } from "./publication-list-item";
import { PublicationDetailSheet } from "./publication-detail-sheet";

export function PublicationSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Show only the top 3 featured journal publications
  const featuredPublications = publications.slice(0, 3);
  const selectedPublication =
    publications.find((publication) => publication.id === selectedId) ?? null;

  return (
    <>
      <section
        id="featured-publications"
        aria-labelledby="featured-publications-heading"
        className="flex flex-col gap-8 sm:gap-10"
      >
        <div className="flex flex-col gap-3 border-b border-border/40 pb-6">
          <div className="flex items-center justify-between">
            <SectionLabel>Select Research</SectionLabel>
            <span className="font-mono text-xs tracking-wider text-accent/70 font-semibold">03 // FEATURED</span>
          </div>
          <SectionHeading as="h2" id="featured-publications-heading" className="uppercase font-bold">
            Featured Publications
          </SectionHeading>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Select a publication to view its abstract, or explore the full archive of research papers.
          </p>
        </div>

        <div role="list" className="flex flex-col border-t border-border/40">
          {featuredPublications.map((publication) => (
            <div key={publication.id} role="listitem">
              <PublicationListItem
                publication={publication}
                isSelected={selectedId === publication.id}
                onSelect={setSelectedId}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-start pt-4">
          <Link
            href="/publications"
            className="group flex items-center gap-4 bg-accent/5 hover:bg-accent/10 border border-accent/20 hover:border-accent/40 px-6 py-4 transition-all duration-300 w-full sm:w-auto"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-accent group-hover:text-accent-warm transition-colors">
              Access Full Publication Archive
            </span>
            <svg aria-hidden="true" className="w-4 h-4 text-accent group-hover:text-accent-warm transition-all group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 12h16m0 0l-6-6m6 6l-6 6" />
            </svg>
          </Link>
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
