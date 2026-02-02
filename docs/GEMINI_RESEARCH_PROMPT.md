# Component Library Research Prompt for Google Gemini

*Copy this entire prompt and paste it into Google Gemini Deep Research*

---

# Research Request: Component Library Recommendations for dgautomate.dev Portfolio

I need your help researching and recommending the best component libraries and UI frameworks for my personal portfolio website. This is a comprehensive design research task that requires understanding my background, the project's unique theme, technical requirements, and current gaps.

## 1. About Me (Portfolio Owner)

**Name:** Daniel Garcia
**Location:** Cincinnati, OH (roots in Big Sur, CA)
**Professional Background:**
- Operations and sales professional with domain expertise in GTM, marketplaces, and selling
- Now channeling business understanding into automation
- Technical enough to build, experienced enough to know what actually needs building

**Experience Highlights:**
- **FloraFlex:** Payment processing, client relationships, logistics, inventory
- **GigaCloud:** Large accounts ($100M+ GMV), P&L ownership, navigating chaos
- **Indeed Flex:** Connecting tools, AI-powered workflows, building repeatable systems

**Hobbies (for Easter egg integration):**
- Pickleball
- Singing
- Hiking (especially Garrapata Trail in Big Sur)

**Brand Positioning:**
- Clients who appreciate creativity and curiosity
- The hidden contact form filters for engaged visitors
- Design demonstrates personality without saying "I'm creative"

---

## 2. Project Theme & Visual Identity

**Core Theme:** Big Sur / Garrapata Trail - Three ecosystems, one journey

**Aesthetic:** Warm California coastal vibes
- NOT tropical vacation
- NOT corporate portfolio
- Earthy, grounded, with a playful secret underground

**Color Philosophy:**

| Zone | Colors | Inspiration |
|------|--------|-------------|
| **Sky** | Warm soft blues, creamy whites, hint of golden sun | Coastal California morning, soft clouds |
| **Ground** | Tans, terracottas, sage greens, weathered grays | Big Sur terrain - sandy, earthy, coastal rocks |
| **Underground (roots)** | Rich browns, deep amber, dark soil tones | Redwood root systems, organic earth |
| **Underground (data center)** | Cool blues, terminal greens, warm lamp lighting | Cozy tech bunker, contrast to natural above |

**Typography Direction:**
- Primary: Rounded, friendly sans-serif (approachable, matches "cute rounder features")
- Accents: Possibly hand-drawn or organic display font for section markers

**Visual Style Keywords:**
- Soft, layered shadows (Josh Comeau style)
- HSL-interpolated gradients (no muddy midpoints)
- Rounded corners and soft edges throughout
- Subtle parallax as you scroll through zones
- "Cute rounder features" - soft, friendly, detailed but not corporate

---

## 3. Site Structure (The Journey)

**Scroll-based narrative from +500ft (sky) to -100ft (secret underground data center):**

```
+500 ft  → SKY ZONE
          • Daniel Garcia name
          • Altitude meter
          • Warm clouds, soft animation
          • Minimal - invites scrolling

+200 ft  → FOREST ZONE
          • Operations skill domain
          • Payment processing, client relationships
          • FloraFlex proof point

+50 ft   → ROCKY CLIMB ZONE
          • Scale & Strategy skill domain
          • Large accounts, P&L ownership
          • GigaCloud proof point

0 ft     → COASTAL OVERLOOK
          • Systems & Automation skill domain
          • AI-powered workflows
          • Indeed Flex proof point
          • Pacific visible in distance

-20 ft   → UNDERGROUND ROOTS
          • Natural root system
          • Organic, tangled, earthy
          • Transition to tunnels

-50 ft   → UNDERGROUND BURROWS
          • Deliberate tunnels
          • Signs of activity
          • Groundhog peeks out at bottom

-100 ft  → SECRET DATA CENTER
          • Groundhogs in lab coats (illustrated)
          • Terminals, servers, machinery
          • Dam construction plans visible
          • Hidden hobby Easter eggs (pickleball paddle, lyrics on terminal)
          • Casual contact form
```

---

## 4. Current Technical Stack

**Framework:** Next.js 14 (App Router)
**Styling:** Tailwind CSS 3.4
**Animations:** Framer Motion 12.29
**Language:** TypeScript 5
**Utilities:** clsx, tailwind-merge
**Hosting:** Netlify

**Current State:**
- ✅ Functional scroll journey working
- ✅ Basic animations implemented
- ✅ Forms, deployment, DNS all working
- ❌ Visual design richness missing
- ❌ Detailed scenery and depth lacking

---

## 5. Design Gaps (What Needs Improvement)

### Visual Richness Gaps:

**Sky Zone:**
- Currently: Basic gradient with simple cloud shapes
- Needed: Detailed, illustrated clouds with personality, soft drift animation, warm golden sun with glow, atmospheric depth

**Forest Zone:**
- Currently: Abstract tree silhouettes
- Needed: Detailed tree illustrations (Big Sur coastal style), forest depth with layered vegetation, organic hand-drawn quality

**Rocky Climb Zone:**
- Currently: Abstract rock formations
- Needed: Detailed rock textures, Big Sur coastal rock aesthetic (weathered, terracotta, gray), dramatic terrain features

**Coastal Overlook:**
- Currently: Basic ocean representation
- Needed: Realistic ocean horizon with depth, coastal vegetation, atmospheric perspective

**Underground Roots:**
- Currently: Abstract root shapes
- Needed: Detailed organic root illustrations, redwood root system inspiration, rich soil textures

**Secret Data Center:**
- Currently: Easter egg buttons, basic scene
- Needed:
  - **Illustrated groundhog characters in lab coats** actively working
  - **Detailed server racks** that look like actual equipment
  - **Visible dam construction blueprints** on walls/tables
  - **Terminal screens** with actual terminal-style content
  - **Scene depth** - layered environment feeling like real underground facility
  - **Warm lamp lighting** creating cozy tech bunker atmosphere

### Interaction Polish Gaps:

**Groundhog Interaction:**
- Current: Basic implementation
- Needed: Smooth hover states (0-2s: gets curious, 2s+: full beckon), dramatic peel animation

**Easter Eggs:**
- Current: Clickable emoji buttons
- Needed: Integrated scene elements (paddle leaning against wall, terminal screen you click, hiking boot in scene naturally)

**Micro-interactions:**
- Current: Basic spring physics
- Needed: Josh Comeau-style layered shadows that respond to hover, depth perception, smooth delightful feeling

---

## 6. Technical Requirements & Constraints

### Must Support:

**Animation Capabilities:**
- Scroll-triggered animations (useScroll from Framer Motion)
- SVG path drawing animations
- Parallax effects (multiple layers moving at different speeds)
- Hover states with spring physics
- Stagger animations (for text effects)

**Component Patterns Needed:**
- Scroll-based line drawing (like "Gemini" effect)
- Text typewriter/reveal effects
- 3D parallax card grids
- Mouse-tracking effects (flashlight reveal, etc.)
- Layered depth effects

**Technical Architecture:**
- Copy-paste component model (like Shadcn/Aceternity)
- Uses `cn()` utility for class merging
- Tailwind CSS based with custom config extensions
- Framer Motion for all animations
- @tabler/icons-react for iconography

**Performance Requirements:**
- Lighthouse score 90+
- Smooth 60fps scroll animations
- Mobile responsive
- No layout thrashing on mouse interactions

---

## 7. Your Research Task

**Primary Question:** What component libraries, UI frameworks, and design systems best fit this portfolio's unique needs?

### Please Research and Compare:

1. **Aceternity UI**
   - Evaluate: How well do their scroll effects, parallax components, and animations match our Big Sur aesthetic?
   - Specific components: Gemini scroll effect, Hero Parallax, MacBook Scroll, Text Generate Effect
   - Pros/cons for our coastal, organic theme vs. their typical tech/SaaS aesthetic
   - Customization difficulty for nature-themed visuals

2. **Magic UI**
   - Compare animation quality vs. Aceternity
   - Component variety for our scroll journey
   - Ease of theme customization

3. **Shadcn UI + Extensions**
   - Base component quality
   - Community extensions that might help
   - Animation capabilities when paired with Framer Motion

4. **Framer Motion Community Components**
   - Pre-built scroll effects
   - Nature/organic themed components
   - Performance benchmarks

5. **Other Alternatives**
   - Any other libraries that specialize in:
     - Scroll-based storytelling
     - Nature/organic aesthetics
     - High-quality parallax effects
     - Illustrated component systems

### Specific Questions to Answer:

**For Component Libraries:**
1. Which library best supports scroll-based narrative storytelling?
2. Which has the most customizable animation system for our organic theme?
3. Which offers the best "illustrated" or "artistic" component variants vs. typical tech aesthetics?
4. Which is most performant for our mobile-responsive needs?
5. Which has the best TypeScript support and documentation?

**For Visual Style:**
1. Are there React component libraries specifically designed for nature/organic themes?
2. Any libraries that specialize in "cute rounder features" or Josh Comeau-style design?
3. Best SVG animation libraries compatible with our stack?
4. Illustration systems that work well with React/Tailwind?

**For Specific Needs:**
1. Best approach for the "groundhog reveal" interaction (peel animation)?
2. Recommended libraries for layered parallax cloud animations?
3. Best practice for integrated Easter eggs (clickable scene elements)?
4. Terminal-style component libraries for the data center scene?

---

## 8. Deliverable Format

Please provide:

### Part 1: Library Comparison Matrix
Create a comparison table with:
- Library name
- Best use case in our project
- Pros for dgautomate.dev theme
- Cons for dgautomate.dev theme
- Customization difficulty (1-5)
- Performance rating (1-5)
- Theme fit (1-5)

### Part 2: Specific Component Recommendations
For each major zone (Sky, Forest, Rocky, Coastal, Underground, Data Center):
- Recommended component library/approach
- Specific components to use
- Customization strategy to fit Big Sur theme
- Code examples or references if available

### Part 3: Final Recommendation
Your #1 recommended approach:
- Primary library choice
- Secondary/complementary libraries
- Custom build requirements
- Implementation priority order
- Estimated complexity (beginner/intermediate/advanced)

### Part 4: Alternative Approaches
If Aceternity UI isn't the best fit, suggest:
- Alternative component strategy
- Mix-and-match approach
- Custom build recommendations

---

## 9. Success Criteria

The ideal recommendation will:
- ✅ Support scroll-based storytelling with smooth animations
- ✅ Allow deep customization to match Big Sur coastal aesthetic
- ✅ Provide "cute rounder features" vs. sharp corporate look
- ✅ Enable integrated Easter eggs as scene elements
- ✅ Support layered depth and parallax effects
- ✅ Maintain 90+ Lighthouse score
- ✅ Work seamlessly with our existing Next.js/Tailwind/Framer Motion stack
- ✅ Have good TypeScript support
- ✅ Be maintainable long-term

---

## 10. Additional Context

**Design Philosophy:**
- Personality through craft, not through stating "I'm creative"
- Hidden contact form filters for engaged visitors (reward exploration)
- Business professional who codes, not developer who does business
- Big Sur trail guide meets tech groundhog operation

**Tone:**
- Conversational, warm, human
- Professional through craft, not stiffness
- Playful secret underground (but not childish)
- Earthy and grounded with tech elements

---

**Please provide comprehensive research with specific recommendations. I'm looking for the best path forward to transform the current functional prototype into a visually rich, professionally crafted portfolio that tells my story through the Big Sur journey.**

Thank you for your thorough research!
