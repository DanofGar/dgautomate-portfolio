'use client';

import { getImageProps } from 'next/image';
import { cn } from '@/lib/utils';

export function Forest() {
  const common = { alt: 'Redwood forest canopy', quality: 90, sizes: '100vw' };

  const { props: { srcSet: desktop, ...rest } } = getImageProps({
    ...common,
    width: 1920,
    height: 1080,
    src: '/assets/forest/forest-background-v3.png',
  });
  const { props: { srcSet: mobile } } = getImageProps({
    ...common,
    width: 768,
    height: 1376,
    src: '/assets/forest/forest-background-v3-portrait.png',
  });

  return (
    <section className="relative h-screen w-full overflow-hidden scroll-snap-align-start">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktop} />
          <source srcSet={mobile} />
          <img
            {...rest}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </picture>
        {/* Top gradient from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
        {/* Bottom gradient for transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black/60" />
      </div>

      {/* Content - Left side with strong backdrop */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-16">
        <div className="max-w-lg">
          <div className="bg-black/30 hover:bg-black/60 active:bg-black/60 backdrop-blur-sm rounded-xl p-6 md:p-8 transition-colors duration-300 cursor-default">
            <h2
              className={cn(
                'font-serif text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6',
                'text-warm-white text-shadow-readable'
              )}
            >
              The Paths I&apos;ve Taken
            </h2>
            <p
              className={cn(
                'font-body text-base md:text-lg lg:text-xl leading-relaxed',
                'text-warm-white/90'
              )}
            >
              I&apos;ve done a little bit of everything&mdash;government affairs,
              sales, account management, operations. Every role looked different,
              but the through line was always the same: figure out how things
              work, then make them work better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
