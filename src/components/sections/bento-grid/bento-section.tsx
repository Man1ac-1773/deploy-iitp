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
      <div className="flex flex-col gap-3">
        <SectionLabel>Overview</SectionLabel>
        <SectionHeading as="h2" id="bento-section-heading">
          Lab at a glance
        </SectionHeading>
      </div>

      <BentoGrid cards={bentoCards} />
    </section>
  );
}
