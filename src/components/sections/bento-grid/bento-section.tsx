import { bentoCards } from "@/data/bento";
import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { BentoGrid } from "./bento-grid";

export function BentoSection() {
  return (
    <section
      id="research"
      aria-labelledby="bento-section-heading"
      className="flex flex-col gap-8 sm:gap-10"
    >
      <div className="flex flex-col gap-3 border-b border-border/40 pb-6">
        <div className="flex items-center justify-between">
          <SectionLabel>Overview</SectionLabel>
          <span className="font-mono text-xs tracking-wider text-accent/70 font-semibold">01 // OVERVIEW</span>
        </div>
        <SectionHeading as="h2" id="bento-section-heading" className="uppercase font-bold">
          Lab at a glance
        </SectionHeading>
      </div>

      <BentoGrid cards={bentoCards} />
    </section>
  );
}
