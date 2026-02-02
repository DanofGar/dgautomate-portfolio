# dgautomate.dev - Setup & Execution Guide

*Your roadmap to running the parallel build*

---

## What You Need to Do

### Step 1: Environment Check (5 min)

You already have these installed:
- [x] Docker Desktop (running)
- [x] GitHub MCP (connected)
- [x] Playwright MCP (connected)
- [x] Notion MCP (configured with token)

**Verify everything is ready:**
```bash
# Check Docker is running
docker ps

# Check Claude MCP connections
claude mcp list
```

Expected output should show all 4 MCPs connected.

---

### Step 2: Clone the Repository

```bash
cd ~/Projects/dgautomate-portfolio
git clone https://github.com/DanofGar/dgautomate-portfolio.git .
```

*Note: The repo is empty except for README, which is fine.*

---

### Step 3: Start a New Claude Session with Sonnet

For parallel task execution, start Claude with Sonnet as the model:

```bash
cd ~/Projects/dgautomate-portfolio
claude --model sonnet
```

Or if you want to use the Ralph Wiggum loop later:
```bash
cd ~/Projects/dgautomate-portfolio
claude
```

Then inside Claude, you can specify parallel agents use Sonnet.

---

### Step 4: Give Full Permission for Safe Execution

When you start the session, say:

```
Read docs/plans/2026-02-02-brand-document.md for context.
I'm giving full permission. Run safely in Docker for any risky operations.
Set up the project and execute the implementation plan using parallel agents with Sonnet.
```

---

## How Parallel Execution Works

### The Strategy

Instead of building sequentially, we split work across multiple agents:

| Agent | Task | Dependencies |
|-------|------|--------------|
| **Agent 1** | Project scaffold (Next.js, Tailwind, Framer Motion) | None |
| **Agent 2** | Sky zone + Altitude meter component | Agent 1 |
| **Agent 3** | Forest zone | Agent 1 |
| **Agent 4** | Rocky Climb zone | Agent 1 |
| **Agent 5** | Coastal Overlook zone | Agent 1 |
| **Agent 6** | Underground zones (roots + burrows) | Agent 1 |
| **Agent 7** | Groundhog + Peel animation | Agent 6 |
| **Agent 8** | Secret Data Center + Contact form | Agent 7 |
| **Agent 9** | Services page | Agent 1 |

After Agent 1 completes, Agents 2-6 and 9 can run **in parallel**.
Then Agent 7, then Agent 8.

### How to Invoke Parallel Agents

In your Claude session, you can say:

```
Run these tasks in parallel using Sonnet:
1. Build the Forest zone component
2. Build the Rocky Climb zone component
3. Build the Coastal Overlook zone component
```

Claude will spawn multiple Task agents simultaneously.

---

## Docker Safety Setup

For autonomous execution with `--dangerously-skip-permissions`, run inside Docker:

### Build the Dev Container

```bash
cd ~/Projects/dgautomate-portfolio

docker build -t dgautomate-dev -f- . << 'DOCKERFILE'
FROM node:20-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    tree \
    ripgrep \
    && rm -rf /var/lib/apt/lists/*

# Install Claude Code globally
RUN npm install -g @anthropic-ai/claude-code

WORKDIR /workspace

CMD ["/bin/bash"]
DOCKERFILE
```

### Run the Container

```bash
docker run -it --rm \
    -v "$(pwd)":/workspace \
    -e ANTHROPIC_API_KEY="$ANTHROPIC_API_KEY" \
    -p 3000:3000 \
    dgautomate-dev
```

### Inside the Container

```bash
# Install project dependencies
npm install

# Start dev server (in background)
npm run dev &

# Run Claude with full permissions
claude --dangerously-skip-permissions
```

---

## Ralph Wiggum Loop (Alternative)

If you want fully autonomous operation:

### The Loop Files

These will be created in your project:
- `PROMPT_plan.md` - Planning mode prompt
- `PROMPT_build.md` - Building mode prompt
- `loop.sh` - The execution loop
- `AGENTS.md` - Project-specific guidance
- `IMPLEMENTATION_PLAN.md` - Task checklist

### Running the Loop

```bash
# Planning phase (5 iterations)
./loop.sh plan 5

# Review the plan
cat IMPLEMENTATION_PLAN.md

# Building phase (20 iterations or until done)
./loop.sh 20
```

### Monitor Progress

In another terminal:
```bash
watch -n 5 'git log --oneline -10'
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `docs/plans/2026-02-02-brand-document.md` | Brand & design source of truth |
| `AGENTS.md` | Build commands, conventions, guardrails |
| `IMPLEMENTATION_PLAN.md` | Task checklist for the loop |
| `PREFERENCES.md` | Your coding style preferences |
| `specs/*.md` | Detailed specs per zone/feature |

---

## Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Deploy to Netlify (after connecting)
netlify deploy --prod

# Check git status
git status

# View recent commits
git log --oneline -10

# Undo last commit (if needed)
git reset --soft HEAD~1
```

---

## What Claude Will Do Next

When you give the go-ahead, Claude will:

1. **Initialize the project** - Next.js 14 + Tailwind + Framer Motion
2. **Create AGENTS.md** - Build commands and conventions
3. **Create specs** - Detailed requirements per zone
4. **Create IMPLEMENTATION_PLAN.md** - Atomic tasks
5. **Set up Ralph Wiggum files** - loop.sh and prompts
6. **Begin parallel execution** - Multiple agents building zones simultaneously

---

## Estimated Structure After Setup

```
dgautomate-portfolio/
├── docs/
│   └── plans/
│       └── 2026-02-02-brand-document.md
├── specs/
│   ├── sky-zone.md
│   ├── forest-zone.md
│   ├── rocky-climb-zone.md
│   ├── coastal-overlook-zone.md
│   ├── underground-zones.md
│   ├── groundhog-reveal.md
│   ├── secret-datacenter.md
│   └── services-page.md
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── styles/
├── AGENTS.md
├── IMPLEMENTATION_PLAN.md
├── PREFERENCES.md
├── PROMPT_plan.md
├── PROMPT_build.md
├── loop.sh
├── package.json
└── README.md
```

---

## Ready?

Start a new Claude session in the project directory and give the go-ahead!

```bash
cd ~/Projects/dgautomate-portfolio
claude --model sonnet
```

Then say:
```
Read docs/plans/2026-02-02-brand-document.md and SETUP_GUIDE.md.
Full permission granted. Set up the project and begin parallel execution.
```
