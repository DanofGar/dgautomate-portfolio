'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GroundhogProps {
  onDig?: () => void;
  className?: string;
}

export function Groundhog({ onDig, className }: GroundhogProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverDuration, setHoverDuration] = useState(0);
  const controls = useAnimation();

  // Track hover duration
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isHovering) {
      interval = setInterval(() => {
        setHoverDuration((prev) => prev + 100);
      }, 100);
    } else {
      setHoverDuration(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovering]);

  // Trigger animations based on hover duration
  useEffect(() => {
    if (hoverDuration === 0) {
      // Reset to idle
      controls.start('idle');
    } else if (hoverDuration < 2000) {
      // Curious state (0-2s)
      controls.start('curious');
    } else {
      // Full beckon (2s+)
      controls.start('beckon');
    }
  }, [hoverDuration, controls]);

  const handleClick = () => {
    if (onDig) {
      // Trigger dig animation then callback
      controls.start('dig').then(() => {
        onDig();
      });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      className={cn(
        'relative focus:outline-none focus:ring-4 focus:ring-amber-500/50 rounded-full',
        'cursor-pointer group',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      aria-label="Discover the secret underground facility"
    >
      {/* Groundhog container */}
      <motion.div
        animate={controls}
        variants={{
          idle: {
            y: 0,
            rotate: 0,
            scale: 1,
          },
          curious: {
            y: -8,
            rotate: [0, -3, 3, -3, 0],
            scale: 1.05,
            transition: {
              y: { type: 'spring', stiffness: 300, damping: 15 },
              rotate: {
                repeat: Infinity,
                duration: 1,
                ease: 'easeInOut',
              },
              scale: { type: 'spring', stiffness: 300, damping: 20 },
            },
          },
          beckon: {
            y: [-8, -16, -8],
            rotate: [0, -10, 10, -10, 10, 0],
            scale: [1.05, 1.1, 1.05],
            transition: {
              repeat: Infinity,
              duration: 1.2,
              ease: 'easeInOut',
            },
          },
          dig: {
            y: 100,
            rotate: 0,
            scale: 0.8,
            transition: {
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }}
        className={cn(
          'w-24 h-24 rounded-full',
          'bg-gradient-to-br from-amber-700 to-amber-900',
          'border-4 border-underground-soil',
          'flex items-center justify-center',
          'shadow-xl relative'
        )}
      >
        {/* Groundhog emoji */}
        <span className="text-4xl">🦫</span>

        {/* Glow effect on beckon */}
        {hoverDuration >= 2000 && (
          <motion.div
            className="absolute inset-0 rounded-full bg-amber-500/30 blur-xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.div>

      {/* Hover hint text */}
      {hoverDuration >= 2000 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
        >
          <div className="bg-underground-brown/90 text-foreground/90 px-4 py-2 rounded-lg text-sm font-medium shadow-lg border border-underground-soil">
            Click to follow me down...
          </div>
        </motion.div>
      )}

      {/* Small paw prints around groundhog (decorative) */}
      {[...Array(4)].map((_, i) => {
        const angle = (i * 90 + 45) * (Math.PI / 180);
        const distance = 60;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return (
          <motion.div
            key={`paw-${i}`}
            className="absolute w-3 h-3 text-underground-brown/40"
            style={{
              left: '50%',
              top: '50%',
              marginLeft: `${x}px`,
              marginTop: `${y}px`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: hoverDuration >= 1000 ? 0.4 : 0,
              scale: hoverDuration >= 1000 ? 1 : 0,
              rotate: i * 45,
            }}
            transition={{
              duration: 0.3,
              delay: i * 0.1,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full"
            >
              <circle cx="12" cy="14" r="3" />
              <circle cx="8" cy="10" r="2" />
              <circle cx="16" cy="10" r="2" />
              <circle cx="10" cy="6" r="1.5" />
              <circle cx="14" cy="6" r="1.5" />
            </svg>
          </motion.div>
        );
      })}
    </motion.button>
  );
}
