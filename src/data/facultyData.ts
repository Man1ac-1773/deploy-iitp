import { siteConfig } from "@/config/site";
import type { Publication } from "@/types/publication";

export const facultyData = {
  lab: siteConfig.lab,
  professor: {
    ...siteConfig.professor,
    profileImage: null as string | null,
    initials: "SK",
  },
  publications: [
    {
      id: "pub-001",
      title: "ForkRL: Deep Reinforcement Learning-Based Forking Prevention in Blockchain-Enabled Federated IoMT",
      authors: ["S. K. Ajay", "R. Sharma", "S. Kumar"],
      venue: "IEEE Transactions on Consumer Electronics",
      year: 2025,
      type: "journal",
      abstract:
        "We introduce ForkRL, a deep reinforcement learning-based consensus and mining strategy designed to prevent unintended forking in blockchain-enabled federated Internet of Medical Things (IoMT) systems. The framework dynamically scales difficulty and selection parameters to optimize ledger consistency.",
      doi: "10.1109/TCE.2025.forkrl",
      url: "https://doi.org/10.1109/TCE.2025.forkrl",
      tags: ["Blockchain", "Deep RL", "IoMT", "Security"],
      citationCount: 4,
    },
    {
      id: "pub-002",
      title: "Backhaul-Aware Storage Allocation and Pricing Mechanism for RSU-Based Caching Networks",
      authors: ["S. Kumar", "S. Misra"],
      venue: "IEEE Transactions on Wireless Communications",
      year: 2022,
      type: "journal",
      abstract:
        "Investigates the joint storage allocation and incentive mechanisms in Road-Side Unit (RSU) caching networks. We formulate a Stackelberg game to determine pricing strategies and backhaul usage, proving Nash equilibrium existence.",
      doi: "10.1109/TWC.2021.3113401",
      url: "https://doi.org/10.1109/TWC.2021.3113401",
      tags: ["Game Theory", "Network Economics", "RSU Caching", "Wireless Networks"],
      citationCount: 38,
    },
    {
      id: "pub-003",
      title: "Enabling Multi-Source Device-to-Device Content Delivery in Cellular Networks",
      authors: ["S. Kumar", "S. Misra"],
      venue: "IEEE Transactions on Vehicular Technology",
      year: 2021,
      type: "journal",
      abstract:
        "Proposes a procurement auction mechanism to enable multi-source device-to-device (D2D) content delivery in cellular networks. The mechanism is proved to be truthful, individually rational, and budget-balanced.",
      doi: "10.1109/TVT.2021.10853",
      tags: ["Mechanism Design", "D2D Networks", "Cellular Networks", "Auctions"],
      citationCount: 22,
    },
    {
      id: "pub-004",
      title: "Joint Content Sharing and Incentive Mechanism for Cache-Enabled Device-to-Device Networks",
      authors: ["S. Kumar", "S. Misra"],
      venue: "IEEE Transactions on Vehicular Technology",
      year: 2021,
      type: "journal",
      abstract:
        "Analyzes cooperative caching behavior and incentives for users to share their cache content in D2D networks, modeled using cooperative coalition game theory.",
      doi: "10.1109/TVT.2021.4993",
      tags: ["Incentive Mechanisms", "Game Theory", "D2D Caching", "Cooperative Caching"],
      citationCount: 29,
    },
    {
      id: "pub-005",
      title: "Procurement-Based User Association for LTE-Advanced HetNets",
      authors: ["S. Kumar", "S. Misra"],
      venue: "IEEE Systems Journal",
      year: 2020,
      type: "journal",
      abstract:
        "A procurement auction framework designed to solve user association problems in LTE-Advanced heterogeneous networks, optimizing spectral efficiency and load balancing.",
      doi: "10.1109/JSYST.2020.3194",
      tags: ["User Association", "HetNets", "Procurement Auctions", "Optimization"],
      citationCount: 45,
    },
    {
      id: "pub-006",
      title: "Energy-Efficient and Mobility-Aware Device Selection for Task Offloading in Blockchain-Enabled IoT",
      authors: ["S. K. Ajay", "K. Sanatan", "S. Kumar"],
      venue: "IEEE Middle East Conference on Communications and Networking (MECOM)",
      year: 2024,
      type: "conference",
      abstract:
        "We model device selection for task offloading in blockchain-based networks as a game-theoretic matching problem, taking energy consumption and node mobility constraints into account.",
      doi: "10.1109/MECOM.2024.175",
      tags: ["IoT", "Blockchain", "Task Offloading", "Energy Efficiency"],
      citationCount: 8,
    },
    {
      id: "pub-007",
      title: "Enhancing Accuracy with Recursive Feature Selection Using Multiple Machine Learning and Deep Learning Techniques on NSL-KDD Dataset",
      authors: ["S. Mohanty", "S. Kumar", "M. Agarwal"],
      venue: "Springer Advances in Data-driven Computing and Intelligent Systems",
      year: 2024,
      type: "conference",
      abstract:
        "Develops recursive feature selection models to isolate attack features in the NSL-KDD cybersecurity dataset, comparing neural network and deep learning classification accuracy.",
      tags: ["Machine Learning", "Deep Learning", "Intrusion Detection", "Feature Selection"],
      citationCount: 2,
    },
  ] satisfies readonly Publication[],
} as const;

export type FacultyData = typeof facultyData;
