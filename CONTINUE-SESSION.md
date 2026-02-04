# dgautomate.dev Portfolio - Continuation Prompt

## Project Context

You're continuing work on **dgautomate.dev**, a portfolio website with a Big Sur/Garrapata Trail scroll journey theme. The user scrolls from +500ft (sky) down to -100ft (secret underground data center).

## Key Locations

- **Project**: `~/Projects/dgautomate-portfolio/`
- **Assets**: `~/Projects/dgautomate-portfolio/public/assets/`
- **Worktree**: `~/.config/superpowers/worktrees/dgautomate-portfolio/design-research-components`
- **Branch**: `feature/design-research-components`
- **Notion Page**: `2fb8718c-af12-81dc-8385-dd37ebd22f93` (check for latest decisions)

## Style Direction (APPROVED)

- **Realistic-ish 3D** - Pixar environmental art quality
- **Big Sur photography aesthetic** with subtle charm
- **NOT kawaii** - no smiley faces on objects, minimal blush on characters
- **Coastal image** is the "favorite vibe" - use as reference for tone

## Current Asset Status (ALL APPROVED - Feb 4, 2026)

| Asset | Status | Location |
|-------|--------|----------|
| sky-background-v2.png | APPROVED | /assets/sky/ |
| forest-background-v2.png | APPROVED | /assets/forest/ |
| coastal-overlook-v2.png | APPROVED (favorite) | /assets/coastal/ |
| rocky-climb-v2.png | APPROVED | /assets/rocky/ |
| underground-transition-v2.png | APPROVED | /assets/burrows/ |
| groundhog-scientist-v2.png | APPROVED | /assets/characters/ |
| datacenter-background-v3.png | **APPROVED** | /assets/datacenter/ |
| coffee-runner.png | **APPROVED** | /assets/characters/ |
| security-guard.png | **APPROVED** | /assets/characters/ |
| network-engineer.png | **APPROVED** | /assets/characters/ |
| server-technician.png | **APPROVED** | /assets/characters/ |
| data-analyst.png | **APPROVED** | /assets/characters/ |
| senior-architect.png | **APPROVED** | /assets/characters/ |
| intern.png | **APPROVED** | /assets/characters/ |
| karaoke-singer.png | **APPROVED** | /assets/characters/ |

## Design Decisions Made (Feb 4, 2026)

### Data Center Layout
- Two floors with mezzanine catwalk
- Spacious, tall ceiling
- Server racks on upper level, workstations on main floor

### Animation Approach
- **CSS transforms** (translateX + slight bob) - NOT sprites, NOT Lottie
- **Two movers**: Coffee Runner, Security Guard
- All other characters stationary (optional subtle breathing)

### Character Roster (9 total)
1. Coffee Runner (animated - 8-10s loop)
2. Security Guard (animated - 12s loop, opposite direction)
3. Scientist (existing asset)
4. Network Engineer
5. Server Technician
6. Data Analyst
7. Senior Architect
8. Intern
9. Karaoke Singer

### Easter Eggs
- **Lyrics Terminal**: Scrolling karaoke text next to Karaoke Singer
- **Pickleball paddle**: Somewhere in scene
- Karaoke Singer groundhog performing/singing

## Next Phase: Implementation

**PROMPT.md is ready** - Run the Ralph loop to implement:

```bash
cd ~/Projects/dgautomate-portfolio
while :; do cat PROMPT.md | claude --dangerously-skip-permissions; done
```

Or implement manually following `PROMPT.md` instructions.

## Key Files

- `PROMPT.md` - Ralph loop implementation prompt
- `docs/plans/2026-02-04-datacenter-characters-design.md` - Full design spec
- `docs/plans/2026-02-02-brand-document.md` - Brand guidelines
- `PREFERENCES.md` - Coding style preferences

## API Access

- **Imagen 4.0**: Use `GOOGLE_API_KEY` env variable
- **Script**: `scripts/generate-image.sh "prompt" "output.png" [aspect_ratio]`

## Notion Page ID

`2fb8718c-af12-81dc-8385-dd37ebd22f93` - Update with progress at major checkpoints.
