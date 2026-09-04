'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  createInitialCalculatorState,
  inputDigit,
  inputDecimal,
  clearAll,
  clearEntry,
  deleteLastChar,
  toggleSign,
  inputPercent,
  squareRoot,
  performOperation,
  computeEquals,
} from '@/lib/calculators/simpleCalculatorEngine';
import { CalculatorActions } from '@/components/calculator/CalculatorActions';

export const StandardCalculatorWidget: React.FC = () => {
  const [state, setState] = useState(createInitialCalculatorState());

  const handleDigit = useCallback((d: string) => {
    setState(s => inputDigit(s, d));
  }, []);

  const handleDecimal = useCallback(() => {
    setState(s => inputDecimal(s));
  }, []);

  const handleOp = useCallback((op: '+' | '-' | '×' | '÷') => {
    setState(s => performOperation(s, op));
  }, []);

  const handleEquals = useCallback(() => {
    setState(s => computeEquals(s));
  }, []);

  const handleClear = useCallback(() => {
    setState(clearAll());
  }, []);

  const handleBackspace = useCallback(() => {
    setState(s => deleteLastChar(s));
  }, []);

  // Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input element elsewhere
      if ((e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === '.') {
        e.preventDefault();
        handleDecimal();
      } else if (e.key === '+') {
        e.preventDefault();
        handleOp('+');
      } else if (e.key === '-') {
        e.preventDefault();
        handleOp('-');
      } else if (e.key === '*' || e.key === 'x') {
        e.preventDefault();
        handleOp('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOp('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleDecimal, handleOp, handleEquals, handleBackspace, handleClear]);

  const getResultText = () => `Result: ${state.display}`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Calculator Main Keypad */}
        <div className="md:col-span-7 bg-slate-900 rounded-2xl p-5 shadow-lg border border-slate-800 text-white">
          {/* Display */}
          <div className="bg-slate-950 rounded-xl p-4 mb-4 text-right border border-slate-800/80">
            <div className="text-xs font-mono text-slate-400 h-5 overflow-hidden">
              {state.previousValue !== null ? `${state.previousValue} ${state.operation || ''}` : ''}
            </div>
            <div className="text-4xl sm:text-5xl font-mono font-bold tracking-tight text-white overflow-x-auto select-all">
              {state.display}
            </div>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-4 gap-2 text-sm font-semibold">
            {/* Row 1: Utility */}
            <button
              type="button"
              onClick={handleClear}
              className="py-3 rounded-lg bg-slate-800 hover:bg-rose-900/80 text-rose-300 transition-colors"
            >
              C
            </button>
            <button
              type="button"
              onClick={() => setState(s => clearEntry(s))}
              className="py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              CE
            </button>
            <button
              type="button"
              onClick={() => setState(s => squareRoot(s))}
              className="py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              √
            </button>
            <button
              type="button"
              onClick={() => setState(s => inputPercent(s))}
              className="py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              %
            </button>

            {/* Row 2 */}
            <button
              type="button"
              onClick={() => handleDigit('7')}
              className="py-3.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-white text-lg transition-colors"
            >
              7
            </button>
            <button
              type="button"
              onClick={() => handleDigit('8')}
              className="py-3.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-white text-lg transition-colors"
            >
              8
            </button>
            <button
              type="button"
              onClick={() => handleDigit('9')}
              className="py-3.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-white text-lg transition-colors"
            >
              9
            </button>
            <button
              type="button"
              onClick={() => handleOp('÷')}
              className={`py-3.5 rounded-lg text-lg transition-colors ${
                state.operation === '÷' ? 'bg-sky-500 text-white font-bold' : 'bg-sky-600/30 hover:bg-sky-600/50 text-sky-400'
              }`}
            >
              ÷
            </button>

            {/* Row 3 */}
            <button
              type="button"
              onClick={() => handleDigit('4')}
              className="py-3.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-white text-lg transition-colors"
            >
              4
            </button>
            <button
              type="button"
              onClick={() => handleDigit('5')}
              className="py-3.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-white text-lg transition-colors"
            >
              5
            </button>
            <button
              type="button"
              onClick={() => handleDigit('6')}
              className="py-3.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-white text-lg transition-colors"
            >
              6
            </button>
            <button
              type="button"
              onClick={() => handleOp('×')}
              className={`py-3.5 rounded-lg text-lg transition-colors ${
                state.operation === '×' ? 'bg-sky-500 text-white font-bold' : 'bg-sky-600/30 hover:bg-sky-600/50 text-sky-400'
              }`}
            >
              ×
            </button>

            {/* Row 4 */}
            <button
              type="button"
              onClick={() => handleDigit('1')}
              className="py-3.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-white text-lg transition-colors"
            >
              1
            </button>
            <button
              type="button"
              onClick={() => handleDigit('2')}
              className="py-3.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-white text-lg transition-colors"
            >
              2
            </button>
            <button
              type="button"
              onClick={() => handleDigit('3')}
              className="py-3.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-white text-lg transition-colors"
            >
              3
            </button>
            <button
              type="button"
              onClick={() => handleOp('-')}
              className={`py-3.5 rounded-lg text-lg transition-colors ${
                state.operation === '-' ? 'bg-sky-500 text-white font-bold' : 'bg-sky-600/30 hover:bg-sky-600/50 text-sky-400'
              }`}
            >
              −
            </button>

            {/* Row 5 */}
            <button
              type="button"
              onClick={() => setState(s => toggleSign(s))}
              className="py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              ±
            </button>
            <button
              type="button"
              onClick={() => handleDigit('0')}
              className="py-3.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-white text-lg transition-colors"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleDecimal}
              className="py-3.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-white text-lg transition-colors"
            >
              .
            </button>
            <button
              type="button"
              onClick={() => handleOp('+')}
              className={`py-3.5 rounded-lg text-lg transition-colors ${
                state.operation === '+' ? 'bg-sky-500 text-white font-bold' : 'bg-sky-600/30 hover:bg-sky-600/50 text-sky-400'
              }`}
            >
              +
            </button>

            {/* Row 6: Equals & Backspace */}
            <button
              type="button"
              onClick={handleBackspace}
              className="py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs transition-colors"
              title="Backspace"
            >
              ⌫ Del
            </button>
            <button
              type="button"
              onClick={handleEquals}
              className="col-span-3 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-lg shadow-md transition-colors"
            >
              =
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-between items-center text-2xs text-slate-400">
            <span>Supports keyboard entry (0-9, +, -, *, /, Enter)</span>
            <button
              type="button"
              onClick={() => navigator?.clipboard?.writeText(state.display)}
              className="hover:text-sky-300 font-semibold text-xs"
            >
              Copy Display
            </button>
          </div>
        </div>

        {/* Calculation Tape & History */}
        <div className="md:col-span-5 flex flex-col justify-between h-full space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3">
              Calculation Tape & History
            </span>

            {state.history.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-6 text-center">
                Perform calculations on the left to record history here.
              </p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {state.history.map((entry, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-white rounded-lg border border-slate-200 text-xs font-mono flex justify-between items-center hover:bg-sky-50 transition-colors"
                  >
                    <span className="text-slate-700">{entry}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const val = entry.split(' = ')[1];
                        if (val) setState(s => ({ ...s, display: val, waitingForOperand: true }));
                      }}
                      className="text-2xs text-sky-600 hover:underline font-semibold"
                    >
                      Recall
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <CalculatorActions resultText={getResultText()} onReset={handleClear} />
        </div>
      </div>
    </div>
  );
};
