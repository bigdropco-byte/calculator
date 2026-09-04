/**
 * Pure Calculation Engine: Trip & Travel Budgeting
 * Calculates total trip expenses, per-day and per-traveler averages, and contingency buffers.
 */

export interface TripBudgetResult {
  totalTransportation: number;
  totalLodging: number;
  totalFood: number;
  totalActivities: number;
  totalMiscellaneous: number;
  contingencyBufferAmount: number;
  grandTotal: number;
  costPerTraveler: number;
  costPerDay: number;
  totalDays: number;
  travelerCount: number;
  breakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export function calculateTripBudget(options: {
  transportation: number;
  lodgingPerNight: number;
  nights: number;
  dailyFoodPerPerson: number;
  dailyActivitiesPerPerson: number;
  miscellaneous?: number;
  travelers?: number;
  contingencyPct?: number;
}): TripBudgetResult {
  const travelers = Math.max(1, options.travelers || 1);
  const nights = Math.max(1, options.nights || 1);
  const days = nights + 1; // Trip days usually nights + 1

  const trans = Math.max(0, options.transportation);
  const lodging = Math.max(0, options.lodgingPerNight) * nights;
  const food = Math.max(0, options.dailyFoodPerPerson) * days * travelers;
  const activities = Math.max(0, options.dailyActivitiesPerPerson) * days * travelers;
  const misc = Math.max(0, options.miscellaneous || 0);

  const subtotal = trans + lodging + food + activities + misc;
  const bufferPct = Math.max(0, options.contingencyPct || 10) / 100;
  const contingencyBufferAmount = subtotal * bufferPct;
  const grandTotal = subtotal + contingencyBufferAmount;

  const costPerTraveler = grandTotal / travelers;
  const costPerDay = grandTotal / days;

  const breakdown = [
    { category: 'Transportation', amount: Math.round(trans), percentage: grandTotal > 0 ? Number(((trans / grandTotal) * 100).toFixed(1)) : 0 },
    { category: 'Lodging & Hotels', amount: Math.round(lodging), percentage: grandTotal > 0 ? Number(((lodging / grandTotal) * 100).toFixed(1)) : 0 },
    { category: 'Food & Dining', amount: Math.round(food), percentage: grandTotal > 0 ? Number(((food / grandTotal) * 100).toFixed(1)) : 0 },
    { category: 'Activities & Tours', amount: Math.round(activities), percentage: grandTotal > 0 ? Number(((activities / grandTotal) * 100).toFixed(1)) : 0 },
    { category: 'Miscellaneous', amount: Math.round(misc), percentage: grandTotal > 0 ? Number(((misc / grandTotal) * 100).toFixed(1)) : 0 },
    { category: 'Emergency Buffer', amount: Math.round(contingencyBufferAmount), percentage: grandTotal > 0 ? Number(((contingencyBufferAmount / grandTotal) * 100).toFixed(1)) : 0 },
  ];

  return {
    totalTransportation: Math.round(trans),
    totalLodging: Math.round(lodging),
    totalFood: Math.round(food),
    totalActivities: Math.round(activities),
    totalMiscellaneous: Math.round(misc),
    contingencyBufferAmount: Math.round(contingencyBufferAmount),
    grandTotal: Math.round(grandTotal),
    costPerTraveler: Math.round(costPerTraveler),
    costPerDay: Math.round(costPerDay),
    totalDays: days,
    travelerCount: travelers,
    breakdown,
  };
}
