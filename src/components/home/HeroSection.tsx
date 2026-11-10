import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Sparkles, ArrowRight, ShieldCheck, Award, Users, CheckCircle2, FileText } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const { setActiveTab } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setActiveTab('explore');
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background ambient purple radiant glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-700/20 via-indigo-600/15 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Subtle Editorial Kicker - no pills, clean text with separators */}
          <div className="inline-flex items-center gap-2 text-xs font-medium text-purple-300 bg-purple-950/60 border border-purple-800/40 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <span>Official Admissions 2026/2027</span>
            <span aria-hidden="true" className="text-purple-600">·</span>
            <span>20 Technical Domains</span>
            <span aria-hidden="true" className="text-purple-600">·</span>
            <span>Verified PDF Offer Letters</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance leading-[1.12]">
            Elite Internship Discovery & Candidate Application Portal
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover rigorously curated technical internships across 20 specialized engineering domains. Submit tailored domain applications, track your real-time recruitment pipeline, and receive authenticated offer letters.
          </p>

          {/* Search Bar matching screenshot aesthetic */}
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto pt-2">
            <div className="relative flex items-center rounded-xl border border-purple-800/40 bg-[#121422]/90 p-1.5 shadow-2xl shadow-purple-950/50 backdrop-blur-lg focus-within:border-purple-500/80 transition-all">
              <Search className="h-5 w-5 text-purple-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search by role or domain (e.g. React, Machine Learning, Cybersecurity)..."
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-purple-900/30 hover:brightness-110 transition-all shrink-0 whitespace-nowrap"
              >
                <span>Find Roles</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>

          {/* Quick Metrics strip with tabular numbers */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="rounded-xl border border-purple-900/30 bg-[#0e101b]/80 p-3.5">
              <div className="font-mono text-xl font-bold text-white tabular-nums">20</div>
              <div className="text-xs text-slate-400">Technical Domains</div>
            </div>
            <div className="rounded-xl border border-purple-900/30 bg-[#0e101b]/80 p-3.5">
              <div className="font-mono text-xl font-bold text-purple-400 tabular-nums">1,927</div>
              <div className="text-xs text-slate-400">Placements & Recruits</div>
            </div>
            <div className="rounded-xl border border-purple-900/30 bg-[#0e101b]/80 p-3.5">
              <div className="font-mono text-xl font-bold text-white tabular-nums">100%</div>
              <div className="text-xs text-slate-400">Verified QR Certificates</div>
            </div>
            <div className="rounded-xl border border-purple-900/30 bg-[#0e101b]/80 p-3.5">
              <div className="font-mono text-xl font-bold text-emerald-400 tabular-nums">3-5 Days</div>
              <div className="text-xs text-slate-400">Average Review Time</div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group rounded-2xl border border-purple-900/30 bg-[#0f111c]/90 p-6 backdrop-blur-md transition-all hover:border-purple-600/40 hover:bg-[#141726]">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-950 border border-purple-700/30 text-purple-400 mb-4 group-hover:scale-105 transition-transform">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-2">
              Domain-Tailored Applications
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Custom assessment questions for each of the 20 technical categories, verifying GitHub repositories, Figma portfolios, and architectural problem-solving before submission.
            </p>
            <button
              onClick={() => setActiveTab('explore')}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
            >
              Explore Domains &rarr;
            </button>
          </div>

          <div className="group rounded-2xl border border-purple-900/30 bg-[#0f111c]/90 p-6 backdrop-blur-md transition-all hover:border-purple-600/40 hover:bg-[#141726]">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-950 border border-indigo-700/30 text-indigo-400 mb-4 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-2">
              Applyr Kanban Pipeline
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Visual 7-stage candidate lifecycle tracker inspired by the Applyr dashboard: from Submission, Confirmation, Technical Review, Interview, to Official Offer.
            </p>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
            >
              Track Applications &rarr;
            </button>
          </div>

          <div className="group rounded-2xl border border-purple-900/30 bg-[#0f111c]/90 p-6 backdrop-blur-md transition-all hover:border-purple-600/40 hover:bg-[#141726]">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-950 border border-violet-700/30 text-violet-400 mb-4 group-hover:scale-105 transition-transform">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-2">
              Automated PDF Offer Letters
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Personalized institutional offer letters (styled after the PathwayxIQ credential model) with unique verification IDs, terms of reference, and downloadable PDF letterheads.
            </p>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
            >
              View Sample Offer &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
