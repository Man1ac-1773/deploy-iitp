"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
} & Pick<ComponentPropsWithoutRef<"h2">, "id">;

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$*&%";

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
  id,
}: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [displayText, setDisplayText] = useState<ReactNode>(children);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (typeof children !== "string") return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          const originalText = children as string;
          let iterations = 0;
          const maxIterations = 20;
          
          const interval = setInterval(() => {
            setDisplayText(() => {
              if (iterations >= maxIterations) {
                clearInterval(interval);
                return originalText;
              }
              
              return originalText
                .split("")
                .map((char, index) => {
                  if (char === " ") return " ";
                  // Reveal from left to right
                  if (index < (iterations / maxIterations) * originalText.length) {
                    return originalText[index];
                  }
                  return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join("");
            });
            iterations += 1;
          }, 35);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [children]);

  // Handle case where children changes (e.g. dynamic headings)
  useEffect(() => {
    if (typeof children !== "string") {
      setDisplayText(children);
    }
  }, [children]);

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn(
        "text-balance font-medium tracking-tight text-foreground transition-colors duration-300",
        Tag === "h1" && "text-[var(--hero-name-size)] leading-[var(--hero-name-leading)] tracking-[-0.04em] uppercase",
        Tag === "h2" && "text-[var(--section-title-size)] leading-[1.05] tracking-[-0.03em]",
        Tag === "h3" && "text-2xl sm:text-3xl",
        className,
      )}
    >
      {typeof children === "string" ? displayText : children}
    </Tag>
  );
}
