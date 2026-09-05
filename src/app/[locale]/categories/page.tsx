import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getActiveCategoriesWithCount } from '@/lib/calculatorRegistry';
import { CategoryCard } from '@/components/directory/CategoryCard';
import {
  SITE_CONFIG,
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  getCanonicalUrl,
  getCanonicalAlternates,
} from '@/lib/seo';
import { isValidLocale, NON_DEFAULT_LOCALES, Locale, getLocalizedPath } from '@/lib/i18n/config';
import { getLocalizedCategory, getUiTranslations } from '@/lib/i18n/translate';

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const currentLocale = locale as Locale;
  const ui = getUiTranslations(currentLocale);
  const title = `${ui.navCategories} – ${ui.browseByCategory}`;
  const description = ui.exploreCategories;
  const canonicalUrl = getCanonicalUrl('/categories/', currentLocale);

  return {
    title,
    description,
    alternates: getCanonicalAlternates('/categories/', currentLocale),
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: SITE_CONFIG.name,
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
    },
  };
}

export default async function LocalizedCategoriesPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const ui = getUiTranslations(currentLocale);
  const categoriesWithCounts = getActiveCategoriesWithCount();

  const breadcrumbs = [
    { name: ui.breadcrumbsHome, url: getLocalizedPath('/', currentLocale) },
    { name: ui.navCategories, url: getLocalizedPath('/categories/', currentLocale) },
  ];

  const categoryItems = categoriesWithCounts.map(({ category, count }) => {
    const locCat = getLocalizedCategory(category, currentLocale);
    return {
      name: locCat.name,
      url: getLocalizedPath(`/categories/${category.slug}/`, currentLocale),
      description: `${locCat.description} (${count})`,
    };
  });

  const collectionSchema = generateCollectionPageSchema(
    ui.navCategories,
    ui.exploreCategories,
    '/categories/',
    categoryItems,
    currentLocale
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs, currentLocale)),
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
          <Link href={getLocalizedPath('/', currentLocale)} className="hover:text-sky-600 transition-colors">
            {ui.breadcrumbsHome}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium">{ui.navCategories}</span>
        </nav>

        {/* Page Header */}
        <div className="border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {ui.navCategories}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            {ui.exploreCategories}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categoriesWithCounts.map(({ category, count }) => (
            <CategoryCard
              key={category.slug}
              category={category}
              count={count}
              locale={currentLocale}
            />
          ))}
        </div>
      </div>
    </>
  );
}
