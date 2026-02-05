'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useScrollJail } from './ScrollJailProvider';

interface OtterKeyProps {
  /** Position relative to parent container */
  position?: { x: string; y: string };
  /** Size of the otter hitbox */
  size?: { width: number; height: number };
}

export function OtterKey({
  position = { x: '75%', y: '60%' },
  size = { width: 120, height: 80 },
}: OtterKeyProps) {
  const { state, unlockDatacenter } = useScrollJail();
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for "otter looks at cursor"
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the mouse tracking
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Transform mouse position to subtle rotation (-5 to 5 degrees)
  const rotateX = useTransform(smoothMouseY, [-200, 200], [3, -3]);
  const rotateY = useTransform(smoothMouseX, [-200, 200], [-5, 5]);

  // Beacon pulse animation
  const pulseVariants = {
    idle: {
      filter: 'drop-shadow(0 0 0px rgba(255, 200, 100, 0))',
      scale: 1,
    },
    hover: {
      filter: [
        'drop-shadow(0 0 8px rgba(255, 200, 100, 0.6))',
        'drop-shadow(0 0 20px rgba(255, 200, 100, 0.9))',
        'drop-shadow(0 0 8px rgba(255, 200, 100, 0.6))',
      ],
      scale: 1.05,
      transition: {
        filter: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        },
        scale: {
          duration: 0.3,
        },
      },
    },
    clicked: {
      filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 1))',
      scale: 1.2,
      transition: { duration: 0.2 },
    },
  };

  // Track mouse position relative to otter
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleClick = () => {
    if (state !== 'locked') return;
    unlockDatacenter();
  };

  // Don't render if already unlocked
  if (state === 'unlocked') return null;

  return (
    <motion.div
      ref={containerRef}
      className="absolute cursor-pointer z-20"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        transform: 'translate(-50%, -50%)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      initial="idle"
      animate={state === 'transitioning' ? 'clicked' : isHovered ? 'hover' : 'idle'}
      variants={pulseVariants}
    >
      {/* Otter Image - will be replaced with actual asset */}
      <motion.div
        className="w-full h-full relative"
        style={{
          rotateX,
          rotateY,
          transformPerspective: 500,
        }}
      >
        {/* Placeholder - replace with actual otter image */}
        <img
          src="/assets/cave/otter-key.png"
          alt=""
          className="w-full h-full object-contain pointer-events-none select-none"
          draggable={false}
        />

        {/* Subtle idle animation - breathing/bobbing */}
        <motion.div
          className="absolute inset-0"
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Tooltip - "Go Deeper?" */}
      <motion.div
        className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-slate-900/90 backdrop-blur-sm text-amber-100 text-sm px-3 py-1.5 rounded-lg border border-amber-500/30 shadow-lg">
          <span className="opacity-70">Go deeper?</span>
        </div>
        {/* Tooltip arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-900/90" />
      </motion.div>
    </motion.div>
  );
}
