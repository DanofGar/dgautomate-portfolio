import { AltitudeMeter } from '@/components/ui/AltitudeMeter';
import { Sky } from '@/components/zones/Sky';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <AltitudeMeter />

      {/* Sky Zone - Hero section */}
      <Sky />

      {/* Temporary placeholder sections for scroll testing */}
      <div className="h-screen flex items-center justify-center bg-ground-sage/20">
        <p className="text-xl">Forest Zone (~+200ft)</p>
      </div>
      <div className="h-screen flex items-center justify-center bg-ground-terracotta/20">
        <p className="text-xl">Rocky Climb (~+50ft)</p>
      </div>
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
