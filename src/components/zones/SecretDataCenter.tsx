'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ContactForm } from '@/components/ui/ContactForm';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { Particles } from '@/components/ui/particles';

interface EasterEggState {
  pickleball: boolean;
  terminal: boolean;
  singing: boolean;
}

// Character asset paths
const CHARACTERS = {
  scientist: '/assets/characters/groundhog-scientist-v2.png',
  coffeeRunner: '/assets/characters/coffee-runner.png',
  securityGuard: '/assets/characters/security-guard.png',
  networkEngineer: '/assets/characters/network-engineer.png',
  serverTechnician: '/assets/characters/server-technician.png',
  dataAnalyst: '/assets/characters/data-analyst.png',
  seniorArchitect: '/assets/characters/senior-architect.png',
  intern: '/assets/characters/intern.png',
  karaokeSinger: '/assets/characters/karaoke-singer.png',
} as const;

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

// Stationary character component with optional subtle breathing animation
function StationaryCharacter({
  src,
  alt,
  className,
  style,
  breathe = true,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  breathe?: boolean;
}) {
  return (
    <motion.div
      className={cn('absolute pointer-events-none select-none', className)}
      style={style}
      animate={
        breathe
          ? {
              scale: [1, 1.015, 1],
            }
          : undefined
      }
      transition={
        breathe
          ? {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : undefined
      }
    >
      <Image
        src={src}
        alt={alt}
        width={120}
        height={160}
        className="w-auto h-auto max-h-[120px] md:max-h-[160px] object-contain"
        priority={false}
      />
    </motion.div>
  );
}

// Animated character component for movers (Coffee Runner, Security Guard)
function AnimatedMover({
  src,
  alt,
  direction = 'right',
  duration = 10,
  className,
}: {
  src: string;
  alt: string;
  direction?: 'left' | 'right';
  duration?: number;
  className?: string;
}) {
  const startX = direction === 'right' ? '-10%' : '90%';
  const endX = direction === 'right' ? '90%' : '-10%';

  return (
    <motion.div
      className={cn(
        'absolute bottom-[15%] pointer-events-none select-none hidden md:block',
        className
      )}
      initial={{ x: startX }}
      animate={{
        x: [startX, endX, startX],
        y: [0, -3, 0, -3, 0],
      }}
      transition={{
        x: {
          duration: duration,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        y: {
          duration: 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      style={{ zIndex: 30 }}
    >
      <Image
        src={src}
        alt={alt}
        width={100}
        height={140}
        className="w-auto h-auto max-h-[100px] md:max-h-[140px] object-contain"
        style={{
          transform: direction === 'left' ? 'scaleX(-1)' : 'none',
        }}
      />
    </motion.div>
  );
}

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
        'overflow-hidden',
        'bg-[#1a1a1a]'
      )}
    >
      {/* Background Beams - base layer */}
      <BackgroundBeams className="absolute inset-0 z-0" />

      {/* Green data stream particles */}
      <Particles
        className="absolute inset-0 z-5"
        color="#22C55E"
        quantity={50}
        size={1}
        vx={0.5}
        vy={-0.2}
        staticity={20}
      />

      {/* Background image layer */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/assets/datacenter/datacenter-background-v3.png"
          alt="Secret underground data center"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Overlay gradient for depth and text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/60" />
      </div>

      {/* Character layers - Stationary characters at workstations */}
      <div className="absolute inset-0" style={{ zIndex: 10 }}>
        {/* Scientist - Central workstation */}
        <StationaryCharacter
          src={CHARACTERS.scientist}
          alt="Groundhog scientist at central workstation"
          style={{ left: '45%', bottom: '35%' }}
        />

        {/* Network Engineer - Server rack area (left side) */}
        <StationaryCharacter
          src={CHARACTERS.networkEngineer}
          alt="Network engineer groundhog at server rack"
          style={{ left: '12%', bottom: '38%' }}
        />

        {/* Server Technician - Crouched at panel */}
        <StationaryCharacter
          src={CHARACTERS.serverTechnician}
          alt="Server technician groundhog at panel"
          style={{ left: '22%', bottom: '28%' }}
        />

        {/* Data Analyst - At monitors */}
        <StationaryCharacter
          src={CHARACTERS.dataAnalyst}
          alt="Data analyst groundhog studying charts"
          style={{ left: '55%', bottom: '40%' }}
        />

        {/* Senior Architect - Drafting desk (right area) */}
        <StationaryCharacter
          src={CHARACTERS.seniorArchitect}
          alt="Senior architect groundhog at drafting desk"
          style={{ right: '25%', bottom: '35%' }}
        />

        {/* Intern - Supply area with boxes */}
        <StationaryCharacter
          src={CHARACTERS.intern}
          alt="Intern groundhog carrying boxes"
          style={{ right: '8%', bottom: '25%' }}
          breathe={false}
        />

        {/* Karaoke Singer - Next to lyrics terminal */}
        <motion.div
          className="absolute pointer-events-none select-none"
          style={{ right: '12%', bottom: '32%', zIndex: 20 }}
          animate={{
            rotate: [-3, 3, -3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Image
            src={CHARACTERS.karaokeSinger}
            alt="Karaoke singer groundhog performing"
            width={120}
            height={160}
            className="w-auto h-auto max-h-[120px] md:max-h-[160px] object-contain"
          />
        </motion.div>

        {/* Lyrics Terminal Easter Egg - next to Karaoke Singer */}
        <LyricsTerminal isActive={true} />
      </div>

      {/* Animated movers - highest z-index for foreground movement */}
      {/* Coffee Runner - slides left to right, 8-10s loop */}
      <AnimatedMover
        src={CHARACTERS.coffeeRunner}
        alt="Coffee runner groundhog with tray"
        direction="right"
        duration={9}
      />

      {/* Security Guard - patrols opposite direction, slower 12s loop */}
      <AnimatedMover
        src={CHARACTERS.securityGuard}
        alt="Security guard groundhog on patrol"
        direction="left"
        duration={12}
        className="bottom-[20%]"
      />

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
