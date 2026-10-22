import React from 'react';
import {
  Compass,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  GitBranch,
  Layers,
  ArrowRight,
  ExternalLink,
  Code2,
  FileCheck,
} from 'lucide-react';

interface FeaturesSectionProps {
  onExploreApp: (id: string) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onExploreApp }) => {
  return (
    <section className="py-16 sm:py-24 border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 mb-3">
            Built for Developers & Product Managers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Everything you need before writing your first OAuth request
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Most OAuth integrations fail in production not because of API syntax, but because of unexpected compliance gates, restricted scope audits, and ambiguous token lifecycles.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Setup Guidance */}
          <div className="relative flex flex-col rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-6">
              <Compass className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold text-white mb-3">
              Step-by-Step Setup Guidance
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Actionable blueprints detailing exact developer console URLs, required redirect URIs, OAuth 2.0 endpoints, and code snippets for PKCE exchange and token refresh.
            </p>

            <ul className="space-y-3 text-xs text-slate-400 mb-6 mt-auto">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>Verified endpoints and HTTP Basic Auth nuances</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>Copy-paste redirect URI strings and scope definitions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>Interactive checklist to track implementation progress</span>
              </li>
            </ul>

            <button
              onClick={() => onExploreApp('slack')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition"
            >
              <span>See Slack Setup Blueprint</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Pillar 2: Approval Readiness */}
          <div className="relative flex flex-col rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-6">
              <ShieldAlert className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold text-white mb-3">
              Approval Readiness & Timelines
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Never get blindsided by 4-week compliance delays. We clearly distinguish 3 hours of hands-on developer code from weeks in Google Trust & Safety or CASA Tier 2 security review queues.
            </p>

            <ul className="space-y-3 text-xs text-slate-400 mb-6 mt-auto">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Identifies $540 – $4,500 external security audit costs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Prevents the #1 blocker: "Unverified App" 403 screens</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Domain DNS TXT and YouTube demo video requirements</span>
              </li>
            </ul>

            <button
              onClick={() => onExploreApp('gmail')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
            >
              <span>Inspect Gmail CASA Review Gate</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Pillar 3: AI-Powered Research */}
          <div className="relative flex flex-col rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6">
              <Sparkles className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold text-white mb-3">
              Live AI-Powered Research
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Working with a niche or emerging developer platform? Enter any app name or API documentation URL. Gemini extracts token endpoints, common gotchas, and real-time grounding citations.
            </p>

            <ul className="space-y-3 text-xs text-slate-400 mb-6 mt-auto">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Grounded with live Google Search citations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Transparent evidence status for every single finding</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Full Developer vs Agent RACI responsibility split</span>
              </li>
            </ul>

            <button
              onClick={() => onExploreApp('notion')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
            >
              <span>View Notion Page-Level Model</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Composio APM Product Angle Callout */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-purple-950/60 border border-indigo-500/30 p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
                <Layers className="h-4 w-4" /> The Composio Advantage (Product Perspective)
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Why build custom OAuth infrastructure for 200+ SaaS apps?
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Every OAuth provider invents its own quirks: Slack splits bot vs user tokens, Notion demands Basic Auth headers, and Google blocks users behind CASA security reviews. Composio abstracts away this multi-week engineering overhead into a single unified client.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="https://composio.dev"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-3 text-sm shadow-lg shadow-indigo-600/30 transition"
              >
                <span>Visit Composio.dev</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
