'use client';

import React, { useState } from 'react';
import { calculateTwinFlameLove } from '@/lib/calculators/numerology';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Heart, Sparkles, Activity, Flame, ShieldAlert } from 'lucide-react';

export const TwinFlameLoveWidget: React.FC = () => {
  const [name1, setName1] = useState<string>('Isabella Ross');
  const [dob1, setDob1] = useState<string>('1996-02-14');
  const [name2, setName2] = useState<string>('Lucas Bennett');
  const [dob2, setDob2] = useState<string>('1994-08-29');

  const res = calculateTwinFlameLove(name1, dob1, name2, dob2);

  const getResultText = () => {
    return `Twin Flame Love Score: ${res.loveScore}% (${res.passionLevel}). Emotional Bond: ${res.emotionalBond}. Runner-Chaser Dynamic: ${res.runnerChaserDynamic}. Healing Catalyst: ${res.healingCatalyst}`;
  };

  const handleReset = () => {
    setName1('Isabella Ross');
    setDob1('1996-02-14');
    setName2('Lucas Bennett');
    setDob2('1994-08-29');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="p-3.5 bg-pink-50/50 border border-pink-100 rounded-xl space-y-3">
            <span className="text-xs font-bold text-pink-950 uppercase tracking-wider block">
              Partner 1 Details
            </span>
            <input
              type="text"
              value={name1}
              onChange={e => setName1(e.target.value)}
              placeholder="Full Birth Name"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-base focus:outline-hidden focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
            />
            <input
              type="date"
              value={dob1}
              onChange={e => setDob1(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-base focus:outline-hidden focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
            />
          </div>

          <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl space-y-3">
            <span className="text-xs font-bold text-rose-950 uppercase tracking-wider block">
              Partner 2 Details
            </span>
            <input
              type="text"
              value={name2}
              onChange={e => setName2(e.target.value)}
              placeholder="Full Birth Name"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-base focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
            <input
              type="date"
              value={dob2}
              onChange={e => setDob2(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-base focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-pink-50/40 border border-pink-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-800 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-pink-600" />
                Heart Connection Affinity
              </span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-900 border border-pink-200">
                {res.passionLevel}
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-black text-pink-950 tracking-tight">
                {res.loveScore}%
              </span>
              <span className="text-sm font-bold text-pink-800">Heart Chakra Resonance</span>
            </div>

            <div className="mt-2 w-full bg-pink-200/60 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-500 to-rose-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${res.loveScore}%` }}
              />
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 bg-white/90 border border-pink-100 rounded-lg text-xs space-y-1">
                <span className="font-bold text-pink-950 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                  Emotional &amp; Telepathic Bond
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">{res.emotionalBond}</p>
              </div>

              <div className="p-3 bg-white/90 border border-pink-100 rounded-lg text-xs space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-rose-500" />
                  Runner &amp; Chaser Dynamics
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">{res.runnerChaserDynamic}</p>
              </div>

              <div className="p-3 bg-pink-100/60 border border-pink-200 rounded-lg text-xs space-y-1">
                <span className="font-bold text-pink-950 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-rose-600" />
                  Sacred Healing Catalyst
                </span>
                <p className="text-pink-900 leading-relaxed text-[11px]">{res.healingCatalyst}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
