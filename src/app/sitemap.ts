import { MetadataRoute } from 'next';
import { getAllPublishedCalculators, getCalculatorsByCategory } from '@/lib/calculatorRegistry';
import { getAllCategories } from '@/lib/categoryRegistry';
import { SITE_CONFIG } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedCalculators = getAllPublishedCalculators();
  const categories = getAllCategories();

  // 1. Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_CONFIG.url}/calculators`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${SITE_CONFIG.url}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${SITE_CONFIG.url}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_CONFIG.url}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_CONFIG.url}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 2. Published Calculators (Canonical URLs)
  const calculatorRoutes: MetadataRoute.Sitemap = publishedCalculators.map(calc => ({
    url: `${SITE_CONFIG.url}/calculators/${calc.slug}`,
    lastModified: new Date(calc.addedDate),
    changeFrequency: 'monthly',
    priority: calc.popular ? 0.9 : 0.8,
  }));

  // 3. Populated Categories Only (Exclude empty categories from sitemap)
  const populatedCategories = categories.filter(
    cat => getCalculatorsByCategory(cat.slug).length > 0
  );

  const categoryRoutes: MetadataRoute.Sitemap = populatedCategories.map(cat => ({
    url: `${SITE_CONFIG.url}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...calculatorRoutes, ...categoryRoutes];
}
