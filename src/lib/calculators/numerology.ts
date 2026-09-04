/**
 * Comprehensive Numerology & Twin Flame Calculation Engine
 * Pythagorean system & Western Numerology standards
 */

export const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
};

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U', 'Y']);

/**
 * Reduce a number to a single digit 1-9, optionally preserving Master Numbers (11, 22, 33)
 */
export function reduceNumber(n: number, keepMaster: boolean = true): number {
  if (n <= 0) return 0;
  while (n > 9) {
    if (keepMaster && (n === 11 || n === 22 || n === 33)) {
      return n;
    }
    const sum = n
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    n = sum;
  }
  return n;
}

/**
 * 1. Life Path Number Calculator
 */
export interface LifePathResult {
  number: number;
  isMaster: boolean;
  archetype: string;
  keyword: string;
  description: string;
  strengths: string[];
  challenges: string[];
  careers: string[];
}

const LIFE_PATH_DATA: Record<number, { archetype: string; keyword: string; description: string; strengths: string[]; challenges: string[]; careers: string[] }> = {
  1: {
    archetype: 'The Leader & Pioneer',
    keyword: 'Independence, Originality, Ambition',
    description: 'Life Path 1 individuals are natural innovators driven by self-reliance, leadership, and unwavering determination.',
    strengths: ['Inventive problem-solver', 'Decisive visionary', 'Self-motivated initiative'],
    challenges: ['Impatience', 'Over-competitiveness', 'Difficulty delegating'],
    careers: ['Entrepreneur', 'CEO / Executive', 'Inventor', 'Creative Director', 'Solo Consultant'],
  },
  2: {
    archetype: 'The Diplomat & Peacemaker',
    keyword: 'Harmony, Intuition, Cooperation',
    description: 'Life Path 2 souls thrive in collaboration, emotional intelligence, peacemaking, and deep interpersonal connection.',
    strengths: ['Empathetic listener', 'Gifted mediator', 'Tactful and diplomatic'],
    challenges: ['Oversensitivity', 'Conflict avoidance', 'Indecision'],
    careers: ['Diplomat', 'Counselor', 'Human Resources Director', 'Mediator', 'Architect of Partnerships'],
  },
  3: {
    archetype: 'The Creative Communicator',
    keyword: 'Self-Expression, Optimism, Artistry',
    description: 'Life Path 3 radiates joy, imagination, and magnetic communication through words, art, performance, and design.',
    strengths: ['Charismatic storyteller', 'Infectious optimism', 'Limitless artistic imagination'],
    challenges: ['Scattered focus', 'Superficial distractions', 'Mood volatility'],
    careers: ['Author / Journalist', 'Actor / Entertainer', 'Marketing Strategist', 'Graphic Designer', 'Motivational Speaker'],
  },
  4: {
    archetype: 'The Master Builder & Strategist',
    keyword: 'Structure, Loyalty, Practicality',
    description: 'Life Path 4 is grounded, meticulous, and devoted to constructing lasting foundations through relentless discipline.',
    strengths: ['Unshakable dependability', 'Organizational genius', 'Pragmatic execution'],
    challenges: ['Rigidity', 'Reluctance to change', 'Micromanagement'],
    careers: ['Civil Engineer', 'Software Architect', 'Operations Officer', 'Financial Planner', 'Project Manager'],
  },
  5: {
    archetype: 'The Free Spirit & Explorer',
    keyword: 'Freedom, Adaptability, Dynamic Change',
    description: 'Life Path 5 embraces transformation, diverse cultures, progressive ideas, and sensory adventure without limits.',
    strengths: ['Quick-witted adaptability', 'Persuasive communicator', 'Resourceful problem solver'],
    challenges: ['Restlessness', 'Impulsivity', 'Inconsistency'],
    careers: ['Travel Journalist', 'PR Specialist', 'Tech Evangelist', 'Foreign Correspondent', 'Sales Executive'],
  },
  6: {
    archetype: 'The Nurturer & Protector',
    keyword: 'Responsibility, Healing, Community',
    description: 'Life Path 6 is driven by unconditional service, domestic harmony, aesthetic beauty, and caring for others.',
    strengths: ['Compassionate protector', 'Natural mentor', 'Exquisite eye for beauty and balance'],
    challenges: ['Perfectionism', 'Martyr complex', 'Meddling in others affairs'],
    careers: ['Physician / Nurse', 'Educator', 'Interior Designer', 'Family Counselor', 'Community Organizer'],
  },
  7: {
    archetype: 'The Seeker & Philosopher',
    keyword: 'Truth, Mysticism, Analytical Depth',
    description: 'Life Path 7 investigates the profound mysteries of existence, combining rigorous analysis with deep spiritual insight.',
    strengths: ['Acute analytical mind', 'Spiritual intuition', 'Intellectual integrity'],
    challenges: ['Cynicism', 'Emotional detachment', 'Secretiveness'],
    careers: ['Data Scientist', 'Philosopher', 'Research Scientist', 'Investigator', 'Psychologist'],
  },
  8: {
    archetype: 'The Executive & Powerhouse',
    keyword: 'Abundance, Authority, Material Mastery',
    description: 'Life Path 8 masters the material realm through organizational vision, financial acumen, and executive command.',
    strengths: ['Strategic executive command', 'Financial acumen', 'Resilient tenacity'],
    challenges: ['Workaholism', 'Materialistic fixation', 'Intolerance of inefficiency'],
    careers: ['Investment Banker', 'Corporate Attorney', 'Real Estate Mogul', 'Business Founder', 'Venture Capitalist'],
  },
  9: {
    archetype: 'The Universal Humanitarian',
    keyword: 'Wisdom, Altruism, Global Vision',
    description: 'Life Path 9 embodies selfless compassion, universal awareness, artistic wisdom, and devotion to global betterment.',
    strengths: ['Broad humanitarian perspective', 'Creative versatility', 'Deeply empathetic'],
    challenges: ['Emotional aloofness', 'Resentment of unreturned kindness', 'Holding onto past grief'],
    careers: ['Human Rights Advocate', 'Environmentalist', 'Artist / Filmmaker', 'Nonprofit Founder', 'Philanthropist'],
  },
  11: {
    archetype: 'The Spiritual Messenger (Master 11)',
    keyword: 'Illumination, Psychic Vision, Inspiration',
    description: 'Master Number 11 carries high-frequency spiritual intuition, illuminating consciousness and inspiring humanity.',
    strengths: ['Profound clairvoyant intuition', 'Inspirational presence', 'Visionary ideals'],
    challenges: ['Nervous tension', 'Self-doubt under intense energetic pressure', 'Overwhelm'],
    careers: ['Spiritual Teacher', 'Visionary Author', 'Psychologist', 'Inventive Technologist', 'Philosophical Leader'],
  },
  22: {
    archetype: 'The Master Architect (Master 22)',
    keyword: 'Monumental Manifestation, Pragmatic Genius',
    description: 'Master Number 22 turns lofty spiritual ideals into massive, enduring physical and systemic structures that benefit mankind.',
    strengths: ['Unmatched organizational scale', 'Translates vision to concrete reality', 'Global impact'],
    challenges: ['Fear of failure with immense potential', 'Crushing pressure of high expectations'],
    careers: ['International Architect', 'Global Infrastructure Leader', 'Statesperson', 'Systemic Reformer'],
  },
  33: {
    archetype: 'The Master Guide & Healer (Master 33)',
    keyword: 'Selfless Devotion, Universal Healing, Cosmic Love',
    description: 'Master Number 33 embodies Christ-consciousness love, lifting human suffering through selfless service and wisdom.',
    strengths: ['Universal empathy', 'Profound teaching gift', 'Transformative healing aura'],
    challenges: ['Carrying the emotional weight of the world', 'Neglecting personal needs'],
    careers: ['World Humanitarian Leader', 'Holistic Healer', 'Spiritual Luminary', 'Master Educator'],
  },
};

export function calculateLifePath(birthDateStr: string): LifePathResult {
  const parts = birthDateStr.split('-');
  if (parts.length !== 3) {
    return {
      number: 1,
      isMaster: false,
      ...LIFE_PATH_DATA[1],
    };
  }

  const [yearStr, monthStr, dayStr] = parts;
  const month = parseInt(monthStr, 10) || 1;
  const day = parseInt(dayStr, 10) || 1;
  const year = parseInt(yearStr, 10) || 2000;

  const mReduced = reduceNumber(month, true);
  const dReduced = reduceNumber(day, true);
  const yReduced = reduceNumber(
    year
      .toString()
      .split('')
      .reduce((a, b) => a + parseInt(b, 10), 0),
    true
  );

  const total = reduceNumber(mReduced + dReduced + yReduced, true);
  const data = LIFE_PATH_DATA[total] || LIFE_PATH_DATA[reduceNumber(total, false)] || LIFE_PATH_DATA[1];

  return {
    number: total,
    isMaster: total === 11 || total === 22 || total === 33,
    ...data,
  };
}

/**
 * 2. Sun Number Calculator
 * Month + Day reduced to 1-9 (never master numbers)
 */
export function calculateSunNumber(month: number, day: number): {
  number: number;
  archetype: string;
  changeStyle: string;
  traits: string[];
} {
  const m = Math.max(1, Math.min(12, month || 1));
  const d = Math.max(1, Math.min(31, day || 1));
  const sum = m + d;
  const num = reduceNumber(sum, false); // strictly 1-9

  const SUN_DATA: Record<number, { archetype: string; changeStyle: string; traits: string[] }> = {
    1: {
      archetype: 'The Trailblazer',
      changeStyle: 'Faces upheaval head-on with immediate, bold initiative. Thrives when in total control.',
      traits: ['Independent', 'Proactive', 'Self-reliant', 'Courageous'],
    },
    2: {
      archetype: 'The Adapter & Peacemaker',
      changeStyle: 'Absorbs unexpected shifts with patience and emotional tact. Seeks harmony above all.',
      traits: ['Intuitive', 'Diplomatic', 'Gentle', 'Cooperative'],
    },
    3: {
      archetype: 'The Resilient Optimist',
      changeStyle: 'Uses humor, creativity, and mental agility to navigate disruptions and inspire others.',
      traits: ['Expressive', 'Enthusiastic', 'Flexible', 'Charismatic'],
    },
    4: {
      archetype: 'The Pillar of Strength',
      changeStyle: 'Methodically breaks down chaotic events into orderly steps. Prefers deliberate planning.',
      traits: ['Stable', 'Practical', 'Meticulous', 'Unshakable'],
    },
    5: {
      archetype: 'The Chameleon & Pioneer',
      changeStyle: 'Actually welcomes change! Sees crisis as an exciting doorway to new freedom and exploration.',
      traits: ['Dynamic', 'Versatile', 'Fearless', 'Curious'],
    },
    6: {
      archetype: 'The Sanctuary Caregiver',
      changeStyle: 'Shields family and loved ones first. Restores emotional security and community support.',
      traits: ['Supportive', 'Responsible', 'Empathetic', 'Protective'],
    },
    7: {
      archetype: 'The Contemplative Sage',
      changeStyle: 'Withdraws to analyze core facts and spiritual meaning before formulating a measured response.',
      traits: ['Analytical', 'Insightful', 'Spiritual', 'Discerning'],
    },
    8: {
      archetype: 'The Strategic General',
      changeStyle: 'Takes command of resources and logistics. Turns disruptions into financial or leadership victories.',
      traits: ['Authoritative', 'Resourceful', 'Focused', 'Commanding'],
    },
    9: {
      archetype: 'The Compassionate Visionary',
      changeStyle: 'Recognizes endings as natural cycles. Accepts transitions with grace, detachment, and wisdom.',
      traits: ['Humanitarian', 'Wise', 'Generous', 'Transcendent'],
    },
  };

  return {
    number: num,
    ...(SUN_DATA[num] || SUN_DATA[1]),
  };
}

/**
 * 3. Attitude Number Calculator (Achievement Number)
 * Month + Day reduced (master numbers 11 and 22 recognized)
 */
export function calculateAttitudeNumber(month: number, day: number): {
  number: number;
  archetype: string;
  firstImpression: string;
  resilienceMotto: string;
} {
  const m = Math.max(1, Math.min(12, month || 1));
  const d = Math.max(1, Math.min(31, day || 1));
  const num = reduceNumber(m + d, true);

  const ATTITUDE_DATA: Record<number, { archetype: string; firstImpression: string; resilienceMotto: string }> = {
    1: {
      archetype: 'Confident Individualist',
      firstImpression: 'Radiates authority, confidence, and zero need for external validation.',
      resilienceMotto: 'I will forge my own path and overcome any hurdle through sheer will.',
    },
    2: {
      archetype: 'Observant Harmonizer',
      firstImpression: 'Warm, approachable, perceptive, and attentive to room dynamics.',
      resilienceMotto: 'Gentle patience and strategic cooperation solve what force cannot.',
    },
    3: {
      archetype: 'Magnetic Spark',
      firstImpression: 'Vibrant, witty, and effortlessly uplifting to be around.',
      resilienceMotto: 'Optimism and authentic expression can transform any dark room.',
    },
    4: {
      archetype: 'Rock of Reliability',
      firstImpression: 'No-nonsense, steady, deeply dependable, and grounded in common sense.',
      resilienceMotto: 'One disciplined step at a time builds unshakeable security.',
    },
    5: {
      archetype: 'Spontaneous Adventurer',
      firstImpression: 'Playful, fascinating, ready to embrace the next unexpected adventure.',
      resilienceMotto: 'Change is the only constant; adaptability is my greatest superpower.',
    },
    6: {
      archetype: 'Natural Guardian',
      firstImpression: 'Generous, nurturing, attentive, and protective of those in need.',
      resilienceMotto: 'Love, responsibility, and care restore balance to every hardship.',
    },
    7: {
      archetype: 'Enigmatic Intellectual',
      firstImpression: 'Thoughtful, quiet, observational, and discerningly selective.',
      resilienceMotto: 'Truth reveals itself to those who observe with quiet discernment.',
    },
    8: {
      archetype: 'Commanding Powerhouse',
      firstImpression: 'Ambitious, results-focused, impressive, and commanding respect.',
      resilienceMotto: 'Pressure creates diamonds; challenge is fuel for material achievement.',
    },
    9: {
      archetype: 'Graceful Philanthropist',
      firstImpression: 'Charismatic, worldly, understanding, and carrying an old soul energy.',
      resilienceMotto: 'Release what no longer serves; give generously to the world.',
    },
    11: {
      archetype: 'Illuminated Empath',
      firstImpression: 'Electrifying intuition with an unmistakable aura of spiritual knowing.',
      resilienceMotto: 'Trust inner vision; intuition sees far beyond surface appearances.',
    },
    22: {
      archetype: 'Architect of Destinies',
      firstImpression: 'Quietly immense capability, practical visionary with monumental plans.',
      resilienceMotto: 'No dream is too grand when anchored by master discipline.',
    },
  };

  return {
    number: num,
    ...(ATTITUDE_DATA[num] || ATTITUDE_DATA[reduceNumber(num, false)] || ATTITUDE_DATA[1]),
  };
}

/**
 * 4. Expression Number (Destiny Number)
 * Sum of all letters in full birth name
 */
export function calculateExpressionNumber(fullName: string): {
  number: number;
  isMaster: boolean;
  archetype: string;
  calling: string;
  letterSum: number;
} {
  const clean = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  let sum = 0;
  for (const char of clean) {
    sum += PYTHAGOREAN_MAP[char] || 0;
  }
  const num = reduceNumber(sum, true);

  const EXPRESSION_DATA: Record<number, { archetype: string; calling: string }> = {
    1: { archetype: 'Pioneering Leader', calling: 'To invent, direct, and establish sovereign new realities.' },
    2: { archetype: 'Supportive Partner', calling: 'To weave harmony, elevate diplomacy, and bring balance to divided systems.' },
    3: { archetype: 'Artistic Luminary', calling: 'To inspire and uplift humanity through spoken, written, and visual creativity.' },
    4: { archetype: 'Systemic Architect', calling: 'To establish enduring structures, reliable protocols, and grounded security.' },
    5: { archetype: 'Dynamic Communicator', calling: 'To break conventional boundaries and communicate progressive freedom.' },
    6: { archetype: 'Universal Caregiver', calling: 'To cultivate beauty, justice, domestic harmony, and healing in community.' },
    7: { archetype: 'Mystic Researcher', calling: 'To uncover hidden truths, spiritual laws, and scientific breakthroughs.' },
    8: { archetype: 'Visionary Executive', calling: 'To master commerce, wield authority with integrity, and manifest abundance.' },
    9: { archetype: 'Global Benefactor', calling: 'To lead cultural and humanitarian movements that elevate all people.' },
    11: { archetype: 'Master Channel', calling: 'To act as an intuitive beacon of higher wisdom, lifting collective awareness.' },
    22: { archetype: 'Master Builder', calling: 'To manifest monumental institutions, technology, and global architecture.' },
    33: { archetype: 'Master Teacher', calling: 'To demonstrate universal love, spiritual service, and healing compassion.' },
  };

  return {
    number: num,
    isMaster: num === 11 || num === 22 || num === 33,
    letterSum: sum,
    ...(EXPRESSION_DATA[num] || EXPRESSION_DATA[reduceNumber(num, false)] || EXPRESSION_DATA[1]),
  };
}

/**
 * 5. Soul Urge Number (Heart's Desire)
 * Sum of vowels (A, E, I, O, U, Y)
 */
export function calculateSoulUrgeNumber(fullName: string): {
  number: number;
  isMaster: boolean;
  archetype: string;
  heartDesire: string;
  vowelsFound: string[];
} {
  const clean = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  const vowels: string[] = [];
  let sum = 0;

  for (const char of clean) {
    if (VOWELS.has(char)) {
      vowels.push(char);
      sum += PYTHAGOREAN_MAP[char] || 0;
    }
  }

  const num = reduceNumber(sum, true);

  const SOUL_URGE_DATA: Record<number, { archetype: string; heartDesire: string }> = {
    1: { archetype: 'Self-Determination', heartDesire: 'Craves total independence, recognition for originality, and freedom to lead without interference.' },
    2: { archetype: 'Intimate Connection', heartDesire: 'Yearns for profound emotional safety, deep romantic partnership, and serene balance.' },
    3: { archetype: 'Joyful Expression', heartDesire: 'Hungers for spontaneous laughter, creative freedom, artistic validation, and loving applause.' },
    4: { archetype: 'Security & Order', heartDesire: 'Seeks absolute certainty, a secure sanctuary, loyal friends, and predictable dependability.' },
    5: { archetype: 'Unbounded Adventure', heartDesire: 'Longs for sensory exploration, freedom from domestic routine, travel, and novel thrills.' },
    6: { archetype: 'Nurturing Devotion', heartDesire: 'Desires a loving home, a devoted family, harmonious spaces, and appreciation for personal care.' },
    7: { archetype: 'Sacred Solitude', heartDesire: 'Yearns for deep quiet, spiritual understanding, solitary contemplation, and mental peace.' },
    8: { archetype: 'Financial Empowerment', heartDesire: 'Desires respect, influence, luxury, executive mastery, and boundless financial autonomy.' },
    9: { archetype: 'Selfless Contribution', heartDesire: 'Yearns to heal global sorrow, leave a transformative legacy, and be loved universally.' },
    11: { archetype: 'Spiritual Resonance', heartDesire: 'Desires transcendent union, spiritual illumination, and uplifting cosmic truth.' },
    22: { archetype: 'Epochal Creation', heartDesire: 'Longs to construct something enduring that benefits generations to come.' },
    33: { archetype: 'Cosmic Compassion', heartDesire: 'Desires to wipe away suffering and shower unconditional love upon humanity.' },
  };

  return {
    number: num,
    isMaster: num === 11 || num === 22 || num === 33,
    vowelsFound: vowels,
    ...(SOUL_URGE_DATA[num] || SOUL_URGE_DATA[reduceNumber(num, false)] || SOUL_URGE_DATA[1]),
  };
}

/**
 * 6. Personality Number
 * Sum of consonants
 */
export function calculatePersonalityNumber(fullName: string): {
  number: number;
  isMaster: boolean;
  archetype: string;
  socialStyle: string;
  consonantsFound: string[];
} {
  const clean = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  const consonants: string[] = [];
  let sum = 0;

  for (const char of clean) {
    if (!VOWELS.has(char)) {
      consonants.push(char);
      sum += PYTHAGOREAN_MAP[char] || 0;
    }
  }

  const num = reduceNumber(sum, true);

  const PERSONALITY_DATA: Record<number, { archetype: string; socialStyle: string }> = {
    1: { archetype: 'The Dominant Presence', socialStyle: 'Presents as strong, dynamic, modern, and in charge. Commands room attention without trying.' },
    2: { archetype: 'The Approachable Ally', socialStyle: 'Presents as polite, peaceful, impeccably tailored, and gentle. Makes others feel instantly safe.' },
    3: { archetype: 'The Charming Host', socialStyle: 'Presents with vibrant color, sparkling humor, trendsetting style, and warm conversational flair.' },
    4: { archetype: 'The Grounded Professional', socialStyle: 'Presents as clean, dignified, structured, practical, and highly credible.' },
    5: { archetype: 'The Magnetic Trendsetter', socialStyle: 'Presents as charismatic, fashionable, edgy, and effortlessly youthful.' },
    6: { archetype: 'The Warm Benefactor', socialStyle: 'Presents with homey elegance, comforting presence, open arms, and warm hospitality.' },
    7: { archetype: 'The Mystical Scholar', socialStyle: 'Presents as composed, enigmatic, dignified, and pleasantly aloof.' },
    8: { archetype: 'The Elite Leader', socialStyle: 'Presents with regal polish, luxury accents, executive bearing, and confident gravitas.' },
    9: { archetype: 'The Cosmopolitan Visionary', socialStyle: 'Presents as worldly, cultured, broad-minded, and universally magnetic.' },
    11: { archetype: 'The Luminous Mystic', socialStyle: 'Presents with ethereal presence, striking eyes, and an aura of quiet spiritual depth.' },
    22: { archetype: 'The Powerhouse Architect', socialStyle: 'Presents with grounded authority and understated confidence capable of moving mountains.' },
  };

  return {
    number: num,
    isMaster: num === 11 || num === 22,
    consonantsFound: consonants,
    ...(PERSONALITY_DATA[num] || PERSONALITY_DATA[reduceNumber(num, false)] || PERSONALITY_DATA[1]),
  };
}

/**
 * 7. Balance Number Calculator
 * Sum of initials of each word in the full name, reduced to 1-9
 */
export function calculateBalanceNumber(fullName: string): {
  number: number;
  initials: string[];
  crisisResponse: string;
  calmingAdvice: string;
} {
  const words = fullName.trim().toUpperCase().split(/\s+/).filter(Boolean);
  const initials: string[] = [];
  let sum = 0;

  for (const w of words) {
    const char = w[0];
    if (char && PYTHAGOREAN_MAP[char]) {
      initials.push(char);
      sum += PYTHAGOREAN_MAP[char];
    }
  }

  const num = reduceNumber(sum, false); // strictly 1-9

  const BALANCE_DATA: Record<number, { crisisResponse: string; calmingAdvice: string }> = {
    1: {
      crisisResponse: 'You tend to withdraw and demand solitary control, often rejecting help when stressed.',
      calmingAdvice: 'Acknowledge your vulnerability. Leading does not mean enduring crisis alone.',
    },
    2: {
      crisisResponse: 'You become overly accommodating or anxious about conflict, absorbing others distress.',
      calmingAdvice: 'Set firm emotional boundaries. Restore equilibrium with quiet self-care before mediating.',
    },
    3: {
      crisisResponse: 'You may mask emotional pain with excessive banter, over-dramatization, or scattered denial.',
      calmingAdvice: 'Channel turbulent emotions into private writing or art instead of nervous outward deflection.',
    },
    4: {
      crisisResponse: 'You cling to rigid routines and obsess over minute details to simulate order in chaos.',
      calmingAdvice: 'Remember that flexibility is not defeat. Breathe deeply and focus solely on what is within control.',
    },
    5: {
      crisisResponse: 'You impulsively seek immediate escape, sensory distraction, or radical sudden changes.',
      calmingAdvice: 'Pause before making reactive life pivots. Ground your physical body in nature or movement.',
    },
    6: {
      crisisResponse: 'You worry excessively and try to solve everyone else problems while ignoring your own.',
      calmingAdvice: 'Step back from micromanaging. Accept that others must navigate their own spiritual lessons.',
    },
    7: {
      crisisResponse: 'You isolate yourself completely into cynical, cold silence and intellectual detachment.',
      calmingAdvice: 'Reach out to a trusted confidant. Emotional openness is wisdom, not weakness.',
    },
    8: {
      crisisResponse: 'You double down on work, aggressive financial measures, or asserting control over others.',
      calmingAdvice: 'True power is anchored in serenity, not frantic control. Surrender outcomes to patience.',
    },
    9: {
      crisisResponse: 'You feel intensely disappointed in humanity or fall into feelings of abandonment.',
      calmingAdvice: 'Practice healthy emotional forgiveness. Grieve losses cleanly so fresh joy can enter.',
    },
  };

  return {
    number: num,
    initials,
    ...(BALANCE_DATA[num] || BALANCE_DATA[1]),
  };
}

/**
 * 8. Maturity Number Calculator (Realization Number)
 * Life Path + Expression Number
 */
export function calculateMaturityNumber(birthDateStr: string, fullName: string): {
  number: number;
  isMaster: boolean;
  lifePathNumber: number;
  expressionNumber: number;
  midlifeGift: string;
  legacyFocus: string;
} {
  const lp = calculateLifePath(birthDateStr).number;
  const exp = calculateExpressionNumber(fullName).number;
  const sum = lp + exp;
  const num = reduceNumber(sum, true);

  const MATURITY_DATA: Record<number, { midlifeGift: string; legacyFocus: string }> = {
    1: { midlifeGift: 'Unshakeable confidence and sovereign leadership in your late 30s and 40s.', legacyFocus: 'Founding independent enterprises and mentoring the next generation of pioneers.' },
    2: { midlifeGift: 'Deepened intuition, peaceful diplomacy, and masterful interpersonal grace.', legacyFocus: 'Healing fractured communities and cultivating sacred partnerships.' },
    3: { midlifeGift: 'Unhindered creative mastery, wit, and expressive public storytelling.', legacyFocus: 'Publishing, creating joyful public art, and awakening imagination.' },
    4: { midlifeGift: 'Immense organizational mastery, financial stability, and respected reliability.', legacyFocus: 'Building enduring family heritage, foundations, and robust civic institutions.' },
    5: { midlifeGift: 'Effortless adaptability, freedom from outdated social expectations, and travel.', legacyFocus: 'Championing civil liberties, cross-cultural understanding, and progressive change.' },
    6: { midlifeGift: 'Mastery of domestic grace, service, community leadership, and healing advice.', legacyFocus: 'Strengthening families, counseling youth, and creating sanctuaries of wellness.' },
    7: { midlifeGift: 'Profound philosophical clarity, spiritual wisdom, and intellectual respect.', legacyFocus: 'Writing philosophical or scientific treatises and guiding seekers of truth.' },
    8: { midlifeGift: 'Command of high finance, executive authority, and large-scale philanthropy.', legacyFocus: 'Distributing accumulated wealth, funding hospitals or schools, and economic leadership.' },
    9: { midlifeGift: 'Universal empathy, spiritual release of petty grievances, and worldwide vision.', legacyFocus: 'Global humanitarian initiatives, cultural preservation, and environmental restoration.' },
    11: { midlifeGift: 'Illuminated spiritual mentorship and transformative intuitive counseling.', legacyFocus: 'Awakening collective spiritual awareness and inspiring societal elevation.' },
    22: { midlifeGift: 'Unrivaled ability to construct worldwide systems that benefit millions.', legacyFocus: 'Global environmental, architectural, or social systems that outlast centuries.' },
    33: { midlifeGift: 'The golden touch of universal compassion and transcendent healing.', legacyFocus: 'Universal education, humanitarian shelters, and spiritual restoration.' },
  };

  return {
    number: num,
    isMaster: num === 11 || num === 22 || num === 33,
    lifePathNumber: lp,
    expressionNumber: exp,
    ...(MATURITY_DATA[num] || MATURITY_DATA[reduceNumber(num, false)] || MATURITY_DATA[1]),
  };
}

/**
 * 9. Lucky Colour Calculator
 */
export interface LuckyColourResult {
  lifePathNumber: number;
  primaryColor: string;
  primaryHex: string;
  secondaryColors: string[];
  powerDay: string;
  chakra: string;
  rulingPlanet: string;
  bestWearContext: string;
  avoidColor: string;
}

export function calculateLuckyColour(birthDateStr: string): LuckyColourResult {
  const lp = calculateLifePath(birthDateStr).number;
  const baseNum = reduceNumber(lp, false);

  const COLOR_DATA: Record<number, {
    primaryColor: string;
    primaryHex: string;
    secondaryColors: string[];
    powerDay: string;
    chakra: string;
    rulingPlanet: string;
    bestWearContext: string;
    avoidColor: string;
  }> = {
    1: {
      primaryColor: 'Solar Gold & Bright Yellow',
      primaryHex: '#EAB308',
      secondaryColors: ['Bright Orange', 'Warm Copper', 'Cream'],
      powerDay: 'Sunday',
      chakra: 'Solar Plexus Chakra (Personal Power & Will)',
      rulingPlanet: 'The Sun',
      bestWearContext: 'Job interviews, pitch meetings, negotiations, and launching ambitious new initiatives.',
      avoidColor: 'Dull Grey and Muddy Browns',
    },
    2: {
      primaryColor: 'Pearl White & Moon Silver',
      primaryHex: '#E2E8F0',
      secondaryColors: ['Soft Cream', 'Pale Sage Green', 'Powder Blue'],
      powerDay: 'Monday',
      chakra: 'Sacral Chakra (Intuition & Emotional Flow)',
      rulingPlanet: 'The Moon',
      bestWearContext: 'Romantic dates, collaborative meetings, mediation, and creative brainstorming.',
      avoidColor: 'Aggressive Crimson Red and Black',
    },
    3: {
      primaryColor: 'Royal Purple & Amethyst',
      primaryHex: '#9333EA',
      secondaryColors: ['Violet', 'Bright Amber', 'Rose Pink'],
      powerDay: 'Thursday',
      chakra: 'Crown & Throat Chakras (Expression & Higher Mind)',
      rulingPlanet: 'Jupiter',
      bestWearContext: 'Public speaking, theatrical performances, social celebrations, and marketing campaigns.',
      avoidColor: 'Stark Charcoal and Dark Slates',
    },
    4: {
      primaryColor: 'Electric Sapphire & Slate Blue',
      primaryHex: '#2563EB',
      secondaryColors: ['Forest Green', 'Steel Grey', 'Khaki'],
      powerDay: 'Saturday / Sunday',
      chakra: 'Root & Throat Chakras (Stability & Structure)',
      rulingPlanet: 'Uranus / Rahu',
      bestWearContext: 'Important contract signings, engineering planning, tax prep, and marathon study sessions.',
      avoidColor: 'Bright Neon Pink and Fluorescent Yellow',
    },
    5: {
      primaryColor: 'Emerald Green & Turquoise',
      primaryHex: '#10B981',
      secondaryColors: ['Mint', 'Cool Aqua', 'Liquid Silver'],
      powerDay: 'Wednesday',
      chakra: 'Heart Chakra (Adaptability & Growth)',
      rulingPlanet: 'Mercury',
      bestWearContext: 'Travel departure days, sales presentations, networking events, and public debates.',
      avoidColor: 'Dark Burnt Orange and Muddy Maroon',
    },
    6: {
      primaryColor: 'Pastel Rose & Sky Blue',
      primaryHex: '#F43F5E',
      secondaryColors: ['Peach', 'Warm Coral', 'Seafoam'],
      powerDay: 'Friday',
      chakra: 'Heart Chakra (Love, Harmony & Beauty)',
      rulingPlanet: 'Venus',
      bestWearContext: 'Weddings, counseling sessions, family reunions, and home design consultations.',
      avoidColor: 'Harsh Neon Green and Stark Black',
    },
    7: {
      primaryColor: 'Mystic Aquamarine & Sea Green',
      primaryHex: '#06B6D4',
      secondaryColors: ['Iridescent White', 'Deep Lavender', 'Smoky Quartz'],
      powerDay: 'Monday / Thursday',
      chakra: 'Third Eye Chakra (Spiritual Insight & Clairvoyance)',
      rulingPlanet: 'Neptune / Ketu',
      bestWearContext: 'Meditation retreats, deep analytical research, writing retreats, and exam days.',
      avoidColor: 'Fiery Orange and Aggressive Scarlet',
    },
    8: {
      primaryColor: 'Midnight Navy & Charcoal',
      primaryHex: '#1E293B',
      secondaryColors: ['Deep Violet', 'Dark Royal Blue', 'Obsidian Black'],
      powerDay: 'Saturday',
      chakra: 'Root Chakra (Material Security & Grounded Authority)',
      rulingPlanet: 'Saturn',
      bestWearContext: 'High-stakes board meetings, court hearings, executive negotiations, and real estate purchases.',
      avoidColor: 'Faint Pastels and Pale Yellow',
    },
    9: {
      primaryColor: 'Crimson Red & Deep Scarlet',
      primaryHex: '#DC2626',
      secondaryColors: ['Terracotta', 'Rose Gold', 'Burnt Amber'],
      powerDay: 'Tuesday',
      chakra: 'Root & Crown Chakras (Vitality & Transcendent Compassion)',
      rulingPlanet: 'Mars',
      bestWearContext: 'Charity galas, artistic unveilings, physical workouts, and community leadership rallies.',
      avoidColor: 'Dull Beige and Faded Taupe',
    },
  };

  const selected = COLOR_DATA[baseNum] || COLOR_DATA[1];

  return {
    lifePathNumber: lp,
    ...selected,
  };
}

/**
 * 10. Career Calculator (Career Numerology & Vocational Alignment)
 */
export interface CareerResult {
  vocationalNumber: number;
  archetype: string;
  topFields: string[];
  leadershipStyle: string;
  idealEnvironment: string;
  wealthVibration: string;
  actionAdvice: string;
}

export function calculateCareerNumerology(fullName: string, birthDateStr: string): CareerResult {
  const lp = calculateLifePath(birthDateStr).number;
  const exp = calculateExpressionNumber(fullName).number;
  // Blend LP and Expression for vocation
  const vocationalNumber = reduceNumber(lp + exp, true);

  const CAREER_DATA: Record<number, Omit<CareerResult, 'vocationalNumber'>> = {
    1: {
      archetype: 'The Pioneering Founder & Executive',
      topFields: ['High-Tech Startups', 'C-Suite Corporate Leadership', 'Venture Capital', 'Product Invention', 'Solo Consulting'],
      leadershipStyle: 'Authoritative, decisive, pacesetting. Leads from the front lines and demands swift execution.',
      idealEnvironment: 'Autonomous office, rapid-growth startup, or solo venture with 100% decision-making authority.',
      wealthVibration: 'Wealth is generated through bold first-mover advantage, equity ownership, and proprietary inventions.',
      actionAdvice: 'Stop waiting for permission. Package your unique perspective into a scalable venture and launch.',
    },
    2: {
      archetype: 'The Strategic Partner & Chief Diplomat',
      topFields: ['International Relations & Diplomacy', 'Executive Human Resources', 'Psychology & Counseling', 'Hospitality & Luxury Services', 'Legal Mediation'],
      leadershipStyle: 'Affiliative, empathetic, consensus-building. Fosters unbreakable loyalty and psychological safety.',
      idealEnvironment: 'Collaborative, serene, aesthetically pleasing workspace with mutual trust and minimal toxic politics.',
      wealthVibration: 'Wealth compounds through trusted partnerships, repeat client loyalty, and high-value joint ventures.',
      actionAdvice: 'Partner with an action-oriented visionary who values your unmatched negotiation and peacemaking gifts.',
    },
    3: {
      archetype: 'The Creative Influencer & Media Producer',
      topFields: ['Film, Television & Digital Media', 'Brand Strategy & Creative Direction', 'Public Speaking & Authorship', 'Industrial Design', 'Hospitality & Entertainment'],
      leadershipStyle: 'Charismatic, visionary, motivational. Inspires teams through infectious optimism and storytelling.',
      idealEnvironment: 'Lively, collaborative creative studio, remote nomad setup, or stage with maximum self-expression.',
      wealthVibration: 'Wealth flows from intellectual property, royalties, public visibility, and viral storytelling.',
      actionAdvice: 'Pick one creative medium to master to completion before branching out into multiple side ventures.',
    },
    4: {
      archetype: 'The Master Operator & Infrastructure Architect',
      topFields: ['Software Engineering Architecture', 'Civil Construction & Real Estate', 'Supply Chain & Logistics Management', 'Auditing & Forensic Accounting', 'Corporate COO'],
      leadershipStyle: 'Coaching, systematic, rigorous. Establishes ironclad protocols, quality standards, and dependable pipelines.',
      idealEnvironment: 'Structured corporate headquarters, methodical research engineering lab, or large-scale construction site.',
      wealthVibration: 'Wealth compounds steadily through long-term real estate, blue-chip investments, and bulletproof operational equity.',
      actionAdvice: 'Your attention to detail is world-class. Learn to delegate routine execution so you can design broader systems.',
    },
    5: {
      archetype: 'The International Envoy & Growth Catalyst',
      topFields: ['Global Sales & Business Development', 'Travel Tech & Aviation', 'Crisis Public Relations', 'Digital Nomad Commerce', 'Investigative Journalism'],
      leadershipStyle: 'Democratic, energetic, flexible. Empowers team agility and pivots instantly when market conditions shift.',
      idealEnvironment: 'Constantly changing environment, international travel, or fully remote digital workspace.',
      wealthVibration: 'Wealth spikes through commission, performance multipliers, cross-border arbitrage, and trend anticipation.',
      actionAdvice: 'Channel your restless energy into solving high-stakes, fast-moving market problems that terrify slower competitors.',
    },
    6: {
      archetype: 'The Community Pillar & Wellness Director',
      topFields: ['Healthcare Administration & Medicine', 'Educational Leadership', 'Interior Architecture & Sustainable Design', 'Nonprofit & Social Enterprise', 'Life & Family Coaching'],
      leadershipStyle: 'Servant leadership, maternal/paternal protection, ethical stewardship. Fosters deep community roots.',
      idealEnvironment: 'Warm, beautiful clinic, school, community center, or home-based executive advisory practice.',
      wealthVibration: 'Wealth grows through service-based enterprises, reputable community standing, and long-term client care.',
      actionAdvice: 'Charge market rates for your empathy. Valuing your gifts financially enables you to help even more people sustainably.',
    },
    7: {
      archetype: 'The Chief Scientist & Strategic Analyst',
      topFields: ['Artificial Intelligence & Data Science', 'Biotech & Clinical Research', 'Cybersecurity & Intelligence Analysis', 'Philosophy & University Professorship', 'Specialized Psychiatry'],
      leadershipStyle: 'Thought leadership, quiet intellectual authority. Leads through deep expertise and uncompromising quality.',
      idealEnvironment: 'Quiet private office, academic laboratory, think tank, or secluded high-tech research library.',
      wealthVibration: 'Wealth is earned through specialized patents, niche consulting retainers, and proprietary analytical breakthroughs.',
      actionAdvice: 'Bridge the gap between your brilliant theoretical insights and everyday commercial applications.',
    },
    8: {
      archetype: 'The Commercial Titan & Venture Executive',
      topFields: ['Private Equity & Investment Banking', 'Real Estate Development & Commercial Brokerage', 'Corporate Law & Mergers', 'Industrial Manufacturing', 'Franchise Expansion'],
      leadershipStyle: 'Commanding, strategic, performance-driven. Sets aggressive targets and distributes handsome rewards for victory.',
      idealEnvironment: 'High-rise executive boardroom, trading floor, or commanding corporate office with global reach.',
      wealthVibration: 'Massive wealth generation through asset accumulation, debt leverage, corporate buyouts, and institutional capital.',
      actionAdvice: 'Balance your pursuit of financial domination with ethical stewardship and genuine mentorship.',
    },
    9: {
      archetype: 'The Global Philanthropist & Cultural Director',
      topFields: ['International Non-Governmental Organizations (NGOs)', 'Environmental Policy & Sustainable Energy', 'Fine Arts & Museum Directorship', 'Civil Rights Advocacy', 'Global Public Health'],
      leadershipStyle: 'Inspirational, transformational, altruistic. Rallies disparate groups around a transcendent moral mission.',
      idealEnvironment: 'International field headquarters, United Nations corridors, artistic foundation, or cultural center.',
      wealthVibration: 'Wealth arrives through broad public patronage, grants, humanitarian endowments, and legacy bequests.',
      actionAdvice: 'Remember that staying financially prosperous is not selfish; it is the ultimate engine for global humanitarian impact.',
    },
    11: {
      archetype: 'The Visionary Catalyst & Futurist',
      topFields: ['Consciousness & Wellness Media', 'Transformational Education', 'Pioneering Human-Centric Tech', 'Spiritual Author & Speaker'],
      leadershipStyle: 'Charismatic, intuitive, visionary. Senses upcoming societal evolutions years before mainstream awareness.',
      idealEnvironment: 'Inspiring retreat center, creative broadcast studio, or innovative wellness organization.',
      wealthVibration: 'Wealth manifests through high-ticket advisory, inspirational media, and visionary venture advisement.',
      actionAdvice: 'Ground your cosmic intuition into practical daily habits and robust operational partnerships.',
    },
    22: {
      archetype: 'The Master Builder of Global Systems',
      topFields: ['Global Infrastructure Engineering', 'Smart Cities & Clean Energy Grids', 'International Trade Policy', 'Transcontinental Logistics Networks'],
      leadershipStyle: 'Architectural, monumental, calm. Orchestrates thousands of moving components into unified harmony.',
      idealEnvironment: 'International command center with direct oversight over massive physical or digital infrastructure.',
      wealthVibration: 'Monumental institutional wealth generated from long-lasting public works and planetary-scale platforms.',
      actionAdvice: 'Think even bigger. You are uniquely wired to solve challenges that require multi-decade systemic vision.',
    },
  };

  const selected = CAREER_DATA[vocationalNumber] || CAREER_DATA[reduceNumber(vocationalNumber, false)] || CAREER_DATA[1];

  return {
    vocationalNumber,
    ...selected,
  };
}

/**
 * 11. Twin Flame Suite
 */

// Helper to determine Astrological Sun Sign from Month and Day
export function getZodiacSign(month: number, day: number): { sign: string; element: 'Fire' | 'Earth' | 'Air' | 'Water' } {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { sign: 'Aries', element: 'Fire' };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { sign: 'Taurus', element: 'Earth' };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { sign: 'Gemini', element: 'Air' };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { sign: 'Cancer', element: 'Water' };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { sign: 'Leo', element: 'Fire' };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { sign: 'Virgo', element: 'Earth' };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: 'Libra', element: 'Air' };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { sign: 'Scorpio', element: 'Water' };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { sign: 'Sagittarius', element: 'Fire' };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sign: 'Capricorn', element: 'Earth' };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { sign: 'Aquarius', element: 'Air' };
  return { sign: 'Pisces', element: 'Water' };
}

/**
 * Twin Flame Master Calculator
 */
export interface TwinFlameResult {
  overallScore: number;
  connectionType: 'Ascended Twin Flame' | 'Deep Mirror Flame' | 'Karmic Soulmate' | 'Soul Catalyst';
  currentStage: string;
  telepathyIndex: number;
  spiritualMission: string;
  mirrorDynamics: string;
  advice: string;
}

export function calculateTwinFlame(name1: string, dob1: string, name2: string, dob2: string): TwinFlameResult {
  const lp1 = calculateLifePath(dob1).number;
  const lp2 = calculateLifePath(dob2).number;
  const exp1 = calculateExpressionNumber(name1).number;
  const exp2 = calculateExpressionNumber(name2).number;
  const soul1 = calculateSoulUrgeNumber(name1).number;
  const soul2 = calculateSoulUrgeNumber(name2).number;

  // Base resonance calculation
  let score = 70;

  // Life Path Harmony
  if (lp1 === lp2) score += 12; // Mirror frequency
  else if ((lp1 + lp2) % 2 === 0) score += 8;
  else score += 5;

  // Master numbers trigger sacred boosts
  if ([11, 22, 33].includes(lp1) || [11, 22, 33].includes(lp2)) score += 6;

  // Soul Urge (Heart desire) harmony
  if (soul1 === soul2) score += 8;
  else if (Math.abs(soul1 - soul2) === 3 || Math.abs(soul1 - soul2) === 6) score += 6;

  // Expression (Destiny) alignment
  if (exp1 === exp2) score += 4;

  // Clamp score between 65 and 99
  const finalScore = Math.min(99, Math.max(65, score));

  let connectionType: TwinFlameResult['connectionType'] = 'Deep Mirror Flame';
  if (finalScore >= 92) connectionType = 'Ascended Twin Flame';
  else if (finalScore >= 82) connectionType = 'Deep Mirror Flame';
  else if (finalScore >= 74) connectionType = 'Karmic Soulmate';
  else connectionType = 'Soul Catalyst';

  // Determine twin flame stage based on composite vibration
  const stages = [
    'Stage 1: Sacred Recognition & Spiritual Awakening (Initial meeting resonance)',
    'Stage 2: Intense Testing & Ego Shadow Reflection (Mirrored triggers and wounds)',
    'Stage 3: The Crisis & Runner/Chaser Polarity (Energetic push-pull calibration)',
    'Stage 4: Surrender & Internal Spiritual Integration (Dissolving ego dependency)',
    'Stage 5: Radiant Harmonization & Divine Union (Unconditional soul alignment)',
  ];
  const stageIndex = (lp1 + lp2 + exp1 + exp2) % stages.length;

  return {
    overallScore: finalScore,
    connectionType,
    currentStage: stages[stageIndex],
    telepathyIndex: Math.min(98, finalScore - 2 + (stageIndex * 2)),
    spiritualMission: `Your combined vibration (${lp1} & ${lp2}) forms a catalyst for spiritual awakening and unconditional love. Together, you reflect each other's deepest shadows to clear generational karma.`,
    mirrorDynamics: `Person 1 (Life Path ${lp1}) grounds the dynamic, while Person 2 (Life Path ${lp2}) accelerates spiritual transformation. You mirror both absolute devotion and hidden fears of abandonment.`,
    advice: 'Focus on your own inner wholeness rather than chasing energetic union. The twin flame mirror stabilizes only when both individuals cultivate complete internal self-love.',
  };
}

/**
 * Twin Flame Life Path Calculator
 */
export function calculateTwinFlameLifePath(dob1: string, dob2: string): {
  person1LifePath: number;
  person2LifePath: number;
  compositeLifePath: number;
  compatibilityRating: string;
  soulContract: string;
} {
  const lp1 = calculateLifePath(dob1).number;
  const lp2 = calculateLifePath(dob2).number;
  const composite = reduceNumber(lp1 + lp2, true);

  let rating = 'High Vibrational Resonance';
  if (lp1 === lp2) rating = 'Identical Soul Mirror (100% Frequency Match)';
  else if ([11, 22, 33].includes(composite)) rating = 'Sacred Master Portal Bond';
  else if (composite === 6 || composite === 2) rating = 'Nurturing Harmony & Devotion';

  const SOUL_CONTRACTS: Record<number, string> = {
    1: 'To pioneer a completely new path together, demonstrating sovereign love free from cultural dogmas.',
    2: 'To master emotional empathy, gentle cooperation, and sacred peacemaking between two polarities.',
    3: 'To awaken joy, co-create transformative artistic/creative works, and inspire collective optimism.',
    4: 'To construct a lasting, unshakeable spiritual sanctuary and anchor higher light into physical reality.',
    5: 'To shatter outdated social constraints, travel extensively, and model radical spiritual freedom.',
    6: 'To heal ancestral lineage trauma, create a beacon of domestic sanctuary, and shelter others.',
    7: 'To pursue deep esoteric knowledge, telepathic connection, and uncover sacred universal truths.',
    8: 'To balance spiritual integrity with massive material abundance and wield influence for divine good.',
    9: 'To complete long karmic cycles together and perform universal humanitarian service across the globe.',
    11: 'Master 11 Contract: To serve as a high-voltage intuitive beacon, awakening others through your sheer presence.',
    22: 'Master 22 Contract: To physically manifest institutional change, building schools, communities, or platforms.',
    33: 'Master 33 Contract: To radiate Christed compassion and cosmic healing to all living beings.',
  };

  return {
    person1LifePath: lp1,
    person2LifePath: lp2,
    compositeLifePath: composite,
    compatibilityRating: rating,
    soulContract: SOUL_CONTRACTS[composite] || SOUL_CONTRACTS[reduceNumber(composite, false)] || SOUL_CONTRACTS[1],
  };
}

/**
 * Twin Flame Numerology Calculator (Multi-Pillar)
 */
export function calculateTwinFlameNumerology(name1: string, dob1: string, name2: string, dob2: string): {
  overallAffinity: number;
  lifePathMatch: { p1: number; p2: number; score: number };
  expressionMatch: { p1: number; p2: number; score: number };
  soulUrgeMatch: { p1: number; p2: number; score: number };
  personalityMatch: { p1: number; p2: number; score: number };
  synthesisSummary: string;
} {
  const lp1 = calculateLifePath(dob1).number;
  const lp2 = calculateLifePath(dob2).number;
  const exp1 = calculateExpressionNumber(name1).number;
  const exp2 = calculateExpressionNumber(name2).number;
  const soul1 = calculateSoulUrgeNumber(name1).number;
  const soul2 = calculateSoulUrgeNumber(name2).number;
  const pers1 = calculatePersonalityNumber(name1).number;
  const pers2 = calculatePersonalityNumber(name2).number;

  const getSubScore = (n1: number, n2: number) => {
    if (n1 === n2) return 96;
    const diff = Math.abs(reduceNumber(n1, false) - reduceNumber(n2, false));
    if (diff === 0) return 94;
    if (diff === 3 || diff === 6) return 88;
    if (diff === 2 || diff === 4) return 82;
    return 75;
  };

  const lpScore = getSubScore(lp1, lp2);
  const expScore = getSubScore(exp1, exp2);
  const soulScore = getSubScore(soul1, soul2);
  const persScore = getSubScore(pers1, pers2);

  const overall = Math.round(lpScore * 0.35 + expScore * 0.25 + soulScore * 0.25 + persScore * 0.15);

  return {
    overallAffinity: overall,
    lifePathMatch: { p1: lp1, p2: lp2, score: lpScore },
    expressionMatch: { p1: exp1, p2: exp2, score: expScore },
    soulUrgeMatch: { p1: soul1, p2: soul2, score: soulScore },
    personalityMatch: { p1: pers1, p2: pers2, score: persScore },
    synthesisSummary: `Your multi-pillar numerology shows exceptional synergy (${overall}%). Highest alignment occurs in the ${
      soulScore > lpScore ? 'Soul Urge (Heart’s Desire)' : 'Life Path (Spiritual Destiny)'
    } connection, confirming that your souls agreed upon this meeting before incarnation.`,
  };
}

/**
 * Twin Flame Love Calculator
 */
export function calculateTwinFlameLove(name1: string, dob1: string, name2: string, dob2: string): {
  loveScore: number;
  passionLevel: string;
  emotionalBond: string;
  runnerChaserDynamic: string;
  healingCatalyst: string;
} {
  const soul1 = calculateSoulUrgeNumber(name1).number;
  const soul2 = calculateSoulUrgeNumber(name2).number;
  const lp1 = calculateLifePath(dob1).number;
  const lp2 = calculateLifePath(dob2).number;

  let base = 75;
  if (soul1 === soul2) base += 14;
  else if ((soul1 + soul2) % 2 === 0) base += 8;
  if (lp1 === lp2) base += 6;

  const score = Math.min(99, Math.max(68, base));

  return {
    loveScore: score,
    passionLevel: score > 90 ? 'Transcendent Cosmic Fire' : 'Deep Devotional Flame',
    emotionalBond: 'Unconditional Mirroring: telepathic empathy where both partners feel each other’s emotional highs and lows instantly across distance.',
    runnerChaserDynamic: 'The runner retreats due to fear of ego-dissolution under intense divine love; the chaser learns to stop pursuing and anchor self-worth.',
    healingCatalyst: 'Triggering childhood wounds of abandonment and rejection so both souls can achieve permanent emotional self-mastery.',
  };
}

/**
 * Twin Flame Birth Chart / Synastry Calculator
 */
export function calculateTwinFlameBirthChart(dob1: string, dob2: string): {
  person1Sign: string;
  person1Element: string;
  person2Sign: string;
  person2Element: string;
  elementalHarmony: string;
  synastryScore: number;
  karmicAspect: string;
} {
  const parts1 = dob1.split('-');
  const parts2 = dob2.split('-');
  const m1 = parseInt(parts1[1], 10) || 1;
  const d1 = parseInt(parts1[2], 10) || 1;
  const m2 = parseInt(parts2[1], 10) || 1;
  const d2 = parseInt(parts2[2], 10) || 1;

  const z1 = getZodiacSign(m1, d1);
  const z2 = getZodiacSign(m2, d2);

  // Elemental synergy
  let harmony = 'Complementary Cosmic Synergy';
  let score = 84;

  if (z1.element === z2.element) {
    harmony = `Shared ${z1.element} Resonance (Direct Mirror Flame)`;
    score = 94;
  } else if (
    (z1.element === 'Fire' && z2.element === 'Air') ||
    (z1.element === 'Air' && z2.element === 'Fire')
  ) {
    harmony = 'Fire & Air: Dynamic Expansion, Passion & Rapid Inspiration';
    score = 92;
  } else if (
    (z1.element === 'Earth' && z2.element === 'Water') ||
    (z1.element === 'Water' && z2.element === 'Earth')
  ) {
    harmony = 'Earth & Water: Nurturing Growth, Stability & Deep Emotional Rooting';
    score = 91;
  } else {
    harmony = `${z1.element} & ${z2.element}: Transformative Polarity (Alchemical Growth through Contrast)`;
    score = 79;
  }

  return {
    person1Sign: z1.sign,
    person1Element: z1.element,
    person2Sign: z2.sign,
    person2Element: z2.element,
    elementalHarmony: harmony,
    synastryScore: score,
    karmicAspect: `Sun in ${z1.sign} (${z1.element}) aspecting Sun in ${z2.sign} (${z2.element}) creates an intense karmic mirror where differences accelerate individual evolution.`,
  };
}
