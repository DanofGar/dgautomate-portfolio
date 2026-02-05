'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useScrollJail } from './ScrollJailProvider';

interface CritterWorkstation {
  id: string;
  type: 'groundhog-scientist' | 'groundhog-security' | 'beaver' | 'mole' | 'otter';
  position: { x: string; y: string };
  size: number;
  animation?: 'typing' | 'looking' | 'walking' | 'idle';
}

const critters: CritterWorkstation[] = [
  {
    id: 'scientist-1',
    type: 'groundhog-scientist',
    position: { x: '15%', y: '45%' },
    size: 120,
    animation: 'typing',
  },
  {
    id: 'security-1',
    type: 'groundhog-security',
    position: { x: '70%', y: '60%' },
    size: 110,
    animation: 'looking',
  },
  {
    id: 'otter-guide',
    type: 'otter',
    position: { x: '45%', y: '75%' },
    size: 80,
    animation: 'idle',
  },
];

export function DatacenterReveal() {
  const { state } = useScrollJail();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-20%' });

  // Parallax for server racks (slower scroll = depth)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rackParallax = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const foregroundParallax = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  // Don't render until unlocked
  if (state === 'locked') return null;

  return (
    <section
      ref={containerRef}
      id="datacenter-section"
      className="relative min-h-[150vh] overflow-hidden bg-slate-950"
    >
      {/* Background layer - Server racks (slowest parallax) */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: rackParallax }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/datacenter/datacenter-background-v4.png)',
          }}
        />
      </motion.div>

      {/* Blinking LED grid overlay */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <LEDGrid />
      </div>

      {/* Critter layer (medium parallax) */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ y: foregroundParallax }}
      >
        {critters.map((critter, index) => (
          <CritterSprite
            key={critter.id}
            critter={critter}
            isInView={isInView}
            delay={index * 0.2}
          />
        ))}
      </motion.div>

      {/* Cable run along floor */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 z-15 pointer-events-none"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        <CableRun />
      </motion.div>

      {/* Sticky terminal card */}
      <div className="sticky top-8 right-8 z-30 float-right mr-8 mt-8">
        <TerminalCard />
      </div>

      {/* Content area */}
      <div className="relative z-20 min-h-screen flex items-end justify-center pb-32">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-serif text-amber-100 mb-4">
            The Lab
          </h2>
          <p className="text-lg text-slate-400 max-w-md mx-auto">
            Where automation dreams become reality.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Critter sprite component with idle animations
function CritterSprite({
  critter,
  isInView,
  delay,
}: {
  critter: CritterWorkstation;
  isInView: boolean;
  delay: number;
}) {
  const animationVariants: Record<string, { y?: number[]; x?: number[]; rotateY?: number[]; transition: object }> = {
    typing: {
      y: [0, -2, 0],
      transition: { repeat: Infinity, duration: 0.3, repeatDelay: 0.1 },
    },
    looking: {
      rotateY: [0, 15, 0, -15, 0],
      transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' as const },
    },
    walking: {
      x: [0, 10, 0],
      transition: { repeat: Infinity, duration: 2 },
    },
    idle: {
      y: [0, -3, 0],
      transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' as const },
    },
  };

  const imagePath = `/assets/datacenter/critters/${critter.type}.png`;

  return (
    <motion.div
      className="absolute"
      style={{
        left: critter.position.x,
        top: critter.position.y,
        width: critter.size,
        height: critter.size,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.img
        src={imagePath}
        alt={critter.type}
        className="w-full h-full object-contain"
        animate={critter.animation ? animationVariants[critter.animation] : {}}
      />
    </motion.div>
  );
}

// Blinking LED grid
function LEDGrid() {
  return (
    <div className="absolute inset-0 grid grid-cols-20 grid-rows-10 gap-4 p-8 opacity-30">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 h-1 rounded-full bg-green-400"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 2 + 1,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

// Cable run SVG
function CableRun() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0,80 Q250,20 500,80 T1000,80"
        fill="none"
        stroke="rgba(59, 130, 246, 0.5)"
        strokeWidth="8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      <motion.path
        d="M0,85 Q250,30 500,85 T1000,85"
        fill="none"
        stroke="rgba(34, 197, 94, 0.4)"
        strokeWidth="6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.1 }}
      />
    </svg>
  );
}

// Sticky terminal card
function TerminalCard() {
  const { state } = useScrollJail();

  if (state !== 'unlocked') return null;

  return (
    <motion.div
      className="w-80 bg-slate-900/95 backdrop-blur border border-slate-700 rounded-lg shadow-2xl overflow-hidden"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-slate-400 font-mono">
          datacenter.terminal
        </span>
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono text-sm text-green-400 space-y-2">
        <p>
          <span className="text-slate-500">$</span> whoami
        </p>
        <p className="text-amber-300">daniel.garcia</p>
        <p>
          <span className="text-slate-500">$</span> cat skills.txt
        </p>
        <p className="text-slate-300 text-xs leading-relaxed">
          Automation • DevOps • Full-Stack
          <br />
          React • Node • Python • Go
          <br />
          AWS • GCP • Kubernetes
        </p>
        <p className="text-slate-500 animate-pulse">█</p>
      </div>
    </motion.div>
  );
}
