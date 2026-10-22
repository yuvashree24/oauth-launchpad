import { OAuthGuide } from '../types/guide';
import { CURATED_GUIDES } from '../data/curatedGuides';

const CUSTOM_GUIDES_KEY = 'oauth_launchpad_custom_guides';

export function getAllGuides(): Record<string, OAuthGuide> {
  const custom = getCustomGuides();
  return { ...CURATED_GUIDES, ...custom };
}

export function getGuideById(id: string): OAuthGuide | null {
  const normalizedId = id.toLowerCase().trim();
  const all = getAllGuides();
  if (all[normalizedId]) return all[normalizedId];

  // Try finding by name or partial slug
  const match = Object.values(all).find(
    (g) =>
      g.id.toLowerCase() === normalizedId ||
      g.name.toLowerCase().includes(normalizedId) ||
      normalizedId.includes(g.id.toLowerCase())
  );

  return match || null;
}

export function saveCustomGuide(guide: OAuthGuide): void {
  try {
    const existing = getCustomGuides();
    existing[guide.id] = guide;
    localStorage.setItem(CUSTOM_GUIDES_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save custom guide in localStorage:', e);
  }
}

export function getCustomGuides(): Record<string, OAuthGuide> {
  try {
    const data = localStorage.getItem(CUSTOM_GUIDES_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Failed to load custom guides:', e);
    return {};
  }
}
