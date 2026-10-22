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

  // Non-blocking sync to server persistence store
  try {
    fetch('/api/guides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guide }),
    }).catch((err) => {
      console.warn('Could not sync guide to server persistence:', err);
    });
  } catch {
    // Ignore fetch sync failure
  }
}

export async function fetchGuideFromServer(id: string): Promise<OAuthGuide | null> {
  const normalizedId = id.toLowerCase().trim();
  try {
    const res = await fetch(`/api/guides/${encodeURIComponent(normalizedId)}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.guide) {
      // Cache locally
      try {
        const existing = getCustomGuides();
        existing[data.guide.id] = data.guide;
        localStorage.setItem(CUSTOM_GUIDES_KEY, JSON.stringify(existing));
      } catch {
        // Ignore localStorage error
      }
      return data.guide;
    }
    return null;
  } catch (err) {
    console.error('Failed to fetch guide from server:', err);
    return null;
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

