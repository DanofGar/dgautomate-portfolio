'use client';

import { motion } from 'framer-motion';
import { SkillCard } from '@/components/ui/SkillCard';
import { Parallax } from '@/components/effects/Parallax';
import { cn } from '@/lib/utils';

export function RockyClimb() {
  const scaleSkills = [
    'Large account management ($100M+ GMV)',
    'P&L ownership & strategic planning',
    'Navigating chaos & rapid growth',
    'Building scalable processes',
  ];

  return (
    <section
      className={cn(
        'relative min-h-screen w-full',
        'flex flex-col items-center justify-center',
        'bg-gradient-to-b from-ground-tan via-ground-terracotta to-ground-gray',
        'py-24 px-4',
        'overflow-hidden'
      )}
    >
      {/* Rocky terrain in background with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {/* Jagged rock formations - using irregular shapes with varying parallax speeds */}
        {[...Array(12)].map((_, i) => {
          // Create depth by varying parallax speed - closer rocks move faster
          const parallaxSpeed = i % 3 === 0 ? 0.3 : i % 3 === 1 ? 0.5 : 0.8;
          return (
            <Parallax key={i} speed={parallaxSpeed}>
              <motion.div
                className={cn(
                  'absolute bottom-0',
                  'bg-gradient-to-tr from-ground-gray via-ground-terracotta to-ground-tan/50'
                )}
                style={{
                  left: `${i * 10 - 5}%`,
                  width: `${80 + Math.random() * 60}px`,
                  height: `${30 + Math.random() * 40}%`,
                  clipPath: `polygon(
                    ${10 + Math.random() * 20}% 100%,
                    ${20 + Math.random() * 20}% ${40 + Math.random() * 30}%,
                    ${40 + Math.random() * 20}% ${20 + Math.random() * 30}%,
                    ${60 + Math.random() * 20}% ${30 + Math.random() * 30}%,
                    ${80 + Math.random() * 15}% 100%
                  )`,
                }}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 0.3, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </Parallax>
          );
        })}
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
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-background mb-4">
            The Rocky Climb
          </h2>
          <p className="text-xl text-background/80 font-medium">
            Scale & Strategy · Navigating complexity
          </p>
        </motion.div>

        {/* Skill card */}
        <div className="max-w-2xl mx-auto">
          <SkillCard title="Scale & Strategy" items={scaleSkills} delay={0.3} />
        </div>

        {/* Proof point */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.8,
          }}
          className={cn(
            'mt-8 p-4 rounded-soft',
            'bg-background/40 backdrop-blur-sm',
            'border border-foreground/5',
            'max-w-2xl mx-auto'
          )}
        >
          <p className="text-background/70 text-sm">
            <span className="font-semibold text-background">GigaCloud:</span> Led enterprise
            marketplace operations with $100M+ annual GMV, managing complex supplier relationships
            and strategic P&L decisions during hypergrowth
          </p>
        </motion.div>
      </div>
    </section>
  );
}
