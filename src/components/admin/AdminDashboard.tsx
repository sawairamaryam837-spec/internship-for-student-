import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Application, ApplicationStatus, Internship } from '../../types';
import {
  LayoutDashboard,
  FolderKanban,
  BarChart2,
  Users,
  Download,
  Settings,
  HelpCircle,
  Search,
  Filter,
  Plus,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  FileText,
  Mail,
  Trash2,
  Edit,
  ExternalLink,
  ChevronDown,
  Sparkles,
  RefreshCw,
  Sliders
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    applications,
    internships,
    offerLetters,
    updateApplicationStatus,
    setScheduleInterviewApp,
    generateOfferLetter,
    setViewingOfferLetter,
    exportApplicationsCSV,
    setIsGoogleFormsModalOpen,
    setIsEmailLogOpen,
    deleteInternship
  } = useApp();

  const [activeSidebar, setActiveSidebar] = useState<
    'dashboard' | 'category' | 'analytics' | 'applicants' | 'settings'
  >('dashboard');

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Quick state for offer modal within admin
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [targetAppForOffer, setTargetAppForOffer] = useState<Application | null>(null);
  const [offerDuration, setOfferDuration] = useState('3 Months');
  const [offerStartDate, setOfferStartDate] = useState('2026-12-01');
  const [offerStipend, setOfferStipend] = useState('$1,000 / month');

  // Filtered applications
  const filteredApps = applications.filter(app => {
    const matchesSearch =
      !searchQuery ||
      app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.domainTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.university.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesDomain = domainFilter === 'all' || app.domainTitle === domainFilter;

    return matchesSearch && matchesStatus && matchesDomain;
  });

  const handleOpenGenerateOffer = (app: Application) => {
    setTargetAppForOffer(app);
    setIsOfferModalOpen(true);
  };

  const handleConfirmOfferGeneration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetAppForOffer) return;

    const createdOffer = generateOfferLetter(targetAppForOffer.id, {
      duration: offerDuration,
      startDate: offerStartDate,
      stipend: offerStipend
    });

    setIsOfferModalOpen(false);
    setViewingOfferLetter(createdOffer);
  };

  return (
    <div className="py-6 pb-20">
      <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8">
        {/* Outer Dashboard Shell matching Rokett.co Screenshot #1 */}
        <div className="rounded-3xl border border-purple-900/40 bg-[#0c0d16] p-4 sm:p-6 lg:p-8 shadow-2xl shadow-purple-950/60 overflow-hidden">
          {/* Top Rokett.co style header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-purple-950/60">
            {/* Left brand & search */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600" />
                <span className="font-display text-lg font-bold text-white tracking-tight">
                  rokett.co <span className="text-xs font-mono text-purple-400">/ admin</span>
                </span>
              </div>

              {/* Search bar */}
              <div className="relative hidden sm:block w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search candidates, ID, university..."
                  className="w-full rounded-xl border border-purple-900/40 bg-[#141525] pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsGoogleFormsModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl border border-purple-800/40 bg-[#16172a] hover:bg-[#1e2038] px-3.5 py-2 text-xs font-semibold text-purple-300 transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Google Forms Webhook</span>
              </button>

              <button
                onClick={exportApplicationsCSV}
                className="flex items-center gap-1.5 rounded-xl border border-purple-800/40 bg-[#16172a] hover:bg-[#1e2038] px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export CSV</span>
              </button>

              {/* Admin Profile pill matching screenshot 1 */}
              <div className="flex items-center gap-2.5 rounded-xl border border-purple-900/40 bg-[#141525] px-3 py-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-500/20 text-pink-300 font-bold text-xs">
                  A
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-white">Hello! Anglina</div>
                  <div className="text-[10px] text-purple-400 font-mono">Head Recruiter</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Layout: Left Sidebar + Right Body */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar matching screenshot 1 */}
            <div className="lg:col-span-2 space-y-1">
              <button
                onClick={() => setActiveSidebar('dashboard')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSidebar === 'dashboard'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/30'
                    : 'text-slate-400 hover:text-white hover:bg-[#141627]'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveSidebar('category')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSidebar === 'category'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/30'
                    : 'text-slate-400 hover:text-white hover:bg-[#141627]'
                }`}
              >
                <FolderKanban className="h-4 w-4" />
                <span>20 Domains</span>
              </button>

              <button
                onClick={() => setActiveSidebar('applicants')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSidebar === 'applicants'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/30'
                    : 'text-slate-400 hover:text-white hover:bg-[#141627]'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Applicants ({applications.length})</span>
              </button>

              <button
                onClick={() => setIsEmailLogOpen(true)}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#141627] transition-all"
              >
                <Mail className="h-4 w-4" />
                <span>Email Outbox</span>
              </button>

              <button
                onClick={() => setIsGoogleFormsModalOpen(true)}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#141627] transition-all"
              >
                <Sliders className="h-4 w-4" />
                <span>Forms Patcher</span>
              </button>
            </div>

            {/* Right Main Content */}
            <div className="lg:col-span-10 space-y-6">
              {/* If Category Management active */}
              {activeSidebar === 'category' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        20 Technical Domains Registry
                      </h3>
                      <p className="text-xs text-slate-400">
                        Manage active listings, duration, stipend, and assessment requirements
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {internships.map(domain => (
                      <div
                        key={domain.id}
                        className="rounded-2xl border border-purple-900/30 bg-[#121424] p-4 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                            <span className="text-purple-400 font-medium">{domain.category}</span>
                            <span className="font-mono">{domain.duration}</span>
                          </div>
                          <h4 className="font-display text-base font-bold text-white mb-1.5">{domain.title}</h4>
                          <p className="text-xs text-slate-300 line-clamp-2 mb-3">{domain.description}</p>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {domain.requiredSkills.slice(0, 4).map(s => (
                              <span key={s} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#191d33] text-purple-200">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-purple-950/60 flex items-center justify-between text-xs">
                          <span className="font-mono text-purple-300 font-bold">{domain.stipend}</span>
                          <span className="text-slate-400">{domain.positions} open positions</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Default View: Analytics Strip + Applications Table */
                <>
                  {/* Top Analytics 3-Column Strip matching screenshot 1 */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {/* Card 1: Interviews Carried */}
                    <div className="lg:col-span-4 rounded-2xl border border-purple-900/30 bg-[#131426] p-5 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">
                          Interviews Carried
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/80 border border-purple-800/40 text-purple-400">
                              <Users className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-mono text-2xl font-bold text-white tabular-nums">500</div>
                              <div className="text-[11px] text-slate-400">Number Of Candidates</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/80 border border-purple-800/40 text-purple-400">
                              <BarChart2 className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-mono text-xl font-bold text-purple-300 tabular-nums">127</div>
                              <div className="text-[11px] text-slate-400">Seniority Of Candidates</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/80 border border-purple-800/40 text-purple-400">
                              <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-mono text-xl font-bold text-indigo-300 tabular-nums">349</div>
                              <div className="text-[11px] text-slate-400">City / Global Candidates</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-purple-950/60">
                        <button
                          onClick={() => setActiveSidebar('applicants')}
                          className="w-full rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 py-2 text-xs font-semibold text-purple-200 transition-colors"
                        >
                          View Candidate Pool &rarr;
                        </button>
                      </div>
                    </div>

                    {/* Card 2: Recruitments and Replacements Wave Chart (matching screenshot 1) */}
                    <div className="lg:col-span-5 rounded-2xl border border-purple-900/30 bg-[#131426] p-5 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Recruitments and Replacements
                        </span>
                        <div className="rounded-lg bg-purple-950/80 border border-purple-800/40 px-2 py-0.5 text-[10px] font-mono text-purple-300">
                          Total: 1,927
                        </div>
                      </div>

                      {/* Interactive SVG wave graphic matching screenshot 1 */}
                      <div className="relative h-44 w-full pt-4">
                        <svg viewBox="0 0 400 160" className="w-full h-full overflow-visible">
                          <defs>
                            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.45" />
                              <stop offset="60%" stopColor="#818cf8" stopOpacity="0.15" />
                              <stop offset="100%" stopColor="#312e81" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          {/* Grid horizontal markers */}
                          <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                          <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                          <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

                          {/* Curved wave area path */}
                          <path
                            d="M 0,135 Q 35,90 70,120 T 140,80 T 210,50 T 280,100 T 350,65 T 400,90 L 400,160 L 0,160 Z"
                            fill="url(#waveGrad)"
                          />

                          {/* Main stroke curve */}
                          <path
                            d="M 0,135 Q 35,90 70,120 T 140,80 T 210,50 T 280,100 T 350,65 T 400,90"
                            fill="none"
                            stroke="#d946ef"
                            strokeWidth="3"
                          />

                          {/* Glowing Key Indicator point matching screenshot 1 */}
                          <circle cx="210" cy="50" r="5" fill="#f43f5e" stroke="#fff" strokeWidth="2" />
                          <rect x="180" y="15" width="60" height="22" rx="4" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
                          <text x="210" y="30" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                            1,927
                          </text>
                        </svg>

                        {/* Days label strip */}
                        <div className="flex justify-between text-[9px] font-mono text-slate-500 pt-1">
                          <span>1d</span>
                          <span>5d</span>
                          <span>10d</span>
                          <span>15d</span>
                          <span>20d</span>
                          <span>25d</span>
                          <span>30d</span>
                          <span>35d</span>
                          <span>40d</span>
                          <span>45d</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-pink-500" />
                          <span>Candidate Applications</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-indigo-500" />
                          <span>Admissions Approved</span>
                        </span>
                      </div>
                    </div>

                    {/* Card 3: Analytics Circular Gauge (matching screenshot 1: 75% Conditions) */}
                    <div className="lg:col-span-3 rounded-2xl border border-purple-900/30 bg-[#131426] p-5 flex flex-col justify-between">
                      <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Analytics
                      </div>

                      <div className="relative flex items-center justify-center py-4">
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="48"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="12"
                            fill="transparent"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="48"
                            stroke="url(#donutGrad)"
                            strokeWidth="12"
                            strokeDasharray={2 * Math.PI * 48}
                            strokeDashoffset={2 * Math.PI * 48 * (1 - 0.75)}
                            strokeLinecap="round"
                            fill="transparent"
                          />
                          <defs>
                            <linearGradient id="donutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#ec4899" />
                              <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                          </defs>
                        </svg>

                        <div className="absolute flex flex-col items-center justify-center text-center">
                          <span className="font-mono text-2xl font-bold text-white tabular-nums">75%</span>
                          <span className="text-[10px] text-slate-400">Conditions</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-[10px] text-slate-400 pt-2 border-t border-purple-950/60">
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-pink-500" /> Candidates:
                          </span>
                          <span className="font-mono text-slate-200">500</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-purple-500" /> Seniority:
                          </span>
                          <span className="font-mono text-slate-200">127</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-indigo-500" /> Cities:
                          </span>
                          <span className="font-mono text-slate-200">349</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Candidate Applications Data Table (matching Rokett.co screenshot #1) */}
                  <div className="rounded-2xl border border-purple-900/30 bg-[#121424] p-5 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 rounded-xl border border-purple-900/40 bg-[#17192c] px-3 py-1.5 text-xs font-semibold text-white">
                          <Filter className="h-3.5 w-3.5 text-purple-400" />
                          <span>Filter Applicants</span>
                        </div>

                        {/* Status filter dropdown */}
                        <select
                          value={statusFilter}
                          onChange={e => setStatusFilter(e.target.value)}
                          aria-label="Filter applicants by status"
                          className="rounded-xl border border-purple-900/40 bg-[#17192c] px-3 py-1.5 text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
                        >
                          <option value="all">All Statuses ({applications.length})</option>
                          <option value="submitted">Submitted</option>
                          <option value="under_review">Under Review</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="interview_scheduled">Interview Scheduled</option>
                          <option value="offer_issued">Offer Issued</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>

                      <div className="text-xs text-slate-400">
                        Showing <span className="font-mono font-bold text-white tabular-nums">{filteredApps.length}</span> candidates
                      </div>
                    </div>

                    {/* Table Surface */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-purple-950/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            <th className="py-3 px-4">Candidate #</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Domain / Seniority</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Timings / Hours</th>
                            <th className="py-3 px-4">Stipend / Source</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-950/40">
                          {filteredApps.map(app => (
                            <tr key={app.id} className="hover:bg-[#16182e] transition-colors">
                              {/* Candidate # */}
                              <td className="py-3.5 px-4 font-mono font-bold text-purple-300">
                                {app.applicationNumber}
                              </td>

                              {/* Name */}
                              <td className="py-3.5 px-4 font-medium text-white">
                                <div>{app.candidateName}</div>
                                <div className="text-[10px] text-slate-400 font-normal">{app.candidateEmail}</div>
                              </td>

                              {/* Domain / Seniority */}
                              <td className="py-3.5 px-4 text-slate-300">
                                <div className="font-semibold text-slate-200">{app.domainTitle}</div>
                                <div className="text-[10px] text-purple-400">{app.degree}</div>
                              </td>

                              {/* Date */}
                              <td className="py-3.5 px-4 font-mono text-slate-300 tabular-nums">
                                {app.appliedDate}
                              </td>

                              {/* Timings */}
                              <td className="py-3.5 px-4 font-mono text-slate-300 tabular-nums">
                                {app.availableHoursPerWeek} hrs/week
                              </td>

                              {/* Payments / Source */}
                              <td className="py-3.5 px-4 text-slate-300">
                                <span className="font-mono text-xs text-emerald-400">$800 - $1.2k</span>
                                <div className="text-[10px] text-slate-400">
                                  {app.submissionSource === 'google_forms_sync' ? 'Google Forms' : 'Portal'}
                                </div>
                              </td>

                              {/* Status pill matching screenshot 1 */}
                              <td className="py-3.5 px-4">
                                <span
                                  className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase ${
                                    app.status === 'offer_issued'
                                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/40'
                                      : app.status === 'interview_scheduled'
                                      ? 'bg-amber-950/80 text-amber-300 border border-amber-600/40'
                                      : app.status === 'shortlisted'
                                      ? 'bg-purple-950/80 text-purple-300 border border-purple-600/40'
                                      : app.status === 'rejected'
                                      ? 'bg-rose-950/80 text-rose-300 border border-rose-600/40'
                                      : 'bg-indigo-950/80 text-indigo-300 border border-indigo-600/40'
                                  }`}
                                >
                                  {app.status.replace('_', ' ')}
                                </span>
                              </td>

                              {/* Actions */}
                              <td className="py-3.5 px-4 text-right space-x-2">
                                {/* Shortlist button */}
                                {app.status === 'submitted' && (
                                  <button
                                    onClick={() => updateApplicationStatus(app.id, 'shortlisted')}
                                    className="px-2 py-1 rounded-lg bg-purple-950 hover:bg-purple-900 border border-purple-700/50 text-[11px] font-semibold text-purple-300 transition-colors"
                                  >
                                    Shortlist
                                  </button>
                                )}

                                {/* Interview button */}
                                {app.status !== 'interview_scheduled' && app.status !== 'offer_issued' && app.status !== 'rejected' && (
                                  <button
                                    onClick={() => setScheduleInterviewApp(app)}
                                    className="px-2 py-1 rounded-lg bg-amber-950/80 hover:bg-amber-900/80 border border-amber-700/50 text-[11px] font-semibold text-amber-300 transition-colors"
                                  >
                                    Interview
                                  </button>
                                )}

                                {/* Issue Offer button */}
                                {app.status !== 'offer_issued' && app.status !== 'rejected' && (
                                  <button
                                    onClick={() => handleOpenGenerateOffer(app)}
                                    className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-[11px] font-bold text-white shadow transition-all"
                                  >
                                    Issue Offer
                                  </button>
                                )}

                                {app.offerLetterId && (
                                  <button
                                    onClick={() => {
                                      const letter = offerLetters.find(l => l.id === app.offerLetterId || l.applicationId === app.id);
                                      if (letter) setViewingOfferLetter(letter);
                                    }}
                                    className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-emerald-400"
                                  >
                                    View Letter
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Generate Offer Letter Modal */}
      {isOfferModalOpen && targetAppForOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl border border-purple-900/60 bg-[#0e101b] p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white mb-1">
              Issue Official Offer Letter
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Review parameters for {targetAppForOffer.candidateName} ({targetAppForOffer.domainTitle})
            </p>

            <form onSubmit={handleConfirmOfferGeneration} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Candidate Name</label>
                <input
                  type="text"
                  readOnly
                  value={targetAppForOffer.candidateName}
                  className="w-full rounded-xl border border-purple-900/40 bg-[#16182a] px-3.5 py-2 text-slate-300 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Program Duration</label>
                  <input
                    type="text"
                    value={offerDuration}
                    onChange={e => setOfferDuration(e.target.value)}
                    className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Commencement Date</label>
                  <input
                    type="date"
                    value={offerStartDate}
                    onChange={e => setOfferStartDate(e.target.value)}
                    className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Stipend Honorarium</label>
                <input
                  type="text"
                  value={offerStipend}
                  onChange={e => setOfferStipend(e.target.value)}
                  className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="rounded-xl border border-purple-900/30 bg-purple-950/20 p-3 text-[11px] text-slate-300">
                Signing Authority: <strong className="text-white">Dr. Adrian Vance</strong> (VP of Engineering & Education). A personalized PDF letterhead with verifiable QR hash will be generated and dispatched.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(false)}
                  className="rounded-xl border border-purple-900/40 bg-[#16182a] px-4 py-2 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 px-5 py-2 font-bold text-white shadow transition-all"
                >
                  Generate & Send Offer Letter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
