export type PublicationType =
  | "journal"
  | "conference"
  | "workshop"
  | "preprint";

export type Publication = {
  id: string;
  title: string;
  authors: readonly string[];
  venue: string;
  year: number;
  type: PublicationType;
  abstract: string;
  gameSummary?: string;
  impact?: string;
  doi?: string;
  url?: string;
  tags: readonly string[];
  citationCount?: number;
};
