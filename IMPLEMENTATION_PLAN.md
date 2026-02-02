# Implementation Plan - dgautomate.dev

*Source of truth: `docs/plans/2026-02-02-brand-document.md`*

---

## Phase 1: Project Scaffold

### [x] Task 1.1: Initialize Next.js Project
- **What:** Create Next.js 14 app with App Router, TypeScript, Tailwind CSS
- **Why:** Foundation for the entire site
- **Files:** `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.js`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- **Verify:** `npm run dev` starts without errors
- **Parallel:** No - must complete first

### [x] Task 1.2: Install Animation Dependencies
- **What:** Add Framer Motion, clsx, tailwind-merge
- **Why:** Required for scroll animations and conditional styling
- **Files:** `package.json`, `src/lib/utils.ts` (cn utility)
- **Verify:** Can import `motion` from framer-motion
- **Parallel:** No - depends on 1.1

### [x] Task 1.3: Set Up Color Palette & Base Styles
- **What:** Configure Tailwind with brand colors, dark mode, custom fonts
- **Why:** Consistent styling across all components
- **Files:** `tailwind.config.ts`, `src/app/globals.css`
- **Verify:** Brand colors available as Tailwind classes
- **Parallel:** No - depends on 1.1

---

## Phase 2: Core Components (Parallelizable)

### [x] Task 2.1: Altitude Meter Component
- **What:** Floating altitude indicator that updates based on scroll position
- **Why:** Core navigation element, establishes hiking metaphor
- **Files:** `src/components/ui/AltitudeMeter.tsx`, `src/lib/scroll-utils.ts`
- **Verify:** Meter shows +500ft at top, updates smoothly on scroll
- **Parallel:** Yes - after Phase 1
- **Completed:** Altitude meter with smooth spring animations, zone indicators, and scroll tracking utilities

### [x] Task 2.2: Sky Zone
- **What:** Hero section with name, warm sky gradient, soft clouds
- **Why:** First impression, establishes theme
- **Files:** `src/components/zones/Sky.tsx`, `src/components/effects/Clouds.tsx`
- **Verify:** Renders at top, clouds have subtle animation
- **Parallel:** Yes - after Phase 1
- **Completed:** Sky zone with animated clouds, warm gradient, scroll indicator, and sun glow effect

### [x] Task 2.3: Forest Zone
- **What:** Operations skill domain with tall trees visual, skill cards
- **Why:** First skill section (FloraFlex proof point)
- **Files:** `src/components/zones/Forest.tsx`, `src/components/ui/SkillCard.tsx`
- **Verify:** Renders below sky, skills display correctly
- **Parallel:** Yes - after Phase 1
- **Completed:** Forest zone with animated tree silhouettes, SkillCard component with hover effects, and FloraFlex proof point

### [x] Task 2.4: Rocky Climb Zone
- **What:** Scale & Strategy skill domain with rocky terrain visual
- **Why:** Second skill section (GigaCloud proof point)
- **Files:** `src/components/zones/RockyClimb.tsx`
- **Verify:** Renders below forest, terrain transition looks natural
- **Parallel:** Yes - after Phase 1
- **Completed:** Rocky terrain with jagged formations, scale & strategy skills, GigaCloud proof point

### [x] Task 2.5: Coastal Overlook Zone
- **What:** Systems & Automation skill domain with Pacific visible
- **Why:** Third skill section (Indeed Flex proof point)
- **Files:** `src/components/zones/CoastalOverlook.tsx`
- **Verify:** Renders at sea level (0ft), ocean visible in distance
- **Parallel:** Yes - after Phase 1
- **Completed:** Coastal zone with ocean horizon, animated waves, systems & automation skills, Indeed Flex proof point

### [x] Task 2.6: Services Page
- **What:** Placeholder page with "Coming soon" and contact info
- **Why:** Business contact path separate from hidden form
- **Files:** `src/app/services/page.tsx`
- **Verify:** Accessible, shows email and phone
- **Parallel:** Yes - after Phase 1
- **Completed:** Services page with Coming Soon message, email contact, and hint about hidden path

---

## Phase 3: Underground (Sequential)

### [ ] Task 3.1: Underground Roots Zone
- **What:** Natural root system visual, transition from surface
- **Why:** Beginning of underground journey
- **Files:** `src/components/zones/UndergroundRoots.tsx`
- **Verify:** Smooth transition from coastal, organic root visuals
- **Parallel:** No - after Phase 2 zones complete

### [ ] Task 3.2: Underground Burrows Zone
- **What:** Deliberate tunnels, signs of activity, groundhog appears
- **Why:** Sets up the secret reveal
- **Files:** `src/components/zones/UndergroundBurrows.tsx`
- **Verify:** Tunnel visuals, groundhog visible at bottom
- **Parallel:** No - depends on 3.1

### [ ] Task 3.3: Groundhog Component & Animation
- **What:** Groundhog that beckons on hover, digs on click
- **Why:** The interactive trigger for the secret
- **Files:** `src/components/ui/Groundhog.tsx`
- **Verify:** Hover 2s triggers beckon, click triggers dig animation
- **Parallel:** No - depends on 3.2

### [ ] Task 3.4: Peel Reveal Animation
- **What:** Page "peels" to reveal data center below
- **Why:** The magical transition to the secret area
- **Files:** `src/components/effects/PeelReveal.tsx`
- **Verify:** Click groundhog triggers smooth peel animation
- **Parallel:** No - depends on 3.3

### [ ] Task 3.5: Secret Data Center
- **What:** Underground facility with animals, terminals, dam plans, contact form
- **Why:** The reward for curious visitors
- **Files:** `src/components/zones/SecretDataCenter.tsx`, `src/components/ui/ContactForm.tsx`
- **Verify:** Renders after peel, form submits to Netlify
- **Parallel:** No - depends on 3.4

---

## Phase 4: Polish

### [ ] Task 4.1: Scroll-Based Parallax
- **What:** Add parallax layers to all zones
- **Why:** Depth and immersion
- **Files:** `src/components/effects/Parallax.tsx`, update zone components
- **Verify:** Foreground/background move at different rates
- **Parallel:** Yes

### [ ] Task 4.2: Spring Physics on Hovers
- **What:** Add bouncy hover states to interactive elements
- **Why:** Josh Comeau-style micro-interactions
- **Files:** Update SkillCard, buttons, interactive elements
- **Verify:** Hovers feel bouncy and alive
- **Parallel:** Yes

### [ ] Task 4.3: Underground Easter Eggs
- **What:** Clickable pickleball paddle, terminal with lyrics, hobby hints
- **Why:** Rewards for exploring the secret area
- **Files:** Update SecretDataCenter.tsx
- **Verify:** Items clickable, reveal hobby messages
- **Parallel:** Yes - after 3.5

### [ ] Task 4.4: Mobile Responsiveness
- **What:** Adapt all zones for mobile, simplify interactions
- **Why:** 50%+ traffic is mobile
- **Files:** All zone and component files
- **Verify:** Journey works on mobile viewport, tap interactions work
- **Parallel:** No - after all zones complete

### [ ] Task 4.5: Performance Optimization
- **What:** Lazy load underground, optimize images, minimize bundle
- **Why:** Target Lighthouse 90+
- **Files:** Various
- **Verify:** Lighthouse score 90+
- **Parallel:** No - after feature complete

---

## Phase 5: Deploy

### [ ] Task 5.1: Netlify Configuration
- **What:** Set up netlify.toml, configure forms, connect domain
- **Why:** Production deployment
- **Files:** `netlify.toml`
- **Verify:** Deploys successfully to dgautomate.dev
- **Parallel:** No - after all features complete

---

## Progress Tracking

| Phase | Tasks | Complete | Status |
|-------|-------|----------|--------|
| 1. Scaffold | 3 | 3 | Complete ✓ |
| 2. Core Components | 6 | 6 | Complete ✓ |
| 3. Underground | 5 | 0 | Not started |
| 4. Polish | 5 | 0 | Not started |
| 5. Deploy | 1 | 0 | Not started |
| **Total** | **20** | **9** | **45%** |
