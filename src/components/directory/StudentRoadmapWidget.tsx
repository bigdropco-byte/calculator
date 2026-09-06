'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThumbsUp, Check, Sparkles, MessageSquarePlus, Clock } from 'lucide-react';

interface RoadmapItem {
  id: string;
  title: string;
  category: string;
  votes: number;
  description: string;
}

const INITIAL_ROADMAP: RoadmapItem[] = [
  {
    id: 'gpa',
    title: 'College & High School GPA Calculator',
    category: 'Education',
    votes: 428,
    description: 'Calculate weighted and unweighted semester GPA, target GPA goals, and credit hours.',
  },
  {
    id: 'salary',
    title: 'Salary & Take-Home Paycheck Calculator',
    category: 'Finance',
    votes: 395,
    description: 'Estimate net bi-weekly or monthly take-home pay after federal, state, and payroll deductions.',
  },
  {
    id: 'scientific',
    title: 'Scientific & Fraction Calculator',
    category: 'Math',
    votes: 312,
    description: 'Trigonometry, exponents, logarithms, and mixed fractions with step-by-step solutions.',
  },
  {
    id: 'calorie',
    title: 'Daily Calorie Deficit & Macro Calculator',
    category: 'Health',
    votes: 284,
    description: 'Calculate daily maintenance calories, cutting deficits, and protein/carb/fat targets.',
  },
  {
    id: 'inflation',
    title: 'Inflation & Purchasing Power Calculator',
    category: 'Finance',
    votes: 219,
    description: 'Compare historical dollar values and understand real purchasing power over time.',
  },
];

export const StudentRoadmapWidget: React.FC = () => {
  const [items, setItems] = useState<RoadmapItem[]>(INITIAL_ROADMAP);
  const [votedIds, setVotedIds] = useState<string[]>([]);
  const [justVoted, setJustVoted] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('calculat_roadmap_votes');
      if (saved) {
        setVotedIds(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const handleVote = (id: string) => {
    if (votedIds.includes(id)) return;

    const nextVoted = [...votedIds, id];
    setVotedIds(nextVoted);
    setJustVoted(id);

    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, votes: item.votes + 1 } : item))
    );

    try {
      localStorage.setItem('calculat_roadmap_votes', JSON.stringify(nextVoted));
    } catch {}

    setTimeout(() => setJustVoted(null), 4000);
  };

  return (
    <div className="bg-white border-2 border-sky-100 rounded-2xl p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-2">
            <Clock className="w-3.5 h-3.5" /> Next Release: This Weekend
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>Vote on What I Code Next</span>
            <span className="text-lg">🛠️</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
            I deploy new calculators every weekend based on your votes. Vote for the tool you need most for school, work, or daily life!
          </p>
        </div>

        <Link
          href="/contact/?topic=suggestion"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 text-xs font-semibold transition-colors border border-slate-200 shrink-0 self-start md:self-auto"
        >
          <MessageSquarePlus className="w-4 h-4 text-slate-400" />
          <span>Need a different tool? Suggest it</span>
        </Link>
      </div>

      {justVoted && (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Thank you! Your vote was registered. I&apos;m coding this over the weekend—check back soon to use it!
          </span>
        </div>
      )}

      {/* Voting list */}
      <div className="divide-y divide-slate-100 mt-2">
        {items.map(item => {
          const hasVoted = votedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 p-2 rounded-xl transition-colors"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm sm:text-base text-slate-900">
                    {item.title}
                  </h3>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span className="text-xs font-bold text-slate-700">
                  {item.votes} votes
                </span>
                <button
                  type="button"
                  onClick={() => handleVote(item.id)}
                  disabled={hasVoted}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    hasVoted
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 cursor-default'
                      : 'bg-white hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 border-slate-200 text-slate-700 shadow-2xs active:scale-95'
                  }`}
                >
                  {hasVoted ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Voted!</span>
                    </>
                  ) : (
                    <>
                      <ThumbsUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600" />
                      <span>Vote</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Built with pride by an independent student developer
        </span>
        <span className="italic">
          Votes update development priorities every Friday evening
        </span>
      </div>
    </div>
  );
};
