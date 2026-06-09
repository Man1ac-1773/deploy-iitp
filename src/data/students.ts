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
    name: "R. Kumar",
    role: "Ph.D. Candidate",
    thesis: "Federated Learning Approaches with Imperfect Labels in LoRa-Based Systems",
    type: "phd",
    status: "active",
  },
  {
    id: "student-2",
    name: "C. Singh",
    role: "Ph.D. Scholar",
    thesis: "Secure Industrial IoT Task Containerization with Deadline Constraints",
    type: "phd",
    status: "active",
  },
  {
    id: "student-3",
    name: "A. Soni",
    role: "M.Tech Alumna",
    thesis: "Federated Learning Approaches to Ensure Fairness in Selection of Participants",
    type: "mtech",
    status: "alumni",
  },
  {
    id: "student-4",
    name: "P. Kumari",
    role: "M.Tech Alumnus",
    thesis: "Energy Efficient Smart Metering System Using Edge Computing in LoRa Network",
    type: "mtech",
    status: "alumni",
  },
] as const;
