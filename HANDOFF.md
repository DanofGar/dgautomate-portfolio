# HANDOFF — Ready for Deployment

## Quick Start
```
Read this file, then specs/SCROLL_ARCHITECTURE.md, then start implementation.
```

---

## Project Context

Building a portfolio site for **Daniel Garcia** (dgautomate.dev) with a Big Sur California theme. The site scrolls through nature zones (sky → forest → coastal → cave) with crossfade transitions between sections.

**Stack:** React, Framer Motion, Tailwind CSS, Next.js

---

## Approved Assets (Ready to Deploy)

```
public/assets/
├── sky/sky-background-v3.png         ← Hero section
├── forest/forest-background-v3.png   ← "People First" story
├── coastal/coastal-overlook-v3.png   ← "Automation Obsession" story
├── cave/cave-transition-v3.png       ← Dead end / easter egg trigger
└── datacenter/datacenter-background-v4.png  ← Hidden section (static fallback)
```

All backgrounds are photorealistic, Big Sur California, golden hour lighting, 16:9.

---

## Transition System

Transitions use **CSS mask-image crossfade** (not hard cuts):

```css
.transition-zone .layer-from {
  mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
  background-position: bottom center;
}

.transition-zone .layer-to {
  mask-image: linear-gradient(to bottom, transparent 0%, black 100%);
  background-position: top center;
}
```

Preview of full journey: `assets/preview/full-journey-preview.png`

---

## Content Structure

| Section | Zone | Content |
|---------|------|---------|
| Hero | Sky | Name "Daniel Garcia" top-right, parallax behind horizon |
| Story 1 | Forest | "People First" — bio/philosophy, text on left (darker canopy) |
| Story 2 | Coastal | "Automation Obsession" — skills/approach |
| Dead End | Cave | Scroll stops here (easter egg later) |
| Easter Egg | Datacenter | Hidden section (defer for now) |

---

## Key Specs

| File | Purpose |
|------|---------|
| `specs/SCROLL_ARCHITECTURE.md` | Scroll zones, vh heights, snap behavior |
| `specs/DESIGN_DECISIONS.md` | Locked decisions (don't revisit) |
| `specs/SCROLL_JAIL.md` | Easter egg mechanic (defer for MVP) |
| `specs/01-ASSETS.md` | Asset status tracker |

---

## Typography (from DESIGN_DECISIONS.md)

- **Headings:** Playfair Display or Fraunces (serif)
- **Body:** Source Serif 4
- **Text color:** Warm white `#F5F0E8`
- **Readability:** Multi-layer text-shadow, radial gradient vignette scrim

---

## Contact Info

- **Name:** Daniel Garcia
- **Email:** Dnlg2400@gmail.com
- **GitHub:** DanofGar
- **Domain:** dgautomate.dev

---

## Deferred (Not for MVP)

- [ ] Otter easter egg interaction
- [ ] Datacenter critter animation/video
- [ ] ScrollJail unlock mechanic
- [ ] Altitude meter UI

Components scaffolded in `src/components/ScrollJail/` but not wired up.

---

## What's Next

1. **Build the main page layout** with all 4 zones (sky, forest, coastal, cave)
2. **Implement crossfade transitions** between zones
3. **Add placeholder content** with Daniel's name and bio text
4. **Test scroll behavior** — snap, parallax, mobile responsiveness
5. **Deploy** to verify assets load correctly

---

## File Structure Reference

```
/
├── public/assets/          ← Production images
├── assets/preview/         ← Test composites (not deployed)
├── assets/raw/             ← Source files (not deployed)
├── specs/                  ← Design specs
├── src/components/         ← React components
│   └── ScrollJail/         ← Easter egg (deferred)
└── scripts/                ← Asset generation scripts
```
