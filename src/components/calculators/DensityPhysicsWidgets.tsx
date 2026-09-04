'use client';

import React, { useState } from 'react';
import {
  calculateGeneralDensity,
  calculateWaterDensity,
  calculateAirDensity,
  calculatePixelDensity,
  calculatePopulationDensity,
  calculatePsaDensity,
} from '@/lib/calculators/densityPhysics';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Layers, Box, Droplets, Wind, Monitor, Users, HeartPulse } from 'lucide-react';

/**
 * 1. General Density Widget
 */
export const GeneralDensityWidget: React.FC = () => {
  const [mass, setMass] = useState<number | ''>(500);
  const [massUnit, setMassUnit] = useState<'kg' | 'g' | 'lbs' | 'oz'>('g');
  const [volume, setVolume] = useState<number | ''>(250);
  const [volumeUnit, setVolumeUnit] = useState<'cm3' | 'm3' | 'liters' | 'ml' | 'ft3' | 'in3'>('cm3');

  const res = calculateGeneralDensity({
    massValue: Number(mass) || 0,
    massUnit,
    volumeValue: Number(volume) || 1,
    volumeUnit,
  });

  const getResultText = () =>
    `Density: ${res.densityGCm3} g/cm³ (${res.densityKgM3} kg/m³ / ${res.densityLbsFt3} lbs/ft³). Mass: ${mass} ${massUnit}, Volume: ${volume} ${volumeUnit}.`;

  const handleReset = () => {
    setMass(500);
    setMassUnit('g');
    setVolume(250);
    setVolumeUnit('cm3');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Layers className="w-5 h-5 text-teal-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Density Calculator (ρ = m / V)</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Mass Value</label>
              <input
                type="number"
                min={0}
                value={mass}
                onChange={e => setMass(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Mass Unit</label>
              <select
                value={massUnit}
                onChange={e => setMassUnit(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              >
                <option value="g">Grams (g)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="lbs">Pounds (lbs)</option>
                <option value="oz">Ounces (oz)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Volume Value</label>
              <input
                type="number"
                min={0.0001}
                value={volume}
                onChange={e => setVolume(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Volume Unit</label>
              <select
                value={volumeUnit}
                onChange={e => setVolumeUnit(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              >
                <option value="cm3">Cubic Centimeters (cm³ / cc)</option>
                <option value="ml">Milliliters (mL)</option>
                <option value="liters">Liters (L)</option>
                <option value="m3">Cubic Meters (m³)</option>
                <option value="in3">Cubic Inches (in³)</option>
                <option value="ft3">Cubic Feet (ft³)</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <CalculatorActions resultText={getResultText()} onReset={handleReset} />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Density Conversion Output</div>

          <div className="bg-white border border-teal-200 rounded-xl p-4 shadow-2xs">
            <div className="text-xs text-teal-700 font-semibold mb-1">Calculated Density</div>
            <div className="text-3xl font-extrabold text-teal-950 flex items-baseline gap-1.5">
              {res.densityGCm3} <span className="text-sm font-semibold text-teal-600">g/cm³</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Equal to <span className="font-semibold text-slate-800">{res.densityKgM3.toLocaleString()} kg/m³</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 block">Imperial Density:</span>
              <span className="font-bold text-slate-900 text-base">{res.densityLbsFt3} lbs/ft³</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 block">Per Cubic Inch:</span>
              <span className="font-bold text-slate-900 text-base">{res.densityLbsIn3} lbs/in³</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 2. Cube Density Widget
 */
export const CubeDensityWidget: React.FC = () => {
  const [side, setSide] = useState<number | ''>(5);
  const [sideUnit, setSideUnit] = useState<'cm' | 'm' | 'in' | 'ft'>('cm');
  const [mass, setMass] = useState<number | ''>(250);
  const [massUnit, setMassUnit] = useState<'g' | 'kg' | 'lbs'>('g');

  // Convert side to cm^3 volume
  const sideToCm = Number(side) * (sideUnit === 'm' ? 100 : sideUnit === 'in' ? 2.54 : sideUnit === 'ft' ? 30.48 : 1);
  const volumeCm3 = Math.pow(sideToCm, 3);

  const res = calculateGeneralDensity({
    massValue: Number(mass) || 0,
    massUnit: massUnit as any,
    volumeValue: volumeCm3,
    volumeUnit: 'cm3',
  });

  const getResultText = () =>
    `Cube Density: ${res.densityGCm3} g/cm³ (${res.densityKgM3} kg/m³). Side: ${side} ${sideUnit} (Volume: ${volumeCm3.toFixed(1)} cm³), Mass: ${mass} ${massUnit}.`;

  const handleReset = () => {
    setSide(5);
    setSideUnit('cm');
    setMass(250);
    setMassUnit('g');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Box className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Cube Density Calculator</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Side Length (s)</label>
              <input
                type="number"
                min={0.01}
                value={side}
                onChange={e => setSide(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Side Unit</label>
              <select
                value={sideUnit}
                onChange={e => setSideUnit(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              >
                <option value="cm">Centimeters (cm)</option>
                <option value="m">Meters (m)</option>
                <option value="in">Inches (in)</option>
                <option value="ft">Feet (ft)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Mass</label>
              <input
                type="number"
                min={0.01}
                value={mass}
                onChange={e => setMass(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Mass Unit</label>
              <select
                value={massUnit}
                onChange={e => setMassUnit(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              >
                <option value="g">Grams (g)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="lbs">Pounds (lbs)</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <CalculatorActions resultText={getResultText()} onReset={handleReset} />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cube Physical Properties</div>

          <div className="bg-white border border-blue-200 rounded-xl p-4 shadow-2xs">
            <div className="text-xs text-blue-700 font-semibold mb-1">Material Density (ρ = m / s³)</div>
            <div className="text-3xl font-extrabold text-blue-950 flex items-baseline gap-1.5">
              {res.densityGCm3} <span className="text-sm font-semibold text-blue-600">g/cm³</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Cube Volume: <span className="font-semibold text-slate-800">{volumeCm3.toLocaleString(undefined, { maximumFractionDigits: 1 })} cm³</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
            <span className="font-semibold block text-slate-900">Standard Material Reference:</span>
            <div className="flex justify-between"><span>Water:</span> <span className="font-semibold">1.0 g/cm³</span></div>
            <div className="flex justify-between"><span>Aluminum:</span> <span className="font-semibold">2.7 g/cm³</span></div>
            <div className="flex justify-between"><span>Steel:</span> <span className="font-semibold">7.85 g/cm³</span></div>
            <div className="flex justify-between"><span>Gold:</span> <span className="font-semibold">19.32 g/cm³</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. Water Density Widget
 */
export const WaterDensityWidget: React.FC = () => {
  const [temp, setTemp] = useState<number | ''>(20);
  const [salinity, setSalinity] = useState<number | ''>(0);

  const res = calculateWaterDensity({
    temperatureCelsius: Number(temp) || 0,
    salinityPsu: Number(salinity) || 0,
  });

  const getResultText = () =>
    `Water Density: ${res.densityKgM3} kg/m³ (${res.densityGCm3} g/cm³ / ${res.densityLbsFt3} lbs/ft³). Temperature: ${temp}°C, Salinity: ${salinity} PSU (${res.waterType}). Specific Gravity: ${res.specificGravity}.`;

  const handleReset = () => {
    setTemp(20);
    setSalinity(0);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Droplets className="w-5 h-5 text-cyan-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Water Density Calculator</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Temperature (°C)</label>
            <input
              type="number"
              min={-5}
              max={100}
              step={0.5}
              value={temp}
              onChange={e => setTemp(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">Peak freshwater density is at 3.98°C (999.97 kg/m³).</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Salinity (PSU / Practical Salinity Units)</label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {[
                { label: 'Freshwater', val: 0 },
                { label: 'Brackish', val: 15 },
                { label: 'Seawater', val: 35 },
              ].map(p => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setSalinity(p.val)}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    salinity === p.val ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {p.label} ({p.val})
                </button>
              ))}
            </div>
            <input
              type="number"
              min={0}
              max={45}
              value={salinity}
              onChange={e => setSalinity(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
            />
          </div>

          <div className="pt-2">
            <CalculatorActions resultText={getResultText()} onReset={handleReset} />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hydrological Output</div>

          <div className="bg-white border border-cyan-200 rounded-xl p-4 shadow-2xs">
            <div className="text-xs text-cyan-700 font-semibold mb-1">Water Density (ρ)</div>
            <div className="text-3xl font-extrabold text-cyan-950 flex items-baseline gap-1.5">
              {res.densityKgM3} <span className="text-sm font-semibold text-cyan-600">kg/m³</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Equal to <span className="font-semibold text-slate-800">{res.densityGCm3} g/cm³</span> ({res.densityLbsFt3} lbs/cu ft)
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 block">Specific Gravity:</span>
              <span className="font-bold text-slate-900 text-base">{res.specificGravity}</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 block">Classification:</span>
              <span className="font-bold text-slate-900 text-xs mt-1 block">{res.waterType}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 4. Air Density Widget
 */
export const AirDensityWidget: React.FC = () => {
  const [temp, setTemp] = useState<number | ''>(15);
  const [pressure, setPressure] = useState<number | ''>(1013.25);
  const [humidity, setHumidity] = useState<number | ''>(50);
  const [altitude, setAltitude] = useState<number | ''>(0);

  const res = calculateAirDensity({
    temperatureCelsius: Number(temp) || 0,
    pressureHpa: Number(pressure) || 1013.25,
    relativeHumidityPct: Number(humidity) || 0,
    altitudeMeters: Number(altitude) || 0,
  });

  const getResultText = () =>
    `Air Density: ${res.densityKgM3} kg/m³ (${res.densityLbsFt3} lbs/ft³, ${res.relativeDensityPct}% of standard sea level). Temp: ${temp}°C, Pressure: ${pressure} hPa, RH: ${humidity}%, Dew Point: ${res.dewPointCelsius}°C.`;

  const handleReset = () => {
    setTemp(15);
    setPressure(1013.25);
    setHumidity(50);
    setAltitude(0);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Wind className="w-5 h-5 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Air Density Calculator (ISA Model)</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Temperature (°C)</label>
              <input
                type="number"
                min={-50}
                max={60}
                step={0.5}
                value={temp}
                onChange={e => setTemp(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Barometric (hPa / mbar)</label>
              <input
                type="number"
                min={500}
                max={1100}
                step={1}
                value={pressure}
                onChange={e => setPressure(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Relative Humidity (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={humidity}
                onChange={e => setHumidity(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Altitude (Meters)</label>
              <input
                type="number"
                min={0}
                max={15000}
                value={altitude}
                onChange={e => setAltitude(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="pt-2">
            <CalculatorActions resultText={getResultText()} onReset={handleReset} />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Atmospheric Density</div>

          <div className="bg-white border border-emerald-200 rounded-xl p-4 shadow-2xs">
            <div className="text-xs text-emerald-700 font-semibold mb-1">Moist Air Density (ρ)</div>
            <div className="text-3xl font-extrabold text-emerald-950 flex items-baseline gap-1.5">
              {res.densityKgM3} <span className="text-sm font-semibold text-emerald-600">kg/m³</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Relative to standard sea level: <span className="font-semibold text-slate-800">{res.relativeDensityPct}%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 block">Imperial Density:</span>
              <span className="font-bold text-slate-900 text-base">{res.densityLbsFt3} lbs/ft³</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 block">Dew Point:</span>
              <span className="font-bold text-slate-900 text-base">{res.dewPointCelsius}°C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 5. Pixel Density (PPI) Widget
 */
export const PixelDensityWidget: React.FC = () => {
  const [width, setWidth] = useState<number | ''>(2560);
  const [height, setHeight] = useState<number | ''>(1440);
  const [diagonal, setDiagonal] = useState<number | ''>(27);

  const res = calculatePixelDensity({
    horizontalPixels: Number(width) || 1920,
    verticalPixels: Number(height) || 1080,
    screenDiagonalInches: Number(diagonal) || 24,
  });

  const getResultText = () =>
    `Display Pixel Density: ${res.ppi} PPI (Pixels Per Inch). Resolution: ${width} × ${height} (${res.aspectRatio}, ${res.megapixels} MP) on ${diagonal}" display. Dot Pitch: ${res.dotPitchMm} mm.`;

  const handleReset = () => {
    setWidth(2560);
    setHeight(1440);
    setDiagonal(27);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Monitor className="w-5 h-5 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Pixel Density (PPI) Calculator</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Horizontal Pixels</label>
              <input
                type="number"
                min={100}
                value={width}
                onChange={e => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Vertical Pixels</label>
              <input
                type="number"
                min={100}
                value={height}
                onChange={e => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Diagonal Screen Size (Inches)</label>
            <input
              type="number"
              min={1}
              max={150}
              step={0.1}
              value={diagonal}
              onChange={e => setDiagonal(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
            />
          </div>

          <div className="pt-2">
            <CalculatorActions resultText={getResultText()} onReset={handleReset} />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Display Sharpness</div>

          <div className="bg-white border border-indigo-200 rounded-xl p-4 shadow-2xs">
            <div className="text-xs text-indigo-700 font-semibold mb-1">Pixel Density</div>
            <div className="text-3xl font-extrabold text-indigo-950 flex items-baseline gap-1.5">
              {res.ppi} <span className="text-sm font-semibold text-indigo-600">PPI</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Aspect Ratio: <span className="font-semibold text-slate-800">{res.aspectRatio}</span> | Total: <span className="font-semibold text-slate-800">{res.megapixels} Megapixels</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 block">Dot Pitch (Pixel Size):</span>
              <span className="font-bold text-slate-900 text-base">{res.dotPitchMm} mm</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 block">Retina Viewing Dist.:</span>
              <span className="font-bold text-slate-900 text-base">{Math.round(3438 / res.ppi)}&Prime; / {Math.round((3438 / res.ppi) * 2.54)} cm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 6. Population Density Widget
 */
export const PopulationDensityWidget: React.FC = () => {
  const [pop, setPop] = useState<number | ''>(8336817);
  const [area, setArea] = useState<number | ''>(300.46);
  const [unit, setUnit] = useState<'sq_miles' | 'sq_km'>('sq_miles');

  const res = calculatePopulationDensity({
    population: Number(pop) || 0,
    landArea: Number(area) || 1,
    areaUnit: unit,
  });

  const getResultText = () =>
    `Population Density: ${res.densityPerSqMile.toLocaleString()} people/sq mi (${res.densityPerSqKm.toLocaleString()} people/km²). Total Population: ${pop.toLocaleString()} across ${area} ${unit}. Space Per Person: ${res.areaPerPersonSqMeters} m².`;

  const handleReset = () => {
    setPop(8336817);
    setArea(300.46);
    setUnit('sq_miles');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Users className="w-5 h-5 text-rose-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Population Density Calculator</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Total Population Count</label>
            <input
              type="number"
              min={1}
              value={pop}
              onChange={e => setPop(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Land Area</label>
              <input
                type="number"
                min={0.01}
                value={area}
                onChange={e => setArea(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Area Unit</label>
              <select
                value={unit}
                onChange={e => setUnit(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              >
                <option value="sq_miles">Square Miles (mi²)</option>
                <option value="sq_km">Square Kilometers (km²)</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <CalculatorActions resultText={getResultText()} onReset={handleReset} />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Demographic Metrics</div>

          <div className="bg-white border border-rose-200 rounded-xl p-4 shadow-2xs">
            <div className="text-xs text-rose-700 font-semibold mb-1">Population Density</div>
            <div className="text-3xl font-extrabold text-rose-950 flex items-baseline gap-1.5">
              {res.densityPerSqMile.toLocaleString()} <span className="text-sm font-semibold text-rose-600">people / sq mi</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Equivalent to <span className="font-semibold text-slate-800">{res.densityPerSqKm.toLocaleString()} people / km²</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs">
            <div className="text-slate-500">Average Land Area Available Per Inhabitant:</div>
            <div className="text-xl font-bold text-slate-900 mt-0.5">{res.areaPerPersonSqMeters.toLocaleString()} m²</div>
            <div className="text-[11px] text-slate-500">per person</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 7. PSA Density Widget
 */
export const PsaDensityWidget: React.FC = () => {
  const [psa, setPsa] = useState<number | ''>(4.5);
  const [volume, setVolume] = useState<number | ''>(35);

  const res = calculatePsaDensity({
    totalPsaNgMl: Number(psa) || 0,
    prostateVolumeCc: Number(volume) || 1,
  });

  const getResultText = () =>
    `PSA Density: ${res.psaDensity} ng/mL/cc (Total PSA: ${psa} ng/mL, Volume: ${volume} cc). Status: ${res.riskCategory}. Clinical Note: ${res.clinicalRecommendation}`;

  const handleReset = () => {
    setPsa(4.5);
    setVolume(35);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <HeartPulse className="w-5 h-5 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">PSA Density Calculator</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Total Serum PSA (ng/mL)</label>
            <input
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={psa}
              onChange={e => setPsa(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">From routine laboratory venous blood panel.</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Prostate Volume (cc or cm³)</label>
            <input
              type="number"
              min={5}
              max={300}
              step={1}
              value={volume}
              onChange={e => setVolume(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">Determined via transrectal ultrasound (TRUS) or pelvic MRI.</span>
          </div>

          <div className="pt-2">
            <CalculatorActions resultText={getResultText()} onReset={handleReset} />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Clinical Urological Assessment</div>

          <div className={`bg-white border rounded-xl p-4 shadow-2xs ${res.psaDensity >= 0.15 ? 'border-amber-300' : 'border-emerald-200'}`}>
            <div className={`text-xs font-semibold mb-1 ${res.psaDensity >= 0.15 ? 'text-amber-700' : 'text-emerald-700'}`}>
              PSA Density (PSAD)
            </div>
            <div className="text-3xl font-extrabold text-slate-950 flex items-baseline gap-1.5">
              {res.psaDensity} <span className="text-sm font-semibold text-slate-600">ng/mL/cc</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Standard clinical decision threshold: <span className="font-semibold text-slate-800">0.15 ng/mL/cc</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-lg border text-xs leading-relaxed ${res.psaDensity >= 0.15 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'}`}>
            <div className="font-bold mb-1">{res.riskCategory}</div>
            <p>{res.clinicalRecommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
