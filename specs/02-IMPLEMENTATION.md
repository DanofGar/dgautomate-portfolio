# 02-IMPLEMENTATION.md
# Phase: IMPLEMENTATION — Build the Refactored Site

**Status:** BLOCKED (waiting on ASSETS phase)  
**Branch:** `feature/v3-refactor`  
**Prereq:** All assets APPROVED in `specs/01-ASSETS.md`

---

## Read These When Referenced

- Scroll behavior → `specs/SCROLL_ARCHITECTURE.md`
- Responsive rules → `specs/RESPONSIVE_STRATEGY.md`
- Performance limits → `specs/PERFORMANCE_BUDGET.md`
- Design rationale → `specs/DESIGN_DECISIONS.md`

## Task Tracker

Complete IN ORDER. Each task = 1 focused commit (or small series).
Do not skip ahead. After each task, verify `npm run build` passes.

| # | Task | Status | Commit(s) | Notes |
|---|------|--------|-----------|-------|
| 1 | Create branch from clean main | NOT_STARTED | | `git checkout -b feature/v3-refactor` |
| 2 | Copy approved assets to public/assets/ | NOT_STARTED | | Replace existing backgrounds, add cave-transition |
| 3 | Implement scroll-snap zone architecture | NOT_STARTED | | See `specs/SCROLL_ARCHITECTURE.md` |
| 4 | Add transition zones with mask-image blending | NOT_STARTED | | 15vh overlap, CSS gradient masks |
| 5 | Replace glass cards with emerging text | NOT_STARTED | | Vignette scrim approach, see DESIGN_DECISIONS |
| 6 | Wire up Framer Motion scroll-linked animations | NOT_STARTED | | useScroll + useTransform per zone |
| 7 | Implement responsive reflow | NOT_STARTED | | See `specs/RESPONSIVE_STRATEGY.md` |
| 8 | Position characters in datacenter only | NOT_STARTED | | WebP with alpha, subtle idle animation |
| 9 | Add atmospheric CSS particles per zone | NOT_STARTED | | CSS-only pseudo-elements, see below |
| 10 | Performance optimization pass | NOT_STARTED | | See `specs/PERFORMANCE_BUDGET.md` |
| 11 | Mobile Safari parallax fallback | NOT_STARTED | | JS fallback for background-attachment:fixed |
| 12 | Cross-browser/device testing | NOT_STARTED | | Chrome, Safari, Firefox, iOS Safari, Android Chrome |
| 13 | Deploy preview | NOT_STARTED | | Vercel/Netlify preview URL |

## Task Details

### Task 3: Scroll-snap Architecture
Read `specs/SCROLL_ARCHITECTURE.md` for full scroll map.
Key implementation points:
- Container: `scroll-snap-type: y proximity` on desktop, `mandatory` on mobile
- Each zone: `scroll-snap-align: start`
- Transition zones between sections: no snap alignment
- Altitude meter: reads from `useScroll` progress value

### Task 4: Transition Zone Blending
Between each pair of adjacent zones, insert a 15vh div:
```css
.transition-zone {
  position: relative;
  height: 15vh;
}
.transition-zone .from-zone {
  /* Upper zone bg, positioned at bottom */
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
}
.transition-zone .to-zone {
  /* Lower zone bg, positioned at top */
  mask-image: linear-gradient(to bottom, transparent 0%, black 100%);
}
```
Plus a color-bridging gradient overlay.

### Task 5: Emerging Text (Replacing Glass Cards)
Do NOT use: backdrop-filter, border, border-radius, card containers.
DO use: radial gradient scrim behind text area, heavy text-shadow, 
scroll-triggered opacity (0 → 1 over 20vh scroll distance).
```css
.story-text-container {
  position: relative;
  max-width: 520px;
  /* No background, no border, no card */
}
.story-text-container::before {
  content: '';
  position: absolute;
  inset: -3rem;
  background: radial-gradient(
    ellipse at center,
    rgba(0,0,0,0.5) 0%,
    rgba(0,0,0,0.2) 50%,
    transparent 80%
  );
  z-index: -1;
  pointer-events: none;
}
```

### Task 9: Atmospheric Particles
CSS-only, no canvas, no JS. Per zone:
- **Forest:** Floating dust motes (tiny circles, slow drift upward)
- **Rocky:** None (clean, stark)
- **Coastal:** Subtle sea spray dots (drift left-to-right)
- **Cave transition:** Dust falling downward
- **Datacenter:** None (already has video loop)

Max 15 pseudo-element particles per zone. Use `@media (prefers-reduced-motion: reduce)` to disable.

### Task 11: Mobile Safari Parallax Fix
`background-attachment: fixed` is broken on iOS Safari.
Detection: `const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)`
Fallback: Convert fixed backgrounds to absolutely positioned divs with 
JS-driven `transform: translate3d(0, calc, 0)` based on scroll position.
Wrap in `requestAnimationFrame`.

## Agent Workflow (per cycle)

```
1. Read this file
2. Find first NOT_STARTED task
3. Read any referenced spec files for that task
4. Implement the change
5. Run `npm run build` — fix any errors
6. Update task status to COMPLETE
7. Git commit with conventional format
8. Continue to next task OR stop if task was complex (>30 min work)
```

## DONE Condition

All 13 tasks COMPLETE. Build passes. Preview deployed.
Update AGENT_ROUTER.md: `Current Phase: REVIEW`
