'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollJail } from './ScrollJailProvider';

export function TransitionOverlay() {
  const { state } = useScrollJail();
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');

  const fullText = '> ACCESS_GRANTED';

  // Typewriter effect during blackout
  useEffect(() => {
    if (state !== 'transitioning') {
      setShowTypewriter(false);
      setTypewriterText('');
      return;
    }

    // Start typewriter after initial blackout fade-in
    const startDelay = setTimeout(() => {
      setShowTypewriter(true);

      let index = 0;
      const typeInterval = setInterval(() => {
        if (index <= fullText.length) {
          setTypewriterText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    }, 600);

    return () => clearTimeout(startDelay);
  }, [state]);

  return (
    <AnimatePresence>
      {state === 'transitioning' && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
          }}
        >
          {/* Bioluminescent particles transitioning from grey to neon */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 4 + 2,
                  height: Math.random() * 4 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{
                  backgroundColor: 'rgba(150, 150, 150, 0.3)',
                  scale: 0,
                }}
                animate={{
                  backgroundColor: [
                    'rgba(150, 150, 150, 0.3)',
                    'rgba(100, 200, 255, 0.6)',
                    'rgba(0, 255, 150, 0.8)',
                  ],
                  scale: [0, 1.5, 1],
                  y: [0, -100],
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 0.5,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Typewriter terminal text */}
          <AnimatePresence>
            {showTypewriter && (
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="font-mono text-2xl md:text-4xl text-green-400 tracking-wider">
                  {typewriterText}
                  <motion.span
                    className="inline-block w-3 h-8 ml-1 bg-green-400"
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                  />
                </div>

                {/* Scanline effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
