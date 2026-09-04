export interface DateDifferenceResult {
  totalDays: number;
  totalWeeks: number;
  remainingDays: number;
  businessDays: number;
  weekendDays: number;
  years: number;
  months: number;
  days: number;
  isNegative: boolean;
  summaryText: string;
}

export function calculateDateDifference(
  startDateInput: string | Date,
  endDateInput: string | Date,
  includeEndDate: boolean = false
): DateDifferenceResult {
  const start = typeof startDateInput === 'string' ? new Date(startDateInput) : new Date(startDateInput);
  const end = typeof endDateInput === 'string' ? new Date(endDateInput) : new Date(endDateInput);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return {
      totalDays: 0,
      totalWeeks: 0,
      remainingDays: 0,
      businessDays: 0,
      weekendDays: 0,
      years: 0,
      months: 0,
      days: 0,
      isNegative: false,
      summaryText: 'Please select valid start and end dates',
    };
  }

  // Normalize to midnight UTC to prevent DST issues
  const utc1 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  let utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

  const isNegative = utc2 < utc1;
  const earlier = isNegative ? new Date(utc2) : new Date(utc1);
  const later = isNegative ? new Date(utc1) : new Date(utc2);

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  let totalDays = Math.floor((later.getTime() - earlier.getTime()) / MS_PER_DAY);
  if (includeEndDate) {
    totalDays += 1;
  }

  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  // Calculate business days & weekends
  let businessDays = 0;
  let weekendDays = 0;

  const cur = new Date(earlier);
  const limit = includeEndDate ? totalDays : totalDays;
  for (let i = 0; i < limit; i++) {
    const dayOfWeek = cur.getUTCDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendDays++;
    } else {
      businessDays++;
    }
    cur.setUTCDate(cur.getUTCDate() + 1);
  }

  // Calculate breakdown (years, months, days)
  let y = later.getUTCFullYear() - earlier.getUTCFullYear();
  let m = later.getUTCMonth() - earlier.getUTCMonth();
  let d = later.getUTCDate() - earlier.getUTCDate();

  if (includeEndDate) {
    d += 1;
  }

  if (d < 0) {
    m -= 1;
    const prevMonthDays = new Date(Date.UTC(later.getUTCFullYear(), later.getUTCMonth(), 0)).getUTCDate();
    d += prevMonthDays;
  }
  if (m < 0) {
    y -= 1;
    m += 12;
  }

  const parts: string[] = [];
  if (y > 0) parts.push(`${y} year${y !== 1 ? 's' : ''}`);
  if (m > 0) parts.push(`${m} month${m !== 1 ? 's' : ''}`);
  if (d > 0 || parts.length === 0) parts.push(`${d} day${d !== 1 ? 's' : ''}`);

  return {
    totalDays,
    totalWeeks,
    remainingDays,
    businessDays,
    weekendDays,
    years: y,
    months: m,
    days: d,
    isNegative,
    summaryText: parts.join(', '),
  };
}
