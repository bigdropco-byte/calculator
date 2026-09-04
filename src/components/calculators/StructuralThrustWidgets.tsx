'use client';

import React, { useState } from 'react';
import {
  calculatePipeThrust,
  calculateRafterThrust,
  calculateHipThrust,
} from '@/lib/calculators/structuralThrust';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { HardHat, Hammer, Activity, ShieldAlert } from 'lucide-react';

/**
 * 1. Pipe Thrust Block Calculator Widget
 */
export const PipeThrustWidget: React.FC = () => {
  const [diameter, setDiameter] = useState<number | ''>(8);
  const [pressure, setPressure] = useState<number | ''>(150);
  const [angle, setAngle] = useState<number | ''>(90);
  const [soilCapacity, setSoilCapacity] = useState<number | ''>(2000);
  const [safetyFactor, setSafetyFactor] = useState<number | ''>(1.5);

  const res = calculatePipeThrust({
    pipeDiameterInches: Number(diameter) || 4,
    internalPressurePsi: Number(pressure) || 100,
    deflectionAngleDegrees: Number(angle) || 90,
    soilBearingCapacityPsf: Number(soilCapacity) || 2000,
    safetyFactor: Number(safetyFactor) || 1.5,
  });

  const getResultText = () =>
    `Pipe Thrust Block Force: ${res.thrustForceLbs.toLocaleString()} lbs (${res.thrustForceKn} kN). Pipe: ${diameter}" @ ${pressure} psi on ${angle}° bend. Minimum Concrete Bearing Area: ${res.minBearingAreaSqFt} sq ft (Soil: ${soilCapacity} psf, SF: ${safetyFactor}).`;

  const handleReset = () => {
    setDiameter(8);
    setPressure(150);
    setAngle(90);
    setSoilCapacity(2000);
    setSafetyFactor(1.5);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <HardHat className="w-5 h-5 text-amber-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Pipe Thrust Block Calculator</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Pipe Diameter (Inches)</label>
              <input
                type="number"
                min={1}
                max={96}
                value={diameter}
                onChange={e => setDiameter(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Test Pressure (PSI)</label>
              <input
                type="number"
                min={10}
                max={1500}
                value={pressure}
                onChange={e => setPressure(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Deflection Angle (Fitting)</label>
            <div className="grid grid-cols-4 gap-2">
              {[90, 45, 22.5, 180].map(a => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAngle(a)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    angle === a ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {a === 180 ? 'Dead End' : `${a}° Bend`}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Soil Bearing (PSF)</label>
              <input
                type="number"
                min={500}
                max={10000}
                step={500}
                value={soilCapacity}
                onChange={e => setSoilCapacity(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Sand: ~2000, Clay: ~3000 psf</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Safety Factor</label>
              <input
                type="number"
                min={1.0}
                max={3.0}
                step={0.1}
                value={safetyFactor}
                onChange={e => setSafetyFactor(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="pt-2">
            <CalculatorActions resultText={getResultText()} onReset={handleReset} />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hydraulic Restraint Sizing</div>

          <div className="bg-white border border-amber-200 rounded-xl p-4 shadow-2xs">
            <div className="text-xs text-amber-700 font-semibold mb-1">Resulting Hydrostatic Thrust</div>
            <div className="text-3xl font-extrabold text-amber-950 flex items-baseline gap-1.5">
              {res.thrustForceLbs.toLocaleString()} <span className="text-sm font-semibold text-amber-600">LBS</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Equivalent to <span className="font-semibold text-slate-800">{res.thrustForceKn} kN</span> of lateral force on fitting
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200">
            <div className="text-xs font-semibold text-slate-700 mb-1">Required Thrust Block Bearing Area:</div>
            <div className="text-2xl font-bold text-slate-900">{res.minBearingAreaSqFt} sq ft</div>
            <p className="text-[11px] text-slate-500 mt-1">
              Minimum undisturbed soil contact surface required for poured-in-place concrete thrust block with {safetyFactor}x safety factor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 2. Rafter Thrust Calculator Widget
 */
export const RafterThrustWidget: React.FC = () => {
  const [span, setSpan] = useState<number | ''>(24);
  const [slope, setSlope] = useState<number | ''>(4);
  const [load, setLoad] = useState<number | ''>(40);
  const [spacing, setSpacing] = useState<number | ''>(24);

  const res = calculateRafterThrust({
    spanFeet: Number(span) || 10,
    riseInchesPerFoot: Number(slope) || 4,
    totalUniformLoadPsf: Number(load) || 30,
    rafterSpacingInches: Number(spacing) || 24,
  });

  const getResultText = () =>
    `Roof Rafter Outward Thrust: ${res.horizontalThrustLbs} lbs horizontal force per rafter pair at wall plate. Vertical Reaction: ${res.verticalReactionLbs} lbs. Building Span: ${span}ft, Slope: ${slope}/12 (${res.pitchAngleDeg}°), Load: ${load} psf. ${res.requiresTiesWarning ? 'Warning: Significant outward wall spreading force! Collar ties or structural ridge beam required.' : ''}`;

  const handleReset = () => {
    setSpan(24);
    setSlope(4);
    setLoad(40);
    setSpacing(24);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Hammer className="w-5 h-5 text-orange-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Rafter Thrust Calculator</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Building Span (Feet)</label>
              <input
                type="number"
                min={6}
                max={100}
                value={span}
                onChange={e => setSpan(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Roof Pitch (Rise / 12)</label>
              <input
                type="number"
                min={1}
                max={24}
                value={slope}
                onChange={e => setSlope(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">E.g. 4 for 4:12 pitch ({res.pitchAngleDeg}°)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Total Load (PSF)</label>
              <input
                type="number"
                min={10}
                max={150}
                value={load}
                onChange={e => setLoad(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Dead + Live/Snow load</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Rafter Spacing (Inches)</label>
              <div className="grid grid-cols-2 gap-2">
                {[16, 24].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSpacing(s)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                      spacing === s ? 'bg-orange-600 text-white border-orange-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {s}&Prime; o.c.
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <CalculatorActions resultText={getResultText()} onReset={handleReset} />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Structural Wall Reactions</div>

          <div className="bg-white border border-orange-200 rounded-xl p-4 shadow-2xs">
            <div className="text-xs text-orange-700 font-semibold mb-1">Outward Horizontal Thrust (H)</div>
            <div className="text-3xl font-extrabold text-orange-950 flex items-baseline gap-1.5">
              {res.horizontalThrustLbs.toLocaleString()} <span className="text-sm font-semibold text-orange-600">LBS</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Pushing outwards at the top plate per rafter pair
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 block">Vertical Reaction (V):</span>
              <span className="font-bold text-slate-900 text-base">{res.verticalReactionLbs} lbs</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 block">Rafter Sloped Length:</span>
              <span className="font-bold text-slate-900 text-base">{res.rafterLengthFeet} ft</span>
            </div>
          </div>

          {res.requiresTiesWarning && (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-800 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Ceiling Joists / Ties Required:</span> Because roof pitch is low or thrust is substantial ({res.horizontalThrustLbs} lbs), continuous rafter ties in the lower third or a structural ridge beam are required by building code to prevent wall blow-out.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * 3. Barbell Hip Thrust Calculator Widget
 */
export const HipThrustWidget: React.FC = () => {
  const [weight, setWeight] = useState<number | ''>(275);
  const [reps, setReps] = useState<number | ''>(8);
  const [bodyweight, setBodyweight] = useState<number | ''>(165);
  const [sets, setSets] = useState<number | ''>(3);

  const res = calculateHipThrust({
    weightLifted: Number(weight) || 135,
    reps: Number(reps) || 1,
    userBodyweight: Number(bodyweight) || 0,
    sets: Number(sets) || 1,
  });

  const getResultText = () =>
    `Barbell Hip Thrust: Estimated 1RM: ${res.oneRepMaxAverage} lbs (${res.bodyweightMultiple}x bodyweight). Lifted: ${weight} lbs × ${reps} reps across ${sets} sets (Total Volume: ${res.totalVolume.toLocaleString()} lbs).`;

  const handleReset = () => {
    setWeight(275);
    setReps(8);
    setBodyweight(165);
    setSets(3);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Activity className="w-5 h-5 text-purple-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Hip Thrust 1RM Calculator</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Weight Lifted (LBS)</label>
              <input
                type="number"
                min={45}
                max={1500}
                step={5}
                value={weight}
                onChange={e => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Reps Completed</label>
              <input
                type="number"
                min={1}
                max={30}
                value={reps}
                onChange={e => setReps(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Your Bodyweight (LBS)</label>
              <input
                type="number"
                min={80}
                max={400}
                value={bodyweight}
                onChange={e => setBodyweight(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Sets Performed</label>
              <input
                type="number"
                min={1}
                max={10}
                value={sets}
                onChange={e => setSets(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="pt-2">
            <CalculatorActions resultText={getResultText()} onReset={handleReset} />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Strength Output</div>

          <div className="bg-white border border-purple-200 rounded-xl p-4 shadow-2xs">
            <div className="text-xs text-purple-700 font-semibold mb-1">Estimated One-Rep Max (1RM)</div>
            <div className="text-3xl font-extrabold text-purple-950 flex items-baseline gap-1.5">
              {res.oneRepMaxAverage} <span className="text-sm font-semibold text-purple-600">LBS</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Relative Strength: <span className="font-semibold text-slate-800">{res.bodyweightMultiple}x</span> bodyweight | Total Volume: <span className="font-semibold text-slate-800">{res.totalVolume.toLocaleString()} lbs</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs">
            <div className="font-semibold text-slate-800 mb-2">Target Training Percentages:</div>
            <div className="space-y-1.5">
              {res.trainingPercentages.map(tp => (
                <div key={tp.percentage} className="flex justify-between items-center py-0.5 border-b border-slate-100 last:border-0">
                  <span className="font-medium text-slate-600">{tp.percentage}% 1RM ({tp.weight} lbs):</span>
                  <span className="text-slate-900 font-semibold">{tp.targetReps}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
