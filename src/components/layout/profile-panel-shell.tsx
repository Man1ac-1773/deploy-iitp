import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ProfilePanelShellProps = {
  children: ReactNode;
  className?: string;
};

export function ProfilePanelShell({
  children,
  className,
}: ProfilePanelShellProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between gap-10 px-6 py-12 sm:px-8 sm:py-16 lg:max-h-dvh lg:overflow-y-auto lg:px-10 lg:py-16 xl:px-12",
        className,
      )}
    >
      {children}
    </div>
  );
}
