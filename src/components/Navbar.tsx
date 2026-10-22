import React, { useState } from 'react';
import {
  KeyRound,
  Sparkles,
  Info,
  Share2,
  Check,
  Search,
  ExternalLink,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface NavbarProps {
  onNavigateHome: () => void;
  onOpenApmBrief: () => void;
  onSelectApp: (id: string) => void;
  onOpenQuickSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onOpenApmBrief,
  onSelectApp,
  onOpenQuickSearch,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).catch(() => {
        try {
          const ta = document.createElement('textarea');
          ta.value = url;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.focus();
          ta.select();
          document.execCommand('copy');
          ta.remove();
        } catch (e) {
          console.warn('Fallback copy failed', e);
        }
      });
    } else {
      try {
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        ta.remove();
      } catch (e) {
        console.warn('Fallback copy failed', e);
      }
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-3 text-left transition hover:opacity-90 focus:outline-none"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25 ring-1 ring-white/20">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-base">
                  OAuth Launchpad
                </span>
                <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-500/30">
                  Composio APM
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Integration Readiness & Setup Intelligence
              </p>
            </div>
          </button>
        </div>

        {/* Center Quick Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectApp('gmail')}
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition"
          >
            Gmail Guide
          </button>
          <button
            onClick={() => onSelectApp('slack')}
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition"
          >
            Slack Guide
          </button>
          <button
            onClick={() => onSelectApp('notion')}
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition"
          >
            Notion Guide
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenQuickSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs sm:text-sm font-medium transition"
          >
            <Search className="h-4 w-4 text-slate-400" />
            <span className="hidden sm:inline">Search any app</span>
            <kbd className="hidden lg:inline rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={onOpenApmBrief}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-700/50 text-indigo-300 hover:bg-indigo-900/60 hover:text-white text-xs sm:text-sm font-medium transition"
            title="View take-home assignment brief, architecture, and preview instructions"
          >
            <Info className="h-4 w-4 text-indigo-400" />
            <span>APM Brief</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-200 hover:bg-slate-700/80 hover:text-white text-xs sm:text-sm font-medium transition"
            title="Copy shareable link"
          >
            {copiedLink ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 text-slate-400" />
                <span className="hidden sm:inline">Share</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
