'use client';

const RECENT_KEY = 'calculat_recent';
const FAVORITES_KEY = 'calculat_favorites';
const MAX_RECENT = 10;

export interface RecentItem {
  slug: string;
  timestamp: number;
}

export function getRecentCalculators(): RecentItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentCalculator(slug: string): void {
  if (typeof window === 'undefined') return;
  try {
    const recents = getRecentCalculators().filter(item => item.slug !== slug);
    recents.unshift({ slug, timestamp: Date.now() });
    localStorage.setItem(RECENT_KEY, JSON.stringify(recents.slice(0, MAX_RECENT)));
  } catch (e) {
    console.warn('Could not save recent calculator', e);
  }
}

export function clearRecentCalculators(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(RECENT_KEY);
  } catch {}
}

export function getFavoriteCalculators(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFavoriteCalculator(slug: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const favorites = getFavoriteCalculators();
    const isFav = favorites.includes(slug);
    const updated = isFav ? favorites.filter(s => s !== slug) : [...favorites, slug];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return !isFav;
  } catch {
    return false;
  }
}

export function isFavoriteCalculator(slug: string): boolean {
  if (typeof window === 'undefined') return false;
  return getFavoriteCalculators().includes(slug);
}
