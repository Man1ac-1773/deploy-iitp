export type ResponsibilityItem = {
  title: string;
  organization: string;
  description: string;
  category?: string;
};

export const responsibilities: readonly ResponsibilityItem[] = [
  {
    title: "Vice Chairman",
    organization: "Joint Entrance Examination (JEE)",
    description: "Served as the Vice Chairman for the Joint Entrance Examination (JEE), overseeing the administration and execution of one of the world's most competitive engineering entrance exams.",
    category: "Academic Administration",
  },
  {
    title: "Associate Warden",
    organization: "C.V. Raman Hostel, IIT Patna",
    description: "Managed student welfare, discipline, and administrative duties for the residents of C.V. Raman Hostel.",
    category: "Student Welfare",
  },
  {
    title: "Technical Support & Co-Creator",
    organization: "Bartanwali App (Social Responsibility)",
    description: "A community-driven initiative developed in collaboration with the residents of Kamla Nehru Nagar, Koshish Charitable Trust, IIT Patna, and Johns Hopkins University to empower local communities through technical solutions.",
    category: "Social Responsibility",
  },
];
