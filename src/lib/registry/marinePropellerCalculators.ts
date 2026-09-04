import { CalculatorDefinition } from '../types';

export const MARINE_PROPELLER_CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'propeller-calculator',
    name: 'Propeller Calculator',
    shortDescription: 'Calculate theoretical pitch speed, actual boat speed, and propeller slip percentage across engine RPM, pitch, and gear ratios.',
    category: 'science',
    secondaryCategories: ['sports', 'everyday'],
    keywords: ['propeller calculator', 'boat prop calculator', 'prop slip calculator', 'theoretical boat speed', 'propeller pitch calculator'],
    tags: ['Propeller', 'Boating', 'Marine', 'Speed', 'Slip'],
    icon: 'Ship',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-22',
    seo: {
      title: 'Propeller Calculator – Boat Prop Slip, Speed & Pitch Calculator',
      metaDescription: 'Calculate boat propeller slip percentage, theoretical pitch speed, and actual water speed based on engine RPM, propeller pitch, and gear ratio.',
      keywords: ['propeller calculator', 'boat prop slip', 'prop pitch calculator', 'boat speed calculator', 'outboard prop sizing'],
    },
    relatedCalculators: ['suzuki-prop-calculator', 'mercury-propeller-calculator', 'michigan-wheel-prop-calculator', 'sailboat-propeller-calculator'],
    editorial: {
      whatIs: 'A boat propeller calculator determines the theoretical forward distance a marine propeller moves through water per engine revolution compared to actual GPS water speed. The discrepancy between theoretical forward travel and actual travel is propeller slip, an essential metric for optimizing boat efficiency, top speed, and fuel economy.',
      howToUse: [
        'Enter your engine wide-open throttle (WOT) or cruising RPM.',
        'Enter your propeller pitch in inches (stamped on the propeller hub or blade).',
        'Input your lower unit gear ratio (e.g. 1.85:1, 2.00:1, or 2.50:1).',
        'Choose whether to calculate actual speed from estimated slip (typically 10%–15%) or calculate actual slip from recorded GPS speed.',
      ],
      formula: {
        title: 'Propeller Theoretical Speed & Slip Formulas',
        expression: 'V_{\\text{theo}} = \\frac{\\text{RPM} \\times P}{\\text{Ratio} \\times 1056} \\quad ; \\quad \\text{Slip (\\%)} = \\frac{V_{\\text{theo}} - V_{\\text{actual}}}{V_{\\text{theo}}} \\times 100',
        explanation: 'Where P is propeller pitch in inches, Ratio is lower unit gear ratio, and 1056 is the conversion constant deriving statute miles per hour from inches per minute.',
      },
      example: {
        scenario: 'An outboard running at 5,500 RPM with a 19-inch pitch prop and a 2.00:1 gear ratio achieving 42 mph on GPS.',
        steps: [
          'Theoretical Pitch Speed: (5,500 × 19) / (2.00 × 1056) = 104,500 / 2,112 = 49.48 mph.',
          'GPS Speed Delta: 49.48 - 42.00 = 7.48 mph.',
          'Propeller Slip: (7.48 / 49.48) × 100 = 15.12%.',
        ],
        result: 'Theoretical speed is 49.48 mph with an actual slip of 15.12% at 42.0 mph.',
      },
      tips: [
        'A normal planing monohull exhibits 10% to 15% prop slip at wide-open throttle; bass boats and high-performance hulls can reach 6% to 9%.',
        'Increasing pitch by 1 inch generally lowers engine RPM by approximately 150 to 200 RPM at wide-open throttle.',
        'Excessive slip (>20%) typically indicates ventilation, improper engine mounting height, damaged blades, or cavitation.',
      ],
      faqs: [
        {
          question: 'What does propeller pitch mean?',
          answer: 'Propeller pitch is the theoretical distance (in inches) that a propeller would move forward through a solid medium in one complete 360-degree revolution, similar to a wood screw turning into timber.',
        },
        {
          question: 'What is an acceptable propeller slip percentage?',
          answer: 'For recreational bowriders and center consoles, 10% to 15% slip at cruising and WOT speeds is normal. Heavy offshore cruisers and pontoon boats may see 15% to 22%, whereas racing boats often achieve 6% to 9%.',
        },
        {
          question: 'Does stainless steel reduce prop slip compared to aluminum?',
          answer: 'Yes. Stainless steel blades are thinner, stiffer, and do not flex under heavy hydrodynamic load, generally reducing slip by 2% to 5% and improving mid-range cruising acceleration.',
        },
        {
          question: 'Where can I find my lower unit gear ratio?',
          answer: 'The gear ratio is listed in your outboard or sterndrive owner manual, manufacturer specification sheet, or stamped directly on the engine identification tag.',
        },
      ],
    },
  },
  {
    slug: 'suzuki-prop-calculator',
    name: 'Suzuki Prop Calculator',
    shortDescription: 'Calculate prop slip, top speed, and optimal pitch selection for Suzuki 4-stroke outboard motors with high-reduction gearboxes.',
    category: 'science',
    secondaryCategories: ['sports', 'everyday'],
    keywords: ['suzuki prop calculator', 'suzuki outboard prop slip', 'suzuki marine propeller', 'suzuki df gear ratio', 'suzuki pitch calculator'],
    tags: ['Suzuki', 'Outboard', 'Propeller', 'Marine', 'Boating'],
    icon: 'Ship',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-01-22',
    seo: {
      title: 'Suzuki Prop Calculator – Suzuki Outboard Propeller Slip & Pitch',
      metaDescription: 'Calculate propeller slip, speed, and pitch for Suzuki 4-stroke outboard engines. Pre-configured with Suzuki offset driveshaft gear ratios (2.08:1 to 2.59:1).',
      keywords: ['suzuki prop calculator', 'suzuki marine prop slip', 'suzuki outboard prop sizing', 'suzuki df pitch calculator'],
    },
    relatedCalculators: ['propeller-calculator', 'mercury-propeller-calculator', 'michigan-wheel-prop-calculator', 'sailboat-propeller-calculator'],
    editorial: {
      whatIs: 'The Suzuki Prop Calculator is specifically tuned for Suzuki Marine four-stroke outboards (DF series). Because Suzuki engines utilize a two-stage offset driveshaft gear reduction (often 2.50:1 or 2.59:1 rather than the standard 2.00:1), they swing larger diameter propellers with higher pitch. This tool provides accurate slip and speed calculations using Suzuki-specific drivetrain mechanics.',
      howToUse: [
        'Select or enter your Suzuki outboard RPM (WOT operating range typically 5,500–6,300 RPM).',
        'Enter your Suzuki propeller pitch (commonly 18.5", 20", 21.5", 23", or WaterGrip series).',
        'Set your Suzuki gear ratio: DF70A-DF140A (2.59:1), DF150A-DF200A (2.50:1), or DF250-DF300 (2.08:1 or 2.29:1 dual prop).',
        'Review theoretical speed and calculated slip against your GPS speedometer readings.',
      ],
      formula: {
        title: 'Suzuki Drivetrain Speed Equation',
        expression: 'V_{\\text{theo}} = \\frac{\\text{RPM} \\times P}{\\text{Ratio}_{\\text{Suzuki}} \\times 1056}',
        explanation: 'Due to Suzuki higher 2.50:1 and 2.59:1 gear reduction ratios, Suzuki outboards spin larger diameter propellers with greater blade area, delivering superior low-end bite and lower slip.',
      },
      example: {
        scenario: 'Suzuki DF150A operating at 6,000 RPM with a 3x16x21.5 WaterGrip propeller (2.50:1 gear ratio) running at 45 mph GPS.',
        steps: [
          'Theoretical Pitch Speed: (6,000 × 21.5) / (2.50 × 1056) = 129,000 / 2,640 = 48.86 mph.',
          'Speed Difference: 48.86 - 45.00 = 3.86 mph.',
          'Suzuki Prop Slip: (3.86 / 48.86) × 100 = 7.90%.',
        ],
        result: 'Theoretical speed is 48.86 mph with 7.90% prop slip, indicating an ideal propeller match.',
      },
      tips: [
        'Because Suzuki uses large gear ratios, you can frequently swing 16-inch diameter propellers that grip the water better than competitive 14.5-inch props.',
        'Ensure your Suzuki engine reaches the upper half of its recommended WOT RPM range (e.g. 5,800–6,100 on a 6,000 ceiling) under a normal fuel/passenger load.',
        'Dual-prop Suzuki models (DF300B, DF350A) feature contra-rotating propellers that virtually eliminate steering torque and achieve single-digit slip percentages.',
      ],
      faqs: [
        {
          question: 'Why do Suzuki outboards have higher gear ratios than Mercury or Yamaha?',
          answer: 'Suzuki utilizes a two-stage gear reduction with an offset driveshaft. This moves the center of gravity forward while allowing the gearcase to accommodate a larger gear set and swing large-diameter, high-thrust propellers.',
        },
        {
          question: 'What pitch propeller does a Suzuki DF140 take?',
          answer: 'With its 2.59:1 gear ratio, a Suzuki DF140 commonly runs a 19-inch to 21-inch pitch propeller on 18–20 ft boats to achieve its rated 5,600–6,200 WOT RPM window.',
        },
        {
          question: 'What is Suzuki WaterGrip propeller line?',
          answer: 'WaterGrip is Suzuki OEM line of stainless steel propellers featuring an advanced interchangeable square-bore hub bushing system designed to eliminate propeller slip and absorb shifting shock.',
        },
        {
          question: 'What happens if my Suzuki outboard is over-propped?',
          answer: 'Over-propping (pitch too high) lugs the engine, prevents it from reaching its target WOT RPM, creates excess carbon buildup, reduces fuel economy, and strains internal pistons and bearings.',
        },
      ],
    },
  },
  {
    slug: 'mercury-propeller-calculator',
    name: 'Mercury Propeller Calculator',
    shortDescription: 'Calculate propeller slip, speed, and pitch requirements for Mercury Marine FourStroke, Pro XS, and Verado outboards.',
    category: 'science',
    secondaryCategories: ['sports', 'everyday'],
    keywords: ['mercury propeller calculator', 'mercury prop slip', 'mercury marine propeller', 'mercury pro xs prop', 'verado prop calculator'],
    tags: ['Mercury', 'Propeller', 'Outboard', 'Marine', 'Verado'],
    icon: 'Ship',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-01-22',
    seo: {
      title: 'Mercury Propeller Calculator – Mercury Marine Prop Slip & Pitch',
      metaDescription: 'Free Mercury Marine propeller calculator. Calculate prop slip, pitch speed, and WOT performance for Mercury FourStroke, Pro XS, and Verado outboards.',
      keywords: ['mercury propeller calculator', 'mercury prop slip', 'mercury outboard prop sizing', 'mercury pitch calculator'],
    },
    relatedCalculators: ['propeller-calculator', 'suzuki-prop-calculator', 'michigan-wheel-prop-calculator', 'acme-prop-calculator'],
    editorial: {
      whatIs: 'The Mercury Propeller Calculator matches Mercury Marine outboards and sterndrives (FourStroke, Pro XS, SeaPro, and Verado) with their optimal propeller characteristics. By factoring Mercury standard gear ratios (such as 1.75:1, 1.85:1, 1.92:1, and 2.07:1) with observed GPS velocity, it evaluates propeller slip and top-end performance.',
      howToUse: [
        'Enter engine RPM (e.g., 5,800–6,200 RPM for modern Mercury V6/V8 outboards).',
        'Enter propeller pitch in inches (e.g. Tempest Plus, Fury, Mirage Plus, or Enertia).',
        'Select your gear ratio: 75–115 HP (2.07:1), 150 HP (1.92:1), V6 200 (1.85:1), or V8 250/300 (1.75:1).',
        'Calculate theoretical speed and exact prop slip against GPS speedometer readings.',
      ],
      formula: {
        title: 'Mercury Outboard Slip Formula',
        expression: '\\text{Slip (\\%)} = \\left(1 - \\frac{V_{\\text{GPS}} \\times \\text{Ratio} \\times 1056}{\\text{RPM} \\times P}\\right) \\times 100',
        explanation: 'Where P is Mercury prop pitch, Ratio is Mercury lower unit gear ratio (such as 1.75 on TorqMaster gearcases), and V_GPS is verified flat-water speed.',
      },
      example: {
        scenario: 'Mercury 250 Pro XS V8 running a 24-inch pitch Fury prop at 6,000 RPM with a 1.75:1 TorqMaster gearcase hitting 70 mph GPS.',
        steps: [
          'Theoretical Speed: (6,000 × 24) / (1.75 × 1056) = 144,000 / 1,848 = 77.92 mph.',
          'Speed Difference: 77.92 - 70.00 = 7.92 mph.',
          'Slip Percentage: (7.92 / 77.92) × 100 = 10.16%.',
        ],
        result: 'Theoretical speed is 77.92 mph with 10.16% slip at 70 mph.',
      },
      tips: [
        'Mercury PVS (Performance Vent System) plugs allow exhaust gas to ventilate the prop blades during acceleration, tuning hole-shot RPM without changing pitch.',
        'Bass boats running Mercury Fury propellers generally target 8% to 11% slip at full trim.',
        'Mercury Enertia props are cast from proprietary X7 alloy, allowing thinner blades and parabolic rake for reduced slip on offshore center consoles.',
      ],
      faqs: [
        {
          question: 'What is Mercury PVS (Performance Vent System)?',
          answer: 'PVS consists of interchangeable vent holes near the base of Mercury propeller blades. Adjusting the plug diameter allows exhaust to aerate the water over the blades, letting the engine rev faster into its power band during hole-shot.',
        },
        {
          question: 'What is the gear ratio of a Mercury 150 FourStroke?',
          answer: 'The standard 3.0L Mercury 150 FourStroke features a 1.92:1 gear ratio, while the 150 Pro XS uses a 2.08:1 gear ratio.',
        },
        {
          question: 'How do I choose between a 3-blade and 4-blade Mercury prop?',
          answer: 'A 3-blade prop (like Tempest Plus or Fury) delivers maximum top speed and high-trim bow lift. A 4-blade prop (like Bravo I or Revolution 4) provides superior stern lift, rough water bite, and lower cruising slip.',
        },
        {
          question: 'What hub kit does a Mercury propeller require?',
          answer: 'Mercury propellers commonly use the Flo-Torq II or Flo-Torq SSR (Soft Shift Rubber) hub kit system, designed to cushion shifting shock and protect drivetrain splines.',
        },
      ],
    },
  },
  {
    slug: 'michigan-wheel-prop-calculator',
    name: 'Michigan Wheel Prop Calculator',
    shortDescription: 'Calculate replacement propeller pitch, diameter, speed, and slip for Michigan Wheel Vortex, Apollo, and Ballistic series props.',
    category: 'science',
    secondaryCategories: ['sports', 'everyday'],
    keywords: ['michigan wheel prop', 'michigan wheel prop calculator', 'apollo propeller calculator', 'ballistic prop slip', 'vortex propeller pitch'],
    tags: ['Michigan Wheel', 'Propeller', 'Marine', 'Boating', 'Aftermarket'],
    icon: 'Ship',
    status: 'published',
    featured: false,
    popular: false,
    addedDate: '2025-01-22',
    seo: {
      title: 'Michigan Wheel Prop Calculator – Marine Replacement Propeller Sizing',
      metaDescription: 'Calculate speed, slip, and pitch recommendations for Michigan Wheel aftermarket propellers including Vortex aluminum, Apollo stainless, and Ballistic props.',
      keywords: ['michigan wheel prop', 'michigan wheel calculator', 'apollo prop slip', 'ballistic propeller sizing'],
    },
    relatedCalculators: ['propeller-calculator', 'mercury-propeller-calculator', 'suzuki-prop-calculator', 'acme-prop-calculator'],
    editorial: {
      whatIs: 'Michigan Wheel is one of the world oldest and most widely distributed aftermarket marine propeller manufacturers. This calculator assists boaters in evaluating Michigan Wheel Vortex (die-cast aluminum), Apollo (high-polish stainless steel), and Ballistic (high-performance tapered leading edge) propellers to match engine operating RPM and reduce slip.',
      howToUse: [
        'Enter your engine WOT RPM and target cruising RPM.',
        'Enter the Michigan Wheel propeller pitch (e.g., 17", 19", or 21").',
        'Enter your drive gear ratio (e.g., 1.85:1, 1.98:1, or 2.00:1).',
        'View theoretical pitch speed and slip comparison between standard aluminum and stainless models.',
      ],
      formula: {
        title: 'Pitch Speed & Blade Flex Compensation',
        expression: 'V = \\frac{\\text{RPM} \\times P}{\\text{Ratio} \\times 1056} \\times (1 - \\text{Slip})',
        explanation: 'Michigan Wheel stainless props (Apollo and Ballistic) typically experience 2% to 4% less slip than aluminum Vortex models under heavy acceleration due to reduced blade deflection.',
      },
      example: {
        scenario: 'A sterndrive cruiser running a 14.5 x 19 Michigan Wheel Apollo stainless prop at 4,800 RPM with a 1.98:1 Alpha One drive running 37 mph.',
        steps: [
          'Theoretical Pitch Speed: (4,800 × 19) / (1.98 × 1056) = 91,200 / 2,090.88 = 43.62 mph.',
          'Speed Loss to Slip: 43.62 - 37.00 = 6.62 mph.',
          'Slip: (6.62 / 43.62) × 100 = 15.18%.',
        ],
        result: 'Theoretical speed is 43.62 mph with 15.18% slip, typical for a mid-size family bowrider.',
      },
      tips: [
        'If replacing an aluminum prop with a Michigan Wheel Apollo or Ballistic stainless prop, you can often keep the same pitch or drop 1 inch due to aggressive cup.',
        'Michigan Wheel Ballistic propellers feature cambered blades with dual exhaust relief, ideal for fast light runabouts and bass boats.',
        'Use Michigan Wheel XHS (Exchangeable Hub System) kits for universal compatibility across Mercury, Yamaha, Suzuki, Evinrude, and Honda splines.',
      ],
      faqs: [
        {
          question: 'What is the Michigan Wheel XHS hub system?',
          answer: 'The XHS (Exchangeable Hub System) is a modular drop-in Delrin sleeve hub designed to absorb impact shock from underwater debris, protecting your lower unit gears from catastrophic damage.',
        },
        {
          question: 'How does Michigan Wheel Ballistic compare to Apollo?',
          answer: 'Apollo is an all-around performance stainless propeller for runabouts, pontoons, and offshore boats. Ballistic features high rake angles and aggressive tip cupping designed for lightweight high-speed hulls.',
        },
        {
          question: 'Does Michigan Wheel manufacture inboard propellers?',
          answer: 'Yes. In addition to outboard and sterndrive props, Michigan Wheel manufactures Dyna-Jet, Federal, and Gold-Series heavy-duty bronze and NiBrAl propellers for commercial and recreational inboards.',
        },
        {
          question: 'Can I repair a damaged Michigan Wheel propeller?',
          answer: 'Yes. Minor bends and nicks in both aluminum and stainless steel Michigan Wheel propellers can be professionally re-pitched and balanced by certified marine propeller shops.',
        },
      ],
    },
  },
  {
    slug: 'acme-prop-calculator',
    name: 'Acme Prop Calculator',
    shortDescription: 'Calculate pitch, diameter, cup, and slip for Acme Marine CNC-machined inboard tournament ski, wakeboard, and wakesurf boat propellers.',
    category: 'science',
    secondaryCategories: ['sports', 'everyday'],
    keywords: ['acme prop calculator', 'acme marine propeller', 'wakeboard prop calculator', 'wakesurf propeller sizing', 'inboard prop slip'],
    tags: ['Acme', 'Inboard', 'Wakeboard', 'Wakesurf', 'Ski Boat'],
    icon: 'Ship',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-01-22',
    seo: {
      title: 'Acme Prop Calculator – Inboard Wakeboard & Ski Boat Propeller Sizing',
      metaDescription: 'Calculate propeller slip, speed, and pitch for Acme Marine CNC-machined inboard propellers used on MasterCraft, Nautique, Malibu, and Axis wake boats.',
      keywords: ['acme prop calculator', 'acme marine prop', 'wake boat propeller calculator', 'wakesurf prop slip'],
    },
    relatedCalculators: ['propeller-calculator', 'mercury-propeller-calculator', 'sailboat-propeller-calculator', 'suzuki-prop-calculator'],
    editorial: {
      whatIs: 'Acme Marine manufactures 100% CNC-machined inboard propellers engineered specifically for tournament waterski, wakeboard, and wakesurf towboats (such as Nautique, MasterCraft, Malibu, Centurion, and Supra). Towboats operate with high ballast weight and low speeds, requiring precise diameter, pitch, and blade cup calculations.',
      howToUse: [
        'Enter your inboard engine RPM (typically 3,000–4,000 RPM while pulling a wakesurfer or wakeboarder).',
        'Enter your Acme propeller pitch in inches (commonly 11" to 17" on modern high-ballast towboats).',
        'Specify your transmission/V-drive gear ratio (commonly 1.0:1 direct drive or 1.23:1, 1.48:1, 1.76:1, or 2:1 V-drives).',
        'Evaluate actual tow speed and slip under full ballast conditions.',
      ],
      formula: {
        title: 'Inboard Towboat Pitch Speed & Ballast Slip',
        expression: 'V_{\\text{surf}} = \\frac{\\text{RPM} \\times P}{\\text{Ratio} \\times 1056} \\times (1 - \\text{Slip}_{\\text{ballast}})',
        explanation: 'Due to 3,000–5,000+ lbs of added water ballast creating high hull drag at 10–12 mph wakesurf speeds, inboard towboats experience higher slip (18%–28%) than light planing runabouts.',
      },
      example: {
        scenario: 'A wakeboard boat with a 1.50:1 V-drive running an Acme 2249 (15 x 14.25 with 0.105 cup) at 3,600 RPM pulling a surfer at 11.2 mph.',
        steps: [
          'Theoretical Pitch Speed: (3,600 × 14.25) / (1.50 × 1056) = 51,300 / 1,584 = 32.39 mph.',
          'Wakesurf Speed Delta: 32.39 - 11.20 = 21.19 mph.',
          'Ballasted Towboat Slip: (21.19 / 32.39) × 100 = 65.42% (in semi-displacement surf plow mode).',
        ],
        result: 'Theoretical speed is 32.39 mph with expected heavy slip during non-planing wakesurf displacement.',
      },
      tips: [
        'For high-altitude lakes (above 3,000 ft) or heavy ballast setups (3,500+ lbs), drop 1 to 2 inches of propeller pitch to help the engine hold speed without RPM surging.',
        'Acme CNC-milled propellers provide uniform blade thickness and balance, eliminating hull vibration common in hand-finished cast propellers.',
        'Check your hull-to-prop clearance: you need a minimum of 10% to 15% of the propeller diameter between the blade tip and the fiberglass hull to prevent gelcoat cavitation burn.',
      ],
      faqs: [
        {
          question: 'Why are Acme propellers CNC machined rather than cast?',
          answer: 'CNC machining from solid forged NiBrAl (Nickel-Bronze-Aluminum) blanks provides micro-precision blade geometry, symmetrical rake, and balanced tracking that traditional sand-casting cannot replicate.',
        },
        {
          question: 'What does "cup" mean on an Acme propeller?',
          answer: 'Blade cup is a curved lip along the trailing edge of the propeller blade. Cup acts like additional pitch, gripping the water more aggressively to reduce slip under heavy wakeboard ballast.',
        },
        {
          question: 'What is the difference between direct drive and V-drive gear ratios?',
          answer: 'Direct-drive ski boats mount the engine amidships with a 1:1 or 1.23:1 ratio for flat wakes. V-drive wake boats place the engine in the rear with a 1.48:1 to 2:1 reduction ratio to swing large 15-to-17-inch props.',
        },
        {
          question: 'How do I know if I need a lower pitch prop for wakesurfing?',
          answer: 'If your boat struggles to reach surfing speed (10.5–11.5 mph) with full ballast tanks, or if the throttle is pegged at 100% without holding cruise control, you need to down-pitch 1 to 2 inches.',
        },
      ],
    },
  },
  {
    slug: 'sailboat-propeller-calculator',
    name: 'Sailboat Propeller Calculator',
    shortDescription: 'Calculate displacement hull speed, auxiliary engine horsepower matching, shaft RPM, and recommended prop diameter and pitch for cruising sailboats.',
    category: 'science',
    secondaryCategories: ['sports', 'everyday'],
    keywords: ['sailboat propeller calculator', 'sailboat hull speed calculator', 'sailboat prop sizing', 'auxiliary engine prop', 'displacement hull speed'],
    tags: ['Sailboat', 'Propeller', 'Marine', 'Hull Speed', 'Sailing'],
    icon: 'Ship',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-22',
    seo: {
      title: 'Sailboat Propeller Calculator – Hull Speed & Auxiliary Prop Sizing',
      metaDescription: 'Free sailboat propeller calculator. Calculate theoretical displacement hull speed, cruising speed, and recommended 2-blade or 3-blade prop diameter and pitch.',
      keywords: ['sailboat propeller calculator', 'sailboat hull speed', 'sailboat prop sizing', 'marine auxiliary propeller', 'propeller pitch sailboat'],
    },
    relatedCalculators: ['propeller-calculator', 'suzuki-prop-calculator', 'mercury-propeller-calculator', 'michigan-wheel-prop-calculator'],
    editorial: {
      whatIs: 'A sailboat propeller calculator sizes auxiliary marine propellers for displacement hull sailboats. Because cruising sailboats operate within a strict displacement speed ceiling dictated by their waterline length (LWL), sizing requires balancing engine horsepower, shaft reduction gearbox RPM, and cruising drag under sail.',
      howToUse: [
        'Enter your sailboat waterline length (LWL in feet, not LOA).',
        'Enter your auxiliary diesel or electric inboard engine horsepower (HP).',
        'Input your propeller shaft RPM at cruising speed (Engine RPM divided by transmission reduction ratio, typically 2:1 or 2.5:1).',
        'Choose 2-blade (low sailing drag), 3-blade (all-around motoring power), or 4-blade configuration.',
      ],
      formula: {
        title: 'Displacement Hull Speed & Prop Sizing',
        expression: 'V_{\\text{hull}} = 1.34 \\times \\sqrt{\\text{LWL}} \\quad ; \\quad V_{\\text{cruise}} \\approx 0.85 \\times V_{\\text{hull}}',
        explanation: 'Where LWL is waterline length in feet and 1.34 is the Froude speed-to-length ratio constant for standard displacement monohulls. Diameter and pitch are derived from Crouch empirical sizing formulas.',
      },
      example: {
        scenario: 'A 32-foot cruising sailboat with a 28-foot waterline (LWL), 25 HP diesel engine, 2.5:1 transmission (1,000 shaft RPM), and a 3-blade prop.',
        steps: [
          'Theoretical Hull Speed: 1.34 × √28 = 1.34 × 5.2915 = 7.09 knots.',
          'Target Cruising Speed: 7.09 × 0.85 = 6.03 knots (6.94 mph).',
          'Recommended Prop Dimensions: ~15-inch diameter × 10-inch pitch (3-blade).',
        ],
        result: 'Theoretical hull speed is 7.09 knots with an estimated 6.03 knots cruising speed.',
      },
      tips: [
        'A 2-blade fixed prop offers less drag while sailing, but a 3-blade prop provides significantly better stopping power in marinas and punch through head seas.',
        'Folding or feathering propellers (such as Max-Prop or Gori) reduce sailing drag by up to 1 knot while delivering full 3-blade reverse thrust.',
        'Ensure you have at least 10% to 15% of the propeller diameter in tip clearance between the blade tips and the bottom of the hull.',
      ],
      faqs: [
        {
          question: 'Why is sailboat speed limited by waterline length (LWL)?',
          answer: 'As a displacement hull moves forward, it generates a bow wave and stern wave. As speed approaches 1.34 × √LWL, the wavelength matches the waterline length, trapping the boat in a wave trough that requires massive exponential power to climb out of.',
        },
        {
          question: 'How much horsepower per ton does a sailboat need?',
          answer: 'A standard rule of thumb for cruising sailboats is 2 to 2.5 horsepower per 1,000 pounds (or 4 to 5 HP per displacement ton) to motor safely against 25-knot headwinds and opposing tidal currents.',
        },
        {
          question: 'What is the advantage of a folding propeller on a sailboat?',
          answer: 'Under sail, water flow presses a folding propeller blades together into a low-profile streamlined cone, reducing hydrodynamic drag by up to 90% and adding 0.5 to 1.2 knots of sailing speed.',
        },
        {
          question: 'What causes prop walk on a sailboat?',
          answer: 'Prop walk (asymmetric blade thrust) occurs because the lower propeller blade operates in denser, less aerated water than the upper blade. In reverse, a right-hand rotating propeller tends to pull the sailboat stern to port.',
        },
      ],
    },
  },
];
