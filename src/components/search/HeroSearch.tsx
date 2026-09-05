'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { SearchModal } from './SearchModal';

export const HeroSearch: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialSearch, setInitialSearch] = useState('');

  const examples = [
    { label: 'Percentage', slug: 'percentage-calculator', query: 'percentage' },
    { label: 'Age', slug: 'age-calculator', query: 'age' },
    { label: 'BMI', slug: 'bmi-calculator', query: 'bmi' },
    { label: 'Mortgage', slug: 'mortgage-calculator', query: 'mortgage' },
    { label: 'Loan', slug: 'loan-calculator', query: 'loan' },
    { label: 'Tip', slug: 'tip-calculator', query: 'tip' },
    { label: 'Compound Interest', slug: 'compound-interest-calculator', query: 'compound interest' },
  ];

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
          placeholder="What do you want to calculate?"
          className="w-full text-base sm:text-lg text-slate-900 placeholder-slate-400 bg-transparent border-0 focus:outline-none cursor-pointer"
        />
        <span className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-semibold text-slate-600 border border-slate-200 shrink-0">
          Press ⌘K
        </span>
      </div>

      {/* Examples underneath */}
      <div className="mt-3.5 flex items-center justify-center gap-1.5 flex-wrap text-xs text-slate-500">
        <span className="font-semibold text-slate-600">Popular:</span>
        {examples.map((item, index) => (
          <React.Fragment key={item.slug}>
            <button
              type="button"
              onClick={() => router.push(`/calculators/${item.slug}/`)}
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
