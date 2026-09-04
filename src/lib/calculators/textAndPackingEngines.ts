/**
 * Pure Text Analysis & Packaging Calculation Engines
 * Calculat.dev - CJK Character Counters, Shipping, Box Packing, Moving, ASQ, Age Gap & Video Speed
 */

// ==========================================
// 1. Word Counter
// ==========================================
export interface WordCountResult {
  words: number;
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  averageWordLength: number;
  longestWord: string;
}

export function calculateWordCount(text: string): WordCountResult {
  if (!text || text.trim().length === 0) {
    return {
      words: 0,
      charactersWithSpaces: 0,
      charactersWithoutSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeMinutes: 0,
      speakingTimeMinutes: 0,
      averageWordLength: 0,
      longestWord: '',
    };
  }

  const charsWithSpaces = text.length;
  const charsWithoutSpaces = text.replace(/\s/g, '').length;

  const rawWords = text.trim().split(/\s+/).filter(w => w.length > 0);
  const words = rawWords.length;

  const rawSentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentences = Math.max(1, rawSentences.length);

  const rawParagraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
  const paragraphs = Math.max(1, rawParagraphs.length);

  // Average 225 WPM silent reading, 130 WPM spoken
  const readingTime = Number((words / 225).toFixed(2));
  const speakingTime = Number((words / 130).toFixed(2));

  let longest = '';
  let totalWordLetters = 0;
  for (const w of rawWords) {
    const clean = w.replace(/[^a-zA-Z0-9]/g, '');
    totalWordLetters += clean.length;
    if (clean.length > longest.length) {
      longest = clean;
    }
  }

  const avgLen = words > 0 ? totalWordLetters / words : 0;

  return {
    words,
    charactersWithSpaces: charsWithSpaces,
    charactersWithoutSpaces: charsWithoutSpaces,
    sentences,
    paragraphs,
    readingTimeMinutes: readingTime,
    speakingTimeMinutes: speakingTime,
    averageWordLength: Number(avgLen.toFixed(1)),
    longestWord: longest,
  };
}

// ==========================================
// 2. Korean Character Counter
// ==========================================
export interface KoreanCharacterResult {
  totalCharacters: number;
  charactersWithoutSpaces: number;
  hangulSyllables: number; // Completed blocks \uAC00 - \uD7A3
  hangulJamo: number; // Consonants / Vowels
  hanjaCount: number; // Chinese characters
  englishLetters: number;
  numbers: number;
  spaces: number;
  utf8Bytes: number; // Hangul = 3 bytes, ASCII = 1
  euckrBytes: number; // Hangul = 2 bytes, ASCII = 1
  resumeLimits: {
    limit500: { count: number; max: number; percent: number; passed: boolean };
    limit1000: { count: number; max: number; percent: number; passed: boolean };
    limit2000: { count: number; max: number; percent: number; passed: boolean };
  };
}

export function calculateKoreanCharacters(text: string): KoreanCharacterResult {
  const total = text.length;
  let syllables = 0;
  let jamo = 0;
  let hanja = 0;
  let english = 0;
  let digits = 0;
  let spaces = 0;
  let utf8 = 0;
  let euckr = 0;

  for (let i = 0; i < total; i++) {
    const code = text.charCodeAt(i);
    const ch = text[i];

    if (code >= 0xac00 && code <= 0xd7a3) {
      syllables++;
      utf8 += 3;
      euckr += 2;
    } else if (
      (code >= 0x1100 && code <= 0x11ff) ||
      (code >= 0x3130 && code <= 0x318f) ||
      (code >= 0xa960 && code <= 0xa97f) ||
      (code >= 0xd7b0 && code <= 0xd7ff)
    ) {
      jamo++;
      utf8 += 3;
      euckr += 2;
    } else if (
      (code >= 0x4e00 && code <= 0x9fff) ||
      (code >= 0x3400 && code <= 0x4dbf) ||
      (code >= 0xf900 && code <= 0xfaff)
    ) {
      hanja++;
      utf8 += 3;
      euckr += 2;
    } else if (/[a-zA-Z]/.test(ch)) {
      english++;
      utf8 += 1;
      euckr += 1;
    } else if (/[0-9]/.test(ch)) {
      digits++;
      utf8 += 1;
      euckr += 1;
    } else if (/\s/.test(ch)) {
      spaces++;
      utf8 += 1;
      euckr += 1;
    } else {
      utf8 += code > 127 ? 3 : 1;
      euckr += code > 127 ? 2 : 1;
    }
  }

  const noSpaces = total - spaces;

  function makeLimit(cnt: number, max: number) {
    return {
      count: cnt,
      max,
      percent: Number(Math.min(100, (cnt / max) * 100).toFixed(1)),
      passed: cnt <= max,
    };
  }

  return {
    totalCharacters: total,
    charactersWithoutSpaces: noSpaces,
    hangulSyllables: syllables,
    hangulJamo: jamo,
    hanjaCount: hanja,
    englishLetters: english,
    numbers: digits,
    spaces,
    utf8Bytes: utf8,
    euckrBytes: euckr,
    resumeLimits: {
      limit500: makeLimit(total, 500),
      limit1000: makeLimit(total, 1000),
      limit2000: makeLimit(total, 2000),
    },
  };
}

// ==========================================
// 3. Japanese Character Counter
// ==========================================
export interface JapaneseCharacterResult {
  totalCharacters: number;
  charactersWithoutSpaces: number;
  kanjiCount: number; // \u4E00 - \u9FAF
  hiraganaCount: number; // \u3040 - \u309F
  katakanaCount: number; // \u30A0 - \u30FF, \uFF65 - \uFF9F
  romajiAndNumbers: number;
  punctuationAndSymbols: number;
  genkoYoshiSheets: number; // 400-char manuscript sheets
  readingTimeMinutes: number; // ~500 chars/min
}

export function calculateJapaneseCharacters(text: string): JapaneseCharacterResult {
  const total = text.length;
  let kanji = 0;
  let hiragana = 0;
  let katakana = 0;
  let romaji = 0;
  let punct = 0;
  let spaces = 0;

  for (let i = 0; i < total; i++) {
    const code = text.charCodeAt(i);
    const ch = text[i];

    if (code >= 0x4e00 && code <= 0x9faf) {
      kanji++;
    } else if (code >= 0x3040 && code <= 0x309f) {
      hiragana++;
    } else if (
      (code >= 0x30a0 && code <= 0x30ff) ||
      (code >= 0xff65 && code <= 0xff9f)
    ) {
      katakana++;
    } else if (/[a-zA-Z0-9]/.test(ch) || (code >= 0xff10 && code <= 0xff19) || (code >= 0xff21 && code <= 0xff5a)) {
      romaji++;
    } else if (/\s/.test(ch)) {
      spaces++;
    } else {
      punct++;
    }
  }

  const noSpaces = total - spaces;
  const genkoSheets = Math.ceil(total / 400);
  const readTime = Number((total / 500).toFixed(2));

  return {
    totalCharacters: total,
    charactersWithoutSpaces: noSpaces,
    kanjiCount: kanji,
    hiraganaCount: hiragana,
    katakanaCount: katakana,
    romajiAndNumbers: romaji,
    punctuationAndSymbols: punct,
    genkoYoshiSheets: Math.max(1, genkoSheets),
    readingTimeMinutes: readTime,
  };
}

// ==========================================
// 4. Twitter / X Character Counter
// ==========================================
export interface TwitterCharacterResult {
  rawCharacterLength: number;
  weightedLength: number;
  remainingCharacters: number;
  maxLimit: number; // 280
  percentageUsed: number;
  isOverLimit: boolean;
  urlCount: number;
  cjkCount: number;
  emojiCount: number;
  threadSplits: string[];
}

export function calculateTwitterCharacters(text: string): TwitterCharacterResult {
  const MAX = 280;
  const rawLen = text.length;

  // Replace URLs with 23 placeholder characters per Twitter spec
  const urlRegex = /https?:\/\/[^\s]+/g;
  const urls = text.match(urlRegex) || [];
  const textWithoutUrls = text.replace(urlRegex, '');

  let weighted = urls.length * 23;
  let cjk = 0;
  let emojis = 0;

  // Emoji regex
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const emojiMatches = textWithoutUrls.match(emojiRegex) || [];
  emojis = emojiMatches.length;

  for (const ch of textWithoutUrls) {
    const code = ch.charCodeAt(0);
    // CJK and wide characters count as 2
    if (
      (code >= 0x4e00 && code <= 0x9fff) ||
      (code >= 0x3400 && code <= 0x4dbf) ||
      (code >= 0x3040 && code <= 0x30ff) ||
      (code >= 0xac00 && code <= 0xd7af) ||
      (code >= 0xff01 && code <= 0xff60)
    ) {
      cjk++;
      weighted += 2;
    } else {
      weighted += 1;
    }
  }

  const remaining = MAX - weighted;
  const pct = Number(Math.min(100, (weighted / MAX) * 100).toFixed(1));

  // Thread split if over 280
  const splits: string[] = [];
  if (weighted > MAX) {
    const words = text.split(/\s+/);
    let currentTweet = '';
    let tweetIndex = 1;

    for (const w of words) {
      const candidate = currentTweet ? `${currentTweet} ${w}` : w;
      if (candidate.length > 250) {
        splits.push(`(${tweetIndex}) ${currentTweet}`);
        tweetIndex++;
        currentTweet = w;
      } else {
        currentTweet = candidate;
      }
    }
    if (currentTweet) {
      splits.push(`(${tweetIndex}) ${currentTweet}`);
    }
  }

  return {
    rawCharacterLength: rawLen,
    weightedLength: weighted,
    remainingCharacters: remaining,
    maxLimit: MAX,
    percentageUsed: pct,
    isOverLimit: weighted > MAX,
    urlCount: urls.length,
    cjkCount: cjk,
    emojiCount: emojis,
    threadSplits: splits,
  };
}

// ==========================================
// 5. Chinese Character Counter
// ==========================================
export interface ChineseCharacterResult {
  totalCharacters: number;
  chineseHanziCharacters: number; // Exclusive of punctuation
  charactersWithoutSpaces: number;
  chineseWordsEstimate: number;
  punctuationCount: number;
  englishAndDigits: number;
  thousandCharactersCount: number; // 千字
  readingTimeMinutes: number; // ~350-400 chars/min
}

export function calculateChineseCharacters(text: string): ChineseCharacterResult {
  const total = text.length;
  let hanzi = 0;
  let punct = 0;
  let engDigits = 0;
  let spaces = 0;

  for (let i = 0; i < total; i++) {
    const code = text.charCodeAt(i);
    const ch = text[i];

    if (
      (code >= 0x4e00 && code <= 0x9fff) ||
      (code >= 0x3400 && code <= 0x4dbf) ||
      (code >= 0x20000 && code <= 0x2a6df) ||
      (code >= 0xf900 && code <= 0xfaff)
    ) {
      hanzi++;
    } else if (
      (code >= 0x3000 && code <= 0x303f) || // CJK symbols and punctuation
      (code >= 0xff01 && code <= 0xff0f) ||
      (code >= 0xff1a && code <= 0xff20) ||
      (code >= 0xff3b && code <= 0xff40) ||
      (code >= 0xff5b && code <= 0xff65)
    ) {
      punct++;
    } else if (/[a-zA-Z0-9]/.test(ch)) {
      engDigits++;
    } else if (/\s/.test(ch)) {
      spaces++;
    } else {
      punct++;
    }
  }

  const noSpaces = total - spaces;
  const qianZi = Number((hanzi / 1000).toFixed(2));
  const readTime = Number((hanzi / 350).toFixed(2));
  const wordsEst = Math.round(hanzi * 0.65 + (engDigits > 0 ? engDigits / 5 : 0));

  return {
    totalCharacters: total,
    chineseHanziCharacters: hanzi,
    charactersWithoutSpaces: noSpaces,
    chineseWordsEstimate: wordsEst,
    punctuationCount: punct,
    englishAndDigits: engDigits,
    thousandCharactersCount: qianZi,
    readingTimeMinutes: readTime,
  };
}

// ==========================================
// 6. Shipping Box Size Calculator
// ==========================================
export interface ShippingBoxInput {
  length: number; // inches
  width: number;
  height: number;
  actualWeightLbs: number;
  domesticDivisor?: number; // 139 for FedEx / UPS
  uspsDivisor?: number; // 166 for USPS
}

export interface ShippingBoxResult {
  cubicInches: number;
  cubicFeet: number;
  girth: number; // 2*(W + H)
  lengthPlusGirth: number; // L + 2*(W + H)
  fedexUpsDimWeightLbs: number; // L*W*H / 139
  uspsDimWeightLbs: number; // L*W*H / 166
  billableWeightFedexUps: number;
  billableWeightUsps: number;
  isOversize: boolean; // L + 2*(W+H) > 130"
  isMaxExceeded: boolean; // L + 2*(W+H) > 165" or L > 108"
  oversizeAlert?: string;
}

export function calculateShippingBoxSize(input: ShippingBoxInput): ShippingBoxResult {
  // Sort dimensions so L >= W >= H
  const dims = [input.length, input.width, input.height].sort((a, b) => b - a);
  const L = dims[0];
  const W = dims[1];
  const H = dims[2];
  const actualW = Math.max(0.1, input.actualWeightLbs);

  const cuIn = L * W * H;
  const cuFt = cuIn / 1728;
  const girth = 2 * (W + H);
  const lengthPlusGirth = L + girth;

  const div139 = input.domesticDivisor || 139;
  const div166 = input.uspsDivisor || 166;

  const fedexDim = Math.ceil(cuIn / div139);
  const uspsDim = Math.ceil(cuIn / div166);

  const billableFedex = Math.max(Math.ceil(actualW), fedexDim);
  const billableUsps = Math.max(Math.ceil(actualW), uspsDim);

  const isOversize = lengthPlusGirth > 130;
  const isMax = lengthPlusGirth > 165 || L > 108 || actualW > 150;

  let alert: string | undefined;
  if (isMax) {
    alert = 'Exceeds standard parcel limits! Length + Girth > 165" or single side > 108". Requires LTL Freight.';
  } else if (isOversize) {
    alert = 'Carrier Large Package / Oversize surcharge applies (Length + Girth > 130").';
  }

  return {
    cubicInches: Number(cuIn.toFixed(1)),
    cubicFeet: Number(cuFt.toFixed(2)),
    girth: Number(girth.toFixed(1)),
    lengthPlusGirth: Number(lengthPlusGirth.toFixed(1)),
    fedexUpsDimWeightLbs: fedexDim,
    uspsDimWeightLbs: uspsDim,
    billableWeightFedexUps: billableFedex,
    billableWeightUsps: billableUsps,
    isOversize,
    isMaxExceeded: isMax,
    oversizeAlert: alert,
  };
}

// ==========================================
// 7. Box Packing Calculator (3D Item-in-Carton)
// ==========================================
export interface BoxPackingInput {
  containerLength: number;
  containerWidth: number;
  containerHeight: number;
  itemLength: number;
  itemWidth: number;
  itemHeight: number;
}

export interface BoxPackingResult {
  maxPackedCount: number;
  bestOrientation: {
    alongLength: number;
    alongWidth: number;
    alongHeight: number;
    itemsX: number;
    itemsY: number;
    itemsZ: number;
  };
  containerVolume: number;
  totalPackedVolume: number;
  utilizationPercent: number;
  wastedVolume: number;
}

export function calculateBoxPacking(input: BoxPackingInput): BoxPackingResult {
  const CL = Math.max(0.1, input.containerLength);
  const CW = Math.max(0.1, input.containerWidth);
  const CH = Math.max(0.1, input.containerHeight);

  const il = Math.max(0.1, input.itemLength);
  const iw = Math.max(0.1, input.itemWidth);
  const ih = Math.max(0.1, input.itemHeight);

  const containerVol = CL * CW * CH;
  const itemVol = il * iw * ih;

  // All 6 spatial permutations of the item box
  const permutations = [
    [il, iw, ih],
    [il, ih, iw],
    [iw, il, ih],
    [iw, ih, il],
    [ih, il, iw],
    [ih, iw, il],
  ];

  let maxCount = 0;
  let bestOrient = {
    alongLength: il,
    alongWidth: iw,
    alongHeight: ih,
    itemsX: 0,
    itemsY: 0,
    itemsZ: 0,
  };

  for (const [dx, dy, dz] of permutations) {
    const nx = Math.floor(CL / dx);
    const ny = Math.floor(CW / dy);
    const nz = Math.floor(CH / dz);
    const count = nx * ny * nz;

    if (count > maxCount) {
      maxCount = count;
      bestOrient = {
        alongLength: dx,
        alongWidth: dy,
        alongHeight: dz,
        itemsX: nx,
        itemsY: ny,
        itemsZ: nz,
      };
    }
  }

  const packedVol = maxCount * itemVol;
  const util = containerVol > 0 ? (packedVol / containerVol) * 100 : 0;
  const wasted = Math.max(0, containerVol - packedVol);

  return {
    maxPackedCount: maxCount,
    bestOrientation: bestOrient,
    containerVolume: Number(containerVol.toFixed(2)),
    totalPackedVolume: Number(packedVol.toFixed(2)),
    utilizationPercent: Number(util.toFixed(1)),
    wastedVolume: Number(wasted.toFixed(2)),
  };
}

// ==========================================
// 8. Moving & Packing Calculator
// ==========================================
export interface MovingPackingInput {
  homeType: 'studio' | '1bed' | '2bed' | '3bed' | '4bed+';
  numberOfPeople: number;
  lifestyleDensity: 'minimalist' | 'average' | 'collector';
}

export interface MovingPackingResult {
  smallBoxes: number;
  mediumBoxes: number;
  largeBoxes: number;
  wardrobeBoxes: number;
  totalBoxes: number;
  tapeRolls: number;
  bubbleWrapFeet: number;
  packingPaperLbs: number;
  estimatedTruckSize: string;
}

export function calculateMovingPacking(input: MovingPackingInput): MovingPackingResult {
  const people = Math.max(1, input.numberOfPeople);
  let densityMult = 1.0;
  if (input.lifestyleDensity === 'minimalist') densityMult = 0.75;
  if (input.lifestyleDensity === 'collector') densityMult = 1.4;

  let baseSmall = 10;
  let baseMed = 10;
  let baseLarge = 5;
  let baseWard = 2;
  let truck = '10 ft Cargo Van';

  switch (input.homeType) {
    case 'studio':
      baseSmall = 12; baseMed = 12; baseLarge = 6; baseWard = 2; truck = '10–12 ft Moving Truck';
      break;
    case '1bed':
      baseSmall = 18; baseMed = 20; baseLarge = 10; baseWard = 3; truck = '15 ft Moving Truck';
      break;
    case '2bed':
      baseSmall = 28; baseMed = 32; baseLarge = 18; baseWard = 5; truck = '17–20 ft Moving Truck';
      break;
    case '3bed':
      baseSmall = 42; baseMed = 48; baseLarge = 28; baseWard = 7; truck = '24–26 ft Moving Truck';
      break;
    case '4bed+':
      baseSmall = 58; baseMed = 65; baseLarge = 40; baseWard = 10; truck = '26 ft Moving Truck + Trailer';
      break;
  }

  const peopleFactor = 1 + (people - 1) * 0.25;
  const factor = densityMult * peopleFactor;

  const small = Math.round(baseSmall * factor);
  const med = Math.round(baseMed * factor);
  const large = Math.round(baseLarge * factor);
  const ward = Math.round(baseWard * factor);
  const total = small + med + large + ward;

  const tape = Math.max(2, Math.ceil(total / 8));
  const bubble = Math.round(total * 4.5);
  const paper = Math.round(total * 0.75);

  return {
    smallBoxes: small,
    mediumBoxes: med,
    largeBoxes: large,
    wardrobeBoxes: ward,
    totalBoxes: total,
    tapeRolls: tape,
    bubbleWrapFeet: bubble,
    packingPaperLbs: paper,
    estimatedTruckSize: truck,
  };
}

// ==========================================
// 9. ASQ Calculator (Ages & Stages Questionnaires)
// ==========================================
export interface AsqInput {
  mode: 'asq3_age' | 'aq10_scorer';
  // ASQ-3 Age inputs
  birthDate?: string; // YYYY-MM-DD
  screeningDate?: string;
  gestationalWeeks?: number; // e.g. 34 for premature
  // AQ-10 Scorer input
  aq10Score?: number; // 0 to 10
}

export interface AsqResult {
  mode: 'asq3_age' | 'aq10_scorer';
  // ASQ-3 Outputs
  chronologicalAgeMonths?: number;
  adjustedAgeMonths?: number;
  isPrematureAdjusted?: boolean;
  recommendedInterval?: number; // 2, 4, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54, 60
  intervalWindow?: string;
  // AQ-10 Outputs
  aqScore?: number;
  aqReferralRecommended?: boolean;
  aqInterpretation?: string;
}

export function calculateAsq(input: AsqInput): AsqResult {
  if (input.mode === 'aq10_scorer') {
    const score = Math.max(0, Math.min(10, input.aq10Score || 0));
    const referral = score >= 6;
    return {
      mode: 'aq10_scorer',
      aqScore: score,
      aqReferralRecommended: referral,
      aqInterpretation: referral
        ? 'Score of 6 or higher suggests a referral for a comprehensive multidisciplinary autism assessment may be warranted (NICE clinical guideline CG142).'
        : 'Score is below the clinical referral threshold of 6.',
    };
  }

  // ASQ-3 Age Calculation
  const bDate = input.birthDate ? new Date(input.birthDate) : new Date();
  const sDate = input.screeningDate ? new Date(input.screeningDate) : new Date();

  const diffMs = sDate.getTime() - bDate.getTime();
  const chronoDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const chronoMonths = chronoDays / 30.4375;

  const gw = input.gestationalWeeks !== undefined ? input.gestationalWeeks : 40;
  let adjustedMonths = chronoMonths;
  let isPremature = false;

  // ASQ-3 rule: adjust for prematurity (< 37 weeks) if child is under 24 months
  if (gw < 37 && chronoMonths < 24) {
    const prematureDays = (40 - gw) * 7;
    const adjustedDays = Math.max(0, chronoDays - prematureDays);
    adjustedMonths = adjustedDays / 30.4375;
    isPremature = true;
  }

  // ASQ-3 Screening intervals
  const intervals = [2, 4, 6, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36, 42, 48, 54, 60];
  let chosenInterval = intervals[0];
  let minDiff = Infinity;

  for (const interval of intervals) {
    const diff = Math.abs(adjustedMonths - interval);
    if (diff < minDiff) {
      minDiff = diff;
      chosenInterval = interval;
    }
  }

  return {
    mode: 'asq3_age',
    chronologicalAgeMonths: Number(chronoMonths.toFixed(1)),
    adjustedAgeMonths: Number(adjustedMonths.toFixed(1)),
    isPrematureAdjusted: isPremature,
    recommendedInterval: chosenInterval,
    intervalWindow: `ASQ-3 ${chosenInterval}-Month Questionnaire (Administer within standard administration window).`,
  };
}

// ==========================================
// 10. Age Difference Calculator
// ==========================================
export interface AgeDifferenceInput {
  birthDate1: string; // YYYY-MM-DD
  birthDate2: string;
}

export interface AgeDifferenceResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
  olderPerson: 'Person 1' | 'Person 2' | 'Same age';
  halfAgePlusSevenCheck: {
    olderPersonMinPartnerAge: number;
    youngerPersonAge: number;
    meetsSocialNorm: boolean;
    explanation: string;
  };
  ageRatio: number;
}

export function calculateAgeDifference(input: AgeDifferenceInput): AgeDifferenceResult {
  const d1 = new Date(input.birthDate1);
  const d2 = new Date(input.birthDate2);

  const [olderDate, youngerDate, olderLabel] =
    d1.getTime() <= d2.getTime()
      ? [d1, d2, d1.getTime() === d2.getTime() ? 'Same age' : 'Person 1']
      : [d2, d1, 'Person 2'];

  const diffMs = youngerDate.getTime() - olderDate.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = totalDays * 24;

  let y = youngerDate.getFullYear() - olderDate.getFullYear();
  let m = youngerDate.getMonth() - olderDate.getMonth();
  let d = youngerDate.getDate() - olderDate.getDate();

  if (d < 0) {
    m--;
    const prevMonth = new Date(youngerDate.getFullYear(), youngerDate.getMonth(), 0);
    d += prevMonth.getDate();
  }
  if (m < 0) {
    y--;
    m += 12;
  }

  // Current ages
  const now = new Date();
  const olderAgeYears = (now.getTime() - olderDate.getTime()) / (365.25 * 24 * 3600 * 1000);
  const youngerAgeYears = (now.getTime() - youngerDate.getTime()) / (365.25 * 24 * 3600 * 1000);

  const minPartnerAge = Math.floor(olderAgeYears / 2) + 7;
  const meetsRule = youngerAgeYears >= minPartnerAge;
  const ratio = youngerAgeYears > 0 ? olderAgeYears / youngerAgeYears : 1;

  return {
    years: Math.max(0, y),
    months: Math.max(0, m),
    days: Math.max(0, d),
    totalDays,
    totalWeeks,
    totalHours,
    olderPerson: olderLabel as any,
    halfAgePlusSevenCheck: {
      olderPersonMinPartnerAge: minPartnerAge,
      youngerPersonAge: Math.floor(youngerAgeYears),
      meetsSocialNorm: meetsRule,
      explanation: meetsRule
        ? `Partner age (${Math.floor(youngerAgeYears)}) is at or above the "Half-your-age plus 7" threshold (${minPartnerAge}).`
        : `Partner age (${Math.floor(youngerAgeYears)}) is below the socially accepted threshold (${minPartnerAge}).`,
    },
    ageRatio: Number(ratio.toFixed(2)),
  };
}

// ==========================================
// 11. Video Speed Calculator
// ==========================================
export interface VideoSpeedInput {
  hours: number;
  minutes: number;
  seconds: number;
  playbackSpeed: number; // e.g. 1.25, 1.5, 2.0
}

export interface VideoSpeedResult {
  originalSeconds: number;
  originalFormatted: string;
  playbackSpeed: number;
  newSeconds: number;
  newFormatted: string;
  timeSavedSeconds: number;
  timeSavedFormatted: string;
  percentageSaved: number;
  comparisonTable: {
    speed: number;
    formattedDuration: string;
    formattedTimeSaved: string;
  }[];
}

function formatDuration(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  if (h > 0) {
    return `${h}h ${m}m ${s}s`;
  }
  return `${m}m ${s}s`;
}

export function calculateVideoSpeed(input: VideoSpeedInput): VideoSpeedResult {
  const origSec = input.hours * 3600 + input.minutes * 60 + input.seconds;
  const speed = Math.max(0.1, input.playbackSpeed);

  const newSec = origSec / speed;
  const savedSec = Math.max(0, origSec - newSec);
  const pct = speed > 1 ? ((speed - 1) / speed) * 100 : 0;

  const speeds = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0];
  const table = speeds.map(s => {
    const sSec = origSec / s;
    const diff = origSec - sSec;
    return {
      speed: s,
      formattedDuration: formatDuration(sSec),
      formattedTimeSaved: diff >= 0 ? formatDuration(diff) : `+${formatDuration(Math.abs(diff))}`,
    };
  });

  return {
    originalSeconds: origSec,
    originalFormatted: formatDuration(origSec),
    playbackSpeed: speed,
    newSeconds: Math.round(newSec),
    newFormatted: formatDuration(newSec),
    timeSavedSeconds: Math.round(savedSec),
    timeSavedFormatted: formatDuration(savedSec),
    percentageSaved: Number(pct.toFixed(1)),
    comparisonTable: table,
  };
}
