import { MetadataRoute } from 'next';
import { getAllPublishedCalculators, getCalculatorsByCategory } from '@/lib/calculatorRegistry';
import { getAllCategories } from '@/lib/categoryRegistry';
import { getCanonicalUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedCalculators = getAllPublishedCalculators();
  const categories = getAllCategories();

  // 1. Static Pages (Canonical URLs with trailing slash)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: getCanonicalUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: getCanonicalUrl('/calculators'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: getCanonicalUrl('/categories'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('/about'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: getCanonicalUrl('/contact'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: getCanonicalUrl('/privacy'),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: getCanonicalUrl('/terms'),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: getCanonicalUrl('/disclaimer'),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 2. Published Calculators (Canonical URLs with trailing slash)
  const calculatorRoutes: MetadataRoute.Sitemap = publishedCalculators.map(calc => ({
    url: getCanonicalUrl(`/calculators/${calc.slug}`),
    lastModified: new Date(calc.addedDate),
    changeFrequency: 'monthly',
    priority: calc.popular ? 0.9 : 0.8,
  }));

  // 3. Populated Categories Only (Exclude empty categories from sitemap)
  const populatedCategories = categories.filter(
    cat => getCalculatorsByCategory(cat.slug).length > 0
  );

  const categoryRoutes: MetadataRoute.Sitemap = populatedCategories.map(cat => {
    const tools = getCalculatorsByCategory(cat.slug);
    const newest = tools.reduce((latest, t) => {
      const d = new Date(t.addedDate);
      return d > latest ? d : latest;
    }, new Date(0));

    return {
      url: getCanonicalUrl(`/categories/${cat.slug}`),
      lastModified: newest,
      changeFrequency: 'weekly',
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...calculatorRoutes, ...categoryRoutes];
}
