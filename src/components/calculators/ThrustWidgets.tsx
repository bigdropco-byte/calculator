'use client';

import React, { useState } from 'react';
import {
  calculateThrustToWeight,
  calculateDroneThrust,
  calculateRocketThrust,
  calculatePropellerThrust,
  calculateJetEngineThrust,
} from '@/lib/calculators/thrustPhysics';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Rocket, Plane, Wind, Zap, Gauge, Flame, Activity } from 'lucide-react';

/**
 * 1. Thrust to Weight Ratio Widget
 */
export const ThrustToWeightWidget: React.FC = () => {
  const [thrust, setThrust] = useState<number | ''>(1500);
  const [weight, setWeight] = useState<number | ''>(1000);
  const [unit, setUnit] = useState<'kg' | 'lbs' | 'newtons'>('kg');

  const res = calculateThrustToWeight({
    thrust: Number(thrust) || 0,
    weight: Number(weight) || 1,
    unit,
  });

  const getResultText = () =>
    `Thrust-to-Weight Ratio: ${res.twr}:1 (Thrust: ${thrust} ${unit}, Weight: ${weight} ${unit}). Vertical Acceleration: ${res.verticalAccelerationG}G (${res.verticalAccelerationMs2} m/s²). Capability: ${res.flightCapability}.`;

  const handleReset = () => {
    setThrust(1500);
    setWeight(1000);
    setUnit('kg');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Gauge className="w-5 h-5 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Thrust-to-Weight Ratio</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Measurement Unit</label>
            <div className="grid grid-cols-3 gap-2">
              {(['kg', 'lbs', 'newtons'] as const).map(u => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    unit === u ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {u.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Total Thrust ({unit})</label>
              <input
                type="number"
                min={0}
                value={thrust}
                onChange={e => setThrust(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Total All-Up Weight ({unit})</label>
              <input
                type="number"
                min={0.01}
                value={weight}
                onChange={e => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="pt-2">
            <CalculatorActions resultText={getResultText()} onReset={handleReset} />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Calculated Dynamics</div>

          <div className="bg-white border border-indigo-200 rounded-xl p-4 shadow-2xs">
            <div className="text-xs text-indigo-700 font-semibold mb-1">Thrust-to-Weight Ratio (TWR)</div>
            <div className="text-3xl font-extrabold text-indigo-950 flex items-baseline gap-1.5">
              {res.twr}:1 <span className="text-sm font-semibold text-indigo-600">TWR</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Net Vertical Acceleration: <span className="font-semibold text-slate-800">{res.verticalAccelerationG} G</span> ({res.verticalAccelerationMs2} m/s²)
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
            <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-indigo-600" />
              Flight Profile Assessment
            </div>
            <p>{res.flightCapability}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 2. Drone Thrust Widget
 */
export const DroneThrustWidget: React.FC = () => {
  const [auw, setAuw] = useState<number | ''>(1200);
  const [motors, setMotors] = useState<3 | 4 | 6 | 8>(4);
  const [targetTwr, setTargetTwr] = useState<number | ''>(2.0);
  const [motorMaxThrust, setMotorMaxThrust] = useState<number | ''>(850);

  const res = calculateDroneThrust({
    allUpWeightGrams: Number(auw) || 500,
    motorCount: motors,
    targetTwr: Number(targetTwr) || 2.0,
    motorMaxThrustGrams: Number(motorMaxThrust) || 0,
  });

  const getResultText = () =>
    `Drone Thrust: AUW ${auw}g (${motors} motors, ${targetTwr}:1 TWR). Hover Thrust Required: ${res.hoverThrustPerMotorGrams}g/motor (${res.hoverThrottlePercentage}% throttle). Max Thrust Required: ${res.maxThrustPerMotorGrams}g/motor (${res.totalMaxThrustRequiredGrams}g total). Payload Buffer: ${res.payloadCapacityRemainingGrams}g.`;

  const handleReset = () => {
    setAuw(1200);
    setMotors(4);
    setTargetTwr(2.0);
    setMotorMaxThrust(850);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Zap className="w-5 h-5 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Drone Thrust Calculator</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Drone Frame Configuration</label>
            <div className="grid grid-cols-4 gap-2">
              {([3, 4, 6, 8] as const).map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMotors(m)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    motors === m ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {m === 3 ? 'Tricopter' : m === 4 ? 'Quadcopter' : m === 6 ? 'Hexacopter' : 'Octocopter'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">All-Up Weight (AUW in Grams)</label>
              <input
                type="number"
                min={10}
                value={auw}
                onChange={e => setAuw(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Target TWR (Hover 50% = 2.0)</label>
              <input
                type="number"
                min={1.2}
                max={10}
                step={0.1}
                value={targetTwr}
                onChange={e => setTargetTwr(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Installed Motor Max Thrust (g/motor, optional)</label>
            <input
              type="number"
              min={0}
              value={motorMaxThrust}
              onChange={e => setMotorMaxThrust(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">Spec sheet maximum static thrust per motor to check payload margin.</span>
          </div>

          <div className="pt-2">
            <CalculatorActions resultText={getResultText()} onReset={handleReset} />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thrust Specification</div>

          <div className="bg-white border border-emerald-200 rounded-xl p-4 shadow-2xs">
            <div className="text-xs text-emerald-700 font-semibold mb-1">Required Hover Thrust (Per Motor)</div>
            <div className="text-3xl font-extrabold text-emerald-950 flex items-baseline gap-1.5">
              {res.hoverThrustPerMotorGrams} <span className="text-sm font-semibold text-emerald-600">grams/motor</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Drone hovers at <span className="font-semibold text-slate-800">{res.hoverThrottlePercentage}% throttle</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3.5 rounded-lg border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Max Thrust / Motor</div>
              <div className="text-lg font-bold text-slate-900 mt-0.5">{res.maxThrustPerMotorGrams} g</div>
              <div className="text-[11px] text-slate-500">at 100% throttle</div>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Total System Thrust</div>
              <div className="text-lg font-bold text-slate-900 mt-0.5">{res.totalMaxThrustRequiredGrams} g</div>
              <div className="text-[11px] text-slate-500">all {motors} motors combined</div>
            </div>
          </div>

          {res.payloadCapacityRemainingGrams > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-xs text-emerald-800">
              <span className="font-bold">Remaining Payload Capacity:</span> +{res.payloadCapacityRemainingGrams}g camera/battery buffer while preserving {targetTwr}:1 TWR.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * 3. Rocket Thrust Widget
 */
export const RocketThrustWidget: React.FC = () => {
  const [mdot, setMdot] = useState<number | ''>(50);
  const [isp, setIsp] = useState<number | ''>(310);
  const [exitPressure, setExitPressure] = useState<number | ''>(101.3);
  const [ambientPressure, setAmbientPressure] = useState<number | ''>(101.3);
  const [exitArea, setExitArea] = useState<number | ''>(0.2);

  const res = calculateRocketThrust({
    massFlowRateKgPerSec: Number(mdot) || 1,
    specificImpulseSec: Number(isp) || 200,
    exitPressureKpa: Number(exitPressure) || 0,
    ambientPressureKpa: Number(ambientPressure) || 0,
    exitAreaM2: Number(exitArea) || 0,
  });

  const getResultText = () =>
    `Rocket Engine Thrust: ${res.totalThrustKilonewtons} kN (${res.totalThrustLbf.toLocaleString()} lbf). Mass Flow Rate: ${mdot} kg/s, Specific Impulse: ${isp} s, Exhaust Velocity: ${res.effectiveExhaustVelocityMs} m/s.`;

  const handleReset = () => {
    setMdot(50);
    setIsp(310);
    setExitPressure(101.3);
    setAmbientPressure(101.3);
    setExitArea(0.2);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Flame className="w-5 h-5 text-rose-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Rocket Thrust Calculator</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Mass Flow Rate (kg/s)</label>
              <input
                type="number"
                min={0.01}
                step={1}
                value={mdot}
                onChange={e => setMdot(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Specific Impulse (Isp in Sec)</label>
              <input
                type="number"
                min={50}
                max={500}
                value={isp}
                onChange={e => setIsp(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Exit Pres. (kPa)</label>
              <input
                type="number"
                min={0}
                value={exitPressure}
                onChange={e => setExitPressure(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Amb. Pres. (kPa)</label>
              <input
                type="number"
                min={0}
                value={ambientPressure}
                onChange={e => setAmbientPressure(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Nozzle Area (m²)</label>
              <input
                type="number"
                min={0}
                step={0.05}
                value={exitArea}
                onChange={e => setExitArea(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="pt-2">
            <CalculatorActions resultText={getResultText()} onReset={handleReset} />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rocket Propulsion Output</div>

          <div className="bg-white border border-rose-200 rounded-xl p-4 shadow-2xs">
            <div className="text-xs text-rose-700 font-semibold mb-1">Total Rocket Thrust</div>
            <div className="text-3xl font-extrabold text-rose-950 flex items-baseline gap-1.5">
              {res.totalThrustKilonewtons} <span className="text-sm font-semibold text-rose-600">kN</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Equivalent to <span className="font-semibold text-slate-800">{res.totalThrustLbf.toLocaleString()} lbf</span> ({res.totalThrustNewtons.toLocaleString()} N)
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 block">Exhaust Velocity:</span>
              <span className="font-bold text-slate-900 text-base">{res.effectiveExhaustVelocityMs} m/s</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 block">Momentum Thrust:</span>
              <span className="font-bold text-slate-900 text-base">{(res.momentumThrustNewtons / 1000).toFixed(1)} kN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 4. General / Static / Prop / Motor / Fan / RC / RPM / Jet Engine Thrust Widget
 */
export type ThrustCalcType = 'general' | 'propeller' | 'static' | 'motor' | 'fan' | 'rc' | 'rpm' | 'jet';

export const GeneralThrustWidget: React.FC<{ type?: ThrustCalcType; title?: string }> = ({
  type = 'general',
  title = 'Thrust Calculator',
}) => {
  // Propeller & Motor State
  const [diameter, setDiameter] = useState<number | ''>(10);
  const [pitch, setPitch] = useState<number | ''>(4.7);
  const [rpm, setRpm] = useState<number | ''>(8500);

  // Jet Engine State
  const [airMass, setAirMass] = useState<number | ''>(150);
  const [exhaustVel, setExhaustVel] = useState<number | ''>(380);
  const [flightVel, setFlightVel] = useState<number | ''>(120);
  const [bypass, setBypass] = useState<number | ''>(type === 'jet' ? 5 : 0);

  const isJet = type === 'jet';

  const propRes = calculatePropellerThrust({
    diameterInches: Number(diameter) || 1,
    pitchInches: Number(pitch) || 1,
    rpm: Number(rpm) || 0,
  });

  const jetRes = calculateJetEngineThrust({
    airMassFlowKgPerSec: Number(airMass) || 10,
    exhaustVelocityMs: Number(exhaustVel) || 100,
    flightVelocityMs: Number(flightVel) || 0,
    bypassRatio: Number(bypass) || 0,
  });

  const getResultText = () => {
    if (isJet) {
      return `Jet Engine Thrust: Net Thrust: ${jetRes.netThrustKn} kN (${jetRes.totalThrustLbf.toLocaleString()} lbf). Gross Thrust: ${jetRes.grossThrustKn} kN, Ram Drag: ${jetRes.ramDragKn} kN.`;
    }
    return `${title}: Prop ${diameter}x${pitch} @ ${rpm} RPM generates ${propRes.thrustGrams} grams (${propRes.thrustLbs} lbs / ${propRes.thrustNewtons} N) thrust. Exit Airspeed: ${propRes.exitAirspeedMph} mph, Power: ${propRes.powerAbsorbedWatts}W.`;
  };

  const handleReset = () => {
    setDiameter(10);
    setPitch(4.7);
    setRpm(8500);
    setAirMass(150);
    setExhaustVel(380);
    setFlightVel(120);
    setBypass(type === 'jet' ? 5 : 0);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Wind className="w-5 h-5 text-sky-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">{title}</h2>
          </div>

          {isJet ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Air Mass Flow (kg/s)</label>
                  <input
                    type="number"
                    min={1}
                    value={airMass}
                    onChange={e => setAirMass(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Exhaust Velocity (m/s)</label>
                  <input
                    type="number"
                    min={10}
                    value={exhaustVel}
                    onChange={e => setExhaustVel(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Flight Speed (m/s)</label>
                  <input
                    type="number"
                    min={0}
                    value={flightVel}
                    onChange={e => setFlightVel(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Bypass Ratio</label>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    value={bypass}
                    onChange={e => setBypass(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Prop Diameter (Inches)</label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    step={0.5}
                    value={diameter}
                    onChange={e => setDiameter(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Prop Pitch (Inches)</label>
                  <input
                    type="number"
                    min={0.5}
                    max={60}
                    step={0.1}
                    value={pitch}
                    onChange={e => setPitch(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Rotational Speed (RPM)</label>
                <input
                  type="number"
                  min={100}
                  max={60000}
                  step={100}
                  value={rpm}
                  onChange={e => setRpm(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
                />
              </div>
            </>
          )}

          <div className="pt-2">
            <CalculatorActions resultText={getResultText()} onReset={handleReset} />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thrust Dynamics</div>

          {isJet ? (
            <>
              <div className="bg-white border border-sky-200 rounded-xl p-4 shadow-2xs">
                <div className="text-xs text-sky-700 font-semibold mb-1">Net Jet Engine Thrust</div>
                <div className="text-3xl font-extrabold text-sky-950 flex items-baseline gap-1.5">
                  {jetRes.netThrustKn} <span className="text-sm font-semibold text-sky-600">kN</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Produces <span className="font-semibold text-slate-800">{jetRes.totalThrustLbf.toLocaleString()} lbf</span> thrust
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-500 block">Gross Thrust:</span>
                  <span className="font-bold text-slate-900 text-base">{jetRes.grossThrustKn} kN</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-500 block">Ram Intake Drag:</span>
                  <span className="font-bold text-slate-900 text-base">{jetRes.ramDragKn} kN</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white border border-sky-200 rounded-xl p-4 shadow-2xs">
                <div className="text-xs text-sky-700 font-semibold mb-1">Estimated Static Thrust</div>
                <div className="text-3xl font-extrabold text-sky-950 flex items-baseline gap-1.5">
                  {propRes.thrustGrams.toLocaleString()} <span className="text-sm font-semibold text-sky-600">grams</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Equivalent to <span className="font-semibold text-slate-800">{propRes.thrustLbs} lbs</span> ({propRes.thrustNewtons} N)
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Exit Airspeed</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">{propRes.exitAirspeedMph} mph</div>
                  <div className="text-[11px] text-slate-500">{propRes.exitAirspeedKmh} km/h</div>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">Absorbed Power</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">{propRes.powerAbsorbedWatts} W</div>
                  <div className="text-[11px] text-slate-500">mechanical load</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
