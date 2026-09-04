import { describe, it, expect } from 'vitest';
import {
  calculateWilks,
  calculateApft,
  calculateAcft,
  calculateBenchPress,
} from '../fitnessAndMilitaryEngines';

describe('Fitness and Military Engines', () => {
  it('calculates Wilks coefficient and score', () => {
    const maleRes = calculateWilks({
      bodyWeight: 80,
      totalLifted: 500,
      weightUnit: 'kg',
      gender: 'male',
    });
    expect(maleRes.wilksScore).toBeGreaterThan(300);
    expect(maleRes.strengthLevel).toBeDefined();

    const femRes = calculateWilks({
      bodyWeight: 60,
      totalLifted: 350,
      weightUnit: 'kg',
      gender: 'female',
    });
    expect(femRes.wilksScore).toBeGreaterThan(300);
  });

  it('calculates APFT score and pass/fail', () => {
    const res = calculateApft({
      gender: 'male',
      ageBracket: '22-26',
      pushups: 60,
      situps: 65,
      twoMileRunMinutes: 14,
      twoMileRunSeconds: 30,
    });
    expect(res.pushupScore).toBeGreaterThanOrEqual(60);
    expect(res.situpScore).toBeGreaterThanOrEqual(60);
    expect(res.runScore).toBeGreaterThanOrEqual(60);
    expect(res.passed).toBe(true);
    expect(res.totalScore).toBeGreaterThan(200);
  });

  it('calculates ACFT 6-event score', () => {
    const res = calculateAcft({
      gender: 'male',
      ageBracket: '17-21',
      mdlLbs: 250,
      sptMeters: 10.5,
      hrpReps: 35,
      sdcMinutes: 1,
      sdcSeconds: 50,
      plkMinutes: 2,
      plkSeconds: 30,
      twoMileMinutes: 16,
      twoMileSeconds: 0,
    });
    expect(res.totalScore).toBeGreaterThan(400);
    expect(res.passed).toBe(true);
  });

  it('calculates bench press 1RM across multiple models', () => {
    const res = calculateBenchPress({
      weightLifted: 225,
      repetitions: 5,
      bodyWeight: 180,
      unit: 'lbs',
    });
    expect(res.oneRepMax).toBeGreaterThan(250);
    expect(res.epley1RM).toBeCloseTo(262.5, 1);
    expect(res.brzycki1RM).toBeCloseTo(253.1, 1);
    expect(res.percentageTable.length).toBe(11);
    expect(res.classification).toBeDefined();
  });
});
