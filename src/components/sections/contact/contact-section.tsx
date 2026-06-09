"use client";

import { useState, type FormEvent } from "react";
import { SectionHeading } from "@/components/shared/typography/section-heading";
import { SectionLabel } from "@/components/shared/typography/section-label";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type ContactSectionProps = {
  className?: string;
};

export function ContactSection({ className }: ContactSectionProps) {
  const { professor } = siteConfig;
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");
    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1200);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={cn("flex flex-col gap-8 sm:gap-10", className)}
    >
      <div className="flex flex-col gap-3 border-b border-border/40 pb-6">
        <div className="flex items-center justify-between">
          <SectionLabel>Inquiries</SectionLabel>
          <span className="font-mono text-xs tracking-wider text-accent/70 font-semibold">06 // TERMINAL</span>
        </div>
        <SectionHeading as="h2" id="contact-heading" className="uppercase font-bold">
          Get in touch
        </SectionHeading>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          For collaborations, M.Tech/Ph.D. advising requests, or media inquiries, please reach out via email or use the communication terminal below.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
        {/* Office Details */}
        <div className="flex flex-col gap-6 md:col-span-5">
          <div className="flex flex-col gap-4 border border-border/40 bg-surface/20 p-6 rounded-sm">
            <h3 className="font-mono text-[10px] tracking-widest text-accent/80 uppercase">
              // Lab Location & Office Hours
            </h3>
            
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Office</p>
                <p className="text-sm text-foreground">Block 3, Room 402, Dept. of CSE</p>
                <p className="text-sm text-muted-foreground">IIT Patna, Bihar, India</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Hours</p>
                <p className="text-sm text-foreground">Tuesday & Thursday: 14:00–16:00</p>
                <p className="text-sm text-muted-foreground">Or by appointment</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Direct Email</p>
                <a
                  href={`mailto:${professor.email}`}
                  className="text-sm text-accent hover:underline"
                >
                  {professor.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:col-span-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <label htmlFor="form-name" className="font-mono text-[9px] tracking-widest text-muted-foreground/60 uppercase mb-1">
                Name
              </label>
              <input
                id="form-name"
                type="text"
                required
                disabled={status === "sending" || status === "success"}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-surface/10 border border-border/40 focus:border-accent/80 focus:bg-surface/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm text-sm px-4 py-2.5 text-foreground transition-all duration-300 disabled:opacity-50"
                placeholder="Your name"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="form-email" className="font-mono text-[9px] tracking-widest text-muted-foreground/60 uppercase mb-1">
                Email
              </label>
              <input
                id="form-email"
                type="email"
                required
                disabled={status === "sending" || status === "success"}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-surface/10 border border-border/40 focus:border-accent/80 focus:bg-surface/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm text-sm px-4 py-2.5 text-foreground transition-all duration-300 disabled:opacity-50"
                placeholder="your.email@address.com"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="form-message" className="font-mono text-[9px] tracking-widest text-muted-foreground/60 uppercase mb-1">
              Message
            </label>
            <textarea
              id="form-message"
              required
              rows={4}
              disabled={status === "sending" || status === "success"}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-surface/10 border border-border/40 focus:border-accent/80 focus:bg-surface/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm text-sm px-4 py-2.5 text-foreground transition-all duration-300 resize-none disabled:opacity-50"
              placeholder="Your inquiry details..."
            />
          </div>

          <div className="flex items-center justify-between gap-4 mt-1">
            <button
              type="submit"
              disabled={status === "sending" || status === "success" || !formData.name || !formData.email || !formData.message}
              aria-busy={status === "sending"}
              className="px-6 py-2.5 bg-accent hover:bg-accent/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-medium text-sm rounded-sm transition-all duration-300 cursor-pointer disabled:cursor-not-allowed select-none"
            >
              {status === "sending" ? "Transmitting..." : status === "success" ? "Transmitted" : "Send Message"}
            </button>

            <span className="font-mono text-[9px] tracking-widest text-muted-foreground/40 uppercase">
              {status === "sending"
                ? "SYS.STATUS: TRANSMITTING"
                : status === "success"
                  ? "SYS.STATUS: OK.DELIVERED"
                  : "SYS.STATUS: ONLINE"}
            </span>
          </div>

          {status === "success" && (
            <p className="text-xs text-accent font-mono transition-all duration-300 animate-pulse mt-2" aria-live="polite">
              &gt; Message received. We will respond within 48 academic hours.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
