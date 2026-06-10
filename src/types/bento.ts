export type BentoSpan =
  | "feature-tall"
  | "sidebar-top"
  | "sidebar-bottom"
  | "wide";

export type BentoCardData = {
  id: string;
  label: string;
  title: string;
  description: string;
  span: BentoSpan;
  items: readonly string[];
  backTitle?: string;
  backDescription?: string;
  backItems?: readonly string[];
};
