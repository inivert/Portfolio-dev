import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Carlos Mejia",
  initials: "CM",
  url: "https://cmejia.dev",
  location: "Providence, RI",
  locationLink: "https://www.google.com/maps/place/Providence,+RI/",
  description:
    "Ex-soldier who got into cybersecurity before finding my true calling as a web developer.",
  summary:
    "After my time in the Army and working in security, I taught myself to code and discovered I love building websites. Now I make clean, fast sites with Nuxt.js that load quickly and don't break. My background in security means I build stuff that keeps your data safe too. No fancy jargon — I just create sites that work well and help your business reach more people.",
  avatarUrl: "/me.jpg",
  skills: [
    "Nuxt.js",
    "Vue.js",
    "Typescript",
    "CSS",
    "HTML",
    "Python",
    "Linux",
    "Windows Security",
    "n8n automations",
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
      WhatsApp: {
        name: "WhatsApp",
        url: "https://wa.me/14013476461",
        icon: Icons.whatsapp,
        navbar: true,
      },
      Email: {
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
      title: "Shark Restaurant",
      href: "https://shark-restaurant.com/",
      description: "A stylish restaurant website for Shark, featuring elegant design, menu showcase, and a seamless WordPress experience.",
      dates: "2024",
      technologies: ["WordPress", "PHP", "CSS", "JavaScript"],
      video: "/videos/Shark.mp4",
      category: "Freelance Work"
    },
    {
      title: "Restaurant Page",
      href: "https://templatedemo.vercel.app/",
      description: "A modern and responsive restaurant website template showcasing menu items, services, and booking functionality.",
      dates: "2024",
      technologies: ["Vite", "Vue.js", "gsap", "TypeScript"],
      video: "/videos/Restaurant-Template.mp4",
      category: "Templates & Side Projects"
    },
    {
      title: "Restaurant Page V2",
      href: "https://restaurantdemo-five.vercel.app/menu",
      description: "An enhanced version of the restaurant template with improved UI/UX and additional features.",
      dates: "2024",
      technologies: ["Vite", "React", "TypeScript"],
      video: "/videos/Restaurant-temp2.mp4",
      category: "Templates & Side Projects"
    },
    {
      title: "Landscaping site",
      href: "https://mv-landscaping.com/",
      description: "A sleek and modern portfolio website for showcasing landscape photography and services.",
      dates: "2024",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Material UI"],
      video: "/videos/landscape-temp.mp4",
      category: "Freelance Work"
    }
  ] as Array<{
    title: string;
    href?: string;
    description: string;
    dates: string;
    technologies: readonly string[];
    image?: string;
    video?: string;
    category: string;
    links?: readonly {
      icon: React.ReactNode;
      type: string;
      href: string;
    }[];
  }>,
} as const;
