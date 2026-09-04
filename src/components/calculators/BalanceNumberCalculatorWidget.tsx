'use client';

import React, { useState } from 'react';
import { calculateBalanceNumber } from '@/lib/calculators/numerology';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Scale, Sparkles, ShieldAlert, HeartPulse } from 'lucide-react';

export const BalanceNumberCalculatorWidget: React.FC = () => {
  const [fullName, setFullName] = useState<string>('Sophia Grace Miller');

  const res = calculateBalanceNumber(fullName);

  const getResultText = () => {
    return `Balance Number: ${res.number} (Initials: ${res.initials.join(
      '.'
    )}.) for "${fullName}". Crisis Response: ${res.crisisResponse}. Calming Advice: ${res.calmingAdvice}`;
  };

  const handleReset = () => {
    setFullName('Sophia Grace Miller');
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
              placeholder="e.g. Sophia Grace Miller"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Calculated by summing the numerical values of the initial letters of each part of your name.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-100 text-xs text-cyan-950 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-cyan-950">
              <Scale className="w-4 h-4 text-cyan-600" />
              <span>Emotional Resilience Under Pressure</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              When life throws chaos, setbacks, or emotional turmoil, your Balance Number acts as your psychic shock absorber. It shows how you regain equilibrium when feeling overwhelmed.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-cyan-50/40 border border-cyan-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-cyan-600" />
                Balance &amp; Resilience Profile
              </span>
              <div className="flex gap-1 font-mono font-bold text-xs bg-cyan-100/70 text-cyan-900 px-2.5 py-0.5 rounded-md">
                Initials: {res.initials.join('. ')}.
              </div>
            </div>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-black text-cyan-950 tracking-tight">
                {res.number}
              </span>
              <div>
                <h3 className="text-base font-bold text-cyan-950">Equilibrium Vibration</h3>
                <p className="text-xs text-cyan-700 font-medium">Calculated from name initials</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3.5 rounded-lg bg-white/90 border border-cyan-100 text-xs space-y-1">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  Instinctive Crisis Response
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {res.crisisResponse}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-cyan-100/60 border border-cyan-200 text-xs space-y-1">
                <span className="font-bold text-cyan-950 flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-cyan-700" />
                  Calming Equilibrium Advice
                </span>
                <p className="text-cyan-900 leading-relaxed text-[11px]">
                  {res.calmingAdvice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
