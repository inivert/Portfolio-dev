"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface VideoPlayerProps {
  videoSrc: string;
  className?: string;
}

export function VideoPlayer({ videoSrc, className }: VideoPlayerProps) {
  const [isInView, setIsInView] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate thumbnail path with SVG extension
  const videoName = videoSrc.split('/').pop()?.replace('.mp4', '') || '';
  const thumbnailSrc = thumbnailError ? 
    '/videos/thumbnails/placeholder.svg' : 
    `/videos/thumbnails/${videoName}-thumb.svg`;

  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;

    // Create intersection observer to detect when video is in viewport
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '100px', // Start loading video when it's 100px from viewport
        threshold: 0.1,
      }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Handle loading video when in view
  useEffect(() => {
    if (isInView && videoRef.current && !isVideoLoaded) {
      videoRef.current.src = videoSrc;
      videoRef.current.load();
      videoRef.current.play().catch(error => {
        console.error("Video playback failed:", error);
      });
      setIsVideoLoaded(true);
    }
  }, [isInView, videoSrc, isVideoLoaded]);

  return (
    <div ref={containerRef} className={`relative h-full w-full overflow-hidden ${className || ''}`}>
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-muted/10 animate-pulse flex items-center justify-center">
          <Image 
            src={thumbnailSrc}
            alt="Video thumbnail"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover media-element"
            priority={false}
            onError={() => setThumbnailError(true)}
            style={{ 
              imageRendering: 'auto', 
              filter: 'blur(0.3px)',
              transform: 'translate3d(0, 0, 0)',
              willChange: 'auto'
            }}
          />
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="object-cover h-full w-full media-element"
        style={{ 
          objectFit: 'cover', 
          width: '100%', 
          height: '100%', 
          imageRendering: 'auto',
          filter: 'blur(0.3px)',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'auto',
          backfaceVisibility: 'visible'
        }}
      />
    </div>
  );
} 