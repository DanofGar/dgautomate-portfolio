# Data Center & Character Assets Design

*Created: February 4, 2026*

---

## Overview

Design specification for the revised secret data center scene and groundhog character roster for dgautomate.dev portfolio.

## Key Decisions

| Decision | Choice |
|----------|--------|
| Animation approach | CSS transforms (translateX + slight bob) |
| Animated characters | Coffee Runner, Security Guard (2 movers) |
| Data center layout | Two floors with mezzanine, spacious wide composition |
| Total characters | 9 (8 new/positioned + 1 existing scientist) |

---

## Data Center Scene Composition

### Layout
- Two floors with mezzanine catwalk, wide horizontal composition (16:9 aspect ratio)
- Camera angle: Slightly elevated perspective looking across both levels
- Depth: Server racks on upper level, workstations on main floor, open floor area for animated characters

### Key Areas (left to right)
1. **Entry/Security desk** - Security Guard patrol start
2. **Server rack corridor** - Server Technician, Network Engineer
3. **Central workstation cluster** - Data Analyst, Scientist
4. **Architecture corner** - Senior Architect at drafting desk
5. **Supply/break area** - Intern with boxes, Coffee Runner destination, Karaoke Singer

### Lighting
- Warm overhead lamp pools (cozy bunker feel)
- Cool blue glow from monitors and server rack LEDs
- Subtle green terminal glow accents

### Easter Eggs
- Pickleball paddle leaning against wall
- Lyrics terminal (animated scrolling karaoke text)
- Karaoke Singer groundhog performing next to terminal

---

## Character Roster (9 Total)

### Animated Movers (CSS transform paths)

| Character | Look | Animation |
|-----------|------|-----------|
| **Coffee Runner** | Apron, tray with 3-4 steaming cups, cheerful | Slides left-right across foreground, slight bob, 8-10s loop |
| **Security Guard** | Badge on lanyard, flashlight in belt, alert posture | Patrols opposite direction, slower 12s loop, pauses at edges |

### Stationary Characters

| Character | Look | Placement |
|-----------|------|-----------|
| **Scientist** | Lab coat, goggles, clipboard (EXISTING ASSET) | Central workstation |
| **Network Engineer** | Polo shirt, ethernet cables on shoulder, router in hand | Server rack area |
| **Server Technician** | Hard hat, tool belt, wrench | Crouched at open server panel |
| **Data Analyst** | Glasses, sweater vest, multiple monitors | Workstation, studying charts |
| **Senior Architect** | Gray-tinged fur, reading glasses, rolled blueprints | Drafting desk |
| **Intern** | Nervous expression, stack of boxes blocking face | Supply area |
| **Karaoke Singer** | Lab coat, headphones around neck, mouth open singing | Next to lyrics terminal |

---

## Animation Specifications

### Lyrics Terminal
- CSS `@keyframes` vertical translate (scrolling upward)
- Current line highlighted green, upcoming lines dimmer
- ~30 second continuous loop

### Karaoke Singer Idle
- Subtle head sway: CSS rotate -5° to +5°
- Optional slight bounce on beat
- Static "singing" mouth pose (no mouth animation needed)

### Coffee Runner Path
- Horizontal slide: 80% of scene width
- Vertical bob: translateY ±3px synced to walking
- 8-10 second loop, ease at edges before reversing

### Security Guard Path
- Opposite direction from Coffee Runner
- Slower pace: ~12 second loop
- Brief pause at each end (checking/surveying)

### Static Characters (Optional)
- Subtle "breathing": scale 1.0 to 1.02
- Keeps scene alive without distraction

---

## Asset Generation Plan

### Background Image
- **Tool:** Imagen 4.0 via GOOGLE_API_KEY
- **Dimensions:** 2048x1152 (16:9)
- **Content:** Single-floor data center, empty of characters
- **Include:** Server racks, workstations, warm lighting, monitor glow, Easter egg spots

### Character Images (8 to generate)

All characters must match `groundhog-scientist-v2.png` style:
- Realistic-ish 3D, Pixar environmental quality
- NOT kawaii (no smiley faces, minimal blush)
- Transparent backgrounds for compositing
- Consistent scale/proportions

| Character | Key Prompt Elements |
|-----------|-------------------|
| Coffee Runner | Apron, tray with steaming cups, cheerful, walking pose |
| Security Guard | Badge lanyard, flashlight on belt, alert stance |
| Network Engineer | Polo shirt, ethernet cables on shoulder, holding router |
| Server Technician | Hard hat, tool belt, wrench, crouching pose |
| Data Analyst | Glasses, sweater vest, thoughtful chin-in-hand pose |
| Senior Architect | Gray fur accents, reading glasses, holding blueprints |
| Intern | Nervous expression, arms full of boxes |
| Karaoke Singer | Lab coat, headphones around neck, singing pose |

---

## File Locations

| Asset | Path |
|-------|------|
| Data center background | `/public/assets/datacenter/datacenter-background-v3.png` |
| Characters | `/public/assets/characters/<name>.png` |
| Existing scientist | `/public/assets/characters/groundhog-scientist-v2.png` |

---

## Implementation Notes

- Characters layered on background via CSS positioning
- Animated characters use CSS transforms (no sprite sheets)
- Z-index ordering: background → stationary characters → animated movers
- Lyrics terminal is a styled `<div>` with CSS animation, not part of background image
