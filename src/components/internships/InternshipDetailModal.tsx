import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  FileText,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Bookmark
} from 'lucide-react';

export const InternshipDetailModal: React.FC = () => {
  const {
    selectedInternship,
    setSelectedInternship,
    setApplyInternship,
    savedInternshipIds,
    toggleSaveInternship
  } = useApp();

  if (!selectedInternship) return null;

  const isSaved = savedInternshipIds.includes(selectedInternship.id);

  const handleApplyClick = () => {
    const item = selectedInternship;
    setSelectedInternship(null);
    setApplyInternship(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-2xl border border-purple-900/50 bg-[#0d0f1a] text-slate-200 shadow-2xl shadow-purple-950/50 overflow-hidden">
        {/* Top Glow & Header */}
        <div className="relative border-b border-purple-950/80 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-transparent p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-purple-400 mb-2">
                <span>{selectedInternship.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedInternship.department}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{selectedInternship.mode}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {selectedInternship.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleSaveInternship(selectedInternship.id)}
                aria-label={isSaved ? 'Remove bookmark' : 'Bookmark track'}
                className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border active:scale-95 transition-all ${
                  isSaved
                    ? 'border-purple-600 bg-purple-950/80 text-purple-400'
                    : 'border-purple-900/40 bg-[#121422] text-slate-400 hover:text-white'
                }`}
                title={isSaved ? 'Bookmarked' : 'Save'}
              >
                <Bookmark className="h-4 w-4" fill={isSaved ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => setSelectedInternship(null)}
                aria-label="Close details"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-purple-900/40 bg-[#121422] text-slate-400 hover:text-white active:scale-95 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-purple-900/30 bg-[#121424]/80 p-3">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Clock className="h-3 w-3 text-purple-400" /> Duration
              </div>
              <div className="font-semibold text-white text-xs mt-0.5">{selectedInternship.duration}</div>
            </div>
            <div className="rounded-xl border border-purple-900/30 bg-[#121424]/80 p-3">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Users className="h-3 w-3 text-purple-400" /> Available Spots
              </div>
              <div className="font-mono font-semibold text-white text-xs mt-0.5 tabular-nums">
                {selectedInternship.positions} Positions
              </div>
            </div>
            <div className="rounded-xl border border-purple-900/30 bg-[#121424]/80 p-3">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Award className="h-3 w-3 text-purple-400" /> Monthly Stipend
              </div>
              <div className="font-mono font-semibold text-purple-300 text-xs mt-0.5 truncate">
                {selectedInternship.stipend}
              </div>
            </div>
            <div className="rounded-xl border border-purple-900/30 bg-[#121424]/80 p-3">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Calendar className="h-3 w-3 text-purple-400" /> Deadline
              </div>
              <div className="font-mono font-semibold text-amber-300 text-xs mt-0.5">
                {selectedInternship.deadline}
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 space-y-6 sm:space-y-8 max-h-[60vh] overflow-y-auto">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
              Program Description
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedInternship.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3">
              Core Responsibilities & Project Deliverables
            </h3>
            <ul className="space-y-2">
              {selectedInternship.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <CheckCircle className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Skills & Tech Stack */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3">
              Technical Stack & Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedInternship.requiredSkills.map(skill => (
                <span
                  key={skill}
                  className="rounded-lg border border-purple-900/40 bg-[#16192e] px-3 py-1.5 text-xs font-mono text-purple-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Eligibility & Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-purple-900/30 bg-[#111322] p-4">
              <h4 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-purple-400" />
                Educational Requirements
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedInternship.educationalRequirements}
              </p>
            </div>

            <div className="rounded-xl border border-purple-900/30 bg-[#111322] p-4">
              <h4 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-purple-400" />
                Eligibility Criteria
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedInternship.eligibility.map((crit, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Certificate & Outcomes */}
          <div className="rounded-xl border border-purple-800/40 bg-purple-950/20 p-4">
            <h4 className="text-xs font-semibold text-purple-300 mb-1 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-purple-400" />
              Certification & Letter of Recommendation
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedInternship.certificateInfo}
            </p>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="border-t border-purple-950/80 bg-[#0c0e18] p-4 sm:p-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            {selectedInternship.isDemoListing && (
              <span className="font-mono text-purple-400 text-[11px]">
                Demo recruitment track for CertOfThings admissions testing.
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            {selectedInternship.googleFormUrl && (
              <a
                href={selectedInternship.googleFormUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-purple-800/50 bg-[#141728] px-4 py-3 min-h-[44px] text-xs font-medium text-slate-300 hover:text-white active:scale-95 transition-all w-full sm:w-auto"
              >
                <span>Google Form Version</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}

            <button
              onClick={handleApplyClick}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:brightness-110 px-6 py-3 min-h-[46px] text-xs font-semibold text-white shadow-lg shadow-purple-900/40 active:scale-95 transition-all w-full sm:w-auto"
            >
              <span>Apply For This Track</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
