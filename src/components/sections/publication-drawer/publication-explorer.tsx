"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import type { Publication } from "@/types/publication";
import { PublicationDetailSheet } from "./publication-detail-sheet";
import { PublicationListItem } from "./publication-list-item";
import { cn } from "@/lib/utils";

type PublicationExplorerProps = {
  publications: readonly Publication[];
};

const FILTERS = ["ALL", "JOURNAL", "CONFERENCE", "FEDERATED LEARNING", "EDGE AI", "IOT"] as const;

export function PublicationExplorer({
  publications,
}: PublicationExplorerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<typeof FILTERS[number]>("ALL");

  const selectedPublication =
    publications.find((publication) => publication.id === selectedId) ?? null;

  // Case-insensitive filtering logic
  const filteredPublications = publications.filter((pub) => {
    // 1. Search Query filter
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      pub.title.toLowerCase().includes(query) ||
      pub.abstract.toLowerCase().includes(query) ||
      pub.venue.toLowerCase().includes(query) ||
      pub.authors.some((author) => author.toLowerCase().includes(query)) ||
      pub.tags.some((tag) => tag.toLowerCase().includes(query));

    // 2. Pill Category filter
    let matchesFilter = true;
    if (activeFilter !== "ALL") {
      const filterLower = activeFilter.toLowerCase();
      if (filterLower === "journal" || filterLower === "conference") {
        matchesFilter = pub.type === filterLower;
      } else {
        // Tag matching (case-insensitive)
        matchesFilter = pub.tags.some((tag) => tag.toLowerCase() === filterLower);
      }
    }

    return matchesSearch && matchesFilter;
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

        {/* Search & Filter Controls Panel */}
        <div className="flex flex-col gap-5 border border-border/40 bg-surface/10 p-5 rounded-sm">
          {/* Search Input */}
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, keyword, abstract, or co-author..."
              className="w-full bg-background/40 border border-border/40 focus:border-accent-warm focus:bg-surface/20 focus:outline-none rounded-sm text-sm px-4 py-2.5 text-foreground placeholder:text-muted-foreground/45 transition-colors duration-300 focus:ring-1 focus:ring-accent-warm/30"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] text-muted-foreground/60 hover:text-foreground uppercase tracking-widest cursor-pointer select-none"
              >
                [ Clear ]
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "border px-3 py-1 font-mono text-[9px] tracking-wider uppercase rounded-sm transition-colors duration-300 select-none cursor-pointer",
                    isActive
                      ? "bg-accent-warm text-background border-accent-warm font-semibold shadow-[0_0_10px_rgba(229,169,59,0.15)]"
                      : "bg-background/20 text-muted-foreground/80 hover:text-foreground border-border/40 hover:bg-background/40",
                  )}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Publication Results Grid/List */}
        <div
          role="list"
          className="flex flex-col border-t border-border/40"
        >
          {filteredPublications.length > 0 ? (
            filteredPublications.map((publication) => (
              <div key={publication.id} role="listitem">
                <PublicationListItem
                  publication={publication}
                  isSelected={selectedId === publication.id}
                  onSelect={setSelectedId}
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 border-b border-border/40 rounded-sm bg-surface/5">
              <span className="font-mono text-[10px] text-accent-warm uppercase tracking-widest mb-2">
                [ Exploration Failure ]
              </span>
              <p className="text-sm text-muted-foreground text-center max-w-md font-light">
                No publications match your search query or selected topic filter parameters. Clear queries to restart.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("ALL");
                }}
                className="mt-4 px-4 py-1.5 border border-accent/40 hover:border-accent hover:bg-accent/5 font-mono text-[9px] text-accent uppercase tracking-wider rounded-sm transition-colors duration-300 cursor-pointer"
              >
                Reset Search parameters
              </button>
            </div>
          )}
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
