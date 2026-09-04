import { describe, it, expect } from 'vitest';
import {
  calculateGeneralDensity,
  calculateWaterDensity,
  calculateAirDensity,
  calculatePixelDensity,
  calculatePopulationDensity,
  calculatePsaDensity,
} from '../densityPhysics';

describe('Physics, Display & Demographics Density Engine', () => {
  it('calculates general mass/volume density', () => {
    // 5000 grams in 2.5 liters
    const res = calculateGeneralDensity({
      massValue: 5000,
      massUnit: 'g',
      volumeValue: 2.5,
      volumeUnit: 'liters',
    });
    // 5 kg / 0.0025 m^3 = 2000 kg/m^3
    expect(res.densityKgM3).toBe(2000);
    expect(res.densityGCm3).toBe(2);
  });

  it('calculates freshwater and seawater density at standard temperatures', () => {
    const fresh4C = calculateWaterDensity({ temperatureCelsius: 4, salinityPsu: 0 });
    expect(fresh4C.densityKgM3).toBeCloseTo(999.97, 0);

    const sea20C = calculateWaterDensity({ temperatureCelsius: 20, salinityPsu: 35 });
    // Seawater at 20°C is approximately 1024-1025 kg/m^3
    expect(sea20C.densityKgM3).toBeGreaterThan(1020);
    expect(sea20C.waterType).toContain('Seawater');
  });

  it('calculates air density at sea level and elevation', () => {
    // Sea level, 15°C, 1013.25 hPa, 0% humidity
    const seaAir = calculateAirDensity({
      temperatureCelsius: 15,
      pressureHpa: 1013.25,
      relativeHumidityPct: 0,
    });
    expect(seaAir.densityKgM3).toBeCloseTo(1.225, 2);

    // High elevation (2000m)
    const highAir = calculateAirDensity({
      temperatureCelsius: 15,
      altitudeMeters: 2000,
    });
    expect(highAir.densityKgM3).toBeLessThan(seaAir.densityKgM3);
  });

  it('calculates display pixel density (PPI)', () => {
    // Full HD 1920x1080 on 24-inch monitor
    const res = calculatePixelDensity({
      horizontalPixels: 1920,
      verticalPixels: 1080,
      screenDiagonalInches: 24,
    });
    expect(res.ppi).toBeCloseTo(91.8, 1);
    expect(res.megapixels).toBeCloseTo(2.07, 2);
  });

  it('calculates population density', () => {
    const res = calculatePopulationDensity({
      population: 1000000,
      landArea: 500,
      areaUnit: 'sq_miles',
    });
    expect(res.densityPerSqMile).toBe(2000);
    expect(res.densityPerSqKm).toBeGreaterThan(700);
  });

  it('calculates PSA density and checks clinical threshold', () => {
    const lowRisk = calculatePsaDensity({ totalPsaNgMl: 3.5, prostateVolumeCc: 35 });
    expect(lowRisk.psaDensity).toBe(0.1);
    expect(lowRisk.riskCategory).toBe('Low / Favorable');

    const highRisk = calculatePsaDensity({ totalPsaNgMl: 6.8, prostateVolumeCc: 30 });
    expect(highRisk.psaDensity).toBeCloseTo(0.227, 2);
    expect(highRisk.riskCategory).toContain('Elevated Risk');
  });
});
