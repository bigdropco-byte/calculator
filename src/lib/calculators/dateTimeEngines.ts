/**
 * Pure Calculation Engine: Date & Time Utilities, Payroll Hours & Tech Timestamps
 * Covers date arithmetic, durations, military time, seconds to time, leap year,
 * timecard hours, epoch/Unix conversion, and Discord timestamps.
 */

export interface DateDiffResult {
  years: number;
  months: number;
  weeks: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  businessDays: number;
  weekendDays: number;
  summaryText: string;
}

export function calculateDateDifference(
  startDateInput: Date | string,
  endDateInput: Date | string,
  includeEnd: boolean = false
): DateDiffResult {
  const sDate = typeof startDateInput === 'string' ? new Date(`${startDateInput}T00:00:00Z`) : startDateInput;
  const eDate = typeof endDateInput === 'string' ? new Date(`${endDateInput}T00:00:00Z`) : endDateInput;

  const t1 = Math.min(sDate.getTime(), eDate.getTime());
  const t2 = Math.max(sDate.getTime(), eDate.getTime());

  const diffMs = t2 - t1;
  let totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (includeEnd) totalDays += 1;

  const totalHours = totalDays * 24;
  const totalMinutes = totalDays * 1440;
  const totalSeconds = totalDays * 86400;

  const d1 = new Date(t1);
  const d2 = new Date(t2);
  let years = d2.getUTCFullYear() - d1.getUTCFullYear();
  let months = d2.getUTCMonth() - d1.getUTCMonth();
  let days = d2.getUTCDate() - d1.getUTCDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(Date.UTC(d2.getUTCFullYear(), d2.getUTCMonth(), 0));
    days += prevMonth.getUTCDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  if (includeEnd) days += 1;

  const weeks = Math.floor(totalDays / 7);

  // Business days vs weekend days
  let businessDays = 0;
  let weekendDays = 0;
  const curr = new Date(t1);
  const loopEnd = includeEnd ? t2 : t2 - 86400000;
  while (curr.getTime() <= loopEnd) {
    const day = curr.getUTCDay();
    if (day === 0 || day === 6) weekendDays++;
    else businessDays++;
    curr.setUTCDate(curr.getUTCDate() + 1);
  }

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);
  if (days > 0 || parts.length === 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
  const summaryText = parts.join(', ');

  return {
    years,
    months,
    weeks,
    days,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    businessDays,
    weekendDays,
    summaryText,
  };
}

export function addSubtractDate(
  startDate: Date,
  amount: number,
  unit: 'days' | 'weeks' | 'months' | 'years' | 'hours',
  operation: 'add' | 'subtract' = 'add'
): Date {
  const result = new Date(startDate.getTime());
  const factor = operation === 'add' ? 1 : -1;
  const delta = amount * factor;

  if (unit === 'days') {
    result.setDate(result.getDate() + delta);
  } else if (unit === 'weeks') {
    result.setDate(result.getDate() + delta * 7);
  } else if (unit === 'months') {
    result.setMonth(result.getMonth() + delta);
  } else if (unit === 'years') {
    result.setFullYear(result.getFullYear() + delta);
  } else if (unit === 'hours') {
    result.setHours(result.getHours() + delta);
  }

  return result;
}

export function calculateDateAddSubtract(
  startDateStr: string,
  years: number,
  months: number,
  weeks: number,
  days: number,
  operation: 'add' | 'subtract' = 'add'
): {
  formattedDate: string;
  dayOfWeek: string;
  targetDate: string;
} {
  const d = new Date(`${startDateStr}T00:00:00Z`);
  const sign = operation === 'add' ? 1 : -1;

  if (years) d.setUTCFullYear(d.getUTCFullYear() + years * sign);
  if (months) d.setUTCMonth(d.getUTCMonth() + months * sign);
  if (weeks) d.setUTCDate(d.getUTCDate() + weeks * 7 * sign);
  if (days) d.setUTCDate(d.getUTCDate() + days * sign);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const pad = (n: number) => n.toString().padStart(2, '0');
  const targetDate = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
  const dayOfWeek = daysOfWeek[d.getUTCDay()];
  const formattedDate = `${monthsList[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;

  return {
    formattedDate,
    dayOfWeek,
    targetDate,
  };
}

export function isLeapYear(year: number): {
  isLeap: boolean;
  totalDays: number;
  februaryDays: number;
  reason: string;
  nextLeapYear?: number;
  previousLeapYear?: number;
} {
  const y = Math.round(year);
  const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

  let reason = '';
  if (isLeap) {
    if (y % 400 === 0) {
      reason = `${y} is a leap year because it is divisible by 400.`;
    } else {
      reason = `${y} is a leap year because it is divisible by 4 and not divisible by 100.`;
    }
  } else {
    if (y % 100 === 0 && y % 400 !== 0) {
      reason = `${y} is NOT a leap year because century years must be divisible by 400.`;
    } else {
      reason = `${y} is NOT a leap year because it is not evenly divisible by 4.`;
    }
  }

  let next = y + 1;
  while (!((next % 4 === 0 && next % 100 !== 0) || next % 400 === 0)) next++;

  let prev = y - 1;
  while (!((prev % 4 === 0 && prev % 100 !== 0) || prev % 400 === 0)) prev--;

  return {
    isLeap,
    totalDays: isLeap ? 366 : 365,
    februaryDays: isLeap ? 29 : 28,
    reason,
    nextLeapYear: next,
    previousLeapYear: prev,
  };
}

export function checkLeapYear(year: number) {
  const res = isLeapYear(year);
  return {
    isLeapYear: res.isLeap,
    isLeap: res.isLeap,
    totalDays: res.totalDays,
    februaryDays: res.februaryDays,
    reason: res.reason,
    nextLeapYear: res.nextLeapYear,
    previousLeapYear: res.previousLeapYear,
  };
}

export function convertMilitaryTime(input: string): {
  military: string;
  standard12h: string;
  standard12: string;
  coloned: string;
  phoneticPronunciation: string;
  pronunciation: string;
} {
  const clean = input.trim().toLowerCase();
  let hours = 0;
  let minutes = 0;

  if (clean.includes('am') || clean.includes('pm')) {
    const isPm = clean.includes('pm');
    const timePart = clean.replace(/[ap]m/, '').trim();
    const [hStr, mStr] = timePart.split(':');
    hours = parseInt(hStr, 10) || 0;
    minutes = parseInt(mStr, 10) || 0;
    if (isPm && hours < 12) hours += 12;
    if (!isPm && hours === 12) hours = 0;
  } else if (clean.includes(':')) {
    const [hStr, mStr] = clean.split(':');
    hours = parseInt(hStr, 10) || 0;
    minutes = parseInt(mStr, 10) || 0;
  } else {
    const digits = clean.replace(/\D/g, '').padStart(4, '0').slice(-4);
    hours = parseInt(digits.slice(0, 2), 10) || 0;
    minutes = parseInt(digits.slice(2), 10) || 0;
  }

  hours = Math.max(0, Math.min(23, hours));
  minutes = Math.max(0, Math.min(59, minutes));

  const milHours = hours.toString().padStart(2, '0');
  const milMinutes = minutes.toString().padStart(2, '0');
  const military = `${milHours}${milMinutes}`;
  const coloned = `${milHours}:${milMinutes}`;

  const period = hours >= 12 ? 'PM' : 'AM';
  const stdHours = hours % 12 === 0 ? 12 : hours % 12;
  const standard12h = `${stdHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  const phonetic = `${milHours} hundred ${minutes > 0 ? `${milMinutes} hours` : 'hours'}`;

  return {
    military,
    standard12h,
    standard12: standard12h,
    coloned,
    phoneticPronunciation: phonetic,
    pronunciation: phonetic,
  };
}

export function secondsToTime(totalSeconds: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formattedHms: string;
  totalHoursDecimal: number;
  decimalHours: number;
  totalMinutes: number;
  totalSeconds: number;
} {
  const s = Math.max(0, Math.round(totalSeconds));
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  const hStr = hours.toString().padStart(2, '0');
  const mStr = minutes.toString().padStart(2, '0');
  const sStr = seconds.toString().padStart(2, '0');

  const formattedHms = days > 0 ? `${days}d ${hStr}:${mStr}:${sStr}` : `${hStr}:${mStr}:${sStr}`;
  const totalHoursDecimal = Number((s / 3600).toFixed(4));
  const totalMinutes = Number((s / 60).toFixed(2));

  return {
    days,
    hours: Math.floor(s / 3600),
    minutes,
    seconds,
    formattedHms,
    totalHoursDecimal,
    decimalHours: totalHoursDecimal,
    totalMinutes,
    totalSeconds: s,
  };
}

export function calculateAverageTime(timeStrings: string[]): {
  averageHms: string;
  averageSeconds: number;
  totalEntries: number;
  fastestHms: string;
  slowestHms: string;
  totalHms: string;
} {
  const secondsList = timeStrings
    .map(t => {
      const parts = t.trim().split(':').map(Number);
      if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
      if (parts.length === 2) return parts[0] * 60 + parts[1];
      return 0;
    })
    .filter(s => s > 0);

  if (secondsList.length === 0) {
    return {
      averageHms: '00:00:00',
      averageSeconds: 0,
      totalEntries: 0,
      fastestHms: '00:00:00',
      slowestHms: '00:00:00',
      totalHms: '00:00:00',
    };
  }

  const sum = secondsList.reduce((acc, cur) => acc + cur, 0);
  const avg = Math.round(sum / secondsList.length);
  const min = Math.min(...secondsList);
  const max = Math.max(...secondsList);

  return {
    averageHms: secondsToTime(avg).formattedHms,
    averageSeconds: avg,
    totalEntries: secondsList.length,
    fastestHms: secondsToTime(min).formattedHms,
    slowestHms: secondsToTime(max).formattedHms,
    totalHms: secondsToTime(sum).formattedHms,
  };
}

export function calculateTimecardHours(
  shifts: { inTime: string; outTime: string; unpaidLunchMinutes?: number }[],
  hourlyRate: number = 0
): {
  totalHoursDecimal: number;
  totalHoursFormatted: string;
  regularHours: number;
  overtimeHours: number;
  grossPay: number;
  totalMinutes: number;
  shiftBreakdowns: { hours: number; minutes: number }[];
} {
  let totalMin = 0;
  const breakdowns: { hours: number; minutes: number }[] = [];

  for (const s of shifts) {
    if (!s.inTime || !s.outTime) {
      breakdowns.push({ hours: 0, minutes: 0 });
      continue;
    }
    const [inH, inM] = s.inTime.split(':').map(Number);
    const [outH, outM] = s.outTime.split(':').map(Number);

    let start = inH * 60 + inM;
    let end = outH * 60 + outM;
    if (end < start) end += 24 * 60; // overnight shift

    const workedMin = Math.max(0, end - start - (s.unpaidLunchMinutes || 0));
    totalMin += workedMin;
    breakdowns.push({ hours: Number((workedMin / 60).toFixed(2)), minutes: workedMin });
  }

  const totalHoursDecimal = Number((totalMin / 60).toFixed(2));
  const regularHours = Math.min(40, totalHoursDecimal);
  const overtimeHours = Math.max(0, Number((totalHoursDecimal - 40).toFixed(2)));

  const regularPay = regularHours * hourlyRate;
  const overtimePay = overtimeHours * (hourlyRate * 1.5);
  const grossPay = Math.round((regularPay + overtimePay) * 100) / 100;

  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  const totalHoursFormatted = `${h}h ${m}m`;

  return {
    totalHoursDecimal,
    totalHoursFormatted,
    regularHours,
    overtimeHours,
    grossPay,
    totalMinutes: totalMin,
    shiftBreakdowns: breakdowns,
  };
}

export function calculateEpochTime(input: Date | number): {
  unixSeconds: number;
  unixMilliseconds: number;
  utcString: string;
  localString: string;
  localIso: string;
  isoString: string;
  relativeText: string;
  discordMarkdown: {
    relative: string;
    shortTime: string;
    longTime: string;
    shortDate: string;
    longDate: string;
    fullDateTime: string;
  };
} {
  let date: Date;
  if (typeof input === 'number') {
    // If < 100 billion, it's seconds; else milliseconds
    date = input < 100000000000 ? new Date(input * 1000) : new Date(input);
  } else {
    date = input;
  }

  const unixSeconds = Math.floor(date.getTime() / 1000);
  const unixMilliseconds = date.getTime();
  const diffSec = unixSeconds - Math.floor(Date.now() / 1000);

  let relativeText = '';
  if (Math.abs(diffSec) < 60) {
    relativeText = diffSec >= 0 ? 'in seconds' : 'seconds ago';
  } else if (Math.abs(diffSec) < 3600) {
    const mins = Math.round(Math.abs(diffSec) / 60);
    relativeText = diffSec >= 0 ? `in ${mins} minutes` : `${mins} minutes ago`;
  } else if (Math.abs(diffSec) < 86400) {
    const hrs = Math.round(Math.abs(diffSec) / 3600);
    relativeText = diffSec >= 0 ? `in ${hrs} hours` : `${hrs} hours ago`;
  } else {
    const days = Math.round(Math.abs(diffSec) / 86400);
    relativeText = diffSec >= 0 ? `in ${days} days` : `${days} days ago`;
  }

  return {
    unixSeconds,
    unixMilliseconds,
    utcString: date.toUTCString(),
    localString: date.toLocaleString(),
    localIso: date.toISOString(),
    isoString: date.toISOString(),
    relativeText,
    discordMarkdown: {
      relative: `<t:${unixSeconds}:R>`,
      shortTime: `<t:${unixSeconds}:t>`,
      longTime: `<t:${unixSeconds}:T>`,
      shortDate: `<t:${unixSeconds}:d>`,
      longDate: `<t:${unixSeconds}:D>`,
      fullDateTime: `<t:${unixSeconds}:F>`,
    },
  };
}

export function calculateDiscordTimestamps(timestamp: number): {
  code: string;
  label: string;
  markdown: string;
  preview: string;
}[] {
  const d = new Date(timestamp * 1000);
  return [
    { code: 'R', label: 'Relative Time', markdown: `<t:${timestamp}:R>`, preview: 'e.g. in 2 hours / 5 minutes ago' },
    { code: 'f', label: 'Short Date/Time', markdown: `<t:${timestamp}:f>`, preview: d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { code: 'F', label: 'Long Date/Time', markdown: `<t:${timestamp}:F>`, preview: d.toLocaleString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) },
    { code: 'd', label: 'Short Date', markdown: `<t:${timestamp}:d>`, preview: d.toLocaleDateString() },
    { code: 'D', label: 'Long Date', markdown: `<t:${timestamp}:D>`, preview: d.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' }) },
    { code: 't', label: 'Short Time', markdown: `<t:${timestamp}:t>`, preview: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { code: 'T', label: 'Long Time', markdown: `<t:${timestamp}:T>`, preview: d.toLocaleTimeString() },
  ];
}

export function calculateDownloadTime(
  fileSizeValue: number,
  fileSizeUnit: 'MB' | 'GB' | 'TB',
  speedValue: number,
  speedUnit: 'Kbps' | 'Mbps' | 'Gbps' | 'KBps' | 'MBps'
): {
  durationSeconds: number;
  durationFormatted: string;
  formattedDuration: string;
  totalMegaBytes: number;
  fileSizeMB: number;
  speedMbps: number;
  transferRateMBs: number;
} {
  const sizeMultiplier = fileSizeUnit === 'TB' ? 1048576 : fileSizeUnit === 'GB' ? 1024 : 1;
  const totalMB = fileSizeValue * sizeMultiplier;
  const totalBits = totalMB * 8 * 1048576; // in bits

  let bitsPerSecond = speedValue * 1000000;
  if (speedUnit === 'Gbps') bitsPerSecond = speedValue * 1000000000;
  else if (speedUnit === 'Kbps') bitsPerSecond = speedValue * 1000;
  else if (speedUnit === 'KBps') bitsPerSecond = speedValue * 8 * 1000;
  else if (speedUnit === 'MBps') bitsPerSecond = speedValue * 8 * 1000000;

  const durationSeconds = bitsPerSecond > 0 ? Math.ceil((totalBits / bitsPerSecond) * 1.05) : 0;
  const formatted = secondsToTime(durationSeconds).formattedHms;
  const transferRateMBs = (bitsPerSecond / (8 * 1048576)) / 1.05;

  return {
    durationSeconds,
    durationFormatted: formatted,
    formattedDuration: formatted,
    totalMegaBytes: totalMB,
    fileSizeMB: totalMB,
    speedMbps: bitsPerSecond / 1000000,
    transferRateMBs,
  };
}

export function calculateAudiobookSpeed(
  hoursOrTotalMin: number,
  minutesOrSpeed?: number,
  multiplier?: number
): {
  newDurationMinutes: number;
  minutesSaved: number;
  formattedNewTime: string;
  newDurationFormatted: string;
  timeSavedFormatted: string;
  percentageFaster: number;
  percentSaved: number;
} {
  let totalMin = 0;
  let speed = 1.0;

  if (multiplier !== undefined) {
    // Called with (hours, minutes, speedMultiplier)
    totalMin = hoursOrTotalMin * 60 + (minutesOrSpeed || 0);
    speed = Math.max(0.5, multiplier);
  } else {
    // Called with (totalDurationMinutes, playbackSpeed)
    totalMin = hoursOrTotalMin;
    speed = Math.max(0.5, minutesOrSpeed || 1.0);
  }

  const newMinutes = totalMin / speed;
  const minutesSaved = Math.max(0, totalMin - newMinutes);
  const formattedNew = secondsToTime(newMinutes * 60).formattedHms;
  const formattedSaved = secondsToTime(minutesSaved * 60).formattedHms;
  const percentSaved = (1 - 1 / speed) * 100;

  return {
    newDurationMinutes: Math.round(newMinutes),
    minutesSaved: Math.round(minutesSaved),
    formattedNewTime: formattedNew,
    newDurationFormatted: formattedNew,
    timeSavedFormatted: formattedSaved,
    percentageFaster: Math.round((speed - 1) * 100),
    percentSaved,
  };
}
