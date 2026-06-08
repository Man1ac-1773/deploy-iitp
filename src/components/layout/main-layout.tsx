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
    <div className={cn("min-h-dvh bg-background", className)}>
      <div className="mx-auto flex w-full max-w-[1600px] flex-col lg:min-h-dvh lg:flex-row">
        <aside
          className={cn(
            "w-full shrink-0 border-b border-muted-foreground/15 lg:sticky lg:top-0 lg:h-dvh lg:w-[38%] lg:border-r lg:border-b-0",
          )}
        >
          {profilePanel}
        </aside>

        <main className="flex min-w-0 flex-1 flex-col lg:w-[62%]">
          {children}
        </main>
      </div>
    </div>
  );
}
