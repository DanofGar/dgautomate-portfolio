# Zone Integration & Visual Polish Loop

## Your Mission
Integrate wildlife sprites and zone transitions into the portfolio. Make the page flow seamlessly between zones. Make the text more casual and creative. The page should feel like descending a Big Sur coastal trail.

## Context Files (Read First)
- `STYLING_GUIDE.md` - Physics zones, component libraries (Aceternity, Magic UI, Shadcn), color palette
- `CONTINUE-SESSION.md` - Current state and what's been done
- `src/components/zones/*.tsx` - Existing zone components to update
- `src/components/effects/ZoneBackground.tsx` - New background component with gradient transitions
- `src/components/ui/WildlifeSprite.tsx` - New wildlife sprite component with hover tooltips
- `src/styles/zone-transitions.css` - CSS for zone blending

## Assets Available
```
public/assets/
├── sky/
│   ├── sky-background-v2.png (photorealistic background)
│   └── wildlife/pelican-silhouette.png
├── forest/
│   ├── forest-background-v2.png (photorealistic background)
│   └── wildlife/banana-slug-small.png, stellers-jay-realistic.png
├── rocky/
│   ├── rocky-climb-v2.png (photorealistic background)
│   └── wildlife/california-quail-realistic.png, fence-lizard-realistic.png
├── coastal/
│   ├── coastal-overlook-v2.png (photorealistic background)
│   └── wildlife/sea-otter-realistic.png, cormorant-realistic.png
├── burrows/
│   └── underground-transition-v2.png (photorealistic background)
├── datacenter/
│   └── datacenter-background-v3.png (photorealistic background)
└── characters/*.png (groundhog characters for datacenter)
```

## Task Checklist (Check Off As You Complete)

### Phase 1: Zone Background Integration
- [ ] Sky.tsx - Replace CSS gradients with ZoneBackground component + background image
- [ ] Forest.tsx - Replace CSS gradients with ZoneBackground component + background image
- [ ] RockyClimb.tsx - Replace CSS gradients with ZoneBackground component + background image
- [ ] CoastalOverlook.tsx - Replace CSS gradients with ZoneBackground component + background image
- [ ] UndergroundBurrows.tsx - Replace CSS gradients with ZoneBackground component + background image
- [ ] Verify gradient transitions blend zones smoothly (scroll test)

### Phase 2: Wildlife Sprites
- [ ] Add pelican to Sky zone (small, top-right area, drifting animation)
- [ ] Add banana slug + Steller's jay to Forest zone (subtle placement)
- [ ] Add quail + lizard to Rocky zone (on rocks, small scale)
- [ ] Add sea otter to Coastal zone (lower left, in water area)
- [ ] Add hover tooltips with fun facts for each creature

### Phase 3: Text & Copy Refresh
- [ ] Sky hero text - Casual, personality-driven intro (not resume-speak)
- [ ] Forest text - Creative way to show operations skills
- [ ] Rocky text - Engaging description of technical abilities
- [ ] Coastal text - Natural flow into underground transition
- [ ] Overall - Remove corporate buzzwords, add voice

### Phase 4: Visual Enhancements (from STYLING_GUIDE.md)
- [ ] Add Aceternity particles or Aurora effect to Sky zone
- [ ] Add dappled light overlay effect to Forest zone
- [ ] Add subtle wind/grass movement to Rocky zone
- [ ] Add water sparkle or wave effect to Coastal zone
- [ ] Consider Magic UI Dock for navigation

### Phase 5: Verification (REQUIRED before marking complete)
- [ ] Run `npm run dev` - no errors
- [ ] Scroll through entire page - transitions smooth
- [ ] Test wildlife hover tooltips
- [ ] Test mobile viewport (resize to 375px width)
- [ ] Take screenshots of each zone to `/tmp/zone-screenshots/`
- [ ] Run `npm run build` - no errors

## Style Guidelines

### Physics Zones (from STYLING_GUIDE.md)
- **Coastal physics** (slow, drifting): Hero text, parallax, emotional content
- **Technical physics** (snappy): Buttons, forms, navigation
- **Flora physics** (organic growth): Timelines, skill trees

### Colors - Marine Layer Palette
```
deep-ocean: oklch(25% 0.1 240)
sea-foam: oklch(85% 0.05 190)
wet-sand: oklch(80% 0.08 80)
granite: oklch(40% 0.02 260)
sunset: oklch(70% 0.2 40)
```

### Text Tone
- Casual, conversational, shows personality
- NOT: "Results-driven professional with 10+ years..."
- YES: "I build systems that don't break at 3am"
- Show don't tell - proof points with real numbers

### Wildlife Placement
- Small, subtle accents (3-8% of viewport width)
- Natural positions (bird in sky, slug on log, otter in water)
- Don't compete with content for attention

## Verification Commands
```bash
# Start dev server
npm run dev

# Take screenshots (use after visual changes)
# Install playwright if needed: npx playwright install chromium
npx playwright screenshot http://localhost:3000 /tmp/zone-screenshots/full-page.png --full-page

# Build check
npm run build
```

## Commit Protocol
After completing a meaningful chunk of work:
```bash
git add -A && git commit -m "feat(zones): [what you did]

Co-Authored-By: Claude <noreply@anthropic.com>"
```

## Exit Conditions

### Per-Iteration
Complete ONE logical chunk from the checklist, commit it, then exit.
Good stopping points:
- One zone fully updated with ZoneBackground
- Wildlife sprites added to one zone
- Text refreshed for one zone
- One visual enhancement added

### Loop Completion
When ALL checkboxes above are checked:
1. Run verification commands
2. Take final screenshots
3. Run `touch .loop_complete`
4. Exit

**Only create `.loop_complete` when everything is done and verified.**
