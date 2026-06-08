export type Student = {
  id: string;
  name: string;
  role: string;
  thesis: string;
  type: "phd" | "mtech";
  status: "active" | "alumni";
};

export const studentsData: readonly Student[] = [
  {
    id: "student-1",
    name: "S. K. Ajay",
    role: "Ph.D. Candidate",
    thesis: "Distributed Resource Management and Task Offloading in Blockchain-Enabled IoT",
    type: "phd",
    status: "active",
  },
  {
    id: "student-2",
    name: "S. Mohanty",
    role: "Ph.D. Scholar",
    thesis: "Deep Learning and Feature Selection Models for Edge Security Environments",
    type: "phd",
    status: "active",
  },
  {
    id: "student-3",
    name: "Priyanka Das",
    role: "M.Tech Alumna",
    thesis: "Incentive Mechanisms for Cache-Enabled Device-to-Device Networks",
    type: "mtech",
    status: "alumni",
  },
  {
    id: "student-4",
    name: "Rahul Iyer",
    role: "M.Tech Alumnus",
    thesis: "Pricing and Storage Allocation Strategies in RSU-Based Content Delivery Networks",
    type: "mtech",
    status: "alumni",
  },
] as const;
