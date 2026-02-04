'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ZoneType = 'sky' | 'forest' | 'rocky' | 'coastal' | 'burrows' | 'datacenter';

interface ZoneBackgroundProps {
  zone: ZoneType;
  children: ReactNode;
  className?: string;
  showAtmosphere?: boolean;
}

// Background image paths
const backgrounds: Record<ZoneType, string> = {
  sky: '/assets/sky/sky-background-v2.png',
  forest: '/assets/forest/forest-background-v2.png',
  rocky: '/assets/rocky/rocky-climb-v2.png',
  coastal: '/assets/coastal/coastal-overlook-v2.png',
  burrows: '/assets/burrows/underground-transition-v2.png',
  datacenter: '/assets/datacenter/datacenter-background-v3.png',
};

// Gradient transitions (bottom of zone fading into next)
const bottomGradients: Record<ZoneType, string> = {
  sky: 'linear-gradient(to bottom, transparent 0%, rgba(45, 80, 50, 0.3) 50%, rgba(30, 50, 35, 0.7) 100%)',
  forest: 'linear-gradient(to bottom, transparent 0%, rgba(90, 70, 50, 0.3) 50%, rgba(120, 90, 60, 0.6) 100%)',
  rocky: 'linear-gradient(to bottom, transparent 0%, rgba(60, 90, 80, 0.3) 50%, rgba(50, 80, 90, 0.5) 100%)',
  coastal: 'linear-gradient(to bottom, transparent 0%, rgba(80, 60, 40, 0.4) 50%, rgba(60, 45, 30, 0.8) 100%)',
  burrows: 'linear-gradient(to bottom, transparent 0%, rgba(40, 50, 60, 0.5) 50%, rgba(20, 30, 45, 0.85) 100%)',
  datacenter: 'none',
};

// Gradient transitions (top of zone receiving from previous)
const topGradients: Record<ZoneType, string> = {
  sky: 'none',
  forest: 'linear-gradient(to bottom, rgba(30, 50, 35, 0.7) 0%, rgba(30, 50, 35, 0.3) 50%, transparent 100%)',
  rocky: 'linear-gradient(to bottom, rgba(120, 90, 60, 0.6) 0%, rgba(90, 70, 50, 0.3) 50%, transparent 100%)',
  coastal: 'linear-gradient(to bottom, rgba(50, 80, 90, 0.5) 0%, rgba(60, 90, 80, 0.3) 50%, transparent 100%)',
  burrows: 'linear-gradient(to bottom, rgba(60, 45, 30, 0.8) 0%, rgba(80, 60, 40, 0.4) 50%, transparent 100%)',
  datacenter: 'linear-gradient(to bottom, rgba(20, 30, 45, 0.85) 0%, rgba(40, 50, 60, 0.5) 50%, transparent 100%)',
};

export function ZoneBackground({
  zone,
  children,
  className,
  showAtmosphere = false,
}: ZoneBackgroundProps) {
  return (
    <section
      className={cn(
        'relative min-h-screen w-full overflow-hidden',
        className
      )}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgrounds[zone]})`,
        }}
      />

      {/* Top transition gradient */}
      {topGradients[zone] !== 'none' && (
        <div
          className="absolute top-0 left-0 right-0 h-[20vh] pointer-events-none z-[1]"
          style={{ background: topGradients[zone] }}
        />
      )}

      {/* Bottom transition gradient */}
      {bottomGradients[zone] !== 'none' && (
        <div
          className="absolute bottom-0 left-0 right-0 h-[25vh] pointer-events-none z-[1]"
          style={{ background: bottomGradients[zone] }}
        />
      )}

      {/* Optional atmospheric fog effect */}
      {showAtmosphere && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            x: ['-2%', '2%', '-2%'],
          }}
          transition={{
            duration: 30,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />
      )}

      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
