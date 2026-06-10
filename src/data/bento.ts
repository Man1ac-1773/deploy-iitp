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
    modalTitle: "Core Philosophies & Research Areas",
    modalDescription: "Driving edge intelligence toward sustainable and decentralized AI systems.",
    modalList: [
      "Deep Learning",
      "Fog Computing",
      "Internet of Things (IoT)",
      "Wireless Sensors Network (WSN)",
      "Smart Sensing",
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
      "IEEE INFOCOM Student Grants",
      "M.Tech Gold Medalist",
      "GATE Fellowship",
    ],
    modalTitle: "Distinctions & Fellowships",
    modalDescription: "Recognitions and intellectual property achievements.",
    modalList: [
      "IEEE INFOCOM 2021 Student Grant",
      "IEEE INFOCOM 2022 Student Grant",
      "M.Tech Gold Medalist (MMMUT) - 2017",
      "GATE Postgraduate Fellowship - 2015",
      "Patent: Racket Sports Activities Monitoring (202411014828)",
    ],
  },
  {
    id: "teaching",
    label: "Teaching",
    title: "Academic Instruction",
    description: "Extensive teaching across multiple premier institutions.",
    span: "sidebar-bottom",
    items: [
      "Data Science",
      "Algorithms",
      "Drone Data Processing",
    ],
    modalTitle: "Academic Curriculum",
    modalDescription: "Courses taught at IIT Patna and DA-IICT.",
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
      "Central access to all specialized academic portfolios, books, and service.",
    span: "wide",
    items: [
      "AICTE Textbook Co-Author",
      "IEEE Member",
      "Specialized External Portfolios",
    ],
    modalTitle: "Academic Portfolios",
    modalDescription: "Explore specialized Google sites and major external contributions.",
    modalList: [
      "AICTE Textbook on Design and Analysis of Algorithm",
      "IEEE Membership"
    ],
    modalLinks: [
      { label: "Research Portfolio", url: "https://sites.google.com/view/rahulmishracse/research" },
      { label: "Teaching Portfolio", url: "https://sites.google.com/view/rahulmishracse/teaching" },
      { label: "Projects Portfolio", url: "https://sites.google.com/view/rahulmishracse/projects" },
      { label: "Invited Speaker", url: "https://sites.google.com/view/rahulmishracse/invited-speaker" }
    ]
  },
] as const;
