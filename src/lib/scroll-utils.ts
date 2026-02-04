/**
 * Utilities for scroll-based calculations and animations
 * Used primarily for the altitude meter and parallax effects
 *
 * Page structure:
 * - Hero (Sky): 100vh at top
 * - StorySection: 300vh (3 sections x 100vh each)
 *   - Forest: scrolls through first 100vh of story
 *   - Rocky: scrolls through second 100vh of story
 *   - Coastal: scrolls through third 100vh of story
 * - Datacenter: 100-120vh at bottom
 */

// Section heights in vh units
const SECTION_HEIGHTS = {
  hero: 100,        // 100vh
  story: 300,       // 300vh (3 sections)
  datacenter: 120,  // ~120vh
};

// Story section splits (each takes 1/3 of 300vh = 100vh)
const STORY_SECTIONS = ['forest', 'rocky', 'coastal'] as const;

/**
 * Maps scroll progress to altitude
 * Hero: +500ft
 * Forest: ~+350ft
 * Rocky: ~+150ft
 * Coastal: ~0ft (sea level)
 * Datacenter: -100ft
 */
export function scrollToAltitude(scrollY: number, documentHeight: number): number {
  const viewportHeight = window.innerHeight;
  const maxScroll = documentHeight - viewportHeight;

  // Calculate position within the journey
  const heroEnd = viewportHeight; // End of hero section
  const storyEnd = heroEnd + (viewportHeight * 3); // End of story section

  // Hero section: +500ft
  if (scrollY <= heroEnd * 0.5) {
    return 500;
  }

  // Transition from hero to forest
  if (scrollY <= heroEnd) {
    const progress = (scrollY - heroEnd * 0.5) / (heroEnd * 0.5);
    return Math.round(500 - (progress * 150)); // 500 -> 350
  }

  // Story section: Forest (+350) -> Rocky (+150) -> Coastal (0)
  if (scrollY <= storyEnd) {
    const storyProgress = (scrollY - heroEnd) / (viewportHeight * 3);
    // 350ft at start, 0ft at end
    return Math.round(350 - (storyProgress * 350));
  }

  // Datacenter section: 0 -> -100ft
  const datacenterProgress = Math.min((scrollY - storyEnd) / viewportHeight, 1);
  return Math.round(0 - (datacenterProgress * 100));
}

/**
 * Determines current zone based on scroll position
 */
export function getZoneFromScroll(scrollY: number, documentHeight: number): string {
  const viewportHeight = window.innerHeight;

  // Section boundaries
  const heroEnd = viewportHeight;
  const forestEnd = heroEnd + viewportHeight;
  const rockyEnd = forestEnd + viewportHeight;
  const coastalEnd = rockyEnd + viewportHeight;

  if (scrollY < heroEnd * 0.8) return 'sky';
  if (scrollY < forestEnd) return 'forest';
  if (scrollY < rockyEnd) return 'rocky';
  if (scrollY < coastalEnd) return 'coastal';
  return 'datacenter';
}

/**
 * Gets a readable label for altitude display
 */
export function getAltitudeLabel(altitude: number): string {
  const absAlt = Math.abs(altitude);
  return altitude >= 0
    ? `+${altitude} ft`
    : `-${absAlt} ft`;
}
