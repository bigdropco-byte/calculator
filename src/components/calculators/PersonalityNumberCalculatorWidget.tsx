'use client';

import React, { useState } from 'react';
import { calculatePersonalityNumber } from '@/lib/calculators/numerology';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { User, Sparkles, Shield } from 'lucide-react';

export const PersonalityNumberCalculatorWidget: React.FC = () => {
  const [fullName, setFullName] = useState<string>('Michael David Brown');

  const res = calculatePersonalityNumber(fullName);

  const getResultText = () => {
    return `Personality Number: ${res.number} (${res.archetype}) for "${fullName}". Outer Social Style: ${res.socialStyle}. Consonants: ${res.consonantsFound.join(', ')}`;
  };

  const handleReset = () => {
    setFullName('Michael David Brown');
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
              placeholder="e.g. Michael David Brown"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Calculated exclusively from consonants (all letters except A, E, I, O, U, Y).
            </span>
          </div>

          <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100 text-xs text-teal-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-teal-950">
              <Shield className="w-4 h-4 text-teal-600" />
              <span>Your Outer Armor &amp; Social Persona</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Consonants represent the outer perimeter of your energetic field. Your Personality Number defines the face you show to strangers, your dressing aesthetic, and your conversational magnetism.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-teal-50/40 border border-teal-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
                <User className="w-4 h-4 text-teal-600" />
                Personality Number Profile
              </span>
              {res.isMaster && (
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Master Number
                </span>
              )}
            </div>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-black text-teal-950 tracking-tight">
                {res.number}
              </span>
              <div>
                <h3 className="text-base font-bold text-teal-950">{res.archetype}</h3>
                <p className="text-xs text-teal-700 font-medium">Derived from consonants</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3.5 rounded-lg bg-white/90 border border-teal-100 text-xs space-y-1">
                <span className="font-bold text-teal-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  Social Presence &amp; Outer Aura
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {res.socialStyle}
                </p>
              </div>

              <div className="p-3 bg-teal-100/60 border border-teal-200 rounded-lg text-xs space-y-1.5 text-teal-950">
                <span className="font-bold flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-teal-700" />
                  Consonants Processed
                </span>
                <div className="flex flex-wrap gap-1">
                  {res.consonantsFound.map((cons, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white border border-teal-200 rounded text-teal-900 font-mono font-bold text-xs"
                    >
                      {cons}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
