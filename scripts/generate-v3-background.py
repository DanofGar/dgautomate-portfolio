#!/usr/bin/env python3
"""
Generate photorealistic backgrounds using Google Imagen 3.
Per specs/ASSET_PROMPTS.md - sequential generation with style reference chaining.
"""
import os
import sys
import base64
import json
from pathlib import Path
from datetime import datetime

# Try the google.genai package first
try:
    from google import genai
    from google.genai import types
    USE_GENAI = True
except ImportError:
    import google.generativeai as genai_old
    USE_GENAI = False

# Shared suffix from ASSET_PROMPTS.md
SHARED_SUFFIX = """Photorealistic, cinematic 16:9 aspect ratio, 2560x1440,
golden hour lighting with sun at 15 degrees above horizon
on the left side, Big Sur California, warm color grading,
shot on 35mm film, slight atmospheric haze."""

# Panel prompts from ASSET_PROMPTS.md
PANEL_PROMPTS = {
    "sky-hero": f"""Aerial view from 2000 feet above Big Sur coastline. Dense cloud
layer below with breaks revealing dark blue Pacific ocean and
mountainous coastline. Sun setting on left horizon casting golden
light across cloud tops. Bottom 20% of frame: clouds thin out,
revealing the tops of coastal redwood trees emerging through mist.
The transition from clouds to treetops should feel gradual and
natural. {SHARED_SUFFIX}""",

    "forest-bg": f"""Standing inside a Big Sur old-growth redwood forest. Massive tree
trunks frame left and right edges. Golden hour sunlight filters
through the canopy above as visible god rays. Top 20% of frame
shows canopy with golden-orange sky visible through gaps in the
leaves — this must color-match a sunset cloud layer above. A
dirt path leads into middle distance. Forest floor has ferns,
moss-covered logs, dappled light pools. Bottom 20%: trees thin,
ground becomes rockier, exposed red-brown soil and boulders
emerge, hints of a clearing ahead. {SHARED_SUFFIX}""",

    "rocky-bg": f"""Big Sur rocky coastal terrain, eye-level, dramatic granite
formations. Top 20% of frame: sparse windswept cypress trees and
low scrub vegetation on red-brown earth, matching a forest edge.
Center: massive weathered rock faces with visible geological
layers, warm golden light raking across texture. Small hardy
plants growing from crevices. Bottom 20%: rocks begin to meet
dark teal-green ocean, white spray from waves hitting rock base,
tidepools visible. The transition from land to water should be
gradual with wet rock zones. {SHARED_SUFFIX}""",

    "coastal-bg": f"""Wide Big Sur coastal overlook, elevated perspective looking down
a dramatic cliff face to the Pacific. Top 20%: rocky terrain with
low ice plant and scrub matching the rocky section's bottom edge.
Center: sweeping view of coastline, waves crashing against sea
stacks, dramatic cliff geometry. Bottom 20%: the cliff face curves
inward, creating a visible sea cave entrance or deep overhang —
shadows deepen significantly, the cave mouth is dark and
mysterious. This dark area is critical — it transitions into
underground. {SHARED_SUFFIX}""",

    "cave-transition": """Interior of a large Big Sur sea cave, looking inward. Top 20%:
natural rock ceiling with daylight filtering in from the cave
mouth behind the viewer, warm golden light on wet rock. Center:
the cave deepens, natural rock transitions subtly — some surfaces
look almost like concrete, a metal pipe or conduit appears
embedded in the rock wall (subtle, not obvious). Puddles on the
ground reflect blue-tinted artificial light from deeper in.
Bottom 20%: fully artificial — concrete floor, cable trays on
ceiling, dim fluorescent strips and blue LED accent lighting.
The transformation from cave to bunker should feel discovered,
not designed. Photorealistic, cinematic 16:9 aspect ratio, 2560x1440,
mixed natural and artificial lighting, warm daylight from above
transitioning to cool blue-green artificial light below,
Big Sur California, shot on 35mm film.""",
}

def generate_with_imagen(prompt: str, output_path: str, reference_image_path: str = None):
    """Generate image using Imagen 3 or Gemini image generation."""

    api_key = os.environ.get('GOOGLE_API_KEY')
    if not api_key:
        print("ERROR: GOOGLE_API_KEY not found")
        return False

    if USE_GENAI:
        client = genai.Client(api_key=api_key)

        # Build content parts
        parts = []

        # Add reference image if provided
        if reference_image_path and Path(reference_image_path).exists():
            print(f"Using style reference: {reference_image_path}")
            with open(reference_image_path, "rb") as f:
                image_data = f.read()
            parts.append(types.Part(
                inline_data=types.Blob(
                    mime_type="image/png",
                    data=image_data
                )
            ))
            prompt = f"Using this image as a style reference for color temperature, lighting, and atmosphere, generate a new image: {prompt}"

        parts.append(types.Part(text=prompt))

        try:
            # Try Gemini 2.0 image generation first
            print("Attempting generation with gemini-2.0-flash-exp-image-generation...")
            response = client.models.generate_content(
                model="gemini-2.0-flash-exp-image-generation",
                contents=[types.Content(role="user", parts=parts)],
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE", "TEXT"],
                )
            )

            # Extract image
            for part in response.candidates[0].content.parts:
                if hasattr(part, 'inline_data') and part.inline_data:
                    with open(output_path, "wb") as f:
                        f.write(part.inline_data.data)
                    print(f"SUCCESS: Saved to {output_path}")
                    return True

        except Exception as e:
            print(f"gemini-2.0 failed: {e}")

            # Try Imagen 3 directly
            try:
                print("Attempting generation with imagen-3.0-generate-002...")
                response = client.models.generate_images(
                    model="imagen-3.0-generate-002",
                    prompt=prompt,
                    config=types.GenerateImagesConfig(
                        number_of_images=1,
                        aspect_ratio="16:9",
                    )
                )

                if response.generated_images:
                    img = response.generated_images[0]
                    with open(output_path, "wb") as f:
                        f.write(img.image.image_bytes)
                    print(f"SUCCESS: Saved to {output_path}")
                    return True

            except Exception as e2:
                print(f"imagen-3.0 failed: {e2}")

    else:
        # Fallback to older API
        genai_old.configure(api_key=api_key)
        try:
            model = genai_old.GenerativeModel('gemini-pro-vision')
            response = model.generate_content(prompt)
            print(f"Response: {response.text[:200]}...")
        except Exception as e:
            print(f"ERROR: {e}")

    return False


def main():
    if len(sys.argv) < 2:
        print("Usage: python generate-v3-background.py <panel-name> [reference-image]")
        print(f"Panels: {', '.join(PANEL_PROMPTS.keys())}")
        sys.exit(1)

    panel = sys.argv[1]
    reference = sys.argv[2] if len(sys.argv) > 2 else None

    if panel not in PANEL_PROMPTS:
        print(f"ERROR: Unknown panel '{panel}'")
        print(f"Valid panels: {', '.join(PANEL_PROMPTS.keys())}")
        sys.exit(1)

    # Output paths
    project_root = Path(__file__).parent.parent
    assets_dir = project_root / "assets"
    raw_dir = assets_dir / "raw"
    raw_dir.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    output_path = raw_dir / f"{panel}-v1-{timestamp}.png"

    prompt = PANEL_PROMPTS[panel]
    print(f"\n=== Generating {panel} ===")
    print(f"Prompt preview: {prompt[:200]}...")

    success = generate_with_imagen(prompt, str(output_path), reference)

    if success:
        print(f"\n✓ Generation complete: {output_path}")

        # Create preview copy
        preview_dir = assets_dir / "preview"
        preview_dir.mkdir(parents=True, exist_ok=True)
        preview_path = preview_dir / f"{panel}-v1-preview.png"

        import shutil
        shutil.copy(output_path, preview_path)
        print(f"✓ Preview saved: {preview_path}")
    else:
        print("\n✗ Generation failed")
        sys.exit(1)


if __name__ == "__main__":
    main()
