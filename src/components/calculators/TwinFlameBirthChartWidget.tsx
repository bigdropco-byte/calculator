'use client';

import React, { useState } from 'react';
import { calculateTwinFlameBirthChart } from '@/lib/calculators/numerology';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Flame, Sparkles, Sun, Moon } from 'lucide-react';

export const TwinFlameBirthChartWidget: React.FC = () => {
  const [dob1, setDob1] = useState<string>('1993-03-25');
  const [dob2, setDob2] = useState<string>('1994-11-12');

  const res = calculateTwinFlameBirthChart(dob1, dob2);

  const getResultText = () => {
    return `Twin Flame Birth Chart: Partner 1 (${res.person1Sign} - ${res.person1Element}), Partner 2 (${res.person2Sign} - ${res.person2Element}). Elemental Harmony: ${res.elementalHarmony} (Synastry: ${res.synastryScore}%). Karmic Aspect: ${res.karmicAspect}`;
  };

  const handleReset = () => {
    setDob1('1993-03-25');
    setDob2('1994-11-12');
  };

  const getElementBadgeColor = (el: string) => {
    switch (el) {
      case 'Fire':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Water':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Air':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'Earth':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-900 border-slate-300';
    }
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
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
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
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Extracts Western tropical zodiac signs and elemental polarities (Fire, Earth, Air, Water).
            </span>
          </div>

          <div className="p-4 rounded-xl bg-violet-50/60 border border-violet-100 text-xs text-violet-950 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-violet-950">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span>Astrological &amp; Elemental Alchemy</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              When twin flames meet, their solar signs and elemental elements trigger profound alchemy, creating either steam, magma, fertile soil, or whirlwind transformations that catalyze awakening.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-violet-50/40 border border-violet-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-800 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-violet-600" />
                Cosmic Chart Synergy
              </span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-900">
                {res.synastryScore}% Synastry
              </span>
            </div>

            {/* Signs Comparison */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="p-3.5 bg-white rounded-xl border border-violet-100 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Partner 1</span>
                <h4 className="text-base font-extrabold text-violet-950 mt-1">{res.person1Sign}</h4>
                <span
                  className={`inline-block text-[10px] font-bold px-2 py-0.5 mt-1 rounded-full border ${getElementBadgeColor(
                    res.person1Element
                  )}`}
                >
                  {res.person1Element} Sign
                </span>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-violet-100 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Partner 2</span>
                <h4 className="text-base font-extrabold text-violet-950 mt-1">{res.person2Sign}</h4>
                <span
                  className={`inline-block text-[10px] font-bold px-2 py-0.5 mt-1 rounded-full border ${getElementBadgeColor(
                    res.person2Element
                  )}`}
                >
                  {res.person2Element} Sign
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3.5 rounded-lg bg-white/90 border border-violet-100 text-xs space-y-1">
                <span className="font-bold text-violet-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                  Elemental Alchemy Dynamic
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {res.elementalHarmony}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-violet-100/60 border border-violet-200 text-xs space-y-1">
                <span className="font-bold text-violet-950 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  Karmic Aspect &amp; Spiritual Mission
                </span>
                <p className="text-violet-900 leading-relaxed text-[11px]">
                  {res.karmicAspect}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
