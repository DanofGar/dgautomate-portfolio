# Video Layer Strategy - dgautomate.dev

## Concept
Replace static backgrounds with Veo 3 generated looping videos while maintaining interactive overlays.

## Architecture
```
┌─────────────────────────────────────┐
│  Interactive Overlay (z-index: 20)  │  ← Skill cards, Easter eggs, forms
├─────────────────────────────────────┤
│  Gradient/Transition (z-index: 10)  │  ← Zone blending, text readability
├─────────────────────────────────────┤
│  Video Background (z-index: 0)      │  ← Veo 3 generated, looping
└─────────────────────────────────────┘
```

## Zones & Video Concepts

### 1. Sky Zone (+500 ft)
**Mood:** Warm California coastal morning, inviting
**Video concept:** Soft clouds drifting slowly, golden sun rays, birds in distance
**Loop:** 8 sec, seamless cloud drift
**Overlay:** "Daniel Garcia" title, altitude meter

### 2. Forest Zone (+200 ft)
**Mood:** Dappled light through redwoods, grounded
**Video concept:** Tall trees swaying gently, light filtering through canopy, maybe deer or bird
**Loop:** 8 sec, subtle movement
**Overlay:** Operations skill cards, proof points

### 3. Rocky Climb Zone (+50 ft)
**Mood:** Challenging but rewarding, determination
**Video concept:** Rugged Big Sur terrain, wind-swept grasses, dramatic clouds
**Loop:** 8 sec, wind movement
**Overlay:** Scale & Strategy cards

### 4. Coastal Overlook Zone (0 ft / Sea Level)
**Mood:** Achievement, perspective, possibility
**Video concept:** Pacific Ocean vista, waves crashing on rocks below, golden hour light
**Loop:** 8 sec, wave rhythm
**Overlay:** Systems & Automation cards, Indeed Flex proof point

### 5. Underground Roots (-20 ft)
**Mood:** Transition, organic mystery
**Video concept:** Slowly revealing root systems, earthworms moving, soil texture
**Loop:** 8 sec, subtle organic movement
**Overlay:** Transition text

### 6. Underground Burrows (-50 ft)
**Mood:** Discovery, curiosity, "something's here"
**Video concept:** Tunnel networks, occasional groundhog peek, dust particles in light shafts
**Loop:** 8 sec, anticipation building
**Overlay:** Groundhog button (triggers reveal)

### 7. Secret Data Center (-100 ft)
**Mood:** Whimsical tech hub, cozy bunker
**Video concept:** Groundhogs in lab coats walking around, typing, carrying coffee, checking servers
**Loop:** 8 sec, bustling activity
**Overlay:** Easter egg hotspots, contact form, karaoke terminal

## Technical Requirements

### Video Specs
- Resolution: 1920x1080 minimum (4K preferred for retina)
- Format: MP4 (H.264) or WebM
- Loop: Seamless (first frame matches last frame)
- Duration: 8 seconds per zone
- Aspect: 16:9 base, CSS object-fit for responsive

### Implementation
```tsx
// VideoBackground component
<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
  poster="/assets/zones/sky-poster.jpg"  // Fallback image
>
  <source src="/assets/videos/sky-loop.mp4" type="video/mp4" />
  <source src="/assets/videos/sky-loop.webm" type="video/webm" />
</video>
```

### Performance Considerations
- Lazy load videos as user scrolls near zone
- Use poster images for initial load
- Intersection Observer for play/pause
- Reduced motion: Show poster only
- Mobile: Consider lower resolution or static fallback

## Generation Order (Priority)
1. ✅ Data Center (most complex, prove the concept)
2. Sky (hero section, first impression)
3. Coastal Overlook (dramatic visual)
4. Forest
5. Rocky Climb
6. Underground Roots
7. Underground Burrows

## Veo 3 Prompt Template
```
[Scene description]. [Camera/movement]. [Lighting]. [Style notes].
Seamless loop, 8 seconds, cinematic quality, no text or UI elements.
```
