"use client"

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { BLUR_FADE_DELAY } from "@/constants/animation";
import { ContactDialog } from "@/components/contact-dialog";
import { AboutDialog } from "@/components/about-dialog";
import { useFloatingAnimation, useHoverAnimation, useStaggerAnimation, usePulseAnimation } from "@/animations/hooks";
import { useEffect } from "react";

export default function Page() {
  // Add floating animation to avatar
  useFloatingAnimation('.avatar-float');
  
  // Add hover effect to all cards
  useHoverAnimation('.hover-scale');
  
  // Add stagger animation to skills
  useStaggerAnimation('.skill-badge');
  
  // Add subtle pulse to CTA buttons
  usePulseAnimation('.cta-button');

  return (
    <main className="relative flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero" className="w-full overflow-visible">
        <div className="mx-auto w-full max-w-2xl space-y-8 overflow-visible">
          <div className="gap-2 flex justify-between overflow-visible">
            <div className="flex-col flex flex-1 space-y-1.5 overflow-visible">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none overflow-visible"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]} 🧑🏻‍💻`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl overflow-visible"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="flex gap-2 pt-4">
                  <div className="cta-button">
                    <AboutDialog />
                  </div>
                  <div className="cta-button">
                    <ContactDialog />
                  </div>
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border avatar-float">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge className="skill-badge" key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  This section is currently under construction. Check back soon to see my latest projects!
                </p>
              </div>
            </div>
          </BlurFade>
          {DATA.projects && DATA.projects.length > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
              {DATA.projects.map((project, id) => (
                <BlurFade
                  key={project.title}
                  delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                >
                  <div className="hover-scale">
                    <ProjectCard
                      href={project.href}
                      key={project.title}
                      title={project.title}
                      description={project.description}
                      dates={project.dates}
                      tags={project.technologies}
                      image={project.image}
                      video={project.video}
                      links={project.links}
                    />
                  </div>
                </BlurFade>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
