export type BmiUnit = 'metric' | 'imperial';

export interface BmiResult {
  bmi: number;
  category: string;
  categoryClass: 'underweight' | 'normal' | 'overweight' | 'obese1' | 'obese2' | 'obese3';
  healthyWeightMin: number;
  healthyWeightMax: number;
  unit: BmiUnit;
  prime: number;
  ponderalIndex: number;
}

export function calculateBmiMetric(weightKg: number, heightCm: number): BmiResult {
  if (weightKg <= 0 || heightCm <= 0) {
    return {
      bmi: 0,
      category: 'Invalid',
      categoryClass: 'normal',
      healthyWeightMin: 0,
      healthyWeightMax: 0,
      unit: 'metric',
      prime: 0,
      ponderalIndex: 0,
    };
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const prime = bmi / 25;
  const ponderalIndex = weightKg / (heightM * heightM * heightM);

  const healthyWeightMin = 18.5 * (heightM * heightM);
  const healthyWeightMax = 24.9 * (heightM * heightM);

  let category = 'Normal weight';
  let categoryClass: BmiResult['categoryClass'] = 'normal';

  if (bmi < 18.5) {
    category = 'Underweight';
    categoryClass = 'underweight';
  } else if (bmi < 25) {
    category = 'Normal weight';
    categoryClass = 'normal';
  } else if (bmi < 30) {
    category = 'Overweight';
    categoryClass = 'overweight';
  } else if (bmi < 35) {
    category = 'Obesity Class I';
    categoryClass = 'obese1';
  } else if (bmi < 40) {
    category = 'Obesity Class II';
    categoryClass = 'obese2';
  } else {
    category = 'Obesity Class III';
    categoryClass = 'obese3';
  }

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    categoryClass,
    healthyWeightMin: Math.round(healthyWeightMin * 10) / 10,
    healthyWeightMax: Math.round(healthyWeightMax * 10) / 10,
    unit: 'metric',
    prime: Math.round(prime * 100) / 100,
    ponderalIndex: Math.round(ponderalIndex * 10) / 10,
  };
}

export function calculateBmiImperial(weightLbs: number, heightFeet: number, heightInches: number): BmiResult {
  const totalInches = heightFeet * 12 + heightInches;
  if (weightLbs <= 0 || totalInches <= 0) {
    return {
      bmi: 0,
      category: 'Invalid',
      categoryClass: 'normal',
      healthyWeightMin: 0,
      healthyWeightMax: 0,
      unit: 'imperial',
      prime: 0,
      ponderalIndex: 0,
    };
  }

  const heightCm = totalInches * 2.54;
  const weightKg = weightLbs * 0.45359237;

  const res = calculateBmiMetric(weightKg, heightCm);
  // Convert healthy weights back to lbs
  return {
    ...res,
    unit: 'imperial',
    healthyWeightMin: Math.round((res.healthyWeightMin / 0.45359237) * 10) / 10,
    healthyWeightMax: Math.round((res.healthyWeightMax / 0.45359237) * 10) / 10,
  };
}
