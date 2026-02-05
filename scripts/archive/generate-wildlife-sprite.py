#!/usr/bin/env python3
"""
Generate Pixar-style wildlife sprites using Imagen 4 Ultra.
Creates transparent-background assets to overlay on realistic backgrounds.

ALWAYS uses the LATEST/HIGHEST quality model available.
"""
import os
import sys
from pathlib import Path
from datetime import datetime

from google import genai
from google.genai import types

# ============================================================================
# MODEL CONFIGURATION - ALWAYS USE LATEST/BEST
# ============================================================================
# As of Feb 2026, Imagen 4 Ultra is the highest quality model
# Update this if newer models become available
IMAGEN_MODEL = "imagen-4.0-ultra-generate-001"
# ============================================================================

# Wildlife definitions by zone
WILDLIFE = {
    "sky": [
        {
            "id": "california-condor",
            "name": "California Condor",
            "prompt": """
                A majestic California Condor in flight, wings fully extended, soaring gracefully.
                Massive black wingspan with distinctive white triangular patches under wings.
                Bald orange-red head, hooked beak, powerful talons tucked.
                Bird viewed from below/side angle as if soaring overhead.

                STYLE: Pixar/Disney 3D animated film quality, like characters from "Up" or
                "Rio". Stylized but detailed, appealing and majestic. Soft feather textures,
                expressive eyes. Warm coloring. Character should look approachable yet grand.
                IMPORTANT: Plain solid color background (light gray or white) for easy extraction.
                Single subject only, full body visible, high detail.
            """
        }
    ],
    "forest": [
        {
            "id": "banana-slug",
            "name": "Banana Slug",
            "prompt": """
                An adorable banana slug crawling along, bright yellow-gold body with some brown
                spots, slimy glistening texture. Cute eye stalks extended and alert, friendly
                expression. Leaving a slight slime trail. Detailed texture showing the slug's
                mantle and muscular foot.

                STYLE: Pixar/Disney 3D animated film quality, like a character from "A Bug's
                Life" or "Turbo". Cute and appealing despite being a slug. Big expressive
                eyes on stalks, friendly demeanor. Stylized but recognizable.
                IMPORTANT: Plain solid color background (light gray or white) for easy extraction.
                Single subject only, full body visible, high detail.
            """
        },
        {
            "id": "stellers-jay",
            "name": "Steller's Jay",
            "prompt": """
                A vibrant Steller's Jay perched alertly. Striking deep blue plumage with
                black crest feathers standing tall. Black head and upper body transitioning
                to brilliant cobalt blue wings and tail. Sharp intelligent eyes, sturdy beak.
                Bird shown in 3/4 view, crest raised confidently.

                STYLE: Pixar/Disney 3D animated film quality, like birds from "Rio" or
                "Ferdinand". Beautiful saturated colors, detailed feathers with soft texture.
                Personality in the pose - confident and curious. Stylized but realistic enough
                to be recognizable.
                IMPORTANT: Plain solid color background (light gray or white) for easy extraction.
                Single subject only, full body visible, high detail.
            """
        },
        {
            "id": "black-tailed-deer",
            "name": "Black-tailed Deer",
            "prompt": """
                A gentle black-tailed deer, doe or young buck, standing alert in a graceful pose.
                Warm brown coat with lighter underbelly, distinctive large black-tipped tail.
                Large expressive dark eyes, tall ears perked forward. Delicate legs, small hooves.
                Looking toward camera with curious but calm expression.

                STYLE: Pixar/Disney 3D animated film quality, like Bambi reimagined in modern
                3D animation or the deer from "Brother Bear". Soft fur texture, warm appealing
                colors, large expressive eyes. Gentle and elegant character design.
                IMPORTANT: Plain solid color background (light gray or white) for easy extraction.
                Single subject only, full body visible, high detail.
            """
        }
    ],
    "rocky": [
        {
            "id": "california-quail",
            "name": "California Quail",
            "prompt": """
                A charming California Quail standing proudly. Distinctive curved black plume
                (topknot) bobbing from forehead. Scaled gray-brown plumage, striking black and
                white face pattern, chestnut-colored belly. Plump round body, small head.
                Alert posture with one foot slightly raised.

                STYLE: Pixar/Disney 3D animated film quality. Adorable round shape, expressive
                eyes, the signature topknot as a fun character feature. Think cute game bird
                character. Soft feather textures, warm earthy colors.
                IMPORTANT: Plain solid color background (light gray or white) for easy extraction.
                Single subject only, full body visible, high detail.
            """
        },
        {
            "id": "brush-rabbit",
            "name": "Brush Rabbit",
            "prompt": """
                A cute brush rabbit sitting alert, small and compact. Soft brown-gray fur,
                lighter underbelly. Short rounded ears (smaller than jackrabbit), large dark
                eyes, small pink nose twitching. Fluffy cottontail visible. Front paws together,
                ready to hop. Slightly fluffed-up fur for warmth.

                STYLE: Pixar/Disney 3D animated film quality, like rabbits from "Zootopia" or
                "Bambi". Absolutely adorable - big eyes, soft fluffy fur texture, expressive
                face. Character audiences would want to cuddle.
                IMPORTANT: Plain solid color background (light gray or white) for easy extraction.
                Single subject only, full body visible, high detail.
            """
        },
        {
            "id": "fence-lizard",
            "name": "Western Fence Lizard",
            "prompt": """
                A western fence lizard doing push-ups on a rock, displaying its blue belly
                patches. Spiny scales along body, gray-brown coloring with darker patterns.
                Alert eye, mouth slightly open. Distinctive blue throat and side patches
                visible as it does its territorial display. Long tail, splayed toes with tiny
                claws gripping rock surface.

                STYLE: Pixar/Disney 3D animated film quality, like Pascal from "Tangled" but
                as a fence lizard. Cute and characterful despite being a reptile. Expressive
                eyes, personality in the pose. Detailed scales but stylized.
                IMPORTANT: Plain solid color background (light gray or white) for easy extraction.
                Single subject only, full body visible, high detail.
            """
        }
    ],
    "coastal": [
        {
            "id": "sea-otter",
            "name": "Sea Otter",
            "prompt": """
                An adorable sea otter floating on its back in calm water, paws up near chest.
                Dense fluffy brown fur, lighter face with visible whiskers, small round ears.
                Cute button nose, bright intelligent eyes. Webbed hind feet visible. Relaxed,
                playful expression - the classic otter floating pose.

                STYLE: Pixar/Disney 3D animated film quality, like characters from "Finding
                Dory". Incredibly cute and appealing - the kind of character that makes
                audiences go "awww". Fluffy wet fur texture, expressive face, playful energy.
                IMPORTANT: Plain solid color background (light blue suggesting water surface)
                for easy extraction. Single subject only, full body visible, high detail.
            """
        },
        {
            "id": "harbor-seal",
            "name": "Harbor Seal",
            "prompt": """
                A friendly harbor seal lounging on a rock, sleek body in classic banana pose
                (head and tail raised). Spotted gray-brown coat pattern, large dark expressive
                eyes, long whiskers, V-shaped nostrils. Rotund body, small flippers. Looking
                at viewer with curious, almost smiling expression.

                STYLE: Pixar/Disney 3D animated film quality, like characters from "Finding
                Dory" (Fluke and Rudder). Endearing and charismatic, the sleepy satisfied
                look seals have. Smooth wet fur texture, soulful eyes.
                IMPORTANT: Plain solid color background (light gray or white) for easy extraction.
                Single subject only, full body visible, high detail.
            """
        },
        {
            "id": "cormorant",
            "name": "Cormorant",
            "prompt": """
                A Brandt's cormorant perched on a rock, wings spread slightly to dry.
                Sleek black plumage with iridescent green sheen, distinctive blue throat
                pouch. Long hooked beak, bright turquoise-blue eyes. Elegant S-curved neck,
                webbed feet gripping rock. Wings held open in characteristic drying pose.

                STYLE: Pixar/Disney 3D animated film quality, like Nigel from "Finding Nemo"
                but more elegant. Dramatic pose, beautiful iridescent feathers, striking eyes.
                Character with presence and dignity despite being a seabird.
                IMPORTANT: Plain solid color background (light gray or white) for easy extraction.
                Single subject only, full body visible, high detail.
            """
        }
    ]
}

def generate_wildlife_sprite(zone: str, creature: dict, output_dir: Path):
    """Generate a single wildlife sprite."""

    api_key = os.environ.get('GOOGLE_API_KEY')
    if not api_key:
        print("ERROR: GOOGLE_API_KEY not found in environment")
        return None

    client = genai.Client(api_key=api_key)

    creature_id = creature["id"]
    creature_name = creature["name"]
    prompt = creature["prompt"].strip()

    print(f"\n--- Generating: {creature_name} ---")
    print(f"Model: {IMAGEN_MODEL} (highest quality)")
    print(f"Prompt preview: {prompt[:200]}...")

    try:
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
            output_filename = f"{creature_id}-{timestamp}.png"
            output_path = output_dir / output_filename

            image_data = response.generated_images[0].image.image_bytes
            with open(output_path, "wb") as f:
                f.write(image_data)

            print(f"✓ SUCCESS: {output_path}")
            return str(output_path)
        else:
            print(f"✗ WARNING: No image generated for {creature_name}")
            return None

    except Exception as e:
        print(f"✗ ERROR generating {creature_name}: {e}")
        return None


def main():
    if len(sys.argv) < 2:
        print("Usage: python generate-wildlife-sprite.py <zone|all> [creature_id]")
        print("\nZones: sky, forest, rocky, coastal")
        print("Use 'all' to generate all zones")
        print(f"\nUsing model: {IMAGEN_MODEL}")
        print("\nAvailable wildlife by zone:")
        for zone, creatures in WILDLIFE.items():
            print(f"  {zone}: {', '.join(c['id'] for c in creatures)}")
        sys.exit(1)

    zone = sys.argv[1].lower()
    specific_creature = sys.argv[2] if len(sys.argv) > 2 else None

    project_root = Path(__file__).parent.parent
    assets_dir = project_root / "public" / "assets"

    # Handle 'all' zones
    if zone == "all":
        zones_to_process = list(WILDLIFE.keys())
    elif zone in WILDLIFE:
        zones_to_process = [zone]
    else:
        print(f"ERROR: Unknown zone '{zone}'. Valid: {list(WILDLIFE.keys())} or 'all'")
        sys.exit(1)

    results = {"success": [], "failed": []}

    for current_zone in zones_to_process:
        output_dir = assets_dir / current_zone
        output_dir.mkdir(parents=True, exist_ok=True)

        creatures = WILDLIFE[current_zone]

        # Filter to specific creature if requested
        if specific_creature:
            creatures = [c for c in creatures if c["id"] == specific_creature]
            if not creatures:
                print(f"WARNING: Creature '{specific_creature}' not found in zone '{current_zone}'")
                continue

        print(f"\n{'='*60}")
        print(f"ZONE: {current_zone.upper()}")
        print(f"Generating {len(creatures)} wildlife sprites...")
        print(f"{'='*60}")

        for creature in creatures:
            result = generate_wildlife_sprite(current_zone, creature, output_dir)
            if result:
                results["success"].append(result)
            else:
                results["failed"].append(creature["name"])

    # Summary
    print(f"\n{'='*60}")
    print("GENERATION COMPLETE")
    print(f"{'='*60}")
    print(f"Successful: {len(results['success'])}")
    for path in results['success']:
        print(f"  ✓ {path}")
    if results['failed']:
        print(f"Failed: {len(results['failed'])}")
        for name in results['failed']:
            print(f"  ✗ {name}")


if __name__ == "__main__":
    main()
