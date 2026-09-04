import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { CalculatLogoIcon } from '@/components/ui/CalculatLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-white border-t border-slate-200 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 text-slate-900 font-bold text-lg group">
              <CalculatLogoIcon size={32} />
              <span>
                Calculat<span className="text-sky-600">.dev</span>
              </span>
            </Link>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-sm">
              Free, fast, and accurate online calculator directory. Built with care by an independent student developer to replace ad-cluttered websites with clean tools.
            </p>
            <div className="flex items-center gap-2 text-xs text-sky-800 bg-sky-50 border border-sky-200/80 rounded-md p-2.5 max-w-sm">
              <span className="text-base shrink-0">🎓</span>
              <span>
                <strong>Independent Student Project:</strong> 100% free, no ads, no paywalls. Bookmark (⌘D) and share with a friend!
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-md p-2.5 max-w-sm">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>
                Calculations are performed locally in your browser. Zero tracking of your numbers.
              </span>
            </div>
          </div>

          {/* Calculators Column */}
          <div>
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Calculators
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/calculators" className="hover:text-sky-600 transition-colors">
                  All Calculators
                </Link>
              </li>
              <li>
                <Link href="/calculators?sort=popular" className="hover:text-sky-600 transition-colors">
                  Popular Calculators
                </Link>
              </li>
              <li>
                <Link href="/calculators?sort=newest" className="hover:text-sky-600 transition-colors">
                  Recently Added
                </Link>
              </li>
              <li>
                <Link href="/calculators/percentage-calculator" className="hover:text-sky-600 transition-colors">
                  Percentage Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/mortgage-calculator" className="hover:text-sky-600 transition-colors">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/bmi-calculator" className="hover:text-sky-600 transition-colors">
                  BMI Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Categories
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/categories/math" className="hover:text-sky-600 transition-colors">
                  Math Calculators
                </Link>
              </li>
              <li>
                <Link href="/categories/finance" className="hover:text-sky-600 transition-colors">
                  Finance Calculators
                </Link>
              </li>
              <li>
                <Link href="/categories/health" className="hover:text-sky-600 transition-colors">
                  Health Calculators
                </Link>
              </li>
              <li>
                <Link href="/categories/date-time" className="hover:text-sky-600 transition-colors">
                  Date &amp; Time
                </Link>
              </li>
              <li>
                <Link href="/categories/everyday" className="hover:text-sky-600 transition-colors">
                  Everyday Tools
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sky-600 font-medium hover:underline">
                  View All 16 Categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-3">
              About &amp; Legal
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-sky-600 transition-colors">
                  About Calculat
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-600 transition-colors">
                  Contact &amp; Suggestion
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-sky-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-sky-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-sky-600 transition-colors">
                  Financial &amp; Medical Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Calculat.dev. Built with ❤️ by an independent student developer.</p>
          <p className="flex items-center gap-1">
            Free forever • Ad-free • Press ⌘D to bookmark
          </p>
        </div>
      </div>
    </footer>
  );
};
