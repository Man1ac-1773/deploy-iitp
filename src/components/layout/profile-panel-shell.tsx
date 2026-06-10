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
        "flex h-full flex-col justify-between gap-8 px-8 py-10 sm:px-12 sm:py-12 lg:max-h-dvh lg:overflow-y-auto lg:px-14 lg:py-12",
        className,
      )}
    >
      {children}
    </div>
  );
}
