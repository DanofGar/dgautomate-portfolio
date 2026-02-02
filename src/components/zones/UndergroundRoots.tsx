'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function UndergroundRoots() {
  return (
    <section
      className={cn(
        'relative min-h-screen w-full',
        'flex flex-col items-center justify-center',
        'bg-gradient-to-b from-underground-soil via-underground-brown to-underground-amber',
        'py-24 px-4',
        'overflow-hidden'
      )}
    >
      {/* Organic root network */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main vertical roots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`root-v-${i}`}
            className={cn('absolute')}
            style={{
              left: `${15 + i * 12}%`,
              top: 0,
              width: `${3 + Math.random() * 4}px`,
              height: '100%',
              background: `linear-gradient(to bottom,
                ${i % 2 === 0 ? 'hsl(25, 40%, 30%)' : 'hsl(35, 60%, 40%)'},
                transparent 80%)`,
              opacity: 0.3 + Math.random() * 0.2,
            }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}

        {/* Horizontal root branches */}
        {[...Array(15)].map((_, i) => {
          const yPos = 10 + Math.random() * 80;
          const xStart = Math.random() * 40;
          const width = 20 + Math.random() * 40;

          return (
            <motion.div
              key={`root-h-${i}`}
              className={cn('absolute rounded-full opacity-20')}
              style={{
                top: `${yPos}%`,
                left: `${xStart}%`,
                width: `${width}%`,
                height: `${2 + Math.random() * 2}px`,
                background: `linear-gradient(to right,
                  transparent,
                  hsl(${25 + Math.random() * 10}, 40%, ${25 + Math.random() * 10}%),
                  transparent)`,
              }}
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1 + Math.random(),
                delay: 0.3 + i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          );
        })}

        {/* Root node bulbs */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className={cn(
              'absolute rounded-full',
              'bg-underground-amber/40',
              'blur-sm'
            )}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              width: `${8 + Math.random() * 12}px`,
              height: `${8 + Math.random() * 12}px`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.8 + i * 0.1,
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground/90 mb-4">
            Beneath the Surface
          </h2>
          <p className="text-xl text-foreground/70 font-medium mb-2">
            Natural systems, organic growth
          </p>
          <p className="text-sm text-foreground/50 font-mono">-20 ft</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.5,
          }}
          className="text-foreground/60 max-w-2xl mx-auto mt-8"
        >
          Like roots that spread beneath the ground, the best systems work quietly, connecting and
          supporting everything above.
        </motion.p>
      </div>
    </section>
  );
}
