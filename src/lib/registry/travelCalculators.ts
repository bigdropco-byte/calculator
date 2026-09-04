import { CalculatorDefinition } from '../types';

export const TRAVEL_CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'trip-budget-calculator',
    name: 'Trip Budget Calculator',
    shortDescription: 'Estimate total vacation and travel expenses, cost per day, cost per traveler, and emergency buffer across flights, hotels, food, and tours.',
    category: 'travel',
    secondaryCategories: ['everyday', 'finance'],
    keywords: [
      'trip budget calculator',
      'vacation cost calculator',
      'travel expense calculator',
      'holiday budget planner',
      'travel cost estimator',
    ],
    tags: ['Travel', 'Vacation', 'Budget', 'Holiday', 'Expenses'],
    icon: 'Plane',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-22',
    seo: {
      title: 'Trip Budget Calculator – Vacation & Travel Cost Estimator',
      metaDescription: 'Free online trip budget calculator. Estimate total vacation costs, average daily spending, expense breakdown per traveler, and emergency buffer funds.',
      keywords: ['trip budget calculator', 'travel cost calculator', 'vacation budget planner', 'holiday expense estimator'],
    },
    relatedCalculators: ['tip-calculator', 'roi-calculator', 'percentage-calculator', 'paycheck-calculator'],
    editorial: {
      whatIs: 'A Trip Budget Calculator helps travelers, families, and backpackers forecast total trip expenditure before departure. By categorizing spending into transportation, nightly lodging, daily meals, sightseeing activities, and miscellaneous incidentals—plus an essential emergency contingency buffer—it ensures you never run short of funds while abroad.',
      howToUse: [
        'Enter total transportation costs including airfare, train tickets, rental cars, and fuel.',
        'Enter your lodging cost per night and total number of nights staying.',
        'Specify expected daily food and dining expenses per person.',
        'Enter anticipated daily entertainment, museum entry fees, and guided tour costs per person.',
        'Set the number of travelers and choose an emergency contingency buffer percentage (10%–15% recommended).',
        'Review the category breakdown chart, total estimated budget, average daily burn rate, and cost per traveler.',
      ],
      formula: {
        title: 'Trip Expense & Contingency Formula',
        expression: '\\text{Total Budget} = (T + (L \\times N) + ((F + A) \\times D \\times P) + M) \\times (1 + B)',
        explanation: 'Where T is transportation, L is lodging per night, N is nights, F is daily food, A is daily activities, D is days (N+1), P is travelers, M is misc, and B is contingency buffer percentage.',
      },
      example: {
        scenario: 'A 7-night vacation (8 days) for 2 travelers with $800 flights, $150/night hotel, $60/person/day food, $30/person/day activities, $150 misc, and a 10% contingency buffer.',
        steps: [
          'Transportation: $800.00.',
          'Lodging: 7 nights × $150 = $1,050.00.',
          'Food & Dining: $60/day × 8 days × 2 travelers = $960.00.',
          'Activities & Tours: $30/day × 8 days × 2 travelers = $480.00.',
          'Miscellaneous: $150.00. Subtotal: $3,440.00.',
          '10% Contingency Buffer: $3,440 × 0.10 = $344.00. Grand Total: $3,784.00.',
        ],
        result: 'Total estimated trip budget is $3,784.00 ($1,892.00 per traveler or $473.00 per day).',
      },
      tips: [
        'Always maintain at least a 10% to 15% contingency buffer for flight delays, emergency clinic visits, baggage fees, or surge-priced local taxis.',
        'Look into travel credit cards with zero foreign transaction fees (FX fees) to avoid paying 3% surcharges on every international swipe.',
        'Book accommodations with kitchenettes or complimentary breakfast to drastically cut daily food expenditures.',
      ],
      faqs: [
        {
          question: 'How much emergency contingency buffer should I plan for a trip?',
          answer: 'Travel financial advisors recommend budgeting an extra 10% for domestic trips and 15% to 20% for international destinations to account for exchange rate fluctuations, medical emergencies, and unexpected transit delays.',
        },
        {
          question: 'What is the most common hidden expense during vacations?',
          answer: 'Common overlooked expenses include airport luggage baggage fees, hotel resort/facility fees, local city tourist taxes, taxi surge pricing, roaming cellular data passes, and credit card foreign transaction surcharges.',
        },
        {
          question: 'How do I estimate daily food costs in a destination I have never visited?',
          answer: 'A practical rule of thumb is checking mid-range restaurant menus online via Google Maps or TripAdvisor for your target neighborhood, or using crowd-sourced cost of living indices like Numbeo.',
        },
        {
          question: 'Should I exchange currency at home before leaving or at foreign ATMs?',
          answer: 'Airport currency kiosks offer the worst exchange rates. Using a no-foreign-fee debit card at reputable bank ATMs in your destination country usually yields the best interbank exchange rate.',
        },
      ],
    },
  },
];
