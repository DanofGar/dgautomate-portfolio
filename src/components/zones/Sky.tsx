'use client';

import { getImageProps } from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Sky() {
  const common = { alt: 'California sky at golden hour', quality: 90, sizes: '100vw' };

  const { props: { srcSet: desktop, ...rest } } = getImageProps({
    ...common,
    width: 1920,
    height: 1080,
    src: '/assets/sky/sky-background-v3.png',
    priority: true,
  });
  const { props: { srcSet: mobile } } = getImageProps({
    ...common,
    width: 768,
    height: 1365,
    src: '/assets/sky/sky-background-v3-portrait.png',
    priority: true,
  });

  return (
    <section className="relative h-screen w-full overflow-hidden scroll-snap-align-start">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktop} />
          <source srcSet={mobile} />
          <img
            {...rest}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </picture>
        {/* Bottom gradient for transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black/60" />
      </div>

      {/* Name and title - Top Right on desktop, centered on mobile */}
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
        <p
          className={cn(
            'font-body text-base md:text-xl mt-2',
            'text-warm-white/80 text-shadow-readable',
            'text-right'
          )}
        >
          <span className="md:hidden">Sales &amp; Operations<br />AI-Enabled Problem Solver</span>
          <span className="hidden md:inline">Sales &amp; Operations &bull; AI-Enabled Problem Solver</span>
        </p>
        <p
          className={cn(
            'font-body text-sm md:text-base mt-1',
            'text-warm-white/60 text-shadow-readable',
            'text-right'
          )}
        >
          Cincinnati, OH
        </p>
      </motion.div>

      {/* Invitation to explore */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute top-[62%] md:top-[60%] left-0 right-0 md:right-8 md:left-auto z-10 px-6 md:px-8"
      >
        <div className="mx-auto md:ml-auto md:mr-0 max-w-2xl rounded-lg bg-black/40 backdrop-blur-sm px-6 py-4">
          <p
            className={cn(
              'font-body text-lg md:text-2xl',
              'text-warm-white text-shadow-readable',
              'text-center'
            )}
          >
            I solve business problems with AI. Come take a look around.
          </p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
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
