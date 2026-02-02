/**
 * Utilities for scroll-based calculations and animations
 * Used primarily for the altitude meter and parallax effects
 */

/**
 * Maps scroll progress to altitude
 * Top of page: +500ft
 * Sea level (coastal overlook): 0ft
 * Underground: negative values
 */
export function scrollToAltitude(scrollY: number, documentHeight: number): number {
  const maxScroll = documentHeight - window.innerHeight;
  const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

  // Journey: +500ft (top) -> 0ft (coastal) -> -100ft (data center)
  const maxAltitude = 500;
  const minAltitude = -100;
  const altitudeRange = maxAltitude - minAltitude;

  return Math.round(maxAltitude - (scrollProgress * altitudeRange));
}

/**
 * Determines current zone based on scroll position
 */
export function getZoneFromScroll(scrollY: number, documentHeight: number): string {
  const altitude = scrollToAltitude(scrollY, documentHeight);

  if (altitude > 350) return 'sky';
  if (altitude > 150) return 'forest';
  if (altitude > 25) return 'rocky';
  if (altitude >= 0) return 'coastal';
  if (altitude > -30) return 'roots';
  if (altitude > -60) return 'burrows';
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
