'use client';

import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { CalculatorDefinition, CategorySlug } from '@/lib/types';
import { CATEGORIES } from '@/lib/categoryRegistry';
import { CalculatorCard } from './CalculatorCard';

interface DirectoryFilterProps {
  calculators: CalculatorDefinition[];
  initialCategory?: CategorySlug | 'all';
  initialSort?: 'popular' | 'alpha' | 'newest';
}

export const DirectoryFilter: React.FC<DirectoryFilterProps> = ({
  calculators,
  initialCategory = 'all',
  initialSort = 'popular',
}) => {
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
    return Object.values(CATEGORIES).filter(cat => (counts[cat.slug] || 0) > 0);
  }, [calculators]);

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
      list.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
    }

    return list;
  }, [calculators, searchQuery, selectedCategory, selectedLetter, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLetter(null);
    setSortBy('popular');
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter calculators by keyword..."
              className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Controls: Sort & View Mode */}
          <div className="flex items-center gap-2 justify-between sm:justify-start">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 focus:bg-white cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="alpha">A – Z Alphabetical</option>
                <option value="newest">Recently Added</option>
              </select>
            </div>

            <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-sky-600 shadow-2xs font-semibold'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title="Grid View"
                aria-label="Grid View"
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
                title="List View"
                aria-label="List View"
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
            All Categories ({calculators.length})
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
                onClick={() => setSelectedLetter(isSelected ? null : letter)}
                className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-sky-600'
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
              className="text-[11px] text-slate-400 hover:text-slate-600 ml-2 underline shrink-0"
            >
              Clear Letter
            </button>
          )}
        </div>
      </div>

      {/* Results Header Info */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-900">{filteredCalculators.length}</strong>{' '}
          calculator{filteredCalculators.length === 1 ? '' : 's'}
          {selectedCategory !== 'all' && ` in ${CATEGORIES[selectedCategory as CategorySlug]?.name || selectedCategory}`}
          {selectedLetter && ` starting with "${selectedLetter}"`}
        </span>
        {(searchQuery || selectedCategory !== 'all' || selectedLetter) && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-sky-600 hover:underline font-medium"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Calculator Grid / List */}
      {filteredCalculators.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
              : 'flex flex-col gap-3'
          }
        >
          {filteredCalculators.map(calc => (
            <CalculatorCard key={calc.slug} calculator={calc} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <p className="text-base font-semibold text-slate-800">No calculators found</p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            We couldn&apos;t find any tools matching your active filters. Try searching for another term or reset your filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-semibold hover:bg-sky-700 transition-colors"
          >
            Show All Calculators
          </button>
        </div>
      )}
    </div>
  );
};
