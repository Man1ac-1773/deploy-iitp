import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ContentPanelProps = {
  children: ReactNode;
  className?: string;
};

export function ContentPanel({ children, className }: ContentPanelProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--spacing-section)] px-6 py-20 sm:px-10 sm:py-28 md:px-14 md:py-36 lg:px-20 lg:py-44",
        className,
      )}
    >
      {children}
    </div>
  );
}
