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
  // Wrap the entire card in a link if href is provided
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (href) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block h-full"
        >
          {children}
        </a>
      );
    }
    return <>{children}</>;
  };

  return (
    <CardWrapper>
      <Card 
        className={cn(
          "relative overflow-hidden h-full group", 
          "transition-all duration-300 ease-out", 
          "hover:shadow-lg hover:shadow-primary/5", 
          "hover:-translate-y-1",
          "will-change-transform",
          "border border-primary/5",
          "text-xs sm:text-sm md:text-base",
          href && "cursor-pointer",
          className
        )}
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background/0 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
        
        {/* Border glow on hover */}
        <div className="absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 z-[-1] blur-[1px]"></div>
        
        {/* Media Container - small height on mobile */}
        {(image || video) && (
          <div className="relative h-24 sm:h-32 md:h-48 overflow-hidden">
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
            {/* Overlay indicator on hover for non-touch devices */}
            <div className="absolute inset-0 flex items-center justify-center bg-primary/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="text-primary-foreground text-[10px] sm:text-xs md:text-sm font-medium px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-md bg-primary/90">
                View Project
              </div>
            </div>
          </div>
        )}

        <CardHeader className="p-2 sm:p-3 md:p-5">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base sm:text-lg md:text-xl font-bold transition-colors duration-300 group-hover:text-primary truncate max-w-[75%]">{title}</CardTitle>
            <div className="flex gap-1 sm:gap-1.5 md:gap-2">
              {links && Object.entries(links).map(([name, url]) => (
                <TooltipProvider key={name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/70 hover:text-foreground transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {name === "github" ? (
                          <GitHubLogoIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                        ) : (
                          <ExternalLinkIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
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
          {dates && <CardDescription className="text-[8px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-0.5 md:mt-1 truncate">{dates}</CardDescription>}
        </CardHeader>
        
        <CardContent className="px-2 sm:px-3 md:px-5 pb-1 sm:pb-1 md:pb-2">
          {description && <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 md:line-clamp-none">{description}</p>}
        </CardContent>
        
        {tags && tags.length > 0 && (
          <CardFooter className="flex flex-wrap gap-0.5 sm:gap-1 px-2 sm:px-3 md:px-5 py-1 sm:py-2 md:pb-5">
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-[8px] sm:text-[10px] md:text-xs px-1 py-0 sm:px-1.5 sm:py-0 md:px-2 md:py-0.5 transition-all duration-300 hover:bg-primary/10 card-footer-badge"
              >
                {tag}
              </Badge>
            ))}
          </CardFooter>
        )}
      </Card>
    </CardWrapper>
  );
}
