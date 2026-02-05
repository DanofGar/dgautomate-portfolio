import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

// Check for ImageMagick
try {
  execSync('which convert', { stdio: 'pipe' });
} catch {
  console.error('ImageMagick not found. Install with: brew install imagemagick');
  process.exit(1);
}

const OUTPUT_DIR = 'assets/preview';
if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

const assets = {
  sky: 'public/assets/sky/sky-background-v3.png',
  forest: 'public/assets/forest/forest-background-v3.png',
  coastal: 'public/assets/coastal/coastal-overlook-v3.png',
  cave: 'public/assets/cave/cave-transition-v3.png',
  datacenter: 'public/assets/datacenter/datacenter-background-v4.png',
};

// Verify all assets exist
for (const [name, path] of Object.entries(assets)) {
  if (!existsSync(path)) {
    console.error(`Missing: ${path}`);
    process.exit(1);
  }
  console.log(`✓ ${name}: ${path}`);
}

console.log('\n--- Creating blend tests ---\n');

// Test 1: Forest → Coastal (direct transition, rocky removed)
console.log('1. Forest → Coastal transition...');
execSync(`convert ${assets.forest} ${assets.coastal} -append ${OUTPUT_DIR}/blend-forest-coastal.png`);
console.log(`   → ${OUTPUT_DIR}/blend-forest-coastal.png`);

// Test 2: Cave → Datacenter
console.log('2. Cave → Datacenter transition...');
execSync(`convert ${assets.cave} ${assets.datacenter} -append ${OUTPUT_DIR}/blend-cave-datacenter.png`);
console.log(`   → ${OUTPUT_DIR}/blend-cave-datacenter.png`);

// Test 3: Full sequence (all 5 panels)
console.log('3. Full sequence (sky → forest → coastal → cave → datacenter)...');
execSync(`convert ${assets.sky} ${assets.forest} ${assets.coastal} ${assets.cave} ${assets.datacenter} -append ${OUTPUT_DIR}/blend-full-sequence.png`);
console.log(`   → ${OUTPUT_DIR}/blend-full-sequence.png`);

// Create a scaled version of full sequence for easier viewing
console.log('4. Full sequence (25% scale for preview)...');
execSync(`convert ${OUTPUT_DIR}/blend-full-sequence.png -resize 25% ${OUTPUT_DIR}/blend-full-sequence-small.png`);
console.log(`   → ${OUTPUT_DIR}/blend-full-sequence-small.png`);

console.log('\n✓ All blend tests created. Opening previews...');
