# DESIGN_DECISIONS.md
# Locked Design Decisions — Do Not Revisit

These decisions were made during the design phase. Agents should
follow them, not question them. If a decision needs changing,
a human must update this file.

---

## Background Strategy
**Decision:** Full regeneration of all backgrounds using Imagen 3.  
**Rationale:** Existing panels have inconsistent lighting, perspective,
and color temperature. CSS blending can't fix fundamentally mismatched assets.  
**Locked:** 2026-02-05

## Animation Ceiling
**Decision:** Mobile-performant only. No WebGL, no canvas, no video backgrounds
(except existing datacenter loop). CSS animations + Framer Motion transforms only.  
**Rationale:** Mobile is a primary pain point. Fancy desktop effects that break
mobile are a net negative for a portfolio site.  
**Locked:** 2026-02-05

## Character Usage
**Decision:** Minimize characters. Groundhogs appear in datacenter section ONLY.
No wildlife in landscape sections (remove existing wildlife assets from active use).  
**Rationale:** The landscapes should carry the narrative. Characters in nature
scenes created compositing problems and distracted from the immersion.  
**Locked:** 2026-02-05

## Content Presentation
**Decision:** Replace glassmorphism cards with "emerging text" pattern.
Use radial gradient vignette scrim (not cards, not backdrop-blur).  
**Rationale:** Glass cards created a "pasted-on" feeling. Text should emerge
from the scene, not float above it in a container.  
**Locked:** 2026-02-05

## Scroll Behavior
**Decision:** Hybrid scroll-snap with proximity on desktop, mandatory on mobile.
50vh transition zones on desktop, 30vh on mobile.  
**Rationale:** Full continuous scroll feels like a webpage. Hard snap feels like
a slideshow. Proximity snap gives gentle guidance without fighting the user.  
**Locked:** 2026-02-05

## Mobile Strategy
**Decision:** Responsive reflow — different layouts for portrait and landscape.
Portrait: text bottom-aligned, full-width, no parallax.
Landscape: cinematic crop, text right-aligned, minimal parallax.  
**Rationale:** Forcing landscape rotation is hostile UX. Both orientations
should work well with different presentations.  
**Locked:** 2026-02-05

## Asset Generation Tool
**Decision:** Imagen 3 (Google AI Studio) as primary. Each panel references
the previous panel as style input for cross-panel consistency.  
**Rationale:** Consistency across 5+ panels matters more than any single
panel being perfect. Sequential reference chaining solves this.  
**Locked:** 2026-02-05

## New Asset: Cave Transition
**Decision:** A new 6th background panel bridges coastal → datacenter.
Shows sea cave interior transitioning to industrial underground.  
**Rationale:** The existing design teleports from a sunlit coast to an
underground bunker. The cave provides a discovered, narrative-driven transition.  
**Locked:** 2026-02-05

## Typography
**Decision:** Playfair Display (or Fraunces) for headings, Source Serif 4 for body.
Warm white (#F5F0E8) text with multi-layer text-shadow for readability.  
**Rationale:** Editorial serif fonts match the cinematic, documentary tone.
Sans-serif (Inter, etc.) would feel corporate and generic.  
**Locked:** 2026-02-05
