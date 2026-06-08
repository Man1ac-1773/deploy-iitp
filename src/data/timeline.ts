export type TimelineEvent = {
  id: string;
  year: number;
  title: string;
  description: string;
  type: "academic" | "award" | "publication" | "grant";
};

export const timelineEvents: readonly TimelineEvent[] = [
  {
    id: "time-1",
    year: 2025,
    title: "IEEE TCE Journal Publication",
    description: "Published ForkRL—deep reinforcement learning for fork prevention in blockchain IoMT—in IEEE Transactions on Consumer Electronics.",
    type: "publication",
  },
  {
    id: "time-2",
    year: 2024,
    title: "Task Offloading Research at IEEE MECOM",
    description: "Presented energy-efficient device selection models for task offloading at the IEEE MECOM conference, Abu Dhabi.",
    type: "publication",
  },
  {
    id: "time-3",
    year: 2022,
    title: "Assistant Professor at TIET Patiala & IEEE TWC",
    description: "Served as Assistant Professor in CSE at TIET Patiala. Published RSU storage allocation and pricing mechanisms in IEEE Transactions on Wireless Communications.",
    type: "academic",
  },
  {
    id: "time-4",
    year: 2021,
    title: "Completed Ph.D. from IIT Kharagpur",
    description: "Completed Ph.D. in Computer Science and Engineering. Dissertation: 'Resource Management in Heterogeneous Wireless Networks: An Economics Perspective', advised by Prof. Sudip Misra.",
    type: "academic",
  },
  {
    id: "time-5",
    year: 2014,
    title: "M.Tech Gold Medalist (NIT Raipur)",
    description: "Received M.Tech degree in Computer Technology with Gold Medal distinction, researching neural networks for intrusion detection systems.",
    type: "award",
  },
] as const;
