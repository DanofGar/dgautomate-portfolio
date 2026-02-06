'use client';

import { getImageProps } from 'next/image';
import { cn } from '@/lib/utils';

export function Cave() {
  const common = { alt: 'Sea cave interior', quality: 90, sizes: '100vw' };

  const { props: { srcSet: desktop, ...rest } } = getImageProps({
    ...common,
    width: 1920,
    height: 1080,
    src: '/assets/cave/cave-transition-v3.png',
  });
  const { props: { srcSet: mobile } } = getImageProps({
    ...common,
    width: 768,
    height: 1376,
    src: '/assets/cave/cave-transition-v3-portrait.png',
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
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
        {/* Overall darkening vignette */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content - centered with backdrop */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="bg-black/30 hover:bg-black/60 active:bg-black/60 backdrop-blur-sm rounded-xl px-8 py-6 max-w-lg transition-colors duration-300 cursor-default">
            <h2
              className={cn(
                'font-serif text-2xl md:text-3xl lg:text-4xl font-bold mb-4',
                'text-warm-white text-shadow-readable'
              )}
            >
              Where I&apos;m Going
            </h2>
            <p
              className={cn(
                'font-body text-base md:text-lg leading-relaxed',
                'text-warm-white/90 text-shadow-readable'
              )}
            >
              These days I&apos;m building tools and workflows with AI&mdash;for
              my own life and for businesses. This site? Built entirely that way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
