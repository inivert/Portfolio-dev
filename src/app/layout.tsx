import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Meteors } from "@/components/magicui/meteors";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from 'next/script';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Structured data for personal portfolio
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: DATA.name,
  description: DATA.description,
  url: DATA.url,
  sameAs: [
    DATA.contact.social.GitHub.url,
    DATA.contact.social.LinkedIn.url,
    DATA.contact.social.X.url,
  ],
  jobTitle: "Web Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: DATA.location,
  },
  email: DATA.contact.email,
  telephone: DATA.contact.tel,
  knowsAbout: DATA.skills,
};

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `${DATA.name} | Web Developer & Freelancer`,
    template: `%s | ${DATA.name} - Web Development Services`,
  },
  description: `${DATA.description} Specializing in modern web development, custom websites, and digital solutions for businesses.`,
  keywords: [
    "web developer",
    "freelance developer",
    "website creation",
    "custom web development",
    "React developer",
    "Next.js developer",
    "frontend developer",
    "full-stack developer",
    ...DATA.skills,
  ].join(", "),
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  publisher: DATA.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: DATA.url,
  },
  openGraph: {
    title: `${DATA.name} - Professional Web Developer`,
    description: `${DATA.description} Available for freelance web development projects.`,
    url: DATA.url,
    siteName: `${DATA.name} - Web Development Services`,
    images: [
      {
        url: `${DATA.url}/me.png`,
        width: 1200,
        height: 630,
        alt: `${DATA.name} - Web Developer`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: `${DATA.name} - Web Developer`,
    description: `${DATA.description} Available for freelance web development projects.`,
    creator: "@inivert",
    images: [`${DATA.url}/me.png`],
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
    yandex: "your-yandex-verification-code", // Add if targeting Russian market
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
                <Meteors number={50} />
                {children}
                <Navbar />
                <Analytics />
                <SpeedInsights />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
