export type ExperienceItem = {
    id: string;
    role: string;
    organization: string;
    period: string;
    description: string;
    type: "academic" | "industry" | "research";
};

export const experiences: readonly ExperienceItem[] = [
    {
        id: "exp-1",
        role: "Assistant Professor",
        organization: "Indian Institute of Technology (IIT) Patna",
        period: "2024 - Present",
        description: "Department of Computer Science and Engineering.",
        type: "academic",
    },
    {
        id: "exp-2",
        role: "Assistant Professor",
        organization: "Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT) Gandhinagar",
        period: "Dec 2022 - Feb 2024",
        description: "Served as an Assistant Professor, focusing on computing and research.",
        type: "academic",
    },
    {
        id: "exp-3",
        role: "Research Associate",
        organization: "Indian Institute of Science (IISc), Bangalore",
        period: "Sept 2022 - Dec 2022",
        description: "Worked as a Research Associate in the field of Edge Computing and Machine Learning.",
        type: "research",
    },
];
