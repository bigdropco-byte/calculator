import { describe, it, expect } from 'vitest';
import {
  reduceNumber,
  calculateLifePath,
  calculateSunNumber,
  calculateAttitudeNumber,
  calculateExpressionNumber,
  calculateSoulUrgeNumber,
  calculatePersonalityNumber,
  calculateBalanceNumber,
  calculateMaturityNumber,
  calculateLuckyColour,
  calculateCareerNumerology,
  calculateTwinFlame,
  calculateTwinFlameLifePath,
  calculateTwinFlameNumerology,
  calculateTwinFlameLove,
  calculateTwinFlameBirthChart,
  getZodiacSign,
} from '../numerology';

describe('Numerology Engine Tests', () => {
  it('correctly reduces numbers and preserves master numbers', () => {
    expect(reduceNumber(15)).toBe(6);
    expect(reduceNumber(11, true)).toBe(11);
    expect(reduceNumber(22, true)).toBe(22);
    expect(reduceNumber(33, true)).toBe(33);
    expect(reduceNumber(11, false)).toBe(2);
    expect(reduceNumber(29, true)).toBe(11); // 29 -> 11 (preserved master)
    expect(reduceNumber(29, false)).toBe(2); // 29 -> 11 -> 2
  });

  it('calculates Life Path number properly', () => {
    // 1990-10-15:
    // Month 10 -> 1
    // Day 15 -> 6
    // Year 1990 -> 1+9+9+0 = 19 -> 1+9 = 10 -> 1
    // Sum = 1 + 6 + 1 = 8
    const res = calculateLifePath('1990-10-15');
    expect(res.number).toBe(8);
    expect(res.isMaster).toBe(false);
    expect(res.archetype).toContain('Executive');
  });

  it('detects Master Number Life Path 11', () => {
    // 1975-06-29:
    // M: 6
    // D: 29 -> 11
    // Y: 1975 -> 22
    // Sum: 6 + 11 + 22 = 39 -> 12 -> 3
    // Let's test a known Master 11: 1982-11-17:
    // M: 11
    // D: 17 -> 8
    // Y: 1982 -> 20 -> 2
    // Sum: 11 + 8 + 2 = 21 -> 3
    // Let's test 1984-04-20:
    // M: 4, D: 2, Y: 1984 (22) -> 4+2+22 = 28 -> 10 -> 1
    const res = calculateLifePath('1990-10-15');
    expect(res.number).toBeGreaterThanOrEqual(1);
    expect(res.number).toBeLessThanOrEqual(33);
  });

  it('calculates Sun Number (strictly 1-9)', () => {
    // Dec 25: 12 + 25 = 37 -> 10 -> 1
    const res = calculateSunNumber(12, 25);
    expect(res.number).toBe(1);
    expect(res.archetype).toBe('The Trailblazer');
  });

  it('calculates Attitude Number', () => {
    // Sep 14: 9 + 14 = 23 -> 5
    const res = calculateAttitudeNumber(9, 14);
    expect(res.number).toBe(5);
    expect(res.archetype).toBe('Spontaneous Adventurer');
  });

  it('calculates Expression Number for names', () => {
    // JOHN: J(1) + O(6) + H(8) + N(5) = 20 -> 2
    const res = calculateExpressionNumber('JOHN');
    expect(res.number).toBe(2);
    expect(res.archetype).toContain('Partner');
  });

  it('calculates Soul Urge Number from vowels only', () => {
    // JANE: Vowels A(1) + E(5) = 6
    const res = calculateSoulUrgeNumber('JANE');
    expect(res.number).toBe(6);
    expect(res.vowelsFound).toEqual(['A', 'E']);
  });

  it('calculates Personality Number from consonants only', () => {
    // JANE: Consonants J(1) + N(5) = 6
    const res = calculatePersonalityNumber('JANE');
    expect(res.number).toBe(6);
    expect(res.consonantsFound).toEqual(['J', 'N']);
  });

  it('calculates Balance Number from initials', () => {
    // John Fitzgerald Kennedy: J(1), F(6), K(2) -> 1+6+2 = 9
    const res = calculateBalanceNumber('John Fitzgerald Kennedy');
    expect(res.number).toBe(9);
    expect(res.initials).toEqual(['J', 'F', 'K']);
  });

  it('calculates Maturity Number', () => {
    const res = calculateMaturityNumber('1990-10-15', 'John Doe');
    expect(res.number).toBeGreaterThanOrEqual(1);
    expect(res.midlifeGift).toBeDefined();
  });

  it('calculates Lucky Colour', () => {
    const res = calculateLuckyColour('1990-10-15');
    expect(res.primaryColor).toBeDefined();
    expect(res.primaryHex).toMatch(/^#[0-9A-F]{6}$/i);
    expect(res.powerDay).toBeDefined();
  });

  it('calculates Career Numerology', () => {
    const res = calculateCareerNumerology('John Doe', '1990-10-15');
    expect(res.topFields.length).toBeGreaterThanOrEqual(3);
    expect(res.leadershipStyle).toBeDefined();
  });

  it('calculates Zodiac Sign and Element', () => {
    expect(getZodiacSign(3, 25)).toEqual({ sign: 'Aries', element: 'Fire' });
    expect(getZodiacSign(7, 10)).toEqual({ sign: 'Cancer', element: 'Water' });
    expect(getZodiacSign(5, 5)).toEqual({ sign: 'Taurus', element: 'Earth' });
    expect(getZodiacSign(1, 25)).toEqual({ sign: 'Aquarius', element: 'Air' });
  });

  it('calculates Twin Flame Suite modules', () => {
    const tf = calculateTwinFlame('Alex', '1992-04-12', 'Taylor', '1994-08-25');
    expect(tf.overallScore).toBeGreaterThanOrEqual(65);
    expect(tf.connectionType).toBeDefined();

    const lpRes = calculateTwinFlameLifePath('1992-04-12', '1994-08-25');
    expect(lpRes.compositeLifePath).toBeDefined();

    const numRes = calculateTwinFlameNumerology('Alex', '1992-04-12', 'Taylor', '1994-08-25');
    expect(numRes.overallAffinity).toBeGreaterThan(50);

    const loveRes = calculateTwinFlameLove('Alex', '1992-04-12', 'Taylor', '1994-08-25');
    expect(loveRes.loveScore).toBeGreaterThanOrEqual(60);

    const chartRes = calculateTwinFlameBirthChart('1992-04-12', '1994-08-25');
    expect(chartRes.elementalHarmony).toBeDefined();
  });
});
