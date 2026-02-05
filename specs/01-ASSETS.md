# 01-ASSETS.md
# Phase: ASSETS — Generate, Process, Approve All Visual Assets

**Status:** IN_PROGRESS  
**Branch:** `asset/v3-backgrounds`  
**Prereq:** CLEANUP phase complete, audit results available in `specs/00-CLEANUP.md`

---

## Read First

- For the full prompt chain → `specs/ASSET_PROMPTS.md`
- For design rationale → `specs/DESIGN_DECISIONS.md`

## Preflight Checks (run before starting any asset work)

These tools are NOT needed during CLEANUP. Only verify them now.

```bash
# 1. rembg for background removal
pip install rembg --break-system-packages
rembg --help  # should print usage

# 2. cwebp for WebP conversion with alpha
# macOS:
brew install webp
# Linux:
sudo apt-get install webp
cwebp -version  # should print version

# 3. Google AI Studio API access
# Verify GOOGLE_API_KEY is set:
echo $GOOGLE_API_KEY  # should print a key
# If empty, run: source ~/.zshrc
# If still empty: STOP. Human must configure API key.

# 4. Verify existing Imagen scripts are functional
# Check which scripts survived CLEANUP archiving in scripts/
ls scripts/generate-*.py scripts/generate-*.mjs 2>/dev/null
```

**If any preflight check fails:** Update this file with the failure, 
set status to BLOCKED, note the blocker, and STOP. Human must resolve.

## Asset Pipeline

Assets are generated sequentially — each panel uses the previous as a
style reference. Do NOT skip ahead or generate out of order.

**Human approval gates:** When an asset reaches PENDING_HUMAN_REVIEW, the
agent STOPS. The human reviews, then either:
- Changes status to APPROVED → agent continues to next asset
- Changes status to REVISION_REQUESTED + adds notes → agent regenerates

This is intentionally NOT fully automated. Style consistency requires
human judgment at each step.

## Status Tracker

| # | Asset | Status | Version | Blocker | Human Notes |
|---|-------|--------|---------|---------|-------------|
| 1 | sky-hero | APPROVED | v1 | None | Approved 2026-02-05 |
| 2 | forest-bg | PENDING_HUMAN_REVIEW | v1 | None | Generated 2026-02-05, used sky-hero as ref |
| 3 | rocky-bg | BLOCKED | v0 | Waiting on forest-bg APPROVED | |
| 4 | coastal-bg | BLOCKED | v0 | Waiting on rocky-bg APPROVED | |
| 5 | cave-transition | BLOCKED | v0 | Waiting on coastal-bg APPROVED | NEW — bridges coastal→datacenter |
| 6 | datacenter-bg | NEEDS_MODIFICATION | v3 | Waiting on cave-transition APPROVED | Add cave-ceiling to top edge |
| 7 | groundhog-scientist | NEEDS_COMPOSITE_TEST | v2 | Waiting on datacenter-bg for composite | BG removed, 126KB WebP |
| 8 | groundhog-security | NEEDS_COMPOSITE_TEST | v2 | Waiting on datacenter-bg for composite | BG removed, 99KB WebP |

### Status Values
- `NEEDS_GENERATION` — Ready for Imagen 3 generation
- `NEEDS_MODIFICATION` — Existing asset needs targeted edits
- `NEEDS_BG_REMOVAL` — Run through rembg pipeline
- `NEEDS_COMPOSITE_TEST` — Place on scene background, verify blending
- `PENDING_HUMAN_REVIEW` — **STOP. Wait for human approval.**
- `REVISION_REQUESTED` — Human left notes in "Human Notes" column, regenerate
- `APPROVED` — Locked. Do not modify.
- `BLOCKED` — Cannot start until blocker resolves

### Parallel Work Note
Items 7-8 (character BG removal) are NOT blocked on the background chain.
An agent can process characters while waiting for human approval on backgrounds.
However, composite testing of characters requires datacenter-bg (item 6) to be
at least at NEEDS_COMPOSITE_TEST status.

## Agent Workflow (per cycle)

```
1. Read this file
2. Run preflight checks if this is the first cycle in ASSETS phase
3. Find first row where Status is actionable:
   - NOT: BLOCKED, APPROVED, PENDING_HUMAN_REVIEW
   - Priority: backgrounds (1-6) before characters (7-8), unless
     backgrounds are all BLOCKED/PENDING and characters are actionable
4. Execute the action for that status:
   - NEEDS_GENERATION:
     a. Read prompt from specs/ASSET_PROMPTS.md
     b. If this is panel 2+, locate previous panel's APPROVED output
        as style reference
     c. Generate via Imagen 3 API or Google AI Studio
     d. Save to assets/raw/[name]-v[N].png
     e. Save a preview to assets/preview/[name]-v[N]-preview.png
     f. Update status to PENDING_HUMAN_REVIEW
   - NEEDS_MODIFICATION:
     a. Read modification instructions from specs/ASSET_PROMPTS.md
     b. Use existing asset as base reference
     c. Generate modified version
     d. Save to assets/raw/ and assets/preview/
     e. Update status to PENDING_HUMAN_REVIEW
   - NEEDS_BG_REMOVAL:
     a. Source file: public/assets/characters/[name].png
     b. Run: rembg i [input] assets/processed/[name]-transparent.png
     c. Run: cwebp -q 90 -alpha_q 100 [transparent.png] -o assets/processed/[name].webp
     d. Verify file size < 200KB (if larger, try -q 85)
     e. Update status to NEEDS_COMPOSITE_TEST
   - NEEDS_COMPOSITE_TEST:
     a. Composite the processed asset onto its target background
     b. Save composite to assets/preview/[name]-composite-v[N].png
     c. Check for: white fringe, halo artifacts, color mismatch
     d. If clean: update status to PENDING_HUMAN_REVIEW
     e. If artifacts visible: re-run rembg with different model, or
        note issue and set to PENDING_HUMAN_REVIEW with notes
   - REVISION_REQUESTED:
     a. Read human's notes in "Human Notes" column
     b. Increment version number
     c. Regenerate with adjustments per notes
     d. Save to assets/raw/ and assets/preview/
     e. Update status to PENDING_HUMAN_REVIEW
5. Update the status in this table
6. Git commit: "asset([name]): v[N] [status]"
7. If status changed to PENDING_HUMAN_REVIEW → update Notion → STOP
8. Otherwise, continue to next actionable row
```

## Blend Verification (after all backgrounds individually approved)

Only run this when assets 1-6 ALL have status APPROVED:

- [ ] Sky bottom → Forest top: color temperature match
- [ ] Forest bottom → Rocky top: vegetation density transition
- [ ] Rocky bottom → Coastal top: terrain continuity
- [ ] Coastal bottom → Cave top: light-to-dark gradient
- [ ] Cave bottom → Datacenter top: cave ceiling continuity
- [ ] Full sequence composite: stitch all 6 panels vertically with 15% overlap,
      export as one tall strip, review the complete scroll flow
- [ ] Mobile crop test: for each panel, apply the `object-position` values from
      `specs/RESPONSIVE_STRATEGY.md` at 9:16 crop and verify the focal point is good

If any blend check fails:
1. Identify which panel is the weaker link
2. Set that panel's status to REVISION_REQUESTED
3. Add notes: "Blend fail with [adjacent panel]: [specific issue]"
4. The chain does NOT need to restart from scratch — only the weak panel regenerates

## Output Locations

```
assets/
├── raw/           ← Direct from Imagen 3 (never delete — version history)
│   ├── sky-hero-v1.png
│   ├── sky-hero-v2.png  (if revised)
│   └── ...
├── processed/     ← After rembg / optimization
│   ├── groundhog-scientist.webp
│   └── groundhog-security.webp
├── preview/       ← Composite tests and blend previews for human review
│   ├── sky-hero-v1-preview.png
│   ├── groundhog-scientist-composite-v1.png
│   └── full-sequence-blend-test.png
└── approved/      ← Final approved assets — these get copied to public/assets/ in CODE phase
    ├── sky-hero.webp
    ├── forest-bg.webp
    ├── rocky-bg.webp
    ├── coastal-bg.webp
    ├── cave-transition.webp
    ├── datacenter-bg.webp
    ├── groundhog-scientist.webp
    └── groundhog-security.webp
```

When an asset is APPROVED:
1. Optimize: `cwebp -q 90 [raw.png] -o assets/approved/[name].webp`
2. Verify size is within budget (see `specs/PERFORMANCE_BUDGET.md`):
   - Backgrounds: < 500KB WebP
   - Characters: < 200KB WebP
3. If over budget, reduce quality incrementally (-q 85, -q 80) until within budget
4. Copy to `assets/approved/`

## DONE Condition

All 8 rows have status APPROVED. All blend verification checks pass.
Mobile crop test passes. All approved assets are in `assets/approved/`.
Update AGENT_ROUTER.md: `Current Phase: IMPLEMENTATION`
