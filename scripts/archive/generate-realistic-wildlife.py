#!/usr/bin/env python3
"""
Generate realistic-style wildlife sprites for zone overlays.
Subtle, naturally-scaled, not cartoonish.

Uses: imagen-4.0-ultra-generate-001 (highest quality)
"""
import os
import sys
from pathlib import Path
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

from google import genai
from google.genai import types

IMAGEN_MODEL = "imagen-4.0-ultra-generate-001"

# Realistic wildlife - smaller scale, natural style
WILDLIFE = {
    "sky": [
        {
            "id": "pelican-silhouette",
            "name": "Brown Pelican",
            "prompt": """
                A brown pelican in flight, seen from below and slightly to the side.
                Wings extended mid-flap, distinctive long bill and throat pouch visible.
                Natural proportions, elegant soaring pose.

                STYLE: Naturalistic digital illustration, like high-quality wildlife art
                or National Geographic illustration. NOT cartoonish or cute. Realistic
                anatomy and proportions. Soft feather textures, muted natural colors.
                The bird should look like it belongs in a nature photograph.

                BACKGROUND: Clean white or very light gray background for easy extraction.
                Single bird only, full body visible, side-bottom angle view.
            """
        }
    ],
    "forest": [
        {
            "id": "banana-slug-small",
            "name": "Banana Slug",
            "prompt": """
                A Pacific banana slug crawling on a surface. Bright yellow-gold body
                with natural mottled brown spots. Eye stalks extended, leaving slight
                slime trail. Natural proportions - elongated body, smooth mantle.

                STYLE: Naturalistic digital illustration. NOT cute or cartoonish.
                Realistic textures - glistening moisture on body, natural eye stalks,
                muscular foot visible. The slug should look like it belongs in a
                nature documentary, not a children's movie.

                BACKGROUND: Clean white or light gray for easy extraction.
                Single slug, side profile view, full body visible.
            """
        },
        {
            "id": "stellers-jay-realistic",
            "name": "Steller's Jay",
            "prompt": """
                A Steller's Jay perched on a small branch. Deep blue plumage with black
                head and crest. Crest feathers raised alertly. Sharp eye, sturdy beak.
                Natural perching pose, one foot slightly raised.

                STYLE: Naturalistic digital illustration like Audubon bird art or
                high-quality wildlife illustration. NOT cartoonish. Realistic feather
                detail, accurate anatomy and proportions. Beautiful saturated blues
                but natural, not exaggerated.

                BACKGROUND: Clean white or light gray for easy extraction.
                Single bird with small branch, side 3/4 view, full body visible.
            """
        }
    ],
    "rocky": [
        {
            "id": "california-quail-realistic",
            "name": "California Quail",
            "prompt": """
                A California Quail standing alert on rocky ground. Distinctive curved
                black plume (topknot) on head. Scaled gray-brown plumage, intricate
                black and white face pattern. Plump body, small head. Natural pose.

                STYLE: Naturalistic digital illustration. NOT cute or cartoonish.
                Realistic feather patterns, accurate anatomy. The quail should look
                like it belongs in a field guide or nature photography.

                BACKGROUND: Clean white or light gray for easy extraction.
                Single bird, side 3/4 view, full body visible, natural scale.
            """
        },
        {
            "id": "fence-lizard-realistic",
            "name": "Western Fence Lizard",
            "prompt": """
                A western fence lizard basking on a rock surface. Spiny scales, gray-brown
                coloring with darker dorsal pattern. Blue throat and belly patches visible.
                Alert eye, typical lizard posture with body raised slightly.

                STYLE: Naturalistic digital illustration. Realistic scales, accurate
                reptile anatomy. NOT cartoonish - like a wildlife photo or field guide
                illustration. Natural earth tones with the distinctive blue patches.

                BACKGROUND: Clean white or light gray for easy extraction.
                Single lizard, side-top 3/4 view, full body with tail visible.
            """
        }
    ],
    "coastal": [
        {
            "id": "sea-otter-realistic",
            "name": "Sea Otter",
            "prompt": """
                A sea otter floating on its back in water. Dense brown fur, lighter
                face with whiskers. Paws near chest in classic floating pose. Webbed
                hind feet visible. Relaxed, natural expression.

                STYLE: Naturalistic digital illustration. NOT cute or cartoon-like.
                Realistic fur texture (wet, dense), accurate otter anatomy and
                proportions. Like a nature documentary still or wildlife art.
                Natural coloring - brown fur, cream/white face.

                BACKGROUND: Light blue-gray suggesting calm water surface.
                Single otter, top-down view as if floating, full body visible.
            """
        },
        {
            "id": "cormorant-realistic",
            "name": "Brandt's Cormorant",
            "prompt": """
                A Brandt's cormorant perched on a rock with wings slightly spread
                in drying pose. Sleek black plumage with iridescent sheen. Blue
                throat pouch, hooked beak, bright eye. Elegant S-curved neck.

                STYLE: Naturalistic digital illustration. NOT cartoonish. Realistic
                feather detail, accurate seabird anatomy. Like Audubon bird art or
                wildlife photography. Dramatic but natural pose.

                BACKGROUND: Clean white or light gray for easy extraction.
                Single bird on rock, side view, wings partially spread, full body.
            """
        }
    ]
}


def generate_wildlife(zone: str, creature: dict, output_dir: Path) -> dict:
    """Generate a single wildlife sprite."""
    result = {
        "zone": zone,
        "creature": creature["name"],
        "success": False,
        "path": None,
        "error": None
    }

    api_key = os.environ.get('GOOGLE_API_KEY')
    if not api_key:
        result["error"] = "GOOGLE_API_KEY not found"
        return result

    prompt = creature["prompt"].strip()
    print(f"\n[{zone}/{creature['id']}] Generating with {IMAGEN_MODEL}...")

    try:
        client = genai.Client(api_key=api_key)

        response = client.models.generate_images(
            model=IMAGEN_MODEL,
            prompt=prompt,
            config=types.GenerateImagesConfig(
                number_of_images=1,
                aspect_ratio="1:1",  # Square for sprites
                safety_filter_level="block_low_and_above",
                person_generation="dont_allow",
            )
        )

        if response.generated_images:
            timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
            output_filename = f"{creature['id']}-{timestamp}.png"
            output_path = output_dir / output_filename

            image_data = response.generated_images[0].image.image_bytes
            with open(output_path, "wb") as f:
                f.write(image_data)

            print(f"[{zone}/{creature['id']}] ✓ SUCCESS: {output_path}")
            result["success"] = True
            result["path"] = str(output_path)
        else:
            result["error"] = "No image generated"
            print(f"[{zone}/{creature['id']}] ✗ No image generated")

    except Exception as e:
        result["error"] = str(e)
        print(f"[{zone}/{creature['id']}] ✗ ERROR: {e}")

    return result


def main():
    zones_to_generate = sys.argv[1:] if len(sys.argv) > 1 else list(WILDLIFE.keys())

    project_root = Path(__file__).parent.parent
    assets_dir = project_root / "public" / "assets"

    print("=" * 70)
    print("REALISTIC WILDLIFE SPRITE GENERATION")
    print(f"Model: {IMAGEN_MODEL}")
    print(f"Zones: {', '.join(zones_to_generate)}")
    print("=" * 70)

    all_tasks = []
    for zone in zones_to_generate:
        if zone not in WILDLIFE:
            print(f"WARNING: Unknown zone '{zone}', skipping")
            continue
        for creature in WILDLIFE[zone]:
            output_dir = assets_dir / zone / "wildlife"
            output_dir.mkdir(parents=True, exist_ok=True)
            all_tasks.append((zone, creature, output_dir))

    print(f"Total sprites to generate: {len(all_tasks)}")

    results = []

    # Generate in parallel
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {
            executor.submit(generate_wildlife, zone, creature, output_dir): (zone, creature["name"])
            for zone, creature, output_dir in all_tasks
        }

        for future in as_completed(futures):
            zone, name = futures[future]
            try:
                result = future.result()
                results.append(result)
            except Exception as e:
                results.append({
                    "zone": zone,
                    "creature": name,
                    "success": False,
                    "error": str(e)
                })

    # Summary
    print("\n" + "=" * 70)
    print("GENERATION COMPLETE")
    print("=" * 70)

    successful = [r for r in results if r["success"]]
    failed = [r for r in results if not r["success"]]

    print(f"\nSuccessful: {len(successful)}/{len(results)}")
    for r in successful:
        print(f"  ✓ {r['zone']}/{r['creature']}: {r['path']}")

    if failed:
        print(f"\nFailed: {len(failed)}")
        for r in failed:
            print(f"  ✗ {r['zone']}/{r['creature']}: {r['error']}")


if __name__ == "__main__":
    main()
