"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { cn } from "@/lib/utils";
import { publications } from "@/data/publications";

type SystemStateKey = "baseline" | "noisy" | "heterogeneous" | "personalization";

const STATE_TO_PUB: Record<SystemStateKey, string> = {
  baseline: "pub-001",
  noisy: "pub-002",
  heterogeneous: "pub-003",
  personalization: "pub-004",
};

export function ResearchGraph({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeState, setActiveState] = useState<SystemStateKey>("baseline");
  const [metrics, setMetrics] = useState({ accuracy: 92.4, rounds: 120, noise: 0.05 });
  
  // Simulation interaction refs
  const simParams = useRef({
    noiseLevel: 0.05,
    heterogeneity: 0.1,
    personalization: false,
    particles: [] as any[],
    lastTime: 0,
  });

  const activePubId = STATE_TO_PUB[activeState];
  const activePub = publications.find((pub) => pub.id === activePubId) || publications[0];

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

  // Main simulation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    // Resize handling
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Node definitions
    const globalServer = { x: canvas.width / 2, y: canvas.height / 2, radius: 12 };
    let edgeNodes: any[] = [];
    
    const initNodes = () => {
      edgeNodes = [];
      const numNodes = 6;
      const radius = Math.min(canvas.width, canvas.height) * 0.35;
      for (let i = 0; i < numNodes; i++) {
        const angle = (i / numNodes) * Math.PI * 2;
        edgeNodes.push({
          id: i,
          x: canvas.width / 2 + Math.cos(angle) * radius,
          y: canvas.height / 2 + Math.sin(angle) * radius,
          baseRadius: 6,
          isStraggler: false,
        });
      }
    };
    initNodes();

    // Particle class
    class Particle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      speed: number;
      isNoisy: boolean;
      life: number;
      maxLife: number;
      
      constructor(source: any, target: any, isNoisy: boolean, speedMultiplier: number) {
        this.x = source.x;
        this.y = source.y;
        this.targetX = target.x;
        this.targetY = target.y;
        this.isNoisy = isNoisy;
        this.speed = (2 + Math.random() * 2) * speedMultiplier;
        this.life = 0;
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        this.maxLife = Math.sqrt(dx * dx + dy * dy) / this.speed;
      }

      update() {
        this.life++;
        const progress = this.life / this.maxLife;
        if (progress >= 1) return false;
        
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        this.x += (dx / dist) * this.speed;
        this.y += (dy / dist) * this.speed;
        
        // Jitter for noisy particles
        if (this.isNoisy) {
          this.x += (Math.random() - 0.5) * 4;
          this.y += (Math.random() - 0.5) * 4;
        }
        return true;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        if (simParams.current.personalization && !this.isNoisy) {
          ctx.fillStyle = "rgba(167, 139, 250, 0.8)"; // Purple for personalized weights
        } else {
          ctx.fillStyle = this.isNoisy ? "rgba(248, 113, 113, 0.8)" : "rgba(91, 141, 239, 0.8)";
        }
        ctx.fill();
        // Glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const render = (time: number) => {
      // Update canvas center if resized
      globalServer.x = canvas.width / 2;
      globalServer.y = canvas.height / 2;
      if (edgeNodes.length === 0 || Math.abs(edgeNodes[0].x - (canvas.width / 2 + Math.cos(0) * Math.min(canvas.width, canvas.height) * 0.35)) > 5) {
        initNodes();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid background
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 30) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 30) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }

      // Draw connection lines
      edgeNodes.forEach((node) => {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(globalServer.x, globalServer.y);
        ctx.strokeStyle = node.isStraggler ? "rgba(255, 255, 255, 0.05)" : "rgba(91, 141, 239, 0.15)";
        ctx.lineWidth = 1;
        if (simParams.current.personalization) {
          ctx.setLineDash([5, 5]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Spawn particles
      if (Math.random() < 0.2) {
        const node = edgeNodes[Math.floor(Math.random() * edgeNodes.length)];
        // Determine if noisy
        const isNoisy = Math.random() < simParams.current.noiseLevel;
        // Speed multiplier (stragglers are slow)
        const speedMult = node.isStraggler ? 0.3 : 1.0;
        
        simParams.current.particles.push(new Particle(node, globalServer, isNoisy, speedMult));
      }

      // Update and draw particles
      simParams.current.particles = simParams.current.particles.filter(p => {
        const alive = p.update();
        if (alive) p.draw(ctx);
        return alive;
      });

      // Draw Global Server
      ctx.beginPath();
      ctx.arc(globalServer.x, globalServer.y, globalServer.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#1e293b";
      ctx.fill();
      ctx.strokeStyle = "rgba(91, 141, 239, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Pulse global server
      const pulse = Math.sin(time / 500) * 4;
      ctx.beginPath();
      ctx.arc(globalServer.x, globalServer.y, globalServer.radius + 4 + pulse, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(91, 141, 239, 0.3)";
      ctx.stroke();

      // Draw Edge Nodes
      edgeNodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.isStraggler ? "#f59e0b" : "#475569";
        ctx.fill();
        ctx.strokeStyle = node.isStraggler ? "rgba(245, 158, 11, 0.8)" : "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Update metrics smoothly based on params
      setMetrics(prev => {
        let targetAcc = 92.4;
        if (simParams.current.noiseLevel > 0.3) targetAcc -= (simParams.current.noiseLevel * 20);
        if (simParams.current.heterogeneity > 0.3) targetAcc -= 5;
        if (simParams.current.personalization) targetAcc += 4;
        
        return {
          accuracy: prev.accuracy + (targetAcc - prev.accuracy) * 0.05,
          rounds: prev.rounds + (simParams.current.particles.length > 0 ? 0.05 : 0),
          noise: prev.noise + (simParams.current.noiseLevel - prev.noise) * 0.1,
        };
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handlers for interactive controls
  const handleInjectNoise = () => {
    simParams.current.noiseLevel = Math.min(1.0, simParams.current.noiseLevel + 0.3);
    simParams.current.heterogeneity = 0.1;
    simParams.current.personalization = false;
    setActiveState("noisy");
    
    // Auto-recover after 4 seconds
    setTimeout(() => {
      simParams.current.noiseLevel = 0.05;
      if (simParams.current.heterogeneity < 0.2 && !simParams.current.personalization) {
        setActiveState("baseline");
      }
    }, 4000);
  };

  const handleSimulateStragglers = () => {
    simParams.current.heterogeneity = 0.8;
    simParams.current.noiseLevel = 0.05;
    simParams.current.personalization = false;
    setActiveState("heterogeneous");
  };

  const handlePersonalizeModels = () => {
    simParams.current.personalization = true;
    simParams.current.noiseLevel = 0.1;
    simParams.current.heterogeneity = 0.5; // Personalization handles heterogeneity
    setActiveState("personalization");
  };

  const handleReset = () => {
    simParams.current.noiseLevel = 0.05;
    simParams.current.heterogeneity = 0.1;
    simParams.current.personalization = false;
    setActiveState("baseline");
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
          Federated Intelligence Simulation
        </SectionHeading>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base font-light leading-relaxed">
          Real-time simulation of <span className="font-semibold text-foreground">Distributed Edge AI Networks</span> representing Dr. Rahul Mishra's core research. Interact with the system below to introduce noise or resource constraints, and observe how advanced FL algorithms rectify network stability.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Interactive Simulation Canvas */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="relative overflow-hidden rounded-sm border border-border/40 bg-surface/20 p-1 min-h-[400px] flex items-center justify-center">
            {/* Overlay Grid UI */}
            <div className="absolute top-4 left-5 select-none font-mono text-[9px] tracking-widest text-muted-foreground/50 uppercase pointer-events-none z-10">
              SIMULATION.CANVAS // EDGE_NODES: ACTIVE
            </div>
            
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 w-full h-full bg-[#0A0C10] rounded-sm cursor-crosshair"
              aria-label="Interactive Federated Learning particle simulation"
            >
              <p className="sr-only">
                Your browser does not support the canvas element. This section contains an interactive visualization of edge nodes sending data to a global server.
              </p>
            </canvas>
            
            {/* Controls Overlay */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 z-10">
              <button 
                onClick={handleInjectNoise}
                className="px-3 py-1.5 bg-background/80 hover:bg-red-500/20 border border-border/50 hover:border-red-500/50 rounded-sm font-mono text-[9px] uppercase tracking-wider text-foreground transition-all backdrop-blur-sm"
              >
                Inject Data Noise
              </button>
              <button 
                onClick={handleSimulateStragglers}
                className="px-3 py-1.5 bg-background/80 hover:bg-amber-500/20 border border-border/50 hover:border-amber-500/50 rounded-sm font-mono text-[9px] uppercase tracking-wider text-foreground transition-all backdrop-blur-sm"
              >
                Trigger Stragglers
              </button>
              <button 
                onClick={handlePersonalizeModels}
                className="px-3 py-1.5 bg-background/80 hover:bg-purple-500/20 border border-border/50 hover:border-purple-500/50 rounded-sm font-mono text-[9px] uppercase tracking-wider text-foreground transition-all backdrop-blur-sm"
              >
                Personalize Models
              </button>
              <button 
                onClick={handleReset}
                className="px-3 py-1.5 bg-background/80 hover:bg-accent/20 border border-border/50 hover:border-accent/50 rounded-sm font-mono text-[9px] uppercase tracking-wider text-foreground transition-all backdrop-blur-sm ml-auto"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="flex justify-between font-mono text-[9px] text-muted-foreground/50 px-1">
            <span>[GL_SERVER] // Aggregating model weights</span>
            <span>[EDGE_NODE] // Local data processing</span>
          </div>
        </div>

        {/* Right Column: Telemetry HUD Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6 border border-border/40 bg-surface/10 p-5 rounded-sm relative min-h-[420px]">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <h3 className="font-mono text-[10px] tracking-widest text-accent font-semibold uppercase">
                // Network State
              </h3>
              <span className={cn(
                "font-mono text-[9px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded-sm border",
                activeState === "baseline" && "text-accent border-accent/40 bg-accent/5",
                activeState === "noisy" && "text-destructive border-destructive/40 bg-destructive/5",
                activeState === "heterogeneous" && "text-amber-500 border-amber-500/40 bg-amber-500/5",
                activeState === "personalization" && "text-purple-400 border-purple-400/40 bg-purple-400/5"
              )}>
                {activeState === "baseline" ? "OPTIMAL" 
                 : activeState === "noisy" ? "NOISE DETECTED" 
                 : activeState === "heterogeneous" ? "HETEROGENEOUS" 
                 : "PERSONALIZED"}
              </span>
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs text-foreground/90 bg-background/40 p-3 rounded-sm border border-border/30">
              <div className="flex justify-between">
                <span className="text-muted-foreground/60 uppercase text-[9px]">Global Accuracy:</span>
                <span className={cn("font-bold", metrics.accuracy < 85 ? "text-destructive" : "text-accent")}>
                  {metrics.accuracy.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between border-t border-border/10 pt-2">
                <span className="text-muted-foreground/60 uppercase text-[9px]">Comm. Rounds:</span>
                <span className="font-bold">{Math.floor(metrics.rounds)}</span>
              </div>
              <div className="flex justify-between border-t border-border/10 pt-2">
                <span className="text-muted-foreground/60 uppercase text-[9px]">Data Corruption Rate:</span>
                <span className={cn("font-bold", metrics.noise > 0.15 ? "text-destructive" : "text-muted-foreground")}>
                  {(metrics.noise * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Dynamic Publication Card */}
            <div className="flex flex-col gap-2.5 border border-border/30 bg-surface/20 p-4 rounded-sm transition-all duration-300 min-h-[240px]">
              <span className="font-mono text-[9px] tracking-wider text-accent uppercase block mb-1">
                [ Proposed Research Solution ]
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
                  {displayPub.researchSummary || displayPub.abstract}
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
