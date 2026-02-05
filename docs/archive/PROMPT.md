# Portfolio Iteration V2 - Fix Issues & Generate Assets

## Your Mission
Fix the issues identified in iteration v1 and integrate new AI-generated backgrounds. This is a cleanup + asset integration iteration.

## READ THESE FIRST
1. `docs/iteration-v1-notes/ISSUES.md` - All identified problems
2. `docs/iteration-v1-notes/IMAGE_PROMPTS.md` - Prompts for generating assets
3. `CONTINUE-SESSION.md` - Project context

## Current Branch
Start from `iteration/v1-aceternity-components` and create new branch `iteration/v2-cleanup-and-assets`

```bash
git checkout iteration/v1-aceternity-components
git checkout -b iteration/v2-cleanup-and-assets
```

## Task Checklist

### Phase 1: Remove Legacy Sections
- [ ] Remove `UndergroundRoots` component import and usage from `page.tsx`
- [ ] Remove `UndergroundBurrows` component import and usage from `page.tsx`
- [ ] Remove `PeelReveal` wrapper (datacenter shows directly after StorySection)
- [ ] Delete `src/components/zones/UndergroundRoots.tsx`
- [ ] Delete `src/components/zones/UndergroundBurrows.tsx`
- [ ] Delete `src/components/effects/PeelReveal.tsx`
- [ ] Verify build passes: `npm run build`
- [ ] Commit: `fix: Remove legacy underground sections`

### Phase 2: Fix Altitude Meter
- [ ] Read current `AltitudeMeter.tsx` to understand how it works
- [ ] Refactor to sync with actual page sections:
  - Hero: +500 ft, "Sky"
  - StorySection (scrolls through): Forest → Rocky → Coastal
  - Datacenter: -100 ft, "Datacenter"
- [ ] Use scroll position to determine current section
- [ ] Test that labels match visible content
- [ ] Commit: `fix: Sync altitude meter with actual page sections`

### Phase 3: Replace Hero Background
**IMPORTANT:** Check if new hero image exists at `public/assets/sky/hero-sky-v1.png` or similar.

If image exists:
- [ ] Update `Sky.tsx` to use new background image instead of Aurora effect
- [ ] Remove or simplify Aurora Background usage
- [ ] Ensure text is readable over new background
- [ ] Position pelican naturally in scene (or remove if integrated in background)

If image does NOT exist:
- [ ] Note in commit that hero image is pending generation
- [ ] Keep Aurora as placeholder but add TODO comment
- [ ] Create `docs/iteration-v2-notes/PENDING_ASSETS.md` listing what's needed

Commit: `feat(hero): Replace Aurora with sky background image` or `docs: Note pending hero asset`

### Phase 4: Fix Wildlife Transparency
- [ ] Check wildlife images in `public/assets/*/wildlife/`
- [ ] If images have white backgrounds, note which ones need regeneration
- [ ] Update `StorySection.tsx` to add `mix-blend-mode: multiply` or similar as workaround
- [ ] Or add CSS to hide white backgrounds with transparent fallback
- [ ] Commit: `fix: Improve wildlife image blending`

### Phase 5: Smooth Transitions
- [ ] Add gradient overlays between StorySection and Datacenter
- [ ] Ensure no hard lines between sections
- [ ] Consider adding a brief transition zone with CSS gradient
- [ ] Commit: `fix: Add smooth transitions between sections`

### Phase 6: Final Cleanup
- [ ] Remove unused imports and components
- [ ] Run `npm run build` - must pass with no errors
- [ ] Run `npm run lint` - fix any critical issues
- [ ] Take screenshots of each section for comparison
- [ ] Commit: `chore: Final cleanup and verification`

### Phase 7: Documentation
- [ ] Update `CONTINUE-SESSION.md` with new state
- [ ] Create `docs/iteration-v2-notes/CHANGES.md` summarizing what was done
- [ ] List any remaining issues or next steps
- [ ] Commit: `docs: Update session context for v2`

## Page Structure After Cleanup

```
┌─────────────────────────────────────────┐
│  HERO - Sky background image            │
│  + "Daniel G" + hook line               │
│  + Pelican (integrated or 3D card)      │
└─────────────────────────────────────────┘
          ↓ (smooth scroll)
┌─────────────────────────────────────────┐
│  STICKY SCROLL STORY SECTION            │
│  - Forest: "People First"               │
│  - Rocky: "Breaking Things"             │
│  - Coastal: "Automation Obsession"      │
│  + Border Beam + Particles + Wildlife   │
└─────────────────────────────────────────┘
          ↓ (gradient transition)
┌─────────────────────────────────────────┐
│  DATACENTER                             │
│  + Background Beams + Green Particles   │
│  + Groundhog characters                 │
│  + Terminal contact form                │
└─────────────────────────────────────────┘
          +
┌─────────────────────────────────────────┐
│  FLOATING DOCK (Fixed bottom)           │
└─────────────────────────────────────────┘
```

## Commit Protocol
```bash
git add -A && git commit -m "type(scope): description

Co-Authored-By: Claude <noreply@anthropic.com>"
```

## Exit Conditions

### Per-Iteration
Complete ONE phase, commit, then exit.

### Loop Completion
When ALL phases complete:
1. Full `npm run build` verification
2. Screenshots in `docs/iteration-v2-notes/screenshots/`
3. `touch .loop_complete`
4. Exit
