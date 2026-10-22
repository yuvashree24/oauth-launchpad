import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, Code2, Layers } from 'lucide-react';
import { OAuthGuide } from '../types/guide';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  guide: OAuthGuide;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, guide }) => {
  const [format, setFormat] = useState<'markdown' | 'jira' | 'json'>('markdown');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const disclaimer =
    guide.disclaimerText ||
    'Provider requirements change. Verified findings are based on the linked official documentation; estimates are planning guidance, not provider guarantees.';

  const generateMarkdown = () => {
    return `# ${guide.name} - OAuth 2.0 Integration Guide
**Provider:** ${guide.provider} | **Difficulty:** ${guide.difficulty}
**Estimated Hands-on Developer Effort:** ${guide.handsOnEffort.label} [ESTIMATE]
**Approval Waiting Time:** ${guide.approvalWaitTime.timeline} [${guide.approvalWaitTime.evidenceStatus || 'ESTIMATE'}]

> **DISCLAIMER:** ${disclaimer}

> **CRITICAL DISTINCTION:** ${guide.approvalWaitTime.distinctionNotice}

## What Changes the Answer?
${(guide.whatChangesTheAnswer || [])
  .map((f) => `- **${f.factor}:** ${f.summary} — *${f.impact}*`)
  .join('\n')}

## Overview
${guide.overview}

## Hands-On Effort Breakdown (Estimates)
*Basis: ${guide.handsOnEffort.basisNotes}*
${guide.handsOnEffort.breakdown.map((b) => `- **${b.task}** (${b.hours} [${b.status || 'ESTIMATE'}]): ${b.note}`).join('\n')}

## Approval Stages & Tiers
${guide.approvalWaitTime.stages
  .map(
    (s) =>
      `### ${s.stage} (${s.duration} [${s.durationStatus}])\n${s.details}\n*Required for:* ${s.requiredFor}${
        s.conditionNote ? `\n*Condition:* ${s.conditionNote}` : ''
      }`
  )
  .join('\n\n')}

## Evidence & Confidence Findings
| Finding | Status | Source | Last Checked |
|---|---|---|---|
${(guide.evidenceFindings || [])
  .map((ef) => `| ${ef.finding} | **${ef.status}** | [${ef.sourceTitle}](${ef.sourceUrl}) | ${ef.lastChecked} |`)
  .join('\n')}

## Step-by-Step Implementation Checklist
${guide.checklist
  .map(
    (c, i) =>
      `### ${i + 1}. ${c.title} [${c.actorLabel}] [${c.evidenceStatus}]\n${c.description}\n${
        c.details ? c.details.map((d) => `  - ${d}`).join('\n') : ''
      }`
  )
  .join('\n\n')}

## Common Blockers & Solutions
${guide.blockers
  .map(
    (b) =>
      `### [${b.severity.toUpperCase()}] [${b.evidenceStatus}] ${b.title}\n- **Symptom:** ${b.symptom}\n- **Root Cause:** ${b.rootCause}\n- **Resolution:** ${b.resolution}`
  )
  .join('\n\n')}

## RACI Matrix (Developer vs AI Agent)
| Task | Developer (Human) | Agent / System | Rationale |
|---|---|---|---|
${guide.raci.map((r) => `| ${r.task} | ${r.developerRole} | ${r.agentRole} | ${r.rationale} |`).join('\n')}

---
*Exported from OAuth Launchpad - Composio APM Project*
`;
  };

  const generateJira = () => {
    return `h1. [Spike / Story] OAuth Integration: ${guide.name} (${guide.provider})

h2. Disclaimer
{quote}${disclaimer}{quote}

h2. Summary
* *Estimated Engineering Effort:* ${guide.handsOnEffort.label} (ESTIMATE)
* *Approval Waiting Time:* ${guide.approvalWaitTime.timeline} (${guide.approvalWaitTime.evidenceStatus || 'ESTIMATE'})
* *Difficulty:* ${guide.difficulty}

h2. What Changes the Answer?
${(guide.whatChangesTheAnswer || []).map((f) => `* *${f.factor}:* ${f.summary}`).join('\n')}

h2. Important Notice
{quote}${guide.approvalWaitTime.distinctionNotice}{quote}

h2. Evidence & Confidence
|| Finding || Status || Source ||
${(guide.evidenceFindings || []).map((ef) => `| ${ef.finding} | ${ef.status} | [${ef.sourceTitle}|${ef.sourceUrl}] |`).join('\n')}

h2. Acceptance Criteria Checklist
${guide.checklist.map((c) => `* [ ] (${c.actorLabel}) [${c.evidenceStatus}] ${c.title} - ${c.description}`).join('\n')}

h2. Key Blockers & Risks
${guide.blockers.map((b) => `* *${b.title} (${b.severity}) [${b.evidenceStatus}]:* ${b.resolution}`).join('\n')}

h2. RACI Responsibility Split
${guide.raci.map((r) => `* *${r.task}:* Dev: ${r.developerRole} | Agent: ${r.agentRole}`).join('\n')}
`;
  };

  const generateJson = () => {
    return JSON.stringify(guide, null, 2);
  };

  const getContent = () => {
    switch (format) {
      case 'markdown':
        return generateMarkdown();
      case 'jira':
        return generateJira();
      case 'json':
        return generateJson();
    }
  };

  const content = getContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = format === 'json' ? 'json' : 'txt';
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${guide.id}-oauth-guide.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">
              Export {guide.name} Guide
            </h3>
            <p className="text-xs text-slate-400">
              Format for project management, documentation, or code repositories.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Format Selectors */}
        <div className="flex items-center gap-2 pt-4 pb-3">
          <button
            onClick={() => setFormat('markdown')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              format === 'markdown'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Markdown (.md)
          </button>
          <button
            onClick={() => setFormat('jira')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              format === 'jira'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            JIRA / Linear Ticket
          </button>
          <button
            onClick={() => setFormat('json')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              format === 'json'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Raw JSON
          </button>
        </div>

        {/* Preview Container */}
        <div className="flex-1 min-h-[300px] overflow-y-auto rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-all">
          {content}
        </div>

        {/* Actions Bottom Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-4">
          <span className="text-xs text-slate-500">
            Ready to paste directly into your wiki or sprint backlog.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Download File</span>
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy to Clipboard</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
