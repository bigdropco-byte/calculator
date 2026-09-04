import React from 'react';
import Link from 'next/link';
import { HelpCircle, ArrowRight, Home } from 'lucide-react';
import { getPopularCalculators } from '@/lib/calculatorRegistry';
import { CalculatorCard } from '@/components/directory/CalculatorCard';
import { HeroSearch } from '@/components/search/HeroSearch';

export default function NotFound() {
  const popular = getPopularCalculators().slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-12">
      <div className="text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
          <HelpCircle className="w-8 h-8" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Calculator Not Found
        </h1>

        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          The calculator you requested might have been renamed or does not exist yet. Try searching our directory below:
        </p>

        <div className="pt-2">
          <HeroSearch />
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
          >
            <Home className="w-3.5 h-3.5" /> Back to Homepage
          </Link>
        </div>
      </div>

      {/* Popular Fallback */}
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
          <h2 className="text-lg font-bold text-slate-900">Popular Calculators You Might Need</h2>
          <Link
            href="/calculators"
            className="text-xs font-semibold text-sky-600 hover:underline flex items-center gap-1"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popular.map(calc => (
            <CalculatorCard key={calc.slug} calculator={calc} />
          ))}
        </div>
      </div>
    </div>
  );
}
