import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Internship } from '../../types';
import {
  Bookmark,
  ArrowRight,
  Clock,
  MapPin,
  Users,
  DollarSign,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface DomainGridProps {
  onSelectInternship: (internship: Internship) => void;
  onApplyInternship: (internship: Internship) => void;
}

export const DomainGrid: React.FC<DomainGridProps> = ({ onSelectInternship, onApplyInternship }) => {
  const { internships, savedInternshipIds, toggleSaveInternship, setActiveTab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Engineering', 'Artificial Intelligence', 'Data & Analytics', 'Design & Creative', 'Cloud & Infrastructure'];

  const filteredInternships = selectedCategory === 'All'
    ? internships
    : internships.filter(i => {
        if (selectedCategory === 'Engineering') {
          return i.category === 'Engineering';
        }
        if (selectedCategory === 'Artificial Intelligence') {
          return i.category === 'Artificial Intelligence';
        }
        if (selectedCategory === 'Data & Analytics') {
          return i.category === 'Data & Analytics' || i.category === 'Data & Infrastructure';
        }
        if (selectedCategory === 'Design & Creative') {
          return i.category === 'Design & Creative' || i.category === 'Marketing & Growth';
        }
        if (selectedCategory === 'Cloud & Infrastructure') {
          return i.category === 'Cloud & Infrastructure' || i.category === 'Security & Operations';
        }
        return true;
      });

  return (
    <section className="py-16 border-t border-purple-950/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
              Curated Curriculum Tracks
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              20 Specialized Internship Domains
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Each domain includes industry-guided responsibilities, verifiable outcomes, and a dedicated tailored application assessment.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors shrink-0"
          >
            <span>Explore full directory with filters</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Category filter segmented control */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50 shadow-sm'
                  : 'bg-[#10121d] text-slate-400 border border-purple-950/40 hover:text-white hover:border-purple-800/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 20 Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.slice(0, 6).map(internship => {
            const isSaved = savedInternshipIds.includes(internship.id);

            return (
              <div
                key={internship.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-purple-900/30 bg-[#0e101b]/90 p-5 backdrop-blur-sm transition-all hover:border-purple-500/40 hover:bg-[#131524] hover:shadow-xl hover:shadow-purple-950/30"
              >
                <div>
                  {/* Top unboxed metadata */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 font-medium">{internship.department}</span>
                      <span aria-hidden="true">·</span>
                      <span>{internship.mode}</span>
                    </div>
                    <button
                      onClick={() => toggleSaveInternship(internship.id)}
                      className={`p-1 rounded-md transition-colors ${
                        isSaved ? 'text-purple-400' : 'text-slate-400 hover:text-white'
                      }`}
                      title={isSaved ? 'Remove from Saved' : 'Save Internship'}
                    >
                      <Bookmark className="h-4 w-4" fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectInternship(internship)}
                    className="font-display text-base font-bold text-white group-hover:text-purple-300 transition-colors cursor-pointer mb-2"
                  >
                    {internship.title}
                  </h3>

                  {/* Short snippet */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {internship.description}
                  </p>

                  {/* Required skills unboxed text */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {internship.requiredSkills.slice(0, 3).map(skill => (
                      <span
                        key={skill}
                        className="rounded bg-[#171a2c] px-2 py-0.5 text-[11px] font-mono text-purple-200 border border-purple-900/30"
                      >
                        {skill}
                      </span>
                    ))}
                    {internship.requiredSkills.length > 3 && (
                      <span className="text-[11px] font-mono text-slate-400 self-center">
                        +{internship.requiredSkills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-purple-950/60 flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-400">
                    <div className="text-slate-400 text-[10px]">Stipend & Duration</div>
                    <div className="font-semibold text-slate-200 font-mono text-xs">
                      {internship.duration} · <span className="text-purple-400">{internship.stipend.split('/')[0]}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectInternship(internship)}
                      className="px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onApplyInternship(internship)}
                      className="flex items-center gap-1 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 px-3 py-1.5 text-xs font-semibold text-purple-200 transition-all"
                    >
                      <span>Apply</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all 20 Domains button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setActiveTab('explore')}
            className="inline-flex items-center gap-2 rounded-xl border border-purple-700/50 bg-[#121422] px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-purple-950/50 hover:bg-[#1a1d30] hover:border-purple-500 transition-all"
          >
            <span>View All 20 Internship Domains & Advanced Search</span>
            <ArrowRight className="h-4 w-4 text-purple-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
