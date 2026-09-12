import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { getAllPublishedCalculators } from '@/lib/calculatorRegistry';
import { DirectoryFilter } from '@/components/directory/DirectoryFilter';
import { RecentTray } from '@/components/directory/RecentTray';
import {
  SITE_CONFIG,
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  getCanonicalUrl,
  getCanonicalAlternates,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Free Online Calculation Tools – 240+ Utilities | Calculat.dev',
  description:
    'Explore our complete suite of 240+ free online calculation tools and utilities. Fast, client-side, and ad-free tools for finance, health, math, dates, and everyday use.',
  alternates: getCanonicalAlternates('/tools'),
  openGraph: {
    title: 'Free Online Calculation Tools – 240+ Utilities | Calculat.dev',
    description:
      'Explore our complete suite of 240+ free online calculation tools and utilities for math, finance, health, dates, and everyday use.',
    url: getCanonicalUrl('/tools'),
    type: 'website',
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterHandle,
    title: 'Free Online Calculation Tools – Calculat.dev',
    description:
      'Explore 240+ free online calculation tools and utilities. 100% client-side, ad-free, and mathematically verified.',
  },
};

export default function ToolsPage() {
  const allCalculators = getAllPublishedCalculators();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools/' },
  ];

  const collectionItems = allCalculators.map(calc => ({
    name: calc.name,
    url: `/calculators/${calc.slug}/`,
    description: calc.shortDescription,
  }));

  const collectionSchema = generateCollectionPageSchema(
    'Free Online Calculation Tools Directory',
    'Comprehensive directory of 240+ online calculation tools and utilities',
    '/tools/',
    collectionItems
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
          __html: JSON.stringify(collectionSchema),
        }}
      />

      <div className="space-y-8">
        {/* Page Header */}
        <div className="border-b border-slate-200 pb-6 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>240+ Free Calculation Tools</span>
            </span>
            <Link
              href="/about/"
              className="text-xs text-slate-600 hover:text-sky-700 font-medium transition-colors"
            >
              • Built by Independent Student
            </Link>
            <Link
              href="/privacy-policy/"
              className="text-xs text-emerald-700 hover:text-emerald-800 font-medium inline-flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Client-Side Privacy
            </Link>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Free Online Calculation Tools &amp; Utilities
          </h1>
          <p className="text-xs sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Browse our full catalog of high-accuracy calculation tools across 16 core disciplines. 
            All calculators execute immediately inside your browser without marketing popups, paywalls, or personal data tracking.
          </p>
        </div>

        {/* Recently used / favorites tray */}
        <RecentTray />

        {/* Filter and Directory Grid */}
        <DirectoryFilter calculators={allCalculators} initialCategory="all" initialSort="popular" />

        {/* Contextual Information & SEO Value Section */}
        <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Why Use Calculat.dev Tools?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Engineered to replace slow, ad-heavy tool sites with instant, mathematical accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-700">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900">Instant Local Execution</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Calculations compute live in milliseconds right in your browser with no network delay or server latency.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900">Protected Privacy</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Your financial numbers, health stats, and inputs never leave your device. Read our full{' '}
                <Link href="/privacy-policy/" className="text-sky-700 hover:underline font-medium">
                  Privacy Policy
                </Link>.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900">Student-Led Mission</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Created to provide students, researchers, and professionals an ad-free experience.{' '}
                <Link href="/about/" className="text-sky-700 hover:underline font-medium">
                  Learn about our mission <ArrowRight className="inline w-3 h-3" />
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
