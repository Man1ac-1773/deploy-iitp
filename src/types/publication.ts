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
  researchSummary?: string;
  impact?: string;
  doi?: string;
  url?: string;
  tags: readonly string[];
  citationCount?: number;
  bibtex?: string;
  
  // Advanced Academic Metadata (from v2)
  volume?: string;
  issue?: string;
  pages?: string;
  status?: string; // e.g., "Accepted", "Under Review", "Core A*"
  correspondingAuthor?: boolean;
  location?: string; // for conferences
  dates?: string; // for conferences
  details?: string; // freeform detail string if needed
};
