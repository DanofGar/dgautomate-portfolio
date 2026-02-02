'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ContactForm } from '@/components/ui/ContactForm';

interface EasterEggState {
  pickleball: boolean;
  terminal: boolean;
  singing: boolean;
}

export function SecretDataCenter() {
  const [easterEggs, setEasterEggs] = useState<EasterEggState>({
    pickleball: false,
    terminal: false,
    singing: false,
  });

  const handleEasterEgg = (egg: keyof EasterEggState) => {
    setEasterEggs((prev) => ({ ...prev, [egg]: !prev[egg] }));
  };

  return (
    <section
      className={cn(
        'relative min-h-screen w-full',
        'bg-gradient-to-b from-datacenter-blue/30 via-datacenter-metal to-datacenter-blue/20',
        'py-24 px-4',
        'overflow-hidden'
      )}
    >
      {/* Atmospheric lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Warm overhead lamps */}
        {[
          { x: 20, y: 10 },
          { x: 50, y: 10 },
          { x: 80, y: 10 },
        ].map((lamp, i) => (
          <motion.div
            key={`lamp-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${lamp.x}%`,
              top: `${lamp.y}%`,
              width: '150px',
              height: '150px',
              background: `radial-gradient(circle, ${`hsl(45, 70%, 65%)`} 0%, transparent 70%)`,
              opacity: 0.4,
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Terminal glow from screens */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`screen-glow-${i}`}
            className="absolute rounded-lg"
            style={{
              left: `${10 + i * 25}%`,
              top: `${40 + Math.random() * 20}%`,
              width: '120px',
              height: '100px',
              background: `radial-gradient(circle, ${`hsl(140, 60%, 50%)`} 0%, transparent 60%)`,
              opacity: 0.2,
            }}
            animate={{
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Server racks and equipment */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left side server racks */}
        <div className="absolute left-8 top-1/4 w-16 h-96 bg-datacenter-metal/40 border border-datacenter-blue/30 rounded-soft">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`led-left-${i}`}
              className="absolute left-2 w-2 h-2 rounded-full bg-datacenter-terminal"
              style={{ top: `${10 + i * 11}%` }}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Right side server racks */}
        <div className="absolute right-8 top-1/3 w-16 h-80 bg-datacenter-metal/40 border border-datacenter-blue/30 rounded-soft">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`led-right-${i}`}
              className="absolute right-2 w-2 h-2 rounded-full bg-datacenter-terminal"
              style={{ top: `${10 + i * 14}%` }}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground/90 mb-4">
            Welcome to the Underground
          </h2>
          <p className="text-xl text-datacenter-terminal font-medium mb-2">
            Secret Data Center
          </p>
          <p className="text-sm text-foreground/50 font-mono">-100 ft</p>
        </motion.div>

        {/* Main scene with groundhogs */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left side - Groundhogs at work */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Groundhog 1 - At computer */}
            <div className="relative bg-datacenter-metal/20 border border-datacenter-blue/30 rounded-soft p-6">
              <div className="flex items-start gap-4">
                <div className="text-6xl">🦫</div>
                <div className="flex-1">
                  <p className="text-sm text-foreground/70 mb-2">Senior Engineer</p>
                  <div className="bg-background/50 rounded p-3 font-mono text-xs text-datacenter-terminal">
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      $ analyzing dam blueprints...
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>

            {/* Groundhog 2 - Planning */}
            <div className="relative bg-datacenter-metal/20 border border-datacenter-blue/30 rounded-soft p-6">
              <div className="flex items-start gap-4">
                <div className="text-6xl">🦫</div>
                <div className="flex-1">
                  <p className="text-sm text-foreground/70 mb-2">Project Manager</p>
                  <p className="text-sm text-foreground/60">
                    Coordinating the biggest construction project this side of the burrow
                  </p>
                </div>
              </div>
            </div>

            {/* Easter egg - Pickleball paddle */}
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleEasterEgg('pickleball')}
            >
              <div className="text-4xl">🏓</div>
              {easterEggs.pickleball && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-16 top-0 bg-background/90 border border-datacenter-terminal/50 rounded-soft px-4 py-2 text-sm text-foreground/80 whitespace-nowrap shadow-layered"
                >
                  Pickleball is one of my favorite hobbies!
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Right side - Terminals and Easter eggs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Terminal with lyrics Easter egg */}
            <motion.div
              className="relative bg-background/60 border border-datacenter-terminal/40 rounded-soft p-4 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => handleEasterEgg('terminal')}
            >
              <div className="font-mono text-xs text-datacenter-terminal space-y-1">
                <div className="text-foreground/50">
                  terminal-01@datacenter:~$
                </div>
                {easterEggs.terminal ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-datacenter-terminal/80 space-y-1"
                  >
                    <div>♪ &quot;I&apos;m walkin&apos; on sunshine, whoa-oh&quot; ♪</div>
                    <div>♪ &quot;And don&apos;t it feel good!&quot; ♪</div>
                    <div className="text-foreground/50 mt-2">
                      (Singing is another hobby of mine)
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-datacenter-terminal/60">
                    Click to see what&apos;s playing...
                  </div>
                )}
              </div>
            </motion.div>

            {/* Dam construction plans */}
            <div className="bg-datacenter-metal/20 border border-datacenter-blue/30 rounded-soft p-6">
              <h3 className="text-lg font-semibold text-foreground/80 mb-3">
                Current Project: Dam Construction
              </h3>
              <div className="space-y-2 text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-datacenter-terminal" />
                  <span>Foundation: 85% complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-datacenter-terminal/50" />
                  <span>Water flow modeling: In progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-datacenter-blue/50" />
                  <span>Structural reinforcement: Planned</span>
                </div>
              </div>
            </div>

            {/* Hiking reference */}
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleEasterEgg('singing')}
            >
              <div className="text-4xl">🥾</div>
              {easterEggs.singing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-16 top-0 bg-background/90 border border-datacenter-terminal/50 rounded-soft px-4 py-2 text-sm text-foreground/80 whitespace-nowrap shadow-layered"
                >
                  Garrapata Trail in Big Sur is my favorite!
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto bg-datacenter-metal/20 border border-datacenter-blue/30 rounded-softer p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground/90 mb-3">
              You found the secret path
            </h3>
            <p className="text-foreground/70">
              Leave your info and I&apos;ll reach out if there&apos;s a connection to be made.
            </p>
          </div>
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
