"use client";

import { createContext, useContext, useState } from "react";
import { PublicationDetailSheet } from "./publication-detail-sheet";
import type { Publication } from "@/types/publication";

const PublicationModalContext = createContext<{
  openModal: (publication: Publication) => void;
} | null>(null);

export function PublicationModalProvider({ children }: { children: React.ReactNode }) {
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

  return (
    <PublicationModalContext.Provider value={{ openModal: setSelectedPublication }}>
      {children}
      <PublicationDetailSheet
        publication={selectedPublication}
        open={selectedPublication !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedPublication(null);
        }}
      />
    </PublicationModalContext.Provider>
  );
}

export function usePublicationModal() {
  const context = useContext(PublicationModalContext);
  if (!context) {
    throw new Error("usePublicationModal must be used within a PublicationModalProvider");
  }
  return context;
}

export function PublicationModalTrigger({
  publication,
  children,
  className,
}: {
  publication: Publication;
  children: React.ReactNode;
  className?: string;
}) {
  const { openModal } = usePublicationModal();

  return (
    <button onClick={() => openModal(publication)} className={className}>
      {children}
    </button>
  );
}
