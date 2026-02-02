'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch('/', {
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
        className="text-center space-y-4"
      >
        <p className="text-xl text-datacenter-terminal">Thanks for stopping by!</p>
        <p className="text-sm text-foreground/70">
          I&apos;ll reach out if there&apos;s a connection to be made.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      name="underground-contact"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto"
    >
      <input type="hidden" name="form-name" value="underground-contact" />

      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-foreground/80">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 bg-datacenter-metal/30 border border-datacenter-blue/30 rounded-soft text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-datacenter-terminal/50 transition-all"
          placeholder="Daniel Garcia"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-foreground/80">
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 bg-datacenter-metal/30 border border-datacenter-blue/30 rounded-soft text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-datacenter-terminal/50 transition-all"
          placeholder="you@example.com"
        />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-6 py-3 bg-datacenter-terminal/20 border border-datacenter-terminal/50 rounded-soft text-datacenter-terminal font-medium hover:bg-datacenter-terminal/30 focus:outline-none focus:ring-2 focus:ring-datacenter-terminal/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Leave a trace'}
      </motion.button>
    </form>
  );
}
