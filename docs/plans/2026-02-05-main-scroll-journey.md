# Main Scroll Journey Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the main portfolio page with 4 zones (sky → forest → coastal → cave) featuring CSS mask-image crossfade transitions.

**Architecture:** Each zone is a full-viewport section. Between zones, dedicated TransitionZone components blend backgrounds using dual mask-image layers. Text uses "emerging text" pattern (radial vignette scrim, no glass cards) per DESIGN_DECISIONS.md.

**Tech Stack:** Next.js 14, React, Framer Motion, Tailwind CSS, Google Fonts (Playfair Display, Source Serif 4)

---

## Task 1: Typography Setup

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`

**Step 1: Add Google Fonts to layout**

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daniel Garcia - dgautomate.dev",
  description: "Operations engineer and systems builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**Step 2: Update Tailwind config with font families**

In `tailwind.config.ts`, add to `theme.extend`:

```ts
fontFamily: {
  serif: ['var(--font-playfair)', 'Georgia', 'serif'],
  body: ['var(--font-source-serif)', 'Georgia', 'serif'],
},
```

**Step 3: Add typography utility classes to globals.css**

Append to `src/app/globals.css`:

```css
/* Typography per DESIGN_DECISIONS.md */
.text-warm-white {
  color: #F5F0E8;
}

.text-shadow-readable {
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.5),
    0 2px 8px rgba(0, 0, 0, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.2);
}

/* Emerging text scrim - radial vignette */
.scrim-vignette {
  background: radial-gradient(
    ellipse 80% 60% at 30% 50%,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.25) 50%,
    transparent 100%
  );
}
```

**Step 4: Verify fonts load**

Run: `npm run dev`
Open browser, inspect body element, verify font-family shows Playfair/Source Serif

**Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css tailwind.config.ts
git commit -m "feat: add Playfair Display and Source Serif 4 typography"
```

---

## Task 2: Create TransitionZone Component

**Files:**
- Create: `src/components/zones/TransitionZone.tsx`

**Step 1: Create the transition zone component with mask-image crossfade**

```tsx
// src/components/zones/TransitionZone.tsx
'use client';

import { cn } from '@/lib/utils';

interface TransitionZoneProps {
  fromImage: string;
  toImage: string;
  fromTint?: string;
  toTint?: string;
  height?: string;
  mobileHeight?: string;
  className?: string;
}

export function TransitionZone({
  fromImage,
  toImage,
  fromTint = 'rgba(0,0,0,0)',
  toTint = 'rgba(0,0,0,0)',
  height = '50vh',
  mobileHeight = '30vh',
  className,
}: TransitionZoneProps) {
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ height }}
    >
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

      {/* Responsive height via CSS custom property */}
      <style jsx>{`
        @media (max-width: 768px) {
          div:first-child {
            height: ${mobileHeight} !important;
          }
        }
      `}</style>
    </div>
  );
}
```

**Step 2: Verify component exists and has no syntax errors**

Run: `npm run build`
Expected: No TypeScript errors

**Step 3: Commit**

```bash
git add src/components/zones/TransitionZone.tsx
git commit -m "feat: add TransitionZone component with mask-image crossfade"
```

---

## Task 3: Update Sky Zone (Hero)

**Files:**
- Modify: `src/components/zones/Sky.tsx`

**Step 1: Rewrite Sky component per spec**

Replace entire file with:

```tsx
// src/components/zones/Sky.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Sky() {
  return (
    <section className="zone relative min-h-screen w-full overflow-hidden scroll-snap-align-start">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/sky/sky-background-v3.png"
          alt="California sky at golden hour"
          fill
          className="object-cover object-bottom"
          priority
          quality={90}
        />
      </div>

      {/* Name - Top Right per spec */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-8 right-8 md:top-12 md:right-12 z-10"
      >
        <h1
          className={cn(
            'font-serif text-4xl md:text-6xl lg:text-7xl font-bold',
            'text-warm-white text-shadow-readable',
            'text-right'
          )}
        >
          Daniel Garcia
        </h1>
      </motion.div>

      {/* Hook line - Center bottom area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-32 left-0 right-0 z-10 px-8"
      >
        <p
          className={cn(
            'font-body text-xl md:text-2xl',
            'text-warm-white text-shadow-readable',
            'text-center max-w-2xl mx-auto'
          )}
        >
          I build systems that work while I sleep.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
```

**Step 2: Verify renders without errors**

Run: `npm run dev`
Check browser: Name should appear top-right, tagline bottom-center

**Step 3: Commit**

```bash
git add src/components/zones/Sky.tsx
git commit -m "feat: update Sky zone with v3 asset and repositioned name"
```

---

## Task 4: Create Zone Components (Forest, Coastal, Cave)

**Files:**
- Modify: `src/components/zones/Forest.tsx`
- Modify: `src/components/zones/CoastalOverlook.tsx`
- Create: `src/components/zones/Cave.tsx`

**Step 1: Rewrite Forest zone**

```tsx
// src/components/zones/Forest.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Forest() {
  return (
    <section className="zone relative min-h-screen w-full overflow-hidden scroll-snap-align-start">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/forest/forest-background-v3.png"
          alt="Redwood forest canopy"
          fill
          className="object-cover"
          quality={90}
        />
      </div>

      {/* Vignette scrim for text area */}
      <div className="absolute inset-0 z-5 scrim-vignette" />

      {/* Content - Left side (darker canopy area) */}
      <div className="relative z-10 min-h-screen flex items-center px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg"
        >
          <h2
            className={cn(
              'font-serif text-3xl md:text-5xl font-bold mb-6',
              'text-warm-white text-shadow-readable'
            )}
          >
            People First
          </h2>
          <p
            className={cn(
              'font-body text-lg md:text-xl leading-relaxed',
              'text-warm-white text-shadow-readable'
            )}
          >
            I started in sales, which means I spent years learning to actually listen.
            Turns out that skill transfers pretty well to understanding what systems need to do.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 2: Rewrite Coastal zone**

```tsx
// src/components/zones/CoastalOverlook.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function CoastalOverlook() {
  return (
    <section className="zone relative min-h-screen w-full overflow-hidden scroll-snap-align-start">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/coastal/coastal-overlook-v3.png"
          alt="Big Sur coastal overlook"
          fill
          className="object-cover"
          quality={90}
        />
      </div>

      {/* Vignette scrim */}
      <div className="absolute inset-0 z-5 scrim-vignette" />

      {/* Content - Left side */}
      <div className="relative z-10 min-h-screen flex items-center px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg"
        >
          <h2
            className={cn(
              'font-serif text-3xl md:text-5xl font-bold mb-6',
              'text-warm-white text-shadow-readable'
            )}
          >
            The Automation Obsession
          </h2>
          <p
            className={cn(
              'font-body text-lg md:text-xl leading-relaxed',
              'text-warm-white text-shadow-readable'
            )}
          >
            Now I spend my time teaching computers to do the boring stuff
            so humans can do the interesting stuff. It&apos;s basically
            professional laziness, but productive.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 3: Create Cave zone (dead end)**

```tsx
// src/components/zones/Cave.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Cave() {
  return (
    <section className="zone relative min-h-screen w-full overflow-hidden scroll-snap-align-start">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/cave/cave-transition-v3.png"
          alt="Sea cave interior"
          fill
          className="object-cover"
          quality={90}
        />
      </div>

      {/* Darker vignette for cave atmosphere */}
      <div
        className="absolute inset-0 z-5"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, transparent 0%, rgba(0,0,0,0.6) 100%)'
        }}
      />

      {/* Content - centered, mysterious */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center max-w-md"
        >
          <p
            className={cn(
              'font-body text-lg md:text-xl',
              'text-warm-white/70 text-shadow-readable'
            )}
          >
            Looks like this is the end of the trail...
          </p>
          <p
            className={cn(
              'font-body text-sm mt-4',
              'text-warm-white/50'
            )}
          >
            Or is it?
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

**Step 4: Verify all components exist**

Run: `npm run build`
Expected: No errors

**Step 5: Commit**

```bash
git add src/components/zones/Forest.tsx src/components/zones/CoastalOverlook.tsx src/components/zones/Cave.tsx
git commit -m "feat: add Forest, Coastal, and Cave zone components with v3 assets"
```

---

## Task 5: Assemble Main Page

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css` (scroll snap)

**Step 1: Add scroll snap CSS**

Append to `src/app/globals.css`:

```css
/* Scroll snap behavior per SCROLL_ARCHITECTURE.md */
html {
  scroll-snap-type: y proximity;
}

@media (max-width: 768px) {
  html {
    scroll-snap-type: y mandatory;
  }
}

.scroll-snap-align-start {
  scroll-snap-align: start;
}

/* Transition zones don't snap */
.transition-zone {
  scroll-snap-align: none;
}
```

**Step 2: Rewrite page.tsx with full journey**

```tsx
// src/app/page.tsx
'use client';

import { Sky } from '@/components/zones/Sky';
import { Forest } from '@/components/zones/Forest';
import { CoastalOverlook } from '@/components/zones/CoastalOverlook';
import { Cave } from '@/components/zones/Cave';
import { TransitionZone } from '@/components/zones/TransitionZone';

export default function Home() {
  return (
    <main className="bg-black">
      {/* Hero - Sky */}
      <Sky />

      {/* Transition: Sky → Forest */}
      <TransitionZone
        fromImage="/assets/sky/sky-background-v3.png"
        toImage="/assets/forest/forest-background-v3.png"
        fromTint="rgba(135, 180, 200, 0.1)"
        toTint="rgba(30, 50, 35, 0.2)"
        height="50vh"
        mobileHeight="30vh"
        className="transition-zone"
      />

      {/* Story 1 - Forest */}
      <Forest />

      {/* Transition: Forest → Coastal */}
      <TransitionZone
        fromImage="/assets/forest/forest-background-v3.png"
        toImage="/assets/coastal/coastal-overlook-v3.png"
        fromTint="rgba(30, 50, 35, 0.2)"
        toTint="rgba(50, 80, 90, 0.1)"
        height="50vh"
        mobileHeight="30vh"
        className="transition-zone"
      />

      {/* Story 2 - Coastal */}
      <CoastalOverlook />

      {/* Transition: Coastal → Cave (longer, more dramatic) */}
      <TransitionZone
        fromImage="/assets/coastal/coastal-overlook-v3.png"
        toImage="/assets/cave/cave-transition-v3.png"
        fromTint="rgba(50, 80, 90, 0.1)"
        toTint="rgba(20, 15, 10, 0.4)"
        height="70vh"
        mobileHeight="50vh"
        className="transition-zone"
      />

      {/* Dead End - Cave */}
      <Cave />
    </main>
  );
}
```

**Step 3: Verify full page renders**

Run: `npm run dev`
Scroll through entire page - verify:
- Sky shows "Daniel Garcia" top-right
- Transitions blend smoothly between zones
- Forest and Coastal show text with vignette scrim
- Cave shows "end of the trail" message

**Step 4: Commit**

```bash
git add src/app/page.tsx src/app/globals.css
git commit -m "feat: assemble main scroll journey with all zones and transitions"
```

---

## Task 6: Fix TransitionZone Responsive Height

**Files:**
- Modify: `src/components/zones/TransitionZone.tsx`

**Step 1: Fix responsive height using Tailwind classes**

The styled-jsx approach has issues. Replace with CSS variables + Tailwind:

```tsx
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
```

**Step 2: Update page.tsx to use new heightClass prop**

```tsx
// In page.tsx, update TransitionZone calls:

{/* Transition: Sky → Forest */}
<TransitionZone
  fromImage="/assets/sky/sky-background-v3.png"
  toImage="/assets/forest/forest-background-v3.png"
  fromTint="rgba(135, 180, 200, 0.1)"
  toTint="rgba(30, 50, 35, 0.2)"
  heightClass="h-[30vh] md:h-[50vh]"
  className="transition-zone"
/>

{/* Transition: Forest → Coastal */}
<TransitionZone
  fromImage="/assets/forest/forest-background-v3.png"
  toImage="/assets/coastal/coastal-overlook-v3.png"
  fromTint="rgba(30, 50, 35, 0.2)"
  toTint="rgba(50, 80, 90, 0.1)"
  heightClass="h-[30vh] md:h-[50vh]"
  className="transition-zone"
/>

{/* Transition: Coastal → Cave */}
<TransitionZone
  fromImage="/assets/coastal/coastal-overlook-v3.png"
  toImage="/assets/cave/cave-transition-v3.png"
  fromTint="rgba(50, 80, 90, 0.1)"
  toTint="rgba(20, 15, 10, 0.4)"
  heightClass="h-[50vh] md:h-[70vh]"
  className="transition-zone"
/>
```

**Step 3: Test responsive behavior**

Run: `npm run dev`
Resize browser to mobile width - transitions should be shorter

**Step 4: Commit**

```bash
git add src/components/zones/TransitionZone.tsx src/app/page.tsx
git commit -m "fix: responsive height for transition zones"
```

---

## Task 7: Build Verification

**Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors

**Step 2: Test production server**

```bash
npm run start
```

Open http://localhost:3000, scroll through entire journey

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete main scroll journey MVP - sky, forest, coastal, cave with crossfade transitions"
```

---

## Summary

| Zone | Asset | Content |
|------|-------|---------|
| Sky (Hero) | sky-background-v3.png | "Daniel Garcia" top-right, tagline center-bottom |
| Transition | 50vh / 30vh mobile | mask-image crossfade |
| Forest | forest-background-v3.png | "People First" - left side |
| Transition | 50vh / 30vh mobile | mask-image crossfade |
| Coastal | coastal-overlook-v3.png | "Automation Obsession" - left side |
| Transition | 70vh / 50vh mobile | Longer, more dramatic |
| Cave | cave-transition-v3.png | "End of trail" teaser |

**Total scroll:** ~470vh desktop, ~360vh mobile

**Deferred:** AltitudeMeter, Navigation, ScrollJail, Datacenter easter egg
