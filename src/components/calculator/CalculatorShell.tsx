'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Star, Share2, ShieldCheck, Check } from 'lucide-react';
import { CalculatorDefinition } from '@/lib/types';
import { CATEGORIES } from '@/lib/categoryRegistry';
import { addRecentCalculator, isFavoriteCalculator, toggleFavoriteCalculator } from '@/lib/storage';
import { trackFavorite, trackShare } from '@/lib/analytics';
import { DEFAULT_LOCALE, getLocalizedPath, Locale, stripLocaleFromPath } from '@/lib/i18n/config';
import { getLocalizedCalculator, getLocalizedCategory, getUiTranslations } from '@/lib/i18n/translate';

interface CalculatorShellProps {
  calculator: CalculatorDefinition;
  children: React.ReactNode;
  locale?: Locale;
}

export const CalculatorShell: React.FC<CalculatorShellProps> = ({
  calculator,
  children,
  locale: propLocale,
}) => {
  const pathname = usePathname() || '/';
  const { locale: detectedLocale } = stripLocaleFromPath(pathname);
  const locale = propLocale || detectedLocale || DEFAULT_LOCALE;

  const ui = getUiTranslations(locale);
  const localizedCalc = getLocalizedCalculator(calculator, locale);
  const rawCat = CATEGORIES[calculator.category];
  const category = rawCat ? getLocalizedCategory(rawCat, locale) : undefined;

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
    trackFavorite(calculator.slug, next ? 'add' : 'remove');
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${localizedCalc.name} – Calculat.dev`,
          text: localizedCalc.shortDescription,
          url,
        });
        trackShare(calculator.slug, 'web_share');
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopiedShare(true);
      trackShare(calculator.slug, 'clipboard');
      setTimeout(() => setCopiedShare(false), 2000);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  return (
    <div className="w-full">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
        <Link href={getLocalizedPath('/', locale)} className="hover:text-sky-600 transition-colors">
          {ui.breadcrumbsHome}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <Link href={getLocalizedPath('/calculators/', locale)} className="hover:text-sky-600 transition-colors">
          {ui.navCalculators}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        {category && (
          <>
            <Link href={getLocalizedPath(`/categories/${category.slug}/`, locale)} className="hover:text-sky-600 transition-colors">
              {category.shortName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </>
        )}
        <span className="text-slate-800 font-medium truncate">{localizedCalc.name}</span>
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
                {ui.sortPopular}
              </span>
            )}
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Runs Locally
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {localizedCalc.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
            {localizedCalc.shortDescription}
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
            title={isFav ? ui.savedToFavorites : ui.addToFavorites}
            aria-label={isFav ? ui.savedToFavorites : ui.addToFavorites}
          >
            <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
            <span>{isFav ? ui.savedToFavorites : ui.addToFavorites}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-600 transition-colors"
            title={ui.share}
            aria-label={ui.share}
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">{ui.shared}</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{ui.share}</span>
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
