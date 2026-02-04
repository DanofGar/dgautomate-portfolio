# dgautomate.dev Portfolio - Session Context

## Project Overview

**dgautomate.dev** is a portfolio that tells your story through scenic Big Sur backdrops using a **hybrid layout approach** with specific Aceternity UI and Magic UI components.

**Branch:** `feat/cinematic-video-zones`
**Project:** `~/Projects/dgautomate-portfolio/`

---

## Layout Strategy: Hybrid Approach (CONFIRMED)

```
┌─────────────────────────────────────────┐
│  HERO (Full-bleed Aurora Background)    │  ← Aceternity Aurora
│  Text Generate Effect for hook line     │
│  Pelican with 3D Card parallax          │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  STICKY SCROLL REVEAL (Aceternity)      │
│  ┌──────────────┬───────────────────┐   │
│  │ Glass Cards  │ Forest backdrop   │   │
│  │ + Border     │ + Particles       │   │
│  │ Beam glow    │ + Wildlife        │   │
│  │              ├───────────────────┤   │
│  │ Sticky text  │ Rocky backdrop    │   │
│  │ transitions  │                   │   │
│  │ as user      ├───────────────────┤   │
│  │ scrolls      │ Coastal backdrop  │   │
│  │              │ + Particles       │   │
│  └──────────────┴───────────────────┘   │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  DATACENTER (Full-bleed Showstopper)    │  ← Background Beams
│  Animated groundhogs, Terminal contact  │
│  Scratch To Reveal easter egg           │
└─────────────────────────────────────────┘
          +
┌─────────────────────────────────────────┐
│  FLOATING DOCK (Fixed bottom)           │  ← Navigation
│  Wildlife-themed icons                  │
└─────────────────────────────────────────┘
```

---

## Component Stack (CONFIRMED)

### From Aceternity UI:
| Component | Use |
|-----------|-----|
| Aurora Background | Hero sky effect (California sunset colors) |
| Text Generate Effect | Hook line text reveal |
| Sticky Scroll Reveal | Story section layout |
| 3D Card Effect | Wildlife parallax depth |
| Background Beams | Datacenter tech aesthetic |
| Floating Dock | Navigation with wildlife icons |
| Typewriter Effect | Terminal form labels |

### From Magic UI:
| Component | Use |
|-----------|-----|
| Border Beam | Glowing edge on content cards |
| Particles | Forest pollen, coastal mist, data streams |
| Scratch To Reveal | Datacenter easter egg |

### Installation:
```bash
npx shadcn@latest add "https://ui.aceternity.com/r/aurora-background"
npx shadcn@latest add "https://ui.aceternity.com/r/sticky-scroll-reveal"
npx shadcn@latest add "https://ui.aceternity.com/r/3d-card"
npx shadcn@latest add "https://ui.aceternity.com/r/background-beams"
npx shadcn@latest add "https://ui.aceternity.com/r/floating-dock"
npx shadcn@latest add "https://ui.aceternity.com/r/text-generate-effect"
npx shadcn@latest add "https://ui.aceternity.com/r/typewriter-effect"
npx shadcn@latest add "https://magicui.design/r/border-beam"
npx shadcn@latest add "https://magicui.design/r/particles"
npx shadcn@latest add "https://magicui.design/r/scratch-to-reveal"
```

---

## Color Progression (The Descent)

| Section | Border Beam Color | Particles | Atmosphere |
|---------|-------------------|-----------|------------|
| Hero | Gold `#FFD93D` | None | California sunset aurora |
| Forest | Amber `#F59E0B` | Pale yellow pollen | Dappled sunlight |
| Rocky | Earth `#D97706` | None | Warm afternoon |
| Coastal | Ocean `#0EA5E9` | White/blue mist | Sea spray |
| Datacenter | Green `#22C55E` | Green data streams | Tech underground |

---

## Asset Inventory

### Backgrounds
| Zone | File | Used In |
|------|------|---------|
| Sky | `sky/sky-background-v2.png` | Hero (behind Aurora) |
| Forest | `forest/forest-background-v2.png` | Sticky Scroll panel 1 |
| Rocky | `rocky/rocky-climb-v2.png` | Sticky Scroll panel 2 |
| Coastal | `coastal/coastal-overlook-v2.png` | Sticky Scroll panel 3 |
| Datacenter | `datacenter/datacenter-background-v3.png` | Showstopper (over Beams) |

### Wildlife (with 3D Card Effect)
| Zone | Creature | File |
|------|----------|------|
| Hero | Pelican | `sky/wildlife/pelican-silhouette.png` |
| Forest | Banana Slug | `forest/wildlife/banana-slug-small.png` |
| Forest | Steller's Jay | `forest/wildlife/stellers-jay-realistic.png` |
| Rocky | California Quail | `rocky/wildlife/california-quail-realistic.png` |
| Rocky | Fence Lizard | `rocky/wildlife/fence-lizard-realistic.png` |
| Coastal | Sea Otter | `coastal/wildlife/sea-otter-realistic.png` |

### Groundhog Characters
| Character | File | Behavior |
|-----------|------|----------|
| Coffee Runner | `characters/coffee-runner.png` | Animated walk 8-10s |
| Security Guard | `characters/security-guard.png` | Animated walk 12s |
| + 7 stationary | `characters/*.png` | Subtle breathing/typing |

---

## Content Plan

### Hero
```
Daniel G

I build systems that work while I sleep.
```

### Forest Card (in Sticky Scroll)
```
People First

I started in sales, which means I spent years learning
to actually listen. Turns out that skill transfers
pretty well to understanding what systems need to do.
```

### Rocky Card (in Sticky Scroll)
```
Breaking Things (On Purpose)

I like taking systems apart to see how they work.
Then I put them back together better. Usually.
The failures taught me more than the wins.
```

### Coastal Card (in Sticky Scroll)
```
The Automation Obsession

Now I spend my time teaching computers to do
the boring stuff so humans can do the interesting stuff.
It's basically professional laziness, but productive.
```

### Datacenter
- Terminal contact form with Typewriter labels
- LinkedIn link prominently placed
- Scratch To Reveal easter egg (karaoke groundhog)

---

## Mobile Strategy

### Portrait → Show prompt
- Lens-style effect: blurred landscape background
- "This view is too wide for portrait mode"
- "Rotate to see the full horizon"
- "Continue anyway" button

### Landscape → Simplified
- No wildlife
- No particles
- Simplified sticky scroll or card fallback
- Essential content only

---

## Key Files

| Purpose | File |
|---------|------|
| Task checklist | `PROMPT.md` |
| Component specs | `docs/plans/2026-02-04-component-recommendations.md` |
| Layout details | `docs/plans/2026-02-04-card-layout-design.md` |
| Animation physics | `STYLING_GUIDE.md` |
| Coding preferences | `PREFERENCES.md` |

---

## Running the Loop

```bash
cd ~/Projects/dgautomate-portfolio
while [[ ! -f .loop_complete ]]; do
  cat PROMPT.md | claude --dangerously-skip-permissions
done
```

---

## Quick Reminders

- **Wildlife:** Use 3D Card Effect with transparent PNG (no card background)
- **Border Beam:** Color changes as you descend (gold → green)
- **Particles:** Forest=pollen, Coastal=mist, Datacenter=data
- **Terminal:** Typewriter labels, groundhog popup on 10s idle
- **Easter egg:** Scratch To Reveal server panel
- **Navigation:** Floating Dock with wildlife-themed icons
