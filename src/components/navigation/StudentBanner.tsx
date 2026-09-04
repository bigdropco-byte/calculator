'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark, X, Sparkles } from 'lucide-react';

export const StudentBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    // Check if dismissed before
    const isDismissed = localStorage.getItem('calculat_student_banner_dismissed');
    if (!isDismissed) {
      setVisible(true);
    }
    // Check OS
    if (typeof window !== 'undefined' && navigator.userAgent) {
      setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.userAgent));
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem('calculat_student_banner_dismissed', 'true');
    } catch {}
  };

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 text-white text-xs py-2.5 px-4 border-b border-sky-800/40 relative z-50 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 font-semibold text-sky-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Made by a student developer:
          </span>
          <span className="text-slate-200">
            Building a clean, ad-free calculator directory for everyone. If this helps you today, press{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-white font-mono font-bold text-[11px] border border-white/20">
              {isMac ? '⌘ + D' : 'Ctrl + D'}
            </kbd>{' '}
            to bookmark so you never have to search through ad-cluttered sites again!
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            aria-label="Dismiss banner"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
