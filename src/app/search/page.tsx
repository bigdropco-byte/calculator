'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ArrowRight, CornerDownLeft } from 'lucide-react';
import { searchCalculators } from '@/lib/calculatorSearch';
import { SearchResultItem } from '@/lib/types';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

function SearchContent() {
  const searchParams = useSearchParams();
  const qParam = searchParams.get('q') || '';
  const [query, setQuery] = useState(qParam);
  const [results, setResults] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    setResults(searchCalculators(query, 20));
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold text-slate-900">Search Calculators</h1>
        <p className="text-xs text-slate-500 mt-1">
          Search across titles, categories, formulas, and keywords
        </p>

        <div className="mt-4 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search calculators (e.g. mortgage, percentage, bmi)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 shadow-2xs"
            autoFocus
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-xs text-slate-500">
          Found <strong className="text-slate-800">{results.length}</strong> matching tools
          {query && ` for "${query}"`}
        </div>

        {results.length > 0 ? (
          <div className="divide-y divide-slate-100 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            {results.map(item => (
              <Link
                key={item.slug}
                href={`/calculators/${item.slug}/`}
                className="flex items-center justify-between p-4 hover:bg-sky-50/50 transition-colors group"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="p-2 rounded-lg bg-sky-50 text-sky-700 group-hover:bg-sky-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                    <CategoryIcon name={item.icon} className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 group-hover:text-sky-700 transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {item.categoryName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                      {item.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 ml-4 flex items-center text-xs font-semibold text-sky-700 group-hover:translate-x-1 transition-transform">
                  Calculate <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <p className="text-base font-semibold text-slate-800">No calculators found</p>
            <p className="text-xs text-slate-500 mt-1">
              Try searching with a broader keyword or browse our categories.
            </p>
            <Link
              href="/calculators/"
              className="mt-4 inline-block px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-semibold hover:bg-sky-700 transition-colors"
            >
              Browse All Calculators
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto py-12 text-center text-sm text-slate-400">
          Loading search results...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
