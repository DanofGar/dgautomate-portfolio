# PERFORMANCE_BUDGET.md
# Performance Targets & Animation Rules

---

## Core Web Vitals Targets

| Metric | Target | Enforcement |
|--------|--------|-------------|
| LCP | < 2.5s | Hero sky image: `priority` loading, preload in `<head>` |
| FID / INP | < 100ms | No heavy JS on initial load |
| CLS | < 0.1 | All images have explicit `width`/`height` or `fill` with container |
| Total page weight | < 5MB | Aggressive image optimization |
| JS bundle | < 200KB | Current ~164KB — maintain this |
| Lighthouse Performance | ≥ 90 | Run during REVIEW phase |

## Image Budget

| Image Type | Format | Max Size (desktop) | Max Size (mobile) |
|------------|--------|-------------------|-------------------|
| Background panel | AVIF/WebP | 300KB | 150KB |
| Character (transparent) | WebP | 200KB | 100KB |
| Total images | | < 3MB | < 1.5MB |

### Loading Strategy
```
Hero (sky):     priority, no lazy, preload link in head
Forest:         lazy, loads when hero 50% scrolled (Intersection Observer)
Rocky:          lazy, IO trigger
Coastal:        lazy, IO trigger
Cave:           lazy, IO trigger
Datacenter:     lazy, only loads on deep scroll
Characters:     lazy, only when datacenter zone enters viewport
```

## Allowed Animations (GPU-composited, mobile-safe)

✅ `transform: translate3d(), scale3d(), rotate3d()`  
✅ `opacity`  
✅ `filter: blur()` — max 1 blurred element visible simultaneously  
✅ `mask-image` — static only, do not animate  
✅ CSS `animation` on pseudo-elements (particles)  
✅ Framer Motion `useTransform` with scroll-linked values  

## Forbidden (triggers layout/paint, kills mobile)

❌ Animating `width`, `height`, `top`, `left`, `margin`, `padding`  
❌ Animating `background-position` — use transform on wrapper instead  
❌ `background-attachment: fixed` on mobile — use JS fallback  
❌ `backdrop-filter: blur()` on more than 1 element simultaneously  
❌ Any `<canvas>` or WebGL for backgrounds  
❌ Video backgrounds (except existing datacenter-loop.mp4)  
❌ `will-change` left on permanently — add before animation, remove after  

## Scroll Performance

- All scroll listeners: `requestAnimationFrame` wrapped
- Framer Motion `useScroll` handles this automatically
- Intersection Observer for lazy loading — NOT manual scroll position math
- Passive event listeners only: `{ passive: true }`
- `will-change: transform` on parallax layers during animation only

## prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  /* Remove all transforms and parallax */
  .zone { background-attachment: scroll !important; }
  .particle { display: none !important; }
  .transition-zone { height: 20vh; }
  
  /* Keep: opacity transitions (subtle, non-disruptive) */
  /* Keep: scroll-snap behavior */
  /* Keep: color transitions */
}
```

## Bundle Monitoring

If the JS bundle exceeds 200KB after implementation:
1. Check for accidentally bundled dev dependencies
2. Verify Framer Motion is tree-shaken (import specific hooks, not `*`)
3. Use Next.js `next/dynamic` for datacenter components (lazy route)
4. Run `npx @next/bundle-analyzer` to identify bloat
