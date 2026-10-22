import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles, ExternalLink, ShieldAlert, Clock } from 'lucide-react';
import { getAllGuides } from '../utils/storage';
import { OAuthGuide } from '../types/guide';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGuide: (id: string) => void;
  onGenerateGuide: (query: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectGuide,
  onGenerateGuide,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const allGuides = Object.values(getAllGuides());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle handled outside
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = allGuides.filter((g) =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.overview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden text-slate-100">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by app name, URL, or provider..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (filtered.length > 0) {
                  onSelectGuide(filtered[0].id);
                  onClose();
                } else if (searchTerm.trim()) {
                  onGenerateGuide(searchTerm.trim());
                  onClose();
                }
              }
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  onSelectGuide(g.id);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-slate-800/80 transition flex items-center justify-between group cursor-pointer"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm group-hover:text-indigo-300">
                      {g.name}
                    </span>
                    <span className="text-xs text-slate-400">• {g.provider}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                      {g.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {g.tagline}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition shrink-0" />
              </button>
            ))
          ) : (
            <div className="p-6 text-center">
              <p className="text-sm text-slate-400 mb-4">
                No pre-built guide found for "{searchTerm}".
              </p>
              <button
                onClick={() => {
                  if (searchTerm.trim()) {
                    onGenerateGuide(searchTerm.trim());
                    onClose();
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-indigo-200" />
                <span>Generate Live AI Guide for "{searchTerm}"</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Helper Bar */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Press Enter to select or research</span>
          <span>Powered by Google Search Grounding</span>
        </div>
      </div>
    </div>
  );
};
