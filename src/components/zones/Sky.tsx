'use client';

import { motion } from 'framer-motion';
import { Clouds } from '@/components/effects/Clouds';
import { Parallax } from '@/components/effects/Parallax';
import { cn } from '@/lib/utils';

export function Sky() {
  return (
    <section
      className={cn(
        'relative min-h-screen w-full',
        'flex flex-col items-center justify-center',
        'bg-gradient-to-b from-sky via-sky-light to-sky-cream',
        'overflow-hidden'
      )}
    >
      {/* Animated clouds in background */}
      <Clouds />

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn(
            'text-6xl md:text-8xl font-bold',
            'text-background',
            'mb-4'
          )}
        >
          Daniel Garcia
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn(
            'text-xl md:text-2xl',
            'text-background/80',
            'font-medium'
          )}
        >
          Operations engineer & systems builder
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 1.5,
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={cn(
              'w-8 h-12 rounded-full',
              'border-2 border-background/40',
              'flex items-start justify-center',
              'p-2'
            )}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-background/60"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle sun glow in top corner with parallax */}
      <Parallax speed={0.2} className="absolute inset-0 pointer-events-none">
        <div
          className={cn(
            'absolute top-0 right-0',
            'w-96 h-96 rounded-full',
            'bg-sky-gold/20 blur-3xl'
          )}
          style={{
            transform: 'translate(50%, -50%)',
          }}
        />
      </Parallax>
    </section>
  );
}
