export interface TipInputs {
  billAmount: number;
  tipPercent: number;
  splitCount: number;
  roundUpTotal?: boolean;
}

export interface TipResult {
  billAmount: number;
  tipPercent: number;
  tipAmount: number;
  totalAmount: number;
  tipPerPerson: number;
  totalPerPerson: number;
  splitCount: number;
  effectiveTipPercent: number;
}

export function calculateTip(inputs: TipInputs): TipResult {
  const bill = Math.max(0, inputs.billAmount || 0);
  const rawTipPercent = Math.max(0, inputs.tipPercent || 0);
  const splits = Math.max(1, Math.floor(inputs.splitCount || 1));

  let tipAmount = (bill * rawTipPercent) / 100;
  let totalAmount = bill + tipAmount;

  if (inputs.roundUpTotal && totalAmount > 0) {
    const rounded = Math.ceil(totalAmount);
    totalAmount = rounded;
    tipAmount = Math.max(0, totalAmount - bill);
  }

  const effectiveTipPercent = bill > 0 ? (tipAmount / bill) * 100 : rawTipPercent;
  const tipPerPerson = tipAmount / splits;
  const totalPerPerson = totalAmount / splits;

  return {
    billAmount: Math.round(bill * 100) / 100,
    tipPercent: rawTipPercent,
    tipAmount: Math.round(tipAmount * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    tipPerPerson: Math.round(tipPerPerson * 100) / 100,
    totalPerPerson: Math.round(totalPerPerson * 100) / 100,
    splitCount: splits,
    effectiveTipPercent: Math.round(effectiveTipPercent * 10) / 10,
  };
}
