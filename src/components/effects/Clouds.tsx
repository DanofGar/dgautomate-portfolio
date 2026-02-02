'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CloudProps {
  delay?: number;
  duration?: number;
  yOffset?: number;
  size?: 'small' | 'medium' | 'large';
  opacity?: number;
}

function Cloud({ delay = 0, duration = 60, yOffset = 0, size = 'medium', opacity = 0.3 }: CloudProps) {
  const sizeClasses = {
    small: 'w-32 h-16',
    medium: 'w-48 h-24',
    large: 'w-64 h-32',
  };

  return (
    <motion.div
      className={cn(
        'absolute rounded-full blur-2xl',
        'bg-gradient-to-br from-sky-cream/50 to-sky-light/30',
        sizeClasses[size]
      )}
      style={{
        top: `${yOffset}%`,
        opacity,
      }}
      animate={{
        x: ['0%', '100vw'],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
        delay,
      }}
    />
  );
}

export function Clouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Multiple cloud layers for depth */}
      <Cloud delay={0} duration={80} yOffset={10} size="large" opacity={0.2} />
      <Cloud delay={15} duration={100} yOffset={25} size="medium" opacity={0.25} />
      <Cloud delay={30} duration={90} yOffset={40} size="small" opacity={0.3} />
      <Cloud delay={45} duration={110} yOffset={15} size="medium" opacity={0.2} />
      <Cloud delay={60} duration={95} yOffset={35} size="large" opacity={0.25} />
      <Cloud delay={75} duration={105} yOffset={20} size="small" opacity={0.3} />
    </div>
  );
}
