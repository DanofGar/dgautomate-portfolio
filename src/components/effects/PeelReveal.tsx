'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PeelRevealProps {
  isRevealed: boolean;
  children: ReactNode;
  className?: string;
}

export function PeelReveal({ isRevealed, children, className }: PeelRevealProps) {
  return (
    <div className={cn('relative w-full', className)}>
      {/* Content that gets revealed */}
      <div className="relative z-0">
        {children}
      </div>

      {/* Peel layer - the earth that peels away */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            className="absolute inset-0 z-10 origin-bottom overflow-hidden"
            initial={{ rotateX: 0, y: 0 }}
            exit={{
              rotateX: -90,
              y: '-100%',
              originY: 1,
            }}
            transition={{
              duration: 1.5,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.3,
            }}
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Earth texture layer */}
            <div
              className={cn(
                'absolute inset-0',
                'bg-gradient-to-b from-underground-soil via-underground-brown to-underground-amber',
                'border-t-4 border-underground-brown'
              )}
              style={{
                boxShadow: 'inset 0 -8px 32px rgba(0, 0, 0, 0.6)',
              }}
            >
              {/* Soil texture pattern */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(100)].map((_, i) => (
                  <div
                    key={`particle-${i}`}
                    className="absolute rounded-full bg-underground-brown/60"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      width: `${2 + Math.random() * 6}px`,
                      height: `${2 + Math.random() * 6}px`,
                    }}
                  />
                ))}
              </div>

              {/* Root system on underside */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                {/* Tangled roots visible as page peels */}
                {[
                  'M100,0 Q150,100 200,200 T300,400 400,600',
                  'M300,0 Q350,150 400,300 T500,500 600,700',
                  'M500,0 Q550,100 600,200 T700,400 800,600',
                  'M700,0 Q750,150 800,300 T900,500 1000,700',
                ].map((path, i) => (
                  <path
                    key={`root-${i}`}
                    d={path}
                    stroke="hsl(35, 40%, 25%)"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.4"
                  />
                ))}
              </svg>
            </div>

            {/* Edge shadow for depth */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dust/particle effects during peel */}
      <AnimatePresence>
        {isRevealed && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`dust-${i}`}
                className="absolute rounded-full bg-underground-brown/40 pointer-events-none"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 30}%`,
                  width: `${4 + Math.random() * 8}px`,
                  height: `${4 + Math.random() * 8}px`,
                }}
                initial={{
                  opacity: 0,
                  scale: 0,
                  y: 0,
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0.8],
                  y: [0, -50 - Math.random() * 100],
                  x: [-20 + Math.random() * 40, -10 + Math.random() * 20],
                }}
                transition={{
                  duration: 1 + Math.random() * 0.5,
                  delay: 0.3 + Math.random() * 0.4,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
