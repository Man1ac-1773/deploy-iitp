export type Conference = {
  id: string;
  title: string;
  venue: string;
  year: number;
  type: string;
  details: string;
};

export const conferences: readonly Conference[] = [
  {
    id: "conf-1",
    title: "i-Care: A Multi-Modal Data Integration Approach for Real-time Surveillance and Voice Assistance",
    venue: "ACM BuildSys",
    year: 2024,
    type: "Regular Paper",
    details: "11th ACM International Conference on Systems for Energy-Efficient Buildings, Cities, and Transportation. Hangzhou, China.",
  },
  {
    id: "conf-2",
    title: "On Demand Reliability in the Internet of Things Enabled Sensors Networks",
    venue: "IWCMC",
    year: 2024,
    type: "Regular Paper",
    details: "20th International Wireless Communications & Mobile Computing Conference. Ayia Napa, Cyprus.",
  },
  {
    id: "conf-3",
    title: "A Federated Learning Approach to Minimize Communication Rounds Using Noise Rectification",
    venue: "IEEE WCNC",
    year: 2024,
    type: "Accepted",
    details: "IEEE Wireless Communications and Networking Conference. Dubai, UAE.",
  },
  {
    id: "conf-4",
    title: "A Game Theory-based Transportation System using Fog Computing for Passenger Assistance",
    venue: "IEEE WoWMoM",
    year: 2021,
    type: "Regular Paper",
    details: "Core A conference.",
  },
  {
    id: "conf-5",
    title: "Minimizing Intra-Interference in LoRaWAN for Seamless Connectivity in Ubiquitous Networking",
    venue: "COMSNETS",
    year: 2024,
    type: "Accepted",
    details: "MINDS Workshop.",
  },
  {
    id: "conf-6",
    title: "Your Gesture Can Prevent Oops Moments in Online Meetings",
    venue: "EWSN",
    year: 2024,
    type: "Poster",
    details: "International Conference on Embedded Wireless Systems and Networks. Abu Dhabi, UAE.",
  },
  {
    id: "conf-7",
    title: "Noise-Resilient Federated Learning: Suppressing Noisy Labels in the Local Datasets of Participants",
    venue: "IEEE INFOCOM",
    year: 2022,
    type: "Poster",
    details: "Core A* conference.",
  },
  {
    id: "conf-8",
    title: "An Energy-Efficient Smart Space System using LoRa Network with Deadline and Security Constraints",
    venue: "ACM MSWIM",
    year: 2021,
    type: "Regular Paper",
    details: "Core A conference.",
  },
  {
    id: "conf-9",
    title: "A Network Resource Aware Federated Learning Approach using Knowledge Distillation",
    venue: "IEEE INFOCOM",
    year: 2021,
    type: "Poster",
    details: "Core A* conference.",
  },
  {
    id: "conf-10",
    title: "Teacher, Trainee, and Student based Knowledge Distillation Technique for Monitoring Indoor Activities",
    venue: "ACM SenSys",
    year: 2020,
    type: "Poster",
    details: "Core A* conference.",
  },
  {
    id: "conf-11",
    title: "Unseen Locomotion Mode Detection Problems using Inertial Sensors",
    venue: "IEEE COMSNETS",
    year: 2021,
    type: "PhD-forum",
    details: "PhD-forum presentation.",
  },
  {
    id: "conf-12",
    title: "Game theory based early classification of rivers using time series data",
    venue: "IEEE WF-IoT",
    year: 2019,
    type: "Conference Paper",
    details: "Proceedings of IEEE WF-IoT.",
  },
  {
    id: "conf-13",
    title: "A real-time precision agriculture monitoring system using mobile sink in WSNs",
    venue: "IEEE ANTS",
    year: 2018,
    type: "Conference Paper",
    details: "Proceedings of IEEE ANTS.",
  },
  {
    id: "conf-14",
    title: "Gateway Discovery in MANET using Machine Learning and Soft Computing: A Survey",
    venue: "ICIIECS",
    year: 2017,
    type: "Conference Paper",
    details: "International Conference on Innovations in Information Embedded and Communication Systems.",
  },
  {
    id: "conf-15",
    title: "Fault-Tolerant Energy Efficient Power Management System for Smart Room",
    venue: "ICACSE",
    year: 2018,
    type: "Conference Paper",
    details: "International Conference on Advanced Computing and Software Engineering.",
  },
  {
    id: "conf-16",
    title: "When You Come In, You Sit, Stand, or Walk: Leveraging RSSI for Tracking and Control in Ubiquitous Systems",
    venue: "IEEE INDICON",
    year: 2024,
    type: "Conference Paper",
    details: "Proceedings of IEEE India Council International Conference.",
  },
];
