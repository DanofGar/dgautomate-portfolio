'use client';

import { Sky } from '@/components/zones/Sky';
import { Forest } from '@/components/zones/Forest';
import { CoastalOverlook } from '@/components/zones/CoastalOverlook';
import { Cave } from '@/components/zones/Cave';

export default function Home() {
  return (
    <main className="bg-black">
      {/* Hero - Sky */}
      <Sky />

      {/* Story 1 - Forest */}
      <Forest />

      {/* Story 2 - Coastal */}
      <CoastalOverlook />

      {/* Dead End - Cave */}
      <Cave />
    </main>
  );
}
