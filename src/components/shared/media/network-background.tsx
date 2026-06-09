"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

// Federated Learning Nodes Definition
const GLOBAL_SERVERS = [
  { id: "g-01", x: 50, y: 50, label: "[ FED_SERVER_01 // AGGREGATION ]" },
];

const EDGE_NODES = [
  { id: "e-01", x: 20, y: 25, label: "[ EDGE_NODE_01 // FOG ]" },
  { id: "e-02", x: 80, y: 25, label: "[ EDGE_NODE_02 // FOG ]" },
  { id: "e-03", x: 20, y: 75, label: "[ EDGE_NODE_03 // FOG ]" },
  { id: "e-04", x: 80, y: 75, label: "[ EDGE_NODE_04 // FOG ]" },
  { id: "e-05", x: 50, y: 15, label: "[ EDGE_NODE_05 // FOG ]" },
];

// Noisy Datasets clustered around edge nodes
const LOCAL_DATASETS = [
  // Cluster 1
  { x: 12, y: 18, noise: true }, { x: 25, y: 15, noise: false }, { x: 18, y: 32, noise: true }, { x: 28, y: 28, noise: false },
  // Cluster 2
  { x: 75, y: 15, noise: true }, { x: 88, y: 18, noise: false }, { x: 72, y: 30, noise: false }, { x: 85, y: 32, noise: true },
  // Cluster 3
  { x: 15, y: 70, noise: false }, { x: 28, y: 68, noise: true }, { x: 12, y: 82, noise: false }, { x: 25, y: 85, noise: true },
  // Cluster 4
  { x: 72, y: 68, noise: true }, { x: 85, y: 70, noise: false }, { x: 75, y: 85, noise: true }, { x: 88, y: 82, noise: false },
  // Cluster 5
  { x: 42, y: 10, noise: true }, { x: 58, y: 10, noise: false }, { x: 45, y: 8, noise: true }, { x: 55, y: 8, noise: false },
];

// Epoc Synchronisation Links (Edge to Global)
const AGGREGATION_LINKS = [
  [0, 0], [0, 1], [0, 2], [0, 3], [0, 4]
];

type NetworkBackgroundProps = {
  className?: string;
};

export function NetworkBackground({ className }: NetworkBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const xOffset = (e.clientX / (window.innerWidth || 1) - 0.5) * 2.5;
      const yOffset = (e.clientY / (window.innerHeight || 1) - 0.5) * 2.5;
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
        "pointer-events-none absolute inset-0 overflow-hidden bg-[#0A0C10]",
        className,
      )}
    >
      {/* Volumetric Fog Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,transparent_0%,#0A0C10_100%)] z-10" />
      <div className="absolute inset-0 opacity-40 mix-blend-screen blur-[120px] bg-[radial-gradient(circle_at_20%_30%,rgba(120,135,160,0.15)_0%,transparent_40%)]" />
      <div className="absolute inset-0 opacity-40 mix-blend-screen blur-[100px] bg-[radial-gradient(circle_at_80%_70%,rgba(80,105,140,0.15)_0%,transparent_50%)]" />
      
      <svg
        className="absolute inset-0 size-full text-accent opacity-[0.25] transition-transform duration-1000 ease-out z-0"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
        style={{
          transform: "translate(var(--mouse-x-offset, 0%), var(--mouse-y-offset, 0%)) scale(1.05)",
        }}
      >
        {/* Aggregation Rings around Global Server */}
        {GLOBAL_SERVERS.map((cell) => (
          <g key={`rf-${cell.id}`} className="stroke-accent/20 stroke-[0.08] fill-none" strokeDasharray="1 2">
            <circle cx={cell.x} cy={cell.y} r="15" className="animate-[spin_60s_linear_infinite]" style={{ transformOrigin: `${cell.x}px ${cell.y}px` }} />
            <circle cx={cell.x} cy={cell.y} r="30" className="animate-[spin_90s_linear_infinite_reverse]" style={{ transformOrigin: `${cell.x}px ${cell.y}px` }} />
            <circle cx={cell.x} cy={cell.y} r="45" className="animate-[spin_120s_linear_infinite]" style={{ transformOrigin: `${cell.x}px ${cell.y}px` }} />
          </g>
        ))}

        {/* Global to Edge Links (Model Updates) */}
        {AGGREGATION_LINKS.map(([globalIdx, edgeIdx], i) => {
          const start = GLOBAL_SERVERS[globalIdx];
          const end = EDGE_NODES[edgeIdx];
          return (
            <line
              key={`agg-${i}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="url(#gradient-flow)"
              strokeWidth="0.15"
              className="text-accent/40"
            />
          );
        })}

        {/* Edge to Data Links (Noise suppression represented by dashed lines) */}
        {LOCAL_DATASETS.map((data, i) => {
          let closestEdge = EDGE_NODES[0];
          let minDist = Infinity;
          EDGE_NODES.forEach((edge) => {
            const dist = Math.sqrt(Math.pow(data.x - edge.x, 2) + Math.pow(data.y - edge.y, 2));
            if (dist < minDist) {
              minDist = dist;
              closestEdge = edge;
            }
          });

          return (
            <line
              key={`data-link-${i}`}
              x1={data.x}
              y1={data.y}
              x2={closestEdge.x}
              y2={closestEdge.y}
              stroke="currentColor"
              strokeWidth={data.noise ? "0.05" : "0.1"}
              strokeDasharray={data.noise ? "0.5 1" : "none"}
              className={data.noise ? "text-red-400/30" : "text-accent/30"}
            />
          );
        })}

        {/* Edge Nodes (Fog Computing) */}
        {EDGE_NODES.map((node) => (
          <g key={node.id}>
            <polygon 
              points={`${node.x},${node.y-1.5} ${node.x+1.5},${node.y+0.5} ${node.x-1.5},${node.y+0.5}`} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.15" 
              className="text-accent/60" 
            />
            <circle cx={node.x} cy={node.y} r="0.4" fill="currentColor" className="text-accent-warm" />
            <text
              x={node.x}
              y={node.y - 2.5}
              textAnchor="middle"
              className="fill-accent/70 font-mono text-[1.5px] tracking-[0.2em] uppercase font-semibold select-none"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Global Servers (Consensus) */}
        {GLOBAL_SERVERS.map((server) => (
          <g key={server.id}>
            <rect x={server.x - 2} y={server.y - 2} width="4" height="4" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-accent/80 transform rotate-45" style={{ transformOrigin: `${server.x}px ${server.y}px` }} />
            <circle cx={server.x} cy={server.y} r="0.8" fill="currentColor" className="text-foreground animate-pulse" />
            <text
              x={server.x}
              y={server.y - 3.5}
              textAnchor="middle"
              className="fill-foreground/90 font-mono text-[2.5px] tracking-[0.3em] uppercase font-bold select-none"
            >
              {server.label}
            </text>
          </g>
        ))}

        {/* Datasets (Noisy vs Clean) */}
        {LOCAL_DATASETS.map((data, i) => (
          <circle 
            key={`dataset-${i}`} 
            cx={data.x} 
            cy={data.y} 
            r={data.noise ? "0.2" : "0.3"} 
            fill="currentColor" 
            className={data.noise ? "text-red-400/40" : "text-foreground/80"} 
          />
        ))}

        {/* Defs for Flow Gradient */}
        <defs>
          <linearGradient id="gradient-flow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Telemetry */}
        <g className="fill-accent/40 font-mono text-[2px] tracking-widest uppercase select-none z-20">
          <text x="3" y="97">SYS.STATE: FEDERATED_LEARNING.ACTIVE</text>
          <text x="97" y="3" textAnchor="end">EPOCHS: 24,000 // LOSS: 0.0034</text>
          <text x="97" y="97" textAnchor="end">NOISE_RECTIFICATION: ENABLED // 89.2% ACC</text>
        </g>
      </svg>
    </div>
  );
}
