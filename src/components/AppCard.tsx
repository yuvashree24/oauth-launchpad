import React from 'react';
import {
  Mail,
  MessageSquare,
  FileText,
  Clock,
  AlertTriangle,
  ArrowRight,
  Shield,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { OAuthGuide } from '../types/guide';

interface AppCardProps {
  guide: OAuthGuide;
  onSelect: (id: string) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ guide, onSelect }) => {
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Low':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          dot: 'bg-emerald-400',
          label: 'Low Difficulty',
        };
      case 'Medium':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          dot: 'bg-amber-400',
          label: 'Medium Difficulty',
        };
      case 'High':
      case 'Extreme':
      default:
        return {
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
          dot: 'bg-rose-400',
          label: `${difficulty} Difficulty`,
        };
    }
  };

  const badge = getDifficultyBadge(guide.difficulty);

  const renderIcon = () => {
    switch (guide.id) {
      case 'gmail':
        return <Mail className="h-6 w-6 text-red-400" />;
      case 'slack':
        return <MessageSquare className="h-6 w-6 text-emerald-400" />;
      case 'notion':
        return <FileText className="h-6 w-6 text-slate-200" />;
      default:
        return <Lock className="h-6 w-6 text-indigo-400" />;
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-7 shadow-lg shadow-slate-950/40 hover:border-indigo-500/60 hover:shadow-indigo-950/30 transition duration-300">
      {/* Top row: App identity & Difficulty */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-inner group-hover:scale-105 transition-transform">
              {renderIcon()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                {guide.name}
              </h3>
              <p className="text-xs text-slate-400">{guide.provider}</p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
            {badge.label}
          </span>
        </div>

        {/* Tagline / Description */}
        <p className="text-sm text-slate-300 leading-relaxed min-h-[3rem]">
          {guide.overview}
        </p>

        {/* Key Time Comparison Pill Box */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 rounded-xl bg-slate-950/60 p-3 border border-slate-800/80">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Clock className="h-3 w-3 text-sky-400" /> Dev Setup
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                ESTIMATE
              </span>
            </div>
            <p className="text-sm font-bold text-slate-100 mt-1">
              {guide.handsOnEffort.label}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3 text-amber-400" /> Approval
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {guide.approvalWaitTime.evidenceStatus || 'ESTIMATE'}
              </span>
            </div>
            <p className="text-sm font-bold text-amber-300 mt-1 line-clamp-1">
              {guide.approvalWaitTime.timeline}
            </p>
          </div>
        </div>

        {/* Highlights / Common Blocker Preview */}
        <div className="mt-4 pt-4 border-t border-slate-800/70">
          <div className="text-xs text-slate-400 flex items-start gap-2">
            <span className="text-rose-400 font-semibold shrink-0">Key Blocker:</span>
            <span className="line-clamp-2 text-slate-300">
              {guide.blockers[0]?.title || 'Review requirements apply'}
            </span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-6 pt-2">
        <button
          onClick={() => onSelect(guide.id)}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white font-semibold py-2.5 px-4 text-sm border border-slate-700/80 hover:border-indigo-500 shadow-sm transition group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 cursor-pointer"
        >
          <span>View Guide</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
