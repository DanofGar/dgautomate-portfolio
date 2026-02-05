# RESPONSIVE_STRATEGY.md
# Breakpoints, Reflow, and Image Handling

---

## Breakpoints

```css
/* Mobile portrait */
@media (max-width: 767px) and (orientation: portrait) { }

/* Mobile landscape */
@media (max-width: 767px) and (orientation: landscape) { }
/* Also: (max-height: 500px) and (orientation: landscape) for short phones */

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Wide desktop (cinematic) */
@media (min-width: 1440px) { }
```

## Layout Per Breakpoint

### Desktop (≥1024px)
- Background: full-bleed, 16:9 natural crop
- Story text: positioned left or right (alternating per zone), max-width 520px
- Vignette scrim: radial gradient behind text
- Parallax: full intensity
- Transition zones: 50vh
- Altitude meter: fixed left sidebar

### Tablet Landscape (768–1023px)
- Same as desktop with:
  - Text max-width: 480px
  - Parallax: 0.7x multiplier
  - Altitude meter: collapsed dot

### Mobile Portrait (<768px)
- Background: `object-position` shifts to best region (see crop map below)
- Story text: bottom-aligned, full-width with horizontal padding
- Scrim: linear gradient from bottom (transparent top → dark bottom)
- Parallax: OFF (performance)
- Scroll-snap: mandatory
- Transition zones: 30vh
- Altitude meter: hidden (or minimal dot, top-right corner)

### Mobile Landscape (<768px height, landscape orientation)
- Background: 16:9 natural fit (no cropping needed)
- Story text: right-aligned, compact, max-width 360px
- Parallax: OFF
- Scroll-snap: mandatory
- "Cinematic peek" mode — backgrounds shine, text is minimal

## Image Crop Points (Mobile Portrait)

When backgrounds are displayed in portrait (9:16-ish), only a portion
of the 16:9 image is visible. `object-position` selects the focus area:

```css
/* Per zone — adjust after seeing actual generated panels */
.sky-bg    { object-fit: cover; object-position: 50% 30%; }  /* sun + cloud break */
.forest-bg { object-fit: cover; object-position: 40% 50%; }  /* path + god rays */
.rocky-bg  { object-fit: cover; object-position: 50% 50%; }  /* center rock face */
.coastal-bg { object-fit: cover; object-position: 30% 40%; } /* cliff + ocean */
.cave-bg   { object-fit: cover; object-position: 50% 50%; }  /* center transition */
.dc-bg     { object-fit: cover; object-position: 50% 60%; }  /* workstations */
```

These values are starting points. Adjust during REVIEW phase based on
actual asset composition.

## Image Serving (Next.js)

```jsx
<Image
  src="/assets/sky/hero-sky-v3.webp"
  alt="Aerial view of Big Sur at sunset"
  fill
  priority={isHero}
  sizes="100vw"
  quality={85}
  placeholder="blur"
  blurDataURL={skyBlurHash}
  style={{ 
    objectFit: 'cover', 
    objectPosition: cropPoints[zone][breakpoint] 
  }}
/>
```

Format negotiation: Next.js automatically serves AVIF > WebP > JPEG
based on browser support. Generate source images at 2560x1440.

## Text Scrim Per Breakpoint

### Desktop: Radial vignette (positioned behind text)
```css
.text-scrim-desktop::before {
  background: radial-gradient(
    ellipse at center,
    rgba(0,0,0,0.5) 0%,
    rgba(0,0,0,0.2) 50%,
    transparent 80%
  );
}
```

### Mobile Portrait: Bottom gradient (covers lower third)
```css
.text-scrim-mobile::after {
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.7) 0%,
    rgba(0,0,0,0.4) 40%,
    transparent 100%
  );
  height: 50%;
  bottom: 0;
}
```

### Mobile Landscape: Right-side gradient
```css
.text-scrim-landscape::after {
  background: linear-gradient(
    to left,
    rgba(0,0,0,0.6) 0%,
    rgba(0,0,0,0.3) 40%,
    transparent 100%
  );
  width: 50%;
  right: 0;
}
```

## Typography Scaling

```css
.story-title {
  font-size: clamp(2rem, 5vw, 4rem);
}

.story-body {
  font-size: clamp(0.95rem, 2vw, 1.25rem);
  line-height: 1.7;
  max-width: min(520px, calc(100vw - 3rem));
}

@media (max-width: 767px) and (orientation: portrait) {
  .story-body {
    max-width: 100%;
    padding: 0 1.5rem;
  }
}
```
