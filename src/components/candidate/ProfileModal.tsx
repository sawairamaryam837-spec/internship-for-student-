import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  FileText,
  Linkedin,
  Github,
  Globe,
  Plus,
  Trash2,
  Check
} from 'lucide-react';

export const ProfileModal: React.FC = () => {
  const { currentUser, updateUserProfile, isProfileModalOpen, setIsProfileModalOpen } = useApp();

  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [headline, setHeadline] = useState(currentUser.headline || '');
  const [university, setUniversity] = useState(currentUser.university || '');
  const [degree, setDegree] = useState(currentUser.degree || '');
  const [semester, setSemester] = useState(currentUser.semester || '');
  const [cgpa, setCgpa] = useState(currentUser.cgpa || '');
  const [experience, setExperience] = useState(currentUser.experience || '');
  const [linkedIn, setLinkedIn] = useState(currentUser.linkedIn || '');
  const [github, setGithub] = useState(currentUser.github || '');
  const [portfolio, setPortfolio] = useState(currentUser.portfolio || '');
  const [resumeName, setResumeName] = useState(currentUser.resumeName || 'Resume.pdf');
  const [skills, setSkills] = useState<string[]>(currentUser.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isProfileModalOpen) return null;

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(prev => prev.filter(s => s !== skillToRemove));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeName(file.name);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      headline: headline.trim(),
      university: university.trim(),
      degree: degree.trim(),
      semester: semester.trim(),
      cgpa: cgpa.trim(),
      experience: experience.trim(),
      linkedIn: linkedIn.trim(),
      github: github.trim(),
      portfolio: portfolio.trim(),
      resumeName,
      skills
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsProfileModalOpen(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-2xl border border-purple-900/50 bg-[#0e101b] text-slate-200 shadow-2xl shadow-purple-950/60 overflow-hidden">
        {/* Header */}
        <div className="border-b border-purple-950/80 bg-[#121422] p-5 sm:p-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-bold text-white">Candidate Profile & Academic CV</h2>
            <p className="text-xs text-slate-400 mt-0.5">Manage your candidate credentials and contact information</p>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(false)}
            aria-label="Close profile modal"
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-purple-900/40 bg-[#171a2c] text-slate-400 hover:text-white active:scale-95 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-5 max-h-[72vh] overflow-y-auto">
          {savedSuccess && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3 text-xs text-emerald-300">
              <Check className="h-4 w-4" />
              <span>Profile credentials saved successfully!</span>
            </div>
          )}

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-purple-900/40 bg-[#141728] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Professional Headline</label>
              <input
                type="text"
                value={headline}
                onChange={e => setHeadline(e.target.value)}
                placeholder="e.g. Aspiring Full Stack & AI Software Engineer"
                className="w-full rounded-xl border border-purple-900/40 bg-[#141728] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-purple-900/40 bg-[#141728] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full rounded-xl border border-purple-900/40 bg-[#141728] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Education Details */}
          <div className="pt-2 border-t border-purple-950/60">
            <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">
              Education & University
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">University / Institute</label>
                <input
                  type="text"
                  value={university}
                  onChange={e => setUniversity(e.target.value)}
                  className="w-full rounded-xl border border-purple-900/40 bg-[#141728] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Degree & Major</label>
                <input
                  type="text"
                  value={degree}
                  onChange={e => setDegree(e.target.value)}
                  className="w-full rounded-xl border border-purple-900/40 bg-[#141728] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Semester / Year</label>
                <input
                  type="text"
                  value={semester}
                  onChange={e => setSemester(e.target.value)}
                  placeholder="e.g., 7th Semester"
                  className="w-full rounded-xl border border-purple-900/40 bg-[#141728] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">CGPA / Grade</label>
                <input
                  type="text"
                  value={cgpa}
                  onChange={e => setCgpa(e.target.value)}
                  placeholder="e.g., 3.85 / 4.0"
                  className="w-full rounded-xl border border-purple-900/40 bg-[#141728] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="pt-2 border-t border-purple-950/60">
            <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
              Technical Skills & Proficiencies
            </h4>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="Add skill (e.g. Next.js, Docker, PyTorch)..."
                className="w-full rounded-xl border border-purple-900/40 bg-[#141728] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                aria-label="Add skill"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white active:scale-95 transition-all shrink-0"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {skills.map(s => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#181a2e] border border-purple-800/40 px-3 py-1.5 text-xs font-mono text-purple-300"
                >
                  <span>{s}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s)}
                    aria-label={`Remove ${s}`}
                    className="text-slate-400 hover:text-red-400 p-0.5 rounded transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* CV & Social Links */}
          <div className="pt-2 border-t border-purple-950/60">
            <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">
              CV & Professional Links
            </h4>

            {/* Resume File */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-slate-300 mb-1">Resume Document (PDF)</label>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-purple-900/40 bg-[#121422] p-3.5">
                <div className="flex items-center gap-2.5">
                  <FileText className="h-5 w-5 text-purple-400 shrink-0" />
                  <span className="text-xs font-medium text-white truncate">{resumeName}</span>
                </div>
                <label className="cursor-pointer min-h-[40px] px-3.5 py-2 flex items-center justify-center rounded-lg bg-purple-950 border border-purple-700/40 text-xs text-purple-300 hover:bg-purple-900/50 active:scale-95 transition-all">
                  <span>Upload New PDF</span>
                  <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <Linkedin className="h-3.5 w-3.5 text-blue-400" /> LinkedIn Profile URL
                </label>
                <input
                  type="text"
                  value={linkedIn}
                  onChange={e => setLinkedIn(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full rounded-xl border border-purple-900/40 bg-[#141728] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <Github className="h-3.5 w-3.5 text-slate-300" /> GitHub Profile URL
                </label>
                <input
                  type="text"
                  value={github}
                  onChange={e => setGithub(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full rounded-xl border border-purple-900/40 bg-[#141728] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-emerald-400" /> Personal Portfolio URL
                </label>
                <input
                  type="text"
                  value={portfolio}
                  onChange={e => setPortfolio(e.target.value)}
                  placeholder="https://yourportfolio.dev"
                  className="w-full rounded-xl border border-purple-900/40 bg-[#141728] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-purple-950/80 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className="min-h-[44px] rounded-xl border border-purple-900/40 bg-[#141728] px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white active:scale-95 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[44px] rounded-xl bg-purple-600 hover:bg-purple-500 px-6 py-2.5 text-xs font-semibold text-white shadow-md shadow-purple-900/30 active:scale-95 transition-all"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
