import React from 'react';
import { Metadata } from 'next';
import { getAllPublishedCalculators } from '@/lib/calculatorRegistry';
import { DirectoryFilter } from '@/components/directory/DirectoryFilter';
import { RecentTray } from '@/components/directory/RecentTray';
import {
  SITE_CONFIG,
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: 'All Calculators – Comprehensive Free Online Calculator Directory',
  description:
    'Browse our complete directory of free online calculators for math, finance, health, dates, business, and everyday use. Filter by category or jump alphabetically A–Z.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/calculators`,
  },
  openGraph: {
    title: 'All Calculators – Comprehensive Free Online Calculator Directory',
    description:
      'Browse our complete directory of free online calculators for math, finance, health, dates, business, and everyday use.',
    url: `${SITE_CONFIG.url}/calculators`,
    type: 'website',
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Calculators – Free Online Calculator Directory',
    description:
      'Browse our complete directory of free online calculators for math, finance, health, dates, and everyday use.',
  },
};

export default function CalculatorsPage() {
  const allCalculators = getAllPublishedCalculators();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Calculators', url: '/calculators' },
  ];

  const collectionItems = allCalculators.map(calc => ({
    name: calc.name,
    url: `/calculators/${calc.slug}`,
    description: calc.shortDescription,
  }));

  const collectionSchema = generateCollectionPageSchema(
    'All Calculators Directory',
    'Comprehensive directory of online calculators',
    '/calculators',
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

      <div className="space-y-6">
        {/* Page Header */}
        <div className="border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            All Calculators
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            Browse our complete collection of fast, accurate calculation utilities. Use the category filters or search bar to find exactly what you need.
          </p>
        </div>

        {/* Recently used / favorites */}
        <RecentTray />

        {/* Filter and Directory Grid */}
        <DirectoryFilter calculators={allCalculators} initialCategory="all" initialSort="popular" />
      </div>
    </>
  );
}
