'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { SearchModal } from './SearchModal';
import { stripLocaleFromPath, getLocalizedPath } from '@/lib/i18n/config';
import { getUiTranslations, getLocalizedCalculator } from '@/lib/i18n/translate';
import { getCalculatorBySlug } from '@/lib/calculatorRegistry';

export const HeroSearch: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const { locale } = stripLocaleFromPath(pathname);
  const ui = getUiTranslations(locale);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialSearch, setInitialSearch] = useState('');

  const exampleSlugs = [
    'percentage-calculator',
    'age-calculator',
    'bmi-calculator',
    'mortgage-calculator',
    'loan-calculator',
    'tip-calculator',
    'compound-interest-calculator',
  ];

  const examples = exampleSlugs.map(slug => {
    const calc = getCalculatorBySlug(slug);
    if (!calc) return { label: slug, slug, query: slug };
    const localized = getLocalizedCalculator(calc, locale);
    // Shorten name if needed for compact pills
    const shortLabel = localized.name.replace(/\s*(Calculator|कैलकुलेटर|Calculadora de|Calculateur de|Rechner|حاسبة)$/i, '').trim();
    return {
      label: shortLabel || localized.name,
      slug,
      query: localized.name,
    };
  });

  const handleOpenSearch = (q: string = '') => {
    setInitialSearch(q);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Large Hero Search Input */}
      <div
        onClick={() => handleOpenSearch()}
        className="group relative flex items-center bg-white border-2 border-slate-200 hover:border-sky-500 rounded-2xl p-2 sm:p-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
      >
        <div className="p-2 sm:p-2.5 text-slate-400 group-hover:text-sky-600 transition-colors">
          <Search className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <input
          type="text"
          readOnly
          placeholder={ui.searchPlaceholder}
          className="w-full text-base sm:text-lg text-slate-900 placeholder-slate-400 bg-transparent border-0 focus:outline-none cursor-pointer"
        />
        <span className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-semibold text-slate-600 border border-slate-200 shrink-0">
          {ui.pressK}
        </span>
      </div>

      {/* Examples underneath */}
      <div className="mt-3.5 flex items-center justify-center gap-1.5 flex-wrap text-xs text-slate-500">
        <span className="font-semibold text-slate-600">{ui.sortPopular}:</span>
        {examples.map((item, index) => (
          <React.Fragment key={item.slug}>
            <button
              type="button"
              onClick={() => router.push(getLocalizedPath(`/calculators/${item.slug}/`, locale))}
              className="hover:text-sky-600 hover:underline transition-colors font-medium text-slate-700"
            >
              {item.label}
            </button>
            {index < examples.length - 1 && <span className="text-slate-300">·</span>}
          </React.Fragment>
        ))}
      </div>

      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialQuery={initialSearch}
      />
    </div>
  );
};
