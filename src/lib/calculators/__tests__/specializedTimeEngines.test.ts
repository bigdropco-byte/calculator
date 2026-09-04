import { describe, it, expect } from 'vitest';
import {
  calculateSleepCycles,
  convertSwimTime,
  calculateWordsToMinutes,
  calculateLeadTime,
  calculateHotelStay,
} from '../specializedTimeEngines';

describe('Specialized Time Engines', () => {
  it('calculates 90-minute REM sleep cycles and bedtime recommendations', () => {
    const sleep = calculateSleepCycles('07:00', 'wake_at');
    expect(sleep.suggestedTimes.length).toBe(4);
    // 5 cycles = 7.5 hours + 14 min buffer = 7h 44m before 7:00 AM -> 11:16 PM
    const opt5 = sleep.suggestedTimes.find((s: any) => s.cycles === 5);
    expect(opt5).toBeDefined();
    expect(opt5?.recommendationNote).toContain('Optimal');
  });

  it('converts competitive swimming course times', () => {
    // 100 Free in SCY 50.00 seconds converted to LCM
    const res = convertSwimTime(50.0, 'SCY', 'LCM', 'freestyle', 100);
    expect(res.convertedSeconds).toBeGreaterThan(50.0);
    expect(res.formattedConverted).toBeDefined();
  });

  it('calculates words to speech presentation minutes', () => {
    // 1300 words at standard 130 WPM = exactly 10 minutes
    const res = calculateWordsToMinutes(1300, 130);
    expect(res.minutesDecimal).toBe(10);
    expect(res.formattedTime).toBe('10 min 0 sec');
  });

  it('calculates supply chain lead time in business and calendar days', () => {
    const lead = calculateLeadTime({
      orderProcessingDays: 3,
      manufacturingProductionDays: 10,
      shippingTransitDays: 5,
      customsOrBufferDays: 2,
    });
    // 3 + 10 + 5 + 2 = 20 business days
    expect(lead.totalBusinessDays).toBe(20);
    expect(lead.totalCalendarDaysEstimate).toBe(28); // 20 / 5 * 7 = 28 days
    expect(lead.criticalPathBreakdown.length).toBe(4);
  });

  it('calculates hotel check-in/out days, nights, and taxes', () => {
    const checkIn = new Date('2025-06-05'); // Thursday
    const checkOut = new Date('2025-06-08'); // Sunday (3 nights: Thu, Fri, Sat)
    const stay = calculateHotelStay(checkIn, checkOut, 200, 15);
    expect(stay.totalNights).toBe(3);
    expect(stay.totalDays).toBe(4);
    expect(stay.weekendNights).toBe(2); // Fri, Sat
    expect(stay.weekdayNights).toBe(1); // Thu
    expect(stay.subtotal).toBe(600);
    expect(stay.grandTotal).toBe(690); // 600 + 15%
  });
});
