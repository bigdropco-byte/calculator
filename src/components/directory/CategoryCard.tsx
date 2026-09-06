import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CategoryDefinition } from '@/lib/types';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

interface CategoryCardProps {
  category: CategoryDefinition;
  count: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, count }) => {
  const hasCalculators = count > 0;

  return (
    <Link
      href={`/categories/${category.slug}/`}
      className="dir-card group flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-sky-400 hover:shadow-md transition-all relative"
    >
      <div className="flex items-center justify-between mb-3.5">
        <div className="p-2.5 rounded-lg bg-sky-50 text-sky-700 group-hover:bg-sky-600 group-hover:text-white transition-colors">
          <CategoryIcon name={category.icon} className="w-5 h-5" />
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
            hasCalculators
              ? 'bg-sky-50 text-sky-700 border border-sky-200'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          {hasCalculators ? `${count} tool${count === 1 ? '' : 's'}` : 'Coming soon'}
        </span>
      </div>

      <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
        {category.name}
      </h3>

      <p className="text-xs text-slate-600 mt-2 mb-4 line-clamp-2 leading-relaxed flex-1">
        {category.description}
      </p>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-700">
        <span>{hasCalculators ? `Browse ${category.shortName}` : 'View Category'}</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};
