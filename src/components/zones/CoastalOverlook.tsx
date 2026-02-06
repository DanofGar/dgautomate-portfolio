'use client';

import { getImageProps } from 'next/image';
import { cn } from '@/lib/utils';

export function CoastalOverlook() {
  const common = { alt: 'Big Sur coastal overlook', quality: 90, sizes: '100vw' };

  const { props: { srcSet: desktop, ...rest } } = getImageProps({
    ...common,
    width: 1920,
    height: 1080,
    src: '/assets/coastal/coastal-overlook-v3.png',
  });
  const { props: { srcSet: mobile } } = getImageProps({
    ...common,
    width: 768,
    height: 1376,
    src: '/assets/coastal/coastal-overlook-v3-portrait.png',
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black/70" />
      </div>

      {/* Content - Top area where sky is darker, with backdrop */}
      <div className="relative z-10 h-full flex items-start pt-32 md:pt-24 px-6 md:px-16">
        <div className="max-w-lg">
          <div className="bg-black/30 hover:bg-black/60 active:bg-black/60 backdrop-blur-sm rounded-xl p-6 md:p-8 transition-colors duration-300 cursor-default">
            <h2
              className={cn(
                'font-serif text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6',
                'text-warm-white text-shadow-readable'
              )}
            >
              Understanding People
            </h2>
            <p
              className={cn(
                'font-body text-base md:text-lg lg:text-xl leading-relaxed',
                'text-warm-white/90'
              )}
            >
              I studied psychology, took every business class I could find, and
              worked in IT on the side. Turns out, most business problems are
              really people problems&mdash;and that mix helps me see both sides.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
