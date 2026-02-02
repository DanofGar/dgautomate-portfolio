# Design Implementation Gaps

*Created: February 2, 2026*
*Status: Documented for future design-focused branch*

---

## Overview

The current implementation (v1.0) successfully delivers the **functional structure** and **technical foundation**, but falls short on **visual design richness and detail** specified in the brand document.

**What works:**
- ✅ Scroll journey structure (+500ft to -100ft)
- ✅ Zone transitions and color gradients
- ✅ Basic parallax scrolling
- ✅ Altitude meter tracking
- ✅ Groundhog interaction (hover → click → reveal)
- ✅ Form functionality
- ✅ All builds passing, technical foundation solid

**What's missing:**
- ❌ Visual richness and detailed scenery
- ❌ Polished micro-interactions
- ❌ Easter eggs as integrated scene elements
- ❌ "Cute rounder features" aesthetic
- ❌ Josh Comeau-style layered shadows and depth

---

## Detailed Gaps by Zone

### 1. Sky Zone (+500 ft)
**Spec says:** "Warm clouds, soft animation, minimal - invites scrolling"
**Current state:** Basic gradient with simple cloud shapes
**Missing:**
- Detailed, illustrated cloud shapes with personality
- Soft drift animation (clouds should move independently)
- Warm golden sun element with glow
- More atmospheric depth and layering

### 2. Forest Zone (+200 ft)
**Spec says:** Tall trees visual, skill domain for Operations
**Current state:** Abstract tree silhouettes, functional skill cards
**Missing:**
- Detailed tree illustrations (Big Sur coastal style)
- Forest depth with layered vegetation
- Visual richness that makes it feel like you're IN the forest
- Organic, hand-drawn quality to match "cute rounder features"

### 3. Rocky Climb Zone (+50 ft)
**Spec says:** Rocky terrain, scale & strategy theme
**Current state:** Abstract rock formations
**Missing:**
- Detailed rock textures and formations
- Sense of climbing/elevation
- Big Sur coastal rock aesthetic (weathered, terracotta, gray)
- More dramatic terrain features

### 4. Coastal Overlook Zone (0 ft)
**Spec says:** "Pacific visible in distance"
**Current state:** Basic ocean representation
**Missing:**
- Realistic ocean horizon with depth
- Coastal vegetation (sage, coastal plants)
- Sense of overlooking the Pacific
- Atmospheric perspective (distant ocean fading)

### 5. Underground Roots (-20 ft)
**Spec says:** "Natural root system, organic, tangled, earthy"
**Current state:** Abstract root shapes
**Missing:**
- Detailed, organic root illustrations
- Redwood root system inspiration
- Rich texture and depth
- Soil layers with visual interest

### 6. Underground Burrows (-50 ft)
**Spec says:** "Deliberate tunnels, signs of activity, groundhog peeks out"
**Current state:** Tunnel outlines, basic groundhog
**Missing:**
- Detailed tunnel interiors with texture
- More visible signs of activity (excavation marks, tool marks)
- Dirt and soil texture
- Better visual storytelling of "someone's been working here"

### 7. Secret Data Center (-100 ft)
**Spec says:** "Groundhogs in lab coats, terminals, servers, machinery, dam construction plans"
**Current state:** Easter egg buttons, basic scene description
**Missing:**
- **Visual groundhog characters** - should be illustrated/3D, wearing lab coats, actively working
- **Detailed server racks** - should look like actual equipment, not just shapes
- **Dam construction plans** - should be visible blueprints/diagrams on tables/walls
- **Terminal screens** - should show actual terminal-style content
- **Scene depth** - layered environment that feels like a real underground facility
- **Lighting atmosphere** - warm lamp lighting creating cozy tech bunker feel

---

## Interaction & Animation Gaps

### Groundhog Interaction
**Spec says:**
1. Hover 0-2s: Gets curious, perks up
2. Hover 2s+: Full beckon animation, clearly inviting click
3. Click: Digs downward
4. Peel animation: Earth layer rolls/tears away

**Current state:** Basic implementation exists
**Issues reported:**
- Not working as smoothly/intuitively as intended
- May need more obvious visual feedback
- Peel animation may need more drama/impact

### Easter Eggs
**Spec says:** "Woven into scenery" with tooltips on click
**Current state:** Clickable emoji buttons
**Missing:**
- Easter eggs should be **integrated scene elements**, not obvious buttons
- Pickleball paddle should be a detailed illustration leaning against something
- Terminal should be a visible screen you click on
- Hiking boot should be part of the scene naturally
- "Walking on Sunshine" lyrics should display in terminal-style on screen

### Micro-Interactions
**Spec says:** "Josh Comeau-style" - gentle lift, soft shadow, slight scale
**Current state:** Basic spring physics added
**Missing:**
- Layered shadows that respond to hover
- More nuanced spring physics (stiffness/damping tuning)
- Depth perception through shadow layers
- Smooth, delightful feeling throughout

---

## Visual Design System Gaps

### Typography
**Spec says:** "Rounded, friendly sans-serif" with possible hand-drawn accents
**Current state:** System fonts
**Missing:**
- Custom font selection matching "cute rounder features"
- Display font for section markers
- Typography that adds personality

### Shadows & Depth
**Spec says:** "Soft, layered shadows (Josh Comeau style)"
**Current state:** Basic Tailwind shadows
**Missing:**
- Multi-layer shadow stacks for depth
- Colored shadows (not just black)
- Shadows that enhance the 3D feeling

### Gradients
**Spec says:** "HSL-interpolated gradients (no muddy midpoints)"
**Current state:** Basic Tailwind gradients
**Gap:** Could be optimized for smoother color transitions

### Rounded Corners
**Spec says:** "Rounded corners and soft edges throughout"
**Current state:** Some rounding applied
**Gap:** Not consistently applied to create cohesive soft aesthetic

---

## Mobile Gaps

**Spec says:**
- Hover states become tap states
- Groundhog: tap once to beckon, tap again to dig
- Easter eggs hidden on mobile
- Simplified animations for performance

**Current state:** Not specifically tested/optimized
**Status:** Needs mobile-specific attention

---

## Technical Debt (for design branch)

1. **Asset pipeline** - Need process for optimized images/illustrations
2. **Animation performance** - May need optimization with detailed visuals
3. **Component refactoring** - Some components may need restructuring for richer content
4. **Accessibility** - Ensure interactive elements work with keyboard/screen readers
5. **Loading strategy** - Lazy load underground sections

---

## Next Steps (for design-focused branch)

### High Priority
1. **Secret Data Center scene** - Most visible gap, needs detailed illustration/3D work
2. **Groundhog interaction polish** - Core mechanic needs to feel perfect
3. **Easter eggs integration** - Make them part of the scene, not buttons

### Medium Priority
4. **Zone scenery detail** - Add visual richness to each environment
5. **Micro-interaction polish** - Layered shadows, refined springs
6. **Cloud animation** - Make sky zone more alive

### Lower Priority (polish)
7. **Typography refresh** - Custom fonts
8. **Mobile optimization** - Specific mobile experience
9. **Performance tuning** - With heavier visuals

---

## Reference for Design Work

**Source of truth:** `docs/plans/2026-02-02-brand-document.md`
**Inspiration:** Big Sur / Garrapata Trail, warm California coastal, Josh Comeau-style interactions
**Key phrase:** "Cute rounder features" - soft, friendly, detailed but not corporate

**Visual references to gather for design branch:**
- Big Sur coastal photography (terrain colors, textures)
- Redwood root system photos (underground organic feel)
- Cozy tech bunker aesthetics (for data center)
- Groundhog/beaver character reference (for illustrated characters)
- Josh Comeau portfolio examples (shadow/interaction style)

---

*This document will guide the design-focused branch after v1.0 deployment.*
