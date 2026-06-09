"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "#research", id: "research", label: "Overview", index: "01" },
  { href: "#graph", id: "graph", label: "Taxonomy", index: "02" },
  { href: "#publications", id: "publications", label: "Archive", index: "03" },
  { href: "#timeline", id: "timeline", label: "Record", index: "04" },
  { href: "#students", id: "students", label: "Advisees", index: "05" },
  { href: "#contact", id: "contact", label: "Terminal", index: "06" },
] as const;

type SectionNavProps = {
  className?: string;
};

export function SectionNav({ className }: SectionNavProps) {
  const [activeId, setActiveId] = useState<string>("research");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Active triggers when the section is in the middle of viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav aria-label="Page sections" className={cn(className)}>
      <ul className="flex flex-col gap-4 border-l border-border/60 pl-5 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "group flex items-baseline gap-3 text-xs transition-colors duration-300",
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[10px] transition-colors duration-300",
                    isActive
                      ? "text-accent font-bold"
                      : "text-accent/60 group-hover:text-accent",
                  )}
                >
                  {item.index}
                </span>
                <span className="tracking-wider uppercase">
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
