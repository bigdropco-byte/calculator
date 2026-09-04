'use client';

import React, { useState } from 'react';
import { calculateSoulUrgeNumber } from '@/lib/calculators/numerology';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Heart, Sparkles, Key } from 'lucide-react';

export const SoulUrgeCalculatorWidget: React.FC = () => {
  const [fullName, setFullName] = useState<string>('Alexander James Smith');

  const res = calculateSoulUrgeNumber(fullName);

  const getResultText = () => {
    return `Soul Urge (Heart's Desire) Number: ${res.number} (${res.archetype}) for "${fullName}". Deepest Longing: ${res.heartDesire}. Vowels Analyzed: ${res.vowelsFound.join(', ')}`;
  };

  const handleReset = () => {
    setFullName('Alexander James Smith');
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
              placeholder="e.g. Alexander James Smith"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              The Soul Urge (Heart&apos;s Desire) number isolates the vowels (A, E, I, O, U, Y) from your full birth name.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100 text-xs text-rose-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-rose-950">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>The Whispers of Your Inner Self</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              While your Expression number reflects how you act outwardly, your Soul Urge reveals who you are when nobody is watching: your private hopes, hidden longing, and emotional truth.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-rose-50/40 border border-rose-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500" />
                Soul Urge (Heart&apos;s Desire)
              </span>
              {res.isMaster && (
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Master Number
                </span>
              )}
            </div>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-black text-rose-950 tracking-tight">
                {res.number}
              </span>
              <div>
                <h3 className="text-base font-bold text-rose-950">{res.archetype}</h3>
                <p className="text-xs text-rose-700 font-medium">Derived from vowels</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3.5 rounded-lg bg-white/90 border border-rose-100 text-xs space-y-1">
                <span className="font-bold text-rose-950 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-rose-500" />
                  Deepest Heart Longing
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {res.heartDesire}
                </p>
              </div>

              <div className="p-3 bg-rose-100/60 border border-rose-200 rounded-lg text-xs space-y-1.5 text-rose-950">
                <span className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                  Vowels Discovered in Name
                </span>
                <div className="flex flex-wrap gap-1">
                  {res.vowelsFound.map((vowel, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white border border-rose-200 rounded text-rose-900 font-mono font-bold text-xs"
                    >
                      {vowel}
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
