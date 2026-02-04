#!/bin/bash
# Take screenshots of each zone for visual verification
# Requires: npx playwright install chromium

set -e

OUTPUT_DIR="/tmp/zone-screenshots"
BASE_URL="${1:-http://localhost:3000}"

mkdir -p "$OUTPUT_DIR"

echo "=== Zone Screenshot Capture ==="
echo "Output: $OUTPUT_DIR"
echo "URL: $BASE_URL"
echo ""

# Check if dev server is running
if ! curl -s "$BASE_URL" > /dev/null 2>&1; then
    echo "ERROR: Dev server not running at $BASE_URL"
    echo "Start it with: npm run dev"
    exit 1
fi

# Full page screenshot
echo "Capturing full page..."
npx playwright screenshot "$BASE_URL" "$OUTPUT_DIR/full-page.png" --full-page 2>/dev/null || {
    echo "Installing playwright chromium..."
    npx playwright install chromium
    npx playwright screenshot "$BASE_URL" "$OUTPUT_DIR/full-page.png" --full-page
}

# Individual viewport screenshots at scroll positions
echo "Capturing zone viewports..."

# Using a simple node script to scroll and capture
node << 'EOF'
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(process.env.BASE_URL || 'http://localhost:3000');

    // Wait for page to load
    await page.waitForTimeout(2000);

    const zones = [
        { name: 'sky', scrollTo: 0 },
        { name: 'forest', scrollTo: 1000 },
        { name: 'rocky', scrollTo: 2000 },
        { name: 'coastal', scrollTo: 3000 },
        { name: 'burrows', scrollTo: 4000 },
        { name: 'datacenter', scrollTo: 5000 }
    ];

    for (const zone of zones) {
        await page.evaluate((y) => window.scrollTo(0, y), zone.scrollTo);
        await page.waitForTimeout(500);
        await page.screenshot({
            path: `/tmp/zone-screenshots/${zone.name}.png`
        });
        console.log(`  ✓ ${zone.name}.png`);
    }

    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/zone-screenshots/mobile-hero.png' });
    console.log('  ✓ mobile-hero.png');

    await browser.close();
})();
EOF

echo ""
echo "=== Screenshots Complete ==="
echo "View at: $OUTPUT_DIR/"
ls -la "$OUTPUT_DIR"
