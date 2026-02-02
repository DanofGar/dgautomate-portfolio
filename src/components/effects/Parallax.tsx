'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // 1 = normal scroll, <1 = slower (background), >1 = faster (foreground)
  className?: string;
}

export function Parallax({ children, speed = 0.5, className = '' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Transform scroll progress to Y position
  // Speed < 1 means slower than scroll (background)
  // Speed > 1 means faster than scroll (foreground)
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${(1 - speed) * 100}%`]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
