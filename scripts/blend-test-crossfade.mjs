import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

const OUTPUT_DIR = 'assets/preview';
if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

const assets = {
  sky: 'public/assets/sky/sky-background-v3.png',
  forest: 'public/assets/forest/forest-background-v3.png',
  coastal: 'public/assets/coastal/coastal-overlook-v3.png',
  cave: 'public/assets/cave/cave-transition-v3.png',
  datacenter: 'public/assets/datacenter/datacenter-background-v4.png',
};

// Transition zone is 50vh, main zones are 100vh
// For a 1440px tall viewport, transition = 720px
// We'll simulate at a reasonable size

const ZONE_HEIGHT = 800;      // Main zone height in pixels
const TRANSITION_HEIGHT = 400; // Transition zone (50vh equivalent)

function run(cmd) {
  console.log(`  > ${cmd.slice(0, 80)}...`);
  execSync(cmd, { stdio: 'pipe' });
}

// Create a crossfade transition between two images
function createCrossfade(fromImg, toImg, outputPath, label) {
  console.log(`\nCreating: ${label}`);

  const tmp1 = '/tmp/blend_from.png';
  const tmp2 = '/tmp/blend_to.png';
  const tmpMask = '/tmp/blend_mask.png';

  // 1. Crop bottom portion of "from" image (what you'd see scrolling away)
  run(`magick ${fromImg} -gravity South -crop 100%x${TRANSITION_HEIGHT}+0+0 +repage ${tmp1}`);

  // 2. Crop top portion of "to" image (what you'd see scrolling into)
  run(`magick ${toImg} -gravity North -crop 100%x${TRANSITION_HEIGHT}+0+0 +repage ${tmp2}`);

  // 3. Create gradient mask (black at top, white at bottom)
  // Black = show second image (tmp2/to), White = show first image (tmp1/from)
  // We want: TOP = from image (visible), BOTTOM = to image (visible)
  // So: TOP = white (show tmp1/from), BOTTOM = black (show tmp2/to)
  run(`magick -size 100x${TRANSITION_HEIGHT} gradient:black-white ${tmpMask}`);

  // 4. Resize mask to match image width
  const width = execSync(`magick identify -format "%w" ${tmp1}`, { encoding: 'utf8' }).trim();
  run(`magick ${tmpMask} -resize ${width}x${TRANSITION_HEIGHT}! ${tmpMask}`);

  // 5. Composite: from image fades out (top=visible, bottom=transparent)
  //              to image fades in (top=transparent, bottom=visible)
  run(`magick ${tmp2} ${tmp1} ${tmpMask} -composite ${outputPath}`);

  console.log(`  ✓ ${outputPath}`);
}

// Create full scroll simulation with proper transitions
function createFullScroll() {
  console.log('\n=== Creating full scroll simulation ===\n');

  const sections = [
    { img: assets.sky, name: 'sky' },
    { img: assets.forest, name: 'forest' },
    { img: assets.coastal, name: 'coastal' },
    { img: assets.cave, name: 'cave' },
    { img: assets.datacenter, name: 'datacenter' },
  ];

  const tmpParts = [];

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const partFile = `/tmp/scroll_part_${i}.png`;

    if (i === 0) {
      // First section: full height, but crop off bottom that will be in transition
      const cropHeight = ZONE_HEIGHT - (TRANSITION_HEIGHT / 2);
      run(`magick ${section.img} -resize x${ZONE_HEIGHT} -gravity North -crop 100%x${cropHeight}+0+0 +repage ${partFile}`);
    } else if (i === sections.length - 1) {
      // Last section: full height, but crop off top that was in transition
      const cropHeight = ZONE_HEIGHT - (TRANSITION_HEIGHT / 2);
      run(`magick ${section.img} -resize x${ZONE_HEIGHT} -gravity South -crop 100%x${cropHeight}+0+0 +repage ${partFile}`);
    } else {
      // Middle sections: crop both top and bottom
      const cropHeight = ZONE_HEIGHT - TRANSITION_HEIGHT;
      run(`magick ${section.img} -resize x${ZONE_HEIGHT} -gravity Center -crop 100%x${cropHeight}+0+0 +repage ${partFile}`);
    }
    tmpParts.push(partFile);

    // Create transition to next section
    if (i < sections.length - 1) {
      const transFile = `/tmp/scroll_trans_${i}.png`;
      const nextSection = sections[i + 1];

      // Create the crossfade transition
      const tmp1 = '/tmp/trans_from.png';
      const tmp2 = '/tmp/trans_to.png';
      const tmpMask = '/tmp/trans_mask.png';

      // Resize both to same height, then crop
      run(`magick ${section.img} -resize x${ZONE_HEIGHT} -gravity South -crop 100%x${TRANSITION_HEIGHT}+0+0 +repage ${tmp1}`);
      run(`magick ${nextSection.img} -resize x${ZONE_HEIGHT} -gravity North -crop 100%x${TRANSITION_HEIGHT}+0+0 +repage ${tmp2}`);

      // Get width for mask
      const width = execSync(`magick identify -format "%w" ${tmp1}`, { encoding: 'utf8' }).trim();

      // Gradient mask - black at top (show to), white at bottom (show from)
      // Actually: white = overlay visible, black = background visible
      // TOP of transition = from image (bottom of previous zone)
      // BOTTOM of transition = to image (top of next zone)
      run(`magick -size ${width}x${TRANSITION_HEIGHT} gradient:black-white ${tmpMask}`);

      // Composite with mask
      run(`magick ${tmp2} ${tmp1} ${tmpMask} -composite ${transFile}`);

      tmpParts.push(transFile);
      console.log(`  ✓ Transition: ${section.name} → ${nextSection.name}`);
    }
  }

  // Stack all parts vertically
  const allParts = tmpParts.join(' ');
  run(`magick ${allParts} -append ${OUTPUT_DIR}/blend-crossfade-full.png`);

  // Create scaled preview
  run(`magick ${OUTPUT_DIR}/blend-crossfade-full.png -resize 20% ${OUTPUT_DIR}/blend-crossfade-preview.png`);

  console.log(`\n✓ Full scroll: ${OUTPUT_DIR}/blend-crossfade-full.png`);
  console.log(`✓ Preview (20%): ${OUTPUT_DIR}/blend-crossfade-preview.png`);
}

// Individual transition previews
createCrossfade(assets.sky, assets.forest, `${OUTPUT_DIR}/crossfade-sky-forest.png`, 'Sky → Forest');
createCrossfade(assets.forest, assets.coastal, `${OUTPUT_DIR}/crossfade-forest-coastal.png`, 'Forest → Coastal');
createCrossfade(assets.coastal, assets.cave, `${OUTPUT_DIR}/crossfade-coastal-cave.png`, 'Coastal → Cave');
createCrossfade(assets.cave, assets.datacenter, `${OUTPUT_DIR}/crossfade-cave-datacenter.png`, 'Cave → Datacenter');

// Full scroll simulation
createFullScroll();

console.log('\nDone! Opening preview...');
