'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BorderBeam } from '@/components/ui/border-beam';
import { Particles } from '@/components/ui/particles';

// Wildlife archived per DESIGN_DECISIONS.md - landscapes only
const storyContent = [
  {
    title: 'People First',
    description:
      "I started in sales, which means I spent years learning to actually listen. Turns out that skill transfers pretty well to understanding what systems need to do.",
    background: '/assets/forest/forest-background-v2.png',
    beamColor: { from: '#F59E0B', to: '#D97706' }, // Amber
    particles: { color: '#FEF3C7', quantity: 30 }, // Pale yellow pollen
  },
  {
    title: 'Breaking Things (On Purpose)',
    description:
      "I like taking systems apart to see how they work. Then I put them back together better. Usually. The failures taught me more than the wins.",
    background: '/assets/rocky/rocky-climb-v2.png',
    beamColor: { from: '#D97706', to: '#B45309' }, // Earth tones
    particles: null, // No particles for rocky
  },
  {
    title: 'The Automation Obsession',
    description:
      "Now I spend my time teaching computers to do the boring stuff so humans can do the interesting stuff. It's basically professional laziness, but productive.",
    background: '/assets/coastal/coastal-overlook-v2.png',
    beamColor: { from: '#0EA5E9', to: '#0284C7' }, // Ocean blue
    particles: { color: '#E0F2FE', quantity: 40, vy: -0.3 }, // White/blue mist rising
  },
];

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const sectionCount = storyContent.length;
    const newIndex = Math.min(
      Math.floor(latest * sectionCount),
      sectionCount - 1
    );
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  const currentContent = storyContent[activeIndex];

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${storyContent.length * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background images - crossfade between them */}
        {storyContent.map((content, index) => (
          <motion.div
            key={content.title}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === activeIndex ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={content.background}
              alt={content.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        ))}

        {/* Particles overlay */}
        {currentContent.particles && (
          <Particles
            className="absolute inset-0 z-10"
            color={currentContent.particles.color}
            quantity={currentContent.particles.quantity}
            vy={currentContent.particles.vy || 0}
            size={1.5}
            staticity={30}
          />
        )}

        {/* Content layout - split screen */}
        <div className="relative z-20 h-full flex items-center">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left side - Glass card with text */}
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div
                  className={cn(
                    'relative p-8 rounded-2xl',
                    'bg-black/40 backdrop-blur-md',
                    'border border-white/10'
                  )}
                >
                  {/* Border Beam */}
                  <BorderBeam
                    size={200}
                    duration={12}
                    colorFrom={currentContent.beamColor.from}
                    colorTo={currentContent.beamColor.to}
                    borderWidth={2}
                  />

                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {currentContent.title}
                  </h2>
                  <p className="text-lg text-white/80 leading-relaxed">
                    {currentContent.description}
                  </p>
                </div>
              </motion.div>

              {/* Right side - Reserved for future visual elements */}
              <div className="hidden lg:block" />
            </div>
          </div>
        </div>

        {/* Section indicator dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          {storyContent.map((_, index) => (
            <motion.div
              key={index}
              className={cn(
                'w-2 h-2 rounded-full transition-colors duration-300',
                index === activeIndex
                  ? 'bg-white'
                  : 'bg-white/30'
              )}
              animate={{
                scale: index === activeIndex ? 1.5 : 1,
              }}
            />
          ))}
        </div>

        {/* Bottom gradient transition to datacenter */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(26, 26, 26, 0.8))',
          }}
        />
      </div>
    </section>
  );
}

