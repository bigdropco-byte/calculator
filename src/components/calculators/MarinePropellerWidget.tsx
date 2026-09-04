'use client';

import React, { useState } from 'react';
import { calculatePropellerSpeed, calculateSailboatPropeller } from '@/lib/calculators/marinePropellers';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Gauge, Ship, Compass, ArrowRight, Anchor } from 'lucide-react';

export type MarinePropellerBrand = 'general' | 'suzuki' | 'mercury' | 'michigan-wheel' | 'acme' | 'sailboat';

interface Props {
  brand?: MarinePropellerBrand;
  title?: string;
  defaultGearRatio?: number;
}

export const MarinePropellerWidget: React.FC<Props> = ({
  brand = 'general',
  title = 'Propeller Calculator',
  defaultGearRatio = 2.0,
}) => {
  // Sailboat state
  const isSailboat = brand === 'sailboat';
  const [lwl, setLwl] = useState<number | ''>(28);
  const [hp, setHp] = useState<number | ''>(25);
  const [shaftRpm, setShaftRpm] = useState<number | ''>(1200);
  const [blades, setBlades] = useState<2 | 3 | 4>(3);

  // Powerboat prop state
  const [rpm, setRpm] = useState<number | ''>(5500);
  const [pitch, setPitch] = useState<number | ''>(19);
  const [gearRatio, setGearRatio] = useState<number | ''>(
    brand === 'suzuki' ? 2.50 : brand === 'mercury' ? 1.85 : brand === 'acme' ? 1.23 : defaultGearRatio
  );
  const [slip, setSlip] = useState<number | ''>(12);
  const [mode, setMode] = useState<'slip' | 'speed'>('speed');
  const [actualSpeedMph, setActualSpeedMph] = useState<number | ''>(42);

  // Calculations
  const powerboatResult = calculatePropellerSpeed({
    rpm: Number(rpm) || 0,
    pitchInches: Number(pitch) || 0,
    gearRatio: Number(gearRatio) || 1,
    slipPercentage: mode === 'speed' ? Number(slip) || 0 : undefined,
    actualSpeedMph: mode === 'slip' ? Number(actualSpeedMph) || 0 : undefined,
  });

  const sailboatResult = calculateSailboatPropeller({
    waterlineLengthFeet: Number(lwl) || 20,
    engineHorsepower: Number(hp) || 15,
    shaftRpm: Number(shaftRpm) || 1000,
    bladeCount: blades,
  });

  const getResultText = () => {
    if (isSailboat) {
      return `${title}: Sailboat Waterline: ${lwl}ft, HP: ${hp}, Shaft RPM: ${shaftRpm}. Hull Speed: ${sailboatResult.theoreticalHullSpeedKnots} knots, Cruising Speed: ${sailboatResult.cruisingSpeedKnots} knots. Recommended Prop: ${sailboatResult.recommendedDiameterInches}" dia × ${sailboatResult.recommendedPitchInches}" pitch (${blades}-blade).`;
    }
    return `${title}: Engine RPM: ${rpm}, Pitch: ${pitch}", Ratio: ${gearRatio}:1. Theoretical Speed: ${powerboatResult.theoreticalSpeedMph} mph (${powerboatResult.theoreticalSpeedKnots} kts). Actual Speed: ${powerboatResult.actualSpeedMph} mph with ${powerboatResult.slipPercentage}% slip.`;
  };

  const handleReset = () => {
    if (isSailboat) {
      setLwl(28);
      setHp(25);
      setShaftRpm(1200);
      setBlades(3);
    } else {
      setRpm(5500);
      setPitch(19);
      setGearRatio(brand === 'suzuki' ? 2.50 : brand === 'mercury' ? 1.85 : brand === 'acme' ? 1.23 : defaultGearRatio);
      setSlip(12);
      setMode('speed');
      setActualSpeedMph(42);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Ship className="w-5 h-5 text-sky-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">{title}</h2>
          </div>

          {isSailboat ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Waterline Length (LWL in Feet)
                </label>
                <input
                  type="number"
                  min={10}
                  max={120}
                  step={0.5}
                  value={lwl}
                  onChange={e => setLwl(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">Length along the waterline, not overall length (LOA).</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Engine HP
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={500}
                    value={hp}
                    onChange={e => setHp(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Shaft RPM at Cruise
                  </label>
                  <input
                    type="number"
                    min={300}
                    max={4000}
                    step={50}
                    value={shaftRpm}
                    onChange={e => setShaftRpm(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Propeller Blade Configuration
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[2, 3, 4].map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBlades(b as 2 | 3 | 4)}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                        blades === b
                          ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {b} Blades
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setMode('speed')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    mode === 'speed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Calculate Speed from Slip
                </button>
                <button
                  type="button"
                  onClick={() => setMode('slip')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    mode === 'slip' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Calculate Slip from GPS Speed
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Engine RPM
                  </label>
                  <input
                    type="number"
                    min={500}
                    max={9000}
                    step={100}
                    value={rpm}
                    onChange={e => setRpm(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Propeller Pitch (Inches)
                  </label>
                  <input
                    type="number"
                    min={8}
                    max={40}
                    step={0.5}
                    value={pitch}
                    onChange={e => setPitch(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Gear Ratio
                  </label>
                  <input
                    type="number"
                    min={0.5}
                    max={4.0}
                    step={0.01}
                    value={gearRatio}
                    onChange={e => setGearRatio(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {brand === 'suzuki'
                      ? 'Suzuki DF: 2.08 to 2.59:1'
                      : brand === 'mercury'
                      ? 'Mercury: 1.75 to 2.07:1'
                      : brand === 'acme'
                      ? 'Inboard: 1.0 to 1.5:1'
                      : 'E.g. 1.85, 2.00, 2.50:1'}
                  </span>
                </div>
                <div>
                  {mode === 'speed' ? (
                    <>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Propeller Slip (%)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={50}
                        step={1}
                        value={slip}
                        onChange={e => setSlip(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">Typical: 8%–15% for planing hulls</span>
                    </>
                  ) : (
                    <>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Actual GPS Speed (MPH)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={150}
                        step={0.5}
                        value={actualSpeedMph}
                        onChange={e => setActualSpeedMph(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">Measured on flat calm water</span>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="pt-2">
            <CalculatorActions resultText={getResultText()} onReset={handleReset} />
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Performance Results</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800">
              {brand.toUpperCase()}
            </span>
          </div>

          {isSailboat ? (
            <>
              <div className="bg-white border border-sky-200 rounded-xl p-4 shadow-2xs">
                <div className="text-xs text-sky-700 font-semibold mb-1">Theoretical Hull Speed</div>
                <div className="text-3xl font-extrabold text-sky-950 flex items-baseline gap-1.5">
                  {sailboatResult.theoreticalHullSpeedKnots} <span className="text-sm font-semibold text-sky-600">knots</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Target cruising speed: <span className="font-semibold text-slate-700">{sailboatResult.cruisingSpeedKnots} kts</span> ({Number((sailboatResult.cruisingSpeedKnots * 1.15078).toFixed(1))} mph)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Rec. Prop Diameter</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">{sailboatResult.recommendedDiameterInches}&Prime;</div>
                  <div className="text-[11px] text-slate-500">inches</div>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Rec. Prop Pitch</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">{sailboatResult.recommendedPitchInches}&Prime;</div>
                  <div className="text-[11px] text-slate-500">inches</div>
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-600">
                <div className="font-semibold text-slate-800 mb-0.5 flex items-center gap-1.5">
                  <Anchor className="w-3.5 h-3.5 text-sky-600" />
                  Blade Characteristic
                </div>
                {sailboatResult.bladeDragFactor}
              </div>
            </>
          ) : (
            <>
              <div className="bg-white border border-sky-200 rounded-xl p-4 shadow-2xs">
                <div className="text-xs text-sky-700 font-semibold mb-1">
                  {mode === 'speed' ? 'Actual Calculated Boat Speed' : 'Calculated Propeller Slip'}
                </div>
                <div className="text-3xl font-extrabold text-sky-950 flex items-baseline gap-1.5">
                  {mode === 'speed' ? (
                    <>
                      {powerboatResult.actualSpeedMph} <span className="text-sm font-semibold text-sky-600">MPH</span>
                    </>
                  ) : (
                    <>
                      {powerboatResult.slipPercentage}% <span className="text-sm font-semibold text-sky-600">SLIP</span>
                    </>
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {mode === 'speed'
                    ? `Equivalent to ${powerboatResult.actualSpeedKnots} knots on water`
                    : `Theoretical pitch speed was ${powerboatResult.theoreticalSpeedMph} mph`}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Theoretical Speed</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">{powerboatResult.theoreticalSpeedMph} mph</div>
                  <div className="text-[11px] text-slate-500">{powerboatResult.theoreticalSpeedKnots} knots</div>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Propeller Slip</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">{powerboatResult.slipPercentage}%</div>
                  <div className="text-[11px] text-slate-500">
                    {powerboatResult.slipPercentage < 10
                      ? 'High efficiency'
                      : powerboatResult.slipPercentage <= 18
                      ? 'Normal recreational'
                      : 'High slip / check pitch'}
                  </div>
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Engine Speed:</span>
                  <span className="font-semibold text-slate-800">{powerboatResult.rpm.toLocaleString()} RPM</span>
                </div>
                <div className="flex justify-between">
                  <span>Propeller Pitch:</span>
                  <span className="font-semibold text-slate-800">{powerboatResult.pitchInches}&Prime;</span>
                </div>
                <div className="flex justify-between">
                  <span>Lower Unit Gear Ratio:</span>
                  <span className="font-semibold text-slate-800">{powerboatResult.gearRatio}:1</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
