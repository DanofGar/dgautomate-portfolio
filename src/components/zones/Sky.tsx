// src/components/zones/Sky.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Sky() {
  return (
    <section className="zone relative h-screen w-full overflow-hidden scroll-snap-align-start">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/sky/sky-background-v3.png"
          alt="California sky at golden hour"
          fill
          className="object-cover object-bottom"
          priority
          quality={90}
        />
      </div>

      {/* Name - Top Right per spec */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-8 right-8 md:top-12 md:right-12 z-10"
      >
        <h1
          className={cn(
            'font-serif text-4xl md:text-6xl lg:text-7xl font-bold',
            'text-warm-white text-shadow-readable',
            'text-right'
          )}
        >
          Daniel Garcia
        </h1>
      </motion.div>

      {/* Hook line - Center bottom area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-32 left-0 right-0 z-10 px-8"
      >
        <p
          className={cn(
            'font-body text-xl md:text-2xl',
            'text-warm-white text-shadow-readable',
            'text-center max-w-2xl mx-auto'
          )}
        >
          I build systems that work while I sleep.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
