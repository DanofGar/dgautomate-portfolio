'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollJail } from './ScrollJailProvider';
import { OtterKey } from './OtterKey';

interface CaveMouthProps {
  backgroundImage: string;
  otterPosition?: { x: string; y: string };
}

export function CaveMouth({
  backgroundImage = '/assets/cave/cave-transition-v3.png',
  otterPosition = { x: '78%', y: '55%' }, // Position on rocks near water
}: CaveMouthProps) {
  const { state, rubberBandY, caveFloorRef } = useScrollJail();
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effect for the cave background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Zoom effect when transitioning - zoom into where the otter is
  const zoomVariants = {
    locked: {
      scale: 1,
      transformOrigin: `${otterPosition.x} ${otterPosition.y}`,
    },
    transitioning: {
      scale: 5,
      transformOrigin: `${otterPosition.x} ${otterPosition.y}`,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
    unlocked: {
      scale: 1,
      opacity: 0,
      transition: { duration: 0 },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      id="cave-mouth-section"
    >
      {/* Background with zoom effect */}
      <motion.div
        className="absolute inset-0 z-0"
        variants={zoomVariants}
        initial="locked"
        animate={state}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            y: backgroundY,
          }}
        />

        {/* Darken overlay for atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      </motion.div>

      {/* The Otter Key - positioned on the rocks */}
      <OtterKey position={otterPosition} size={{ width: 100, height: 70 }} />

      {/* Rubber band effect container */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ y: rubberBandY }}
      />

      {/* Dead end floor marker (invisible, for scroll detection) */}
      <div
        ref={caveFloorRef}
        className="absolute bottom-0 left-0 right-0 h-1"
        aria-hidden="true"
      />

      {/* Content overlay - could add text here */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end p-8 md:p-16">
        {/* Optional: Hint text that fades after first view */}
        <motion.p
          className="text-amber-100/60 text-sm font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: state === 'locked' ? 0.6 : 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          {/* Something watches from the rocks... */}
        </motion.p>
      </div>
    </section>
  );
}
