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
import { AdSlot } from '@/components/calculator/AdSlot';
import {
  SITE_CONFIG,
  generateCalculatorSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
  getCanonicalUrl,
  getCanonicalAlternates,
} from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const calculators = getAllPublishedCalculators();
  return calculators.map(c => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    return {
      title: 'Calculator Not Found',
    };
  }

  const categoryName = CATEGORIES[calculator.category]?.name || calculator.category;
  const canonicalUrl = getCanonicalUrl(`/calculators/${calculator.slug}`);

  return {
    title: calculator.seo.title,
    description: calculator.seo.metaDescription,
    keywords: calculator.keywords,
    alternates: getCanonicalAlternates(`/calculators/${calculator.slug}`),
    openGraph: {
      title: calculator.seo.title,
      description: calculator.seo.metaDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: SITE_CONFIG.name,
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

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }

  const category = CATEGORIES[calculator.category];

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Calculators', url: '/calculators/' },
    ...(category ? [{ name: category.shortName, url: `/categories/${category.slug}/` }] : []),
    { name: calculator.name, url: `/calculators/${calculator.slug}/` },
  ];

  const appSchema = generateCalculatorSchema(calculator);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const faqSchema = generateFaqSchema(calculator.editorial.faqs);

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
        <CalculatorShell calculator={calculator}>
          {/* Interactive Calculator Component (Above The Fold) */}
          <CalculatorRenderer slug={calculator.slug} />

          {/* Student Support & Bookmark Action */}
          <StudentSupportCard
            calculatorName={calculator.name}
            calculatorSlug={calculator.slug}
          />

          {/* Educational, Formula, Example, FAQ & Related Calculators */}
          <EditorialSection calculator={calculator} />
        </CalculatorShell>
      </article>
    </>
  );
}
