'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  overlay?: boolean;
  overlayClassName?: string;
}

export function VideoBackground({
  src,
  poster,
  className,
  overlay = true,
  overlayClassName,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    // Use Intersection Observer to play/pause based on visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay blocked - that's ok, poster will show
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // If reduced motion, just show poster
  if (prefersReducedMotion && poster) {
    return (
      <div className={cn('absolute inset-0', className)}>
        <Image
          src={poster}
          alt=""
          fill
          className="object-cover"
          unoptimized
        />
        {overlay && (
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/60',
              overlayClassName
            )}
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn('absolute inset-0', className)}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        onLoadedData={() => setIsLoaded(true)}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      >
        <source src={src} type="video/mp4" />
        {/* Add WebM source for better browser support */}
        {src.replace('.mp4', '.webm') !== src && (
          <source src={src.replace('.mp4', '.webm')} type="video/webm" />
        )}
      </video>

      {/* Poster fallback while loading */}
      {!isLoaded && poster && (
        <Image
          src={poster}
          alt=""
          fill
          className="object-cover"
          unoptimized
        />
      )}

      {/* Optional overlay for text readability */}
      {overlay && (
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/60',
            overlayClassName
          )}
        />
      )}
    </div>
  );
}
