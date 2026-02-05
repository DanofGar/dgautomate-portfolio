'use client';

import { Sky } from '@/components/zones/Sky';
import { Forest } from '@/components/zones/Forest';
import { CoastalOverlook } from '@/components/zones/CoastalOverlook';
import { Cave } from '@/components/zones/Cave';
import { TransitionZone } from '@/components/zones/TransitionZone';

export default function Home() {
  return (
    <main className="bg-black">
      {/* Hero - Sky */}
      <Sky />

      {/* Transition: Sky → Forest */}
      <TransitionZone
        fromImage="/assets/sky/sky-background-v3.png"
        toImage="/assets/forest/forest-background-v3.png"
        fromTint="rgba(135, 180, 200, 0.1)"
        toTint="rgba(30, 50, 35, 0.2)"
        height="50vh"
        mobileHeight="30vh"
        className="transition-zone"
      />

      {/* Story 1 - Forest */}
      <Forest />

      {/* Transition: Forest → Coastal */}
      <TransitionZone
        fromImage="/assets/forest/forest-background-v3.png"
        toImage="/assets/coastal/coastal-overlook-v3.png"
        fromTint="rgba(30, 50, 35, 0.2)"
        toTint="rgba(50, 80, 90, 0.1)"
        height="50vh"
        mobileHeight="30vh"
        className="transition-zone"
      />

      {/* Story 2 - Coastal */}
      <CoastalOverlook />

      {/* Transition: Coastal → Cave (longer, more dramatic) */}
      <TransitionZone
        fromImage="/assets/coastal/coastal-overlook-v3.png"
        toImage="/assets/cave/cave-transition-v3.png"
        fromTint="rgba(50, 80, 90, 0.1)"
        toTint="rgba(20, 15, 10, 0.4)"
        height="70vh"
        mobileHeight="50vh"
        className="transition-zone"
      />

      {/* Dead End - Cave */}
      <Cave />
    </main>
  );
}
