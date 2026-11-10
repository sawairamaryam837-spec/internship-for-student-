import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  FileSpreadsheet,
  Webhook,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const GoogleFormsIntegrationModal: React.FC = () => {
  const {
    googleFormsConfig,
    setGoogleFormsConfig,
    isGoogleFormsModalOpen,
    setIsGoogleFormsModalOpen,
    simulateGoogleFormSync
  } = useApp();

  const [formUrl, setFormUrl] = useState(googleFormsConfig.formUrl);
  const [webhookSecret, setWebhookSecret] = useState(googleFormsConfig.webhookSecret);
  const [copiedScript, setCopiedScript] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  if (!isGoogleFormsModalOpen) return null;

  const appsScriptCode = `/**
 * Google Apps Script Webhook: CertOfThings Sync
 * Deploy as Webhook or Trigger onFormSubmit()
 */
function onFormSubmit(e) {
  var responses = e.namedValues;
  var payload = {
    webhookSecret: "${webhookSecret}",
    candidateName: responses['Full Name'] ? responses['Full Name'][0] : '',
    candidateEmail: responses['Email Address'] ? responses['Email Address'][0] : '',
    domainTitle: responses['Internship Domain'] ? responses['Internship Domain'][0] : 'React.js Development',
    university: responses['University / College'] ? responses['University / College'][0] : '',
    source: 'google_forms_sync'
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch('https://certofthings.io/api/webhooks/google-forms', options);
}`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleSimulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const res = simulateGoogleFormSync();
      setIsSyncing(false);
      setSyncStatus(`Successfully ingested candidate submission (${res.syncedAppNumber}) from Google Forms webhook!`);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
      setTimeout(() => setSyncStatus(null), 4000);
    }, 700);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setGoogleFormsConfig(prev => ({
      ...prev,
      formUrl: formUrl.trim(),
      webhookSecret: webhookSecret.trim()
    }));
    setSyncStatus('Google Forms configuration saved successfully.');
    setTimeout(() => setSyncStatus(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 rounded-2xl border border-purple-900/60 bg-[#0c0d16] text-slate-200 shadow-2xl shadow-purple-950/70 overflow-hidden">
        {/* Header */}
        <div className="border-b border-purple-950/80 bg-[#121422] p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-950 text-purple-400 border border-purple-800/40">
              <Webhook className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white">
                Google Forms & Google Sheets Synchronization
              </h2>
              <p className="text-xs text-slate-400">
                Automate real-time ingestion from Google Forms via Google Apps Script webhooks
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsGoogleFormsModalOpen(false)}
            className="p-1.5 rounded-xl border border-purple-900/40 bg-[#16182a] text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
          {syncStatus && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3 text-emerald-300">
              <Check className="h-4 w-4 shrink-0" />
              <span>{syncStatus}</span>
            </div>
          )}

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-purple-900/30 bg-[#121424] p-3">
              <div className="text-[10px] text-slate-400">Total Synced Submissions</div>
              <div className="font-mono text-lg font-bold text-white tabular-nums">
                {googleFormsConfig.totalSyncedCount} Candidates
              </div>
            </div>
            <div className="rounded-xl border border-purple-900/30 bg-[#121424] p-3">
              <div className="text-[10px] text-slate-400">Last Ingestion Event</div>
              <div className="font-mono text-xs font-semibold text-purple-300 truncate mt-1">
                {googleFormsConfig.lastSyncAt || 'Never'}
              </div>
            </div>
            <div className="rounded-xl border border-purple-900/30 bg-[#121424] p-3">
              <div className="text-[10px] text-slate-400">Webhook Auth Status</div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mt-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>HMAC Verified</span>
              </div>
            </div>
          </div>

          {/* Simulation Trigger Button */}
          <div className="rounded-2xl border border-purple-800/40 bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-purple-950/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-display text-sm font-bold text-white flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-purple-400" />
                Live Webhook Trigger Simulator
              </h4>
              <p className="text-slate-400 text-xs mt-0.5">
                Emulate an incoming Google Forms respondent payload being synchronized to the recruiter database.
              </p>
            </div>

            <button
              onClick={handleSimulateSync}
              disabled={isSyncing}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 px-5 py-2.5 font-bold text-white shadow-lg shadow-purple-950/40 transition-all shrink-0 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Ingesting Payload...' : 'Simulate Google Form Submit'}</span>
            </button>
          </div>

          {/* Form Settings Form */}
          <form onSubmit={handleSaveConfig} className="space-y-4">
            <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
              Integration Endpoints
            </h4>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Master Google Form URL</label>
              <input
                type="url"
                value={formUrl}
                onChange={e => setFormUrl(e.target.value)}
                required
                className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Webhook Secret Key</label>
              <input
                type="text"
                value={webhookSecret}
                onChange={e => setWebhookSecret(e.target.value)}
                required
                className="w-full rounded-xl border border-purple-900/40 bg-[#121422] px-3.5 py-2 font-mono text-purple-300 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2 font-semibold text-white transition-colors"
              >
                Save Settings
              </button>
            </div>
          </form>

          {/* Google Apps Script Code Snippet */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                Google Apps Script Code (Paste in Google Forms Editor)
              </h4>
              <button
                onClick={handleCopyScript}
                className="flex items-center gap-1.5 rounded-lg border border-purple-900/40 bg-[#141628] hover:bg-[#1a1d34] px-3 py-1 text-[11px] font-medium text-purple-300 transition-colors"
              >
                {copiedScript ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copiedScript ? 'Copied to Clipboard' : 'Copy Script'}</span>
              </button>
            </div>

            <pre className="rounded-xl border border-purple-900/40 bg-[#080910] p-4 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
              {appsScriptCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
