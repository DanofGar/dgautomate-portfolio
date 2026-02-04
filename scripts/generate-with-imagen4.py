#!/usr/bin/env python3
"""
Generate Pixar-style zone backgrounds using Imagen 4.
Higher quality than Gemini flash.
"""
import os
import sys
import base64
from pathlib import Path
from datetime import datetime

from google import genai
from google.genai import types

def generate_with_imagen4(zone: str, reference_image_path: str, output_dir: str):
    """Generate a high-quality Pixar-style background using Imagen 4."""

    # Zone-specific detailed prompts
    zone_prompts = {
        "sky": """
            Breathtaking California coastal sky at golden hour. Dramatic layered cumulus clouds
            painted in warm cream, gold, and soft coral tones. Brilliant god rays pierce through
            cloud breaks, casting volumetric light across the scene. A majestic California Condor
            with detailed feathers soars against the illuminated clouds. Distant rolling green hills
            fade into atmospheric perspective below.

            Art direction: High-quality 3D animated film style like Pixar's "Up" or DreamWorks'
            "How to Train Your Dragon". Rich color saturation, sophisticated lighting, detailed
            cloud textures with soft painterly edges. Cinematic wide composition. NOT flat or
            cartoonish - premium animated film quality with depth and atmosphere.
            Resolution: Ultra high detail, 4K quality rendering.
        """,
        "forest": """
            Majestic coastal California redwood forest interior. Ancient towering redwood trunks
            with richly textured reddish-brown bark frame the scene, stretching upward beyond view.
            Volumetric golden sunbeams filter through the dense canopy, creating dramatic pools of
            light on the forest floor. Lush ferns, redwood sorrel with clover-like leaves, and
            moss-covered fallen logs carpet the ground. A winding earthen path leads deeper into
            the forest. Atmospheric haze adds depth and mystery.

            Art direction: High-quality 3D animated film style like Pixar's "Brave" or DreamWorks'
            "Shrek" forest scenes. Rich saturated earth tones - sage greens, amber browns, warm
            golden light. Detailed bark textures, delicate fern fronds, volumetric lighting.
            NOT flat illustration - premium animated film quality with atmospheric depth.
            Resolution: Ultra high detail, 4K quality rendering.
        """,
        "rocky": """
            Dramatic Big Sur coastal terrain at golden hour. Weathered granite outcrops with
            detailed surface textures - cracks, lichen patches, warm terracotta undertones.
            Iconic wind-sculpted Monterey cypress trees cling to cliffsides, their gnarled branches
            shaped by ocean winds. Native dudleya succulents with rosette formations and coastal
            sagebrush dot the rocky landscape. Dramatic cloud formations sweep across a deep blue
            sky. Distant Pacific Ocean visible through rock formations.

            Art direction: High-quality 3D animated film style like Pixar's "The Good Dinosaur"
            landscapes. Rich textural detail on rocks, sophisticated color palette - warm tans,
            terracotta, sage green, weathered gray granite. Dramatic lighting with long shadows.
            NOT cartoonish - premium animated film quality with photographic depth and detail.
            Resolution: Ultra high detail, 4K quality rendering.
        """,
        "coastal": """
            Sweeping Big Sur coastal vista from a dramatic clifftop overlook. Rugged cliffs
            plunge down to a pristine sandy cove where turquoise waves crash in rhythmic foam
            patterns. Native ice plant with magenta flowers and coastal buckwheat blanket the
            foreground cliff edge. Golden hour sunlight reflects off the Pacific Ocean surface,
            creating sparkling highlights. Distant fog bank hovers on the horizon, softening
            the ocean edge. Sea stacks and rocky outcrops dot the coastline.

            Art direction: High-quality 3D animated film style like Pixar's "Finding Nemo"
            surface scenes or "Luca" coastlines. Rich ocean blues with sophisticated water
            rendering, warm golden light, detailed vegetation textures. Atmospheric perspective
            with layered depth. NOT flat - premium animated film quality cinematography.
            Resolution: Ultra high detail, 4K quality rendering.
        """,
        "burrows": """
            Warm underground burrow network cross-section view. Cozy earthen tunnels with
            carefully carved walls showing layers of rich dark soil, small embedded pebbles,
            and intricate root systems from trees above. Soft shafts of warm daylight filter
            down through ceiling openings, illuminating dust motes in the air. Small alcoves
            suggest living spaces. The tunnels feel homey and inviting like a hobbit's dwelling.
            Organic textures throughout - packed earth walls, smooth floor paths.

            Art direction: High-quality 3D animated film style like "Fantastic Mr. Fox" or
            "Zootopia" underground scenes. Warm inviting atmosphere despite being underground.
            Rich color palette - deep amber, chocolate brown, cream highlights, warm light pools.
            Detailed soil and root textures. Cozy not claustrophobic. Premium film quality depth.
            Resolution: Ultra high detail, 4K quality rendering.
        """
    }

    if zone not in zone_prompts:
        print(f"ERROR: Unknown zone '{zone}'. Valid zones: {list(zone_prompts.keys())}")
        return None

    api_key = os.environ.get('GOOGLE_API_KEY')
    if not api_key:
        print("ERROR: GOOGLE_API_KEY not found in environment")
        return None

    client = genai.Client(api_key=api_key)

    prompt = zone_prompts[zone].strip()

    print(f"\n=== Generating {zone.upper()} with Imagen 4 ===")
    print(f"Prompt preview: {prompt[:300]}...")

    try:
        # Use Imagen 4 for high quality
        response = client.models.generate_images(
            model="imagen-4.0-generate-001",  # or imagen-4.0-ultra-generate-001 for higher quality
            prompt=prompt,
            config=types.GenerateImagesConfig(
                number_of_images=1,
                aspect_ratio="16:9",  # Wide format for website backgrounds
                safety_filter_level="block_low_and_above",
                person_generation="dont_allow",
            )
        )

        if response.generated_images:
            timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
            output_filename = f"{zone}-background-pixar-v3-{timestamp}.png"
            output_path = Path(output_dir) / output_filename

            # Save the image
            image_data = response.generated_images[0].image.image_bytes
            with open(output_path, "wb") as f:
                f.write(image_data)

            print(f"SUCCESS: Generated image saved to {output_path}")
            return str(output_path)
        else:
            print("WARNING: No images generated")
            if hasattr(response, 'filtered_text'):
                print(f"Filtered: {response.filtered_text}")
            return None

    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()
        return None

def main():
    if len(sys.argv) < 2:
        print("Usage: python generate-with-imagen4.py <zone>")
        print("Zones: sky, forest, rocky, coastal, burrows")
        print("\nThis uses Imagen 4 for higher quality output.")
        sys.exit(1)

    zone = sys.argv[1].lower()

    project_root = Path(__file__).parent.parent
    assets_dir = project_root / "public" / "assets"

    valid_zones = ["sky", "forest", "rocky", "coastal", "burrows"]
    if zone not in valid_zones:
        print(f"ERROR: Unknown zone. Valid options: {valid_zones}")
        sys.exit(1)

    output_dir = assets_dir / zone
    output_dir.mkdir(parents=True, exist_ok=True)

    # Reference paths (for potential future use with image-to-image)
    reference_images = {
        "sky": assets_dir / "sky" / "sky-background-v2.png",
        "forest": assets_dir / "forest" / "forest-background-v2.png",
        "rocky": assets_dir / "rocky" / "rocky-climb-v2.png",
        "coastal": assets_dir / "coastal" / "coastal-overlook-v2.png",
        "burrows": assets_dir / "burrows" / "underground-transition-v2.png",
    }

    result = generate_with_imagen4(zone, str(reference_images[zone]), str(output_dir))

    if result:
        print(f"\n✓ Generation complete: {result}")
    else:
        print("\n✗ Generation failed")
        sys.exit(1)

if __name__ == "__main__":
    main()
