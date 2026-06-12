export type BentoSpan =
  | "feature-tall"
  | "sidebar-top"
  | "sidebar-bottom"
  | "wide"
  | "half-left"
  | "half-right";

export type ModalTab = {
  id: string;
  label: string;
  items: readonly string[];
};

export type ModalListItem = {
  text: string;
  href?: string;
  tooltip?: string;
};

export type BentoCardData = {
  id: string;
  label: string;
  title: string;
  description: string;
  span: BentoSpan;
  items: readonly string[]; // Front face list
  // Replaced back face with modal content
  modalTitle: string;
  modalDescription?: string;
  modalTabs?: readonly ModalTab[]; // If tabbed data
  modalList?: readonly (string | ModalListItem)[]; // If simple list data
  modalLinks?: readonly { label: string; url: string }[]; // External links for hubs
};
