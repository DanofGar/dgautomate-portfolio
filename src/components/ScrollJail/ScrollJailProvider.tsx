'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
} from 'react';
import { useMotionValue, useSpring, animate } from 'framer-motion';

type ScrollJailState = 'locked' | 'transitioning' | 'unlocked';

interface ScrollJailContextType {
  state: ScrollJailState;
  unlockDatacenter: () => void;
  rubberBandY: ReturnType<typeof useSpring>;
  caveFloorRef: React.RefObject<HTMLDivElement>;
}

const ScrollJailContext = createContext<ScrollJailContextType | null>(null);

export function useScrollJail() {
  const ctx = useContext(ScrollJailContext);
  if (!ctx) throw new Error('useScrollJail must be used within ScrollJailProvider');
  return ctx;
}

interface ScrollJailProviderProps {
  children: ReactNode;
}

export function ScrollJailProvider({ children }: ScrollJailProviderProps) {
  const [state, setState] = useState<ScrollJailState>('locked');
  const caveFloorRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const isOverscrolling = useRef(false);

  // Rubber band effect - spring physics for overscroll
  const rubberBandRaw = useMotionValue(0);
  const rubberBandY = useSpring(rubberBandRaw, {
    stiffness: 400,
    damping: 30,
  });

  // Handle scroll lock with rubber band effect
  useEffect(() => {
    if (state !== 'locked') return;

    const handleScroll = () => {
      if (!caveFloorRef.current) return;

      const caveFloorTop = caveFloorRef.current.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      // If cave floor is at or above viewport bottom, we've hit the "dead end"
      if (caveFloorTop <= viewportHeight) {
        const overscroll = viewportHeight - caveFloorTop;

        if (overscroll > 0) {
          // Apply diminishing rubber band resistance
          const resistance = Math.min(overscroll * 0.3, 50);
          rubberBandRaw.set(resistance);
          isOverscrolling.current = true;
        }
      } else if (isOverscrolling.current) {
        // Snap back when scrolling up
        rubberBandRaw.set(0);
        isOverscrolling.current = false;
      }

      lastScrollY.current = window.scrollY;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!caveFloorRef.current) return;

      const caveFloorTop = caveFloorRef.current.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      // If at dead end and trying to scroll down, prevent and rubber band
      if (caveFloorTop <= viewportHeight + 10 && e.deltaY > 0) {
        e.preventDefault();
        const bounce = Math.min(e.deltaY * 0.15, 30);
        rubberBandRaw.set(bounce);

        // Snap back after brief moment
        setTimeout(() => rubberBandRaw.set(0), 150);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [state, rubberBandRaw]);

  // The unlock sequence - "The Plunge"
  const unlockDatacenter = useCallback(() => {
    if (state !== 'locked') return;

    setState('transitioning');

    // The transition sequence timing
    const ZOOM_DURATION = 800;
    const BLACKOUT_DURATION = 600;
    const SCROLL_DURATION = 1200;

    // 1. Trigger zoom effect (handled by CaveMouth component listening to state)
    // 2. After zoom, start blackout
    setTimeout(() => {
      // Blackout handled by TransitionOverlay component
    }, ZOOM_DURATION);

    // 3. After blackout covers screen, inject datacenter and scroll
    setTimeout(() => {
      setState('unlocked');

      // Find datacenter section and scroll to it
      const datacenter = document.getElementById('datacenter-section');
      if (datacenter) {
        // Use custom smooth scroll with acceleration
        const start = window.scrollY;
        const end = datacenter.offsetTop;
        const duration = SCROLL_DURATION;

        animate(start, end, {
          duration: duration / 1000,
          ease: [0.16, 1, 0.3, 1], // Custom ease - fast start, smooth end
          onUpdate: (value) => window.scrollTo(0, value),
        });
      }
    }, ZOOM_DURATION + BLACKOUT_DURATION / 2);

  }, [state]);

  return (
    <ScrollJailContext.Provider
      value={{
        state,
        unlockDatacenter,
        rubberBandY,
        caveFloorRef,
      }}
    >
      {children}
    </ScrollJailContext.Provider>
  );
}
