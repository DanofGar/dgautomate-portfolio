# dgautomate.dev Portfolio - Session Context

## Project Overview

**dgautomate.dev** is a portfolio website that tells your story through scenic Big Sur backdrops. The design has pivoted from a "continuous scroll journey" to a **card-based storytelling** approach.

**Branch:** `feat/cinematic-video-zones`
**Project:** `~/Projects/dgautomate-portfolio/`

---

## Design Direction (PIVOTED - Feb 4, 2026)

### Before (deprecated)
- Continuous vertical scroll through elevation zones
- Complex gradient blending between zones
- Altitude meter tracking scroll position

### After (current)
- **Card-based storytelling** with scenic backdrops
- Each card = background image + headline + paragraph + optional wildlife
- Scroll-triggered text animations
- Content sections as natural breaks (no gradient blending)
- Datacenter as ambitious showstopper reveal

---

## Target Audience & Platform Strategy

| Platform | Strategy |
|----------|----------|
| **Desktop** | Primary experience. Full animations, wildlife, datacenter spectacle |
| **Mobile Portrait** | Show obvious "rotate to landscape" prompt |
| **Mobile Landscape** | Simplified cards, no wildlife, gradient overlay for text readability |

**Audience:** Recruiters on desktop. LinkedIn link at end for detailed experience.

---

## The Card Layout

```
HERO (Sky)
├── Background: sky-background-v2.png
├── Wildlife: pelican (subtle bob animation)
├── Content: Name + one-liner
└── Scroll indicator

CARD 1 (Forest)
├── Background: forest-background-v2.png
├── Wildlife: banana slug, Steller's jay (bobbing)
├── Content: Headline + paragraph (sales → people skills)
└── Scroll-triggered text animation

CARD 2 (Rocky)
├── Background: rocky-climb-v2.png
├── Wildlife: quail, fence lizard (bobbing)
├── Content: Headline + paragraph (technical/problem-solving)
└── Scroll-triggered text animation

CARD 3 (Coastal)
├── Background: coastal-overlook-v2.png
├── Wildlife: sea otter (bobbing)
├── Content: Headline + paragraph (AI/automation pivot)
└── Scroll-triggered text animation

DATACENTER (Showstopper)
├── Background: datacenter-background-v3.png (with parallax)
├── Characters: 9 groundhogs (2 animated walkers, 7 stationary)
├── Effects: blinking LEDs, floating dust particles
├── Easter eggs: lyrics terminal, pickleball paddle
├── Content: Terminal contact form, LinkedIn link
└── THE WOW MOMENT
```

---

## Asset Inventory

### Backgrounds (approved, photorealistic)
| Zone | File | Status |
|------|------|--------|
| Sky | `sky/sky-background-v2.png` | ✓ Ready |
| Forest | `forest/forest-background-v2.png` | ✓ Ready |
| Rocky | `rocky/rocky-climb-v2.png` | ✓ Ready |
| Coastal | `coastal/coastal-overlook-v2.png` | ✓ Ready |
| Burrows | `burrows/underground-transition-v2.png` | ✓ Ready (transition) |
| Datacenter | `datacenter/datacenter-background-v3.png` | ✓ Ready |

### Wildlife Sprites (realistic style, for desktop)
| Zone | Creature | File |
|------|----------|------|
| Sky | Brown Pelican | `sky/wildlife/pelican-silhouette.png` |
| Forest | Banana Slug | `forest/wildlife/banana-slug-small.png` |
| Forest | Steller's Jay | `forest/wildlife/stellers-jay-realistic.png` |
| Rocky | California Quail | `rocky/wildlife/california-quail-realistic.png` |
| Rocky | Fence Lizard | `rocky/wildlife/fence-lizard-realistic.png` |
| Coastal | Sea Otter | `coastal/wildlife/sea-otter-realistic.png` |
| Coastal | Cormorant | `coastal/wildlife/cormorant-realistic.png` |

### Groundhog Characters (for datacenter)
| Character | File | Behavior |
|-----------|------|----------|
| Coffee Runner | `characters/coffee-runner.png` | Animated: walks L→R, 8-10s loop |
| Security Guard | `characters/security-guard.png` | Animated: walks R→L, 12s loop |
| Scientist | `characters/groundhog-scientist-v2.png` | Stationary (central workstation) |
| Network Engineer | `characters/network-engineer.png` | Stationary (server rack) |
| Server Technician | `characters/server-technician.png` | Stationary (crouched at panel) |
| Data Analyst | `characters/data-analyst.png` | Stationary (at monitors) |
| Senior Architect | `characters/senior-architect.png` | Stationary (drafting desk) |
| Intern | `characters/intern.png` | Stationary (supply area) |
| Karaoke Singer | `characters/karaoke-singer.png` | Stationary (near lyrics terminal) |

---

## Components Created

| Component | Purpose | Status |
|-----------|---------|--------|
| `src/components/effects/ZoneBackground.tsx` | Background + gradient overlays | Created, needs update for card layout |
| `src/components/ui/WildlifeSprite.tsx` | Hoverable wildlife with tooltips | Created, add bobbing animation |
| `src/styles/zone-transitions.css` | Zone blending CSS | Created, may not need with card approach |

## Components To Create

| Component | Purpose |
|-----------|---------|
| `StoryCard.tsx` | Card container (background + content + wildlife) |
| `MobileLandscapePrompt.tsx` | "Rotate your phone" modal for portrait mobile |
| `BobbingWildlife.tsx` | Wildlife with subtle vertical oscillation |
| `DatacenterScene.tsx` | The ambitious showstopper section |
| `AnimatedGroundhog.tsx` | Walking groundhog character |
| `LyricsTerminal.tsx` | Easter egg scrolling karaoke text |

---

## Animation Specifications

### Wildlife Bobbing (desktop only)
```tsx
animate={{ y: [0, -5, 0] }}
transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
```

### Text Scroll Reveal
```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: "easeOut" }}
viewport={{ once: true, margin: "-100px" }}
```

### Coffee Runner Walk Cycle
```tsx
animate={{
  x: ["0%", "80%", "0%"],
  y: [0, -3, 0, -3, 0]
}}
transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
```

### Security Guard Walk Cycle
```tsx
animate={{
  x: ["80%", "0%", "80%"],
  y: [0, -3, 0, -3, 0]
}}
transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
```

---

## Mobile Strategy

### Portrait Detection
When `window.innerWidth < 768` AND portrait orientation:
- Show full-screen modal prompting landscape rotation
- "Continue anyway" button to dismiss

### Mobile Layout (landscape)
- Background image with bottom gradient overlay (dark)
- Text content in lower portion (guaranteed readable)
- No wildlife sprites
- Simplified datacenter (static image, basic contact form)

---

## Content Guidelines

### Tone
- Casual, conversational, personality-driven
- NOT: "Results-driven professional with 10+ years..."
- YES: "I build systems that work while I sleep"

### Structure per Card
- **Headline:** Short, punchy (5-8 words)
- **Paragraph:** 2-3 sentences, tells part of the story

### Story Arc
1. **Hero:** Who you are (name + hook)
2. **Forest:** Where you came from (sales, people skills)
3. **Rocky:** What you can do (technical, problem-solving)
4. **Coastal:** Where you're going (AI/automation passion)
5. **Datacenter:** How to reach you (contact + LinkedIn)

---

## Datacenter Showstopper Spec

This is THE impressive part. Be ambitious.

### Must Have
- [ ] Background with depth (parallax layers)
- [ ] Coffee Runner walking animation
- [ ] Security Guard walking animation (opposite direction)
- [ ] Stationary groundhogs at workstations
- [ ] Blinking server LED animations
- [ ] Contact form (terminal-styled)
- [ ] LinkedIn link prominently placed

### Should Have
- [ ] Floating dust particles in light beams
- [ ] Hover groundhogs → job title/personality tooltip
- [ ] Subtle typing animation on stationary groundhogs

### Nice to Have
- [ ] Lyrics terminal easter egg (scrolling karaoke)
- [ ] Pickleball paddle easter egg (hidden clickable)
- [ ] Reveal animation (lights flicker on when scrolling in)
- [ ] Ambient sound toggle (server hum)

---

## Technical Notes

### Libraries Available
- **Framer Motion** - Scroll triggers, spring physics, gestures
- **Aceternity UI** - Text effects, aurora backgrounds, particles
- **Magic UI** - Bento grid, dock, typing animation
- **Shadcn** - Form components, dialogs

### Performance
- User wants "wow factor" over fast load times
- Still lazy-load below-fold images
- Consider WebP format for faster loads without quality loss

### Image Generation
- **Model:** `imagen-4.0-ultra-generate-001`
- **API Key:** `GOOGLE_API_KEY` environment variable
- **Scripts:** `scripts/generate-realistic-wildlife.py`

---

## Files to Reference

| Need | File |
|------|------|
| Task checklist | `PROMPT.md` |
| Card layout spec | `docs/plans/2026-02-04-card-layout-design.md` |
| Brand guidelines | `docs/plans/2026-02-02-brand-document.md` |
| Component libraries | `STYLING_GUIDE.md` |
| Coding preferences | `PREFERENCES.md` |

---

## Running the Loop

```bash
cd ~/Projects/dgautomate-portfolio
while [[ ! -f .loop_complete ]]; do
  cat PROMPT.md | claude --dangerously-skip-permissions
done
```

The loop iterates until all tasks complete and `.loop_complete` is created.
