// src/components/zones/CoastalOverlook.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function CoastalOverlook() {
  return (
    <section className="zone relative h-screen w-full overflow-hidden scroll-snap-align-start">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/coastal/coastal-overlook-v3.png"
          alt="Big Sur coastal overlook"
          fill
          className="object-cover"
          quality={90}
        />
      </div>

      {/* Vignette scrim */}
      <div className="absolute inset-0 z-5 scrim-vignette" />

      {/* Content - Left side */}
      <div className="relative z-10 h-full flex items-center px-8 md:px-16">
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
            The Automation Obsession
          </h2>
          <p
            className={cn(
              'font-body text-lg md:text-xl leading-relaxed',
              'text-warm-white text-shadow-readable'
            )}
          >
            Now I spend my time teaching computers to do the boring stuff
            so humans can do the interesting stuff. It&apos;s basically
            professional laziness, but productive.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
