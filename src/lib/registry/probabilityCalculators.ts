import { CalculatorDefinition } from '../types';

export const PROBABILITY_CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'probability-calculator',
    name: 'Probability Calculator',
    shortDescription: 'Calculate the probability of single events, union of events, intersection, conditional probability P(A|B), and complements.',
    category: 'probability',
    secondaryCategories: ['math', 'education'],
    keywords: [
      'probability calculator',
      'calculate probability',
      'conditional probability calculator',
      'union intersection probability',
      'chance calculator',
      'event probability',
    ],
    tags: ['Probability', 'Math', 'Statistics', 'Events', 'Logic'],
    icon: 'Dices',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-25',
    seo: {
      title: 'Probability Calculator – Single, Union, Intersection & Conditional',
      metaDescription: 'Free online probability calculator. Compute single event odds, addition rule unions P(A ∪ B), multiplication rule intersections P(A ∩ B), and conditional P(A|B).',
      keywords: ['probability calculator', 'single event probability', 'conditional probability', 'p(a or b)', 'p(a and b)'],
    },
    relatedCalculators: [
      'bayes-theorem-calculator',
      'permutations-and-combinations-calculator',
      'binomial-probability-calculator',
      'odds-probability-calculator',
    ],
    editorial: {
      whatIs:
        'A probability calculator computes the mathematical likelihood of an outcome occurring within a defined sample space. Ranging from 0 (impossible) to 1 (certainty), probability models everything from coin tosses and insurance risk underwriting to quantum mechanics and predictive artificial intelligence.',
      howToUse: [
        'Choose your calculation mode: Single Event, Union P(A ∪ B), Intersection P(A ∩ B), Conditional P(A|B), or Complement P(A\').',
        'For single events, enter favorable outcomes and total sample space outcomes.',
        'For compound events, specify individual probabilities P(A) and P(B), and indicate whether events are mutually exclusive or independent.',
        'View the exact decimal probability, percentage, simplified fraction, and odds in favor and against.',
      ],
      formula: {
        title: 'Probability Rules & Axioms',
        expression: 'P(A) = \\frac{n(A)}{n(S)}, \\quad P(A \\cup B) = P(A) + P(B) - P(A \\cap B), \\quad P(A|B) = \\frac{P(A \\cap B)}{P(B)}',
        explanation:
          'Where n(A) is the count of favorable outcomes, n(S) is total sample space outcomes, P(A ∪ B) is the probability of either event occurring, and P(A|B) is the conditional probability of A given B has occurred.',
      },
      example: {
        scenario: 'Calculate the probability of rolling a 2, 4, or 6 on a single fair 6-sided die.',
        steps: [
          'Identify favorable outcomes: {2, 4, 6} → n(A) = 3.',
          'Identify total possible outcomes: {1, 2, 3, 4, 5, 6} → n(S) = 6.',
          'Apply the classical probability formula: P(A) = 3 / 6 = 0.50 (50.00%).',
          'Determine odds: 1 to 1 (even odds).',
        ],
        result: 'P(Even) = 50.00% (1 in 2 chance; 1:1 odds).',
      },
      tips: [
        'Probabilities can never be negative or exceed 1 (0% to 100%).',
        'Mutually exclusive events cannot occur simultaneously, meaning P(A ∩ B) = 0.',
        'If two events are statistically independent, P(A ∩ B) = P(A) × P(B) and P(A|B) = P(A).',
        'The complement rule states P(A\') = 1 - P(A), often the fastest method to solve "at least one" probability questions.',
      ],
      faqs: [
        {
          question: 'What is the difference between mutually exclusive and independent events?',
          answer:
            'Mutually exclusive events cannot happen at the same time (e.g., flipping heads and tails on a single coin flip). Independent events do not influence each other’s likelihood (e.g., flipping heads on coin #1 and rolling a 6 on die #2).',
        },
        {
          question: 'How do you convert probability into odds?',
          answer:
            'To convert probability P into odds in favor, divide P by (1 - P). For example, a 25% probability (0.25) gives odds in favor of 0.25 / 0.75 = 1 to 3 (1:3).',
        },
        {
          question: 'What does conditional probability P(A|B) mean?',
          answer:
            'Conditional probability measures the probability of event A occurring given that event B is already known to have occurred. It shrinks the effective sample space to outcome B.',
        },
        {
          question: 'What is the law of total probability?',
          answer:
            'The law of total probability states that if events B1, B2, ..., Bn partition a sample space, the total probability of an event A is the sum of P(A|Bi) × P(Bi) across all partitions.',
        },
      ],
    },
  },
  {
    slug: 'permutations-and-combinations-calculator',
    name: 'Permutations and Combinations Calculator',
    shortDescription: 'Calculate combinations nCr and permutations nPr with or without repetition, factorial expansions, and subset ordering.',
    category: 'probability',
    secondaryCategories: ['math', 'education'],
    keywords: [
      'permutations and combinations calculator',
      'ncr calculator',
      'npr calculator',
      'combination calculator',
      'permutation calculator',
      'combinatorics calculator',
    ],
    tags: ['Combinatorics', 'Math', 'Permutations', 'Combinations', 'Factorials'],
    icon: 'Dices',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-25',
    seo: {
      title: 'Permutations & Combinations Calculator (nCr and nPr)',
      metaDescription: 'Calculate permutations nPr and combinations nCr with and without repetition. View factorial expansions, formulas, and step-by-step combinatorics.',
      keywords: ['permutations and combinations calculator', 'ncr calculator', 'npr formula', 'combinations without repetition'],
    },
    relatedCalculators: [
      'probability-calculator',
      'binomial-probability-calculator',
      'lottery-odds-calculator',
      'poker-odds-calculator',
    ],
    editorial: {
      whatIs:
        'A permutations and combinations calculator determines the number of distinct ways to choose and arrange r items from a collection of n total items. Combinations apply when selection order does not matter (e.g. lottery balls, poker hands), while permutations apply when order is critical (e.g. race rankings, security pin codes).',
      howToUse: [
        'Enter the total number of items in the population set (n).',
        'Enter the number of items to select in each subset (r).',
        'Compare combinations nCr (order does not matter) against permutations nPr (order matters).',
        'Review alternate counts with repetition allowed (n^r for permutations, C(n+r-1, r) for combinations).',
      ],
      formula: {
        title: 'Combinatorics Formulas',
        expression: 'nPr = \\frac{n!}{(n-r)!}, \\quad nCr = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}, \\quad \\text{Repetition: } n^r \\text{ and } \\binom{n+r-1}{r}',
        explanation:
          'Where n is total items, r is items chosen, and n! denotes the factorial product of all positive integers from 1 up to n.',
      },
      example: {
        scenario: 'Find how many unique committees of 3 people can be selected from an 8-person team.',
        steps: [
          'Set n = 8 (total candidates) and r = 3 (seats on committee).',
          'Because committee roles are equal, order does not matter → use combinations nCr.',
          'nCr = 8! / (3! × 5!) = (8 × 7 × 6) / (3 × 2 × 1) = 336 / 6 = 56.',
          'If assigning distinct roles (President, VP, Treasurer), use permutations: nPr = 8! / 5! = 336.',
        ],
        result: '56 possible committee combinations (or 336 permutations with distinct titles).',
      },
      tips: [
        'Remember: Permutation = Position matters; Combination = Clump / Collection where order is irrelevant.',
        'By definition, nC0 = nCn = 1, and nCr = nC(n-r).',
        'Factorial growth is extremely fast: 10! = 3,628,800, while 20! exceeds 2.43 quintillion.',
      ],
      faqs: [
        {
          question: 'When should I use combinations instead of permutations?',
          answer:
            'Use combinations when rearranging the chosen items produces the exact same group (e.g., a hand of playing cards or a team). Use permutations when order creates a new outcome (e.g., a locker combination lock or running race results).',
        },
        {
          question: 'Why is a combination lock actually a permutation lock?',
          answer:
            'Because entering the numbers 12-34-56 in the order 56-12-34 will not open the lock! The order of entry is essential, making it mathematically a permutation.',
        },
        {
          question: 'What does repetition mean in combinatorics?',
          answer:
            'Repetition means an item can be selected more than once (e.g. creating a 4-digit PIN where digits 0000 or 1212 are allowed). Without repetition, each chosen item is removed from the remaining pool.',
        },
        {
          question: 'What is 0 factorial (0!) and why does it equal 1?',
          answer:
            '0! = 1 by mathematical convention and algebraic necessity. There is exactly one way to arrange zero objects: the empty set.',
        },
      ],
    },
  },
  {
    slug: 'binomial-probability-calculator',
    name: 'Binomial Probability Calculator',
    shortDescription: 'Compute exact P(X=k) and cumulative binomial probabilities P(X≤k), P(X≥k), distribution mean, variance, and standard deviation.',
    category: 'probability',
    secondaryCategories: ['statistics', 'math'],
    keywords: [
      'binomial probability calculator',
      'binomial distribution',
      'binomial calculator',
      'bernoulli trials',
      'cumulative binomial probability',
    ],
    tags: ['Binomial', 'Statistics', 'Probability', 'Distributions', 'Bernoulli'],
    icon: 'Dices',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-25',
    seo: {
      title: 'Binomial Probability Calculator – Exact & Cumulative Distribution',
      metaDescription: 'Calculate binomial distribution probabilities P(X=k), cumulative P(X≤k) and P(X≥k), mean μ = np, variance, and standard deviation across n Bernoulli trials.',
      keywords: ['binomial probability calculator', 'binomial distribution calculator', 'p(x=k)', 'bernoulli probability'],
    },
    relatedCalculators: [
      'probability-calculator',
      'coin-flip-probability-calculator',
      'poisson-probability-calculator',
      'normal-distribution-calculator',
    ],
    editorial: {
      whatIs:
        'The Binomial Probability Calculator evaluates the probability of achieving exactly or cumulatively k successes in n independent Bernoulli trials, where each trial has the same probability of success p.',
      howToUse: [
        'Enter the total number of independent trials (n).',
        'Enter the probability of success on any individual trial (p, between 0 and 1).',
        'Enter the target number of successes (k).',
        'Analyze exact probability P(X = k), cumulative bounds P(X ≤ k) and P(X ≥ k), and summary statistics (mean and variance).',
      ],
      formula: {
        title: 'Binomial PMF and Distribution Parameters',
        expression: 'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\quad \\mu = np, \\quad \\sigma^2 = np(1-p)',
        explanation:
          'Where n is number of trials, k is number of successes, p is success probability per trial, and (1-p) is failure probability.',
      },
      example: {
        scenario: 'A basketball player with an 80% free throw percentage (p = 0.8) takes 10 shots. Find the probability of making exactly 8 shots.',
        steps: [
          'Identify parameters: n = 10, p = 0.8, k = 8.',
          'Compute combinations: C(10, 8) = 45.',
          'Calculate powers: 0.8^8 ≈ 0.16777, and (1 - 0.8)^2 = 0.2^2 = 0.04.',
          'Multiply: 45 × 0.16777 × 0.04 = 0.30199 (30.20%).',
        ],
        result: 'P(X = 8) = 30.20% exact probability.',
      },
      tips: [
        'A binomial experiment requires four conditions (BINS): Binary outcomes (success/failure), Independent trials, Fixed Number of trials n, and Same probability p on each trial.',
        'When n is large and p is close to 0.5 (np ≥ 10 and n(1-p) ≥ 10), the binomial distribution can be closely approximated by a normal distribution.',
      ],
      faqs: [
        {
          question: 'What are Bernoulli trials?',
          answer:
            'A Bernoulli trial is a random experiment with exactly two mutually exclusive outcomes, conventionally labeled "success" and "failure", where the probability of success remains constant.',
        },
        {
          question: 'How do you calculate "at least k" successes?',
          answer:
            'To find P(X ≥ k), sum the probabilities of obtaining k, k+1, ..., up to n successes, or calculate 1 - P(X ≤ k - 1).',
        },
        {
          question: 'When should I use Poisson instead of Binomial?',
          answer:
            'Use the Poisson distribution when events occur continuously over time or space with a known average rate λ, or as an approximation for binomial experiments where n is very large (n > 100) and p is very small (p < 0.01).',
        },
        {
          question: 'What is the mean of a binomial distribution?',
          answer:
            'The mean (expected value) is μ = n × p. For example, rolling a die 60 times with p = 1/6 for a six gives an expected value of 60 × (1/6) = 10 sixes.',
        },
      ],
    },
  },
  {
    slug: 'dice-probability-calculator',
    name: 'Dice Probability Calculator',
    shortDescription: 'Calculate dice rolling probabilities for any number of dice across d4, d6, d8, d10, d12, d20, and d100 with exact, at least, and at most sums.',
    category: 'probability',
    secondaryCategories: ['everyday', 'math'],
    keywords: [
      'dice probability calculator',
      'dice roller odds',
      'dnd dice calculator',
      'd6 probability',
      'd20 probability',
      'sum of 2 dice',
    ],
    tags: ['Dice', 'Gaming', 'DnD', 'Probability', 'Board Games'],
    icon: 'Dices',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-25',
    seo: {
      title: 'Dice Probability Calculator – d4, d6, d8, d10, d12, d20 & d100',
      metaDescription: 'Calculate exact and cumulative dice rolling odds for tabletop games, D&D, and board games. Compute probabilities for 2d6, 3d6, d20, and custom dice pools.',
      keywords: ['dice probability calculator', '2d6 probability', 'd20 roll odds', 'dnd dice odds'],
    },
    relatedCalculators: [
      'probability-calculator',
      'coin-flip-probability-calculator',
      'binomial-probability-calculator',
      'poker-odds-calculator',
    ],
    editorial: {
      whatIs:
        'The Dice Probability Calculator computes the probability of rolling specific sums, target thresholds, and combinations with polyhedral dice. Essential for tabletop roleplaying games (D&D, Pathfinder), board games (Settlers of Catan, Craps), and statistical simulation.',
      howToUse: [
        'Select the number of dice rolled (e.g. 2, 3, 4).',
        'Choose your die type (standard d6, d4, d8, d10, d12, d20, or percentile d100).',
        'Enter your target sum to calculate exact, at least (≥), and at most (≤) probabilities.',
        'View the total number of combinations and full probability distribution across all possible totals.',
      ],
      formula: {
        title: 'Dice Sum Distribution Formula',
        expression: 'P(S = s) = \\frac{1}{d^n} \\sum_{k=0}^{\\lfloor \\frac{s-n}{d} \\rfloor} (-1)^k \\binom{n}{k} \\binom{s - d k - 1}{n - 1}',
        explanation:
          'Where n is number of dice, d is sides per die, and s is the target sum. The total number of outcomes is d^n.',
      },
      example: {
        scenario: 'Find the probability of rolling a total sum of 7 when rolling two standard dice in Craps or Catan.',
        steps: [
          'Total outcomes = 6 × 6 = 36.',
          'Favorable pairs summing to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → 6 combinations.',
          'Calculate probability: P(Sum = 7) = 6 / 36 = 1/6 ≈ 16.67%.',
          'Odds against rolling a 7: 5 to 1.',
        ],
        result: '16.67% exact probability (1 in 6 rolls; the most common sum for 2d6).',
      },
      tips: [
        'For 2d6, 7 is the most likely sum (16.67%), while 2 (snake eyes) and 12 (boxcars) are the rarest (2.78% each).',
        'In D&D (d20), every individual number 1 through 20 has an equal 5.00% probability.',
        'Adding more dice produces a bell-shaped normal curve due to the Central Limit Theorem.',
      ],
      faqs: [
        {
          question: 'What is the most likely sum when rolling two dice?',
          answer:
            'When rolling two standard 6-sided dice, 7 is the most probable sum with 6 combinations out of 36 (16.67% probability).',
        },
        {
          question: 'What are the odds of rolling a natural 20 on a d20?',
          answer:
            'On a fair 20-sided die, every number from 1 to 20 has an equal 1 in 20 chance, or exactly 5.00% probability.',
        },
        {
          question: 'What are the odds of rolling advantage in D&D 5e?',
          answer:
            'Rolling with advantage (take the higher of two d20s) raises your chance of getting a natural 20 from 5.0% to 9.75% (1 - 0.95² = 0.0975), and significantly boosts your average roll from 10.5 to 13.825.',
        },
        {
          question: 'What are the odds of rolling doubles on two dice?',
          answer:
            'There are 6 possible doubles (1-1, 2-2, 3-3, 4-4, 5-5, 6-6) out of 36 outcomes, giving a 6/36 = 1/6 ≈ 16.67% probability.',
        },
      ],
    },
  },
  {
    slug: 'coin-flip-probability-calculator',
    name: 'Coin Flip Probability Calculator',
    shortDescription: 'Calculate probabilities for coin toss trials, exact heads/tails count, at least k heads, and consecutive streak probabilities.',
    category: 'probability',
    secondaryCategories: ['everyday', 'math'],
    keywords: [
      'coin flip probability calculator',
      'coin toss calculator',
      'heads or tails probability',
      'coin streak probability',
      'flip coin odds',
    ],
    tags: ['Coins', 'Probability', 'Streaks', 'Flips', 'Everyday'],
    icon: 'Dices',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-25',
    seo: {
      title: 'Coin Flip Probability Calculator – Heads, Tails & Streaks',
      metaDescription: 'Calculate coin flip probabilities for n tosses. Compute exact heads count, cumulative odds, and the probability of consecutive streak runs.',
      keywords: ['coin flip probability calculator', 'coin toss odds', 'heads tails probability', 'consecutive heads probability'],
    },
    relatedCalculators: [
      'binomial-probability-calculator',
      'dice-probability-calculator',
      'probability-calculator',
      'odds-probability-calculator',
    ],
    editorial: {
      whatIs:
        'The Coin Flip Probability Calculator analyzes independent Bernoulli trials with binary outcomes (Heads vs Tails). It calculates the probability of obtaining exact numbers of heads, cumulative thresholds, and the likelihood of observing long consecutive streaks.',
      howToUse: [
        'Enter the total number of coin flips (n).',
        'Adjust the coin bias if using a weighted coin (default is 0.50 for a fair coin).',
        'Set your target number of heads (k).',
        'Specify a consecutive streak length (m) to calculate the likelihood of getting m heads in a row.',
      ],
      formula: {
        title: 'Coin Toss Probability Formula',
        expression: 'P(X = k) = \\binom{n}{k} (0.5)^n, \\quad \\text{Streak recurrence: } A_m(n) = \\sum_{j=1}^m A_m(n-j)',
        explanation:
          'Where n is total flips, k is heads observed, and streak probability is solved via Markov state transition recurrence.',
      },
      example: {
        scenario: 'Find the chance of getting exactly 7 heads when flipping a fair coin 10 times.',
        steps: [
          'n = 10, k = 7, p = 0.5.',
          'Total possible sequences: 2^10 = 1,024.',
          'Number of favorable sequences: C(10, 7) = 120.',
          'P(X = 7) = 120 / 1024 ≈ 0.11719 (11.72%).',
        ],
        result: '11.72% probability of exactly 7 heads.',
      },
      tips: [
        'The Gambler’s Fallacy is the mistaken belief that past coin flips affect future ones. Each fair flip always has an independent 50/50 probability.',
        'In 100 coin flips, there is approximately a 97% probability of encountering a run of 6 or more consecutive heads or tails.',
      ],
      faqs: [
        {
          question: 'What are the odds of getting 10 heads in a row?',
          answer:
            'The probability of 10 consecutive heads on a fair coin is (1/2)¹⁰ = 1 / 1,024 ≈ 0.0977%, or odds of 1,023 to 1 against.',
        },
        {
          question: 'What is the Gambler’s Fallacy in coin tossing?',
          answer:
            'The Gambler’s Fallacy is believing that after rolling 5 heads in a row, tails is "due" to come up. Because each toss is statistically independent, the probability of heads on the next flip remains exactly 50%.',
        },
        {
          question: 'Why do streaks happen so frequently in random coin tosses?',
          answer:
            'Human intuition underestimates clustering in random processes. In 200 random flips, a streak of 7 heads or tails in a row occurs more than 75% of the time.',
        },
        {
          question: 'Is a real coin truly 50/50?',
          answer:
            'Stanford research led by Persi Diaconis revealed real spun coins show slight physical bias toward the heavier face, and flipped coins land on the face they started on roughly 50.8% of the time.',
        },
      ],
    },
  },
  {
    slug: 'bayes-theorem-calculator',
    name: 'Bayes\' Theorem Calculator',
    shortDescription: 'Calculate conditional posterior probability P(A|B), positive predictive value (PPV), false positives, and medical test accuracy.',
    category: 'probability',
    secondaryCategories: ['statistics', 'health', 'math'],
    keywords: [
      'bayes theorem calculator',
      'bayesian probability',
      'posterior probability calculator',
      'false positive paradox',
      'positive predictive value',
      'sensitivity specificity calculator',
    ],
    tags: ['Bayesian', 'Statistics', 'Medical', 'Logic', 'Probability'],
    icon: 'Dices',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-25',
    seo: {
      title: 'Bayes\' Theorem Calculator – Posterior Probability & PPV',
      metaDescription: 'Calculate Bayesian conditional probability P(A|B) and Positive Predictive Value (PPV). Understand the false positive paradox with a 10,000-person contingency table.',
      keywords: ['bayes theorem calculator', 'bayesian probability', 'false positive paradox', 'ppv calculator'],
    },
    relatedCalculators: [
      'probability-calculator',
      'binomial-probability-calculator',
      'odds-probability-calculator',
      'normal-distribution-calculator',
    ],
    editorial: {
      whatIs:
        'Bayes\' Theorem is a foundational mathematical formula that updates the probability of a hypothesis (prior probability) as new evidence or test results become available. It is widely applied in medical diagnostic testing, spam filtering algorithms, and machine learning.',
      howToUse: [
        'Enter the Prior Probability P(A) (e.g. disease prevalence in the general population).',
        'Enter the Sensitivity P(B|A) (True Positive rate; probability the test is positive if condition is present).',
        'Enter the False Positive Rate P(B|A\') (probability the test is positive if condition is absent; equal to 1 - Specificity).',
        'Review the calculated Posterior Probability P(A|B) and the 10,000-person population contingency matrix.',
      ],
      formula: {
        title: 'Bayes\' Theorem Formula',
        expression: 'P(A|B) = \\frac{P(B|A) P(A)}{P(B)} = \\frac{P(B|A) P(A)}{P(B|A) P(A) + P(B|A\') P(A\')}',
        explanation:
          'Where P(A|B) is the posterior probability of A given evidence B, P(B|A) is the likelihood/sensitivity, P(A) is the prior probability, and P(B) is the total marginal probability of observing evidence B.',
      },
      example: {
        scenario: 'A rare disease affects 1% of people (P(A) = 0.01). A diagnostic test has 95% sensitivity (P(B|A) = 0.95) and a 5% false positive rate (P(B|A\') = 0.05). If a patient tests positive, what is the probability they actually have the disease?',
        steps: [
          'True Positives in 10,000 people: 10,000 × 0.01 × 0.95 = 95.',
          'False Positives in 10,000 people: 10,000 × 0.99 × 0.05 = 495.',
          'Total Positive Tests: 95 + 495 = 590.',
          'Apply Bayes\' rule: P(Disease | Positive) = 95 / 590 ≈ 0.1610 (16.10%).',
        ],
        result: 'Only 16.10% chance of actually having the disease despite a 95% accurate test!',
      },
      tips: [
        'The "False Positive Paradox" occurs when screening for rare conditions: because the vast majority do not have the condition, false positives easily outnumber true positives.',
        'Positive Predictive Value (PPV) heavily depends on base rate prevalence, not just the accuracy of the diagnostic test itself.',
      ],
      faqs: [
        {
          question: 'Why is a 95% accurate medical test only 16% accurate if you test positive?',
          answer:
            'Because when a condition is rare (e.g. 1 in 100), the 99 healthy people produce vastly more false positive test results (approx 5) than the single sick person produces true positive results (~1).',
        },
        {
          question: 'What is the difference between prior and posterior probability?',
          answer:
            'Prior probability is your estimate before observing new evidence (e.g. general disease prevalence). Posterior probability is the revised estimate after incorporating the test result.',
        },
        {
          question: 'What is specificity?',
          answer:
            'Specificity is the True Negative rate: the probability that a healthy person tests negative. A test with a 5% false positive rate has a 95% specificity.',
        },
        {
          question: 'How do spam filters use Bayes\' Theorem?',
          answer:
            'Naive Bayes spam filters calculate the probability an incoming email is spam given the presence of specific words (e.g. "free", "crypto", "wire transfer") based on historical training data.',
        },
      ],
    },
  },
  {
    slug: 'normal-distribution-calculator',
    name: 'Normal Distribution Calculator',
    shortDescription: 'Calculate probabilities and percentiles for standard and general normal distributions, z-scores, and interval areas.',
    category: 'probability',
    secondaryCategories: ['statistics', 'math'],
    keywords: [
      'normal distribution calculator',
      'gaussian distribution',
      'bell curve calculator',
      'z score probability',
      'normal cdf calculator',
    ],
    tags: ['Normal Distribution', 'Gaussian', 'Z-Score', 'Statistics', 'Continuous'],
    icon: 'Dices',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-25',
    seo: {
      title: 'Normal Distribution Calculator – Z-Scores, Bell Curve & Area',
      metaDescription: 'Calculate normal distribution probabilities, z-scores, and bell curve areas. Evaluate left-tailed, right-tailed, and two-tailed intervals with Gaussian CDF.',
      keywords: ['normal distribution calculator', 'bell curve calculator', 'z score to probability', 'gaussian cdf'],
    },
    relatedCalculators: [
      'student-t-value-calculator',
      'binomial-probability-calculator',
      'probability-calculator',
      'poisson-probability-calculator',
    ],
    editorial: {
      whatIs:
        'The Normal (Gaussian) Distribution is the quintessential continuous probability distribution in statistics. Symmetrical and bell-shaped, it arises naturally in measurement errors, physical traits (height, blood pressure), standardized test scores (SAT, IQ), and financial market returns.',
      howToUse: [
        'Enter the population Mean (μ) and Standard Deviation (σ).',
        'Select your calculation region: Left-tailed P(X ≤ x₁), Right-tailed P(X ≥ x₁), Between P(x₁ ≤ X ≤ x₂), or Outside tails.',
        'Enter the target values (x₁ and x₂).',
        'Review the calculated probability percentage, bell curve area, and corresponding z-scores.',
      ],
      formula: {
        title: 'Normal Probability Density and CDF',
        expression: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}, \\quad z = \\frac{x-\\mu}{\\sigma}, \\quad \\Phi(z) = \\frac{1}{2}\\left[1 + \\text{erf}\\left(\\frac{z}{\\sqrt{2}}\\right)\\right]',
        explanation:
          'Where μ is the mean, σ is the standard deviation, z is the standardized score, and erf is the Gauss error function.',
      },
      example: {
        scenario: 'IQ scores follow a normal distribution with mean μ = 100 and standard deviation σ = 15. Find the probability of a person scoring between 100 and 115.',
        steps: [
          'Calculate z1 for x1 = 100: z1 = (100 - 100) / 15 = 0.00 → Φ(0) = 0.5000.',
          'Calculate z2 for x2 = 115: z2 = (115 - 100) / 15 = +1.00 → Φ(1) ≈ 0.8413.',
          'Subtract CDF values: P(100 ≤ X ≤ 115) = 0.8413 - 0.5000 = 0.3413 (34.13%).',
        ],
        result: '34.13% of the population scores between 100 and 115 IQ.',
      },
      tips: [
        'The Empirical Rule (68–95–99.7 rule): roughly 68.27% of data falls within 1σ of the mean, 95.45% within 2σ, and 99.73% within 3σ.',
        'A z-score measures how many standard deviations an observation lies above or below the mean.',
      ],
      faqs: [
        {
          question: 'What is a z-score?',
          answer:
            'A z-score (standard score) indicates how many standard deviations an element is from the mean: z = (x - μ) / σ. A positive z-score is above average; a negative is below.',
        },
        {
          question: 'What is the standard normal distribution?',
          answer:
            'The standard normal distribution is the special case of the normal distribution with mean μ = 0 and standard deviation σ = 1.',
        },
        {
          question: 'What percentage of data is beyond 2 standard deviations?',
          answer:
            'Approximately 4.55% of total data lies outside ±2 standard deviations (2.28% in each tail).',
        },
        {
          question: 'Why does the Central Limit Theorem make the normal distribution so important?',
          answer:
            'The Central Limit Theorem proves that the sum or average of a large number of independent random variables tends toward a normal distribution, regardless of the shape of the underlying population distribution.',
        },
      ],
    },
  },
  {
    slug: 'poisson-probability-calculator',
    name: 'Poisson Distribution Calculator',
    shortDescription: 'Calculate Poisson probability P(X=k), cumulative event odds, and arrival rates per time or spatial interval.',
    category: 'probability',
    secondaryCategories: ['statistics', 'business'],
    keywords: [
      'poisson distribution calculator',
      'poisson probability',
      'poisson rate calculator',
      'arrival rate probability',
      'rare events distribution',
    ],
    tags: ['Poisson', 'Arrivals', 'Queuing', 'Statistics', 'Distributions'],
    icon: 'Dices',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-25',
    seo: {
      title: 'Poisson Distribution Calculator – Event Probability & Arrival Rates',
      metaDescription: 'Calculate Poisson distribution probabilities for independent events occurring at average rate λ. Compute exact P(X=k) and cumulative bounds.',
      keywords: ['poisson distribution calculator', 'poisson probability formula', 'arrival rate calculator', 'call center probability'],
    },
    relatedCalculators: [
      'binomial-probability-calculator',
      'probability-calculator',
      'normal-distribution-calculator',
      'odds-probability-calculator',
    ],
    editorial: {
      whatIs:
        'The Poisson Distribution models the number of times an event occurs within a fixed interval of time or space. It applies when events happen with a known constant mean rate λ and independently of the time since the last event (e.g. call center calls per hour, website traffic bursts, emergency room admissions).',
      howToUse: [
        'Enter the Average Rate of occurrence (λ) per interval (e.g. 4 calls per hour).',
        'Enter the target number of observed events (k).',
        'Optionally adjust the time scale multiplier (e.g. 2 for a 2-hour window).',
        'Review exact P(X = k), cumulative P(X ≤ k), and P(X ≥ k) probabilities.',
      ],
      formula: {
        title: 'Poisson PMF and Parameters',
        expression: 'P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}, \\quad \\mu = \\lambda, \\quad \\sigma^2 = \\lambda',
        explanation:
          'Where λ is the average number of events per interval, k is the observed number of events, and e is Euler’s constant (≈ 2.71828). In a Poisson distribution, the mean and variance are uniquely equal to λ.',
      },
      example: {
        scenario: 'A coffee shop receives an average of 3 customers per minute (λ = 3). What is the probability of exactly 4 customers arriving in the next minute?',
        steps: [
          'Parameters: λ = 3, k = 4.',
          'Calculate numerator: 3^4 × e^(-3) = 81 × 0.049787 = 4.03275.',
          'Calculate denominator: 4! = 24.',
          'Divide: 4.03275 / 24 ≈ 0.1680 (16.80%).',
        ],
        result: '16.80% probability of exactly 4 customers.',
      },
      tips: [
        'Unlike the binomial distribution which has a fixed maximum number of trials n, the Poisson distribution has no upper limit on k.',
        'A unique mathematical hallmark of the Poisson distribution is that its variance is always exactly equal to its mean (σ² = μ = λ).',
      ],
      faqs: [
        {
          question: 'What conditions are required for a Poisson distribution?',
          answer:
            'Events must occur one at a time, events must be independent of one another, and the average rate λ must remain constant across the measured period.',
        },
        {
          question: 'How do you scale a Poisson rate for different time intervals?',
          answer:
            'Multiply the base rate by the time factor. If website errors occur at λ = 2 per hour, the rate for an 8-hour shift is λ = 2 × 8 = 16 errors.',
        },
        {
          question: 'How is Poisson related to the exponential distribution?',
          answer:
            'If the count of events in an interval follows a Poisson distribution with rate λ, the elapsed time between successive events follows an exponential distribution with rate parameter λ.',
        },
        {
          question: 'Can Poisson approximate the Binomial distribution?',
          answer:
            'Yes. When n is large (n ≥ 100) and p is small (p ≤ 0.01), a binomial distribution is well approximated by a Poisson distribution with λ = n × p.',
        },
      ],
    },
  },
  {
    slug: 'odds-probability-calculator',
    name: 'Odds Probability Calculator',
    shortDescription: 'Convert between probability percentages, decimal odds, fractional odds, and American moneyline odds with payout estimates.',
    category: 'probability',
    secondaryCategories: ['sports', 'finance', 'math'],
    keywords: [
      'odds probability calculator',
      'implied probability calculator',
      'odds converter',
      'moneyline to probability',
      'betting odds calculator',
      'decimal to fractional odds',
    ],
    tags: ['Odds', 'Sports', 'Betting', 'Finance', 'Conversion'],
    icon: 'Dices',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-25',
    seo: {
      title: 'Odds Probability Calculator – Convert American, Decimal & Fractional',
      metaDescription: 'Convert between American (+/-), Decimal (European), Fractional (UK), and Implied Probability percentages. Calculate potential profit and total payout on any stake.',
      keywords: ['odds probability calculator', 'implied probability calculator', 'moneyline converter', 'betting odds payout'],
    },
    relatedCalculators: [
      'probability-calculator',
      'poker-odds-calculator',
      'lottery-odds-calculator',
      'win-percentage-calculator',
    ],
    editorial: {
      whatIs:
        'The Odds Probability Calculator translates between international betting odds formats—American (+/- moneyline), Decimal (European), Fractional (UK)—and true implied mathematical probability. It calculates potential net profit and total returns for any given wager or investment.',
      howToUse: [
        'Select your starting format: American, Decimal, Fractional, or Implied Probability (%).',
        'Enter the odds value (e.g. +150, 2.50, 3/2, or 40%).',
        'Enter your stake amount ($).',
        'Review the converted values across all four standard formats, potential net profit, and total payout.',
      ],
      formula: {
        title: 'Odds and Probability Conversion Formulas',
        expression: 'P = \\frac{1}{\\text{Decimal}}, \\quad \\text{American (+): } P = \\frac{100}{A + 100}, \\quad \\text{American (-): } P = \\frac{|A|}{|A| + 100}',
        explanation:
          'Where Decimal odds represent total return per unit staked, and American moneyline indicates profit on a $100 stake (+) or amount needed to wager to win $100 (-).',
      },
      example: {
        scenario: 'A sports team is listed at +150 American odds. Find the implied probability and profit on a $100 wager.',
        steps: [
          'Implied Probability: P = 100 / (150 + 100) = 100 / 250 = 40.00%.',
          'Decimal Odds: 1 / 0.40 = 2.50.',
          'Fractional Odds: 150 / 100 = 3/2.',
          'Profit on $100 stake: $100 × 1.50 = $150 profit ($250 total payout).',
        ],
        result: '40.00% implied probability; $150 profit on a $100 bet.',
      },
      tips: [
        'Sportsbook odds include a built-in house commission known as the "vig" or "overround", causing total implied probabilities in a match to sum to 104%–108% rather than 100%.',
        'Negative American odds (e.g. -200) indicate the favorite, requiring a $200 bet to net $100 in profit.',
      ],
      faqs: [
        {
          question: 'What are decimal odds and where are they used?',
          answer:
            'Decimal odds (e.g. 2.50) represent the total return for every $1 staked, including the original stake. They are standard across continental Europe, Canada, and Australia.',
        },
        {
          question: 'What do plus (+) and minus (-) American odds mean?',
          answer:
            'Plus odds (e.g. +200) show the profit made on a $100 bet ($200 profit). Minus odds (e.g. -150) show the amount you must wager to make $100 profit ($150 bet needed).',
        },
        {
          question: 'What is the vig (overround) in sports betting?',
          answer:
            'The vig (vigorish) is the bookmaker’s profit margin built into the odds. If two equal teams are listed at -110 each, their implied probabilities sum to 52.38% + 52.38% = 104.76%, giving the house a 4.76% edge.',
        },
        {
          question: 'How do you calculate fair odds without the bookmaker margin?',
          answer:
            'Divide each outcome’s implied probability by the sum of all outcomes’ probabilities to normalize the total to exactly 100%.',
        },
      ],
    },
  },
  {
    slug: 'hypergeometric-calculator',
    name: 'Hypergeometric Distribution Calculator',
    shortDescription: 'Calculate probabilities for sampling without replacement, card draws, lottery ball selections, and quality inspection batches.',
    category: 'probability',
    secondaryCategories: ['statistics', 'math'],
    keywords: [
      'hypergeometric calculator',
      'hypergeometric distribution',
      'sampling without replacement',
      'card draw probability',
      'finite population sampling',
    ],
    tags: ['Hypergeometric', 'Cards', 'Sampling', 'Statistics', 'Finite'],
    icon: 'Dices',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-25',
    seo: {
      title: 'Hypergeometric Distribution Calculator – Sampling Without Replacement',
      metaDescription: 'Calculate hypergeometric probabilities for sampling without replacement. Compute exact P(X=k) and cumulative odds for card decks, lotteries, and quality control.',
      keywords: ['hypergeometric distribution calculator', 'sampling without replacement calculator', 'card drawing probability', 'hypergeometric pmf'],
    },
    relatedCalculators: [
      'binomial-probability-calculator',
      'probability-calculator',
      'poker-odds-calculator',
      'permutations-and-combinations-calculator',
    ],
    editorial: {
      whatIs:
        'The Hypergeometric Distribution Calculator computes the probability of obtaining k successes in a sample of size n drawn from a finite population N containing K total successes without replacement. Unlike the binomial distribution, the probability changes after each draw.',
      howToUse: [
        'Enter the Total Population Size (N) (e.g. 52 cards in a deck).',
        'Enter the Number of Success States in Population (K) (e.g. 4 aces in deck).',
        'Enter the Sample Size Drawn (n) (e.g. 5-card hand).',
        'Enter the Target Successes (k) (e.g. 1 ace).',
        'Review exact P(X = k) and cumulative probabilities.',
      ],
      formula: {
        title: 'Hypergeometric PMF Formula',
        expression: 'P(X = k) = \\frac{\\binom{K}{k} \\binom{N - K}{n - k}}{\\binom{N}{n}}, \\quad \\mu = \\frac{n K}{N}',
        explanation:
          'Where N is total population, K is total success states, n is sample size drawn, and k is observed successes.',
      },
      example: {
        scenario: 'Find the probability of drawing exactly 1 Ace in a standard 5-card hand drawn from a 52-card deck.',
        steps: [
          'Parameters: N = 52, K = 4 (aces), n = 5 (cards drawn), k = 1.',
          'Combinations of aces: C(4, 1) = 4.',
          'Combinations of non-aces: C(48, 4) = 194,580.',
          'Total 5-card combinations: C(52, 5) = 2,598,960.',
          'Multiply and divide: (4 × 194,580) / 2,598,960 = 778,320 / 2,598,960 ≈ 0.29947 (29.95%).',
        ],
        result: '29.95% probability of being dealt exactly 1 Ace.',
      },
      tips: [
        'If the population size N is very large compared to sample size n (e.g. N > 20n), sampling without replacement closely approximates the binomial distribution.',
        'The hypergeometric distribution is essential in industrial quality control to accept or reject batches based on defective part sampling.',
      ],
      faqs: [
        {
          question: 'What is the main difference between Binomial and Hypergeometric distributions?',
          answer:
            'Binomial models sampling WITH replacement (independent trials with constant probability). Hypergeometric models sampling WITHOUT replacement (dependent trials where probabilities change after each draw).',
        },
        {
          question: 'What is the expected value of a hypergeometric distribution?',
          answer:
            'The expected value (mean) is μ = (n × K) / N. Drawing 5 cards from a 52-card deck with 4 aces yields an expected value of (5 × 4) / 52 ≈ 0.385 aces.',
        },
        {
          question: 'Where is the hypergeometric distribution used in real life?',
          answer:
            'It is widely used in card games (Poker, Blackjack, Magic: The Gathering), lottery games, clinical trials sampling patient groups, and factory quality assurance testing.',
        },
        {
          question: 'What are the bounds for valid values of k?',
          answer:
            'k cannot exceed the sample size n or total successes K, and cannot be less than max(0, n - (N - K)).',
        },
      ],
    },
  },
  {
    slug: 'poker-odds-calculator',
    name: 'Poker Odds Calculator',
    shortDescription: 'Evaluate 5-card poker hand probabilities, Texas Hold\'em pot odds, hand equity, outs, and the Rule of 4 and 2.',
    category: 'probability',
    secondaryCategories: ['sports', 'everyday', 'math'],
    keywords: [
      'poker odds calculator',
      'texas holdem odds',
      'poker hand probability',
      'pot odds calculator',
      'rule of 4 and 2',
      'poker outs calculator',
    ],
    tags: ['Poker', 'Cards', 'Texas Holdem', 'Odds', 'Sports'],
    icon: 'Dices',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-25',
    seo: {
      title: 'Poker Odds Calculator – Texas Hold\'em Pot Odds & Hand Ranks',
      metaDescription: 'Calculate Texas Hold\'em pot odds, hand equity, number of outs, and expected value (+EV). Complete 5-card poker hand probability chart for 52-card decks.',
      keywords: ['poker odds calculator', 'texas holdem pot odds', 'poker outs rule of 4 and 2', 'poker hand ranking odds'],
    },
    relatedCalculators: [
      'hypergeometric-calculator',
      'odds-probability-calculator',
      'permutations-and-combinations-calculator',
      'probability-calculator',
    ],
    editorial: {
      whatIs:
        'The Poker Odds Calculator computes the statistical probabilities of all standard 5-card poker hands and analyzes live Texas Hold\'em decisions. It calculates pot odds, drawing hand equity based on outs, and indicates whether calling a bet represents positive expected value (+EV).',
      howToUse: [
        'In Texas Hold\'em mode, enter your number of unseen winning cards (Outs) (e.g. 9 outs for a flush draw).',
        'Enter current total pot size and the amount required to call.',
        'Compare your calculated hand equity against pot odds to see the strategic call verdict (+EV or -EV).',
        'Consult the complete 5-card poker hand hierarchy table to view exact combinatorial probabilities for Royal Flush through High Card.',
      ],
      formula: {
        title: 'Pot Odds & Rule of 4 and 2',
        expression: '\\text{Pot Odds} = \\frac{\\text{Call}}{\\text{Pot} + \\text{Call}}, \\quad \\text{Flop Equity} \\approx \\text{Outs} \\times 4, \\quad \\text{Turn Equity} \\approx \\text{Outs} \\times 2',
        explanation:
          'Where Outs is the number of remaining cards in the deck that improve your hand to a winner. If Hand Equity (%) exceeds Pot Odds (%), calling is mathematically profitable long-term (+EV).',
      },
      example: {
        scenario: 'On the turn, the pot is $100 and your opponent bets $25 (amount to call is $25). You have 9 outs to hit your flush on the river.',
        steps: [
          'Calculate total pot: $100 + $25 = $125.',
          'Calculate Pot Odds: $25 / $125 = 20.00%.',
          'Calculate Turn-to-River Equity with 46 unseen cards: 9 / 46 ≈ 19.57%.',
          'Evaluate: 19.57% equity is slightly under 20% pot odds without implied odds, but with future river bets (implied odds), it is an easy profitable call.',
        ],
        result: '19.57% equity vs 20.00% direct pot odds.',
      },
      tips: [
        'The Rule of 4 and 2: Multiply outs by 4 on the flop to estimate equity by the river; multiply outs by 2 on the turn for river equity.',
        'Always factor in "implied odds": extra chips you expect to win on future betting rounds when you hit your draw.',
      ],
      faqs: [
        {
          question: 'What are "outs" in poker?',
          answer:
            'Outs are any unseen cards remaining in the deck that, if dealt, will improve your hand to likely win the pot (e.g., 9 outs for a flush draw, 8 outs for an open-ended straight draw).',
        },
        {
          question: 'What is positive expected value (+EV)?',
          answer:
            '+EV means a decision will generate a net profit on average when repeated many times. In poker, a call is +EV whenever your equity percentage is greater than the pot odds percentage.',
        },
        {
          question: 'What are the odds of being dealt Pocket Aces in Texas Hold\'em?',
          answer:
            'The odds of being dealt pocket aces (AA) pre-flop are C(4,2) / C(52,2) = 6 / 1,326 = 1 in 221, or approximately 0.45%.',
        },
        {
          question: 'What are the exact odds of hitting a Royal Flush?',
          answer:
            'There are exactly 4 Royal Flushes out of 2,598,960 possible 5-card hands, giving odds of 1 in 649,740 (0.000154% probability).',
        },
      ],
    },
  },
  {
    slug: 'lottery-odds-calculator',
    name: 'Lottery Odds Calculator',
    shortDescription: 'Calculate jackpot and secondary tier odds for Powerball, Mega Millions, and custom multi-ball lotteries with expected value.',
    category: 'probability',
    secondaryCategories: ['everyday', 'finance', 'math'],
    keywords: [
      'lottery odds calculator',
      'powerball odds calculator',
      'mega millions odds',
      'lottery probability',
      'chance of winning lottery',
    ],
    tags: ['Lottery', 'Powerball', 'Mega Millions', 'Odds', 'Probability'],
    icon: 'Dices',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-25',
    seo: {
      title: 'Lottery Odds Calculator – Powerball, Mega Millions & Custom Lotto',
      metaDescription: 'Calculate true jackpot and secondary prize tier odds for US Powerball, Mega Millions, and custom lotto games. Review overall winning odds and ticket expected value.',
      keywords: ['lottery odds calculator', 'powerball odds', 'mega millions probability', 'chance of winning the lottery'],
    },
    relatedCalculators: [
      'permutations-and-combinations-calculator',
      'probability-calculator',
      'odds-probability-calculator',
      'binomial-probability-calculator',
    ],
    editorial: {
      whatIs:
        'The Lottery Odds Calculator determines the exact mathematical odds of winning the grand prize jackpot and every secondary prize tier in multi-ball lottery drawings. It supports US Powerball, Mega Millions, EuroMillions, and custom ball pool formats.',
      howToUse: [
        'Select a preset (US Powerball 5/69 + 1/26, Mega Millions 5/70 + 1/25, or Classic 6/49) or enter custom ball pools.',
        'Enter the white ball pool size and number of white balls drawn.',
        'Specify bonus ball pool size if applicable.',
        'Examine jackpot odds, overall odds of winning any prize, and ticket expected value.',
      ],
      formula: {
        title: 'Lottery Combinations Formula',
        expression: '\\text{Jackpot Odds} = \\binom{N}{k} \\times M = \\frac{N!}{k!(N-k)!} \\times M',
        explanation:
          'Where N is the white ball pool (e.g. 69), k is white balls drawn (e.g. 5), and M is the bonus ball pool (e.g. 26).',
      },
      example: {
        scenario: 'Find the exact odds of winning the Powerball jackpot by matching 5 white balls out of 69 plus 1 red Powerball out of 26.',
        steps: [
          'White ball combinations: C(69, 5) = 11,238,513.',
          'Red Powerball choices: 26.',
          'Total unique ticket combinations: 11,238,513 × 26 = 292,201,338.',
          'Jackpot probability: 1 in 292,201,338 (approx 0.000000342%).',
        ],
        result: '1 in 292,201,338 jackpot odds.',
      },
      tips: [
        'Buying two tickets doubles your chance from 1 in 292 million to 2 in 292 million (1 in 146 million), which remains astronomically unlikely.',
        'You are statistically more likely to be struck by lightning (approx 1 in 15,300 in a lifetime) or become an astronaut than win a major multi-state lottery jackpot.',
      ],
      faqs: [
        {
          question: 'What are the odds of winning the Powerball jackpot?',
          answer:
            'The odds of winning the US Powerball jackpot are exactly 1 in 292,201,338.',
        },
        {
          question: 'What are the odds of winning the Mega Millions jackpot?',
          answer:
            'The odds of winning the US Mega Millions jackpot (5 of 70 plus 1 of 25) are exactly 1 in 302,575,350.',
        },
        {
          question: 'Does picking "lucky" or "unpopular" numbers increase your odds?',
          answer:
            'Every combination has the exact same probability of being drawn. However, picking unpopular numbers (such as numbers above 31, which avoid birthdays) reduces the chance of having to split the jackpot if you win.',
        },
        {
          question: 'Can a lottery ticket ever have positive expected value (+EV)?',
          answer:
            'Rarely, when jackpots climb above $1 Billion, the mathematical expected value can theoretically exceed the $2 ticket price. However, federal/state taxes (approx 37%+) and the high probability of splitting the jackpot with other winners typically keep true expected value negative.',
        },
      ],
    },
  },
];
