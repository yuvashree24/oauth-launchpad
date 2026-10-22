import React, { useState, useEffect } from 'react';
import { Sparkles, Search, ShieldCheck, Code2, CheckCircle2, Layers } from 'lucide-react';

interface LiveResearchLoaderProps {
  query: string;
}

export const LiveResearchLoader: React.FC<LiveResearchLoaderProps> = ({ query }) => {
  const steps = [
    { title: 'Connecting to Google Search Grounding', desc: `Searching official developer portals for "${query}"` },
    { title: 'Analyzing OAuth 2.0 Auth Protocol', desc: 'Extracting authorization URLs, token endpoints, and PKCE requirements' },
    { title: 'Evaluating Approval Tiers & Blocker Risks', desc: 'Checking app review queues, restricted scopes, and CASA audit triggers' },
    { title: 'Constructing Human vs Agent RACI Split', desc: 'Delineating manual developer console steps from automated token logic' },
    { title: 'Verifying Evidence & Source Citations', desc: 'Correlating retrieved documentation URLs and evidence status' },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-2xl text-center">
        {/* Animated Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-6 relative">
          <Sparkles className="h-8 w-8 animate-spin text-indigo-400" />
          <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-xl animate-pulse" />
        </div>

        <h3 className="text-xl font-extrabold text-white mb-2">
          Researching OAuth Architecture for "{query}"
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto mb-8">
          Performing real-time documentation retrieval. Grounding findings in official developer documentation.
        </p>

        {/* Pipeline Step List */}
        <div className="space-y-3.5 text-left border-t border-slate-800/80 pt-6">
          {steps.map((s, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={idx}
                className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                  isCurrent
                    ? 'bg-indigo-950/40 border border-indigo-500/30'
                    : isCompleted
                    ? 'opacity-70'
                    : 'opacity-40'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <div className="h-4 w-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-slate-700" />
                  )}
                </div>

                <div>
                  <h4
                    className={`text-xs font-bold ${
                      isCurrent ? 'text-indigo-300' : 'text-slate-300'
                    }`}
                  >
                    {s.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
