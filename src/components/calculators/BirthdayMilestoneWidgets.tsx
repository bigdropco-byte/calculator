'use client';

import React, { useState } from 'react';
import {
  calculateBirthdayMilestones,
  calculateHalfBirthday,
  calculateSpecialBirthdays,
  calculateBirthYear,
  calculateAnniversaryGifts,
  calculateChineseZodiac,
  getWesternZodiac,
} from '@/lib/calculators/birthdayEngines';
import { calculateSleepCycles } from '@/lib/calculators/specializedTimeEngines';
import { calculateDateAddSubtract, calculateDateDifference } from '@/lib/calculators/dateTimeEngines';
import { formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Cake, Sparkles, Moon, Bed, Gift, Crown, Calendar, Award } from 'lucide-react';

// ==========================================
// 1. BIRTHDAY CALCULATOR
// ==========================================
export const BirthdayCalculatorWidget: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('1995-08-14');

  const milestones = calculateBirthdayMilestones(birthDate);

  const getResultText = () => {
    return `Born on ${birthDate} (${milestones.dayOfWeekBorn}): Age ${milestones.ageYears}y ${milestones.ageMonths}m ${milestones.ageDays}d. Generation: ${milestones.generation}. Next birthday in ${milestones.daysUntilNextBirthday} days (${milestones.nextBirthdayDate}). Total days lived: ${formatNumber(milestones.totalDaysLived)}.`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Your Date of Birth
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base font-medium"
            />
          </div>

          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Day Born:</span>
              <span className="font-bold text-slate-900">{milestones.dayOfWeekBorn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Generation:</span>
              <span className="font-bold text-indigo-700">{milestones.generation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Next Birthday:</span>
              <span className="font-bold text-slate-900">{milestones.nextBirthdayDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Next Age Turning:</span>
              <span className="font-bold text-slate-900">{milestones.nextAgeTurning} years old</span>
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => setBirthDate('1995-08-14')} />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Your Current Exact Age
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 tracking-tight">
                {milestones.ageYears} <span className="text-xl font-bold text-indigo-800">years old</span>
              </div>
              <p className="text-sm font-semibold text-indigo-700 mt-1">
                {milestones.ageMonths} months, {milestones.ageDays} days
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Countdown Next B-Day</span>
                <p className="text-2xl font-bold text-emerald-600">{milestones.daysUntilNextBirthday}</p>
                <span className="text-[11px] text-slate-400">days left</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Days Lived</span>
                <p className="text-2xl font-bold text-slate-900">{formatNumber(milestones.totalDaysLived)}</p>
                <span className="text-[11px] text-slate-400">days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. WEEKS AGO CALCULATOR
// ==========================================
export const WeeksAgoCalculatorWidget: React.FC = () => {
  const [numWeeks, setNumWeeks] = useState<number>(6);
  const [baseDate, setBaseDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [direction, setDirection] = useState<'ago' | 'ahead'>('ago');

  const res = calculateDateAddSubtract(
    baseDate,
    0,
    0,
    numWeeks,
    0,
    direction === 'ago' ? 'subtract' : 'add'
  );

  const totalDays = numWeeks * 7;

  const getResultText = () => {
    return `${numWeeks} weeks ${direction} from ${baseDate} lands on ${res.formattedDate} (${res.dayOfWeek}). Total days: ${totalDays}.`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-3">
            <button
              type="button"
              onClick={() => setDirection('ago')}
              className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-lg ${
                direction === 'ago' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Weeks Ago (Past)
            </button>
            <button
              type="button"
              onClick={() => setDirection('ahead')}
              className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-lg ${
                direction === 'ahead' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Weeks Ahead (Future)
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Number of Weeks
            </label>
            <input
              type="number"
              min="1"
              value={numWeeks || ''}
              onChange={e => setNumWeeks(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              From Reference Date
            </label>
            <input
              type="date"
              value={baseDate}
              onChange={e => setBaseDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div className="pt-2">
            <span className="text-xs text-slate-500 font-medium block mb-2">Common Quick Jumps:</span>
            <div className="flex flex-wrap gap-2">
              {[2, 4, 6, 8, 12, 26, 52].map(w => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setNumWeeks(w)}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 font-medium"
                >
                  {w} weeks {w === 52 ? '(1 Year)' : ''}
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setNumWeeks(6);
              setBaseDate(new Date().toISOString().split('T')[0]);
              setDirection('ago');
            }}
          />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Calculated Date
            </span>
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-950 tracking-tight">
                {res.formattedDate}
              </div>
              <div className="mt-1 text-base font-semibold text-indigo-700">
                {res.dayOfWeek}
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                {numWeeks} weeks {direction} = <strong>{totalDays} calendar days</strong>
              </p>
            </div>

            <div className="mt-6 p-4 bg-white border border-indigo-200 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Reference:</span>
                <span className="font-semibold text-slate-800">{baseDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ISO Result:</span>
                <span className="font-mono font-semibold text-slate-900">{res.targetDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. BIRTH YEAR CALCULATOR
// ==========================================
export const BirthYearCalculatorWidget: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [age, setAge] = useState<number>(30);
  const [targetYear, setTargetYear] = useState<number>(currentYear);

  const res = calculateBirthYear(age, targetYear);
  const chinese1 = calculateChineseZodiac(res.birthYearIfBirthdayPassed);
  const chinese2 = calculateChineseZodiac(res.birthYearIfBirthdayNotPassed);

  const getResultText = () => {
    return `If you are ${age} in ${targetYear}, your birth year is either ${res.birthYearIfBirthdayPassed} (if birthday already passed) or ${res.birthYearIfBirthdayNotPassed} (if birthday has not yet occurred). Generation: ${res.generation}.`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Age (Years Old)
            </label>
            <input
              type="number"
              min="0"
              max="130"
              value={age || ''}
              onChange={e => setAge(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              In Year
            </label>
            <input
              type="number"
              value={targetYear || ''}
              onChange={e => setTargetYear(parseInt(e.target.value) || currentYear)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base font-semibold"
            />
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setAge(30);
              setTargetYear(currentYear);
            }}
          />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Probable Birth Year
            </span>
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-950 tracking-tight">
                {res.birthYearIfBirthdayPassed} or {res.birthYearIfBirthdayNotPassed}
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Generation: <strong className="text-indigo-700">{res.generation}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">If Birthday Passed</span>
                <p className="text-2xl font-bold text-slate-900">{res.birthYearIfBirthdayPassed}</p>
                <span className="text-[11px] text-slate-400">{chinese1.sign} ({chinese1.element})</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">If Birthday Pending</span>
                <p className="text-2xl font-bold text-slate-900">{res.birthYearIfBirthdayNotPassed}</p>
                <span className="text-[11px] text-slate-400">{chinese2.sign} ({chinese2.element})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. HALF BIRTHDAY CALCULATOR
// ==========================================
export const HalfBirthdayCalculatorWidget: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('1998-05-20');

  const res = calculateHalfBirthday(birthDate);

  const getResultText = () => {
    return `Half birthday for ${birthDate} is celebrated on ${res.nextHalfBirthdayFormatted} (${res.daysUntil} days away).`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Your Birthdate
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-2 text-xs">
            <span className="font-bold text-indigo-900 block mb-1">What is a Half Birthday?</span>
            <p className="text-slate-600">
              A half-birthday marks exactly 6 months from your birthday. It is popular for babies (6-month milestone) and for people born during major holidays (Christmas/New Years) who want a separate summer celebration!
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => setBirthDate('1998-05-20')} />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Next Half Birthday
            </span>
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-950 tracking-tight">
                {res.nextHalfBirthdayFormatted}
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Occurs every year 6 months opposite your birthday.
              </p>
            </div>

            <div className="mt-6 p-4 bg-white border border-indigo-200 rounded-lg">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Days Until Half Birthday</span>
              <p className="text-3xl font-extrabold text-emerald-600 mt-1">{res.daysUntil} days</p>
              <span className="text-[11px] text-slate-400">countdown</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. GOLDEN BIRTHDAY, 6. SILVER BIRTHDAY, 7. DIAMOND BIRTHDAY
// ==========================================
export const GoldenBirthdayCalculatorWidget: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('2005-09-18');

  const res = calculateSpecialBirthdays(birthDate);

  const getResultText = () => {
    return `Golden Birthday: Turning ${res.goldenAge} on ${res.goldenBirthdayDate}. Status: ${res.isGoldenPassed ? 'Already Celebrated' : `${res.goldenDaysLeft} days away`}.`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Enter Birthday
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1 text-xs">
            <span className="font-bold text-amber-900 block">✨ Golden Birthday Meaning</span>
            <p className="text-slate-600">
              A Golden Birthday (also called lucky or star birthday) happens when you turn the age that corresponds to the calendar day you were born on (e.g. turning 18 on the 18th).
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => setBirthDate('2005-09-18')} />
        </div>

        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Golden Birthday Date
            </span>
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-950 tracking-tight">
                {res.goldenBirthdayDate}
              </div>
              <p className="text-sm font-semibold text-amber-800 mt-1">
                Turning {res.goldenAge} years old on the {res.goldenAge}th
              </p>
            </div>

            <div className="mt-6 p-4 bg-white border border-amber-200 rounded-lg">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Milestone Status</span>
              <p className="text-xl font-bold text-slate-900 mt-1">
                {res.isGoldenPassed ? '🎉 Already Celebrated!' : `⏳ In ${res.goldenDaysLeft} days`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SilverBirthdayCalculatorWidget: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('2002-04-10');

  const res = calculateSpecialBirthdays(birthDate);

  const getResultText = () => {
    return `Silver Birthday (25th): ${res.silverBirthdayDate}. Status: ${res.isSilverPassed ? 'Celebrated' : `${res.silverDaysLeft} days left`}.`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Enter Birthday
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div className="p-4 bg-slate-100 rounded-xl space-y-1 text-xs">
            <span className="font-bold text-slate-800 block">🥈 Silver Jubilee Birthday</span>
            <p className="text-slate-600">
              The Silver Birthday marks turning 25 years old — a quarter-century milestone representing independence, flourishing adulthood, and silver reflections.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => setBirthDate('2002-04-10')} />
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Silver Birthday Date (Age 25)
            </span>
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {res.silverBirthdayDate}
              </div>
              <p className="text-sm font-semibold text-indigo-700 mt-1">
                Quarter Century Celebration
              </p>
            </div>

            <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Status</span>
              <p className="text-xl font-bold text-slate-900 mt-1">
                {res.isSilverPassed ? 'Passed' : `Upcoming in ${res.silverDaysLeft} days`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DiamondBirthdayCalculatorWidget: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('1970-11-25');

  const res = calculateSpecialBirthdays(birthDate);

  const getResultText = () => {
    return `Diamond Birthday (60th): ${res.diamondBirthdayDate}. Status: ${res.isDiamondPassed ? 'Celebrated' : `${res.diamondDaysLeft} days remaining`}.`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Enter Birthday
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div className="p-4 bg-cyan-50/70 border border-cyan-200 rounded-xl space-y-1 text-xs">
            <span className="font-bold text-cyan-900 block">💎 Diamond Birthday Milestone</span>
            <p className="text-slate-600">
              The Diamond Jubilee birthday honors reaching 60 or 75 years of life, symbolizing enduring strength, resilience, and precious wisdom.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => setBirthDate('1970-11-25')} />
        </div>

        <div className="bg-cyan-50/70 border border-cyan-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-900">
              Diamond Milestone Date (Age 60)
            </span>
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-950 tracking-tight">
                {res.diamondBirthdayDate}
              </div>
              <p className="text-sm font-semibold text-cyan-800 mt-1">
                60th Birthday Diamond Jubilee
              </p>
            </div>

            <div className="mt-6 p-4 bg-white border border-cyan-200 rounded-lg">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Status</span>
              <p className="text-xl font-bold text-slate-900 mt-1">
                {res.isDiamondPassed ? 'Completed' : `Upcoming in ${res.diamondDaysLeft} days`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 8. SLEEP CALCULATOR
// ==========================================
export const SleepCalculatorWidget: React.FC = () => {
  const [mode, setMode] = useState<'wakeAt' | 'sleepNow'>('wakeAt');
  const [targetTime, setTargetTime] = useState<string>('07:00');

  const cycles = calculateSleepCycles(targetTime, mode);

  const getResultText = () => {
    if (mode === 'wakeAt') {
      return `To wake up refreshed at ${targetTime}, fall asleep at: ${cycles.map((c: any) => `${c.timeString} (${c.cycles} cycles)`).join(', ')}.`;
    }
    return `If falling asleep now, optimal wake times are: ${cycles.map((c: any) => `${c.timeString} (${c.cycles} cycles)`).join(', ')}.`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto space-y-6">
      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl max-w-md">
        <button
          type="button"
          onClick={() => setMode('wakeAt')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${
            mode === 'wakeAt' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
          }`}
        >
          Wake Up At Target Time
        </button>
        <button
          type="button"
          onClick={() => setMode('sleepNow')}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${
            mode === 'sleepNow' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
          }`}
        >
          Sleep Right Now
        </button>
      </div>

      {mode === 'wakeAt' && (
        <div className="max-w-xs">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Desired Wake Up Time
          </label>
          <input
            type="time"
            value={targetTime}
            onChange={e => setTargetTime(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base font-bold"
          />
        </div>
      )}

      <div>
        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-3">
          {mode === 'wakeAt' ? 'Optimal Bedtimes (Includes 14 min to fall asleep):' : 'Optimal Wake-Up Times:'}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {cycles.map((c: any) => (
            <div
              key={c.cycles}
              className={`p-4 rounded-xl border flex flex-col justify-between ${
                c.quality === 'Optimal'
                  ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-200'
                  : c.quality === 'Good'
                  ? 'bg-indigo-50/70 border-indigo-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    c.quality === 'Optimal' ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {c.quality}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{c.cycles} Cycles</span>
                </div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono mt-2">
                  {c.timeString}
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                {c.hoursOfSleep.toFixed(1)} hrs of sleep
              </p>
            </div>
          ))}
        </div>
      </div>

      <CalculatorActions resultText={getResultText()} onReset={() => { setMode('wakeAt'); setTargetTime('07:00'); }} />
    </div>
  );
};

// ==========================================
// 9. ANNIVERSARY CALCULATOR
// ==========================================
export const AnniversaryCalculatorWidget: React.FC = () => {
  const [weddingDate, setWeddingDate] = useState<string>('2018-06-23');

  const diff = calculateDateDifference(weddingDate, new Date().toISOString().split('T')[0], false);
  const yearsCelebrated = diff.years;
  const gifts = calculateAnniversaryGifts(yearsCelebrated + 1);

  const nextAnniversaryYear = new Date().getFullYear() + (new Date() > new Date(`${new Date().getFullYear()}-${weddingDate.slice(5)}`) ? 1 : 0);
  const nextDateStr = `${nextAnniversaryYear}-${weddingDate.slice(5)}`;
  const daysUntil = calculateDateDifference(new Date().toISOString().split('T')[0], nextDateStr, false).totalDays;

  const getResultText = () => {
    return `Married on ${weddingDate}: Celebrating ${yearsCelebrated} years, ${diff.months} months. Next anniversary in ${daysUntil} days (Year ${yearsCelebrated + 1} gift: Traditional "${gifts.traditional}", Modern "${gifts.modern}").`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Wedding or Relationship Date
            </label>
            <input
              type="date"
              value={weddingDate}
              onChange={e => setWeddingDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl space-y-2 text-xs">
            <span className="font-bold text-rose-900 block">🎁 Upcoming Year #{yearsCelebrated + 1} Gift Themes</span>
            <div className="flex justify-between">
              <span className="text-slate-600">Traditional Gift:</span>
              <span className="font-bold text-rose-800">{gifts.traditional}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Modern Gift:</span>
              <span className="font-bold text-indigo-700">{gifts.modern}</span>
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => setWeddingDate('2018-06-23')} />
        </div>

        <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Time Celebrated Together
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-rose-950 tracking-tight">
                {yearsCelebrated} <span className="text-xl font-bold text-rose-800">years</span>
              </div>
              <p className="text-sm font-semibold text-rose-700 mt-1">
                {diff.months} months, {diff.days} days
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-rose-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Next Anniversary</span>
                <p className="text-2xl font-bold text-rose-900">{daysUntil}</p>
                <span className="text-[11px] text-slate-400">days left</span>
              </div>
              <div className="p-3 bg-white border border-rose-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Days Lived</span>
                <p className="text-2xl font-bold text-slate-900">{formatNumber(diff.totalDays)}</p>
                <span className="text-[11px] text-slate-400">days united</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
