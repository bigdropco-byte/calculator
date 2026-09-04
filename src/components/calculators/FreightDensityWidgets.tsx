'use client';

import React, { useState } from 'react';
import { calculateFreightDensity, NMFC_CLASS_TABLE } from '@/lib/calculators/freightDensity';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Truck, Package, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

export interface FreightWidgetProps {
  carrier?: 'generic' | 'bluegrace' | 'saia' | 'xpo';
  title?: string;
}

export const FreightDensityWidget: React.FC<FreightWidgetProps> = ({
  carrier = 'generic',
  title = 'Freight Density Calculator',
}) => {
  const [length, setLength] = useState<number | ''>(48);
  const [width, setWidth] = useState<number | ''>(40);
  const [height, setHeight] = useState<number | ''>(48);
  const [weight, setWeight] = useState<number | ''>(550);
  const [quantity, setQuantity] = useState<number | ''>(1);
  const [stackable, setStackable] = useState<boolean>(true);

  const res = calculateFreightDensity({
    lengthInches: Number(length) || 1,
    widthInches: Number(width) || 1,
    heightInches: Number(height) || 1,
    weightLbsPerUnit: Number(weight) || 1,
    quantity: Number(quantity) || 1,
    isStackable: stackable,
    carrier,
  });

  const getResultText = () =>
    `${title}: Density: ${res.densityPcf} PCF (Pounds Per Cubic Foot) -> NMFC Freight Class ${res.nmfcClass} (${res.classDescription}). Total: ${quantity} pallet(s), ${res.totalWeightLbs.toLocaleString()} lbs, ${res.totalCubicFeet} cu ft (${res.linearFeetTrailer} linear feet trailer). Note: ${res.carrierNote}`;

  const handleReset = () => {
    setLength(48);
    setWidth(40);
    setHeight(48);
    setWeight(550);
    setQuantity(1);
    setStackable(true);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Truck className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">{title}</h2>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Length (In)</label>
              <input
                type="number"
                min={1}
                max={600}
                value={length}
                onChange={e => setLength(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Width (In)</label>
              <input
                type="number"
                min={1}
                max={120}
                value={width}
                onChange={e => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Height (In)</label>
              <input
                type="number"
                min={1}
                max={120}
                value={height}
                onChange={e => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Weight Per Unit (Lbs)</label>
              <input
                type="number"
                min={1}
                max={50000}
                value={weight}
                onChange={e => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Includes pallet/skid weight</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Pallet Quantity</label>
              <input
                type="number"
                min={1}
                max={100}
                value={quantity}
                onChange={e => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Stackability</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStackable(true)}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  stackable ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Stackable Pallet
              </button>
              <button
                type="button"
                onClick={() => setStackable(false)}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  !stackable ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Non-Stackable (Do Not Top-Load)
              </button>
            </div>
          </div>

          <div className="pt-2">
            <CalculatorActions resultText={getResultText()} onReset={handleReset} />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">LTL Rating & Classification</div>

          <div className="bg-white border border-blue-200 rounded-xl p-4 shadow-2xs">
            <div className="text-xs text-blue-700 font-semibold mb-1">Freight Density</div>
            <div className="text-3xl font-extrabold text-blue-950 flex items-baseline gap-1.5">
              {res.densityPcf} <span className="text-sm font-semibold text-blue-600">PCF (lbs/cu ft)</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                NMFC Class {res.nmfcClass}
              </span>
              <span className="text-xs text-slate-600">{res.classDescription.slice(0, 45)}...</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 block">Total Volume:</span>
              <span className="font-bold text-slate-900 text-base">{res.totalCubicFeet} cu ft</span>
              <span className="text-[11px] text-slate-400">({res.cubicYards} yd³)</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 block">Total Weight:</span>
              <span className="font-bold text-slate-900 text-base">{res.totalWeightLbs.toLocaleString()} lbs</span>
              <span className="text-[11px] text-slate-400">({(res.totalWeightLbs / 2000).toFixed(2)} tons)</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Trailer Space Needed:</span>
              <span className="font-bold text-slate-900">~{res.linearFeetTrailer} linear feet</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Carrier Rule Status:</span>
              <span className="font-semibold text-slate-800">{res.carrierNote}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
