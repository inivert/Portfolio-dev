"use client";

import { useRef, useState, useEffect, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Card3DProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  childrenClassName?: string;
  intensity?: number;
  border?: boolean;
  isRotated?: boolean;
  shadow?: boolean;
  glare?: boolean;
  maxRotation?: number;
}

const Card3D = ({
  className,
  childrenClassName,
  children,
  intensity = 5,
  border = false,
  isRotated = true,
  shadow = true,
  glare = false,
  maxRotation = 10,
  ...props
}: Card3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [targetX, setTargetX] = useState(0);
  const [targetY, setTargetY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const requestRef = useRef<number | null>(null);

  // Avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      setIsMounted(false);
    };
  }, []);

  // Handle mouse movements
  useEffect(() => {
    if (!isMounted || !isRotated) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !isHovering) return;
      const rect = cardRef.current.getBoundingClientRect();

      // Calculate mouse position relative to the card center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Normalize coordinates to range [-1, 1] with constraints
      const x = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
      const y = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

      // Apply intensity and set target rotation with constraints
      const calculatedX = -y * intensity;
      const calculatedY = x * intensity;
      
      // Limit rotation to maximum values
      setTargetX(Math.max(-maxRotation, Math.min(maxRotation, calculatedX)));
      setTargetY(Math.max(-maxRotation, Math.min(maxRotation, calculatedY)));
      
      // Calculate glare position
      if (glare) {
        const glareX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const glareY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
        setGlarePosition({ x: glareX, y: glareY });
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      // Reset targets when mouse leaves
      setTargetX(0);
      setTargetY(0);
    };

    // Add event listeners to the card element only
    if (cardRef.current) {
      cardRef.current.addEventListener("mouseenter", handleMouseEnter);
      cardRef.current.addEventListener("mouseleave", handleMouseLeave);
    }
    
    // Add mousemove to window to ensure smooth tracking
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("mouseenter", handleMouseEnter);
        cardRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMounted, isRotated, glare, intensity, isHovering, maxRotation]);

  // Animation loop with smoothing
  useEffect(() => {
    if (!isMounted) return;

    const animate = () => {
      // Apply smoother easing with smaller factor
      const smoothFactor = isHovering ? 0.05 : 0.12; // Faster reset when not hovering
      
      // Calculate next rotation values with smooth interpolation
      const nextRotateX = rotateX + (targetX - rotateX) * smoothFactor;
      const nextRotateY = rotateY + (targetY - rotateY) * smoothFactor;
      
      // Check if rotation change is significant enough to update
      const isSignificantChange = 
        Math.abs(nextRotateX - rotateX) > 0.01 || 
        Math.abs(nextRotateY - rotateY) > 0.01;
      
      if (isSignificantChange) {
        setRotateX(nextRotateX);
        setRotateY(nextRotateY);
      }
      
      // Continue animation loop
      requestRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation loop
    requestRef.current = requestAnimationFrame(animate);
    
    // Clean up animation frame on unmount or when dependencies change
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };
  }, [isMounted, rotateX, rotateY, targetX, targetY, isHovering]);

  if (!isMounted) {
    return (
      <div className={cn("opacity-0", className)} {...props}>
        <div className={childrenClassName}>{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative will-change-transform transition-all ease-out",
        shadow && "before:absolute before:inset-0 before:-z-10 before:translate-y-[5%] before:translate-x-[2%] before:rounded-xl before:bg-gradient-to-br before:from-transparent before:to-primary/20 before:blur-xl before:transition-all before:duration-500",
        border && "rounded-xl border border-primary/10",
        className
      )}
      style={{
        transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovering ? 0.98 : 1}, ${isHovering ? 0.98 : 1}, 1)`,
        transformStyle: "preserve-3d",
        transition: isHovering ? "transform 0.1s ease" : "transform 0.3s ease-out",
      }}
      {...props}
    >
      <div
        className={cn(
          "h-full w-full rounded-xl overflow-hidden",
          childrenClassName
        )}
      >
        {children}
        
        {glare && (
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none opacity-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 80%)`,
              transform: "translateZ(1px)",
              opacity: isHovering ? 1 : 0,
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
};

export default Card3D; 