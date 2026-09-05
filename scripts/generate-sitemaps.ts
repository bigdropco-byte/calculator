import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, Locale } from '../src/lib/i18n/config';
import { getAllPublishedCalculators, getCalculatorsByCategory } from '../src/lib/calculatorRegistry';
import { getAllCategories } from '../src/lib/categoryRegistry';
import { getCanonicalUrl, SITE_CONFIG } from '../src/lib/seo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const sitemapsDir = path.resolve(publicDir, 'sitemaps');

interface StaticRoute {
  path: string;
  changeFrequency: string;
  priority: number;
}

const STATIC_BASE_ROUTES: StaticRoute[] = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  { path: '/calculators/', changeFrequency: 'daily', priority: 0.9 },
  { path: '/categories/', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/about/', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/contact/', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/privacy/', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms/', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/disclaimer/', changeFrequency: 'yearly', priority: 0.3 },
];

function getAlternatesTags(routePath: string): string {
  let tags = '';
  for (const loc of SUPPORTED_LOCALES) {
    const locUrl = getCanonicalUrl(routePath, loc);
    tags += `    <xhtml:link rel="alternate" hreflang="${loc}" href="${locUrl}" />\n`;
  }
  const defaultUrl = getCanonicalUrl(routePath, DEFAULT_LOCALE);
  tags += `    <xhtml:link rel="alternate" hreflang="en-US" href="${defaultUrl}" />\n`;
  tags += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />\n`;
  return tags;
}

export function generateAllSitemaps() {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (!fs.existsSync(sitemapsDir)) {
    fs.mkdirSync(sitemapsDir, { recursive: true });
  }

  const nowIso = new Date().toISOString();
  const publishedCalculators = getAllPublishedCalculators();
  const populatedCategories = getAllCategories().filter(
    cat => getCalculatorsByCategory(cat.slug).length > 0
  );

  console.log(`Generating sitemaps for ${SUPPORTED_LOCALES.length} locales...`);
  console.log(`Calculators: ${publishedCalculators.length}, Populated Categories: ${populatedCategories.length}`);

  // 1. Generate 39 individual language sitemaps
  for (const loc of SUPPORTED_LOCALES) {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

    // Static pages
    for (const route of STATIC_BASE_ROUTES) {
      const url = getCanonicalUrl(route.path, loc);
      const priority = loc === DEFAULT_LOCALE ? route.priority : Number((route.priority * 0.9).toFixed(2));
      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${nowIso}</lastmod>\n`;
      xml += `    <changefreq>${route.changeFrequency}</changefreq>\n`;
      xml += `    <priority>${priority.toFixed(1)}</priority>\n`;
      xml += getAlternatesTags(route.path);
      xml += `  </url>\n`;
    }

    // Calculators
    for (const calc of publishedCalculators) {
      const calcPath = `/calculators/${calc.slug}/`;
      const url = getCanonicalUrl(calcPath, loc);
      const basePriority = calc.popular ? 0.9 : 0.8;
      const priority = loc === DEFAULT_LOCALE ? basePriority : Number((basePriority * 0.9).toFixed(2));
      const lastMod = calc.addedDate ? new Date(calc.addedDate).toISOString() : nowIso;

      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${lastMod}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>${priority.toFixed(1)}</priority>\n`;
      xml += getAlternatesTags(calcPath);
      xml += `  </url>\n`;
    }

    // Categories
    for (const cat of populatedCategories) {
      const catPath = `/categories/${cat.slug}/`;
      const url = getCanonicalUrl(catPath, loc);
      const basePriority = 0.7;
      const priority = loc === DEFAULT_LOCALE ? basePriority : Number((basePriority * 0.9).toFixed(2));

      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${nowIso}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${priority.toFixed(1)}</priority>\n`;
      xml += getAlternatesTags(catPath);
      xml += `  </url>\n`;
    }

    xml += `</urlset>\n`;

    const subSitemapFile = path.resolve(sitemapsDir, `sitemap-${loc}.xml`);
    fs.writeFileSync(subSitemapFile, xml, 'utf8');
  }

  // 2. Generate Primary Sitemap Index (sitemap.xml)
  let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  indexXml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const loc of SUPPORTED_LOCALES) {
    const sitemapUrl = `${SITE_CONFIG.url}/sitemaps/sitemap-${loc}.xml`;
    indexXml += `  <sitemap>\n`;
    indexXml += `    <loc>${sitemapUrl}</loc>\n`;
    indexXml += `    <lastmod>${nowIso}</lastmod>\n`;
    indexXml += `  </sitemap>\n`;
  }

  indexXml += `</sitemapindex>\n`;

  const indexFile = path.resolve(publicDir, 'sitemap.xml');
  fs.writeFileSync(indexFile, indexXml, 'utf8');

  console.log(`Successfully generated root sitemap index at public/sitemap.xml and ${SUPPORTED_LOCALES.length} sub-sitemaps in public/sitemaps/!`);
}

// Run directly if called as a script
generateAllSitemaps();
