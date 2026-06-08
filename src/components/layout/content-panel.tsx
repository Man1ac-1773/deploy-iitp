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
        "flex flex-col gap-section px-6 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-24",
        className,
      )}
    >
      {children}
    </div>
  );
}
