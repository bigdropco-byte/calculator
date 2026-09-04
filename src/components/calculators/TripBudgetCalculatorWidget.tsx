'use client';

import React, { useState } from 'react';
import { calculateTripBudget } from '@/lib/calculators/travel';
import { formatCurrency, formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Plane, Hotel, Utensils, Compass, ShieldAlert, Users } from 'lucide-react';

export const TripBudgetCalculatorWidget: React.FC = () => {
  const [transportation, setTransportation] = useState<number | ''>(800);
  const [lodgingPerNight, setLodgingPerNight] = useState<number | ''>(160);
  const [nights, setNights] = useState<number | ''>(7);
  const [dailyFood, setDailyFood] = useState<number | ''>(65);
  const [dailyActivities, setDailyActivities] = useState<number | ''>(40);
  const [miscellaneous, setMiscellaneous] = useState<number | ''>(150);
  const [travelers, setTravelers] = useState<number | ''>(2);
  const [contingencyPct, setContingencyPct] = useState<number | ''>(10);

  const res = calculateTripBudget({
    transportation: Number(transportation) || 0,
    lodgingPerNight: Number(lodgingPerNight) || 0,
    nights: Number(nights) || 1,
    dailyFoodPerPerson: Number(dailyFood) || 0,
    dailyActivitiesPerPerson: Number(dailyActivities) || 0,
    miscellaneous: Number(miscellaneous) || 0,
    travelers: Number(travelers) || 1,
    contingencyPct: Number(contingencyPct) || 0,
  });

  const getResultText = () => {
    return `Trip Budget Summary (${travelers} travelers, ${nights} nights / ${res.totalDays} days): Grand Total: ${formatCurrency(
      res.grandTotal
    )}. Cost per Traveler: ${formatCurrency(res.costPerTraveler)}. Cost per Day: ${formatCurrency(
      res.costPerDay
    )}. Breakdown: Transport: ${formatCurrency(res.totalTransportation)}, Lodging: ${formatCurrency(
      res.totalLodging
    )}, Food: ${formatCurrency(res.totalFood)}, Activities: ${formatCurrency(
      res.totalActivities
    )}, Misc: ${formatCurrency(res.totalMiscellaneous)}, Emergency Buffer: ${formatCurrency(
      res.contingencyBufferAmount
    )}.`;
  };

  const handleReset = () => {
    setTransportation(800);
    setLodgingPerNight(160);
    setNights(7);
    setDailyFood(65);
    setDailyActivities(40);
    setMiscellaneous(150);
    setTravelers(2);
    setContingencyPct(10);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Travelers
              </label>
              <input
                type="number"
                min={1}
                value={travelers}
                onChange={e => setTravelers(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Trip Nights
              </label>
              <input
                type="number"
                min={1}
                value={nights}
                onChange={e => setNights(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Flights / Transport ($)
              </label>
              <input
                type="number"
                min={0}
                value={transportation}
                onChange={e => setTransportation(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Hotel / Night ($)
              </label>
              <input
                type="number"
                min={0}
                value={lodgingPerNight}
                onChange={e => setLodgingPerNight(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Food / Day / Person ($)
              </label>
              <input
                type="number"
                min={0}
                value={dailyFood}
                onChange={e => setDailyFood(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Tours / Day / Person ($)
              </label>
              <input
                type="number"
                min={0}
                value={dailyActivities}
                onChange={e => setDailyActivities(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Shopping / Misc ($)
              </label>
              <input
                type="number"
                min={0}
                value={miscellaneous}
                onChange={e => setMiscellaneous(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Emergency Buffer (%)
              </label>
              <input
                type="number"
                min={0}
                max={50}
                value={contingencyPct}
                onChange={e => setContingencyPct(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base focus:bg-white font-medium"
              />
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleReset} />
        </div>

        {/* Results Display */}
        <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
                Estimated Total Vacation Cost
              </span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 border border-sky-300">
                {res.travelerCount} Travelers • {res.totalDays} Days
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-sky-950 tracking-tight">
                {formatCurrency(res.grandTotal)}
              </span>
            </div>

            {/* Per person / per day */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              <div className="p-3 bg-white rounded-lg border border-sky-100">
                <span className="text-slate-400 block font-semibold text-[10px] uppercase">Cost Per Traveler</span>
                <strong className="text-base text-slate-900 font-extrabold">{formatCurrency(res.costPerTraveler)}</strong>
              </div>
              <div className="p-3 bg-white rounded-lg border border-sky-100">
                <span className="text-slate-400 block font-semibold text-[10px] uppercase">Cost Per Day</span>
                <strong className="text-base text-slate-900 font-extrabold">{formatCurrency(res.costPerDay)}</strong>
              </div>
            </div>

            {/* Expense breakdown list */}
            <div className="mt-4 space-y-1.5 text-xs">
              {res.breakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-1 border-b border-sky-100/70">
                  <span className="text-slate-600">{item.category} ({item.percentage}%):</span>
                  <strong className="text-slate-900">{formatCurrency(item.amount)}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
