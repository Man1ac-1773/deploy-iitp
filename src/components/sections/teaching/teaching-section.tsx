import Link from "next/link";
import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { courses } from "@/data/teaching";
import { cn } from "@/lib/utils";

type TeachingSectionProps = {
  className?: string;
};

export function TeachingSection({ className }: TeachingSectionProps) {
  const featuredCourses = courses.slice(0, 3);
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
            {featuredCourses.map((course, index) => (
              <div
                key={course.title + index}
                className="group flex flex-col gap-2 rounded-sm border border-border/40 bg-surface/20 p-5 hover:border-accent/40 hover:bg-surface/40 transition-colors duration-300"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs font-semibold tracking-wider text-accent transition-colors duration-300">
                    {course.code || `[ ${course.category} ]`}
                  </span>
                  <span className="rounded-full border border-border/50 bg-background/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    {course.level}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-foreground tracking-tight">
                  {course.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 justify-center pl-0 md:pl-8">
          <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
            // Full Portfolio
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            Explore the complete teaching portfolio, including detailed course syllabi, teaching methodologies, and student mentorship records.
          </p>
          <div className="flex justify-start pt-4">
            <Link
              href="/teaching"
              className="group flex items-center gap-4 bg-accent/5 hover:bg-accent/10 border border-accent/20 hover:border-accent/40 px-6 py-4 transition-all duration-300"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-accent group-hover:text-accent-warm transition-colors">
                [ Explore Full Teaching Portfolio ]
              </span>
              <svg aria-hidden="true" className="w-4 h-4 text-accent group-hover:text-accent-warm transition-all group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M4 12h16m0 0l-6-6m6 6l-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
