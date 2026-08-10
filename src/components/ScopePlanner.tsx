import React, { useState } from 'react';
import { Layers, CheckCircle2, Circle, Mail, ArrowRight } from 'lucide-react';
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
    <section id="scope-planner" className="py-20 border-b border-[#1f4230] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#143122] border border-[#e5b958]/35 text-[#f3d38c] text-sm font-semibold">
            <Layers className="w-4 h-4 text-[#f3d38c]" />
            <span>Tailored C-Suite Scope Builder</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#f2faf5]">
            Custom Engagement Scope Planner
          </h2>
          <p className="text-base sm:text-lg text-[#b2c5b9] leading-relaxed">
            Select the exact modules required for your organization to generate an immediate scope proposal and investment breakdown in Ringgit Malaysia (RM).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Module Checklist Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-sm font-mono font-bold text-[#f2faf5] border-b border-[#1f4230] pb-3">
              <span>AVAILABLE MODULES ({ADVISORY_MODULES.length})</span>
              <span className="text-[#a8bba0]">Click to toggle modules</span>
            </div>

            <div className="space-y-3">
              {ADVISORY_MODULES.map((module) => {
                const isSelected = selectedModuleIds.includes(module.id);
                return (
                  <div
                    key={module.id}
                    onClick={() => toggleModule(module.id)}
                    className={`p-4.5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? 'bg-[#143122] border-[#e5b958] shadow-lg'
                        : 'bg-[#0e2117] border-[#224835] hover:border-[#90d0a7]/40 opacity-80'
                    }`}
                  >
                    <div className="mt-1 shrink-0">
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-[#f3d38c]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#a8bba0]" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-base font-bold text-[#f2faf5]">{module.name}</h4>
                        <span className="text-sm font-mono font-bold text-[#f3d38c] shrink-0">
                          RM {module.basePrice.toLocaleString()} / p.a.
                        </span>
                      </div>

                      <p className="text-sm text-[#b2c5b9] leading-relaxed">{module.description}</p>

                      <div className="flex items-center gap-3 pt-1 text-xs font-mono text-[#90d0a7]">
                        <span className="uppercase text-[#a8bba0]">Pillar: {module.pillar}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Proposal Summary Box */}
          <div className="lg:col-span-5 forest-card rounded-2xl p-6 sm:p-8 border border-[#e5b958]/35 sticky top-24 space-y-6">
            <div className="border-b border-[#1f4230] pb-4">
              <span className="text-xs font-mono uppercase font-bold text-[#f3d38c] bg-[#e5b958]/15 px-2.5 py-1 rounded border border-[#e5b958]/35">
                Direct Scope Proposal Breakdown
              </span>
              <h3 className="font-display text-2xl font-bold text-[#f2faf5] mt-2">
                Scope Summary
              </h3>
            </div>

            {/* Selected items list */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {selectedModules.length === 0 ? (
                <p className="text-sm text-[#b2c5b9] italic">No modules selected. Select modules from the left list.</p>
              ) : (
                selectedModules.map((m) => (
                  <div key={m.id} className="p-2.5 rounded-lg bg-[#0e2117] border border-[#224835] flex items-center justify-between text-sm">
                    <span className="text-[#e2f1e8] font-medium truncate max-w-[200px]">{m.name}</span>
                    <span className="font-mono text-[#f3d38c]">RM {m.basePrice.toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>

            {/* Total Calculations */}
            <div className="p-4 rounded-xl bg-[#143122] border border-[#90d0a7]/30 space-y-3">
              <div className="flex items-center justify-between text-sm text-[#b2c5b9]">
                <span>Selected Scope Modules:</span>
                <span className="font-mono text-[#f2faf5] font-bold">{selectedModules.length} Modules</span>
              </div>

              <div className="pt-2 border-t border-[#1f4230] flex items-center justify-between">
                <span className="text-sm font-bold text-[#f2faf5] uppercase font-mono">Estimated Investment:</span>
                <span className="text-3xl font-extrabold font-grotesk text-[#f3d38c]">
                  RM {totalPriceRM.toLocaleString()} / p.a.
                </span>
              </div>
            </div>

            <p className="text-xs text-[#b2c5b9] leading-tight">
              • Includes direct CA(M) & Oxford Certified Sustainable Corporations Expert oversight, analytics verification trails, and custom pipeline implementation.
            </p>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleBookConsultationEmail}
                disabled={selectedModules.length === 0}
                className="w-full py-3.5 rounded-xl text-sm font-bold gold-gradient-btn transition-all flex items-center justify-center gap-2 gold-glow disabled:opacity-50"
              >
                <Mail className="w-4 h-4 text-[#08150e]" />
                <span>Request Official Scope Proposal</span>
                <ArrowRight className="w-4 h-4 text-[#08150e]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
