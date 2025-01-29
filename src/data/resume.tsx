import { Icons } from "@/components/icons";
import { SizeIcon } from "@radix-ui/react-icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Carlos Mejia",
  initials: "CM",
  url: "https://cmejia.dev",
  location: "Providence, RI",
  locationLink: "https://www.google.com/maps/place/Providence,+RI/",
  description:
    "From soldier to cybersecurity professional with a passion for learning and a focus on programming and automation.",
  summary:
    "Served 4 years in the U.S. Army as an infantryman, followed by a year as a IT Specialist. Transitioned to the private sector in cybersecurity and now advancing my career by teaching myself how to code and do automations.",
  avatarUrl: "/me.png",
  skills: [
    "React",
    "Next.js",
    "Nuxt.js",
    "Vue.js",
    "Typescript",
    "CSS",
    "HTML",
    "JavaScript",
    "Python",
    "Postgres",
    "Docker",
    "Linux",
    "Windows Security",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
  ],
  contact: {
    email: "m.carlos90@outlook.com",
    tel: "+14013476461",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://dub.sh/inivert-github",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://dub.sh/carlos-linkedin",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://dub.sh/lumus",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/@inivert",
        icon: Icons.youtube,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "mailto:m.carlos90@outlook.com",
        icon: Icons.email,

        navbar: true,
      },
    },
  },

  work: [
    {
      company: "US Army Reserves",
      href: "https://www.goarmy.com/careers-and-jobs/signal-intelligence/locations-stats-frequencies/25b-information-technology-specialist",
      badges: [],
      location: "Rhode Island",
      title: "IT Specialist",
      logoUrl: "/army.png",
      start: "May 2024",
      end: "Present",
      description:
        "Deployed and maintained a secure and efficient IT infrastructure for the Rhode Island Army Reserves. Provided technical support and solutions to enhance the organization's operational capabilities.",
    },
    {
      company: "Chili's Grill & Bar",
      badges: [],
      href: "https://www.google.com/maps/place/Warwick,+RI/",
      location: "Warwick, RI",
      title: "Line Cook",
      logoUrl: "/chilis-logo.png",
      start: "June 2024",
      end: "December 2024",
      description:
        "Prepared and cooked food for customers in a fast-paced restaurant environment. Maintained a clean and safe kitchen area, adhering to health and safety standards.",
    },
    {
      company: "Home Depot",
      href: "https://www.homedepot.com/",
      badges: [],
      location: "Johnston, RI",
      title: "Fullfillment Associate",
      logoUrl: "/HomeDepot-logo.png",
      start: "March 2024",
      end: "June 2024",
      description:
        "Packaged and prepared customer orders for delivery or pickup. Assisted with stocking shelves and maintaining a clean and organized store environment.",
    },
    {
      company: "US Army",
      href: "https://www.goarmy.com",
      badges: [],
      location: "Rhode Island",
      title: "Infantryman",
      logoUrl: "/army.png",
      start: "July 2020",
      end: "January 2024",
      description:
        "Served as a soldier in the United States Army, participating in various training exercises and deployments. Gained valuable experience in teamwork, leadership, and tactical operations.",
    },
  ],
  education: [
    {
      school: "New England Institute of Technology",
      href: "https://www.neit.edu",
      degree: "Associate's Degree of Cybersecurity and Network Engineering",
      logoUrl: "/neit-logo.png",
      start: "2024",
      end: "2025",
    },
  ],
  certifications: [
    {
      name: "CompTIA Security+",
      href: "https://www.comptia.org/certifications/security",
      logoUrl: "/sec+logo.svg",
      start: "2023",
      end: "2027",
    },
    {
      name: "Google IT Support Professional Certificate",
      href: "https://www.coursera.org/professional-certificates/google-it-support",
      logoUrl: "/google-logo.png",
      start: "2023",
      end: "",
    },
  ],
  projects: [
    // TODO: Add projects section - in progress
  ] as Array<{
    title: string;
    href?: string;
    description: string;
    dates: string;
    technologies: readonly string[];
    image?: string;
    video?: string;
    links?: readonly {
      icon: React.ReactNode;
      type: string;
      href: string;
    }[];
  }>,
} as const;
