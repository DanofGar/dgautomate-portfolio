'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  title: string;
  items: string[];
  delay?: number;
  className?: string;
}

export function SkillCard({ title, items, delay = 0, className }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -4,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
        },
      }}
      className={cn(
        'p-6 rounded-soft',
        'bg-background/60 backdrop-blur-sm',
        'border border-foreground/10',
        'shadow-soft hover:shadow-layered',
        'transition-shadow duration-300',
        className
      )}
    >
      <h3 className="text-xl font-bold text-foreground mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: delay + 0.1 + index * 0.1,
            }}
            className="text-foreground/80 flex items-start gap-2"
          >
            <span className="text-ground-sage mt-1">•</span>
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
