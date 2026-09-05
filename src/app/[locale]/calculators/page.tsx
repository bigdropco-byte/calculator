import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
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
import { isValidLocale, NON_DEFAULT_LOCALES, Locale, getLocalizedPath } from '@/lib/i18n/config';
import { getUiTranslations } from '@/lib/i18n/translate';

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return NON_DEFAULT_LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const ui = getUiTranslations(locale as Locale);
  const title = `${ui.directoryHeader} – ${SITE_CONFIG.name}`;
  const description = ui.directorySubheader;
  const canonicalUrl = getCanonicalUrl('/calculators/', locale as Locale);

  return {
    title,
    description,
    alternates: getCanonicalAlternates('/calculators/', locale as Locale),
    openGraph: {
      title,
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
      title,
      description,
    },
  };
}

export default async function LocalizedCalculatorsPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const ui = getUiTranslations(currentLocale);
  const allCalculators = getAllPublishedCalculators();

  const breadcrumbs = [
    { name: ui.breadcrumbsHome, url: getLocalizedPath('/', currentLocale) },
    { name: ui.navCalculators, url: getLocalizedPath('/calculators/', currentLocale) },
  ];

  const collectionItems = allCalculators.map(calc => ({
    name: calc.name,
    url: getLocalizedPath(`/calculators/${calc.slug}/`, currentLocale),
    description: calc.shortDescription,
  }));

  const collectionSchema = generateCollectionPageSchema(
    ui.directoryHeader,
    ui.directorySubheader,
    '/calculators/',
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

      <div className="space-y-6">
        {/* Page Header */}
        <div className="border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {ui.directoryHeader}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
            {ui.directorySubheader}
          </p>
        </div>

        {/* Recently used / favorites */}
        <RecentTray />

        {/* Filter and Directory Grid */}
        <DirectoryFilter
          calculators={allCalculators}
          initialCategory="all"
          initialSort="popular"
          locale={currentLocale}
        />
      </div>
    </>
  );
}
