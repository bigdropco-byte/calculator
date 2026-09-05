'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { LOCALES, SUPPORTED_LOCALES, Locale, stripLocaleFromPath, getLocalizedPath } from '@/lib/i18n/config';

interface LanguageSwitcherProps {
  variant?: 'header' | 'footer' | 'inline';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'header',
  className = '',
}) => {
  const pathname = usePathname() || '/';
  const { locale: currentLocale } = stripLocaleFromPath(pathname);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = LOCALES[currentLocale] || LOCALES.en;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Footer inline list variant
  if (variant === 'footer') {
    return (
      <div className={`flex flex-wrap items-center gap-2 text-xs ${className}`}>
        <span className="flex items-center gap-1.5 text-slate-500 font-medium mr-1">
          <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Languages:</span>
        </span>
        {SUPPORTED_LOCALES.map(loc => {
          const info = LOCALES[loc];
          const isCurrent = loc === currentLocale;
          const targetUrl = getLocalizedPath(pathname, loc);

          return (
            <Link
              key={loc}
              href={targetUrl}
              hrefLang={loc}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                isCurrent
                  ? 'bg-sky-100 text-sky-800 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title={`${info.name} (${info.nativeName})`}
            >
              <span>{info.flag}</span>
              <span>{info.nativeName}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  // Header Dropdown variant
  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Select language. Current: ${current.nativeName}`}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium transition-colors shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline-block font-medium">{current.nativeName}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-1.5 w-48 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-50 animate-in fade-in-0 zoom-in-95 duration-100"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
            Select Language
          </div>
          {SUPPORTED_LOCALES.map(loc => {
            const info = LOCALES[loc];
            const isCurrent = loc === currentLocale;
            const targetUrl = getLocalizedPath(pathname, loc);

            return (
              <Link
                key={loc}
                href={targetUrl}
                hrefLang={loc}
                role="menuitem"
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                  isCurrent
                    ? 'bg-sky-50 text-sky-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base leading-none">{info.flag}</span>
                  <span>{info.nativeName}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({info.name})</span>
                </span>
                {isCurrent && <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
