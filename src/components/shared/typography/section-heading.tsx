import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
} & Pick<ComponentPropsWithoutRef<"h2">, "id">;

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "text-balance font-medium tracking-tight text-foreground",
        Tag === "h1" && "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
        Tag === "h2" && "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
        Tag === "h3" && "text-2xl sm:text-3xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
