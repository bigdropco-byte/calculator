import { CategoryDefinition, CategorySlug } from './types';

export const CATEGORIES: Record<CategorySlug, CategoryDefinition> = {
  math: {
    slug: 'math',
    name: 'Math Calculators',
    shortName: 'Math',
    description: 'Solve arithmetic, percentages, averages, algebra, geometry, and advanced mathematics problems.',
    icon: 'Percent',
    featured: true,
  },
  finance: {
    slug: 'finance',
    name: 'Finance Calculators',
    shortName: 'Finance',
    description: 'Calculate loans, mortgages, compound interest, investments, savings, and retirement planning.',
    icon: 'DollarSign',
    featured: true,
  },
  health: {
    slug: 'health',
    name: 'Health Calculators',
    shortName: 'Health',
    description: 'Monitor your body mass index (BMI), calories, ideal weight, body fat, and wellness metrics.',
    icon: 'HeartPulse',
    featured: true,
  },
  'date-time': {
    slug: 'date-time',
    name: 'Date & Time Calculators',
    shortName: 'Date & Time',
    description: 'Calculate exact age, days between dates, time durations, work days, and countdowns.',
    icon: 'Calendar',
    featured: true,
  },
  everyday: {
    slug: 'everyday',
    name: 'Everyday Calculators',
    shortName: 'Everyday',
    description: 'Everyday utilities including restaurant tip splitting, discounts, gas mileage, and cooking conversions.',
    icon: 'Sparkles',
    featured: true,
  },
  business: {
    slug: 'business',
    name: 'Business Calculators',
    shortName: 'Business',
    description: 'Calculate profit margins, markup, customer acquisition cost (CAC), runway, and breakeven points.',
    icon: 'Briefcase',
    featured: true,
  },
  education: {
    slug: 'education',
    name: 'Education Calculators',
    shortName: 'Education',
    description: 'GPA calculators, test score curves, grade predictors, study hours, and academic tools.',
    icon: 'GraduationCap',
    featured: false,
  },
  conversion: {
    slug: 'conversion',
    name: 'Unit Conversion Calculators',
    shortName: 'Conversion',
    description: 'Convert between metric and imperial units for length, weight, temperature, volume, and area.',
    icon: 'ArrowLeftRight',
    featured: false,
  },
  science: {
    slug: 'science',
    name: 'Science Calculators',
    shortName: 'Science',
    description: 'Physics equations, chemistry molecular weights, speed, acceleration, and thermodynamic formulas.',
    icon: 'Atom',
    featured: false,
  },
  technology: {
    slug: 'technology',
    name: 'Technology Calculators',
    shortName: 'Technology',
    description: 'Data storage, download speeds, bandwidth estimation, binary/hex conversion, and cloud costs.',
    icon: 'Cpu',
    featured: false,
  },
  construction: {
    slug: 'construction',
    name: 'Construction Calculators',
    shortName: 'Construction',
    description: 'Square footage, concrete slab volume, paint coverage, roofing, tile, and framing estimates.',
    icon: 'Hammer',
    featured: false,
  },
  fitness: {
    slug: 'fitness',
    name: 'Fitness Calculators',
    shortName: 'Fitness',
    description: 'Target heart rates, one-rep max, running pace, macro splits, and workout calorie burn.',
    icon: 'Activity',
    featured: false,
  },
  statistics: {
    slug: 'statistics',
    name: 'Statistics Calculators',
    shortName: 'Statistics',
    description: 'Standard deviation, variance, z-score, sample size, confidence intervals, and regression.',
    icon: 'BarChart2',
    featured: false,
  },
  probability: {
    slug: 'probability',
    name: 'Probability Calculators',
    shortName: 'Probability',
    description: 'Permutations, combinations, coin tosses, dice odds, Bayes theorem, and odds ratios.',
    icon: 'Dices',
    featured: false,
  },
  sports: {
    slug: 'sports',
    name: 'Sports Calculators',
    shortName: 'Sports',
    description: 'Batting averages, quarterback ratings, golf handicap, tournament brackets, and splits.',
    icon: 'Trophy',
    featured: false,
  },
  travel: {
    slug: 'travel',
    name: 'Travel Calculators',
    shortName: 'Travel',
    description: 'Time zone differences, jet lag schedules, road trip fuel cost, and packing weight.',
    icon: 'Plane',
    featured: false,
  },
};

export function getAllCategories(): CategoryDefinition[] {
  return Object.values(CATEGORIES);
}

export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return CATEGORIES[slug as CategorySlug];
}
