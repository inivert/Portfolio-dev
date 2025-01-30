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
    {
      title: "Restaurant Page",
      href: "https://templatedemo.vercel.app/",
      description: "A modern and responsive restaurant website template showcasing menu items, services, and booking functionality.",
      dates: "2024",
      technologies: ["Vite", "Vue.js", "gsap", "TypeScript"],
      video: "/videos/Restaurant-Template.mp4"
    },
    {
      title: "Restaurant Page V2",
      href: "https://restaurantdemo-five.vercel.app/menu",
      description: "An enhanced version of the restaurant template with improved UI/UX and additional features.",
      dates: "2024",
      technologies: ["Vite", "React", "TypeScript"],
      video: "/videos/Restaurant-temp2.mp4"
    },
    {
      title: "Landscaping Landing Page",
      href: "https://m-v-landscaping.vercel.app/",
      description: "A sleek and modern portfolio website for showcasing landscape photography and services.",
      dates: "2024",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Material UI"],
      video: "/videos/landscape-temp.mp4"
    }
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
