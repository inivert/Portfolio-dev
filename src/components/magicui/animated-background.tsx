"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  /** Controls the glow intensity of particles */
  glowIntensity?: number;
  /** Force a specific theme instead of auto-detecting */
  forceTheme?: "light" | "dark";
}

export default function AnimatedBackground({
  className,
  particleCount = 50,
  particleColor = "primary",
  minSize = 1,
  maxSize = 4,
  speed = 1,
  glowIntensity = 4,
  forceTheme,
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Auto-detect dark theme based on media query and HTML attribute
    const detectTheme = () => {
      if (forceTheme) {
        setIsDarkTheme(forceTheme === "dark");
        return;
      }
      
      // Check if the user has a theme preference in HTML attribute
      const htmlEl = document.documentElement;
      const isDark = 
        htmlEl.classList.contains("dark") || 
        document.body.classList.contains("dark") ||
        htmlEl.getAttribute("data-theme") === "dark" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      setIsDarkTheme(isDark);
    };

    // Initial detection
    detectTheme();
    
    // Set up media query listener for theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => detectTheme();
    mediaQuery.addEventListener("change", handleChange);
    
    // Also observe the HTML element for class changes (for theme toggles)
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ["class", "data-theme"] 
    });
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      observer.disconnect();
    };
  }, [forceTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let pulsePhase = 0;
    
    // Define color maps for light and dark themes
    const colorMapDark = {
      primary: { r: 180, g: 180, b: 190 },     // Light grey with slight blue tint
      secondary: { r: 170, g: 170, b: 180 },   // Light grey
      accent: { r: 190, g: 190, b: 195 },      // Very light grey
      destructive: { r: 190, g: 180, b: 180 }, // Light grey with slight red tint
      muted: { r: 160, g: 160, b: 170 }        // Medium grey
    };
    
    const colorMapLight = {
      primary: { r: 100, g: 100, b: 110 },     // Medium grey with slight blue tint
      secondary: { r: 90, g: 90, b: 100 },     // Medium-dark grey
      accent: { r: 110, g: 110, b: 115 },      // Medium-light grey
      destructive: { r: 110, g: 100, b: 100 }, // Medium grey with slight red tint
      muted: { r: 80, g: 80, b: 90 }           // Darker grey
    };
    
    // Select the appropriate color map based on theme
    const colorMap = isDarkTheme ? colorMapDark : colorMapLight;
    
    // Get base color from our reliable color map
    const baseColor = colorMap[particleColor as keyof typeof colorMap] || 
      (isDarkTheme ? colorMapDark.primary : colorMapLight.primary);
    
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      opacitySpeed: number;
      r: number;
      g: number;
      b: number;
      prevX: number;
      prevY: number;
      pulseOffset: number;
    }> = [];

    const resizeCanvas = () => {
      // Set canvas size with device pixel ratio
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      particles.length = 0;
      
      for (let i = 0; i < particleCount; i++) {
        const size = minSize + Math.random() * (maxSize - minSize);
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        // Create slight color variations for visual interest
        const variation = isDarkTheme ? -15 : 15; // Darker variations in dark mode, lighter in light mode
        const r = Math.max(0, Math.min(255, baseColor.r + Math.floor(Math.random() * 30 - variation)));
        const g = Math.max(0, Math.min(255, baseColor.g + Math.floor(Math.random() * 30 - variation)));
        const b = Math.max(0, Math.min(255, baseColor.b + Math.floor(Math.random() * 30 - variation)));
        
        particles.push({
          x,
          y,
          prevX: x,
          prevY: y,
          size,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          opacity: 0.6 + Math.random() * 0.3,
          opacitySpeed: 0.0005 + Math.random() * 0.0005 * (Math.random() > 0.5 ? 1 : -1),
          r, g, b,
          pulseOffset: Math.random() * Math.PI * 2 // Random start phase
        });
      }
    };

    const draw = (timestamp: number) => {
      // Calculate precise delta time for smooth animation
      const now = performance.now();
      const deltaTime = Math.min(now - lastTime, 50); // Cap at 50ms to prevent huge jumps
      lastTime = now;
      
      // Update global pulse phase
      pulsePhase += 0.001 * deltaTime;
      if (pulsePhase > Math.PI * 2) pulsePhase -= Math.PI * 2;
      
      // Clear the canvas completely
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw all particles
      particles.forEach((particle) => {
        // Store previous position
        particle.prevX = particle.x;
        particle.prevY = particle.y;
        
        // Calculate individual pulse effect for more organic movement
        const pulseFactor = 1 + 0.1 * Math.sin(pulsePhase + particle.pulseOffset);
        
        // Calculate current opacity - reduced to make particles more transparent (roughly 30% opacity)
        const opacity = Math.max(0.2, Math.min(0.3, particle.opacity * 0.3)); 
        
        // For light theme particles, very minimal halo
        if (!isDarkTheme) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 1.05 * pulseFactor, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${particle.r}, ${particle.g}, ${particle.b}, 0.15)`; // Reduced from 0.4
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
        
        // Draw core particle - this is the main visible element now
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.r}, ${particle.g}, ${particle.b}, ${isDarkTheme ? opacity : 0.3})`; // Reduced from 0.9 to 0.3
        ctx.fill();
        
        // Add very simple motion trail as small dots
        if (Math.abs(particle.x - particle.prevX) > 0.1 || Math.abs(particle.y - particle.prevY) > 0.1) {
          // Just draw a smaller dot at previous position
          ctx.beginPath();
          ctx.arc(particle.prevX, particle.prevY, particle.size * 0.5 * pulseFactor, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${particle.r}, ${particle.g}, ${particle.b}, ${isDarkTheme ? opacity * 0.2 : opacity * 0.3})`;
          ctx.fill();
        }
        
        // Update position
        const speedFactor = deltaTime / 16.67; // Normalize to 60fps
        particle.x += particle.speedX * speedFactor;
        particle.y += particle.speedY * speedFactor;
        
        // Update opacity
        particle.opacity += particle.opacitySpeed * speedFactor;
        if (particle.opacity <= 0.6 || particle.opacity >= 0.9) {
          particle.opacitySpeed = -particle.opacitySpeed;
        }
        
        // Wrap around screen edges
        const buffer = particle.size * 2;
        if (particle.x < -buffer) particle.x = canvas.width / window.devicePixelRatio + buffer;
        if (particle.x > canvas.width / window.devicePixelRatio + buffer) particle.x = -buffer;
        if (particle.y < -buffer) particle.y = canvas.height / window.devicePixelRatio + buffer;
        if (particle.y > canvas.height / window.devicePixelRatio + buffer) particle.y = -buffer;
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };

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
  }, [particleCount, particleColor, minSize, maxSize, speed, glowIntensity, isDarkTheme]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none opacity-100", className)}
      aria-hidden="true"
      style={{ 
        background: 'transparent', 
        mixBlendMode: 'normal',
        zIndex: -3,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
        visibility: 'visible',
        filter: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
    />
  );
} 