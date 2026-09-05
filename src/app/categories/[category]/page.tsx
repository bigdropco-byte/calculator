import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowRight, HelpCircle } from 'lucide-react';
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

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map(cat => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  const calculators = getCalculatorsByCategory(category.slug);
  const hasTools = calculators.length > 0;
  const canonicalUrl = getCanonicalUrl(`/categories/${category.slug}`);

  return {
    title: `${category.name} – Free Online ${category.shortName} Calculators`,
    description: category.description,
    alternates: getCanonicalAlternates(`/categories/${category.slug}`),
    openGraph: {
      title: `${category.name} – Free Online ${category.shortName} Calculators`,
      description: category.description,
      url: canonicalUrl,
      type: 'website',
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title: `${category.name} – Free Online Calculators`,
      description: category.description,
    },
    robots: {
      // Do not index empty category pages
      index: hasTools,
      follow: true,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const calculators = getCalculatorsByCategory(category.slug);
  const hasTools = calculators.length > 0;
  const allCategories = getAllCategories().filter(c => c.slug !== category.slug);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Categories', url: '/categories/' },
    { name: category.name, url: `/categories/${category.slug}/` },
  ];

  const collectionItems = calculators.map(c => ({
    name: c.name,
    url: `/calculators/${c.slug}/`,
    description: c.shortDescription,
  }));

  const collectionSchema = generateCollectionPageSchema(
    category.name,
    category.description,
    `/categories/${category.slug}/`,
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
      {hasTools && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(collectionSchema),
          }}
        />
      )}

      <div className="space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-sky-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/categories/" className="hover:text-sky-600 transition-colors">
            Categories
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-medium">{category.name}</span>
        </nav>

        {/* Category Header Hero */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-sky-50 text-sky-600 shrink-0">
              <CategoryIcon name={category.icon} className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {category.name}
              </h1>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-2xl">
                {category.description}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-sky-700">
                <span>
                  {calculators.length} published tool{calculators.length === 1 ? '' : 's'} in this collection
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content / Directory */}
        {hasTools ? (
          <div className="space-y-8">
            <DirectoryFilter
              calculators={calculators}
              initialCategory={category.slug as CategorySlug}
              initialSort="popular"
            />

            {/* Category FAQ */}
            <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sky-600" />
                Frequently Asked Questions about {category.shortName} Calculators
              </h2>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Are the calculators in this category free to use?
                  </h3>
                  <p className="text-slate-600 mt-1">
                    Yes. All {category.name.toLowerCase()} on Calculat.dev are 100% free with no account registration or limits.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Are my calculation inputs saved on a database?
                  </h3>
                  <p className="text-slate-600 mt-1">
                    No. Every calculation executes client-side directly in your browser. No personal or numeric inputs are recorded or transmitted to any server.
                  </p>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <CategoryIcon name={category.icon} className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">More Calculators Coming Soon</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                We are actively developing new {category.name.toLowerCase()}. In the meantime, you can explore other active categories or browse all available calculators.
              </p>
            </div>
            <Link
              href="/calculators/"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-semibold hover:bg-sky-700 transition-colors"
            >
              Browse All Calculators <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Related Categories */}
        <section className="pt-6 border-t border-slate-200">
          <h2 className="text-base font-bold text-slate-900 mb-4">Explore Other Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {allCategories.slice(0, 4).map(otherCat => (
              <CategoryCard key={otherCat.slug} category={otherCat} count={getCalculatorsByCategory(otherCat.slug).length} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
