# 00-CLEANUP.md
# Phase: CLEANUP — Audit & Consolidate Before Building

**Status:** NOT_STARTED  
**Branch:** `chore/cleanup-and-consolidate`  
**Prereq:** None — this is the first phase

---

## Why Cleanup First

The repo has accumulated multiple planning docs, dead files, and inconsistent
state from prior iterations. An agent starting fresh will waste cycles parsing
stale context. Clean the house before renovating.

## Tasks

Complete these IN ORDER. Check off each task by changing status.
After completing a task, git commit immediately.

### 0. Dry Run — Verify Environment
- **Status:** COMPLETE
- **Action:**
  1. Confirm you can read `specs/AGENT_ROUTER.md` (if you're reading this, step 1 passed)
  2. Confirm all spec files exist in `specs/`:
     - `AGENT_ROUTER.md`, `00-CLEANUP.md`, `01-ASSETS.md`, `02-IMPLEMENTATION.md`
     - `03-REVIEW.md`, `DESIGN_DECISIONS.md`, `ASSET_PROMPTS.md`
     - `SCROLL_ARCHITECTURE.md`, `RESPONSIVE_STRATEGY.md`
     - `PERFORMANCE_BUDGET.md`, `NOTION_SYNC.md`
  3. Run `npm run build` — confirm it completes (warnings OK, errors not OK)
  4. Run `git status` — confirm working tree is clean or changes are understood
  5. Confirm `node -v` and `npm -v` return valid versions
- **If any check fails:** STOP. Log failure below and wait for human.
- **Commit:** None (no changes made)

### 1. Create the cleanup branch
- **Status:** COMPLETE
- **Action:** `git checkout -b chore/cleanup-and-consolidate`
- **Commit:** `chore(cleanup): create consolidation branch`

### 2. Audit existing components
- **Status:** NOT_STARTED  
- **Action:** Read through `src/components/` and `src/app/`. Produce a brief
  inventory in this file (below, in the Audit Results section) listing:
  - Which components are actively used vs dead code
  - Which components correspond to which zone (sky, forest, rocky, coastal, datacenter)
  - Current animation/transition approach per component
  - Any hardcoded values that should be configurable
- **Commit:** `docs(cleanup): component audit results`

### 3. Audit existing assets
- **Status:** NOT_STARTED
- **Action:** Check every file in `public/assets/`. For each, note:
  - Dimensions and file size
  - Whether it has transparency (characters/wildlife) or not (backgrounds)
  - Whether it's currently referenced in code or orphaned
  - Quality assessment: keep as-is, needs regen, or delete
- **IMPORTANT — Character triage per DESIGN_DECISIONS.md:**
  Characters are minimized to datacenter only. This means:
  - **KEEP:** `groundhog-scientist-v2.png`, `security-guard.png`
  - **ARCHIVE (not delete):** `coffee-runner.png`, `data-analyst.png`, `intern.png`,
    `karaoke-singer.png`, `network-engineer.png`, `senior-architect.png`,
    `server-technician.png` — move to `public/assets/archive/characters/`
  - This should recover ~9MB of active asset weight
- **Wildlife triage per DESIGN_DECISIONS.md:**
  Characters carry the narrative = landscapes only, no wildlife overlays.
  - **ARCHIVE:** all files in `wildlife/` subdirectories under each zone
    (`banana-slug-small.png`, `stellers-jay-realistic.png`, `california-quail-realistic.png`,
    `fence-lizard-realistic.png`, `cormorant-realistic.png`, `sea-otter-realistic.png`,
    `pelican-silhouette.png`)
  - Move to `public/assets/archive/wildlife/`
  - These may be revisited post-v3 but are out of scope now
- Record results in the Asset Audit section below.
- **Commit:** `docs(cleanup): asset audit results`
- **Commit:** `chore(cleanup): archive unused character and wildlife assets`

### 4. Archive legacy docs
- **Status:** NOT_STARTED
- **Action:** 
  - Create `docs/archive/v1/` and `docs/archive/v2/`
  - Move `docs/iteration-v1-notes/` contents → `docs/archive/v1/`
  - Move `docs/iteration-v2-notes/` contents → `docs/archive/v2/`
  - Move these root files → `docs/archive/`:
    - `AGENTS.md`
    - `CONTINUE-SESSION.md`  
    - `IMPLEMENTATION_PLAN.md`
    - `PROMPT.md`
    - `PROMPT_build.md`
    - `PROMPT_plan.md`
    - `DESIGN_GAPS.md`
    - `PREFERENCES.md` (if content is captured in specs/)
  - Do NOT delete — archive preserves history
  - Do NOT move: `README.md`, `SETUP_GUIDE.md`, `STYLING_GUIDE.md` (yet)
- **Commit:** `chore(cleanup): archive legacy planning docs`

### 5. Consolidate plans/ directory
- **Status:** NOT_STARTED
- **Action:**
  - Review each file in `docs/plans/`:
    - `2026-02-02-brand-document.md`
    - `2026-02-04-card-layout-design.md`
    - `2026-02-04-component-recommendations.md`
    - `2026-02-04-datacenter-characters-design.md`
    - `START_HERE_DESIGN_PHASE.md`
    - `video-layer-strategy.md`
    - `zone-prompts.md`
  - Extract any still-relevant decisions into `specs/DESIGN_DECISIONS.md`
    (append under a "Carried Forward from v2 Plans" heading — do NOT
    overwrite existing locked decisions)
  - Move all plan files → `docs/archive/plans/`
  - The zone-prompts.md content is superseded by `specs/ASSET_PROMPTS.md`
- **Commit:** `chore(cleanup): consolidate plans into specs/`

### 6. Clean up scripts/
- **Status:** NOT_STARTED
- **Action:** Review each script in `scripts/`:
  - `generate-hero-image.mjs`
  - `generate-image.sh`
  - `generate-realistic-wildlife.py`
  - `generate-wildlife-sprite.py`
  - `generate-with-imagen4.py`
  - `generate-zone-background.py`
  - `generate-zone-scenes.py`
  - `screenshot-audit.mjs`
  - `take-zone-screenshots.sh`
  - `test-imagen.py`
  - Determine: still useful for new pipeline, or dead code?
  - Keep scripts that work with Imagen 3 API and are compatible with
    the pipeline described in `specs/ASSET_PROMPTS.md`
  - Archive the rest to `scripts/archive/`
  - Note: `generate-realistic-wildlife.py` and `generate-wildlife-sprite.py`
    are likely dead code since wildlife is archived (see Task 3)
- **Commit:** `chore(cleanup): archive unused generation scripts`

### 7. Fix build warnings + verify build
- **Status:** NOT_STARTED
- **Action:** 
  - `npm run build` — capture full output
  - **Fix these known warnings:**
    - `<img>` tags → convert to Next.js `<Image>` component (VideoBackground.tsx and any others)
    - `useEffect` missing dependency arrays (5 components — list them in Audit Results)
    - Any unused imports from archived components
  - **Fix ONLY** warnings/errors. Do NOT refactor working logic.
  - If archived characters/wildlife were imported in components, remove those
    imports but do NOT remove the component itself (that's IMPLEMENTATION phase)
  - Run `npm run build` again — confirm 0 errors
  - Log any remaining warnings in Audit Results (some may be intentional)
- **Commit:** `fix(cleanup): resolve build warnings` (if changes made)
- **Commit:** `chore(cleanup): verify clean build` (if no changes needed)

### 8. Update STYLING_GUIDE.md
- **Status:** NOT_STARTED
- **Action:** 
  - Read current `STYLING_GUIDE.md` (17KB — substantial)
  - Determine what's still accurate vs outdated
  - Add a header noting: "This guide is being superseded by specs/ 
    files for the v3 refactor. Refer to AGENT_ROUTER.md for current spec."
  - Do NOT delete the file — it may have useful reference for Cursor
- **Commit:** `docs(cleanup): annotate STYLING_GUIDE.md with v3 notice`

### 9. Verify veo-prompts status
- **Status:** NOT_STARTED
- **Action:**
  - Check `docs/veo-prompts/` — determine if these are for the datacenter
    video loop or other video assets
  - If datacenter video: keep in place (datacenter-loop.mp4 stays per
    PERFORMANCE_BUDGET.md)
  - If orphaned: archive to `docs/archive/veo-prompts/`
- **Commit:** `chore(cleanup): triage veo-prompts` (if moved)

### 10. Final state
- **Status:** NOT_STARTED
- **Action:**
  - Run `npm run build` one final time — must pass clean
  - Run `git log --oneline` — verify all cleanup commits are present
  - Update AGENT_ROUTER.md: change `Current Phase` to `ASSETS`
  - Push branch: `git push -u origin chore/cleanup-and-consolidate`
  - Update Notion (see `specs/NOTION_SYNC.md`)
- **Commit:** `chore(cleanup): phase complete, advancing to ASSETS`

---

## DONE Condition

All 11 tasks (0-10) have status COMPLETE. Build passes. 
AGENT_ROUTER.md phase = ASSETS. Branch pushed.

---

## Audit Results

### Dry Run Results
*(Completed 2026-02-05)*

```
Node version: v24.11.1
npm version: 11.6.2
Build result: PASS (with 9 warnings - will fix in Task 7)
Spec files present: ALL (11 files)
Git status: clean (on main branch after committing specs)
```

**Build Warnings Noted (to fix in Task 7):**
- `VideoBackground.tsx`: 2x `<img>` should use `<Image>`
- `3d-card.tsx`: useEffect missing `handleAnimations` dependency
- `particles.tsx`: 3x useEffect missing dependencies
- `sticky-scroll-reveal.tsx`: useEffect missing `linearGradients` dependency
- `text-generate-effect.tsx`: useEffect missing dependencies
- `typewriter-effect.tsx`: useEffect missing `animate` dependency

### Component Inventory
*(Agent fills this in during Task 2)*

```
Component: [name]
  Location: src/components/[path]
  Zone: [sky|forest|rocky|coastal|datacenter|shared]
  Used: [yes|no]
  Animation: [description of current animation approach]
  Notes: [any issues or observations]
```

### Asset Inventory  
*(Agent fills this in during Task 3)*

```
Asset: [filename]
  Location: public/assets/[path]
  Dimensions: [WxH]
  Size: [KB/MB]
  Transparency: [yes|no]
  Referenced in code: [yes|no — cite component]
  Quality: [keep|regen|archive]
  Action: [keep in place|archive to assets/archive/[subfolder]|needs regen in ASSETS phase]
  Notes: [observations]
```

### Archived Assets Summary
*(Agent fills this in after Task 3 archiving)*

```
Total archived characters: [count] ([size]MB)
Total archived wildlife: [count] ([size]MB)
Total space freed from active assets: [size]MB
Remaining active assets: [count] ([size]MB)
```

### Build Warning Log
*(Agent fills this in during Task 7)*

```
Warning: [description]
  File: [path]
  Fixed: [yes|no]
  How: [what was changed]
```

```
Remaining warnings after fix (if any):
  [description] — [reason it's intentional/deferred]
```

### Scripts Assessment
*(Agent fills this in during Task 6)*

```
Script: [filename]
  Purpose: [what it does]
  Still relevant: [yes|no]
  Reason: [why keep or archive]
  Action: [keep|archive]
```
