'use client';

import React, { useState } from 'react';
import { calculateTwinFlame } from '@/lib/calculators/numerology';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Flame, Sparkles, Compass, HeartHandshake } from 'lucide-react';

export const TwinFlameCalculatorWidget: React.FC = () => {
  const [name1, setName1] = useState<string>('Jordan Taylor');
  const [dob1, setDob1] = useState<string>('1994-06-12');
  const [name2, setName2] = useState<string>('Morgan Bailey');
  const [dob2, setDob2] = useState<string>('1995-10-28');

  const res = calculateTwinFlame(name1, dob1, name2, dob2);

  const getResultText = () => {
    return `Twin Flame Soul Resonance: ${res.overallScore}% (${res.connectionType}). Current Stage: ${res.currentStage}. Telepathy Index: ${res.telepathyIndex}%. Spiritual Mission: ${res.spiritualMission}. Advice: ${res.advice}`;
  };

  const handleReset = () => {
    setName1('Jordan Taylor');
    setDob1('1994-06-12');
    setName2('Morgan Bailey');
    setDob2('1995-10-28');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl space-y-3">
            <span className="text-xs font-bold text-rose-950 uppercase tracking-wider block">
              Partner 1 Details
            </span>
            <div className="space-y-2">
              <input
                type="text"
                value={name1}
                onChange={e => setName1(e.target.value)}
                placeholder="Full Birth Name"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-base focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
              <input
                type="date"
                value={dob1}
                onChange={e => setDob1(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-base focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
            </div>
          </div>

          <div className="p-3.5 bg-amber-50/50 border border-amber-100 rounded-xl space-y-3">
            <span className="text-xs font-bold text-amber-950 uppercase tracking-wider block">
              Partner 2 Details
            </span>
            <div className="space-y-2">
              <input
                type="text"
                value={name2}
                onChange={e => setName2(e.target.value)}
                placeholder="Full Birth Name"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-base focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
              <input
                type="date"
                value={dob2}
                onChange={e => setDob2(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-base focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-rose-50/40 border border-rose-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500" />
                Twin Flame Soul Resonance
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-200">
                {res.connectionType}
              </span>
            </div>

            {/* Gauge */}
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-black text-rose-950 tracking-tight">
                {res.overallScore}%
              </span>
              <span className="text-sm font-bold text-rose-800">Soul Mirror Affinity</span>
            </div>

            {/* Progress bar */}
            <div className="mt-2 w-full bg-rose-200/60 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-rose-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${res.overallScore}%` }}
              />
            </div>

            {/* Stage */}
            <div className="mt-4 p-3.5 rounded-lg bg-white/90 border border-rose-100 space-y-1 text-xs">
              <span className="font-bold text-rose-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                Current Journey Stage
              </span>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                {res.currentStage}
              </p>
            </div>

            {/* Mirror Dynamics & Mission */}
            <div className="mt-3 space-y-2 text-xs">
              <div className="p-3 bg-white/80 border border-rose-100 rounded-lg">
                <span className="font-bold text-rose-950 flex items-center gap-1 mb-1">
                  <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
                  Spiritual Mission &amp; Purpose
                </span>
                <p className="text-[11px] leading-relaxed text-slate-700">{res.spiritualMission}</p>
              </div>

              <div className="p-3 bg-white/80 border border-rose-100 rounded-lg">
                <span className="font-bold text-slate-900 flex items-center gap-1 mb-1">
                  <Compass className="w-3.5 h-3.5 text-amber-600" />
                  Mirror Dynamics (Telepathy: {res.telepathyIndex}%)
                </span>
                <p className="text-[11px] leading-relaxed text-slate-700">{res.mirrorDynamics}</p>
              </div>

              <div className="p-3 bg-rose-100/60 border border-rose-200 rounded-lg text-rose-950">
                <span className="font-bold flex items-center gap-1 mb-0.5">
                  <Compass className="w-3.5 h-3.5 text-rose-600" />
                  Union Advice
                </span>
                <p className="text-[11px] leading-relaxed text-rose-900">{res.advice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
