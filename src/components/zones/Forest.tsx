'use client';

import { motion } from 'framer-motion';
import { SkillCard } from '@/components/ui/SkillCard';
import { cn } from '@/lib/utils';

export function Forest() {
  const operationsSkills = [
    'Payment processing & reconciliation',
    'Client relationship management',
    'Logistics & inventory flow',
    'Cross-functional team coordination',
  ];

  return (
    <section
      className={cn(
        'relative min-h-screen w-full',
        'flex flex-col items-center justify-center',
        'bg-gradient-to-b from-sky-cream via-ground-sage to-ground-tan',
        'py-24 px-4',
        'overflow-hidden'
      )}
    >
      {/* Tree silhouettes in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {/* Tall trees - using vertical gradients */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              'absolute bottom-0',
              'bg-gradient-to-t from-underground-brown via-underground-amber to-transparent',
              'rounded-t-full'
            )}
            style={{
              left: `${10 + i * 12}%`,
              width: `${40 + Math.random() * 30}px`,
              height: `${60 + Math.random() * 40}%`,
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 0.2, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: i * 0.1,
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
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-background mb-4">
            The Forest
          </h2>
          <p className="text-xl text-background/80 font-medium">
            Operations · Building systems that scale
          </p>
        </motion.div>

        {/* Skill card */}
        <div className="max-w-2xl mx-auto">
          <SkillCard title="Operations Expertise" items={operationsSkills} delay={0.3} />
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
            <span className="font-semibold text-background">FloraFlex:</span> Managed payment
            processing for 4,000+ active accounts, coordinating logistics and client relationships
            across wholesale operations
          </p>
        </motion.div>
      </div>
    </section>
  );
}
