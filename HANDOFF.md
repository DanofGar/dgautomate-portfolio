# HANDOFF — Portfolio Site for Daniel Garcia

**Last Updated:** 2026-02-05
**Branch:** `asset/v3-backgrounds`
**Status:** Visual foundation complete, content restructure needed

---

## Who Is Daniel Garcia?

**NOT a developer.** A business professional who uses AI as a tool to solve problems.

| Aspect | Detail |
|--------|--------|
| **Professional Arc** | Sales/Account Management → Sales Operations & Automation → AI-enabled business solutions |
| **Education** | B.A. Psychology + business electives (business law, entrepreneurial management, HCI) + IT work during school |
| **Core Strength** | Excellent business acumen + understanding people (psychology) + technical fluency (not coding, but AI tools) |
| **Location** | Fairfield, OH (Cincinnati area), open to relocation |
| **Languages** | English & Spanish (native bilingual) |

**The unique angle:** Sales ops professional who taught himself to leverage AI for business enablement. This site is proof of that capability.

---

## Site Purpose

**Primary audience:** Recruiters (via LinkedIn shares)
**Secondary audience:** Friends and network

**The vibe:** Personal, casual, warm. "Come explore who I am and what I'm building."

**What it should demonstrate:**
1. Daniel can actually BUILD things with AI (this site is exhibit A)
2. He has diverse experience across multiple industries
3. He understands both people AND systems
4. He's applying AI to solve real business problems

---

## Content Structure (REVISED)

```
┌─────────────────────────────────────────────────────┐
│  SKY (Hero)                                         │
│  "Daniel Garcia"                                    │
│  Sales & Operations | AI-Enabled Problem Solver     │
│  Tagline: Invite to explore (NOT developer-speak)   │
│  Location: Cincinnati, OH                           │
└─────────────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────────────┐
│  FOREST (The Paths I've Taken)                      │
│  Theme: Varied experience, different paths          │
│  Journey: Govt affairs → Sales → Account Mgmt →     │
│           Sales Ops → AI enablement                 │
│  This is where automation/AI tools story lives      │
│  "Each path taught me something new"                │
└─────────────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────────────┐
│  COASTAL (Understanding People)                     │
│  Theme: "Business problems are people problems"     │
│  Psychology + business education                    │
│  How understanding people informs approach to       │
│  sales, operations, and solutions                   │
└─────────────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────────────┐
│  [NEW SECTION NEEDED] - Rocky or similar            │
│  Theme: "What I'm Building Now"                     │
│  Current projects, this site, tools for SMBs       │
│  Proof section - show don't tell                    │
│  (May need new background asset or repurpose)       │
└─────────────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────────────┐
│  CAVE (Where I'm Going)                             │
│  Theme: Applying expertise to create real tools     │
│  "Now I'm learning to build tools and workflows     │
│   that help me in personal life and for businesses" │
│  Contact CTA + path to recruiter section            │
└─────────────────────────────────────────────────────┘
          ↓ (easter egg / recruiter path)
┌─────────────────────────────────────────────────────┐
│  DATACENTER (For Recruiters)                        │
│  Casual "resume" - work history as stories          │
│  Indeed Flex, GigaCloud, FloraFlex, etc.            │
│  Skills without corporate speak                     │
│  "Looking for: Senior Strategy Manager, Sales Ops"  │
└─────────────────────────────────────────────────────┘
```

---

## What's Been Built (Visual Foundation)

**Working:**
- 4 zone scroll journey: Sky → Forest → Coastal → Cave
- Background images load correctly (v3 assets)
- Text has readable backdrops
- Mobile portrait view works
- Gradient transitions between sections
- Typography setup (Playfair Display + Source Serif 4)

**Components available but not wired up:**
- `Navigation.tsx` - Floating dock (macOS-style)
- `AltitudeMeter.tsx` - Scroll position indicator
- `FloatingDock.tsx` - Animated navigation
- `ScrollJail/` components - Easter egg mechanics (deferred)

**Assets ready:**
```
public/assets/
├── sky/sky-background-v3.png         ← Hero
├── forest/forest-background-v3.png   ← Paths/Journey
├── coastal/coastal-overlook-v3.png   ← People/Psychology
├── cave/cave-transition-v3.png       ← Where I'm Going
└── datacenter/datacenter-background-v4.png  ← Recruiter section
```

---

## What Needs To Change

### Content Updates (Priority)

1. **Sky (Hero)**: Update tagline - NOT "I build systems so I can go outside" - something inviting and non-developer
2. **Forest**: Change from "People First" to "The Paths I've Taken" - journey/experience focus
3. **Coastal**: Change from "Automation Obsession" to people/psychology theme
4. **Cave**: Update from "end of trail" to "where I'm going" / applying expertise
5. **Add section**: May need 5th zone between Coastal and Cave for "What I'm Building"

### Features to Add

1. Wire up `Navigation.tsx` floating dock
2. Add contact info (Email: Dnlg2400@gmail.com, GitHub: DanofGar, LinkedIn)
3. Create recruiter path to Datacenter section
4. Consider adding current projects/proof section

### Content to Write

Need casual, first-person copy for each section. Tone: warm, confident, not corporate.

---

## Contact Info (for site)

- **Email:** Dnlg2400@gmail.com
- **GitHub:** DanofGar
- **LinkedIn:** /in/danielgarcia (or similar)
- **Domain:** dgautomate.dev
- **Phone:** 831-261-7306 (optional for site)

---

## Work History (for Datacenter section)

**Indeed Flex** (Jul 2024 - Nov 2025) - Austin, TX
- Sales Operations Manager / BDR
- Built AI-powered research and prioritization systems
- Full-cycle sales for mid-market accounts ($100K-$300K ACV)

**GigaCloud Technology** (Apr 2023 - Dec 2023) - Chatsworth, CA
- Sr. Account Manager (Brand & Category Management, eCommerce)
- Managed Overstock, Lowe's, eBay accounts ($100M+ annual GMV)

**FloraFlex** (Dec 2021 - Nov 2022) - Chatsworth, CA
- Wholesale Account Manager
- $15M wholesale channel, international expansion (EU, Mexico)

**Earlier:** GAIACA (Sr. Account Executive), Greater Conejo Valley Chamber (Government Affairs & Tourism Manager)

**Education:** B.A. Psychology, CSU Channel Islands

---

## Tech Stack

- Next.js 14, React 18, Tailwind CSS, Framer Motion
- Deployed on Netlify (netlify.toml exists)
- No test framework (visual verification via dev server)

---

## Quick Start for Next Session

```bash
cd /Users/danielg/Projects/dgautomate-portfolio
npm run dev
# Open http://localhost:3000
```

**Key files to edit:**
- `src/components/zones/Sky.tsx` - Hero content
- `src/components/zones/Forest.tsx` - Paths/Journey content
- `src/components/zones/CoastalOverlook.tsx` - People content
- `src/components/zones/Cave.tsx` - Where I'm going content
- `src/app/page.tsx` - Page assembly, add Navigation

**Read first:**
- This file (HANDOFF.md)
- `specs/DESIGN_DECISIONS.md` - Locked design choices
