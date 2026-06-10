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
    year: 2024,
    title: "Assistant Professor at IIT Patna",
    description: "Joined the Department of Computer Science and Engineering at the Indian Institute of Technology (IIT) Patna.",
    type: "academic",
  },
  {
    id: "time-2",
    year: 2022,
    title: "Assistant Professor at DA-IICT",
    description: "Served as Assistant Professor at Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT) Gandhinagar from Dec 2022 to Feb 2024.",
    type: "academic",
  },
  {
    id: "time-3",
    year: 2022,
    title: "Research Associate at IISc Bangalore",
    description: "Worked as a Research Associate at the Indian Institute of Science (IISc), Bangalore (Sept 2022 to Dec 2022).",
    type: "academic",
  },
  {
    id: "time-4",
    year: 2021,
    title: "IEEE INFOCOM Student Travel Grant",
    description: "Received the student conference grant sponsored by the IEEE Communications Society (ComSoc) for INFOCOM 2021 (and subsequently in 2022).",
    type: "award",
  },
  {
    id: "time-5",
    year: 2020,
    title: "Ph.D. from IIT (BHU) Varanasi",
    description: "Completed Ph.D. in Computer Science and Engineering, focusing on sensor data analytics, deep learning, and Internet of Things.",
    type: "academic",
  },
  {
    id: "time-6",
    year: 2017,
    title: "M.Tech Gold Medalist (MMMUT)",
    description: "Received M.Tech degree in Computer Engineering with Gold Medal distinction from Madan Mohan Malaviya University of Technology, Gorakhpur.",
    type: "award",
  },
  {
    id: "time-7",
    year: 2015,
    title: "GATE Postgraduate Fellowship & B.Tech Honors",
    description: "Awarded GATE Fellowship for research (2015–2017). Completed B.Tech in CSE with First Class Honors from APJ Abdul Kalam Technical University.",
    type: "academic",
  },
] as const;
