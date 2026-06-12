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
        href: "#publications", // Using native anchor instead of complex URL passing
        tooltip: "Explore Interactive Simulation"
      },
      {
        text: "Developing Lightweight Deep Neural Networks optimized for IoT.",
        href: "#publications",
        tooltip: "View Related Publications"
      },
      {
        text: "Enhancing lifetime and efficiency of UAV-Enabled Aerial Networks.",
        href: "#publications",
        tooltip: "View Drone Trajectory Paper"
      },
      {
        text: "Designing Task Offloading systems in Fog Computing.",
        href: "#publications",
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
      "Prestigious GATE Postgraduate Fellowships for M.Tech & PhD (2015, 2017).",
      "Best Paper Presentation Award at Research Scholar Day (MMMUT).",
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
    span: "half-left",
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
  {
    id: "datasets",
    label: "Open Data",
    title: "IEEE Dataport Datasets",
    description: "Providing high-value, validated datasets to accelerate global research.",
    span: "half-right",
    items: [
      "Mobile Sink Sensor Data",
      "IMU Handwritten Digits",
      "Signal Quality Measurement",
    ],
    modalTitle: "Open Science & Datasets",
    modalDescription: "My research group actively publishes our validated datasets to IEEE Dataport, providing the global research community with ground-truth data for IoT, smart sensing, and ML applications.",
    modalList: [
      {
        text: "Sensor Data of Mobile Sink for Precision Agriculture.",
        href: "http://dx.doi.org/10.21227/ympr-t542",
        tooltip: "View on IEEE Dataport"
      },
      {
        text: "A Dataset of Inertial Measurement Units for Handwritten English Alphabets.",
        href: "https://dx.doi.org/10.21227/av6q-jj17",
        tooltip: "View on IEEE Dataport"
      },
      {
        text: "Signal Quality Measurement (SQM) dataset.",
        href: "https://dx.doi.org/10.21227/aysz-nq69",
        tooltip: "View on IEEE Dataport"
      },
      {
        text: "Accelerometer, Gyroscope, and Magnetometer Sensors based Data for Recognizing Handwritten Digits.",
        href: "http://dx.doi.org/10.21227/52d9-8y30",
        tooltip: "View on IEEE Dataport"
      }
    ]
  }
] as const;
