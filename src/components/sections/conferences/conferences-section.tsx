import { SectionHeading } from "@/components/shared/typography/section-heading";
import { conferences } from "@/data/conferences";
import { cn } from "@/lib/utils";

export function ConferencesSection() {
  return (
    <section id="conferences" className="py-section relative border-t border-white/5">
      <SectionHeading>Global Conferences</SectionHeading>
      
      <div className="mt-12 md:mt-16 flex flex-col gap-[1px] bg-white/10 border border-white/5 rounded-sm overflow-hidden">
        {conferences.map((conf, i) => (
          <article 
            key={conf.id} 
            className={cn(
              "group relative flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0A0C10] p-6 hover:bg-[#0f121a] transition-colors duration-300",
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
              <h3 className="text-sm md:text-base font-medium text-foreground/90 mt-2 tracking-tight text-balance leading-relaxed">
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
    </section>
  );
}
