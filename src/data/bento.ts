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
    backTitle: "Core Philosophies",
    backDescription: "Driving edge intelligence toward sustainable and decentralized AI systems.",
    backItems: [
      "Federated Learning optimization",
      "Noisy label rectification in datasets",
      "AIoT lifetime enhancement",
    ],
  },
  {
    id: "awards",
    label: "Awards & Honors",
    title: "Academic Distinctions",
    description: "Selected honors from the global academic community.",
    span: "sidebar-top",
    items: [
      "IEEE INFOCOM 2021 Student Grant",
      "IEEE INFOCOM 2022 Student Grant",
    ],
    backTitle: "Patents & IP",
    backDescription: "Registered intellectual property and inventions.",
    backItems: [
      "Racket Sports Activities Monitoring (202411014828)",
      "Grip Embedded Sensors & Smartphone integration",
    ],
  },
  {
    id: "teaching",
    label: "Teaching",
    title: "IIT Patna Courses",
    description: "Instruction in data science, algorithms, and drone processing.",
    span: "sidebar-bottom",
    items: [
      "Intro to Data Science (CS244)",
      "Algorithms (CS2101)",
      "Drone Data Processing (CS6109)",
    ],
    backTitle: "Additional Curriculum",
    backDescription: "Further workshops and teaching responsibilities.",
    backItems: [
      "Data Analysis & Visualization (CS2206)",
      "IT Workshop (CS2204)",
      "AICTE Textbook on Design & Analysis of Algorithm",
    ],
  },
  {
    id: "projects",
    label: "Funded Projects",
    title: "Active Grants & Investigations",
    description:
      "Leading AI/ML deployment in industrial sectors and drone networks.",
    span: "wide",
    items: [
      "IoT & AI Systems for Reliance Sasan Power Plant",
      "Smart-AgriBots for Agricultural Monitoring",
      "UAV-Net: Lifetime Enhancement in Aerial Networks",
    ],
    backTitle: "Open Datasets",
    backDescription: "Publicly available research data published on IEEE Dataport.",
    backItems: [
      "Mobile Sink for Precision Agriculture",
      "IMU Sensors for Handwritten Digits",
      "Signal Quality Measurement (SQM)",
      "IMU for Handwritten English Alphabets",
    ],
  },
] as const;
