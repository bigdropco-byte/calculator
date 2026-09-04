'use client';

import React, { useState } from 'react';
import { convertSwimTime, SwimCourse, SwimGender, SwimStroke } from '@/lib/calculators/specializedTimeEngines';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Waves, Timer } from 'lucide-react';

export const SwimTimeConverterWidget: React.FC = () => {
  const [eventDistance, setEventDistance] = useState<number>(100);
  const [stroke, setStroke] = useState<SwimStroke>('freestyle');
  const [fromCourse, setFromCourse] = useState<SwimCourse>('SCY');
  const [gender, setGender] = useState<SwimGender>('men');
  const [timeInput, setTimeInput] = useState<string>('00:48.50');

  const res = convertSwimTime(eventDistance, stroke, fromCourse, timeInput, gender);

  const getResultText = () => {
    return `Swim Time Conversion (${gender} ${eventDistance} ${stroke}): SCY: ${res.scyFormatted} | SCM: ${res.scmFormatted} | LCM: ${res.lcmFormatted}.`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Distance
              </label>
              <select
                value={eventDistance}
                onChange={e => setEventDistance(parseInt(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base font-semibold"
              >
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
                <option value={400}>400 / 500</option>
                <option value={800}>800 / 1000</option>
                <option value={1500}>1500 / 1650</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Stroke
              </label>
              <select
                value={stroke}
                onChange={e => setStroke(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base font-semibold"
              >
                <option value="freestyle">Freestyle</option>
                <option value="backstroke">Backstroke</option>
                <option value="breaststroke">Breaststroke</option>
                <option value="butterfly">Butterfly</option>
                <option value="im">Individual Medley (IM)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Current Pool Course
              </label>
              <select
                value={fromCourse}
                onChange={e => setFromCourse(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base font-semibold"
              >
                <option value="SCY">SCY (25 Yards)</option>
                <option value="SCM">SCM (25 Meters)</option>
                <option value="LCM">LCM (50m Olympic)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Division / Gender
              </label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base font-semibold"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Time (SS.ss or MM:SS.ss)
            </label>
            <input
              type="text"
              value={timeInput}
              onChange={e => setTimeInput(e.target.value)}
              placeholder="e.g. 48.50 or 01:02.35"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base font-mono font-bold"
            />
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setEventDistance(100);
              setStroke('freestyle');
              setFromCourse('SCY');
              setGender('men');
              setTimeInput('00:48.50');
            }}
          />
        </div>

        <div className="bg-sky-50/60 border border-sky-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
              Equivalent Pool Times
            </span>

            <div className="space-y-3 mt-4">
              <div className={`p-3 rounded-lg border ${fromCourse === 'SCY' ? 'bg-sky-100/80 border-sky-400 font-bold' : 'bg-white border-sky-200'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600 uppercase">Short Course Yards (SCY 25y)</span>
                  {fromCourse === 'SCY' && <span className="text-[10px] bg-sky-600 text-white px-1.5 py-0.5 rounded font-bold">Input</span>}
                </div>
                <div className="text-2xl font-mono font-extrabold text-slate-900 mt-1">
                  {res.scyFormatted}
                </div>
              </div>

              <div className={`p-3 rounded-lg border ${fromCourse === 'SCM' ? 'bg-sky-100/80 border-sky-400 font-bold' : 'bg-white border-sky-200'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600 uppercase">Short Course Meters (SCM 25m)</span>
                  {fromCourse === 'SCM' && <span className="text-[10px] bg-sky-600 text-white px-1.5 py-0.5 rounded font-bold">Input</span>}
                </div>
                <div className="text-2xl font-mono font-extrabold text-slate-900 mt-1">
                  {res.scmFormatted}
                </div>
              </div>

              <div className={`p-3 rounded-lg border ${fromCourse === 'LCM' ? 'bg-sky-100/80 border-sky-400 font-bold' : 'bg-white border-sky-200'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600 uppercase">Long Course Meters (LCM 50m)</span>
                  {fromCourse === 'LCM' && <span className="text-[10px] bg-sky-600 text-white px-1.5 py-0.5 rounded font-bold">Input</span>}
                </div>
                <div className="text-2xl font-mono font-extrabold text-slate-900 mt-1">
                  {res.lcmFormatted}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
