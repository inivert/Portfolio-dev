import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ExternalLinkIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface ProjectCardProps {
  title: string;
  description?: string;
  dates?: string;
  href?: string;
  tags?: string[];
  image?: string;
  video?: string;
  links?: Record<string, string>;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  href,
  tags,
  dates,
  image,
  video,
  links,
  className,
}: ProjectCardProps) {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden h-full group", 
        "transition-all duration-300 ease-out", 
        "hover:shadow-lg hover:shadow-primary/5", 
        "hover:-translate-y-1",
        "will-change-transform",
        "border border-primary/5",
        className
      )}
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background/0 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
      
      {/* Border glow on hover */}
      <div className="absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 z-[-1] blur-[1px]"></div>
      
      {/* Media Container */}
      {(image || video) && (
        <div className="relative h-48 overflow-hidden">
          {image && !video && (
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-all duration-700 ease-in-out group-hover:scale-[1.03] group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-50"></div>
            </div>
          )}
          {video && (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover h-full w-full transition-all duration-700 ease-in-out group-hover:scale-[1.03]"
            >
              <source src={video} type="video/mp4" />
            </video>
          )}
          {/* Overlay with project info on hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-primary/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground text-sm font-medium px-4 py-2 rounded-md bg-primary/90 hover:bg-primary transition-colors"
              >
                View Project
              </a>
            )}
          </div>
        </div>
      )}

      <CardHeader className="p-5">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold transition-colors duration-300 group-hover:text-primary">{title}</CardTitle>
          <div className="flex gap-2">
            {links && Object.entries(links).map(([name, url]) => (
              <TooltipProvider key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {name === "github" ? (
                        <GitHubLogoIcon className="h-5 w-5" />
                      ) : (
                        <ExternalLinkIcon className="h-5 w-5" />
                      )}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Visit {name === "github" ? "GitHub Repository" : "Live Site"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
        {dates && <CardDescription className="text-xs mt-1">{dates}</CardDescription>}
      </CardHeader>
      
      <CardContent className="px-5 pb-2">
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardContent>
      
      {tags && tags.length > 0 && (
        <CardFooter className="flex flex-wrap gap-1 px-5 pb-5">
          {tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs transition-all duration-300 hover:bg-primary/10"
            >
              {tag}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
}
