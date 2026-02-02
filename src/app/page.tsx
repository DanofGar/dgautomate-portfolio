import { AltitudeMeter } from '@/components/ui/AltitudeMeter';
import { Sky } from '@/components/zones/Sky';
import { Forest } from '@/components/zones/Forest';
import { RockyClimb } from '@/components/zones/RockyClimb';

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

      {/* Temporary placeholder sections for scroll testing */}
      <div className="h-screen flex items-center justify-center bg-sky-dark/20">
        <p className="text-xl">Coastal Overlook (0ft)</p>
      </div>
      <div className="h-screen flex items-center justify-center bg-underground-brown/20">
        <p className="text-xl">Underground Roots (~-20ft)</p>
      </div>
      <div className="h-screen flex items-center justify-center bg-underground-soil/20">
        <p className="text-xl">Underground Burrows (~-50ft)</p>
      </div>
      <div className="h-screen flex items-center justify-center bg-datacenter-blue/20">
        <p className="text-xl">Secret Data Center (~-100ft)</p>
      </div>
    </main>
  );
}
