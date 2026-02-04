# Component Library Recommendations

**Date:** Feb 4, 2026
**Source:** Gemini Deep Research + Claude evaluation
**Status:** Approved for implementation

---

## Overview

These component recommendations enhance the Big Sur "Descent" narrative with specific library choices. The goal is to make the portfolio feel like an **experience**, not just a website.

---

## Layout Strategy: The Hybrid Approach

After evaluating options, we're using a **hybrid layout**:

```
┌─────────────────────────────────────────┐
│  HERO (Full-bleed Aurora Background)    │  ← Aceternity Aurora
│  Immersive sky experience               │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  STICKY SCROLL REVEAL                   │  ← Aceternity Sticky Scroll
│  ┌──────────┬──────────────────────┐    │
│  │ Story    │ Transitioning        │    │
│  │ Cards    │ Landscapes           │    │
│  │ (sticky) │ (Forest→Rocky→Coast) │    │
│  └──────────┴──────────────────────┘    │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│  DATACENTER (Full-bleed Showstopper)    │  ← Aceternity Background Beams
│  Animated groundhogs, easter eggs       │
└─────────────────────────────────────────┘
```

This gives:
- **Hero**: Full immersive impact
- **Story**: Journey-like scroll through landscapes
- **Datacenter**: Reward reveal with full impact

---

## Component Specifications

### 1. Hero: Aurora Background
**Library:** Aceternity UI
**Component:** `Aurora Background`

**Purpose:** Creates ethereal, shifting sky that feels organic.

**Customization:**
```tsx
// California Sunset palette
const auroraColors = [
  "#FFD93D", // Sunset gold
  "#FF8B4D", // Warm coral
  "#C9B1FF", // Soft purple
  "#87CEEB", // Pale sky blue
];
```

**Pair with:** Text Generate Effect for the hook line
```tsx
<TextGenerateEffect
  words="I build systems that work while I sleep"
  className="text-4xl font-bold"
/>
```

---

### 2. Story Section: Sticky Scroll Reveal
**Library:** Aceternity UI
**Component:** `Sticky Scroll Reveal`

**Purpose:** Locks story text on left while landscapes transition on right.

**Customization:**
```tsx
const storyContent = [
  {
    title: "People First",
    description: "I started in sales, which means I spent years learning to actually listen...",
    background: "/assets/forest/forest-background-v2.png",
    particles: "pollen", // pale yellow, slow
  },
  {
    title: "Breaking Things (On Purpose)",
    description: "I like taking systems apart to see how they work...",
    background: "/assets/rocky/rocky-climb-v2.png",
    particles: null,
  },
  {
    title: "The Automation Obsession",
    description: "Now I spend my time teaching computers to do the boring stuff...",
    background: "/assets/coastal/coastal-overlook-v2.png",
    particles: "mist", // white/blue, upward
  },
];
```

**Key adaptation:** The content cards get `Border Beam` treatment (see below).

---

### 3. Content Cards: Border Beam
**Library:** Magic UI
**Component:** `Border Beam`

**Purpose:** Animated light traveling around card edge. Prevents cards from getting lost on busy backgrounds.

**Color progression (descent theme):**
| Section | Beam Color | Hex |
|---------|------------|-----|
| Hero | Sunlight Gold | `#FFD93D` |
| Forest | Amber Glow | `#F59E0B` |
| Rocky | Warm Earth | `#D97706` |
| Coastal | Ocean Blue | `#0EA5E9` |
| Datacenter | Phosphor Green | `#22C55E` |

```tsx
<BorderBeam
  size={250}
  duration={12}
  colorFrom={beamColors[currentSection].from}
  colorTo={beamColors[currentSection].to}
/>
```

---

### 4. Wildlife: 3D Card Effect
**Library:** Aceternity UI
**Component:** `3D Card Effect`

**Purpose:** Parallax tilt on mouse move makes wildlife feel alive and volumetric.

**Key technique:** NO card background - just the transparent PNG
```tsx
<CardContainer className="bg-transparent">
  <CardBody className="bg-transparent">
    <CardItem translateZ={50}>
      <Image
        src="/assets/forest/wildlife/banana-slug-small.png"
        alt="Banana Slug"
        className="object-contain"
      />
    </CardItem>
  </CardBody>
</CardContainer>
```

**Behavior:**
- Wildlife tilts toward cursor on hover
- Subtle float animation when idle
- Appears to exist IN the landscape, not ON it

---

### 5. Atmosphere: Particles
**Library:** Magic UI (or tsparticles)
**Component:** `Particles`

**Per-section configuration:**

| Section | Color | Speed | Direction | Density | Effect |
|---------|-------|-------|-----------|---------|--------|
| Forest | Pale yellow `#FEF3C7` | Slow | Random drift | Low | Pollen/dust motes |
| Coastal | White/blue `#E0F2FE` | Medium | Upward | Medium | Sea mist rising |
| Datacenter | Green `#22C55E` | Fast | Linear paths | Low | Data streams |

```tsx
// Forest pollen example
<Particles
  color="#FEF3C7"
  quantity={30}
  speed={0.3}
  direction="random"
/>
```

---

### 6. Datacenter: Background Beams
**Library:** Aceternity UI
**Component:** `Background Beams`

**Purpose:** Fiber optic / server laser aesthetic. Stark contrast to organic nature above.

**Configuration:**
```tsx
<BackgroundBeams
  className="bg-[#1a1a1a]"
  // Beams in neon green and blue
/>
```

**Layer order:**
1. Background Beams (base)
2. Datacenter background image (semi-transparent overlay)
3. Groundhog characters
4. Particles (data stream effect)
5. UI elements (contact form, etc.)

---

### 7. Navigation: Floating Dock
**Library:** Aceternity UI
**Component:** `Floating Dock`

**Purpose:** Fixed navigation with Mac-style magnification. Shows journey progress.

**Custom icons (wildlife/landscape themed):**
```tsx
const dockItems = [
  { icon: <CloudIcon />, label: "Welcome", section: "hero" },
  { icon: <TreeIcon />, label: "Background", section: "forest" },
  { icon: <MountainIcon />, label: "Skills", section: "rocky" },
  { icon: <WavesIcon />, label: "Passion", section: "coastal" },
  { icon: <ServerIcon />, label: "Contact", section: "datacenter" },
];
```

**Position:** Fixed bottom center
**Visibility:** Appears after scrolling past hero

---

### 8. Contact Form: Terminal + Typewriter
**Library:** Aceternity UI (Typewriter Effect) + Custom terminal styling

**Features:**
- Typewriter effect on form labels
- Blinking cursor submit button
- Groundhog popup on 10s idle (Framer Motion AnimatePresence)

```tsx
<div className="bg-black/90 backdrop-blur-lg font-mono text-green-400 p-6 rounded-lg border border-green-500/30">
  <TypewriterEffect
    words={[{ text: ">" }, { text: "Initiate" }, { text: "contact" }, { text: "sequence..." }]}
  />

  <form className="mt-4 space-y-4">
    <label className="block">
      <TypewriterEffect words={[{ text: ">" }, { text: "name:" }]} />
      <input className="bg-transparent border-b border-green-400/50 w-full" />
    </label>

    {/* ... more fields ... */}

    <button className="bg-green-400 text-black px-4 py-2 animate-pulse">
      █ TRANSMIT
    </button>
  </form>

  {/* Idle groundhog popup */}
  <AnimatePresence>
    {isIdle && (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="absolute bottom-0 right-4"
      >
        <Image src="/assets/characters/intern.png" alt="Curious groundhog" />
        <p className="text-xs text-green-400">Need help?</p>
      </motion.div>
    )}
  </AnimatePresence>
</div>
```

---

### 9. Mobile Prompt: Lens Effect
**Library:** Aceternity UI (Lens concept) + Custom

**Instead of boring "rotate phone":**
```tsx
<div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50">
  {/* Blurred beautiful landscape in background */}
  <div
    className="absolute inset-0 opacity-30"
    style={{
      backgroundImage: `url('/assets/coastal/coastal-overlook-v2.png')`,
      filter: 'blur(20px)',
    }}
  />

  {/* Spotlight/lens that user can't control */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
    <div className="text-6xl mb-4">📱↔️</div>
    <h2 className="text-2xl font-bold text-white mb-2">
      This view is too wide for portrait
    </h2>
    <p className="text-white/70 mb-6">
      Rotate your phone to see the full horizon
    </p>
    <button className="bg-white/20 text-white px-6 py-2 rounded-full">
      Continue anyway →
    </button>
  </div>
</div>
```

---

### 10. Easter Egg: Scratch To Reveal
**Library:** Magic UI
**Component:** `Scratch To Reveal`

**Location:** Datacenter section - a "Server Access Panel"

**Implementation:**
```tsx
<ScratchToReveal
  width={300}
  height={200}
  className="bg-gray-800 rounded-lg"
  gradientColors={["#1a1a1a", "#333", "#1a1a1a"]}
>
  {/* What's revealed underneath */}
  <div className="p-4 text-center">
    <Image
      src="/assets/characters/karaoke-singer.png"
      alt="Secret groundhog"
      className="w-24 mx-auto"
    />
    <p className="text-green-400 font-mono text-sm mt-2">
      🎤 You found the karaoke groundhog!
    </p>
    <p className="text-white/50 text-xs">
      Secret unlocked: Play "Walking on Sunshine"
    </p>
  </div>
</ScratchToReveal>
```

**Visual:** Looks like a metal server panel with "AUTHORIZED ACCESS ONLY" text. User scratches to reveal hidden groundhog.

---

## Installation Commands

```bash
# Aceternity UI components (copy-paste model)
npx shadcn@latest add "https://ui.aceternity.com/r/aurora-background"
npx shadcn@latest add "https://ui.aceternity.com/r/sticky-scroll-reveal"
npx shadcn@latest add "https://ui.aceternity.com/r/3d-card"
npx shadcn@latest add "https://ui.aceternity.com/r/background-beams"
npx shadcn@latest add "https://ui.aceternity.com/r/floating-dock"
npx shadcn@latest add "https://ui.aceternity.com/r/text-generate-effect"
npx shadcn@latest add "https://ui.aceternity.com/r/typewriter-effect"

# Magic UI components
npx shadcn@latest add "https://magicui.design/r/border-beam"
npx shadcn@latest add "https://magicui.design/r/particles"
npx shadcn@latest add "https://magicui.design/r/scratch-to-reveal"
```

---

## Implementation Priority

1. **Aurora Background** (Hero) - Immediate visual impact
2. **Sticky Scroll Reveal** (Story) - Core layout change
3. **Border Beam** (Cards) - Solves readability on busy backgrounds
4. **Background Beams** (Datacenter) - Showstopper foundation
5. **Particles** (Atmosphere) - Adds life to static scenes
6. **3D Card Effect** (Wildlife) - Elevates the accents
7. **Floating Dock** (Navigation) - Progress indicator
8. **Terminal + Typewriter** (Contact) - Form personality
9. **Scratch To Reveal** (Easter egg) - Delight factor
10. **Lens Mobile Prompt** (Mobile) - Better than boring

---

## Summary

| Library | Components Used |
|---------|-----------------|
| **Aceternity UI** | Aurora Background, Sticky Scroll Reveal, 3D Card, Background Beams, Floating Dock, Text Generate, Typewriter |
| **Magic UI** | Border Beam, Particles, Scratch To Reveal |
| **Framer Motion** | AnimatePresence (groundhog popup), custom animations |
| **Custom** | Terminal contact form, mobile lens prompt |
