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
    title: "ACM TSC Publication",
    description: "Published topology-aware urban mesh reconstruction framework in ACM Transactions on Spatial Computing.",
    type: "publication",
  },
  {
    id: "time-2",
    year: 2024,
    title: "Excellence in Research Award",
    description: "Honored with the faculty Excellence in Research Award at IIT Patna for contributions to geometric informatics.",
    type: "award",
  },
  {
    id: "time-3",
    year: 2023,
    title: "OpenGeoLab Infrastructure Launch",
    description: "Released open-source web platforms for geometric experiments reproducibility at ACM SIGSPATIAL.",
    type: "grant",
  },
  {
    id: "time-4",
    year: 2022,
    title: "Joined CSE Faculty at IIT Patna",
    description: "Appointed Professor in the Department of Computer Science and Engineering to establish the Spatial Lab.",
    type: "academic",
  },
  {
    id: "time-5",
    year: 2021,
    title: "Completed Ph.D. dissertation",
    description: "Finished doctorate in computer science, focusing on Morse-Smale graphs and multi-field visualization systems.",
    type: "academic",
  },
] as const;
