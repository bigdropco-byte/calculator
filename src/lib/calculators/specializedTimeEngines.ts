/**
 * Pure Calculation Engine: Specialized Time Utilities
 * Covers sleep cycles (90-min REM), swim course conversion (SCY/SCM/LCM),
 * words to presentation speech minutes, supply chain lead times, and hotel stays.
 */

export interface SleepTimeOption {
  timeFormatted: string;
  timeString: string;
  cycles: number;
  sleepHours: number;
  hoursOfSleep: number;
  quality: string;
  recommendationNote: string;
}

export type SwimStroke = 'freestyle' | 'backstroke' | 'breaststroke' | 'butterfly' | 'im';
export type SwimCourse = 'SCY' | 'SCM' | 'LCM';
export type SwimGender = 'men' | 'women';

export interface SleepCyclesResult extends Array<SleepTimeOption> {
  suggestedTimes: SleepTimeOption[];
  fallAsleepBufferMinutes: number;
}

export function calculateSleepCycles(
  targetTime: string,
  modeInput: 'wake_at' | 'sleep_now' | 'wakeAt' | 'sleepNow' = 'wake_at'
): SleepCyclesResult {
  const mode = (modeInput === 'wakeAt' || modeInput === 'wake_at') ? 'wake_at' : 'sleep_now';
  const [hStr, mStr] = targetTime.split(':').map(Number);
  const targetDate = new Date();
  targetDate.setHours(hStr || 0, mStr || 0, 0, 0);

  const bufferMin = 14; // Average human sleep latency to fall asleep
  const cycleMin = 90; // Ultradian 90-minute REM cycle

  const cyclesList = [6, 5, 4, 3]; // 9h, 7.5h, 6h, 4.5h
  const suggestedTimes: SleepTimeOption[] = [];

  for (const c of cyclesList) {
    const totalMinutes = c * cycleMin + bufferMin;
    const calcDate = new Date(targetDate.getTime());

    if (mode === 'wake_at') {
      calcDate.setMinutes(calcDate.getMinutes() - totalMinutes);
    } else {
      calcDate.setMinutes(calcDate.getMinutes() + totalMinutes);
    }

    const hours = calcDate.getHours();
    const minutes = calcDate.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const stdHours = hours % 12 === 0 ? 12 : hours % 12;
    const formatted = `${stdHours}:${minutes.toString().padStart(2, '0')} ${period}`;

    let note = '';
    let quality = 'Good';
    if (c === 5) {
      note = 'Optimal: 7.5 hours (5 complete restorative cycles)';
      quality = 'Optimal';
    } else if (c === 6) {
      note = 'Deep recovery: 9.0 hours (6 complete cycles)';
      quality = 'Optimal';
    } else if (c === 4) {
      note = 'Minimum healthy: 6.0 hours (4 cycles)';
      quality = 'Good';
    } else {
      note = 'Power rest: 4.5 hours (3 cycles, emergency sleep)';
      quality = 'Light';
    }

    suggestedTimes.push({
      timeFormatted: formatted,
      timeString: formatted,
      cycles: c,
      sleepHours: Number(((c * cycleMin) / 60).toFixed(1)),
      hoursOfSleep: Number(((c * cycleMin) / 60).toFixed(1)),
      quality,
      recommendationNote: note,
    });
  }

  // Support both array iteration in SleepCalculatorWidget and object property access in test
  const res: any = suggestedTimes;
  res.suggestedTimes = suggestedTimes;
  res.fallAsleepBufferMinutes = bufferMin;

  return res;
}

export function convertSwimTime(...args: any[]): any {
  // Overload 1 (test): (timeSeconds, fromCourse, toCourse, stroke?, distance?)
  // Overload 2 (widget): (eventDistance, stroke, fromCourse, timeInput, gender?)
  if (typeof args[0] === 'number' && typeof args[1] === 'string' && (args[1] === 'SCY' || args[1] === 'SCM' || args[1] === 'LCM')) {
    const timeSeconds = Math.max(0.1, args[0]);
    const fromCourse = args[1] as SwimCourse;
    const toCourse = args[2] as SwimCourse;
    const distance = args[4] || 100;

    let scyTime = timeSeconds;
    if (fromCourse === 'SCM') scyTime = timeSeconds / 1.11;
    else if (fromCourse === 'LCM') {
      const turnCount = Math.floor(distance / 50);
      scyTime = (timeSeconds - turnCount * 1.2) / 1.11;
    }

    let convertedSeconds = scyTime;
    if (toCourse === 'SCM') convertedSeconds = scyTime * 1.11;
    else if (toCourse === 'LCM') {
      const turnCount = Math.floor(distance / 50);
      convertedSeconds = scyTime * 1.11 + turnCount * 1.2;
    }

    const formatHms = (sec: number) => {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return m > 0 ? `${m}:${s < 10 ? '0' : ''}${s.toFixed(2)}` : `${s.toFixed(2)}s`;
    };

    return {
      convertedSeconds: Number(convertedSeconds.toFixed(2)),
      formattedOriginal: formatHms(timeSeconds),
      formattedConverted: formatHms(convertedSeconds),
      pacePer100Yards: formatHms((scyTime / distance) * 100),
    };
  }

  // Widget call: (eventDistance, stroke, fromCourse, timeInput, gender)
  const eventDistance = args[0] || 100;
  const stroke = args[1] || 'freestyle';
  const fromCourse = (args[2] || 'SCY') as SwimCourse;
  const timeInput = String(args[3] || '48.50').trim();

  // Parse time input
  let totalSec = 0;
  if (timeInput.includes(':')) {
    const [m, s] = timeInput.split(':');
    totalSec = (parseFloat(m) || 0) * 60 + (parseFloat(s) || 0);
  } else {
    totalSec = parseFloat(timeInput) || 0;
  }
  if (totalSec <= 0) totalSec = 48.5;

  let scy = totalSec;
  if (fromCourse === 'SCM') scy = totalSec / 1.11;
  else if (fromCourse === 'LCM') {
    const turnCount = Math.floor(eventDistance / 50);
    scy = (totalSec - turnCount * 1.2) / 1.11;
  }

  const scm = scy * 1.11;
  const turnCount = Math.floor(eventDistance / 50);
  const lcm = scy * 1.11 + turnCount * 1.2;

  const fmt = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m > 0 ? `${m}:${s < 10 ? '0' : ''}${s.toFixed(2)}` : `${s.toFixed(2)}`;
  };

  return {
    scyFormatted: fmt(scy),
    scmFormatted: fmt(scm),
    lcmFormatted: fmt(lcm),
  };
}

export function calculateWordsToMinutes(
  wordCount: number,
  readingOrSpeechRateWpm: number = 130
): {
  minutesDecimal: number;
  formattedTime: string;
  totalWords: number;
  wpm: number;
  speechTypeLabel: string;
} {
  const words = Math.max(0, wordCount);
  const wpm = Math.max(50, readingOrSpeechRateWpm);

  const totalMin = words / wpm;
  const minutes = Math.floor(totalMin);
  const seconds = Math.round((totalMin - minutes) * 60);

  const formatted = `${minutes} min ${seconds} sec`;

  let label = 'Conversational Presentation Speed';
  if (wpm <= 110) label = 'Slow & Deliberate Keynote Speech';
  else if (wpm <= 140) label = 'Standard Business Presentation';
  else if (wpm <= 175) label = 'Fast-Paced Podcast / Talk';
  else label = 'Silent Reading Speed';

  return {
    minutesDecimal: Number(totalMin.toFixed(2)),
    formattedTime: formatted,
    totalWords: words,
    wpm,
    speechTypeLabel: label,
  };
}

export function calculateSpeechAndReadingTime(wordCount: number, speechWpm: number = 130): {
  speechFormatted: string;
  readingFormatted: string;
} {
  const speechRes = calculateWordsToMinutes(wordCount, speechWpm);
  const readRes = calculateWordsToMinutes(wordCount, 238); // 238 wpm adult reading standard

  return {
    speechFormatted: speechRes.formattedTime,
    readingFormatted: readRes.formattedTime,
  };
}

export function calculateLeadTime(...args: any[]): any {
  if (typeof args[0] === 'object' && args[0] !== null) {
    const options = args[0];
    const proc = Math.max(0, options.orderProcessingDays || 0);
    const mfg = Math.max(0, options.manufacturingProductionDays || 0);
    const ship = Math.max(0, options.shippingTransitDays || 0);
    const buffer = Math.max(0, options.customsOrBufferDays || 0);

    const totalBusinessDays = proc + mfg + ship + buffer;
    const workDaysPerWeek = options.workingDaysPerWeek || 5;

    const totalCalendarDays = Math.ceil((totalBusinessDays / workDaysPerWeek) * 7);
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + totalCalendarDays);

    const breakdown = [
      { stage: 'Order Processing & Sourcing', days: proc, percentage: totalBusinessDays > 0 ? Number(((proc / totalBusinessDays) * 100).toFixed(1)) : 0 },
      { stage: 'Manufacturing & Assembly', days: mfg, percentage: totalBusinessDays > 0 ? Number(((mfg / totalBusinessDays) * 100).toFixed(1)) : 0 },
      { stage: 'Shipping & Freight Transit', days: ship, percentage: totalBusinessDays > 0 ? Number(((ship / totalBusinessDays) * 100).toFixed(1)) : 0 },
      { stage: 'Quality Inspection & Buffer', days: buffer, percentage: totalBusinessDays > 0 ? Number(((buffer / totalBusinessDays) * 100).toFixed(1)) : 0 },
    ];

    return {
      totalBusinessDays,
      totalCalendarDaysEstimate: totalCalendarDays,
      estimatedDeliveryDate: delivery,
      criticalPathBreakdown: breakdown,
    };
  }

  // Widget call: (orderDateStr, mfgDays, transitDays, bufferDays)
  const orderDateStr = args[0];
  const mfg = args[1] || 0;
  const transit = args[2] || 0;
  const buffer = args[3] || 0;

  const totalLeadDays = mfg + transit + buffer;
  const d = new Date(`${orderDateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + totalLeadDays);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const pad = (n: number) => n.toString().padStart(2, '0');

  return {
    totalLeadDays,
    estimatedArrival: `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`,
    arrivalDayOfWeek: daysOfWeek[d.getUTCDay()],
    arrivalIso: `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`,
  };
}

export function calculateHotelStay(...args: any[]): any {
  let d1: Date;
  let d2: Date;
  let rate: number;
  let taxPercent: number;

  if (args[0] instanceof Date) {
    d1 = args[0];
    d2 = args[1];
    rate = args[2] !== undefined ? args[2] : 150;
    taxPercent = args[3] !== undefined ? args[3] : 12;
  } else {
    d1 = new Date(`${args[0]}T00:00:00Z`);
    d2 = new Date(`${args[1]}T00:00:00Z`);
    rate = args[2] !== undefined ? args[2] : 175;
    taxPercent = args[3] !== undefined ? args[3] : 14;
  }

  const diffMs = Math.max(0, d2.getTime() - d1.getTime());
  const nights = Math.max(1, Math.round(diffMs / 86400000));
  const hotelDays = nights + 1;

  let weekendNights = 0;
  let weekdayNights = 0;
  const loopDate = new Date(d1.getTime());
  for (let i = 0; i < nights; i++) {
    const day = loopDate.getUTCDay();
    if (day === 5 || day === 6) weekendNights++; // Fri, Sat night
    else weekdayNights++;
    loopDate.setUTCDate(loopDate.getUTCDate() + 1);
  }

  const roomSubtotal = nights * rate;
  const taxesAndFees = roomSubtotal * (taxPercent / 100);
  const totalCost = roomSubtotal + taxesAndFees;

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const checkoutDay = daysOfWeek[d2.getUTCDay()];

  return {
    nights,
    totalNights: nights,
    hotelDays,
    totalDays: hotelDays,
    weekendNights,
    weekdayNights,
    checkoutDay,
    roomSubtotal,
    subtotal: roomSubtotal,
    taxesAndFees,
    totalEstimatedCost: totalCost,
    grandTotal: totalCost,
    totalCost,
  };
}
