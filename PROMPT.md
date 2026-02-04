# Card-Based Portfolio - Integration Loop

## Your Mission
Build a card-based storytelling portfolio with scenic backdrops, subtle wildlife animations, and an ambitious datacenter reveal. Desktop-first, mobile-simplified.

## READ THESE FIRST
- `CONTINUE-SESSION.md` - Full context and decisions
- `docs/plans/2026-02-04-card-layout-design.md` - Card layout spec
- `STYLING_GUIDE.md` - Animation physics, component libraries

## The New Layout

```
┌─────────────────────────────────────┐
│  HERO (Sky background)              │
│  "Welcome" + name + one-liner       │
│  [pelican - subtle bob animation]   │
└─────────────────────────────────────┘
          ↓ scroll-triggered
┌─────────────────────────────────────┐
│  CARD 1 (Forest background)         │
│  Headline + paragraph               │
│  Sales → People skills story        │
│  [banana slug, jay - bobbing]       │
└─────────────────────────────────────┘
          ↓ scroll-triggered
┌─────────────────────────────────────┐
│  CARD 2 (Rocky background)          │
│  Headline + paragraph               │
│  Technical / problem-solving        │
│  [quail, lizard - bobbing]          │
└─────────────────────────────────────┘
          ↓ scroll-triggered
┌─────────────────────────────────────┐
│  CARD 3 (Coastal background)        │
│  Headline + paragraph               │
│  AI/automation pivot                │
│  [sea otter - bobbing]              │
└─────────────────────────────────────┘
          ↓ scroll-triggered
┌─────────────────────────────────────┐
│  DATACENTER (The Showstopper)       │
│  Animated groundhogs                │
│  Easter eggs                        │
│  Terminal contact + LinkedIn link   │
└─────────────────────────────────────┘
```

## Assets Available

```
public/assets/
├── sky/
│   ├── sky-background-v2.png
│   └── wildlife/pelican-silhouette.png
├── forest/
│   ├── forest-background-v2.png
│   └── wildlife/banana-slug-small.png, stellers-jay-realistic.png
├── rocky/
│   ├── rocky-climb-v2.png
│   └── wildlife/california-quail-realistic.png, fence-lizard-realistic.png
├── coastal/
│   ├── coastal-overlook-v2.png
│   └── wildlife/sea-otter-realistic.png, cormorant-realistic.png
├── burrows/
│   └── underground-transition-v2.png (transition to datacenter)
├── datacenter/
│   └── datacenter-background-v3.png
└── characters/*.png (9 groundhog characters)
```

## Task Checklist

### Phase 1: Card Layout Structure
- [ ] Create `StoryCard.tsx` component (background + content + wildlife slot)
- [ ] Update `page.tsx` to use card layout instead of zone sections
- [ ] Each card: full viewport height, scroll-triggered text animation
- [ ] Text animation: Framer Motion fade+slide (opacity 0→1, y 30→0)

### Phase 2: Desktop Wildlife (bobbing animation)
- [ ] Create wildlife bobbing animation (subtle translateY oscillation)
- [ ] Add pelican to Hero (top-right area)
- [ ] Add slug + jay to Forest card
- [ ] Add quail + lizard to Rocky card
- [ ] Add sea otter to Coastal card
- [ ] Ensure wildlife doesn't overlap text areas

### Phase 3: Mobile Experience
- [ ] Create `MobileLandscapePrompt.tsx` - obvious modal/banner on portrait
- [ ] Hide wildlife on mobile (viewport < 768px)
- [ ] Use gradient overlay (Option B) for text readability on mobile
- [ ] Test at 375px width portrait AND landscape

### Phase 4: Content Writing
- [ ] Hero: Name + one-liner ("I build systems that work while I sleep")
- [ ] Card 1 (Forest): Sales background → people skills
- [ ] Card 2 (Rocky): Technical grounding → problem-solving
- [ ] Card 3 (Coastal): AI/automation passion → the pivot
- [ ] Keep it casual, conversational, NOT resume-speak

### Phase 5: Datacenter Showstopper (BE AMBITIOUS)
- [ ] Background with parallax layers
- [ ] Animated Coffee Runner (8-10s loop, walks across)
- [ ] Animated Security Guard (12s loop, opposite direction)
- [ ] Stationary groundhogs at workstations (subtle breathing/typing)
- [ ] Blinking server LEDs (CSS animation)
- [ ] Floating dust particles in light beams
- [ ] Lyrics terminal easter egg (scrolling karaoke text)
- [ ] Hover groundhogs → job title tooltip
- [ ] Terminal-style contact form
- [ ] LinkedIn link prominently placed
- [ ] Optional: Reveal animation (lights flicker on)

### Phase 6: Polish & Verification
- [ ] Run `npm run dev` - no errors
- [ ] Scroll through entire page - animations trigger correctly
- [ ] Test mobile portrait - landscape prompt appears
- [ ] Test mobile landscape - simplified but functional
- [ ] Test wildlife bobbing animations
- [ ] Test datacenter character animations
- [ ] Run `npm run build` - no errors
- [ ] Take screenshots: `./scripts/take-zone-screenshots.sh`

### Phase 7: Mobile Asset Generation (Optional)
- [ ] Generate 9:16 versions of backgrounds for mobile landscape
- [ ] Save to `public/assets/[zone]/[zone]-mobile.png`
- [ ] Leave for user approval before integrating

## Animation Specs

### Wildlife Bobbing
```tsx
// Subtle vertical oscillation
animate={{ y: [0, -5, 0] }}
transition={{
  duration: 3,
  ease: "easeInOut",
  repeat: Infinity
}}
```

### Text Scroll Reveal
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: true, margin: "-100px" }}
>
```

### Coffee Runner Walk
```tsx
// 8-10 second loop, left to right with vertical bob
animate={{
  x: ["0%", "80%", "0%"],
  y: [0, -3, 0, -3, 0] // synced bob
}}
transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
```

## Mobile Landscape Prompt

Create obvious prompt when `window.innerWidth < 768 && portrait orientation`:
```
┌────────────────────────────┐
│  📱↔️                       │
│                            │
│  For the best experience,  │
│  please rotate your phone  │
│  to landscape mode         │
│                            │
│  [Continue anyway]         │
└────────────────────────────┘
```

## Commit Protocol
```bash
git add -A && git commit -m "feat(cards): [what you did]

Co-Authored-By: Claude <noreply@anthropic.com>"
```

## Exit Conditions

### Per-Iteration
Complete ONE phase or significant chunk, commit, then exit.

### Loop Completion
When ALL phases complete:
1. Run full verification
2. Take screenshots
3. `touch .loop_complete`
4. Exit
