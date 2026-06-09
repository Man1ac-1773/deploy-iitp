"use client";
 
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
 
// HetNet Architecture Nodes Definition
const MACRO_CELLS = [
  { id: "m-01", x: 28, y: 42, label: "[ M-BS_01 // 3.5GHz ]" },
  { id: "m-02", x: 72, y: 58, label: "[ M-BS_02 // 3.5GHz ]" },
];
 
const PICO_CELLS = [
  { id: "p-01", x: 15, y: 20, label: "[ P-BS_01 // 28GHz ]" },
  { id: "p-02", x: 45, y: 75, label: "[ P-BS_02 // 28GHz ]" },
  { id: "p-03", x: 55, y: 25, label: "[ P-BS_03 // 28GHz ]" },
  { id: "p-04", x: 85, y: 80, label: "[ P-BS_04 // 28GHz ]" },
];
 
// User Equipment (UE) clustered around cells
const USER_DEVICES = [
  // Clustered near Pico 1
  { x: 9, y: 14 },
  { x: 18, y: 11 },
  { x: 20, y: 25 },
  // Clustered near Pico 2
  { x: 38, y: 72 },
  { x: 49, y: 81 },
  { x: 39, y: 82 },
  // Clustered near Pico 3
  { x: 51, y: 19 },
  { x: 61, y: 17 },
  { x: 59, y: 31 },
  // Clustered near Pico 4
  { x: 81, y: 84 },
  { x: 91, y: 74 },
  { x: 87, y: 89 },
  // Clustered near Macro 1
  { x: 22, y: 48 },
  { x: 34, y: 36 },
  { x: 32, y: 49 },
  // Clustered near Macro 2
  { x: 66, y: 54 },
  { x: 78, y: 61 },
  { x: 69, y: 67 },
];
 
// Backhaul control connections (Macro to Pico)
const BACKHAUL_LINKS: ReadonlyArray<[number, number]> = [
  [0, 0], // Macro 1 to Pico 1
  [0, 1], // Macro 1 to Pico 2
  [1, 2], // Macro 2 to Pico 3
  [1, 3], // Macro 2 to Pico 4
  [0, 1], // Inter-macro link
];
 
// Local device links (UE connections or D2D mesh)
const D2D_LINKS: ReadonlyArray<[number, number]> = [
  [0, 1], // Pico 1 cluster D2D
  [1, 2],
  [3, 4], // Pico 2 cluster D2D
  [4, 5],
  [6, 7], // Pico 3 cluster D2D
  [7, 8],
  [9, 10], // Pico 4 cluster D2D
  [10, 11],
  [12, 14], // Macro 1 cluster D2D
  [15, 17], // Macro 2 cluster D2D
];
 
type NetworkBackgroundProps = {
  className?: string;
};
 
export function NetworkBackground({ className }: NetworkBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
 
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const xOffset = (e.clientX / (window.innerWidth || 1) - 0.5) * 1.8;
      const yOffset = (e.clientY / (window.innerHeight || 1) - 0.5) * 1.8;
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,var(--color-background)_78%)]" />
 
      <svg
        className="absolute inset-0 size-full text-accent opacity-[0.18] transition-transform duration-700 ease-out"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
        style={{
          transform: "translate(var(--mouse-x-offset, 0%), var(--mouse-y-offset, 0%)) scale(1.03)",
        }}
      >
        {/* Concentric RF wave propagation rings around Macro cells */}
        {MACRO_CELLS.map((cell) => (
          <g key={`rf-${cell.id}`} className="stroke-accent/15 stroke-[0.08] fill-none" strokeDasharray="1.5 1.5">
            <circle cx={cell.x} cy={cell.y} r="12" />
            <circle cx={cell.x} cy={cell.y} r="24" />
            <circle cx={cell.x} cy={cell.y} r="36" />
          </g>
        ))}
 
        {/* Backhaul Links (solid lines) */}
        {BACKHAUL_LINKS.map(([from, to], i) => {
          const start = MACRO_CELLS[from];
          const end = PICO_CELLS[to];
          return (
            <line
              key={`backhaul-${i}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="currentColor"
              strokeWidth="0.16"
              className="text-accent/35"
            />
          );
        })}
 
        {/* Device-to-Device (D2D) mesh links (dashed, fine lines) */}
        {D2D_LINKS.map(([from, to], i) => {
          const start = USER_DEVICES[from];
          const end = USER_DEVICES[to];
          return (
            <line
              key={`d2d-${i}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="currentColor"
              strokeWidth="0.08"
              strokeDasharray="1 0.6"
              className="text-accent-warm/40"
            />
          );
        })}
 
        {/* Association links connecting UEs to base stations */}
        {USER_DEVICES.map((ue, i) => {
          // Associate user to closest Pico cell
          let closestPico = PICO_CELLS[0];
          let minDist = Infinity;
          PICO_CELLS.forEach((pico) => {
            const dist = Math.sqrt(Math.pow(ue.x - pico.x, 2) + Math.pow(ue.y - pico.y, 2));
            if (dist < minDist) {
              minDist = dist;
              closestPico = pico;
            }
          });
 
          return (
            <line
              key={`ue-link-${i}`}
              x1={ue.x}
              y1={ue.y}
              x2={closestPico.x}
              y2={closestPico.y}
              stroke="currentColor"
              strokeWidth="0.06"
              strokeDasharray="0.5 0.5"
              className="text-accent/20"
            />
          );
        })}
 
        {/* Macro Cell structures */}
        {MACRO_CELLS.map((cell) => (
          <g key={cell.id}>
            {/* Base anchor tower structure */}
            <path
              d={`M ${cell.x} ${cell.y} L ${cell.x - 1.5} ${cell.y + 4.5} M ${cell.x} ${cell.y} L ${cell.x + 1.5} ${cell.y + 4.5} M ${cell.x - 1} ${cell.y + 3} L ${cell.x + 1} ${cell.y + 3}`}
              stroke="currentColor"
              strokeWidth="0.2"
              fill="none"
              className="text-accent/50"
            />
            {/* Central Macro antenna node */}
            <circle cx={cell.x} cy={cell.y} r="0.6" fill="currentColor" />
            <circle cx={cell.x} cy={cell.y} r="1.4" className="stroke-accent/30 stroke-[0.1] fill-none animate-pulse" />
            {/* Labels */}
            <text
              x={cell.x}
              y={cell.y - 1.8}
              textAnchor="middle"
              className="fill-accent-warm font-mono text-[1px] tracking-widest uppercase font-bold select-none"
            >
              {cell.label}
            </text>
          </g>
        ))}
 
        {/* Pico Cell structures */}
        {PICO_CELLS.map((cell) => (
          <g key={cell.id}>
            {/* Small mast representation */}
            <line x1={cell.x} y1={cell.y} x2={cell.x} y2={cell.y + 2.5} stroke="currentColor" strokeWidth="0.15" className="text-accent/40" />
            <circle cx={cell.x} cy={cell.y} r="0.45" fill="currentColor" className="text-accent-warm/70" />
            {/* Labels */}
            <text
              x={cell.x}
              y={cell.y - 1.4}
              textAnchor="middle"
              className="fill-accent/85 font-mono text-[0.8px] tracking-widest uppercase font-semibold select-none"
            >
              {cell.label}
            </text>
          </g>
        ))}
 
        {/* User Devices (UE) */}
        {USER_DEVICES.map((ue, i) => (
          <circle key={`ue-${i}`} cx={ue.x} cy={ue.y} r="0.25" fill="currentColor" className="text-foreground/60" />
        ))}
 
        {/* Technical Blueprint Border Telemetry */}
        <g className="fill-accent/55 font-mono text-[0.9px] tracking-widest uppercase select-none">
          <text x="3" y="97">SYS.STATE: HETNET.TOPOLOGY.ACTIVE</text>
          <text x="97" y="3" textAnchor="end">LATITUDE: 25.602 // LONGITUDE: 85.126</text>
          <text x="97" y="97" textAnchor="end">BW: 400MHz // MODULATION: mmWave.QAM</text>
        </g>
      </svg>
    </div>
  );
}
