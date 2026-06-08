import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex min-h-[50vh] flex-col justify-end gap-6 pb-4 lg:min-h-[60vh]"
    >
      <SectionLabel>Portfolio</SectionLabel>
      <SectionHeading as="h1" id="hero-heading">
        Spatial reasoning for complex worlds
      </SectionHeading>
      <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
        An editorial research portfolio documenting projects, publications, and
        the people behind the lab.
      </p>
    </section>
  );
}
