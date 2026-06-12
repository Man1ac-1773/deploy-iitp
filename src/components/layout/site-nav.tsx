"use client";

import { useEffect, useState, useRef } from "react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const sections = [
  { id: "portfolio", label: "Overview" },
  { id: "research", label: "Research Focus" },
  { id: "graph", label: "Simulation" },
  { id: "featured-publications", label: "Publications" },
  { id: "conferences", label: "Conferences" },
  { id: "experience", label: "Experience" },
  { id: "teaching", label: "Teaching" },
  { id: "activities", label: "Service" },
  { id: "contact", label: "Contact" },
];

export function SiteNav() {
  const [activeSection, setActiveSection] = useState<string>("portfolio");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const isClickScrolling = useRef(false);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>();

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !isClickScrolling.current) {
              setActiveSection(id);
            }
          },
          {
            rootMargin: "-40% 0px -40% 0px",
          }
        );
        observer.observe(element);
        observers.set(id, observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Check if we hit the bottom of the page organically
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection(sections[sections.length - 1].id);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    if (lenis) {
      isClickScrolling.current = true;
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
      
      const element = document.getElementById(id);
      if (element) {
        lenis.scrollTo(element, { offset: -40 });
        element.focus({ preventScroll: true });
        setActiveSection(id);
        
        clickTimeout.current = setTimeout(() => {
          isClickScrolling.current = false;
        }, 1000); // Wait for scroll to finish
      } else {
        isClickScrolling.current = false;
      }
    }
  };

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4 py-8 px-4"
      aria-label="Section navigation"
    >
      <div className="absolute inset-0 bg-background/5 dark:bg-background/20 backdrop-blur-md rounded-full border border-black/5 dark:border-white/5 pointer-events-none" />
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id;
        const isHovered = hoveredSection === id;

        return (
          <button
            key={id}
            onClick={() => handleNavClick(id)}
            onMouseEnter={() => setHoveredSection(id)}
            onMouseLeave={() => setHoveredSection(null)}
            className="group relative flex items-center justify-end"
            aria-label={`Scroll to ${label}`}
            aria-current={isActive ? "true" : undefined}
          >
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10, pointerEvents: "none" }}
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "absolute right-8 mr-2 whitespace-nowrap rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-widest",
                isActive
                  ? "bg-accent/10 text-accent font-semibold"
                  : "bg-surface/80 text-muted-foreground shadow-sm border border-border/50"
              )}
            >
              {label}
            </motion.div>

            {/* Dot */}
            <div
              className={cn(
                "relative flex h-3 w-3 items-center justify-center rounded-full transition-all duration-300",
                isActive
                  ? "bg-accent scale-100"
                  : "bg-black/10 dark:bg-white/10 scale-75 group-hover:scale-100 group-hover:bg-accent/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavDot"
                  className="absolute inset-0 rounded-full bg-accent blur-[4px] opacity-60"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          </button>
        );
      })}
    </nav>
  );
}
