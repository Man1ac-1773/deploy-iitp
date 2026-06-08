import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";

type PlaceholderBlockProps = {
  id: string;
  label: string;
  title: string;
  children?: ReactNode;
  className?: string;
};

export function PlaceholderBlock({
  id,
  label,
  title,
  children,
  className,
}: PlaceholderBlockProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("flex flex-col gap-6", className)}
    >
      <div className="flex flex-col gap-3">
        <SectionLabel>{label}</SectionLabel>
        <SectionHeading as="h2" id={`${id}-heading`}>
          {title}
        </SectionHeading>
      </div>

      {children ?? (
        <div className="flex min-h-48 flex-col justify-center rounded-sm border border-dashed border-muted-foreground/25 bg-surface px-6 py-10">
          <p className="text-sm text-muted-foreground">
            Placeholder content — section implementation pending.
          </p>
        </div>
      )}
    </section>
  );
}
