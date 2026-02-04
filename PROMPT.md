# Card-Based Portfolio - Integration Loop

## Your Mission
Build a storytelling portfolio with scenic backdrops using specific Aceternity UI and Magic UI components. Desktop-first, mobile-simplified.

## READ THESE FIRST (in order)
1. `CONTINUE-SESSION.md` - Full context and decisions
2. `docs/plans/2026-02-04-component-recommendations.md` - **CRITICAL: Component specs**
3. `docs/plans/2026-02-04-card-layout-design.md` - Layout details
4. `STYLING_GUIDE.md` - Animation physics

## The Layout (Hybrid Approach)

```
┌─────────────────────────────────────────┐
│  HERO - Aurora Background (Aceternity)  │
│  + Text Generate Effect for hook line   │
│  + Pelican with 3D Card Effect          │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  STICKY SCROLL REVEAL (Aceternity)      │
│  ┌──────────────┬───────────────────┐   │
│  │ Glass Cards  │ Forest → Rocky →  │   │
│  │ with Border  │ Coastal backdrop  │   │
│  │ Beam (Magic) │ transitions       │   │
│  │              │ + Particles       │   │
│  │ Wildlife:    │ + Wildlife with   │   │
│  │ 3D Card      │ 3D Card Effect    │   │
│  └──────────────┴───────────────────┘   │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  DATACENTER - Background Beams          │
│  + Animated groundhogs                  │
│  + Terminal contact (Typewriter Effect) │
│  + Scratch To Reveal easter egg         │
│  + Floating Dock navigation             │
└─────────────────────────────────────────┘
```

## Task Checklist

### Phase 1: Install Components
```bash
# Run these first
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
- [ ] Install all Aceternity components
- [ ] Install all Magic UI components
- [ ] Verify imports work (`npm run dev`)

### Phase 2: Hero Section
- [ ] Implement Aurora Background with California sunset colors
- [ ] Add Text Generate Effect for hook line
- [ ] Add pelican using 3D Card Effect (PNG only, no bg)
- [ ] Style: `#FFD93D` gold, `#FF8B4D` coral, `#C9B1FF` purple, `#87CEEB` blue

### Phase 3: Sticky Scroll Story Section
- [ ] Implement Sticky Scroll Reveal layout
- [ ] Configure 3 content items (Forest, Rocky, Coastal)
- [ ] Add Border Beam to content cards (color changes per section)
- [ ] Add Particles: Forest=pollen (pale yellow), Coastal=mist (white/blue)
- [ ] Add wildlife with 3D Card Effect at appropriate positions

### Phase 4: Datacenter Showstopper
- [ ] Implement Background Beams (neon green/blue on #1a1a1a)
- [ ] Layer datacenter background image on top
- [ ] Add animated Coffee Runner (8-10s walk loop)
- [ ] Add animated Security Guard (12s walk loop, opposite direction)
- [ ] Position stationary groundhogs at workstations
- [ ] Add green Particles (data stream effect)
- [ ] Add Scratch To Reveal easter egg (server panel → karaoke groundhog)

### Phase 5: Contact Form (Terminal)
- [ ] Style as terminal (black/90, green-400 text, mono font)
- [ ] Add Typewriter Effect to labels
- [ ] Add blinking cursor submit button
- [ ] Add idle groundhog popup (AnimatePresence, 10s delay)
- [ ] Add prominent LinkedIn link

### Phase 6: Navigation
- [ ] Implement Floating Dock (bottom center)
- [ ] Use themed icons: Cloud, Tree, Mountain, Waves, Server
- [ ] Show only after scrolling past hero
- [ ] Link to section anchors

### Phase 7: Mobile Experience
- [ ] Create Lens-style landscape prompt (blurred landscape bg)
- [ ] "This view is too wide for portrait" messaging
- [ ] "Continue anyway" button
- [ ] Hide wildlife and reduce effects on mobile

### Phase 8: Content Writing
- [ ] Hero: Name + "I build systems that work while I sleep"
- [ ] Forest: "People First" - sales background, listening skills
- [ ] Rocky: "Breaking Things (On Purpose)" - technical, problem-solving
- [ ] Coastal: "The Automation Obsession" - AI/automation pivot
- [ ] Keep it CASUAL, not resume-speak

### Phase 9: Polish & Verification
- [ ] `npm run dev` - no errors
- [ ] Full scroll test - all animations trigger correctly
- [ ] Aurora colors feel like California sunset
- [ ] Border Beam colors progress gold→amber→earth→blue→green
- [ ] Wildlife 3D tilt effect works on hover
- [ ] Particles visible but not distracting
- [ ] Terminal groundhog pops up on idle
- [ ] Scratch To Reveal works
- [ ] Mobile prompt appears on portrait
- [ ] `npm run build` - no errors
- [ ] Take screenshots

## Color Progression (The Descent)

| Section | Border Beam | Particles | Vibe |
|---------|-------------|-----------|------|
| Hero | Gold `#FFD93D` | None | High altitude, warm sun |
| Forest | Amber `#F59E0B` | Pale yellow (pollen) | Dappled forest light |
| Rocky | Earth `#D97706` | None | Warm rocks, late afternoon |
| Coastal | Ocean `#0EA5E9` | White/blue (mist) | Sea spray, horizon |
| Datacenter | Green `#22C55E` | Green (data) | Tech underground |

## Component Quick Reference

| Need | Component | Library |
|------|-----------|---------|
| Sky effect | Aurora Background | Aceternity |
| Text reveal | Text Generate Effect | Aceternity |
| Story layout | Sticky Scroll Reveal | Aceternity |
| Card glow | Border Beam | Magic UI |
| Wildlife depth | 3D Card Effect | Aceternity |
| Atmosphere | Particles | Magic UI |
| Tech background | Background Beams | Aceternity |
| Navigation | Floating Dock | Aceternity |
| Form labels | Typewriter Effect | Aceternity |
| Easter egg | Scratch To Reveal | Magic UI |

## Commit Protocol
```bash
git add -A && git commit -m "feat(components): [what you did]

Co-Authored-By: Claude <noreply@anthropic.com>"
```

## Exit Conditions

### Per-Iteration
Complete ONE phase, commit, then exit.

### Loop Completion
When ALL phases complete:
1. Full verification
2. Screenshots
3. `touch .loop_complete`
4. Exit
