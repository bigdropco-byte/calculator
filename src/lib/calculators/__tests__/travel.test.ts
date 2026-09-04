import { describe, it, expect } from 'vitest';
import { calculateTripBudget } from '../travel';

describe('Trip Budget Calculation Engine', () => {
  it('calculates total trip costs, per-day and per-person breakdown', () => {
    // 2 travelers, 7 nights (8 days), $800 transport, $150/night lodging, $60/day/person food, $40/day/person activities, 10% buffer
    // Transportation: $800
    // Lodging: 7 * 150 = $1050
    // Food: 60 * 8 * 2 = $960
    // Activities: 40 * 8 * 2 = $640
    // Misc: $0
    // Subtotal: 800 + 1050 + 960 + 640 = $3450
    // Buffer (10%): $345
    // Grand Total: $3795
    const res = calculateTripBudget({
      transportation: 800,
      lodgingPerNight: 150,
      nights: 7,
      dailyFoodPerPerson: 60,
      dailyActivitiesPerPerson: 40,
      travelers: 2,
      contingencyPct: 10,
    });

    expect(res.totalTransportation).toBe(800);
    expect(res.totalLodging).toBe(1050);
    expect(res.totalFood).toBe(960);
    expect(res.totalActivities).toBe(640);
    expect(res.contingencyBufferAmount).toBe(345);
    expect(res.grandTotal).toBe(3795);
    expect(res.costPerTraveler).toBe(Math.round(3795 / 2));
    expect(res.costPerDay).toBe(Math.round(3795 / 8));
    expect(res.breakdown).toHaveLength(6);
  });
});
