"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

type NetworkBackgroundProps = {
  className?: string;
};

export function NetworkBackground({ className }: NetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const mouse = { x: width / 2, y: height / 2, radius: 250 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Track repulsive DOM rects
    let repelRects: DOMRect[] = [];
    const updateRects = () => {
      const els = document.querySelectorAll('[data-repel-swarm="true"]');
      repelRects = Array.from(els).map((el) => el.getBoundingClientRect());
    };
    window.addEventListener("scroll", updateRects, { passive: true });
    setTimeout(updateRects, 100); // initial load
    
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      updateRects();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    class UAV {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      isStraggler: boolean;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.0;
        this.vy = (Math.random() - 0.5) * 1.0;
        this.size = Math.random() * 1.5 + 0.8;
        this.isStraggler = Math.random() > 0.9; // 10% chance to be a straggler
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Swarm Intelligence: Follow the cursor (Global Model)
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const speedFactor = this.isStraggler ? 0.01 : 0.03; 
          this.vx += forceDirectionX * force * speedFactor;
          this.vy += forceDirectionY * force * speedFactor;
        }

        // Friction
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Collision / Repulsion from DOM Elements
        for (const rect of repelRects) {
          const nearestX = Math.max(rect.left, Math.min(this.x, rect.right));
          const nearestY = Math.max(rect.top, Math.min(this.y, rect.bottom));
          
          const distX = this.x - nearestX;
          const distY = this.y - nearestY;
          const distance = Math.sqrt(distX * distX + distY * distY);
          
          const repelRadius = 60; // Field of repulsion
          
          if (distance < repelRadius) {
            if (distance === 0) {
              // Inside the box
              this.vx += (Math.random() - 0.5) * 8;
              this.vy += (Math.random() - 0.5) * 8;
            } else {
              const force = Math.pow((repelRadius - distance) / repelRadius, 2);
              this.vx += (distX / distance) * force * 1.5;
              this.vy += (distY / distance) * force * 1.5;
            }
          }
        }

        // Base wander (Exploration phase)
        this.vx += (Math.random() - 0.5) * 0.15;
        this.vy += (Math.random() - 0.5) * 0.15;

        // Max speed
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const maxSpeed = this.isStraggler ? 1.0 : 2.5;
        if (speed > maxSpeed) {
          this.vx = (this.vx / speed) * maxSpeed;
          this.vy = (this.vy / speed) * maxSpeed;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.isStraggler ? "rgba(245, 158, 11, 0.8)" : "rgba(91, 141, 239, 0.9)";
        ctx.fill();
        
        // Active glow
        ctx.shadowBlur = 6;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const uavs = Array.from({ length: 90 }, () => new UAV());
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Connections (Mesh Network)
      for (let i = 0; i < uavs.length; i++) {
        for (let j = i + 1; j < uavs.length; j++) {
          const dx = uavs[i].x - uavs[j].x;
          const dy = uavs[i].y - uavs[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(91, 141, 239, ${0.15 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(uavs[i].x, uavs[i].y);
            ctx.lineTo(uavs[j].x, uavs[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw Data Link to Mouse (Active Polling)
      for (let i = 0; i < uavs.length; i++) {
        const dx = uavs[i].x - mouse.x;
        const dy = uavs[i].y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius * 0.6) {
          ctx.beginPath();
          const opacity = 0.25 * (1 - distance / (mouse.radius * 0.6));
          ctx.strokeStyle = uavs[i].isStraggler 
            ? `rgba(245, 158, 11, ${opacity})` 
            : `rgba(229, 169, 59, ${opacity})`;
          ctx.lineWidth = uavs[i].isStraggler ? 0.5 : 1.2;
          
          if (uavs[i].isStraggler) {
             ctx.setLineDash([2, 4]); // Packet loss simulation
          } else {
             ctx.setLineDash([]);
          }

          ctx.moveTo(uavs[i].x, uavs[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      uavs.forEach((uav) => {
        uav.update();
        uav.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateRects);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-[#0A0C10] z-0",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_0%,#0A0C10_100%)] z-10" />
      <div className="absolute inset-0 opacity-30 mix-blend-screen blur-[120px] bg-[radial-gradient(circle_at_20%_30%,rgba(120,135,160,0.15)_0%,transparent_40%)]" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full opacity-70 mix-blend-screen"
      />
      {/* Telemetry overlay to anchor the simulation context */}
      <div className="absolute top-8 left-8 flex flex-col gap-1 z-20">
        <span className="font-mono text-[9px] tracking-widest text-accent/50 uppercase">SYS.STATE: UAV_SWARM.ACTIVE</span>
        <span className="font-mono text-[9px] tracking-widest text-muted-foreground/30 uppercase">FLOCKING_NODES: 90 // PROTOCOL: FED_AVG</span>
      </div>
    </div>
  );
}
