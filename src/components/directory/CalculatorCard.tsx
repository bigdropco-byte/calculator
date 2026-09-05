import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CalculatorDefinition } from '@/lib/types';
import { CATEGORIES } from '@/lib/categoryRegistry';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

interface CalculatorCardProps {
  calculator: CalculatorDefinition;
  viewMode?: 'grid' | 'list';
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({
  calculator,
  viewMode = 'grid',
}) => {
  const category = CATEGORIES[calculator.category];

  if (viewMode === 'list') {
    return (
      <Link
        href={`/calculators/${calculator.slug}/`}
        className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-sky-400 hover:shadow-xs transition-all gap-3"
      >
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div className="p-2 rounded-md bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors shrink-0">
            <CategoryIcon name={calculator.icon} className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-600 transition-colors truncate">
                {calculator.name}
              </h3>
              {calculator.popular && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Popular
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
              {calculator.shortDescription}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <span className="text-xs text-slate-500 font-medium px-2.5 py-1 bg-slate-50 rounded-md border border-slate-200/80">
            {category?.shortName || calculator.category}
          </span>
          <span className="text-xs font-semibold text-sky-600 group-hover:translate-x-0.5 flex items-center gap-1 transition-transform">
            Calculate <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/calculators/${calculator.slug}/`}
      className="dir-card group flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-sky-400 hover:shadow-md transition-all relative overflow-hidden"
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="p-2 rounded-lg bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
          <CategoryIcon name={calculator.icon} className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-1.5">
          {calculator.popular && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Popular
            </span>
          )}
          <span className="text-xs text-slate-500 font-medium px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200">
            {category?.shortName || calculator.category}
          </span>
        </div>
      </div>

      <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
        {calculator.name}
      </h3>

      <p className="text-xs text-slate-500 mt-2 mb-4 line-clamp-2 leading-relaxed flex-1">
        {calculator.shortDescription}
      </p>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600">
        <span>Calculate</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};
