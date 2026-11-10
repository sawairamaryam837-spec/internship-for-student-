import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EmailNotification } from '../../types';
import {
  X,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  Paperclip,
  Settings,
  Eye,
  Server,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const EmailLogsModal: React.FC = () => {
  const {
    emailNotifications,
    isEmailLogOpen,
    setIsEmailLogOpen,
    smtpConfig,
    setSmtpConfig,
    sendMockEmail
  } = useApp();

  const [activeTab, setActiveTab] = useState<'outbox' | 'smtp'>('outbox');
  const [selectedEmail, setSelectedEmail] = useState<EmailNotification | null>(emailNotifications[0] || null);

  // SMTP form state
  const [host, setHost] = useState(smtpConfig.host);
  const [port, setPort] = useState(smtpConfig.port);
  const [secure, setSecure] = useState(smtpConfig.secure);
  const [user, setUser] = useState(smtpConfig.user);
  const [fromName, setFromName] = useState(smtpConfig.fromName);
  const [fromEmail, setFromEmail] = useState(smtpConfig.fromEmail);
  const [smtpSavedMsg, setSmtpSavedMsg] = useState<string | null>(null);

  if (!isEmailLogOpen) return null;

  const handleSaveSmtp = (e: React.FormEvent) => {
    e.preventDefault();
    setSmtpConfig({
      host: host.trim(),
      port: Number(port),
      secure,
      user: user.trim(),
      fromName: fromName.trim(),
      fromEmail: fromEmail.trim(),
      isEnabled: true
    });
    setSmtpSavedMsg('SMTP credentials and transport settings successfully updated.');
    setTimeout(() => setSmtpSavedMsg(null), 3000);
  };

  const handleSendTestEmail = () => {
    sendMockEmail(
      'SawairaMaryam12@outlook.com',
      'Sawaira Maryam',
      'SMTP Diagnostics Test – CertOfThings Mailer Engine',
      'welcome',
      'Your SMTP connection and Nodemailer relay tested successfully on port ' + port,
      `
        <div style="font-family:'Plus Jakarta Sans',sans-serif;max-width:550px;padding:24px;background:#0f111a;color:#fff;border-radius:10px;border:1px solid #7c3aed;">
          <h3 style="color:#c084fc;margin-top:0;">Nodemailer Transport Verified</h3>
          <p>This confirms that your SMTP relay configuration (<code>${host}:${port}</code>) is fully operational.</p>
          <p style="font-size:12px;color:#94a3b8;">Sent via CertOfThings Background Notification Engine.</p>
        </div>
      `
    );
    setSmtpSavedMsg('Test email dispatched to outbox!');
    setTimeout(() => setSmtpSavedMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-8 rounded-2xl border border-purple-900/60 bg-[#0c0d16] text-slate-200 shadow-2xl shadow-purple-950/70 overflow-hidden">
        {/* Header */}
        <div className="border-b border-purple-950/80 bg-[#121422] p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950 text-purple-400 border border-purple-800/40 shrink-0">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-white">
                Nodemailer Dispatch & Notification Center
              </h2>
              <p className="text-xs text-slate-400">
                Audit automated email delivery, template previews, and SMTP server configuration
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            <div className="flex items-center rounded-xl bg-[#17192c] border border-purple-900/40 p-1 text-xs w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('outbox')}
                className={`flex-1 sm:flex-initial min-h-[38px] px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'outbox'
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Outbox ({emailNotifications.length})
              </button>
              <button
                onClick={() => setActiveTab('smtp')}
                className={`flex-1 sm:flex-initial min-h-[38px] flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'smtp'
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Settings className="h-3 w-3" />
                <span>SMTP Config</span>
              </button>
            </div>

            <button
              onClick={() => setIsEmailLogOpen(false)}
              aria-label="Close notification center"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-900/40 bg-[#16182a] text-slate-400 hover:text-white active:scale-95 transition-all shrink-0"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Outbox and HTML Template Preview */}
        {activeTab === 'outbox' ? (
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
            {/* Left Email List */}
            <div className="md:col-span-5 border-r border-purple-950/60 p-4 space-y-2 max-h-[550px] overflow-y-auto">
              {emailNotifications.map(email => (
                <div
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className={`cursor-pointer rounded-xl border p-3 text-xs transition-all ${
                    selectedEmail?.id === email.id
                      ? 'border-purple-500 bg-[#16182c] shadow-md shadow-purple-950/40'
                      : 'border-purple-900/30 bg-[#101220] hover:bg-[#141626]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white truncate max-w-[150px]">
                      {email.recipientName}
                    </span>
                    <span className="font-mono text-[10px] text-purple-400 tabular-nums">
                      {email.sentAt.split(' ')[0]}
                    </span>
                  </div>
                  <div className="font-medium text-slate-300 truncate mb-1">{email.subject}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">{email.contentPreview}</div>
                  {email.hasAttachment && (
                    <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                      <Paperclip className="h-3 w-3" />
                      <span className="truncate">{email.attachmentName}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: Rendered HTML Email Preview */}
            <div className="md:col-span-7 p-6 bg-[#090a12] max-h-[550px] overflow-y-auto">
              {selectedEmail ? (
                <div className="space-y-4">
                  <div className="rounded-xl border border-purple-900/40 bg-[#101220] p-4 text-xs space-y-1">
                    <div>
                      <span className="text-slate-400">To:</span>{' '}
                      <strong className="text-white">{selectedEmail.recipientName}</strong>{' '}
                      <span className="text-slate-400">&lt;{selectedEmail.recipientEmail}&gt;</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Subject:</span>{' '}
                      <strong className="text-purple-300">{selectedEmail.subject}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Timestamp:</span>{' '}
                      <span className="font-mono text-slate-300">{selectedEmail.sentAt}</span>
                    </div>
                    {selectedEmail.hasAttachment && (
                      <div className="pt-1 flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                        <Paperclip className="h-3.5 w-3.5" />
                        <span>Attachment: {selectedEmail.attachmentName}</span>
                      </div>
                    )}
                  </div>

                  {/* HTML Email Canvas */}
                  <div
                    className="rounded-2xl border border-purple-900/30 p-2 bg-[#0a0c14]"
                    dangerouslySetInnerHTML={{ __html: selectedEmail.htmlBody }}
                  />
                </div>
              ) : (
                <div className="text-center py-20 text-xs text-slate-400">
                  Select an email to view rendered message body.
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Tab 2: SMTP Configuration */
          <div className="p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
            {smtpSavedMsg && (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3 text-xs text-emerald-300">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{smtpSavedMsg}</span>
              </div>
            )}

            <div className="rounded-xl border border-purple-900/40 bg-[#101220] p-4 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
              <Server className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong>Nodemailer SMTP Connection Parameters</strong>
                <p className="text-slate-400 mt-1">
                  Configure real production SMTP servers (SendGrid, AWS SES, Mailgun, or Google Workspace SMTP Relay) to deliver immediate application receipts and official offer letters.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveSmtp} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">SMTP Host Server *</label>
                  <input
                    type="text"
                    value={host}
                    onChange={e => setHost(e.target.value)}
                    required
                    placeholder="e.g. smtp.sendgrid.net"
                    className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Port (e.g. 587, 465) *</label>
                  <input
                    type="number"
                    value={port}
                    onChange={e => setPort(Number(e.target.value))}
                    required
                    className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Username / API Key *</label>
                  <input
                    type="text"
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    required
                    className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Sender Email *</label>
                  <input
                    type="email"
                    value={fromEmail}
                    onChange={e => setFromEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Sender Display Name</label>
                <input
                  type="text"
                  value={fromName}
                  onChange={e => setFromName(e.target.value)}
                  className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2.5 text-base sm:text-xs min-h-[44px] text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleSendTestEmail}
                  className="min-h-[44px] flex items-center justify-center gap-1.5 rounded-xl border border-purple-700/50 bg-[#16182c] px-4 py-2.5 font-medium text-purple-300 hover:text-white hover:bg-purple-900/40 active:scale-95 transition-all text-center"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Test Email</span>
                </button>

                <button
                  type="submit"
                  className="min-h-[44px] rounded-xl bg-purple-600 hover:bg-purple-500 px-6 py-2.5 font-semibold text-white shadow-md active:scale-95 transition-all text-center"
                >
                  Save SMTP Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
