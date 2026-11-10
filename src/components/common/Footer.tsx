import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Github, Linkedin, Mail, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="border-t border-purple-950/40 bg-[#07090e] text-slate-400 text-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#0c0e17]">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                </div>
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                CertOfThings
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Premium international internship discovery and automated candidate recruitment ecosystem. Verified credentials, tailored domain applications, and formal offer letter issuance.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/sawairamaryam837-spec"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-900/40 bg-[#10121d] text-slate-300 hover:text-white hover:border-purple-600/50 transition-colors"
                title="GitHub: sawairamaryam837-spec"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/in/maryam-55b6653b8/"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-900/40 bg-[#10121d] text-slate-300 hover:text-white hover:border-purple-600/50 transition-colors"
                title="LinkedIn: maryam-55b6653b8"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:SawairaMaryam12@outlook.com"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-900/40 bg-[#10121d] text-slate-300 hover:text-white hover:border-purple-600/50 transition-colors"
                title="Email: SawairaMaryam12@outlook.com"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Internship Programs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('explore')} className="hover:text-purple-400 transition-colors">
                  Frontend & React.js
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('explore')} className="hover:text-purple-400 transition-colors">
                  Backend & Node.js
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('explore')} className="hover:text-purple-400 transition-colors">
                  Artificial Intelligence & ML
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('explore')} className="hover:text-purple-400 transition-colors">
                  Data Science & Analytics
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('explore')} className="hover:text-purple-400 transition-colors">
                  Cybersecurity & Cloud
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('explore')} className="hover:text-purple-400 transition-colors text-purple-400 font-medium">
                  View All 20 Domains &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Candidate Tools */}
          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Candidate Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-purple-400 transition-colors">
                  Application Tracker (Applyr)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-purple-400 transition-colors">
                  Application Timeline & Stages
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-purple-400 transition-colors">
                  Offer Letter Verifier
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('resources')} className="hover:text-purple-400 transition-colors">
                  Google Forms Integration Spec
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('resources')} className="hover:text-purple-400 transition-colors">
                  Interview Preparation Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Lead Contact Info */}
          <div className="space-y-3">
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Admissions & Developer
            </h4>
            <div className="rounded-lg border border-purple-900/40 bg-[#0f111d] p-3 text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-slate-400 font-mono text-[11px]">Dev:</span>
                <span className="font-medium text-white">Sawaira Maryam</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                <a href="mailto:SawairaMaryam12@outlook.com" className="hover:text-purple-300 truncate">
                  SawairaMaryam12@outlook.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Linkedin className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                <a href="https://linkedin.com/in/maryam-55b6653b8/" target="_blank" rel="noreferrer" className="hover:text-purple-300 truncate">
                  maryam-55b6653b8
                </a>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Certified Candidate Recruitment Engine</span>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-950/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} CertOfThings Global Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('resources')} className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => setActiveTab('resources')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => setActiveTab('resources')} className="hover:text-slate-300 transition-colors">
              Security Standards
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
