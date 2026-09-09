import React from 'react';
import { CalculatorSkeleton } from '@/components/calculator/CalculatorSkeleton';

export default function CalculatorLoading() {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Breadcrumb Skeleton */}
      <div className="mb-4 h-4 bg-slate-200/80 rounded w-48 animate-pulse" />

      {/* Header Info Skeleton */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b border-slate-200 animate-pulse">
        <div className="space-y-3 w-full max-w-2xl">
          <div className="flex gap-2">
            <div className="h-5 w-20 bg-sky-100 rounded-md" />
            <div className="h-5 w-28 bg-emerald-100 rounded-md" />
          </div>
          <div className="h-8 bg-slate-200 rounded-md w-3/4" />
          <div className="h-4 bg-slate-100 rounded-md w-full" />
        </div>
      </div>

      {/* Interactive Widget Skeleton */}
      <CalculatorSkeleton />
    </article>
  );
}
