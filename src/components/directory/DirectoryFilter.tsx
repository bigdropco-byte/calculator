'use client';

import React, { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Search, LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { CalculatorDefinition, CategorySlug } from '@/lib/types';
import { CATEGORIES } from '@/lib/categoryRegistry';
import { CalculatorCard } from './CalculatorCard';
import { DEFAULT_LOCALE, Locale, stripLocaleFromPath } from '@/lib/i18n/config';
import { getLocalizedCategory, getUiTranslations } from '@/lib/i18n/translate';

interface DirectoryFilterProps {
  calculators: CalculatorDefinition[];
  initialCategory?: CategorySlug | 'all';
  initialSort?: 'popular' | 'alpha' | 'newest';
  locale?: Locale;
}

export const DirectoryFilter: React.FC<DirectoryFilterProps> = ({
  calculators,
  initialCategory = 'all',
  initialSort = 'popular',
  locale: propLocale,
}) => {
  const pathname = usePathname() || '/';
  const { locale: detectedLocale } = stripLocaleFromPath(pathname);
  const locale = propLocale || detectedLocale || DEFAULT_LOCALE;
  const ui = getUiTranslations(locale);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'popular' | 'alpha' | 'newest'>(initialSort);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // Available categories that have at least one calculator
  const activeCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const calc of calculators) {
      counts[calc.category] = (counts[calc.category] || 0) + 1;
      if (calc.secondaryCategories) {
        for (const sec of calc.secondaryCategories) {
          counts[sec] = (counts[sec] || 0) + 1;
        }
      }
    }
    return Object.values(CATEGORIES)
      .filter(cat => (counts[cat.slug] || 0) > 0)
      .map(cat => getLocalizedCategory(cat, locale));
  }, [calculators, locale]);

  // Letters available in the dataset
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    calculators.forEach(c => {
      const first = c.name.charAt(0).toUpperCase();
      if (/[A-Z]/.test(first)) letters.add(first);
    });
    return Array.from(letters).sort();
  }, [calculators]);

  // Filter and sort calculators
  const filteredCalculators = useMemo(() => {
    let list = [...calculators];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q) ||
          c.keywords.some(k => k.toLowerCase().includes(q)) ||
          c.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter(
        c =>
          c.category === selectedCategory ||
          c.secondaryCategories?.includes(selectedCategory as CategorySlug)
      );
    }

    // Letter jump filter
    if (selectedLetter) {
      list = list.filter(c => c.name.charAt(0).toUpperCase() === selectedLetter);
    }

    // Sort
    if (sortBy === 'popular') {
      list.sort((a, b) => {
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        return a.name.localeCompare(b.name);
      });
    } else if (sortBy === 'alpha') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'newest') {
      list.sort((a, b) => b.addedDate.localeCompare(a.addedDate));
    }

    return list;
  }, [calculators, searchQuery, selectedCategory, selectedLetter, sortBy]);

  return (
    <div className="space-y-6">
      {/* Control Bar: Search, Category, Sort, View */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* In-directory search input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setSelectedLetter(null);
              }}
              placeholder={ui.searchInDirectory}
              className="w-full pl-9 pr-8 py-2 rounded-lg border border-slate-200 text-sm focus:outline-hidden focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 bg-slate-50/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear filter"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right Controls: Sort & View Toggle */}
          <div className="flex items-center gap-2 justify-between sm:justify-end">
            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="hidden sm:inline font-medium">{ui.sortBy}</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'popular' | 'alpha' | 'newest')}
                className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-xs font-medium text-slate-700 focus:outline-hidden focus:border-sky-500 cursor-pointer"
              >
                <option value="popular">{ui.sortPopular}</option>
                <option value="alpha">{ui.sortAlpha}</option>
                <option value="newest">{ui.sortNewest}</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-sky-600 shadow-2xs font-semibold'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title={ui.viewGrid}
                aria-label={ui.viewGrid}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-sky-600 shadow-2xs font-semibold'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title={ui.viewList}
                aria-label={ui.viewList}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedLetter(null);
            }}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-sky-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 border border-slate-200'
            }`}
          >
            {ui.allCategoriesFilter} ({calculators.length})
          </button>
          {activeCategories.map(cat => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.slug);
                setSelectedLetter(null);
              }}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors shrink-0 ${
                selectedCategory === cat.slug
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              {cat.shortName}
            </button>
          ))}
        </div>

        {/* A-Z Alphabetical Jump Links */}
        <div className="flex items-center gap-1 pt-2 border-t border-slate-100 overflow-x-auto text-xs">
          <span className="text-slate-400 text-[11px] font-semibold mr-1 shrink-0 uppercase tracking-wider">
            A–Z:
          </span>
          {availableLetters.map(letter => {
            const isSelected = selectedLetter === letter;
            return (
              <button
                key={letter}
                type="button"
                onClick={() => {
                  setSelectedLetter(isSelected ? null : letter);
                  setSearchQuery('');
                }}
                className={`w-6 h-6 rounded flex items-center justify-center font-medium transition-colors ${
                  isSelected
                    ? 'bg-sky-600 text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {letter}
              </button>
            );
          })}
          {selectedLetter && (
            <button
              type="button"
              onClick={() => setSelectedLetter(null)}
              className="text-slate-400 hover:text-slate-600 text-[11px] ml-1 underline"
            >
              {ui.clear}
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong>{filteredCalculators.length}</strong> of {calculators.length} tools
        </span>
        {(searchQuery || selectedCategory !== 'all' || selectedLetter) && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLetter(null);
            }}
            className="text-sky-600 hover:underline font-medium"
          >
            {ui.reset}
          </button>
        )}
      </div>

      {/* Calculator Grid or List */}
      {filteredCalculators.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredCalculators.map(calc => (
              <CalculatorCard key={calc.slug} calculator={calc} viewMode="grid" locale={locale} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCalculators.map(calc => (
              <CalculatorCard key={calc.slug} calculator={calc} viewMode="list" locale={locale} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-xl p-8">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-800">{ui.noResults}</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {ui.searchSuggestions}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLetter(null);
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-sky-50 text-sky-700 text-xs font-semibold hover:bg-sky-100 transition-colors"
          >
            {ui.clear}
          </button>
        </div>
      )}
    </div>
  );
};
