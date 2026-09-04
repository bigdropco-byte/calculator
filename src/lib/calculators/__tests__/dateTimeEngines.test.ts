import { describe, it, expect } from 'vitest';
import {
  calculateDateDifference,
  addSubtractDate,
  isLeapYear,
  convertMilitaryTime,
  secondsToTime,
  calculateAverageTime,
  calculateTimecardHours,
  calculateEpochTime,
  calculateDownloadTime,
  calculateAudiobookSpeed,
} from '../dateTimeEngines';

describe('Date & Time Calculation Engines', () => {
  it('calculates exact date difference in years, months, and days', () => {
    const d1 = new Date('2020-01-15');
    const d2 = new Date('2024-03-20');
    const diff = calculateDateDifference(d1, d2);
    expect(diff.years).toBe(4);
    expect(diff.months).toBe(2);
    expect(diff.days).toBe(5);
    expect(diff.totalDays).toBeGreaterThan(1500);
  });

  it('correctly adds and subtracts days, weeks, months, years', () => {
    const base = new Date('2025-01-01');
    const plus30Days = addSubtractDate(base, 30, 'days', 'add');
    expect(plus30Days.getDate()).toBe(31);

    const minus2Weeks = addSubtractDate(base, 2, 'weeks', 'subtract');
    expect(minus2Weeks.getMonth()).toBe(11); // December previous year
  });

  it('determines leap year rules accurately', () => {
    expect(isLeapYear(2024).isLeap).toBe(true);
    expect(isLeapYear(2025).isLeap).toBe(false);
    expect(isLeapYear(2000).isLeap).toBe(true); // 400 year rule
    expect(isLeapYear(1900).isLeap).toBe(false); // century rule
  });

  it('converts military time to 12-hour and vice versa', () => {
    expect(convertMilitaryTime('1730').standard12h).toBe('5:30 PM');
    expect(convertMilitaryTime('0800').standard12h).toBe('8:00 AM');
    expect(convertMilitaryTime('02:45 PM').military).toBe('1445');
    expect(convertMilitaryTime('12:15 AM').military).toBe('0015');
  });

  it('converts seconds to formatted time', () => {
    const res = secondsToTime(3665);
    expect(res.hours).toBe(1);
    expect(res.minutes).toBe(1);
    expect(res.seconds).toBe(5);
    expect(res.formattedHms).toBe('01:01:05');
  });

  it('calculates average lap or race time', () => {
    const avg = calculateAverageTime(['01:30', '02:00', '01:00']);
    expect(avg.averageHms).toBe('00:01:30');
    expect(avg.totalEntries).toBe(3);
  });

  it('calculates timecard payroll hours and overtime', () => {
    const shifts = [
      { inTime: '08:00', outTime: '17:00', unpaidLunchMinutes: 60 }, // 8 hours
      { inTime: '08:00', outTime: '17:00', unpaidLunchMinutes: 60 }, // 8 hours
      { inTime: '08:00', outTime: '17:00', unpaidLunchMinutes: 60 }, // 8 hours
      { inTime: '08:00', outTime: '17:00', unpaidLunchMinutes: 60 }, // 8 hours
      { inTime: '08:00', outTime: '18:00', unpaidLunchMinutes: 60 }, // 9 hours
    ];
    // Total = 41 hours
    const card = calculateTimecardHours(shifts, 20);
    expect(card.totalHoursDecimal).toBe(41);
    expect(card.regularHours).toBe(40);
    expect(card.overtimeHours).toBe(1);
    expect(card.grossPay).toBe(40 * 20 + 1 * 30); // 830
  });

  it('calculates epoch and Discord markdown tags', () => {
    const dt = new Date('2025-01-01T12:00:00Z');
    const epoch = calculateEpochTime(dt);
    expect(epoch.unixSeconds).toBe(1735732800);
    expect(epoch.discordMarkdown.relative).toBe('<t:1735732800:R>');
  });

  it('calculates download time from file size and bandwidth', () => {
    // 50 GB at 100 Mbps
    const dl = calculateDownloadTime(50, 'GB', 100, 'Mbps');
    // 50 * 1024 * 8 = 409600 Mbits / 100 Mbps = 4096 seconds (~1h 8m)
    expect(dl.durationSeconds).toBeGreaterThan(4000);
    expect(dl.speedMbps).toBe(100);
  });

  it('calculates audiobook speed time saved', () => {
    // 600 min audiobook at 1.5x
    const res = calculateAudiobookSpeed(600, 1.5);
    expect(res.newDurationMinutes).toBe(400);
    expect(res.minutesSaved).toBe(200);
    expect(res.percentageFaster).toBe(50);
  });
});
