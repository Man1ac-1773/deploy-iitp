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
        "flex h-full flex-col justify-between gap-12 px-8 py-16 sm:px-12 sm:py-24 lg:max-h-dvh lg:overflow-y-auto lg:px-14 lg:py-24",
        className,
      )}
    >
      {children}
    </div>
  );
}
