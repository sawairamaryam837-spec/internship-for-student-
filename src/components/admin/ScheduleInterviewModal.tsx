import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, Video, User, FileText, CheckCircle2 } from 'lucide-react';

export const ScheduleInterviewModal: React.FC = () => {
  const { scheduleInterviewApp, setScheduleInterviewApp, scheduleInterview } = useApp();

  const [date, setDate] = useState('2026-11-18');
  const [time, setTime] = useState('14:00 - 14:45 EST');
  const [interviewer, setInterviewer] = useState('Dr. Adrian Vance');
  const [roundName, setRoundName] = useState('Technical Architecture & Live Evaluation');
  const [meetLink, setMeetLink] = useState('https://meet.google.com/cot-rec-round');
  const [notes, setNotes] = useState('Prepare 2-3 code repositories and be ready for a brief architecture whiteboard.');

  if (!scheduleInterviewApp) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleInterview(scheduleInterviewApp.id, {
      scheduledDate: date,
      scheduledTime: time,
      interviewerName: interviewer,
      roundName,
      meetLink,
      notes
    });
    setScheduleInterviewApp(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl border border-purple-900/60 bg-[#0e101b] p-6 shadow-2xl text-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-purple-950/80 mb-4">
          <div>
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <Video className="h-5 w-5 text-purple-400" />
              Schedule Candidate Interview
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Candidate: <span className="text-white font-semibold">{scheduleInterviewApp.candidateName}</span> ({scheduleInterviewApp.domainTitle})
            </p>
          </div>
          <button
            onClick={() => setScheduleInterviewApp(null)}
            className="p-1.5 rounded-lg border border-purple-900/40 bg-[#141728] text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Interview Date *</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
                className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Time Slot *</label>
              <input
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
                placeholder="14:00 - 14:45 EST"
                required
                className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Interview Round Title *</label>
            <input
              type="text"
              value={roundName}
              onChange={e => setRoundName(e.target.value)}
              required
              className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2 text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Lead Interviewer / Mentor *</label>
            <input
              type="text"
              value={interviewer}
              onChange={e => setInterviewer(e.target.value)}
              required
              className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2 text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Google Meet / Video Conference Link *</label>
            <input
              type="url"
              value={meetLink}
              onChange={e => setMeetLink(e.target.value)}
              required
              className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2 text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Preparation Notes (Sent in email)</label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2 text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-purple-950/80 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setScheduleInterviewApp(null)}
              className="rounded-xl border border-purple-900/40 bg-[#141728] px-4 py-2 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-purple-600 hover:bg-purple-500 px-5 py-2 font-semibold text-white shadow-md transition-colors"
            >
              Confirm & Email Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
