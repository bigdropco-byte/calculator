'use client';

import React, { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import { copyToClipboard } from '@/lib/formatting';

interface CalculatorActionsProps {
  resultText: string;
  onReset: () => void;
  className?: string;
}

export const CalculatorActions: React.FC<CalculatorActionsProps> = ({
  resultText,
  onReset,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!resultText) return;
    const success = await copyToClipboard(resultText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`flex items-center gap-2 pt-4 border-t border-slate-200/80 ${className}`}>
      <button
        type="button"
        onClick={handleCopy}
        disabled={!resultText}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
          copied
            ? 'bg-emerald-600 text-white shadow-2xs'
            : 'bg-sky-600 hover:bg-sky-700 text-white shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed'
        }`}
        aria-label="Copy result to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Result</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
        aria-label="Reset calculator inputs"
      >
        <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
        <span>Reset</span>
      </button>
    </div>
  );
};
