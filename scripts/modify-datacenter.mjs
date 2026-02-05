import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  console.error('Error: GOOGLE_API_KEY not set. Run: source ~/.zshrc');
  process.exit(1);
}

const INPUT_IMAGE = 'public/assets/datacenter/datacenter-background-v3.png';
const OUTPUT_DIR = 'assets/raw';
const PREVIEW_DIR = 'assets/preview';
const timestamp = new Date().toISOString().slice(0, 16).replace(':', '');

async function generateModifiedDatacenter() {
  // Read the existing datacenter image
  console.log(`Reading: ${INPUT_IMAGE}`);
  const imageBuffer = await readFile(INPUT_IMAGE);
  const imageBase64 = imageBuffer.toString('base64');

  const prompt = `Edit this underground datacenter/bunker image.
ONLY MODIFY THE TOP 20% OF THE IMAGE (the ceiling area).

Replace the current industrial ceiling with:
- Rough natural cave rock with visible stalactites hanging down
- Raw stone formations mixed with the existing cable trays and conduit pipes
- The cave rock should look like rough-hewn limestone or granite
- Keep some industrial elements (pipes, cable trays) embedded in the rock
- The transition from cave rock to industrial walls should feel natural, as if the bunker was built inside a natural cave

KEEP EVERYTHING ELSE EXACTLY THE SAME:
- The two-level layout with metal railings
- The green-lit monitors and workstations
- The blue server racks on the right
- The warm yellow lighting on the left
- The concrete floors and industrial walls below the ceiling

The result should look like a high-tech datacenter built inside a natural underground cave.`;

  console.log('Generating modified datacenter with cave ceiling...');

  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent',
    {
      method: 'POST',
      headers: {
        'x-goog-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              inlineData: {
                mimeType: 'image/png',
                data: imageBase64
              }
            },
            { text: prompt }
          ]
        }],
        generationConfig: {
          responseModalities: ['IMAGE', 'TEXT']
        }
      })
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error('API Error:', response.status, error);

    // Try with gemini-2.0-flash-exp-image-generation
    console.log('\nTrying gemini-2.0-flash-exp-image-generation...');
    return tryAlternateModel(imageBase64, prompt);
  }

  const data = await response.json();
  return processResponse(data);
}

async function tryAlternateModel(imageBase64, prompt) {
  // Try the image generation focused model
  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent',
    {
      method: 'POST',
      headers: {
        'x-goog-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              inlineData: {
                mimeType: 'image/png',
                data: imageBase64
              }
            },
            { text: prompt }
          ]
        }],
        generationConfig: {
          responseModalities: ['IMAGE', 'TEXT']
        }
      })
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error('Alternate model error:', response.status, error);

    // Final fallback: generate new image inspired by original
    console.log('\nFallback: Generating new datacenter with cave ceiling...');
    return generateFresh();
  }

  const data = await response.json();
  return processResponse(data);
}

async function generateFresh() {
  const freshPrompt = `Underground datacenter bunker built inside a natural sea cave.

TOP 20% OF IMAGE: Natural cave ceiling with rough limestone stalactites and cave formations. Industrial cable trays and conduit pipes are bolted into the rock. Dim warm light filters through gaps in the rock from above.

MAIN AREA: Two-level industrial server room:
- Upper level with metal safety railings, walkways, green-lit computer monitors at workstations
- Lower level with rows of server racks glowing blue, more green monitors at desks
- Warm yellow/orange work lights on the left side
- Cool blue LED accent lighting on server racks
- Concrete floors, industrial metal walls and stairs
- The facility looks like it was carved out of existing cave, with some rough rock visible on walls

The image should feel like a secret high-tech facility hidden inside Big Sur coastal caves. Cinematic lighting, photorealistic, 16:9 aspect ratio.`;

  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent',
    {
      method: 'POST',
      headers: {
        'x-goog-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: freshPrompt }]
        }],
        generationConfig: {
          responseModalities: ['IMAGE', 'TEXT']
        }
      })
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Fresh generation failed: ${response.status} ${error}`);
  }

  const data = await response.json();
  return processResponse(data);
}

async function processResponse(data) {
  // Find image in response
  let imageData = null;

  if (data.candidates?.[0]?.content?.parts) {
    for (const part of data.candidates[0].content.parts) {
      if (part.inlineData?.data) {
        imageData = part.inlineData.data;
        break;
      }
      if (part.text) {
        console.log('Model response:', part.text.slice(0, 200));
      }
    }
  }

  if (!imageData) {
    console.error('No image in response:', JSON.stringify(data, null, 2).slice(0, 500));
    throw new Error('No image generated');
  }

  // Save outputs
  if (!existsSync(OUTPUT_DIR)) await mkdir(OUTPUT_DIR, { recursive: true });
  if (!existsSync(PREVIEW_DIR)) await mkdir(PREVIEW_DIR, { recursive: true });

  const rawPath = path.join(OUTPUT_DIR, `datacenter-cave-ceiling-v4-${timestamp}.png`);
  const previewPath = path.join(PREVIEW_DIR, 'datacenter-cave-ceiling-v4-preview.png');

  const buffer = Buffer.from(imageData, 'base64');
  await writeFile(rawPath, buffer);
  await writeFile(previewPath, buffer);

  console.log(`\n✓ Saved raw: ${rawPath}`);
  console.log(`✓ Saved preview: ${previewPath}`);
  console.log('\nReview the preview, then copy to public/assets/datacenter/ if approved.');

  return { rawPath, previewPath };
}

generateModifiedDatacenter().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
