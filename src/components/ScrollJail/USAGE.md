# ScrollJail Component System

## Overview

The ScrollJail system creates a "secret level" experience where users discover a hidden datacenter by clicking an otter at the cave entrance.

## Architecture

```
┌─────────────────────────────────────────┐
│         ScrollJailProvider              │
│  (State: locked | transitioning | unlocked)
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │        CaveMouth                │   │
│  │  ┌───────────────────────────┐  │   │
│  │  │      OtterKey             │  │   │
│  │  │  (hover: glow, click: unlock) │  │
│  │  └───────────────────────────┘  │   │
│  │  [SCROLL FLOOR - Dead End]      │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │     TransitionOverlay           │   │
│  │  (blackout + typewriter)        │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │     DatacenterReveal            │   │
│  │  (renders only when unlocked)   │   │
│  │  - Critter workstations         │   │
│  │  - Server rack parallax         │   │
│  │  - Sticky terminal card         │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

## Usage

```tsx
// app/page.tsx or your main layout
import {
  ScrollJailProvider,
  CaveMouth,
  DatacenterReveal,
  TransitionOverlay,
} from '@/components/ScrollJail';

export default function Page() {
  return (
    <ScrollJailProvider>
      {/* Your other sections: Sky, Forest, Coastal... */}
      <HeroSection />
      <ForestSection />
      <CoastalSection />

      {/* The scroll trap */}
      <CaveMouth
        backgroundImage="/assets/cave/cave-transition-v3.png"
        otterPosition={{ x: '78%', y: '55%' }}
      />

      {/* Transition overlay (renders during unlock) */}
      <TransitionOverlay />

      {/* Hidden datacenter (renders after unlock) */}
      <DatacenterReveal />
    </ScrollJailProvider>
  );
}
```

## State Machine

```
     ┌──────────────────────────────────────┐
     │                                      │
     ▼                                      │
┌─────────┐    click otter    ┌──────────────┐
│ LOCKED  │ ───────────────▶  │ TRANSITIONING │
└─────────┘                   └──────────────┘
     │                              │
     │ (rubber band                 │ (zoom + blackout
     │  on overscroll)              │  + typewriter)
     │                              │
     │                              ▼
     │                        ┌──────────┐
     │                        │ UNLOCKED │
     │                        └──────────┘
     │                              │
     │                              │ (datacenter visible,
     │                              │  can scroll freely)
     └──────────────────────────────┘
```

## Effects Checklist

| # | Effect | Component | Status |
|---|--------|-----------|--------|
| 1 | Elastic Dead End | ScrollJailProvider | ✓ |
| 2 | Idle Otter (mouse tracking) | OtterKey | ✓ |
| 3 | Beacon Pulse | OtterKey | ✓ |
| 4 | "Go Deeper?" Tooltip | OtterKey | ✓ |
| 5 | The Plunge (scroll) | ScrollJailProvider | ✓ |
| 6 | Cave Mouth Zoom | CaveMouth | ✓ |
| 7 | Blackout Wipe | TransitionOverlay | ✓ |
| 8 | Terminal Typewriter | TransitionOverlay | ✓ |
| 9 | Biolum Spores | TransitionOverlay | ✓ |
| 10 | Server Rack Parallax | DatacenterReveal | ✓ |
| 11 | Critter Workstations | DatacenterReveal | ✓ |
| 12 | Cable Run Snake | DatacenterReveal | ✓ |
| 13 | Blinking LED Grid | DatacenterReveal | ✓ |
| 14 | Sticky Terminal | DatacenterReveal | ✓ |
| 15 | Reverse Scroll Lock | TODO | ◯ |

## Required Assets

```
public/assets/
├── cave/
│   ├── cave-transition-v3.png    # Background
│   └── otter-key.png             # TODO: Generate
├── datacenter/
│   ├── datacenter-background-v4.png  # With cave ceiling
│   └── critters/
│       ├── groundhog-scientist.png   # TODO: Bake into scene
│       ├── groundhog-security.png    # TODO: Bake into scene
│       ├── beaver.png                # TODO: Generate
│       ├── mole.png                  # TODO: Generate
│       └── otter.png                 # TODO: Generate
```

## Asset Generation Strategy

Since compositing separate characters doesn't work well (style mismatch), we should:

1. **Option A (Recommended):** Generate a single datacenter image with all critters baked in
   - Use Gemini/Imagen with detailed prompt describing the full scene
   - All characters will have consistent lighting and style

2. **Option B:** Generate critters in matching style to datacenter
   - Photorealistic critters instead of Pixar-style
   - Still composite, but better style match

## Dependencies

- `framer-motion` (animations, springs, scroll tracking)
- `react` (state management)
- Tailwind CSS (styling)

## Mobile Considerations

The ScrollJail is **desktop-only**. On mobile:
- Skip the otter interaction entirely
- Either hide datacenter or show it as a normal scroll section
- Use `@media (hover: hover)` to detect touch devices
