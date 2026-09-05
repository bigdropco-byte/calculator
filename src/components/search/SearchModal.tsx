'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { searchCalculators } from '@/lib/calculatorSearch';
import { SearchResultItem } from '@/lib/types';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
}) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setResults(searchCalculators(initialQuery));
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Parent handles opening or we can dispatch an event
          window.dispatchEvent(new CustomEvent('open-calculat-search'));
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          navigate(results[selectedIndex].slug);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    const res = searchCalculators(val);
    setResults(res);
    setSelectedIndex(0);
  };

  const navigate = (slug: string) => {
    onClose();
    router.push(`/calculators/${slug}/`);
  };

  const quickPills = [
    { label: 'Percentage', query: 'percentage' },
    { label: 'Mortgage', query: 'mortgage' },
    { label: 'BMI', query: 'bmi' },
    { label: 'Age', query: 'age' },
    { label: 'Loan', query: 'loan' },
    { label: 'Tip', query: 'tip' },
    { label: 'Compound Interest', query: 'compound interest' },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Calculator Search"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => handleQueryChange(e.target.value)}
            placeholder="What do you want to calculate? (e.g. mortgage, percentage, bmi)"
            className="w-full text-base sm:text-lg text-slate-900 placeholder-slate-400 bg-transparent border-0 focus:outline-none focus:ring-0"
          />
          {query && (
            <button
              type="button"
              onClick={() => handleQueryChange('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 text-xs font-medium text-slate-500 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded border border-slate-200 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200/80 flex items-center gap-1.5 overflow-x-auto text-xs text-slate-500 no-scrollbar">
          <span className="shrink-0 flex items-center gap-1 font-medium text-slate-600">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" /> Popular:
          </span>
          {quickPills.map(pill => (
            <button
              key={pill.label}
              type="button"
              onClick={() => handleQueryChange(pill.query)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-white hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 border border-slate-200 font-medium text-slate-700 transition-colors"
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 divide-y divide-slate-100 flex-1">
          {results.length > 0 ? (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.slug}
                  onClick={() => navigate(item.slug)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-start justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'bg-sky-50/80 text-sky-950' : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-md shrink-0 mt-0.5 ${
                        isSelected ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <CategoryIcon name={item.icon} className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm sm:text-base truncate">
                          {item.name}
                        </span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          {item.categoryName}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {item.shortDescription}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 ml-3 flex items-center self-center text-slate-400">
                    {isSelected ? (
                      <span className="flex items-center text-xs text-sky-600 font-medium gap-1">
                        Select <CornerDownLeft className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 px-4 text-center">
              <p className="text-sm font-medium text-slate-700">No calculators found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for percentage, mortgage, age, or browse by category.
              </p>
            </div>
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px]">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px]">↵</kbd> to open
            </span>
          </div>
          <span>Local calculation • Privacy friendly</span>
        </div>
      </div>
    </div>
  );
};
