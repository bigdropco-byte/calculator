'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// ---------------------------------------------------------------------------
// Lazy-loaded calculator widgets via next/dynamic for per-page code splitting.
// Each widget is only downloaded when its calculator page is visited.
// ---------------------------------------------------------------------------

// Initial 10
const PercentageCalculatorWidget = dynamic(() => import('./PercentageCalculatorWidget').then(m => ({ default: m.PercentageCalculatorWidget })));
const PercentageIncreaseCalculatorWidget = dynamic(() => import('./PercentageIncreaseCalculatorWidget').then(m => ({ default: m.PercentageIncreaseCalculatorWidget })));
const AverageCalculatorWidget = dynamic(() => import('./AverageCalculatorWidget').then(m => ({ default: m.AverageCalculatorWidget })));
const AgeCalculatorWidget = dynamic(() => import('./AgeCalculatorWidget').then(m => ({ default: m.AgeCalculatorWidget })));
const DateDifferenceCalculatorWidget = dynamic(() => import('./DateDifferenceCalculatorWidget').then(m => ({ default: m.DateDifferenceCalculatorWidget })));
const BmiCalculatorWidget = dynamic(() => import('./BmiCalculatorWidget').then(m => ({ default: m.BmiCalculatorWidget })));
const CompoundInterestCalculatorWidget = dynamic(() => import('./CompoundInterestCalculatorWidget').then(m => ({ default: m.CompoundInterestCalculatorWidget })));
const LoanCalculatorWidget = dynamic(() => import('./LoanCalculatorWidget').then(m => ({ default: m.LoanCalculatorWidget })));
const MortgageCalculatorWidget = dynamic(() => import('./MortgageCalculatorWidget').then(m => ({ default: m.MortgageCalculatorWidget })));
const TipCalculatorWidget = dynamic(() => import('./TipCalculatorWidget').then(m => ({ default: m.TipCalculatorWidget })));

// 15 Numerology & Twin Flame Widgets
const LifePathCalculatorWidget = dynamic(() => import('./LifePathCalculatorWidget').then(m => ({ default: m.LifePathCalculatorWidget })));
const SunNumberCalculatorWidget = dynamic(() => import('./SunNumberCalculatorWidget').then(m => ({ default: m.SunNumberCalculatorWidget })));
const AttitudeNumberCalculatorWidget = dynamic(() => import('./AttitudeNumberCalculatorWidget').then(m => ({ default: m.AttitudeNumberCalculatorWidget })));
const ExpressionNumberCalculatorWidget = dynamic(() => import('./ExpressionNumberCalculatorWidget').then(m => ({ default: m.ExpressionNumberCalculatorWidget })));
const SoulUrgeCalculatorWidget = dynamic(() => import('./SoulUrgeCalculatorWidget').then(m => ({ default: m.SoulUrgeCalculatorWidget })));
const PersonalityNumberCalculatorWidget = dynamic(() => import('./PersonalityNumberCalculatorWidget').then(m => ({ default: m.PersonalityNumberCalculatorWidget })));
const BalanceNumberCalculatorWidget = dynamic(() => import('./BalanceNumberCalculatorWidget').then(m => ({ default: m.BalanceNumberCalculatorWidget })));
const MaturityNumberCalculatorWidget = dynamic(() => import('./MaturityNumberCalculatorWidget').then(m => ({ default: m.MaturityNumberCalculatorWidget })));
const LuckyColourCalculatorWidget = dynamic(() => import('./LuckyColourCalculatorWidget').then(m => ({ default: m.LuckyColourCalculatorWidget })));
const CareerCalculatorWidget = dynamic(() => import('./CareerCalculatorWidget').then(m => ({ default: m.CareerCalculatorWidget })));
const TwinFlameCalculatorWidget = dynamic(() => import('./TwinFlameCalculatorWidget').then(m => ({ default: m.TwinFlameCalculatorWidget })));
const TwinFlameLifePathWidget = dynamic(() => import('./TwinFlameLifePathWidget').then(m => ({ default: m.TwinFlameLifePathWidget })));
const TwinFlameNumerologyWidget = dynamic(() => import('./TwinFlameNumerologyWidget').then(m => ({ default: m.TwinFlameNumerologyWidget })));
const TwinFlameLoveWidget = dynamic(() => import('./TwinFlameLoveWidget').then(m => ({ default: m.TwinFlameLoveWidget })));
const TwinFlameBirthChartWidget = dynamic(() => import('./TwinFlameBirthChartWidget').then(m => ({ default: m.TwinFlameBirthChartWidget })));

// 33 New Payroll, Tax, Investment & Travel Widgets
const CaliforniaPaycheckWidget = dynamic(() => import('./StatePaycheckWidgets').then(m => ({ default: m.CaliforniaPaycheckWidget })));
const TexasPaycheckWidget = dynamic(() => import('./StatePaycheckWidgets').then(m => ({ default: m.TexasPaycheckWidget })));
const FloridaPaycheckWidget = dynamic(() => import('./StatePaycheckWidgets').then(m => ({ default: m.FloridaPaycheckWidget })));
const NewYorkCityPaycheckWidget = dynamic(() => import('./StatePaycheckWidgets').then(m => ({ default: m.NewYorkCityPaycheckWidget })));
const NewJerseyPaycheckWidget = dynamic(() => import('./StatePaycheckWidgets').then(m => ({ default: m.NewJerseyPaycheckWidget })));
const IllinoisPaycheckWidget = dynamic(() => import('./StatePaycheckWidgets').then(m => ({ default: m.IllinoisPaycheckWidget })));
const ChicagoPaycheckWidget = dynamic(() => import('./StatePaycheckWidgets').then(m => ({ default: m.ChicagoPaycheckWidget })));
const PennsylvaniaPaycheckWidget = dynamic(() => import('./StatePaycheckWidgets').then(m => ({ default: m.PennsylvaniaPaycheckWidget })));
const OhioPaycheckWidget = dynamic(() => import('./StatePaycheckWidgets').then(m => ({ default: m.OhioPaycheckWidget })));
const GeorgiaPaycheckWidget = dynamic(() => import('./StatePaycheckWidgets').then(m => ({ default: m.GeorgiaPaycheckWidget })));
const ColoradoPaycheckWidget = dynamic(() => import('./StatePaycheckWidgets').then(m => ({ default: m.ColoradoPaycheckWidget })));
const IndianaPaycheckWidget = dynamic(() => import('./StatePaycheckWidgets').then(m => ({ default: m.IndianaPaycheckWidget })));
const NorthCarolinaPaycheckWidget = dynamic(() => import('./StatePaycheckWidgets').then(m => ({ default: m.NorthCarolinaPaycheckWidget })));
const MichiganHourlyPaycheckWidget = dynamic(() => import('./StatePaycheckWidgets').then(m => ({ default: m.MichiganHourlyPaycheckWidget })));
const PaycheckCalculatorWidget = dynamic(() => import('./PaycheckCalculatorWidget').then(m => ({ default: m.PaycheckCalculatorWidget })));
const PaycheckTaxCalculatorWidget = dynamic(() => import('./PaycheckTaxCalculatorWidget').then(m => ({ default: m.PaycheckTaxCalculatorWidget })));
const UsSalaryTaxCalculatorWidget = dynamic(() => import('./UsSalaryTaxCalculatorWidget').then(m => ({ default: m.UsSalaryTaxCalculatorWidget })));
const HourlyPaycheckWidget = dynamic(() => import('./HourlyPaycheckWidget').then(m => ({ default: m.HourlyPaycheckWidget })));
const DailyPaycheckWidget = dynamic(() => import('./DailyPaycheckWidget').then(m => ({ default: m.DailyPaycheckWidget })));
const WeeklyPaycheckWidget = dynamic(() => import('./WeeklyPaycheckWidget').then(m => ({ default: m.WeeklyPaycheckWidget })));
const MonthlyPaycheckWidget = dynamic(() => import('./MonthlyPaycheckWidget').then(m => ({ default: m.MonthlyPaycheckWidget })));
const YearlyPaycheckWidget = dynamic(() => import('./YearlyPaycheckWidget').then(m => ({ default: m.YearlyPaycheckWidget })));
const OvertimeCalculatorWidget = dynamic(() => import('./OvertimeCalculatorWidget').then(m => ({ default: m.OvertimeCalculatorWidget })));
const PayRaiseCalculatorWidget = dynamic(() => import('./PayRaiseCalculatorWidget').then(m => ({ default: m.PayRaiseCalculatorWidget })));
const EicCalculatorWidget = dynamic(() => import('./EicCalculatorWidget').then(m => ({ default: m.EicCalculatorWidget })));

const StockCalculatorWidget = dynamic(() => import('./StockCalculatorWidget').then(m => ({ default: m.StockCalculatorWidget })));
const RoiCalculatorWidget = dynamic(() => import('./RoiCalculatorWidget').then(m => ({ default: m.RoiCalculatorWidget })));
const FixedDepositCalculatorWidget = dynamic(() => import('./FixedDepositCalculatorWidget').then(m => ({ default: m.FixedDepositCalculatorWidget })));
const SipCalculatorWidget = dynamic(() => import('./SipCalculatorWidget').then(m => ({ default: m.SipCalculatorWidget })));
const StpCalculatorWidget = dynamic(() => import('./StpCalculatorWidget').then(m => ({ default: m.StpCalculatorWidget })));
const XrpProfitCalculatorWidget = dynamic(() => import('./XrpProfitCalculatorWidget').then(m => ({ default: m.XrpProfitCalculatorWidget })));
const LtpCalculatorWidget = dynamic(() => import('./LtpCalculatorWidget').then(m => ({ default: m.LtpCalculatorWidget })));

const TripBudgetCalculatorWidget = dynamic(() => import('./TripBudgetCalculatorWidget').then(m => ({ default: m.TripBudgetCalculatorWidget })));

// Marine Propeller Widgets
const MarinePropellerWidget = dynamic(() => import('./MarinePropellerWidget').then(m => ({ default: m.MarinePropellerWidget })));

// Thrust Widgets
const ThrustToWeightWidget = dynamic(() => import('./ThrustWidgets').then(m => ({ default: m.ThrustToWeightWidget })));
const DroneThrustWidget = dynamic(() => import('./ThrustWidgets').then(m => ({ default: m.DroneThrustWidget })));
const RocketThrustWidget = dynamic(() => import('./ThrustWidgets').then(m => ({ default: m.RocketThrustWidget })));
const GeneralThrustWidget = dynamic(() => import('./ThrustWidgets').then(m => ({ default: m.GeneralThrustWidget })));

// Structural, Civil & Fitness Thrust Widgets
const PipeThrustWidget = dynamic(() => import('./StructuralThrustWidgets').then(m => ({ default: m.PipeThrustWidget })));
const RafterThrustWidget = dynamic(() => import('./StructuralThrustWidgets').then(m => ({ default: m.RafterThrustWidget })));
const HipThrustWidget = dynamic(() => import('./StructuralThrustWidgets').then(m => ({ default: m.HipThrustWidget })));

// Physics, Tech & Medical Density Widgets
const GeneralDensityWidget = dynamic(() => import('./DensityPhysicsWidgets').then(m => ({ default: m.GeneralDensityWidget })));
const CubeDensityWidget = dynamic(() => import('./DensityPhysicsWidgets').then(m => ({ default: m.CubeDensityWidget })));
const WaterDensityWidget = dynamic(() => import('./DensityPhysicsWidgets').then(m => ({ default: m.WaterDensityWidget })));
const AirDensityWidget = dynamic(() => import('./DensityPhysicsWidgets').then(m => ({ default: m.AirDensityWidget })));
const PixelDensityWidget = dynamic(() => import('./DensityPhysicsWidgets').then(m => ({ default: m.PixelDensityWidget })));
const PopulationDensityWidget = dynamic(() => import('./DensityPhysicsWidgets').then(m => ({ default: m.PopulationDensityWidget })));
const PsaDensityWidget = dynamic(() => import('./DensityPhysicsWidgets').then(m => ({ default: m.PsaDensityWidget })));

// Freight & Logistics Density Widgets
const FreightDensityWidget = dynamic(() => import('./FreightDensityWidgets').then(m => ({ default: m.FreightDensityWidget })));

// Date & Time Widgets (14)
const DateCalculatorWidget = dynamic(() => import('./DateTimeWidgets').then(m => ({ default: m.DateCalculatorWidget })));
const TimeCalculatorWidget = dynamic(() => import('./DateTimeWidgets').then(m => ({ default: m.TimeCalculatorWidget })));
const DateTimeCalculatorWidget = dynamic(() => import('./DateTimeWidgets').then(m => ({ default: m.DateTimeCalculatorWidget })));
const TimeAdditionSubtractionCalculatorWidget = dynamic(() => import('./DateTimeWidgets').then(m => ({ default: m.TimeAdditionSubtractionCalculatorWidget })));
const HoursCalculatorWidget = dynamic(() => import('./DateTimeWidgets').then(m => ({ default: m.HoursCalculatorWidget })));
const DaysCalculatorWidget = dynamic(() => import('./DateTimeWidgets').then(m => ({ default: m.DaysCalculatorWidget })));
const WeeksCalculatorWidget = dynamic(() => import('./DateTimeWidgets').then(m => ({ default: m.WeeksCalculatorWidget })));
const MonthsCalculatorWidget = dynamic(() => import('./DateTimeWidgets').then(m => ({ default: m.MonthsCalculatorWidget })));
const YearsCalculatorWidget = dynamic(() => import('./DateTimeWidgets').then(m => ({ default: m.YearsCalculatorWidget })));
const DayOfTheWeekCalculatorWidget = dynamic(() => import('./DateTimeWidgets').then(m => ({ default: m.DayOfTheWeekCalculatorWidget })));
const SecondsToTimeCalculatorWidget = dynamic(() => import('./DateTimeWidgets').then(m => ({ default: m.SecondsToTimeCalculatorWidget })));
const AverageTimeCalculatorWidget = dynamic(() => import('./DateTimeWidgets').then(m => ({ default: m.AverageTimeCalculatorWidget })));
const LeapYearCalculatorWidget = dynamic(() => import('./DateTimeWidgets').then(m => ({ default: m.LeapYearCalculatorWidget })));
const MilitaryTimeConverterWidget = dynamic(() => import('./DateTimeWidgets').then(m => ({ default: m.MilitaryTimeConverterWidget })));

// Time Card, Payroll, Hotel & Lead Time Widgets (4)
const TimeCardCalculatorWidget = dynamic(() => import('./TimeCardWidgets').then(m => ({ default: m.TimeCardCalculatorWidget })));
const PayrollHoursCalculatorWidget = dynamic(() => import('./TimeCardWidgets').then(m => ({ default: m.PayrollHoursCalculatorWidget })));
const HotelDaysCalculatorWidget = dynamic(() => import('./TimeCardWidgets').then(m => ({ default: m.HotelDaysCalculatorWidget })));
const LeadTimeCalculatorWidget = dynamic(() => import('./TimeCardWidgets').then(m => ({ default: m.LeadTimeCalculatorWidget })));

// Tech & Work Time Widgets (6)
const DownloadTimeCalculatorWidget = dynamic(() => import('./TechTimeWidgets').then(m => ({ default: m.DownloadTimeCalculatorWidget })));
const DiscordEpochTimeCalculatorWidget = dynamic(() => import('./TechTimeWidgets').then(m => ({ default: m.DiscordEpochTimeCalculatorWidget })));
const EpochTimeConverterWidget = dynamic(() => import('./TechTimeWidgets').then(m => ({ default: m.EpochTimeConverterWidget })));
const UnixEpochTimeCalculatorWidget = dynamic(() => import('./TechTimeWidgets').then(m => ({ default: m.UnixEpochTimeCalculatorWidget })));
const AudiobookSpeedCalculatorWidget = dynamic(() => import('./TechTimeWidgets').then(m => ({ default: m.AudiobookSpeedCalculatorWidget })));
const WordsToMinutesCalculatorWidget = dynamic(() => import('./TechTimeWidgets').then(m => ({ default: m.WordsToMinutesCalculatorWidget })));

// Birthday & Milestone Widgets (9)
const BirthdayCalculatorWidget = dynamic(() => import('./BirthdayMilestoneWidgets').then(m => ({ default: m.BirthdayCalculatorWidget })));
const WeeksAgoCalculatorWidget = dynamic(() => import('./BirthdayMilestoneWidgets').then(m => ({ default: m.WeeksAgoCalculatorWidget })));
const BirthYearCalculatorWidget = dynamic(() => import('./BirthdayMilestoneWidgets').then(m => ({ default: m.BirthYearCalculatorWidget })));
const HalfBirthdayCalculatorWidget = dynamic(() => import('./BirthdayMilestoneWidgets').then(m => ({ default: m.HalfBirthdayCalculatorWidget })));
const GoldenBirthdayCalculatorWidget = dynamic(() => import('./BirthdayMilestoneWidgets').then(m => ({ default: m.GoldenBirthdayCalculatorWidget })));
const SilverBirthdayCalculatorWidget = dynamic(() => import('./BirthdayMilestoneWidgets').then(m => ({ default: m.SilverBirthdayCalculatorWidget })));
const DiamondBirthdayCalculatorWidget = dynamic(() => import('./BirthdayMilestoneWidgets').then(m => ({ default: m.DiamondBirthdayCalculatorWidget })));
const SleepCalculatorWidget = dynamic(() => import('./BirthdayMilestoneWidgets').then(m => ({ default: m.SleepCalculatorWidget })));
const AnniversaryCalculatorWidget = dynamic(() => import('./BirthdayMilestoneWidgets').then(m => ({ default: m.AnniversaryCalculatorWidget })));

// Esoteric Birthday Widgets (5)
const RomanNumeralDateWidget = dynamic(() => import('./EsotericBirthdayWidgets').then(m => ({ default: m.RomanNumeralDateWidget })));
const MoonPhaseBirthdayWidget = dynamic(() => import('./EsotericBirthdayWidgets').then(m => ({ default: m.MoonPhaseBirthdayWidget })));
const HebrewBirthdayWidget = dynamic(() => import('./EsotericBirthdayWidgets').then(m => ({ default: m.HebrewBirthdayWidget })));
const SoulmateBirthdayWidget = dynamic(() => import('./EsotericBirthdayWidgets').then(m => ({ default: m.SoulmateBirthdayWidget })));
const TwinFlameBirthdayWidget = dynamic(() => import('./EsotericBirthdayWidgets').then(m => ({ default: m.TwinFlameBirthdayWidget })));

// Swim Time Widget (1)
const SwimTimeConverterWidget = dynamic(() => import('./SwimTimeWidget').then(m => ({ default: m.SwimTimeConverterWidget })));

// 13 Percentage, Tax, VAT, Sports & Fitness Widgets
const DiscountPercentageWidget = dynamic(() => import('./PercentageSuiteWidgets').then(m => ({ default: m.DiscountPercentageWidget })));
const WinPercentageWidget = dynamic(() => import('./PercentageSuiteWidgets').then(m => ({ default: m.WinPercentageWidget })));
const YearlyPercentageIncreaseWidget = dynamic(() => import('./PercentageSuiteWidgets').then(m => ({ default: m.YearlyPercentageIncreaseWidget })));
const PercentageDecreaseWidget = dynamic(() => import('./PercentageSuiteWidgets').then(m => ({ default: m.PercentageDecreaseWidget })));
const PartTimePercentageWidget = dynamic(() => import('./PercentageSuiteWidgets').then(m => ({ default: m.PartTimePercentageWidget })));
const TimePercentageWidget = dynamic(() => import('./PercentageSuiteWidgets').then(m => ({ default: m.TimePercentageWidget })));
const PercentageOfTimeWidget = dynamic(() => import('./PercentageSuiteWidgets').then(m => ({ default: m.PercentageOfTimeWidget })));
const ReversePercentageWidget = dynamic(() => import('./PercentageSuiteWidgets').then(m => ({ default: m.ReversePercentageWidget })));
const GrowthPercentageWidget = dynamic(() => import('./PercentageSuiteWidgets').then(m => ({ default: m.GrowthPercentageWidget })));
const TaxPercentageWidget = dynamic(() => import('./PercentageSuiteWidgets').then(m => ({ default: m.TaxPercentageWidget })));
const VatPercentageWidget = dynamic(() => import('./PercentageSuiteWidgets').then(m => ({ default: m.VatPercentageWidget })));
const SluggingPercentageWidget = dynamic(() => import('./PercentageSuiteWidgets').then(m => ({ default: m.SluggingPercentageWidget })));
const FatPercentageWidget = dynamic(() => import('./PercentageSuiteWidgets').then(m => ({ default: m.FatPercentageWidget })));

// 29 Masonry, Concrete, Wood, Lumber & Pocket Calculator Widgets
const ConcreteCalculatorWidget = dynamic(() => import('./MasonryConcreteWidgets').then(m => ({ default: m.ConcreteCalculatorWidget })));
const ConcreteSlabWidget = dynamic(() => import('./MasonryConcreteWidgets').then(m => ({ default: m.ConcreteSlabWidget })));
const ConcreteBlockWidget = dynamic(() => import('./MasonryConcreteWidgets').then(m => ({ default: m.ConcreteBlockWidget })));
const SakreteCalculatorWidget = dynamic(() => import('./MasonryConcreteWidgets').then(m => ({ default: m.SakreteCalculatorWidget })));
const QuikreteCalculatorWidget = dynamic(() => import('./MasonryConcreteWidgets').then(m => ({ default: m.QuikreteCalculatorWidget })));
const GravelStoneCalculatorWidget = dynamic(() => import('./MasonryConcreteWidgets').then(m => ({ default: m.GravelStoneCalculatorWidget })));
const AsphaltCalculatorWidget = dynamic(() => import('./MasonryConcreteWidgets').then(m => ({ default: m.AsphaltCalculatorWidget })));
const MaterialCalculatorWidget = dynamic(() => import('./MasonryConcreteWidgets').then(m => ({ default: m.MaterialCalculatorWidget })));
const WoodCalculatorWidget = dynamic(() => import('./WoodLumberWidgets').then(m => ({ default: m.WoodCalculatorWidget })));
const FramingWoodWidget = dynamic(() => import('./WoodLumberWidgets').then(m => ({ default: m.FramingWoodWidget })));
const TrestleWoodWidget = dynamic(() => import('./WoodLumberWidgets').then(m => ({ default: m.TrestleWoodWidget })));
const WeightOfWoodWidget = dynamic(() => import('./WoodLumberWidgets').then(m => ({ default: m.WeightOfWoodWidget })));
const DeckWoodWidget = dynamic(() => import('./WoodLumberWidgets').then(m => ({ default: m.DeckWoodWidget })));
const CordWoodWidget = dynamic(() => import('./WoodLumberWidgets').then(m => ({ default: m.CordWoodWidget })));
const CabinetWoodWidget = dynamic(() => import('./WoodLumberWidgets').then(m => ({ default: m.CabinetWoodWidget })));
const FirewoodCordWidget = dynamic(() => import('./WoodLumberWidgets').then(m => ({ default: m.FirewoodCordWidget })));
const LooseCordWoodWidget = dynamic(() => import('./WoodLumberWidgets').then(m => ({ default: m.LooseCordWoodWidget })));
const ShedWoodWidget = dynamic(() => import('./WoodLumberWidgets').then(m => ({ default: m.ShedWoodWidget })));
const FenceWoodWidget = dynamic(() => import('./WoodLumberWidgets').then(m => ({ default: m.FenceWoodWidget })));
const FirewoodCalculatorWidget = dynamic(() => import('./WoodLumberWidgets').then(m => ({ default: m.FirewoodCalculatorWidget })));
const StandardCalculatorWidget = dynamic(() => import('./StandardCalculatorWidget').then(m => ({ default: m.StandardCalculatorWidget })));

// 27 STEM, Fitness, Military, Character Counter & Packaging Widgets
const SpherePackingWidget = dynamic(() => import('./StemMathWidgets').then(m => ({ default: m.SpherePackingWidget })));
const CubeRootWidget = dynamic(() => import('./StemMathWidgets').then(m => ({ default: m.CubeRootWidget })));
const BestScientificCalculatorWidget = dynamic(() => import('./StemMathWidgets').then(m => ({ default: m.BestScientificCalculatorWidget })));
const EquationSolverWidget = dynamic(() => import('./StemMathWidgets').then(m => ({ default: m.EquationSolverWidget })));
const PartialFractionWidget = dynamic(() => import('./StemMathWidgets').then(m => ({ default: m.PartialFractionWidget })));
const GradeCalculatorWidget = dynamic(() => import('./StemMathWidgets').then(m => ({ default: m.GradeCalculatorWidget })));
const StudentTWidget = dynamic(() => import('./StemMathWidgets').then(m => ({ default: m.StudentTWidget })));
const ChiSquareWidget = dynamic(() => import('./StemMathWidgets').then(m => ({ default: m.ChiSquareWidget })));
const HeatIndexWidget = dynamic(() => import('./StemMathWidgets').then(m => ({ default: m.HeatIndexWidget })));
const InchCmWidget = dynamic(() => import('./StemMathWidgets').then(m => ({ default: m.InchCmWidget })));
const IpSubnetWidget = dynamic(() => import('./StemMathWidgets').then(m => ({ default: m.IpSubnetWidget })));
const BinPackingWidget = dynamic(() => import('./StemMathWidgets').then(m => ({ default: m.BinPackingWidget })));

const WilksWidget = dynamic(() => import('./FitnessMilitaryWidgets').then(m => ({ default: m.WilksWidget })));
const ApftWidget = dynamic(() => import('./FitnessMilitaryWidgets').then(m => ({ default: m.ApftWidget })));
const AcftWidget = dynamic(() => import('./FitnessMilitaryWidgets').then(m => ({ default: m.AcftWidget })));
const BenchPressWidget = dynamic(() => import('./FitnessMilitaryWidgets').then(m => ({ default: m.BenchPressWidget })));

const WordCounterWidget = dynamic(() => import('./TextAndPackagingWidgets').then(m => ({ default: m.WordCounterWidget })));
const KoreanCharacterWidget = dynamic(() => import('./TextAndPackagingWidgets').then(m => ({ default: m.KoreanCharacterWidget })));
const JapaneseCharacterWidget = dynamic(() => import('./TextAndPackagingWidgets').then(m => ({ default: m.JapaneseCharacterWidget })));
const TwitterCharacterWidget = dynamic(() => import('./TextAndPackagingWidgets').then(m => ({ default: m.TwitterCharacterWidget })));
const ChineseCharacterWidget = dynamic(() => import('./TextAndPackagingWidgets').then(m => ({ default: m.ChineseCharacterWidget })));
const ShippingBoxSizeWidget = dynamic(() => import('./TextAndPackagingWidgets').then(m => ({ default: m.ShippingBoxSizeWidget })));
const BoxPackingWidget = dynamic(() => import('./TextAndPackagingWidgets').then(m => ({ default: m.BoxPackingWidget })));
const MovingPackingWidget = dynamic(() => import('./TextAndPackagingWidgets').then(m => ({ default: m.MovingPackingWidget })));
const AsqWidget = dynamic(() => import('./TextAndPackagingWidgets').then(m => ({ default: m.AsqWidget })));
const AgeDifferenceWidget = dynamic(() => import('./TextAndPackagingWidgets').then(m => ({ default: m.AgeDifferenceWidget })));
const VideoSpeedWidget = dynamic(() => import('./TextAndPackagingWidgets').then(m => ({ default: m.VideoSpeedWidget })));

// 12 Probability Suite Widgets
const ProbabilityWidget = dynamic(() => import('./ProbabilityWidgets').then(m => ({ default: m.ProbabilityWidget })));
const PermutationsCombinationsWidget = dynamic(() => import('./ProbabilityWidgets').then(m => ({ default: m.PermutationsCombinationsWidget })));
const BinomialWidget = dynamic(() => import('./ProbabilityWidgets').then(m => ({ default: m.BinomialWidget })));
const DiceProbabilityWidget = dynamic(() => import('./ProbabilityWidgets').then(m => ({ default: m.DiceProbabilityWidget })));
const CoinFlipWidget = dynamic(() => import('./ProbabilityWidgets').then(m => ({ default: m.CoinFlipWidget })));
const BayesTheoremWidget = dynamic(() => import('./ProbabilityWidgets').then(m => ({ default: m.BayesTheoremWidget })));
const NormalDistributionWidget = dynamic(() => import('./ProbabilityWidgets').then(m => ({ default: m.NormalDistributionWidget })));
const PoissonWidget = dynamic(() => import('./ProbabilityWidgets').then(m => ({ default: m.PoissonWidget })));
const OddsProbabilityWidget = dynamic(() => import('./ProbabilityWidgets').then(m => ({ default: m.OddsProbabilityWidget })));
const HypergeometricWidget = dynamic(() => import('./ProbabilityWidgets').then(m => ({ default: m.HypergeometricWidget })));
const PokerOddsWidget = dynamic(() => import('./ProbabilityWidgets').then(m => ({ default: m.PokerOddsWidget })));
const LotteryOddsWidget = dynamic(() => import('./ProbabilityWidgets').then(m => ({ default: m.LotteryOddsWidget })));

// 2D Geometry Widgets (12)
const CircleCalculatorWidget = dynamic(() => import('./Geometry2DWidgets').then(m => ({ default: m.CircleCalculatorWidget })));
const TriangleCalculatorWidget = dynamic(() => import('./Geometry2DWidgets').then(m => ({ default: m.TriangleCalculatorWidget })));
const RightTriangleWidget = dynamic(() => import('./Geometry2DWidgets').then(m => ({ default: m.RightTriangleWidget })));
const SquareCalculatorWidget = dynamic(() => import('./Geometry2DWidgets').then(m => ({ default: m.SquareCalculatorWidget })));
const RectangleCalculatorWidget = dynamic(() => import('./Geometry2DWidgets').then(m => ({ default: m.RectangleCalculatorWidget })));
const RhombusCalculatorWidget = dynamic(() => import('./Geometry2DWidgets').then(m => ({ default: m.RhombusCalculatorWidget })));
const ParallelogramCalculatorWidget = dynamic(() => import('./Geometry2DWidgets').then(m => ({ default: m.ParallelogramCalculatorWidget })));
const TrapeziumCalculatorWidget = dynamic(() => import('./Geometry2DWidgets').then(m => ({ default: m.TrapeziumCalculatorWidget })));
const PentagonCalculatorWidget = dynamic(() => import('./Geometry2DWidgets').then(m => ({ default: m.PentagonCalculatorWidget })));
const HexagonCalculatorWidget = dynamic(() => import('./Geometry2DWidgets').then(m => ({ default: m.HexagonCalculatorWidget })));
const PolygonCalculatorWidget = dynamic(() => import('./Geometry2DWidgets').then(m => ({ default: m.PolygonCalculatorWidget })));
const PythagoreanTheoremWidget = dynamic(() => import('./Geometry2DWidgets').then(m => ({ default: m.PythagoreanTheoremWidget })));

// 3D Geometry Widgets (7)
const CubeCalculatorWidget = dynamic(() => import('./Geometry3DWidgets').then(m => ({ default: m.CubeCalculatorWidget })));
const CuboidCalculatorWidget = dynamic(() => import('./Geometry3DWidgets').then(m => ({ default: m.CuboidCalculatorWidget })));
const CylinderCalculatorWidget = dynamic(() => import('./Geometry3DWidgets').then(m => ({ default: m.CylinderCalculatorWidget })));
const ConeCalculatorWidget = dynamic(() => import('./Geometry3DWidgets').then(m => ({ default: m.ConeCalculatorWidget })));
const SphereCalculatorWidget = dynamic(() => import('./Geometry3DWidgets').then(m => ({ default: m.SphereCalculatorWidget })));
const PrismCalculatorWidget = dynamic(() => import('./Geometry3DWidgets').then(m => ({ default: m.PrismCalculatorWidget })));
const PyramidCalculatorWidget = dynamic(() => import('./Geometry3DWidgets').then(m => ({ default: m.PyramidCalculatorWidget })));

// Algebra, Powers, Trig & Logarithm Widgets (17)
const LinearEquationWidget = dynamic(() => import('./AlgebraPowersTrigWidgets').then(m => ({ default: m.LinearEquationWidget })));
const QuadraticEquationWidget = dynamic(() => import('./AlgebraPowersTrigWidgets').then(m => ({ default: m.QuadraticEquationWidget })));
const SystemOfEquationsWidget = dynamic(() => import('./AlgebraPowersTrigWidgets').then(m => ({ default: m.SystemOfEquationsWidget })));
const ArithmeticMeanWidget = dynamic(() => import('./AlgebraPowersTrigWidgets').then(m => ({ default: m.ArithmeticMeanWidget })));
const WeightedAverageWidget = dynamic(() => import('./AlgebraPowersTrigWidgets').then(m => ({ default: m.WeightedAverageWidget })));
const SquarePowerWidget = dynamic(() => import('./AlgebraPowersTrigWidgets').then(m => ({ default: m.SquarePowerWidget })));
const CubePowerWidget = dynamic(() => import('./AlgebraPowersTrigWidgets').then(m => ({ default: m.CubePowerWidget })));
const NthPowerWidget = dynamic(() => import('./AlgebraPowersTrigWidgets').then(m => ({ default: m.NthPowerWidget })));
const SquareRootWidget = dynamic(() => import('./AlgebraPowersTrigWidgets').then(m => ({ default: m.SquareRootWidget })));
const NthRootWidget = dynamic(() => import('./AlgebraPowersTrigWidgets').then(m => ({ default: m.NthRootWidget })));
const SineCalculatorWidget = dynamic(() => import('./AlgebraPowersTrigWidgets').then(m => ({ default: m.SineCalculatorWidget })));
const CosineCalculatorWidget = dynamic(() => import('./AlgebraPowersTrigWidgets').then(m => ({ default: m.CosineCalculatorWidget })));
const TangentCalculatorWidget = dynamic(() => import('./AlgebraPowersTrigWidgets').then(m => ({ default: m.TangentCalculatorWidget })));
const CotangentCalculatorWidget = dynamic(() => import('./AlgebraPowersTrigWidgets').then(m => ({ default: m.CotangentCalculatorWidget })));
const LogarithmCalculatorWidget = dynamic(() => import('./AlgebraPowersTrigWidgets').then(m => ({ default: m.LogarithmCalculatorWidget })));
const NaturalLogarithmWidget = dynamic(() => import('./AlgebraPowersTrigWidgets').then(m => ({ default: m.NaturalLogarithmWidget })));
const CommonLogarithmWidget = dynamic(() => import('./AlgebraPowersTrigWidgets').then(m => ({ default: m.CommonLogarithmWidget })));

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
