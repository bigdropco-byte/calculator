import { describe, it, expect } from 'vitest';
import {
  createInitialCalculatorState,
  inputDigit,
  inputDecimal,
  performOperation,
  computeEquals,
  toggleSign,
  inputPercent,
  squareRoot,
  clearAll,
  deleteLastChar,
} from '../simpleCalculatorEngine';

describe('Standard Online Pocket Calculator Engine', () => {
  it('performs basic addition: 12 + 25 = 37', () => {
    let state = createInitialCalculatorState();
    state = inputDigit(state, '1');
    state = inputDigit(state, '2');
    state = performOperation(state, '+');
    state = inputDigit(state, '2');
    state = inputDigit(state, '5');
    state = computeEquals(state);
    expect(state.display).toBe('37');
  });

  it('performs decimal multiplication: 4.5 × 6 = 27', () => {
    let state = createInitialCalculatorState();
    state = inputDigit(state, '4');
    state = inputDecimal(state);
    state = inputDigit(state, '5');
    state = performOperation(state, '×');
    state = inputDigit(state, '6');
    state = computeEquals(state);
    expect(state.display).toBe('27');
  });

  it('handles division by zero safely', () => {
    let state = createInitialCalculatorState();
    state = inputDigit(state, '8');
    state = performOperation(state, '÷');
    state = inputDigit(state, '0');
    state = computeEquals(state);
    expect(state.display).toBe('Error');
  });

  it('computes square root', () => {
    let state = createInitialCalculatorState();
    state = inputDigit(state, '8');
    state = inputDigit(state, '1');
    state = squareRoot(state);
    expect(state.display).toBe('9');
  });

  it('toggles signs and handles backspace', () => {
    let state = createInitialCalculatorState();
    state = inputDigit(state, '5');
    state = inputDigit(state, '0');
    state = toggleSign(state);
    expect(state.display).toBe('-50');
    state = toggleSign(state);
    expect(state.display).toBe('50');
    state = deleteLastChar(state);
    expect(state.display).toBe('5');
  });

  it('calculates relative percentage', () => {
    let state = createInitialCalculatorState();
    state = inputDigit(state, '2');
    state = inputDigit(state, '0');
    state = inputDigit(state, '0');
    state = performOperation(state, '+');
    state = inputDigit(state, '1');
    state = inputDigit(state, '5');
    state = inputPercent(state); // 15% of 200 = 30
    expect(state.display).toBe('30');
    state = computeEquals(state); // 200 + 30 = 230
    expect(state.display).toBe('230');
  });
});
