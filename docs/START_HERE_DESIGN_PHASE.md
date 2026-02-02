# START HERE: Design Research & Implementation Phase

*For Claude - Read this first when resuming the design-research-components branch work*

---

## 🎯 Current Mission

Implement visual components and design richness for the dgautomate.dev portfolio based on component library research completed via Google Gemini.

---

## 📍 Project Status (as of Feb 2, 2026)

### ✅ COMPLETE

**Production Deployment:**
- Site: https://dgautomate.dev
- Build: Passing (46s deploy time)
- Forms: Netlify Forms v5 configured
- DNS: Custom domain configured with SSL
- Status: Fully functional v1.0 deployed

**Main Branch:**
- All zones implemented (Sky → Underground Data Center)
- Scroll journey working (+500ft to -100ft)
- Basic animations with Framer Motion
- Contact form in Secret Data Center
- Easter eggs (basic implementation)

**Technical Foundation:**
- Next.js 14.2 + React 18.3
- Tailwind CSS 3.4
- Framer Motion 12.29
- TypeScript 5
- clsx + tailwind-merge

### 🔄 IN PROGRESS

**Design Research Phase:**
- Branch: `feature/design-research-components`
- Worktree: `~/.config/superpowers/worktrees/dgautomate-portfolio/design-research-components`
- Status: Gemini research completed, component decisions made

### ⏸️ PAUSED AT

User has completed Gemini Deep Research and chosen component libraries. Ready to implement visual components.

---

## 📂 Key Documentation

### Read These First:

1. **`docs/plans/2026-02-02-brand-document.md`**
   - Brand identity and theme (Big Sur / Garrapata Trail)
   - Color palettes for each zone
   - Visual style guidelines ("cute rounder features")
   - User background and positioning

2. **`DESIGN_GAPS.md`**
   - Zone-by-zone visual deficiencies
   - What's missing from current implementation
   - Interaction polish needs
   - Easter egg integration requirements

3. **`docs/DESIGN_CONTEXT.md`**
   - Aceternity UI technical specs
   - Component patterns (Gemini scroll, Text Generate, Hero Parallax, etc.)
   - Tailwind config requirements
   - Implementation priorities

4. **`docs/GEMINI_RESEARCH_PROMPT.md`**
   - The prompt used for research (for context)
   - Contains all requirements and constraints

### User's Gemini Results:

**⚠️ IMPORTANT:** Ask the user which components they chose based on Gemini research:
- Primary library selection?
- Specific components for each zone?
- Custom build requirements?
- Implementation priority order?

---

## 🗂️ Repository Structure

```
dgautomate-portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main journey
│   │   ├── services/page.tsx     # Services placeholder
│   │   └── layout.tsx
│   ├── components/
│   │   ├── zones/                # Zone components
│   │   │   ├── Sky.tsx
│   │   │   ├── Forest.tsx
│   │   │   ├── RockyClimb.tsx
│   │   │   ├── CoastalOverlook.tsx
│   │   │   ├── UndergroundRoots.tsx
│   │   │   ├── UndergroundBurrows.tsx
│   │   │   └── SecretDataCenter.tsx
│   │   ├── ui/
│   │   │   ├── AltitudeMeter.tsx
│   │   │   ├── Groundhog.tsx
│   │   │   └── ContactForm.tsx
│   │   └── effects/
│   │       └── Clouds.tsx
│   └── lib/
│       └── utils.ts              # cn() helper (already exists)
├── docs/
│   ├── plans/
│   │   └── 2026-02-02-brand-document.md
│   ├── DESIGN_CONTEXT.md
│   ├── GEMINI_RESEARCH_PROMPT.md
│   └── START_HERE_DESIGN_PHASE.md  # ← You are here
├── DESIGN_GAPS.md
├── IMPLEMENTATION_PLAN.md
└── netlify.toml
```

---

## 🔧 Worktree Setup

### Location:
```bash
~/.config/superpowers/worktrees/dgautomate-portfolio/design-research-components
```

### Branch:
`feature/design-research-components`

### Status:
- ✅ Synced with main
- ✅ All documentation included
- ✅ Dependencies installed
- ✅ Build verified working

### Access:
```bash
cd ~/.config/superpowers/worktrees/dgautomate-portfolio/design-research-components
```

### Docker Dev Environment:
The project uses Docker for consistent builds:
```bash
docker run --rm -v "$(pwd)":/workspace -w /workspace dgautomate-dev sh -c "npm install"
docker run --rm -v "$(pwd)":/workspace -w /workspace dgautomate-dev sh -c "npm run build"
```

---

## 🎨 Implementation Workflow

### Step 1: Confirm Component Choices
**Ask the user:**
- "Which component library did Gemini recommend?"
- "Which specific components did you decide to use for each zone?"
- "Any custom builds required?"
- "What's the implementation priority order?"

### Step 2: Install Dependencies
Based on their choices, install:
```bash
# Common for Aceternity UI approach
npm install @tabler/icons-react

# If using other libraries, install those
npm install [library-name]
```

### Step 3: Set Up Base Infrastructure

**Priority 1: Tailwind Config**
- Extend colors (slate-900, neutral-800, etc.)
- Add animations (shimmer, spotlight, meteor)
- Add `addVariablesForColors` plugin

**Priority 2: Utility Functions**
- Verify `lib/utils.ts` has `cn()` helper
- Add any additional utilities needed

### Step 4: Implement Zone by Zone

**Suggested Order (based on DESIGN_GAPS.md):**

1. **Secret Data Center** (-100ft) - Most visible gap
   - Illustrated groundhogs in lab coats
   - Detailed server racks
   - Visible dam construction blueprints
   - Terminal screens with content
   - Layered scene depth
   - Integrated Easter eggs

2. **Sky Zone** (+500ft) - First impression
   - Detailed cloud illustrations
   - Soft drift animation
   - Warm golden sun with glow
   - Atmospheric depth

3. **Forest Zone** (+200ft)
   - Detailed tree illustrations (Big Sur style)
   - Layered vegetation
   - Organic hand-drawn quality

4. **Rocky Climb Zone** (+50ft)
   - Rock textures and formations
   - Coastal rock aesthetic
   - Dramatic terrain

5. **Coastal Overlook** (0ft)
   - Realistic ocean horizon
   - Coastal vegetation
   - Atmospheric perspective

6. **Underground Roots** (-20ft)
   - Detailed organic roots
   - Redwood inspiration
   - Rich soil textures

7. **Underground Burrows** (-50ft)
   - Tunnel interiors with texture
   - Signs of activity
   - Groundhog interaction polish

### Step 5: Micro-interactions & Polish
- Layered shadows (Josh Comeau style)
- Spring physics tuning
- Hover states
- Smooth transitions

### Step 6: Performance Optimization
- Lazy loading underground sections
- Image optimization
- Animation performance
- Lighthouse 90+ verification

---

## 🧪 Testing Workflow

### Local Development:
```bash
cd ~/.config/superpowers/worktrees/dgautomate-portfolio/design-research-components
docker run --rm -v "$(pwd)":/workspace -w /workspace -p 3000:3000 dgautomate-dev sh -c "npm run dev"
```

### Build Verification:
```bash
docker run --rm -v "$(pwd)":/workspace -w /workspace dgautomate-dev sh -c "npm run build"
```

### Deploy Preview:
```bash
# After committing changes
git push origin feature/design-research-components

# Then use Netlify CLI for preview
docker run --rm -v "$(pwd)":/workspace -w /workspace -e NETLIFY_AUTH_TOKEN="$NETLIFY_AUTH_TOKEN" dgautomate-dev sh -c "npx netlify-cli deploy --alias design-preview"
```

---

## 📋 Implementation Checklist Template

Create tasks as you go using TaskCreate:

```
[ ] Install chosen component libraries
[ ] Configure Tailwind with new animations/colors
[ ] Implement Secret Data Center detailed scene
[ ] Implement Sky Zone cloud animations
[ ] Implement Forest Zone layered vegetation
[ ] Implement Rocky Climb detailed textures
[ ] Implement Coastal Overlook ocean depth
[ ] Implement Underground Roots organic details
[ ] Polish Groundhog interaction (hover → beckon → peel)
[ ] Integrate Easter eggs as scene elements
[ ] Add layered shadows throughout
[ ] Tune spring physics on all interactions
[ ] Performance optimization pass
[ ] Mobile responsiveness check
[ ] Lighthouse score verification (target: 90+)
[ ] Create PR to merge back to main
```

---

## 🔐 Environment & Credentials

### Netlify Auth Token:
Stored in `~/.zshrc`:
```bash
export NETLIFY_AUTH_TOKEN="nfp_26apeE6toSMeGsDginaRgA6eyFBbsXHv31f7"
```

### Docker Image:
`dgautomate-dev` - Pre-configured with Node 20 and dependencies

### MCP Servers Available:
- Netlify MCP (configured in Claude Desktop)
- Docker MCP
- GitHub MCP (plugin:github:github)

---

## 🎯 Success Criteria

The implementation is complete when:

✅ All zones have visual richness matching brand document
✅ "Cute rounder features" aesthetic achieved
✅ Easter eggs integrated as natural scene elements
✅ Groundhog interaction feels smooth and delightful
✅ Layered depth and parallax throughout
✅ Josh Comeau-style shadows and micro-interactions
✅ Lighthouse score 90+
✅ Mobile responsive
✅ All animations smooth at 60fps
✅ Secret Data Center feels like a real underground facility

---

## 🚀 Quick Start Commands

### 1. Navigate to worktree:
```bash
cd ~/.config/superpowers/worktrees/dgautomate-portfolio/design-research-components
```

### 2. Verify branch:
```bash
git branch --show-current
# Should show: feature/design-research-components
```

### 3. Check status:
```bash
git status
```

### 4. Start implementing based on user's Gemini choices!

---

## 📞 Context for Next Session

**User Background:**
- Operations/sales professional → automation
- Based in Cincinnati, roots in Big Sur
- Hobbies: Pickleball, singing, hiking Garrapata Trail

**Brand Theme:**
- Big Sur / Garrapata Trail coastal vibes
- Warm, earthy, grounded with playful underground
- "Cute rounder features" not corporate
- Scroll journey from sky (+500ft) to data center (-100ft)

**Current Gap:**
- Functional structure ✓
- Visual richness ✗
- Need: Detailed illustrations, layered depth, polished interactions

**User's Next Input:**
- Will provide Gemini's component recommendations
- Will specify which libraries/components to use
- Ready to implement visual improvements

---

## 🔄 Merging Back to Main (Future)

When design work is complete:

```bash
cd ~/Projects/dgautomate-portfolio
git checkout main
git merge feature/design-research-components
git push origin main
```

Netlify will auto-deploy to https://dgautomate.dev

---

**Ready to implement! Start by asking the user about their Gemini research results and component choices.**
