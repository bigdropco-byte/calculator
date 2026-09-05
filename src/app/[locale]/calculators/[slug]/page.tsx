import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  getAllPublishedCalculators,
  getCalculatorBySlug,
} from '@/lib/calculatorRegistry';
import { CATEGORIES } from '@/lib/categoryRegistry';
import { CalculatorShell } from '@/components/calculator/CalculatorShell';
import { CalculatorRenderer } from '@/components/calculators/CalculatorRenderer';
import { StudentSupportCard } from '@/components/calculator/StudentSupportCard';
import { EditorialSection } from '@/components/calculator/EditorialSection';
import {
  SITE_CONFIG,
  generateCalculatorSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
  getCanonicalUrl,
  getCanonicalAlternates,
} from '@/lib/seo';
import { isValidLocale, NON_DEFAULT_LOCALES, Locale, getLocalizedPath } from '@/lib/i18n/config';
import { getLocalizedCalculator, getLocalizedCategory, getUiTranslations } from '@/lib/i18n/translate';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const calculators = getAllPublishedCalculators();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of NON_DEFAULT_LOCALES) {
    for (const c of calculators) {
      params.push({
        locale,
        slug: c.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const currentLocale = locale as Locale;
  const rawCalculator = getCalculatorBySlug(slug);

  if (!rawCalculator) {
    return {
      title: 'Calculator Not Found',
    };
  }

  const calculator = getLocalizedCalculator(rawCalculator, currentLocale);
  const rawCategory = CATEGORIES[calculator.category];
  const category = rawCategory ? getLocalizedCategory(rawCategory, currentLocale) : undefined;
  const categoryName = category?.name || calculator.category;
  const canonicalUrl = getCanonicalUrl(`/calculators/${calculator.slug}/`, currentLocale);

  return {
    title: calculator.seo.title,
    description: calculator.seo.metaDescription,
    keywords: calculator.keywords,
    alternates: getCanonicalAlternates(`/calculators/${calculator.slug}/`, currentLocale),
    openGraph: {
      title: calculator.seo.title,
      description: calculator.seo.metaDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: SITE_CONFIG.name,
      locale,
      images: [
        {
          url: `/calculators/${calculator.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${calculator.name} – Free Online Calculator`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title: calculator.seo.title,
      description: calculator.seo.metaDescription,
      images: [`/calculators/${calculator.slug}/opengraph-image`],
    },
    other: {
      'application-category': categoryName,
    },
  };
}

export default async function LocalizedCalculatorPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const rawCalculator = getCalculatorBySlug(slug);

  if (!rawCalculator) {
    notFound();
  }

  const calculator = getLocalizedCalculator(rawCalculator, currentLocale);
  const rawCategory = CATEGORIES[calculator.category];
  const category = rawCategory ? getLocalizedCategory(rawCategory, currentLocale) : undefined;
  const ui = getUiTranslations(currentLocale);

  const breadcrumbItems = [
    { name: ui.breadcrumbsHome, url: getLocalizedPath('/', currentLocale) },
    { name: ui.navCalculators, url: getLocalizedPath('/calculators/', currentLocale) },
    ...(category
      ? [
          {
            name: category.shortName,
            url: getLocalizedPath(`/categories/${category.slug}/`, currentLocale),
          },
        ]
      : []),
    {
      name: calculator.name,
      url: getLocalizedPath(`/calculators/${calculator.slug}/`, currentLocale),
    },
  ];

  const appSchema = generateCalculatorSchema(rawCalculator, currentLocale);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems, currentLocale);
  const faqSchema = generateFaqSchema(rawCalculator.editorial.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="max-w-4xl mx-auto">
        <CalculatorShell calculator={rawCalculator} locale={currentLocale}>
          {/* Interactive Calculator Component */}
          <CalculatorRenderer slug={calculator.slug} />

          {/* Student Support & Bookmark Action */}
          <StudentSupportCard
            calculatorName={calculator.name}
            calculatorSlug={calculator.slug}
          />

          {/* Educational, Formula, Example, FAQ & Related Calculators */}
          <EditorialSection calculator={rawCalculator} locale={currentLocale} />
        </CalculatorShell>
      </article>
    </>
  );
}
