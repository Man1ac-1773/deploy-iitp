"use client";

import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { publications } from "@/data/publications";

const PublicationExplorer = dynamic(
  () =>
    import("./publication-explorer").then(
      (module) => module.PublicationExplorer,
    ),
  {
    ssr: false,
    loading: () => <PublicationExplorerFallback />,
  },
);

function PublicationExplorerFallback() {
  return (
    <section
      id="publications"
      aria-busy="true"
      aria-labelledby="publications-heading"
      className="flex flex-col gap-8 sm:gap-10"
    >
      <div className="flex flex-col gap-3">
        <SectionLabel>Publications</SectionLabel>
        <SectionHeading as="h2" id="publications-heading">
          Publication explorer
        </SectionHeading>
        <p className="text-sm text-muted-foreground">Loading publications…</p>
      </div>
    </section>
  );
}

export function PublicationSection() {
  return (
    <PublicationExplorer publications={publications} />
  );
}
