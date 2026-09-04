'use client';

import React, { useState } from 'react';
import { calculateDateDifference } from '@/lib/calculators/dateDifference';
import { formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Briefcase, CalendarDays } from 'lucide-react';

export const DateDifferenceCalculatorWidget: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(nextMonth);
  const [includeEnd, setIncludeEnd] = useState<boolean>(false);

  const res = calculateDateDifference(startDate, endDate, includeEnd);

  const getResultText = () => {
    return `Duration from ${startDate} to ${endDate}: ${res.totalDays} calendar days (${res.summaryText}), ${res.businessDays} business days, ${res.weekendDays} weekend days.`;
  };

  const handleReset = () => {
    setStartDate(today);
    setEndDate(nextMonth);
    setIncludeEnd(false);
  };

  const addDays = (days: number) => {
    const s = new Date(startDate);
    const target = new Date(s.getTime() + days * 24 * 60 * 60 * 1000);
    setEndDate(target.toISOString().split('T')[0]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Date Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
            />
          </div>

          {/* Include End Date Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="includeEnd"
              checked={includeEnd}
              onChange={e => setIncludeEnd(e.target.checked)}
              className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500 cursor-pointer"
            />
            <label htmlFor="includeEnd" className="text-xs text-slate-700 font-medium cursor-pointer">
              Include End Date in calculation (+1 day)
            </label>
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-xs text-slate-500 font-medium block mb-2">
              Add Days from Start Date:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '+7 Days (1 Wk)', days: 7 },
                { label: '+14 Days (2 Wks)', days: 14 },
                { label: '+30 Days', days: 30 },
                { label: '+90 Days (Quarter)', days: 90 },
                { label: '+365 Days (1 Yr)', days: 365 },
              ].map(p => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => addDays(p.days)}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-sky-50 hover:text-sky-700 border border-slate-200 text-slate-700 font-medium transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
              Total Duration
            </span>

            <div className="mt-2">
              <div className="text-4xl sm:text-5xl font-extrabold text-sky-950 tracking-tight flex items-baseline gap-2">
                {formatNumber(res.totalDays)}
                <span className="text-lg font-bold text-sky-800">calendar days</span>
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Equivalent to <strong>{res.summaryText}</strong> ({res.totalWeeks} full weeks).
              </p>
            </div>

            {/* Business vs Weekend Metrics */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-sky-200/80 rounded-lg">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold uppercase mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-sky-600" />
                  <span>Business Days</span>
                </div>
                <p className="text-2xl font-extrabold text-slate-900">
                  {formatNumber(res.businessDays)}
                </p>
                <span className="text-[11px] text-slate-400">Mon – Fri</span>
              </div>

              <div className="p-3 bg-white border border-sky-200/80 rounded-lg">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold uppercase mb-1">
                  <CalendarDays className="w-3.5 h-3.5 text-amber-500" />
                  <span>Weekend Days</span>
                </div>
                <p className="text-2xl font-extrabold text-slate-900">
                  {formatNumber(res.weekendDays)}
                </p>
                <span className="text-[11px] text-slate-400">Sat &amp; Sun</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-sky-200/60 text-xs text-slate-500">
            Computed using standard UTC calendar differences without DST shifting.
          </div>
        </div>
      </div>
    </div>
  );
};
