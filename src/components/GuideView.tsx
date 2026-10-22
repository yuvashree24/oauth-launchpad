import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Check,
  Copy,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Terminal,
  ExternalLink,
  Code2,
  FileCheck,
  CheckCircle2,
  Info,
  Layers,
  Sparkles,
  Download,
  BookOpen,
  UserCheck,
  Bot,
  AlertCircle,
  HelpCircle,
  Sliders,
  Network,
  ShieldAlert,
  Building2,
} from 'lucide-react';
import { OAuthGuide, EvidenceStatus } from '../types/guide';

interface GuideViewProps {
  guide: OAuthGuide;
  onBack: () => void;
  onOpenExport: () => void;
}

export const renderEvidenceBadge = (status: EvidenceStatus) => {
  switch (status) {
    case 'VERIFIED':
      return (
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
          title="Directly supported by official provider documentation"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          VERIFIED
        </span>
      );
    case 'ESTIMATE':
      return (
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-sky-500/10 border border-sky-500/30 text-sky-400"
          title="Our estimate, not promised or guaranteed by the provider"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          ESTIMATE
        </span>
      );
    case 'CONDITIONAL':
      return (
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-amber-500/10 border border-amber-500/30 text-amber-400"
          title="Depends on scopes, app type, user type, distribution model, or provider policy"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          CONDITIONAL
        </span>
      );
    case 'UNVERIFIED':
    default:
      return (
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-rose-500/10 border border-rose-500/30 text-rose-400"
          title="Could not be confirmed from an authoritative source"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
          UNVERIFIED
        </span>
      );
  }
};

export const GuideView: React.FC<GuideViewProps> = ({ guide, onBack, onOpenExport }) => {
  const [activeTab, setActiveTab] = useState<
    'factors' | 'checklist' | 'approval' | 'blockers' | 'raci' | 'evidence'
  >('factors');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [shareCopied, setShareCopied] = useState(false);
  const [evidenceCategoryFilter, setEvidenceCategoryFilter] = useState<string>('ALL');

  const renderCategoryBadge = (category: string) => {
    switch (category) {
      case 'Provider-Specific Evidence':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-sky-500/10 border border-sky-500/30 text-sky-300">
            <Building2 className="h-3 w-3 text-sky-400" />
            <span>Provider-Specific Evidence</span>
          </span>
        );
      case 'General OAuth Standards':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
            <BookOpen className="h-3 w-3 text-indigo-400" />
            <span>General OAuth Standards</span>
          </span>
        );
      case 'Product Estimates':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300">
            <Clock className="h-3 w-3 text-amber-400" />
            <span>Product Estimates</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-800 border border-slate-700 text-slate-300">
            <span>{category}</span>
          </span>
        );
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  const totalSteps = guide.checklist.length;
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Low':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'High':
      case 'Extreme':
      default:
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Top Banner & Breadcrumb */}
      <div className="border-b border-slate-800/80 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to all guides</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenExport}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export (Markdown / JIRA)</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs sm:text-sm font-medium text-white shadow-sm transition cursor-pointer"
              >
                {shareCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share Guide</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Guide Header */}
      <div className="border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950 pt-8 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  {guide.category}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">{guide.provider}</span>
                {guide.isAiGenerated && (
                  <>
                    <span className="text-slate-600">•</span>
                    {guide.isLiveGrounding ? (
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-semibold text-emerald-300"
                        title={guide.researchMechanism || 'Live Google Search Grounding with web retrieval'}
                      >
                        <Sparkles className="h-3 w-3 text-emerald-400" />
                        <span>Live Grounded</span>
                      </span>
                    ) : (
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-semibold text-amber-300"
                        title={guide.researchMechanism || 'AI synthesized with authoritative developer knowledge'}
                      >
                        <ShieldAlert className="h-3 w-3 text-amber-400" />
                        <span>AI Generated — Verification Required</span>
                      </span>
                    )}
                  </>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {guide.name} OAuth Integration Guide
              </h1>
              <p className="mt-2 text-base text-slate-300 max-w-3xl leading-relaxed">
                {guide.tagline}
              </p>
            </div>

            {/* Quick Metadata Box */}
            <div className="flex flex-wrap items-center gap-3">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold ${getDifficultyColor(
                  guide.difficulty
                )}`}
              >
                <span>{guide.difficulty} Setup Difficulty</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm font-medium text-slate-300">
                <Code2 className="h-4 w-4 text-indigo-400" />
                <span>{guide.authProtocol}</span>
              </div>
            </div>
          </div>

          {/* VISIBLE DISCLAIMER BANNER (Requirement 9) */}
          <div className="mt-6 rounded-xl bg-slate-900/90 border border-amber-500/30 p-4 flex items-start gap-3 shadow-md">
            <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-amber-300 uppercase tracking-wide mr-1.5">
                Evidence & Regulatory Notice:
              </span>
              <span>
                {guide.disclaimerText ||
                  'Provider requirements change. Verified findings are based on the linked official documentation; estimates are planning guidance, not provider guarantees.'}
              </span>
            </div>
          </div>

          {/* DUAL TIMELINE METRIC CARDS: DEV EFFORT vs APPROVAL WAITING TIME */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Card 1: Hands-on Dev Effort */}
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                        Estimated Hands-On Effort
                      </h3>
                      <p className="text-2xl font-black text-white">
                        {guide.handsOnEffort.label}
                      </p>
                    </div>
                  </div>
                  {renderEvidenceBadge(guide.handsOnEffort.evidenceStatus || 'ESTIMATE')}
                </div>

                <p className="text-xs text-slate-300 mt-2 mb-3 leading-relaxed">
                  {guide.handsOnEffort.basisNotes ||
                    'Estimated engineering time to configure console settings, write redirect URIs, implement PKCE exchange, and test tokens.'}
                </p>

                {/* Breakdown */}
                <div className="space-y-2 border-t border-slate-800 pt-3">
                  {guide.handsOnEffort.breakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between gap-3 text-xs"
                    >
                      <span className="text-slate-300">{item.task}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono font-semibold text-sky-300">
                          {item.hours}
                        </span>
                        {item.status && (
                          <span className="text-[10px] text-slate-400">
                            ({item.status})
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Approval Waiting Time (DISTINGUISHED & LABELED ESTIMATE) */}
            <div className="rounded-2xl bg-amber-950/20 border border-amber-500/30 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                        Approval Waiting Time
                      </h3>
                      <p className="text-2xl font-black text-amber-200">
                        {guide.approvalWaitTime.timeline}
                      </p>
                    </div>
                  </div>
                  {renderEvidenceBadge(guide.approvalWaitTime.evidenceStatus || 'ESTIMATE')}
                </div>

                {/* Crucial distinction callout */}
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 my-3">
                  <p className="text-xs font-semibold text-amber-300 flex items-start gap-1.5">
                    <Info className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />
                    <span>{guide.approvalWaitTime.distinctionNotice}</span>
                  </p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {guide.approvalWaitTime.basisNotes}
                </p>

                {guide.approvalWaitTime.estimatedCost && (
                  <div className="flex items-center justify-between text-xs pt-3 mt-2 border-t border-amber-500/20 text-slate-300">
                    <span className="text-slate-400">Security Assessment Cost:</span>
                    <span className="font-semibold text-amber-300">
                      {guide.approvalWaitTime.estimatedCost}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* COMPOSIO FAST-PATH COMPARISON CALLOUT */}
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-500/40 p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Composio Fast-Path: Simplify Complex Multi-Week OAuth</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {guide.composioAdvantage.timeWithComposio}
                  </span>
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  {guide.composioAdvantage.benefitSummary}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center shrink-0">
              <span className="text-xs font-mono text-slate-400">
                {guide.composioAdvantage.linesOfCode}
              </span>
              <a
                href="https://composio.dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition cursor-pointer"
              >
                <span>Use Composio</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-16 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-3 no-scrollbar">
            <button
              onClick={() => setActiveTab('factors')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer shrink-0 ${
                activeTab === 'factors'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sliders className="h-4 w-4" />
              <span>What Changes the Answer?</span>
              <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-slate-800 text-slate-300">
                {guide.whatChangesTheAnswer?.length || 5}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('checklist')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer shrink-0 ${
                activeTab === 'checklist'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileCheck className="h-4 w-4" />
              <span>Checklist & Code</span>
              <span
                className={`ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                  activeTab === 'checklist'
                    ? 'bg-indigo-800 text-indigo-100'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {completedCount}/{totalSteps}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('approval')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer shrink-0 ${
                activeTab === 'approval'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Approval Timeline & Scopes</span>
            </button>

            <button
              onClick={() => setActiveTab('blockers')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer shrink-0 ${
                activeTab === 'blockers'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <AlertCircle className="h-4 w-4" />
              <span>Common Blockers</span>
              <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-slate-800 text-slate-400">
                {guide.blockers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('raci')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer shrink-0 ${
                activeTab === 'raci'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <UserCheck className="h-4 w-4" />
              <span>RACI Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab('evidence')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer shrink-0 ${
                activeTab === 'evidence'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Evidence & Confidence</span>
              <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-slate-800 text-slate-400">
                {guide.evidenceFindings?.length || guide.evidenceSources.length}
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {/* TAB 0: WHAT CHANGES THE ANSWER? (Requirement 6 & 5) */}
        {activeTab === 'factors' && (
          <div className="space-y-8">
            {/* Header intro */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
              <div className="flex items-center gap-2.5 mb-2">
                <Sliders className="h-5 w-5 text-indigo-400" />
                <h3 className="text-xl font-bold text-white">
                  What Changes the Answer?
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                OAuth requirements are rarely one-size-fits-all. The implementation complexity, approval waiting time, and security audit obligations depend directly on these five environmental factors:
              </p>
            </div>

            {/* Context Factors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(guide.whatChangesTheAnswer || []).map((factor, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">
                        {factor.factor}
                      </span>
                      {renderEvidenceBadge('CONDITIONAL')}
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2">
                      {factor.summary}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {factor.impact}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Flow Variants Section (Requirement 5) */}
            {guide.flowVariants && guide.flowVariants.length > 0 && (
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
                <div className="flex items-center gap-2.5 mb-4">
                  <Network className="h-5 w-5 text-indigo-400" />
                  <h3 className="text-lg font-bold text-white">
                    Supported Architecture Flows by Application Type
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Do not assume a web server flow applies universally. Different client architectures enforce distinct credential security and redirect URI constraints:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {guide.flowVariants.map((flow, fIdx) => (
                    <div
                      key={fIdx}
                      className="rounded-xl bg-slate-950 p-4 border border-slate-800/80 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-indigo-300">
                          {flow.appType}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          {flow.flowName}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                        <div>
                          <span className="text-slate-500 block">Client Secret:</span>
                          <span
                            className={`font-semibold ${
                              flow.clientSecretRequired
                                ? 'text-amber-400'
                                : 'text-emerald-400'
                            }`}
                          >
                            {flow.clientSecretRequired
                              ? 'Required (Confidential)'
                              : 'Not Allowed (Public/PKCE)'}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">PKCE:</span>
                          <span
                            className={`font-semibold ${
                              flow.pkceRequired
                                ? 'text-emerald-400'
                                : 'text-slate-400'
                            }`}
                          >
                            {flow.pkceRequired ? 'Mandatory (S256)' : 'Optional / Server-side'}
                          </span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <span className="text-slate-500 block">Redirect URI Rules:</span>
                        <p className="text-slate-300 font-mono text-[11px] mt-0.5">
                          {flow.redirectUriRules}
                        </p>
                      </div>
                      <div className="pt-1 text-slate-400">
                        {flow.notes}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 1: CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="space-y-6">
            {/* Progress Bar Header */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Integration Launch Checklist
                  </h3>
                  <p className="text-xs text-slate-400">
                    Check off steps as you complete them in your developer console and codebase.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-indigo-400 font-mono">
                    {progressPercent}% Complete
                  </span>
                  <div className="w-32 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-4">
              {guide.checklist.map((step, index) => {
                const isChecked = Boolean(completedSteps[step.id]);
                return (
                  <div
                    key={step.id}
                    className={`rounded-2xl border transition-all p-5 sm:p-6 ${
                      isChecked
                        ? 'bg-slate-900/40 border-slate-800/60 opacity-80'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-lg'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleStep(step.id)}
                        className={`mt-1 h-6 w-6 rounded-lg flex items-center justify-center transition shrink-0 cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-600 text-white'
                            : 'border-2 border-slate-600 hover:border-indigo-400 bg-slate-950 text-transparent'
                        }`}
                        title="Toggle completed"
                      >
                        <Check className="h-4 w-4" />
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-xs font-mono font-bold text-slate-400">
                            STEP {index + 1}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-xs font-medium text-indigo-400">
                            {step.phase}
                          </span>
                          <span className="text-slate-600">•</span>

                          {/* Evidence Status Label */}
                          {renderEvidenceBadge(step.evidenceStatus || 'VERIFIED')}

                          <span className="text-slate-600">•</span>

                          {/* Actor Badge: Developer vs Agent */}
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              step.actor === 'developer'
                                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                                : step.actor === 'agent'
                                ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                                : 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                            }`}
                          >
                            {step.actor === 'developer' ? (
                              <UserCheck className="h-3 w-3" />
                            ) : (
                              <Bot className="h-3 w-3" />
                            )}
                            {step.actorLabel}
                          </span>
                        </div>

                        <h4
                          className={`text-base font-bold text-white mb-2 ${
                            isChecked ? 'line-through text-slate-400' : ''
                          }`}
                        >
                          {step.title}
                        </h4>

                        <p className="text-sm text-slate-300 leading-relaxed mb-3">
                          {step.description}
                        </p>

                        {/* Details bullets */}
                        {step.details && step.details.length > 0 && (
                          <ul className="mb-4 space-y-1.5 text-xs text-slate-400 list-disc list-inside">
                            {step.details.map((d, dIdx) => (
                              <li key={dIdx} className="leading-relaxed">
                                {d}
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Code snippet if present */}
                        {step.snippet && (
                          <div className="mt-3 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
                              <span className="font-semibold text-slate-300">
                                {step.snippet.label}
                              </span>
                              <button
                                onClick={() =>
                                  handleCopy(step.snippet!.code, `snippet-${step.id}`)
                                }
                                className="inline-flex items-center gap-1 hover:text-white transition cursor-pointer"
                              >
                                {copiedText === `snippet-${step.id}` ? (
                                  <>
                                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                                    <span className="text-emerald-400">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3.5 w-3.5" />
                                    <span>Copy Code</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="p-3 text-xs font-mono text-indigo-200 overflow-x-auto leading-relaxed">
                              {step.snippet.code}
                            </pre>
                          </div>
                        )}

                        {/* External links */}
                        {step.links && step.links.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {step.links.map((link, lIdx) => (
                              <a
                                key={lIdx}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                              >
                                <span>{link.title}</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: APPROVAL & COMPLIANCE */}
        {activeTab === 'approval' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
              <div className="flex items-center justify-between gap-4 mb-2">
                <h3 className="text-xl font-bold text-white">
                  Approval Lifecycle & Review Tiers
                </h3>
                {renderEvidenceBadge(guide.approvalWaitTime.evidenceStatus || 'ESTIMATE')}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                Notice: Providers do not guarantee review turnaround SLAs. Below are estimated calendar times for external review queues, distinguished from internal self-service capabilities.
              </p>

              {/* Stages Timeline */}
              <div className="mt-8 relative border-l-2 border-indigo-500/30 pl-6 ml-3 space-y-8">
                {guide.approvalWaitTime.stages.map((stage, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-slate-950 border-2 border-indigo-400" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white">
                          {stage.stage}
                        </h4>
                        {renderEvidenceBadge(stage.durationStatus || 'ESTIMATE')}
                      </div>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-300 font-mono">
                        <Clock className="h-3 w-3" /> {stage.duration}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {stage.details}
                    </p>

                    <div className="mt-2 text-xs text-slate-400">
                      <span className="text-indigo-400 font-semibold">Required For: </span>
                      {stage.requiredFor}
                    </div>

                    {stage.conditionNote && (
                      <div className="mt-1 text-xs text-amber-400/90 italic">
                        Condition Note: {stage.conditionNote}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Scopes Table */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">
                Permission Scopes & Verification Impact
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-3 font-semibold">Scope Identifier</th>
                      <th className="pb-3 font-semibold">Description</th>
                      <th className="pb-3 font-semibold">Verification Impact</th>
                      <th className="pb-3 font-semibold text-right">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {guide.recommendedScopes.map((scope, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30 transition">
                        <td className="py-3 text-indigo-300 font-medium break-all">
                          {scope.scope}
                        </td>
                        <td className="py-3 text-slate-300 font-sans">
                          {scope.description}
                        </td>
                        <td className="py-3 text-slate-400 font-sans text-xs">
                          {scope.verificationImpact}
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                              scope.riskLevel === 'Restricted'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : scope.riskLevel === 'Sensitive'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {scope.riskLevel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COMMON BLOCKERS */}
        {activeTab === 'blockers' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2">
                Common Blockers & Resolutions
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Documented gotchas and failure modes observed across developer integrations.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {guide.blockers.map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      <AlertCircle
                        className={`h-5 w-5 shrink-0 ${
                          b.severity === 'critical'
                            ? 'text-rose-400'
                            : b.severity === 'high'
                            ? 'text-amber-400'
                            : 'text-indigo-400'
                        }`}
                      />
                      <span>{b.title}</span>
                    </h4>

                    <div className="flex items-center gap-2">
                      {renderEvidenceBadge(b.evidenceStatus || 'VERIFIED')}
                      <span
                        className={`text-xs uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                          b.severity === 'critical'
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                            : b.severity === 'high'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                            : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                        }`}
                      >
                        {b.severity}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    {/* Symptom & Root Cause */}
                    <div className="space-y-3">
                      <div className="rounded-xl bg-slate-950 p-3.5 border border-slate-800/80">
                        <span className="font-semibold text-rose-400 block mb-1">
                          Visible Symptom:
                        </span>
                        <p className="text-slate-300 leading-relaxed font-mono text-xs">
                          {b.symptom}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-950 p-3.5 border border-slate-800/80">
                        <span className="font-semibold text-amber-400 block mb-1">
                          Underlying Root Cause:
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {b.rootCause}
                        </p>
                      </div>
                    </div>

                    {/* Actionable Resolution */}
                    <div className="rounded-xl bg-emerald-950/20 border border-emerald-500/30 p-4 flex flex-col justify-between">
                      <div>
                        <span className="font-semibold text-emerald-300 block mb-1.5 flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" /> Recommended Resolution:
                        </span>
                        <p className="text-slate-200 leading-relaxed text-xs sm:text-sm">
                          {b.resolution}
                        </p>
                      </div>

                      {b.affectedScopes && b.affectedScopes.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-emerald-500/20 text-xs text-slate-400">
                          <span className="text-emerald-400 font-semibold">
                            Affected Scopes:{' '}
                          </span>
                          <span className="font-mono text-slate-300">
                            {b.affectedScopes.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RACI (DEVELOPER VS AGENT) */}
        {activeTab === 'raci' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2">
                Human-in-the-Loop vs AI Agent RACI Matrix
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                What a human developer must handle versus what an automated agent or tool suite can reliably execute.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400">
                      <th className="py-3.5 px-4 font-semibold">Integration Task</th>
                      <th className="py-3.5 px-4 font-semibold text-amber-300">
                        Developer (Human-in-the-Loop)
                      </th>
                      <th className="py-3.5 px-4 font-semibold text-indigo-300">
                        AI Agent / System
                      </th>
                      <th className="py-3.5 px-4 font-semibold">Architecture Rationale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-sans">
                    {guide.raci.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition">
                        <td className="py-3.5 px-4 font-bold text-white align-top">
                          {item.task}
                          <span className="block text-[11px] font-normal text-slate-500 mt-0.5">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-amber-200/90 align-top">
                          <div className="flex items-start gap-1.5">
                            <UserCheck className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>{item.developerRole}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-indigo-200/90 align-top">
                          <div className="flex items-start gap-1.5">
                            <Bot className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                            <span>{item.agentRole}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 text-xs align-top">
                          {item.rationale}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: EVIDENCE & CONFIDENCE (Requirement 7 & 1) */}
        {activeTab === 'evidence' && (
          <div className="space-y-8">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2">
                Evidence & Confidence Audit Table
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl mb-4">
                Every technical specification in this guide is evaluated against official first-party documentation.
              </p>

              {/* Four labels legend */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-800 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  {renderEvidenceBadge('VERIFIED')}
                  <p className="text-slate-400 mt-1.5 text-[11px]">
                    Directly supported by official provider documentation.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  {renderEvidenceBadge('ESTIMATE')}
                  <p className="text-slate-400 mt-1.5 text-[11px]">
                    Our estimate, not promised or guaranteed by the provider.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  {renderEvidenceBadge('CONDITIONAL')}
                  <p className="text-slate-400 mt-1.5 text-[11px]">
                    Depends on scopes, app type, user type, distribution, or policy.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  {renderEvidenceBadge('UNVERIFIED')}
                  <p className="text-slate-400 mt-1.5 text-[11px]">
                    Could not be confirmed from an authoritative source.
                  </p>
                </div>
              </div>
            </div>

            {/* Finding | Category | Status | Source | Last checked Table (Requirement 3 & 7) */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
              <div className="px-6 py-5 border-b border-slate-800 bg-slate-950/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-indigo-400" />
                    <span>Evidence & Confidence Audit Table</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Clearly distinguishes Provider-Specific Evidence, General OAuth Standards (RFCs), and Product Estimates.
                  </p>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                  {[
                    { id: 'ALL', label: 'All Findings', count: (guide.evidenceFindings || []).length },
                    {
                      id: 'Provider-Specific Evidence',
                      label: 'Provider-Specific',
                      count: (guide.evidenceFindings || []).filter(
                        (f) => f.category === 'Provider-Specific Evidence'
                      ).length,
                    },
                    {
                      id: 'General OAuth Standards',
                      label: 'OAuth Standards',
                      count: (guide.evidenceFindings || []).filter(
                        (f) => f.category === 'General OAuth Standards'
                      ).length,
                    },
                    {
                      id: 'Product Estimates',
                      label: 'Product Estimates',
                      count: (guide.evidenceFindings || []).filter(
                        (f) => f.category === 'Product Estimates'
                      ).length,
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setEvidenceCategoryFilter(tab.id)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                        evidenceCategoryFilter === tab.id
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          evidenceCategoryFilter === tab.id
                            ? 'bg-indigo-800/80 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Distinction Notice Banner */}
              <div className="px-6 py-3 bg-slate-950/40 border-b border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="flex items-start gap-2 text-slate-300">
                  <Building2 className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sky-300 block">Provider-Specific Evidence</span>
                    <span className="text-slate-400 text-[11px] leading-tight">
                      Supported directly by official {guide.name} developer documentation and APIs.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-slate-300">
                  <BookOpen className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-indigo-300 block">General OAuth Standards</span>
                    <span className="text-slate-400 text-[11px] leading-tight">
                      IETF RFC specifications (RFC 6749, RFC 7636). Universal protocol standards, not proof of provider-specific behavior.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-slate-300">
                  <Clock className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300 block">Product Estimates</span>
                    <span className="text-slate-400 text-[11px] leading-tight">
                      Hands-on engineering hours, queue turnaround, and cost benchmarks. Never guaranteed by providers.
                    </span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-mono text-xs uppercase">
                      <th className="py-3.5 px-4 font-semibold">Finding & Basis</th>
                      <th className="py-3.5 px-4 font-semibold">Category</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold">Source</th>
                      <th className="py-3.5 px-4 font-semibold">Last Checked</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {(guide.evidenceFindings || [])
                      .filter(
                        (finding) =>
                          evidenceCategoryFilter === 'ALL' ||
                          finding.category === evidenceCategoryFilter
                      )
                      .map((finding, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40 transition">
                          <td className="py-3.5 px-4 align-top text-white font-medium max-w-sm">
                            <span className="block">{finding.finding}</span>
                            {finding.basisOrNotes && (
                              <span className="block text-xs font-normal text-slate-400 mt-1 leading-relaxed">
                                {finding.basisOrNotes}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 align-top shrink-0">
                            {renderCategoryBadge(finding.category)}
                          </td>
                          <td className="py-3.5 px-4 align-top shrink-0">
                            {renderEvidenceBadge(finding.status)}
                          </td>
                          <td className="py-3.5 px-4 align-top">
                            <a
                              href={finding.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-semibold"
                            >
                              <span>{finding.sourceTitle}</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </td>
                          <td className="py-3.5 px-4 align-top font-mono text-slate-400 text-xs shrink-0">
                            {finding.lastChecked}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Official Primary Sources Section (Requirement 3) */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
              <h4 className="text-base font-bold text-white">
                First-Party Provider Documentation Sources
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {guide.evidenceSources.map((source, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-bold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1.5"
                      >
                        <span>{source.title}</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <p className="text-xs text-slate-300 mt-1">
                        {source.verifiedFact}
                      </p>
                      {source.quoteOrSnippet && (
                        <p className="text-xs text-slate-500 italic mt-1">
                          "{source.quoteOrSnippet}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                      {renderEvidenceBadge(source.status)}
                      <span className="text-[11px] font-mono text-slate-500">
                        {source.lastChecked}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
