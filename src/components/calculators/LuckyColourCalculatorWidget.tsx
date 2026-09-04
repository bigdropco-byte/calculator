'use client';

import React, { useState } from 'react';
import { calculateLuckyColour } from '@/lib/calculators/numerology';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Palette, Sparkles, Shirt, Zap, AlertTriangle } from 'lucide-react';

export const LuckyColourCalculatorWidget: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('1996-03-12');

  const res = calculateLuckyColour(birthDate);

  const getResultText = () => {
    return `Lucky Colour for ${birthDate}: ${res.primaryColor} (Hex: ${res.primaryHex}). Life Path Root: ${res.lifePathNumber}. Secondary Hues: ${res.secondaryColors.join(
      ', '
    )}. Power Day: ${res.powerDay}. Best Context: ${res.bestWearContext}. Colors to Avoid: ${res.avoidColor}`;
  };

  const handleReset = () => {
    setBirthDate('1996-03-12');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Enter Your Date of Birth
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Calculates your chromatic resonance from your reduced numerological birth root number.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Palette className="w-4 h-4 text-fuchsia-600" />
              <span>Chromotherapy &amp; Planetary Frequencies</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Every color vibrates at a measurable electromagnetic wavelength. Wearing or meditating with your personal power color amplifies confidence, focus, and energetic alignment.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-fuchsia-600" />
                Your Power Color Palette
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                Root #{res.lifePathNumber}
              </span>
            </div>

            {/* Color Hero Swatch */}
            <div className="mt-4 p-4 rounded-xl shadow-xs border border-slate-200/60 flex items-center gap-4 bg-white">
              <div
                className="w-16 h-16 rounded-xl shadow-md shrink-0 border border-black/10"
                style={{ backgroundColor: res.primaryHex }}
              />
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{res.primaryColor}</h3>
                <span className="text-xs font-mono text-slate-500 font-semibold uppercase">{res.primaryHex}</span>
                <p className="text-[11px] text-slate-600 mt-0.5">Ruled by {res.rulingPlanet}</p>
              </div>
            </div>

            {/* Secondary Colors */}
            <div className="mt-4 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-500" />
                Harmonious Accent Hues
              </span>
              <div className="flex flex-wrap gap-2">
                {res.secondaryColors.map((color, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium shadow-2xs"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* Guidance Cards */}
            <div className="mt-4 space-y-3">
              <div className="p-3.5 rounded-lg bg-white border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Shirt className="w-3.5 h-3.5 text-fuchsia-600" />
                  Best Wear Context (Peak Day: {res.powerDay})
                </span>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {res.bestWearContext}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-fuchsia-50/60 border border-fuchsia-100 text-xs space-y-1">
                <span className="font-bold text-fuchsia-950 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-fuchsia-600" />
                  Chakra Activation
                </span>
                <p className="text-fuchsia-900 leading-relaxed text-[11px]">
                  {res.chakra}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-200 text-xs flex items-center gap-2 text-rose-900">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="text-[11px]">
                  <strong>Draining Colors:</strong> Avoid {res.avoidColor}.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
