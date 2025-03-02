import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans, Plus_Jakarta_Sans as FontHeading } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from 'next/script';
import { Toaster } from "@/components/ui/toaster"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const fontHeading = FontHeading({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  weight: ["500", "600", "700"],
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
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
        url: `${DATA.url}/me.jpg`,
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
    images: [`${DATA.url}/me.jpg`],
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
    <html lang="en" suppressHydrationWarning className="js">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Script
          id="animation-fix"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Add preload class to prevent animation flashes
              document.documentElement.classList.add('preload');
              
              // Remove preload class after page is fully loaded
              window.addEventListener('load', () => {
                // Small delay to ensure smooth transitions
                setTimeout(() => {
                  document.documentElement.classList.remove('preload');
                  document.documentElement.classList.add('loaded');
                }, 600); // Increased delay to ensure content is visible first
              });
              
              // Fix for iOS vh units
              const setVH = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', \`\${vh}px\`);
              };
              
              setVH();
              window.addEventListener('resize', setVH);
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-3xl mx-auto py-8 sm:py-12 md:py-24 px-4 sm:px-6 overflow-x-hidden relative",
          "h-[calc(var(--vh,1vh)*100)]", // Fix for mobile height issues
          fontSans.variable,
          fontHeading.variable,
          "font-[var(--font-sans),system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open_Sans','Helvetica_Neue',sans-serif]"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={100}>
            <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none"></div>
            <div className="absolute inset-0 z-[-2] bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:16px_28px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_10%,#000_40%,transparent_100%)]"></div>
            
            <div className="relative z-5">
              {children}
              <Analytics />
              <SpeedInsights />
              <Toaster />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
