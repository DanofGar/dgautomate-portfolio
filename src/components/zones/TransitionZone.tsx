// src/components/zones/TransitionZone.tsx
'use client';

import { cn } from '@/lib/utils';

interface TransitionZoneProps {
  fromImage: string;
  toImage: string;
  fromTint?: string;
  toTint?: string;
  heightClass?: string;
  className?: string;
}

export function TransitionZone({
  fromImage,
  toImage,
  fromTint = 'rgba(0,0,0,0)',
  toTint = 'rgba(0,0,0,0)',
  heightClass = 'h-[50vh] md:h-[50vh]',
  className,
}: TransitionZoneProps) {
  return (
    <div className={cn('relative overflow-hidden', heightClass, className)}>
      {/* Layer from previous zone - fades out at bottom */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${fromImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
        }}
      />

      {/* Layer to next zone - fades in at bottom */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${toImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
        }}
      />

      {/* Color bridge overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${fromTint}, ${toTint})`,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}
