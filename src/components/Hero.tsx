import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, ShieldCheck, Clock, Terminal } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, isLoading }) => {
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal.trim());
    }
  };

  const quickPills = [
    { label: 'Gmail', query: 'Gmail' },
    { label: 'Slack', query: 'Slack' },
    { label: 'Notion', query: 'Notion' },
    { label: 'Linear', query: 'Linear' },
    { label: 'Salesforce', query: 'Salesforce' },
    { label: 'HubSpot', query: 'HubSpot' },
    { label: 'Stripe', query: 'Stripe' },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950">
      {/* Background subtle glow grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Composio APM Take-Home Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1.5 text-xs font-medium text-indigo-300 shadow-sm shadow-indigo-900/20 mb-8 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
          <span>Composio APM Product Assignment</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">Live AI Research & Grounding</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Get your OAuth integration <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-200">launch-ready</span>.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Understand setup requirements, approval timelines, and blockers before you start.
        </p>

        {/* Search Field */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 mx-auto max-w-2xl relative flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl shadow-indigo-950/40 focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 transition backdrop-blur-md"
        >
          <div className="relative flex-1 w-full flex items-center pl-3">
            <Search className="h-5 w-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search app or enter website URL (e.g. Linear, Jira, salesforce.com)..."
              className="w-full bg-transparent px-3 py-2 text-white placeholder-slate-400 focus:outline-none text-sm sm:text-base"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !inputVal.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-6 py-3 text-sm shadow-md shadow-indigo-600/30 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
          >
            {isLoading ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin text-indigo-200" />
                <span>Researching Docs...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-indigo-200" />
                <span>Generate Guide</span>
              </>
            )}
          </button>
        </form>

        {/* Suggestion Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span className="text-slate-500 font-medium mr-1">Popular apps:</span>
          {quickPills.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setInputVal(p.query);
                onSearch(p.query);
              }}
              className="rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:text-white px-2.5 py-1 text-slate-300 border border-slate-700/60 transition cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Value Micro-Metrics */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-800/60 text-left">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">Dev Time vs Queue Time</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Clearly separates 3 hours of code from 4 weeks of compliance review.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">Blockers & CASA Audits</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Highlights $540+ Tier 2 audits, unverified app screens, and domain DNS traps.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">Human vs Agent RACI</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Explicitly delineates human console tasks from automatable token logic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
