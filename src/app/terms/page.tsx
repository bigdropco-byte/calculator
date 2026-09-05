import React from 'react';
import { Metadata } from 'next';
import {
  SITE_CONFIG,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  getCanonicalUrl,
  getCanonicalAlternates,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms of Service – Calculat.dev',
  description: 'Terms of service for using Calculat.dev free online calculators and directory.',
  alternates: getCanonicalAlternates('/terms'),
  openGraph: {
    title: 'Terms of Service – Calculat.dev',
    description: 'Terms of service for using Calculat.dev free online calculators and directory.',
    url: getCanonicalUrl('/terms'),
    type: 'website',
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary',
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterHandle,
    title: 'Terms of Service – Calculat.dev',
    description: 'Terms of service for using Calculat.dev.',
  },
};

export default function TermsPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Terms of Service', url: '/terms/' },
  ];

  const pageSchema = generateWebPageSchema(
    'Terms of Service',
    'Terms of service and usage conditions for Calculat.dev',
    '/terms/'
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
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Terms of Service</h1>
          <p className="text-xs text-slate-500 mt-1">Last updated: January 2025</p>
        </div>

        <h2 className="text-lg font-bold text-slate-900 pt-2">1. Acceptance of Terms</h2>
        <p>
          By accessing and using <strong>Calculat.dev</strong> (&ldquo;Calculat&rdquo; or the &ldquo;Service&rdquo;), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree, please do not use our website.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">2. Nature of the Service</h2>
        <p>
          Calculat is an informational calculator directory providing algorithmic and mathematical estimation tools for educational and general utility purposes. The tools, calculations, formulas, and estimates are provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis without warranties of any kind, express or implied.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">3. Acceptable Use</h2>
        <p>
          You agree to use Calculat solely for lawful purposes. You agree not to attempt to interfere with the network security, reverse engineer backend systems, or subject the website to automated scraping that degrades performance for other visitors.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">4. Intellectual Property</h2>
        <p>
          All original software code, user interface designs, logos, and curated editorial content on Calculat.dev are protected by intellectual property laws. Public domain mathematical formulas and algorithmic truths remain freely accessible to humanity.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">5. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, Calculat and its contributors shall not be liable for any direct, indirect, incidental, consequential, or punitive damages resulting from the use of, or inability to use, any calculation, tool, or information on this site.
        </p>
      </div>
    </>
  );
}
