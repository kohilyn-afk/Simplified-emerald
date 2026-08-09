import React, { useState } from 'react';
import { X, Mail, Copy, Check, ExternalLink, Send, ShieldCheck } from 'lucide-react';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposalDetails: {
    subject: string;
    bodyText: string;
    recipient: string;
  };
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  isOpen,
  onClose,
  proposalDetails,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const mailtoUrl = `mailto:${proposalDetails.recipient}?subject=${encodeURIComponent(
    proposalDetails.subject
  )}&body=${encodeURIComponent(proposalDetails.bodyText)}`;

  const handleCopy = async () => {
    try {
      const fullCopy = `To: ${proposalDetails.recipient}\nSubject: ${proposalDetails.subject}\n\n${proposalDetails.bodyText}`;
      await navigator.clipboard.writeText(fullCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08150e]/85 backdrop-blur-md animate-fade-in">
      <div className="forest-card rounded-2xl border border-[#e5b958]/50 w-full max-w-xl overflow-hidden shadow-2xl relative space-y-5 p-6 sm:p-8 text-[#e2f1e8]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#b2c5b9] hover:text-[#f2faf5] hover:bg-[#143122] transition-all border border-[#224835]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-[#f3d38c]" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 border-b border-[#1f4230] pb-4 pr-10">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#f3d38c] bg-[#e5b958]/15 px-2.5 py-0.5 rounded border border-[#e5b958]/35">
            <ShieldCheck className="w-3.5 h-3.5 text-[#f3d38c]" />
            Official Proposal Request
          </div>
          <h3 className="font-display text-2xl font-bold text-[#f2faf5]">
            Submit Advisory Proposal Request
          </h3>
          <p className="text-xs text-[#b2c5b9]">
            Review your customized scope proposal draft below and dispatch directly to Koh I-Lyn & Co.
          </p>
        </div>

        {/* Email Metadata */}
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0e2117] border border-[#224835]">
            <span className="text-[#b2c5b9] font-mono">Recipient:</span>
            <span className="text-[#f3d38c] font-mono font-bold">{proposalDetails.recipient}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e2117] border border-[#224835] space-y-2">
            <div className="flex items-center justify-between text-[#b2c5b9] font-mono text-[11px] pb-1 border-b border-[#1f4230]">
              <span>Subject: {proposalDetails.subject}</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[#f3d38c] hover:text-[#ffffff] transition-colors font-sans text-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            {/* Email Body Content */}
            <pre className="text-xs text-[#e2f1e8] font-sans whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto pr-1 bg-[#091710] p-3 rounded-lg border border-[#1a3828]">
              {proposalDetails.bodyText}
            </pre>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-3 border-t border-[#1f4230]">
          <div className="text-[11px] font-mono text-[#b2c5b9] flex items-center justify-between">
            <span>Select preferred dispatch method:</span>
            {copied && <span className="text-emerald-400 font-bold">Text Copied!</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Native Mail Client Trigger via dynamic anchor */}
            <a
              href={mailtoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                navigator.clipboard.writeText(proposalDetails.bodyText).catch(() => {});
              }}
              className="py-3 px-3.5 rounded-xl text-xs font-bold gold-gradient-btn transition-all flex items-center justify-center gap-2 gold-glow"
            >
              <Send className="w-4 h-4 text-[#08150e]" />
              <span>Default Mail App</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#08150e]" />
            </a>

            {/* Direct Gmail Compose */}
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                proposalDetails.recipient
              )}&su=${encodeURIComponent(proposalDetails.subject)}&body=${encodeURIComponent(
                proposalDetails.bodyText
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-3.5 rounded-xl text-xs font-bold text-[#f2faf5] bg-[#1d4631] hover:bg-[#25573e] border border-[#e5b958]/40 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#f3d38c]" />
              <span>Compose in Gmail</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#f3d38c]" />
            </a>

            {/* Outlook Web Compose */}
            <a
              href={`https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(
                proposalDetails.recipient
              )}&subject=${encodeURIComponent(proposalDetails.subject)}&body=${encodeURIComponent(
                proposalDetails.bodyText
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-3.5 rounded-xl text-xs font-bold text-[#f2faf5] bg-[#1d4631] hover:bg-[#25573e] border border-[#90d0a7]/30 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#a8dadc]" />
              <span>Outlook Web</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#a8dadc]" />
            </a>

            {/* Instant Copy Proposal */}
            <button
              onClick={handleCopy}
              className="py-3 px-3.5 rounded-xl text-xs font-bold text-[#f2faf5] bg-[#143122] hover:bg-[#1b402d] border border-[#90d0a7]/35 transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Proposal Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#f3d38c]" />
                  <span>Copy Proposal Body</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
