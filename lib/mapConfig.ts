export const MAP_CENTER = { lat: 40.808, lng: 14.495 };
export const DEFAULT_ZOOM = 15;
export const MIN_ZOOM = 12;
export const MAX_ZOOM = 19;

/** Area vesuviana intorno a Terzigno: evita di mostrare il mondo intero. */
export const MAX_BOUNDS: [[number, number], [number, number]] = [
  [40.74, 14.4],
  [40.86, 14.58],
];

export const FONTANELLA_COLOR = "#0284c7";

export function directionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}
