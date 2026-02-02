'use client';

import { motion } from 'framer-motion';
import { SkillCard } from '@/components/ui/SkillCard';
import { cn } from '@/lib/utils';

export function CoastalOverlook() {
  const systemsSkills = [
    'API integrations & workflow automation',
    'AI-powered systems & tooling',
    'Process optimization & efficiency',
    'Technical documentation & training',
  ];

  return (
    <section
      className={cn(
        'relative min-h-screen w-full',
        'flex flex-col items-center justify-center',
        'bg-gradient-to-b from-ground-gray via-sky-dark to-sky',
        'py-24 px-4',
        'overflow-hidden'
      )}
    >
      {/* Ocean horizon in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Distant ocean */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0',
            'h-1/3',
            'bg-gradient-to-b from-sky-dark to-sky',
            'opacity-40'
          )}
        />

        {/* Gentle waves */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              'absolute',
              'bg-gradient-to-r from-transparent via-sky-light/30 to-transparent',
              'h-1'
            )}
            style={{
              bottom: `${5 + i * 3}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 1.5,
            }}
          />
        ))}

        {/* Coastal vegetation silhouettes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`plant-${i}`}
            className={cn(
              'absolute bottom-0',
              'bg-gradient-to-t from-ground-sage to-transparent',
              'rounded-t-full opacity-20'
            )}
            style={{
              left: `${15 + i * 15}%`,
              width: `${30 + Math.random() * 20}px`,
              height: `${20 + Math.random() * 15}%`,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.2, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            The Coastal Overlook
          </h2>
          <p className="text-xl text-foreground/80 font-medium">
            Systems & Automation · Connecting the dots
          </p>
          <p className="text-sm text-foreground/60 mt-2 font-mono">Sea Level • 0 ft</p>
        </motion.div>

        {/* Skill card */}
        <div className="max-w-2xl mx-auto">
          <SkillCard title="Systems & Automation" items={systemsSkills} delay={0.3} />
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
            'bg-background/60 backdrop-blur-sm',
            'border border-foreground/10',
            'max-w-2xl mx-auto'
          )}
        >
          <p className="text-foreground/70 text-sm">
            <span className="font-semibold text-foreground">Indeed Flex:</span> Built Claude-powered
            automation tools to streamline team workflows, reducing manual tasks by 60% and enabling
            faster response times
          </p>
        </motion.div>

        {/* Hint about going underground */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 1.5,
            }}
          className="mt-16"
        >
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-foreground/40 text-sm"
          >
            ↓ Keep scrolling... there&apos;s more below ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
