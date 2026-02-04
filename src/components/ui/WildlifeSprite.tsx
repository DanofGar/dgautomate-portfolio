'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface WildlifeSpriteProps {
  src: string;
  alt: string;
  name: string;
  fact?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  className?: string;
}

const sizeMap = {
  xs: { width: 40, height: 40 },
  sm: { width: 60, height: 60 },
  md: { width: 100, height: 100 },
  lg: { width: 150, height: 150 },
};

export function WildlifeSprite({
  src,
  alt,
  name,
  fact,
  size = 'sm',
  position,
  className,
}: WildlifeSpriteProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dimensions = sizeMap[size];

  return (
    <motion.div
      className={cn(
        'absolute z-10 cursor-pointer',
        className
      )}
      style={{
        ...position,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Wildlife image */}
      <motion.div
        animate={{
          filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
        }}
        transition={{ duration: 0.2 }}
      >
        <Image
          src={src}
          alt={alt}
          width={dimensions.width}
          height={dimensions.height}
          className="object-contain drop-shadow-lg"
        />
      </motion.div>

      {/* Tooltip on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute left-1/2 -translate-x-1/2',
              'bottom-full mb-2',
              'bg-black/85 backdrop-blur-sm',
              'text-white px-3 py-2 rounded-lg',
              'text-sm whitespace-nowrap',
              'shadow-lg',
              'pointer-events-none'
            )}
          >
            <p className="font-medium">{name}</p>
            {fact && (
              <p className="text-white/70 text-xs mt-0.5 max-w-[200px] whitespace-normal">
                {fact}
              </p>
            )}
            {/* Tooltip arrow */}
            <div
              className={cn(
                'absolute left-1/2 -translate-x-1/2',
                'top-full',
                'border-4 border-transparent border-t-black/85'
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
