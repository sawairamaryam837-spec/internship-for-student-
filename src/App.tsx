import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/home/HeroSection';
import { DomainGrid } from './components/home/DomainGrid';
import { ExplorePage } from './components/internships/ExplorePage';
import { CandidateDashboard } from './components/candidate/CandidateDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ResourcesPage } from './components/pages/ResourcesPage';
import { InternshipDetailModal } from './components/internships/InternshipDetailModal';
import { TailoredApplyModal } from './components/application/TailoredApplyModal';
import { OfferLetterModal } from './components/candidate/OfferLetterModal';
import { ProfileModal } from './components/candidate/ProfileModal';
import { ScheduleInterviewModal } from './components/admin/ScheduleInterviewModal';
import { EmailLogsModal } from './components/admin/EmailLogsModal';
import { GoogleFormsIntegrationModal } from './components/admin/GoogleFormsIntegrationModal';

function AppContent() {
  const {
    activeTab,
    setSelectedInternship,
    setApplyInternship
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');

  const handleHeroSearch = (query: string) => {
    setSearchFilter(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080a0f] text-slate-100 antialiased selection:bg-purple-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Routing */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection onSearch={handleHeroSearch} />
            <DomainGrid
              onSelectInternship={internship => setSelectedInternship(internship)}
              onApplyInternship={internship => setApplyInternship(internship)}
            />
          </>
        )}

        {activeTab === 'explore' && (
          <ExplorePage initialSearchQuery={searchFilter} />
        )}

        {activeTab === 'dashboard' && (
          <CandidateDashboard />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard />
        )}

        {activeTab === 'resources' && (
          <ResourcesPage />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <InternshipDetailModal />
      <TailoredApplyModal />
      <OfferLetterModal />
      <ProfileModal />
      <ScheduleInterviewModal />
      <EmailLogsModal />
      <GoogleFormsIntegrationModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
