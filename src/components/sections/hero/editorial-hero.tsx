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
        "hero-stage relative flex h-dvh min-h-dvh w-full flex-col bg-background",
        className,
      )}
    >
      <NetworkBackground />

      <div className="relative z-10 mx-auto flex size-full w-full max-w-[1600px] flex-1 flex-col justify-between px-6 py-12 sm:px-10 sm:py-16 md:px-14 lg:px-20">
        <div className="flex w-full items-center justify-between border-b border-border/60 pb-6">
          <p className="font-mono text-xs font-semibold tracking-[0.24em] text-accent uppercase">
            {siteConfig.lab}
          </p>
          <p className="hidden font-mono text-[9px] tracking-[0.24em] text-muted-foreground/60 sm:block">
            IIT.PATNA.LAT: 25.602 // LON: 85.126
          </p>
        </div>

        <div
          data-transition-id="professor-identity"
          className="flex flex-col gap-6 sm:gap-8 lg:gap-10 my-auto pt-12"
        >
          <h1
            id="hero-heading"
            className="hero-name text-balance font-bold tracking-[-0.04em] text-foreground uppercase leading-[var(--hero-name-leading)]"
          >
            <span className="mb-3 block font-mono text-[0.09em] font-medium tracking-[0.3em] text-accent uppercase sm:mb-4">
              {professor.honorific}
            </span>
            <span data-transition-target="professor-name" className="block">
              {professor.name}
            </span>
          </h1>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 border-t border-border/40 pt-6 max-w-2xl">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              // ROLE
            </p>
            <p className="text-base text-foreground/90 font-medium tracking-tight">
              {professor.role} at {professor.affiliation}
            </p>
          </div>
        </div>

        <div className="flex w-full items-end justify-between border-t border-border/40 pt-6">
          <a
            href="#portfolio"
            className="group flex w-fit items-center gap-4 text-muted-foreground"
          >
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-accent group-hover:text-foreground transition-colors duration-300">
              Scroll to explore
            </span>
            <span
              aria-hidden
              className="h-px w-16 bg-accent/40 group-hover:w-24 group-hover:bg-accent transition-all duration-500"
            />
          </a>
          <span className="font-mono text-[9px] tracking-widest text-muted-foreground/30 uppercase">
            SYS.PORTFOLIO.V2
          </span>
        </div>
      </div>
    </section>
  );
}
