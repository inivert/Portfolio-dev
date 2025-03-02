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
  /** Controls the shadow opacity to improve readability (0-100, default 15) */
  shadowOpacity?: number;
  /** Determines if the shadow should be light or dark */
  shadowMode?: "auto" | "light" | "dark";
  /** Adds a subtle outline effect for better readability */
  enableOutline?: boolean;
  /** Controls whether to use an enhanced wider shadow on larger text */
  enhancedShadow?: boolean;
  /** Adjusts gradient distribution to prevent color inconsistencies */
  adjustGradient?: boolean;
}

export default function GradientText({
  text,
  from = "from-primary",
  via = "via-accent",
  to = "to-secondary",
  animate = true,
  element: Element = "h1",
  className,
  shadowOpacity = 15,
  shadowMode = "auto",
  enableOutline = true,
  enhancedShadow = true,
  adjustGradient = true,
  ...props
}: GradientTextProps) {
  const [mounted, setMounted] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Check if we're in dark mode for proper shadow color
    if (shadowMode === "auto") {
      const isDark = 
        document.documentElement.classList.contains("dark") || 
        document.body.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      setIsDarkTheme(isDark);
    } else {
      setIsDarkTheme(shadowMode === "dark");
    }
    
    // Set up observer for theme changes
    if (shadowMode === "auto") {
      const observer = new MutationObserver(() => {
        const isDark = 
          document.documentElement.classList.contains("dark") || 
          document.body.classList.contains("dark") ||
          document.documentElement.getAttribute("data-theme") === "dark";
        setIsDarkTheme(isDark);
      });
      
      observer.observe(document.documentElement, { 
        attributes: true, 
        attributeFilter: ["class", "data-theme"] 
      });
      
      return () => observer.disconnect();
    }
  }, [shadowMode]);

  if (!mounted) {
    return (
      <Element className={cn("opacity-0", className)} {...props}>
        {text}
      </Element>
    );
  }
  
  // Determine if it's likely to be a heading based on element and class
  const isLikelyHeading = 
    Element === 'h1' || 
    Element === 'h2' || 
    className?.includes('text-5xl') || 
    className?.includes('text-4xl') ||
    className?.includes('text-3xl');
  
  // Calculate shadow color and style
  const baseShadowOpacity = shadowOpacity / 100;
  
  // Apply text shadow in the opposite color of the theme for better contrast
  const textShadowColor = !isDarkTheme ? 
    `rgba(0, 0, 0, ${baseShadowOpacity})` :
    `rgba(255, 255, 255, ${baseShadowOpacity})`;
  
  // Secondary shadow color (same as the theme color but less intense)
  const secondaryShadowColor = isDarkTheme ? 
    `rgba(0, 0, 0, ${baseShadowOpacity * 0.7})` :
    `rgba(255, 255, 255, ${baseShadowOpacity * 0.7})`;
  
  // Create a more enhanced shadow for larger text when enhancedShadow is true
  let textShadow = 'none';
  
  if (shadowOpacity > 0) {
    if (enhancedShadow && isLikelyHeading) {
      // Enhanced shadow for headings with multiple layers
      textShadow = `
        0 1px 1px ${secondaryShadowColor},
        0 0 1px ${textShadowColor},
        0 1px 3px ${textShadowColor},
        0 0 5px ${secondaryShadowColor}
      `;
    } else {
      // Standard shadow for regular text
      textShadow = `0 1px 2px ${secondaryShadowColor}, 0 0 1px ${textShadowColor}`;
    }
  }
  
  // Outline effect for better readability
  const outlineEffect = enableOutline ? {
    WebkitTextStroke: isDarkTheme 
      ? `0.5px rgba(0, 0, 0, ${Math.min(baseShadowOpacity * 0.8, 0.15)})` 
      : `0.2px rgba(255, 255, 255, ${Math.min(baseShadowOpacity * 0.8, 0.15)})`,
  } : {};
  
  // Auto-adjust gradient size based on text length to ensure consistent coloring
  const gradientSize = adjustGradient ? {
    backgroundSize: props.style?.backgroundSize || 
      (animate 
        ? text.length > 20 
          ? "300% auto" 
          : text.length > 10 
            ? "250% auto" 
            : "200% auto"
        : "100% auto")
  } : {};

  return (
    <Element
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r font-heading",
        from,
        via,
        to,
        animate && "animate-gradient",
        "overflow-visible",
        className
      )}
      style={{
        textShadow,
        ...outlineEffect,
        ...gradientSize,
        ...props.style
      }}
      {...props}
    >
      {text}
    </Element>
  );
} 