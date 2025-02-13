import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background/50 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background/30"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-4 py-2 bg-background/60 backdrop-blur-2xl rounded-2xl border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:bg-background/40 dark:border-white/[0.1] dark:shadow-[0_8px_32px_rgba(255,255,255,0.08)] transform-gpu transition-all duration-300 hover:bg-background/70 dark:hover:bg-background/50">
        {DATA.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 transition-all duration-300 hover:scale-110 hover:bg-background/80 dark:hover:bg-background/60 rounded-xl text-foreground/80 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground"
                  )}
                >
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent sideOffset={8} className="bg-background/95 backdrop-blur-lg border-border/50 text-foreground dark:bg-background/95 dark:text-foreground">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-8 mx-2 bg-border/50" />
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 transition-all duration-300 hover:scale-110 hover:bg-background/80 dark:hover:bg-background/60 rounded-xl text-foreground/80 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground"
                    )}
                  >
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent sideOffset={8} className="bg-background/95 backdrop-blur-lg border-border/50 text-foreground dark:bg-background/95 dark:text-foreground">
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        <Separator orientation="vertical" className="h-8 mx-2 bg-border/50" />
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="hover:scale-110 transition-all duration-300 text-foreground/80 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground">
                <ModeToggle />
              </div>
            </TooltipTrigger>
            <TooltipContent sideOffset={8} className="bg-background/95 backdrop-blur-lg border-border/50 text-foreground dark:bg-background/95 dark:text-foreground">
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
