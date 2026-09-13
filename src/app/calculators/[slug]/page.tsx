import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  getAllPublishedCalculators,
  getCalculatorBySlug,
} from '@/lib/calculatorRegistry';
import { CATEGORIES } from '@/lib/categoryRegistry';
import { CalculatorShell } from '@/components/calculator/CalculatorShell';
import { CalculatorRenderer } from '@/components/calculators/CalculatorRenderer';
import { CalculatorSkeleton } from '@/components/calculator/CalculatorSkeleton';
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
      {/* 1. WebApplication Schema (Interactive Tool Rich Results) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(appSchema),
        }}
      />

      {/* 2. BreadcrumbList Schema (Hierarchy & Navigation) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* 3. FAQPage Schema (Google FAQ Rich Snippets) */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <article className="max-w-4xl mx-auto">
        <CalculatorShell calculator={calculator}>
          {/* Interactive Calculator Component (Above The Fold) */}
          <Suspense fallback={<CalculatorSkeleton />}>
            <CalculatorRenderer slug={calculator.slug} />
          </Suspense>

          {/* HTML Examples Table (Percentage Increase Examples & Quick Reference) */}
          {calculator.slug === 'percentage-increase-calculator' && (
            <div className="my-8 overflow-x-auto">
              <h2 className="text-xl font-bold mb-4">Percentage Increase Examples & Quick Reference</h2>
              <table className="min-w-full border-collapse border border-gray-200 text-left text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-200 px-4 py-2">Original Value</th>
                    <th className="border border-gray-200 px-4 py-2">New Value</th>
                    <th className="border border-gray-200 px-4 py-2">Formula Applied</th>
                    <th className="border border-gray-200 px-4 py-2">Percentage Increase</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">$50</td>
                    <td className="border border-gray-200 px-4 py-2">$75</td>
                    <td className="border border-gray-200 px-4 py-2">((75 - 50) / 50) × 100</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold text-green-600">+50%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">80</td>
                    <td className="border border-gray-200 px-4 py-2">100</td>
                    <td className="border border-gray-200 px-4 py-2">((100 - 80) / 80) × 100</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold text-green-600">+25%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">$200</td>
                    <td className="border border-gray-200 px-4 py-2">$250</td>
                    <td className="border border-gray-200 px-4 py-2">((250 - 200) / 200) × 100</td>
                    <td className="border border-gray-200 px-4 py-2 font-semibold text-green-600">+25%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

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
