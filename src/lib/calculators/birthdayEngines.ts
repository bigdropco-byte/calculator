/**
 * Pure Calculation Engine: Birthday Milestones, Lunar Phases, Hebrew Calendar & Dates
 * Covers birthday countdowns, golden/silver/diamond birthdays, half-birthdays,
 * generations, Roman numeral dates, moon phases, and anniversary milestones.
 */

export function calculateBirthdayMilestones(birthDateInput: Date | string): {
  daysUntilNextBirthday: number;
  nextBirthdayDate: string;
  turningAge: number;
  nextAgeTurning: number;
  dayOfWeekBorn: string;
  totalDaysLived: number;
  ageYears: number;
  ageMonths: number;
  ageDays: number;
  halfBirthdayDate: Date;
  goldenBirthdayYear: number;
  goldenBirthdayAge: number;
  isGoldenBirthdayPassed: boolean;
  generation: string;
  chineseZodiac: string;
} {
  const birthDate = typeof birthDateInput === 'string' ? new Date(`${birthDateInput}T00:00:00Z`) : birthDateInput;
  const now = new Date();
  const birthYear = birthDate.getUTCFullYear();
  const birthMonth = birthDate.getUTCMonth();
  const birthDay = birthDate.getUTCDate();

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeekBorn = daysOfWeek[birthDate.getUTCDay()];

  // Current age in years, months, days
  let ageYears = now.getUTCFullYear() - birthYear;
  let ageMonths = now.getUTCMonth() - birthMonth;
  let ageDays = now.getUTCDate() - birthDay;

  if (ageDays < 0) {
    ageMonths--;
    const prevMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0));
    ageDays += prevMonth.getUTCDate();
  }
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  // Next birthday
  let nextBirthday = new Date(Date.UTC(now.getUTCFullYear(), birthMonth, birthDay));
  if (nextBirthday.getTime() < now.getTime()) {
    nextBirthday = new Date(Date.UTC(now.getUTCFullYear() + 1, birthMonth, birthDay));
  }
  const diffMs = nextBirthday.getTime() - now.getTime();
  const daysUntil = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  const turningAge = nextBirthday.getUTCFullYear() - birthYear;

  const totalDaysLived = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

  // Half birthday
  const halfBirthdayDate = new Date(birthDate.getTime());
  halfBirthdayDate.setMonth(halfBirthdayDate.getMonth() + 6);

  // Golden Birthday
  const goldenBirthdayAge = birthDay;
  const goldenBirthdayYear = birthYear + goldenBirthdayAge;
  const isGoldenBirthdayPassed =
    now.getUTCFullYear() > goldenBirthdayYear ||
    (now.getUTCFullYear() === goldenBirthdayYear && now.getTime() > new Date(Date.UTC(goldenBirthdayYear, birthMonth, birthDay)).getTime());

  // Generation
  let generation = 'Generation Alpha';
  if (birthYear >= 2013) generation = 'Generation Alpha (2013–2025)';
  else if (birthYear >= 1997) generation = 'Generation Z / Zoomer (1997–2012)';
  else if (birthYear >= 1981) generation = 'Millennial / Gen Y (1981–1996)';
  else if (birthYear >= 1965) generation = 'Generation X (1965–1980)';
  else if (birthYear >= 1946) generation = 'Baby Boomer (1946–1964)';
  else if (birthYear >= 1928) generation = 'Silent Generation (1928–1945)';
  else generation = 'Greatest Generation (before 1928)';

  const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
  const chineseZodiac = animals[(birthYear - 4) % 12];

  const pad = (n: number) => n.toString().padStart(2, '0');
  const nextBirthdayDate = `${nextBirthday.getUTCFullYear()}-${pad(nextBirthday.getUTCMonth() + 1)}-${pad(nextBirthday.getUTCDate())}`;

  return {
    daysUntilNextBirthday: daysUntil,
    nextBirthdayDate,
    turningAge,
    nextAgeTurning: turningAge,
    dayOfWeekBorn,
    totalDaysLived,
    ageYears,
    ageMonths,
    ageDays,
    halfBirthdayDate,
    goldenBirthdayYear,
    goldenBirthdayAge,
    isGoldenBirthdayPassed,
    generation,
    chineseZodiac,
  };
}

export function calculateHalfBirthday(birthDateInput: Date | string): {
  nextHalfBirthdayFormatted: string;
  daysUntil: number;
} {
  const d = typeof birthDateInput === 'string' ? new Date(`${birthDateInput}T00:00:00Z`) : birthDateInput;
  const now = new Date();

  // Half birthday month is +6 months
  const halfMonth = (d.getUTCMonth() + 6) % 12;
  const day = d.getUTCDate();

  let targetYear = now.getUTCFullYear();
  let candidate = new Date(Date.UTC(targetYear, halfMonth, Math.min(day, 28)));
  if (candidate.getTime() < now.getTime()) {
    candidate = new Date(Date.UTC(targetYear + 1, halfMonth, Math.min(day, 28)));
  }

  const daysUntil = Math.max(0, Math.ceil((candidate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const formatted = `${months[candidate.getUTCMonth()]} ${candidate.getUTCDate()}, ${candidate.getUTCFullYear()}`;

  return {
    nextHalfBirthdayFormatted: formatted,
    daysUntil,
  };
}

export function calculateSpecialBirthdays(birthDateInput: Date | string): {
  goldenAge: number;
  goldenBirthdayDate: string;
  isGoldenPassed: boolean;
  goldenDaysLeft: number;
  silverBirthdayDate: string;
  isSilverPassed: boolean;
  silverDaysLeft: number;
  diamondBirthdayDate: string;
  isDiamondPassed: boolean;
  diamondDaysLeft: number;
} {
  const d = typeof birthDateInput === 'string' ? new Date(`${birthDateInput}T00:00:00Z`) : birthDateInput;
  const now = new Date();
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth();
  const day = d.getUTCDate();

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Golden: turning age = day
  const goldenYear = y + day;
  const goldenDate = new Date(Date.UTC(goldenYear, m, day));
  const isGoldenPassed = now.getTime() > goldenDate.getTime();
  const goldenDaysLeft = Math.max(0, Math.ceil((goldenDate.getTime() - now.getTime()) / 86400000));

  // Silver: turning 25
  const silverDate = new Date(Date.UTC(y + 25, m, day));
  const isSilverPassed = now.getTime() > silverDate.getTime();
  const silverDaysLeft = Math.max(0, Math.ceil((silverDate.getTime() - now.getTime()) / 86400000));

  // Diamond: turning 60
  const diamondDate = new Date(Date.UTC(y + 60, m, day));
  const isDiamondPassed = now.getTime() > diamondDate.getTime();
  const diamondDaysLeft = Math.max(0, Math.ceil((diamondDate.getTime() - now.getTime()) / 86400000));

  return {
    goldenAge: day,
    goldenBirthdayDate: `${months[m]} ${day}, ${goldenYear}`,
    isGoldenPassed,
    goldenDaysLeft,
    silverBirthdayDate: `${months[m]} ${day}, ${y + 25}`,
    isSilverPassed,
    silverDaysLeft,
    diamondBirthdayDate: `${months[m]} ${day}, ${y + 60}`,
    isDiamondPassed,
    diamondDaysLeft,
  };
}

export function calculateBirthYear(age: number, targetYear: number = new Date().getFullYear()): {
  birthYearIfBirthdayPassed: number;
  birthYearIfBirthdayNotPassed: number;
  generation: string;
} {
  const passed = targetYear - age;
  const pending = targetYear - age - 1;

  let generation = 'Generation Alpha';
  if (passed >= 2013) generation = 'Generation Alpha';
  else if (passed >= 1997) generation = 'Generation Z';
  else if (passed >= 1981) generation = 'Millennial';
  else if (passed >= 1965) generation = 'Generation X';
  else if (passed >= 1946) generation = 'Baby Boomer';
  else generation = 'Silent Generation';

  return {
    birthYearIfBirthdayPassed: passed,
    birthYearIfBirthdayNotPassed: pending,
    generation,
  };
}

export function calculateChineseZodiac(year: number): {
  sign: string;
  element: string;
} {
  const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
  const elements = ['Metal', 'Water', 'Wood', 'Fire', 'Earth'];

  const sign = animals[(year - 4) % 12];
  const element = elements[Math.floor(((year - 4) % 10) / 2)];

  return { sign, element };
}

export function getWesternZodiac(month: number, day: number): string {
  const dates = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
  const signs = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'];
  return day < dates[month - 1] ? signs[(month + 10) % 12] : signs[month - 1];
}

export function calculateMoonPhase(dateInput: Date | string): {
  phaseName: string;
  illuminationPercentage: number;
  illuminationPercent: number;
  moonAgeDays: number;
  phaseEmoji: string;
  archetypeTrait: string;
  personalityProfile: string;
} {
  const date = typeof dateInput === 'string' ? new Date(`${dateInput}T00:00:00Z`) : dateInput;
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  let r = year % 100;
  r %= 19;
  if (r > 9) r -= 19;
  r = (r * 11) % 30 + month + day;
  if (month < 3) r += 2;
  r -= year < 2000 ? 4 : 8.3;
  r = Math.floor(r + 0.5) % 30;
  const moonAge = r < 0 ? r + 30 : r;

  let phaseName = 'New Moon';
  let illumination = 0;
  let emoji = '🌑';
  let trait = 'Reflective initiator and visionary seed-planter.';

  if (moonAge >= 1 && moonAge <= 6) {
    phaseName = 'Waxing Crescent';
    illumination = Math.round((moonAge / 7.5) * 50);
    emoji = '🌒';
    trait = 'Determined, growth-focused, and eager to expand boundaries.';
  } else if (moonAge >= 7 && moonAge <= 9) {
    phaseName = 'First Quarter';
    illumination = 50;
    emoji = '🌓';
    trait = 'Resilient decision-maker who thrives under pressure.';
  } else if (moonAge >= 10 && moonAge <= 13) {
    phaseName = 'Waxing Gibbous';
    illumination = 50 + Math.round(((moonAge - 7.5) / 7.5) * 50);
    emoji = '🌔';
    trait = 'Detail-oriented perfectionist striving for mastery and culmination.';
  } else if (moonAge >= 14 && moonAge <= 16) {
    phaseName = 'Full Moon';
    illumination = 100;
    emoji = '🌕';
    trait = 'Magnetic, highly emotional, creative, and expressive spotlight energy.';
  } else if (moonAge >= 17 && moonAge <= 21) {
    phaseName = 'Waning Gibbous';
    illumination = 100 - Math.round(((moonAge - 15) / 7.5) * 50);
    emoji = '🌖';
    trait = 'Generous mentor who synthesizes lessons to share with the community.';
  } else if (moonAge >= 22 && moonAge <= 24) {
    phaseName = 'Last Quarter';
    illumination = 50;
    emoji = '🌗';
    trait = 'Discerning philosopher comfortable with letting go and transformation.';
  } else if (moonAge >= 25 && moonAge <= 29) {
    phaseName = 'Waning Crescent';
    illumination = Math.max(0, 50 - Math.round(((moonAge - 22.5) / 7.5) * 50));
    emoji = '🌘';
    trait = 'Deeply spiritual, introspective mystic oriented towards wisdom.';
  }

  return {
    phaseName,
    illuminationPercentage: illumination,
    illuminationPercent: illumination,
    moonAgeDays: Number(moonAge.toFixed(1)),
    phaseEmoji: emoji,
    archetypeTrait: trait,
    personalityProfile: trait,
  };
}

export function calculateMoonPhaseOnDate(dateInput: Date | string) {
  return calculateMoonPhase(dateInput);
}

export function toRomanNumeral(num: number): string {
  const lookup: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];

  let n = Math.max(1, Math.min(3999, Math.round(num)));
  let roman = '';
  for (const [val, str] of lookup) {
    while (n >= val) {
      roman += str;
      n -= val;
    }
  }
  return roman;
}

export function dateToRomanNumerals(dateInput: Date | string): {
  monthRoman: string;
  dayRoman: string;
  yearRoman: string;
  formattedDot: string;
  formattedSlash: string;
  formattedDash: string;
  dayMonthYear: string;
  monthDayYear: string;
  yearMonthDay: string;
  dotted: string;
  hyphenated: string;
  year: string;
} {
  const date = typeof dateInput === 'string' ? new Date(`${dateInput}T00:00:00Z`) : dateInput;
  const m = toRomanNumeral(date.getUTCMonth() + 1);
  const d = toRomanNumeral(date.getUTCDate());
  const y = toRomanNumeral(date.getUTCFullYear());

  return {
    monthRoman: m,
    dayRoman: d,
    yearRoman: y,
    formattedDot: `${m} · ${d} · ${y}`,
    formattedSlash: `${m} / ${d} / ${y}`,
    formattedDash: `${m} - ${d} - ${y}`,
    dayMonthYear: `${d} · ${m} · ${y}`,
    monthDayYear: `${m} · ${d} · ${y}`,
    yearMonthDay: `${y} · ${m} · ${d}`,
    dotted: `${d}.${m}.${y}`,
    hyphenated: `${d}-${m}-${y}`,
    year: y,
  };
}

export function convertToRomanNumeralDate(dateStr: string) {
  return dateToRomanNumerals(dateStr);
}

export function calculateAnniversaryGifts(yearsTogether: number): {
  years: number;
  traditionalGift: string;
  traditional: string;
  modernGift: string;
  modern: string;
  gemstone: string;
  milestoneTitle: string;
} {
  const y = Math.max(1, Math.round(yearsTogether));

  const gifts: Record<number, { trad: string; mod: string; gem: string; title: string }> = {
    1: { trad: 'Paper', mod: 'Clocks', gem: 'Gold Jewelry', title: 'Paper Anniversary' },
    2: { trad: 'Cotton', mod: 'China', gem: 'Garnet', title: 'Cotton Anniversary' },
    3: { trad: 'Leather', mod: 'Crystal / Glass', gem: 'Pearl', title: 'Leather Anniversary' },
    4: { trad: 'Fruit & Flowers', mod: 'Appliances', gem: 'Blue Topaz', title: 'Fruit & Flowers' },
    5: { trad: 'Wood', mod: 'Silverware', gem: 'Sapphire', title: 'Wood Anniversary' },
    6: { trad: 'Iron / Candy', mod: 'Wood Items', gem: 'Amethyst', title: 'Iron Anniversary' },
    7: { trad: 'Wool / Copper', mod: 'Desk Sets', gem: 'Onyx', title: 'Copper Anniversary' },
    8: { trad: 'Bronze / Pottery', mod: 'Linens / Lace', gem: 'Tourmaline', title: 'Bronze Anniversary' },
    9: { trad: 'Pottery / Willow', mod: 'Leather', gem: 'Lapis Lazuli', title: 'Pottery Anniversary' },
    10: { trad: 'Tin / Aluminum', mod: 'Diamond Jewelry', gem: 'Diamond', title: 'Tin Anniversary (1 Decade)' },
    15: { trad: 'Crystal', mod: 'Watches', gem: 'Ruby', title: 'Crystal Anniversary' },
    20: { trad: 'China', mod: 'Platinum', gem: 'Emerald', title: 'China Anniversary' },
    25: { trad: 'Silver', mod: 'Silver', gem: 'Silver Jubilee', title: 'Silver Anniversary (25 Years)' },
    30: { trad: 'Pearl', mod: 'Diamond', gem: 'Pearl', title: 'Pearl Anniversary' },
    40: { trad: 'Ruby', mod: 'Ruby', gem: 'Ruby', title: 'Ruby Anniversary' },
    50: { trad: 'Gold', mod: 'Gold', gem: 'Gold Jubilee', title: 'Golden Anniversary (50 Years)' },
    60: { trad: 'Diamond', mod: 'Diamond', gem: 'Diamond Jubilee', title: 'Diamond Anniversary (60 Years)' },
  };

  const match = gifts[y] || {
    trad: y > 50 ? 'Gold / Diamond' : y > 25 ? 'Silver / Pearl' : 'Personal Keepsake',
    mod: 'Celebratory Experience / Travel',
    gem: 'Anniversary Gemstone',
    title: `${y}th Anniversary`,
  };

  return {
    years: y,
    traditionalGift: match.trad,
    traditional: match.trad,
    modernGift: match.mod,
    modern: match.mod,
    gemstone: match.gem,
    milestoneTitle: match.title,
  };
}

export function convertHebrewBirthday(dateInput: Date | string): {
  hebrewYear: number;
  hebrewMonthName: string;
  hebrewDay: number;
  hebrewFormatted: string;
  hebrewDateEnglish: string;
  hebrewDateHebrew: string;
  barBatMitzvahHebrewYear: number;
  parashahContext: string;
} {
  const date = typeof dateInput === 'string' ? new Date(`${dateInput}T00:00:00Z`) : dateInput;
  const gYear = date.getUTCFullYear();
  const gMonth = date.getUTCMonth() + 1;
  const gDay = date.getUTCDate();

  const isAutumn = gMonth >= 10;
  const hebrewYear = gYear + (isAutumn ? 3761 : 3760);

  const hebrewMonths = [
    'Tishrei', 'Cheshvan', 'Kislev', 'Tevet', 'Shevat', 'Adar',
    'Nisan', 'Iyar', 'Sivan', 'Tammuz', 'Av', 'Elul'
  ];
  const hebrewLettersMonths = [
    'תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר',
    'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'
  ];

  const hMonthIndex = (gMonth + 3) % 12;
  const hebrewMonthName = hebrewMonths[hMonthIndex];
  const hebrewDay = Math.min(29, (gDay + 2) % 30 || 1);

  const hebrewDateEnglish = `${hebrewDay} ${hebrewMonthName} ${hebrewYear}`;
  const hebrewDateHebrew = `${hebrewDay} ${hebrewLettersMonths[hMonthIndex]} ${hebrewYear}`;

  return {
    hebrewYear,
    hebrewMonthName,
    hebrewDay,
    hebrewFormatted: hebrewDateEnglish,
    hebrewDateEnglish,
    hebrewDateHebrew,
    barBatMitzvahHebrewYear: hebrewYear + 13,
    parashahContext: 'Traditional Torah portion corresponding to your birth week in the Hebrew lunisolar cycle.',
  };
}

export function calculateHebrewBirthday(birthDate: string) {
  return convertHebrewBirthday(birthDate);
}

function getLifePathNumber(dateStr: string): number {
  const clean = dateStr.replace(/\D/g, '');
  let sum = clean.split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  }
  return sum;
}

export function calculateSoulmateHarmony(bday1: string, bday2: string): {
  compatibilityScore: number;
  harmonyType: string;
  lifePath1: number;
  lifePath2: number;
  summary: string;
} {
  const lp1 = getLifePathNumber(bday1);
  const lp2 = getLifePathNumber(bday2);

  const diff = Math.abs((lp1 % 9) - (lp2 % 9));
  let score = 85;
  if (diff === 0) score = 95;
  else if (diff === 3 || diff === 6) score = 92; // 3-6-9 triad
  else if (diff === 2 || diff === 4) score = 88;
  else score = 78 + (diff % 5) * 3;

  let type = 'Harmonious Cosmic Balance';
  if (score >= 92) type = 'Soul Contract Resonance (High Affinity)';
  else if (score >= 85) type = 'Complementary Polarities';
  else type = 'Dynamic Evolutionary Growth';

  const summary = `Life Path ${lp1} and Life Path ${lp2} share an innate cosmic affinity. Your relationship thrives through honest communication, mutual respect, and shared core values.`;

  return {
    compatibilityScore: score,
    harmonyType: type,
    lifePath1: lp1,
    lifePath2: lp2,
    summary,
  };
}

export function calculateTwinFlameBirthday(bday1: string, bday2: string): {
  mirrorScore: number;
  polarity: string;
  stage: string;
  guidance: string;
  lifePath1: number;
  lifePath2: number;
} {
  const lp1 = getLifePathNumber(bday1);
  const lp2 = getLifePathNumber(bday2);

  const diff = Math.abs(lp1 - lp2);
  const mirrorScore = Math.min(99, Math.max(70, 96 - diff * 3));

  const stages = [
    'Stage 1: Soul Recognition & Awakening',
    'Stage 2: Illumination & Euphoric Bonding',
    'Stage 3: The Mirror Crisis & Triggering',
    'Stage 4: Runner & Chaser Separation',
    'Stage 5: Surrender & Internal Shadow Work',
    'Stage 6: Re-Alignment & Harmonious Reunion',
  ];
  const stage = stages[(lp1 + lp2) % stages.length];
  const polarity = (lp1 + lp2) % 2 === 0 ? 'Divine Masculine & Feminine Equilibrium' : 'Dynamic Polar Polarity Magnetism';
  const guidance = 'Your connection is designed to illuminate subconscious patterns and inspire mutual spiritual evolution. Honor individual growth while holding compassionate space.';

  return {
    mirrorScore,
    polarity,
    stage,
    guidance,
    lifePath1: lp1,
    lifePath2: lp2,
  };
}
