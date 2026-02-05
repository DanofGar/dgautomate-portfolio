# dgautomate.dev Portfolio

A cinematic, immersive portfolio site showcasing automation and systems thinking through Big Sur landscapes.

## Overview

**dgautomate.dev** tells the story of building systems that work while you sleep. Rather than a traditional portfolio, it's a narrative journey from sky to underground, with each section representing a different aspect of approach and philosophy.

The site uses photorealistic Big Sur backgrounds paired with interactive storytelling—scrolling becomes exploration, not just navigation.

## Journey Architecture

```
┌─────────────────────────────────┐
│  HERO: Sky Background           │
│  "Daniel G"                     │
│  "I build systems that work     │
│   while I sleep"                │
└─────────────────────────────────┘
           ↓ scroll
┌─────────────────────────────────┐
│  STORY SECTION (Sticky Scroll)  │
│  ┌─────────────┬───────────────┐│
│  │ "People     │ Forest        ││
│  │  First"     │ Background    ││
│  │ Glass Card  │ + Wildlife    ││
│  └─────────────┴───────────────┘│
│  ┌─────────────┬───────────────┐│
│  │ "Breaking   │ Rocky         ││
│  │  Things"    │ Background    ││
│  └─────────────┴───────────────┘│
│  ┌─────────────┬───────────────┐│
│  │ "Automation │ Coastal       ││
│  │  Obsession" │ Background    ││
│  └─────────────┴───────────────┘│
└─────────────────────────────────┘
           ↓ easter egg
┌─────────────────────────────────┐
│  DATACENTER: Secret Underground │
│  Terminal contact form          │
│  Animated groundhog characters  │
└─────────────────────────────────┘
```

## Key Features

**Immersive Visuals**
- Photorealistic Big Sur backgrounds for each section
- Smooth transitions and gradient overlays between zones
- Wildlife illustrations that blend naturally with scenes

**Interactive Storytelling**
- Altitude meter shows your descent from +500ft (sky) to -100ft (underground)
- Zone labels update as you scroll through different environments
- Parallax 3D effects on characters and wildlife

**Responsive Design**
- Landscape-optimized for cinematic 16:9 experience
- Portrait mode prompts users to rotate device
- Mobile-friendly fallbacks

**Easter Eggs**
- Hidden datacenter revealed through interaction
- Karaoke groundhog singing on terminal interaction
- Pickleball and hiking easter eggs

## Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Animation**: Framer Motion
- **UI Components**: Aceternity UI + Magic UI
- **Styling**: Tailwind CSS
- **Deployment**: Production-ready build pipeline

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Check for linting issues
npm run lint
```

Visit `http://localhost:3000` to see the site.

## Project Structure

```
src/
├── app/               # Next.js app directory
├── components/
│  ├── zones/          # Section components (Sky, StorySection, Datacenter)
│  ├── ui/             # Reusable UI components
│  └── effects/        # Visual effects and animations
├── lib/               # Utilities (scroll calculations, etc.)
└── styles/            # Global styles

public/assets/
├── sky/               # Hero section images & pelican
├── forest/            # Forest background & wildlife
├── rocky/             # Rocky background & wildlife
├── coastal/           # Coastal background & wildlife
├── datacenter/        # Underground datacenter visuals
└── characters/        # Groundhog characters
```

## Content

Each section combines an atmospheric background with a story about problem-solving:

1. **People First** - Sales background teaching empathy in systems design
2. **Breaking Things** - Learning through failure and deconstruction
3. **Automation Obsession** - Making computers do boring work so humans can do interesting work

## Performance

- Static generation where possible
- Image optimization with Next.js Image component
- Lazy loading for off-screen assets
- Production bundle: ~164 kB main page

## Accessibility

- Semantic HTML structure
- Color contrast ratios meet WCAG standards
- Responsive typography scaling
- Keyboard navigation support

## Next Steps

See [GitHub Issues](https://github.com/DanofGar/dgautomate-portfolio/issues) for upcoming features:
- Background removal from wildlife assets
- Distinct particle effects per section
- Interactive datacenter reveal mechanism
- Transition section between coastal and underground

---

Built with care. Deployed everywhere. A portfolio that feels like an experience.
