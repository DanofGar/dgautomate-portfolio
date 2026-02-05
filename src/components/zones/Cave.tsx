'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Cave() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/cave/cave-transition-v3.png"
          alt="Sea cave interior"
          fill
          className="object-cover object-center"
          quality={90}
        />
        {/* Top gradient from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
        {/* Overall darkening vignette */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content - centered with backdrop */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center max-w-md"
        >
          {/* Text container with backdrop */}
          <div className="bg-black/60 backdrop-blur-sm rounded-xl px-8 py-6">
            <p
              className={cn(
                'font-body text-lg md:text-xl',
                'text-warm-white text-shadow-readable'
              )}
            >
              Looks like this is the end of the trail...
            </p>
            <p
              className={cn(
                'font-body text-sm md:text-base mt-3',
                'text-warm-white/70'
              )}
            >
              Or is it?
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
