import { getAllPublishedCalculators } from './calculatorRegistry';
import { CATEGORIES } from './categoryRegistry';
import { SearchResultItem } from './types';

export function searchCalculators(query: string, maxResults: number = 10): SearchResultItem[] {
  const cleanQuery = query.trim().toLowerCase();
  const all = getAllPublishedCalculators();

  if (!cleanQuery) {
    // Return popular calculators as default suggestions
    return all
      .filter(c => c.popular)
      .slice(0, maxResults)
      .map(c => ({
        slug: c.slug,
        name: c.name,
        shortDescription: c.shortDescription,
        category: c.category,
        categoryName: CATEGORIES[c.category]?.name || c.category,
        icon: c.icon,
        matchScore: 100,
      }));
  }

  const queryTerms = cleanQuery.split(/\s+/).filter(Boolean);
  const scoredResults: SearchResultItem[] = [];

  for (const calc of all) {
    let score = 0;
    const nameLower = calc.name.toLowerCase();
    const slugLower = calc.slug.toLowerCase();
    const descLower = calc.shortDescription.toLowerCase();
    const catNameLower = (CATEGORIES[calc.category]?.name || '').toLowerCase();
    const keywordsLower = calc.keywords.map(k => k.toLowerCase());
    const tagsLower = calc.tags.map(t => t.toLowerCase());

    // Exact title match
    if (nameLower === cleanQuery) {
      score += 150;
    } else if (nameLower.startsWith(cleanQuery)) {
      score += 100;
    } else if (nameLower.includes(cleanQuery)) {
      score += 75;
    }

    // Slug match
    if (slugLower.includes(cleanQuery.replace(/\s+/g, '-'))) {
      score += 60;
    }

    // Term by term match
    for (const term of queryTerms) {
      if (nameLower.includes(term)) score += 25;
      if (catNameLower.includes(term)) score += 15;
      if (keywordsLower.some(k => k.includes(term))) score += 20;
      if (tagsLower.some(t => t.includes(term))) score += 15;
      if (descLower.includes(term)) score += 10;
    }

    if (score > 0) {
      scoredResults.push({
        slug: calc.slug,
        name: calc.name,
        shortDescription: calc.shortDescription,
        category: calc.category,
        categoryName: CATEGORIES[calc.category]?.name || calc.category,
        icon: calc.icon,
        matchScore: score,
      });
    }
  }

  return scoredResults.sort((a, b) => b.matchScore - a.matchScore).slice(0, maxResults);
}
