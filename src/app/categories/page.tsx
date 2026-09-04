import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getActiveCategoriesWithCount } from '@/lib/calculatorRegistry';
import { CategoryCard } from '@/components/directory/CategoryCard';
import {
  SITE_CONFIG,
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Calculator Categories – Browse Online Calculators by Topic',
  description:
    'Explore calculators organized across 16 major domains: math, finance, health, date & time, everyday life, business, science, education, and unit conversion.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/categories`,
  },
  openGraph: {
    title: 'Calculator Categories – Browse Online Calculators by Topic',
    description:
      'Explore calculators organized across 16 major domains: math, finance, health, date & time, everyday life, business, science, education, and unit conversion.',
    url: `${SITE_CONFIG.url}/categories`,
    type: 'website',
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculator Categories – Browse Online Calculators by Topic',
    description:
      'Explore calculators organized across 16 major domains: math, finance, health, date & time, everyday life, and business.',
  },
};

export default function CategoriesPage() {
  const categoriesWithCounts = getActiveCategoriesWithCount();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Categories', url: '/categories' },
  ];

  const categoryItems = categoriesWithCounts.map(({ category, count }) => ({
    name: category.name,
    url: `/categories/${category.slug}`,
    description: `${category.description} (${count} calculators available)`,
  }));

  const collectionSchema = generateCollectionPageSchema(
    'Calculator Categories Directory',
    'Browse calculators organized across 16 major topic domains',
    '/categories',
    categoryItems
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
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-sky-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium">Categories</span>
        </nav>

        {/* Page Header */}
        <div className="border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Calculator Categories
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            Select a domain below to browse dedicated calculators. We continuously expand each category with free mathematical and financial utilities.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categoriesWithCounts.map(({ category, count }) => (
            <CategoryCard key={category.slug} category={category} count={count} />
          ))}
        </div>
      </div>
    </>
  );
}
