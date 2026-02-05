'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Forest() {
  return (
    <section className="relative h-screen w-full overflow-hidden scroll-snap-align-start">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/forest/forest-background-v3.png"
          alt="Redwood forest canopy"
          fill
          className="object-cover object-center"
          quality={90}
        />
        {/* Top gradient from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
        {/* Bottom gradient for transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black/60" />
      </div>

      {/* Content - Left side with strong backdrop */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg"
        >
          {/* Text container with backdrop */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 md:p-8">
            <h2
              className={cn(
                'font-serif text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6',
                'text-warm-white text-shadow-readable'
              )}
            >
              People First
            </h2>
            <p
              className={cn(
                'font-body text-base md:text-lg lg:text-xl leading-relaxed',
                'text-warm-white/90'
              )}
            >
              I started in sales, which means I spent years learning to actually listen.
              Turns out that skill transfers pretty well to understanding what systems need to do.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
