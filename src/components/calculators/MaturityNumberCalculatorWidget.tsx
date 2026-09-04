'use client';

import React, { useState } from 'react';
import { calculateMaturityNumber } from '@/lib/calculators/numerology';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Award, Sparkles, Compass, Milestone, Flame } from 'lucide-react';

export const MaturityNumberCalculatorWidget: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('1988-11-20');
  const [fullName, setFullName] = useState<string>('David Alan Walker');

  const res = calculateMaturityNumber(birthDate, fullName);

  const getResultText = () => {
    return `Maturity Number: ${res.number} (Life Path ${res.lifePathNumber} + Expression ${res.expressionNumber}). Mid-Life Gift: ${res.midlifeGift}. Legacy Focus: ${res.legacyFocus}`;
  };

  const handleReset = () => {
    setBirthDate('1988-11-20');
    setFullName('David Alan Walker');
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
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Legal Birth Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="e.g. David Alan Walker"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Calculated by synthesizing your Life Path Number (birth date) and Expression Number (full name).
            </span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-950 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-emerald-950">
              <Milestone className="w-4 h-4 text-emerald-600" />
              <span>Awakening in Mid-Life (Ages 35–45+)</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Your Maturity Number begins to activate around age 35 and becomes your primary evolutionary driver in the second half of life, revealing your enduring life purpose and ultimate contribution to the world.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" />
                Maturity (Realization) Number
              </span>
              {res.isMaster && (
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Master Number
                </span>
              )}
            </div>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-black text-emerald-950 tracking-tight">
                {res.number}
              </span>
              <div>
                <h3 className="text-base font-bold text-emerald-950">Second-Half Calling</h3>
                <p className="text-xs text-emerald-700 font-medium">
                  Life Path ({res.lifePathNumber}) + Expression ({res.expressionNumber})
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3.5 rounded-lg bg-white/90 border border-emerald-100 text-xs space-y-1">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Mid-Life Awakening &amp; Gift
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {res.midlifeGift}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-100/60 border border-emerald-200 text-xs space-y-1">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-emerald-700" />
                  Enduring Legacy Focus
                </span>
                <p className="text-emerald-900 leading-relaxed text-[11px]">
                  {res.legacyFocus}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
