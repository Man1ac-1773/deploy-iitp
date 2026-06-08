import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { timelineEvents } from "@/data/timeline";
import { cn } from "@/lib/utils";

type TimelineSectionProps = {
  className?: string;
};

export function TimelineSection({ className }: TimelineSectionProps) {
  return (
    <section
      id="timeline"
      aria-labelledby="timeline-heading"
      className={cn("flex flex-col gap-8 sm:gap-10", className)}
    >
      <div className="flex flex-col gap-3 border-b border-border/40 pb-6">
        <div className="flex items-center justify-between">
          <SectionLabel>Timeline</SectionLabel>
          <span className="font-mono text-xs tracking-wider text-accent/70 font-semibold">04 // RECORD</span>
        </div>
        <SectionHeading as="h2" id="timeline-heading" className="uppercase font-bold">
          Milestones & records
        </SectionHeading>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          A progression of academic appointments, major publications, honors, and experimental systems.
        </p>
      </div>

      <div className="relative border-l border-muted-foreground/15 ml-3 pl-6 sm:pl-8 flex flex-col gap-10 py-2">
        {timelineEvents.map((event) => (
          <div key={event.id} className="relative flex flex-col gap-2 group">
            {/* Geometric timeline node marker */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex items-center justify-center">
              <div className="size-2 rounded-full bg-accent ring-4 ring-background group-hover:scale-125 transition-transform duration-300" />
            </div>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-sm font-semibold tracking-wider text-accent tabular-nums">
                {event.year}
              </span>
              <span className="font-mono text-[9px] tracking-widest text-muted-foreground/60 uppercase">
                // {event.type}
              </span>
            </div>

            <h3 className="text-lg font-medium tracking-tight text-foreground sm:text-xl">
              {event.title}
            </h3>

            <p className="max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-base">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
