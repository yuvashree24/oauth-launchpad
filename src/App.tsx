import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AppCard } from './components/AppCard';
import { FeaturesSection } from './components/FeaturesSection';
import { GuideView } from './components/GuideView';
import { ApmBriefModal } from './components/ApmBriefModal';
import { ExportModal } from './components/ExportModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { LiveResearchLoader } from './components/LiveResearchLoader';
import { CURATED_GUIDES } from './data/curatedGuides';
import { getAllGuides, getGuideById, saveCustomGuide, fetchGuideFromServer } from './utils/storage';
import { buildDynamicGuide } from './utils/fallbackGuide';
import { OAuthGuide } from './types/guide';
import { Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function App() {
  const [currentGuideId, setCurrentGuideId] = useState<string | null>(null);
  const [loadedGuide, setLoadedGuide] = useState<OAuthGuide | null>(null);
  const [isLoadingGuide, setIsLoadingGuide] = useState(false);
  const [isResearching, setIsResearching] = useState(false);
  const [researchQuery, setResearchQuery] = useState('');
  const [isApmBriefOpen, setIsApmBriefOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);
  const [researchError, setResearchError] = useState<string | null>(null);

  // Parse URL hash for stable shareable URLs (#/guide/:id)
  useEffect(() => {
    let isMounted = true;

    const handleHashChange = async () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/guide/')) {
        const id = hash.replace('#/guide/', '').split('?')[0]?.trim();
        if (!id) {
          if (isMounted) {
            setCurrentGuideId(null);
            setLoadedGuide(null);
            setIsLoadingGuide(false);
          }
          return;
        }

        if (isMounted) {
          setCurrentGuideId(id);
        }

        // 1. Check local cache first (curated + local storage)
        const local = getGuideById(id);
        if (local) {
          if (isMounted) {
            setLoadedGuide(local);
            setIsLoadingGuide(false);
          }
          return;
        }

        // 2. Fetch from server persistence store (e.g. for new tabs or clean sessions)
        if (isMounted) {
          setIsLoadingGuide(true);
        }

        try {
          const remote = await fetchGuideFromServer(id);
          if (isMounted) {
            if (remote) {
              setLoadedGuide(remote);
            } else {
              // Resilient fallback: build dynamic guide so direct shared links never 404
              const fallback = buildDynamicGuide(id.replace(/[-_]/g, ' '));
              saveCustomGuide(fallback);
              setLoadedGuide(fallback);
            }
            setIsLoadingGuide(false);
          }
        } catch (err) {
          if (isMounted) {
            const fallback = buildDynamicGuide(id.replace(/[-_]/g, ' '));
            saveCustomGuide(fallback);
            setLoadedGuide(fallback);
            setIsLoadingGuide(false);
          }
        }
      } else {
        if (isMounted) {
          setCurrentGuideId(null);
          setLoadedGuide(null);
          setIsLoadingGuide(false);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      isMounted = false;
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsQuickSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateToGuide = (id: string, directGuide?: OAuthGuide) => {
    if (directGuide) {
      setLoadedGuide(directGuide);
    } else {
      const local = getGuideById(id);
      if (local) setLoadedGuide(local);
    }
    window.location.hash = `#/guide/${id}`;
    setCurrentGuideId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateHome = () => {
    window.location.hash = '#/';
    setCurrentGuideId(null);
    setLoadedGuide(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Perform Live AI Research or Lookup
  const handleSearchOrGenerate = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setResearchError(null);

    // 1. Check if it matches existing curated guides
    const existing = getGuideById(trimmed);
    if (existing) {
      navigateToGuide(existing.id, existing);
      return;
    }

    // 2. Perform live AI research via backend
    setIsResearching(true);
    setResearchQuery(trimmed);

    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed }),
      });

      if (!res.ok) {
        throw new Error(`Research request failed with status ${res.status}`);
      }

      const data = await res.json();

      if (data.guide) {
        saveCustomGuide(data.guide);
        setLoadedGuide(data.guide);
        navigateToGuide(data.guide.id, data.guide);
      } else {
        const fallbackGuide = buildDynamicGuide(trimmed);
        saveCustomGuide(fallbackGuide);
        setLoadedGuide(fallbackGuide);
        navigateToGuide(fallbackGuide.id, fallbackGuide);
      }
    } catch {
      const fallbackGuide = buildDynamicGuide(trimmed);
      saveCustomGuide(fallbackGuide);
      setLoadedGuide(fallbackGuide);
      navigateToGuide(fallbackGuide.id, fallbackGuide);
    } finally {
      setIsResearching(false);
    }
  };

  const selectedGuide =
    (currentGuideId && loadedGuide?.id?.toLowerCase() === currentGuideId.toLowerCase())
      ? loadedGuide
      : currentGuideId
      ? (getGuideById(currentGuideId) || loadedGuide)
      : null;

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Navigation Bar */}
      <Navbar
        onNavigateHome={navigateHome}
        onOpenApmBrief={() => setIsApmBriefOpen(true)}
        onSelectApp={(id) => navigateToGuide(id)}
        onOpenQuickSearch={() => setIsQuickSearchOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {isResearching ? (
          <LiveResearchLoader query={researchQuery} />
        ) : isLoadingGuide ? (
          <LiveResearchLoader query={currentGuideId?.replace(/[-_]/g, ' ') || 'OAuth Guide'} />
        ) : selectedGuide ? (
          <GuideView
            guide={selectedGuide}
            onBack={navigateHome}
            onOpenExport={() => setIsExportOpen(true)}
          />
        ) : (
          /* HOMEPAGE VIEW */
          <div>
            {/* Hero Section */}
            <Hero onSearch={handleSearchOrGenerate} isLoading={isResearching} />

            {/* Pre-built App Cards Section */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
                    <Sparkles className="h-3.5 w-3.5" /> Featured OAuth Guides
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Pre-Built Integration Blueprints
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Explore three high-frequency OAuth integrations with verified approval timelines and blockers.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Verified Against Oct 2024 Provider Specs</span>
                </div>
              </div>

              {/* The Three Required App Cards: Gmail, Slack, Notion */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                <AppCard
                  guide={CURATED_GUIDES.gmail}
                  onSelect={(id) => navigateToGuide(id)}
                />
                <AppCard
                  guide={CURATED_GUIDES.slack}
                  onSelect={(id) => navigateToGuide(id)}
                />
                <AppCard
                  guide={CURATED_GUIDES.notion}
                  onSelect={(id) => navigateToGuide(id)}
                />
              </div>

              {/* Additional Popular Integrations Row */}
              <div className="mt-12 pt-8 border-t border-slate-800/80">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      More Supported Integrations
                    </h3>
                    <p className="text-xs text-slate-400">
                      Instantly jump into other common SaaS developer ecosystems.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['linear', 'salesforce'].map((key) => {
                    const g = CURATED_GUIDES[key];
                    if (!g) return null;
                    return (
                      <div
                        key={g.id}
                        onClick={() => navigateToGuide(g.id)}
                        className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition cursor-pointer flex items-center justify-between group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white group-hover:text-indigo-300">
                              {g.name}
                            </h4>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-medium">
                              {g.difficulty}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 truncate max-w-xs mt-0.5">
                            {g.tagline}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition shrink-0" />
                      </div>
                    );
                  })}

                  {/* Custom Search Prompt Card */}
                  <div
                    onClick={() => setIsQuickSearchOpen(true)}
                    className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 to-slate-900/60 border border-dashed border-indigo-500/40 hover:border-indigo-500 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                        <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                        <span>Research Any Other App</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Linear, Jira, Spotify, Twitter, Stripe, Discord...
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-indigo-400 group-hover:translate-x-1 transition shrink-0" />
                  </div>
                </div>
              </div>
            </section>

            {/* Features Explanation Section */}
            <FeaturesSection onExploreApp={(id) => navigateToGuide(id)} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-semibold text-slate-400">
              OAuth Launchpad — Composio Associate Product Manager Take-Home Project
            </p>
            <p className="mt-1">
              Built to provide clear effort estimation, compliance timeline visibility, and anti-hallucinated OAuth setup blueprints.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsApmBriefOpen(true)}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition cursor-pointer"
            >
              Assignment Brief & Notes
            </button>
            <span>•</span>
            <a
              href="https://composio.dev"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition"
            >
              Composio.dev
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ApmBriefModal
        isOpen={isApmBriefOpen}
        onClose={() => setIsApmBriefOpen(false)}
      />

      {selectedGuide && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          guide={selectedGuide}
        />
      )}

      <QuickSearchModal
        isOpen={isQuickSearchOpen}
        onClose={() => setIsQuickSearchOpen(false)}
        onSelectGuide={(id) => navigateToGuide(id)}
        onGenerateGuide={(q) => handleSearchOrGenerate(q)}
      />
    </div>
  );
}
