import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Internship, InternshipMode } from '../../types';
import {
  Search,
  Filter,
  Bookmark,
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  ArrowRight,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ExplorePageProps {
  initialSearchQuery?: string;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ initialSearchQuery = '' }) => {
  const {
    internships,
    savedInternshipIds,
    toggleSaveInternship,
    setSelectedInternship,
    setApplyInternship
  } = useApp();

  const [search, setSearch] = useState(initialSearchQuery);
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'deadline' | 'positions'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Extract all distinct skills across domains
  const allSkills = useMemo(() => {
    const set = new Set<string>();
    internships.forEach(i => i.requiredSkills.forEach(s => set.add(s.split('/')[0].trim())));
    return Array.from(set).sort().slice(0, 16);
  }, [internships]);

  // Filtering and sorting
  const filteredList = useMemo(() => {
    return internships
      .filter(item => {
        // Search term
        const matchesSearch =
          !search ||
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.department.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.requiredSkills.some(s => s.toLowerCase().includes(search.toLowerCase()));

        // Duration filter
        const matchesDuration =
          selectedDuration === 'all' || item.duration.toLowerCase().includes(selectedDuration.toLowerCase());

        // Mode filter
        const matchesMode =
          selectedMode === 'all' || item.mode.toLowerCase() === selectedMode.toLowerCase();

        // Skill filter
        const matchesSkill =
          selectedSkill === 'all' ||
          item.requiredSkills.some(s => s.toLowerCase().includes(selectedSkill.toLowerCase()));

        // Saved only
        const matchesSaved = !showSavedOnly || savedInternshipIds.includes(item.id);

        return matchesSearch && matchesDuration && matchesMode && matchesSkill && matchesSaved;
      })
      .sort((a, b) => {
        if (sortBy === 'deadline') {
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        }
        if (sortBy === 'positions') {
          return b.positions - a.positions;
        }
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      });
  }, [internships, search, selectedDuration, selectedMode, selectedSkill, showSavedOnly, sortBy, savedInternshipIds]);

  // Pagination
  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;
  const paginatedList = filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedDuration('all');
    setSelectedMode('all');
    setSelectedSkill('all');
    setShowSavedOnly(false);
    setSortBy('newest');
    setCurrentPage(1);
  };

  return (
    <div className="py-8 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Title Banner */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-purple-400 mb-1">
                <span>Discovery Directory</span>
                <span aria-hidden="true">·</span>
                <span>All 20 Certified Tracks</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Explore Available Internships
              </h1>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                Search, filter, and apply directly for university-accredited positions across cutting-edge technical categories.
              </p>
            </div>

            {/* Quick Saved Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold border transition-all ${
                  showSavedOnly
                    ? 'border-purple-500 bg-purple-950/60 text-purple-300'
                    : 'border-purple-900/30 bg-[#0f111d] text-slate-400 hover:text-white'
                }`}
              >
                <Bookmark className="h-4 w-4" fill={showSavedOnly ? 'currentColor' : 'none'} />
                <span>Saved Roles ({savedInternshipIds.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Toolbar Card */}
        <div className="rounded-2xl border border-purple-900/30 bg-[#0e101b]/95 p-5 backdrop-blur-md mb-8 shadow-xl shadow-purple-950/20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
              <input
                type="text"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search domain title, keywords, or skills..."
                className="w-full min-h-[44px] rounded-xl border border-purple-900/40 bg-[#141728] pl-10 pr-12 py-2.5 text-base sm:text-xs text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  aria-label="Clear Search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 min-h-[32px] px-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Duration Selector */}
            <div className="md:col-span-2">
              <select
                value={selectedDuration}
                onChange={e => {
                  setSelectedDuration(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter by duration"
                className="w-full min-h-[44px] rounded-xl border border-purple-900/40 bg-[#141728] px-3.5 py-2.5 text-base sm:text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
              >
                <option value="all">Any Duration</option>
                <option value="1 month">1 Month</option>
                <option value="2 months">2 Months</option>
                <option value="3 months">3 Months</option>
                <option value="6 months">6 Months</option>
              </select>
            </div>

            {/* Mode Selector */}
            <div className="md:col-span-2">
              <select
                value={selectedMode}
                onChange={e => {
                  setSelectedMode(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter by location mode"
                className="w-full min-h-[44px] rounded-xl border border-purple-900/40 bg-[#141728] px-3.5 py-2.5 text-base sm:text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
              >
                <option value="all">Any Work Mode</option>
                <option value="remote">Remote Only</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">Onsite</option>
              </select>
            </div>

            {/* Sort Selector & Reset Button */}
            <div className="md:col-span-3 flex gap-2">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                aria-label="Sort internships"
                className="w-full min-h-[44px] rounded-xl border border-purple-900/40 bg-[#141728] px-3.5 py-2.5 text-base sm:text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="deadline">Sort: Application Deadline</option>
                <option value="positions">Sort: Most Positions</option>
              </select>

              {(search || selectedDuration !== 'all' || selectedMode !== 'all' || selectedSkill !== 'all' || showSavedOnly) && (
                <button
                  onClick={handleResetFilters}
                  title="Reset all filters"
                  aria-label="Reset all filters"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-900/40 bg-[#141728] text-slate-300 hover:text-white hover:border-purple-500 active:scale-95 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Skill Tags Filter */}
          <div className="mt-4 pt-3 border-t border-purple-950/60 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-medium text-slate-400 shrink-0">Popular Skills:</span>
            <button
              onClick={() => {
                setSelectedSkill('all');
                setCurrentPage(1);
              }}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-mono transition-colors shrink-0 ${
                selectedSkill === 'all'
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'bg-[#141728] text-slate-400 hover:text-white'
              }`}
            >
              All Skills
            </button>
            {allSkills.map(skill => (
              <button
                key={skill}
                onClick={() => {
                  setSelectedSkill(skill);
                  setCurrentPage(1);
                }}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-mono transition-colors shrink-0 ${
                  selectedSkill === skill
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'bg-[#141728] text-slate-400 hover:text-white border border-purple-950/40'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Active Status */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-400">
          <div>
            Showing <span className="font-mono font-bold text-white tabular-nums">{paginatedList.length}</span> of{' '}
            <span className="font-mono font-bold text-white tabular-nums">{filteredList.length}</span> internships matching criteria
          </div>
          <div className="hidden sm:block text-[11px] text-purple-400">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Empty State */}
        {filteredList.length === 0 ? (
          <div className="rounded-2xl border border-purple-900/30 bg-[#0e101b] p-12 text-center max-w-md mx-auto">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-950 text-purple-400 mx-auto mb-4 border border-purple-800/40">
              <Filter className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-2">No matching internships found</h3>
            <p className="text-xs text-slate-400 mb-6">
              Try relaxing your search terms or resetting filters to see available opportunities.
            </p>
            <button
              onClick={handleResetFilters}
              className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-500 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedList.map(internship => {
              const isSaved = savedInternshipIds.includes(internship.id);

              return (
                <div
                  key={internship.id}
                  className="group flex flex-col justify-between rounded-2xl border border-purple-900/30 bg-[#0e101b]/95 p-6 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-[#131627] hover:shadow-2xl hover:shadow-purple-950/40"
                >
                  <div>
                    {/* Top unboxed metadata */}
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-purple-400 font-medium">{internship.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{internship.mode}</span>
                        {internship.isDemoListing && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-slate-400 text-[10px] uppercase font-mono">Demo Listing</span>
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => toggleSaveInternship(internship.id)}
                        className={`p-1.5 rounded-lg transition-colors border ${
                          isSaved
                            ? 'border-purple-600/50 bg-purple-950/60 text-purple-400'
                            : 'border-transparent text-slate-400 hover:text-white hover:bg-purple-950/30'
                        }`}
                        title={isSaved ? 'Bookmarked' : 'Bookmark'}
                      >
                        <Bookmark className="h-4 w-4" fill={isSaved ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => setSelectedInternship(internship)}
                      className="font-display text-lg font-bold text-white group-hover:text-purple-300 transition-colors cursor-pointer mb-2.5"
                    >
                      {internship.title}
                    </h3>

                    {/* Description preview */}
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                      {internship.description}
                    </p>

                    {/* Detail pills / specs */}
                    <div className="grid grid-cols-2 gap-2 text-xs mb-4 p-2.5 rounded-xl bg-[#121422] border border-purple-950/40">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Duration</span>
                        <span className="font-semibold text-slate-200">{internship.duration}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Stipend</span>
                        <span className="font-semibold text-purple-300 font-mono text-[11px] truncate block">
                          {internship.stipend}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Open Positions</span>
                        <span className="font-semibold text-slate-200 font-mono tabular-nums">
                          {internship.positions} openings
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Deadline</span>
                        <span className="font-semibold text-slate-200 font-mono text-[11px]">
                          {internship.deadline}
                        </span>
                      </div>
                    </div>

                    {/* Skills unboxed tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {internship.requiredSkills.map(skill => (
                        <span
                          key={skill}
                          className="rounded-md bg-[#16192b] px-2 py-0.5 text-[11px] font-mono text-purple-300 border border-purple-900/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-purple-950/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
                    <button
                      onClick={() => setSelectedInternship(internship)}
                      className="min-h-[40px] px-3 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors text-center sm:text-left rounded-lg hover:bg-purple-950/20 active:scale-95"
                    >
                      View Details & Curriculum
                    </button>
                    <button
                      onClick={() => setApplyInternship(internship)}
                      className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-purple-900/30 active:scale-[0.98] transition-all shrink-0"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-900/40 bg-[#0e101b] text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-purple-600 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              return (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`h-9 w-9 rounded-xl text-xs font-mono font-semibold transition-all ${
                    currentPage === p
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                      : 'border border-purple-900/40 bg-[#0e101b] text-slate-300 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-900/40 bg-[#0e101b] text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-purple-600 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
