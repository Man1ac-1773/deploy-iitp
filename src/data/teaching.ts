export type Course = {
  code: string;
  title: string;
  category: string;
  level: "Undergraduate" | "Postgraduate";
};

export const courses: readonly Course[] = [
  {
    code: "CS244",
    title: "Introduction to Data Science",
    category: "Data Science",
    level: "Undergraduate",
  },
  {
    code: "CS2101",
    title: "Algorithms",
    category: "Core CS",
    level: "Undergraduate",
  },
  {
    code: "CS6109",
    title: "Drone Data Processing",
    category: "IoT & Sensing",
    level: "Postgraduate",
  },
  {
    code: "CS2206",
    title: "Data Analysis and Visualization",
    category: "Data Science",
    level: "Undergraduate",
  },
  {
    code: "CS2204",
    title: "IT Workshop",
    category: "Lab / Workshop",
    level: "Undergraduate",
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
