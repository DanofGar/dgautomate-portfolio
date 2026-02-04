'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingDock } from '@/components/ui/floating-dock';
import {
  IconCloud,
  IconTree,
  IconMountain,
  IconWaveSine,
  IconServer,
} from '@tabler/icons-react';

const navItems = [
  {
    title: 'Welcome',
    icon: <IconCloud className="h-full w-full text-sky-400" />,
    href: '#hero',
  },
  {
    title: 'Background',
    icon: <IconTree className="h-full w-full text-green-500" />,
    href: '#forest',
  },
  {
    title: 'Skills',
    icon: <IconMountain className="h-full w-full text-amber-500" />,
    href: '#rocky',
  },
  {
    title: 'Passion',
    icon: <IconWaveSine className="h-full w-full text-blue-400" />,
    href: '#coastal',
  },
  {
    title: 'Contact',
    icon: <IconServer className="h-full w-full text-green-400" />,
    href: '#datacenter',
  },
];

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dock after scrolling past hero (approximately 100vh)
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <FloatingDock
            items={navItems}
            desktopClassName="bg-black/80 backdrop-blur-md border border-white/10"
            mobileClassName="fixed bottom-4 right-4"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
