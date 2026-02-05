# Card-Based Portfolio Layout Design

**Date:** Feb 4, 2026
**Status:** Approved for implementation

---

## Overview

The portfolio uses a card-based storytelling approach where each "card" is a full-viewport section with:
- Scenic background image
- Optional wildlife accent (desktop only, with bobbing animation)
- Headline + paragraph content
- Scroll-triggered text reveal animation

---

## Card Structure

### Desktop Layout (≥1024px)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Background Image - cover, centered]                       │
│                                                             │
│     ┌─────────────────────────────────┐                     │
│     │  HEADLINE                       │                     │
│     │                                 │                     │
│     │  Paragraph text that tells      │   [Wildlife        │
│     │  part of the story. Keep it     │    Sprite]         │
│     │  casual and conversational.     │   (bobbing)        │
│     │                                 │                     │
│     └─────────────────────────────────┘                     │
│                                                             │
│                        ↓ scroll indicator                   │
└─────────────────────────────────────────────────────────────┘
```

- Content card: glassmorphic (backdrop-blur, semi-transparent)
- Max-width: 600px
- Position: left side or center (varies per card for visual interest)
- Wildlife: opposite side from content, doesn't overlap

### Tablet Layout (768px - 1023px)

```
┌─────────────────────────────────────┐
│  [Background Image]                 │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  HEADLINE                   │    │
│  │                             │    │
│  │  Paragraph text...          │    │
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│           [Wildlife - smaller]      │
└─────────────────────────────────────┘
```

- Content card: centered, wider (80% width)
- Wildlife: smaller, bottom corner

### Mobile Landscape (≥640px width, landscape orientation)

```
┌─────────────────────────────────────────────────┐
│  [Background Image - top 60%]                   │
│                                                 │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ ← gradient
│█████████████████████████████████████████████████│
│█  HEADLINE                                     █│
│█  Paragraph text...                            █│
│█████████████████████████████████████████████████│
└─────────────────────────────────────────────────┘
```

- Gradient overlay from bottom (rgba(0,0,0,0.7) → transparent)
- No wildlife
- Content at bottom, guaranteed readable

### Mobile Portrait (<640px OR portrait orientation)

Show `MobileLandscapePrompt` modal:
```
┌────────────────────────────┐
│                            │
│      📱 → 📱               │
│                            │
│  For the best experience,  │
│  rotate your phone to      │
│  landscape mode.           │
│                            │
│  ┌────────────────────┐    │
│  │  Continue anyway   │    │
│  └────────────────────┘    │
│                            │
└────────────────────────────┘
```

If dismissed, show simplified mobile landscape layout.

---

## Card Specifications

### Hero Card (Sky)

| Property | Value |
|----------|-------|
| Background | `sky/sky-background-v2.png` |
| Background position | `center bottom` (show hills) |
| Wildlife | Pelican, top-right, `width: 60px` |
| Content position | Center |
| Content | Name, title, one-liner hook |
| Special | Scroll indicator at bottom |

**Content example:**
```
Daniel G

I build systems that work while I sleep.
```

### Card 1 (Forest)

| Property | Value |
|----------|-------|
| Background | `forest/forest-background-v2.png` |
| Background position | `center center` |
| Wildlife | Banana slug (bottom-left), Jay (top-right) |
| Content position | Right side |
| Content | Sales/people skills story |

**Content example:**
```
People First

I started in sales, which means I spent years learning
to actually listen. Turns out that skill transfers
pretty well to understanding what systems need to do.
```

### Card 2 (Rocky)

| Property | Value |
|----------|-------|
| Background | `rocky/rocky-climb-v2.png` |
| Background position | `center center` |
| Wildlife | Quail (bottom-right), Lizard (on rock, small) |
| Content position | Left side |
| Content | Technical/problem-solving story |

**Content example:**
```
Breaking Things (On Purpose)

I like taking systems apart to see how they work.
Then I put them back together better. Usually.
The failures taught me more than the wins.
```

### Card 3 (Coastal)

| Property | Value |
|----------|-------|
| Background | `coastal/coastal-overlook-v2.png` |
| Background position | `center center` |
| Wildlife | Sea otter (bottom-left, in "water" area) |
| Content position | Right side |
| Content | AI/automation pivot story |

**Content example:**
```
The Automation Obsession

Now I spend my time teaching computers to do
the boring stuff so humans can do the interesting stuff.
It's basically professional laziness, but productive.
```

### Datacenter Card (Showstopper)

See dedicated section below.

---

## Animation Specifications

### Text Reveal (all cards)

```tsx
const textRevealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] // custom easeOut
    }
  }
};

<motion.div
  variants={textRevealVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
>
```

### Wildlife Bobbing (desktop only)

```tsx
const bobbingVariants = {
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};
```

### Scroll Indicator (hero only)

```tsx
const scrollIndicatorVariants = {
  animate: {
    y: [0, 10, 0],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};
```

---

## Datacenter Showstopper Spec

This is the ambitious finale. The "underground lab" reveal.

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [PARALLAX LAYER 1 - Far background, server racks]         │
│                                                             │
│    [Stationary groundhogs at workstations]                  │
│         Scientist    Engineer    Analyst                    │
│                                                             │
│  ←── [Coffee Runner walking] ──→                            │
│                                                             │
│       [Karaoke Singer]  [Lyrics Terminal]                   │
│                                                             │
│  ←── [Security Guard walking opposite] ──→                  │
│                                                             │
│    ┌─────────────────────────────────────┐                  │
│    │  TERMINAL-STYLE CONTACT FORM        │                  │
│    │  > name: _                          │                  │
│    │  > email: _                         │                  │
│    │  > message: _                       │                  │
│    │                                     │                  │
│    │  [SEND]     [LinkedIn →]            │                  │
│    └─────────────────────────────────────┘                  │
│                                                             │
│  [Floating dust particles in light beams]                   │
│  [Blinking server LEDs]                                     │
└─────────────────────────────────────────────────────────────┘
```

### Character Positions (approximate % from left)

| Character | X Position | Y Position | Behavior |
|-----------|------------|------------|----------|
| Coffee Runner | 10% → 90% | 60% | Walking loop, 8-10s |
| Security Guard | 90% → 10% | 70% | Walking loop, 12s |
| Scientist | 50% | 40% | Stationary, subtle breathing |
| Network Engineer | 80% | 35% | Stationary, typing animation |
| Server Technician | 20% | 50% | Stationary, crouched |
| Data Analyst | 65% | 45% | Stationary, looking at monitors |
| Senior Architect | 35% | 38% | Stationary, at desk |
| Intern | 15% | 55% | Stationary, with boxes |
| Karaoke Singer | 75% | 65% | Stationary, near terminal |

### Effects

**Blinking LEDs:**
```css
@keyframes led-blink {
  0%, 90%, 100% { opacity: 1; }
  95% { opacity: 0.3; }
}
.server-led {
  animation: led-blink 2s infinite;
  animation-delay: var(--led-delay); /* randomize per LED */
}
```

**Dust Particles:**
- Use CSS or canvas particles
- Slow float upward
- Only visible in "light beam" areas
- Opacity: 0.3-0.5

**Lyrics Terminal:**
```
┌─────────────────────────┐
│  ♪ NOW PLAYING ♪        │
│                         │
│  I'm walking on         │
│  sunshine, whoa-oh     │ ← highlighted line
│  And don't it feel      │
│  good!                  │
└─────────────────────────┘
```
- Vertical scroll, 30s loop
- Current line highlighted (green or yellow)

### Contact Form (Terminal Style)

```tsx
<div className="bg-black/80 backdrop-blur font-mono text-green-400 p-6 rounded-lg">
  <p className="text-green-600 mb-4">// Let's build something</p>

  <label className="block mb-2">
    <span className="text-green-600">&gt; name:</span>
    <input className="bg-transparent border-b border-green-400/50 ml-2" />
  </label>

  <label className="block mb-2">
    <span className="text-green-600">&gt; email:</span>
    <input className="bg-transparent border-b border-green-400/50 ml-2" />
  </label>

  <label className="block mb-4">
    <span className="text-green-600">&gt; message:</span>
    <textarea className="bg-transparent border border-green-400/30 w-full mt-1" />
  </label>

  <div className="flex gap-4">
    <button className="bg-green-400 text-black px-4 py-2">SEND</button>
    <a href="linkedin.com/in/..." className="text-green-400 underline">
      → View full experience on LinkedIn
    </a>
  </div>
</div>
```

---

## Responsive Breakpoints

```css
/* Mobile portrait - show landscape prompt */
@media (max-width: 639px), (orientation: portrait) and (max-width: 1023px) {
  .landscape-prompt { display: flex; }
  .main-content { display: none; }
}

/* Mobile landscape */
@media (min-width: 640px) and (max-width: 1023px) and (orientation: landscape) {
  .wildlife { display: none; }
  .content-card { /* gradient overlay style */ }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .wildlife { transform: scale(0.7); }
  .content-card { width: 80%; margin: 0 auto; }
}

/* Desktop */
@media (min-width: 1024px) {
  /* Full experience */
}
```

---

## Implementation Order

1. **StoryCard component** - Container with background, content slot, wildlife slot
2. **Page layout** - Replace zone components with StoryCard instances
3. **Text animations** - Scroll-triggered reveal
4. **Wildlife bobbing** - Desktop only
5. **Mobile landscape prompt** - Portal/modal
6. **Datacenter scene** - The showstopper
7. **Polish & testing**

---

## Success Criteria

- [ ] Smooth scroll between cards
- [ ] Text reveals feel natural, not jarring
- [ ] Wildlife adds charm without distraction
- [ ] Mobile prompt is obvious and dismissible
- [ ] Datacenter feels like a reward for scrolling
- [ ] Contact form works
- [ ] LinkedIn link is prominent
- [ ] Build passes, no console errors
