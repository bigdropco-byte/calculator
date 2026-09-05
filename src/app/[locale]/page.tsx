import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Sparkles, FolderTree } from 'lucide-react';
import {
  getPopularCalculators,
  getRecentCalculatorsList,
  getActiveCategoriesWithCount,
} from '@/lib/calculatorRegistry';
import { CalculatorCard } from '@/components/directory/CalculatorCard';
import { CategoryCard } from '@/components/directory/CategoryCard';
import { RecentTray } from '@/components/directory/RecentTray';
import { HeroSearch } from '@/components/search/HeroSearch';
import { CreatorStoryCard } from '@/components/content/CreatorStoryCard';
import { HowItWorksSection } from '@/components/content/HowItWorksSection';
import { StudentRoadmapWidget } from '@/components/directory/StudentRoadmapWidget';
import {
  SITE_CONFIG,
  generateWebSiteSchema,
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
  const pageTitle = `${SITE_CONFIG.name} – ${ui.tagline}`;
  const canonicalUrl = getCanonicalUrl('/', locale as Locale);

  return {
    title: pageTitle,
    description: ui.description,
    alternates: getCanonicalAlternates('/', locale as Locale),
    openGraph: {
      title: pageTitle,
      description: ui.description,
      url: canonicalUrl,
      type: 'website',
      siteName: SITE_CONFIG.name,
      locale: locale,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title: pageTitle,
      description: ui.description,
      images: ['/opengraph-image'],
    },
  };
}

export default async function LocalizedHomePage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const ui = getUiTranslations(currentLocale);
  const popularCalculators = getPopularCalculators().slice(0, 6);
  const recentCalculators = getRecentCalculatorsList(4);
  const activeCategories = getActiveCategoriesWithCount();

  const websiteSchema = generateWebSiteSchema(currentLocale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className="space-y-12 sm:space-y-16">
        {/* Hero Section */}
        <section className="text-center pt-4 pb-2 sm:py-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{ui.studentBadge} {ui.studentNote}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight sm:leading-tight">
            {ui.tagline}
          </h1>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            {ui.description}
          </p>

          {/* Centered Hero Search Bar */}
          <div className="mt-6 sm:mt-8 max-w-2xl mx-auto">
            <HeroSearch />
          </div>

        </section>

        {/* Local History & Favorites Tray */}
        <RecentTray />

        {/* Popular Calculators Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {ui.popularTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {ui.popularSubtitle}
              </p>
            </div>
            <Link
              href={`${getLocalizedPath('/calculators/', currentLocale)}?sort=popular`}
              className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
            >
              <span>{ui.viewAllPopular}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {popularCalculators.map(calc => (
              <CalculatorCard key={calc.slug} calculator={calc} locale={currentLocale} />
            ))}
          </div>
        </section>

        {/* Browse by Category Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {ui.browseByCategory}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {ui.exploreCategories}
              </p>
            </div>
            <Link
              href={getLocalizedPath('/categories/', currentLocale)}
              className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
            >
              <span>{ui.viewAllCategories}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeCategories.map(({ category, count }) => (
              <CategoryCard
                key={category.slug}
                category={category}
                count={count}
                locale={currentLocale}
              />
            ))}
          </div>
        </section>

        {/* Recently Added Calculators */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {ui.recentlyAddedTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {ui.recentlyAddedSubtitle}
              </p>
            </div>
            <Link
              href={`${getLocalizedPath('/calculators/', currentLocale)}?sort=newest`}
              className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
            >
              <span>{ui.viewNewTools}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentCalculators.map(calc => (
              <CalculatorCard key={calc.slug} calculator={calc} locale={currentLocale} />
            ))}
          </div>
        </section>

        {/* How Calculat Works Visual Step-by-Step Guide */}
        <HowItWorksSection />

        {/* Value Proposition Grid */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-2xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-slate-900">{ui.whyCalculatTitle}</h2>
            <p className="text-slate-500 text-sm mt-1">
              {ui.whyCalculatSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 text-base">{ui.instantFastTitle}</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {ui.instantFastDesc}
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 text-base">{ui.privacyTitle}</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {ui.privacyDesc}
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                <FolderTree className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 text-base">{ui.directoryTitle}</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {ui.directoryDesc}
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 text-base">{ui.alwaysFreeTitle}</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {ui.alwaysFreeDesc}
              </p>
            </div>
          </div>
        </section>

        {/* Creator Story Card & Student Roadmap Widget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <CreatorStoryCard />
          <StudentRoadmapWidget />
        </div>
      </div>
    </>
  );
}
