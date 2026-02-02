'use client';

import { motion } from 'framer-motion';
import { Parallax } from '@/components/effects/Parallax';
import { cn } from '@/lib/utils';
import { Groundhog } from '@/components/ui/Groundhog';

interface UndergroundBurrowsProps {
  onGroundhogDig?: () => void;
}

export function UndergroundBurrows({ onGroundhogDig }: UndergroundBurrowsProps) {
  return (
    <section
      className={cn(
        'relative min-h-screen w-full',
        'flex flex-col items-center justify-end',
        'bg-gradient-to-b from-underground-amber via-underground-brown to-underground-soil',
        'py-24 px-4',
        'overflow-hidden'
      )}
    >
      {/* Deliberate tunnel network */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main horizontal tunnels with parallax */}
        {[
          { y: 20, width: 60, left: 20, speed: 0.4 },
          { y: 35, width: 70, left: 10, speed: 0.5 },
          { y: 55, width: 50, left: 30, speed: 0.6 },
          { y: 70, width: 65, left: 15, speed: 0.7 },
        ].map((tunnel, i) => (
          <Parallax key={`tunnel-${i}`} speed={tunnel.speed}>
            <motion.div
              className="absolute"
              style={{
                top: `${tunnel.y}%`,
                left: `${tunnel.left}%`,
                width: `${tunnel.width}%`,
                height: '80px',
              }}
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: i * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Tunnel interior */}
              <div
                className={cn(
                  'w-full h-full rounded-full',
                  'bg-underground-soil/60',
                  'border-2 border-underground-brown/40',
                  'shadow-inner'
                )}
                style={{
                  boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.6)',
                }}
              />
            </motion.div>
          </Parallax>
        ))}

        {/* Vertical shafts connecting tunnels with parallax */}
        {[
          { x: 35, top: 20, height: 15, speed: 0.5 },
          { x: 50, top: 35, height: 20, speed: 0.6 },
          { x: 25, top: 55, height: 15, speed: 0.4 },
        ].map((shaft, i) => (
          <Parallax key={`shaft-${i}`} speed={shaft.speed}>
            <motion.div
              className="absolute"
              style={{
                left: `${shaft.x}%`,
                top: `${shaft.top}%`,
                width: '60px',
                height: `${shaft.height}%`,
              }}
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.6 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className={cn(
                  'w-full h-full rounded-full',
                  'bg-underground-soil/60',
                  'border-2 border-underground-brown/40',
                  'shadow-inner'
                )}
                style={{
                  boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.6)',
                }}
              />
            </motion.div>
          </Parallax>
        ))}

        {/* Activity signs - small debris piles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`debris-${i}`}
            className={cn(
              'absolute rounded-full',
              'bg-underground-brown/40',
              'backdrop-blur-sm'
            )}
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${25 + Math.random() * 50}%`,
              width: `${12 + Math.random() * 16}px`,
              height: `${8 + Math.random() * 10}px`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 1 + i * 0.1,
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
          />
        ))}

        {/* Scratch marks on tunnel walls */}
        {[...Array(6)].map((_, i) => {
          const tunnelY = [20, 35, 55, 70][Math.floor(i / 1.5)];
          return (
            <motion.div
              key={`scratch-${i}`}
              className="absolute"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${tunnelY + Math.random() * 5}%`,
                width: `${15 + Math.random() * 20}px`,
                height: '3px',
                background: 'hsl(35, 30%, 20%)',
                opacity: 0.3,
                transform: `rotate(${-15 + Math.random() * 30}deg)`,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 1.5 + i * 0.08,
              }}
            />
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-32">
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
            Something&apos;s Been Here
          </h2>
          <p className="text-xl text-foreground/70 font-medium mb-2">
            Deliberate tunnels, signs of activity
          </p>
          <p className="text-sm text-foreground/50 font-mono">-50 ft</p>
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
          These aren&apos;t random. Someone&apos;s been working down here, building something purposeful.
        </motion.p>
      </div>

      {/* Groundhog - interactive element */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 1,
          type: 'spring',
          stiffness: 100,
          damping: 15,
        }}
        className="relative z-20 mb-12"
      >
        <Groundhog onDig={onGroundhogDig} />
      </motion.div>
    </section>
  );
}
