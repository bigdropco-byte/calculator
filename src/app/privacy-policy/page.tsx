import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Lock, EyeOff, Server, Database } from 'lucide-react';
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
    'Our privacy pledge: all mathematical calculations occur client-side in your browser. Zero tracking of your financial, medical, or personal calculation inputs.',
  alternates: getCanonicalAlternates('/privacy-policy'),
  openGraph: {
    title: 'Privacy Policy – Calculat.dev',
    description:
      'All calculations occur client-side in your browser. Zero tracking of your financial, medical, or personal calculation inputs.',
    url: getCanonicalUrl('/privacy-policy'),
    type: 'website',
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary',
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterHandle,
    title: 'Privacy Policy – Calculat.dev',
    description: 'Privacy-first calculation tools running locally in your browser with zero input logging.',
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy-policy/' },
  ];

  const pageSchema = generateWebPageSchema(
    'Privacy Policy',
    'Client-side execution, zero-tracking commitment, and local storage privacy policy for Calculat.dev',
    '/privacy-policy/'
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

      <div className="max-w-3xl mx-auto space-y-8">
        <div className="border-b border-slate-200 pb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Client-Side Privacy
            </span>
            <span className="text-xs text-slate-500">• Effective: January 2025</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            How Calculat.dev protects your privacy, executes calculations locally, and safeguards your device data.
          </p>
        </div>

        {/* Highlight Banner */}
        <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 text-emerald-950 space-y-2">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-700 shrink-0" />
            <span className="font-bold text-sm sm:text-base">Our Fundamental Privacy Principle</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
            Calculat.dev was built with an uncompromising commitment to privacy: <strong>your calculation inputs never leave your web browser</strong>. Whether computing loan payments, tax estimates, health biomarkers, or engineering equations, all mathematical algorithms run client-side on your local device.
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-sky-700" />
              1. Information We Do Not Collect
            </h2>
            <p>
              Unlike traditional financial or healthcare portals, Calculat does not require account creation, logins, credit card entries, or email registrations. When using any of our calculation utilities:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm text-slate-600">
              <li>We do <strong>not</strong> intercept, transmit, or record the numeric figures you type.</li>
              <li>We do <strong>not</strong> build profiles of your financial standing, income, or physical health metrics.</li>
              <li>We do <strong>not</strong> sell or syndicate user calculation habits to data brokers, ad networks, or lenders.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-sky-700" />
              2. Local Storage and Client-Side Cookies
            </h2>
            <p>
              Calculat leverages standard browser <code>localStorage</code> solely to provide client-side convenience features:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose my-3">
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Recently Used Calculators</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Keeps track of tool slugs you recently used so you can jump back to them quickly.
                </p>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Starred Favorites</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Saves your favorite tools directly within your browser for one-click access.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              This data resides exclusively on your local device. It is never uploaded to any remote server and can be cleared at any time via your browser settings or our cookie preferences tray.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Server className="w-5 h-5 text-sky-700" />
              3. Server Logs and Diagnostic Analytics
            </h2>
            <p>
              To maintain 99.9% uptime, mitigate distributed denial-of-service (DDoS) attempts, and understand aggregate directory usage, standard non-identifiable web server logs and privacy-preserving Google Analytics (GA4) may measure page request frequencies and browser types. No personally identifiable information (PII) or numeric calculation payloads are ever attached to telemetry events.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Third-Party Links &amp; External References</h2>
            <p>
              Certain calculator editorial guides include educational citations to authoritative bodies (e.g., Internal Revenue Service, Centers for Disease Control and Prevention, National Institute of Standards and Technology). We do not control and are not responsible for the privacy practices of external third-party websites.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Updates and Inquiries</h2>
            <p>
              Any updates to this Privacy Policy will be published immediately on this page with a revised effective date. If you have questions regarding our privacy architecture, feel free to contact us through our{' '}
              <Link href="/contact/" className="text-sky-700 hover:underline font-semibold">
                contact page
              </Link>{' '}
              or learn more about our student background on our{' '}
              <Link href="/about/" className="text-sky-700 hover:underline font-semibold">
                about page
              </Link>.
            </p>
          </section>

          {/* Navigation Links */}
          <div className="pt-6 border-t border-slate-200 flex items-center gap-4 flex-wrap">
            <Link
              href="/tools/"
              className="px-4 py-2 bg-sky-700 text-white rounded-lg text-xs font-semibold hover:bg-sky-800 transition-colors inline-flex items-center gap-1.5"
            >
              Explore Calculation Tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/about/"
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              About Calculat.dev
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
