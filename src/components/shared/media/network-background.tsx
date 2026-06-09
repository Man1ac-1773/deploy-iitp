"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

const NODES: ReadonlyArray<{ x: number; y: number }> = [
  { x: 8, y: 12 },
  { x: 22, y: 8 },
  { x: 38, y: 18 },
  { x: 55, y: 10 },
  { x: 72, y: 16 },
  { x: 88, y: 9 },
  { x: 15, y: 32 },
  { x: 30, y: 28 },
  { x: 48, y: 35 },
  { x: 65, y: 30 },
  { x: 82, y: 38 },
  { x: 94, y: 28 },
  { x: 12, y: 52 },
  { x: 28, y: 48 },
  { x: 45, y: 55 },
  { x: 62, y: 50 },
  { x: 78, y: 58 },
  { x: 90, y: 46 },
  { x: 20, y: 72 },
  { x: 40, y: 68 },
  { x: 58, y: 75 },
  { x: 75, y: 70 },
  { x: 88, y: 82 },
  { x: 35, y: 88 },
  { x: 52, y: 92 },
  { x: 68, y: 86 },
];

const EDGES: ReadonlyArray<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [0, 6],
  [1, 7],
  [2, 8],
  [3, 9],
  [4, 10],
  [5, 11],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [6, 12],
  [7, 13],
  [8, 14],
  [9, 15],
  [10, 16],
  [11, 17],
  [12, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [16, 17],
  [12, 18],
  [13, 19],
  [14, 20],
  [15, 21],
  [16, 22],
  [18, 19],
  [19, 20],
  [20, 21],
  [21, 22],
  [19, 23],
  [20, 24],
  [21, 25],
  [23, 24],
  [24, 25],
  [2, 9],
  [8, 15],
  [14, 21],
];

type NetworkBackgroundProps = {
  className?: string;
};

export function NetworkBackground({ className }: NetworkBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const xOffset = (e.clientX / (window.innerWidth || 1) - 0.5) * 1.5;
      const yOffset = (e.clientY / (window.innerHeight || 1) - 0.5) * 1.5;
      containerRef.current.style.setProperty("--mouse-x-offset", `${xOffset.toFixed(3)}%`);
      containerRef.current.style.setProperty("--mouse-y-offset", `${yOffset.toFixed(3)}%`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,var(--color-background)_72%)]" />

      <svg
        className="absolute inset-0 size-full text-foreground opacity-[0.07] transition-transform duration-700 ease-out"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
        style={{
          transform: "translate(var(--mouse-x-offset, 0%), var(--mouse-y-offset, 0%)) scale(1.03)",
        }}
      >
        {EDGES.map(([from, to], index) => {
          const start = NODES[from];
          const end = NODES[to];

          return (
            <line
              key={`edge-${index}`}
              x1={start.x}
              x2={end.x}
              y1={start.y}
              y2={end.y}
              stroke="currentColor"
              strokeWidth="0.15"
            />
          );
        })}

        {NODES.map((node, index) => (
          <circle
            key={`node-${index}`}
            cx={node.x}
            cy={node.y}
            fill="currentColor"
            r="0.35"
          />
        ))}
      </svg>
    </div>
  );
}
