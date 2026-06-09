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
        Tag === "h1" && "text-[var(--hero-name-size)] leading-[var(--hero-name-leading)] tracking-[-0.04em] uppercase",
        Tag === "h2" && "text-[var(--section-title-size)] leading-[1.05] tracking-[-0.03em]",
        Tag === "h3" && "text-2xl sm:text-3xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
