'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Star, Share2, ShieldCheck, Check } from 'lucide-react';
import { CalculatorDefinition } from '@/lib/types';
import { CATEGORIES } from '@/lib/categoryRegistry';
import { addRecentCalculator, isFavoriteCalculator, toggleFavoriteCalculator } from '@/lib/storage';

interface CalculatorShellProps {
  calculator: CalculatorDefinition;
  children: React.ReactNode;
}

export const CalculatorShell: React.FC<CalculatorShellProps> = ({ calculator, children }) => {
  const category = CATEGORIES[calculator.category];
  const [isFav, setIsFav] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    // Record visit in local browser history
    addRecentCalculator(calculator.slug);
    setIsFav(isFavoriteCalculator(calculator.slug));
  }, [calculator.slug]);

  const handleToggleFav = () => {
    const next = toggleFavoriteCalculator(calculator.slug);
    setIsFav(next);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${calculator.name} – Calculat.dev`,
          text: calculator.shortDescription,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  return (
    <div className="w-full">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-sky-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <Link href="/calculators" className="hover:text-sky-600 transition-colors">
          Calculators
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        {category && (
          <>
            <Link href={`/categories/${category.slug}`} className="hover:text-sky-600 transition-colors">
              {category.shortName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </>
        )}
        <span className="text-slate-800 font-medium truncate">{calculator.name}</span>
      </nav>

      {/* Header Info & Actions */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
              {category?.name || calculator.category}
            </span>
            {calculator.popular && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                Popular Tool
              </span>
            )}
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Runs Locally
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {calculator.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
            {calculator.shortDescription}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0 self-start">
          <button
            type="button"
            onClick={handleToggleFav}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              isFav
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title={isFav ? 'Remove from favorites' : 'Save to favorites'}
            aria-label={isFav ? 'Remove from favorites' : 'Save to favorites'}
          >
            <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
            <span>{isFav ? 'Saved' : 'Favorite'}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-600 transition-colors"
            title="Share this calculator"
            aria-label="Share this calculator"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Calculator Interactive Area */}
      <div className="mb-12">{children}</div>
    </div>
  );
};
