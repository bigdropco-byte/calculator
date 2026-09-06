'use client';

import React from 'react';
import { PercentageCalculatorWidget } from './PercentageCalculatorWidget';
import { PercentageIncreaseCalculatorWidget } from './PercentageIncreaseCalculatorWidget';
import { AverageCalculatorWidget } from './AverageCalculatorWidget';
import { AgeCalculatorWidget } from './AgeCalculatorWidget';
import { DateDifferenceCalculatorWidget } from './DateDifferenceCalculatorWidget';
import { BmiCalculatorWidget } from './BmiCalculatorWidget';
import { CompoundInterestCalculatorWidget } from './CompoundInterestCalculatorWidget';
import { LoanCalculatorWidget } from './LoanCalculatorWidget';
import { MortgageCalculatorWidget } from './MortgageCalculatorWidget';
import { TipCalculatorWidget } from './TipCalculatorWidget';

// 15 Numerology & Twin Flame Widgets
import { LifePathCalculatorWidget } from './LifePathCalculatorWidget';
import { SunNumberCalculatorWidget } from './SunNumberCalculatorWidget';
import { AttitudeNumberCalculatorWidget } from './AttitudeNumberCalculatorWidget';
import { ExpressionNumberCalculatorWidget } from './ExpressionNumberCalculatorWidget';
import { SoulUrgeCalculatorWidget } from './SoulUrgeCalculatorWidget';
import { PersonalityNumberCalculatorWidget } from './PersonalityNumberCalculatorWidget';
import { BalanceNumberCalculatorWidget } from './BalanceNumberCalculatorWidget';
import { MaturityNumberCalculatorWidget } from './MaturityNumberCalculatorWidget';
import { LuckyColourCalculatorWidget } from './LuckyColourCalculatorWidget';
import { CareerCalculatorWidget } from './CareerCalculatorWidget';
import { TwinFlameCalculatorWidget } from './TwinFlameCalculatorWidget';
import { TwinFlameLifePathWidget } from './TwinFlameLifePathWidget';
import { TwinFlameNumerologyWidget } from './TwinFlameNumerologyWidget';
import { TwinFlameLoveWidget } from './TwinFlameLoveWidget';
import { TwinFlameBirthChartWidget } from './TwinFlameBirthChartWidget';

// 33 New Payroll, Tax, Investment & Travel Widgets
import {
  CaliforniaPaycheckWidget,
  TexasPaycheckWidget,
  FloridaPaycheckWidget,
  NewYorkCityPaycheckWidget,
  NewJerseyPaycheckWidget,
  IllinoisPaycheckWidget,
  ChicagoPaycheckWidget,
  PennsylvaniaPaycheckWidget,
  OhioPaycheckWidget,
  GeorgiaPaycheckWidget,
  ColoradoPaycheckWidget,
  IndianaPaycheckWidget,
  NorthCarolinaPaycheckWidget,
  MichiganHourlyPaycheckWidget,
} from './StatePaycheckWidgets';
import { PaycheckCalculatorWidget } from './PaycheckCalculatorWidget';
import { PaycheckTaxCalculatorWidget } from './PaycheckTaxCalculatorWidget';
import { UsSalaryTaxCalculatorWidget } from './UsSalaryTaxCalculatorWidget';
import { HourlyPaycheckWidget } from './HourlyPaycheckWidget';
import { DailyPaycheckWidget } from './DailyPaycheckWidget';
import { WeeklyPaycheckWidget } from './WeeklyPaycheckWidget';
import { MonthlyPaycheckWidget } from './MonthlyPaycheckWidget';
import { YearlyPaycheckWidget } from './YearlyPaycheckWidget';
import { OvertimeCalculatorWidget } from './OvertimeCalculatorWidget';
import { PayRaiseCalculatorWidget } from './PayRaiseCalculatorWidget';
import { EicCalculatorWidget } from './EicCalculatorWidget';

import { StockCalculatorWidget } from './StockCalculatorWidget';
import { RoiCalculatorWidget } from './RoiCalculatorWidget';
import { FixedDepositCalculatorWidget } from './FixedDepositCalculatorWidget';
import { SipCalculatorWidget } from './SipCalculatorWidget';
import { StpCalculatorWidget } from './StpCalculatorWidget';
import { XrpProfitCalculatorWidget } from './XrpProfitCalculatorWidget';
import { LtpCalculatorWidget } from './LtpCalculatorWidget';

import { TripBudgetCalculatorWidget } from './TripBudgetCalculatorWidget';

// Marine Propeller Widgets
import { MarinePropellerWidget } from './MarinePropellerWidget';

// Thrust Widgets
import {
  ThrustToWeightWidget,
  DroneThrustWidget,
  RocketThrustWidget,
  GeneralThrustWidget,
} from './ThrustWidgets';

// Structural, Civil & Fitness Thrust Widgets
import {
  PipeThrustWidget,
  RafterThrustWidget,
  HipThrustWidget,
} from './StructuralThrustWidgets';

// Physics, Tech & Medical Density Widgets
import {
  GeneralDensityWidget,
  CubeDensityWidget,
  WaterDensityWidget,
  AirDensityWidget,
  PixelDensityWidget,
  PopulationDensityWidget,
  PsaDensityWidget,
} from './DensityPhysicsWidgets';

// Freight & Logistics Density Widgets
import { FreightDensityWidget } from './FreightDensityWidgets';

// Date & Time Widgets (14)
import {
  DateCalculatorWidget,
  TimeCalculatorWidget,
  DateTimeCalculatorWidget,
  TimeAdditionSubtractionCalculatorWidget,
  HoursCalculatorWidget,
  DaysCalculatorWidget,
  WeeksCalculatorWidget,
  MonthsCalculatorWidget,
  YearsCalculatorWidget,
  DayOfTheWeekCalculatorWidget,
  SecondsToTimeCalculatorWidget,
  AverageTimeCalculatorWidget,
  LeapYearCalculatorWidget,
  MilitaryTimeConverterWidget,
} from './DateTimeWidgets';

// Time Card, Payroll, Hotel & Lead Time Widgets (4)
import {
  TimeCardCalculatorWidget,
  PayrollHoursCalculatorWidget,
  HotelDaysCalculatorWidget,
  LeadTimeCalculatorWidget,
} from './TimeCardWidgets';

// Tech & Work Time Widgets (6)
import {
  DownloadTimeCalculatorWidget,
  DiscordEpochTimeCalculatorWidget,
  EpochTimeConverterWidget,
  UnixEpochTimeCalculatorWidget,
  AudiobookSpeedCalculatorWidget,
  WordsToMinutesCalculatorWidget,
} from './TechTimeWidgets';

// Birthday & Milestone Widgets (9)
import {
  BirthdayCalculatorWidget,
  WeeksAgoCalculatorWidget,
  BirthYearCalculatorWidget,
  HalfBirthdayCalculatorWidget,
  GoldenBirthdayCalculatorWidget,
  SilverBirthdayCalculatorWidget,
  DiamondBirthdayCalculatorWidget,
  SleepCalculatorWidget,
  AnniversaryCalculatorWidget,
} from './BirthdayMilestoneWidgets';

// Esoteric Birthday Widgets (5)
import {
  RomanNumeralDateWidget,
  MoonPhaseBirthdayWidget,
  HebrewBirthdayWidget,
  SoulmateBirthdayWidget,
  TwinFlameBirthdayWidget,
} from './EsotericBirthdayWidgets';

// Swim Time Widget (1)
import { SwimTimeConverterWidget } from './SwimTimeWidget';

// 13 Percentage, Tax, VAT, Sports & Fitness Widgets
import {
  DiscountPercentageWidget,
  WinPercentageWidget,
  YearlyPercentageIncreaseWidget,
  PercentageDecreaseWidget,
  PartTimePercentageWidget,
  TimePercentageWidget,
  PercentageOfTimeWidget,
  ReversePercentageWidget,
  GrowthPercentageWidget,
  TaxPercentageWidget,
  VatPercentageWidget,
  SluggingPercentageWidget,
  FatPercentageWidget,
} from './PercentageSuiteWidgets';

// 29 Masonry, Concrete, Wood, Lumber & Pocket Calculator Widgets
import {
  ConcreteCalculatorWidget,
  ConcreteSlabWidget,
  ConcreteBlockWidget,
  SakreteCalculatorWidget,
  QuikreteCalculatorWidget,
  GravelStoneCalculatorWidget,
  AsphaltCalculatorWidget,
  MaterialCalculatorWidget,
} from './MasonryConcreteWidgets';
import {
  WoodCalculatorWidget,
  FramingWoodWidget,
  TrestleWoodWidget,
  WeightOfWoodWidget,
  DeckWoodWidget,
  CordWoodWidget,
  CabinetWoodWidget,
  FirewoodCordWidget,
  LooseCordWoodWidget,
  ShedWoodWidget,
  FenceWoodWidget,
  FirewoodCalculatorWidget,
} from './WoodLumberWidgets';
import { StandardCalculatorWidget } from './StandardCalculatorWidget';

// 27 STEM, Fitness, Military, Character Counter & Packaging Widgets
import {
  SpherePackingWidget,
  CubeRootWidget,
  BestScientificCalculatorWidget,
  EquationSolverWidget,
  PartialFractionWidget,
  GradeCalculatorWidget,
  StudentTWidget,
  ChiSquareWidget,
  HeatIndexWidget,
  InchCmWidget,
  IpSubnetWidget,
  BinPackingWidget,
} from './StemMathWidgets';

import {
  WilksWidget,
  ApftWidget,
  AcftWidget,
  BenchPressWidget,
} from './FitnessMilitaryWidgets';

import {
  WordCounterWidget,
  KoreanCharacterWidget,
  JapaneseCharacterWidget,
  TwitterCharacterWidget,
  ChineseCharacterWidget,
  ShippingBoxSizeWidget,
  BoxPackingWidget,
  MovingPackingWidget,
  AsqWidget,
  AgeDifferenceWidget,
  VideoSpeedWidget,
} from './TextAndPackagingWidgets';

// 12 Probability Suite Widgets
import {
  ProbabilityWidget,
  PermutationsCombinationsWidget,
  BinomialWidget,
  DiceProbabilityWidget,
  CoinFlipWidget,
  BayesTheoremWidget,
  NormalDistributionWidget,
  PoissonWidget,
  OddsProbabilityWidget,
  HypergeometricWidget,
  PokerOddsWidget,
  LotteryOddsWidget,
} from './ProbabilityWidgets';

// 2D Geometry Widgets (12)
import {
  CircleCalculatorWidget,
  TriangleCalculatorWidget,
  RightTriangleWidget,
  SquareCalculatorWidget,
  RectangleCalculatorWidget,
  RhombusCalculatorWidget,
  ParallelogramCalculatorWidget,
  TrapeziumCalculatorWidget,
  PentagonCalculatorWidget,
  HexagonCalculatorWidget,
  PolygonCalculatorWidget,
  PythagoreanTheoremWidget,
} from './Geometry2DWidgets';

// 3D Geometry Widgets (7)
import {
  CubeCalculatorWidget,
  CuboidCalculatorWidget,
  CylinderCalculatorWidget,
  ConeCalculatorWidget,
  SphereCalculatorWidget,
  PrismCalculatorWidget,
  PyramidCalculatorWidget,
} from './Geometry3DWidgets';

// Algebra, Powers, Trig & Logarithm Widgets (17)
import {
  LinearEquationWidget,
  QuadraticEquationWidget,
  SystemOfEquationsWidget,
  ArithmeticMeanWidget,
  WeightedAverageWidget,
  SquarePowerWidget,
  CubePowerWidget,
  NthPowerWidget,
  SquareRootWidget,
  NthRootWidget,
  SineCalculatorWidget,
  CosineCalculatorWidget,
  TangentCalculatorWidget,
  CotangentCalculatorWidget,
  LogarithmCalculatorWidget,
  NaturalLogarithmWidget,
  CommonLogarithmWidget,
} from './AlgebraPowersTrigWidgets';

interface CalculatorRendererProps {
  slug: string;
}

export const CalculatorRenderer: React.FC<CalculatorRendererProps> = ({ slug }) => {
  switch (slug) {
    // Initial 10
    case 'percentage-calculator':
      return <PercentageCalculatorWidget />;
    case 'percentage-increase-calculator':
      return <PercentageIncreaseCalculatorWidget />;
    case 'average-calculator':
      return <AverageCalculatorWidget />;
    case 'age-calculator':
      return <AgeCalculatorWidget />;
    case 'date-difference-calculator':
      return <DateDifferenceCalculatorWidget />;
    case 'bmi-calculator':
      return <BmiCalculatorWidget />;
    case 'compound-interest-calculator':
      return <CompoundInterestCalculatorWidget />;
    case 'loan-calculator':
      return <LoanCalculatorWidget />;
    case 'mortgage-calculator':
      return <MortgageCalculatorWidget />;
    case 'tip-calculator':
      return <TipCalculatorWidget />;

    // 15 Numerology & Twin Flame
    case 'life-path-number-calculator':
      return <LifePathCalculatorWidget />;
    case 'sun-number-calculator':
      return <SunNumberCalculatorWidget />;
    case 'attitude-number-calculator':
      return <AttitudeNumberCalculatorWidget />;
    case 'expression-number-calculator':
      return <ExpressionNumberCalculatorWidget />;
    case 'soul-urge-number-calculator':
      return <SoulUrgeCalculatorWidget />;
    case 'personality-number-calculator':
      return <PersonalityNumberCalculatorWidget />;
    case 'balance-number-calculator':
      return <BalanceNumberCalculatorWidget />;
    case 'maturity-number-calculator':
      return <MaturityNumberCalculatorWidget />;
    case 'lucky-colour-calculator':
      return <LuckyColourCalculatorWidget />;
    case 'career-calculator':
      return <CareerCalculatorWidget />;
    case 'twin-flame-calculator':
      return <TwinFlameCalculatorWidget />;
    case 'twin-flame-life-path-number-calculator':
      return <TwinFlameLifePathWidget />;
    case 'twin-flame-numerology-calculator':
      return <TwinFlameNumerologyWidget />;
    case 'twin-flame-love-calculator':
      return <TwinFlameLoveWidget />;
    case 'twin-flame-birth-chart-calculator':
      return <TwinFlameBirthChartWidget />;

    // 14 State & City Paycheck
    case 'california-paycheck-calculator':
      return <CaliforniaPaycheckWidget />;
    case 'texas-paycheck-calculator':
      return <TexasPaycheckWidget />;
    case 'florida-paycheck-calculator':
      return <FloridaPaycheckWidget />;
    case 'new-york-city-paycheck-calculator':
      return <NewYorkCityPaycheckWidget />;
    case 'new-jersey-paycheck-calculator':
      return <NewJerseyPaycheckWidget />;
    case 'illinois-paycheck-calculator':
      return <IllinoisPaycheckWidget />;
    case 'chicago-paycheck-calculator':
      return <ChicagoPaycheckWidget />;
    case 'pennsylvania-paycheck-tax-calculator':
      return <PennsylvaniaPaycheckWidget />;
    case 'ohio-paycheck-tax-calculator':
      return <OhioPaycheckWidget />;
    case 'georgia-paycheck-calculator':
      return <GeorgiaPaycheckWidget />;
    case 'colorado-paycheck-calculator':
      return <ColoradoPaycheckWidget />;
    case 'indiana-paycheck-calculator':
      return <IndianaPaycheckWidget />;
    case 'north-carolina-paycheck-calculator':
      return <NorthCarolinaPaycheckWidget />;
    case 'michigan-hourly-paycheck-calculator':
      return <MichiganHourlyPaycheckWidget />;

    // Wage Frequencies & Tax
    case 'paycheck-calculator':
      return <PaycheckCalculatorWidget />;
    case 'paycheck-tax-calculator':
      return <PaycheckTaxCalculatorWidget />;
    case 'us-salary-tax-calculator':
      return <UsSalaryTaxCalculatorWidget />;
    case 'hourly-paycheck-calculator':
      return <HourlyPaycheckWidget />;
    case 'daily-paycheck-calculator':
      return <DailyPaycheckWidget />;
    case 'weekly-paycheck-calculator':
      return <WeeklyPaycheckWidget />;
    case 'monthly-paycheck-calculator':
      return <MonthlyPaycheckWidget />;
    case 'yearly-paycheck-calculator':
      return <YearlyPaycheckWidget />;
    case 'overtime-calculator':
      return <OvertimeCalculatorWidget />;
    case 'pay-raise-calculator':
      return <PayRaiseCalculatorWidget />;
    case 'eic-calculator':
      return <EicCalculatorWidget />;

    // Investments & Wealth
    case 'stock-calculator':
      return <StockCalculatorWidget />;
    case 'roi-calculator':
      return <RoiCalculatorWidget />;
    case 'fixed-deposit-calculator':
      return <FixedDepositCalculatorWidget />;
    case 'sip-calculator':
      return <SipCalculatorWidget />;
    case 'stp-calculator':
      return <StpCalculatorWidget />;
    case 'xrp-profit-calculator':
      return <XrpProfitCalculatorWidget />;
    case 'ltp-calculator':
      return <LtpCalculatorWidget />;

    // Travel
    case 'trip-budget-calculator':
      return <TripBudgetCalculatorWidget />;

    // Marine Propellers
    case 'suzuki-prop-calculator':
      return <MarinePropellerWidget brand="suzuki" title="Suzuki Prop Calculator" />;
    case 'sailboat-propeller-calculator':
      return <MarinePropellerWidget brand="sailboat" title="Sailboat Propeller Calculator" />;
    case 'propeller-calculator':
      return <MarinePropellerWidget brand="general" title="Propeller Calculator" />;
    case 'mercury-propeller-calculator':
      return <MarinePropellerWidget brand="mercury" title="Mercury Propeller Calculator" />;
    case 'michigan-wheel-prop-calculator':
      return <MarinePropellerWidget brand="michigan-wheel" title="Michigan Wheel Prop Calculator" />;
    case 'acme-prop-calculator':
      return <MarinePropellerWidget brand="acme" title="Acme Prop Calculator" />;

    // Aero, Drone, Rocket & Propulsion Thrust
    case 'thrust-to-weight-ratio-calculator':
      return <ThrustToWeightWidget />;
    case 'thrust-calculator':
      return <GeneralThrustWidget type="general" title="Thrust Calculator" />;
    case 'propeller-thrust-calculator':
      return <GeneralThrustWidget type="propeller" title="Propeller Thrust Calculator" />;
    case 'rocket-thrust-calculator':
      return <RocketThrustWidget />;
    case 'drone-thrust-calculator':
      return <DroneThrustWidget />;
    case 'static-thrust-calculator':
      return <GeneralThrustWidget type="static" title="Static Thrust Calculator" />;
    case 'motor-thrust-calculator':
      return <GeneralThrustWidget type="motor" title="Motor Thrust Calculator" />;
    case 'fan-thrust-calculator':
      return <GeneralThrustWidget type="fan" title="Fan Thrust Calculator" />;
    case 'rc-thrust-calculator':
      return <GeneralThrustWidget type="rc" title="RC Thrust Calculator" />;
    case 'rpm-to-thrust-calculator':
      return <GeneralThrustWidget type="rpm" title="RPM to Thrust Calculator" />;
    case 'jet-engine-thrust-calculator':
      return <GeneralThrustWidget type="jet" title="Jet Engine Thrust Calculator" />;

    // Structural, Civil & Fitness Thrust
    case 'pipe-thrust-calculator':
      return <PipeThrustWidget />;
    case 'rafter-thrust-calculator':
      return <RafterThrustWidget />;
    case 'hip-thrust-calculator':
      return <HipThrustWidget />;

    // Physics, Tech, Demographics & Medical Density
    case 'density-calculator':
      return <GeneralDensityWidget />;
    case 'cube-density-calculator':
      return <CubeDensityWidget />;
    case 'water-density-calculator':
      return <WaterDensityWidget />;
    case 'air-density-calculator':
      return <AirDensityWidget />;
    case 'pixel-density-calculator':
      return <PixelDensityWidget />;
    case 'population-density-calculator':
      return <PopulationDensityWidget />;
    case 'psa-density-calculator':
      return <PsaDensityWidget />;

    // Logistics & Freight Density
    case 'freight-density-calculator':
      return <FreightDensityWidget carrier="generic" title="Freight Density Calculator" />;
    case 'ltl-density-calculator':
      return <FreightDensityWidget carrier="generic" title="LTL Density Calculator" />;
    case 'bluegrace-density-calculator':
      return <FreightDensityWidget carrier="bluegrace" title="BlueGrace Density Calculator" />;
    case 'saia-density-calculator':
      return <FreightDensityWidget carrier="saia" title="Saia Density Calculator" />;
    case 'xpo-density-calculator':
      return <FreightDensityWidget carrier="xpo" title="XPO Density Calculator" />;

    // Date & Time Calculators (14)
    case 'date-calculator':
      return <DateCalculatorWidget />;
    case 'time-calculator':
      return <TimeCalculatorWidget />;
    case 'date-time-calculator':
      return <DateTimeCalculatorWidget />;
    case 'time-addition-subtraction-calculator':
      return <TimeAdditionSubtractionCalculatorWidget />;
    case 'hours-calculator':
      return <HoursCalculatorWidget />;
    case 'days-calculator':
      return <DaysCalculatorWidget />;
    case 'weeks-calculator':
      return <WeeksCalculatorWidget />;
    case 'months-calculator':
      return <MonthsCalculatorWidget />;
    case 'years-calculator':
      return <YearsCalculatorWidget />;
    case 'day-of-the-week-calculator':
      return <DayOfTheWeekCalculatorWidget />;
    case 'seconds-to-time-calculator':
      return <SecondsToTimeCalculatorWidget />;
    case 'average-time-calculator':
      return <AverageTimeCalculatorWidget />;
    case 'leap-year-calculator':
      return <LeapYearCalculatorWidget />;
    case 'military-time-converter':
      return <MilitaryTimeConverterWidget />;

    // Time Card, Payroll, Hotel & Lead Time Calculators (4)
    case 'time-card-calculator':
      return <TimeCardCalculatorWidget />;
    case 'payroll-hours-calculator':
      return <PayrollHoursCalculatorWidget />;
    case 'hotel-days-calculator':
      return <HotelDaysCalculatorWidget />;
    case 'lead-time-calculator':
      return <LeadTimeCalculatorWidget />;

    // Tech & Work Time Calculators (6)
    case 'download-time-calculator':
      return <DownloadTimeCalculatorWidget />;
    case 'discord-epoch-time-calculator':
      return <DiscordEpochTimeCalculatorWidget />;
    case 'epoch-time-converter':
      return <EpochTimeConverterWidget />;
    case 'unix-epoch-time-calculator':
      return <UnixEpochTimeCalculatorWidget />;
    case 'audiobook-speed-calculator':
      return <AudiobookSpeedCalculatorWidget />;
    case 'words-to-minutes-calculator':
      return <WordsToMinutesCalculatorWidget />;

    // Birthday & Milestone Calculators (9)
    case 'birthday-calculator':
      return <BirthdayCalculatorWidget />;
    case 'weeks-ago-calculator':
      return <WeeksAgoCalculatorWidget />;
    case 'birth-year-calculator':
      return <BirthYearCalculatorWidget />;
    case 'half-birthday':
      return <HalfBirthdayCalculatorWidget />;
    case 'golden-birthday':
      return <GoldenBirthdayCalculatorWidget />;
    case 'silver-birthday':
      return <SilverBirthdayCalculatorWidget />;
    case 'diamond-birthday':
      return <DiamondBirthdayCalculatorWidget />;
    case 'sleep-calculator':
      return <SleepCalculatorWidget />;
    case 'anniversary-calculator':
      return <AnniversaryCalculatorWidget />;

    // Esoteric & Spiritual Birthday Calculators (5)
    case 'roman-numeral-date':
      return <RomanNumeralDateWidget />;
    case 'moon-phase-birthday':
      return <MoonPhaseBirthdayWidget />;
    case 'hebrew-birthday':
      return <HebrewBirthdayWidget />;
    case 'soulmate-birthday':
      return <SoulmateBirthdayWidget />;
    case 'twin-flame-birthday':
      return <TwinFlameBirthdayWidget />;

    // Swim Time Converter (1)
    case 'swim-time-converter':
      return <SwimTimeConverterWidget />;

    // 13 Percentage, Tax, VAT, Sports & Fitness Calculators
    case 'discount-percentage-calculator':
      return <DiscountPercentageWidget />;
    case 'win-percentage-calculator':
      return <WinPercentageWidget />;
    case 'yearly-percentage-increase-calculator':
      return <YearlyPercentageIncreaseWidget />;
    case 'percentage-decrease-calculator':
      return <PercentageDecreaseWidget />;
    case 'part-time-percentage-calculator':
      return <PartTimePercentageWidget />;
    case 'time-percentage-calculator':
      return <TimePercentageWidget />;
    case 'percentage-of-time-calculator':
      return <PercentageOfTimeWidget />;
    case 'reverse-percentage-calculator':
      return <ReversePercentageWidget />;
    case 'growth-percentage-calculator':
      return <GrowthPercentageWidget />;
    case 'tax-percentage-calculator':
      return <TaxPercentageWidget />;
    case 'vat-percentage-calculator':
      return <VatPercentageWidget />;
    case 'slugging-percentage-calculator':
      return <SluggingPercentageWidget />;
    case 'fat-percentage-calculator':
      return <FatPercentageWidget />;

    // 29 Concrete, Masonry, Wood & Pocket Calculator Tools
    case 'calculator':
      return <StandardCalculatorWidget />;
    case 'concrete-calculator':
      return <ConcreteCalculatorWidget />;
    case 'concrete-slab':
      return <ConcreteSlabWidget />;
    case 'concrete-block':
      return <ConcreteBlockWidget />;
    case 'sakrete-calculator':
      return <SakreteCalculatorWidget />;
    case 'quikrete-calculator':
      return <QuikreteCalculatorWidget title="Quikrete Calculator" />;
    case 'quikrete-concrete':
      return <QuikreteCalculatorWidget title="Quikrete Concrete Calculator" />;
    case 'gravel-calculator':
      return <GravelStoneCalculatorWidget title="Gravel Calculator" defaultType="pea_gravel" />;
    case 'stone-calculator':
      return <GravelStoneCalculatorWidget title="Stone Calculator" defaultType="crushed_stone" />;
    case 'asphalt-calculator':
      return <AsphaltCalculatorWidget type="standard_hma" title="Asphalt Calculator" />;
    case 'american-asphalt':
      return <AsphaltCalculatorWidget type="american" title="American Asphalt Calculator" />;
    case 'crushed-asphalt':
      return <AsphaltCalculatorWidget type="crushed_rap" title="Crushed Asphalt Calculator" />;
    case 'vulcan-asphalt':
      return <AsphaltCalculatorWidget type="vulcan" title="Vulcan Asphalt Calculator" />;
    case 'hot-mix-asphalt':
      return <AsphaltCalculatorWidget type="standard_hma" title="Hot Mix Asphalt Calculator" />;
    case 'recycled-asphalt':
      return <AsphaltCalculatorWidget type="recycled" title="Recycled Asphalt Calculator" />;
    case 'material-calculator':
      return <MaterialCalculatorWidget />;
    case 'wood-calculator':
      return <WoodCalculatorWidget />;
    case 'framing-wood':
      return <FramingWoodWidget />;
    case 'trestle-wood':
      return <TrestleWoodWidget />;
    case 'weight-of-wood':
      return <WeightOfWoodWidget />;
    case 'deck-wood':
      return <DeckWoodWidget />;
    case 'cord-wood':
      return <CordWoodWidget title="Cord Wood Calculator" />;
    case 'cord-of-wood':
      return <CordWoodWidget title="Cord of Wood Calculator" />;
    case 'cabinet-wood':
      return <CabinetWoodWidget />;
    case 'firewood-cord':
      return <FirewoodCordWidget />;
    case 'loose-cord-wood':
      return <LooseCordWoodWidget />;
    case 'shed-wood':
      return <ShedWoodWidget />;
    case 'fence-wood':
      return <FenceWoodWidget />;
    case 'firewood-calculator':
      return <FirewoodCalculatorWidget />;

    // 27 STEM, Fitness, Military, Character Counter & Packaging Tools
    case 'sphere-packing-calculator':
      return <SpherePackingWidget />;
    case 'asq-calculator':
      return <AsqWidget />;
    case 'grade-calculator':
      return <GradeCalculatorWidget />;
    case 'student-t-value-calculator':
      return <StudentTWidget />;
    case 'wilks-calculator':
      return <WilksWidget />;
    case 'apft-calculator':
      return <ApftWidget />;
    case 'acft-calculator':
      return <AcftWidget />;
    case 'shipping-box-size-calculator':
      return <ShippingBoxSizeWidget />;
    case 'heat-index-calculator':
      return <HeatIndexWidget />;
    case 'inch-to-cm-converter':
      return <InchCmWidget />;
    case 'chi-square-calculator':
      return <ChiSquareWidget />;
    case 'word-counter':
      return <WordCounterWidget />;
    case 'packing-calculator':
      return <MovingPackingWidget />;
    case 'cube-root-calculator':
      return <CubeRootWidget />;
    case 'best-scientific-calculator':
      return <BestScientificCalculatorWidget />;
    case 'box-packing-calculator':
      return <BoxPackingWidget />;
    case 'korean-character-counter':
      return <KoreanCharacterWidget />;
    case 'japanese-character-counter':
      return <JapaneseCharacterWidget />;
    case 'twitter-character-counter':
      return <TwitterCharacterWidget />;
    case 'chinese-character-counter':
      return <ChineseCharacterWidget />;
    case 'solver':
      return <EquationSolverWidget />;
    case 'partial-fraction-decomposition-calculator':
      return <PartialFractionWidget />;
    case 'bench-press-calculator':
      return <BenchPressWidget />;
    case 'age-difference-calculator':
      return <AgeDifferenceWidget />;
    case 'video-speed-calculator':
      return <VideoSpeedWidget />;
    case 'bin-packing-calculator':
      return <BinPackingWidget />;
    case 'ip-subnet-calculator':
      return <IpSubnetWidget />;

    // 12 Probability Suite Tools
    case 'probability-calculator':
      return <ProbabilityWidget />;
    case 'permutations-and-combinations-calculator':
      return <PermutationsCombinationsWidget />;
    case 'binomial-probability-calculator':
      return <BinomialWidget />;
    case 'dice-probability-calculator':
      return <DiceProbabilityWidget />;
    case 'coin-flip-probability-calculator':
      return <CoinFlipWidget />;
    case 'bayes-theorem-calculator':
      return <BayesTheoremWidget />;
    case 'normal-distribution-calculator':
      return <NormalDistributionWidget />;
    case 'poisson-probability-calculator':
      return <PoissonWidget />;
    case 'odds-probability-calculator':
      return <OddsProbabilityWidget />;
    case 'hypergeometric-calculator':
      return <HypergeometricWidget />;
    case 'poker-odds-calculator':
      return <PokerOddsWidget />;
    case 'lottery-odds-calculator':
      return <LotteryOddsWidget />;

    // 36 Math Suite Calculators
    // Equations
    case 'linear-equation-calculator':
      return <LinearEquationWidget />;
    case 'quadratic-equation-calculator':
      return <QuadraticEquationWidget />;
    case 'system-of-linear-equations-calculator':
      return <SystemOfEquationsWidget />;

    // 2D Geometry (Area & Perimeter)
    case 'circle-calculator':
      return <CircleCalculatorWidget />;
    case 'triangle-calculator':
      return <TriangleCalculatorWidget />;
    case 'right-triangle-calculator':
      return <RightTriangleWidget />;
    case 'square-calculator':
      return <SquareCalculatorWidget />;
    case 'rectangle-calculator':
      return <RectangleCalculatorWidget />;
    case 'rhombus-calculator':
      return <RhombusCalculatorWidget />;
    case 'parallelogram-calculator':
      return <ParallelogramCalculatorWidget />;
    case 'trapezium-calculator':
      return <TrapeziumCalculatorWidget />;
    case 'pentagon-calculator':
      return <PentagonCalculatorWidget />;
    case 'hexagon-calculator':
      return <HexagonCalculatorWidget />;
    case 'polygon-calculator':
      return <PolygonCalculatorWidget />;
    case 'pythagorean-theorem-calculator':
      return <PythagoreanTheoremWidget />;

    // 3D Geometry (Volume & Surface Area)
    case 'cube-calculator':
      return <CubeCalculatorWidget />;
    case 'cuboid-calculator':
      return <CuboidCalculatorWidget />;
    case 'cylinder-calculator':
      return <CylinderCalculatorWidget />;
    case 'cone-calculator':
      return <ConeCalculatorWidget />;
    case 'sphere-calculator':
      return <SphereCalculatorWidget />;
    case 'prism-calculator':
      return <PrismCalculatorWidget />;
    case 'pyramid-calculator':
      return <PyramidCalculatorWidget />;

    // Average
    case 'arithmetic-mean-calculator':
      return <ArithmeticMeanWidget />;
    case 'weighted-average-calculator':
      return <WeightedAverageWidget />;

    // Powers & Roots
    case 'square-power-calculator':
      return <SquarePowerWidget />;
    case 'cube-power-calculator':
      return <CubePowerWidget />;
    case 'nth-power-calculator':
      return <NthPowerWidget />;
    case 'square-root-calculator':
      return <SquareRootWidget />;
    case 'nth-root-calculator':
      return <NthRootWidget />;

    // Trigonometric Functions
    case 'sine-calculator':
      return <SineCalculatorWidget />;
    case 'cosine-calculator':
      return <CosineCalculatorWidget />;
    case 'tangent-calculator':
      return <TangentCalculatorWidget />;
    case 'cotangent-calculator':
      return <CotangentCalculatorWidget />;

    // Logarithms
    case 'logarithm-calculator':
      return <LogarithmCalculatorWidget />;
    case 'natural-logarithm-calculator':
      return <NaturalLogarithmWidget />;
    case 'common-logarithm-calculator':
      return <CommonLogarithmWidget />;

    default:
      return (
        <div className="p-8 bg-white border border-slate-200 rounded-xl text-center">
          <p className="text-base font-semibold text-slate-800">Calculator module is loading</p>
        </div>
      );
  }
};
