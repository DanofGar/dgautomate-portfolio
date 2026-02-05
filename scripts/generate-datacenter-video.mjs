import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  console.error('Error: GOOGLE_API_KEY not set. Run: source ~/.zshrc');
  process.exit(1);
}

const OUTPUT_DIR = 'public/assets/datacenter';
const MODEL = 'veo-3.1-generate-preview'; // or 'veo-3.1-fast-generate-preview' for faster/cheaper

const DATACENTER_PROMPT = `Underground datacenter built inside a natural sea cave, Big Sur California.

SETTING:
- Cave ceiling with rough limestone stalactites and natural rock formations at top
- Industrial cable trays and conduit pipes embedded in the cave rock
- Two-level server room with metal walkways and safety railings
- Blue-glowing server racks lining the walls
- Green-lit computer monitors at workstations
- Warm amber work lights contrasting with cool blue server glow
- Concrete floors, industrial metal stairs between levels

CHARACTERS (3D Pixar/animated style, properly lit to match scene):
- A groundhog wearing a white lab coat and safety goggles, working at an upper level terminal, occasionally typing and checking clipboard
- A groundhog in security guard uniform with badge, patrolling the lower level, looking around alertly
- A sea otter that just arrived, looking around curiously at the facility, wet fur glistening

ANIMATION:
- Subtle camera drift, very slow push-in
- Server rack LEDs blinking in patterns
- Characters have idle animations - scientist typing, guard scanning, otter exploring
- Atmospheric particles floating in the air (dust motes catching light)
- Cables occasionally pulsing with data light

STYLE:
- Cinematic lighting, moody atmosphere
- Mix of natural cave textures and industrial tech
- Cozy "secret lab" feeling
- 16:9 aspect ratio, high quality

The scene should feel like a living, breathing secret facility hidden underground - a place where automation magic happens.`;

async function generateDatacenterVideo() {
  console.log('🎬 Starting Veo 3.1 video generation...');
  console.log(`Model: ${MODEL}`);
  console.log('This may take 1-6 minutes.\n');

  // Step 1: Start the generation
  const startResponse = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predictLongRunning`,
    {
      method: 'POST',
      headers: {
        'x-goog-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{
          prompt: DATACENTER_PROMPT,
        }],
        parameters: {
          aspectRatio: '16:9',
          durationSeconds: 8,
          resolution: '1080p',
          // negativePrompt: 'blurry, low quality, distorted faces, uncanny valley',
        },
      }),
    }
  );

  if (!startResponse.ok) {
    const error = await startResponse.text();
    console.error('Failed to start generation:', startResponse.status, error);
    process.exit(1);
  }

  const startData = await startResponse.json();
  const operationName = startData.name;

  if (!operationName) {
    console.error('No operation name returned:', startData);
    process.exit(1);
  }

  console.log(`✓ Generation started: ${operationName}\n`);

  // Step 2: Poll for completion
  let attempts = 0;
  const maxAttempts = 60; // 10 minutes max (10s intervals)
  let result = null;

  while (attempts < maxAttempts) {
    attempts++;
    console.log(`Polling... (attempt ${attempts}/${maxAttempts})`);

    const pollResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${operationName}`,
      {
        headers: {
          'x-goog-api-key': API_KEY,
        },
      }
    );

    if (!pollResponse.ok) {
      const error = await pollResponse.text();
      console.error('Poll error:', pollResponse.status, error);
      await sleep(10000);
      continue;
    }

    const pollData = await pollResponse.json();

    if (pollData.done) {
      console.log('\n✓ Generation complete!');
      result = pollData;
      break;
    }

    if (pollData.metadata?.progress) {
      console.log(`  Progress: ${pollData.metadata.progress}%`);
    }

    await sleep(10000); // Wait 10 seconds between polls
  }

  if (!result) {
    console.error('Timed out waiting for video generation');
    process.exit(1);
  }

  // Step 3: Extract and download video
  if (result.error) {
    console.error('Generation failed:', result.error);
    process.exit(1);
  }

  // Handle nested response structure from Veo
  const generateVideoResponse = result.response?.generateVideoResponse;
  const generatedSamples = generateVideoResponse?.generatedSamples || [];

  if (generatedSamples.length === 0) {
    // Fallback to other possible structures
    const videos = result.response?.videos || result.response?.predictions || [];
    if (videos.length === 0) {
      console.error('No videos in response:', JSON.stringify(result, null, 2));
      process.exit(1);
    }
    generatedSamples.push(...videos.map(v => ({ video: v })));
  }

  console.log(`\nFound ${generatedSamples.length} video(s)`);

  if (!existsSync(OUTPUT_DIR)) await mkdir(OUTPUT_DIR, { recursive: true });

  for (let i = 0; i < generatedSamples.length; i++) {
    const sample = generatedSamples[i];
    const video = sample.video || sample;
    const videoUri = video.uri || video.videoUri;

    if (videoUri) {
      console.log(`\nDownloading video ${i + 1} from: ${videoUri}`);

      // Download the video with proper auth
      const videoResponse = await fetch(videoUri, {
        headers: {
          'x-goog-api-key': API_KEY,
          'Accept': 'video/mp4',
        },
        redirect: 'follow',
      });

      if (!videoResponse.ok) {
        const errorText = await videoResponse.text();
        console.error(`Failed to download: ${videoResponse.status}`, errorText);

        // Try alternate download method
        console.log('Trying alternate download method...');
        const altResponse = await fetch(`${videoUri}&key=${API_KEY}`, {
          redirect: 'follow',
        });

        if (altResponse.ok) {
          const videoBuffer = await altResponse.arrayBuffer();
          const outputPath = `${OUTPUT_DIR}/datacenter-critters-loop${i > 0 ? `-${i + 1}` : ''}.mp4`;
          await writeFile(outputPath, Buffer.from(videoBuffer));
          console.log(`✓ Saved: ${outputPath}`);
        } else {
          console.error('Alternate method also failed');
        }
        continue;
      }

      const videoBuffer = await videoResponse.arrayBuffer();
      const outputPath = `${OUTPUT_DIR}/datacenter-critters-loop${i > 0 ? `-${i + 1}` : ''}.mp4`;
      await writeFile(outputPath, Buffer.from(videoBuffer));
      console.log(`✓ Saved: ${outputPath} (${(videoBuffer.byteLength / 1024 / 1024).toFixed(2)} MB)`);
    } else if (video.bytesBase64Encoded) {
      // Base64 encoded video
      const outputPath = `${OUTPUT_DIR}/datacenter-critters-loop${i > 0 ? `-${i + 1}` : ''}.mp4`;
      await writeFile(outputPath, Buffer.from(video.bytesBase64Encoded, 'base64'));
      console.log(`✓ Saved: ${outputPath}`);
    } else {
      console.log('Video sample structure:', JSON.stringify(sample, null, 2));
    }
  }

  console.log('\n🎉 Done! Review the video(s) in:', OUTPUT_DIR);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

generateDatacenterVideo().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
