"use client";

import { motion } from "framer-motion";
import type { BentoCardData } from "@/types/bento";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SectionLabel } from "@/components/shared/typography/section-label";

type BentoModalProps = {
  card: BentoCardData;
  onClose: () => void;
};

export function BentoModal({ card, onClose }: BentoModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12" style={{ position: 'fixed' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={onClose}
        className="absolute inset-0 bg-background/60 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-4xl max-h-[90dvh] overflow-y-auto bg-white/70 dark:bg-background/80 backdrop-blur-xl border border-white/80 dark:border-accent/40 rounded-sm shadow-2xl shadow-black/5 dark:shadow-accent/10 flex flex-col z-10 custom-scrollbar"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="sticky top-0 bg-white/40 dark:bg-background/90 backdrop-blur-md dark:backdrop-blur-sm border-b border-white/60 dark:border-white/5 p-6 sm:p-8 flex items-start justify-between z-20">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="flex flex-col gap-2"
          >
            <SectionLabel className="text-accent/80">EXPANDED DATA // {card.id}</SectionLabel>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-accent dark:drop-shadow-[0_0_15px_rgba(91,141,239,0.5)]">
              {card.modalTitle}
            </h2>
            {card.modalDescription && (
              <p className="text-muted-foreground mt-2 max-w-2xl">{card.modalDescription}</p>
            )}
          </motion.div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors group"
            aria-label="Close modal"
          >
            <svg className="size-6 transition-transform group-hover:rotate-90 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="p-6 sm:p-8 relative z-10 flex flex-col gap-8"
        >
          {card.modalTabs ? (
            <div className="flex flex-col gap-8">
              {card.modalTabs.map((tab) => (
                <div key={tab.id} className="flex flex-col gap-4">
                  <h3 className="text-lg font-mono text-accent-warm/90 flex items-center gap-3">
                    <span className="w-8 h-px bg-accent-warm/50" />
                    {tab.label}
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tab.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-white/40 dark:bg-white/5 p-4 rounded-sm border border-white/60 dark:border-white/5 hover:border-accent/30 transition-colors">
                        <span aria-hidden className="mt-[0.35em] size-1.5 shrink-0 rounded-sm bg-accent/70" />
                        <span className="text-sm sm:text-base text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : card.modalList ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {card.modalList.map((item, idx) => {
                const isObj = typeof item === "object";
                const text = isObj ? item.text : item;
                const href = isObj ? item.href : undefined;
                const tooltip = isObj ? item.tooltip : undefined;

                const inner = (
                  <div className="flex flex-col gap-3 w-full h-full justify-between">
                    <div className="flex items-start gap-3">
                      <span aria-hidden className="mt-[0.35em] size-1.5 shrink-0 rounded-sm bg-accent/70 transition-transform duration-300 group-hover:scale-125 group-hover:bg-accent" />
                      <span className="text-sm sm:text-base text-foreground/90 transition-colors duration-300 group-hover:text-foreground">
                        {text}
                      </span>
                    </div>
                    {tooltip && (
                      <div className="flex items-center justify-end mt-auto pt-2 overflow-hidden border-t border-transparent group-hover:border-accent/10 transition-colors duration-300">
                        <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-accent/80 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1">
                          {tooltip}
                          <svg className="size-3 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    )}
                  </div>
                );

                const baseClasses = "group relative flex items-stretch bg-white/40 dark:bg-white/5 p-4 rounded-sm border border-white/60 dark:border-white/5 hover:border-accent/50 hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer h-full";

                if (href) {
                  return (
                    <li key={idx} className="flex">
                      <a href={href} onClick={onClose} className={`w-full ${baseClasses}`}>
                        {inner}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={idx} className={baseClasses}>
                    {inner}
                  </li>
                );
              })}
            </ul>
          ) : null}

          {card.modalLinks && card.modalLinks.length > 0 && (
            <div className="mt-4 pt-8 border-t border-white/60 dark:border-white/5 flex flex-col gap-4">
              <h3 className="text-sm font-mono tracking-wider text-muted-foreground uppercase">External Portfolios</h3>
              <div className="flex flex-wrap gap-3">
                {card.modalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20 rounded-sm transition-all text-sm font-medium"
                  >
                    {link.label}
                    <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>,
    document.body
  );
}
