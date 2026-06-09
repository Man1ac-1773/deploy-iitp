import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { studentsData } from "@/data/students";
import { cn } from "@/lib/utils";

type StudentsSectionProps = {
  className?: string;
};

export function StudentsSection({ className }: StudentsSectionProps) {
  const activeStudents = studentsData.filter((s) => s.status === "active");
  const alumniStudents = studentsData.filter((s) => s.status === "alumni");

  return (
    <section
      id="students"
      aria-labelledby="students-heading"
      className={cn("flex flex-col gap-8 sm:gap-10", className)}
    >
      <div className="flex flex-col gap-3 border-b border-border/40 pb-6">
        <div className="flex items-center justify-between">
          <SectionLabel>Advisees</SectionLabel>
          <span className="font-mono text-xs tracking-wider text-accent/70 font-semibold">05 // ADVISEES</span>
        </div>
        <SectionHeading as="h2" id="students-heading" className="uppercase font-bold">
          Lab researchers
        </SectionHeading>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Our team is composed of graduate and doctoral students exploring the limits of computational geometry and spatial analysis.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {/* Active Researchers */}
        <div className="flex flex-col gap-5">
          <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
            // Current Doctoral & Graduate Scholars ({activeStudents.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeStudents.map((student) => (
              <div
                key={student.id}
                className="flex flex-col gap-2.5 bg-surface/20 border border-border/40 hover:border-accent/30 p-5 rounded-sm relative group overflow-hidden transition-all duration-300 hover:bg-card/25"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span className="text-base font-semibold text-foreground sm:text-lg group-hover:text-accent transition-colors duration-300">
                    {student.name}
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-accent uppercase">
                    {student.role}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground border-t border-border/10 pt-2">
                  Focus: <span className="text-foreground/80 italic">{student.thesis}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Alumni */}
        <div className="flex flex-col gap-5">
          <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
            // Alumni ({alumniStudents.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alumniStudents.map((student) => (
              <div
                key={student.id}
                className="flex flex-col gap-2 bg-surface/10 border border-border/40 hover:border-accent/20 p-4 rounded-sm relative group overflow-hidden transition-all duration-300 hover:bg-card/15"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span className="text-sm font-medium text-foreground/90 sm:text-base group-hover:text-accent transition-colors duration-300">
                    {student.name}
                  </span>
                  <span className="font-mono text-[9px] tracking-wider text-muted-foreground/60 uppercase">
                    {student.role}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground border-t border-border/10 pt-1.5">
                  Thesis: <span className="text-foreground/70">{student.thesis}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
