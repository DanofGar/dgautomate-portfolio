#!/usr/bin/env python3
"""
Generate Pixar-style zone backgrounds using Google AI.
Uses existing background as style reference.
"""
import os
import sys
import base64
from pathlib import Path
from datetime import datetime

# Use the newer google.genai package
from google import genai
from google.genai import types

def encode_image_to_base64(image_path: str) -> str:
    """Read image and encode to base64."""
    with open(image_path, "rb") as f:
        return base64.standard_b64encode(f.read()).decode("utf-8")

def generate_background(zone: str, reference_image_path: str, output_dir: str):
    """Generate a Pixar-style background for a zone."""

    # Zone-specific prompts
    zone_prompts = {
        "sky": """
            A warm California coastal morning sky scene. Soft cumulus clouds drift gently
            across a brilliant blue sky. Golden sunlight creates god rays breaking through
            the clouds. A California Condor soars majestically in the distance.

            STYLE: Pixar/Disney animation quality. Warm, inviting, slightly stylized -
            NOT photorealistic. Soft painterly look with rich colors like a Pixar movie
            background. Think "Up" or "Ratatouille" sky scenes. Creamy whites, soft blues,
            hints of gold. Wide panoramic composition suitable for a website hero section.
        """,
        "forest": """
            Interior of a coastal California redwood forest. Towering ancient redwood
            trunks with rich reddish-brown bark frame the scene. Dappled sunlight filters
            through the dense canopy, creating golden light beams. A winding forest path
            leads through ferns and redwood sorrel on the forest floor.

            STYLE: Pixar/Disney animation quality. Warm, inviting, slightly stylized -
            NOT photorealistic. Soft painterly aesthetic with rich earth tones like scenes
            from "Brave" or "Brother Bear". Sage greens, amber browns, golden light.
            Wide composition suitable for a website section background.
        """,
        "rocky": """
            Rugged Big Sur coastal terrain. Dramatic rocky outcrops of weathered granite
            and terracotta-colored earth. Wind-swept Monterey cypress trees cling to the
            cliffside. Coastal sagebrush and dudleya succulents dot the landscape.
            Dramatic clouds move across a blue sky with distant ocean visible.

            STYLE: Pixar/Disney animation quality. Warm, inviting, slightly stylized -
            NOT photorealistic. Painterly aesthetic with textural rock details like scenes
            from "The Good Dinosaur". Tans, terracottas, sage greens, weathered grays.
            Wide composition suitable for a website section background.
        """,
        "coastal": """
            Breathtaking view from a Big Sur cliff overlooking the Pacific Ocean.
            Dramatic cliffs drop to a sandy beach where waves crash rhythmically.
            Ice plant and coastal buckwheat frame the foreground. Golden hour sunlight
            reflects off the water. Distant fog bank on the horizon.

            STYLE: Pixar/Disney animation quality. Warm, inviting, slightly stylized -
            NOT photorealistic. Painterly ocean with expressive waves like "Finding Nemo"
            backgrounds. Deep ocean blues, golden light, misty grays, green succulents.
            Wide panoramic composition suitable for a website section background.
        """,
        "burrows": """
            Cross-section view of underground burrows dug by groundhogs. Earthy tunnel
            walls with visible root systems from trees above. Dim shafts of light filter
            down from the surface. The tunnels feel cozy and inviting, like a hobbit hole.
            Rich soil textures with small pebbles and organic matter.

            STYLE: Pixar/Disney animation quality. Warm, inviting, slightly stylized -
            NOT photorealistic. Cozy underground feel like "Zootopia" or "Fantastic Mr. Fox"
            burrow scenes. Rich browns, deep amber, warm earth tones with hints of light.
            Wide composition suitable for a website transition section.
        """
    }

    if zone not in zone_prompts:
        print(f"ERROR: Unknown zone '{zone}'. Valid zones: {list(zone_prompts.keys())}")
        return None

    # Initialize the client
    api_key = os.environ.get('GOOGLE_API_KEY')
    if not api_key:
        print("ERROR: GOOGLE_API_KEY not found in environment")
        return None

    client = genai.Client(api_key=api_key)

    # Load reference image
    print(f"Loading reference image: {reference_image_path}")
    reference_data = encode_image_to_base64(reference_image_path)

    prompt = zone_prompts[zone].strip()

    print(f"\n=== Generating {zone.upper()} background ===")
    print(f"Prompt: {prompt[:200]}...")

    try:
        # Use Gemini with image generation
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp-image-generation",
            contents=[
                types.Content(
                    role="user",
                    parts=[
                        types.Part(
                            inline_data=types.Blob(
                                mime_type="image/png",
                                data=base64.standard_b64decode(reference_data)
                            )
                        ),
                        types.Part(
                            text=f"""Using this image as a reference for the composition and scene layout,
                            create a new image in Pixar animation style:

                            {prompt}

                            IMPORTANT: Transform this photorealistic scene into Pixar-style animation art.
                            Keep the same general composition but make it look like a frame from a
                            Pixar animated film - stylized, warm, inviting, with painterly textures."""
                        )
                    ]
                )
            ],
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
            )
        )

        # Extract image from response
        for part in response.candidates[0].content.parts:
            if hasattr(part, 'inline_data') and part.inline_data:
                # Save the generated image
                timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
                output_filename = f"{zone}-background-pixar-{timestamp}.png"
                output_path = Path(output_dir) / output_filename

                with open(output_path, "wb") as f:
                    f.write(part.inline_data.data)

                print(f"SUCCESS: Generated image saved to {output_path}")
                return str(output_path)
            elif hasattr(part, 'text') and part.text:
                print(f"Response text: {part.text}")

        print("WARNING: No image found in response")
        return None

    except Exception as e:
        print(f"ERROR generating image: {e}")
        import traceback
        traceback.print_exc()
        return None

def main():
    if len(sys.argv) < 2:
        print("Usage: python generate-zone-background.py <zone>")
        print("Zones: sky, forest, rocky, coastal, burrows")
        sys.exit(1)

    zone = sys.argv[1].lower()

    # Paths
    project_root = Path(__file__).parent.parent
    assets_dir = project_root / "public" / "assets"

    # Map zone to reference image
    reference_images = {
        "sky": assets_dir / "sky" / "sky-background-v2.png",
        "forest": assets_dir / "forest" / "forest-background-v2.png",
        "rocky": assets_dir / "rocky" / "rocky-climb-v2.png",
        "coastal": assets_dir / "coastal" / "coastal-overlook-v2.png",
        "burrows": assets_dir / "burrows" / "underground-transition-v2.png",
    }

    if zone not in reference_images:
        print(f"ERROR: Unknown zone. Valid options: {list(reference_images.keys())}")
        sys.exit(1)

    ref_path = reference_images[zone]
    if not ref_path.exists():
        print(f"ERROR: Reference image not found: {ref_path}")
        sys.exit(1)

    output_dir = assets_dir / zone
    output_dir.mkdir(parents=True, exist_ok=True)

    result = generate_background(zone, str(ref_path), str(output_dir))

    if result:
        print(f"\n✓ Generation complete: {result}")
    else:
        print("\n✗ Generation failed")
        sys.exit(1)

if __name__ == "__main__":
    main()
