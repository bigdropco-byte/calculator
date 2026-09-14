import { describe, it, expect } from 'vitest';
import {
  convertOvenToAirFryer,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  AIR_FRYER_PRESETS,
  QUICK_CONVERSION_CHART,
} from '../airFryer';

describe('Air Fryer Calculator Engine', () => {
  describe('Temperature conversion helpers', () => {
    it('converts Fahrenheit to Celsius accurately', () => {
      expect(fahrenheitToCelsius(32)).toBe(0);
      expect(fahrenheitToCelsius(212)).toBe(100);
      expect(fahrenheitToCelsius(400)).toBe(204);
      expect(fahrenheitToCelsius(375)).toBe(191);
    });

    it('converts Celsius to Fahrenheit accurately', () => {
      expect(celsiusToFahrenheit(0)).toBe(32);
      expect(celsiusToFahrenheit(100)).toBe(212);
      expect(celsiusToFahrenheit(200)).toBe(392);
    });
  });

  describe('Oven to Air Fryer 20/20 & 25/25 conversion math', () => {
    it('converts Fahrenheit oven settings according to the 25°F / 20% rule', () => {
      // 400°F oven, 40 minutes
      const res = convertOvenToAirFryer({
        ovenTemp: 400,
        ovenTimeMinutes: 40,
        unit: 'F',
        crispiness: 'normal',
        isFrozen: false,
      });

      expect(res.unit).toBe('F');
      expect(res.airFryerTemp).toBe(375); // 400 - 25 = 375
      expect(res.targetTimeMinutes).toBe(32); // 40 * 0.80 = 32
      expect(res.minTimeMinutes).toBe(30); // 40 * 0.75 = 30
      expect(res.maxTimeMinutes).toBe(34); // 40 * 0.85 = 34
      expect(res.timeSavedMinutes).toBe(8); // 40 - 32 = 8
      expect(res.percentTimeSaved).toBe(20);
      expect(res.shakeCheckpointMinutes).toBe(16); // 32 / 2 = 16
    });

    it('converts Celsius oven settings according to the 15°C / 20% rule', () => {
      // 200°C oven, 30 minutes
      const res = convertOvenToAirFryer({
        ovenTemp: 200,
        ovenTimeMinutes: 30,
        unit: 'C',
        crispiness: 'normal',
        isFrozen: false,
      });

      expect(res.unit).toBe('C');
      expect(res.airFryerTemp).toBe(185); // 200 - 15 = 185
      expect(res.targetTimeMinutes).toBe(24); // 30 * 0.80 = 24
      expect(res.minTimeMinutes).toBe(23); // 30 * 0.75 = 22.5 -> 23
      expect(res.maxTimeMinutes).toBe(26); // 30 * 0.85 = 25.5 -> 26
      expect(res.timeSavedMinutes).toBe(6);
      expect(res.shakeCheckpointMinutes).toBe(12); // 24 / 2 = 12
    });

    it('handles crispiness preferences', () => {
      const normal = convertOvenToAirFryer({ ovenTemp: 400, ovenTimeMinutes: 30, crispiness: 'normal' });
      const crispy = convertOvenToAirFryer({ ovenTemp: 400, ovenTimeMinutes: 30, crispiness: 'crispy' });
      const tender = convertOvenToAirFryer({ ovenTemp: 400, ovenTimeMinutes: 30, crispiness: 'tender' });

      expect(crispy.targetTimeMinutes).toBeGreaterThan(normal.targetTimeMinutes);
      expect(tender.targetTimeMinutes).toBeLessThan(normal.targetTimeMinutes);
    });

    it('adjusts cooking time when cooking from frozen', () => {
      const thawed = convertOvenToAirFryer({ ovenTemp: 400, ovenTimeMinutes: 20, isFrozen: false });
      const frozen = convertOvenToAirFryer({ ovenTemp: 400, ovenTimeMinutes: 20, isFrozen: true });

      expect(frozen.targetTimeMinutes).toBeGreaterThan(thawed.targetTimeMinutes);
      expect(frozen.tip).toContain('frozen');
    });

    it('clamps temperatures to safe air fryer operating ranges', () => {
      const veryLow = convertOvenToAirFryer({ ovenTemp: 100, ovenTimeMinutes: 20, unit: 'F' });
      expect(veryLow.airFryerTemp).toBeGreaterThanOrEqual(160);

      const veryHigh = convertOvenToAirFryer({ ovenTemp: 600, ovenTimeMinutes: 20, unit: 'F' });
      expect(veryHigh.airFryerTemp).toBeLessThanOrEqual(450);
    });
  });

  describe('Food Presets Library', () => {
    it('contains over 20 verified presets across all food categories', () => {
      expect(AIR_FRYER_PRESETS.length).toBeGreaterThanOrEqual(20);

      const categories = new Set(AIR_FRYER_PRESETS.map(p => p.category));
      expect(categories.has('poultry')).toBe(true);
      expect(categories.has('meat')).toBe(true);
      expect(categories.has('seafood')).toBe(true);
      expect(categories.has('veggies')).toBe(true);
      expect(categories.has('snacks')).toBe(true);
    });

    it('has valid temperatures and times for all presets', () => {
      for (const preset of AIR_FRYER_PRESETS) {
        expect(preset.tempF).toBeGreaterThanOrEqual(300);
        expect(preset.tempF).toBeLessThanOrEqual(425);
        expect(preset.minTime).toBeGreaterThan(0);
        expect(preset.maxTime).toBeGreaterThanOrEqual(preset.minTime);
        expect(preset.targetTime).toBeGreaterThanOrEqual(preset.minTime);
        expect(preset.targetTime).toBeLessThanOrEqual(preset.maxTime);
        expect(preset.flipCheckpointTime).toBeLessThanOrEqual(preset.targetTime);
        expect(preset.notes.length).toBeGreaterThan(10);
      }
    });

    it('specifies USDA safe internal temperatures for poultry and meats', () => {
      const chickenBreast = AIR_FRYER_PRESETS.find(p => p.id === 'chicken-breast');
      expect(chickenBreast?.internalTempF).toBe(165);

      const steak = AIR_FRYER_PRESETS.find(p => p.id === 'steak-ribeye');
      expect(steak?.internalTempF).toBe(135);

      const salmon = AIR_FRYER_PRESETS.find(p => p.id === 'salmon-fillet');
      expect(salmon?.internalTempF).toBe(145);
    });

    it('has a complete quick conversion chart', () => {
      expect(QUICK_CONVERSION_CHART.length).toBeGreaterThanOrEqual(6);
      expect(QUICK_CONVERSION_CHART[0].ovenF).toContain('300°F');
    });
  });
});
