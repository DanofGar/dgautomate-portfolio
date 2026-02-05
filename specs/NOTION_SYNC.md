# NOTION_SYNC.md
# When and How to Update Notion

---

## Database: "dgautomate.dev Refactor Tracker"

### Schema

| Property | Type | Options/Format |
|----------|------|----------------|
| Name | Title | Branch name or task description |
| Type | Select | Asset Generation, Code Implementation, Review, Bug Fix |
| Status | Status | Not Started, In Progress, In Review, Done, Blocked |
| Phase | Select | Cleanup, Asset Pipeline, Code Phase, Review Phase |
| Assets Changed | Multi-select | sky-hero, forest-bg, rocky-bg, coastal-bg, cave-transition, datacenter-bg, groundhog-scientist, groundhog-security |
| Branch | Rich text | Git branch name |
| Screenshots | Files | Attach preview images |
| Build Status | Select | Pass, Fail, Not Run |
| Updated By | Select | Human, Claude Code, Asset Pipeline |
| Blockers | Rich text | What's preventing progress |
| Next Action | Rich text | What needs to happen next + who (human/agent) |
| Last Updated | Last edited time | Automatic |

## When to Update Notion

Update after ANY of these events:
1. Phase change in AGENT_ROUTER.md
2. Asset status change to PENDING_HUMAN_REVIEW
3. Asset APPROVED
4. Implementation task completed
5. Build pass/fail
6. Branch created or PR opened
7. Blocker identified
8. Review check failed

## Update Format

When posting an update, include:
```
Branch: [branch name]
Phase: [current phase]
What changed: [1-2 sentences]
Build: [pass/fail/not run]
Next action: [what needs to happen] by [human/agent]
Blocker: [if any, otherwise "none"]
```

## Do NOT Update Notion For:
- Intermediate work that isn't a milestone
- Git commits that don't change status
- Reading/parsing files
- Failed generation attempts (only update when moving to PENDING_HUMAN_REVIEW)
