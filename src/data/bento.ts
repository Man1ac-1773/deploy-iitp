import type { BentoCardData } from "@/types/bento";

export const bentoCards: readonly BentoCardData[] = [
  {
    id: "research-areas",
    label: "Research Areas",
    title: "Resource optimization & network economics",
    description:
      "Investigating distributed systems, storage allocation, and incentive markets using algorithmic game theory and mechanism design.",
    span: "feature-tall",
    items: [
      "Wireless Caching Economics",
      "Algorithmic Game Theory",
      "Mechanism Design & Auctions",
      "Federated Deep Learning & IoT",
    ],
  },
  {
    id: "awards",
    label: "Awards",
    title: "Academic honors",
    description: "Selected distinctions across coursework and research.",
    span: "sidebar-top",
    items: [
      "M.Tech Gold Medalist — NIT Raipur",
      "B.Tech First Class Honors — AKTU",
      "Ph.D. Research Scholar — IIT Kharagpur",
    ],
  },
  {
    id: "teaching",
    label: "Teaching",
    title: "IIT Patna courses",
    description: "Instruction in systems, database architecture, and game theory.",
    span: "sidebar-bottom",
    items: [
      "Game Theory (CS6202)",
      "Operating Systems & Lab (CS3101)",
      "Database and Warehousing (CS2202)",
      "Data Structures and Lab (CS1201)",
    ],
  },
  {
    id: "projects",
    label: "Projects",
    title: "Active investigations",
    description:
      "Developing cryptographic protocols, caching markets, and security tools for IoT networks.",
    span: "wide",
    items: [
      "ForkRL — Deep RL fork prevention in blockchain IoMT",
      "RSUCache — Backhaul-aware RSU storage pricing models",
      "D2DShare — Procurement auction content delivery in LTE HetNets",
      "SecureIoMT — Energy-efficient task offloading configurations",
    ],
  },
] as const;
