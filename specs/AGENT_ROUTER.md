# AGENT_ROUTER.md
# ⚠️ READ THIS FIRST ON EVERY CONTEXT RESET ⚠️

**Last Updated:** 2026-02-05  
**Current Phase:** ASSETS  
**Current Branch:** `chore/cleanup-and-consolidate`

---

## How This Works

You are an agent in a Ralph Wiggum loop. Your context resets frequently.
This file tells you WHERE to look and WHAT to do. Do not read anything
else until this file directs you to.

## Step 1: Check Current Phase (above)

| Phase | Read This File | Do This |
|-------|---------------|---------|
| CLEANUP | `specs/00-CLEANUP.md` | Audit codebase, remove dead files, consolidate docs |
| ASSETS | `specs/01-ASSETS.md` | Generate/process/approve visual assets |
| IMPLEMENTATION | `specs/02-IMPLEMENTATION.md` | Build features against approved assets |
| REVIEW | `specs/03-REVIEW.md` | Test, audit performance, screenshot |

## Step 2: Read ONLY the file for your current phase

Each spec file contains:
- Its own status tracker (what's done, what's next)
- Specific instructions for that phase
- References to other files ONLY when needed
- A "DONE" condition that triggers phase advancement

## Step 3: When a phase completes

1. Update this file: change `Current Phase` to next phase
2. Git commit: `chore: advance to [PHASE] phase`
3. Stop. Next loop iteration picks up the new phase.

## Reference Files (read ONLY when a spec file tells you to)

| File | Purpose | When to Read |
|------|---------|-------------|
| `specs/DESIGN_DECISIONS.md` | Locked design choices | When you need to know WHY something is a certain way |
| `specs/ASSET_PROMPTS.md` | Imagen 3 prompt chain | During ASSETS phase only |
| `specs/SCROLL_ARCHITECTURE.md` | Scroll behavior + zones | During IMPLEMENTATION phase only |
| `specs/RESPONSIVE_STRATEGY.md` | Breakpoints + reflow | During IMPLEMENTATION phase only |
| `specs/PERFORMANCE_BUDGET.md` | Targets + allowed animations | During IMPLEMENTATION + REVIEW |
| `specs/NOTION_SYNC.md` | How/when to update Notion | After any meaningful state change |

## Files to IGNORE (legacy, will be removed in CLEANUP phase)

These exist in the repo but are superseded by this system:
- `AGENTS.md` → replaced by `AGENT_ROUTER.md`
- `CONTINUE-SESSION.md` → replaced by phase system
- `IMPLEMENTATION_PLAN.md` → replaced by `specs/02-IMPLEMENTATION.md`
- `PROMPT.md`, `PROMPT_build.md`, `PROMPT_plan.md` → consolidated into specs/
- `DESIGN_GAPS.md` → addressed in `specs/DESIGN_DECISIONS.md`
- `docs/plans/*.md` → archived to `docs/archive/`
- `STYLING_GUIDE.md` → relevant parts merged into specs/

## Git Convention

All commits in this refactor use:
```
type(scope): description

Types: chore, feat, fix, asset, docs
Scopes: cleanup, sky, forest, rocky, coastal, cave, datacenter, 
        scroll, text, responsive, perf, characters
```
