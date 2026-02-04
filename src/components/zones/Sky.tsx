'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { cn } from '@/lib/utils';

export function Sky() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/sky/hero-sky-v1.png"
          alt="California sky at golden hour"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
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
            'text-white drop-shadow-lg',
            'mb-6'
          )}
        >
          Daniel G
        </motion.h1>

        {/* Hook line with Text Generate Effect */}
        <div className="max-w-2xl">
          <TextGenerateEffect
            words="I build systems that work while I sleep."
            className="text-xl md:text-2xl text-white/90 drop-shadow-md"
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
                className="object-contain opacity-80 drop-shadow-lg"
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
              'border-2 border-white/40',
              'flex items-start justify-center',
              'p-2',
              'cursor-pointer'
            )}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-white/60"
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
    </section>
  );
}
