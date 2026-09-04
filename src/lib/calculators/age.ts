export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthdayDays: number;
  nextBirthdayDayOfWeek: string;
  isInvalid: boolean;
  errorMessage?: string;
}

export function calculateAge(birthDateInput: string | Date, targetDateInput?: string | Date): AgeResult {
  const birthDate = typeof birthDateInput === 'string' ? new Date(birthDateInput) : birthDateInput;
  const targetDate = targetDateInput
    ? typeof targetDateInput === 'string'
      ? new Date(targetDateInput)
      : targetDateInput
    : new Date();

  if (isNaN(birthDate.getTime()) || isNaN(targetDate.getTime())) {
    return {
      years: 0,
      months: 0,
      days: 0,
      totalDays: 0,
      totalWeeks: 0,
      totalMonths: 0,
      totalHours: 0,
      totalMinutes: 0,
      totalSeconds: 0,
      nextBirthdayDays: 0,
      nextBirthdayDayOfWeek: '',
      isInvalid: true,
      errorMessage: 'Invalid date provided',
    };
  }

  if (birthDate > targetDate) {
    return {
      years: 0,
      months: 0,
      days: 0,
      totalDays: 0,
      totalWeeks: 0,
      totalMonths: 0,
      totalHours: 0,
      totalMinutes: 0,
      totalSeconds: 0,
      nextBirthdayDays: 0,
      nextBirthdayDayOfWeek: '',
      isInvalid: true,
      errorMessage: 'Date of birth cannot be in the future',
    };
  }

  let years = targetDate.getFullYear() - birthDate.getFullYear();
  let months = targetDate.getMonth() - birthDate.getMonth();
  let days = targetDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    // Get number of days in the previous month of targetDate
    const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Exact difference in ms
  const diffMs = targetDate.getTime() - birthDate.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  // Next birthday calculation
  const nextBirthdayYear =
    targetDate.getMonth() > birthDate.getMonth() ||
    (targetDate.getMonth() === birthDate.getMonth() && targetDate.getDate() >= birthDate.getDate())
      ? targetDate.getFullYear() + 1
      : targetDate.getFullYear();

  const nextBirthday = new Date(nextBirthdayYear, birthDate.getMonth(), birthDate.getDate());
  const nextBirthdayDiffMs = nextBirthday.getTime() - targetDate.getTime();
  const nextBirthdayDays = Math.ceil(nextBirthdayDiffMs / (1000 * 60 * 60 * 24));
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const nextBirthdayDayOfWeek = dayNames[nextBirthday.getDay()];

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    totalMinutes,
    totalSeconds,
    nextBirthdayDays: nextBirthdayDays < 0 ? 0 : nextBirthdayDays,
    nextBirthdayDayOfWeek,
    isInvalid: false,
  };
}
