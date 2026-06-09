"use client";

import { useState, useRef, useEffect, type MouseEvent, type KeyboardEvent } from "react";
import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { cn } from "@/lib/utils";
import { publications } from "@/data/publications";

type ResearchGraphProps = {
  className?: string;
};

// Map strategy quadrants to publication database IDs
const QUADRANT_MAP: Record<string, string> = {
  equilibrium: "pub-001",
  d2d: "pub-002",
  auction: "pub-003",
  hetnet: "pub-004",
};

export function ResearchGraph({ className }: ResearchGraphProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  
  // Hover state pricing (p) and demand (d)
  const [strategy, setStrategy] = useState<{ p: number; d: number } | null>(null);
  
  // Stable Nash Equilibrium constants
  const pStar = 4.0;
  const dStar = 6.0;

  // Track cursor position and map to strategy space [0, 10] x [0, 10]
  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const xRaw = e.clientX - rect.left;
    const yRaw = e.clientY - rect.top;
    
    // Convert pixels to relative percentages (0 to 100) inside our 70x70 active area (from 15 to 85)
    const activeWidth = rect.width * 0.7;
    const activeHeight = rect.height * 0.7;
    const startX = rect.width * 0.15;
    const startY = rect.height * 0.15;
    
    const pVal = Math.max(0, Math.min(10, ((xRaw - startX) / activeWidth) * 10));
    const dVal = Math.max(0, Math.min(10, (1 - (yRaw - startY) / activeHeight) * 10));
    
    setStrategy({ p: pVal, d: dVal });
  };

  const handleMouseLeave = () => {
    setStrategy(null);
  };

  const handleKeyDown = (e: KeyboardEvent<SVGSVGElement>) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
      const currentP = strategy ? strategy.p : pStar;
      const currentD = strategy ? strategy.d : dStar;
      let nextP = currentP;
      let nextD = currentD;
      
      if (e.key === "ArrowLeft") nextP = Math.max(0, currentP - 1.0);
      if (e.key === "ArrowRight") nextP = Math.min(10, currentP + 1.0);
      if (e.key === "ArrowDown") nextD = Math.max(0, currentD - 1.0);
      if (e.key === "ArrowUp") nextD = Math.min(10, currentD + 1.0);
      
      setStrategy({ p: nextP, d: nextD });
    } else if (e.key === "Escape" || e.key === "Backspace") {
      setStrategy(null);
    }
  };

  // Determine current active strategies
  const p = strategy ? strategy.p : pStar;
  const d = strategy ? strategy.d : dStar;

  // Calculate Utilities based on real game-theoretic pricing models:
  // 1. RSU Caching Utility: U_rsu = p * d - 0.4 * p^2  (revenue minus hosting costs)
  const uRsu = p * d - 0.4 * Math.pow(p, 2);
  
  // 2. Consumer Follower Utility: U_user = 14 * ln(1 + d) - p * d
  const uUser = 14 * Math.log(1 + d) - p * d;

  // Social Welfare: SW = U_rsu + U_user
  const sw = uRsu + uUser;
  
  // Social Optimum Welfare (cooperative peak)
  const swOpt = 28.5;
  
  // Price of Anarchy (PoA) ratio
  const poa = Math.max(0.65, Math.min(1.0, sw / swOpt));

  // Determine system stability parameters
  const distanceToEq = Math.sqrt(Math.pow(p - pStar, 2) + Math.pow(d - dStar, 2));
  const isStable = distanceToEq < 1.2;
  const isExploitative = p > 7.0;
  const isSuboptimal = p < 2.0;

  // Map strategy coordinates to active research publication quadrant
  const getActiveRegion = (price: number, demand: number): string => {
    if (distanceToEq < 1.2) {
      return "equilibrium";
    }
    
    if (price <= pStar && demand > dStar) {
      return "d2d";
    } else if (price > pStar && demand <= dStar) {
      return "auction";
    } else if (price > pStar && demand > dStar) {
      return "hetnet";
    }
    
    return "equilibrium";
  };

  const activeRegionKey = getActiveRegion(p, d);
  const activePubId = QUADRANT_MAP[activeRegionKey] || "pub-002";
  const activePub = publications.find((pub) => pub.id === activePubId) || publications.find(p => p.id === "pub-002")!;

  const [displayPub, setDisplayPub] = useState(activePub);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (activePub.id !== displayPub.id) {
      setIsFading(true);
      const timer = setTimeout(() => {
        setDisplayPub(activePub);
        setIsFading(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [activePub, displayPub]);

  // Convert strategy values back to SVG coordinates (for drawing circles/lines)
  const getSvgX = (price: number) => 15 + price * 7;
  const getSvgY = (demand: number) => 85 - demand * 7;

  // Generate User Best Response curve path: d = 10 / (p + 1) + 4
  const getUserBRPath = () => {
    let path = `M ${getSvgX(0)} ${getSvgY(10)}`;
    for (let price = 0.1; price <= 10; price += 0.2) {
      const demandVal = Math.max(0, Math.min(10, 10 / (price + 0.6) - 1.5));
      path += ` L ${getSvgX(price)} ${getSvgY(demandVal)}`;
    }
    return path;
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
          Equilibrium Grid
        </SectionHeading>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base font-light leading-relaxed">
          Interactive simulation of <span className="font-semibold text-foreground">Federated Learning Node Dynamics</span> representing Dr. Rahul Mishra's research. The Edge Server sets the personalization threshold (<span className="italic font-mono text-accent">p</span>), while client devices allocate local training epochs (<span className="italic font-mono text-accent">d</span>). Move your cursor across the strategic space to explore corresponding research publications.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Interactive Strategic Coordinate Grid */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="relative overflow-hidden rounded-sm border border-border/40 bg-surface/20 p-2 sm:p-4">
            {/* Grid coordinates */}
            <div className="absolute top-3 left-4 select-none font-mono text-[8px] tracking-widest text-muted-foreground/35 uppercase">
              STRATEGY.SPACE [p x d]
            </div>
            
            <svg
              ref={svgRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="application"
              aria-label="Interactive Stackelberg Caching Pricing Game grid. Use Left and Right arrow keys to adjust pricing, and Up and Down arrow keys to adjust cache demand. Press Escape or Backspace to reset to Nash Equilibrium."
              className="w-full aspect-square bg-background/20 cursor-crosshair select-none focus:outline-none focus:ring-1 focus:ring-accent/40 rounded-sm"
              viewBox="0 0 100 100"
            >
              {/* Background Grid Lines */}
              <defs>
                <pattern
                  id="pricing-grid"
                  width="7"
                  height="7"
                  patternUnits="userSpaceOnUse"
                  x="15"
                  y="15"
                >
                  <rect width="7" height="7" fill="none" />
                  <path
                    d="M 7 0 L 0 0 0 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.06"
                    className="text-accent/10"
                  />
                </pattern>
              </defs>
              <rect x="15" y="15" width="70" height="70" fill="url(#pricing-grid)" stroke="currentColor" strokeWidth="0.15" className="text-border/60" />

              {/* Quadrant Highlights (underlay) */}
              <g className="transition-all duration-300">
                {/* Cooperative D2D (Top-Left) */}
                <rect
                  x="15"
                  y="15"
                  width="28"
                  height="28"
                  className={cn(
                    "transition-colors duration-300 pointer-events-none",
                    activeRegionKey === "d2d" ? "fill-accent/[0.03] stroke-accent/20 stroke-[0.3]" : "fill-transparent stroke-transparent"
                  )}
                />
                {/* User HetNet (Top-Right) */}
                <rect
                  x="43"
                  y="15"
                  width="42"
                  height="28"
                  className={cn(
                    "transition-colors duration-300 pointer-events-none",
                    activeRegionKey === "hetnet" ? "fill-accent/[0.03] stroke-accent/20 stroke-[0.3]" : "fill-transparent stroke-transparent"
                  )}
                />
                {/* Social Optimum / Equilibrium (Bottom-Left) */}
                <rect
                  x="15"
                  y="43"
                  width="28"
                  height="42"
                  className={cn(
                    "transition-colors duration-300 pointer-events-none",
                    activeRegionKey === "equilibrium" ? "fill-accent/[0.03] stroke-accent/20 stroke-[0.3]" : "fill-transparent stroke-transparent"
                  )}
                />
                {/* Multi-Source Auction (Bottom-Right) */}
                <rect
                  x="43"
                  y="43"
                  width="42"
                  height="42"
                  className={cn(
                    "transition-colors duration-300 pointer-events-none",
                    activeRegionKey === "auction" ? "fill-accent/[0.03] stroke-accent/20 stroke-[0.3]" : "fill-transparent stroke-transparent"
                  )}
                />
              </g>

              {/* Quadrant Divider Axes */}
              <line
                x1="43"
                y1="15"
                x2="43"
                y2="85"
                stroke="currentColor"
                strokeWidth="0.15"
                strokeDasharray="1 1"
                className="text-border/40"
              />
              <line
                x1="15"
                y1="43"
                x2="85"
                y2="43"
                stroke="currentColor"
                strokeWidth="0.15"
                strokeDasharray="1 1"
                className="text-border/40"
              />

              {/* Quadrant Labels */}
              <g className="font-mono text-[1.6px] pointer-events-none select-none">
                <text
                  x="17"
                  y="18.5"
                  className={cn(
                    "transition-colors duration-300 uppercase tracking-widest",
                    activeRegionKey === "d2d" ? "fill-accent font-bold text-[1.8px]" : "fill-muted-foreground/30"
                  )}
                >
                  [I] Local FL Training
                </text>
                <text
                  x="45"
                  y="18.5"
                  className={cn(
                    "transition-colors duration-300 uppercase tracking-widest",
                    activeRegionKey === "hetnet" ? "fill-accent font-bold text-[1.8px]" : "fill-muted-foreground/30"
                  )}
                >
                  [II] Edge Personalization
                </text>
                <text
                  x="17"
                  y="83.5"
                  className={cn(
                    "transition-colors duration-300 uppercase tracking-widest",
                    activeRegionKey === "equilibrium" ? "fill-accent font-bold text-[1.8px]" : "fill-muted-foreground/30"
                  )}
                >
                  [III] Global Consensus
                </text>
                <text
                  x="45"
                  y="83.5"
                  className={cn(
                    "transition-colors duration-300 uppercase tracking-widest",
                    activeRegionKey === "auction" ? "fill-accent font-bold text-[1.8px]" : "fill-muted-foreground/30"
                  )}
                >
                  [IV] Heterogeneous Clusters
                </text>
              </g>

              {/* Strategy Axis Ticks */}
              {Array.from({ length: 11 }).map((_, i) => {
                const tickLabel = i.toString();
                const xPos = getSvgX(i);
                const yPos = getSvgY(i);

                return (
                  <g key={`ticks-${i}`} className="font-mono text-[2px] fill-muted-foreground/45">
                    {/* X-axis tick labels (Pricing) */}
                    <text x={xPos} y="88.5" textAnchor="middle">{tickLabel}.0</text>
                    <line x1={xPos} y1="85" x2={xPos} y2="86" stroke="currentColor" strokeWidth="0.1" className="text-muted-foreground/30" />
                    
                    {/* Y-axis tick labels (Demand) */}
                    <text x="11.5" y={yPos + 0.7} textAnchor="end">{tickLabel}.0</text>
                    <line x1={15} y1={yPos} x2={14} y2={yPos} stroke="currentColor" strokeWidth="0.1" className="text-muted-foreground/30" />
                  </g>
                );
              })}

              {/* Axis Titles */}
              <text x="50" y="94.5" textAnchor="middle" className="font-mono text-[2.5px] fill-accent uppercase tracking-widest font-semibold">
                Personalization Threshold (p) &rarr;
              </text>
              <text x="5" y="50" textAnchor="middle" transform="rotate(-90, 5, 50)" className="font-mono text-[2.5px] fill-accent uppercase tracking-widest font-semibold">
                Local Training Epochs (d) &rarr;
              </text>

              {/* Best Response Curve 1 (Consumer Demand Response) */}
              <path
                d={getUserBRPath()}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.35"
                className="text-accent/40"
              />
              {/* Best Response Curve 2 (RSU Pricing Response) */}
              <line
                x1={getSvgX(0)}
                y1={getSvgY(0)}
                x2={getSvgX(6.67)}
                y2={getSvgY(10.0)}
                stroke="currentColor"
                strokeWidth="0.35"
                className="text-foreground/30"
              />

              {/* Dotted lines tracing cursor position */}
              {strategy && (
                <g className="stroke-accent/20 stroke-[0.2]" strokeDasharray="1 1">
                  <line x1={getSvgX(p)} y1="85" x2={getSvgX(p)} y2={getSvgY(d)} />
                  <line x1="15" y1={getSvgY(d)} x2={getSvgX(p)} y2={getSvgY(d)} />
                </g>
              )}

              {/* Nash Equilibrium (NE) Point */}
              <g>
                <circle
                  cx={getSvgX(pStar)}
                  cy={getSvgY(dStar)}
                  r="2.2"
                  className="fill-transparent stroke-accent-warm/15 stroke-[0.8] animate-pulse"
                />
                <circle
                  cx={getSvgX(pStar)}
                  cy={getSvgY(dStar)}
                  r="0.8"
                  className="fill-accent-warm stroke-background stroke-[0.2]"
                />
                <text
                  x={getSvgX(pStar) + 2}
                  y={getSvgY(dStar) - 2}
                  className="font-mono text-[2px] font-bold fill-accent-warm tracking-wider"
                >
                  NASH EQUILIBRIUM (NE)
                </text>
              </g>

              {/* Current Cursor Strategy Tracker Node */}
              {strategy && (
                <g>
                  <circle
                    cx={getSvgX(p)}
                    cy={getSvgY(d)}
                    r="1.2"
                    className="fill-foreground stroke-background stroke-[0.2]"
                  />
                </g>
              )}
            </svg>
          </div>

          <div className="flex justify-between font-mono text-[9px] text-muted-foreground/50 px-1">
            <span>[BR<sub>edge</sub>] // Edge constraint response</span>
            <span>[BR<sub>node</sub>] // Client epoch response</span>
          </div>
        </div>

        {/* Right Column: Telemetry HUD Panel with Mapped Publications */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6 border border-border/40 bg-surface/10 p-5 rounded-sm relative min-h-[420px]">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <h3 className="font-mono text-[10px] tracking-widest text-accent font-semibold uppercase">
                // System State
              </h3>
              <span className={cn(
                "font-mono text-[9px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded-sm border",
                isStable && "text-accent-warm border-accent-warm/40 bg-accent-warm/5",
                isExploitative && "text-destructive border-destructive/40 bg-destructive/5",
                isSuboptimal && "text-amber-500 border-amber-500/40 bg-amber-500/5",
                (!isStable && !isExploitative && !isSuboptimal) && "text-muted-foreground border-border/40 bg-transparent"
              )}>
                {isStable 
                  ? "NE.STABLE" 
                  : isExploitative 
                    ? "EXPLOITATIVE" 
                    : isSuboptimal 
                      ? "SUB-OPTIMAL" 
                      : "DIVERGENT"}
              </span>
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs text-foreground/90 bg-background/40 p-3 rounded-sm border border-border/30">
              <div className="flex justify-between">
                <span className="text-muted-foreground/60 uppercase text-[9px]">Coordinates (p, d):</span>
                <span className="font-bold">({p.toFixed(1)}, {d.toFixed(1)})</span>
              </div>
              <div className="flex justify-between border-t border-border/10 pt-2">
                <span className="text-muted-foreground/60 uppercase text-[9px]">Server Utilization (U<sub>edge</sub>):</span>
                <span className="font-bold text-accent">{uRsu.toFixed(1)}</span>
              </div>
              <div className="flex justify-between border-t border-border/10 pt-2">
                <span className="text-muted-foreground/60 uppercase text-[9px]">Node Accuracy (U<sub>node</sub>):</span>
                <span className="font-bold text-accent">{uUser.toFixed(1)}</span>
              </div>
              <div className="flex justify-between border-t border-border/10 pt-2">
                <span className="text-muted-foreground/60 uppercase text-[9px]">Price of Anarchy (PoA):</span>
                <span className="font-bold">{poa.toFixed(3)}</span>
              </div>
            </div>

            {/* Dynamic Publication Card */}
            <div className="flex flex-col gap-2.5 border border-border/30 bg-surface/20 p-4 rounded-sm transition-all duration-300 min-h-[240px]">
              <span className="font-mono text-[9px] tracking-wider text-accent uppercase block mb-1">
                [ Mapped Publication Context ]
              </span>
              <div
                className={cn(
                  "flex flex-col gap-2.5 transition-all duration-150 ease-in-out",
                  isFading ? "opacity-0 scale-[0.98] blur-[2px]" : "opacity-100 scale-100 blur-0"
                )}
              >
                <h4 className="text-sm font-bold tracking-tight text-foreground leading-snug">
                  {displayPub.title}
                </h4>
                <p className="font-mono text-[9px] text-muted-foreground/70 uppercase">
                  {displayPub.venue} // {displayPub.year}
                </p>
                <p className="text-[11px] leading-relaxed text-muted-foreground/90 border-t border-border/10 pt-2">
                  {displayPub.gameSummary || displayPub.abstract}
                </p>
                <div className="text-[11px] leading-relaxed border-t border-border/10 pt-2 text-foreground/90">
                  <span className="font-semibold text-accent font-mono text-[9px] uppercase block mb-0.5">Core Impact:</span>
                  {displayPub.impact}
                </div>
                <a 
                  href={`https://doi.org/${displayPub.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-center py-1.5 bg-accent hover:bg-accent/90 text-primary-foreground font-mono text-[9px] tracking-wider uppercase font-semibold rounded-sm transition-colors duration-300"
                >
                  View full paper (DOI)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
