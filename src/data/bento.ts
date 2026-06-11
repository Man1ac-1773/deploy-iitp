import type { BentoCardData } from "@/types/bento";

export const bentoCards: readonly BentoCardData[] = [
  {
    id: "research-areas",
    label: "Research Areas",
    title: "AI & Distributed Systems",
    description:
      "Engineering decentralized edge intelligence and noise-resilient algorithms.",
    span: "feature-tall",
    items: [
      "Lightweight Deep Neural Networks",
      "Fog & Edge Intelligence",
      "Noise-Resilient Federated Learning",
      "IoT Lifetime Enhancement",
    ],
    modalTitle: "Core Philosophies & Research Innovation",
    modalDescription: "I leverage deep learning and IoT to solve real, deployment-scale problems. My current focus is pushing the boundaries of Federated Learning by suppressing noisy labels in decentralized edge environments without compromising data privacy.",
    modalList: [
      {
        text: "Pioneering Noise-Resilient Federated Learning architectures.",
        href: "#graph",
        tooltip: "Explore Interactive Simulation"
      },
      {
        text: "Developing Lightweight Deep Neural Networks optimized for IoT.",
        href: "#featured-publications",
        tooltip: "View Related Publications"
      },
      {
        text: "Enhancing lifetime and efficiency of UAV-Enabled Aerial Networks.",
        href: "#featured-publications",
        tooltip: "View Drone Trajectory Paper"
      },
      {
        text: "Designing Task Offloading systems in Fog Computing.",
        href: "#featured-publications",
        tooltip: "View Fog Computing Research"
      },
    ],
  },
  {
    id: "awards",
    label: "Awards & Honors",
    title: "Academic Distinctions",
    description: "Highly competitive global recognitions and pioneering intellectual property.",
    span: "sidebar-top",
    items: [
      "IEEE INFOCOM Grants",
      "M.Tech Gold Medalist",
      "GATE Fellowships",
    ],
    modalTitle: "Distinctions & Intellectual Property",
    modalDescription: "Recognized by elite global institutions and granted highly competitive fellowships for pioneering research contributions.",
    modalList: [
      "Multiple IEEE INFOCOM Student Grants (2021, 2022).",
      "M.Tech Gold Medalist for Academic Excellence (2017).",
      "Prestigious GATE Postgraduate Fellowships (2015, 2017).",
      {
        text: "Patented innovation in Racket Sports Activities Monitoring using Embedded Sensors (202411014828).",
        href: "#activities",
        tooltip: "View Intellectual Property"
      },
    ],
  },
  {
    id: "teaching",
    label: "Teaching",
    title: "Academic Instruction",
    description: "Mentoring the next generation of engineers across premier Indian institutions.",
    span: "sidebar-bottom",
    items: [
      "Data Science & Algorithms",
      "Drone Data Processing",
      "Cyber-Physical Systems",
    ],
    modalTitle: "Pedagogy & Curriculum",
    modalDescription: "Fostering rigorous analytical thinking and hands-on engineering skills at IIT Patna and DA-IICT.",
    modalTabs: [
      {
        id: "iitp",
        label: "IIT Patna",
        items: [
          "Intro to Data Science (CS244)",
          "Algorithms (CS2101)",
          "Drone Data Processing (CS6109)",
          "Data Analysis & Visualization (CS2206)",
          "IT Workshop (CS2204)"
        ]
      },
      {
        id: "daiict",
        label: "DA-IICT",
        items: [
          "Cyber-Physical System & Internet of Things",
          "Data Structures and Algorithms",
          "Algorithms",
          "Introduction to Programming"
        ]
      }
    ]
  },
  {
    id: "academic-service",
    label: "Academic Hub",
    title: "Service & External Profiles",
    description:
      "Active contributor to global technical discourse, specialized portfolios, and textbook authorship.",
    span: "wide",
    items: [
      "AICTE Textbook Co-Author",
      "Active IEEE Contributor",
      "Specialized External Portfolios",
    ],
    modalTitle: "Global Academic Footprint",
    modalDescription: "Beyond individual research, I am committed to advancing the global engineering community through textbook authorship and specialized academic discourse.",
    modalList: [
      "Co-Author: AICTE Textbook on Design and Analysis of Algorithms.",
      "Active IEEE Member contributing to international technical standards and peer review.",
    ],
  },
] as const;
