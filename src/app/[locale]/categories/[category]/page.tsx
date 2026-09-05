import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { getAllCategories, getCategoryBySlug } from '@/lib/categoryRegistry';
import { getCalculatorsByCategory } from '@/lib/calculatorRegistry';
import { CategorySlug } from '@/lib/types';
import { DirectoryFilter } from '@/components/directory/DirectoryFilter';
import { CategoryCard } from '@/components/directory/CategoryCard';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import {
  SITE_CONFIG,
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  getCanonicalUrl,
  getCanonicalAlternates,
} from '@/lib/seo';
import { isValidLocale, NON_DEFAULT_LOCALES, Locale, getLocalizedPath } from '@/lib/i18n/config';
import { getLocalizedCalculator, getLocalizedCategory, getUiTranslations } from '@/lib/i18n/translate';

interface Props {
  params: Promise<{ locale: string; category: string }>;
}

export function generateStaticParams() {
  const categories = getAllCategories();
  const params: { locale: string; category: string }[] = [];

  for (const locale of NON_DEFAULT_LOCALES) {
    for (const cat of categories) {
      params.push({
        locale,
        category: cat.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category: categorySlug } = await params;
  if (!isValidLocale(locale)) return {};

  const currentLocale = locale as Locale;
  const rawCategory = getCategoryBySlug(categorySlug);

  if (!rawCategory) {
    return { title: 'Category Not Found' };
  }

  const category = getLocalizedCategory(rawCategory, currentLocale);
  const ui = getUiTranslations(currentLocale);
  const calculators = getCalculatorsByCategory(category.slug);
  const hasTools = calculators.length > 0;
  const canonicalUrl = getCanonicalUrl(`/categories/${category.slug}/`, currentLocale);

  const pageTitle =
    currentLocale === 'en'
      ? `${category.name} – Free Online ${category.shortName} Calculators`
      : `${category.name} – ${ui.calculate}`;
  const pageDescription = `${category.description} ${ui.description}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: getCanonicalAlternates(`/categories/${category.slug}/`, currentLocale),
    openGraph: {
      title: `${pageTitle} | ${SITE_CONFIG.name}`,
      description: pageDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: SITE_CONFIG.name,
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title: `${pageTitle} | ${SITE_CONFIG.name}`,
      description: pageDescription,
    },
    robots: {
      index: hasTools,
      follow: true,
    },
  };
}

export default async function LocalizedCategoryPage({ params }: Props) {
  const { locale, category: categorySlug } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const rawCategory = getCategoryBySlug(categorySlug);

  if (!rawCategory) {
    notFound();
  }

  const category = getLocalizedCategory(rawCategory, currentLocale);
  const ui = getUiTranslations(currentLocale);
  const calculators = getCalculatorsByCategory(category.slug);
  const hasTools = calculators.length > 0;
  const allCategories = getAllCategories().filter(c => c.slug !== category.slug);

  const breadcrumbs = [
    { name: ui.breadcrumbsHome, url: getLocalizedPath('/', currentLocale) },
    { name: ui.navCategories, url: getLocalizedPath('/categories/', currentLocale) },
    { name: category.name, url: getLocalizedPath(`/categories/${category.slug}/`, currentLocale) },
  ];

  const collectionItems = calculators.map(c => {
    const locCalc = getLocalizedCalculator(c, currentLocale);
    return {
      name: locCalc.name,
      url: getLocalizedPath(`/calculators/${c.slug}/`, currentLocale),
      description: locCalc.shortDescription,
    };
  });

  const collectionSchema = generateCollectionPageSchema(
    category.name,
    category.description,
    `/categories/${category.slug}/`,
    collectionItems,
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

      <div className="space-y-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
          <Link href={getLocalizedPath('/', currentLocale)} className="hover:text-sky-600 transition-colors">
            {ui.breadcrumbsHome}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href={getLocalizedPath('/categories/', currentLocale)} className="hover:text-sky-600 transition-colors">
            {ui.navCategories}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-800 font-medium truncate">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 shrink-0">
              <CategoryIcon name={category.icon} className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  {ui.toolsCount(calculators.length)}
                </span>
                <span className="text-xs text-slate-400">{ui.alwaysFreeTitle}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {category.name}
              </h1>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* Category Calculators Directory */}
        {hasTools ? (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                {category.shortName} {ui.navCalculators}
              </h2>
              <p className="text-xs text-slate-500">
                {ui.directorySubheader}
              </p>
            </div>
            <DirectoryFilter
              calculators={calculators}
              initialCategory={category.slug as CategorySlug}
              initialSort="popular"
              locale={currentLocale}
            />
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-xl p-8">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
              <CategoryIcon name={category.icon} className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-800">
              {category.name} – {ui.comingSoon}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We are actively developing calculators for this category. Check back soon or suggest a tool!
            </p>
            <Link
              href={getLocalizedPath('/contact/', currentLocale)}
              className="inline-block mt-4 px-4 py-2 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700 transition-colors shadow-2xs"
            >
              {ui.suggestTool}
            </Link>
          </div>
        )}

        {/* Other Categories */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">{ui.exploreCategories}</h2>
            <Link
              href={getLocalizedPath('/categories/', currentLocale)}
              className="text-xs font-semibold text-sky-600 hover:underline flex items-center gap-1"
            >
              <span>{ui.viewAllCategories}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {allCategories.slice(0, 5).map(cat => {
              const locCat = getLocalizedCategory(cat, currentLocale);
              return (
                <Link
                  key={cat.slug}
                  href={getLocalizedPath(`/categories/${cat.slug}/`, currentLocale)}
                  className="p-3 bg-white border border-slate-200 rounded-lg hover:border-sky-400 hover:shadow-2xs transition-all text-center group"
                >
                  <CategoryIcon
                    name={cat.icon}
                    className="w-5 h-5 mx-auto text-slate-500 group-hover:text-sky-600 mb-1.5 transition-colors"
                  />
                  <p className="text-xs font-semibold text-slate-800 group-hover:text-sky-600 truncate">
                    {locCat.shortName}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
