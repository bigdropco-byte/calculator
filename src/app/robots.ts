import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/search/',
          '/search',
          '/search?*',
          '/*/search/',
          '/*/search?*',
        ],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
