import React from 'react';

export const CalculatorSkeleton: React.FC = () => {
  return (
    <div
      className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto animate-pulse"
      aria-busy="true"
      aria-label="Loading calculator interface..."
    >
      <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
        <div className="h-5 bg-slate-200 rounded-md w-48" />
        <div className="h-4 bg-slate-100 rounded-md w-24" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column Input Skeletons */}
        <div className="space-y-5">
          <div>
            <div className="h-3 bg-slate-200 rounded w-28 mb-2" />
            <div className="h-11 bg-slate-100 rounded-lg border border-slate-200 w-full" />
          </div>
          <div>
            <div className="h-3 bg-slate-200 rounded w-36 mb-2" />
            <div className="h-11 bg-slate-100 rounded-lg border border-slate-200 w-full" />
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="h-10 bg-slate-200/80 rounded-lg" />
            <div className="h-10 bg-slate-100 rounded-lg" />
          </div>
        </div>

        {/* Right Column Output Skeletons */}
        <div className="space-y-4">
          <div className="h-32 bg-slate-900/10 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between">
            <div className="h-4 bg-slate-200 rounded w-1/3" />
            <div className="h-8 bg-slate-300 rounded w-2/3" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-16 bg-slate-100 rounded-xl border border-slate-200" />
            <div className="h-16 bg-slate-100 rounded-xl border border-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
};
