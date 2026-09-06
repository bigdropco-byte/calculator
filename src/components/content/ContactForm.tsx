'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'suggestion', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center space-y-3">
        <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
        <h2 className="text-lg font-bold text-emerald-950">Thank You for Your Feedback!</h2>
        <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
          Your message has been received. We review every calculator suggestion as we prioritize our development roadmap.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm({ name: '', email: '', subject: 'suggestion', message: '' });
          }}
          className="mt-2 text-xs font-semibold text-emerald-800 underline"
        >
          Submit another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4 shadow-2xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Your Name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm sm:text-base text-slate-900 focus:bg-white"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm sm:text-base text-slate-900 focus:bg-white"
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          Topic
        </label>
        <select
          value={form.subject}
          onChange={e => setForm({ ...form, subject: e.target.value })}
          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm sm:text-base text-slate-900 focus:bg-white cursor-pointer"
        >
          <option value="suggestion">Request a New Calculator</option>
          <option value="bug">Report a Calculation / Formula Issue</option>
          <option value="partnership">Partnership or Feedback</option>
          <option value="other">Other Inquiry</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          Message &amp; Formula Details
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          placeholder="Describe the calculator you need, its standard inputs, expected outputs, or formulas..."
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm sm:text-base text-slate-900 focus:bg-white resize-y"
        />
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white rounded-lg text-sm font-semibold transition-colors shadow-2xs"
      >
        <Send className="w-4 h-4" /> Send Message
      </button>
    </form>
  );
};
