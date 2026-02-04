'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { cn } from '@/lib/utils';

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Idle detection - show groundhog after 10s of inactivity
  useEffect(() => {
    const checkIdle = setInterval(() => {
      if (Date.now() - lastActivity > 10000) {
        setIsIdle(true);
      }
    }, 1000);

    const resetIdle = () => {
      setLastActivity(Date.now());
      setIsIdle(false);
    };

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', resetIdle);

    return () => {
      clearInterval(checkIdle);
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
    };
  }, [lastActivity]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 font-mono"
      >
        <p className="text-xl text-green-400">&gt; transmission_received</p>
        <p className="text-sm text-green-400/70">
          I&apos;ll reach out if there&apos;s a connection to be made.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {/* Terminal-style contact form */}
      <div
        className={cn(
          'bg-black/90 backdrop-blur-lg rounded-lg',
          'border border-green-500/30',
          'p-6 font-mono text-green-400'
        )}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-green-500/20">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-2 text-green-400/50 text-xs">contact.sh</span>
        </div>

        {/* Typewriter header */}
        <TypewriterEffectSmooth
          words={[
            { text: '>', className: 'text-green-600' },
            { text: 'Initiate', className: 'text-green-400' },
            { text: 'contact', className: 'text-green-400' },
            { text: 'sequence...', className: 'text-green-400' },
          ]}
          className="text-sm mb-6"
          cursorClassName="bg-green-400 h-4"
        />

        <form
          name="underground-contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input type="hidden" name="form-name" value="underground-contact" />

          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm text-green-600">
              &gt; name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className={cn(
                'w-full px-3 py-2 bg-transparent',
                'border-b border-green-400/50',
                'text-green-400 placeholder:text-green-400/30',
                'focus:outline-none focus:border-green-400',
                'transition-colors'
              )}
              placeholder="your_name"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm text-green-600">
              &gt; email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={cn(
                'w-full px-3 py-2 bg-transparent',
                'border-b border-green-400/50',
                'text-green-400 placeholder:text-green-400/30',
                'focus:outline-none focus:border-green-400',
                'transition-colors'
              )}
              placeholder="you@domain.com"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="block text-sm text-green-600">
              &gt; message:
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className={cn(
                'w-full px-3 py-2 bg-transparent',
                'border border-green-400/30 rounded',
                'text-green-400 placeholder:text-green-400/30',
                'focus:outline-none focus:border-green-400',
                'transition-colors resize-none'
              )}
              placeholder="// optional message"
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            {/* Submit button with blinking cursor */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'px-6 py-2 bg-green-400 text-black font-bold',
                'rounded flex items-center gap-2',
                'hover:bg-green-300 transition-colors',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-black"
              />
              {isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT'}
            </motion.button>

            {/* LinkedIn link */}
            <a
              href="https://linkedin.com/in/daniel-g-ab8596166"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400/70 hover:text-green-400 underline text-sm transition-colors"
            >
              → LinkedIn
            </a>
          </div>
        </form>
      </div>

      {/* Idle groundhog popup */}
      <AnimatePresence>
        {isIdle && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute -bottom-4 right-4 z-50"
          >
            <div className="relative">
              <Image
                src="/assets/characters/intern.png"
                alt="Curious groundhog"
                width={80}
                height={100}
                className="object-contain"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute -top-8 -left-4 bg-black/90 border border-green-400/50 rounded px-2 py-1 text-xs text-green-400 font-mono whitespace-nowrap"
              >
                Need help? 👀
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
