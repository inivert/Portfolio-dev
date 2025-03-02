"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
}

export default function AnimatedBackground({
  className,
  particleCount = 30,
  particleColor = "primary",
  minSize = 1,
  maxSize = 3,
  speed = 1,
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = 0;
    
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      opacitySpeed: number;
      color: string;
    }> = [];

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      particles.length = 0;
      
      // Set up color variations
      const colors = [
        `hsla(var(--${particleColor}), 0.4)`,
        `hsla(var(--${particleColor}), 0.3)`,
        `hsla(var(--${particleColor}), 0.2)`
      ];
      
      for (let i = 0; i < particleCount; i++) {
        const size = minSize + Math.random() * (maxSize - minSize);
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size,
          speedX: (Math.random() - 0.5) * speed * (0.5 + size / maxSize),
          speedY: (Math.random() - 0.5) * speed * (0.5 + size / maxSize),
          opacity: 0.1 + Math.random() * 0.3,
          opacitySpeed: (Math.random() - 0.5) * 0.005,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const draw = (timestamp: number) => {
      // Throttle animations for performance
      if (timestamp - lastTime < 1000 / 60) { // Limit to 60fps
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      
      lastTime = timestamp;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace("0.4", particle.opacity.toString());
        ctx.fill();
        
        // Update position with smooth motion
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Update opacity with smooth transition
        particle.opacity += particle.opacitySpeed;
        if (particle.opacity <= 0.1 || particle.opacity >= 0.4) {
          particle.opacitySpeed = -particle.opacitySpeed;
        }
        
        // Wrap around edges with buffer to prevent flashing
        const buffer = particle.size * 2;
        if (particle.x < -buffer) particle.x = window.innerWidth + buffer;
        if (particle.x > window.innerWidth + buffer) particle.x = -buffer;
        if (particle.y < -buffer) particle.y = window.innerHeight + buffer;
        if (particle.y > window.innerHeight + buffer) particle.y = -buffer;
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };

    // Handle resize events
    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };
    
    window.addEventListener("resize", handleResize);
    
    // Initial setup
    resizeCanvas();
    createParticles();
    animationFrameId = requestAnimationFrame(draw);

    // Clean up on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      particles.length = 0;
    };
  }, [particleCount, particleColor, minSize, maxSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 z-[-3] pointer-events-none", className)}
    />
  );
} 