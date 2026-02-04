import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const OUTPUT_DIR = './docs/iteration-v1-notes/screenshots';

async function takeScreenshots() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Screenshot sections by scrolling
  const sections = [
    { name: '01-hero', scroll: 0 },
    { name: '02-story-forest', scroll: 1000 },
    { name: '03-story-rocky', scroll: 2000 },
    { name: '04-story-coastal', scroll: 3000 },
    { name: '05-legacy-underground-roots', scroll: 4000 },
    { name: '06-legacy-underground-burrows', scroll: 5000 },
    { name: '07-legacy-datacenter-transition', scroll: 6000 },
    { name: '08-datacenter', scroll: 7000 },
    { name: '09-datacenter-contact', scroll: 8000 },
  ];

  for (const section of sections) {
    await page.evaluate((y) => window.scrollTo(0, y), section.scroll);
    await new Promise(r => setTimeout(r, 500)); // Wait for animations
    await page.screenshot({
      path: join(OUTPUT_DIR, `${section.name}.png`),
      fullPage: false
    });
    console.log(`Captured: ${section.name}`);
  }

  // Full page screenshot
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: join(OUTPUT_DIR, '00-full-page.png'),
    fullPage: true
  });
  console.log('Captured: full-page');

  await browser.close();
  console.log(`\nScreenshots saved to ${OUTPUT_DIR}`);
}

takeScreenshots().catch(console.error);
