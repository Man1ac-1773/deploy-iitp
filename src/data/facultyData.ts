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
      title: "Topological Priors for Urban Mesh Reconstruction at City Scale",
      authors: [
        "Satendra Kumar",
        "A. Mehta",
        "R. Iyer",
        "L. Chen",
      ],
      venue: "ACM Transactions on Spatial Computing",
      year: 2025,
      type: "journal",
      abstract:
        "We introduce a topology-aware reconstruction framework that preserves adjacency relations in large urban meshes. The method combines discrete Morse theory with interactive correction tools, reducing structural errors by 34% compared to baseline Delaunay pipelines.",
      doi: "10.1145/placeholder.2025.001",
      url: "https://doi.org/10.1145/placeholder.2025.001",
      tags: ["Urban computing", "Geometry", "Reconstruction"],
      citationCount: 12,
    },
    {
      id: "pub-002",
      title: "FieldSense: Mobile Spatial Sensing for Geometric Field Experiments",
      authors: ["Satendra Kumar", "P. Das", "M. Okonkwo"],
      venue: "IEEE VIS — Proceedings",
      year: 2024,
      type: "conference",
      abstract:
        "FieldSense enables researchers to capture, align, and annotate spatial samples in the field using commodity mobile hardware. A controlled study with 18 participants shows improved annotation consistency for irregular terrain datasets.",
      doi: "10.1109/placeholder.2024.002",
      url: "https://ieeevis.org/year/2024/paper-placeholder",
      tags: ["HCI", "Mobile sensing", "Visualization"],
      citationCount: 28,
    },
    {
      id: "pub-003",
      title: "Sparse Geometric Embeddings for Scientific Volume Exploration",
      authors: ["R. Iyer", "Satendra Kumar", "H. Park"],
      venue: "Computer Graphics Forum",
      year: 2024,
      type: "journal",
      abstract:
        "This paper presents sparse embeddings that accelerate exploratory analysis of large volumetric simulations while retaining salient topological features. The approach generalizes to multiple scalar fields without per-dataset tuning.",
      doi: "10.1111/cgf.placeholder.003",
      tags: ["Visualization", "Volume rendering", "Embeddings"],
      citationCount: 19,
    },
    {
      id: "pub-004",
      title: "OpenGeoLab: Infrastructure for Reproducible Geometric Experiments",
      authors: ["Satendra Kumar", "L. Chen", "A. Mehta", "K. Bose"],
      venue: "ACM SIGSPATIAL — Demo Track",
      year: 2023,
      type: "conference",
      abstract:
        "OpenGeoLab is an open infrastructure for sharing geometric datasets, experiment configurations, and evaluation notebooks. The demo highlights interoperability with existing GIS pipelines and notebook-based reproducibility workflows.",
      url: "https://sigspatial.org/2023/demo-placeholder",
      tags: ["Infrastructure", "Reproducibility", "Open science"],
      citationCount: 7,
    },
    {
      id: "pub-005",
      title: "Interactive Correction of Morse-Smale Graphs in 3D Scalar Fields",
      authors: ["Satendra Kumar", "H. Park"],
      venue: "EuroVis — Short Papers",
      year: 2023,
      type: "conference",
      abstract:
        "We describe interaction techniques for correcting Morse-Smale graphs when automatic extraction fails near degenerate critical points. Expert users completed correction tasks 2.1× faster than with manual node editing alone.",
      doi: "10.1111/cgf.placeholder.005",
      tags: ["Topology", "Interaction", "Scalar fields"],
      citationCount: 15,
    },
    {
      id: "pub-006",
      title: "Pedagogical Patterns for Spatial Data Structures",
      authors: ["Satendra Kumar"],
      venue: "IIT Patna Faculty Pedagogy Series",
      year: 2022,
      type: "workshop",
      abstract:
        "A workshop-oriented curriculum mapping spatial data structures to progressive geometric intuition. Includes lab modules on quadtrees, R-trees, and navigation meshes with assessment rubrics used across three graduate cohorts.",
      tags: ["Teaching", "Curriculum", "Spatial data structures"],
    },
    {
      id: "pub-007",
      title: "Toward Continuous Urban Morphology Descriptors",
      authors: ["A. Mehta", "Satendra Kumar", "P. Das"],
      venue: "arXiv",
      year: 2025,
      type: "preprint",
      abstract:
        "We propose continuous morphology descriptors that unify footprint, elevation, and street-network constraints for comparative urban analysis. Preliminary results on four Indian cities suggest improved cluster separation for mixed-use districts.",
      url: "https://arxiv.org/abs/placeholder.2501.007",
      tags: ["Urban morphology", "Preprint", "Spatial analysis"],
    },
  ] satisfies readonly Publication[],
} as const;

export type FacultyData = typeof facultyData;
