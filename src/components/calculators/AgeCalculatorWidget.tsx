'use client';

import React, { useState } from 'react';
import { calculateAge } from '@/lib/calculators/age';
import { formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Cake, Calendar } from 'lucide-react';

export const AgeCalculatorWidget: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('2000-01-01');
  const todayStr = new Date().toISOString().split('T')[0];
  const [targetDate, setTargetDate] = useState<string>(todayStr);

  const res = calculateAge(birthDate, targetDate);

  const getResultText = () => {
    if (res.isInvalid) return res.errorMessage || 'Invalid date';
    return `Age: ${res.years} years, ${res.months} months, ${res.days} days (Total: ${formatNumber(
      res.totalDays
    )} days). Next birthday in ${res.nextBirthdayDays} days on a ${res.nextBirthdayDayOfWeek}.`;
  };

  const handleReset = () => {
    setBirthDate('2000-01-01');
    setTargetDate(todayStr);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Date of Birth
            </label>
            <div className="relative">
              <input
                type="date"
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Age at the Date of
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={e => setTargetDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Default is today. Change to calculate age at a future or past date.
            </span>
          </div>

          {res.isInvalid && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
              {res.errorMessage}
            </div>
          )}

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
              Exact Age
            </span>

            {!res.isInvalid ? (
              <div className="mt-2">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-4xl sm:text-5xl font-extrabold text-sky-950 tracking-tight">
                    {res.years}
                  </span>
                  <span className="text-lg font-bold text-sky-800">years</span>
                  <span className="text-2xl font-bold text-sky-950 ml-1">{res.months}</span>
                  <span className="text-sm font-semibold text-sky-800">months</span>
                  <span className="text-2xl font-bold text-sky-950 ml-1">{res.days}</span>
                  <span className="text-sm font-semibold text-sky-800">days</span>
                </div>

                {/* Next Birthday Banner */}
                <div className="mt-5 p-3.5 bg-white border border-sky-200/80 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Cake className="w-5 h-5 text-amber-500" />
                    <div>
                      <span className="text-xs font-semibold text-slate-800 block">Next Birthday</span>
                      <span className="text-[11px] text-slate-500">
                        {res.nextBirthdayDayOfWeek ? `Falls on a ${res.nextBirthdayDayOfWeek}` : ''}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-sky-700">{res.nextBirthdayDays}</span>
                    <span className="text-xs text-slate-500 ml-1">days left</span>
                  </div>
                </div>

                {/* Alternate Units Breakdown */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="p-2 bg-white/80 border border-sky-100 rounded">
                    <span className="text-slate-500 block">Total Days:</span>
                    <strong className="font-bold text-slate-900">{formatNumber(res.totalDays)}</strong>
                  </div>
                  <div className="p-2 bg-white/80 border border-sky-100 rounded">
                    <span className="text-slate-500 block">Total Weeks:</span>
                    <strong className="font-bold text-slate-900">{formatNumber(res.totalWeeks)}</strong>
                  </div>
                  <div className="p-2 bg-white/80 border border-sky-100 rounded">
                    <span className="text-slate-500 block">Total Months:</span>
                    <strong className="font-bold text-slate-900">{formatNumber(res.totalMonths)}</strong>
                  </div>
                  <div className="p-2 bg-white/80 border border-sky-100 rounded">
                    <span className="text-slate-500 block">Total Hours:</span>
                    <strong className="font-bold text-slate-900">{formatNumber(res.totalHours)}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs">
                Select valid dates to calculate age.
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-sky-200/60 text-xs text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-sky-600" />
            <span>Gregorian calendar solar year &amp; leap day adjusted</span>
          </div>
        </div>
      </div>
    </div>
  );
};
