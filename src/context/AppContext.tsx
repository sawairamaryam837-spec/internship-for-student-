import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Internship,
  Application,
  OfferLetter,
  EmailNotification,
  User,
  SmtpConfig,
  GoogleFormsIntegrationConfig,
  ApplicationStatus,
  InterviewDetails
} from '../types';
import {
  ALL_20_DOMAINS,
  INITIAL_USER,
  INITIAL_ADMIN,
  INITIAL_APPLICATIONS,
  INITIAL_OFFER_LETTER,
  INITIAL_EMAIL_NOTIFICATIONS,
  INITIAL_SMTP_CONFIG,
  INITIAL_GOOGLE_FORMS_CONFIG
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchUserRole: (role: 'candidate' | 'admin') => void;
  internships: Internship[];
  applications: Application[];
  offerLetters: OfferLetter[];
  savedInternshipIds: string[];
  emailNotifications: EmailNotification[];
  smtpConfig: SmtpConfig;
  setSmtpConfig: React.Dispatch<React.SetStateAction<SmtpConfig>>;
  googleFormsConfig: GoogleFormsIntegrationConfig;
  setGoogleFormsConfig: React.Dispatch<React.SetStateAction<GoogleFormsIntegrationConfig>>;
  
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Modal states
  selectedInternship: Internship | null;
  setSelectedInternship: (internship: Internship | null) => void;
  applyInternship: Internship | null;
  setApplyInternship: (internship: Internship | null) => void;
  viewingOfferLetter: OfferLetter | null;
  setViewingOfferLetter: (letter: OfferLetter | null) => void;
  scheduleInterviewApp: Application | null;
  setScheduleInterviewApp: (app: Application | null) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isEmailLogOpen: boolean;
  setIsEmailLogOpen: (open: boolean) => void;
  isGoogleFormsModalOpen: boolean;
  setIsGoogleFormsModalOpen: (open: boolean) => void;
  
  // Actions
  toggleSaveInternship: (id: string) => void;
  submitApplication: (appData: Omit<Application, 'id' | 'applicationNumber' | 'appliedDate' | 'timeline' | 'status'>) => { success: boolean; message: string; applicationId?: string };
  updateApplicationStatus: (appId: string, newStatus: ApplicationStatus, notes?: string) => void;
  scheduleInterview: (appId: string, interviewDetails: InterviewDetails) => void;
  generateOfferLetter: (appId: string, offerDetails: Partial<OfferLetter>) => OfferLetter;
  acceptOfferLetter: (offerId: string) => void;
  addInternship: (internship: Omit<Internship, 'id' | 'postedDate'>) => void;
  updateInternship: (id: string, updates: Partial<Internship>) => void;
  deleteInternship: (id: string) => void;
  updateUserProfile: (profile: Partial<User>) => void;
  sendMockEmail: (toEmail: string, toName: string, subject: string, type: EmailNotification['templateType'], preview: string, html: string, attachment?: string) => void;
  simulateGoogleFormSync: () => { count: number; syncedAppNumber: string };
  exportApplicationsCSV: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence helpers
  const getStored = <T,>(key: string, defaultVal: T): T => {
    try {
      const saved = localStorage.getItem(`cot_${key}`);
      return saved ? JSON.parse(saved) : defaultVal;
    } catch {
      return defaultVal;
    }
  };

  const [currentUser, setCurrentUser] = useState<User>(() => getStored('currentUser', INITIAL_USER));
  const [internships, setInternships] = useState<Internship[]>(() => getStored('internships', ALL_20_DOMAINS));
  const [applications, setApplications] = useState<Application[]>(() => getStored('applications', INITIAL_APPLICATIONS));
  const [offerLetters, setOfferLetters] = useState<OfferLetter[]>(() => getStored('offerLetters', [INITIAL_OFFER_LETTER]));
  const [savedInternshipIds, setSavedInternshipIds] = useState<string[]>(() => getStored('savedInternships', ['int-02', 'int-05', 'int-07']));
  const [emailNotifications, setEmailNotifications] = useState<EmailNotification[]>(() => getStored('emailNotifications', INITIAL_EMAIL_NOTIFICATIONS));
  const [smtpConfig, setSmtpConfig] = useState<SmtpConfig>(() => getStored('smtpConfig', INITIAL_SMTP_CONFIG));
  const [googleFormsConfig, setGoogleFormsConfig] = useState<GoogleFormsIntegrationConfig>(() => getStored('googleFormsConfig', INITIAL_GOOGLE_FORMS_CONFIG));

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [applyInternship, setApplyInternship] = useState<Internship | null>(null);
  const [viewingOfferLetter, setViewingOfferLetter] = useState<OfferLetter | null>(null);
  const [scheduleInterviewApp, setScheduleInterviewApp] = useState<Application | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEmailLogOpen, setIsEmailLogOpen] = useState(false);
  const [isGoogleFormsModalOpen, setIsGoogleFormsModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('cot_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cot_internships', JSON.stringify(internships));
  }, [internships]);

  useEffect(() => {
    localStorage.setItem('cot_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('cot_offerLetters', JSON.stringify(offerLetters));
  }, [offerLetters]);

  useEffect(() => {
    localStorage.setItem('cot_savedInternships', JSON.stringify(savedInternshipIds));
  }, [savedInternshipIds]);

  useEffect(() => {
    localStorage.setItem('cot_emailNotifications', JSON.stringify(emailNotifications));
  }, [emailNotifications]);

  const switchUserRole = (role: 'candidate' | 'admin') => {
    if (role === 'admin') {
      setCurrentUser(INITIAL_ADMIN);
      setActiveTab('admin');
    } else {
      setCurrentUser(INITIAL_USER);
      setActiveTab('dashboard');
    }
  };

  const toggleSaveInternship = (id: string) => {
    setSavedInternshipIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const sendMockEmail = (
    toEmail: string,
    toName: string,
    subject: string,
    type: EmailNotification['templateType'],
    preview: string,
    html: string,
    attachment?: string
  ) => {
    const newEmail: EmailNotification = {
      id: `em-${Date.now()}`,
      recipientEmail: toEmail,
      recipientName: toName,
      subject,
      templateType: type,
      contentPreview: preview,
      htmlBody: html,
      sentAt: new Date().toLocaleString(),
      status: 'sent',
      hasAttachment: !!attachment,
      attachmentName: attachment
    };
    setEmailNotifications(prev => [newEmail, ...prev]);
  };

  const submitApplication = (
    appData: Omit<Application, 'id' | 'applicationNumber' | 'appliedDate' | 'timeline' | 'status'>
  ) => {
    // Duplicate check
    const existing = applications.find(
      a => a.candidateEmail.toLowerCase() === appData.candidateEmail.toLowerCase() && a.internshipId === appData.internshipId
    );
    if (existing) {
      return { success: false, message: 'You have already submitted an active application for this internship.' };
    }

    const appNum = `#COT-${Math.floor(20500 + Math.random() * 8000)}`;
    const nowStr = new Date().toLocaleString();

    const newApp: Application = {
      ...appData,
      id: `app-${Date.now()}`,
      applicationNumber: appNum,
      status: 'submitted',
      appliedDate: new Date().toISOString().split('T')[0],
      timeline: [
        {
          step: 1,
          title: 'Application Submitted',
          description: 'Application received and recorded in CertOfThings database.',
          timestamp: nowStr,
          completed: true
        },
        {
          step: 2,
          title: 'Confirmation Email Sent',
          description: `Dispatched confirmation notification to ${appData.candidateEmail}.`,
          timestamp: nowStr,
          completed: true
        },
        {
          step: 3,
          title: 'Application Under Review',
          description: 'Assigned to admissions review committee.',
          timestamp: 'In progress',
          completed: false
        },
        {
          step: 4,
          title: 'Shortlisted',
          description: 'Awaiting portfolio & criteria scoring.',
          timestamp: 'Pending',
          completed: false
        },
        {
          step: 5,
          title: 'Interview',
          description: 'Awaiting scheduling.',
          timestamp: 'Pending',
          completed: false
        },
        {
          step: 6,
          title: 'Final Decision',
          description: 'Pending evaluation.',
          timestamp: 'Pending',
          completed: false
        },
        {
          step: 7,
          title: 'Offer Letter Issued',
          description: 'Pending executive sign-off.',
          timestamp: 'Pending',
          completed: false
        }
      ]
    };

    setApplications(prev => [newApp, ...prev]);

    // Send confirmation email
    sendMockEmail(
      appData.candidateEmail,
      appData.candidateName,
      'Your Internship Application Has Been Received – CertOfThings',
      'application_received',
      `Thank you for applying for the ${appData.domainTitle} (${appNum}). Expected review period is 3-5 business days.`,
      `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 600px; margin: 0 auto; background: #0f111a; color: #f1f5f9; padding: 32px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.2);">
          <h2 style="color: #a855f7; margin: 0 0 16px 0;">CertOfThings</h2>
          <p>Dear <strong>${appData.candidateName}</strong>,</p>
          <p>We have successfully received your application for the <strong>${appData.domainTitle}</strong>.</p>
          <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p style="margin: 4px 0;"><strong>Application ID:</strong> ${appNum}</p>
            <p style="margin: 4px 0;"><strong>Submission Date:</strong> ${nowStr}</p>
            <p style="margin: 4px 0;"><strong>Expected Review:</strong> 3 – 5 Business Days</p>
          </div>
          <p>Track your real-time status in your candidate portal.</p>
        </div>
      `
    );

    return { success: true, message: 'Application submitted successfully! Confirmation email dispatched.', applicationId: newApp.id };
  };

  const updateApplicationStatus = (appId: string, newStatus: ApplicationStatus, notes?: string) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id !== appId) return app;

        const updatedTimeline = [...app.timeline];
        const nowStr = new Date().toLocaleString();

        if (newStatus === 'under_review') {
          updatedTimeline[2] = { ...updatedTimeline[2], timestamp: nowStr, completed: true };
        } else if (newStatus === 'shortlisted') {
          updatedTimeline[2] = { ...updatedTimeline[2], completed: true };
          updatedTimeline[3] = { ...updatedTimeline[3], timestamp: nowStr, completed: true };
          // send email
          sendMockEmail(
            app.candidateEmail,
            app.candidateName,
            `Application Shortlisted: ${app.domainTitle} – CertOfThings`,
            'shortlisted',
            `Congratulations! Your application ${app.applicationNumber} has been shortlisted for technical evaluation.`,
            `<div style="padding:20px;background:#0f111a;color:#fff;border-radius:8px;"><h3>Congratulations ${app.candidateName}!</h3><p>Your application for <strong>${app.domainTitle}</strong> has been shortlisted.</p></div>`
          );
        } else if (newStatus === 'rejected') {
          updatedTimeline[5] = { step: 6, title: 'Final Decision: Rejected', description: notes || 'Not moving forward at this time.', timestamp: nowStr, completed: true };
          sendMockEmail(
            app.candidateEmail,
            app.candidateName,
            `Application Status Update: ${app.domainTitle} – CertOfThings`,
            'rejection',
            `Thank you for your interest in CertOfThings. After careful review, we are unable to advance your application at this time.`,
            `<div style="padding:20px;background:#0f111a;color:#fff;border-radius:8px;"><h3>Dear ${app.candidateName},</h3><p>Thank you for interviewing with CertOfThings. We appreciate your time and wish you continued success.</p></div>`
          );
        }

        return {
          ...app,
          status: newStatus,
          reviewNotes: notes || app.reviewNotes,
          reviewDate: new Date().toISOString().split('T')[0],
          timeline: updatedTimeline
        };
      })
    );
  };

  const scheduleInterview = (appId: string, interviewDetails: InterviewDetails) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id !== appId) return app;

        const updatedTimeline = [...app.timeline];
        const nowStr = new Date().toLocaleString();
        updatedTimeline[4] = {
          step: 5,
          title: `Interview Scheduled: ${interviewDetails.roundName}`,
          description: `${interviewDetails.scheduledDate} at ${interviewDetails.scheduledTime} with ${interviewDetails.interviewerName}`,
          timestamp: nowStr,
          completed: true
        };

        // send interview email
        sendMockEmail(
          app.candidateEmail,
          app.candidateName,
          `Interview Invitation: ${app.domainTitle} – CertOfThings`,
          'interview_invite',
          `You have been invited to interview on ${interviewDetails.scheduledDate} at ${interviewDetails.scheduledTime}.`,
          `
            <div style="font-family:'Plus Jakarta Sans',sans-serif;max-width:600px;margin:0 auto;background:#0f111a;color:#f1f5f9;padding:24px;border-radius:10px;">
              <h2 style="color:#a855f7;">Interview Scheduled</h2>
              <p>Dear ${app.candidateName},</p>
              <p>We are excited to invite you for your <strong>${interviewDetails.roundName}</strong> for the <strong>${app.domainTitle}</strong>.</p>
              <p><strong>Date & Time:</strong> ${interviewDetails.scheduledDate} (${interviewDetails.scheduledTime})</p>
              <p><strong>Interviewer:</strong> ${interviewDetails.interviewerName}</p>
              <p><strong>Meet Link:</strong> <a href="${interviewDetails.meetLink}" style="color:#c084fc;">${interviewDetails.meetLink}</a></p>
            </div>
          `
        );

        return {
          ...app,
          status: 'interview_scheduled',
          interview: interviewDetails,
          timeline: updatedTimeline
        };
      })
    );
  };

  const generateOfferLetter = (appId: string, offerDetails: Partial<OfferLetter>): OfferLetter => {
    const targetApp = applications.find(a => a.id === appId);
    const targetInternship = internships.find(i => i.id === targetApp?.internshipId);

    const offerId = `offer-${Date.now()}`;
    const verificationCode = `COT-VERIFY-2026-${Math.floor(10000 + Math.random() * 90000)}B`;

    const newOffer: OfferLetter = {
      id: offerId,
      applicationId: appId,
      applicationNumber: targetApp?.applicationNumber || '#COT-GEN',
      candidateName: offerDetails.candidateName || targetApp?.candidateName || 'Candidate',
      candidateEmail: offerDetails.candidateEmail || targetApp?.candidateEmail || 'candidate@domain.com',
      internshipTitle: offerDetails.internshipTitle || targetApp?.domainTitle || 'Internship Program',
      domain: targetInternship?.department || 'Engineering',
      duration: offerDetails.duration || targetInternship?.duration || '3 Months',
      startDate: offerDetails.startDate || '2026-12-01',
      stipend: offerDetails.stipend || targetInternship?.stipend || '$1,000 / month',
      mode: offerDetails.mode || targetInternship?.mode || 'Remote',
      responsibilities: offerDetails.responsibilities || targetInternship?.responsibilities || [
        'Collaborate with mentors on core technical architectures',
        'Participate in agile sprints and engineering code reviews'
      ],
      terms: offerDetails.terms || [
        'This fellowship does not constitute permanent employment but provides intensive practical engineering training.',
        'Upon successful completion, you will receive an official verifiable Certificate of Completion and Letter of Recommendation (LoR).',
        'Confidentiality and IP terms apply to all developed materials.'
      ],
      organizationName: 'CertOfThings Global Talent Inc.',
      authorizedSignatory: 'Dr. Adrian Vance',
      signatoryTitle: 'Vice President of Engineering & Academic Programs',
      issueDate: new Date().toISOString().split('T')[0],
      verificationCode,
      status: 'issued'
    };

    setOfferLetters(prev => [newOffer, ...prev]);

    // Update application
    setApplications(prev =>
      prev.map(app => {
        if (app.id !== appId) return app;
        const updatedTimeline = [...app.timeline];
        const nowStr = new Date().toLocaleString();
        updatedTimeline[5] = { step: 6, title: 'Final Decision: Approved', description: 'Application approved by admissions committee.', timestamp: nowStr, completed: true };
        updatedTimeline[6] = { step: 7, title: 'Offer Letter Issued', description: `Personalized offer document generated (${verificationCode}).`, timestamp: nowStr, completed: true };

        return {
          ...app,
          status: 'offer_issued',
          offerLetterId: offerId,
          timeline: updatedTimeline
        };
      })
    );

    // Send offer letter email with attachment
    sendMockEmail(
      newOffer.candidateEmail,
      newOffer.candidateName,
      `Official Internship Offer Letter – CertOfThings Fellowship`,
      'offer_letter',
      `Congratulations ${newOffer.candidateName}! Your official offer letter for ${newOffer.internshipTitle} is ready.`,
      `
        <div style="font-family:'Plus Jakarta Sans',sans-serif;max-width:600px;margin:0 auto;background:#0f111a;color:#f1f5f9;padding:24px;border-radius:10px;">
          <h2 style="color:#a855f7;">Internship Offer Extended</h2>
          <p>Dear ${newOffer.candidateName},</p>
          <p>We are delighted to welcome you to the <strong>${newOffer.internshipTitle}</strong> fellowship.</p>
          <p><strong>Duration:</strong> ${newOffer.duration} | <strong>Start Date:</strong> ${newOffer.startDate}</p>
          <p><strong>Verification Code:</strong> ${verificationCode}</p>
          <p>Your signed PDF offer document is attached and available in your portal.</p>
        </div>
      `,
      `CertOfThings_Offer_Letter_${newOffer.candidateName.replace(/\s+/g, '_')}.pdf`
    );

    return newOffer;
  };

  const acceptOfferLetter = (offerId: string) => {
    setOfferLetters(prev =>
      prev.map(o => (o.id === offerId ? { ...o, status: 'accepted', acceptedAt: new Date().toLocaleString() } : o))
    );
  };

  const addInternship = (internshipData: Omit<Internship, 'id' | 'postedDate'>) => {
    const newInt: Internship = {
      ...internshipData,
      id: `int-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0]
    };
    setInternships(prev => [newInt, ...prev]);
  };

  const updateInternship = (id: string, updates: Partial<Internship>) => {
    setInternships(prev => prev.map(item => (item.id === id ? { ...item, ...updates } : item)));
  };

  const deleteInternship = (id: string) => {
    setInternships(prev => prev.filter(item => item.id !== id));
  };

  const updateUserProfile = (profile: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...profile }));
  };

  const simulateGoogleFormSync = () => {
    const randomDomains = ['Full Stack Development', 'Python Development', 'Data Science', 'UI/UX Design', 'Cloud Computing'];
    const selectedDomain = randomDomains[Math.floor(Math.random() * randomDomains.length)];
    const targetDomainObj = internships.find(i => i.title.includes(selectedDomain)) || internships[0];

    const fakeNames = ['Aria Montgomery', 'Zack Fair', 'Lila Vance', 'Tariq Al-Mansoor', 'Clara Belle'];
    const fakeName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
    const appNum = `#COT-${Math.floor(20700 + Math.random() * 5000)}`;

    const newApp: Application = {
      id: `app-gf-${Date.now()}`,
      applicationNumber: appNum,
      internshipId: targetDomainObj.id,
      domainTitle: targetDomainObj.title,
      candidateId: `usr-ext-${Date.now()}`,
      candidateName: fakeName,
      candidateEmail: `${fakeName.toLowerCase().replace(/\s+/g, '.')}@googleform-sync.edu`,
      candidatePhone: '+1 (555) 441-2910',
      university: 'Tech Institute of Applied Sciences',
      degree: 'B.S. in Computer Engineering',
      semester: '6th Semester',
      skills: targetDomainObj.requiredSkills.slice(0, 4),
      relevantExperience: 'Synchronized via Google Forms Webhook and Google Apps Script connector.',
      purposeStatement: 'Applied through the official CertOfThings Google Form entry point.',
      projectExperience: 'Hands-on academic coursework and collaborative GitHub repositories.',
      availableHoursPerWeek: 20,
      resumeName: `${fakeName.replace(/\s+/g, '_')}_GoogleForm_Resume.pdf`,
      answers: {
        source: 'Google Forms Sync Webhook v2'
      },
      status: 'submitted',
      appliedDate: new Date().toISOString().split('T')[0],
      submissionSource: 'google_forms_sync',
      timeline: [
        {
          step: 1,
          title: 'Google Form Response Recorded',
          description: 'Synced via Google Apps Script POST webhook.',
          timestamp: new Date().toLocaleString(),
          completed: true
        },
        {
          step: 2,
          title: 'Confirmation Dispatched',
          description: 'Automated receipt acknowledgement sent.',
          timestamp: new Date().toLocaleString(),
          completed: true
        },
        { step: 3, title: 'Under Review', description: 'Assigned to review pool.', timestamp: 'In progress', completed: false },
        { step: 4, title: 'Shortlisted', description: 'Pending.', timestamp: 'Pending', completed: false },
        { step: 5, title: 'Interview', description: 'Pending.', timestamp: 'Pending', completed: false },
        { step: 6, title: 'Final Decision', description: 'Pending.', timestamp: 'Pending', completed: false },
        { step: 7, title: 'Offer Letter Issued', description: 'Pending.', timestamp: 'Pending', completed: false }
      ]
    };

    setApplications(prev => [newApp, ...prev]);
    setGoogleFormsConfig(prev => ({
      ...prev,
      lastSyncAt: new Date().toLocaleString(),
      totalSyncedCount: prev.totalSyncedCount + 1
    }));

    sendMockEmail(
      newApp.candidateEmail,
      newApp.candidateName,
      'Your Google Form Internship Submission Has Been Received – CertOfThings',
      'application_received',
      `Your submission (${appNum}) for ${targetDomainObj.title} via Google Forms was ingested into the admissions pipeline.`,
      `<div style="padding:20px;background:#0f111a;color:#fff;border-radius:8px;"><h3>Google Form Sync Received</h3><p>Hello ${fakeName}, your application for ${targetDomainObj.title} has been logged in CertOfThings.</p></div>`
    );

    return { count: 1, syncedAppNumber: appNum };
  };

  const exportApplicationsCSV = () => {
    const headers = ['Application #', 'Candidate Name', 'Email', 'Domain', 'Status', 'Applied Date', 'University', 'Source'];
    const rows = applications.map(app => [
      app.applicationNumber,
      `"${app.candidateName}"`,
      app.candidateEmail,
      `"${app.domainTitle}"`,
      app.status,
      app.appliedDate,
      `"${app.university}"`,
      app.submissionSource
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CertOfThings_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchUserRole,
        internships,
        applications,
        offerLetters,
        savedInternshipIds,
        emailNotifications,
        smtpConfig,
        setSmtpConfig,
        googleFormsConfig,
        setGoogleFormsConfig,
        activeTab,
        setActiveTab,
        selectedInternship,
        setSelectedInternship,
        applyInternship,
        setApplyInternship,
        viewingOfferLetter,
        setViewingOfferLetter,
        scheduleInterviewApp,
        setScheduleInterviewApp,
        isProfileModalOpen,
        setIsProfileModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isEmailLogOpen,
        setIsEmailLogOpen,
        isGoogleFormsModalOpen,
        setIsGoogleFormsModalOpen,
        toggleSaveInternship,
        submitApplication,
        updateApplicationStatus,
        scheduleInterview,
        generateOfferLetter,
        acceptOfferLetter,
        addInternship,
        updateInternship,
        deleteInternship,
        updateUserProfile,
        sendMockEmail,
        simulateGoogleFormSync,
        exportApplicationsCSV
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
