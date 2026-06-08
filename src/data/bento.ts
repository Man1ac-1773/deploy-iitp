import type { BentoCardData } from "@/types/bento";

export const bentoCards: readonly BentoCardData[] = [
  {
    id: "research-areas",
    label: "Research Areas",
    title: "Spatial systems & geometric intelligence",
    description:
      "Core inquiry across computational geometry, urban informatics, and human-centered spatial interfaces.",
    span: "feature-tall",
    items: [
      "Computational spatial modeling",
      "Geometric reasoning & visualization",
      "Urban systems & built environments",
      "Human–computer interaction",
    ],
  },
  {
    id: "awards",
    label: "Awards",
    title: "Recognition",
    description: "Selected honors across research and teaching.",
    span: "sidebar-top",
    items: [
      "Excellence in Research Award — 2024",
      "Best Paper — Spatial Computing Symposium",
      "Faculty Innovation Grant — IIT Patna",
    ],
  },
  {
    id: "teaching",
    label: "Teaching",
    title: "Courses & mentorship",
    description: "Graduate and undergraduate instruction in spatial computing.",
    span: "sidebar-bottom",
    items: [
      "Advanced Geometric Modeling",
      "Spatial Data Structures",
      "Research Methods in HCI",
      "M.Tech. & Ph.D. supervision",
    ],
  },
  {
    id: "projects",
    label: "Projects",
    title: "Active investigations",
    description:
      "Cross-disciplinary lab initiatives with industry and institutional partners.",
    span: "wide",
    items: [
      "UrbanMesh — city-scale spatial analytics platform",
      "TopoVis — topological data exploration toolkit",
      "FieldSense — mobile spatial sensing for field research",
      "OpenGeoLab — open infrastructure for geometric experiments",
    ],
  },
] as const;
