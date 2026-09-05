'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, ChevronDown, Check, Search, X } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const current = LOCALES[currentLocale] || LOCALES.en;

  // Filter locales based on search input
  const filteredLocales = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return SUPPORTED_LOCALES;
    return SUPPORTED_LOCALES.filter(loc => {
      const info = LOCALES[loc];
      return (
        info.code.toLowerCase().includes(q) ||
        info.name.toLowerCase().includes(q) ||
        info.nativeName.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Close dropdown on outside click or Esc
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Footer variant: Crawlable list of all 39 languages
  if (variant === 'footer') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <Globe className="w-4 h-4 text-sky-600 shrink-0" />
          <span>Languages ({SUPPORTED_LOCALES.length} Available)</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {SUPPORTED_LOCALES.map(loc => {
            const info = LOCALES[loc];
            const isCurrent = loc === currentLocale;
            const targetUrl = getLocalizedPath(pathname, loc);

            return (
              <Link
                key={loc}
                href={targetUrl}
                hrefLang={loc}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
                  isCurrent
                    ? 'bg-sky-600 text-white font-medium shadow-xs'
                    : 'bg-slate-100/80 text-slate-700 hover:text-sky-700 hover:bg-sky-50'
                }`}
                title={`${info.name} (${info.nativeName})`}
              >
                <span className="text-xs">{info.flag}</span>
                <span>{info.nativeName}</span>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // Header Dropdown variant with instant search and 2-column layout
  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Select language. Current language: ${current.nativeName}`}
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
          className="absolute right-0 mt-1.5 w-[280px] sm:w-[380px] rounded-xl bg-white border border-slate-200 shadow-2xl z-50 animate-in fade-in-0 zoom-in-95 duration-100 overflow-hidden"
          role="menu"
          aria-orientation="vertical"
        >
          {/* Header & Search Bar */}
          <div className="p-2.5 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Select Language ({SUPPORTED_LOCALES.length})
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
                aria-label="Close language menu"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search language or code..."
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Languages List */}
          <div className="max-h-[300px] sm:max-h-[360px] overflow-y-auto p-1.5">
            {filteredLocales.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500">
                No languages found matching &ldquo;{searchQuery}&rdquo;
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
                {filteredLocales.map(loc => {
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
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        isCurrent
                          ? 'bg-sky-50 text-sky-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                      title={`${info.name} (${info.nativeName})`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="text-base leading-none shrink-0">{info.flag}</span>
                        <span className="truncate">{info.nativeName}</span>
                        <span className="text-[10px] text-slate-400 font-normal shrink-0">
                          {info.code.toUpperCase()}
                        </span>
                      </span>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-sky-600 shrink-0 ml-1" />}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
