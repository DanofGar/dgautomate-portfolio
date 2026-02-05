# SCROLL_JAIL.md
# Secret Level Unlock Mechanic

**Created:** 2026-02-05
**Status:** Component scaffolding complete, assets pending

---

## Concept

The website **ends** at the Cave Mouth section. Users hit a "scroll jail" — they cannot continue down. Hidden on the rocks is an **Otter** that serves as the key to unlock a secret Datacenter level.

This gamifies the portfolio experience and makes the technical section feel **discovered** rather than presented.

---

## User Flow

```
1. User scrolls: Sky → Forest → Coastal → Cave Mouth
2. At Cave Mouth: SCROLL LOCKED (rubber band effect on overscroll)
3. User notices Otter on rocks
4. Hover: Otter glows (beacon pulse), tooltip appears "Go deeper?"
5. Click: THE PLUNGE
   - Cave zooms in (transform-origin at otter)
   - Blackout wipe
   - "> ACCESS_GRANTED" typewriter
   - Bioluminescent particles shift grey → neon
6. User lands in Datacenter section
7. Datacenter has critters working at stations
8. (Optional) Reverse scroll lock prevents going back up
```

---

## Components

| Component | File | Purpose |
|-----------|------|---------|
| ScrollJailProvider | `ScrollJailProvider.tsx` | State machine + scroll lock logic |
| OtterKey | `OtterKey.tsx` | Interactive otter with hover/glow/click |
| CaveMouth | `CaveMouth.tsx` | Cave background + zoom effect |
| TransitionOverlay | `TransitionOverlay.tsx` | Blackout + typewriter + particles |
| DatacenterReveal | `DatacenterReveal.tsx` | Hidden section with critters |

---

## Effects Reference

| # | Effect | Trigger | Implementation |
|---|--------|---------|----------------|
| 1 | Elastic Dead End | Overscroll at cave | `useSpring` dampened bounce |
| 2 | Idle Otter | Passive | Mouse tracking → subtle rotation |
| 3 | Beacon Pulse | Hover | CSS `drop-shadow` animation loop |
| 4 | Tooltip | Hover | Framer Motion fade + translate |
| 5 | The Plunge | Click | `animate()` rapid scroll to datacenter |
| 6 | Cave Zoom | Click | `transform: scale(5)` from otter origin |
| 7 | Blackout Wipe | Transition | Full-screen div opacity 0→1→0 |
| 8 | Typewriter | Transition | Interval-based text reveal |
| 9 | Biolum Spores | Transition | Canvas/div particles color shift |
| 10 | Rack Parallax | Scroll | `useTransform` slower Y movement |
| 11 | Critter Sprites | In view | `IntersectionObserver` trigger |
| 12 | Cable Run | In view | SVG `pathLength` animation |
| 13 | LED Grid | Passive | Randomized opacity keyframes |
| 14 | Sticky Terminal | Scroll | `position: sticky` card |
| 15 | Reverse Lock | Unlocked | Prevent upward scroll past cave |

---

## Asset Requirements

### Otter Key (NEW)
```
Prompt for otter-key.png:
Sea otter resting on coastal rocks, Big Sur California, golden hour
lighting matching cave-transition-v3.png. Otter is alert, looking
toward camera. Photorealistic, subtle, could be mistaken for natural
part of the scene. Size: ~200x150px transparent PNG.
```

### Datacenter with Critters (REGENERATE)
```
Prompt for datacenter-with-critters.png:
Underground datacenter built inside a natural cave. Cave ceiling with
stalactites visible at top. Two-level industrial server room with:
- Green-lit monitors at workstations
- Blue-glowing server racks
- Warm yellow work lights

CHARACTERS IN SCENE (all 3D Pixar-style, properly lit):
- Groundhog in lab coat at upper workstation (scientist)
- Groundhog in security uniform on lower level (guard)
- Sea otter just arrived, looking around (guide)
- Small beaver at a terminal (optional)
- Mole running cables on floor (optional)

All characters should match the scene lighting (blue-green ambient
with warm accent lights). Characters are working, not posing.

Cinematic composition, photorealistic environment with stylized
characters integrated naturally. 16:9, 2560x1440.
```

---

## Mobile Fallback

The ScrollJail is **desktop-only**. Mobile users:
- See Cave Mouth as final section (no otter interaction)
- OR see a simplified "tap to reveal" button
- OR skip datacenter entirely (it's an easter egg)

Detection:
```css
@media (hover: hover) and (pointer: fine) {
  /* Desktop: enable full interaction */
}
```

---

## Files Created

```
src/components/ScrollJail/
├── index.ts
├── ScrollJailProvider.tsx
├── OtterKey.tsx
├── CaveMouth.tsx
├── TransitionOverlay.tsx
├── DatacenterReveal.tsx
└── USAGE.md
```

---

## Next Steps

1. [ ] Generate `otter-key.png` asset
2. [ ] Regenerate datacenter with critters baked in
3. [ ] Test component integration
4. [ ] Add mobile fallback
5. [ ] Add reverse scroll lock (effect #15)
