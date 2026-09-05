'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { CalculatBrandLogo } from '@/components/ui/CalculatLogo';
import { SocialLinks } from '@/components/navigation/SocialLinks';
import { LanguageSwitcher } from '@/components/navigation/LanguageSwitcher';
import { stripLocaleFromPath, getLocalizedPath } from '@/lib/i18n/config';
import { getUiTranslations } from '@/lib/i18n/translate';

export const Footer: React.FC = () => {
  const pathname = usePathname() || '/';
  const { locale } = stripLocaleFromPath(pathname);
  const ui = getUiTranslations(locale);

  return (
    <footer className="mt-auto bg-white border-t border-slate-200 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href={getLocalizedPath('/', locale)}
              className="inline-flex items-center group py-1"
              aria-label="Calculat.dev - All Calculators, One Place."
            >
              <CalculatBrandLogo
                height={48}
                className="transition-transform group-hover:scale-[1.02] duration-200"
              />
            </Link>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-sm">
              {ui.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-sky-800 bg-sky-50 border border-sky-200/80 rounded-md p-2.5 max-w-sm">
              <span className="text-base shrink-0">🎓</span>
              <span>
                <strong>{ui.studentBadge}</strong> {ui.studentNote}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-md p-2.5 max-w-sm">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{ui.privacyBadge}</span>
            </div>

            {/* Official Social Media Handles */}
            <div className="pt-1">
              <p className="text-xs font-semibold text-slate-700 mb-2">{ui.connectFollow}</p>
              <SocialLinks size="md" />
            </div>
          </div>

          {/* Calculators Column */}
          <div>
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-3">
              {ui.navCalculators}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href={getLocalizedPath('/calculators/', locale)} className="hover:text-sky-600 transition-colors">
                  {ui.directoryHeader}
                </Link>
              </li>
              <li>
                <Link href={`${getLocalizedPath('/calculators/', locale)}?sort=popular`} className="hover:text-sky-600 transition-colors">
                  {ui.popularTitle}
                </Link>
              </li>
              <li>
                <Link href={`${getLocalizedPath('/calculators/', locale)}?sort=newest`} className="hover:text-sky-600 transition-colors">
                  {ui.recentlyAddedTitle}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/calculators/percentage-calculator/', locale)} className="hover:text-sky-600 transition-colors">
                  Percentage Calculator
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/calculators/mortgage-calculator/', locale)} className="hover:text-sky-600 transition-colors">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/calculators/bmi-calculator/', locale)} className="hover:text-sky-600 transition-colors">
                  BMI Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-3">
              {ui.navCategories}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href={getLocalizedPath('/categories/math/', locale)} className="hover:text-sky-600 transition-colors">
                  Math Calculators
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/categories/finance/', locale)} className="hover:text-sky-600 transition-colors">
                  Finance Calculators
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/categories/health/', locale)} className="hover:text-sky-600 transition-colors">
                  Health Calculators
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/categories/date-time/', locale)} className="hover:text-sky-600 transition-colors">
                  Date &amp; Time
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/categories/everyday/', locale)} className="hover:text-sky-600 transition-colors">
                  Everyday Tools
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/categories/', locale)} className="text-sky-600 font-medium hover:underline">
                  {ui.viewAllCategories}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-3">
              {ui.navAbout} &amp; Legal
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href={getLocalizedPath('/about/', locale)} className="hover:text-sky-600 transition-colors">
                  {ui.navAbout}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/contact/', locale)} className="hover:text-sky-600 transition-colors">
                  {ui.navContact}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/privacy/', locale)} className="hover:text-sky-600 transition-colors">
                  {ui.navPrivacy}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/terms/', locale)} className="hover:text-sky-600 transition-colors">
                  {ui.navTerms}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedPath('/disclaimer/', locale)} className="hover:text-sky-600 transition-colors">
                  {ui.navDisclaimer}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Language Selector Bar */}
        <div className="mt-10 pt-6 border-t border-slate-200/80">
          <LanguageSwitcher variant="footer" />
        </div>

        {/* Bottom copyright line */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Calculat.dev. Built with ❤️ by an independent student developer.</p>
          <p className="flex items-center gap-1">
            Free forever • Ad-free • Press ⌘D to bookmark
          </p>
        </div>
      </div>
    </footer>
  );
};
