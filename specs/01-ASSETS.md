# 01-ASSETS.md
# Phase: ASSETS — Generate, Process, Approve All Visual Assets

**Status:** IN_PROGRESS
**Branch:** `asset/v3-backgrounds`
**Last Updated:** 2026-02-05 02:45 AM

---

## Read First

- For the full prompt chain → `specs/ASSET_PROMPTS.md`
- For design rationale → `specs/DESIGN_DECISIONS.md`

## Status Tracker

| # | Asset | Status | Version | File Location | Human Notes |
|---|-------|--------|---------|---------------|-------------|
| 1 | sky-hero | APPROVED | v3 | `public/assets/sky/sky-background-v3.png` | Late morning light, lupines + poppies. Name goes TOP RIGHT, parallax behind horizon. |
| 2 | forest-bg | APPROVED | v3 | `public/assets/forest/forest-background-v3.png` | Midday, creek + fallen redwood log bridge. Need text zones for bio (left side darker area). |
| 3 | ~~rocky-bg~~ | **CUT** | — | — | Zone removed from design |
| 4 | coastal-bg | APPROVED | v3 | `public/assets/coastal/coastal-overlook-v3.png` | Golden sandstone cliffs, matches cave rock colors |
| 5 | cave-transition | APPROVED | v3 | `public/assets/cave/cave-transition-v3.png` | Looking out from inside cave, golden sandstone, warm light |
| 6 | datacenter-bg | NEEDS_MODIFICATION | v3 | `public/assets/datacenter/datacenter-background-v3.png` | Add cave-ceiling to top edge to connect with cave-transition |
| 7 | groundhog-scientist | NEEDS_COMPOSITE_TEST | v2 | `public/assets/characters/groundhog-scientist-v2.png` | BG removed, 126KB WebP |
| 8 | groundhog-security | NEEDS_COMPOSITE_TEST | v2 | `public/assets/characters/security-guard.png` | BG removed, 99KB WebP |

### Status Values
- `APPROVED` — Locked. Do not modify.
- `NEEDS_MODIFICATION` — Existing asset needs targeted edits
- `NEEDS_COMPOSITE_TEST` — Place on scene background, verify blending
- `PENDING_HUMAN_REVIEW` — **STOP. Wait for human approval.**
- `CUT` — Removed from scope

## Next Actions

1. **datacenter-bg modification** — Add cave ceiling to top 20% to visually connect with cave-transition
2. **Character composite tests** — Once datacenter-bg is ready, composite groundhogs onto it
3. **Blend verification** — Test all panel transitions once datacenter is done

## Blend Verification Checklist (run when assets 1-6 all APPROVED)

- [x] Sky bottom → Forest top: color temperature match
- [x] ~~Forest bottom → Rocky top~~ (rocky cut)
- [x] ~~Rocky bottom → Coastal top~~ (rocky cut)
- [x] Forest bottom → Coastal top: Need to verify direct transition works
- [x] Coastal bottom → Cave top: light-to-dark gradient
- [ ] Cave bottom → Datacenter top: cave ceiling continuity ← BLOCKED on datacenter modification
- [ ] Full sequence composite test
- [ ] Mobile crop test

## Output Locations (Simplified)

```
public/assets/
├── sky/sky-background-v3.png         ✓ APPROVED
├── forest/forest-background-v3.png   ✓ APPROVED
├── coastal/coastal-overlook-v3.png   ✓ APPROVED
├── cave/cave-transition-v3.png       ✓ APPROVED
├── datacenter/datacenter-background-v3.png  ← NEEDS_MODIFICATION
└── characters/
    ├── groundhog-scientist-v2.png    ← NEEDS_COMPOSITE_TEST
    └── security-guard.png            ← NEEDS_COMPOSITE_TEST
```

## DONE Condition

All rows (except CUT) have status APPROVED. Blend verification passes.
Update AGENT_ROUTER.md: `Current Phase: IMPLEMENTATION`
