# User Preferences

## Daniel Garcia - dgautomate.dev

### Coding Style
- Conversational, warm tone in any copy
- Clean, readable code over clever code
- Tailwind CSS for styling (no separate CSS files unless necessary)
- TypeScript preferred
- Functional components with hooks

### Patterns & Approaches
- Next.js 14 App Router
- Framer Motion for animations
- Component-per-file in organized folders
- Keep components focused and small
- No over-engineering - build what's needed

### Approaches to Avoid
- No corny messaging ("I'm great with people")
- No corporate buzzwords
- No excessive comments - code should be self-documenting
- No premature optimization
- No light mode (dark mode only for MVP)

### Working Style
- Explain things clearly (learning as I go)
- Don't oversell or use excessive praise
- Run risky operations in Docker
- Parallel execution preferred when tasks are independent
- Use Sonnet for parallel agents

### Ralph Loop Usage
- **Always use `./loop.sh`** - not raw `while :; do cat PROMPT.md | claude; done`
- The script checks for `.loop_complete` file to auto-stop
- Raw while loops run forever and waste API calls

### Design Philosophy
- Fun over formal
- Design shows personality, not words
- Rounder, cute features
- Layered shadows, HSL gradients
- Big Sur / Garrapata trail inspiration

---
*Captured on February 2, 2026 - update as preferences evolve*
