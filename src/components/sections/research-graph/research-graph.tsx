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
  
  // Hover state personalization (p) and local epochs (e)
  const [strategy, setStrategy] = useState<{ p: number; e: number } | null>(null);
  
  // Optimal Convergence Point
  const pStar = 4.0;
  const eStar = 6.0;

  // Track cursor position and map to strategy space [0, 10] x [0, 10]
  const handleMouseMove = (event: MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const xRaw = event.clientX - rect.left;
    const yRaw = event.clientY - rect.top;
    
    // Convert pixels to relative percentages (0 to 100) inside our 70x70 active area (from 15 to 85)
    const activeWidth = rect.width * 0.7;
    const activeHeight = rect.height * 0.7;
    const startX = rect.width * 0.15;
    const startY = rect.height * 0.15;
    
    const pVal = Math.max(0, Math.min(10, ((xRaw - startX) / activeWidth) * 10));
    const eVal = Math.max(0, Math.min(10, (1 - (yRaw - startY) / activeHeight) * 10));
    
    setStrategy({ p: pVal, e: eVal });
  };

  const handleMouseLeave = () => {
    setStrategy(null);
  };

  const handleKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
      const currentP = strategy ? strategy.p : pStar;
      const currentE = strategy ? strategy.e : eStar;
      let nextP = currentP;
      let nextE = currentE;
      
      if (event.key === "ArrowLeft") nextP = Math.max(0, currentP - 1.0);
      if (event.key === "ArrowRight") nextP = Math.min(10, currentP + 1.0);
      if (event.key === "ArrowDown") nextE = Math.max(0, currentE - 1.0);
      if (event.key === "ArrowUp") nextE = Math.min(10, currentE + 1.0);
      
      setStrategy({ p: nextP, e: nextE });
    } else if (event.key === "Escape" || event.key === "Backspace") {
      setStrategy(null);
    }
  };

  // Determine current active strategies
  const p = strategy ? strategy.p : pStar;
  const e = strategy ? strategy.e : eStar;

  // Calculate Metrics based on Federated Learning Models:
  // 1. Edge Server Aggregation Efficiency (peaks when personalization is balanced)
  const aggEfficiency = p * e - 0.4 * Math.pow(p, 2);
  
  // 2. Local Node Accuracy (diminishing returns on epochs)
  const localAccuracy = 14 * Math.log(1 + e) - p * e;

  // Global Model Convergence
  const convergence = aggEfficiency + localAccuracy;
  
  // Optimal Convergence
  const optConvergence = 28.5;
  
  // Noise Rectification Ratio (Simulating performance under noisy labels)
  const noiseRatio = Math.max(0.65, Math.min(1.0, convergence / optConvergence));

  // Determine system stability parameters
  const distanceToEq = Math.sqrt(Math.pow(p - pStar, 2) + Math.pow(e - eStar, 2));
  const isStable = distanceToEq < 1.2;
  const isOverfitting = p > 7.0;
  const isUnderfitting = p < 2.0;

  // Map strategy coordinates to active research publication quadrant
  const getActiveRegion = (personalization: number, epochs: number): string => {
    if (distanceToEq < 1.2) {
      return "equilibrium";
    }
    
    if (personalization <= pStar && epochs > eStar) {
      return "d2d";
    } else if (personalization > pStar && epochs <= eStar) {
      return "auction";
    } else if (personalization > pStar && epochs > eStar) {
      return "hetnet";
    }
    
    return "equilibrium";
  };

  const activeRegionKey = getActiveRegion(p, e);
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
              aria-label="Interactive Federated Learning Node Dynamics grid. Use Left and Right arrow keys to adjust personalization threshold, and Up and Down arrow keys to adjust local training epochs. Press Escape or Backspace to reset to optimal convergence."
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
                Local Training Epochs (e) &rarr;
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
                  <line x1={getSvgX(p)} y1="85" x2={getSvgX(p)} y2={getSvgY(e)} />
                  <line x1="15" y1={getSvgY(e)} x2={getSvgX(p)} y2={getSvgY(e)} />
                </g>
              )}

              {/* Optimal Convergence Point */}
              <g>
                <circle
                  cx={getSvgX(pStar)}
                  cy={getSvgY(eStar)}
                  r="2.2"
                  className="fill-transparent stroke-accent-warm/15 stroke-[0.8] animate-pulse"
                />
                <circle
                  cx={getSvgX(pStar)}
                  cy={getSvgY(eStar)}
                  r="0.8"
                  className="fill-accent-warm stroke-background stroke-[0.2]"
                />
                <text
                  x={getSvgX(pStar) + 2}
                  y={getSvgY(eStar) - 2}
                  className="font-mono text-[2px] font-bold fill-accent-warm tracking-wider"
                >
                  OPTIMAL CONVERGENCE
                </text>
              </g>

              {/* Current Cursor Strategy Tracker Node */}
              {strategy && (
                <g>
                  <circle
                    cx={getSvgX(p)}
                    cy={getSvgY(e)}
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
                isOverfitting && "text-destructive border-destructive/40 bg-destructive/5",
                isUnderfitting && "text-amber-500 border-amber-500/40 bg-amber-500/5",
                (!isStable && !isOverfitting && !isUnderfitting) && "text-muted-foreground border-border/40 bg-transparent"
              )}>
                {isStable 
                  ? "CONVERGED" 
                  : isOverfitting 
                    ? "OVERFITTING" 
                    : isUnderfitting 
                      ? "UNDERFITTING" 
                      : "DIVERGENT"}
              </span>
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs text-foreground/90 bg-background/40 p-3 rounded-sm border border-border/30">
              <div className="flex justify-between">
                <span className="text-muted-foreground/60 uppercase text-[9px]">State (p, e):</span>
                <span className="font-bold">({p.toFixed(1)}, {e.toFixed(1)})</span>
              </div>
              <div className="flex justify-between border-t border-border/10 pt-2">
                <span className="text-muted-foreground/60 uppercase text-[9px]">Agg. Efficiency (E<sub>agg</sub>):</span>
                <span className="font-bold text-accent">{aggEfficiency.toFixed(1)}</span>
              </div>
              <div className="flex justify-between border-t border-border/10 pt-2">
                <span className="text-muted-foreground/60 uppercase text-[9px]">Local Accuracy (A<sub>loc</sub>):</span>
                <span className="font-bold text-accent">{localAccuracy.toFixed(1)}</span>
              </div>
              <div className="flex justify-between border-t border-border/10 pt-2">
                <span className="text-muted-foreground/60 uppercase text-[9px]">Noise Rectification (R<sub>n</sub>):</span>
                <span className="font-bold">{noiseRatio.toFixed(3)}</span>
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
