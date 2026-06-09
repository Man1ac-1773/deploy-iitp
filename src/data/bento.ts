import type { BentoCardData } from "@/types/bento";

export const bentoCards: readonly BentoCardData[] = [
  {
    id: "research-areas",
    label: "Research Areas",
    title: "AI & Distributed Systems",
    description:
      "Investigating smart sensing, edge intelligence, and federated networks.",
    span: "feature-tall",
    items: [
      "Deep Learning",
      "Fog Computing",
      "Internet of Things (IoT)",
      "Wireless Sensors Network (WSN)",
      "Smart Sensing",
    ],
  },
  {
    id: "awards",
    label: "Awards & Patents",
    title: "Academic honors & intellectual property",
    description: "Selected distinctions and technology patents.",
    span: "sidebar-top",
    items: [
      "Patent: Racket Sports Activities Monitoring",
      "IEEE INFOCOM 2021 & 2022 Student Grants",
    ],
  },
  {
    id: "teaching",
    label: "Teaching",
    title: "IIT Patna courses",
    description: "Instruction in data science, algorithms, and drone processing.",
    span: "sidebar-bottom",
    items: [
      "Intro to Data Science (CS244)",
      "Algorithms (CS2101)",
      "Drone Data Processing (CS6109)",
      "Data Analysis & Visualization (CS2206)",
      "IT Workshop (CS2204)",
    ],
  },
  {
    id: "projects",
    label: "Projects",
    title: "Active investigations",
    description:
      "Developing federated learning architectures and optimizing drone networks.",
    span: "wide",
    items: [
      "Fed-NL — Noise suppression in Federated Learning",
      "UAV-Net — AIoT lifetime enhancement in Aerial Networks",
      "EdgeKD — Lightweight Neural Networks using Early Halting",
      "SmartMeter — Energy Efficient systems in LoRa Networks",
    ],
  },
] as const;
