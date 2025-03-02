"use client"

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import GradientText from "@/components/magicui/gradient-text";
import { ProjectCard } from "@/components/project-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { BLUR_FADE_DELAY } from "@/constants/animation";
import { ContactDialog } from "@/components/contact-dialog";
import { AboutDialog } from "@/components/about-dialog";
import { useFloatingAnimation, useHoverAnimation, useStaggerAnimation, usePulseAnimation } from "@/animations/hooks";
import { useEffect } from "react";
import AnimatedBackground from "@/components/magicui/animated-background";
import Card3D from "@/components/magicui/card-3d";
import Spotlight from "@/components/magicui/spotlight";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const iconVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.15,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    } 
  },
};

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-1.5 md:gap-2">
      {Object.entries(DATA.contact.social)
        .filter(([_, social]) => social.navbar)
        .map(([name, social]) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              <motion.div 
                className="inline-block"
                variants={iconVariants} 
                initial="initial" 
                whileHover="hover"
              >
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-8 md:size-9 p-0 flex items-center justify-center transition-colors duration-200 hover:bg-primary/5 rounded-full text-foreground/70 hover:text-foreground"
                  )}
                  aria-label={name}
                >
                  <social.icon className="size-[15px] md:size-[16px]" />
                </Link>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent 
              side="bottom" 
              sideOffset={5} 
              className="bg-background/95 backdrop-blur-lg border border-primary/20 text-foreground font-medium px-3 py-1.5 shadow-lg"
            >
              <p>{name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
    </div>
  );
};

export default function Page() {
  // Animation hooks
  useFloatingAnimation('.avatar-float');
  useHoverAnimation('.hover-scale');
  useStaggerAnimation('.skill-badge');
  usePulseAnimation('.cta-button');

  return (
    <main className="relative flex flex-col min-h-[100dvh] space-y-12 sm:space-y-16">
      <AnimatedBackground particleCount={40} particleColor="primary" minSize={1} maxSize={2} speed={0.5} />
      
      {/* Theme toggle in top right */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div 
              variants={iconVariants} 
              initial="initial" 
              whileHover="hover"
              className="text-foreground/80 hover:text-foreground"
            >
              <ModeToggle />
            </motion.div>
          </TooltipTrigger>
          <TooltipContent 
            side="bottom" 
            sideOffset={5} 
            className="bg-background/95 backdrop-blur-lg border border-primary/20 text-foreground font-medium px-3 py-1.5 shadow-lg"
          >
            <p>Theme</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      {/* Hero Section */}
      <section id="hero" className="w-full overflow-visible pt-4 sm:pt-8">
        <Spotlight className="mx-auto w-full max-w-2xl space-y-6 sm:space-y-8 overflow-visible" size={600}>
          <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-6 sm:justify-between overflow-visible">
            <div className="flex-col flex flex-1 space-y-3 sm:space-y-4 mt-5 sm:mt-0 text-center sm:text-left overflow-visible">
              <GradientText 
                element="h1"
                text={`Hi, I'm ${DATA.name.split(" ")[0]} 🧑🏻‍💻`}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none overflow-visible"
                from="from-primary"
                via="via-primary/80"
                to="to-primary/60"
              />
              <BlurFadeText
                className="max-w-[600px] text-base sm:text-lg md:text-xl overflow-visible mx-auto sm:mx-0"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <div className="cta-button">
                    <AboutDialog />
                  </div>
                  <div className="cta-button">
                    <ContactDialog />
                  </div>
                  
                  {/* Separator dot */}
                  <div className="h-4 w-4 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-foreground/20"></div>
                  </div>
                  
                  {/* Social links next to Hire button */}
                  <SocialLinks />
                </div>
              </BlurFade>
            </div>
            
            {/* Avatar with improved positioning for mobile */}
            <div className="flex justify-center mb-2 sm:mb-0">
              <Card3D 
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden"
                childrenClassName="rounded-full" 
                border 
                intensity={5}
                shadow 
                glare
              >
                <Avatar className="size-24 sm:size-32 border-0 animate-none">
                  <AvatarImage 
                    alt={DATA.name} 
                    src={DATA.avatarUrl} 
                    className="object-cover transition-all duration-500 hover:scale-[1.03]"
                  />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </Card3D>
            </div>
          </div>
        </Spotlight>
      </section>

      {/* Skills Section - Updated margin for better mobile spacing */}
      <section id="skills" className="w-full">
        <div className="mx-auto max-w-2xl px-1 sm:px-0">
          <div className="flex min-h-0 flex-col gap-y-3 sm:gap-y-4">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <GradientText
                element="h2"
                text="Skills"
                className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-center sm:text-left"
                from="from-primary"
                to="to-secondary"
              />
            </BlurFade>
            <div className="flex flex-wrap gap-1.5 bg-background/30 rounded-xl p-3 sm:p-4 backdrop-blur-sm border border-primary/5">
              {DATA.skills.map((skill, id) => (
                <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                  <Badge 
                    className="skill-badge transition-all duration-300 hover:-translate-y-1" 
                    key={skill}
                  >
                    {skill}
                  </Badge>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section with improved spacing */}
      <section id="projects" className="w-full">
        <div className="space-y-8 sm:space-y-12 w-full py-4 sm:py-6">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <GradientText
                  element="h2"
                  text="Check out my latest work"
                  className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-5xl"
                  from="from-primary"
                  via="via-accent"
                  to="to-secondary"
                />
                <p className="text-muted-foreground text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  This section is currently under construction. Check back soon to see my latest projects!
                </p>
              </div>
            </div>
          </BlurFade>
          {DATA.projects && DATA.projects.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 max-w-[800px] mx-auto">
              {DATA.projects.map((project, id) => (
                <BlurFade
                  key={project.title}
                  delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                >
                  <ProjectCard
                    href={project.href}
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    tags={project.technologies ? [...project.technologies] : []}
                    image={project.image}
                    video={project.video}
                    links={project.links ? 
                      Object.fromEntries(
                        Object.entries(project.links).map(([key, value]) => [
                          key, 
                          typeof value === 'string' ? value : value.href
                        ])
                      ) : undefined
                    }
                  />
                </BlurFade>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full py-6 sm:py-8">
        <div className="mx-auto max-w-2xl text-center text-xs sm:text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {DATA.name} — Built with ❤️ using Next.js and Tailwind CSS</p>
        </div>
      </footer>
    </main>
  );
}
