import React from 'react';
import { X, CheckCircle2, Layers, ShieldCheck, Sparkles, Terminal, ExternalLink } from 'lucide-react';

interface ApmBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApmBriefModal: React.FC<ApmBriefModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Take-Home Assignment Brief & Product Architecture
            </span>
            <h2 className="text-2xl font-black text-white">
              OAuth Launchpad — Composio APM
            </h2>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          {/* Executive Summary */}
          <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-1">
              Core Problem Solved
            </h3>
            <p className="text-xs text-slate-300">
              OAuth integrations are the #1 source of developer onboarding friction in SaaS and AI agent tool suites. Developers mistakenly expect "an afternoon of coding", only to hit weeks of compliance delays, $500+ CASA security audits, domain verification roadblocks, and obscure token lifetime bugs. OAuth Launchpad gives developers and PMs immediate visibility into real engineering effort, external approval queues, and blockers before writing a line of code.
            </p>
          </div>

          {/* Key Product Decisions for the APM Role */}
          <div>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              Strategic Product Decisions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-indigo-300 block mb-1">
                  1. The Dual-Timeline Paradigm
                </span>
                <p className="text-slate-400">
                  Separates hands-on dev effort (e.g. 3 hours) from approval waiting time (e.g. 4 weeks). Eliminates sprint estimation failures.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-emerald-300 block mb-1">
                  2. Human vs Agent RACI Matrix
                </span>
                <p className="text-slate-400">
                  Clearly defines what AI tools can automate (PKCE, token refresh) vs what humans must complete (legal console agreements, demo videos).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-amber-300 block mb-1">
                  3. Grounded AI Research
                </span>
                <p className="text-slate-400">
                  Powered by Gemini 3.8 Flash with Google Search grounding. Extracts verified token URLs and evidence statuses without hallucinating tested setups.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-purple-300 block mb-1">
                  4. Composio Fast-Path Positioning
                </span>
                <p className="text-slate-400">
                  Directly demonstrates how Composio's pre-configured tools convert high-friction OAuth setups into 3 lines of code.
                </p>
              </div>
            </div>
          </div>

          {/* How to Preview and Run */}
          <div className="rounded-xl bg-indigo-950/30 border border-indigo-500/20 p-4">
            <h3 className="text-sm font-bold text-indigo-300 mb-2 flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              How to Preview, Run, & Export
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
              <li>
                <span className="font-semibold text-white">Full-Stack Server:</span> Runs an Express backend on port 3000 with Vite middleware.
              </li>
              <li>
                <span className="font-semibold text-white">Live AI Research:</span> Enter any app or URL on the homepage. If a GEMINI_API_KEY secret is present, it uses live Google Search Grounding to extract fresh docs; if offline, it falls back to rich pre-researched guides.
              </li>
              <li>
                <span className="font-semibold text-white">Export:</span> Click the "Export" button on any guide to generate copyable Markdown or JIRA Sprint tickets.
              </li>
              <li>
                <span className="font-semibold text-white">Stable URL Sharing:</span> All guides support direct deep-linking via hash URLs (e.g. <code className="text-indigo-300">/#/guide/gmail</code>).
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition cursor-pointer"
          >
            Got it, explore app
          </button>
        </div>
      </div>
    </div>
  );
};
