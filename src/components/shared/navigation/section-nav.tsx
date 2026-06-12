"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { id: "research", label: "Overview", index: "01" },
  { id: "graph", label: "Taxonomy", index: "02" },
  { id: "featured-publications", label: "Featured", index: "03" },
  { id: "conferences", label: "Conferences", index: "04" },
  { id: "experience", label: "Experience", index: "05" },
  { id: "teaching", label: "Lecture", index: "06" },
  { id: "activities", label: "Impact", index: "07" },
  { id: "contact", label: "Terminal", index: "08" },
] as const;

type SectionNavProps = {
  className?: string;
};

export function SectionNav({ className }: SectionNavProps) {
  const [activeId, setActiveId] = useState<string>("research");
  const pathname = usePathname();
  const isHome = pathname === "/";

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
          const href = isHome ? `#${item.id}` : `/#${item.id}`;

          return (
            <li key={item.id}>
              <Link
                href={href}
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
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
