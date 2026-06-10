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

      <div className="flex flex-col border-t border-border">
        {timelineEvents.map((event) => (
          <div
            key={event.id}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 py-8 border-b border-border/40 group hover:bg-card/10 transition-colors duration-300 px-2 rounded-sm"
          >
            {/* Left Column: Chronological Telemetry (25% width) */}
            <div className="md:col-span-1 flex flex-col items-baseline md:items-end justify-start gap-1">
              <span className="font-mono text-xl font-bold tracking-wider text-accent-warm tabular-nums group-hover:scale-105 transition-transform duration-300 origin-left md:origin-right">
                {event.year}
              </span>
              <span className="font-mono text-[8px] tracking-[0.2em] text-muted-foreground/60 uppercase">
                // {event.type}
              </span>
            </div>

            {/* Right Column: Milestone Details (75% width) */}
            <div className="md:col-span-3 flex flex-col gap-2">
              <h3 className="font-sans text-lg font-semibold tracking-tight text-foreground sm:text-xl group-hover:text-accent transition-colors duration-300">
                {event.title}
              </h3>
              <p className="max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-base font-light">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
