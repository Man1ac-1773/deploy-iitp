export type BookItem = {
    title: string;
    publisher: string;
    description: string;
    link?: string;
    coAuthors?: string[];
};

export const books: readonly BookItem[] = [
    {
        title: "AICTE Textbook on Design and Analysis of Algorithm",
        publisher: "AICTE (All India Council for Technical Education)",
        description: "AICTE-sponsored textbook on Design and Analysis of Algorithms.",
        link: "https://www.khannabooks.com/product/design-and-analysis-of-algorithms",
        coAuthors: ["Dr. Hari Prabhat Gupta"],
    },
];

export type AwardItem = {
    name: string;
    organization: string;
    year: string;
    description: string;
};

export const awards: readonly AwardItem[] = [
    {
        name: "Student Conference Grant",
        organization: "IEEE Communications Society (ComSoc)",
        year: "2021, 2022",
        description:
            "Received student conference grant sponsored by IEEE ComSoc for INFOCOM 2021 and 2022.",
    },
];

export type Membership = {
    organization: string;
    type: string;
    status: string;
};

export const memberships: readonly Membership[] = [
    {
        organization: "IEEE (Institute of Electrical and Electronics Engineers)",
        type: "Member",
        status: "Active",
    },
];
