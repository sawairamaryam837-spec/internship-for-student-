export type InternshipMode = 'Remote' | 'Hybrid' | 'Onsite';
export type ApplicationStatus =
  | 'submitted'
  | 'under_review'
  | 'shortlisted'
  | 'interview_scheduled'
  | 'approved'
  | 'rejected'
  | 'offer_issued';

export type UserRole = 'candidate' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  headline?: string;
  phone?: string;
  university?: string;
  degree?: string;
  semester?: string;
  cgpa?: string;
  skills: string[];
  experience?: string;
  resumeName?: string;
  resumeUrl?: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
}

export interface DomainQuestion {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'boolean';
  options?: string[];
  required: boolean;
}

export interface Internship {
  id: string;
  domainKey: string;
  title: string;
  category: string;
  department: string;
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  eligibility: string[];
  educationalRequirements: string;
  duration: '1 Month' | '2 Months' | '3 Months' | '6 Months';
  location: string;
  mode: InternshipMode;
  positions: number;
  deadline: string;
  stipend: string;
  certificateInfo: string;
  learningOutcomes: string[];
  customQuestions: DomainQuestion[];
  googleFormUrl?: string;
  isDemoListing: boolean;
  isActive: boolean;
  iconName: string;
  postedDate: string;
}

export interface ApplicationTimelineEvent {
  step: number;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface InterviewDetails {
  scheduledDate: string;
  scheduledTime: string;
  interviewerName: string;
  meetLink: string;
  roundName: string;
  notes?: string;
}

export interface Application {
  id: string;
  applicationNumber: string; // e.g. #COT-20462
  internshipId: string;
  domainTitle: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  university: string;
  degree: string;
  semester: string;
  skills: string[];
  relevantExperience: string;
  purposeStatement: string;
  projectExperience: string;
  availableHoursPerWeek: number;
  resumeName: string;
  resumeDataUrl?: string;
  portfolioUrl?: string;
  answers: Record<string, string>;
  status: ApplicationStatus;
  appliedDate: string;
  reviewDate?: string;
  reviewNotes?: string;
  timeline: ApplicationTimelineEvent[];
  interview?: InterviewDetails;
  offerLetterId?: string;
  submissionSource: 'native_portal' | 'google_forms_sync';
}

export interface OfferLetter {
  id: string;
  applicationId: string;
  applicationNumber: string;
  candidateName: string;
  candidateEmail: string;
  internshipTitle: string;
  domain: string;
  duration: string;
  startDate: string;
  stipend: string;
  mode: InternshipMode;
  responsibilities: string[];
  terms: string[];
  organizationName: string;
  authorizedSignatory: string;
  signatoryTitle: string;
  issueDate: string;
  verificationCode: string;
  status: 'issued' | 'accepted' | 'declined';
  acceptedAt?: string;
}

export interface EmailNotification {
  id: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  templateType:
    | 'welcome'
    | 'application_received'
    | 'shortlisted'
    | 'interview_invite'
    | 'offer_letter'
    | 'rejection';
  contentPreview: string;
  htmlBody: string;
  sentAt: string;
  status: 'sent' | 'queued' | 'failed';
  hasAttachment?: boolean;
  attachmentName?: string;
}

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  fromName: string;
  fromEmail: string;
  isEnabled: boolean;
}

export interface GoogleFormsIntegrationConfig {
  formId: string;
  formUrl: string;
  webhookSecret: string;
  autoSync: boolean;
  lastSyncAt?: string;
  totalSyncedCount: number;
}
