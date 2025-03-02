"use client";

import { cn } from "@/lib/utils";
import { useRef, useState, useEffect, MouseEvent, ReactNode } from "react";

interface SpotlightProps {
  className?: string;
  size?: number;
  color?: string;
  children?: ReactNode;
}

export default function Spotlight({
  className,
  size = 500,
  color = "hsl(var(--primary))",
  children,
}: SpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  if (!isMounted) {
    return <div className={cn("opacity-0", className)} ref={divRef}>{children}</div>;
  }

  return (
    <div
      ref={divRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${color}/10, transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
} 