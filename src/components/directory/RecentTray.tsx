'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { History, Star, X } from 'lucide-react';
import { getRecentCalculators, clearRecentCalculators, getFavoriteCalculators } from '@/lib/storage';
import { getCalculatorBySlug } from '@/lib/calculatorRegistry';
import { CalculatorDefinition } from '@/lib/types';

export const RecentTray: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [recents, setRecents] = useState<CalculatorDefinition[]>([]);
  const [favorites, setFavorites] = useState<CalculatorDefinition[]>([]);

  useEffect(() => {
    setMounted(true);
    const recentItems = getRecentCalculators();
    const favSlugs = getFavoriteCalculators();

    const loadedRecents = recentItems
      .map(item => getCalculatorBySlug(item.slug))
      .filter((c): c is CalculatorDefinition => Boolean(c));

    const loadedFavs = favSlugs
      .map(slug => getCalculatorBySlug(slug))
      .filter((c): c is CalculatorDefinition => Boolean(c));

    setRecents(loadedRecents);
    setFavorites(loadedFavs);
  }, []);

  if (!mounted || (recents.length === 0 && favorites.length === 0)) {
    return null;
  }

  const handleClear = () => {
    clearRecentCalculators();
    setRecents([]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3.5 mb-6 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
          {favorites.length > 0 && (
            <div className="flex items-center gap-1.5 shrink-0 border-r border-slate-200 pr-3 mr-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-xs font-semibold text-slate-700">Favorites:</span>
              {favorites.map(c => (
                <Link
                  key={c.slug}
                  href={`/calculators/${c.slug}/`}
                  className="px-2 py-0.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-medium transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          )}

          {recents.length > 0 && (
            <div className="flex items-center gap-1.5 shrink-0">
              <History className="w-3.5 h-3.5 text-sky-600" />
              <span className="text-xs font-semibold text-slate-700">Recently Used:</span>
              {recents.slice(0, 5).map(c => (
                <Link
                  key={c.slug}
                  href={`/calculators/${c.slug}/`}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 border border-slate-200 text-xs font-medium transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {recents.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1 shrink-0 self-end sm:self-auto"
            title="Clear recently used history"
          >
            <X className="w-3 h-3" /> Clear History
          </button>
        )}
      </div>
    </div>
  );
};
