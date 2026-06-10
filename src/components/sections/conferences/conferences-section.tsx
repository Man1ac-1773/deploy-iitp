import Link from "next/link";
import { SectionHeading } from "@/components/shared/typography/section-heading";
import { conferences } from "@/data/conferences";
import { cn } from "@/lib/utils";

export function ConferencesSection() {
  const displayedConferences = conferences.slice(0, 3);

  return (
    <section id="conferences" className="py-section relative border-t border-white/5">
      <SectionHeading>Global Conferences</SectionHeading>
      
      <div className="mt-12 md:mt-16 flex flex-col gap-[1px] bg-transparent dark:bg-white/10 border border-border dark:border-white/5 rounded-sm overflow-hidden">
        {displayedConferences.map((conf, i) => (
          <article 
            key={conf.id} 
            className={cn(
              "group relative flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card dark:bg-[#0A0C10] p-6 hover:bg-black/5 dark:hover:bg-[#0f121a] transition-colors duration-300",
            )}
          >
            {/* Terminal decorative prefix */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/0 group-hover:bg-accent transition-colors duration-300" />
            
            <div className="flex flex-col gap-1 md:w-3/4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-accent">[{conf.year}]</span>
                <span className="font-mono text-xs text-muted-foreground uppercase">{conf.venue}</span>
                <span className="font-mono text-[10px] text-accent/50 border border-accent/20 px-1.5 py-0.5 rounded-sm uppercase tracking-widest">{conf.type}</span>
              </div>
              <h3 className="font-sans text-base md:text-lg font-medium text-foreground/90 mt-2 tracking-tight text-balance leading-snug">
                {conf.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-prose">
                {conf.details}
              </p>
            </div>

            {/* Simulated Data Node connection */}
            <div className="hidden md:flex flex-1 items-center justify-end px-4">
               <svg aria-hidden="true" className="size-16 text-accent/5 pointer-events-none select-none transition-colors duration-500 group-hover:text-accent/20" viewBox="0 0 100 100">
                  <path d="M 10,50 L 90,50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                  <circle cx="90" cy="50" r="4" className="fill-none stroke-currentColor" />
                  <circle cx="90" cy="50" r="1.5" className="fill-accent/40 group-hover:fill-accent transition-colors duration-300" />
               </svg>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-center md:justify-start">
        <Link 
          href="/publications"
          className="inline-flex items-center gap-3 px-6 py-3 font-mono text-xs md:text-sm text-accent uppercase tracking-widest border border-accent/40 rounded-sm hover:bg-accent/5 hover:border-accent transition-colors duration-300 group"
        >
          Explore All Conferences
          <svg className="size-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
