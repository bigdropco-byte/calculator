'use client';

import React, { useState } from 'react';
import { calculateAttitudeNumber } from '@/lib/calculators/numerology';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Sun, Sparkles, User, Shield } from 'lucide-react';

const MONTH_NAMES = [
  'January (1)', 'February (2)', 'March (3)', 'April (4)',
  'May (5)', 'June (6)', 'July (7)', 'August (8)',
  'September (9)', 'October (10)', 'November (11)', 'December (12)'
];

export const AttitudeNumberCalculatorWidget: React.FC = () => {
  const [month, setMonth] = useState<number>(7);
  const [day, setDay] = useState<number>(15);

  const res = calculateAttitudeNumber(month, day);

  const getResultText = () => {
    return `Attitude Number: ${res.number} (${res.archetype}). First Impression: ${res.firstImpression}. Resilience Motto: ${res.resilienceMotto}`;
  };

  const handleReset = () => {
    setMonth(7);
    setDay(15);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Birth Month
              </label>
              <select
                value={month}
                onChange={e => setMonth(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                {MONTH_NAMES.map((name, idx) => (
                  <option key={idx + 1} value={idx + 1}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Day of Birth (1 - 31)
              </label>
              <input
                type="number"
                min={1}
                max={31}
                value={day}
                onChange={e => setDay(Math.min(31, Math.max(1, Number(e.target.value) || 1)))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-950">
              <Sun className="w-4 h-4 text-amber-600" />
              <span>What is the Attitude Number?</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Also known as the Sun Number or Achievement Number, your Attitude Number is calculated strictly from your birth month and day. It governs your immediate default reaction to surprises and social first impressions.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Attitude &amp; First Impression
            </span>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-black text-amber-950 tracking-tight">
                {res.number}
              </span>
              <div>
                <h3 className="text-base font-bold text-amber-900">{res.archetype}</h3>
                <p className="text-xs text-amber-700 font-medium">Month ({month}) + Day ({day})</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3.5 rounded-lg bg-white/90 border border-amber-100 text-xs space-y-1">
                <span className="font-bold text-amber-950 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-600" />
                  First Impression Aura
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {res.firstImpression}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-amber-100/60 border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-amber-950 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-700" />
                  Resilience Motto &amp; Mental Stance
                </span>
                <p className="text-amber-900 leading-relaxed text-[11px] italic">
                  &ldquo;{res.resilienceMotto}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
