'use client';

import React, { useState } from 'react';
import {
  convertToRomanNumeralDate,
  calculateMoonPhaseOnDate,
  calculateHebrewBirthday,
  calculateSoulmateHarmony,
  calculateTwinFlameBirthday,
} from '@/lib/calculators/birthdayEngines';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Copy, Check, Moon, Heart, Flame, Sparkles, Scroll } from 'lucide-react';

// ==========================================
// 1. ROMAN NUMERAL DATE CALCULATOR
// ==========================================
export const RomanNumeralDateWidget: React.FC = () => {
  const [dateStr, setDateStr] = useState<string>('2024-05-18');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const res = convertToRomanNumeralDate(dateStr);

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getResultText = () => {
    return `${dateStr} in Roman numerals: Day-Month-Year: ${res.dayMonthYear} | Month-Day-Year: ${res.monthDayYear} | Dots: ${res.dotted}.`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto space-y-6">
      <div className="max-w-xs">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          Select Date
        </label>
        <input
          type="date"
          value={dateStr}
          onChange={e => setDateStr(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base font-semibold"
        />
      </div>

      <div>
        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-3">
          Popular Roman Numeral Formats (Tattoos, Rings, Engravings):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Day · Month · Year (European / International)', val: res.dayMonthYear, key: 'dmy' },
            { label: 'Month · Day · Year (US Standard)', val: res.monthDayYear, key: 'mdy' },
            { label: 'Year · Month · Day (ISO / Monument)', val: res.yearMonthDay, key: 'ymd' },
            { label: 'Dot Delimited', val: res.dotted, key: 'dot' },
            { label: 'Hyphen Delimited', val: res.hyphenated, key: 'hyp' },
            { label: 'Roman Year Alone', val: res.year, key: 'yr' },
          ].map(item => (
            <div
              key={item.key}
              className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2 hover:border-indigo-300 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">{item.label}</span>
                <div className="text-base sm:text-lg font-serif font-bold text-slate-900 tracking-wider truncate mt-0.5">
                  {item.val}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(item.val, item.key)}
                className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 shrink-0 ${
                  copiedKey === item.key
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {copiedKey === item.key ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copiedKey === item.key ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <CalculatorActions resultText={getResultText()} onReset={() => setDateStr('2024-05-18')} />
    </div>
  );
};

// ==========================================
// 2. MOON PHASE BIRTHDAY CALCULATOR
// ==========================================
export const MoonPhaseBirthdayWidget: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('1996-07-20');

  const res = calculateMoonPhaseOnDate(birthDate);

  const getResultText = () => {
    return `Moon Phase on ${birthDate}: ${res.phaseName} (${res.illuminationPercent}% illuminated, Moon age ${res.moonAgeDays.toFixed(1)} days). Meaning: ${res.personalityProfile}`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Enter Your Birthdate
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-2 text-xs">
            <span className="font-bold text-indigo-900 block">🌙 Birth Moon Archetype</span>
            <p className="text-slate-700 leading-relaxed">{res.personalityProfile}</p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => setBirthDate('1996-07-20')} />
        </div>

        <div className="bg-slate-900 text-white border border-slate-800 rounded-xl p-6 flex flex-col justify-between h-full shadow-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
              Birth Moon Phase
            </span>
            <div className="mt-3 flex items-center gap-4">
              <span className="text-5xl">{res.phaseEmoji}</span>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {res.phaseName}
                </div>
                <p className="text-xs text-indigo-200 mt-0.5">
                  {res.illuminationPercent}% Lunar Illumination
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-400 uppercase block">Moon Age</span>
                <p className="text-xl font-bold text-white mt-0.5">{res.moonAgeDays.toFixed(1)} days</p>
                <span className="text-[10px] text-slate-400">into 29.53d cycle</span>
              </div>
              <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-400 uppercase block">Illumination</span>
                <p className="text-xl font-bold text-amber-300 mt-0.5">{res.illuminationPercent}%</p>
                <span className="text-[10px] text-slate-400">surface brightness</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. HEBREW BIRTHDAY CALCULATOR
// ==========================================
export const HebrewBirthdayWidget: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('2000-09-29');

  const res = calculateHebrewBirthday(birthDate);

  const getResultText = () => {
    return `Gregorian ${birthDate} Hebrew Birthday: ${res.hebrewDateEnglish} (${res.hebrewDateHebrew}). Bar/Bat Mitzvah Hebrew Date: ${res.barBatMitzvahHebrewYear}.`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Gregorian Date of Birth
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-xl space-y-2 text-xs">
            <span className="font-bold text-sky-900 block">✡️ The Hebrew Lunisolar Calendar</span>
            <p className="text-slate-600">
              The Hebrew calendar synchronizes lunar months with solar years. A person&apos;s Hebrew birthday is celebrated on the anniversary of the Jewish calendar date on which they were born.
            </p>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={() => setBirthDate('2000-09-29')} />
        </div>

        <div className="bg-sky-50/60 border border-sky-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
              Hebrew Calendar Birthday
            </span>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-950 tracking-tight">
                {res.hebrewDateEnglish}
              </div>
              <div className="text-xl font-bold text-sky-700 font-serif mt-1" dir="rtl">
                {res.hebrewDateHebrew}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-sky-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Hebrew Year</span>
                <p className="text-2xl font-bold text-slate-900">{res.hebrewYear}</p>
                <span className="text-[11px] text-slate-400">Anno Mundi (AM)</span>
              </div>
              <div className="p-3 bg-white border border-sky-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Bar/Bat Mitzvah Year</span>
                <p className="text-2xl font-bold text-sky-900">{res.barBatMitzvahHebrewYear}</p>
                <span className="text-[11px] text-slate-400">Age 12/13</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. SOULMATE BIRTHDAY CALCULATOR
// ==========================================
export const SoulmateBirthdayWidget: React.FC = () => {
  const [bday1, setBday1] = useState<string>('1994-03-12');
  const [bday2, setBday2] = useState<string>('1995-11-28');

  const res = calculateSoulmateHarmony(bday1, bday2);

  const getResultText = () => {
    return `Soulmate Compatibility: ${res.compatibilityScore}% match. Life Path ${res.lifePath1} & Life Path ${res.lifePath2}. Harmonious vibration: ${res.harmonyType}. Summary: ${res.summary}`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Person 1 Birthdate
            </label>
            <input
              type="date"
              value={bday1}
              onChange={e => setBday1(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Person 2 Birthdate
            </label>
            <input
              type="date"
              value={bday2}
              onChange={e => setBday2(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1 text-xs">
            <span className="font-bold text-rose-900 block">💖 Relationship Dynamic</span>
            <p className="text-slate-700 leading-relaxed">{res.summary}</p>
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setBday1('1994-03-12');
              setBday2('1995-11-28');
            }}
          />
        </div>

        <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Soulmate Harmony Score
            </span>
            <div className="mt-3">
              <div className="text-5xl font-extrabold text-rose-950 tracking-tight">
                {res.compatibilityScore}%
              </div>
              <p className="text-sm font-bold text-rose-700 mt-1">
                {res.harmonyType}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-rose-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Person 1 Life Path</span>
                <p className="text-2xl font-bold text-slate-900">Path #{res.lifePath1}</p>
                <span className="text-[11px] text-slate-400">core frequency</span>
              </div>
              <div className="p-3 bg-white border border-rose-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Person 2 Life Path</span>
                <p className="text-2xl font-bold text-slate-900">Path #{res.lifePath2}</p>
                <span className="text-[11px] text-slate-400">core frequency</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. TWIN FLAME BIRTHDAY CALCULATOR
// ==========================================
export const TwinFlameBirthdayWidget: React.FC = () => {
  const [bday1, setBday1] = useState<string>('1992-06-15');
  const [bday2, setBday2] = useState<string>('1994-09-24');

  const res = calculateTwinFlameBirthday(bday1, bday2);

  const getResultText = () => {
    return `Twin Flame Mirror Match: ${res.mirrorScore}% alignment. Polarity: ${res.polarity}. Stage: ${res.stage}. Guidance: ${res.guidance}`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Your Date of Birth
            </label>
            <input
              type="date"
              value={bday1}
              onChange={e => setBday1(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Partner / Twin Flame Birthdate
            </label>
            <input
              type="date"
              value={bday2}
              onChange={e => setBday2(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
            />
          </div>

          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1 text-xs">
            <span className="font-bold text-amber-900 block">🔥 Spiritual Mirror Guidance</span>
            <p className="text-slate-700 leading-relaxed">{res.guidance}</p>
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setBday1('1992-06-15');
              setBday2('1994-09-24');
            }}
          />
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-rose-50 border border-amber-200 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Twin Flame Mirror Connection
            </span>
            <div className="mt-3">
              <div className="text-5xl font-extrabold text-amber-950 tracking-tight">
                {res.mirrorScore}%
              </div>
              <p className="text-sm font-bold text-amber-800 mt-1">
                Polarity: {res.polarity}
              </p>
            </div>

            <div className="space-y-3 mt-6">
              <div className="p-3 bg-white/90 border border-amber-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Reunion Cycle Stage</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{res.stage}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-white/90 border border-amber-200 rounded-lg text-center">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase block">Soul 1 Path</span>
                  <p className="text-lg font-bold text-slate-900">#{res.lifePath1}</p>
                </div>
                <div className="p-2.5 bg-white/90 border border-amber-200 rounded-lg text-center">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase block">Soul 2 Path</span>
                  <p className="text-lg font-bold text-slate-900">#{res.lifePath2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
