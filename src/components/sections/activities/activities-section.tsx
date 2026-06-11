"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { patents, books, memberships, awards } from "@/data/activities";
import { cn } from "@/lib/utils";
import { ActivityDetailSheet, type ActivityItem } from "./activity-detail-sheet";

type ActivitiesSectionProps = {
  className?: string;
};

export function ActivitiesSection({ className }: ActivitiesSectionProps) {
  const [selectedItem, setSelectedItem] = useState<ActivityItem | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenSheet = (item: ActivityItem) => {
    setSelectedItem(item);
    setIsSheetOpen(true);
  };

  return (
    <>
    <section
      id="activities"
      aria-labelledby="activities-heading"
      className={cn("flex flex-col gap-8 sm:gap-10", className)}
    >
      <div className="flex flex-col gap-3 border-b border-border/40 pb-6">
        <div className="flex items-center justify-between">
          <SectionLabel>Service & Recognition</SectionLabel>
          <span className="font-mono text-xs tracking-wider text-accent/70 font-semibold">06 // IMPACT</span>
        </div>
        <SectionHeading as="h2" id="activities-heading" className="uppercase font-bold">
          Professional Activities
        </SectionHeading>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Patents, authored textbooks, awards, and active memberships in international professional bodies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 border-t border-border/40 pt-4">
        
        {/* Left Column: Patents & Books */}
        <div className="md:col-span-7 flex flex-col gap-8">
          
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase border-b border-border/20 pb-2">
              // Intellectual Property
            </h3>
            {patents.map((patent, i) => (
              <button
                key={i}
                onClick={() => handleOpenSheet({ type: "patent", ...patent })}
                className="group flex flex-col gap-2 p-4 rounded-sm bg-surface/10 border border-border/20 hover:border-accent/30 hover:bg-surface/20 transition-all text-left cursor-pointer w-full"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm sm:text-base font-semibold tracking-tight text-foreground">{patent.title}</h4>
                  <span className="font-mono text-[9px] uppercase tracking-widest bg-accent/10 text-accent px-1.5 py-0.5 rounded-sm shrink-0">
                    {patent.status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{patent.description}</p>
                <div className="mt-2 text-xs font-mono text-muted-foreground/60 flex items-center gap-2">
                  <span className="text-accent/60">ID: {patent.number}</span>
                  <span className="hidden sm:inline">|</span>
                  <span className="truncate">Inventors: {patent.inventors.join(", ")}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase border-b border-border/20 pb-2">
              // Authored Books
            </h3>
            {books.map((book, i) => (
              <button
                key={i}
                onClick={() => handleOpenSheet({ type: "book", ...book })}
                className="group flex flex-col gap-1.5 p-4 rounded-sm bg-surface/10 border border-border/20 hover:border-accent/30 hover:bg-surface/20 transition-all text-left cursor-pointer w-full"
              >
                <h4 className="text-sm sm:text-base font-semibold tracking-tight text-foreground">{book.title}</h4>
                <p className="text-xs font-mono text-accent/80 uppercase tracking-widest">{book.publisher}</p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">{book.description}</p>
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: Awards & Memberships */}
        <div className="md:col-span-5 flex flex-col gap-8">
          
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase border-b border-border/20 pb-2">
              // Awards & Grants
            </h3>
            {awards.map((award, i) => (
              <div key={i} className="flex flex-col gap-1 relative pl-4 border-l border-accent/20">
                <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-accent/40"></span>
                <h4 className="text-sm font-semibold text-foreground">{award.name}</h4>
                <p className="text-xs text-muted-foreground">{award.organization}</p>
                <span className="font-mono text-[10px] tracking-widest text-accent/60 mt-1">{award.year}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase border-b border-border/20 pb-2">
              // Professional Memberships
            </h3>
            {memberships.map((membership, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-sm bg-surface/5 border border-border/10">
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-sm font-semibold text-foreground">{membership.organization}</h4>
                  <p className="text-xs font-mono text-muted-foreground uppercase">{membership.type}</p>
                </div>
                <span className="h-2 w-2 rounded-full bg-green-500/80 ring-2 ring-green-500/20" title={membership.status}></span>
              </div>
            ))}
          </div>

        </div>

      </div>

      <div className="flex justify-center md:justify-start pt-6 border-t border-border/20 mt-4">
        <Link
          href="/service"
          className="group flex items-center gap-4 bg-accent/5 hover:bg-accent/10 border border-accent/20 hover:border-accent/40 px-6 py-4 transition-all duration-300 w-full sm:w-auto"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-accent group-hover:text-accent-warm transition-colors">
            [ Explore Full Professional Service ]
          </span>
          <svg aria-hidden="true" className="w-4 h-4 text-accent group-hover:text-accent-warm transition-all group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 12h16m0 0l-6-6m6 6l-6 6" />
          </svg>
        </Link>
      </div>
    </section>
    
    <ActivityDetailSheet
      item={selectedItem}
      open={isSheetOpen}
      onOpenChange={setIsSheetOpen}
    />
    </>
  );
}
