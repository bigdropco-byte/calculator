import { CalculatorDefinition, CategorySlug } from './types';
import { CATEGORIES } from './categoryRegistry';
import { NUMEROLOGY_CALCULATORS } from './registry/numerologyCalculators';

export const CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    shortDescription: 'Quickly calculate percentages, find what percentage one number is of another, and compute percent changes.',
    category: 'math',
    secondaryCategories: ['education', 'everyday'],
    keywords: [
      'percentage calculator',
      'percent calculator',
      'calculate percentage',
      'percentage of number',
      'percentage formula',
      'math percentage',
    ],
    tags: ['Math', 'Percentages', 'Everyday', 'Basics'],
    icon: 'Percent',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-15',
    seo: {
      title: 'Percentage Calculator – Calculate Percentages Online Free',
      metaDescription: 'Free online percentage calculator. Quickly calculate what is X% of Y, find percentage portions, and compute percentage difference with step-by-step math.',
      keywords: ['percentage calculator', 'percent calculator', 'calculate percent online', 'free percentage tool'],
    },
    relatedCalculators: [
      'percentage-increase-calculator',
      'tip-calculator',
      'average-calculator',
      'loan-calculator',
    ],
    editorial: {
      whatIs:
        'A percentage calculator is a mathematical utility that computes proportions expressed as fractions of 100. The term percentage originates from the Latin phrase "per centum," meaning "by the hundred." It enables comparisons between varying quantities on a uniform relative scale.',
      howToUse: [
        'Select the calculation mode: find X% of Y, find what percentage X is of Y, or calculate percentage change.',
        'Enter your input numbers into the corresponding fields.',
        'The calculation updates immediately with exact decimal values and fractional breakdowns.',
        'Use the Copy Result button to copy the answer directly to your clipboard.',
      ],
      formula: {
        title: 'Percentage Formula',
        expression: 'P = (\\frac{X}{100}) \\times Y \\quad \\text{and} \\quad \\% = (\\frac{X}{Y}) \\times 100',
        explanation:
          'To determine what X% of Y is, convert the percentage into a decimal by dividing by 100, then multiply by Y. To find what percentage X is of Y, divide X by Y and multiply the quotient by 100.',
      },
      example: {
        scenario: 'Find what 15% of $80 is, and calculate what percentage 20 is of 80.',
        steps: [
          'For 15% of 80: Convert 15% to 0.15, then calculate 0.15 × 80 = 12.',
          'For 20 of 80: Divide 20 by 80 = 0.25, then multiply by 100 = 25%.',
        ],
        result: '15% of $80 is $12. 20 is 25% of 80.',
      },
      tips: [
        'To quickly calculate 10% in your head, simply move the decimal point one position to the left.',
        'To find 5%, calculate 10% and divide by 2.',
        'Percentages can exceed 100% when the final quantity is greater than the base reference.',
      ],
      faqs: [
        {
          question: 'How do you calculate a percentage on a basic calculator?',
          answer:
            'Multiply the base number by the percentage number, then press the percentage symbol (%) key or divide the result by 100.',
        },
        {
          question: 'What is the difference between percentage and percentile?',
          answer:
            'A percentage represents a portion out of 100, whereas a percentile indicates the relative rank or percentage of values in a data set that fall below a specific point.',
        },
        {
          question: 'Can percentages be negative?',
          answer:
            'Yes, when expressing a relative decline or decrease between two numbers, a percentage change can be negative.',
        },
      ],
    },
  },
  {
    slug: 'percentage-increase-calculator',
    name: 'Percentage Increase Calculator',
    shortDescription: 'Calculate the percentage increase or decrease between two values, along with absolute difference and growth multipliers.',
    category: 'math',
    secondaryCategories: ['finance', 'business'],
    keywords: [
      'percentage increase calculator',
      'percent growth calculator',
      'percent difference',
      'percentage decrease calculator',
      'growth rate calculator',
    ],
    tags: ['Math', 'Growth', 'Finance', 'Business'],
    icon: 'TrendingUp',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-01-20',
    seo: {
      title: 'Percentage Increase Calculator – Calculate Percent Growth & Decrease',
      metaDescription: 'Calculate percentage increase or decrease between any two values. Find growth rate, absolute difference, and multiplier instantly.',
      keywords: ['percentage increase calculator', 'percent decrease', 'calculate growth percentage'],
    },
    relatedCalculators: [
      'percentage-calculator',
      'compound-interest-calculator',
      'average-calculator',
    ],
    editorial: {
      whatIs:
        'A percentage increase calculator measures the relative change between an initial starting value and a subsequent final value. It is widely used in economics, finance, salary benchmarking, and scientific measurements to quantify growth or contraction.',
      howToUse: [
        'Enter the initial (starting) value in the first field.',
        'Enter the final (ending) value in the second field.',
        'The calculator instantly displays whether there was an increase or decrease, the percentage difference, the raw numeric difference, and the expansion multiplier.',
      ],
      formula: {
        title: 'Percentage Increase / Decrease Formula',
        expression: '\\Delta\\% = \\left( \\frac{\\text{Final} - \\text{Initial}}{|\\text{Initial}|} \\right) \\times 100',
        explanation:
          'Subtract the initial value from the final value to find the absolute difference, divide that difference by the absolute initial value, and multiply by 100.',
      },
      example: {
        scenario: 'A company had 50 employees in 2024 and 75 employees in 2025.',
        steps: [
          'Calculate the difference: 75 - 50 = 25.',
          'Divide by the initial count: 25 / 50 = 0.50.',
          'Multiply by 100: 0.50 × 100 = 50% increase.',
        ],
        result: 'The company experienced a 50% headcount increase (1.5x multiplier).',
      },
      tips: [
        'A percentage increase is asymmetric with a percentage decrease: an increase of 50% followed by a decrease of 50% results in a net loss of 25%.',
        'Always verify that your initial value is non-zero, as dividing by zero is mathematically undefined.',
      ],
      faqs: [
        {
          question: 'How do you calculate percentage increase from $40 to $50?',
          answer:
            'Subtract 40 from 50 (difference = 10). Divide 10 by 40 (0.25). Multiply by 100 to get a 25% increase.',
        },
        {
          question: 'Why does a 100% increase double the number?',
          answer:
            'A 100% increase means adding 100% of the initial number to itself, which results in exactly twice the starting value (2x multiplier).',
        },
      ],
    },
  },
  {
    slug: 'average-calculator',
    name: 'Average Calculator',
    shortDescription: 'Compute the arithmetic mean, median, mode, sum, count, and range for any set of numbers.',
    category: 'math',
    secondaryCategories: ['statistics', 'education'],
    keywords: [
      'average calculator',
      'mean median mode calculator',
      'calculate average',
      'arithmetic mean',
      'central tendency calculator',
    ],
    tags: ['Math', 'Statistics', 'Averages', 'Data'],
    icon: 'BarChart',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-01-25',
    seo: {
      title: 'Average Calculator – Mean, Median, Mode & Range Finder',
      metaDescription: 'Free online average calculator. Calculate arithmetic mean, median, mode, range, and total sum for comma-separated or space-separated numbers.',
      keywords: ['average calculator', 'mean calculator', 'median calculator', 'mode calculator'],
    },
    relatedCalculators: [
      'percentage-calculator',
      'percentage-increase-calculator',
    ],
    editorial: {
      whatIs:
        'An average calculator computes the central tendency of a data collection. It calculates the arithmetic mean (sum divided by count), the median (the midpoint value), the mode (the most frequent value), and the range (dispersion between maximum and minimum).',
      howToUse: [
        'Enter your numbers separated by commas, spaces, or line breaks into the input box.',
        'View the calculated mean, median, mode, minimum, maximum, range, and overall sum in real-time.',
        'Click Reset to clear your inputs or Copy to save the computed statistical summary.',
      ],
      formula: {
        title: 'Arithmetic Mean Formula',
        expression: '\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i = \\frac{x_1 + x_2 + \\dots + x_n}{n}',
        explanation:
          'Sum all numbers in the dataset and divide the resulting sum by the total quantity of numbers (n).',
      },
      example: {
        scenario: 'Find the average and median of student quiz scores: 85, 90, 75, 90, 100.',
        steps: [
          'Sum the scores: 85 + 90 + 75 + 90 + 100 = 440.',
          'Count items: n = 5.',
          'Mean: 440 / 5 = 88.',
          'Sort dataset for median: 75, 85, 90, 90, 100. The middle value is 90.',
          'Mode: 90 appears twice.',
        ],
        result: 'Mean is 88, Median is 90, Mode is 90, Range is 25 (100 - 75).',
      },
      tips: [
        'Use the median instead of the mean when your dataset contains extreme outliers (such as income or housing prices).',
        'If an even number of values exists, the median is calculated by averaging the two middle numbers.',
      ],
      faqs: [
        {
          question: 'What is the difference between mean and average?',
          answer:
            'In everyday language, average usually refers to the arithmetic mean. In statistics, average is an umbrella term that includes mean, median, and mode.',
        },
        {
          question: 'Can a dataset have more than one mode?',
          answer:
            'Yes. A dataset with two modes is bimodal, with three is trimodal, and with many is multimodal. If all values appear with equal frequency, there is no mode.',
        },
      ],
    },
  },
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    shortDescription: 'Calculate your exact age in years, months, days, total hours, minutes, and seconds, with a countdown to your next birthday.',
    category: 'date-time',
    secondaryCategories: ['everyday', 'health'],
    keywords: [
      'age calculator',
      'chronological age',
      'how old am i',
      'calculate age from date of birth',
      'birthday countdown',
    ],
    tags: ['Date & Time', 'Age', 'Birthday', 'Everyday'],
    icon: 'Calendar',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-01',
    seo: {
      title: 'Age Calculator – Exact Age in Years, Months, Days & Hours',
      metaDescription: 'Free online age calculator. Find your exact chronological age in years, months, days, hours, and minutes, plus a next birthday countdown.',
      keywords: ['age calculator', 'calculate age', 'how old am i calculator', 'exact age calculator'],
    },
    relatedCalculators: [
      'date-difference-calculator',
      'bmi-calculator',
    ],
    editorial: {
      whatIs:
        'An age calculator determines the exact chronological span between a date of birth and a target reference date (typically the current day). It accounts for varying month lengths, leap years, and calendar irregularities.',
      howToUse: [
        'Select your date of birth using the date picker.',
        'Optionally modify the "Age at the Date of" field if calculating age at a historical or future milestone.',
        'Immediately review your age broken down into years, months, and days, along with secondary metrics including total days, total hours, and next birthday countdown.',
      ],
      formula: {
        title: 'Age Calculation Principle',
        expression: '\\text{Age} = \\text{Target Date} - \\text{Birth Date} \\quad (\\text{accounting for Gregorian calendar variations})',
        explanation:
          'Years are calculated from full solar years elapsed. Months and days are resolved by subtracting birth components from target components and borrowing days from the preceding month if necessary.',
      },
      example: {
        scenario: 'A person born on March 15, 1995 checks their age on September 4, 2026.',
        steps: [
          'Years elapsed: 2026 - 1995 = 31 years.',
          'Months elapsed since March: September (9) - March (3) = 5 full months and remaining days.',
          'Exact difference: 31 years, 5 months, 20 days.',
        ],
        result: 'The individual is exactly 31 years, 5 months, and 20 days old.',
      },
      tips: [
        'Most legal definitions (such as driver licensing or voting) consider a person to reach an age on the exact anniversary date in their local timezone.',
        'For individuals born on February 29 (leap day), common convention recognizes their non-leap year birthday on March 1.',
      ],
      faqs: [
        {
          question: 'Does this age calculator account for leap years?',
          answer:
            'Yes. The calculation uses full astronomical and calendar date methods, properly accounting for 366-day leap years.',
        },
        {
          question: 'Is my birth date stored on your server?',
          answer:
            'No. Calculat performs all computations directly inside your web browser. No dates or personal details are uploaded or stored remotely.',
        },
      ],
    },
  },
  {
    slug: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    shortDescription: 'Calculate the exact number of days, weeks, months, years, and business days between two dates.',
    category: 'date-time',
    secondaryCategories: ['business', 'everyday'],
    keywords: [
      'date difference calculator',
      'days between dates',
      'business days calculator',
      'how many days between two dates',
      'work days calculator',
    ],
    tags: ['Date & Time', 'Business Days', 'Deadlines', 'Planning'],
    icon: 'CalendarRange',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-02-05',
    seo: {
      title: 'Date Difference Calculator – Days & Business Days Between Dates',
      metaDescription: 'Calculate days between two dates online. Includes total days, weeks, months, business days (Mon–Fri), and weekends with custom inclusive settings.',
      keywords: ['days between dates', 'date difference calculator', 'business days calculator'],
    },
    relatedCalculators: [
      'age-calculator',
      'loan-calculator',
    ],
    editorial: {
      whatIs:
        'A date difference calculator computes the temporal duration between two calendar dates. It provides breakdowns of total calendar days, full weeks, months, calendar years, and working business days (excluding Saturdays and Sundays).',
      howToUse: [
        'Select the Start Date.',
        'Select the End Date.',
        'Toggle "Include End Date" if your project or rental duration counts both boundaries.',
        'Review the business days, weekend days, and full year/month/day duration.',
      ],
      formula: {
        title: 'Date Difference Computation',
        expression: '\\Delta t = \\frac{t_2 - t_1}{86,400,000 \\text{ ms/day}}',
        explanation:
          'Universal Time Coordinated (UTC) midnight timestamps are subtracted to avoid daylight saving shifts, and days of the week are evaluated to isolate Monday through Friday business days.',
      },
      example: {
        scenario: 'Find working days between October 1, 2026 and October 15, 2026.',
        steps: [
          'Total span: 14 calendar days.',
          'Weekend days: 4 days (2 Saturdays, 2 Sundays).',
          'Business days: 10 working days.',
        ],
        result: '14 calendar days, 10 business days, 4 weekend days.',
      },
      tips: [
        'When calculating contract periods, check whether the contract terms define days as calendar days or working business days.',
        'Turn on "Include End Date" when calculating hotel stays vs. inclusive event dates.',
      ],
      faqs: [
        {
          question: 'Are public holidays excluded from business days?',
          answer:
            'This calculator standardizes business days as Monday through Friday. Because national holidays differ across jurisdictions and companies, federal holidays are not automatically deducted.',
        },
        {
          question: 'Does the calculator work across centuries?',
          answer:
            'Yes, the underlying calendar system uses Gregorian calendar standards for past and future centuries.',
        },
      ],
    },
  },
  {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    shortDescription: 'Calculate your Body Mass Index (BMI), identify weight categories, and discover your healthy weight range in metric or imperial units.',
    category: 'health',
    secondaryCategories: ['fitness', 'everyday'],
    keywords: [
      'bmi calculator',
      'body mass index calculator',
      'calculate bmi',
      'ideal weight calculator',
      'healthy weight range',
      'cdc bmi chart',
    ],
    tags: ['Health', 'Fitness', 'Weight', 'Wellness'],
    icon: 'HeartPulse',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-10',
    seo: {
      title: 'BMI Calculator – Free Body Mass Index & Healthy Weight Range',
      metaDescription: 'Calculate Body Mass Index (BMI) for adults using metric (kg/cm) or imperial (lbs/inches). Discover WHO weight classification and healthy target weight.',
      keywords: ['bmi calculator', 'body mass index', 'free bmi test', 'healthy weight calculator'],
    },
    relatedCalculators: [
      'age-calculator',
      'tip-calculator',
    ],
    editorial: {
      whatIs:
        'A Body Mass Index (BMI) calculator estimates body fatness based on an individual\'s weight and height. Established by Belgian statistician Adolphe Quetelet, BMI is utilized worldwide by the World Health Organization (WHO) and Centers for Disease Control and Prevention (CDC) as an initial health screening metric.',
      howToUse: [
        'Select your preferred measurement system (Metric: kilograms and centimeters, or Imperial: pounds, feet, and inches).',
        'Enter your height and weight.',
        'View your computed BMI score, CDC/WHO category classification, healthy weight target range, and BMI Prime.',
      ],
      formula: {
        title: 'BMI Formulas',
        expression: '\\text{Metric: } \\text{BMI} = \\frac{\\text{weight (kg)}}{[\\text{height (m)}]^2} \\quad \\text{Imperial: } \\text{BMI} = \\frac{703 \\times \\text{weight (lbs)}}{[\\text{height (in)}]^2}',
        explanation:
          'Divide body weight by height squared. For imperial measurements, multiply weight in pounds by 703 before dividing by height in inches squared.',
      },
      example: {
        scenario: 'An adult weighs 70 kg and is 175 cm (1.75 m) tall.',
        steps: [
          'Square height in meters: 1.75 × 1.75 = 3.0625 m².',
          'Divide weight by height squared: 70 / 3.0625 = 22.86.',
          'Compare with WHO criteria (18.5 – 24.9 is Normal Weight).',
        ],
        result: 'BMI is 22.9, which falls within the Normal Weight range (healthy weight between 56.7 kg and 76.3 kg).',
      },
      tips: [
        'BMI is a population-level screening benchmark, not a diagnostic tool for body fat percentage.',
        'Muscular athletes and weightlifters often register higher BMIs despite low body fat due to dense muscle mass.',
        'For older adults, maintaining a BMI in the slightly higher range (23–27) is frequently associated with better health outcomes.',
      ],
      faqs: [
        {
          question: 'What are the official BMI categories for adults?',
          answer:
            'According to the WHO: Underweight (< 18.5), Normal Weight (18.5–24.9), Overweight (25.0–29.9), Obesity Class I (30.0–34.9), Obesity Class II (35.0–39.9), and Obesity Class III (≥ 40.0).',
        },
        {
          question: 'Is BMI accurate for children and teenagers?',
          answer:
            'For children and adolescents aged 2 to 19, BMI is assessed using age-and-sex-specific growth chart percentiles rather than fixed adult thresholds.',
        },
      ],
    },
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    shortDescription: 'Calculate investment growth over time with compound interest, regular monthly additions, and detailed yearly amortization schedules.',
    category: 'finance',
    secondaryCategories: ['business', 'education', 'math'],
    keywords: [
      'compound interest calculator',
      'investment calculator',
      'interest calculator',
      'future value calculator',
      'compound growth rate',
      'wealth calculator',
    ],
    tags: ['Finance', 'Investment', 'Savings', 'Wealth'],
    icon: 'TrendingUp',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-15',
    seo: {
      title: 'Compound Interest Calculator – Future Value & Investment Growth',
      metaDescription: 'Free compound interest calculator. Calculate future investment value with recurring monthly contributions, custom compounding frequencies, and growth tables.',
      keywords: ['compound interest calculator', 'investment calculator', 'compound interest formula'],
    },
    relatedCalculators: [
      'loan-calculator',
      'mortgage-calculator',
      'percentage-increase-calculator',
    ],
    editorial: {
      whatIs:
        'A compound interest calculator calculates the exponential growth of money when interest earned in each period is reinvested to generate additional interest in subsequent periods. Albert Einstein famously described compound interest as the eighth wonder of the world.',
      howToUse: [
        'Enter your starting initial investment (Principal).',
        'Specify expected Annual Interest Rate (e.g. 7% for index funds).',
        'Set investment duration in years.',
        'Optionally add regular Monthly Contributions.',
        'Select compounding frequency (Daily, Monthly, Quarterly, or Annually).',
        'Examine your total balance, principal vs. interest breakdown, and annual growth schedule.',
      ],
      formula: {
        title: 'Compound Interest Formula',
        expression: 'A = P\\left(1 + \\frac{r}{n}\\right)^{nt} + PMT \\times \\left[ \\frac{\\left(1 + \\frac{r}{n}\\right)^{nt} - 1}{\\frac{r}{n}} \\right]',
        explanation:
          'Where A is future value, P is initial principal, r is annual nominal interest rate, n is compounding frequency per year, t is time in years, and PMT is periodic deposit.',
      },
      example: {
        scenario: 'Invest $10,000 at 7% annual interest for 10 years compounded monthly with no extra additions.',
        steps: [
          'Initial Principal: $10,000.',
          'Monthly rate: 0.07 / 12 = 0.005833.',
          'Periods: 10 × 12 = 120 months.',
          'Formula: 10,000 × (1.005833)^120 = $20,096.61.',
        ],
        result: 'Future Balance is $20,096.61, representing $10,096.61 in compound interest earnings (more than doubling your money).',
      },
      tips: [
        'The Rule of 72 provides a mental shortcut: divide 72 by your annual interest rate to approximate how many years it takes for your investment to double (e.g., 72 / 7% ≈ 10.3 years).',
        'Starting early is vastly more impactful than investing large sums later, thanks to the compounding duration.',
      ],
      faqs: [
        {
          question: 'What is the difference between simple interest and compound interest?',
          answer:
            'Simple interest is computed solely on the original principal amount. Compound interest is computed on the initial principal plus all accrued interest from previous compounding cycles.',
        },
        {
          question: 'How does compounding frequency affect total return?',
          answer:
            'Higher compounding frequencies (e.g. daily vs. annual) generate slightly more interest over time because earnings start earning interest sooner.',
        },
      ],
    },
  },
  {
    slug: 'loan-calculator',
    name: 'Loan Calculator',
    shortDescription: 'Calculate monthly loan payments, total interest paid, and full loan amortization schedules for personal, auto, or business loans.',
    category: 'finance',
    secondaryCategories: ['business', 'math'],
    keywords: [
      'loan calculator',
      'car loan calculator',
      'personal loan payment calculator',
      'amortization calculator',
      'loan interest calculator',
      'monthly payment calculator',
    ],
    tags: ['Finance', 'Loans', 'Auto', 'Debt'],
    icon: 'DollarSign',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-02-20',
    seo: {
      title: 'Loan Calculator – Monthly Payment & Total Interest Calculator',
      metaDescription: 'Calculate monthly loan payments and total interest for personal loans, auto loans, and debt consolidation with complete amortization breakdown.',
      keywords: ['loan calculator', 'loan payment calculator', 'car loan calculator', 'amortization schedule'],
    },
    relatedCalculators: [
      'mortgage-calculator',
      'compound-interest-calculator',
      'percentage-calculator',
    ],
    editorial: {
      whatIs:
        'A loan calculator determines fixed periodic repayment amounts necessary to fully pay off a borrowed principal amount plus interest over a designated term. It illustrates how early payments consist predominantly of interest, while later payments pay down principal.',
      howToUse: [
        'Enter the total amount borrowed (Loan Amount).',
        'Enter the lender\'s Annual Interest Rate (APR).',
        'Enter the Loan Term in years or months.',
        'Review the calculated fixed monthly payment, total interest paid over the life of the loan, and total repayment cost.',
      ],
      formula: {
        title: 'Fixed Monthly Loan Payment Formula',
        expression: 'M = P \\left[ \\frac{r(1+r)^n}{(1+r)^n - 1} \\right]',
        explanation:
          'Where M is monthly payment, P is principal balance, r is periodic monthly interest rate (annual APR / 12 / 100), and n is total count of monthly payments (years × 12).',
      },
      example: {
        scenario: 'Borrow $20,000 for an auto loan at 6% interest for 5 years (60 months).',
        steps: [
          'Monthly rate: 0.06 / 12 = 0.005.',
          'Calculate multiplier: (1.005)^60 = 1.34885.',
          'Monthly payment: 20,000 × [ (0.005 × 1.34885) / (1.34885 - 1) ] = $386.66.',
          'Total cost: $386.66 × 60 = $23,199.36.',
        ],
        result: 'Monthly payment is $386.66. Total interest paid is $3,199.36.',
      },
      tips: [
        'Making one extra monthly payment each year or paying bi-weekly can significantly reduce total interest paid and shorten loan term.',
        'Beware of hidden origination fees and prepayment penalties when evaluating competing loan offers.',
      ],
      faqs: [
        {
          question: 'What is an amortization schedule?',
          answer:
            'An amortization schedule is a complete table showing each periodic payment, detailing the exact portion that pays down interest vs. principal, and the remaining balance after each installment.',
        },
        {
          question: 'How do extra payments affect my loan?',
          answer:
            'When extra payments are applied directly to principal, they reduce the balance that future interest is computed on, saving significant money and retiring the loan early.',
        },
      ],
    },
  },
  {
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    shortDescription: 'Estimate your complete monthly mortgage payment including principal, interest, property taxes, homeowners insurance, HOA dues, and PMI.',
    category: 'finance',
    secondaryCategories: ['business', 'everyday'],
    keywords: [
      'mortgage calculator',
      'home loan calculator',
      'house payment calculator',
      'mortgage payment with pmi and taxes',
      'piti calculator',
    ],
    tags: ['Finance', 'Mortgage', 'Real Estate', 'Home Buying'],
    icon: 'Home',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-02-25',
    seo: {
      title: 'Mortgage Calculator – Estimate Monthly Payment with Taxes & Insurance',
      metaDescription: 'Free online mortgage calculator. Calculate complete monthly payments (PITI), including principal, interest, property taxes, insurance, and HOA fees.',
      keywords: ['mortgage calculator', 'house payment calculator', 'home loan payment calculator'],
    },
    relatedCalculators: [
      'loan-calculator',
      'compound-interest-calculator',
      'percentage-calculator',
    ],
    editorial: {
      whatIs:
        'A mortgage calculator estimates the full cost of homeownership by calculating the monthly PITI (Principal, Interest, Taxes, and Insurance) payment. It accounts for down payment percentages, private mortgage insurance (PMI), and homeowners association fees.',
      howToUse: [
        'Input the purchase Home Price.',
        'Enter your Down Payment (as a percentage or dollar amount).',
        'Select the Loan Term (30-year fixed, 15-year fixed, etc.).',
        'Enter the quoted mortgage Interest Rate.',
        'Add annual property tax rate (national average is ~1.2%) and homeowners insurance.',
        'Review the complete monthly payment breakdown and total interest paid over the life of the mortgage.',
      ],
      formula: {
        title: 'Mortgage Principal and Interest Formula',
        expression: 'M = P \\left[ \\frac{r(1+r)^n}{(1+r)^n - 1} \\right] + \\text{Taxes} + \\text{Insurance} + \\text{HOA} + \\text{PMI}',
        explanation:
          'Principal & interest (P&I) is calculated using standard amortization mathematics, then monthly property taxes, homeowners hazard insurance, HOA dues, and PMI are added to form the complete monthly payment.',
      },
      example: {
        scenario: 'A $400,000 home purchase with a 20% down payment ($80,000), 30-year fixed loan at 6.5%, 1.2% property tax, and $1,200 annual insurance.',
        steps: [
          'Loan Amount: $400,000 - $80,000 = $320,000.',
          'Monthly Principal & Interest: $2,022.62.',
          'Monthly Property Taxes: ($400,000 × 0.012) / 12 = $400.00.',
          'Monthly Insurance: $1,200 / 12 = $100.00.',
          'PMI: $0 (because down payment is ≥ 20%).',
        ],
        result: 'Total monthly payment is $2,522.62.',
      },
      tips: [
        'Putting down at least 20% eliminates Private Mortgage Insurance (PMI), potentially saving $100–$300 per month.',
        'A 15-year fixed mortgage usually offers lower interest rates and cuts total interest paid by more than 50% compared to a 30-year loan.',
      ],
      faqs: [
        {
          question: 'What is PMI and when does it cancel?',
          answer:
            'Private Mortgage Insurance protects the lender if a borrower defaults. Lenders are required under the Homeowners Protection Act to cancel PMI automatically once loan-to-value drops to 78%.',
        },
        {
          question: 'What is included in an escrow account?',
          answer:
            'Most lenders collect monthly estimates for annual property taxes and homeowners insurance along with your principal and interest, holding these funds in escrow to pay the bills when due.',
        },
      ],
    },
  },
  {
    slug: 'tip-calculator',
    name: 'Tip Calculator',
    shortDescription: 'Calculate restaurant tips, split bills equally among friends, and round up totals cleanly for stress-free dining.',
    category: 'everyday',
    secondaryCategories: ['math', 'finance'],
    keywords: [
      'tip calculator',
      'bill split calculator',
      'restaurant tip calculator',
      'calculate gratuity',
      'split bill evenly',
    ],
    tags: ['Everyday', 'Dining', 'Tipping', 'Money'],
    icon: 'Receipt',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-03-01',
    seo: {
      title: 'Tip Calculator – Fast Bill Splitting & Gratuity Calculator',
      metaDescription: 'Free online tip calculator. Calculate restaurant gratuity, customize tip percentages, split checks between multiple people, and round up totals.',
      keywords: ['tip calculator', 'bill split calculator', 'gratuity calculator'],
    },
    relatedCalculators: [
      'percentage-calculator',
      'average-calculator',
    ],
    editorial: {
      whatIs:
        'A tip calculator calculates the appropriate gratuity amount for service staff based on the subtotal of a bill, and divides the total cost evenly among diners in a party.',
      howToUse: [
        'Enter the pre-tax or post-tax Bill Amount.',
        'Select a standard tip percentage button (15%, 18%, 20%, 25%) or type a custom percentage.',
        'Select how many people are splitting the bill.',
        'Toggle "Round Up Total" if you prefer paying even dollar amounts.',
        'Read the exact tip amount, total bill, and amount each individual owes.',
      ],
      formula: {
        title: 'Tip Calculation Formula',
        expression: '\\text{Tip} = \\text{Bill} \\times \\left(\\frac{\\text{Tip }\\%}{100}\\right) \\quad \\text{and} \\quad \\text{Per Person} = \\frac{\\text{Bill} + \\text{Tip}}{\\text{Split Count}}',
        explanation:
          'Multiply the bill by the tip percentage divided by 100 to compute total gratuity, add gratuity to the bill, and divide by the number of guests.',
      },
      example: {
        scenario: 'A dinner bill comes to $84.00, tipped at 20%, shared between 3 friends.',
        steps: [
          'Calculate tip: $84.00 × 0.20 = $16.80.',
          'Total bill: $84.00 + $16.80 = $100.80.',
          'Split per person: $100.80 / 3 = $33.60 each.',
        ],
        result: 'Tip is $16.80 ($5.60/person). Total per person is $33.60.',
      },
      tips: [
        'In the United States, standard restaurant service typically warrants 18% to 20%, exceptional service 22% to 25%, and buffet/counter service 10% to 15%.',
        'Check your receipt before tipping to ensure gratuity was not already added automatically for large parties.',
      ],
      faqs: [
        {
          question: 'Should you tip on pre-tax or post-tax amount?',
          answer:
            'Etiquette guidelines generally suggest calculating the tip on the pre-tax food and drink subtotal, though tipping on the post-tax total has become increasingly common.',
        },
        {
          question: 'How do you calculate a 20% tip mentally?',
          answer:
            'Move the decimal point one position to the left to find 10%, then double that number. For example, for a $65 bill, 10% is $6.50, and doubling that gives $13.00.',
        },
      ],
    },
  },
  ...NUMEROLOGY_CALCULATORS,
];

// Helper query functions
export function getAllCalculators(): CalculatorDefinition[] {
  return CALCULATORS;
}

export function getAllPublishedCalculators(): CalculatorDefinition[] {
  return CALCULATORS.filter(c => c.status === 'published');
}

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return CALCULATORS.find(c => c.slug === slug && c.status === 'published');
}

export function getCalculatorsByCategory(categorySlug: CategorySlug): CalculatorDefinition[] {
  return CALCULATORS.filter(
    c =>
      c.status === 'published' &&
      (c.category === categorySlug || c.secondaryCategories?.includes(categorySlug))
  );
}

export function getFeaturedCalculators(): CalculatorDefinition[] {
  return CALCULATORS.filter(c => c.status === 'published' && c.featured);
}

export function getPopularCalculators(): CalculatorDefinition[] {
  return CALCULATORS.filter(c => c.status === 'published' && c.popular);
}

export function getRecentCalculatorsList(limit: number = 6): CalculatorDefinition[] {
  return [...CALCULATORS]
    .filter(c => c.status === 'published')
    .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
    .slice(0, limit);
}

export function getRelatedCalculators(calculator: CalculatorDefinition, limit: number = 4): CalculatorDefinition[] {
  const published = getAllPublishedCalculators().filter(c => c.slug !== calculator.slug);

  // If explicit related calculators specified, prioritize those
  if (calculator.relatedCalculators && calculator.relatedCalculators.length > 0) {
    const explicitMatches: CalculatorDefinition[] = [];
    for (const slug of calculator.relatedCalculators) {
      const match = published.find(c => c.slug === slug);
      if (match) explicitMatches.push(match);
    }
    if (explicitMatches.length >= limit) {
      return explicitMatches.slice(0, limit);
    }
    // Fill remaining with category matches
    const remaining = published.filter(c => !explicitMatches.some(m => m.slug === c.slug));
    const categoryMatches = remaining.filter(
      c => c.category === calculator.category || c.secondaryCategories?.includes(calculator.category)
    );
    return [...explicitMatches, ...categoryMatches].slice(0, limit);
  }

  // Fallback: match by primary/secondary category and tags
  const scored = published.map(candidate => {
    let score = 0;
    if (candidate.category === calculator.category) score += 5;
    if (calculator.secondaryCategories?.includes(candidate.category)) score += 3;
    if (candidate.secondaryCategories?.includes(calculator.category)) score += 3;

    // Tag overlap
    const tagMatches = candidate.tags.filter(tag => calculator.tags.includes(tag)).length;
    score += tagMatches * 2;

    return { candidate, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.candidate);
}

export function getActiveCategoriesWithCount(): { category: typeof CATEGORIES[CategorySlug]; count: number }[] {
  const published = getAllPublishedCalculators();
  const counts: Record<string, number> = {};

  for (const calc of published) {
    counts[calc.category] = (counts[calc.category] || 0) + 1;
    if (calc.secondaryCategories) {
      for (const sec of calc.secondaryCategories) {
        counts[sec] = (counts[sec] || 0) + 1;
      }
    }
  }

  return Object.values(CATEGORIES).map(cat => ({
    category: cat,
    count: counts[cat.slug] || 0,
  }));
}
