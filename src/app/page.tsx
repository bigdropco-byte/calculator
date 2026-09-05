import React from 'react';
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
import { SITE_CONFIG } from '@/lib/seo';

export default function HomePage() {
  const popularCalculators = getPopularCalculators().slice(0, 6);
  const recentCalculators = getRecentCalculatorsList(4);
  const activeCategories = getActiveCategoriesWithCount();

  // Structured Data for WebSite with SearchAction and HowTo visual guide
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      description: SITE_CONFIG.description,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Use Calculat.dev Online Calculators',
      description:
        'A 6-step visual guide showing how to search or browse calculators, enter values, calculate instantly, view accurate results, and save or share calculations.',
      image: `${SITE_CONFIG.url}/how-calculat-works.jpg`,
      totalTime: 'PT30S',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Search or Browse',
          text: 'Find the calculator you need using search or explore categories & popular tools.',
          url: `${SITE_CONFIG.url}/#search`,
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Choose a Calculator',
          text: 'Select any calculator that matches your need. Each tool is designed to be simple and easy to use.',
          url: `${SITE_CONFIG.url}/calculators/`,
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Enter Your Values',
          text: 'Input the required numbers or details. Our calculators support real-time validation for accuracy.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Calculate Instantly',
          text: 'Click the calculate button and get instant, accurate results in a fraction of a second.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'View Results',
          text: 'See your results clearly displayed with explanations (when available) to help you understand better.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Use, Save & Share',
          text: 'Use the results, reset for new calculations, or share with others if needed.',
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-12 sm:space-y-16">
        {/* HERO SECTION */}
        <section className="text-center pt-6 sm:pt-10 pb-4 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clean, fast calculator directory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Online Calculators for Everything
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Find free calculators for math, finance, health, business, dates, conversions, and everyday calculations.
          </p>

          <div className="pt-4">
            <HeroSearch />
          </div>
        </section>

        {/* Recently Used & Favorited Tray (Client-side localStorage) */}
        <RecentTray />

        {/* POPULAR CALCULATORS SECTION */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Popular Calculators</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                The most frequently used tools in our directory
              </p>
            </div>
            <Link
              href="/calculators?sort=popular"
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition-colors"
            >
              View all popular <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {popularCalculators.map(calc => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        </section>

        {/* BROWSE BY CATEGORY SECTION */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Browse by Category</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Explore calculators organized across 16 primary categories
              </p>
            </div>
            <Link
              href="/categories"
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition-colors"
            >
              All 16 categories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {activeCategories.slice(0, 8).map(({ category, count }) => (
              <CategoryCard key={category.slug} category={category} count={count} />
            ))}
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <HowItWorksSection />

        {/* COMMUNITY VOTING ON NEXT TOOLS */}
        <section>
          <StudentRoadmapWidget />
        </section>

        {/* RECENTLY ADDED CALCULATORS SECTION */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Recently Added</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Latest calculation utilities added to Calculat.dev
              </p>
            </div>
            <Link
              href="/calculators?sort=newest"
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition-colors"
            >
              View new tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentCalculators.map(calc => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        </section>

        {/* CREATOR STORY CARD */}
        <section>
          <CreatorStoryCard />
        </section>

        {/* WHY CALCULAT SECTION */}
        <section className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-2xs">
          <div className="max-w-2xl mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Why Use Calculat?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Calculat is designed as a fast, distraction-free calculation engine and utility directory.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Instant &amp; Fast</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Calculations execute in real-time as you type, with zero server round-trips or loading delays.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">100% Privacy Friendly</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your financial, health, and personal numbers stay exclusively inside your browser. No data logging.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <FolderTree className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Directory First</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Organized logically by topic. Search by name, formula, keyword, or browse by domain category.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Always Free</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                No accounts, no paywalls, and no deceptive ads placed over inputs or results.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
