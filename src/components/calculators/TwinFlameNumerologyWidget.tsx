'use client';

import React, { useState } from 'react';
import { calculateTwinFlameNumerology } from '@/lib/calculators/numerology';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Sparkles, Flame, Heart, Compass, User } from 'lucide-react';

export const TwinFlameNumerologyWidget: React.FC = () => {
  const [name1, setName1] = useState<string>('Elena Gilbert');
  const [dob1, setDob1] = useState<string>('1992-06-22');
  const [name2, setName2] = useState<string>('Stefan Salvatore');
  const [dob2, setDob2] = useState<string>('1990-11-05');

  const res = calculateTwinFlameNumerology(name1, dob1, name2, dob2);

  const getResultText = () => {
    return `Twin Flame Multi-Pillar Numerology: Affinity ${res.overallAffinity}%. Life Path: ${res.lifePathMatch.p1} & ${res.lifePathMatch.p2} (${res.lifePathMatch.score}%). Soul Urge: ${res.soulUrgeMatch.p1} & ${res.soulUrgeMatch.p2} (${res.soulUrgeMatch.score}%). Expression: ${res.expressionMatch.p1} & ${res.expressionMatch.p2} (${res.expressionMatch.score}%). Summary: ${res.synthesisSummary}`;
  };

  const handleReset = () => {
    setName1('Elena Gilbert');
    setDob1('1992-06-22');
    setName2('Stefan Salvatore');
    setDob2('1990-11-05');
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

          <div className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-3">
            <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider block">
              Partner 2 Details
            </span>
            <input
              type="text"
              value={name2}
              onChange={e => setName2(e.target.value)}
              placeholder="Full Birth Name"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-base focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <input
              type="date"
              value={dob2}
              onChange={e => setDob2(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-base focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-rose-50/40 border border-rose-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500" />
                Multi-Pillar Numerology Alignment
              </span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900">
                {res.overallAffinity}% Match
              </span>
            </div>

            {/* Core Pillars Comparison */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="p-3 bg-white rounded-lg border border-rose-100 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Life Path</span>
                <div className="mt-1 flex justify-center items-center gap-1.5">
                  <span className="text-lg font-black text-rose-900">{res.lifePathMatch.p1}</span>
                  <span className="text-xs text-slate-400">&amp;</span>
                  <span className="text-lg font-black text-indigo-900">{res.lifePathMatch.p2}</span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 block mt-0.5">
                  {res.lifePathMatch.score}% Sync
                </span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-rose-100 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Soul Urge</span>
                <div className="mt-1 flex justify-center items-center gap-1.5">
                  <span className="text-lg font-black text-rose-900">{res.soulUrgeMatch.p1}</span>
                  <span className="text-xs text-slate-400">&amp;</span>
                  <span className="text-lg font-black text-indigo-900">{res.soulUrgeMatch.p2}</span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 block mt-0.5">
                  {res.soulUrgeMatch.score}% Sync
                </span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-rose-100 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Expression</span>
                <div className="mt-1 flex justify-center items-center gap-1.5">
                  <span className="text-lg font-black text-rose-900">{res.expressionMatch.p1}</span>
                  <span className="text-xs text-slate-400">&amp;</span>
                  <span className="text-lg font-black text-indigo-900">{res.expressionMatch.p2}</span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 block mt-0.5">
                  {res.expressionMatch.score}% Sync
                </span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-rose-100 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Personality</span>
                <div className="mt-1 flex justify-center items-center gap-1.5">
                  <span className="text-lg font-black text-rose-900">{res.personalityMatch.p1}</span>
                  <span className="text-xs text-slate-400">&amp;</span>
                  <span className="text-lg font-black text-indigo-900">{res.personalityMatch.p2}</span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 block mt-0.5">
                  {res.personalityMatch.score}% Sync
                </span>
              </div>
            </div>

            {/* Alignment Summary */}
            <div className="mt-4 p-4 rounded-xl bg-white/90 border border-rose-100 text-xs space-y-2">
              <span className="font-bold text-rose-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                Synthesis &amp; Alignment Summary
              </span>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                {res.synthesisSummary}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-rose-200/60 text-xs text-slate-500 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Comprehensive Western Pythagorean numerology matrix.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
