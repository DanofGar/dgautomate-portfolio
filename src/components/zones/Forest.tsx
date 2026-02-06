'use client';

import { useState } from 'react';
import { getImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const experience = [
  {
    company: 'Indeed Flex',
    role: 'Sales Operations Manager / BDR',
    period: '2024 – 2025',
    location: 'Austin, TX',
    blurb: 'Built AI-powered research and prioritization systems. Full-cycle sales for mid-market accounts.',
  },
  {
    company: 'GigaCloud Technology',
    role: 'Sr. Account Manager',
    period: '2023',
    location: 'Chatsworth, CA',
    blurb: 'Managed Overstock, Lowe\'s, and eBay accounts. Brand & category management across $100M+ annual GMV.',
  },
  {
    company: 'FloraFlex',
    role: 'Wholesale Account Manager',
    period: '2021 – 2022',
    location: 'Chatsworth, CA',
    blurb: '$15M wholesale channel. Led international expansion into EU and Mexico.',
  },
  {
    company: 'GAIACA',
    role: 'Sr. Account Executive',
    period: '2020 – 2021',
    location: 'CA',
    blurb: 'Enterprise sales and account growth in a fast-moving startup.',
  },
  {
    company: 'Greater Conejo Valley Chamber',
    role: 'Government Affairs & Tourism Manager',
    period: '2018 – 2020',
    location: 'Thousand Oaks, CA',
    blurb: 'Where it all started — government affairs, community engagement, and learning how organizations actually work.',
  },
];

export function Forest() {
  const [expanded, setExpanded] = useState(false);
  const common = { alt: 'Redwood forest canopy', quality: 90, sizes: '100vw' };

  const { props: { srcSet: desktop, ...rest } } = getImageProps({
    ...common,
    width: 1920,
    height: 1080,
    src: '/assets/forest/forest-background-v3.png',
  });
  const { props: { srcSet: mobile } } = getImageProps({
    ...common,
    width: 768,
    height: 1376,
    src: '/assets/forest/forest-background-v3-portrait.png',
  });

  return (
    <section className="relative min-h-screen w-full overflow-hidden scroll-snap-align-start">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktop} />
          <source srcSet={mobile} />
          <img
            {...rest}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </picture>
        {/* Top gradient from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
        {/* Bottom gradient for transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center px-6 md:px-16 py-20">
        <div className="max-w-lg">
          {/* Intro card */}
          <div className="bg-black/30 hover:bg-black/60 active:bg-black/60 backdrop-blur-sm rounded-xl p-6 md:p-8 transition-colors duration-300 cursor-default">
            <h2
              className={cn(
                'font-serif text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6',
                'text-warm-white text-shadow-readable'
              )}
            >
              The Paths I&apos;ve Taken
            </h2>
            <p
              className={cn(
                'font-body text-base md:text-lg lg:text-xl leading-relaxed',
                'text-warm-white/90'
              )}
            >
              I&apos;ve done a little bit of everything&mdash;government affairs,
              sales, account management, operations. Every role looked different,
              but the through line was always the same: figure out how things
              work, then make them work better.
            </p>

            {/* Toggle button */}
            <button
              onClick={() => setExpanded(!expanded)}
              className={cn(
                'mt-4 font-body text-sm md:text-base',
                'text-warm-white/70 hover:text-warm-white transition-colors duration-200',
                'underline underline-offset-4 decoration-warm-white/30 hover:decoration-warm-white/60'
              )}
            >
              {expanded ? 'Hide experience ↑' : 'See my experience ↓'}
            </button>
          </div>

          {/* Expandable experience panel */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-3">
                  {experience.map((job) => (
                    <div
                      key={job.company}
                      className="bg-black/40 backdrop-blur-sm rounded-lg p-4 md:p-5"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 mb-1">
                        <h3 className="font-serif text-lg md:text-xl font-bold text-warm-white">
                          {job.company}
                        </h3>
                        <span className="font-body text-xs md:text-sm text-warm-white/50">
                          {job.period}
                        </span>
                      </div>
                      <p className="font-body text-sm md:text-base text-warm-white/70 mb-1">
                        {job.role} &middot; {job.location}
                      </p>
                      <p className="font-body text-sm md:text-base text-warm-white/80 leading-relaxed">
                        {job.blurb}
                      </p>
                    </div>
                  ))}
                  {/* Education */}
                  <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 md:p-5">
                    <h3 className="font-serif text-lg md:text-xl font-bold text-warm-white mb-1">
                      Education
                    </h3>
                    <p className="font-body text-sm md:text-base text-warm-white/80">
                      B.A. Psychology, CSU Channel Islands
                    </p>
                    <p className="font-body text-sm md:text-base text-warm-white/60 mt-1">
                      + Business Law, Entrepreneurial Management, Human-Computer Interaction, IT
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
