'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Star, Bookmark, Share2, Check, MessageSquarePlus } from 'lucide-react';
import { isFavoriteCalculator, toggleFavoriteCalculator } from '@/lib/storage';

interface StudentSupportCardProps {
  calculatorName: string;
  calculatorSlug: string;
}

export const StudentSupportCard: React.FC<StudentSupportCardProps> = ({
  calculatorName,
  calculatorSlug,
}) => {
  const [isFav, setIsFav] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setIsFav(isFavoriteCalculator(calculatorSlug));
    if (typeof window !== 'undefined' && navigator.userAgent) {
      setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.userAgent));
    }
  }, [calculatorSlug]);

  const handleToggleFav = () => {
    const next = toggleFavoriteCalculator(calculatorSlug);
    setIsFav(next);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="my-8 bg-gradient-to-br from-white via-sky-50/40 to-slate-50 border-2 border-sky-100 rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
      {/* Decorative subtle background badge */}
      <div className="absolute right-4 top-4 opacity-10 pointer-events-none">
        <Heart className="w-24 h-24 text-sky-600" />
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Student Avatar / Badge */}
        <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
          🎓
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-base font-bold text-slate-900">
              Did this calculation save you time?
            </p>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
              Student Project
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            Hi! I&apos;m a student developer building <strong>Calculat</strong> in my spare time. I was tired of searching for basic math tools and having to click through 10 spammy popups, loan ads, and cookie trackers.
          </p>

          <p className="text-xs text-slate-500 leading-relaxed">
            I keep this website <strong>100% free, private, and ad-free</strong>. If this helped you with your homework, project, or finances today, bookmarking this page or telling a friend helps me keep building more free tools!
          </p>

          {/* Action Row */}
          <div className="pt-3 flex items-center gap-2.5 flex-wrap">
            {/* Bookmark pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-100/80 border border-sky-200 text-sky-900 text-xs font-semibold">
              <Bookmark className="w-3.5 h-3.5 text-sky-700" />
              <span>Press <kbd className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-sky-300 text-[10px]">{isMac ? '⌘ + D' : 'Ctrl + D'}</kbd> to Bookmark</span>
            </div>

            {/* Favorite toggle button */}
            <button
              type="button"
              onClick={handleToggleFav}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                isFav
                  ? 'bg-amber-50 border-amber-300 text-amber-800 shadow-2xs'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-2xs'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
              <span>{isFav ? 'Added to My Favorites' : 'Save to Favorites'}</span>
            </button>

            {/* Share / Copy link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium transition-colors shadow-2xs"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Share with a Classmate</span>
                </>
              )}
            </button>

            {/* Suggest next tool */}
            <Link
              href="/contact?topic=suggestion"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium transition-colors shadow-2xs"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-slate-400" />
              <span>Suggest What I Build Next</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
