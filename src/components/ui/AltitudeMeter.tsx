'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { scrollToAltitude, getAltitudeLabel, getZoneFromScroll } from '@/lib/scroll-utils';
import { cn } from '@/lib/utils';

export function AltitudeMeter() {
  const [altitude, setAltitude] = useState(500);
  const [zone, setZone] = useState('sky');
  const [isVisible, setIsVisible] = useState(true);

  // Smooth spring animation for altitude changes
  const animatedAltitude = useSpring(altitude, {
    stiffness: 100,
    damping: 20,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      const newAltitude = scrollToAltitude(scrollY, documentHeight);
      const newZone = getZoneFromScroll(scrollY, documentHeight);

      setAltitude(newAltitude);
      setZone(newZone);
    };

    // Initial calculation
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Subscribe to the animated value to update display
    const unsubscribe = animatedAltitude.on('change', (latest) => {
      // Smooth updates handled by framer-motion
    });

    return () => unsubscribe();
  }, [animatedAltitude]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={cn(
        'fixed top-8 right-8 z-50',
        'flex flex-col items-end gap-2',
        'pointer-events-none select-none'
      )}
    >
      {/* Main altitude display */}
      <motion.div
        className={cn(
          'px-6 py-3 rounded-soft',
          'bg-background/80 backdrop-blur-sm',
          'border border-foreground/10',
          'shadow-layered'
        )}
      >
        <motion.div
          key={Math.floor(altitude / 10)} // Re-render on significant changes
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-2xl font-bold font-mono text-foreground"
        >
          {getAltitudeLabel(Math.round(altitude))}
        </motion.div>
      </motion.div>

      {/* Zone indicator */}
      <motion.div
        className={cn(
          'px-4 py-2 rounded-soft',
          'bg-background/60 backdrop-blur-sm',
          'border border-foreground/5',
          'text-sm text-foreground/70 font-medium capitalize'
        )}
        key={zone}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {zone}
      </motion.div>
    </motion.div>
  );
}
