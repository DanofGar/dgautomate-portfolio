# AGENTS.md - Project Guidance for dgautomate.dev

## Source of Truth
- **Brand Document:** `docs/plans/2026-02-02-brand-document.md`
- **User Preferences:** `PREFERENCES.md`
- **Specs:** `specs/*.md`

**Always read PREFERENCES.md before making decisions.**

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Forms | Netlify Forms |
| Hosting | Netlify |
| Language | TypeScript |

---

## Build Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

---

## Testing Commands

```bash
# Build must succeed
npm run build

# No TypeScript errors
npx tsc --noEmit

# Lint must pass
npm run lint

# Visual check (use Playwright MCP)
# Navigate to http://localhost:3000 and verify zones render
```

---

## File Structure Convention

```
src/
├── app/
│   ├── page.tsx              # Main journey page
│   ├── services/page.tsx     # Services placeholder
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── zones/                # One component per journey zone
│   │   ├── Sky.tsx
│   │   ├── Forest.tsx
│   │   ├── RockyClimb.tsx
│   │   ├── CoastalOverlook.tsx
│   │   ├── UndergroundRoots.tsx
│   │   ├── UndergroundBurrows.tsx
│   │   └── SecretDataCenter.tsx
│   ├── ui/                   # Reusable UI components
│   │   ├── AltitudeMeter.tsx
│   │   ├── SkillCard.tsx
│   │   ├── Groundhog.tsx
│   │   └── ContactForm.tsx
│   └── effects/              # Animation/visual effect components
│       ├── Clouds.tsx
│       ├── Parallax.tsx
│       └── PeelReveal.tsx
└── lib/
    └── scroll-utils.ts       # Scroll detection utilities
```

---

## Coding Conventions

### Components
- One component per file
- Named exports: `export function ComponentName()`
- Props interface above component: `interface ComponentNameProps {}`
- Use Framer Motion's `motion` components for animations

### Styling
- Tailwind classes inline
- Use `cn()` utility for conditional classes (install `clsx` + `tailwind-merge`)
- Dark mode is default - no toggle needed
- Colors should match brand palette in brand document

### Animations
- Use Framer Motion `useScroll` and `useTransform` for scroll-based
- Spring physics for micro-interactions: `type: "spring", stiffness: 300, damping: 20`
- Respect `prefers-reduced-motion`

---

## What NOT To Do

1. **Don't add light mode** - Dark mode only for MVP
2. **Don't create a blog** - Out of scope
3. **Don't add a CMS** - Content is hardcoded
4. **Don't over-engineer** - Build what's needed, nothing more
5. **Don't use corny copy** - Let design show personality
6. **Don't skip the brand document** - It's the source of truth
7. **Don't run npm commands outside Docker** in autonomous mode
8. **Don't commit broken builds** - Verify before committing

---

## Parallel Execution Rules

When spawning parallel agents:
- Use **Sonnet** model for all agents
- Each agent gets ONE zone or feature
- Agents should read their specific spec file
- Agents must verify build passes before marking complete
- Use `subagent_type: "general-purpose"` for implementation tasks

### Parallelizable Tasks (after project setup)
- Sky zone
- Forest zone
- Rocky Climb zone
- Coastal Overlook zone
- Services page

### Sequential Tasks
- Project scaffold (must be first)
- Underground zones (after above-ground complete)
- Groundhog + Peel animation (after underground)
- Secret Data Center (after groundhog)

---

## Commit Message Format

```
type: description

- Detail 1
- Detail 2

Co-Authored-By: Claude Sonnet 4 <noreply@anthropic.com>
```

Types: `feat`, `fix`, `refactor`, `docs`, `style`, `chore`

---

## Success Criteria

MVP is complete when:
- [ ] All zones render correctly
- [ ] Scroll journey works smoothly
- [ ] Altitude meter updates on scroll
- [ ] Groundhog appears and beckons on hover
- [ ] Click groundhog triggers peel reveal
- [ ] Secret data center renders with contact form
- [ ] Services page shows placeholder + contact info
- [ ] Mobile responsive (journey intact)
- [ ] `npm run build` passes
- [ ] Deploys to Netlify successfully
