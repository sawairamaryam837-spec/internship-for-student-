import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Printer,
  Download,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Award,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const OfferLetterModal: React.FC = () => {
  const { viewingOfferLetter, setViewingOfferLetter, acceptOfferLetter } = useApp();
  const letterRef = useRef<HTMLDivElement>(null);

  if (!viewingOfferLetter) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleAccept = () => {
    acceptOfferLetter(viewingOfferLetter.id);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-2xl border border-purple-900/60 bg-[#0e101b] text-slate-200 shadow-2xl shadow-purple-950/70 overflow-hidden">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print border-b border-purple-950/80 bg-[#121422] p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Award className="h-4 w-4 text-purple-400 shrink-0" />
              <span className="font-display text-xs sm:text-sm font-bold text-white truncate">
                Official Institutional Offer Letter
              </span>
            </div>
            <span className="font-mono text-[11px] text-purple-300 bg-purple-950/60 border border-purple-800/40 px-2 py-0.5 rounded shrink-0">
              {viewingOfferLetter.verificationCode}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-end">
            {viewingOfferLetter.status === 'issued' ? (
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-initial min-h-[42px] flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 px-4 py-2 text-xs font-semibold text-white shadow active:scale-95 transition-all"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Accept Offer</span>
              </button>
            ) : (
              <span className="min-h-[42px] flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1.5 rounded-xl">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Offer Accepted</span>
              </span>
            )}

            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial min-h-[42px] flex items-center justify-center gap-1.5 rounded-xl border border-purple-800/50 bg-[#1a1d30] hover:bg-[#222640] px-3.5 py-2 text-xs font-medium text-purple-200 active:scale-95 transition-colors"
            >
              <Printer className="h-4 w-4" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={() => setViewingOfferLetter(null)}
              aria-label="Close offer letter"
              className="min-h-[42px] min-w-[42px] flex items-center justify-center rounded-xl border border-purple-900/40 bg-[#141728] text-slate-400 hover:text-white active:scale-95 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Offer Letter Document Surface (matches screenshot #2 PathwayxIQ format) */}
        <div
          ref={letterRef}
          className="bg-white text-slate-900 p-5 sm:p-12 font-sans select-text relative overflow-hidden"
        >
          {/* Top Magenta / Purple Header Accent Stripe */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-700" />

          {/* Letterhead Header */}
          <div className="text-center pt-4 mb-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-800 via-indigo-700 to-pink-600 p-1 shadow-md mb-3">
              <div className="flex h-full w-full items-center justify-center rounded-[12px] bg-slate-950 text-white font-bold font-display text-2xl">
                C
              </div>
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-950">
              CertOfThings Global Talent Inc.
            </h1>
            <p className="text-sm font-semibold uppercase tracking-wider text-purple-800 mt-0.5">
              Internship Offer Letter
            </p>
          </div>

          {/* Date & Salutation */}
          <div className="text-sm text-slate-700 mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-1 font-mono text-xs text-slate-600">
              <div>
                <strong>Date:</strong> {viewingOfferLetter.issueDate}
              </div>
              <div>
                <strong>Reference:</strong> {viewingOfferLetter.applicationNumber}
              </div>
            </div>

            <div className="text-base font-semibold text-slate-900">
              Dear {viewingOfferLetter.candidateName},
            </div>

            <p className="leading-relaxed text-justify text-slate-800 text-[13px]">
              We are delighted to welcome you to the <strong className="text-purple-900 underline">{viewingOfferLetter.internshipTitle}</strong> in our fellowship program at <strong className="text-slate-900">CertOfThings Global Talent Inc.</strong> This internship will span a duration of <strong>{viewingOfferLetter.duration}</strong> commencing on <strong>{viewingOfferLetter.startDate}</strong>, designed as a valuable learning experience that provides orientation, skill development, and hands-on application of concepts in a practical environment.
            </p>

            <p className="leading-relaxed text-justify text-slate-800 text-[13px]">
              By accepting this offer, you acknowledge and understand that participation in this program is a specialized fellowship engagement. Furthermore, successful completion of the program provides an accelerated gateway to our engineering alumni network and recruitment partner endorsements.
            </p>

            <p className="leading-relaxed text-justify text-slate-800 text-[13px]">
              You agree to adhere to all organization policies applicable to fellows and interns. This letter constitutes the complete understanding between you and the company regarding your internship, superseding all prior discussions or agreements.
            </p>

            {/* Core Responsibilities Box */}
            <div className="rounded-lg border border-purple-200 bg-purple-50/60 p-4 my-4">
              <div className="font-semibold text-xs text-purple-950 uppercase tracking-wider mb-2">
                Fellowship Objectives & Responsibilities:
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-800">
                {viewingOfferLetter.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
              <div className="mt-2 pt-2 border-t border-purple-200 text-xs font-semibold text-purple-900 flex flex-col sm:flex-row sm:justify-between gap-1">
                <span>Stipend Honorarium: {viewingOfferLetter.stipend}</span>
                <span>Location Mode: {viewingOfferLetter.mode}</span>
              </div>
            </div>

            <p className="leading-relaxed text-justify text-slate-800 text-[13px]">
              Upon successful completion of the internship, we will provide you with a completion certificate and a <strong>Letter of Recommendation (LoR)</strong> to recognize your achievements and contributions.
            </p>

            <p className="leading-relaxed text-justify text-slate-800 text-[13px]">
              We eagerly anticipate your commencement of the internship program and extend our warmest wishes for a meaningful and prosperous experience.
            </p>
          </div>

          {/* Signatory Section */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs text-slate-500 mb-2">Sincerely,</div>
              <div className="font-display font-bold text-slate-900 text-sm">{viewingOfferLetter.organizationName}</div>
              <div className="font-serif italic text-base text-purple-900 my-1 font-semibold">
                {viewingOfferLetter.authorizedSignatory}
              </div>
              <div className="text-xs text-slate-600">{viewingOfferLetter.signatoryTitle}</div>
            </div>

            {/* Verification QR Stamp */}
            <div className="sm:text-right">
              <div className="inline-flex flex-col items-center border border-purple-300 rounded p-1.5 bg-purple-50/40 text-[9px] font-mono text-purple-950">
                <ShieldCheck className="h-6 w-6 text-purple-800 mb-0.5" />
                <span>VERIFIED OFFER</span>
                <span className="font-bold">{viewingOfferLetter.verificationCode}</span>
              </div>
            </div>
          </div>

          {/* Footer Grid matching screenshot #2 (E-mail, WEBSITE, LinkedIn) */}
          <div className="mt-8 pt-4 border-t border-slate-300 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 text-[11px] text-slate-600">
            <div>
              <div className="font-bold text-slate-900 uppercase">E-mail</div>
              <div className="text-purple-800 font-medium">admissions@certofthings.io</div>
            </div>
            <div className="sm:text-center">
              <div className="font-bold text-slate-900 uppercase">WEBSITE</div>
              <div className="text-purple-800 font-medium">certofthings.io</div>
            </div>
            <div className="sm:text-right">
              <div className="font-bold text-slate-900 uppercase">LinkedIn</div>
              <div className="text-purple-800 font-medium">company/certofthings</div>
            </div>
          </div>

          {/* Bottom Pink/Purple Decorative Geometric Edge (matching screenshot #2) */}
          <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-800" />
        </div>
      </div>
    </div>
  );
};
