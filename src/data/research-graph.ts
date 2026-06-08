export type GraphNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  isCenter?: boolean;
};

export type GraphEdge = {
  from: string;
  to: string;
};

export type ResearchGraphData = {
  nodes: readonly GraphNode[];
  edges: readonly GraphEdge[];
};

export const researchGraphData: ResearchGraphData = {
  nodes: [
    { id: "center", label: "Dr. Satendra Kumar", x: 50, y: 45, size: 14, isCenter: true },
    { id: "wireless", label: "Wireless Networks", x: 18, y: 32, size: 10 },
    { id: "game", label: "Game Theory", x: 82, y: 32, size: 10 },
    { id: "economics", label: "Network Economics", x: 28, y: 70, size: 10 },
    { id: "mechanism", label: "Mechanism Design", x: 72, y: 70, size: 10 },
    { id: "ml", label: "Machine Learning", x: 50, y: 15, size: 10 },
  ],
  edges: [
    { from: "center", to: "wireless" },
    { from: "center", to: "game" },
    { from: "center", to: "economics" },
    { from: "center", to: "mechanism" },
    { from: "center", to: "ml" },
  ],
} as const;
