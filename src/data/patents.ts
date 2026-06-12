export type Patent = {
    title: string;
    inventors: string[];
    number: string;
    status: string;
    description: string;
    link?: string;
};

export const patents: readonly Patent[] = [
    {
        title:
            "Racket Sports Activities Monitoring and Corrections using Grip Embedded Sensors and Smartphone",
        inventors: ["Rahul Mishra", "T. K. Maiti", "A. Jain", "P. Lalwani", "R. Shah"],
        number: "202411014828",
        status: "Patent filed",
        description:
            "Monitoring and correction of racket-sports activities using grip-embedded sensors and a smartphone.",
        link: "https://ipindia.gov.in/",
    },
];
