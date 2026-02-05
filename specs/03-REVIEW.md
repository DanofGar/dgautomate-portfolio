# 03-REVIEW.md
# Phase: REVIEW — Test, Audit, Ship

**Status:** BLOCKED (waiting on IMPLEMENTATION phase)  
**Branch:** Same as implementation: `feature/v3-refactor`  
**Prereq:** All implementation tasks COMPLETE in `specs/02-IMPLEMENTATION.md`

---

## Checklist

| # | Check | Status | Result | Notes |
|---|-------|--------|--------|-------|
| 1 | Build passes (`npm run build`) | NOT_STARTED | | |
| 2 | Lighthouse: Performance ≥ 90 | NOT_STARTED | | See `specs/PERFORMANCE_BUDGET.md` |
| 3 | Lighthouse: Accessibility ≥ 90 | NOT_STARTED | | |
| 4 | LCP < 2.5s on 4G throttle | NOT_STARTED | | |
| 5 | CLS < 0.1 | NOT_STARTED | | |
| 6 | Desktop scroll test: all zones flow smoothly | NOT_STARTED | | |
| 7 | Mobile portrait: all zones readable | NOT_STARTED | | |
| 8 | Mobile landscape: cinematic mode works | NOT_STARTED | | |
| 9 | iOS Safari: parallax fallback working | NOT_STARTED | | |
| 10 | prefers-reduced-motion: animations disabled | NOT_STARTED | | |
| 11 | Screenshot all zones: desktop 1920x1080 | NOT_STARTED | | Save to docs/screenshots/v3/ |
| 12 | Screenshot all zones: mobile 390x844 | NOT_STARTED | | Save to docs/screenshots/v3/ |
| 13 | Transition blends look natural (no visible seams) | NOT_STARTED | | |
| 14 | Text is readable over all backgrounds | NOT_STARTED | | |
| 15 | Characters composite cleanly in datacenter | NOT_STARTED | | |
| 16 | Update Notion with final screenshots + status | NOT_STARTED | | |
| 17 | PR ready for merge | NOT_STARTED | | |

## If a Check Fails

1. Log the failure in the Result column
2. Create a fix task: append to `specs/02-IMPLEMENTATION.md` task list
3. Change AGENT_ROUTER.md phase back to IMPLEMENTATION
4. Next loop iteration picks up the fix

## DONE Condition

All 17 checks PASS. PR opened. Notion updated with final state.
Update AGENT_ROUTER.md: `Current Phase: COMPLETE`
