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
    id: "student-placeholder",
    name: "Placeholder Student",
    role: "Ph.D. Candidate",
    thesis: "Research domain to be verified",
    type: "phd",
    status: "active",
  },
] as const;
