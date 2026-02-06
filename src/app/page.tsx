'use client';

import { Sky } from '@/components/zones/Sky';
import { Forest } from '@/components/zones/Forest';
import { CoastalOverlook } from '@/components/zones/CoastalOverlook';
import { Cave } from '@/components/zones/Cave';

export default function Home() {
  return (
    <main className="bg-black">
      {/* Hero */}
      <Sky />

      {/* The Paths I've Taken */}
      <Forest />

      {/* Understanding People */}
      <CoastalOverlook />

      {/* Where I'm Going */}
      <Cave />
    </main>
  );
}
