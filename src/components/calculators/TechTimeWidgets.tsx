'use client';

import React, { useState, useEffect } from 'react';
import {
  calculateDownloadTime,
  calculateEpochTime,
  calculateDiscordTimestamps,
  calculateAudiobookSpeed,
} from '@/lib/calculators/dateTimeEngines';
import { calculateSpeechAndReadingTime } from '@/lib/calculators/specializedTimeEngines';
import { formatNumber } from '@/lib/formatting';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';
import { Download, Clock, Copy, Check, Headphones, BookOpen, Terminal, Sparkles } from 'lucide-react';

// ==========================================
// 1. DOWNLOAD TIME CALCULATOR
// ==========================================
export const DownloadTimeCalculatorWidget: React.FC = () => {
  const [fileSize, setFileSize] = useState<number>(50);
  const [fileUnit, setFileUnit] = useState<'MB' | 'GB' | 'TB'>('GB');
  const [speed, setSpeed] = useState<number>(100);
  const [speedUnit, setSpeedUnit] = useState<'Kbps' | 'Mbps' | 'Gbps'>('Mbps');

  const res = calculateDownloadTime(fileSize, fileUnit, speed, speedUnit);

  const getResultText = () => {
    return `Download of ${fileSize} ${fileUnit} at ${speed} ${speedUnit}: ${res.durationFormatted} (${res.transferRateMBs.toFixed(2)} MB/s actual throughput).`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              File Size
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0.1"
                step="any"
                value={fileSize || ''}
                onChange={e => setFileSize(Math.max(0, parseFloat(e.target.value) || 0))}
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              />
              <select
                value={fileUnit}
                onChange={e => setFileUnit(e.target.value as any)}
                className="w-24 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold text-sm"
              >
                <option value="MB">MB</option>
                <option value="GB">GB</option>
                <option value="TB">TB</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Internet Connection Speed
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0.1"
                step="any"
                value={speed || ''}
                onChange={e => setSpeed(Math.max(0, parseFloat(e.target.value) || 0))}
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              />
              <select
                value={speedUnit}
                onChange={e => setSpeedUnit(e.target.value as any)}
                className="w-24 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold text-sm"
              >
                <option value="Kbps">Kbps</option>
                <option value="Mbps">Mbps</option>
                <option value="Gbps">Gbps</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-xs text-slate-500 font-medium block mb-2">Common File & Game Sizes:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '4K Movie (15 GB)', size: 15, unit: 'GB' },
                { label: 'AAA Game (80 GB)', size: 80, unit: 'GB' },
                { label: 'Steam Update (5 GB)', size: 5, unit: 'GB' },
                { label: 'HD Episode (1.5 GB)', size: 1.5, unit: 'GB' },
              ].map(p => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setFileSize(p.size);
                    setFileUnit(p.unit as any);
                  }}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 font-medium"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setFileSize(50);
              setFileUnit('GB');
              setSpeed(100);
              setSpeedUnit('Mbps');
            }}
          />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Estimated Download Time
            </span>
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-950 font-mono tracking-tight">
                {res.durationFormatted}
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Effective transfer rate: <strong>{res.transferRateMBs.toFixed(2)} MB/s</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Seconds</span>
                <p className="text-2xl font-bold text-slate-900">{formatNumber(res.durationSeconds)}</p>
                <span className="text-[11px] text-slate-400">secs</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">File In Megabytes</span>
                <p className="text-xl font-bold text-slate-900">{formatNumber(Math.round(res.fileSizeMB))}</p>
                <span className="text-[11px] text-slate-400">MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. DISCORD EPOCH TIME CALCULATOR
// ==========================================
export const DiscordEpochTimeCalculatorWidget: React.FC = () => {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const now = new Date();
  const defaultDt = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;

  const [dtString, setDtString] = useState<string>(defaultDt);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const timestamp = Math.floor(new Date(dtString).getTime() / 1000);
  const formats = calculateDiscordTimestamps(timestamp);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getResultText = () => {
    return `Discord Relative Timestamp: <t:${timestamp}:R> (Epoch: ${timestamp})`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="max-w-md">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Pick Date & Time for Discord
          </label>
          <input
            type="datetime-local"
            value={dtString}
            onChange={e => setDtString(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
          />
          <span className="text-xs text-slate-500 mt-1 block">
            Unix Epoch Timestamp: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono font-bold text-indigo-700">{timestamp}</code>
          </span>
        </div>

        {/* Discord Formats List */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Discord Timestamp Markdown Codes
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {formats.map(f => (
              <div key={f.code} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 hover:border-indigo-200 transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono font-bold text-indigo-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {f.markdown}
                    </code>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase">{f.label}</span>
                  </div>
                  <p className="text-xs text-slate-700 truncate mt-1">
                    Preview: <span className="font-medium text-slate-900">{f.preview}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(f.markdown, f.code)}
                  className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                    copiedKey === f.code
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                  title="Copy Discord Code"
                >
                  {copiedKey === f.code ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copiedKey === f.code ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <CalculatorActions resultText={getResultText()} onReset={() => setDtString(defaultDt)} />
      </div>
    </div>
  );
};

// ==========================================
// 3. EPOCH TIME CONVERTER & 4. UNIX EPOCH TIME
// ==========================================
export const EpochTimeConverterWidget: React.FC = () => {
  const [timestampInput, setTimestampInput] = useState<string>(() => Math.floor(Date.now() / 1000).toString());
  const [copied, setCopied] = useState<boolean>(false);

  const num = parseInt(timestampInput) || 0;
  const res = calculateEpochTime(num);

  const handleCurrent = () => {
    setTimestampInput(Math.floor(Date.now() / 1000).toString());
  };

  const getResultText = () => {
    return `Epoch ${timestampInput} = ${res.utcString} (UTC) | ${res.localString} (Local)`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Unix Timestamp (Seconds or Millis)
              </label>
              <button
                type="button"
                onClick={handleCurrent}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Use Current Time
              </button>
            </div>
            <input
              type="text"
              value={timestampInput}
              onChange={e => setTimestampInput(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base font-mono font-semibold"
            />
          </div>

          <div className="pt-2">
            <span className="text-xs text-slate-500 font-medium block mb-2">Milestone Epoch Timestamps:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Epoch Zero (1970)', val: '0' },
                { label: '1 Billion Seconds (2001)', val: '1000000000' },
                { label: '2 Billion Seconds (2033)', val: '2000000000' },
                { label: 'Y2K38 Overflow (2038)', val: '2147483647' },
              ].map(p => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setTimestampInput(p.val)}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 font-medium"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleCurrent} />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Decoded UTC Date & Time
            </span>
            <div className="mt-3">
              <div className="text-xl sm:text-2xl font-extrabold text-indigo-950 font-mono tracking-tight break-all">
                {res.utcString}
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                ISO 8601: <code className="bg-white px-1.5 py-0.5 rounded border border-indigo-200">{res.isoString}</code>
              </p>
            </div>

            <div className="space-y-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Local Timezone</span>
                <p className="text-sm font-bold text-slate-900">{res.localString}</p>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Relative Offset</span>
                <p className="text-sm font-bold text-slate-900">{res.relativeText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Unix Epoch Time Live & 2038 Bug Widget
export const UnixEpochTimeCalculatorWidget: React.FC = () => {
  const [currentUnix, setCurrentUnix] = useState<number>(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentUnix(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const y2038 = 2147483647; // 03:14:07 UTC on 19 January 2038
  const secondsRemaining2038 = y2038 - currentUnix;
  const daysRemaining2038 = Math.floor(secondsRemaining2038 / 86400);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto space-y-6">
      {/* Live Unix Epoch ticker */}
      <div className="p-6 bg-slate-900 text-white rounded-xl text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
          Live Unix Epoch Timestamp (Seconds since Jan 1, 1970 UTC)
        </span>
        <div className="text-4xl sm:text-6xl font-extrabold font-mono text-white tracking-widest py-2">
          {currentUnix}
        </div>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          Updates in real-time every second
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-xl">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
            Year 2038 Problem (Y2K38)
          </span>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-mono mt-2">
            {formatNumber(daysRemaining2038)} days
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Until 32-bit signed integer overflow (2,147,483,647 seconds on Jan 19, 2038 at 03:14:07 UTC).
          </p>
        </div>

        <div className="p-5 bg-indigo-50/70 border border-indigo-200 rounded-xl">
          <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider block">
            Milliseconds Epoch (JS Date.now())
          </span>
          <p className="text-xl sm:text-2xl font-extrabold text-indigo-950 font-mono mt-2">
            {Date.now()}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            13-digit standard JavaScript millisecond timestamp.
          </p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. AUDIOBOOK SPEED CALCULATOR
// ==========================================
export const AudiobookSpeedCalculatorWidget: React.FC = () => {
  const [hours, setHours] = useState<number>(10);
  const [minutes, setMinutes] = useState<number>(30);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.5);

  const res = calculateAudiobookSpeed(hours, minutes, speedMultiplier);

  const getResultText = () => {
    return `Audiobook (${hours}h ${minutes}m) at ${speedMultiplier}x speed will take ${res.newDurationFormatted} (Time saved: ${res.timeSavedFormatted}, ${res.percentSaved.toFixed(1)}%).`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Book Hours
              </label>
              <input
                type="number"
                min="0"
                value={hours}
                onChange={e => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Book Minutes
              </label>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={e => setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Playback Speed: {speedMultiplier.toFixed(2)}x
              </label>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.05"
              value={speedMultiplier}
              onChange={e => setSpeedMultiplier(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div className="pt-2">
            <span className="text-xs text-slate-500 font-medium block mb-2">Preset Speeds:</span>
            <div className="flex flex-wrap gap-2">
              {[1.0, 1.25, 1.5, 1.75, 2.0, 2.5].map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpeedMultiplier(s)}
                  className={`px-2.5 py-1 text-xs rounded-md border font-semibold ${
                    speedMultiplier === s
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-indigo-50'
                  }`}
                >
                  {s.toFixed(2)}x
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setHours(10);
              setMinutes(30);
              setSpeedMultiplier(1.5);
            }}
          />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              New Listening Time
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 font-mono tracking-tight">
                {res.newDurationFormatted}
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Listening at <strong>{speedMultiplier}x</strong> saves <strong>{res.timeSavedFormatted}</strong> ({res.percentSaved.toFixed(1)}% faster)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Time Saved</span>
                <p className="text-xl font-bold text-emerald-600">{res.timeSavedFormatted}</p>
                <span className="text-[11px] text-slate-400">{res.percentSaved.toFixed(1)}% savings</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Original Duration</span>
                <p className="text-xl font-bold text-slate-900">{hours}h {minutes}m</p>
                <span className="text-[11px] text-slate-400">@ 1.0x baseline</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. WORDS TO MINUTES CALCULATOR
// ==========================================
export const WordsToMinutesCalculatorWidget: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [manualCount, setManualCount] = useState<number>(750);
  const [useText, setUseText] = useState<boolean>(false);
  const [wpm, setWpm] = useState<number>(130);

  const wordCount = useText
    ? inputText.trim().split(/\s+/).filter(Boolean).length
    : manualCount;

  const res = calculateSpeechAndReadingTime(wordCount, wpm);

  const getResultText = () => {
    return `${formatNumber(wordCount)} words spoken at ${wpm} WPM takes ${res.speechFormatted} (Silent reading: ${res.readingFormatted}).`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-3">
            <button
              type="button"
              onClick={() => setUseText(false)}
              className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-lg ${
                !useText ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Word Count
            </button>
            <button
              type="button"
              onClick={() => setUseText(true)}
              className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-lg ${
                useText ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Paste Script / Text
            </button>
          </div>

          {!useText ? (
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Total Words
              </label>
              <input
                type="number"
                min="1"
                value={manualCount || ''}
                onChange={e => setManualCount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              />
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Speech / Presentation Text
                </label>
                <span className="text-xs font-bold text-indigo-600">{wordCount} words</span>
              </div>
              <textarea
                rows={4}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Paste speech or script here..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-base"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Speaking Pace ({wpm} WPM)
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Slow (110 WPM)', val: 110 },
                { label: 'Conversational (130 WPM)', val: 130 },
                { label: 'Fast Speech (160 WPM)', val: 160 },
                { label: 'Auctioneer (250 WPM)', val: 250 },
              ].map(p => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setWpm(p.val)}
                  className={`px-2.5 py-1 text-xs rounded-md border font-semibold ${
                    wpm === p.val
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-indigo-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <CalculatorActions
            resultText={getResultText()}
            onReset={() => {
              setManualCount(750);
              setInputText('');
              setWpm(130);
            }}
          />
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-6 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
              Speaking Duration
            </span>
            <div className="mt-3">
              <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 font-mono tracking-tight">
                {res.speechFormatted}
              </div>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Spoken aloud at <strong>{wpm} words per minute</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Silent Reading</span>
                <p className="text-xl font-bold text-slate-900">{res.readingFormatted}</p>
                <span className="text-[11px] text-slate-400">@ 238 WPM</span>
              </div>
              <div className="p-3 bg-white border border-indigo-200 rounded-lg">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Words</span>
                <p className="text-xl font-bold text-slate-900">{formatNumber(wordCount)}</p>
                <span className="text-[11px] text-slate-400">words counted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
