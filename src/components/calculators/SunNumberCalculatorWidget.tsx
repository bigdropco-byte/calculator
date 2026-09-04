'use client';

import React, { useState } from 'react';
import { calculateSunNumber } from '@/lib/calculators/numerology';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Sun, Sparkles, Compass, CheckCircle2 } from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

export const SunNumberCalculatorWidget: React.FC = () => {
  const [month, setMonth] = useState<number>(4);
  const [day, setDay] = useState<number>(18);

  const res = calculateSunNumber(month, day);

  const getResultText = () => {
    return `Sun Number: ${res.number} (${res.archetype}). Change Style: ${res.changeStyle}. Traits: ${res.traits.join(', ')}`;
  };

  const handleReset = () => {
    setMonth(4);
    setDay(18);
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
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500"
              >
                {MONTH_NAMES.map((name, idx) => (
                  <option key={idx + 1} value={idx + 1}>
                    {name} ({idx + 1})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Day of Birth
              </label>
              <input
                type="number"
                min={1}
                max={31}
                value={day}
                onChange={e => setDay(Math.min(31, Math.max(1, Number(e.target.value) || 1)))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-yellow-50/80 border border-yellow-200/70 text-xs text-yellow-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-yellow-950">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Solar Energy in Numerology</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Your Sun Number does not change year to year. It establishes the seasonal baseline for how you navigate life transitions, unexpected pivot points, and personal cycles.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-yellow-50/40 border border-yellow-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-900 flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-500" />
              Sun Number Profile
            </span>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-black text-yellow-950 tracking-tight">
                {res.number}
              </span>
              <div>
                <h3 className="text-base font-bold text-yellow-950">{res.archetype}</h3>
                <p className="text-xs text-yellow-800 font-medium">Solar Vibration Cycle</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3.5 rounded-lg bg-white/90 border border-yellow-100 text-xs space-y-1">
                <span className="font-bold text-yellow-950 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-500" />
                  Adaptation to Unexpected Change
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {res.changeStyle}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-white/90 border border-yellow-100 text-xs space-y-1.5">
                <span className="font-bold text-yellow-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Core Personality Traits
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {res.traits.map((trait, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-yellow-100 text-yellow-900 border border-yellow-200 text-xs font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-yellow-200/60 text-xs text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Harmonizes with your Life Path number to reveal seasonal timing.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
