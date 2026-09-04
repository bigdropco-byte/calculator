'use client';

import React, { useState } from 'react';
import { calculateCareerNumerology } from '@/lib/calculators/numerology';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Briefcase, Building2, UserCheck, TrendingUp, Sparkles } from 'lucide-react';

export const CareerCalculatorWidget: React.FC = () => {
  const [fullName, setFullName] = useState<string>('Jonathan Edward Cole');
  const [birthDate, setBirthDate] = useState<string>('1992-05-14');

  const res = calculateCareerNumerology(fullName, birthDate);

  const getResultText = () => {
    return `Career Profile for "${fullName}" (Vocational Number ${res.vocationalNumber}: ${res.archetype}): Top Fields: ${res.topFields.join(
      ', '
    )}. Leadership: ${res.leadershipStyle}. Ideal Environment: ${res.idealEnvironment}. Wealth Vibration: ${res.wealthVibration}. Action Advice: ${res.actionAdvice}`;
  };

  const handleReset = () => {
    setFullName('Jonathan Edward Cole');
    setBirthDate('1992-05-14');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Legal Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="e.g. Jonathan Edward Cole"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Date of Birth
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Integrates Life Path (destiny) and Expression (toolkit) to calculate your Vocational Number.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-950 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-blue-950">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>Vocational Blueprint</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              When your daily professional environment aligns with your innate strengths and communication style, career friction evaporates and leadership momentum accelerates.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-blue-600" />
                Vocational Matrix
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 font-bold text-blue-900 text-xs">
                Vocational #{res.vocationalNumber}
              </span>
            </div>

            <div className="mt-3">
              <h3 className="text-lg font-extrabold text-blue-950">{res.archetype}</h3>
            </div>

            {/* Optimal Industries */}
            <div className="mt-4 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                Top Vocational Industries &amp; Roles
              </span>
              <div className="flex flex-wrap gap-1.5">
                {res.topFields.map((ind, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 bg-white border border-blue-200 text-blue-900 rounded-md font-medium shadow-2xs"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Guidance details */}
            <div className="mt-4 space-y-3">
              <div className="p-3.5 rounded-lg bg-white/90 border border-blue-100 text-xs space-y-1">
                <span className="font-bold text-blue-950 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                  Leadership &amp; Execution Style
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {res.leadershipStyle}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-white/90 border border-blue-100 text-xs space-y-1">
                <span className="font-bold text-blue-950 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  Ideal Workplace Environment
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {res.idealEnvironment}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                  Wealth Vibration &amp; Manifestation
                </span>
                <p className="text-emerald-900 leading-relaxed text-[11px]">
                  {res.wealthVibration}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-blue-100/60 border border-blue-200 text-xs space-y-1">
                <span className="font-bold text-blue-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                  Strategic Action Advice
                </span>
                <p className="text-blue-900 leading-relaxed text-[11px]">
                  {res.actionAdvice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
