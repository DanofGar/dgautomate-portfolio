# Task: Implement Secret Data Center Scene

Implement the secret data center scene for dgautomate.dev with animated groundhog characters.

## Context

Read these files first:
- `docs/plans/2026-02-04-datacenter-characters-design.md` - Full design spec
- `docs/plans/2026-02-02-brand-document.md` - Brand guidelines
- `PREFERENCES.md` - Coding preferences (Framer Motion, Tailwind, TypeScript)

## Assets Available

All assets in `public/assets/`:
- `datacenter/datacenter-background-v3.png` - 2-floor data center background
- `characters/groundhog-scientist-v2.png` - Existing scientist
- `characters/coffee-runner.png` - Animated mover
- `characters/security-guard.png` - Animated mover
- `characters/network-engineer.png`
- `characters/server-technician.png`
- `characters/data-analyst.png`
- `characters/senior-architect.png`
- `characters/intern.png`
- `characters/karaoke-singer.png`

## Implementation Requirements

### 1. SecretDataCenter Component
Create/update `src/components/zones/SecretDataCenter.tsx`:
- Background image layer (datacenter-background-v3.png)
- Character layers positioned via CSS
- Z-index: background → stationary characters → animated movers

### 2. Animated Characters (CSS Transforms)
**Coffee Runner:**
- Slides left-right across foreground (80% width)
- Vertical bob (translateY ±3px) synced to walking
- 8-10 second loop, eases at edges

**Security Guard:**
- Opposite direction from Coffee Runner
- Slower pace, ~12 second loop
- Brief pause at each end

Use Framer Motion or CSS @keyframes.

### 3. Stationary Characters
Position these at workstations (no movement or subtle breathing):
- Scientist (central workstation)
- Network Engineer (server rack area)
- Server Technician (crouched at panel)
- Data Analyst (at monitors)
- Senior Architect (drafting desk)
- Intern (supply area with boxes)
- Karaoke Singer (next to lyrics terminal)

### 4. Lyrics Terminal Easter Egg
Create a terminal element next to Karaoke Singer:
- Scrolling lyrics text (CSS vertical translate)
- Green highlighted current line
- ~30 second loop
- Content: Pick a fun song or placeholder lyrics

### 5. Responsive Considerations
- Desktop: Full experience with all characters
- Mobile: Simplified, maybe fewer characters or no animations

## Notion Checkpoints

**IMPORTANT:** Update Notion after each major phase.

**Page ID:** `2fb8718c-af12-81dc-8385-dd37ebd22f93`

### Major Checkpoints (Sequential - wait for confirm)
After completing each, add a bullet to Notion before continuing:
1. "SecretDataCenter component structure created"
2. "Background and stationary characters positioned"
3. "Animated characters (Coffee Runner, Security Guard) working"
4. "Lyrics terminal Easter egg implemented"
5. "Implementation complete - ready for review"

### Minor Logging (Parallel - fire and continue)
Log decisions/issues without waiting:
- "Chose [X] approach for animation timing"
- "Issue: [describe] - will address in next iteration"

Use this pattern:
```typescript
// Notion update helper (create if needed)
// Major: await notionUpdate(...)
// Minor: notionUpdate(...) // no await
```

## Commit Strategy

Commit after each working increment:
- "feat(datacenter): Add component structure and background"
- "feat(datacenter): Position stationary characters"
- "feat(datacenter): Add Coffee Runner animation"
- "feat(datacenter): Add Security Guard patrol"
- "feat(datacenter): Add lyrics terminal Easter egg"

## Exit Conditions

Exit this iteration when you've made meaningful progress and committed it. Don't try to do everything in one pass - the loop will bring you back.

Good stopping points:
- Component structure created and rendering
- Characters positioned correctly
- One animation working
- Easter egg functional

Commit your progress before exiting.
