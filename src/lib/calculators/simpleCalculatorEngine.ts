/**
 * Pure Calculation Engine: Standard Digital Pocket Calculator
 * Powers the flagship /calculators/calculator online tool.
 */

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: '+' | '-' | '×' | '÷' | null;
  waitingForOperand: boolean;
  memory: number;
  history: string[];
}

export function createInitialCalculatorState(): CalculatorState {
  return {
    display: '0',
    previousValue: null,
    operation: null,
    waitingForOperand: false,
    memory: 0,
    history: [],
  };
}

export function inputDigit(state: CalculatorState, digit: string): CalculatorState {
  const { display, waitingForOperand } = state;

  if (waitingForOperand) {
    return {
      ...state,
      display: digit,
      waitingForOperand: false,
    };
  }

  return {
    ...state,
    display: display === '0' ? digit : display + digit,
  };
}

export function inputDecimal(state: CalculatorState): CalculatorState {
  const { display, waitingForOperand } = state;

  if (waitingForOperand) {
    return {
      ...state,
      display: '0.',
      waitingForOperand: false,
    };
  }

  if (!display.includes('.')) {
    return {
      ...state,
      display: display + '.',
      waitingForOperand: false,
    };
  }

  return state;
}

export function clearAll(): CalculatorState {
  return createInitialCalculatorState();
}

export function clearEntry(state: CalculatorState): CalculatorState {
  return {
    ...state,
    display: '0',
  };
}

export function deleteLastChar(state: CalculatorState): CalculatorState {
  const { display } = state;
  if (display.length <= 1 || display === 'Error') {
    return { ...state, display: '0' };
  }
  return {
    ...state,
    display: display.slice(0, -1),
  };
}

export function toggleSign(state: CalculatorState): CalculatorState {
  const val = parseFloat(state.display);
  if (isNaN(val) || val === 0) return state;
  return {
    ...state,
    display: String(val * -1),
  };
}

export function inputPercent(state: CalculatorState): CalculatorState {
  const val = parseFloat(state.display);
  if (isNaN(val)) return state;

  // If there's a previous value and an operation, percent is relative to previous value
  if (state.previousValue !== null && state.operation) {
    const percentVal = (state.previousValue * val) / 100;
    return {
      ...state,
      display: String(Math.round(percentVal * 100000000) / 100000000),
    };
  }

  return {
    ...state,
    display: String(val / 100),
  };
}

export function squareRoot(state: CalculatorState): CalculatorState {
  const val = parseFloat(state.display);
  if (isNaN(val) || val < 0) {
    return { ...state, display: 'Error' };
  }
  const res = Math.sqrt(val);
  return {
    ...state,
    display: String(Math.round(res * 100000000) / 100000000),
    history: [`√(${val}) = ${res}`, ...state.history].slice(0, 10),
  };
}

export function performOperation(
  state: CalculatorState,
  nextOperation: '+' | '-' | '×' | '÷'
): CalculatorState {
  const inputValue = parseFloat(state.display);

  if (state.previousValue === null) {
    return {
      ...state,
      previousValue: inputValue,
      operation: nextOperation,
      waitingForOperand: true,
    };
  }

  if (state.operation) {
    const currentValue = state.previousValue || 0;
    const result = compute(currentValue, inputValue, state.operation);

    if (result === 'Error') {
      return {
        ...createInitialCalculatorState(),
        display: 'Error',
      };
    }

    const numResult = Number(result);
    return {
      ...state,
      display: String(numResult),
      previousValue: numResult,
      operation: nextOperation,
      waitingForOperand: true,
      history: [
        `${currentValue} ${state.operation} ${inputValue} = ${numResult}`,
        ...state.history,
      ].slice(0, 10),
    };
  }

  return {
    ...state,
    operation: nextOperation,
    waitingForOperand: true,
  };
}

export function computeEquals(state: CalculatorState): CalculatorState {
  const inputValue = parseFloat(state.display);

  if (state.previousValue === null || !state.operation) {
    return state;
  }

  const result = compute(state.previousValue, inputValue, state.operation);

  if (result === 'Error') {
    return {
      ...createInitialCalculatorState(),
      display: 'Error',
    };
  }

  const numResult = Number(result);
  const entry = `${state.previousValue} ${state.operation} ${inputValue} = ${numResult}`;

  return {
    ...state,
    display: String(numResult),
    previousValue: null,
    operation: null,
    waitingForOperand: true,
    history: [entry, ...state.history].slice(0, 10),
  };
}

function compute(prev: number, current: number, op: '+' | '-' | '×' | '÷'): number | 'Error' {
  let res = 0;
  switch (op) {
    case '+':
      res = prev + current;
      break;
    case '-':
      res = prev - current;
      break;
    case '×':
      res = prev * current;
      break;
    case '÷':
      if (current === 0) return 'Error';
      res = prev / current;
      break;
    default:
      return current;
  }
  // Avoid floating point inaccuracies like 0.1 + 0.2 = 0.30000000000000004
  return Math.round(res * 1000000000) / 1000000000;
}
