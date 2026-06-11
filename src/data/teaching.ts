export type Course = {
  code?: string;
  title: string;
  category: string;
  level: "Undergraduate" | "Postgraduate";
  timeline: string;
  institution: string;
};

export const courses: readonly Course[] = [
  {
    code: "CS2204",
    title: "IT Workshop",
    category: "Lab / Workshop",
    level: "Undergraduate",
    timeline: "Jan 2025 to May 2025",
    institution: "IIT Patna",
  },
  {
    code: "CS2206",
    title: "Data Analytics and Visualization",
    category: "Data Science",
    level: "Undergraduate",
    timeline: "Jan 2025 to May 2025",
    institution: "IIT Patna",
  },
  {
    code: "CS6109",
    title: "Drone Data Processing",
    category: "IoT & Sensing",
    level: "Postgraduate",
    timeline: "July 2024 to December 2024",
    institution: "IIT Patna",
  },
  {
    code: "CS2101",
    title: "Algorithms",
    category: "Core CS",
    level: "Undergraduate",
    timeline: "July 2024 to December 2024",
    institution: "IIT Patna",
  },
  {
    code: "CS244",
    title: "Introduction to Data Science",
    category: "Data Science",
    level: "Undergraduate",
    timeline: "March 2024 to May 2024",
    institution: "IIT Patna",
  },
  {
    title: "Introduction to Programming",
    category: "Core CS",
    level: "Undergraduate",
    timeline: "July 2023 to December 2023",
    institution: "DA-IICT Gandhinagar",
  },
  {
    title: "Algorithms",
    category: "Core CS",
    level: "Undergraduate",
    timeline: "July 2023 to December 2023",
    institution: "DA-IICT Gandhinagar",
  },
  {
    title: "Data Structures and Algorithms",
    category: "Core CS",
    level: "Undergraduate",
    timeline: "March 2023 to July 2023, Jan 2024 to Feb 2024",
    institution: "DA-IICT Gandhinagar",
  },
  {
    title: "Cyber-Physical System & Internet of Things",
    category: "IoT & Sensing",
    level: "Undergraduate",
    timeline: "Jan 2023 to May 2023",
    institution: "DA-IICT Gandhinagar",
  },
];

export type TeachingMethod = {
  label: string;
  description: string;
  courseCodes: string[];
};

export const teachingMethods: readonly TeachingMethod[] = [
  {
    label: "Theory & problem-solving",
    description:
      "Algorithm design and analysis taught through structured reasoning and proofs.",
    courseCodes: ["CS2101"],
  },
  {
    label: "Applied, data-driven",
    description:
      "Data science and visualization built on real datasets and analysis workflows.",
    courseCodes: ["CS244", "CS2206"],
  },
  {
    label: "Project & sensing-based",
    description:
      "Drone data processing taught through applied, sensor-driven projects.",
    courseCodes: ["CS6109"],
  },
  {
    label: "Hands-on lab",
    description:
      "IT workshop centred on practical tooling and engineering fundamentals.",
    courseCodes: ["CS2204"],
  },
];
