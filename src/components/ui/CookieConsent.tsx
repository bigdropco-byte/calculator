'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, X, Check } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('calculat_cookie_consent');
      if (!consent) {
        // Delay slightly for smoother page load
        const timer = setTimeout(() => setShow(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('calculat_cookie_consent', 'accepted');
    } catch {}
    setShow(false);
  };

  const handleNecessaryOnly = () => {
    try {
      localStorage.setItem('calculat_cookie_consent', 'essential_only');
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Preferences"
      className="fixed bottom-4 right-4 z-50 max-w-sm w-[calc(100vw-2rem)] sm:w-96 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl p-4 sm:p-5 animate-in slide-in-from-bottom-5 duration-200 transition-all text-slate-800"
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Cookie className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-slate-900">
            Cookie &amp; Privacy Notice
          </span>
        </div>
        <button
          type="button"
          onClick={handleAccept}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed mb-3">
        Calculat uses local storage solely to remember your favorites and recently used calculators. We do <strong>not</strong> track you across other websites or sell personal calculation data.
      </p>

      {showDetails && (
        <div className="p-2.5 mb-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 space-y-1.5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-800">Essential Local Storage:</span>
            <span className="text-emerald-700 font-bold flex items-center gap-0.5">
              <Check className="w-3 h-3" /> Active
            </span>
          </div>
          <p className="text-slate-500 text-[10px]">
            Stores your starred favorites, recently viewed tool slugs, and roadmap poll votes directly on this device.
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
            <span className="font-medium text-slate-800">Third-Party Tracking Cookies:</span>
            <span className="text-slate-400 font-semibold">Disabled (0 cookies)</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 pt-1 text-xs">
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="text-slate-500 hover:text-sky-700 underline text-[11px] font-medium transition-colors"
        >
          {showDetails ? 'Hide details' : 'Preferences'}
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleNecessaryOnly}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors text-xs"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold transition-colors text-xs shadow-2xs"
          >
            Accept All
          </button>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          100% Client-Side Privacy
        </span>
        <Link href="/privacy" className="hover:underline text-slate-500">
          Privacy Policy
        </Link>
      </div>
    </aside>
  );
};
