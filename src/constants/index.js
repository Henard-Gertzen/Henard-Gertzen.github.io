import { noimage, techish } from "../assets/images";
import {
    css,
    github,
    html,
    javascript,
    linkedin,
    nodejs,
    react,
    c_sharp,
    java,
    c_plus_plus,
    message,
    python,
    sql,
    wallet
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: c_sharp,
        name: "C#",
        type: "Frontend and Backend",
    },
    {
        imageUrl: c_plus_plus,
        name: "C++",
        type: "Backend",
    },
    {
        imageUrl: java,
        name: "Java",
        type: "Console programs",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: python,
        name: "Python",
        type: "Console Programs",
    },
    {
        imageUrl: sql,
        name: "SQL",
        type: "Database creation and use.",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
];

export const experiences = [
    {
        title: "Web Developer",
        company_name: "DYOPTRI",
        icon: noimage,
        iconBg: "#ADD8E6",
        date: "November 2017 - January 2018",
        points: [
            "Helped design and maintain webpages for clients using WordPress.",
            "Created landing pages, dashboards and e-commerce pages using WordPress.",
            "Did general administrative duties using the MS Office suite.",
        ],
    },
    {
        title: "Computer Hardware Technician",
        company_name: "Techish",
        icon: techish,
        iconBg: "#ffffff",
        date: "Jan 2020 - Apr 2020",
        points: [
            "Did remote IT support for various clients, using technologies such as AnyDesk and TeamViewer.",
            "Repaired software and hardware errors in person and remotely.",
            "Maintain hardware including cleaning and upgrades.",
            "Did general administrative duties using MS Office suite.",
        ],
    },
];

export const socialLinks = [
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/Henard-Gertzen',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'www.linkedin.com/in/henard-gertzen-5b4267199',
    }
];

export const projects = [
    {
        iconUrl: message,
        theme: 'btn-back-red',
        name: 'Chat Application',
        description: 'Developed a chat app in which users can add and message each other after creating an account.',
        link: 'https://github.com/Henard-Gertzen/CMPG315-Group2-Chat-App',
    },
    {
        iconUrl: wallet,
        theme: 'btn-back-red',
        name: 'Point of Sale System Group Project',
        description: 'Developed a cinema point-of-sale app in C# that uses SQL databases which allows users to buy seats and order snacks.',
        link: 'https://github.com/Henard-Gertzen/Skreenkinikor_Master_Project',
    }
];