import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MainLayoutProps = {
  profilePanel: ReactNode;
  children: ReactNode;
  className?: string;
};

export function MainLayout({
  profilePanel,
  children,
  className,
}: MainLayoutProps) {
  return (
    <div
      id="portfolio"
      tabIndex={-1}
      data-transition-phase="portfolio"
      className={cn("min-h-dvh scroll-mt-0 relative z-10 focus:outline-none", className)}
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col lg:min-h-dvh lg:flex-row">
        <aside
          data-repel-swarm="true"
          className={cn(
            "w-full shrink-0 border-b border-white/10 bg-background/5 backdrop-blur-[2px] lg:sticky lg:top-0 lg:h-dvh lg:w-[25%] lg:border-r lg:border-b-0",
          )}
        >
          {profilePanel}
        </aside>

        <main id="main-content" className="flex min-w-0 flex-1 flex-col lg:w-[75%]">
          {children}
        </main>
      </div>
    </div>
  );
}
