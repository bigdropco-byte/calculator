'use client';

import React, { useState } from 'react';
import {
  calculateWilks,
  calculateApft,
  calculateAcft,
  calculateBenchPress,
} from '@/lib/calculators/fitnessAndMilitaryEngines';

// ----------------------------------------------------------------------
// 1. Wilks Calculator Widget
// ----------------------------------------------------------------------
export function WilksWidget() {
  const [bw, setBw] = useState<number>(85);
  const [total, setTotal] = useState<number>(550);
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [formulaVersion, setFormulaVersion] = useState<'original' | 'wilks2020'>('original');

  const res = calculateWilks({
    bodyWeight: bw,
    totalLifted: total,
    weightUnit: unit,
    gender,
    formulaVersion,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as any)}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Units</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as any)}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
          >
            <option value="kg">Kilograms (kg)</option>
            <option value="lbs">Pounds (lbs)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Formula</label>
          <select
            value={formulaVersion}
            onChange={(e) => setFormulaVersion(e.target.value as any)}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
          >
            <option value="original">Classic (500 pts)</option>
            <option value="wilks2020">Wilks 2020 (600 pts)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Bodyweight ({unit})</label>
          <input
            type="number"
            step="0.1"
            value={bw}
            onChange={(e) => setBw(Number(e.target.value))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Total Lifted (Squat + Bench Press + Deadlift) in {unit}
        </label>
        <input
          type="number"
          step="0.5"
          value={total}
          onChange={(e) => setTotal(Number(e.target.value))}
          className="w-full text-base px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 font-bold text-slate-800"
        />
      </div>

      <div className="p-6 bg-sky-50 border border-sky-100 rounded-2xl text-center">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider">
          {formulaVersion === 'wilks2020' ? 'Wilks 2020 Score' : 'Classic Wilks Score'}
        </div>
        <div className="text-4xl sm:text-5xl font-extrabold text-sky-700 my-2">
          {formulaVersion === 'wilks2020' ? res.wilks2020Score : res.wilksScore}
        </div>
        <div className="inline-block px-3 py-1 bg-white border border-sky-200 rounded-full text-xs font-bold text-sky-800">
          Rank: {res.strengthLevel} (Coeff: {res.coefficient})
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-slate-50 border rounded-xl">
          <div className="text-slate-500">Classic Wilks (1997)</div>
          <div className="text-lg font-bold text-slate-800 mt-0.5">{res.wilksScore}</div>
        </div>
        <div className="p-3 bg-slate-50 border rounded-xl">
          <div className="text-slate-500">Updated Wilks 2020</div>
          <div className="text-lg font-bold text-slate-800 mt-0.5">{res.wilks2020Score}</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. APFT Calculator Widget (Army Physical Fitness Test)
// ----------------------------------------------------------------------
export function ApftWidget() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<any>('22-26');
  const [pu, setPu] = useState<number>(55);
  const [su, setSu] = useState<number>(65);
  const [runM, setRunM] = useState<number>(14);
  const [runS, setRunS] = useState<number>(45);

  const res = calculateApft({
    gender,
    ageBracket: age,
    pushups: pu,
    situps: su,
    twoMileRunMinutes: runM,
    twoMileRunSeconds: runS,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as any)}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Age Group</label>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
          >
            <option value="17-21">17–21</option>
            <option value="22-26">22–26</option>
            <option value="27-31">27–31</option>
            <option value="32-36">32–36</option>
            <option value="37-41">37–41</option>
            <option value="42-46">42–46</option>
            <option value="47-51">47–51</option>
            <option value="52-56">52–56</option>
            <option value="57-61">57–61</option>
            <option value="62+">62+</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
          <label className="block text-xs font-bold text-slate-700">Push-Ups (2 min)</label>
          <input
            type="number"
            value={pu}
            onChange={(e) => setPu(Number(e.target.value))}
            className="w-full text-base p-2 border rounded-lg bg-white"
          />
          <div className="text-xs font-semibold text-sky-700">{res.pushupScore} / 100 pts ({res.pushupPass ? '✓ Pass' : 'Fail'})</div>
        </div>
        <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
          <label className="block text-xs font-bold text-slate-700">Sit-Ups (2 min)</label>
          <input
            type="number"
            value={su}
            onChange={(e) => setSu(Number(e.target.value))}
            className="w-full text-base p-2 border rounded-lg bg-white"
          />
          <div className="text-xs font-semibold text-sky-700">{res.situpScore} / 100 pts ({res.situpPass ? '✓ Pass' : 'Fail'})</div>
        </div>
        <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
          <label className="block text-xs font-bold text-slate-700">2-Mile Run (MM:SS)</label>
          <div className="flex gap-1">
            <input
              type="number"
              value={runM}
              onChange={(e) => setRunM(Number(e.target.value))}
              className="w-1/2 text-base p-2 border rounded-lg bg-white"
              placeholder="Min"
            />
            <input
              type="number"
              value={runS}
              onChange={(e) => setRunS(Number(e.target.value))}
              className="w-1/2 text-base p-2 border rounded-lg bg-white"
              placeholder="Sec"
            />
          </div>
          <div className="text-xs font-semibold text-sky-700">{res.runScore} / 100 pts ({res.runPass ? '✓ Pass' : 'Fail'})</div>
        </div>
      </div>

      <div className={`p-6 rounded-2xl border text-center ${res.passed ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'}`}>
        <div className="text-xs font-semibold uppercase tracking-wider">Overall APFT Score</div>
        <div className="text-4xl sm:text-5xl font-extrabold my-1">{res.totalScore} / 300</div>
        <div className="text-sm font-bold mt-2">
          {res.passed ? '✓ APFT PASSED (Min 60 pts per event)' : '✕ DID NOT MEET STANDARDS'}
        </div>
        {res.earnedBadge && (
          <div className="mt-2 text-xs font-semibold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full inline-block">
            ★ Physical Fitness Badge Qualified (90+ in all events)
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 3. ACFT Calculator Widget (Army Combat Fitness Test)
// ----------------------------------------------------------------------
export function AcftWidget() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<any>('17-21');
  const [mdl, setMdl] = useState<number>(240);
  const [spt, setSpt] = useState<number>(9.5);
  const [hrp, setHrp] = useState<number>(36);
  const [sdcM, setSdcM] = useState<number>(2);
  const [sdcS, setSdcS] = useState<number>(0);
  const [plkM, setPlkM] = useState<number>(2);
  const [plkS, setPlkS] = useState<number>(15);
  const [runM, setRunM] = useState<number>(17);
  const [runS, setRunS] = useState<number>(30);

  const res = calculateAcft({
    gender,
    ageBracket: age,
    mdlLbs: mdl,
    sptMeters: spt,
    hrpReps: hrp,
    sdcMinutes: sdcM,
    sdcSeconds: sdcS,
    plkMinutes: plkM,
    plkSeconds: plkS,
    twoMileMinutes: runM,
    twoMileSeconds: runS,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as any)}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Age Bracket</label>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full text-base px-3 py-2.5 bg-white border border-slate-300 rounded-lg"
          >
            <option value="17-21">17–21</option>
            <option value="22-26">22–26</option>
            <option value="27-31">27–31</option>
            <option value="32-36">32–36</option>
            <option value="37-41">37–41</option>
            <option value="42-46">42–46</option>
            <option value="47-51">47–51</option>
            <option value="52-56">52–56</option>
            <option value="57-61">57–61</option>
            <option value="62+">62+</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
          <label className="block text-xs font-bold text-slate-700">1. Deadlift (MDL lbs)</label>
          <input type="number" value={mdl} onChange={(e) => setMdl(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg bg-white" />
          <div className="text-xs font-semibold text-sky-700">{res.mdlScore} pts ({res.eventPassStatus.mdl ? 'Pass' : 'Fail'})</div>
        </div>
        <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
          <label className="block text-xs font-bold text-slate-700">2. Power Throw (SPT m)</label>
          <input type="number" step="0.1" value={spt} onChange={(e) => setSpt(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg bg-white" />
          <div className="text-xs font-semibold text-sky-700">{res.sptScore} pts ({res.eventPassStatus.spt ? 'Pass' : 'Fail'})</div>
        </div>
        <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
          <label className="block text-xs font-bold text-slate-700">3. Push-Up (HRP reps)</label>
          <input type="number" value={hrp} onChange={(e) => setHrp(Number(e.target.value))} className="w-full text-base p-2 border rounded-lg bg-white" />
          <div className="text-xs font-semibold text-sky-700">{res.hrpScore} pts ({res.eventPassStatus.hrp ? 'Pass' : 'Fail'})</div>
        </div>
        <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
          <label className="block text-xs font-bold text-slate-700">4. Sprint-Drag-Carry (MM:SS)</label>
          <div className="flex gap-1">
            <input type="number" value={sdcM} onChange={(e) => setSdcM(Number(e.target.value))} className="w-1/2 text-base p-2 border rounded-lg bg-white" placeholder="M" />
            <input type="number" value={sdcS} onChange={(e) => setSdcS(Number(e.target.value))} className="w-1/2 text-base p-2 border rounded-lg bg-white" placeholder="S" />
          </div>
          <div className="text-xs font-semibold text-sky-700">{res.sdcScore} pts ({res.eventPassStatus.sdc ? 'Pass' : 'Fail'})</div>
        </div>
        <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
          <label className="block text-xs font-bold text-slate-700">5. Plank (PLK MM:SS)</label>
          <div className="flex gap-1">
            <input type="number" value={plkM} onChange={(e) => setPlkM(Number(e.target.value))} className="w-1/2 text-base p-2 border rounded-lg bg-white" placeholder="M" />
            <input type="number" value={plkS} onChange={(e) => setPlkS(Number(e.target.value))} className="w-1/2 text-base p-2 border rounded-lg bg-white" placeholder="S" />
          </div>
          <div className="text-xs font-semibold text-sky-700">{res.plkScore} pts ({res.eventPassStatus.plk ? 'Pass' : 'Fail'})</div>
        </div>
        <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
          <label className="block text-xs font-bold text-slate-700">6. Two-Mile Run (MM:SS)</label>
          <div className="flex gap-1">
            <input type="number" value={runM} onChange={(e) => setRunM(Number(e.target.value))} className="w-1/2 text-base p-2 border rounded-lg bg-white" placeholder="M" />
            <input type="number" value={runS} onChange={(e) => setRunS(Number(e.target.value))} className="w-1/2 text-base p-2 border rounded-lg bg-white" placeholder="S" />
          </div>
          <div className="text-xs font-semibold text-sky-700">{res.twoMileScore} pts ({res.eventPassStatus.twoMile ? 'Pass' : 'Fail'})</div>
        </div>
      </div>

      <div className={`p-6 rounded-2xl border text-center ${res.passed ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'}`}>
        <div className="text-xs font-semibold uppercase tracking-wider">Total ACFT Composite Score</div>
        <div className="text-4xl sm:text-5xl font-extrabold my-1">{res.totalScore} / 600</div>
        <div className="text-sm font-bold mt-2">
          {res.passed ? '✓ ACFT QUALIFIED (Min 60 pts in all 6 events)' : '✕ DOES NOT MEET 60-PT EVENT MINIMUM'}
        </div>
        {res.isPhysicalFitnessExcellence && (
          <div className="mt-2 text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1 rounded-full inline-block">
            ★ Physical Fitness Excellence Ribbon Qualified (≥ 540 total, 90+ each)
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 4. Bench Press Calculator Widget (1RM)
// ----------------------------------------------------------------------
export function BenchPressWidget() {
  const [weight, setWeight] = useState<number>(185);
  const [reps, setReps] = useState<number>(6);
  const [bw, setBw] = useState<number>(175);
  const [unit, setUnit] = useState<'lbs' | 'kg'>('lbs');

  const res = calculateBenchPress({
    weightLifted: weight,
    repetitions: reps,
    bodyWeight: bw,
    unit,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Weight ({unit})</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Reps (1–30)</label>
          <input
            type="number"
            min="1"
            max="30"
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Bodyweight ({unit})</label>
          <input
            type="number"
            value={bw}
            onChange={(e) => setBw(Number(e.target.value))}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Units</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as any)}
            className="w-full text-base px-3 py-2 bg-white border border-slate-300 rounded-lg"
          >
            <option value="lbs">Pounds (lbs)</option>
            <option value="kg">Kilograms (kg)</option>
          </select>
        </div>
      </div>

      <div className="p-6 bg-sky-50 border border-sky-100 rounded-2xl text-center">
        <div className="text-xs font-semibold text-sky-800 uppercase tracking-wider">Estimated One-Rep Max (1RM)</div>
        <div className="text-4xl sm:text-5xl font-extrabold text-sky-700 my-1">
          {res.oneRepMax} <span className="text-2xl font-bold text-sky-900">{unit}</span>
        </div>
        {res.classification && (
          <div className="text-xs text-sky-800 mt-1">
            Level: <span className="font-bold">{res.classification}</span> ({res.strengthToWeightRatio}x bodyweight)
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Training Percentage & Rep Max Chart:</div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {res.percentageTable.slice(0, 6).map((row) => (
            <div key={row.percent} className="p-2.5 bg-slate-50 border rounded-xl text-center">
              <div className="text-xs font-bold text-slate-600">{row.percent}%</div>
              <div className="text-sm font-bold text-slate-900">{row.weight} {unit}</div>
              <div className="text-[10px] text-slate-400">~{row.estimatedReps} reps</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
