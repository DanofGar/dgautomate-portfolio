# HANDOFF — Portfolio Site for Daniel Garcia

**Last Updated:** 2026-02-05
**Branch:** `asset/v3-backgrounds`
**Status:** Visual foundation complete, content structure finalized, copy drafted

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

## Content Structure (FINALIZED 2026-02-05)

```
┌─────────────────────────────────────────────────────┐
│  SKY (Hero)                                         │
│  "Daniel Garcia"                                    │
│  "I used to close deals. Now I build the tools     │
│   that help others do the same."                    │
│  Location: Cincinnati, OH                           │
└─────────────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────────────┐
│  TRAIL (Career Journey) ← NEW SECTION               │
│  Asset needed: Mountain trail descending above      │
│  clouds (Big Sur style, matches existing assets)    │
│                                                     │
│  Content:                                           │
│  "Where I've been:"                                 │
│  Staffing & HR Tech · eCommerce & Logistics ·       │
│  Hydroponics · Government & Tourism                 │
│                                                     │
│  "At Indeed Flex, I helped build the intelligence   │
│  layer behind an AI sales agent — scoring logic,    │
│  data routing, multi-agent workflows. Tens of       │
│  millions in pipeline. Still running."              │
│                                                     │
│  "(This site? Same approach — just for fun.)"       │
└─────────────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────────────┐
│  FOREST (The Approach)                              │
│  Theme: Enterprise thinking, any size problem       │
│                                                     │
│  Content:                                           │
│  "Enterprise thinking. Any size problem."           │
│                                                     │
│  "Find the signal. Design the logic.                │
│   Automate the decision."                           │
└─────────────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────────────┐
│  COASTAL (Understanding People)                     │
│  Theme: People + business acumen                    │
│  Psychology background + business education         │
│  Content: TBD - something about understanding       │
│  people informing how you build solutions           │
└─────────────────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────────────────┐
│  CAVE (Thanks for the Journey)                      │
│  Theme: Closing, gratitude, contact                 │
│  Socials: LinkedIn, Email, GitHub                   │
│  Easter egg path → Datacenter                       │
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
├── trail/ (NEEDED)                   ← Career Journey (new section)
├── forest/forest-background-v3.png   ← The Approach
├── coastal/coastal-overlook-v3.png   ← People/Psychology
├── cave/cave-transition-v3.png       ← Thanks/Closing
└── datacenter/datacenter-background-v4.png  ← Recruiter section
```

**Trail asset prompt (for Imagen 4.0):**
```
Mountain trail descending along a grassy hillside above a sea of clouds.
Dirt path winding down from upper right to lower left of frame. No people.
Clear blue sky with wispy clouds at top. Golden-brown grass and low scrub
vegetation on rolling hills, worn dirt trail clearly visible. Left side:
dramatic sea of clouds filling valley below, sunlight reflecting off cloud
tops. Trail continues downward at bottom, sparse coastal trees beginning
to appear. Photorealistic, cinematic, golden hour lighting, Big Sur
California coastal mountains, warm color grading, 35mm film look,
slight atmospheric haze.
```
Aspect ratio: 16:9. Requires Imagen billing (Tier 2+).

---

## What Needs To Change

### Assets Needed

1. **Trail background** - Generate using prompt above (requires Imagen billing)

### Code Changes Needed

1. **Add Trail section** - New component between Sky and Forest
2. **Update Sky.tsx** - New headline copy
3. **Update Forest.tsx** - Change to "The Approach" content
4. **Update Coastal.tsx** - Finalize people/psychology content
5. **Update Cave.tsx** - Thanks + socials
6. Wire up `Navigation.tsx` floating dock
7. Create recruiter easter egg path to Datacenter

### Content Status

| Section | Copy Status |
|---------|-------------|
| Sky | ✅ Finalized |
| Trail | ✅ Finalized |
| Forest | ✅ Finalized |
| Coastal | ⏳ TBD - people/psychology theme |
| Cave | ⏳ TBD - thanks + socials |
| Datacenter | ⏳ Existing content needs review |

**Tone:** Warm, confident, conversational. NOT corporate or developer-speak.

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
- `src/components/zones/Trail.tsx` - NEW: Career journey (create this)
- `src/components/zones/Forest.tsx` - The Approach content
- `src/components/zones/CoastalOverlook.tsx` - People content
- `src/components/zones/Cave.tsx` - Thanks + socials
- `src/app/page.tsx` - Page assembly, add Trail + Navigation

**Read first:**
- This file (HANDOFF.md)
- `specs/DESIGN_DECISIONS.md` - Locked design choices
