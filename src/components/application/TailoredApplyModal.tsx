import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Internship } from '../../types';
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TailoredApplyModal: React.FC = () => {
  const {
    applyInternship,
    setApplyInternship,
    currentUser,
    submitApplication,
    setActiveTab
  } = useApp();

  const [mode, setMode] = useState<'native' | 'google_form'>('native');
  const [firstName, setFirstName] = useState(currentUser.name.split(' ')[0] || '');
  const [lastName, setLastName] = useState(currentUser.name.split(' ').slice(1).join(' ') || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState(currentUser.phone || '+1 (555) 234-5678');
  const [university, setUniversity] = useState(currentUser.university || '');
  const [majorGraduation, setMajorGraduation] = useState(`${currentUser.degree || 'Computer Science'}, 2026`);
  const [previousRole, setPreviousRole] = useState(currentUser.headline || 'Frontend / AI Engineering Student');
  const [growthMetrics, setGrowthMetrics] = useState('Optimized page render times by 35% in personal full-stack application');
  const [purposeStatement, setPurposeStatement] = useState(
    'I want to contribute my technical foundation to CertOfThings and gain real production mentorship in a high-caliber team.'
  );
  const [projectExperience, setProjectExperience] = useState(
    'Developed responsive web interfaces, REST APIs, and state hydration architectures with TypeScript and React.'
  );
  const [availableHours, setAvailableHours] = useState<number>(25);
  const [portfolioUrl, setPortfolioUrl] = useState(currentUser.portfolio || 'https://sawairamaryam.dev');
  const [resumeFileName, setResumeFileName] = useState(currentUser.resumeName || 'Sawaira_Maryam_CV_Software_Engineer.pdf');
  const [domainAnswers, setDomainAnswers] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{ appNum: string; msg: string } | null>(null);

  if (!applyInternship) return null;

  const handleCustomAnswerChange = (questionId: string, val: string) => {
    setDomainAnswers(prev => ({ ...prev, [questionId]: val }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        setErrorMsg('Please upload a valid PDF file document.');
        return;
      }
      setResumeFileName(file.name);
      setErrorMsg(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMsg('Please enter your full first and last name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid academic or professional email address.');
      return;
    }

    // Check required domain questions
    for (const q of applyInternship.customQuestions) {
      if (q.required && !domainAnswers[q.id]?.trim()) {
        setErrorMsg(`Please answer the required assessment question: "${q.question}"`);
        return;
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = submitApplication({
        internshipId: applyInternship.id,
        domainTitle: applyInternship.title,
        candidateId: currentUser.id,
        candidateName: `${firstName.trim()} ${lastName.trim()}`,
        candidateEmail: email.trim(),
        candidatePhone: phone.trim(),
        university: university.trim() || 'Engineering University',
        degree: majorGraduation.split(',')[0]?.trim() || 'Computer Science',
        semester: 'Senior Year',
        skills: applyInternship.requiredSkills.slice(0, 5),
        relevantExperience: `${previousRole} — ${growthMetrics}`,
        purposeStatement: purposeStatement.trim(),
        projectExperience: projectExperience.trim(),
        availableHoursPerWeek: Number(availableHours) || 20,
        resumeName: resumeFileName,
        portfolioUrl: portfolioUrl.trim(),
        answers: domainAnswers,
        submissionSource: 'native_portal'
      });

      setIsSubmitting(false);

      if (!res.success) {
        setErrorMsg(res.message);
      } else {
        setSubmissionSuccess({
          appNum: res.applicationId || '#COT-NEW',
          msg: res.message
        });

        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-2xl border border-purple-900/50 bg-[#0c0e18] text-slate-200 shadow-2xl shadow-purple-950/60 overflow-hidden">
        {/* Top Header matching reference screenshot 4 & 5 */}
        <div className="border-b border-purple-950/80 bg-gradient-to-b from-purple-950/30 to-transparent p-5 sm:p-6 text-center relative">
          <button
            onClick={() => {
              setApplyInternship(null);
              setSubmissionSuccess(null);
            }}
            aria-label="Close modal"
            className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-xl border border-purple-900/40 bg-[#121422] text-slate-400 hover:text-white active:scale-95 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight pr-10 sm:pr-0">
            Apply Today
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Ready to join our mission? Submit your tailored application for{' '}
            <span className="text-purple-300 font-semibold">{applyInternship.title}</span>.
          </p>

          {/* Form Mode Toggle - Stack on narrow screens */}
          <div className="flex flex-col sm:inline-flex sm:flex-row items-stretch sm:items-center gap-1.5 mt-4 p-1 rounded-xl bg-[#131626] border border-purple-900/40 text-xs w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setMode('native')}
              className={`min-h-[42px] px-4 py-2 rounded-lg font-medium transition-all active:scale-95 ${
                mode === 'native'
                  ? 'bg-purple-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Native Application Form
            </button>
            <button
              type="button"
              onClick={() => setMode('google_form')}
              className={`min-h-[42px] flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-medium transition-all active:scale-95 ${
                mode === 'google_form'
                  ? 'bg-purple-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Google Forms Version</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Success View */}
        {submissionSuccess ? (
          <div className="p-8 text-center space-y-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold text-white">Application Received!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                {submissionSuccess.msg}
              </p>
              <div className="inline-block rounded-xl border border-purple-800/40 bg-[#131626] px-4 py-2 text-xs font-mono text-purple-300">
                Application Reference ID: {submissionSuccess.appNum}
              </div>
            </div>

            <div className="rounded-xl border border-purple-900/40 bg-[#101220] p-4 text-xs text-slate-400 max-w-md mx-auto text-left space-y-1.5">
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <Sparkles className="h-4 w-4 text-purple-400" /> What happens next?
              </div>
              <p>1. Confirmation email has been sent to your inbox.</p>
              <p>2. Admissions committee reviews within 3-5 business days.</p>
              <p>3. Monitor live status on your Candidate Tracker board.</p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setApplyInternship(null);
                  setActiveTab('dashboard');
                }}
                className="rounded-xl bg-purple-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/30"
              >
                Go to Candidate Tracker
              </button>
              <button
                onClick={() => {
                  setApplyInternship(null);
                  setSubmissionSuccess(null);
                }}
                className="rounded-xl border border-purple-900/40 bg-[#121422] px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        ) : mode === 'google_form' ? (
          /* Google Forms View */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="rounded-xl border border-purple-900/40 bg-[#111322] p-5 text-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-950 text-purple-400 mx-auto">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-white">Google Forms Direct Submission</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Prefer submitting via an official Google Form? Submissions are automatically synced with our CertOfThings recruitment database via Google Apps Script webhooks.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={applyInternship.googleFormUrl || 'https://docs.google.com/forms'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-colors"
                >
                  <span>Open Google Form in New Tab</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="text-xs text-slate-400 border-t border-purple-950/60 pt-4">
              <span className="font-semibold text-purple-400">Webhook Sync:</span> Responses submitted through Google Forms trigger our background webhook parser and appear automatically on the Admin dashboard.
            </div>
          </div>
        ) : (
          /* Native Tailored Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[70vh] overflow-y-auto">
            {errorMsg && (
              <div className="flex items-center gap-2.5 rounded-xl border border-red-500/40 bg-red-950/30 p-3 text-xs text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">First Name *</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  required
                  className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Last Name *</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  required
                  className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  required
                  className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Position of Interest (Pre-filled read-only) */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Position of Interest</label>
              <input
                type="text"
                readOnly
                value={applyInternship.title}
                className="w-full rounded-xl border border-purple-900/40 bg-[#16182c] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-purple-300 font-semibold cursor-not-allowed focus:outline-none"
              />
            </div>

            {/* Major & Graduation (from screenshot 4/5) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Major & Graduation *</label>
                <input
                  type="text"
                  value={majorGraduation}
                  onChange={e => setMajorGraduation(e.target.value)}
                  placeholder="e.g., Computer Science, 2026"
                  required
                  className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">University / College</label>
                <input
                  type="text"
                  value={university}
                  onChange={e => setUniversity(e.target.value)}
                  placeholder="e.g., University of Technology"
                  className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Role at Previous or Current Company */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Role at Previous or Current Company / Lab
              </label>
              <input
                type="text"
                value={previousRole}
                onChange={e => setPreviousRole(e.target.value)}
                placeholder="e.g., Senior Software Engineer at Google / Student Researcher"
                className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Growth Metrics of Previous Job (from screenshot 4/5) */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Growth Metrics of Previous Job / Key Achievement
              </label>
              <input
                type="text"
                value={growthMetrics}
                onChange={e => setGrowthMetrics(e.target.value)}
                placeholder="e.g., Increased user engagement by 40% / Reduced build time by 20%"
                className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Resume Upload (PDF only) matching screenshot 4 & 5 */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Resume (PDF only) *</label>
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-dashed border-purple-800/60 bg-[#121422] p-3.5 hover:border-purple-500 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-950 border border-purple-800/40 text-purple-400 shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-white truncate max-w-xs">{resumeFileName}</div>
                    <div className="text-[10px] text-slate-400">PDF document ready for admissions review</div>
                  </div>
                </div>

                <label className="cursor-pointer min-h-[42px] px-4 py-2 flex items-center justify-center rounded-lg bg-[#181b2e] hover:bg-[#20243d] border border-purple-900/40 text-xs font-medium text-purple-300 active:scale-95 transition-all self-end sm:self-auto w-full sm:w-auto">
                  <span>Replace PDF</span>
                  <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Domain-Specific Custom Questions */}
            {applyInternship.customQuestions.length > 0 && (
              <div className="rounded-xl border border-purple-900/40 bg-[#111322] p-4 space-y-4">
                <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                  Domain Assessment Questions ({applyInternship.title})
                </div>

                {applyInternship.customQuestions.map(q => (
                  <div key={q.id}>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      {q.question} {q.required && <span className="text-purple-400">*</span>}
                    </label>
                    {q.type === 'textarea' ? (
                      <textarea
                        rows={2}
                        value={domainAnswers[q.id] || ''}
                        onChange={e => handleCustomAnswerChange(q.id, e.target.value)}
                        placeholder="Provide details..."
                        required={q.required}
                        className="w-full rounded-xl border border-purple-900/40 bg-[#15172a] px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={domainAnswers[q.id] || ''}
                        onChange={e => handleCustomAnswerChange(q.id, e.target.value)}
                        placeholder="Enter your answer or project URL..."
                        required={q.required}
                        className="w-full rounded-xl border border-purple-900/40 bg-[#15172a] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Why do you want this internship? */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Why do you want this internship at CertOfThings? *
              </label>
              <textarea
                rows={2}
                value={purposeStatement}
                onChange={e => setPurposeStatement(e.target.value)}
                placeholder="Share your technical motivation and what you hope to achieve..."
                required
                className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Links & Availability */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Portfolio or GitHub URL</label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={e => setPortfolioUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Available Hours / Week</label>
                <input
                  type="number"
                  min={10}
                  max={45}
                  value={availableHours}
                  onChange={e => setAvailableHours(Number(e.target.value))}
                  className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-purple-950/80 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 text-center sm:text-left">
                Validated duplicate submission protection active.
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 px-6 py-3 min-h-[46px] text-xs font-semibold text-white shadow-lg shadow-purple-900/40 active:scale-[0.98] transition-all disabled:opacity-50 w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
