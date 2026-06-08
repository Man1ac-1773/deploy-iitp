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
    name: "Satya Prakash",
    role: "Ph.D. Candidate",
    thesis: "3D Urban Reconstruction under Topological Constraints",
    type: "phd",
    status: "active",
  },
  {
    id: "student-2",
    name: "Priyanka Das",
    role: "Ph.D. Scholar",
    thesis: "Collaborative Interfaces for Field Sensor Alignment",
    type: "phd",
    status: "active",
  },
  {
    id: "student-3",
    name: "Rahul Iyer",
    role: "M.Tech Alumnus",
    thesis: "Volume Visualization of Multi-field Scalar Datasets",
    type: "mtech",
    status: "alumni",
  },
  {
    id: "student-4",
    name: "K. Bose",
    role: "M.Tech Alumnus",
    thesis: "OpenGeoLab Reproducibility Pipelines",
    type: "mtech",
    status: "alumni",
  },
] as const;
