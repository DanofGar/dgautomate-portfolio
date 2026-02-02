# dgautomate.dev - Setup & Execution Guide

*Using Ralph Wiggum Loop for autonomous development*

---

## What's Ready

| File | Purpose |
|------|---------|
| `docs/plans/2026-02-02-brand-document.md` | Design source of truth |
| `PREFERENCES.md` | Your coding style preferences |
| `AGENTS.md` | Build commands, conventions, guardrails |
| `IMPLEMENTATION_PLAN.md` | 20 atomic tasks across 5 phases |
| `PROMPT_plan.md` | Planning mode prompt |
| `PROMPT_build.md` | Build mode prompt |
| `loop.sh` | Ralph Wiggum execution script |

---

## Quick Start (Recommended)

### 1. Build the Docker Container

```bash
cd ~/Projects/dgautomate-portfolio

docker build -t dgautomate-dev -f- . << 'DOCKERFILE'
FROM node:20-slim
RUN apt-get update && apt-get install -y git curl && rm -rf /var/lib/apt/lists/*
RUN npm install -g @anthropic-ai/claude-code
WORKDIR /workspace
CMD ["/bin/bash"]
DOCKERFILE
```

### 2. Run the Container

```bash
docker run -it --rm \
    -v "$(pwd)":/workspace \
    -e ANTHROPIC_API_KEY="$ANTHROPIC_API_KEY" \
    -p 3000:3000 \
    dgautomate-dev
```

### 3. Inside Container: Run the Loop

```bash
# Planning phase (verify/update the plan)
./loop.sh plan 3

# Review the plan
cat IMPLEMENTATION_PLAN.md

# Build phase (execute tasks)
./loop.sh build 20

# Or run until complete
./loop.sh
```

---

## Loop Modes

| Command | What It Does |
|---------|--------------|
| `./loop.sh plan 5` | Run 5 planning iterations |
| `./loop.sh build 20` | Run 20 build iterations |
| `./loop.sh 20` | Alias for build 20 |
| `./loop.sh` | Run build until BUILD_COMPLETE |
| `./loop.sh parallel` | Spawn parallel agents for independent zones |

---

## Parallel Execution

After the project scaffold (Phase 1) is complete, these zones can build in parallel:

```
┌─────────────────────────────────────────────────┐
│              Phase 1: Scaffold                  │
│         (must complete first)                   │
└─────────────────────┬───────────────────────────┘
                      │
    ┌─────────────────┼─────────────────┐
    │        │        │        │        │
    ▼        ▼        ▼        ▼        ▼
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│ Sky  │ │Forest│ │Rocky │ │Coast │ │Serv- │
│ Zone │ │ Zone │ │Climb │ │ Over │ │ices  │
└──────┘ └──────┘ └──────┘ └──────┘ └──────┘
    │        │        │        │
    └────────┴────┬───┴────────┘
                  │
    ┌─────────────┴─────────────┐
    │  Phase 3: Underground     │
    │  (sequential)             │
    │  Roots → Burrows →        │
    │  Groundhog → Peel →       │
    │  Data Center              │
    └───────────────────────────┘
```

To run parallel mode:
```bash
./loop.sh parallel
```

---

## Monitoring Progress

### Watch Git Log
```bash
# In another terminal
watch -n 5 'git log --oneline -10'
```

### Check Implementation Plan
```bash
cat IMPLEMENTATION_PLAN.md | grep -E "^\[.\]"
```

### Check Build Status
```bash
npm run build 2>&1 | tail -20
```

---

## Safety Controls

| Action | How |
|--------|-----|
| Stop the loop | `Ctrl+C` |
| Undo last commit | `git reset --soft HEAD~1` |
| See what changed | `git diff HEAD~1` |
| Start fresh | `git reset --hard origin/main` |

---

## Without Docker (Less Safe)

If you want to run outside Docker:

```bash
cd ~/Projects/dgautomate-portfolio
claude --model sonnet
```

Then say:
```
Read AGENTS.md and IMPLEMENTATION_PLAN.md.
Execute the plan. Run build commands carefully.
```

**Note:** Without Docker, you're running npm commands directly on your system. The loop uses `--dangerously-skip-permissions` which is designed for containerized environments.

---

## Troubleshooting

### Loop gets stuck
```bash
# Check what task it's on
cat IMPLEMENTATION_PLAN.md | grep -A5 "^\[ \]" | head -10

# Manually mark task complete if needed
# Edit IMPLEMENTATION_PLAN.md, change [ ] to [x]
```

### Build fails
```bash
# Check errors
npm run build 2>&1

# Fix manually then continue loop
./loop.sh build 1
```

### Want to skip a task
```bash
# Edit IMPLEMENTATION_PLAN.md
# Add note: "SKIPPED: [reason]"
# Mark [x] to move on
```

---

## Success Criteria

The loop is complete when:
- `npm run build` passes
- All zones render correctly
- Groundhog Easter egg works
- Contact form submits
- Mobile responsive
- Deploys to Netlify

---

## Files Reference

```
dgautomate-portfolio/
├── docs/plans/
│   └── 2026-02-02-brand-document.md  ← Design source of truth
├── AGENTS.md                          ← Build commands & conventions
├── IMPLEMENTATION_PLAN.md             ← Task checklist
├── PREFERENCES.md                     ← Your coding style
├── PROMPT_plan.md                     ← Planning loop prompt
├── PROMPT_build.md                    ← Build loop prompt
├── loop.sh                            ← Execution script
└── SETUP_GUIDE.md                     ← This file
```
