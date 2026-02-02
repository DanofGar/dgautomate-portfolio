import { AltitudeMeter } from '@/components/ui/AltitudeMeter';
import { Sky } from '@/components/zones/Sky';
import { Forest } from '@/components/zones/Forest';
import { RockyClimb } from '@/components/zones/RockyClimb';
import { CoastalOverlook } from '@/components/zones/CoastalOverlook';
import { UndergroundRoots } from '@/components/zones/UndergroundRoots';
import { UndergroundBurrows } from '@/components/zones/UndergroundBurrows';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <AltitudeMeter />

      {/* Sky Zone - Hero section */}
      <Sky />

      {/* Forest Zone - Operations skills */}
      <Forest />

      {/* Rocky Climb Zone - Scale & Strategy skills */}
      <RockyClimb />

      {/* Coastal Overlook Zone - Systems & Automation skills */}
      <CoastalOverlook />

      {/* Underground Roots Zone - Transition below surface */}
      <UndergroundRoots />

      {/* Underground Burrows Zone - Deliberate tunnels */}
      <UndergroundBurrows />

      {/* Temporary placeholder section for scroll testing */}
      <div className="h-screen flex items-center justify-center bg-datacenter-blue/20">
        <p className="text-xl">Secret Data Center (~-100ft)</p>
      </div>
    </main>
  );
}
