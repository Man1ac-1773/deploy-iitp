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

      <div className="relative z-10 mx-auto flex size-full w-full max-w-[1600px] flex-1 flex-col justify-between px-6 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-12">
        <p className="text-xs tracking-[0.24em] text-muted-foreground uppercase">
          {siteConfig.lab}
        </p>

        <div
          data-transition-id="professor-identity"
          className="flex flex-col gap-5 sm:gap-6 md:gap-8"
        >
          <h1
            id="hero-heading"
            className="hero-name text-balance font-medium tracking-[-0.04em] text-foreground"
          >
            <span className="mb-2 block text-[0.22em] font-normal tracking-[0.28em] text-muted-foreground uppercase sm:mb-3">
              {professor.honorific}
            </span>
            <span data-transition-target="professor-name" className="block">
              {professor.name}
            </span>
          </h1>

          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
            {professor.role} · {professor.affiliation}
          </p>
        </div>

        <a
          href="#portfolio"
          className="group flex w-fit items-center gap-4 text-muted-foreground"
        >
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <span
            aria-hidden
            className="h-px w-10 bg-muted-foreground/35 group-hover:bg-muted-foreground/60"
          />
        </a>
      </div>
    </section>
  );
}
