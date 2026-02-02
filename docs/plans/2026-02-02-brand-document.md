# dgautomate.dev - Brand & Design Document

*Created: February 2, 2026*

---

## 1. Brand Overview

**Who:** Daniel Garcia - Operations and sales professional with domain expertise in GTM, marketplaces, and selling. Now channeling that business understanding into automation. Technical enough to build, experienced enough to know what actually needs building. Based in Cincinnati, roots in Big Sur.

**What:** A personal portfolio that's an experience, not a résumé. Visitors hike through your skills as a journey - from sky to ground to underground - discovering who you are through the design itself.

**Why:** You want clients and connections who appreciate creativity and curiosity. The hidden contact form filters for engaged visitors. The design demonstrates your personality without saying "I'm creative."

**Core Theme:** Big Sur / Garrapata Trail. Three ecosystems, one journey. Warm California coastal vibes - not tropical vacation, not corporate portfolio. Earthy, grounded, with a playful secret underground.

**Tone:** Conversational, warm, human. Professional through craft, not through stiffness.

---

## 2. Visual Design System

### Color Palette

| Zone | Colors | Inspiration |
|------|--------|-------------|
| **Sky** | Warm soft blues, creamy whites, hint of golden sun | Coastal California morning, soft clouds |
| **Ground** | Tans, terracottas, sage greens, weathered grays | Big Sur terrain - sandy, earthy, coastal rocks |
| **Underground (roots)** | Rich browns, deep amber, dark soil tones | Redwood root systems, organic earth |
| **Underground (data center)** | Cool blues, terminal greens, warm lamp lighting | Cozy tech bunker, contrast to natural above |

### Typography Direction

- **Primary:** Rounded, friendly sans-serif (approachable, matches "cute rounder features")
- **Accents:** Possibly a hand-drawn or organic display font for section markers

### Visual Features

- Soft, layered shadows (Josh Comeau style)
- HSL-interpolated gradients (no muddy midpoints)
- Rounded corners and soft edges throughout
- Subtle parallax as you scroll through zones

---

## 3. Site Structure & Journey Map

### The Scroll Journey

```
+500 ft  ┌─────────────────────────────────────┐
   ↑     │            THE SKY                  │
         │  • "Daniel Garcia"                  │
         │  • Altitude meter visible           │
         │  • Warm clouds, soft animation      │
         │  • Minimal - invites scrolling      │
         └─────────────────────────────────────┘
              ↓ scroll
+200 ft  ┌─────────────────────────────────────┐
   ↑     │         FOREST ZONE                 │
         │  Skill Domain: Operations           │
         │  • Payment processing               │
         │  • Client relationships             │
         │  • Logistics, inventory             │
         │  (FloraFlex as proof point)         │
         └─────────────────────────────────────┘
              ↓ scroll
+50 ft   ┌─────────────────────────────────────┐
   ↑     │       ROCKY CLIMB ZONE              │
         │  Skill Domain: Scale & Strategy     │
         │  • Large accounts, $100M+ GMV       │
         │  • P&L ownership                    │
         │  • Navigating chaos                 │
         │  (GigaCloud as proof point)         │
         └─────────────────────────────────────┘
              ↓ scroll
 0 ft    ┌─────────────────────────────────────┐
(sea     │      COASTAL OVERLOOK ZONE          │
level)   │  Skill Domain: Systems & Automation │
         │  • Connecting tools                 │
         │  • AI-powered workflows             │
         │  • Building repeatable systems      │
         │  (Indeed Flex as proof point)       │
         │                                     │
         │  Pacific visible in distance        │
         └─────────────────────────────────────┘
              ↓ scroll
-20 ft   ┌─────────────────────────────────────┐
         │      UNDERGROUND - ROOTS            │
         │  Natural root system                │
         │  Organic, tangled, earthy           │
         │  Transition to tunnels              │
         └─────────────────────────────────────┘
              ↓ scroll
-50 ft   ┌─────────────────────────────────────┐
         │    UNDERGROUND - BURROWS            │
         │  Deliberate tunnels appear          │
         │  Signs of activity                  │
         │  Groundhog peeks out at bottom      │
         └─────────────────────────────────────┘
              ↓ hover + click groundhog
-100 ft  ┌─────────────────────────────────────┐
         │     SECRET DATA CENTER              │
         │  • Groundhogs in lab coats          │
         │  • Terminals, servers, machinery    │
         │  • Dam construction plans           │
         │  • Hidden hobby Easter eggs         │
         │  • Casual contact form              │
         └─────────────────────────────────────┘
```

### Separate Page: Services

- Accessible via subtle link (footer or small icon)
- Placeholder content: "Coming soon"
- Business contact info: Email + Phone

---

## 4. Interactions & Animations

### Scroll-Based Animations

| Element | Behavior |
|---------|----------|
| **Clouds** | Soft parallax - move slower than scroll, subtle drift animation |
| **Altitude meter** | Updates continuously as user scrolls, smooth number transitions |
| **Zone transitions** | Gradient blends between environments |
| **Terrain elements** | Subtle parallax layers - foreground moves faster than background |

### Micro-Interactions (Desktop)

| Element | Trigger | Response |
|---------|---------|----------|
| **Skill cards/markers** | Hover | Gentle lift with soft shadow, slight scale |
| **Proof points** | Hover | Reveals more detail, warm fade-in |
| **Trail markers** | Hover | Subtle glow or highlight |

### The Groundhog Reveal

| Stage | What Happens |
|-------|--------------|
| **Appears** | Groundhog pokes head out at bottom of burrow section |
| **Hover (0-2s)** | Groundhog gets curious, perks up, starts to beckon |
| **Hover (2s+)** | Full beckon animation, clearly inviting click |
| **Click** | Groundhog digs downward, page "peels" to reveal data center below |
| **Peel animation** | Earth layer rolls/tears away, revealing the underground facility |

### Underground Easter Eggs (Desktop-only)

| Item | Location | Click Response |
|------|----------|----------------|
| **Pickleball paddle** | Leaning against wall or held by groundhog | Tooltip: "Pickleball is one of my favorite hobbies!" |
| **Terminal with lyrics** | One of the computer screens | Displays song lyrics instead of code |
| **Other hobby hints** | Woven into scenery | Subtle reveals on click |

### Mobile Adaptations

- Hover states become tap states where essential
- Groundhog: tap once to trigger beckon, tap again to dig
- Hobby Easter eggs: hidden on mobile (desktop reward)
- All scroll animations preserved, simplified if needed for performance

---

## 5. Technical Architecture

### Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | Next.js 14 (App Router) | React-based, great Netlify support, SSR for SEO |
| **Styling** | Tailwind CSS | Fast iteration, dark mode utilities, responsive |
| **Animations** | Framer Motion | Best for scroll-triggered animations, spring physics |
| **Forms** | Netlify Forms | Zero config, forwards to email |
| **Hosting** | Netlify | Domain already connected (dgautomate.dev) |

### File Structure

```
src/
├── app/
│   ├── page.tsx          # Main journey
│   ├── services/
│   │   └── page.tsx      # Services placeholder
│   └── layout.tsx
├── components/
│   ├── zones/
│   │   ├── Sky.tsx
│   │   ├── Forest.tsx
│   │   ├── RockyClimb.tsx
│   │   ├── CoastalOverlook.tsx
│   │   ├── UndergroundRoots.tsx
│   │   ├── UndergroundBurrows.tsx
│   │   └── SecretDataCenter.tsx
│   ├── ui/
│   │   ├── AltitudeMeter.tsx
│   │   ├── SkillCard.tsx
│   │   ├── Groundhog.tsx
│   │   └── ContactForm.tsx
│   └── effects/
│       ├── Clouds.tsx
│       ├── Parallax.tsx
│       └── PeelReveal.tsx
├── lib/
│   └── scroll-utils.ts
└── styles/
    └── globals.css
```

---

## 6. Two Contact Paths

| Contact Type | Location | Purpose | Contents |
|--------------|----------|---------|----------|
| **Business** | Services page | Formal inquiries | Displays business email + phone. They reach out to you. |
| **Casual** | Underground (secret) | Feedback / networking | Simple form: Name + Email. They leave info, you reach out if interested. |

---

## 7. Implementation Phases

### Phase 1: MVP

- Sky zone with name + altitude meter
- Three skill zones (Forest, Rocky, Coastal)
- Zone transitions and basic parallax
- Underground roots + burrows
- Groundhog appears + beckon animation
- Peel reveal + data center scene
- Casual contact form (underground)
- Services page (placeholder + contact info)
- Mobile responsive
- Altitude meter updates on scroll

### Phase 2: Polish

- Cloud drift animations
- Spring physics on hovers
- Groundhog personality animation
- Layered shadows throughout
- Underground hobby Easter eggs
- Performance optimization (Lighthouse 90+)

### Phase 3: Enhancements (Optional)

- Sound design
- Day/night mode
- More underground animals/details
- Analytics integration

### Out of Scope

- Blog functionality
- Light mode toggle
- Project case studies
- Complex CMS

---

## 8. Personal Details

**Contact Email:** Dnlg2400@gmail.com
**GitHub:** DanofGar
**Domain:** dgautomate.dev (Netlify)
**Repo:** https://github.com/DanofGar/dgautomate-portfolio

**Hobbies (for Easter eggs):**
- Pickleball
- Singing
- Hiking

**From:** Big Sur area, favorite trail is Garrapata

---

*This document serves as the source of truth for the dgautomate.dev portfolio build.*
