# SCROLL_ARCHITECTURE.md
# Scroll Zone Map & Behavior

**Updated:** 2026-02-05 (Rocky zone removed)

---

## Scroll Map

```
0vh ────── HERO: Sky (100vh, full viewport lock)
           snap: mandatory
           Name "Daniel Garcia" TOP RIGHT, parallax behind horizon

100vh ──── TRANSITION: Sky → Forest (50vh desktop / 30vh mobile)
           Background crossfade via mask-image
           Altitude meter: +500ft → +200ft
           No snap alignment

150vh ──── STORY 1: "People First" / Forest (100vh)
           snap: proximity (desktop) / mandatory (mobile)
           Altitude: +200ft → +50ft
           Text zone: left side (darker canopy area)

250vh ──── TRANSITION: Forest → Coastal (50vh / 30vh)

300vh ──── STORY 2: "Automation Obsession" / Coastal (100vh)
           snap: proximity / mandatory
           Altitude: +50ft → 0ft

400vh ──── TRANSITION: Coastal → Cave (70vh / 50vh)
           Most dramatic transition — darkening, immersion
           Altitude: 0ft → -50ft

470vh ──── DATACENTER: Easter Egg Zone (100vh)
           snap: mandatory
           Altitude: -100ft
```

Total scroll distance: ~570vh desktop / ~470vh mobile

## CSS Implementation

```css
/* Scroll container */
html {
  scroll-snap-type: y proximity;
  scroll-behavior: smooth;
}

@media (max-width: 768px) {
  html {
    scroll-snap-type: y mandatory;
  }
}

/* Zone sections */
.zone {
  min-height: 100vh;
  scroll-snap-align: start;
  position: relative;
  overflow: hidden;
}

/* Transition sections — NO snap */
.transition-zone {
  height: 50vh;
  position: relative;
  /* scroll-snap-align intentionally omitted */
}

@media (max-width: 768px) {
  .transition-zone {
    height: 30vh;
  }
}
```

## Transition Zone Blending (CSS mask-image)

```css
.transition-zone {
  position: relative;
  overflow: hidden;
}

.transition-zone .layer-from {
  position: absolute;
  inset: 0;
  background: var(--from-zone-bg);
  background-size: cover;
  background-position: bottom center;
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
}

.transition-zone .layer-to {
  position: absolute;
  inset: 0;
  background: var(--to-zone-bg);
  background-size: cover;
  background-position: top center;
  mask-image: linear-gradient(to bottom, transparent 0%, black 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 100%);
}

/* Color bridge gradient */
.transition-zone .color-bridge {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    var(--from-zone-tint),
    var(--to-zone-tint)
  );
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

## Altitude Meter

Driven by Framer Motion `useScroll`:

```jsx
const { scrollYProgress } = useScroll();
const altitude = useTransform(scrollYProgress, [0, 1], [500, -100]);
```

Desktop: Fixed left sidebar, shows number + zone label.
Mobile: Collapsed to a small dot indicator (top-right), shows altitude only on tap.

## Parallax Rules

| Element | Desktop | Tablet | Mobile | Reduced Motion |
|---------|---------|--------|--------|----------------|
| Background layers | 1.0x | 0.7x | OFF | OFF |
| Text containers | 0.5x offset | 0.3x | OFF | OFF |
| Characters | 0.8x | 0.5x | OFF | OFF |
| Particles | CSS animation | CSS animation | OFF | OFF |

On mobile: replace `background-attachment: fixed` with JS transform fallback.
See implementation task 11 in `specs/02-IMPLEMENTATION.md`.

## prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  .zone { background-attachment: scroll; }
  .particle { display: none; }
  .transition-zone { height: 20vh; }
  /* Keep opacity transitions, remove transforms */
}
```
