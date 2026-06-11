import { MainLayout } from "@/components/layout/main-layout";
import { ProfilePanel } from "@/components/sections/profile-panel/profile-panel";
import { ContentPanel } from "@/components/layout/content-panel";
import { NetworkBackground } from "@/components/shared/media/network-background";
import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { courses, teachingMethods } from "@/data/teaching";
import Link from "next/link";

export default function TeachingPage() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NetworkBackground />
      </div>

      <MainLayout profilePanel={<ProfilePanel />}>
        <ContentPanel>
          <div className="flex flex-col gap-12 sm:gap-16 pt-12 pb-24">
            
            {/* Navigation Header */}
            <div className="flex items-center gap-4">
              <Link 
                href="/#teaching"
                className="group flex items-center justify-center h-10 w-10 rounded-full border border-border/40 bg-surface/10 hover:bg-surface/30 transition-colors"
              >
                <svg aria-hidden="true" className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M20 12H4m0 0l6-6m-6 6l6 6" />
                </svg>
              </Link>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Return to Overview</span>
                <span className="text-sm font-semibold tracking-tight">Main Portfolio</span>
              </div>
            </div>

            <section className="flex flex-col gap-8 sm:gap-10">
              <div className="flex flex-col gap-3 border-b border-border/40 pb-6">
                <div className="flex items-center justify-between">
                  <SectionLabel>Full Portfolio</SectionLabel>
                  <span className="font-mono text-xs tracking-wider text-accent/70 font-semibold">05 // LECTURE</span>
                </div>
                <SectionHeading as="h1" className="uppercase font-bold text-3xl sm:text-4xl">
                  Teaching & Methodology
                </SectionHeading>
                <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                  A comprehensive overview of courses taught, pedagogical approaches, and the methodology used to bridge foundational computer science with applied sensing systems.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div className="flex flex-col gap-6">
                  <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
                    // All Courses
                  </h3>
                  <div className="flex flex-col gap-4">
                    {courses.map((course, index) => (
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
                        <div className="flex flex-col gap-1 mt-2">
                          <p className="font-mono text-[10px] tracking-widest text-muted-foreground/80 uppercase">
                            {course.timeline}
                          </p>
                          <p className="text-xs text-muted-foreground/70 uppercase tracking-widest">
                            &gt; {course.institution}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
                    // Teaching Methodology
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
          </div>
        </ContentPanel>
      </MainLayout>

      {/* Force professor identity visibility on this static page */}
      <style suppressHydrationWarning>{`
        @media (min-width: 1024px) {
          aside [data-transition-id="professor-identity"] {
            opacity: 1 !important;
            transform: translateY(0px) !important;
            filter: none !important;
          }
        }
      `}</style>
    </>
  );
}
