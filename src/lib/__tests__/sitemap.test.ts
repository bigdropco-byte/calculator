import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { SUPPORTED_LOCALES } from '../i18n/config';
import { SITE_CONFIG } from '../seo';
import { generateAllSitemaps } from '../../../scripts/generate-sitemaps';

const rootDir = path.resolve(__dirname, '../../..');
const publicDir = path.resolve(rootDir, 'public');
const sitemapsDir = path.resolve(publicDir, 'sitemaps');
const indexSitemapPath = path.resolve(publicDir, 'sitemap.xml');

describe('Multilingual Sitemap Generation & Sitemap Index', () => {
  beforeAll(() => {
    generateAllSitemaps();
  });

  it('generates the root sitemap index (sitemap.xml) with sitemapindex tag', () => {
    expect(fs.existsSync(indexSitemapPath)).toBe(true);
    const content = fs.readFileSync(indexSitemapPath, 'utf8');

    expect(content).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(content).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(content).toContain('</sitemapindex>');

    // Check that every single supported locale has an entry in the sitemap index
    for (const loc of SUPPORTED_LOCALES) {
      const expectedUrl = `${SITE_CONFIG.url}/sitemaps/sitemap-${loc}.xml`;
      expect(content).toContain(`<loc>${expectedUrl}</loc>`);
    }
  });

  it('generates individual sub-sitemaps for all 39 supported languages', () => {
    for (const loc of SUPPORTED_LOCALES) {
      const subSitemapFile = path.resolve(sitemapsDir, `sitemap-${loc}.xml`);
      expect(fs.existsSync(subSitemapFile)).toBe(true);

      const content = fs.readFileSync(subSitemapFile, 'utf8');
      expect(content).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(content).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
      expect(content).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml">');
      expect(content).toContain('</urlset>');

      // Verify that URLs in this sub-sitemap correspond to this locale
      if (loc === 'en') {
        expect(content).toContain(`<loc>${SITE_CONFIG.url}/</loc>`);
        expect(content).toContain(`<loc>${SITE_CONFIG.url}/calculators/percentage-calculator/</loc>`);
      } else {
        expect(content).toContain(`<loc>${SITE_CONFIG.url}/${loc}/</loc>`);
        expect(content).toContain(`<loc>${SITE_CONFIG.url}/${loc}/calculators/percentage-calculator/</loc>`);
      }

      // Verify hreflang alternates are present
      expect(content).toContain('xhtml:link rel="alternate" hreflang="en"');
      expect(content).toContain('xhtml:link rel="alternate" hreflang="x-default"');
    }
  });
});
