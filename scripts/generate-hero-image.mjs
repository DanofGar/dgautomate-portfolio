import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const API_KEY = process.env.GOOGLE_API_KEY;
const OUTPUT_DIR = './public/assets/sky';

const HERO_PROMPT = `Aerial view from above the clouds at golden hour over Big Sur California coast, dramatic volumetric clouds below with peaks of coastal mountains emerging through the fog, California sunset colors with warm gold, soft coral, pale purple and sky blue gradients, god rays piercing through cloud layers, dreamy ethereal atmosphere, photorealistic landscape photography style, wide cinematic composition`;

async function generateImage(modelName) {
  console.log(`\nTrying model: ${modelName}`);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`,
    {
      method: 'POST',
      headers: {
        'x-goog-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: HERO_PROMPT }]
        }],
        generationConfig: {
          responseModalities: ['IMAGE', 'TEXT'],
        }
      })
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error(`Error (${response.status}):`, error.slice(0, 200));
    return null;
  }

  const data = await response.json();

  // Look for image in response
  if (data.candidates?.[0]?.content?.parts) {
    for (const part of data.candidates[0].content.parts) {
      if (part.inlineData?.data) {
        const mimeType = part.inlineData.mimeType || 'image/png';
        const ext = mimeType.includes('jpeg') || mimeType.includes('jpg') ? 'jpg' : 'png';
        return { data: part.inlineData.data, ext, mimeType };
      }
      if (part.text) {
        console.log('Text response:', part.text.slice(0, 100));
      }
    }
  }

  console.log('No image in response');
  return null;
}

async function main() {
  if (!API_KEY) {
    console.error('GOOGLE_API_KEY not set');
    process.exit(1);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log('Generating hero image...');
  console.log('Prompt:', HERO_PROMPT.slice(0, 80) + '...');

  // Try models in order of preference
  const models = [
    'gemini-2.5-flash-image',
    'gemini-2.0-flash-preview-image-generation',
    'gemini-2.0-flash-exp',
    'gemini-3-pro-image-preview',
  ];

  for (const model of models) {
    const result = await generateImage(model);
    if (result) {
      const outputPath = join(OUTPUT_DIR, `hero-sky-v1.${result.ext}`);
      await writeFile(outputPath, Buffer.from(result.data, 'base64'));
      console.log(`\n✓ Image saved to: ${outputPath}`);
      console.log(`  Model used: ${model}`);
      console.log(`  Format: ${result.mimeType}`);
      return;
    }
  }

  console.error('\n✗ All models failed. Image generation may require billing enabled.');
}

main().catch(console.error);
