import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import {
  SITE_CONFIG,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  getCanonicalUrl,
  getCanonicalAlternates,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy – Calculat.dev',
  description:
    'Our privacy pledge: all mathematical calculations occur client-side in your browser. Zero tracking of your financial or health inputs.',
  alternates: getCanonicalAlternates('/privacy'),
  openGraph: {
    title: 'Privacy Policy – Calculat.dev',
    description:
      'All calculations occur client-side in your browser. Zero tracking of your financial or health numbers.',
    url: getCanonicalUrl('/privacy'),
    type: 'website',
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary',
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterHandle,
    title: 'Privacy Policy – Calculat.dev',
    description: 'Privacy-first calculation tools running locally in your browser.',
  },
};

export default function PrivacyPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy/' },
  ];

  const pageSchema = generateWebPageSchema(
    'Privacy Policy',
    'Client-side execution and local storage privacy policy',
    '/privacy/'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema),
        }}
      />
      <div className="max-w-3xl mx-auto space-y-6 text-sm text-slate-700 leading-relaxed">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-500 mt-1">Last updated: January 2025</p>
      </div>

      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <strong className="font-semibold block text-sm mb-0.5">Summary of Privacy Commitment:</strong>
          Calculat does not require registration, login, or personal identity information. Your calculation inputs (loan balances, salary figures, biometric numbers, dates) are computed locally inside your browser and are never transmitted to our servers.
        </div>
      </div>

      <h2 className="text-lg font-bold text-slate-900 pt-2">1. Information We Do Not Collect</h2>
      <p>
        Unlike many online platforms, Calculat does not log, store, or sell numeric data entered into our calculators. Whether you calculate a 30-year home mortgage or a Body Mass Index, those values remain entirely within your device&apos;s memory during your session.
      </p>

      <h2 className="text-lg font-bold text-slate-900 pt-2">2. Local Storage and Cookies</h2>
      <p>
        Calculat uses your browser&apos;s <code>localStorage</code> feature strictly to enable optional client-side convenience features:
      </p>
      <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs">
        <li><strong>Recently Used Calculators:</strong> Stores the slugs of tools you recently visited so you can quickly return to them.</li>
        <li><strong>Favorites:</strong> Stores your bookmarked calculator tools.</li>
      </ul>
      <p>
        This local data never leaves your device and can be cleared at any time directly through the interface or via your browser settings.
      </p>

      <h2 className="text-lg font-bold text-slate-900 pt-2">3. Server Logs &amp; Aggregated Analytics</h2>
      <p>
        Like almost all web servers, standard non-identifying technical metadata (such as browser type, referring URL, and page request counts) may be logged to ensure platform stability, prevent denial-of-service attacks, and improve directory navigation.
      </p>

      <h2 className="text-lg font-bold text-slate-900 pt-2">4. Third-Party Links</h2>
      <p>
        Our directory may reference educational sources, government standards (such as CDC or Federal Reserve definitions), or third-party partner resources. We are not responsible for the privacy practices of external websites.
      </p>

      <h2 className="text-lg font-bold text-slate-900 pt-2">5. Updates to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our platform. Any modifications will be posted on this page with an updated revision date.
      </p>
    </div>
    </>
  );
}
