import { MetadataRoute } from 'next';
import { getAllPublishedCalculators, getCalculatorsByCategory } from '@/lib/calculatorRegistry';
import { getAllCategories } from '@/lib/categoryRegistry';
import { getCanonicalUrl } from '@/lib/seo';
import { DEFAULT_LOCALE, Locale, SUPPORTED_LOCALES } from '@/lib/i18n/config';

export const dynamic = 'force-static';

function getLanguagesForPath(path: string): Record<string, string> {
  const dict: Record<string, string> = {};
  for (const loc of SUPPORTED_LOCALES) {
    dict[loc] = getCanonicalUrl(path, loc);
  }
  dict['x-default'] = getCanonicalUrl(path, DEFAULT_LOCALE);
  return dict;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedCalculators = getAllPublishedCalculators();
  const categories = getAllCategories();

  const staticBaseRoutes: {
    path: string;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    priority: number;
  }[] = [
    { path: '/', changeFrequency: 'daily', priority: 1.0 },
    { path: '/calculators/', changeFrequency: 'daily', priority: 0.9 },
    { path: '/categories/', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/about/', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/contact/', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/privacy/', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms/', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/disclaimer/', changeFrequency: 'yearly', priority: 0.3 },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Static Pages across all locales
  for (const route of staticBaseRoutes) {
    const alternatesLanguages = getLanguagesForPath(route.path);
    for (const loc of SUPPORTED_LOCALES) {
      sitemapEntries.push({
        url: getCanonicalUrl(route.path, loc),
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: loc === DEFAULT_LOCALE ? route.priority : Number((route.priority * 0.9).toFixed(2)),
        alternates: {
          languages: alternatesLanguages,
        },
      });
    }
  }

  // 2. Published Calculators across all locales
  for (const calc of publishedCalculators) {
    const calcPath = `/calculators/${calc.slug}/`;
    const alternatesLanguages = getLanguagesForPath(calcPath);
    const basePriority = calc.popular ? 0.9 : 0.8;

    for (const loc of SUPPORTED_LOCALES) {
      sitemapEntries.push({
        url: getCanonicalUrl(calcPath, loc),
        lastModified: new Date(calc.addedDate),
        changeFrequency: 'monthly',
        priority: loc === DEFAULT_LOCALE ? basePriority : Number((basePriority * 0.9).toFixed(2)),
        alternates: {
          languages: alternatesLanguages,
        },
      });
    }
  }

  // 3. Populated Categories across all locales
  const populatedCategories = categories.filter(
    cat => getCalculatorsByCategory(cat.slug).length > 0
  );

  for (const cat of populatedCategories) {
    const catPath = `/categories/${cat.slug}/`;
    const alternatesLanguages = getLanguagesForPath(catPath);
    const basePriority = 0.7;

    for (const loc of SUPPORTED_LOCALES) {
      sitemapEntries.push({
        url: getCanonicalUrl(catPath, loc),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: loc === DEFAULT_LOCALE ? basePriority : Number((basePriority * 0.9).toFixed(2)),
        alternates: {
          languages: alternatesLanguages,
        },
      });
    }
  }

  return sitemapEntries;
}
