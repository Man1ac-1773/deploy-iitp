"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import type { Publication } from "@/types/publication";
import { cn } from "@/lib/utils";
import { PublicationDetailSheet } from "./publication-detail-sheet";
import { PublicationListItem } from "./publication-list-item";

type PublicationExplorerProps = {
  publications: readonly Publication[];
};

export function PublicationExplorer({
  publications,
}: PublicationExplorerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "journal" | "conference" | "Blockchain" | "Game Theory">("all");

  const selectedPublication =
    publications.find((publication) => publication.id === selectedId) ?? null;

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch = 
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.some(auth => auth.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pub.venue.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "journal") return matchesSearch && pub.type === "journal";
    if (activeFilter === "conference") return matchesSearch && pub.type === "conference";
    return matchesSearch && pub.tags.includes(activeFilter);
  });

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

        {/* Filter controls row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border/40 pb-6">
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-[9px] text-accent/80 tracking-widest uppercase select-none">
              [ FIND // ]
            </span>
            <input
              type="text"
              placeholder="Keywords, authors, venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface/20 border border-border/40 text-foreground placeholder-muted-foreground/45 rounded-sm py-2 pl-20 pr-4 text-xs font-mono tracking-wide focus:outline-none focus:border-accent/50 focus:bg-surface/30 transition-all duration-300"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 font-mono text-[9px] uppercase tracking-wider">
            {(["all", "journal", "conference", "Blockchain", "Game Theory"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-3 py-1.5 border rounded-sm transition-all duration-300 font-semibold cursor-pointer",
                  activeFilter === filter
                    ? "bg-accent border-accent text-primary-foreground"
                    : "border-border/45 text-muted-foreground hover:text-foreground hover:border-accent/40 bg-surface/10"
                )}
              >
                {filter === "all" ? "All" : filter === "journal" ? "Journals" : filter === "conference" ? "Conferences" : filter}
              </button>
            ))}
          </div>
        </div>

        {filteredPublications.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-border/40 rounded-sm bg-surface/5">
            <p className="font-mono text-xs text-muted-foreground/60 uppercase">
              [ Zero results found for filter matching query ]
            </p>
          </div>
        ) : (
          <div
            role="list"
            className="flex flex-col border-t border-border"
          >
            {filteredPublications.map((publication) => (
              <div key={publication.id} role="listitem">
                <PublicationListItem
                  publication={publication}
                  isSelected={selectedId === publication.id}
                  onSelect={setSelectedId}
                />
              </div>
            ))}
          </div>
        )}
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
