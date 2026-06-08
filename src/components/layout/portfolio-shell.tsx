"use client";

import { useScrollPhase } from "@/hooks/use-scroll-phase";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PortfolioShellProps = {
  children: ReactNode;
  className?: string;
};

export function PortfolioShell({ children, className }: PortfolioShellProps) {
  const phase = useScrollPhase();

  return (
    <div
      data-scroll-phase={phase}
      data-transition-phase={phase}
      className={cn("portfolio-shell", className)}
    >
      {children}
    </div>
  );
}
