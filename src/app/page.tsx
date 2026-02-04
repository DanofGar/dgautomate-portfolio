'use client';

import { useState } from 'react';
import { AltitudeMeter } from '@/components/ui/AltitudeMeter';
import { Sky } from '@/components/zones/Sky';
import { StorySection } from '@/components/zones/StorySection';
import { UndergroundRoots } from '@/components/zones/UndergroundRoots';
import { UndergroundBurrows } from '@/components/zones/UndergroundBurrows';
import { PeelReveal } from '@/components/effects/PeelReveal';
import { SecretDataCenter } from '@/components/zones/SecretDataCenter';

export default function Home() {
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);

  const handleGroundhogDig = () => {
    setIsSecretRevealed(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AltitudeMeter />

      {/* Sky Zone - Hero section */}
      <Sky />

      {/* Story Section - Sticky scroll through Forest, Rocky, Coastal */}
      <StorySection />

      {/* Underground Roots Zone - Transition below surface */}
      <UndergroundRoots />

      {/* Underground Burrows Zone - Deliberate tunnels */}
      <UndergroundBurrows onGroundhogDig={handleGroundhogDig} />

      {/* Peel reveal effect wrapping the secret data center */}
      <PeelReveal isRevealed={isSecretRevealed}>
        <SecretDataCenter />
      </PeelReveal>
    </main>
  );
}
