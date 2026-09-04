import { CalculatorDefinition } from '../types';

export const DENSITY_CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'density-calculator',
    name: 'Density Calculator',
    shortDescription: 'Calculate density (ρ = m/V), mass, or volume across metric and imperial units with instant multi-unit conversions.',
    category: 'science',
    secondaryCategories: ['education', 'everyday'],
    keywords: ['density calculator', 'mass volume density', 'calculate density', 'density formula', 'density conversion'],
    tags: ['Density', 'Physics', 'Mass', 'Volume', 'Science'],
    icon: 'Layers',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-22',
    seo: {
      title: 'Density Calculator – Calculate Density, Mass & Volume (ρ = m/V)',
      metaDescription: 'Free online density calculator. Calculate material density, mass, or volume with step-by-step math across g/cm³, kg/m³, lbs/ft³, and lbs/in³.',
      keywords: ['density calculator', 'calculate density online', 'density formula physics', 'mass volume calculator'],
    },
    relatedCalculators: ['cube-density-calculator', 'water-density-calculator', 'air-density-calculator', 'freight-density-calculator'],
    editorial: {
      whatIs: 'A density calculator computes the volumetric mass density of a substance, defined as its mass divided by its occupied volume. Density measures how tightly matter is packed together and determines whether an object floats or sinks in a given fluid.',
      howToUse: [
        'Enter mass value and select unit (grams, kilograms, pounds, ounces).',
        'Enter volume value and select unit (cm³, milliliters, liters, m³, in³, ft³).',
        'Review calculated density in g/cm³, kg/m³, lbs/ft³, and lbs/in³.',
      ],
      formula: {
        title: 'Fundamental Density Equation',
        expression: '\\rho = \\frac{m}{V} \\quad ; \\quad m = \\rho \\cdot V \\quad ; \\quad V = \\frac{m}{\\rho}',
        explanation: 'Where rho is density, m is total mass, and V is occupied physical volume.',
      },
      example: {
        scenario: 'A metal alloy cylinder weighing 2,450 grams occupying 280 cm³ of volume.',
        steps: [
          'Mass m = 2,450 g, Volume V = 280 cm³.',
          'Density: 2,450 / 280 = 8.75 g/cm³.',
          'In SI units: 8.75 × 1,000 = 8,750 kg/m³ (characteristic of nickel-brass).',
        ],
        result: 'Density is 8.75 g/cm³ (8,750 kg/m³ or 546.2 lbs/ft³).',
      },
      tips: [
        'Pure water at standard temperature (4°C) has a density of exactly 1.0 g/cm³ (1,000 kg/m³); materials with density < 1.0 float in water.',
        'Density changes with temperature and pressure: gases expand and lose density when heated, while solids and liquids experience slight thermal expansion.',
        'Specific gravity is dimensionless relative density comparing a substance density directly to pure water at 4°C.',
      ],
      faqs: [
        {
          question: 'What are standard units of density?',
          answer: 'The SI unit is kilogram per cubic meter (kg/m³). In chemistry and materials science, grams per cubic centimeter (g/cm³ or g/mL) is standard. In imperial engineering, pounds per cubic foot (lbs/ft³) is common.',
        },
        {
          question: 'What is the densest naturally occurring element on Earth?',
          answer: 'Osmium (Os) is the densest known naturally occurring element at approximately 22.59 g/cm³, closely followed by Iridium (Ir) at 22.56 g/cm³.',
        },
        {
          question: 'Does shape affect an object density?',
          answer: 'No. Density is an intrinsic physical property of homogeneous materials, independent of whether the object is a sphere, cube, or thin sheet.',
        },
        {
          question: 'How do you measure volume for irregular objects?',
          answer: 'Use Archimedes water displacement method: submerge the object in a graduated cylinder of water; the volume of displaced water equals the volume of the object.',
        },
      ],
    },
  },
  {
    slug: 'cube-density-calculator',
    name: 'Cube Density Calculator',
    shortDescription: 'Calculate the density of cubic objects from side length and mass, with material identification and unit conversions.',
    category: 'science',
    secondaryCategories: ['education'],
    keywords: ['cube density', 'cube density calculator', 'density of a cube', 'cube mass volume', 'cube weight calculator'],
    tags: ['Cube', 'Density', 'Geometry', 'Physics', 'Materials'],
    icon: 'Box',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-01-22',
    seo: {
      title: 'Cube Density Calculator – Density of a Cube (ρ = m / s³)',
      metaDescription: 'Calculate the density of any cube from side length and mass. Features automatic volume calculation (V = s³) and common material matching.',
      keywords: ['cube density calculator', 'density of a cube', 'cube volume density', 'side length to density'],
    },
    relatedCalculators: ['density-calculator', 'water-density-calculator', 'freight-density-calculator'],
    editorial: {
      whatIs: 'The Cube Density Calculator computes the physical density of any cubic shape directly from its side length (edge) and measured mass. Because a cube has equal length, width, and height, volume is simply the cube of the edge length ($V = s^3$).',
      howToUse: [
        'Enter the edge or side length (s) of the cube and select the unit (cm, m, in, ft).',
        'Enter measured mass or weight (g, kg, lbs).',
        'Review the calculated cube volume, density, and standard material comparison.',
      ],
      formula: {
        title: 'Cube Volume and Density Formulas',
        expression: 'V = s^3 \\quad ; \\quad \\rho = \\frac{m}{s^3}',
        explanation: 'Where s is edge length and m is mass. For example, a 10 cm cube has a volume of 1,000 cm³ (1 liter).',
      },
      example: {
        scenario: 'A solid metal cube with 5 cm sides weighing 981.25 grams.',
        steps: [
          'Side s = 5 cm.',
          'Volume: 5³ = 125 cm³.',
          'Density: 981.25 g / 125 cm³ = 7.85 g/cm³.',
        ],
        result: 'Density is 7.85 g/cm³ (7,850 kg/m³), identifying the material as structural carbon steel.',
      },
      tips: [
        'Measuring side length accurately with digital vernier calipers is critical because measurement errors are cubed in the volume equation.',
        'If the cube is hollow, the calculated value is "bulk" or apparent density rather than true material density.',
        'Use the material table to quickly verify whether samples match aluminum (2.7 g/cm³), titanium (4.5 g/cm³), steel (7.85 g/cm³), or gold (19.3 g/cm³).',
      ],
      faqs: [
        {
          question: 'How do you find the mass of a cube if density is known?',
          answer: 'Multiply the cube volume (s³) by its known density: m = s³ × ρ.',
        },
        {
          question: 'What is the density of an aluminum cube?',
          answer: 'Pure aluminum has a density of approximately 2.70 g/cm³ (2,700 kg/m³ or 168.6 lbs/ft³).',
        },
        {
          question: 'What is the density of a 1-meter cube of water?',
          answer: 'A cube measuring 1 meter on each side has a volume of 1 cubic meter (1,000 liters) and holds exactly 1,000 kg (1 metric ton or ~2,204.6 lbs) of pure water at 4°C.',
        },
        {
          question: 'Can I use this calculator for rectangular prisms (boxes)?',
          answer: 'For non-cube boxes where length, width, and height differ, use our general Density Calculator or Freight Density Calculator.',
        },
      ],
    },
  },
  {
    slug: 'water-density-calculator',
    name: 'Water Density Calculator',
    shortDescription: 'Calculate pure freshwater and ocean seawater density based on temperature (-5°C to 100°C) and salinity (0 to 40 PSU).',
    category: 'science',
    secondaryCategories: ['education', 'everyday'],
    keywords: ['water density', 'water density calculator', 'density of water by temperature', 'seawater density', 'salinity density calculator'],
    tags: ['Water', 'Density', 'Temperature', 'Salinity', 'Oceanography', 'Physics'],
    icon: 'Droplets',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-22',
    seo: {
      title: 'Water Density Calculator – Density of Water by Temperature & Salinity',
      metaDescription: 'Free water density calculator. Calculate exact density of freshwater and ocean seawater across temperatures (0°C to 100°C) and salinity (PSU) using UNESCO standards.',
      keywords: ['water density calculator', 'density of water temperature', 'seawater density calculator', 'pure water density'],
    },
    relatedCalculators: ['density-calculator', 'air-density-calculator', 'cube-density-calculator'],
    editorial: {
      whatIs: 'The Water Density Calculator computes the exact density of liquid water across varying temperatures (from sub-zero supercooled water to boiling) and salinities (from distilled freshwater to dense ocean water). It implements standard UNESCO and Kell equation of state formulations.',
      howToUse: [
        'Enter water temperature in degrees Celsius (°C).',
        'Enter water salinity in PSU (0 for freshwater, ~35 for typical seawater).',
        'View resulting density in kg/m³, g/cm³, and lbs/ft³ along with specific gravity.',
      ],
      formula: {
        title: 'Water Density & Temperature Anomaly',
        expression: '\\rho(T, S) = \\rho_{\\text{fresh}}(T) + S \\cdot \\left(0.8245 - 4.09 \\times 10^{-3} T + 7.64 \\times 10^{-5} T^2\\right)',
        explanation: 'Water exhibits an anomalous density maximum at 3.98°C (999.97 kg/m³). Adding dissolved salts increases density linearly with salinity.',
      },
      example: {
        scenario: 'Measuring Atlantic seawater at 20°C with standard 35 PSU salinity.',
        steps: [
          'Freshwater density at 20°C: ~998.20 kg/m³.',
          'Salinity addition for 35 PSU at 20°C: +26.55 kg/m³.',
          'Total Seawater Density: 998.20 + 26.55 = 1,024.75 kg/m³.',
        ],
        result: 'Seawater density is 1,024.75 kg/m³ (specific gravity 1.0248).',
      },
      tips: [
        'Water reaches its maximum density at 3.98°C (approx 4°C). This unique thermal anomaly prevents lakes from freezing solid from the bottom up in winter.',
        'Seawater typically ranges from 1,020 to 1,030 kg/m³, increasing buoyant lift for ships and swimmers compared to freshwater lakes.',
        'Hot water expands: boiling water at 100°C has a density of approximately 958.4 kg/m³, over 4% lighter than cold water.',
      ],
      faqs: [
        {
          question: 'Why does ice float on liquid water?',
          answer: 'When water freezes into crystalline ice, hydrogen bonding creates an open hexagonal lattice structure that expands volume by ~9%, lowering ice density to ~917 kg/m³, making it buoyant.',
        },
        {
          question: 'What is the density of pure water at room temperature (20°C)?',
          answer: 'At 20°C (68°F), pure water has a density of 998.2 kg/m³ (0.9982 g/cm³ or ~62.31 lbs/ft³).',
        },
        {
          question: 'What is PSU in salinity measurement?',
          answer: 'PSU stands for Practical Salinity Unit, which is based on electrical conductivity ratios relative to a standard KCl solution. Ocean seawater averages 35 PSU (~3.5% salt by weight).',
        },
        {
          question: 'Why is the Dead Sea so dense?',
          answer: 'The Dead Sea has an extreme mineral salinity of approximately 340 PSU (over 30% dissolved salts), giving it a density of roughly 1,240 kg/m³, allowing people to float effortlessly.',
        },
      ],
    },
  },
  {
    slug: 'air-density-calculator',
    name: 'Air Density Calculator',
    shortDescription: 'Calculate moist atmospheric air density, dew point, and density altitude from temperature, barometric pressure, elevation, and humidity.',
    category: 'science',
    secondaryCategories: ['technology', 'sports'],
    keywords: ['air density calculator', 'density altitude', 'calculate air density', 'atmospheric density', 'air density formula'],
    tags: ['Air Density', 'Atmosphere', 'Aviation', 'Weather', 'Physics', 'Meteorology'],
    icon: 'Wind',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-22',
    seo: {
      title: 'Air Density Calculator – Moist Atmospheric Air Density & Dew Point',
      metaDescription: 'Free online air density calculator. Calculate moist air density (kg/m³ and lbs/ft³), dew point, and percentage of standard sea level air using the ideal gas law.',
      keywords: ['air density calculator', 'calculate air density', 'air density formula', 'atmospheric air density', 'density altitude calculator'],
    },
    relatedCalculators: ['density-calculator', 'water-density-calculator', 'propeller-thrust-calculator'],
    editorial: {
      whatIs: 'The Air Density Calculator calculates the density of atmospheric air by applying the ideal gas law for moist air (CIPM / ISA formulations). Because humid air contains water vapor (molecular mass 18 g/mol) that displaces dry air (diatomic nitrogen and oxygen, average molecular mass 29 g/mol), moist air is actually lighter and less dense than dry air.',
      howToUse: [
        'Enter ambient air temperature in °C.',
        'Enter barometric pressure in hPa/mbar or specify elevation above sea level.',
        'Enter relative humidity percentage (0% to 100%).',
        'Review air density in kg/m³ and lbs/ft³, relative percentage of standard sea level, and dew point.',
      ],
      formula: {
        title: 'Moist Air Density Equation',
        expression: '\\rho = \\frac{p_d}{R_d \\cdot T} + \\frac{p_v}{R_v \\cdot T}',
        explanation: 'Where p_d is partial pressure of dry air, p_v is partial pressure of water vapor, R_d is specific gas constant for dry air (287.058 J/(kg*K)), R_v is for water vapor (461.495 J/(kg*K)), and T is absolute temperature in Kelvin.',
      },
      example: {
        scenario: 'Standard International Standard Atmosphere (ISA) sea level conditions: 15°C, 1013.25 hPa, 0% humidity.',
        steps: [
          'T = 15 + 273.15 = 288.15 K.',
          'p = 101,325 Pa, pv = 0.',
          'Density: 101,325 / (287.058 × 288.15) = 1.2250 kg/m³.',
        ],
        result: 'Air density is 1.2250 kg/m³ (0.0765 lbs/ft³).',
      },
      tips: [
        'High temperature, low pressure, and high humidity all decrease air density, resulting in "high density altitude" that degrades aircraft climb performance and engine horsepower.',
        'Drag racing and motorsports tuners monitor air density (DA / grains of water) to calibrate air-fuel mixtures for maximum combustion horsepower.',
        'Baseball fly balls travel significantly farther in thin, low-density air (e.g. Coors Field in Denver at 5,280 ft elevation).',
      ],
      faqs: [
        {
          question: 'Is humid air heavier or lighter than dry air?',
          answer: 'Counter-intuitively, humid air is lighter and less dense than dry air. Water vapor molecules (H2O, 18 g/mol) displace heavier nitrogen (N2, 28 g/mol) and oxygen (O2, 32 g/mol) gas molecules.',
        },
        {
          question: 'What is standard sea level air density?',
          answer: 'Under the International Standard Atmosphere (ISA) definition at 15°C (59°F) and 1013.25 hPa (29.92 inHg), air density is exactly 1.225 kg/m³ (0.07651 lbs/ft³).',
        },
        {
          question: 'How does elevation affect air density?',
          answer: 'Air density drops exponentially with elevation. At 2,000 meters (~6,560 ft), air density is roughly 80% of sea level; at 5,000 meters (~16,400 ft), it is only 60%.',
        },
        {
          question: 'What is density altitude?',
          answer: 'Density altitude is pressure altitude corrected for non-standard temperature. It represents the altitude at which the current air density would occur in a standard atmosphere.',
        },
      ],
    },
  },
  {
    slug: 'pixel-density-calculator',
    name: 'Pixel Density Calculator',
    shortDescription: 'Calculate display pixel density (PPI), total megapixels, dot pitch, and optimal viewing distance from screen resolution and diagonal size.',
    category: 'technology',
    secondaryCategories: ['everyday'],
    keywords: ['pixel density', 'pixel density calculator', 'ppi calculator', 'pixels per inch', 'screen resolution calculator'],
    tags: ['Pixel Density', 'PPI', 'Screens', 'Monitors', 'Smartphones', 'Displays'],
    icon: 'Monitor',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-22',
    seo: {
      title: 'Pixel Density Calculator – PPI & Screen Resolution Calculator',
      metaDescription: 'Calculate monitor, TV, and smartphone pixel density (PPI), dot pitch (mm), total megapixels, and retina viewing distance from resolution and screen size.',
      keywords: ['pixel density calculator', 'ppi calculator', 'pixels per inch calculator', 'monitor ppi', 'screen sharpness calculator'],
    },
    relatedCalculators: ['density-calculator'],
    editorial: {
      whatIs: 'The Pixel Density Calculator computes Pixels Per Inch (PPI) for monitors, laptops, tablets, smartphones, and televisions. PPI measures the spatial concentration of pixels: higher PPI results in sharper text, smoother vectors, and imperceptible pixel grain.',
      howToUse: [
        'Enter horizontal resolution in pixels (e.g. 1920, 2560, 3840).',
        'Enter vertical resolution in pixels (e.g. 1080, 1440, 2160).',
        'Enter screen diagonal size in inches (e.g. 6.1" phone, 14" laptop, 27" monitor).',
        'View PPI, dot pitch in millimeters, aspect ratio, and retinal viewing distance.',
      ],
      formula: {
        title: 'Pixel Density (PPI) Formula',
        expression: '\\text{PPI} = \\frac{\\sqrt{W^2 + H^2}}{D_{\\text{diagonal}}} \\quad ; \\quad \\text{Dot Pitch} = \\frac{25.4}{\\text{PPI}}',
        explanation: 'Where W is horizontal pixel count, H is vertical pixel count, and D is screen diagonal in inches. Dot pitch represents the physical width of an individual pixel in millimeters.',
      },
      example: {
        scenario: 'A 27-inch 4K UHD monitor running at 3840 x 2160 resolution.',
        steps: [
          'Diagonal pixels: √(3840² + 2160²) = √(14,745,600 + 4,665,600) = √19,411,200 = 4,405.8 pixels.',
          'PPI: 4,405.8 / 27 = 163.2 PPI.',
          'Dot Pitch: 25.4 / 163.2 = 0.1557 mm per pixel.',
        ],
        result: 'Displays 163.2 PPI (8.29 Megapixels) with a sharp 0.1557 mm dot pitch.',
      },
      tips: [
        'For desktop monitors viewed at arms length (24–30 inches), 110 to 160 PPI is the sweet spot for razor-sharp typography.',
        'Smartphones viewed closer (10–14 inches) require 350 to 450+ PPI to achieve true "Retina" clarity where human eyes cannot resolve individual pixels.',
        'At 4K on a 27-inch monitor (163 PPI), enable OS display scaling (typically 150% on Windows, 2x Retina mode on macOS) for comfortable UI reading.',
      ],
      faqs: [
        {
          question: 'What is the definition of a "Retina" display?',
          answer: 'A display is considered "Retina" when its pixel density is sufficiently high that a person with 20/20 vision cannot distinguish individual pixels at standard viewing distance (~300+ PPI for phones, ~220 PPI for laptops, ~110+ PPI for TVs).',
        },
        {
          question: 'What is the difference between PPI and DPI?',
          answer: 'PPI (Pixels Per Inch) measures digital display resolution. DPI (Dots Per Inch) measures physical ink dot density laid down by physical printing presses and laser printers.',
        },
        {
          question: 'What is standard PPI for a 24-inch 1080p monitor?',
          answer: 'A 24-inch monitor at 1920x1080 has a pixel density of ~91.8 PPI, with a dot pitch of 0.2766 mm.',
        },
        {
          question: 'How do you calculate viewing distance for a given PPI?',
          answer: 'The threshold viewing distance where pixels become indistinguishable to 20/20 human visual acuity (1 arcminute) is: Distance (inches) = 3,438 / PPI.',
        },
      ],
    },
  },
  {
    slug: 'population-density-calculator',
    name: 'Population Density Calculator',
    shortDescription: 'Calculate demographic population density per square mile and square kilometer, and available land area per inhabitant.',
    category: 'statistics',
    secondaryCategories: ['education', 'everyday'],
    keywords: ['population density', 'population density calculator', 'people per square mile', 'people per square kilometer', 'demographic density'],
    tags: ['Population', 'Demographics', 'Geography', 'Statistics', 'Cities'],
    icon: 'Users',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-01-22',
    seo: {
      title: 'Population Density Calculator – People Per Square Mile & Km²',
      metaDescription: 'Calculate population density per square mile and square kilometer. Compare city, state, and country demographic densities and land area per person.',
      keywords: ['population density calculator', 'people per square mile', 'population density formula', 'city density calculator'],
    },
    relatedCalculators: ['density-calculator'],
    editorial: {
      whatIs: 'The Population Density Calculator determines the concentration of human inhabitants living within a geographic boundary (city, metropolitan area, state, or country). It divides total census population by land area in square miles or square kilometers.',
      howToUse: [
        'Enter total population count.',
        'Enter total geographic land area (excluding major water bodies for accurate urban metrics).',
        'Select land area unit (Square Miles or Square Kilometers).',
        'Review population density in both metric and imperial units alongside square meters per person.',
      ],
      formula: {
        title: 'Population Density Formula',
        expression: 'D_{\\text{pop}} = \\frac{\\text{Population}}{\\text{Land Area}}',
        explanation: 'Population density divides total resident count by land area. 1 square mile equals approximately 2.58999 square kilometers.',
      },
      example: {
        scenario: 'New York City with a population of 8,336,817 across a land area of 300.46 square miles.',
        steps: [
          'Population: 8,336,817 residents.',
          'Land Area: 300.46 sq miles (778.2 sq km).',
          'Density per sq mile: 8,336,817 / 300.46 = 27,747 people/sq mi.',
          'Density per sq km: 8,336,817 / 778.2 = 10,713 people/km².',
        ],
        result: 'NYC has a population density of 27,747 people per sq mile (~93 m² per resident).',
      },
      tips: [
        'Always use land area rather than total area (which includes lakes, bays, and rivers) to avoid underestimating true urban congestion.',
        'Manhattan (New York County) has the highest county density in the US at ~72,000 residents per square mile.',
        'Greenland and Mongolia are the least densely populated countries on Earth at under 2 people per square kilometer.',
      ],
      faqs: [
        {
          question: 'What is the most densely populated city in the world?',
          answer: 'Cities like Manila (Philippines), Dhaka (Bangladesh), and Mumbai (India) exceed 70,000 to 110,000 residents per square kilometer in their core urban municipal districts.',
        },
        {
          question: 'What is arithmetic vs physiological population density?',
          answer: 'Arithmetic density is total population divided by total land area. Physiological density is total population divided only by arable (farmable) agricultural land area, reflecting food security pressure.',
        },
        {
          question: 'How many square kilometers are in a square mile?',
          answer: '1 square mile equals 2.589988 square kilometers. To convert density per square mile to density per square kilometer, divide by 2.59.',
        },
        {
          question: 'What is the average population density of the United States?',
          answer: 'The United States has an average population density of approximately 94 people per square mile (36 people per km²), with extreme variation between Alaska (1.3/sq mi) and New Jersey (1,260/sq mi).',
        },
      ],
    },
  },
  {
    slug: 'psa-density-calculator',
    name: 'PSA Density Calculator',
    shortDescription: 'Calculate Prostate-Specific Antigen (PSA) density to assess prostate cancer risk and differentiate BPH from malignant tumors.',
    category: 'health',
    secondaryCategories: ['science'],
    keywords: ['psa density', 'psa density calculator', 'prostate psa density', 'psad calculator', 'prostate cancer risk'],
    tags: ['PSA', 'Prostate', 'Health', 'Medical', 'Urology', 'Men Health'],
    icon: 'HeartPulse',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-01-22',
    seo: {
      title: 'PSA Density Calculator – Prostate-Specific Antigen Density (PSAD)',
      metaDescription: 'Calculate PSA Density (PSAD) in ng/mL/cc from serum PSA and prostate volume. Evaluates clinical biopsy risk thresholds (0.15 ng/mL/cc).',
      keywords: ['psa density calculator', 'psad calculator', 'prostate volume psa', 'psa density cutoff', 'urology psa calculator'],
    },
    relatedCalculators: ['density-calculator', 'bmi-calculator'],
    editorial: {
      whatIs: 'The PSA Density (PSAD) Calculator evaluates Prostate-Specific Antigen concentration relative to prostate gland volume measured on ultrasound or MRI. Because benign prostatic hyperplasia (BPH) enlarges the prostate and produces modest PSA increases, dividing total PSA by prostate volume helps urologists differentiate benign swelling from aggressive prostate carcinoma.',
      howToUse: [
        'Enter total serum PSA concentration in ng/mL from routine blood testing.',
        'Enter prostate gland volume in cubic centimeters (cc or cm³) from TRUS ultrasound or multiparametric MRI.',
        'View calculated PSA Density and clinical risk classification relative to the standard 0.15 ng/mL/cc threshold.',
      ],
      formula: {
        title: 'PSA Density Equation',
        expression: '\\text{PSAD} = \\frac{\\text{Total PSA (ng/mL)}}{\\text{Prostate Volume (cc)}}',
        explanation: 'A PSAD value greater than or equal to 0.15 ng/mL/cc represents the standard clinical threshold indicating heightened risk of clinically significant prostate cancer.',
      },
      example: {
        scenario: 'A patient with a total serum PSA of 5.6 ng/mL and a large 55 cc prostate volume on ultrasound.',
        steps: [
          'Total PSA: 5.6 ng/mL.',
          'Prostate Volume: 55 cc.',
          'PSA Density: 5.6 / 55 = 0.102 ng/mL/cc.',
        ],
        result: 'PSAD is 0.102 ng/mL/cc (< 0.15 threshold), suggesting elevated PSA is likely due to benign enlargement (BPH).',
      },
      tips: [
        'A PSA density below 0.15 ng/mL/cc in the "gray zone" (PSA 4–10 ng/mL) significantly reduces the likelihood of high-grade malignancy.',
        'Multiparametric MRI (mpMRI) provides more accurate volume measurements and PI-RADS lesion scoring than standard 2D transrectal ultrasound.',
        'Always review PSA density results with a board-certified urologist in conjunction with digital rectal exam (DRE), free PSA percentage, and family history.',
      ],
      faqs: [
        {
          question: 'What is a normal PSA Density cutoff?',
          answer: 'The widely accepted clinical cutoff is 0.15 ng/mL/cc. Values below 0.15 suggest benign conditions like BPH, while values ≥ 0.15 warrant further investigation such as an MRI or targeted biopsy.',
        },
        {
          question: 'How is prostate volume measured?',
          answer: 'Volume is typically measured using the prolate ellipsoid formula: Volume (cc) = Length × Width × Height × 0.523 on transrectal ultrasound (TRUS) or pelvic MRI.',
        },
        {
          question: 'What causes elevated PSA besides prostate cancer?',
          answer: 'Benign prostatic hyperplasia (BPH), acute or chronic prostatitis (infection/inflammation), recent ejaculation, vigorous cycling, urinary retention, and medical instrumentation can elevate serum PSA.',
        },
        {
          question: 'What is the "PSA gray zone"?',
          answer: 'The PSA gray zone refers to total serum PSA levels between 4.0 and 10.0 ng/mL, where approximately 75% of biopsies turn out to be benign. PSA density helps prevent unnecessary biopsies in this range.',
        },
      ],
    },
  },
  {
    slug: 'freight-density-calculator',
    name: 'Freight Density Calculator',
    shortDescription: 'Calculate freight density in pounds per cubic foot (PCF), total cubic feet, and standard NMFC freight class (Class 50 to 500).',
    category: 'business',
    secondaryCategories: ['everyday'],
    keywords: ['freight density calculator', 'pcf calculator', 'freight class calculator', 'nmfc class calculator', 'ltl shipping density'],
    tags: ['Freight', 'LTL', 'Logistics', 'Shipping', 'NMFC', 'PCF'],
    icon: 'Package',
    status: 'published',
    featured: true,
    popular: true,
    addedDate: '2025-01-22',
    seo: {
      title: 'Freight Density Calculator – PCF & NMFC Freight Class Estimator',
      metaDescription: 'Free freight density calculator. Calculate pounds per cubic foot (PCF), total pallet volume, and standard NMFC freight classification (Class 50 to 500).',
      keywords: ['freight density calculator', 'pcf calculator', 'freight class calculator', 'nmfc density table', 'ltl density calculator'],
    },
    relatedCalculators: ['ltl-density-calculator', 'bluegrace-density-calculator', 'saia-density-calculator', 'xpo-density-calculator'],
    editorial: {
      whatIs: 'The Freight Density Calculator determines the density of shipments in pounds per cubic foot (PCF) and identifies the corresponding National Motor Freight Classification (NMFC) freight class. LTL (Less-Than-Truckload) carriers rate shipments based on density: higher-density freight packs tightly into trailers and earns lower freight classes with cheaper shipping rates.',
      howToUse: [
        'Enter length, width, and height in inches for your palletized cargo or crates.',
        'Enter weight per unit in pounds (including the wooden pallet weight).',
        'Enter the total number of pallet units in the shipment.',
        'Select whether pallets are stackable or non-stackable.',
        'View resulting PCF density, total cubic feet, and assigned NMFC freight class.',
      ],
      formula: {
        title: 'Freight Density & Cubic Feet Formulas',
        expression: '\\text{Cubic Feet} = \\frac{L \\times W \\times H}{1728} \\times Q \\quad ; \\quad \\text{PCF} = \\frac{\\text{Total Weight (lbs)}}{\\text{Total Cubic Feet}}',
        explanation: 'Where 1728 converts cubic inches into cubic feet. Total weight divided by cubic feet yields density in pounds per cubic foot (PCF).',
      },
      example: {
        scenario: 'Shipping 2 standard pallets (48" x 40" x 48") weighing 700 lbs each.',
        steps: [
          'Volume per pallet: (48 × 40 × 48) / 1728 = 92,160 / 1728 = 53.33 cu ft.',
          'Total Volume: 53.33 × 2 = 106.67 cu ft. Total Weight: 1,400 lbs.',
          'Freight Density: 1,400 / 106.67 = 13.12 PCF.',
          'NMFC Class Lookup: 12 to 15 PCF maps to Class 85.',
        ],
        result: 'Shipment has a density of 13.12 PCF and is rated as NMFC Freight Class 85.',
      },
      tips: [
        'Always measure from the outermost protruding edges of the cargo (including overhang, shrink wrap, and corner protectors).',
        'Remember to include the weight of the wooden pallet itself (standard GMA 48x40 pallets weigh 35 to 45 lbs).',
        'Avoid shipping non-stackable pallets when possible: carriers often charge for the entire vertical space of the trailer (96 inches high) if they cannot top-load freight.',
      ],
      faqs: [
        {
          question: 'What is the NMFC freight class range?',
          answer: 'NMFC classes range from Class 50 (highest density, least expensive to ship, e.g. solid steel bars at 50+ PCF) to Class 500 (lowest density, most expensive per pound, e.g. ping-pong balls or hollow plastic at <1 PCF).',
        },
        {
          question: 'What is the standard size of a freight pallet?',
          answer: 'The standard North American GMA grocery pallet is 48 inches long by 40 inches wide, with heights typically ranging from 48 to 72 inches.',
        },
        {
          question: 'Why do carriers re-weigh and re-measure shipments?',
          answer: 'LTL freight carriers use overhead 3D laser dimensional scanners at distribution terminals. If actual density is lower than declared on the bill of lading (BOL), carriers issue costly re-classification adjustments.',
        },
        {
          question: 'What is the cubic capacity rule in freight shipping?',
          answer: 'Carriers apply a cubic capacity rule (often when a shipment occupies 750+ cubic feet with density under 6 PCF) that overrides standard class rates with a higher minimum trailer spot charge.',
        },
      ],
    },
  },
  {
    slug: 'ltl-density-calculator',
    name: 'LTL Density Calculator',
    shortDescription: 'Calculate Less-Than-Truckload (LTL) freight density, trailer linear feet utilization, and stackable height allocations.',
    category: 'business',
    secondaryCategories: ['everyday'],
    keywords: ['ltl density calculator', 'ltl freight density', 'less than truckload density', 'ltl class calculator', 'pallet density ltl'],
    tags: ['LTL', 'Freight', 'Logistics', 'Shipping', 'Trucking'],
    icon: 'Truck',
    status: 'published',
    featured: false,
    popular: true,
    addedDate: '2025-01-22',
    seo: {
      title: 'LTL Density Calculator – Less-Than-Truckload Pallet & Cube Rating',
      metaDescription: 'Calculate LTL freight density (PCF), trailer linear footage, stackable vs non-stackable height factors, and NMFC freight class for Less-Than-Truckload shipments.',
      keywords: ['ltl density calculator', 'ltl freight class', 'less than truckload calculator', 'pallet cube calculator'],
    },
    relatedCalculators: ['freight-density-calculator', 'bluegrace-density-calculator', 'saia-density-calculator', 'xpo-density-calculator'],
    editorial: {
      whatIs: 'The LTL Density Calculator helps logistics managers, warehouse operators, and e-commerce shippers optimize Less-Than-Truckload (LTL) freight profiles. It calculates pounds per cubic foot (PCF), trailer floor space footprint in linear feet, and evaluates stackable versus non-stackable pallet height penalties.',
      howToUse: [
        'Enter pallet length, width, and height in inches.',
        'Enter individual pallet weight in lbs.',
        'Specify pallet quantity and stackability status.',
        'Review PCF density, trailer linear feet consumed, and predicted freight class.',
      ],
      formula: {
        title: 'LTL Linear Foot & Density Equations',
        expression: '\\text{Linear Feet} = \\left\\lceil\\frac{Q}{\\text{Pallets per Row}}\\right\\rceil \\times \\frac{L}{12} \\quad ; \\quad \\text{PCF} = \\frac{W_{\\text{total}}}{\\text{Volume}_{\\text{cu ft}}}',
        explanation: 'On standard 53ft dry vans (102" exterior width, 98" interior), two 48x40 pallets fit side by side per row.',
      },
      example: {
        scenario: 'Shipping 6 stackable 48x40x50 inch pallets weighing 600 lbs each.',
        steps: [
          'Rows of pallets: 6 / 2 = 3 rows.',
          'Linear feet of trailer space: 3 rows × (48 / 12) = 12 linear feet.',
          'Total Volume: 6 × 55.56 cu ft = 333.3 cu ft. Total Weight: 3,600 lbs.',
          'Density: 3,600 / 333.3 = 10.80 PCF (Class 100).',
        ],
        result: 'Occupies 12 linear feet of trailer at 10.80 PCF (Class 100).',
      },
      tips: [
        'If cargo is non-stackable, carriers like Old Dominion, Saia, and Estes rate the freight using 84 to 96 inches of vertical clearance, drastically lowering calculated density and increasing shipping costs.',
        'Use pallet banding and heavy stretch wrap to compress loose boxes, increasing density into a lower, more favorable freight class.',
        'Shipments occupying more than 14 to 20 linear feet often benefit from a volume LTL or partial truckload (PTL) spot quote.',
      ],
      faqs: [
        {
          question: 'What is Less-Than-Truckload (LTL) shipping?',
          answer: 'LTL is the transportation of relatively small freight (typically 1 to 6 pallets weighing between 150 and 10,000 lbs) that does not require a full 53-foot semi-trailer, sharing trailer space with other shippers.',
        },
        {
          question: 'Why does non-stackable freight cost more to ship?',
          answer: 'When a pallet cannot have another pallet placed on top of it, the carrier cannot utilize the upper vertical space in the trailer. Carriers price this "lost air" by adjusting the billing height to the full ceiling.',
        },
        {
          question: 'What is a typical LTL density threshold?',
          answer: 'Carriers consider freight with a density of 10+ PCF to be desirable. Freight under 6 PCF is considered "balloon freight" and often triggers minimum cubic capacity surcharges.',
        },
        {
          question: 'How do linear foot rules work in LTL tariffs?',
          answer: 'Most carrier rules tariffs specify that if a shipment exceeds a certain length (often 12 to 14 linear feet) and has low density, it will be billed at an artificial minimum weight (e.g. 500–1,000 lbs per linear foot).',
        },
      ],
    },
  },
  {
    slug: 'bluegrace-density-calculator',
    name: 'Bluegrace Density Calculator',
    shortDescription: 'Calculate freight density, cubic dimensions, and freight class alignment according to BlueGrace Logistics guidelines.',
    category: 'business',
    secondaryCategories: ['everyday'],
    keywords: ['bluegrace density calculator', 'bluegrace logistics freight', 'bluegrace pcf calculator', 'bluegrace freight class', '3pl freight density'],
    tags: ['BlueGrace', 'LTL', 'Freight', 'Logistics', '3PL'],
    icon: 'Package',
    status: 'published',
    featured: false,
    popular: false,
    addedDate: '2025-01-22',
    seo: {
      title: 'Bluegrace Density Calculator – BlueGrace Logistics Freight Class',
      metaDescription: 'Calculate freight density (PCF) and NMFC freight class according to BlueGrace Logistics shipping guidelines and 3PL carrier tariffs.',
      keywords: ['bluegrace density calculator', 'bluegrace logistics freight class', 'bluegrace pcf', 'bluegrace freight rating'],
    },
    relatedCalculators: ['freight-density-calculator', 'ltl-density-calculator', 'saia-density-calculator', 'xpo-density-calculator'],
    editorial: {
      whatIs: 'The Bluegrace Density Calculator computes freight density and freight class classifications aligned with BlueGrace Logistics transportation management standards. It helps shippers booking through BlueGrace identify accurate density tiers, prevent post-delivery re-weigh discrepancies, and avoid extreme density surcharges.',
      howToUse: [
        'Enter pallet length, width, and height in inches.',
        'Enter weight per unit in pounds.',
        'Enter shipment piece/pallet quantity.',
        'Check density, NMFC classification, and BlueGrace capacity surcharge threshold warnings.',
      ],
      formula: {
        title: 'BlueGrace Tariff Density Formulation',
        expression: '\\text{PCF} = \\frac{\\text{Weight (lbs)}}{\\left(\\frac{L \\times W \\times H}{1728}\\right) \\times Q}',
        explanation: 'BlueGrace utilizes standard NMFC density brackets to match freight with optimal carrier contract tariffs across its network.',
      },
      example: {
        scenario: 'Booking 4 pallets (48x40x54 inches) weighing 800 lbs each through BlueGrace Logistics.',
        steps: [
          'Volume per pallet: (48 × 40 × 54) / 1728 = 60.0 cu ft.',
          'Total Volume: 240.0 cu ft. Total Weight: 3,200 lbs.',
          'Density: 3,200 / 240 = 13.33 PCF.',
          'Classification: NMFC Class 85.',
        ],
        result: 'Rated at 13.33 PCF (Class 85), well within standard tier pricing.',
      },
      tips: [
        'Enter actual dimensional weight on the BlueGrace TMS portal to ensure your bill of lading matches carrier terminal dimensional scans.',
        'If shipping oversized machinery over 8 feet long, check for BlueGrace over-length accessorial surcharges.',
        'Stackable pallets can often save 20% to 35% on BlueGrace carrier quotes by reducing billed cubic footage.',
      ],
      faqs: [
        {
          question: 'What is BlueGrace Logistics?',
          answer: 'BlueGrace Logistics is a leading third-party logistics (3PL) provider and freight technology platform offering LTL, full truckload, and managed transportation services across North America.',
        },
        {
          question: 'How does BlueGrace handle carrier re-weigh charges?',
          answer: 'If carrier dimensions or scale weights differ from the bill of lading, the carrier submits an inspection certificate. Accurate upfront density calculations help shippers dispute erroneous billing adjustments.',
        },
        {
          question: 'Does BlueGrace offer density-based shipping rates?',
          answer: 'Yes. Many carrier contracts through BlueGrace utilize modern density-based tariffs that calculate pricing directly from PCF rather than traditional legacy NMFC commodity classifications.',
        },
        {
          question: 'What is an extreme density rule in 3PL shipping?',
          answer: 'When a shipment takes up substantial trailer space (e.g. >750 cu ft) with low weight (<6 PCF), carriers enforce extreme density rules that re-rate the load at a significantly higher minimum freight charge.',
        },
      ],
    },
  },
  {
    slug: 'saia-density-calculator',
    name: 'Saia Density Calculator',
    shortDescription: 'Calculate Saia LTL Freight density, cube utilization, and check Item 111-13 Cubic Capacity & Density (CCD) rule thresholds.',
    category: 'business',
    secondaryCategories: ['everyday'],
    keywords: ['saia density calculator', 'saia ltl freight', 'saia ccd rule', 'saia cubic capacity density', 'saia freight class'],
    tags: ['Saia', 'LTL', 'Freight', 'Logistics', 'Shipping'],
    icon: 'Truck',
    status: 'published',
    featured: false,
    popular: false,
    addedDate: '2025-01-22',
    seo: {
      title: 'Saia Density Calculator – Saia LTL Freight & CCD Rule Sizing',
      metaDescription: 'Calculate freight density (PCF) and check Saia LTL Item 111-13 Cubic Capacity & Density rule compliance. Prevent surprise freight re-classification fees.',
      keywords: ['saia density calculator', 'saia ltl freight class', 'saia ccd rule calculator', 'saia pcf calculator'],
    },
    relatedCalculators: ['freight-density-calculator', 'ltl-density-calculator', 'bluegrace-density-calculator', 'xpo-density-calculator'],
    editorial: {
      whatIs: 'The Saia Density Calculator evaluates shipments destined for Saia LTL Freight. In addition to calculating pounds per cubic foot (PCF) and NMFC class, it screens for Saia Item 111-13 Cubic Capacity and Density (CCD) rules, which penalize large, lightweight shipments that consume trailer capacity.',
      howToUse: [
        'Enter pallet dimensions (length, width, and height in inches).',
        'Enter pallet weight and shipment quantity.',
        'Review calculated PCF density, assigned NMFC class, and check if Saia CCD capacity surcharge rule is triggered.',
      ],
      formula: {
        title: 'Saia CCD Capacity Rule Threshold',
        expression: '\\text{CCD Triggered if: } \\text{Volume} \\ge 750 \\text{ cu ft} \\quad \\text{AND} \\quad \\text{PCF} < 6.0',
        explanation: 'Under Saia Rules Tariff Item 111-13, shipments meeting or exceeding 750 cubic feet with an average density below 6 lbs/cu ft are re-rated at a mandatory minimum class or artificial weight.',
      },
      example: {
        scenario: 'Shipping 12 lightweight pallets (48x40x60 inches) weighing 150 lbs each via Saia LTL.',
        steps: [
          'Volume per pallet: (48 × 40 × 60) / 1728 = 66.67 cu ft.',
          'Total Volume: 12 × 66.67 = 800.0 cu ft (> 750 cu ft threshold!).',
          'Total Weight: 12 × 150 = 1,800 lbs.',
          'Density: 1,800 / 800 = 2.25 PCF (< 6.0 PCF threshold!).',
        ],
        result: 'Shipment triggers Saia Item 111-13 CCD rule, subjecting the load to minimum capacity pricing adjustments.',
      },
      tips: [
        'To avoid Saia CCD penalties, consolidate boxes into shorter pallets under 50 inches or break large shipments into smaller two-bill dispatches.',
        'Saia uses static and mobile 3D dimensioners at cross-dock hubs; always measure pallet overhang to avoid automated dimensional penalties.',
        'Ensure shipping labels are placed on adjacent sides of every pallet for rapid automated barcode scanning.',
      ],
      faqs: [
        {
          question: 'What is the Saia CCD rule?',
          answer: 'The Cubic Capacity and Density (CCD) rule (Item 111-13 in Saia rules tariff) applies to shipments occupying 750+ cubic feet with a density under 6.0 PCF, establishing a minimum billing charge based on Class 150/175.',
        },
        {
          question: 'Does Saia round up fractional inches?',
          answer: 'Yes. Standard freight dimensional rules round fractions of an inch to the nearest whole inch (e.g. 48.5" rounds up to 49").',
        },
        {
          question: 'How does Saia measure non-stackable pallets?',
          answer: 'If a pallet cannot be safely double-stacked with other freight, Saia calculates the billing cube using the full height of the trailer interior (96 inches).',
        },
        {
          question: 'What is Saia standard trailer width?',
          answer: 'Saia 28ft pup and 53ft road trailers have an interior usable width of approximately 98 to 100 inches, comfortably fitting two 48-inch pallets side-by-side.',
        },
      ],
    },
  },
  {
    slug: 'xpo-density-calculator',
    name: 'XPO Density Calculator',
    shortDescription: 'Calculate XPO Logistics freight density, check Item 390 Capacity Load rules, and determine accurate LTL freight classes.',
    category: 'business',
    secondaryCategories: ['everyday'],
    keywords: ['xpo density calculator', 'xpo logistics freight', 'xpo ltl density', 'xpo item 390 calculator', 'xpo freight class'],
    tags: ['XPO', 'LTL', 'Freight', 'Logistics', 'Shipping'],
    icon: 'Truck',
    status: 'published',
    featured: false,
    popular: false,
    addedDate: '2025-01-22',
    seo: {
      title: 'XPO Density Calculator – XPO Logistics Freight Class & Item 390',
      metaDescription: 'Calculate XPO Logistics freight density (PCF), linear trailer feet, and verify Item 390 Capacity Load rule thresholds to avoid shipping fee adjustments.',
      keywords: ['xpo density calculator', 'xpo logistics freight class', 'xpo item 390', 'xpo pcf calculator'],
    },
    relatedCalculators: ['freight-density-calculator', 'ltl-density-calculator', 'bluegrace-density-calculator', 'saia-density-calculator'],
    editorial: {
      whatIs: 'The XPO Density Calculator evaluates LTL freight shipments moving across the XPO Logistics network. It determines exact PCF density and audits shipments against XPO Item 390 Capacity Load and linear foot rules to ensure accurate upfront freight quotes.',
      howToUse: [
        'Enter length, width, and height of your pallets or crates in inches.',
        'Enter weight per piece and total piece quantity.',
        'Review PCF density, NMFC freight class, and verify whether XPO Item 390 capacity load rules apply.',
      ],
      formula: {
        title: 'XPO Density & Capacity Assessment',
        expression: '\\text{PCF} = \\frac{\\text{Weight (lbs)}}{\\text{Cubic Feet}} \\quad ; \\quad \\text{Item 390 Trigger: } \\text{Linear Feet} \\ge 14 \\text{ or Volume} \\ge 750 \\text{ cu ft}',
        explanation: 'XPO applies special capacity rates when a single shipment consumes significant trailer capacity relative to its total billable weight.',
      },
      example: {
        scenario: 'Shipping 8 standard pallets (48x40x52 inches) weighing 650 lbs each with XPO Logistics.',
        steps: [
          'Volume per pallet: (48 × 40 × 52) / 1728 = 57.78 cu ft.',
          'Total Volume: 8 × 57.78 = 462.2 cu ft (< 750 cu ft limit).',
          'Total Weight: 8 × 650 = 5,200 lbs.',
          'Density: 5,200 / 462.2 = 11.25 PCF (NMFC Class 100).',
        ],
        result: 'Rated at 11.25 PCF (Class 100), passing all XPO capacity rules cleanly.',
      },
      tips: [
        'XPO operates advanced optical dimensioners across its primary cross-dock facilities; enter exact dimensions on your BOL to prevent automated adjustment invoices.',
        'Protect pallet corners with rigid V-board corner protectors to prevent edge damage from forklift tines and side netting.',
        'When booking shipments requiring more than 14 linear feet with XPO, explore XPO Volume Services for discounted partial truckload pricing.',
      ],
      faqs: [
        {
          question: 'What is XPO Item 390?',
          answer: 'XPO Item 390 is the Capacity Load rule governing shipments that occupy a substantial portion of a trailer (typically 750+ cubic feet or 14+ linear feet) with low density, establishing a minimum billing charge.',
        },
        {
          question: 'How does XPO calculate density for non-rectangular freight?',
          answer: 'XPO measures non-rectangular or cylindrical items based on the extreme outer dimensions of the imaginary rectangular prism that completely encloses the item.',
        },
        {
          question: 'What is XPO maximum pallet weight?',
          answer: 'Standard LTL freight typically limits single pallet weight to 2,500 to 4,000 lbs depending on forklift capacity at local delivery terminals; heavier items require specialized rigging.',
        },
        {
          question: 'How do I avoid freight re-classes with XPO?',
          answer: 'Measure from pallet edge to pallet edge (including overhanging boxes), weigh the shipment on certified scales after shrink-wrapping, and declare the exact density and NMFC item on the bill of lading.',
        },
      ],
    },
  },
];
