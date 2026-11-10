import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Layers,
  LayoutDashboard,
  ShieldCheck,
  Mail,
  User as UserIcon,
  Menu,
  X,
  FileCheck2,
  ExternalLink
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    switchUserRole,
    activeTab,
    setActiveTab,
    emailNotifications,
    setIsEmailLogOpen,
    setIsProfileModalOpen,
    setIsAuthModalOpen,
    applications
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeOffersCount = applications.filter(a => a.status === 'offer_issued').length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-950/40 bg-[#090b10]/90 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={() => {
            setActiveTab('home');
            setMobileMenuOpen(false);
          }}
          className="group flex items-center gap-2.5 text-left transition-opacity hover:opacity-90 shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 via-indigo-600 to-violet-400 p-0.5 shadow-lg shadow-purple-600/20">
            <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#0c0e17]">
              <Sparkles className="h-4 w-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              CertOfThings
              <span className="text-[10px] font-mono font-medium tracking-normal text-purple-400 uppercase bg-purple-950/80 border border-purple-800/40 px-1.5 py-0.2 rounded">
                SaaS
              </span>
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'home' ? 'text-purple-400 font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'explore' ? 'text-purple-400 font-semibold' : ''
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            Explore Internships (20)
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'dashboard' ? 'text-purple-400 font-semibold' : ''
            }`}
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            Candidate Tracker
            {activeOffersCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-mono font-semibold text-emerald-400 border border-emerald-500/30">
                {activeOffersCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'admin' ? 'text-purple-400 font-semibold' : ''
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Recruiter Admin
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'resources' ? 'text-purple-400 font-semibold' : ''
            }`}
          >
            Resources
          </button>
        </nav>

        {/* Zone 3: Actions & Role Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Email Outbox Log Button */}
          <button
            onClick={() => setIsEmailLogOpen(true)}
            title="View Email Dispatch & Nodemailer Logs"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-purple-900/40 bg-[#121422] text-slate-300 transition-colors hover:border-purple-600/40 hover:text-white"
          >
            <Mail className="h-4 w-4 text-purple-300" />
            {emailNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-purple-600 px-1 text-[10px] font-mono font-bold text-white">
                {emailNotifications.length}
              </span>
            )}
          </button>

          {/* Quick Role Switcher */}
          <div className="hidden lg:flex items-center rounded-lg border border-purple-900/50 bg-[#10121f] p-1 text-xs font-medium">
            <button
              onClick={() => switchUserRole('candidate')}
              className={`rounded-md px-2.5 py-1 transition-all ${
                currentUser.role === 'candidate'
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Candidate View
            </button>
            <button
              onClick={() => switchUserRole('admin')}
              className={`rounded-md px-2.5 py-1 transition-all ${
                currentUser.role === 'admin'
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Admin View
            </button>
          </div>

          {/* Profile / Account CTA */}
          {currentUser.role === 'candidate' ? (
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-purple-700/30 bg-purple-950/30 px-3 py-1.5 text-xs font-medium text-purple-200 transition-colors hover:border-purple-600/60 hover:bg-purple-900/40"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-700 text-[10px] font-bold text-white uppercase">
                {currentUser.name.charAt(0)}
              </div>
              <span className="hidden sm:inline font-sans truncate max-w-[110px]">{currentUser.name}</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('admin')}
              className="flex items-center gap-2 rounded-lg border border-purple-600/50 bg-gradient-to-r from-purple-700 to-indigo-700 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-purple-900/20 hover:brightness-110 transition-all"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin Console</span>
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-300 md:hidden hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-purple-900/40 bg-[#0d0f19] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-purple-950/40 hover:text-white"
            >
              <span>Home</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('explore');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-purple-950/40 hover:text-white"
            >
              <span>Explore Internships</span>
              <span className="font-mono text-xs text-purple-400">20 domains</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-purple-950/40 hover:text-white"
            >
              <span>Candidate Application Tracker</span>
              <span className="font-mono text-xs text-emerald-400">Applyr Pipeline</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-purple-950/40 hover:text-white"
            >
              <span>Recruiter Admin Portal</span>
              <span className="font-mono text-xs text-purple-400">Rokett.co layout</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('resources');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-purple-950/40 hover:text-white"
            >
              <span>Resources & Guidelines</span>
            </button>

            <div className="pt-2 border-t border-purple-950/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">Role View:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    switchUserRole('candidate');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xs px-2.5 py-1 rounded border ${
                    currentUser.role === 'candidate'
                      ? 'border-purple-500 bg-purple-900/50 text-white'
                      : 'border-slate-800 text-slate-400'
                  }`}
                >
                  Candidate
                </button>
                <button
                  onClick={() => {
                    switchUserRole('admin');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xs px-2.5 py-1 rounded border ${
                    currentUser.role === 'admin'
                      ? 'border-purple-500 bg-purple-900/50 text-white'
                      : 'border-slate-800 text-slate-400'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
