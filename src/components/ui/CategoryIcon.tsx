import React from 'react';
import {
  Percent,
  DollarSign,
  HeartPulse,
  Calendar,
  Sparkles,
  Briefcase,
  GraduationCap,
  ArrowLeftRight,
  Atom,
  Cpu,
  Hammer,
  Activity,
  BarChart2,
  BarChart,
  Dices,
  Trophy,
  Plane,
  TrendingUp,
  CalendarRange,
  Home,
  Receipt,
  Calculator,
  LucideProps,
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  Percent,
  DollarSign,
  HeartPulse,
  Calendar,
  Sparkles,
  Briefcase,
  GraduationCap,
  ArrowLeftRight,
  Atom,
  Cpu,
  Hammer,
  Activity,
  BarChart2,
  BarChart,
  Dices,
  Trophy,
  Plane,
  TrendingUp,
  CalendarRange,
  Home,
  Receipt,
  Calculator,
};

interface CategoryIconProps extends LucideProps {
  name: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, ...props }) => {
  const IconComponent = ICON_MAP[name] || Calculator;
  return <IconComponent {...props} />;
};
