'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ContactForm } from '@/components/ui/ContactForm';
import { VideoBackground } from '@/components/effects/VideoBackground';

interface EasterEggState {
  pickleball: boolean;
  terminal: boolean;
  singing: boolean;
}

// Karaoke lyrics for the terminal easter egg
const KARAOKE_LYRICS = [
  { text: "I'm walking on sunshine", highlight: false },
  { text: "Whoa-oh!", highlight: false },
  { text: "I'm walking on sunshine", highlight: false },
  { text: "Whoa-oh!", highlight: false },
  { text: "I'm walking on sunshine", highlight: true },
  { text: "Whoa-oh!", highlight: false },
  { text: "And don't it feel good!", highlight: false },
  { text: "Hey! Alright now!", highlight: false },
  { text: "And don't it feel good!", highlight: false },
];

// Lyrics terminal component with scrolling animation
function LyricsTerminal({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={cn(
        'absolute bg-background/90 border-2 border-datacenter-terminal/60 rounded-lg overflow-hidden',
        'w-[140px] h-[100px] md:w-[180px] md:h-[120px]',
        'font-mono text-[10px] md:text-xs'
      )}
      style={{
        right: '18%',
        bottom: '32%',
        zIndex: 25,
      }}
    >
      {/* Terminal header */}
      <div className="bg-datacenter-terminal/20 px-2 py-1 border-b border-datacenter-terminal/30 flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-red-500/70" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
        <div className="w-2 h-2 rounded-full bg-green-500/70" />
        <span className="ml-2 text-datacenter-terminal/70 text-[8px]">
          karaoke.exe
        </span>
      </div>

      {/* Scrolling lyrics */}
      <div className="relative h-[calc(100%-24px)] overflow-hidden">
        <motion.div
          className="absolute w-full"
          animate={
            isActive
              ? {
                  y: ['0%', '-50%'],
                }
              : undefined
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...KARAOKE_LYRICS, ...KARAOKE_LYRICS].map((line, i) => (
            <div
              key={i}
              className={cn(
                'px-2 py-0.5 transition-colors',
                line.highlight
                  ? 'text-datacenter-terminal font-bold bg-datacenter-terminal/20'
                  : 'text-foreground/50'
              )}
            >
              ♪ {line.text}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
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
        'relative w-full',
        'min-h-[100vh] md:min-h-[120vh]',
        'overflow-hidden'
      )}
    >
      {/* Video background layer - Veo 3 generated groundhog data center */}
      <VideoBackground
        src="/assets/videos/datacenter-loop.mp4"
        poster="/assets/datacenter/datacenter-background-v3.png"
        overlay={true}
        overlayClassName="from-transparent via-background/10 to-background/50"
      />

      {/* Lyrics Terminal Easter Egg - overlay on video */}
      <div className="absolute inset-0" style={{ zIndex: 10 }}>
        <LyricsTerminal isActive={true} />
      </div>

      {/* Content overlay - Header and contact form */}
      <div className="relative z-40 flex flex-col min-h-[100vh] md:min-h-[120vh]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center pt-12 md:pt-16 px-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground/90 mb-3 drop-shadow-lg">
            Welcome to the Underground
          </h2>
          <p className="text-lg md:text-xl text-datacenter-terminal font-medium mb-2 drop-shadow-md">
            Secret Data Center
          </p>
          <p className="text-sm text-foreground/60 font-mono">-100 ft</p>
        </motion.div>

        {/* Spacer to push content down */}
        <div className="flex-1" />

        {/* Easter eggs row - Desktop only */}
        <div className="hidden md:flex justify-center gap-8 mb-8 px-4">
          {/* Pickleball paddle Easter egg */}
          <motion.div
            className="relative cursor-pointer bg-background/60 backdrop-blur-sm rounded-soft p-3 border border-datacenter-terminal/30"
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, 0],
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleEasterEgg('pickleball')}
          >
            <div className="text-4xl">🏓</div>
            {easterEggs.pickleball && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-background/95 border border-datacenter-terminal/50 rounded-soft px-4 py-2 text-sm text-foreground/80 whitespace-nowrap shadow-layered z-50"
              >
                Pickleball is one of my favorite hobbies!
              </motion.div>
            )}
          </motion.div>

          {/* Hiking boots Easter egg */}
          <motion.div
            className="relative cursor-pointer bg-background/60 backdrop-blur-sm rounded-soft p-3 border border-datacenter-terminal/30"
            whileHover={{
              scale: 1.1,
              rotate: [0, 5, -5, 0],
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleEasterEgg('singing')}
          >
            <div className="text-4xl">🥾</div>
            {easterEggs.singing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-background/95 border border-datacenter-terminal/50 rounded-soft px-4 py-2 text-sm text-foreground/80 whitespace-nowrap shadow-layered z-50"
              >
                Garrapata Trail in Big Sur is my favorite!
              </motion.div>
            )}
          </motion.div>

          {/* Microphone Easter egg */}
          <motion.div
            className="relative cursor-pointer bg-background/60 backdrop-blur-sm rounded-soft p-3 border border-datacenter-terminal/30"
            whileHover={{
              scale: 1.1,
              y: -3,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleEasterEgg('terminal')}
          >
            <div className="text-4xl">🎤</div>
            {easterEggs.terminal && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-background/95 border border-datacenter-terminal/50 rounded-soft px-4 py-2 text-sm text-foreground/80 whitespace-nowrap shadow-layered z-50"
              >
                Singing is another hobby of mine! 🎵
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-12 md:mb-16 px-4"
        >
          <div className="bg-background/80 backdrop-blur-md border border-datacenter-blue/40 rounded-softer p-6 md:p-10 shadow-layered">
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-foreground/90 mb-2">
                You found the secret path
              </h3>
              <p className="text-foreground/70 text-sm md:text-base">
                Leave your info and I&apos;ll reach out if there&apos;s a
                connection to be made.
              </p>
            </div>
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
