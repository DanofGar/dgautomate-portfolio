// src/components/zones/Cave.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Cave() {
  return (
    <section className="zone relative h-screen w-full overflow-hidden scroll-snap-align-start">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/cave/cave-transition-v3.png"
          alt="Sea cave interior"
          fill
          className="object-cover"
          quality={90}
        />
      </div>

      {/* Darker vignette for cave atmosphere */}
      <div
        className="absolute inset-0 z-5"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, transparent 0%, rgba(0,0,0,0.6) 100%)'
        }}
      />

      {/* Content - centered, mysterious */}
      <div className="relative z-10 h-full flex items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center max-w-md"
        >
          <p
            className={cn(
              'font-body text-lg md:text-xl',
              'text-warm-white/70 text-shadow-readable'
            )}
          >
            Looks like this is the end of the trail...
          </p>
          <p
            className={cn(
              'font-body text-sm mt-4',
              'text-warm-white/50'
            )}
          >
            Or is it?
          </p>
        </motion.div>
      </div>
    </section>
  );
}
