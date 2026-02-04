# dgautomate.dev Portfolio - Continuation Prompt

## Project Context

You're continuing work on **dgautomate.dev**, a portfolio website with a Big Sur/Garrapata Trail scroll journey theme. The user scrolls from +500ft (sky) down to -100ft (secret underground data center).

## Key Locations

- **Project**: `~/Projects/dgautomate-portfolio/`
- **Assets**: `~/Projects/dgautomate-portfolio/public/assets/`
- **Branch**: `feat/cinematic-video-zones`

## Current Task: Zone Integration & Visual Polish

Integrate wildlife sprites into existing zone backgrounds, add seamless zone transitions, and refresh text to be more casual/creative.

## Asset Status (Feb 4, 2026)

### Backgrounds (APPROVED - photorealistic, keep as-is)
| Zone | File | Status |
|------|------|--------|
| Sky | `sky/sky-background-v2.png` | ✓ APPROVED |
| Forest | `forest/forest-background-v2.png` | ✓ APPROVED |
| Rocky | `rocky/rocky-climb-v2.png` | ✓ APPROVED |
| Coastal | `coastal/coastal-overlook-v2.png` | ✓ APPROVED (favorite) |
| Burrows | `burrows/underground-transition-v2.png` | ✓ APPROVED |
| Datacenter | `datacenter/datacenter-background-v3.png` | ✓ APPROVED |

### Wildlife Sprites (NEW - realistic style, for overlay)
| Zone | Creature | File |
|------|----------|------|
| Sky | Brown Pelican | `sky/wildlife/pelican-silhouette.png` |
| Forest | Banana Slug | `forest/wildlife/banana-slug-small.png` |
| Forest | Steller's Jay | `forest/wildlife/stellers-jay-realistic.png` |
| Rocky | California Quail | `rocky/wildlife/california-quail-realistic.png` |
| Rocky | Fence Lizard | `rocky/wildlife/fence-lizard-realistic.png` |
| Coastal | Sea Otter | `coastal/wildlife/sea-otter-realistic.png` |
| Coastal | Cormorant | `coastal/wildlife/cormorant-realistic.png` |

### Groundhog Characters (for Datacenter)
All 9 characters in `characters/` - see PROMPT.md for details

## New Components Created

| Component | Purpose |
|-----------|---------|
| `src/components/effects/ZoneBackground.tsx` | Wraps zones with background images + gradient transitions |
| `src/components/ui/WildlifeSprite.tsx` | Hoverable wildlife with info tooltips |
| `src/styles/zone-transitions.css` | CSS for seamless zone blending |

## Zone Transition Strategy

Zones blend via gradient overlays at borders:
```
SKY (top) - no top gradient
    ↓ bottom gradient fades to forest greens
FOREST
    ↓ gradient fades to rocky earth tones
ROCKY
    ↓ gradient fades to coastal blues
COASTAL
    ↓ gradient fades to underground browns
BURROWS
    ↓ gradient fades to datacenter cool tones
DATACENTER (bottom) - no bottom gradient
```

## Key Guidelines

### Style (from STYLING_GUIDE.md)
- **Physics zones**: Coastal (slow) for emotional content, Technical (snappy) for interactions
- **Colors**: Marine Layer palette - deep-ocean, sea-foam, wet-sand, granite, sunset
- **Wildlife**: Small, subtle accents (3-8% viewport width), natural positions

### Text Tone
- Casual, conversational, personality-driven
- Show don't tell (real numbers, specific examples)
- NOT corporate resume speak

### Libraries Available
- Aceternity UI (Aurora, particles, text effects)
- Magic UI (Bento grid, Dock, typing animation)
- Shadcn (structural primitives)
- Framer Motion (physics-based animations)

## Next Steps

Run the Ralph loop:
```bash
cd ~/Projects/dgautomate-portfolio
while :; do cat PROMPT.md | claude --dangerously-skip-permissions; done
```

The loop will iterate through PROMPT.md tasks until `.loop_complete` is created.

## Key Files

- `PROMPT.md` - Ralph loop task checklist
- `STYLING_GUIDE.md` - Physics zones, component libraries, color palette
- `PREFERENCES.md` - Coding style preferences
- `docs/plans/2026-02-02-brand-document.md` - Brand guidelines

## API Access

- **Imagen 4 Ultra**: `imagen-4.0-ultra-generate-001` via `GOOGLE_API_KEY`
- **Scripts**: `scripts/generate-realistic-wildlife.py`, `scripts/generate-zone-scenes.py`

## Verification

After changes:
1. `npm run dev` - start dev server
2. Scroll through page - check zone transitions
3. Test wildlife tooltips on hover
4. Check mobile viewport
5. `npm run build` - ensure no errors
