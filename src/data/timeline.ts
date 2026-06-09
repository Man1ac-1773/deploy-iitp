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
] as const;
