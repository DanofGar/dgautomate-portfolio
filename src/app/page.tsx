'use client';

import { AltitudeMeter } from '@/components/ui/AltitudeMeter';
import { Sky } from '@/components/zones/Sky';
import { StorySection } from '@/components/zones/StorySection';
import { SecretDataCenter } from '@/components/zones/SecretDataCenter';
import { Navigation } from '@/components/ui/Navigation';
import { MobileLandscapePrompt } from '@/components/ui/MobileLandscapePrompt';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <MobileLandscapePrompt />
      <AltitudeMeter />
      <Navigation />

      {/* Sky Zone - Hero section */}
      <div id="hero">
        <Sky />
      </div>

      {/* Story Section - Sticky scroll through Forest, Rocky, Coastal */}
      <StorySection />

      {/* Datacenter - Direct transition from coastal */}
      <div id="datacenter">
        <SecretDataCenter />
      </div>
    </main>
  );
}
