import { describe, it, expect } from 'vitest';
import {
  calculateBirthdayMilestones,
  calculateMoonPhase,
  toRomanNumeral,
  dateToRomanNumerals,
  calculateAnniversaryGifts,
  convertHebrewBirthday,
} from '../birthdayEngines';

describe('Birthday Milestones & Esoteric Calendar Engines', () => {
  it('calculates birthday milestones, golden birthday, and generation', () => {
    const bday = new Date('1990-05-18');
    const res = calculateBirthdayMilestones(bday);
    expect(res.dayOfWeekBorn).toBe('Friday');
    expect(res.goldenBirthdayAge).toBe(18); // born on the 18th
    expect(res.goldenBirthdayYear).toBe(2008);
    expect(res.isGoldenBirthdayPassed).toBe(true);
    expect(res.generation).toContain('Millennial');
    expect(res.chineseZodiac).toBe('Horse');
  });

  it('calculates lunar moon phase at birth', () => {
    const date = new Date('2024-08-19'); // Super Full Moon date
    const moon = calculateMoonPhase(date);
    expect(moon.phaseName).toBeDefined();
    expect(moon.illuminationPercentage).toBeGreaterThanOrEqual(0);
    expect(moon.phaseEmoji).toBeDefined();
  });

  it('converts integers and dates to Roman numerals', () => {
    expect(toRomanNumeral(2026)).toBe('MMXXVI');
    expect(toRomanNumeral(4)).toBe('IV');
    expect(toRomanNumeral(9)).toBe('IX');

    const romanDate = dateToRomanNumerals(new Date('2026-09-04'));
    expect(romanDate.formattedDot).toBe('IX · IV · MMXXVI');
  });

  it('matches traditional and modern anniversary gifts', () => {
    const yr1 = calculateAnniversaryGifts(1);
    expect(yr1.traditionalGift).toBe('Paper');
    expect(yr1.modernGift).toBe('Clocks');

    const yr25 = calculateAnniversaryGifts(25);
    expect(yr25.milestoneTitle).toContain('Silver');

    const yr50 = calculateAnniversaryGifts(50);
    expect(yr50.traditionalGift).toBe('Gold');
  });

  it('converts Gregorian birth date to Hebrew lunisolar calendar', () => {
    const heb = convertHebrewBirthday(new Date('2024-04-15'));
    expect(heb.hebrewYear).toBeGreaterThan(5780);
    expect(heb.hebrewMonthName).toBeDefined();
    expect(heb.hebrewFormatted).toBeDefined();
  });
});
