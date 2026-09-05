'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Bookmark, ArrowRight, Sparkles } from 'lucide-react';

export const CreatorStoryCard: React.FC = () => {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.userAgent) {
      setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.userAgent));
    }
  }, []);

  return (
    <div className="bg-white border-2 border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-8">
        {/* Creator Icon / Badge */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex flex-col items-center justify-center font-bold text-2xl shadow-md shrink-0">
          <span>🎓</span>
          <span className="text-[10px] tracking-wider uppercase font-extrabold mt-1">Student</span>
        </div>

        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
              The Story Behind Calculat
            </span>
            <span className="text-xs text-slate-400">• Independent Project</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            &ldquo;I built this because I got tired of ad-cluttered calculator websites.&rdquo;
          </h2>

          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            <p>
              Hi there! I&apos;m a student developer who uses calculators constantly for math, coding, personal budgeting, and coursework. Whenever I Googled a basic formula, I ended up on giant corporate websites covered in 15 blinking ads, aggressive loan affiliate forms, and slow trackers.
            </p>
            <p>
              I decided to build <strong>Calculat.dev</strong> in my spare time as an experiment: what if an online calculator directory was <em>instant</em>, <em>completely free</em>, and <em>performed 100% of calculations right inside your browser with zero tracking</em>?
            </p>
            <p className="font-medium text-slate-800">
              My mission is to expand this into a comprehensive directory of 500+ free calculators. If Calculat saved you a headache today, bookmarking the site or telling a classmate or colleague helps keep this independent project alive!
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-4 flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-900 text-xs font-semibold">
              <Bookmark className="w-3.5 h-3.5 text-sky-700" />
              <span>Press <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-sky-300">{isMac ? '⌘ + D' : 'Ctrl + D'}</kbd> to Bookmark</span>
            </div>

            <Link
              href="/about/"
              className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline"
            >
              Read the full story <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
