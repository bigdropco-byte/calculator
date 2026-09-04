import { CalculatorDefinition } from '../types';

export const DATE_TIME_CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'date-calculator',
    name: 'Date Calculator',
    shortDescription: 'Add or subtract days, weeks, months, and years from any date or calculate the exact duration between two dates.',
    category: 'date-time',
    secondaryCategories: ['everyday', 'business'],
    keywords: ['date calculator', 'add days to date', 'subtract days from date', 'calendar calculator', 'days between dates'],
    tags: ['Date', 'Calendar', 'Time', 'Day Counter'],
    icon: 'Calendar',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-23',
    seo: {
      title: 'Date Calculator – Add or Subtract Days, Weeks, Months & Years',
      metaDescription: 'Free online date calculator. Add or subtract calendar days, weeks, months, or years from any date, or calculate the exact calendar duration between two dates.',
      keywords: ['date calculator', 'add days to date', 'date plus days', 'subtract days from date', 'calendar date calculator'],
    },
    relatedCalculators: ['date-difference-calculator', 'days-calculator', 'weeks-calculator', 'months-calculator'],
    editorial: {
      whatIs: 'A date calculator performs calendar arithmetic, allowing users to project forward or backward in time by adding or subtracting specific numbers of days, weeks, months, or years from an initial starting date. It accounts for variable month lengths (28, 29, 30, or 31 days) and Gregorian leap years.',
      howToUse: [
        'Select your starting calendar date.',
        'Choose whether to add (+) or subtract (-) time.',
        'Enter the number of years, months, weeks, or days to adjust.',
        'Instantly view the resulting calendar date, day of the week, and ISO format.',
      ],
      formula: {
        title: 'Calendar Projection Logic',
        expression: 'D_{\\text{target}} = D_{\\text{start}} \\pm (365.25 \\cdot Y + 30.44 \\cdot M + 7 \\cdot W + D)',
        explanation: 'Calendar arithmetic applies variable month end clipping and Gregorian 400-year leap rules to ensure accurate date projections.',
      },
      example: {
        scenario: 'A contract starts on March 15, 2025 and runs for 90 days.',
        steps: [
          'Start date: March 15, 2025.',
          'Add 90 calendar days.',
          'March has 16 remaining days, April has 30 days, May has 31 days (total 77 days).',
          '90 - 77 = 13 days into June.',
        ],
        result: 'Contract completion date is Friday, June 13, 2025.',
      },
      tips: [
        'When adding months to dates ending on the 31st (e.g., January 31 + 1 month), dates automatically clip to the last day of February (Feb 28 or 29).',
        'Business contracts often require adding business days rather than calendar days; check our business days counter if excluding weekends.',
        'Leap day (February 29) occurs only on years divisible by 4, except century years not divisible by 400.',
      ],
      faqs: [
        {
          question: 'How do you add 30 days to a date?',
          answer: 'To add 30 days to a date, increment the day counter by 30 while advancing the month whenever the current month’s total days (28 to 31) are exceeded.',
        },
        {
          question: 'Does this date calculator support leap years?',
          answer: 'Yes, our engine automatically accounts for February having 29 days during leap years (such as 2024, 2028, and 2032).',
        },
        {
          question: 'Can I calculate the number of days between two dates?',
          answer: 'Yes, switch to the "Days Between Dates" mode to see total calendar days, business days, and weekend days between any two dates.',
        },
        {
          question: 'Why does adding one month not always equal 30 days?',
          answer: 'Months in the Gregorian calendar vary between 28 and 31 days. Adding 1 month moves to the equivalent day number in the following month regardless of day count.',
        },
      ],
    },
  },
  {
    slug: 'time-calculator',
    name: 'Time Calculator',
    shortDescription: 'Add, subtract, and calculate elapsed time across hours, minutes, and seconds with decimal hour conversions.',
    category: 'date-time',
    secondaryCategories: ['everyday', 'conversion'],
    keywords: ['time calculator', 'add time', 'subtract time', 'hours and minutes calculator', 'time addition'],
    tags: ['Time', 'Clock', 'Hours', 'Minutes', 'Seconds'],
    icon: 'Clock',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-23',
    seo: {
      title: 'Time Calculator – Add & Subtract Hours, Minutes, and Seconds',
      metaDescription: 'Free time calculator to add and subtract hours, minutes, and seconds. Calculate total elapsed duration, decimal hours, and cumulative timesheets.',
      keywords: ['time calculator', 'add hours and minutes', 'time subtraction', 'calculate time', 'clock calculator'],
    },
    relatedCalculators: ['time-addition-subtraction-calculator', 'hours-calculator', 'seconds-to-time-calculator'],
    editorial: {
      whatIs: 'A time calculator performs sexagesimal (base-60) arithmetic on hours, minutes, and seconds. It converts irregular time measurements into normalized decimal hours or standard HH:MM:SS formats for payroll, racing, video editing, and project management.',
      howToUse: [
        'Enter hours, minutes, and seconds for Time 1.',
        'Choose whether to add (+) or subtract (-) Time 2.',
        'Enter values for Time 2.',
        'View the normalized total in HH:MM:SS, decimal hours, and total seconds.',
      ],
      formula: {
        title: 'Sexagesimal Time Summation',
        expression: 'T_{\\text{total}} = \\sum (H \\cdot 3600 + M \\cdot 60 + S)',
        explanation: 'Time values are converted to total base seconds, summed or differenced, then converted back into modulo 60 minutes and hours.',
      },
      example: {
        scenario: 'A project task took 2 hours 45 minutes on Monday and 1 hour 35 minutes on Tuesday.',
        steps: [
          'Time 1: 2h 45m = 165 minutes.',
          'Time 2: 1h 35m = 95 minutes.',
          'Sum: 165 + 95 = 260 minutes.',
          '260 / 60 = 4 hours and 20 minutes (4.33 decimal hours).',
        ],
        result: 'Total project duration is 4 hours 20 minutes 00 seconds (4.333 hrs).',
      },
      tips: [
        'To convert minutes to decimal hours for billing or payroll, divide minutes by 60 (e.g. 15 min = 0.25h, 30 min = 0.5h, 45 min = 0.75h).',
        'When adding times exceeding 24 hours, the calculator reports both cumulative hours and days/hours breakdowns.',
        'Video and audio editing frequently rely on frame-accurate sexagesimal arithmetic.',
      ],
      faqs: [
        {
          question: 'How do you add hours and minutes together?',
          answer: 'Add minutes together. If minutes exceed 59, subtract 60 from minutes and add 1 to hours. Then add the hours together.',
        },
        {
          question: 'How do you convert 45 minutes to decimal hours?',
          answer: 'Divide 45 by 60: 45 ÷ 60 = 0.75 decimal hours.',
        },
        {
          question: 'What is base-60 math in time calculation?',
          answer: 'Sexagesimal math is base-60, originating from ancient Babylonians. There are 60 seconds in a minute and 60 minutes in an hour.',
        },
        {
          question: 'Can this calculator subtract time intervals?',
          answer: 'Yes, select the Subtract (-) operator to find remaining time or duration differences.',
        },
      ],
    },
  },
  {
    slug: 'date-time-calculator',
    name: 'Date Time Calculator',
    shortDescription: 'Calculate the exact span between two specific date-time timestamps including days, hours, minutes, and seconds.',
    category: 'date-time',
    secondaryCategories: ['technology', 'everyday'],
    keywords: ['date time calculator', 'datetime difference', 'time between two dates', 'date and time counter'],
    tags: ['DateTime', 'Timestamp', 'Duration', 'Clock'],
    icon: 'CalendarDays',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-01-23',
    seo: {
      title: 'Date Time Calculator – Exact Duration Between Two Timestamps',
      metaDescription: 'Calculate the exact duration between any two dates and times down to the minute and second. Computes total elapsed days, hours, and minutes.',
      keywords: ['date time calculator', 'hours between dates', 'calculate datetime', 'time elapsed between dates'],
    },
    relatedCalculators: ['date-calculator', 'time-calculator', 'hours-calculator'],
    editorial: {
      whatIs: 'A date-time calculator determines the precise duration between two distinct chronological moments, combining calendar date arithmetic with clock time. It is used for tracking flight durations, hospital patient admissions, server uptime, and project deadlines.',
      howToUse: [
        'Select the starting date and time.',
        'Select the ending date and time.',
        'The calculator instantly calculates total days, hours, minutes, and total decimal hours elapsed.',
      ],
      formula: {
        title: 'Unix Millisecond Timestamp Delta',
        expression: '\\Delta t = \\frac{t_2 - t_1}{1000 \\cdot 60 \\cdot 60 \\cdot 24}',
        explanation: 'Difference between two ISO epoch timestamps evaluated in continuous seconds, decomposed into calendar days and clock components.',
      },
      example: {
        scenario: 'An IT server migration begins Friday at 18:00 and finishes Sunday at 08:30.',
        steps: [
          'Start: Friday 18:00 to Saturday 18:00 = 24 hours.',
          'Saturday 18:00 to Sunday 08:30 = 14 hours 30 minutes.',
          'Total: 38 hours 30 minutes.',
        ],
        result: 'Elapsed time is 1 day, 14 hours, 30 minutes (38.50 total hours).',
      },
      tips: [
        'Always verify daylight saving time (DST) shifts if calculating intervals spanning March or November time changes.',
        'For flight itineraries crossing multiple time zones, convert both departure and arrival times to UTC first.',
        'Uptime percentages in cloud hosting (e.g. 99.99%) allow no more than 4.38 minutes of downtime per month.',
      ],
      faqs: [
        {
          question: 'How does the calculator handle overnight times?',
          answer: 'Because full calendar dates are included with the times, overnight periods automatically increment the day counter correctly.',
        },
        {
          question: 'Can I calculate decimal hours between dates?',
          answer: 'Yes, the results card provides the exact total decimal hours (e.g. 38.50 hours).',
        },
        {
          question: 'Does this handle leap seconds?',
          answer: 'Leap seconds are handled in international atomic time standards; this tool uses standard UTC 86,400-second calendar days.',
        },
        {
          question: 'What format should datetime inputs be in?',
          answer: 'The calculator provides a native datetime-local picker compatible with all mobile and desktop browsers.',
        },
      ],
    },
  },
  {
    slug: 'time-addition-subtraction-calculator',
    name: 'Time Addition/Subtraction',
    shortDescription: 'Add and subtract multiple running timestamps, lap splits, or shift durations in a single cumulative timesheet.',
    category: 'date-time',
    secondaryCategories: ['business', 'sports'],
    keywords: ['time addition subtraction', 'add multiple times', 'time sum calculator', 'cumulative time'],
    tags: ['Time Addition', 'Cumulative Time', 'Timesheet', 'Splits'],
    icon: 'Plus',
    status: 'published',
    featured: false,
    popular: false,
    addedDate: '2025-01-23',
    seo: {
      title: 'Time Addition & Subtraction Calculator – Sum Multiple Times',
      metaDescription: 'Calculate cumulative running time across multiple entries. Add and subtract hours and minutes for billing, payroll, sports splits, and audio editing.',
      keywords: ['time addition subtraction', 'sum time', 'add time rows', 'running time calculator'],
    },
    relatedCalculators: ['time-calculator', 'hours-calculator', 'average-time-calculator'],
    editorial: {
      whatIs: 'A multi-row time addition and subtraction calculator allows users to enter multiple intervals with individual positive (+) or negative (-) signs to calculate net working time, billable project increments, or audio track timelines.',
      howToUse: [
        'Add as many time rows as needed using the "Add Time Row" button.',
        'Set each row operator to Add (+) or Subtract (-).',
        'Enter hours and minutes for each task or split.',
        'Review net cumulative duration, total minutes, and decimal billing hours.',
      ],
      formula: {
        title: 'Net Cumulative Time Summation',
        expression: 'T_{\\text{net}} = \\sum_{i=1}^n (\\pm_i) (H_i \\cdot 60 + M_i)',
        explanation: 'Each entry is evaluated into signed minutes, summed into net total minutes, and factored into hours and minutes.',
      },
      example: {
        scenario: 'A freelancer works 2h 30m (+), takes an unpaid adjustment of 40m (-), and works another 1h 45m (+).',
        steps: [
          'Row 1: + 150 minutes.',
          'Row 2: - 40 minutes.',
          'Row 3: + 105 minutes.',
          'Net sum: 150 - 40 + 105 = 215 minutes.',
        ],
        result: 'Net billable time is 3 hours 35 minutes (3.58 decimal hours).',
      },
      tips: [
        'Use negative rows to deduct unpaid lunch breaks or idle equipment periods.',
        'Audio engineers use multi-row time addition to sum individual song track lengths into an album runtime.',
        'Decimal hours are rounded to two decimal places for standard corporate invoicing.',
      ],
      faqs: [
        {
          question: 'Can the result be negative?',
          answer: 'Yes, if subtractions exceed additions, the calculator displays a negative time indicator with exact negative minutes.',
        },
        {
          question: 'How many rows can I add?',
          answer: 'You can add as many rows as needed dynamically using the Add Time Row button.',
        },
        {
          question: 'How do I convert the final time to billing decimals?',
          answer: 'The calculator automatically converts the resulting hours and minutes into decimal format in real time.',
        },
        {
          question: 'Can I delete a specific row?',
          answer: 'Yes, click the red "X" button next to any row to remove it from the total.',
        },
      ],
    },
  },
  {
    slug: 'hours-calculator',
    name: 'Hours Calculator',
    shortDescription: 'Calculate work hours between clock-in and clock-out times with unpaid break deductions and gross wage earnings.',
    category: 'date-time',
    secondaryCategories: ['business', 'finance'],
    keywords: ['hours calculator', 'work hours calculator', 'calculate hours worked', 'clock in clock out', 'timesheet hours'],
    tags: ['Hours', 'Work Hours', 'Payroll', 'Timesheet', 'Wage'],
    icon: 'Clock',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-23',
    seo: {
      title: 'Hours Calculator – Calculate Work Hours & Wages',
      metaDescription: 'Calculate total work hours between start and end times with unpaid lunch break deductions. Instantly computes decimal hours and gross payroll pay.',
      keywords: ['hours calculator', 'calculate work hours', 'clock in clock out calculator', 'timesheet calculator', 'hours worked'],
    },
    relatedCalculators: ['time-card-calculator', 'payroll-hours-calculator', 'overtime-calculator'],
    editorial: {
      whatIs: 'An hours calculator computes total time worked during a work shift by taking clock-in and clock-out times, deducting unpaid break minutes, and converting net time into decimal hours. It also calculates gross pay based on an optional hourly wage.',
      howToUse: [
        'Enter your shift start time (clock in).',
        'Enter your shift end time (clock out).',
        'Enter any unpaid break minutes (e.g. 30 or 60 min lunch).',
        'Enter your hourly wage to see total earnings for the shift.',
      ],
      formula: {
        title: 'Net Work Hours Equation',
        expression: 'H_{\\text{net}} = \\frac{(T_{\\text{out}} - T_{\\text{in}}) - T_{\\text{break}}}{60} \\quad ; \\quad \\text{Pay} = H_{\\text{net}} \\cdot \\text{Wage}',
        explanation: 'Elapsed clock minutes minus unpaid break minutes converted to base-10 decimal hours for payroll multiplication.',
      },
      example: {
        scenario: 'Clocked in at 08:30 AM, clocked out at 05:00 PM, 45-minute lunch break, $24/hr wage.',
        steps: [
          '08:30 to 17:00 = 8 hours 30 minutes (510 minutes).',
          'Deduct 45 min break: 510 - 45 = 465 minutes.',
          '465 / 60 = 7 hours 45 minutes = 7.75 decimal hours.',
          '7.75 hrs × $24/hr = $186.00.',
        ],
        result: 'Total shift is 7 hours 45 minutes (7.75 hrs). Gross earnings: $186.00.',
      },
      tips: [
        'Overnight shifts (e.g. clock in 10 PM, clock out 6 AM) are automatically handled across the midnight threshold.',
        'Employers generally require payroll hours reported in hundredths (e.g., 7.75 hrs) or tenths (e.g., 7.8 hrs).',
        'Check local labor laws regarding mandatory rest break compensation vs unpaid meal break requirements.',
      ],
      faqs: [
        {
          question: 'How do you calculate hours worked across midnight?',
          answer: 'If the end time is numerically earlier than the start time, 24 hours (1,440 minutes) are added to the difference to calculate the overnight shift.',
        },
        {
          question: 'What is 7 hours and 45 minutes in decimal format?',
          answer: 'Divide 45 minutes by 60 = 0.75. Therefore, 7 hours and 45 minutes equals 7.75 decimal hours.',
        },
        {
          question: 'Are lunch breaks typically paid or unpaid?',
          answer: 'Under US FLSA guidelines, bona fide meal periods (typically 30 minutes or more) where the employee is completely relieved of duty are unpaid.',
        },
        {
          question: 'Can I use this for multiple days?',
          answer: 'For full weekly shifts Monday through Sunday, use our dedicated Time Card Calculator.',
        },
      ],
    },
  },
  {
    slug: 'days-calculator',
    name: 'Days Calculator',
    shortDescription: 'Count calendar days, business days, and weekends between any two dates with custom end-date inclusion.',
    category: 'date-time',
    secondaryCategories: ['everyday', 'business'],
    keywords: ['days calculator', 'count days', 'how many days between', 'calendar days calculator', 'business days'],
    tags: ['Days', 'Calendar', 'Count', 'Business Days'],
    icon: 'Calendar',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-23',
    seo: {
      title: 'Days Calculator – Count Days Between Dates',
      metaDescription: 'Free days calculator. Count total calendar days, working business days, and weekend days between any two dates. Includes quick duration presets.',
      keywords: ['days calculator', 'count days between dates', 'how many days between two dates', 'calendar days'],
    },
    relatedCalculators: ['date-calculator', 'weeks-calculator', 'months-calculator'],
    editorial: {
      whatIs: 'A days calculator counts the exact number of days between two dates on the Gregorian calendar. It decomposes the total duration into working days (Monday–Friday) and weekend days (Saturday–Sunday), essential for court deadlines, leasing agreements, and project sprints.',
      howToUse: [
        'Select the start date.',
        'Select the end date.',
        'Check the box if you wish to include the end date in the count (+1 day).',
        'Review total calendar days, business days, and weekend counts.',
      ],
      formula: {
        title: 'Days Count Expression',
        expression: 'D_{\\text{total}} = \\left\\lfloor \\frac{\\text{Date}_2 - \\text{Date}_1}{86,400,000} \\right\\rfloor + (\\text{if inclusive: } 1)',
        explanation: 'Calendar day count derived from 86,400,000 milliseconds per standard calendar day.',
      },
      example: {
        scenario: 'Counting days from September 1 to November 30.',
        steps: [
          'September has 30 days, October has 31 days, November has 30 days.',
          'From Sept 1 to Nov 30 is 90 calendar days.',
          'Includes 65 business days and 25 weekend days.',
        ],
        result: 'Total duration is 90 calendar days (12 weeks and 6 days).',
      },
      tips: [
        'Leasing and statutory notices often define deadlines in "calendar days" whereas banking and court filings use "business days".',
        'Quick presets (+30, +60, +90, +180, +365) allow 1-click timeline forecasting.',
        'Check state and federal holidays when calculating strictly operational business turnaround times.',
      ],
      faqs: [
        {
          question: 'Does the calculator include both start and end days?',
          answer: 'By standard convention, the start day is included and end day is excluded (delta duration). You can check "Include End Date" to count both days.',
        },
        {
          question: 'How many days are in a leap year?',
          answer: 'A standard year has 365 days, while a leap year has 366 days due to the addition of February 29.',
        },
        {
          question: 'What are business days?',
          answer: 'Business days are standard working days from Monday through Friday, excluding Saturdays and Sundays.',
        },
        {
          question: 'How many weeks are in 90 days?',
          answer: '90 days equals 12 full weeks and 6 days (or approximately 12.86 weeks).',
        },
      ],
    },
  },
  {
    slug: 'weeks-calculator',
    name: 'Weeks Calculator',
    shortDescription: 'Convert weeks to days, hours, minutes, and approximate months for pregnancy milestones, school semesters, and projects.',
    category: 'date-time',
    secondaryCategories: ['everyday', 'health'],
    keywords: ['weeks calculator', 'convert weeks to days', 'weeks to months', 'pregnancy weeks', 'weeks counter'],
    tags: ['Weeks', 'Calendar', 'Pregnancy', 'Time Conversion'],
    icon: 'CalendarDays',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-01-23',
    seo: {
      title: 'Weeks Calculator – Convert Weeks to Days, Hours & Months',
      metaDescription: 'Free weeks calculator. Convert any number of weeks into calendar days, hours, minutes, and months. Includes pregnancy and project milestone presets.',
      keywords: ['weeks calculator', 'weeks to days', 'how many days in weeks', 'weeks to months calculator'],
    },
    relatedCalculators: ['days-calculator', 'months-calculator', 'date-calculator'],
    editorial: {
      whatIs: 'A weeks calculator translates multi-week intervals into equivalent calendar days, working hours, and decimal months. It is widely used by expectant mothers tracking 40-week gestation milestones, fitness coaches planning 12-week transformations, and educators organizing semesters.',
      howToUse: [
        'Enter the number of weeks or click a common milestone preset (e.g. 12, 40, or 52 weeks).',
        'Instantly view the converted total days, hours, minutes, and approximate calendar months.',
      ],
      formula: {
        title: 'Weeks to Time Unit Conversions',
        expression: 'D = W \\cdot 7 \\quad ; \\quad H = W \\cdot 168 \\quad ; \\quad M \\approx \\frac{W}{4.34524}',
        explanation: 'Each week has exactly 7 days (168 hours). The average calendar month comprises 30.4375 days / 7 = 4.34524 weeks.',
      },
      example: {
        scenario: 'A full-term human pregnancy is typically 40 weeks.',
        steps: [
          '40 weeks × 7 days/week = 280 calendar days.',
          '280 days × 24 hours/day = 6,720 hours.',
          '40 / 4.34524 ≈ 9.2 calendar months.',
        ],
        result: '40 weeks equals 280 days (approximately 9.2 months or 6,720 hours).',
      },
      tips: [
        'One full calendar year contains 52 weeks plus 1 day (or 2 days in a leap year).',
        'Because calendar months vary from 28 to 31 days, 4 weeks does not equal 1 full month (except in non-leap February).',
        'Sprint planning in agile software development typically uses 2-week cycles (14 calendar days, 10 business days).',
      ],
      faqs: [
        {
          question: 'How many days are in 12 weeks?',
          answer: 'There are exactly 84 calendar days in 12 weeks (12 × 7 = 84).',
        },
        {
          question: 'How many weeks are in an average month?',
          answer: 'An average Gregorian calendar month has 4.345 weeks (365.25 days ÷ 12 months ÷ 7 days).',
        },
        {
          question: 'How many weeks are in a year?',
          answer: 'A standard year has 52 weeks and 1 day (52.14 weeks). A leap year has 52 weeks and 2 days (52.28 weeks).',
        },
        {
          question: 'Why is pregnancy counted as 40 weeks instead of 9 months?',
          answer: 'Obstetricians calculate pregnancy from the first day of the last menstrual period (LMP), which spans 280 days or 40 weeks.',
        },
      ],
    },
  },
  {
    slug: 'months-calculator',
    name: 'Months Calculator',
    shortDescription: 'Project future dates by adding months or calculate total elapsed months between two calendar dates.',
    category: 'date-time',
    secondaryCategories: ['everyday', 'finance'],
    keywords: ['months calculator', 'add months to date', 'how many months between', 'months counter'],
    tags: ['Months', 'Calendar', 'Date Arithmetic'],
    icon: 'Calendar',
    status: 'published',
    featured: false,
    popular: false,
    addedDate: '2025-01-23',
    seo: {
      title: 'Months Calculator – Add Months to Date & Calculate Months',
      metaDescription: 'Free online months calculator. Add or subtract months from any date, project future milestone dates, and calculate equivalent days and weeks.',
      keywords: ['months calculator', 'add months to date', 'date plus months', 'how many months between dates'],
    },
    relatedCalculators: ['years-calculator', 'weeks-calculator', 'date-calculator'],
    editorial: {
      whatIs: 'A months calculator performs calendar projections based on whole or fractional months. It accurately handles varying calendar month lengths and automatically clips invalid dates (such as April 31 or February 30) to the last valid calendar day.',
      howToUse: [
        'Select your starting calendar date.',
        'Enter the number of months to add (e.g. 6 months for a lease or warranty).',
        'View the projected target date, day of the week, and approximate days count.',
      ],
      formula: {
        title: 'Calendar Month Projection',
        expression: 'M_{\\text{target}} = (M_{\\text{start}} + \\Delta M) \\pmod{12}',
        explanation: 'The year increments by floor((M_start + DeltaM - 1) / 12) while day numbers exceeding the target month’s length clip to that month’s final day.',
      },
      example: {
        scenario: 'Signing a 6-month apartment lease on January 31.',
        steps: [
          'Start date: January 31.',
          'Add 6 months -> July 31.',
          'Both January and July have 31 days.',
        ],
        result: 'Projected lease end date is July 31 (approx 181 calendar days).',
      },
      tips: [
        'Financial certificates of deposit (CDs) and subscriptions typically use 3-month, 6-month, or 12-month terms.',
        'Adding 6 months to August 31 yields February 28 (or Feb 29 in a leap year) because February lacks 31 days.',
        'Quarterly business reporting divides the year into four 3-month blocks (Q1, Q2, Q3, Q4).',
      ],
      faqs: [
        {
          question: 'What happens when you add a month to January 31st?',
          answer: 'Because February has only 28 days (or 29 in a leap year), adding one month to January 31 clips safely to February 28 or 29.',
        },
        {
          question: 'How many days are in 6 months?',
          answer: 'Depending on which half of the year you measure, 6 months contains between 181 and 184 calendar days (average 182.6 days).',
        },
        {
          question: 'How many weeks are in 6 months?',
          answer: '6 months is approximately 26.1 weeks (6 × 4.345 weeks).',
        },
        {
          question: 'Can I subtract months?',
          answer: 'Yes, entering negative numbers or using our Date Calculator allows backward projections.',
        },
      ],
    },
  },
  {
    slug: 'years-calculator',
    name: 'Years Calculator',
    shortDescription: 'Calculate the exact number of full and decimal years between two dates accounting for leap years.',
    category: 'date-time',
    secondaryCategories: ['everyday', 'finance'],
    keywords: ['years calculator', 'how many years between dates', 'decimal years', 'years between two dates'],
    tags: ['Years', 'Calendar', 'Age', 'Anniversary'],
    icon: 'Calendar',
    status: 'published',
    featured: false,
    popular: false,
    addedDate: '2025-01-23',
    seo: {
      title: 'Years Calculator – Calculate Years Between Dates',
      metaDescription: 'Free years calculator. Compute exact elapsed years, months, days, and decimal years between any two historical or future calendar dates.',
      keywords: ['years calculator', 'years between dates', 'how many years between two dates', 'decimal years calculator'],
    },
    relatedCalculators: ['months-calculator', 'date-calculator', 'age-calculator'],
    editorial: {
      whatIs: 'A years calculator determines the exact duration between two calendar dates expressed in full years, remaining months, days, and continuous decimal years. It is essential for depreciation schedules, employment seniority, tenure milestones, and historical spans.',
      howToUse: [
        'Select the beginning "From Date".',
        'Select the ending "To Date".',
        'Review the result in full years, broken down into months, days, and decimal years.',
      ],
      formula: {
        title: 'Decimal Years Calculation',
        expression: 'Y_{\\text{decimal}} = \\frac{D_{\\text{total}}}{365.2425}',
        explanation: 'Uses the exact Gregorian mean tropical calendar year of 365.2425 days to convert total elapsed days into precise decimal years.',
      },
      example: {
        scenario: 'An employee worked from June 15, 2015 to March 15, 2025.',
        steps: [
          'From June 15, 2015 to June 15, 2024 = 9 full years.',
          'From June 15, 2024 to March 15, 2025 = 9 months.',
          'Total days = 3,561 days.',
          '3,561 / 365.25 ≈ 9.75 decimal years.',
        ],
        result: 'Total tenure is 9 years, 9 months, 0 days (9.75 decimal years).',
      },
      tips: [
        'A standard Gregorian year has 365 days; every 4th year adds 1 day, giving an average year length of 365.2425 days.',
        'Asset depreciation under IRS MACRS schedules relies on half-year or mid-quarter conventions.',
        'Use decimal years when compounding interest annually over irregular fractional timeframes.',
      ],
      faqs: [
        {
          question: 'How is a decimal year calculated?',
          answer: 'Decimal years are calculated by dividing the total number of calendar days by 365.25 (the average year length accounting for leap years).',
        },
        {
          question: 'What is the difference between calendar years and anniversary years?',
          answer: 'Anniversary years measure from a specific calendar date to the same month and day in a subsequent year, whereas calendar years measure Jan 1 to Dec 31.',
        },
        {
          question: 'How many days are in 10 years?',
          answer: '10 standard years contains either 3,652 or 3,653 days depending on whether two or three leap years fall within the decade.',
        },
        {
          question: 'Can I calculate historical years before 1900?',
          answer: 'Yes, our calendar engine supports all historical dates using the standard proleptic Gregorian calendar.',
        },
      ],
    },
  },
  {
    slug: 'day-of-the-week-calculator',
    name: 'Day of the Week',
    shortDescription: 'Find out what day of the week any past or future date falls on, with day-of-year numbers and historical facts.',
    category: 'date-time',
    secondaryCategories: ['everyday', 'education'],
    keywords: ['day of the week calculator', 'what day was it', 'day of week born', 'calendar day finder'],
    tags: ['Day of Week', 'Calendar', 'History', 'Zeller Congruence'],
    icon: 'CalendarDays',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-01-23',
    seo: {
      title: 'Day of the Week Calculator – Find Day of Week for Any Date',
      metaDescription: 'Find out what day of the week any date in history or the future fell on. Discover the day you were born, day-of-year count, and weekend status.',
      keywords: ['day of the week calculator', 'what day of the week was', 'day of week birthday', 'calendar day finder'],
    },
    relatedCalculators: ['date-calculator', 'birthday-calculator', 'leap-year-calculator'],
    editorial: {
      whatIs: 'A day of the week calculator determines the specific weekday (Sunday through Saturday) for any date in past or future history. It uses modular calendar mathematics (such as Zeller’s Congruence or the Doomsday rule) to instantly find the weekday for any event.',
      howToUse: [
        'Select any calendar date from the date picker or choose a famous historical preset.',
        'Instantly view the day of the week (e.g., Sunday, Monday).',
        'Review the day-of-the-year number (e.g. Day #201 of 365) and weekday status.',
      ],
      formula: {
        title: 'Zeller’s Congruence Algorithm',
        expression: 'h = \\left( q + \\left\\lfloor \\frac{13(m+1)}{5} \\right\\rfloor + K + \\left\\lfloor \\frac{K}{4} \\right\\rfloor + \\left\\lfloor \\frac{J}{4} \\right\\rfloor - 2J \\right) \\pmod{7}',
        explanation: 'Where q is day of month, m is shifted month, K is year of century, and J is zero-based century.',
      },
      example: {
        scenario: 'What day of the week was the Apollo 11 Moon landing on July 20, 1969?',
        steps: [
          'Date: July 20, 1969.',
          'Apply calendar modulo math.',
          'July 20, 1969 was Day #201 of the year 1969.',
        ],
        result: 'The Apollo 11 Moon landing occurred on a Sunday.',
      },
      tips: [
        'The United States Declaration of Independence was signed on July 4, 1776, which was a Thursday.',
        'There are 7 possible calendar year layouts (starting on each day of the week) plus 7 leap year variations, giving 14 total possible yearly calendars.',
        'The Gregorian calendar repeats its exact day-of-the-week sequence every 400 years (146,097 days, which is exactly divisible by 7).',
      ],
      faqs: [
        {
          question: 'What was the day of the week for January 1, 2000?',
          answer: 'January 1, 2000 was a Saturday.',
        },
        {
          question: 'How does the calculator determine weekdays for old dates?',
          answer: 'It calculates using the standard Gregorian calendar algorithm, factoring in leap years and century rules.',
        },
        {
          question: 'What is the Doomsday rule?',
          answer: 'The Doomsday rule is a mental math algorithm created by mathematician John Conway that allows someone to quickly calculate the day of the week for any date.',
        },
        {
          question: 'Does the calendar cycle ever repeat exactly?',
          answer: 'Yes, the calendar repeats in cycles of 6, 11, 11, and 28 years, and repeats identically every 400 years.',
        },
      ],
    },
  },
  {
    slug: 'seconds-to-time-calculator',
    name: 'Seconds to Time',
    shortDescription: 'Convert raw seconds into formatted HH:MM:SS, days, decimal hours, and total minutes.',
    category: 'date-time',
    secondaryCategories: ['conversion', 'technology'],
    keywords: ['seconds to time', 'convert seconds to hours', 'seconds to minutes', 'seconds to hh mm ss'],
    tags: ['Seconds', 'Time Conversion', 'HH:MM:SS', 'Units'],
    icon: 'Timer',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-01-23',
    seo: {
      title: 'Seconds to Time Calculator – Convert Seconds to HH:MM:SS',
      metaDescription: 'Free seconds to time calculator. Convert seconds to hours, minutes, seconds, decimal hours, and days with instant breakdown.',
      keywords: ['seconds to time', 'seconds to hours', 'convert seconds to hh mm ss', 'seconds converter'],
    },
    relatedCalculators: ['time-calculator', 'hours-calculator', 'average-time-calculator'],
    editorial: {
      whatIs: 'A seconds to time calculator converts raw second counts (from computer systems, audio tracks, video files, or stopwatches) into human-readable hours, minutes, and seconds (HH:MM:SS) format, as well as decimal hours and days.',
      howToUse: [
        'Enter total number of seconds (or click a preset like 3,600 or 86,400).',
        'Instantly view formatted HH:MM:SS, days, decimal hours, and minutes.',
      ],
      formula: {
        title: 'Seconds to Time Decomposition',
        expression: 'H = \\lfloor S / 3600 \\rfloor \\quad ; \\quad M = \\lfloor (S \\pmod{3600}) / 60 \\rfloor \\quad ; \\quad S_{\\text{rem}} = S \\pmod{60}',
        explanation: 'Integer division by 3,600 yields hours, while the remainder modulo 60 yields minutes and residual seconds.',
      },
      example: {
        scenario: 'Convert 10,000 seconds into formatted clock time.',
        steps: [
          'Hours: 10,000 ÷ 3,600 = 2 hours (remainder 2,800 seconds).',
          'Minutes: 2,800 ÷ 60 = 46 minutes (remainder 40 seconds).',
          'Seconds: 40 seconds.',
        ],
        result: '10,000 seconds equals 02:46:40 (2 hours, 46 minutes, 40 seconds or 2.78 hours).',
      },
      tips: [
        '86,400 seconds is exactly 24 hours (1 full calendar day).',
        'One million seconds is approximately 11.57 days; one billion seconds is approximately 31.71 years.',
        'Database query execution times and Unix system timers store timestamps natively in seconds or milliseconds.',
      ],
      faqs: [
        {
          question: 'How many seconds are in an hour?',
          answer: 'There are exactly 3,600 seconds in an hour (60 seconds × 60 minutes = 3,600).',
        },
        {
          question: 'How many seconds are in a day?',
          answer: 'There are exactly 86,400 seconds in a 24-hour day (24 × 3,600 = 86,400).',
        },
        {
          question: 'How do you convert seconds to minutes?',
          answer: 'Divide the number of seconds by 60. For example, 180 seconds ÷ 60 = 3 minutes.',
        },
        {
          question: 'How long is 1 million seconds?',
          answer: '1,000,000 seconds is equal to 11 days, 13 hours, 46 minutes, and 40 seconds.',
        },
      ],
    },
  },
  {
    slug: 'average-time-calculator',
    name: 'Average Time',
    shortDescription: 'Calculate the mathematical mean, cumulative total, fastest, and slowest times across multiple laps, race splits, or tasks.',
    category: 'date-time',
    secondaryCategories: ['sports', 'business'],
    keywords: ['average time calculator', 'calculate average time', 'mean lap time', 'average pace calculator'],
    tags: ['Average Time', 'Laps', 'Sports', 'Splits', 'Running'],
    icon: 'Timer',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-01-23',
    seo: {
      title: 'Average Time Calculator – Calculate Mean Lap & Split Times',
      metaDescription: 'Free average time calculator. Compute average race lap times, task durations, and cumulative totals across multiple MM:SS or HH:MM:SS entries.',
      keywords: ['average time calculator', 'mean time calculator', 'average lap time', 'calculate average pace'],
    },
    relatedCalculators: ['time-calculator', 'seconds-to-time-calculator', 'swim-time-converter'],
    editorial: {
      whatIs: 'An average time calculator computes the arithmetic mean across a collection of time intervals (such as running lap splits, swimming paces, customer support call lengths, or manufacturing cycle times). It converts each time to seconds, computes the mean, and formats the output into clean clock notation.',
      howToUse: [
        'Enter a time in MM:SS or HH:MM:SS format and click Add.',
        'Add all your race laps, test runs, or task times.',
        'View the calculated average time, total sum of all times, and total entry count.',
      ],
      formula: {
        title: 'Arithmetic Mean of Time Intervals',
        expression: '\\bar{T} = \\frac{1}{N} \\sum_{i=1}^N (H_i \\cdot 3600 + M_i \\cdot 60 + S_i)',
        explanation: 'Each entry is converted to scalar seconds, averaged across N observations, and reformatted into sexagesimal clock notation.',
      },
      example: {
        scenario: 'A runner records three 400m track laps: 01:20, 01:25, and 01:30.',
        steps: [
          'Lap 1: 80 seconds.',
          'Lap 2: 85 seconds.',
          'Lap 3: 90 seconds.',
          'Sum = 255 seconds. Average = 255 ÷ 3 = 85 seconds.',
        ],
        result: 'Average lap time is 01:25 (00:01:25).',
      },
      tips: [
        'Consistently pacing splits is critical for marathon runners to prevent early lactic acid buildup.',
        'Call centers track Average Handle Time (AHT) to evaluate customer service representative efficiency.',
        'Entries can be input in either MM:SS (e.g. 01:45) or HH:MM:SS (e.g. 01:15:30).',
      ],
      faqs: [
        {
          question: 'How do you calculate average time?',
          answer: 'Convert each time into total seconds, add them together to get the total sum, divide by the number of entries, and convert the result back to hours, minutes, and seconds.',
        },
        {
          question: 'What format should times be entered in?',
          answer: 'You can enter times in either MM:SS (e.g. 02:15) or HH:MM:SS (e.g. 01:05:30).',
        },
        {
          question: 'Does this calculate total elapsed time as well?',
          answer: 'Yes, the calculator displays both the average lap time and the cumulative total sum of all entered times.',
        },
        {
          question: 'Can I remove an accidental time entry?',
          answer: 'Yes, click the "X" next to any entry in the list to remove it from the calculation.',
        },
      ],
    },
  },
  {
    slug: 'leap-year-calculator',
    name: 'Leap Year Calculator',
    shortDescription: 'Check if any year is a leap year, explore next and past leap years, and understand the Gregorian 400-year rule.',
    category: 'date-time',
    secondaryCategories: ['education', 'science'],
    keywords: ['leap year calculator', 'is it a leap year', 'next leap year', 'leap year rules', '366 days'],
    tags: ['Leap Year', 'Calendar', 'Astronomy', 'February 29'],
    icon: 'CalendarCheck',
    status: 'published',
    featured: false,
    popular: false,
    addedDate: '2025-01-23',
    seo: {
      title: 'Leap Year Calculator – Check Any Year & Leap Year Rules',
      metaDescription: 'Check if any year is a leap year. Discover why leap years exist, the 400-year century rule, and upcoming and past leap years.',
      keywords: ['leap year calculator', 'is this year a leap year', 'next leap year', 'leap year rule'],
    },
    relatedCalculators: ['date-calculator', 'day-of-the-week-calculator', 'birthday-calculator'],
    editorial: {
      whatIs: 'A leap year calculator determines whether a given calendar year contains 366 days instead of 365, with February 29 as the leap day. It implements the complete three-part Gregorian rule designed to keep our calendar synchronized with Earth’s astronomical orbit around the Sun.',
      howToUse: [
        'Enter any year (e.g. 2024, 2028, or historical years like 1900 or 2000).',
        'Instantly see whether the year is a leap year or common year.',
        'Read the specific mathematical rule explanation and view the adjacent leap years.',
      ],
      formula: {
        title: 'Gregorian Leap Year Algorithm',
        expression: '\\text{LeapYear}(Y) = (Y \\equiv 0 \\pmod 4 \\land Y \\not\\equiv 0 \\pmod{100}) \\lor (Y \\equiv 0 \\pmod{400})',
        explanation: 'A year is a leap year if divisible by 4, unless it is divisible by 100, unless it is also divisible by 400.',
      },
      example: {
        scenario: 'Why was the year 2000 a leap year, but 2100 will NOT be a leap year?',
        steps: [
          'Year 2000 is divisible by 100, but ALSO divisible by 400 (2000 / 400 = 5) -> Leap Year!',
          'Year 2100 is divisible by 4 and 100, but NOT divisible by 400 (2100 / 400 = 5.25) -> Common Year (365 days).',
        ],
        result: '2000 was a leap year; 2100 will be a common year with only 28 days in February.',
      },
      tips: [
        'Earth takes approximately 365.2422 days to orbit the Sun, creating a ~0.2422 day discrepancy each year.',
        'Without leap years, every 100 years the calendar would drift by about 24 days, causing summer to eventually fall in December in the Northern Hemisphere.',
        'People born on February 29 are called "leaplings" or "leapers" and celebrate on February 28 or March 1 in non-leap years.',
      ],
      faqs: [
        {
          question: 'What are the 3 rules for a leap year?',
          answer: '1. The year must be divisible by 4. 2. If divisible by 100, it is NOT a leap year, UNLESS: 3. It is also divisible by 400.',
        },
        {
          question: 'Why was 1900 not a leap year?',
          answer: '1900 is divisible by 4 and 100, but not divisible by 400 (1900 ÷ 400 = 4.75), so it was a common year with 365 days.',
        },
        {
          question: 'When is the next leap year?',
          answer: 'Following 2024, the next leap years are 2028, 2032, 2036, 2040, and 2044.',
        },
        {
          question: 'How many days are in February during a leap year?',
          answer: 'February has 29 days in a leap year, compared to 28 days in a common year.',
        },
      ],
    },
  },
  {
    slug: 'military-time-converter',
    name: 'Military Time Converter',
    shortDescription: 'Convert between 12-hour AM/PM and 24-hour military time with phonetic military pronunciation and Zulu time reference.',
    category: 'date-time',
    secondaryCategories: ['conversion', 'everyday'],
    keywords: ['military time converter', '24 hour time converter', 'military time chart', 'convert military time to standard'],
    tags: ['Military Time', '24-Hour Clock', 'Aviation', 'Time Conversion'],
    icon: 'Clock',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-01-23',
    seo: {
      title: 'Military Time Converter – 12-Hour to 24-Hour Time Chart',
      metaDescription: 'Free military time converter. Convert between 12-hour AM/PM time and 24-hour military time. Includes phonetic spoken pronunciation and conversion chart.',
      keywords: ['military time converter', '24 hour clock converter', 'convert 24 hour to 12 hour', 'military time chart'],
    },
    relatedCalculators: ['time-calculator', 'hours-calculator', 'seconds-to-time-calculator'],
    editorial: {
      whatIs: 'A military time converter translates standard 12-hour clock notation (with AM and PM) into 24-hour military notation (from 0000 to 2359 hours) and vice-versa. Used worldwide by armed forces, aviation, emergency services, hospitals, and transportation to eliminate ambiguity.',
      howToUse: [
        'Enter any standard time (e.g. "02:45 PM") or military time (e.g. "1445" or "14:45").',
        'Instantly view the military 4-digit code, phonetic military pronunciation, and 12-hour format.',
      ],
      formula: {
        title: '12-Hour to 24-Hour Conversion Rule',
        expression: 'T_{24} = \\begin{cases} H \\pmod{12} & \\text{if AM} \\\\ (H \\pmod{12}) + 12 & \\text{if PM} \\end{cases}',
        explanation: '12:00 AM converts to 0000 hours, morning hours 1:00 AM–11:59 AM stay 0100–1159, 12:00 PM is 1200, and afternoon hours add 12 (1:00 PM becomes 1300).',
      },
      example: {
        scenario: 'Convert 06:30 PM and 12:15 AM into military time.',
        steps: [
          '06:30 PM: Add 12 to the hour: 6 + 12 = 18. Output: 1830 hours ("Eighteen Thirty Hours").',
          '12:15 AM: Midnight hour resets to 00. Output: 0015 hours ("Zero Zero Fifteen Hours").',
        ],
        result: '06:30 PM is 1830 hours; 12:15 AM is 0015 hours.',
      },
      tips: [
        'Military time does not use colons in strict military documentation (1430 instead of 14:30).',
        'Midnight can be written as 0000 (start of day) or 2400 (end of day).',
        'Aviation and maritime operations frequently append "Z" (Zulu time) to indicate Coordinated Universal Time (UTC).',
      ],
      faqs: [
        {
          question: 'What is 10:00 PM in military time?',
          answer: '10:00 PM in military time is 2200 hours (pronounced "Twenty-Two Hundred Hours").',
        },
        {
          question: 'How do you say 0800 in military time?',
          answer: '0800 is pronounced "Zero Eight Hundred Hours".',
        },
        {
          question: 'Why do militaries and hospitals use 24-hour time?',
          answer: 'The 24-hour system eliminates any possible confusion between AM and PM, preventing potentially fatal medication dosage errors or tactical miscommunications.',
        },
        {
          question: 'Is 12:00 AM 0000 or 2400?',
          answer: '0000 refers to midnight at the start of a day, while 2400 refers to midnight at the conclusion of a day.',
        },
      ],
    },
  },
];
