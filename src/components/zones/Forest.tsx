// src/components/zones/Forest.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Forest() {
  return (
    <section className="zone relative min-h-screen w-full overflow-hidden scroll-snap-align-start">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/forest/forest-background-v3.png"
          alt="Redwood forest canopy"
          fill
          className="object-cover"
          quality={90}
        />
      </div>

      {/* Vignette scrim for text area */}
      <div className="absolute inset-0 z-5 scrim-vignette" />

      {/* Content - Left side (darker canopy area) */}
      <div className="relative z-10 min-h-screen flex items-center px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg"
        >
          <h2
            className={cn(
              'font-serif text-3xl md:text-5xl font-bold mb-6',
              'text-warm-white text-shadow-readable'
            )}
          >
            People First
          </h2>
          <p
            className={cn(
              'font-body text-lg md:text-xl leading-relaxed',
              'text-warm-white text-shadow-readable'
            )}
          >
            I started in sales, which means I spent years learning to actually listen.
            Turns out that skill transfers pretty well to understanding what systems need to do.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
