import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  FileCode,
  ShieldCheck,
  HelpCircle,
  Mail,
  Linkedin,
  Github,
  CheckCircle2,
  Server,
  FileText,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const { setActiveTab } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does CertOfThings verify candidate applications?',
      a: 'Every application undergoes automated duplicate verification and domain-specific assessment review. Once submitted, candidates receive an instant confirmation email and application tracking ID (#COT-XXXXX).'
    },
    {
      q: 'Are the internship certificates and offer letters verifiable?',
      a: 'Yes. All issued offer letters contain a unique institutional verification hash (e.g. COT-VERIFY-2026-XXXXX) and authorized signatures from executive leadership, complying with university academic accreditation standards.'
    },
    {
      q: 'Can I apply through Google Forms instead of the native portal?',
      a: 'Absolutely. CertOfThings supports dual application intake. You can apply using either the native portal or the linked Google Form. Submissions made via Google Forms are automatically ingested into the recruiter database via our Google Apps Script webhook.'
    },
    {
      q: 'What is the expected application review period?',
      a: 'Admissions reviews portfolios within 3 to 5 business days. You can track your real-time stage (Applied, Screening, Interview, Offer) on the Candidate Tracker Kanban board.'
    },
    {
      q: 'Is there a stipend provided during the fellowship?',
      a: 'Yes, 18 of our 20 technical domains offer competitive monthly performance honorariums ranging between $600 and $1,600 per month depending on seniority and weekly hourly commitment.'
    }
  ];

  return (
    <div className="py-10 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-purple-400 bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full">
            <span>CertOfThings Knowledge Base & Resources</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Developer Documentation & Candidate Handbook
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Everything you need to know about the 20 technical domains, assessment rubrics, webhook synchronization, and institutional offer letters.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-purple-900/30 bg-[#0e101b] p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-950 border border-purple-800/40 text-purple-400 mb-4">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-bold text-white mb-2">
              Curriculum & Skill Rubrics
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Detailed breakdown of core responsibilities, expected project deliveries, and Git workflows across all 20 technical tracks.
            </p>
            <button
              onClick={() => setActiveTab('explore')}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300"
            >
              Browse 20 Domains &rarr;
            </button>
          </div>

          <div className="rounded-2xl border border-purple-900/30 bg-[#0e101b] p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-950 border border-indigo-800/40 text-indigo-400 mb-4">
              <FileCode className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-bold text-white mb-2">
              Google Forms & Webhook Sync
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Full Google Apps Script webhook integration guide allowing synchronized data ingestion from Google Forms directly to our backend.
            </p>
            <button
              onClick={() => setActiveTab('admin')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Open Webhook Patcher &rarr;
            </button>
          </div>

          <div className="rounded-2xl border border-purple-900/30 bg-[#0e101b] p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-950 border border-violet-800/40 text-violet-400 mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-display text-base font-bold text-white mb-2">
              Accreditation & Letter of Offer
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              PathwayxIQ compliant offer letter format with digital tamper-resistant hashes, authorized signatures, and university verification.
            </p>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="text-xs font-semibold text-violet-400 hover:text-violet-300"
            >
              Candidate Portal &rarr;
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-display text-2xl font-bold text-white text-center mb-6">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-purple-900/30 bg-[#0e101b] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-xs font-semibold text-white hover:text-purple-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-purple-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-purple-950/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Developer Contact Card from Prompt */}
        <div className="rounded-2xl border border-purple-800/50 bg-[#121422] p-8 max-w-3xl mx-auto shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-1">
                Portal Architect & Lead Engineer
              </div>
              <h3 className="font-display text-xl font-bold text-white">Sawaira Maryam</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-md">
                Full-stack developer specializing in scalable React ecosystems, dark-mode SaaS interfaces, automated applicant tracking systems, and institutional recruitment portals.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs">
                <a
                  href="mailto:SawairaMaryam12@outlook.com"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-purple-300 transition-colors"
                >
                  <Mail className="h-4 w-4 text-purple-400" />
                  <span>SawairaMaryam12@outlook.com</span>
                </a>
                <a
                  href="https://linkedin.com/in/maryam-55b6653b8/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-purple-300 transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-blue-400" />
                  <span>maryam-55b6653b8</span>
                </a>
                <a
                  href="https://github.com/sawairamaryam837-spec"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-purple-300 transition-colors"
                >
                  <Github className="h-4 w-4 text-slate-300" />
                  <span>sawairamaryam837-spec</span>
                </a>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('explore')}
              className="rounded-xl bg-purple-600 hover:bg-purple-500 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-900/30 transition-colors shrink-0"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
