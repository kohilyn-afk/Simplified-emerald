import React, { useState } from 'react';
import { X, Mail, Copy, Check, ExternalLink, Send, ShieldCheck, Sparkles } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1917]/50 backdrop-blur-md animate-fade-in">
      <div className="bg-[#ffffff] rounded-2xl border border-[#d4af37]/70 w-full max-w-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)] relative space-y-5 p-6 sm:p-8 text-[#1c1917]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#786b5b] hover:text-[#1c1917] hover:bg-[#faf4e6] transition-all border border-[#ebd8b0] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-[#825e0e]" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 border-b border-[#ebd7a7] pb-4 pr-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#825e0e] bg-[#fdf5e2] px-2.5 py-1 rounded-full border border-[#ecd59b]">
            <Sparkles className="w-3.5 h-3.5 text-[#cba135]" />
            Official Proposal Request
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Submit Scope Proposal Request
          </h3>
          <p className="text-xs sm:text-sm text-[#554d41]">
            Review your customized scope proposal draft below and dispatch directly to Koh I-Lyn & Co.
          </p>
        </div>

        {/* Email Metadata */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#faf6ed] border border-[#ebd8b0]">
            <span className="text-[#6b5f4f] font-mono text-xs">Recipient:</span>
            <span className="text-[#825e0e] font-mono font-bold text-sm">{proposalDetails.recipient}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#faf6ed] border border-[#ebd8b0] space-y-2">
            <div className="flex items-center justify-between text-[#6b5f4f] font-mono text-xs pb-1 border-b border-[#ebd7a7]">
              <span className="truncate max-w-[280px]">Subject: {proposalDetails.subject}</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[#825e0e] hover:text-[#523a05] transition-colors font-sans text-xs font-bold cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#cba135]" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            {/* Email Body Content */}
            <pre className="text-xs sm:text-sm text-[#2c261e] font-sans whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto pr-1 bg-[#ffffff] p-3.5 rounded-lg border border-[#ebd8b0]">
              {proposalDetails.bodyText}
            </pre>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-3 border-t border-[#ebd7a7]">
          <div className="text-xs font-mono text-[#6b5f4f] flex items-center justify-between">
            <span>Select preferred dispatch method:</span>
            {copied && <span className="text-emerald-600 font-bold">Text Copied!</span>}
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
              className="py-3 px-3 rounded-xl text-xs sm:text-sm font-bold gold-gradient-btn transition-all flex items-center justify-center gap-2 gold-glow"
            >
              <Send className="w-4 h-4 text-[#1a1506]" />
              <span>Default Mail App</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#1a1506]" />
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
              className="py-3 px-3 rounded-xl text-xs sm:text-sm font-bold text-[#6a4f10] bg-[#ffffff] hover:bg-[#faf4e6] border border-[#d4af37]/70 transition-all flex items-center justify-center gap-2 shadow-2xs"
            >
              <Mail className="w-4 h-4 text-[#825e0e]" />
              <span>Compose in Gmail</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#825e0e]" />
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
              className="py-3 px-3 rounded-xl text-xs sm:text-sm font-bold text-[#554c41] bg-[#ffffff] hover:bg-[#faf4e6] border border-[#ebd8b0] transition-all flex items-center justify-center gap-2 shadow-2xs"
            >
              <Mail className="w-4 h-4 text-[#8a7b69]" />
              <span>Outlook Web</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8a7b69]" />
            </a>

            {/* Instant Copy Proposal */}
            <button
              onClick={handleCopy}
              className="py-3 px-3 rounded-xl text-xs sm:text-sm font-bold text-[#6a4f10] bg-[#faf6ed] hover:bg-[#faeed3] border border-[#ebd8b0] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Proposal Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#825e0e]" />
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
