# ASSET_PROMPTS.md
# Imagen 3 Prompt Chain for Background Generation

**Tool:** Google AI Studio → Imagen 3  
**Workflow:** Generate sequentially. Upload each output as style reference for the next.

---

## Shared Suffix (append to EVERY prompt)

```
Photorealistic, cinematic 16:9 aspect ratio, 2560x1440,
golden hour lighting with sun at 15 degrees above horizon
on the left side, Big Sur California, warm color grading,
shot on 35mm film, slight atmospheric haze.
[Upload previous panel as style reference]
```

## Panel 1 — SKY (Hero) ← Generate FIRST, this is the style anchor

```
Aerial view from 2000 feet above Big Sur coastline. Dense cloud 
layer below with breaks revealing dark blue Pacific ocean and 
mountainous coastline. Sun setting on left horizon casting golden 
light across cloud tops. Bottom 20% of frame: clouds thin out, 
revealing the tops of coastal redwood trees emerging through mist. 
The transition from clouds to treetops should feel gradual and 
natural. [SHARED SUFFIX]
```

## Panel 2 — FOREST (upload Panel 1 as reference)

```
Standing inside a Big Sur old-growth redwood forest. Massive tree 
trunks frame left and right edges. Golden hour sunlight filters 
through the canopy above as visible god rays. Top 20% of frame 
shows canopy with golden-orange sky visible through gaps in the 
leaves — this must color-match a sunset cloud layer above. A 
dirt path leads into middle distance. Forest floor has ferns, 
moss-covered logs, dappled light pools. Bottom 20%: trees thin, 
ground becomes rockier, exposed red-brown soil and boulders 
emerge, hints of a clearing ahead. [SHARED SUFFIX]
```

## Panel 3 — ROCKY (upload Panel 2 as reference)

```
Big Sur rocky coastal terrain, eye-level, dramatic granite 
formations. Top 20% of frame: sparse windswept cypress trees and 
low scrub vegetation on red-brown earth, matching a forest edge. 
Center: massive weathered rock faces with visible geological 
layers, warm golden light raking across texture. Small hardy 
plants growing from crevices. Bottom 20%: rocks begin to meet 
dark teal-green ocean, white spray from waves hitting rock base, 
tidepools visible. The transition from land to water should be 
gradual with wet rock zones. [SHARED SUFFIX]
```

## Panel 4 — COASTAL (upload Panel 3 as reference)

```
Wide Big Sur coastal overlook, elevated perspective looking down 
a dramatic cliff face to the Pacific. Top 20%: rocky terrain with 
low ice plant and scrub matching the rocky section's bottom edge. 
Center: sweeping view of coastline, waves crashing against sea 
stacks, dramatic cliff geometry. Bottom 20%: the cliff face curves 
inward, creating a visible sea cave entrance or deep overhang — 
shadows deepen significantly, the cave mouth is dark and 
mysterious. This dark area is critical — it transitions into 
underground. [SHARED SUFFIX]
```

## Panel 5 — CAVE TRANSITION (upload Panel 4 as reference)

```
Interior of a large Big Sur sea cave, looking inward. Top 20%: 
natural rock ceiling with daylight filtering in from the cave 
mouth behind the viewer, warm golden light on wet rock. Center: 
the cave deepens, natural rock transitions subtly — some surfaces 
look almost like concrete, a metal pipe or conduit appears 
embedded in the rock wall (subtle, not obvious). Puddles on the 
ground reflect blue-tinted artificial light from deeper in. 
Bottom 20%: fully artificial — concrete floor, cable trays on 
ceiling, dim fluorescent strips and blue LED accent lighting. 
The transformation from cave to bunker should feel discovered, 
not designed. 

[SHARED SUFFIX but REPLACE "golden hour lighting" with 
"mixed natural and artificial lighting, warm daylight from 
above transitioning to cool blue-green artificial light below"]
```

## Panel 6 — DATACENTER (modify existing v3)

```
Keep the existing datacenter-background-v3.png composition.
Generate a variant where the TOP 20% shows a rough concrete 
ceiling with exposed rock and cave-like formations — stalactites 
or rough-hewn stone mixed with industrial cable trays and conduit. 
This must visually connect to the cave transition panel above.
The rest of the image maintains the same two-level server room 
with green monitors, blue server racks, and industrial lighting.
[Do NOT use shared suffix — match existing datacenter style]
```

---

## Character Re-prompts (for green screen extraction)

### Groundhog Scientist
```
3D Pixar-style groundhog character wearing a white lab coat and 
safety goggles pushed up on forehead, holding a clipboard and pen, 
full body visible including feet, front-facing, standing pose, 
SOLID BRIGHT GREEN (#00FF00) BACKGROUND, flat green with no gradient 
and no shadow on the ground plane, studio lighting from above, 
clean crisp edges on the character silhouette, high detail fur texture.
```

### Groundhog Security Guard
```
3D Pixar-style groundhog character wearing a security guard uniform 
with badge and ID lanyard, flashlight on belt, slightly skeptical 
expression, full body visible including feet and tail, 
three-quarter pose facing slightly left, 
SOLID BRIGHT GREEN (#00FF00) BACKGROUND, flat green with no gradient 
and no shadow on the ground plane, studio lighting from above, 
clean crisp edges on the character silhouette, high detail fur texture.
```

## Background Removal Pipeline

```bash
# Install rembg if not present
pip install rembg --break-system-packages

# Remove background
rembg i input.png output.png

# Convert to WebP with alpha
cwebp -q 90 -alpha_q 100 output.png -o output.webp

# Verify transparency (should show checkerboard in viewer)
# Then composite test against datacenter background
```
