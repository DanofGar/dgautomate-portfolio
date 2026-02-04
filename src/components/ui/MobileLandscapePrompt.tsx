'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileLandscapePrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Show prompt in portrait mode on small screens
      const isPortrait = window.innerHeight > window.innerWidth;
      const isSmallScreen = window.innerWidth < 768;
      setShowPrompt(isPortrait && isSmallScreen && !dismissed);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, [dismissed]);

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-lg"
      >
        {/* Blurred landscape background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/assets/coastal/coastal-overlook-v2.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          {/* Rotate icon */}
          <motion.div
            animate={{ rotate: [0, 90, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="text-6xl mb-6"
          >
            📱
          </motion.div>

          <h2 className="text-2xl font-bold text-white mb-3">
            This view is too wide for portrait
          </h2>

          <p className="text-white/70 mb-8 max-w-xs">
            Rotate your phone to landscape mode to see the full horizon and experience the journey.
          </p>

          <button
            onClick={() => setDismissed(true)}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 transition-colors"
          >
            Continue anyway →
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
