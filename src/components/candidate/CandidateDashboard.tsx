import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Application, ApplicationStatus, OfferLetter } from '../../types';
import {
  Layers,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  ExternalLink,
  ChevronRight,
  Eye,
  Bookmark,
  Sparkles,
  ArrowRight,
  User,
  Building,
  Video
} from 'lucide-react';

export const CandidateDashboard: React.FC = () => {
  const {
    currentUser,
    applications,
    offerLetters,
    internships,
    savedInternshipIds,
    setViewingOfferLetter,
    setSelectedInternship,
    setApplyInternship,
    setIsProfileModalOpen,
    setActiveTab
  } = useApp();

  const [activeViewTab, setActiveViewTab] = useState<'pipeline' | 'timeline' | 'saved'>('pipeline');
  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || '');

  // Filter applications for current candidate
  const myApplications = applications.filter(
    app => app.candidateEmail.toLowerCase() === currentUser.email.toLowerCase() || app.candidateId === currentUser.id
  );

  // Active counts for metric headers (matching Applyr screenshot #3)
  const activeCount = myApplications.filter(a => a.status !== 'rejected').length;
  const interviewsCount = myApplications.filter(a => a.status === 'interview_scheduled').length;
  const offersCount = myApplications.filter(a => a.status === 'offer_issued').length;

  const selectedApp = myApplications.find(a => a.id === selectedAppId) || myApplications[0];

  // Pipeline columns
  const appliedApps = myApplications.filter(a => a.status === 'submitted');
  const screeningApps = myApplications.filter(a => a.status === 'under_review' || a.status === 'shortlisted');
  const interviewApps = myApplications.filter(a => a.status === 'interview_scheduled');
  const offerApps = myApplications.filter(a => a.status === 'offer_issued' || a.status === 'approved');

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'offer_issued':
      case 'approved':
        return 'border-emerald-500/40 bg-emerald-950/40 text-emerald-400';
      case 'interview_scheduled':
        return 'border-amber-500/40 bg-amber-950/40 text-amber-400';
      case 'shortlisted':
        return 'border-purple-500/40 bg-purple-950/40 text-purple-400';
      case 'under_review':
        return 'border-blue-500/40 bg-blue-950/40 text-blue-400';
      case 'rejected':
        return 'border-rose-500/40 bg-rose-950/40 text-rose-400';
      default:
        return 'border-slate-700 bg-slate-900/60 text-slate-300';
    }
  };

  const handleOpenOffer = (offerId?: string, app?: Application) => {
    if (!offerId && !app) return;
    const foundOffer = offerLetters.find(o => o.id === offerId || o.applicationId === app?.id);
    if (foundOffer) {
      setViewingOfferLetter(foundOffer);
    }
  };

  const [mobileKanbanStage, setMobileKanbanStage] = useState<'all' | 'applied' | 'screening' | 'interview' | 'offer'>('all');

  return (
    <div className="py-6 sm:py-8 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Candidate Profile Header Card */}
        <div className="rounded-2xl border border-purple-900/30 bg-[#0e101b]/95 p-4 sm:p-6 backdrop-blur-md mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-xl sm:text-2xl font-bold text-white shadow-lg shadow-purple-900/30 shrink-0">
                {currentUser.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display text-xl sm:text-2xl font-bold text-white truncate">{currentUser.name}</h1>
                  <span className="rounded-md border border-purple-800/40 bg-purple-950/60 px-2 py-0.5 text-[10px] sm:text-[11px] font-mono text-purple-300">
                    Candidate Portal
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 truncate">{currentUser.headline || 'Software Engineering Fellow'}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-400 mt-1.5">
                  <span className="truncate">{currentUser.email}</span>
                  <span aria-hidden="true" className="hidden sm:inline">·</span>
                  <span className="truncate hidden sm:inline">{currentUser.university || 'University of Engineering & Tech'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-purple-950/60">
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="flex-1 md:flex-initial min-h-[42px] rounded-xl border border-purple-900/40 bg-[#131627] hover:bg-[#191c32] hover:border-purple-600/50 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors text-center active:scale-95"
              >
                Edit Profile & CV
              </button>
              <button
                onClick={() => setActiveTab('explore')}
                className="flex-1 md:flex-initial min-h-[42px] rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2 text-xs font-semibold text-white transition-colors shadow-md shadow-purple-900/30 text-center active:scale-95"
              >
                Browse Roles
              </button>
            </div>
          </div>
        </div>

        {/* Tracker Header matching Applyr screenshot #3 */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-1">
              Applyr Pipeline
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              Job Application Tracker
            </h2>
          </div>

          {/* Top KPI Cards from screenshot 3 - responsive 3-col on phones */}
          <div className="grid grid-cols-3 sm:flex items-center gap-2 sm:gap-3">
            <div className="rounded-xl border border-purple-900/30 bg-[#101220] px-3 sm:px-4 py-2 text-center sm:text-left">
              <div className="font-mono text-base sm:text-lg font-bold text-white tabular-nums">{activeCount}</div>
              <div className="text-[10px] text-slate-400 truncate">Active Roles</div>
            </div>
            <div className="rounded-xl border border-purple-900/30 bg-[#101220] px-3 sm:px-4 py-2 text-center sm:text-left">
              <div className="font-mono text-base sm:text-lg font-bold text-amber-400 tabular-nums">{interviewsCount}</div>
              <div className="text-[10px] text-slate-400 truncate">Interviews</div>
            </div>
            <div className="rounded-xl border border-purple-900/30 bg-[#101220] px-3 sm:px-4 py-2 text-center sm:text-left">
              <div className="font-mono text-base sm:text-lg font-bold text-emerald-400 tabular-nums">{offersCount}</div>
              <div className="text-[10px] text-slate-400 truncate">Offers</div>
            </div>
          </div>
        </div>

        {/* View Switcher segmented buttons - Scrollable on mobile */}
        <div className="flex items-center gap-2 mb-6 border-b border-purple-950/60 pb-3 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveViewTab('pipeline')}
            className={`min-h-[42px] px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all active:scale-95 ${
              activeViewTab === 'pipeline'
                ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Kanban Board View
          </button>
          <button
            onClick={() => setActiveViewTab('timeline')}
            className={`min-h-[42px] px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all active:scale-95 ${
              activeViewTab === 'timeline'
                ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            7-Stage Timeline Tracker
          </button>
          <button
            onClick={() => setActiveViewTab('saved')}
            className={`min-h-[42px] px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all active:scale-95 ${
              activeViewTab === 'saved'
                ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50 shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Saved Bookmarks ({savedInternshipIds.length})
          </button>
        </div>

        {/* Mobile Stage Filter for Kanban Board (hidden on desktop lg) */}
        {activeViewTab === 'pipeline' && (
          <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
            <span className="text-[11px] font-medium text-slate-400 shrink-0">Stage:</span>
            {[
              { id: 'all', label: 'All Columns' },
              { id: 'applied', label: `Applied (${appliedApps.length})` },
              { id: 'screening', label: `Screening (${screeningApps.length})` },
              { id: 'interview', label: `Interview (${interviewApps.length})` },
              { id: 'offer', label: `Offers (${offerApps.length})` }
            ].map(col => (
              <button
                key={col.id}
                onClick={() => setMobileKanbanStage(col.id as any)}
                className={`min-h-[36px] px-3 py-1 text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 border ${
                  mobileKanbanStage === col.id
                    ? 'border-purple-500 bg-purple-950/80 text-purple-300 font-semibold'
                    : 'border-purple-950/40 bg-[#121422] text-slate-400'
                }`}
              >
                {col.label}
              </button>
            ))}
          </div>
        )}

        {/* View 1: Applyr Kanban Board (matching screenshot #3) */}
        {activeViewTab === 'pipeline' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Column 1: Applied */}
            <div className={`rounded-2xl border border-purple-950/60 bg-[#0c0e17]/90 p-4 ${
              mobileKanbanStage !== 'all' && mobileKanbanStage !== 'applied' ? 'hidden lg:block' : ''
            }`}>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-950/60">
                <span className="font-display text-xs font-bold text-slate-200">Applied</span>
                <span className="font-mono text-xs text-purple-400 px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-900/40">
                  {appliedApps.length}
                </span>
              </div>
              <div className="space-y-3">
                {appliedApps.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">No applications currently in applied stage.</div>
                ) : (
                  appliedApps.map(app => (
                    <div
                      key={app.id}
                      onClick={() => {
                        setSelectedAppId(app.id);
                        setActiveViewTab('timeline');
                      }}
                      className="group cursor-pointer rounded-xl border border-purple-900/30 bg-[#121422] p-4 transition-all hover:border-purple-500/50 hover:bg-[#16192c]"
                    >
                      <div className="flex items-center justify-between text-[11px] mb-2">
                        <span className="font-bold text-white group-hover:text-purple-300 transition-colors">
                          CertOfThings
                        </span>
                        <span className="rounded-md border border-slate-700 bg-slate-900/80 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                          Applied
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-200 mb-3">{app.domainTitle}</div>
                      <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                        <span>Date Applied</span>
                        <span className="text-slate-300">{app.appliedDate}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Column 2: Screening */}
            <div className={`rounded-2xl border border-purple-950/60 bg-[#0c0e17]/90 p-4 ${
              mobileKanbanStage !== 'all' && mobileKanbanStage !== 'screening' ? 'hidden lg:block' : ''
            }`}>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-950/60">
                <span className="font-display text-xs font-bold text-slate-200">Screening & Review</span>
                <span className="font-mono text-xs text-blue-400 px-2 py-0.5 rounded-full bg-blue-950/60 border border-blue-900/40">
                  {screeningApps.length}
                </span>
              </div>
              <div className="space-y-3">
                {screeningApps.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">No applications under screening.</div>
                ) : (
                  screeningApps.map(app => (
                    <div
                      key={app.id}
                      onClick={() => {
                        setSelectedAppId(app.id);
                        setActiveViewTab('timeline');
                      }}
                      className="group cursor-pointer rounded-xl border border-purple-900/30 bg-[#121422] p-4 transition-all hover:border-blue-500/50 hover:bg-[#16192c]"
                    >
                      <div className="flex items-center justify-between text-[11px] mb-2">
                        <span className="font-bold text-white group-hover:text-blue-300 transition-colors">
                          CertOfThings
                        </span>
                        <span className="rounded-md border border-blue-600/40 bg-blue-950/60 px-2 py-0.5 text-[10px] font-mono text-blue-300">
                          {app.status === 'shortlisted' ? 'Shortlisted' : 'Screening'}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-200 mb-3">{app.domainTitle}</div>
                      <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                        <span>Date Applied</span>
                        <span className="text-slate-300">{app.appliedDate}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Column 3: Interview */}
            <div className={`rounded-2xl border border-purple-950/60 bg-[#0c0e17]/90 p-4 ${
              mobileKanbanStage !== 'all' && mobileKanbanStage !== 'interview' ? 'hidden lg:block' : ''
            }`}>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-950/60">
                <span className="font-display text-xs font-bold text-slate-200">Interview</span>
                <span className="font-mono text-xs text-amber-400 px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-900/40">
                  {interviewApps.length}
                </span>
              </div>
              <div className="space-y-3">
                {interviewApps.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">No interviews currently scheduled.</div>
                ) : (
                  interviewApps.map(app => (
                    <div
                      key={app.id}
                      onClick={() => {
                        setSelectedAppId(app.id);
                        setActiveViewTab('timeline');
                      }}
                      className="group cursor-pointer rounded-xl border border-amber-800/40 bg-[#141524] p-4 transition-all hover:border-amber-500 hover:bg-[#191a2e]"
                    >
                      <div className="flex items-center justify-between text-[11px] mb-2">
                        <span className="font-bold text-white group-hover:text-amber-300 transition-colors">
                          CertOfThings
                        </span>
                        <span className="rounded-md border border-amber-500/40 bg-amber-950/60 px-2 py-0.5 text-[10px] font-mono text-amber-300">
                          Interview
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-200 mb-2">{app.domainTitle}</div>
                      {app.interview && (
                        <div className="rounded-lg bg-amber-950/30 border border-amber-900/30 p-2 mb-2 text-[10px] text-amber-200 flex items-center gap-1.5">
                          <Video className="h-3 w-3 text-amber-400 shrink-0" />
                          <span className="truncate">{app.interview.scheduledDate} · {app.interview.scheduledTime}</span>
                        </div>
                      )}
                      <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                        <span>Date Applied</span>
                        <span className="text-slate-300">{app.appliedDate}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Column 4: Offer */}
            <div className={`rounded-2xl border border-purple-950/60 bg-[#0c0e17]/90 p-4 ${
              mobileKanbanStage !== 'all' && mobileKanbanStage !== 'offer' ? 'hidden lg:block' : ''
            }`}>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-950/60">
                <span className="font-display text-xs font-bold text-slate-200">Offer Issued</span>
                <span className="font-mono text-xs text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-900/40">
                  {offerApps.length}
                </span>
              </div>
              <div className="space-y-3">
                {offerApps.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">No offer letters issued yet.</div>
                ) : (
                  offerApps.map(app => (
                    <div
                      key={app.id}
                      className="group relative rounded-xl border border-emerald-500/40 bg-[#121c22] p-4 transition-all hover:border-emerald-400 shadow-lg shadow-emerald-950/20"
                    >
                      <div className="flex items-center justify-between text-[11px] mb-2">
                        <span className="font-bold text-white">CertOfThings</span>
                        <span className="rounded-md border border-emerald-500/50 bg-emerald-950/80 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-300">
                          Offer
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-200 mb-2">{app.domainTitle}</div>
                      <div className="text-[10px] text-slate-400 font-mono mb-3">
                        Ref: {app.applicationNumber}
                      </div>
                      <button
                        onClick={() => handleOpenOffer(app.offerLetterId, app)}
                        className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-1.5 transition-colors shadow"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        <span>View Offer Letter</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* View 2: Detailed 7-Stage Timeline Tracker */}
        {activeViewTab === 'timeline' && selectedApp && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left list of candidate applications */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Your Applications ({myApplications.length})
              </h3>
              {myApplications.map(app => (
                <div
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={`cursor-pointer rounded-xl border p-4 transition-all ${
                    selectedApp.id === app.id
                      ? 'border-purple-500 bg-[#15182d] shadow-md shadow-purple-950/40'
                      : 'border-purple-900/30 bg-[#0e101b] hover:border-purple-700/50 hover:bg-[#121422]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-white">{app.applicationNumber}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getStatusColor(app.status)}`}>
                      {app.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-200 truncate">{app.domainTitle}</div>
                  <div className="text-[10px] text-slate-400 mt-2 flex items-center justify-between">
                    <span>Applied: {app.appliedDate}</span>
                    <span className="text-purple-400">{app.submissionSource === 'google_forms_sync' ? 'Google Form' : 'Native'}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Selected Application Timeline Detail */}
            <div className="lg:col-span-8 rounded-2xl border border-purple-900/30 bg-[#0e101b]/95 p-6 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-950/60 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                    <span>{selectedApp.applicationNumber}</span>
                    <span aria-hidden="true">·</span>
                    <span>Applied on {selectedApp.appliedDate}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mt-1">
                    {selectedApp.domainTitle}
                  </h3>
                </div>

                {selectedApp.offerLetterId && (
                  <button
                    onClick={() => handleOpenOffer(selectedApp.offerLetterId, selectedApp)}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-950/30 transition-all shrink-0"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Offer Letter</span>
                  </button>
                )}
              </div>

              {/* Scheduled Interview Banner if available */}
              {selectedApp.interview && (
                <div className="rounded-xl border border-amber-800/40 bg-amber-950/20 p-4 mb-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-1">
                        <Video className="h-4 w-4 text-amber-400" />
                        Upcoming Interview Scheduled
                      </div>
                      <p className="text-xs text-slate-300">
                        Round: <span className="font-semibold text-white">{selectedApp.interview.roundName}</span> with {selectedApp.interview.interviewerName}
                      </p>
                      <p className="text-xs text-amber-200 mt-1 font-mono">
                        {selectedApp.interview.scheduledDate} at {selectedApp.interview.scheduledTime}
                      </p>
                    </div>
                    <a
                      href={selectedApp.interview.meetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-3 py-1.5 text-xs transition-colors shrink-0"
                    >
                      Join Meet
                    </a>
                  </div>
                </div>
              )}

              {/* 7-Stage Animated Progress Timeline */}
              <div className="space-y-6 relative pl-6 border-l-2 border-purple-900/40 ml-4 py-2">
                {selectedApp.timeline.map((event, idx) => (
                  <div key={idx} className="relative">
                    {/* Step marker dot */}
                    <div
                      className={`absolute -left-[31px] top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-bold font-mono transition-colors ${
                        event.completed
                          ? 'border-purple-500 bg-purple-600 text-white shadow-md shadow-purple-900/40'
                          : 'border-slate-700 bg-[#090b10] text-slate-500'
                      }`}
                    >
                      {event.completed ? '✓' : event.step}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div className="font-semibold text-sm text-white flex items-center gap-2">
                        <span>{event.title}</span>
                        {event.completed && (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-900/40 px-1.5 rounded">
                            Done
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[11px] text-slate-400 tabular-nums">
                        {event.timestamp}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View 3: Saved Bookmarks */}
        {activeViewTab === 'saved' && (
          <div className="space-y-4">
            {savedInternshipIds.length === 0 ? (
              <div className="rounded-2xl border border-purple-900/30 bg-[#0e101b] p-12 text-center max-w-md mx-auto">
                <Bookmark className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-display text-base font-bold text-white mb-1">No Bookmarked Roles</h3>
                <p className="text-xs text-slate-400 mb-4">
                  Browse our 20 internship tracks and bookmark roles to review them anytime.
                </p>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-500"
                >
                  Explore Directory
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {internships
                  .filter(i => savedInternshipIds.includes(i.id))
                  .map(internship => (
                    <div
                      key={internship.id}
                      className="rounded-2xl border border-purple-900/30 bg-[#0e101b] p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-xs text-purple-400 font-medium mb-1">{internship.category}</div>
                        <h4 className="font-display text-base font-bold text-white mb-2">{internship.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2 mb-4">{internship.description}</p>
                      </div>
                      <div className="pt-3 border-t border-purple-950/60 flex items-center justify-between">
                        <span className="font-mono text-xs text-slate-300">{internship.stipend}</span>
                        <button
                          onClick={() => setApplyInternship(internship)}
                          className="rounded-lg bg-purple-600 hover:bg-purple-500 px-3 py-1.5 text-xs font-semibold text-white"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
