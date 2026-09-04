import React from 'react';
import { Metadata } from 'next';
import { getAllPublishedCalculators } from '@/lib/calculatorRegistry';
import { DirectoryFilter } from '@/components/directory/DirectoryFilter';
import { RecentTray } from '@/components/directory/RecentTray';
import { SITE_CONFIG, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'All Calculators – Comprehensive Free Online Calculator Directory',
  description:
    'Browse our complete directory of free online calculators for math, finance, health, dates, business, and everyday use. Filter by category or jump alphabetically A–Z.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/calculators`,
  },
};

export default function CalculatorsPage() {
  const allCalculators = getAllPublishedCalculators();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Calculators', url: '/calculators' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
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
