'use client';

import React, { useState } from 'react';
import { calculateExpressionNumber } from '@/lib/calculators/numerology';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Compass, Sparkles, Briefcase, Award } from 'lucide-react';

export const ExpressionNumberCalculatorWidget: React.FC = () => {
  const [fullName, setFullName] = useState<string>('Jane Marie Smith');

  const res = calculateExpressionNumber(fullName);

  const getResultText = () => {
    return `Expression (Destiny) Number: ${res.number} (${res.archetype}) for "${fullName}". Calling & Potential: ${res.calling}`;
  };

  const handleReset = () => {
    setFullName('Jane Marie Smith');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Legal Birth Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="e.g. Jane Marie Smith"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Enter your complete name exactly as written on your birth certificate (including middle names).
            </span>
          </div>

          <div className="p-4 rounded-xl bg-violet-50/60 border border-violet-100 text-xs text-violet-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-violet-950">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span>Pythagorean Alphabet Letter Mapping</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Every letter in your name carries a vibrational number from 1 to 9 (A=1, B=2 ... Z=8). Summing all letters reveals your full potential toolkit in this lifetime.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-violet-50/40 border border-violet-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-800 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-violet-600" />
                Expression (Destiny) Number
              </span>
              {res.isMaster && (
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Master Number
                </span>
              )}
            </div>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-black text-violet-950 tracking-tight">
                {res.number}
              </span>
              <div>
                <h3 className="text-base font-bold text-violet-900">{res.archetype}</h3>
                <p className="text-xs text-violet-700 font-medium">{fullName.trim() || 'Calculated'}</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3.5 rounded-lg bg-white/90 border border-violet-100 text-xs space-y-1">
                <span className="font-bold text-violet-950 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-violet-600" />
                  Destiny Calling &amp; Inherent Talents
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {res.calling}
                </p>
              </div>

              <div className="p-3 bg-violet-100/60 border border-violet-200 rounded-lg text-xs flex justify-between items-center text-violet-900">
                <span className="font-medium">Raw Letter Sum:</span>
                <strong className="font-mono text-sm">{res.letterSum}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
