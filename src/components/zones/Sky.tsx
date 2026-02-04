'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { cn } from '@/lib/utils';

export function Sky() {
  return (
    <AuroraBackground
      className="min-h-screen"
      showRadialGradient={false}
    >
      {/* Main content */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn(
            'text-6xl md:text-8xl font-bold',
            'text-slate-900 dark:text-white',
            'mb-6'
          )}
        >
          Daniel G
        </motion.h1>

        {/* Hook line with Text Generate Effect */}
        <div className="max-w-2xl">
          <TextGenerateEffect
            words="I build systems that work while I sleep."
            className="text-xl md:text-2xl text-slate-700 dark:text-slate-200"
            duration={0.6}
          />
        </div>

        {/* Pelican with 3D Card Effect */}
        <CardContainer
          className="absolute top-8 right-8 md:top-16 md:right-16"
          containerClassName="py-0"
        >
          <CardBody className="bg-transparent w-20 h-20 md:w-24 md:h-24">
            <CardItem translateZ={50} className="w-full h-full">
              <Image
                src="/assets/sky/wildlife/pelican-silhouette.png"
                alt="Pelican silhouette"
                width={96}
                height={96}
                className="object-contain opacity-70 dark:opacity-50"
              />
            </CardItem>
          </CardBody>
        </CardContainer>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 2.5,
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={cn(
              'w-8 h-12 rounded-full',
              'border-2 border-slate-400/40 dark:border-white/40',
              'flex items-start justify-center',
              'p-2',
              'cursor-pointer'
            )}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-slate-500/60 dark:bg-white/60"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}
