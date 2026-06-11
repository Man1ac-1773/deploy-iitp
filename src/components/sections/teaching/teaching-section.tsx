import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { courses, teachingMethods } from "@/data/teaching";
import { cn } from "@/lib/utils";

type TeachingSectionProps = {
  className?: string;
};

export function TeachingSection({ className }: TeachingSectionProps) {
  return (
    <section
      id="teaching"
      aria-labelledby="teaching-heading"
      className={cn("flex flex-col gap-8 sm:gap-10", className)}
    >
      <div className="flex flex-col gap-3 border-b border-border/40 pb-6">
        <div className="flex items-center justify-between">
          <SectionLabel>Pedagogy</SectionLabel>
          <span className="font-mono text-xs tracking-wider text-accent/70 font-semibold">05 // LECTURE</span>
        </div>
        <SectionHeading as="h2" id="teaching-heading" className="uppercase font-bold">
          Teaching & Methods
        </SectionHeading>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Foundational computer science taught alongside the applied data and sensing systems where it is put to work — at IIT Patna.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex flex-col gap-6">
          <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
            // Current Courses
          </h3>
          <div className="flex flex-col gap-4">
            {courses.map((course) => (
              <div
                key={course.code}
                className="group flex flex-col gap-2 rounded-sm border border-border/40 bg-surface/20 p-5 hover:border-accent/40 hover:bg-surface/40 transition-colors duration-300"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-sm font-semibold tracking-wider text-accent transition-colors duration-300">
                    {course.code}
                  </span>
                  <span className="rounded-full border border-border/50 bg-background/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    {course.level}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-foreground tracking-tight">
                  {course.title}
                </h4>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                  &gt; {course.category}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
            // Methodology
          </h3>
          <div className="flex flex-col border-l border-border/40">
            {teachingMethods.map((method) => (
              <div
                key={method.label}
                className="relative pl-6 py-4 before:absolute before:-left-[5px] before:top-6 before:h-2 before:w-2 before:rounded-full before:bg-accent/40 before:ring-4 before:ring-background hover:before:bg-accent transition-colors duration-300"
              >
                <h4 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                  {method.label}
                </h4>
                <p className="mt-1 max-w-prose text-sm text-muted-foreground leading-relaxed">
                  {method.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {method.courseCodes.map((code) => (
                    <span
                      key={code}
                      className="font-mono text-[10px] text-muted-foreground/80 bg-accent/5 px-1.5 py-0.5 rounded-sm border border-accent/10"
                    >
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
