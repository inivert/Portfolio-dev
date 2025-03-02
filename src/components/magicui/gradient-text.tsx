"use client";

import { HTMLAttributes, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps extends HTMLAttributes<HTMLHeadingElement> {
  text: string;
  from?: string;
  via?: string;
  to?: string;
  animate?: boolean;
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

export default function GradientText({
  text,
  from = "from-primary",
  via = "via-accent",
  to = "to-secondary",
  animate = true,
  element: Element = "h1",
  className,
  ...props
}: GradientTextProps) {
  const [mounted, setMounted] = useState(false);
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Element className={cn("opacity-0", className)} {...props}>
        {text}
      </Element>
    );
  }

  return (
    <Element
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r",
        from,
        via,
        to,
        animate && "animate-gradient bg-[length:200%_auto]",
        className
      )}
      {...props}
    >
      {text}
    </Element>
  );
} 