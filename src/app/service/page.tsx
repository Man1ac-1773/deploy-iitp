import { MainLayout } from "@/components/layout/main-layout";
import { ProfilePanel } from "@/components/sections/profile-panel/profile-panel";
import { ContentPanel } from "@/components/layout/content-panel";
import { NetworkBackground } from "@/components/shared/media/network-background";
import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { books, memberships, awards } from "@/data/activities";
import { patents } from "@/data/patents";
import { responsibilities } from "@/data/responsibilities";
import { ServiceModalProvider, ServiceModalTrigger } from "@/components/sections/activities/service-modal";
import Link from "next/link";

export default function ServicePage() {
  return (
    <ServiceModalProvider>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NetworkBackground />
      </div>

      <MainLayout profilePanel={<ProfilePanel />}>
        <ContentPanel>
          <div className="flex flex-col gap-12 sm:gap-16 pt-12 pb-24">
            
            {/* Navigation Header */}
            <div className="flex items-center gap-4">
              <Link 
                href="/#activities"
                className="group flex items-center justify-center h-10 w-10 rounded-full border border-border/40 bg-surface/10 hover:bg-surface/30 transition-colors"
              >
                <svg aria-hidden="true" className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M20 12H4m0 0l6-6m-6 6l6 6" />
                </svg>
              </Link>
              <div className="flex flex-col">
                <span className="font-mono text-mini tracking-widest text-muted-foreground uppercase">Return to Overview</span>
                <span className="text-sm font-semibold tracking-tight">Main Portfolio</span>
              </div>
            </div>

            <section className="flex flex-col gap-8 sm:gap-10">
              <div className="flex flex-col gap-3 border-b border-border/40 pb-6">
                <div className="flex items-center justify-between">
                  <SectionLabel>Service & Recognition</SectionLabel>
                  <span className="font-mono text-xs tracking-wider text-accent/70 font-semibold">06 // IMPACT</span>
                </div>
                <SectionHeading as="h1" className="uppercase font-bold text-3xl sm:text-4xl">
                  Professional Service
                </SectionHeading>
                <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                  A comprehensive record of intellectual property, authored literature, administrative responsibilities, and involvement in professional bodies.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pt-4">
                
                {/* Left Column */}
                <div className="md:col-span-7 flex flex-col gap-12">

                  {/* Intellectual Property */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-mono text-mini tracking-widest text-muted-foreground/60 uppercase border-b border-border/20 pb-2">
                      // Intellectual Property
                    </h3>
                    {patents.map((patent, i) => (
                      <ServiceModalTrigger
                        key={i}
                        item={{ type: "patent", ...patent }}
                        className="group flex flex-col gap-2 p-4 rounded-sm bg-surface/10 border border-border/20 hover:border-accent/30 hover:bg-surface/20 transition-all text-left cursor-pointer w-full"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">{patent.title}</h4>
                          <span className="font-mono text-micro uppercase tracking-widest bg-accent/10 text-accent px-1.5 py-0.5 rounded-sm shrink-0">
                            {patent.status}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{patent.description}</p>
                        <div className="mt-2 text-xs font-mono text-muted-foreground/60 flex items-center gap-2">
                          <span className="text-accent/60">ID: {patent.number}</span>
                          <span className="hidden sm:inline">|</span>
                          <span className="truncate">Inventors: {patent.inventors.join(", ")}</span>
                        </div>
                      </ServiceModalTrigger>
                    ))}
                  </div>
                  
                  {/* Responsibilities */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-mono text-mini tracking-widest text-muted-foreground/60 uppercase border-b border-border/20 pb-2">
                      // Administrative & Social Responsibilities
                    </h3>
                    {responsibilities.map((resp, i) => (
                      <div key={i} className="flex flex-col gap-2 p-4 rounded-sm bg-surface/10 border border-border/20">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">{resp.title}</h4>
                          <span className="font-mono text-micro uppercase tracking-widest bg-accent/10 text-accent px-1.5 py-0.5 rounded-sm shrink-0">
                            {resp.category}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-accent/80 uppercase tracking-widest">{resp.organization}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">{resp.description}</p>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Right Column */}
                <div className="md:col-span-5 flex flex-col gap-12">

                  {/* Authored Books */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-mono text-mini tracking-widest text-muted-foreground/60 uppercase border-b border-border/20 pb-2">
                      // Authored Books
                    </h3>
                    {books.map((book, i) => (
                      <ServiceModalTrigger
                        key={i}
                        item={{ type: "book", ...book }}
                        className="group flex flex-col gap-1.5 p-4 rounded-sm bg-surface/10 border border-border/20 hover:border-accent/30 hover:bg-surface/20 transition-all text-left cursor-pointer w-full"
                      >
                        <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">{book.title}</h4>
                        <p className="text-xs font-mono text-accent/80 uppercase tracking-widest">{book.publisher}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">{book.description}</p>
                      </ServiceModalTrigger>
                    ))}
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <h3 className="font-mono text-mini tracking-widest text-muted-foreground/60 uppercase border-b border-border/20 pb-2">
                      // Awards & Grants
                    </h3>
                    {awards.map((award, i) => (
                      <div key={i} className="flex flex-col gap-1 relative pl-4 border-l border-accent/20">
                        <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-accent/40"></span>
                        <h4 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">{award.name}</h4>
                        <p className="text-xs text-muted-foreground">{award.organization}</p>
                        <span className="font-mono text-mini tracking-widest text-accent/60 mt-1">{award.year}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="font-mono text-mini tracking-widest text-muted-foreground/60 uppercase border-b border-border/20 pb-2">
                      // Professional Memberships
                    </h3>
                    {memberships.map((membership, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-sm bg-surface/5 border border-border/10">
                        <div className="flex flex-col gap-0.5">
                          <h4 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">{membership.organization}</h4>
                          <p className="text-xs font-mono text-muted-foreground uppercase">{membership.type}</p>
                        </div>
                        <span className="h-2 w-2 rounded-full bg-green-500/80 ring-2 ring-green-500/20" title={membership.status}></span>
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
    </ServiceModalProvider>
  );
}
