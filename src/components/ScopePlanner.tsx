import React, { useState } from 'react';
import { Layers, CheckCircle2, Circle, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { ADVISORY_MODULES } from '../data/siteData';

interface ScopePlannerProps {
  initialSelectedId?: string;
  onOpenContactWithScope: (scopeSummary: string) => void;
}

export const ScopePlanner: React.FC<ScopePlannerProps> = ({ initialSelectedId, onOpenContactWithScope }) => {
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>(
    initialSelectedId ? [initialSelectedId] : ['sustainability', 'accounting', 'analytics']
  );

  const toggleModule = (id: string) => {
    if (selectedModuleIds.includes(id)) {
      setSelectedModuleIds(selectedModuleIds.filter((m) => m !== id));
    } else {
      setSelectedModuleIds([...selectedModuleIds, id]);
    }
  };

  const selectedModules = ADVISORY_MODULES.filter((m) => selectedModuleIds.includes(m.id));
  const totalPriceRM = selectedModules.reduce((acc, m) => acc + m.basePrice, 0);

  const buildScopeSummaryText = () => {
    if (selectedModules.length === 0) return 'No modules selected.';
    const list = selectedModules
      .map((m) => `• ${m.name} — RM ${m.basePrice.toLocaleString()} / p.a.`)
      .join('\r\n');
    return `SELECTED MODULES (${selectedModules.length}):\r\n${list}\r\n\r\nTOTAL ESTIMATED INVESTMENT:\r\nRM ${totalPriceRM.toLocaleString()} / p.a.`;
  };

  const handleBookConsultationEmail = () => {
    const scopeSummary = buildScopeSummaryText();
    if (onOpenContactWithScope) {
      onOpenContactWithScope(scopeSummary);
    } else {
      const subject = encodeURIComponent('Official Scope Proposal Request - Koh I-Lyn & Co.');
      const emailBody = `Hello Koh I-Lyn,\r\n\r\nI would like to request an official proposal for the following selected scope:\r\n\r\n${scopeSummary}\r\n\r\nPlease reach out to me to schedule an initial consultation.\r\n\r\nThank you.`;
      const body = encodeURIComponent(emailBody);
      window.location.href = `mailto:connect@kohilyn.com?subject=${subject}&body=${body}`;
    }
  };

  return (
    <section id="scope-planner" className="py-20 border-b border-[#ebd7a7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffffff] border border-[#d4af37]/50 text-[#825e0e] text-sm font-semibold shadow-sm">
            <Layers className="w-4 h-4 text-[#cba135]" />
            <span className="font-serif-luxury tracking-wide text-sm font-bold">Tailored C-Suite Scope Builder</span>
            <Sparkles className="w-3.5 h-3.5 text-[#cba135]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#1c1917]">
            Custom Engagement Scope Planner
          </h2>
          <p className="text-base sm:text-lg text-[#554d42] leading-relaxed">
            Select the exact modules required for your organization to generate an immediate scope proposal and investment breakdown in Ringgit Malaysia (RM).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Module Checklist Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-sm font-mono font-bold text-[#1c1917] border-b border-[#ebd7a7] pb-3">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#cba135]" />
                AVAILABLE MODULES ({ADVISORY_MODULES.length})
              </span>
              <span className="text-[#8a7a67] text-xs">Click card to toggle</span>
            </div>

            <div className="space-y-3.5">
              {ADVISORY_MODULES.map((module) => {
                const isSelected = selectedModuleIds.includes(module.id);
                return (
                  <div
                    key={module.id}
                    onClick={() => toggleModule(module.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#ffffff] to-[#fcf6e8] border-[#cba135] shadow-md ring-1 ring-[#cba135]/40'
                        : 'bg-[#ffffff] border-[#ead8b3] hover:border-[#cba135]/60 hover:bg-[#fdfaf3] opacity-90'
                    }`}
                  >
                    <div className="mt-1 shrink-0">
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-[#b88a1b]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#cfbca2]" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-base font-bold text-[#1c1917]">{module.name}</h4>
                        <span className="text-sm font-mono font-bold text-[#825e0e] bg-[#fbf3e0] px-2.5 py-0.5 rounded-md border border-[#ecd497] shrink-0">
                          RM {module.basePrice.toLocaleString()} / p.a.
                        </span>
                      </div>

                      <p className="text-sm text-[#50483e] leading-relaxed">{module.description}</p>

                      <div className="flex items-center gap-3 pt-1 text-xs font-mono text-[#825e0e]">
                        <span className="uppercase text-[#8c7b67]">Pillar: {module.pillar}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Proposal Summary Box */}
          <div className="lg:col-span-5 bg-[#ffffff] rounded-2xl p-6 sm:p-8 border border-[#d4af37]/60 shadow-[0_12px_36px_-8px_rgba(212,175,55,0.18)] sticky top-24 space-y-6">
            <div className="border-b border-[#ebd7a7] pb-4">
              <span className="text-xs font-mono uppercase font-bold text-[#825e0e] bg-[#fdf5e2] px-2.5 py-1 rounded-full border border-[#ecd59b] inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#cba135]" />
                Direct Scope Proposal Breakdown
              </span>
              <h3 className="font-display text-2xl font-bold text-[#1c1917] mt-2">
                Scope Summary
              </h3>
            </div>

            {/* Selected items list */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {selectedModules.length === 0 ? (
                <p className="text-sm text-[#8a7a67] italic">No modules selected. Select modules from the left list.</p>
              ) : (
                selectedModules.map((m) => (
                  <div key={m.id} className="p-3 rounded-xl bg-[#faf6ed] border border-[#ebd8b0] flex items-center justify-between text-sm">
                    <span className="text-[#2c261e] font-medium truncate max-w-[200px]">{m.name}</span>
                    <span className="font-mono font-bold text-[#825e0e]">RM {m.basePrice.toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>

            {/* Total Calculations */}
            <div className="p-4.5 rounded-xl bg-gradient-to-br from-[#fcf7ec] to-[#f8eed7] border border-[#e5cb87] space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-sm text-[#665a4a]">
                <span>Selected Scope Modules:</span>
                <span className="font-mono text-[#1c1917] font-bold">{selectedModules.length} Modules</span>
              </div>

              <div className="pt-2 border-t border-[#ebd59b] flex items-center justify-between">
                <span className="text-xs font-bold text-[#1c1917] uppercase font-mono">Estimated Investment:</span>
                <span className="text-3xl font-extrabold font-grotesk text-[#825e0e]">
                  RM {totalPriceRM.toLocaleString()} <span className="text-xs font-normal text-[#665a4a]">/ p.a.</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-[#736655] leading-tight">
              • Includes direct executive oversight, analytics verification trails, and custom pipeline implementation.
            </p>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleBookConsultationEmail}
                disabled={selectedModules.length === 0}
                className="w-full py-4 rounded-xl text-sm font-bold gold-gradient-btn transition-all flex items-center justify-center gap-2 gold-glow disabled:opacity-50 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#1a1506]" />
                <span>Request Official Scope Proposal</span>
                <ArrowRight className="w-4 h-4 text-[#1a1506]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
