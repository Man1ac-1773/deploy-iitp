"use client";

import { createContext, useContext, useState } from "react";
import { ActivityDetailSheet, type ActivityItem } from "./activity-detail-sheet";

const ServiceModalContext = createContext<{
  openModal: (item: ActivityItem) => void;
} | null>(null);

export function ServiceModalProvider({ children }: { children: React.ReactNode }) {
  const [selectedItem, setSelectedItem] = useState<ActivityItem | null>(null);

  return (
    <ServiceModalContext.Provider value={{ openModal: setSelectedItem }}>
      {children}
      <ActivityDetailSheet
        item={selectedItem}
        open={selectedItem !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedItem(null);
        }}
      />
    </ServiceModalContext.Provider>
  );
}

export function useServiceModal() {
  const context = useContext(ServiceModalContext);
  if (!context) {
    throw new Error("useServiceModal must be used within a ServiceModalProvider");
  }
  return context;
}

export function ServiceModalTrigger({
  item,
  children,
  className,
}: {
  item: ActivityItem;
  children: React.ReactNode;
  className?: string;
}) {
  const { openModal } = useServiceModal();

  return (
    <button onClick={() => openModal(item)} className={className}>
      {children}
    </button>
  );
}
