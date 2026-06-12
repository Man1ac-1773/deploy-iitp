"use client";

import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { experiences } from "@/data/experience";
import { patents } from "@/data/patents";
import { cn } from "@/lib/utils";

type ExperienceSectionProps = {
  className?: string;
};

export function ExperienceSection({ className }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className={cn("flex flex-col gap-8 sm:gap-10", className)}
    >
      <div className="flex flex-col gap-3 border-b border-border/40 pb-6">
        <div className="flex items-center justify-between">
          <SectionLabel>Academic & Research Tenure</SectionLabel>
          <span className="font-mono text-xs tracking-wider text-accent/70 font-semibold">05 // EXPERIENCE</span>
        </div>
        <SectionHeading as="h2" id="experience-heading" className="uppercase font-bold">
          Chronological Experience & Patents
        </SectionHeading>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          A detailed timeline of academic appointments, research positions, and intellectual property.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 border-t border-border/40 pt-4">
        
        {/* Left Column: Academic Experience */}
        <div className="md:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase border-b border-border/20 pb-2">
              // Professional Experience
            </h3>
            {experiences.map((exp) => (
              <article
                key={exp.id}
                className="group flex flex-col gap-2 p-4 rounded-sm bg-surface/10 border border-border/20 transition-all text-left w-full"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">{exp.role}</h4>
                  <span className="shrink-0 font-mono text-[10px] text-muted-foreground/80 mt-1 uppercase tracking-wider">{exp.period}</span>
                </div>
                <p className="text-base font-medium text-muted-foreground mt-1">
                  {exp.organization}
                </p>
                <p className="text-sm text-muted-foreground/80 mt-2">
                  {exp.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Right Column: Patents */}
        <div className="md:col-span-5 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase border-b border-border/20 pb-2">
              // Intellectual Property
            </h3>
            {patents.map((patent, i) => (
              <article
                key={i}
                className="group flex flex-col gap-2 p-4 rounded-sm bg-surface/10 border border-border/20 transition-all text-left w-full"
              >
                <div className="flex flex-col gap-2">
                  <h4 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">{patent.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest bg-accent/10 text-accent px-1.5 py-0.5 rounded-sm shrink-0">
                      {patent.status}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground/60">
                      ID: {patent.number}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2">{patent.description}</p>
                <div className="mt-2 text-xs font-mono text-muted-foreground/60">
                  <span className="line-clamp-1">Inventors: {patent.inventors.join(", ")}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
