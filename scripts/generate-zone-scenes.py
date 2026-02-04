#!/usr/bin/env python3
"""
Generate complete zone scenes with integrated wildlife using Imagen 4 Ultra.
Each scene is a full backdrop with critters already placed in the composition.

ALWAYS uses: imagen-4.0-ultra-generate-001 (highest quality as of Feb 2026)
"""
import os
import sys
from pathlib import Path
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

from google import genai
from google.genai import types

# ============================================================================
# MODEL CONFIGURATION - ALWAYS USE LATEST/BEST
# ============================================================================
IMAGEN_MODEL = "imagen-4.0-ultra-generate-001"
# ============================================================================

ZONE_SCENES = {
    "sky": {
        "output_name": "sky-scene-pixar",
        "prompt": """
            A breathtaking California coastal morning sky, wide panoramic view.

            SCENE COMPOSITION:
            - Warm golden hour sky with soft cumulus clouds in cream, gold, and soft coral tones
            - God rays pierce through cloud breaks, volumetric lighting
            - Small flock of brown pelicans gliding in loose V-formation in the mid-distance
            - A few seagulls scattered further away
            - Distant green coastal hills visible at bottom edge, fading into atmospheric haze
            - LEFT AND CENTER areas kept relatively clear (space for website text overlay)
            - Birds positioned toward right side of frame

            STYLE: Premium Pixar/Disney 3D animation quality, like skies from "Up" or
            "How to Train Your Dragon". Warm, inviting, stylized but not flat. Rich saturated
            colors, painterly cloud textures with soft edges. Cinematic wide 16:9 composition.
            NOT photorealistic - clearly animated film quality.

            COLORS: Creamy whites, soft sky blues, warm gold sunlight, hint of coral/peach
            in clouds. Green hills below.
        """
    },
    "forest": {
        "output_name": "forest-scene-pixar",
        "prompt": """
            Interior of a majestic California coastal redwood forest, eye-level perspective.

            SCENE COMPOSITION:
            - Ancient towering redwood trunks with rich reddish-brown textured bark frame
              the scene on both sides
            - Dappled golden sunlight filters through canopy, creating volumetric light beams
            - Lush forest floor with ferns, redwood sorrel (clover-like), moss on fallen logs
            - A bright yellow BANANA SLUG (Pixar-cute, glistening) crawls on a mossy log
              in the lower left foreground
            - A vibrant STELLER'S JAY (deep blue with black crest) perched on a branch
              in the upper right, looking alert
            - Earthen path winds into misty forest distance
            - UPPER AND RIGHT areas have space for text overlays
            - Atmospheric haze adds depth

            STYLE: Premium Pixar/Disney 3D animation quality, like "Brave" forest scenes or
            "Brother Bear". The banana slug and jay are cute, characterful - big eyes,
            appealing designs. Warm earth tones, rich greens, golden light pools.
            NOT photorealistic - clearly animated film aesthetic.

            COLORS: Sage greens, amber browns, reddish-brown bark, golden light beams,
            bright yellow slug, deep blue jay.
        """
    },
    "rocky": {
        "output_name": "rocky-scene-pixar",
        "prompt": """
            Dramatic Big Sur rocky coastal terrain at golden hour, wide view.

            SCENE COMPOSITION:
            - Weathered granite outcrops with detailed texture - warm terracotta undertones,
              lichen patches, cracks and fissures
            - Wind-sculpted Monterey cypress tree(s) in mid-ground, gnarled branches
            - Coastal sagebrush and dudleya succulents dot the rocks
            - A charming CALIFORNIA QUAIL (round body, distinctive curved black head plume)
              stands alertly on a rock in the lower right area
            - A small WESTERN FENCE LIZARD doing push-ups on a nearby sunny rock,
              showing blue belly patches
            - Dramatic clouds sweep across blue sky
            - Distant Pacific Ocean glimpsed through rock formations
            - LEFT AND CENTER areas clear for text content
            - Quail and lizard are small but detailed, positioned as natural elements

            STYLE: Premium Pixar/Disney 3D animation quality, like "The Good Dinosaur"
            landscapes. The quail is adorable (topknot is a fun character feature), the
            lizard is cute like Pascal from "Tangled". Rich textural rock details,
            warm afternoon light with long shadows. NOT photorealistic.

            COLORS: Warm tans, terracotta, sage green vegetation, weathered gray granite,
            blue sky, the quail's blue-gray plumage with brown accents.
        """
    },
    "coastal": {
        "output_name": "coastal-scene-pixar",
        "prompt": """
            Sweeping Big Sur coastal overlook at golden hour, cinematic wide view.

            SCENE COMPOSITION:
            - Dramatic cliffs drop to sandy cove where turquoise waves crash rhythmically
            - Ice plant with magenta/pink flowers and coastal buckwheat in foreground
            - Golden hour sunlight creates sparkling highlights on ocean surface
            - Sea stacks and rocky outcrops dot the coastline
            - Distant fog bank softens the horizon
            - An adorable SEA OTTER floating on its back in the calm water of the cove,
              positioned in the LOWER LEFT corner. Fluffy brown fur, white face with
              whiskers, paws near chest, relaxed playful expression.
            - The otter is small relative to the landscape but clearly visible
            - CENTER AND RIGHT areas clear for text overlay
            - Atmospheric perspective with layered depth

            STYLE: Premium Pixar/Disney 3D animation quality, like "Finding Nemo" ocean
            scenes or "Luca" coastlines. The sea otter is INCREDIBLY cute - the kind that
            makes audiences "awww". Big eyes, fluffy wet fur, playful energy.
            Rich ocean rendering, warm golden light. NOT photorealistic.

            COLORS: Deep ocean blues, turquoise shallows, golden light, misty grays,
            green succulents, magenta ice plant flowers, brown otter with cream face.
        """
    },
    "burrows": {
        "output_name": "burrows-scene-pixar",
        "prompt": """
            Cross-section view of underground burrows, transitional scene leading to
            something deeper below.

            SCENE COMPOSITION:
            - Rich dark soil layers with visible strata - topsoil, clay, rocks
            - Intricate root systems from trees above, weaving through soil
            - Cozy rounded tunnel openings carved by burrowing animals
            - Soft shafts of warm daylight filter down through small surface holes
            - Dust motes float in light beams
            - Small embedded pebbles, organic matter, occasional earthworm
            - The tunnels lead DOWNWARD, hinting at deeper chambers below
            - No specific animals - this is a transition zone
            - UPPER AREA shows surface (grass, roots entering soil)
            - LOWER AREA shows tunnels leading deeper (suggesting datacenter below)
            - Cozy, inviting atmosphere like a hobbit's home, not claustrophobic

            STYLE: Premium Pixar/Disney 3D animation quality, like "Fantastic Mr. Fox"
            or "Zootopia" underground scenes. Warm inviting earth tones, detailed soil
            textures, organic feel. Sense of mystery about what lies below.
            NOT photorealistic - clearly animated aesthetic.

            COLORS: Rich browns, deep amber, chocolate tones, cream highlights where
            light enters, hints of cooler blue-gray deeper down suggesting tech below.
        """
    }
}


def generate_zone_scene(zone: str, output_dir: Path) -> dict:
    """Generate a single zone scene."""
    result = {"zone": zone, "success": False, "path": None, "error": None}

    if zone not in ZONE_SCENES:
        result["error"] = f"Unknown zone: {zone}"
        return result

    api_key = os.environ.get('GOOGLE_API_KEY')
    if not api_key:
        result["error"] = "GOOGLE_API_KEY not found"
        return result

    scene = ZONE_SCENES[zone]
    prompt = scene["prompt"].strip()

    print(f"\n[{zone.upper()}] Starting generation with {IMAGEN_MODEL}...")

    try:
        client = genai.Client(api_key=api_key)

        response = client.models.generate_images(
            model=IMAGEN_MODEL,
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
            output_filename = f"{scene['output_name']}-{timestamp}.png"
            output_path = output_dir / output_filename

            image_data = response.generated_images[0].image.image_bytes
            with open(output_path, "wb") as f:
                f.write(image_data)

            print(f"[{zone.upper()}] ✓ SUCCESS: {output_path}")
            result["success"] = True
            result["path"] = str(output_path)
        else:
            result["error"] = "No image generated"
            print(f"[{zone.upper()}] ✗ No image generated")

    except Exception as e:
        result["error"] = str(e)
        print(f"[{zone.upper()}] ✗ ERROR: {e}")

    return result


def main():
    zones_to_generate = sys.argv[1:] if len(sys.argv) > 1 else list(ZONE_SCENES.keys())

    # Validate zones
    for zone in zones_to_generate:
        if zone not in ZONE_SCENES:
            print(f"ERROR: Unknown zone '{zone}'")
            print(f"Valid zones: {list(ZONE_SCENES.keys())}")
            sys.exit(1)

    project_root = Path(__file__).parent.parent
    assets_dir = project_root / "public" / "assets"

    print("=" * 70)
    print("ZONE SCENE GENERATION")
    print(f"Model: {IMAGEN_MODEL} (highest quality)")
    print(f"Zones: {', '.join(zones_to_generate)}")
    print("=" * 70)

    results = []

    # Generate in parallel using ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {}
        for zone in zones_to_generate:
            output_dir = assets_dir / zone
            output_dir.mkdir(parents=True, exist_ok=True)
            future = executor.submit(generate_zone_scene, zone, output_dir)
            futures[future] = zone

        for future in as_completed(futures):
            zone = futures[future]
            try:
                result = future.result()
                results.append(result)
            except Exception as e:
                results.append({"zone": zone, "success": False, "error": str(e)})

    # Summary
    print("\n" + "=" * 70)
    print("GENERATION COMPLETE")
    print("=" * 70)

    successful = [r for r in results if r["success"]]
    failed = [r for r in results if not r["success"]]

    print(f"\nSuccessful: {len(successful)}/{len(results)}")
    for r in successful:
        print(f"  ✓ {r['zone']}: {r['path']}")

    if failed:
        print(f"\nFailed: {len(failed)}")
        for r in failed:
            print(f"  ✗ {r['zone']}: {r['error']}")


if __name__ == "__main__":
    main()
