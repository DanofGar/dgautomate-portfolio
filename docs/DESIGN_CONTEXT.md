# Design Context & Technical Requirements

*Created: February 2, 2026*

---

## 1. Project Architecture & Philosophy

**Design System Source:** Aceternity UI (based on the "Shadcn" copy-paste model)

**Framework:** React (Next.js or Vite compatible)

**Styling Engine:** Tailwind CSS + clsx + tailwind-merge

**Animation Engine:** Framer Motion (framer-motion)

**Iconography:** @tabler/icons-react (standard for Aceternity)

### Global Utility Requirement

All components rely on a `cn()` helper function to merge Tailwind classes safely.

**File:** `lib/utils.ts`

```typescript
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 2. Component Specifications (Deep Dive)

### A. The "Gemini" Scroll Effect (Line Drawing)

**Visual Goal:** A glowing line that "draws" itself as the user scrolls down the page.

**Core Mechanics:**
- **SVG Manipulation:** Use an SVG `<path>` element
- **Scroll Hook:** `useScroll` from Framer Motion to track the container's viewport progress
- **Interpolation:** Map `scrollYProgress` (0 to 1) to the `pathLength` attribute of the SVG
- **Styling:** Apply a `drop-shadow` in Tailwind (e.g., `drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]`) to create the "laser" look

### B. Text Generate Effect (Typewriter)

**Visual Goal:** Words fade in and un-blur sequentially, mimicking a high-speed typewriter or data stream.

**Core Mechanics:**
- **Data Structure:** Receive a `words` string prop, split it into an array: `words.split(" ")`
- **Animation Scope:** Use `useAnimate` (scoped animations) rather than declarative variants for better control
- **Staggering:** Apply `stagger(0.1)` to the animation sequence so words appear one after another
- **Initial State:** `opacity: 0`, `filter: blur(10px)`
- **Target State:** `opacity: 1`, `filter: blur(0px)`

### C. Evervault Card (Hacker/Privacy Hover)

**Visual Goal:** A card that reveals encrypted/random text strings when hovered, with a "flashlight" reveal effect.

**Core Mechanics:**
- **Mouse Tracking:** Use `useMotionValue` to track `mouseX` and `mouseY` relative to the card's `currentTarget`
- **Randomizer:** A helper function `randomString(length)` that regenerates characters on `mousemove`
- **Masking:** Use CSS `mask-image` (radial gradient) centered on the mouse coordinates to only show the "decrypted" text under the cursor
- **Performance:** This must be optimized to prevent layout thrashing during the rapid text re-rendering

### D. Hero Parallax (3D Scroll)

**Visual Goal:** A grid of product/project thumbnails that floats in 3D space, moving in opposing directions as the user scrolls.

**Core Mechanics:**
- **Layout:** Three distinct rows of cards
- **Perspective:** The parent container needs `perspective: 1000px`
- **Transforms:**
  - Row 1: Moves Left (`x: 0` to `x: 1000`)
  - Row 2: Moves Right (`x: 0` to `x: -1000`)
  - Row 3: Moves Left
- **Scroll Link:** All transforms are tied to `useScroll().scrollYProgress`
- **Rotation:** Cards should rotate slightly on the X/Z axis (`rotateX: 10deg`, `rotateZ: 20deg`) to sell the 3D depth

### E. MacBook Scroll (Hardware Presentation)

**Visual Goal:** A realistic MacBook laptop that opens/closes or scrolls its screen content as the user scrolls the page.

**Core Mechanics:**
- **Asset-Free:** Constructed entirely of HTML/CSS divs (lid, trackpad, screen, base) with gradients to simulate aluminum—no PNGs
- **Lid Animation:** Use `transform-origin: bottom` on the "lid" div. Rotate from closed (e.g., `90deg`) to open (`0deg`) based on scroll trigger
- **Screen Content:** The content inside the "screen" div translates Y-axis to simulate scrolling a webpage on the device

---

## 3. Tailwind Configuration Requirements

To support these components, the `tailwind.config.js` must extend:

### Colors
Custom palettes for "slate-900", "neutral-800" (often used in Aceternity themes)

### Animations
- **shimmer:** For loading states or shiny borders
- **spotlight:** Keyframes for moving spotlights
- **meteor:** Keyframes for falling trails (if implementing Meteor effect)

### Plugins
- **addVariablesForColors:** A custom plugin function that exposes all Tailwind colors as CSS variables (e.g., `--zinc-500`), which is required for many Aceternity inline styles

---

## 4. Implementation Priorities

1. **Scaffold:** Set up `lib/utils.ts` and `tailwind.config.js` extensions
2. **Base UI:** Create the generic Card or Container wrappers used by complex effects
3. **Complex Logic:** Implement the `useMousePosition` hooks and `useScroll` logic before building the UI layers

---

## 5. Current Stack (Existing Portfolio)

**Already Installed:**
- Next.js 14.2
- React 18.3
- Tailwind CSS 3.4
- Framer Motion 12.29
- TypeScript 5
- clsx + tailwind-merge

**What We Need to Add:**
- @tabler/icons-react
- Aceternity UI components (copy-paste)
- Enhanced Tailwind config
- Additional animation keyframes

---

*This document guides component research and implementation for the design-research-components branch.*
