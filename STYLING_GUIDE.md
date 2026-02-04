# STYLING_GUIDE.md - Digital Naturalism for dgautomate.dev

*Source: Component Library Research (Gemini Deep Research, Feb 2026)*
*Theme: Big Sur / Garrapata Trail - "The Naturalist Engineer"*

---

## Quick Reference

| Concept | Implementation |
|---------|----------------|
| **Theme** | Big Sur coastal - NOT tropical, NOT corporate |
| **Philosophy** | Personality through craft, not words |
| **Core Stack** | Shadcn (structure) + Aceternity (atmosphere) + Magic UI (interaction) |
| **Motion Engine** | Framer Motion with zone-specific physics |
| **Critical Rule** | Every component must be assigned a "Physics Zone" |

---

## 1. The Four Pillars of Big Sur Physics

All UI elements must map to one of these natural phenomena:

### 1.1 The Fog (Atmospheric Volumetrics)
- **Physical Property:** Diffusion, slow drift, low-opacity layering
- **UI Translation:** `backdrop-filter: blur()`, Gaussian blurs, soft masking
- **Motion:** Duration >60s, continuous float, zero damping
- **Use For:** Backgrounds, ambient particles, mood setting

### 1.2 The Ocean (Fluid Dynamics)
- **Physical Property:** Rhythmic oscillation, surface tension, viscosity
- **UI Translation:** SVG path morphing, spring physics with high damping
- **Motion:** Sinusoidal easings, cursor-reactive drag/sway
- **Use For:** Hero text, emotional content, creative sections

### 1.3 The Cliffs (Structural Rigidity)
- **Physical Property:** Immovability, texture (granite/sand), hard edges
- **UI Translation:** Rigid grids (Bento), brutalist typography, noise overlays
- **Motion:** Instant response, high stiffness, critical damping (no bounce)
- **Use For:** Navigation, layout structure, engineering content

### 1.4 The Flora (Organic Growth)
- **Physical Property:** Fractal patterns, recursive branching, wind sway
- **UI Translation:** Tracing beams, growing borders, particle systems
- **Motion:** Staggered animations, organic decay, randomized vectors
- **Use For:** Timelines, skill trees, career growth visualization

---

## 2. Motion-Thematic Correlation System (MTCS)

**CRITICAL:** Every animated component MUST use the correct physics profile for its zone.

### 2.1 Physics Axes

| Axis | Low Value | High Value |
|------|-----------|------------|
| **Viscosity** | Air/Tech (fast, snappy) | Water/Mud (slow, drag-heavy) |
| **Elasticity** | Stone (rigid, no bounce) | Jellyfish (organic, bouncy) |

### 2.2 Zone Configurations

#### Zone A: Coastal/Wet (The "Soul")
**When to use:** Emotional content, storytelling, hero introductions
**Metaphor:** Moving through water, wading through fog

```typescript
// Framer Motion Config - COASTAL
const coastalSpring = {
  type: "spring",
  stiffness: 50,      // Low tension, lazy movement
  damping: 20,        // High resistance, simulates water drag
  mass: 2.0           // Heavy, substantial feel
}
```

**Apply to:** Aurora backgrounds, hero text, parallax scrollers, image reveals

#### Zone B: Technical (The "Mind")
**When to use:** Code, documentation, contact info, terminal commands
**Metaphor:** Precision instruments, silicon chips, light speed

```typescript
// Framer Motion Config - TECHNICAL
const techSpring = {
  type: "spring",
  stiffness: 350,     // High tension, snappy response
  damping: 35,        // Critical damping, no bounce
  mass: 0.5           // Lightweight, efficient
}
```

**Apply to:** Terminal emulator, code blocks, form inputs, navigation dock, buttons

#### Zone C: Transition (The "Erosion")
**When to use:** Navigation between projects, expanding details, page transitions
**Metaphor:** Erosion, shifting sands, unfolding maps

```typescript
// Framer Motion Config - TRANSITION
const transitionEase = {
  ease: [0.25, 0.1, 0.25, 1.0],  // easeInOutCubic
  duration: 0.8
}
```

**Apply to:** Page peels, modal expansions, card-to-page transitions

### 2.3 Complete Physics Matrix

| Zone | Motion Type | Stiffness | Damping | Mass | Components |
|------|-------------|-----------|---------|------|------------|
| Atmospheric (Fog) | Continuous Drift | N/A (Linear) | N/A | N/A | Backgrounds, Ambient Particles |
| Coastal (Ocean) | Viscous Spring | 40-60 | 15-25 | 1.5-2.0 | Hero Text, Parallax, Wavy Effects |
| Structural (Cliff) | Critical Spring | 200-300 | 25-30 | 1.0 | Bento Grid, Cards, Panels |
| Technical (Lab) | Instant/Snap | 400+ | 35+ | 0.5 | Terminal, Buttons, Hover States |

---

## 3. Component Library Inventory

### 3.1 Shadcn UI - "The Cliffs" (Structural Foundation)

**Role:** Provides rigid, accessible UI primitives
**Install:** Copy-paste model, uses Radix UI + Tailwind

| Component | Big Sur Mapping | Adaptation Required |
|-----------|-----------------|---------------------|
| Card | The Stone | Add `rounded-xl`, noise texture, glassmorphism |
| Sheet | The Backpack | Heavy spring animation for "weight" |
| Dialog | The Inspection | Add zoom transition from trigger |
| Button | The Tool | Add `scale: 0.95` press effect, noise texture |
| Navigation | The Trail Marker | Integrate with scroll position |

**Customization Strategy:**
```css
/* Wrap Shadcn components in motion.div for organic entry */
.shadcn-card {
  @apply rounded-xl backdrop-blur-sm;
  @apply bg-slate-900/60 border border-white/10;
}
```

### 3.2 Aceternity UI - "The Fog" (Atmospheric Engine)

**Role:** Provides "wow factor" - backgrounds, continuous motion, shaders
**Install:** `npx shadcn@latest add "https://ui.aceternity.com/r/[component]"`

| Component | Big Sur Mapping | Adaptation Strategy |
|-----------|-----------------|---------------------|
| Aurora Background | The Fog | Colors: Teal-900, Slate-800, Emerald-500. Slow velocity. |
| Tracing Beam | The Flora (Roots) | Style as root/vine connecting timeline items |
| 3D Card Effect | The Artifact | Add noise overlay to simulate stone grain |
| Wavy Background | The Ocean | Use at footer, deepen amplitude for "stormy" |
| Sparkles | The Night Sky | Sparse use in dark mode for stars |
| Text Generate | The Erosion | Slow stagger delay, text "erodes" into existence |

**Color Adaptation for Aurora:**
```typescript
// Replace default rainbow with Marine Layer palette
const marineLayerColors = [
  "oklch(25% 0.1 240)",   // Deep Ocean
  "oklch(40% 0.08 200)",  // Slate Teal
  "oklch(50% 0.12 160)",  // Emerald Mist
]
```

### 3.3 Magic UI - "The Wildlife" (Interactive Layer)

**Role:** Bridges static structure and ambient atmosphere
**Install:** `npx shadcn@latest add "https://magicui.design/r/[component]"`

| Component | Big Sur Mapping | Adaptation Strategy |
|-----------|-----------------|---------------------|
| Bento Grid | The Cliffs (Strata) | Apply glassmorphism, let fog bleed through gaps |
| Dock | The Tech (Toolbelt) | Style icons as thin-stroke sketches |
| Marquee | The Current | Slow speed, relaxing flow (NOT stock ticker anxiety) |
| Globe | The Planet | Wireframe/monochromatic, minimalist |
| Meteors | Sea Spray | Subtle use in Contact section |
| Typing Animation | Terminal Output | Use in glassmorphic terminal |

---

## 4. Zone-by-Zone Implementation Guide

### 4.1 Sky Zone (+500ft)
**Pillar:** Fog + Ocean
**Physics:** Coastal (slow, drifting)

```
Components:
├── Aceternity Aurora Background (Marine Layer colors)
├── Custom animated clouds (SVG + Framer Motion)
├── Hero typography (Text Generate effect, slow stagger)
└── Scroll indicator (subtle bounce, coastal spring)

Motion Config: coastalSpring
Colors: Warm soft blues, creamy whites, golden sun hints
```

### 4.2 Forest Zone (+200ft)
**Pillar:** Flora + Cliffs
**Physics:** Mixed (organic growth + structural cards)

```
Components:
├── Layered tree SVGs with parallax (Flora physics)
├── Magic UI Bento Grid for skill cards (Cliff physics)
├── Aceternity Tracing Beam as vine/root connector
└── SkillCard hover: Corner lift effect

Motion Config: Hybrid - cards use structural, background uses flora
Colors: Tans, sage greens, forest depths
```

### 4.3 Rocky Climb Zone (+50ft)
**Pillar:** Cliffs (dominant)
**Physics:** Structural (rigid, grounded)

```
Components:
├── Jagged rock formations (CSS clip-path + parallax)
├── Shadcn Cards with heavy noise texture
├── Typography: Brutalist, grounded
└── Minimal animation - stability communicates competence

Motion Config: structuralSpring (stiffness: 250, damping: 28)
Colors: Terracotta, weathered gray, granite
```

### 4.4 Coastal Overlook Zone (0ft)
**Pillar:** Ocean (dominant)
**Physics:** Coastal (fluid, rhythmic)

```
Components:
├── Aceternity Wavy Background (ocean horizon)
├── Atmospheric perspective (distant ocean fading)
├── Skill cards with fluid hover states
└── SVG wave animations (sinusoidal)

Motion Config: coastalSpring
Colors: Pacific blues, sea foam, wet sand
```

### 4.5 Underground Roots (-20ft)
**Pillar:** Flora (organic)
**Physics:** Coastal transitioning to structural

```
Components:
├── Organic root SVGs with growth animation
├── Soil texture layers (noise + gradient)
├── Aceternity Tracing Beam as root system
└── Transition: organic → deliberate tunnels

Motion Config: floraSpring (staggered, organic decay)
Colors: Rich browns, deep amber, dark soil
```

### 4.6 Underground Burrows (-50ft)
**Pillar:** Cliffs + Flora hybrid
**Physics:** Structural with organic details

```
Components:
├── Tunnel architecture (rigid shapes)
├── Excavation marks, tool marks (texture details)
├── Groundhog peek interaction
└── Transition to data center

Groundhog Interaction States:
- Hover 0-2s: Gets curious (ears perk) - coastalSpring
- Hover 2s+: Full beckon animation - coastalSpring with higher mass
- Click: Dig animation → Page peel trigger

Motion Config: Hybrid
Colors: Tunnel browns, hints of tech blue bleeding through
```

### 4.7 Secret Data Center (-100ft)
**Pillar:** Technical (dominant) + Fog (atmosphere)
**Physics:** Technical (snappy) with atmospheric backdrop

```
Components:
├── Glassmorphic terminal (Magic UI Typing + custom)
├── Server racks with blinking LEDs (CSS animations)
├── Groundhog characters (illustrated, in lab coats)
├── Dam construction blueprints on walls
├── Easter eggs as scene elements (NOT buttons)
└── Contact form (Shadcn + techSpring)

Terminal Styling:
- backdrop-filter: blur(16px)
- background: rgba(15, 23, 42, 0.6)
- border: 1px solid rgba(255, 255, 255, 0.1)
- Let Aurora bleed through

Easter Egg Integration:
- Pickleball paddle: Leaning against server rack, clickable
- Terminal screen: Shows lyrics on interaction
- Hiking boot: Part of scene, near groundhog

Motion Config: techSpring for interactions, fogDrift for atmosphere
Colors: Cool blues, terminal greens, warm lamp lighting (contrast)
```

---

## 5. The Texture System

### 5.1 Digital Grain (Noise Overlay)

**Purpose:** Nature is never smooth. Grain adds organic feel to flat UI.

```css
/* Global Noise Class - Apply to Cards, Bento Grid cells */
.bg-noise {
  position: relative;
}
.bg-noise::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.05;
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 10;
}
```

### 5.2 Marine Layer Color Palette

```typescript
// tailwind.config.ts extension
const marineLayer = {
  'deep-ocean': 'oklch(25% 0.1 240)',    // Dark, rich teal
  'sea-foam': 'oklch(85% 0.05 190)',     // Pale, misty blue
  'wet-sand': 'oklch(80% 0.08 80)',      // Warm, desaturated gold
  'granite': 'oklch(40% 0.02 260)',      // Cool, dark grey
  'sunset': 'oklch(70% 0.2 40)',         // Vibrant orange accent
  'root-brown': 'oklch(30% 0.08 60)',    // Deep earth
  'terminal-green': 'oklch(70% 0.15 145)', // Tech accent
}
```

### 5.3 Geometric Softening (Squircle)

**Purpose:** Natural shapes avoid perfect 90° corners and perfect circles.

```typescript
// Use superellipse clip-paths for organic card shapes
// Library: react-smooth-corners or custom clip-path

// Example rounded stone effect
.stone-card {
  border-radius: 24px;
  /* Or use clip-path for true superellipse */
}
```

---

## 6. Advanced Interactions

### 6.1 Page Peel (Groundhog Reveal)

**Approach:** Modern corner lift, NOT skeuomorphic book flip

```typescript
// Corner Lift on Hover - mimics lifting a photograph
<motion.div
  whileHover={{
    rotateZ: -2,
    rotateY: 10,
    y: -5,
    boxShadow: "10px 10px 30px rgba(0,0,0,0.2)"
  }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  <CardContent />
</motion.div>
```

**Full Peel Animation:** Use `clip-path` animation or CSS 3D transforms to reveal data center beneath.

### 6.2 Glassmorphic Terminal

```typescript
// Terminal that lets Aurora bleed through
const terminalStyles = {
  backdropFilter: 'blur(16px)',
  background: 'rgba(15, 23, 42, 0.6)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
}

// Custom commands that fit theme
const terminalCommands = {
  'analyze_terrain': () => displaySkills(),
  'dive_deep': () => openAbout(),
  'contact_base': () => openEmail(),
}
```

### 6.3 Easter Eggs as Scene Elements

**Rule:** Easter eggs must be integrated into the visual scene, NOT obvious buttons.

| Easter Egg | Integration | Interaction |
|------------|-------------|-------------|
| Pickleball Paddle | Leaning against server rack | Hover glow → Click reveals message |
| Terminal Screen | Visible monitor in scene | Click shows "Walking on Sunshine" lyrics |
| Hiking Boot | On floor near groundhog | Subtle highlight on hover |

---

## 7. Performance Constraints

### 7.1 Bundle Size Budget

| Library | Est. Size (Gzipped) | Mitigation |
|---------|---------------------|------------|
| Framer Motion | ~30-50kb | Use `LazyMotion`, CSS transitions for simple hovers |
| Shadcn UI | ~5-10kb | Tree-shakable, minimal impact |
| Three.js (if used) | ~150kb+ | Dynamic import, only for specific 3D elements |
| SVG Filters | ~1-2kb | Disable on mobile (GPU cost) |

### 7.2 Rendering Strategy

1. **Static Substrate (RSC):** Shadcn layouts, Bento Grid structure, typography → Server Components
2. **Atmospheric Layer:** Aurora backgrounds → Isolated stacking context with `will-change: transform`
3. **Interactive Islands:** Magic UI interactions → Hydrate individually, not entire page

### 7.3 Accessibility (CRITICAL)

```typescript
// Respect prefers-reduced-motion
const prefersReducedMotion = usePrefersReducedMotion()

if (prefersReducedMotion) {
  // Aurora: Static gradient mesh (no animation)
  // Parallax: Disabled
  // Page peels: Simple cross-fade
  // Spring physics: Instant transitions
}
```

**Philosophy:** "Windy/Stormy" (motion) → "Calm/Still" (static) - theme maintained without harm.

---

## 8. Implementation Checklist

### Phase 1: Foundation
- [ ] Install Aceternity UI components (Aurora, Tracing Beam, Text Generate)
- [ ] Install Magic UI components (Bento Grid, Dock, Typing Animation)
- [ ] Extend Tailwind config with Marine Layer palette
- [ ] Create global noise texture utility class
- [ ] Set up physics constants file with zone configurations

### Phase 2: Zone Implementation
- [ ] Sky Zone: Aurora Background + animated clouds
- [ ] Forest Zone: Bento Grid + Tracing Beam timeline
- [ ] Rocky Climb: Noise-textured cards + rock formations
- [ ] Coastal Overlook: Wavy background + ocean horizon
- [ ] Underground Roots: Organic root SVGs + soil layers
- [ ] Underground Burrows: Tunnel architecture + groundhog states
- [ ] Secret Data Center: Glassmorphic terminal + integrated Easter eggs

### Phase 3: Polish
- [ ] Verify all components use correct physics zone
- [ ] Implement reduced-motion alternatives
- [ ] Performance audit (Lighthouse 90+)
- [ ] Mobile responsiveness pass
- [ ] Easter egg integration (scene elements, not buttons)

---

## 9. Files to Reference

| Need | File |
|------|------|
| Brand vision | `docs/plans/2026-02-02-brand-document.md` |
| User preferences | `PREFERENCES.md` |
| Current gaps | `DESIGN_GAPS.md` |
| Build commands | `AGENTS.md` |
| Task tracking | `IMPLEMENTATION_PLAN.md` |

---

## 10. The Golden Rule

> **"Every component must know its physics zone."**
>
> Before implementing any animation, ask:
> 1. What natural phenomenon does this represent?
> 2. What zone is this in?
> 3. What's the correct spring configuration?
>
> If you can't answer these questions, stop and reference this guide.

---

*This guide synthesizes research from Aceternity UI, Magic UI, Shadcn UI, and Josh Comeau-style interaction design principles. It maps the "Digital Naturalism" philosophy to concrete implementation patterns for the dgautomate.dev portfolio.*
