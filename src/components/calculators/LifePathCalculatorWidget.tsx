'use client';

import React, { useState } from 'react';
import { calculateLifePath } from '@/lib/calculators/numerology';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Compass, Sparkles, Briefcase, AlertCircle, CheckCircle } from 'lucide-react';

export const LifePathCalculatorWidget: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('1995-07-24');

  const res = calculateLifePath(birthDate);

  const getResultText = () => {
    return `Life Path Number: ${res.number} (${res.archetype}). Core Themes: ${res.keyword}. Description: ${res.description}`;
  };

  const handleReset = () => {
    setBirthDate('1995-07-24');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Your Date of Birth
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Western Pythagorean numerology reduces your birth year, month, and day.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-purple-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-purple-950">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Pythagorean Reduction Method</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Preserves Master Numbers (11, 22, 33) without reducing them further to single digits, honoring your higher spiritual frequency.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-800 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-purple-600" />
                Life Path Archetype
              </span>
              {res.isMaster && (
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Master Number
                </span>
              )}
            </div>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-black text-purple-950 tracking-tight">
                {res.number}
              </span>
              <div>
                <h3 className="text-base font-bold text-purple-900">{res.archetype}</h3>
                <p className="text-xs text-purple-700 font-medium">{res.keyword}</p>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-700 leading-relaxed bg-white/80 p-3.5 rounded-lg border border-purple-100">
              {res.description}
            </p>

            {/* Strengths */}
            <div className="mt-4 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Core Strengths
              </span>
              <div className="flex flex-wrap gap-1.5">
                {res.strengths.map((str, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md font-medium"
                  >
                    {str}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div className="mt-3.5 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                Growth Lessons &amp; Pitfalls
              </span>
              <div className="flex flex-wrap gap-1.5">
                {res.challenges.map((chl, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-800 rounded-md font-medium"
                  >
                    {chl}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Careers */}
            <div className="mt-3.5 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                Resonant Vocations
              </span>
              <div className="flex flex-wrap gap-1.5">
                {res.careers.map((car, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-md font-medium"
                  >
                    {car}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
