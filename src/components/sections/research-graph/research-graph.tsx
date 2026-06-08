"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { researchGraphData } from "@/data/research-graph";
import { cn } from "@/lib/utils";

type ResearchGraphProps = {
  className?: string;
};

export function ResearchGraph({ className }: ResearchGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const { nodes, edges } = researchGraphData;

  const centerNode = nodes.find((n) => n.isCenter);

  // Helper to check if a node or edge should be highlighted
  const isNodeHighlighted = (nodeId: string) => {
    if (hoveredNode === null) return true;
    if (hoveredNode === nodeId) return true;

    // If center is hovered, all nodes are connected
    if (hoveredNode === "center") return true;

    // If a spoke is hovered, only it and the center are connected
    if (nodeId === "center") return true;

    return false;
  };

  const isEdgeHighlighted = (from: string, to: string) => {
    if (hoveredNode === null) return true;

    // If center is hovered, highlight all center-spoke edges
    if (hoveredNode === "center") return true;

    // If a spoke is hovered, highlight its edge to center
    if (hoveredNode === from || hoveredNode === to) return true;

    return false;
  };

  return (
    <section
      id="graph"
      aria-labelledby="graph-heading"
      className={cn("flex flex-col gap-8 sm:gap-10", className)}
    >
      <div className="flex flex-col gap-3 border-b border-border/40 pb-6">
        <div className="flex items-center justify-between">
          <SectionLabel>Inquiry</SectionLabel>
          <span className="font-mono text-xs tracking-wider text-accent/70 font-semibold">02 // TAXONOMY</span>
        </div>
        <SectionHeading as="h2" id="graph-heading" className="uppercase font-bold">
          Research network
        </SectionHeading>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Interactive visualization of the core research domains directed by Dr. Satendra Kumar. Hover over any node to highlight active communication lines.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-sm border border-border bg-surface p-4 sm:p-6 lg:p-8">
        {/* Technical blueprint details */}
        <div className="absolute top-3 left-4 select-none font-mono text-[9px] tracking-widest text-muted-foreground/35 uppercase">
          SYS.LOC.PATNA // INQUIRY.GRAPH.V2
        </div>
        <div className="absolute right-4 bottom-3 select-none font-mono text-[9px] tracking-widest text-accent/35 uppercase">
          [STATUS: NETWORK.ACTIVE]
        </div>

        {/* The interactive SVG viewport */}
        <div className="relative aspect-[4/3] w-full border border-border bg-background/20">
          {/* Grid tick markers */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-2 text-[7px] font-mono text-muted-foreground/30">
            <span>0.00</span>
            <span>0.25</span>
            <span>0.50</span>
            <span>0.75</span>
            <span>1.00</span>
          </div>

          <svg
            className="size-full"
            viewBox="0 0 100 90"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Draw grid lines in background */}
            <defs>
              <pattern
                id="graph-blueprint-grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.04"
                  className="text-accent/10"
                />
              </pattern>
            </defs>
            <rect width="100" height="90" fill="url(#graph-blueprint-grid)" />

            {/* Hub-and-Spoke Edges */}
            <g>
              {edges.map((edge, index) => {
                const source = nodes.find((n) => n.id === edge.from);
                const target = nodes.find((n) => n.id === edge.to);

                if (!source || !target) return null;

                const highlighted = isEdgeHighlighted(edge.from, edge.to);
                const dimmed = hoveredNode !== null && !highlighted;

                return (
                  <line
                    key={`edge-${index}`}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    className={cn(
                      "transition-all duration-300 ease-out",
                      highlighted
                        ? "stroke-accent stroke-[0.35] opacity-100"
                        : "stroke-muted-foreground/15 stroke-[0.18]",
                      dimmed && "opacity-15",
                    )}
                  />
                );
              })}
            </g>

            {/* Nodes */}
            <g>
              {nodes.map((node) => {
                const isHovered = hoveredNode === node.id;
                const highlighted = isNodeHighlighted(node.id);
                const dimmed = hoveredNode !== null && !highlighted;

                return (
                  <g
                    key={node.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Hover area multiplier */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.size / 2.2}
                      fill="transparent"
                    />

                    {/* Node ring */}
                    {node.isCenter ? (
                      <>
                        {/* Central Node styling */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="3"
                          className={cn(
                            "fill-transparent stroke-accent/0 transition-all duration-300 ease-out",
                            isHovered && "stroke-accent/20 stroke-[1.5] scale-[1.1]",
                          )}
                        />
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="2.2"
                          className={cn(
                            "transition-all duration-300 ease-out",
                            isHovered
                              ? "fill-accent stroke-accent stroke-[0.6]"
                              : highlighted
                                ? "fill-background stroke-accent stroke-[0.4]"
                                : "fill-muted-foreground/30 stroke-muted-foreground/25 stroke-[0.3]",
                            dimmed && "opacity-20",
                          )}
                        />
                      </>
                    ) : (
                      <>
                        {/* Spoke Node styling */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="1.8"
                          className={cn(
                            "fill-transparent stroke-accent/0 transition-all duration-300 ease-out",
                            isHovered && "stroke-accent/20 stroke-[1]",
                          )}
                        />
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="1.2"
                          className={cn(
                            "transition-all duration-300 ease-out",
                            isHovered
                              ? "fill-accent stroke-accent stroke-[0.4]"
                              : highlighted
                                ? "fill-background stroke-foreground stroke-[0.3]"
                                : "fill-muted-foreground/20 stroke-muted-foreground/15 stroke-[0.2]",
                            dimmed && "opacity-20",
                          )}
                        />
                      </>
                    )}

                    {/* Node Text Label */}
                    <text
                      x={node.x}
                      y={node.y + (node.isCenter ? 5.8 : 4.6)}
                      textAnchor="middle"
                      className={cn(
                        "select-none font-sans text-sans font-medium tracking-tight transition-all duration-300 ease-out",
                        node.isCenter ? "text-[2.6px]" : "text-[2.2px]",
                        isHovered
                          ? "fill-foreground font-semibold"
                          : highlighted
                            ? node.isCenter
                              ? "fill-foreground font-semibold"
                              : "fill-foreground/90"
                            : "fill-muted-foreground/40",
                        dimmed && "opacity-20",
                      )}
                    >
                      {node.label}
                    </text>

                    {/* Monospace coordinates details */}
                    <text
                      x={node.x}
                      y={node.y - (node.isCenter ? 4.2 : 3.2)}
                      textAnchor="middle"
                      className={cn(
                        "select-none font-mono text-[1.5px] tracking-wider transition-all duration-300 ease-out",
                        isHovered
                          ? "fill-accent/80 opacity-100"
                          : "fill-muted-foreground/15 opacity-40",
                      )}
                    >
                      {node.isCenter ? "CENTER" : `NODE.${node.id.toUpperCase()}`}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
