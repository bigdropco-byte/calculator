'use client';

import React, { useState } from 'react';
import { calculateTwinFlameLifePath } from '@/lib/calculators/numerology';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Flame, Sparkles, ScrollText, HeartHandshake } from 'lucide-react';

export const TwinFlameLifePathWidget: React.FC = () => {
  const [dob1, setDob1] = useState<string>('1993-04-18');
  const [dob2, setDob2] = useState<string>('1995-11-09');

  const res = calculateTwinFlameLifePath(dob1, dob2);

  const getResultText = () => {
    return `Twin Flame Life Paths: Partner 1 (LP ${res.person1LifePath}), Partner 2 (LP ${res.person2LifePath}), Composite Union: ${res.compositeLifePath}. Rating: ${res.compatibilityRating}. Sacred Soul Contract: ${res.soulContract}`;
  };

  const handleReset = () => {
    setDob1('1993-04-18');
    setDob2('1995-11-09');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Partner 1 Date of Birth
            </label>
            <input
              type="date"
              value={dob1}
              onChange={e => setDob1(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Partner 2 Date of Birth
            </label>
            <input
              type="date"
              value={dob2}
              onChange={e => setDob2(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Calculates individual life paths and the sacred composite number that guides your shared soul mission.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100 text-xs text-rose-950 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-rose-950">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>Composite Life Path Union</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              When two life paths merge, their combined frequency creates an energetic third entity: the relationship itself. This composite number reveals your shared lessons.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-rose-50/40 border border-rose-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-rose-500" />
              Composite Life Path Fusion
            </span>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl font-black text-rose-950 tracking-tight">
                  {res.compositeLifePath}
                </span>
                <div>
                  <h3 className="text-base font-bold text-rose-950">Union Life Path</h3>
                  <p className="text-xs text-rose-700 font-medium">
                    Partner 1 (#{res.person1LifePath}) &amp; Partner 2 (#{res.person2LifePath})
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-lg bg-white/90 border border-rose-100 text-xs space-y-1">
              <span className="font-bold text-rose-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                Compatibility Dynamic &amp; Rating
              </span>
              <p className="text-slate-700 leading-relaxed text-[11px] font-semibold">
                {res.compatibilityRating}
              </p>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-white/90 border border-rose-100 text-xs space-y-2">
              <span className="font-bold text-rose-950 flex items-center gap-1.5">
                <ScrollText className="w-3.5 h-3.5 text-rose-500" />
                Sacred Soul Contract &amp; Shared Mission
              </span>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                {res.soulContract}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-rose-200/60 text-xs text-slate-500 flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
            <span>Honors Western Pythagorean composite numerology matrix.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
