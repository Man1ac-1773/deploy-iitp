import { siteConfig } from "@/config/site";
import { NetworkBackground } from "@/components/shared/media/network-background";
import { cn } from "@/lib/utils";

type EditorialHeroProps = {
  className?: string;
};

export function EditorialHero({ className }: EditorialHeroProps) {
  const { professor } = siteConfig;

  return (
    <section
      data-hero-root
      data-transition-phase="hero"
      aria-labelledby="hero-heading"
      className={cn(
        "hero-stage relative flex h-dvh min-h-dvh w-full flex-col bg-background overflow-hidden",
        className,
      )}
    >
      <NetworkBackground />

      {/* Massive Typography Hero Container */}
      <div className="relative z-10 flex size-full flex-col justify-between p-6 sm:p-12 md:p-16 lg:p-24">
        
        {/* Top Header - Extreme asymmetrical tension */}
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[10px] font-bold tracking-[0.35em] text-foreground/80 uppercase">
              {siteConfig.lab}
            </p>
            <p className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/60 uppercase">
              {professor.affiliation}
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[9px] font-semibold tracking-[0.25em] text-accent/80 uppercase">
              [SYS.STATE: NOISE_SUPPRESSION_ACTIVE]
            </p>
            <p className="font-mono text-[8px] tracking-[0.2em] text-muted-foreground/40 mt-1">
              LAT: 25.602 // LON: 85.126
            </p>
          </div>
        </div>

        {/* Center/Lower Massive Identity */}
        <div
          data-transition-id="professor-identity"
          className="flex flex-col gap-4 mt-auto mb-16 md:mb-24"
        >
          <span className="block font-mono text-xs sm:text-sm font-semibold tracking-[0.4em] text-accent/90 uppercase ml-1 sm:ml-2">
            {professor.honorific}
          </span>
          <h1
            id="hero-heading"
            className="hero-name w-full max-w-full font-black tracking-tighter text-foreground uppercase mix-blend-difference"
            style={{ 
              fontSize: "clamp(5rem, 18vw, 22rem)", 
              lineHeight: "0.85", 
              letterSpacing: "-0.06em",
              marginLeft: "-0.04em" // optically align the massive text
            }}
          >
            <span data-transition-target="professor-name" className="block text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/60">
              {professor.name}
            </span>
          </h1>

          <div className="flex items-center gap-6 mt-8 sm:mt-12 ml-1 sm:ml-3">
            <div className="h-[1px] w-12 sm:w-24 bg-accent/40" />
            <p className="text-lg sm:text-xl text-foreground/80 font-medium tracking-tight">
              {professor.role}
            </p>
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase hidden sm:block">
              // RESEARCH DOMAIN: FEDERATED LEARNING & FOG COMPUTING
            </p>
          </div>
        </div>

        {/* Bottom Scroll Anchor */}
        <div className="flex w-full items-end justify-between">
          <span className="font-mono text-[9px] tracking-widest text-muted-foreground/30 uppercase">
            SYS.PORTFOLIO.V2 // {new Date().getFullYear()}
          </span>
          <a
            href="#portfolio"
            className="group flex flex-col items-end gap-3 text-muted-foreground"
          >
            <span className="font-mono text-[10px] font-bold tracking-[0.24em] uppercase text-foreground/60 group-hover:text-accent transition-colors duration-300">
              Commence Uplink
            </span>
            <div className="relative h-12 w-[1px] overflow-hidden bg-border">
              <div className="absolute inset-x-0 top-0 h-1/2 bg-accent animate-pulse" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
