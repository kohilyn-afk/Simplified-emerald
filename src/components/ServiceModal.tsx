import React from 'react';
import { X, CheckCircle2, FileText, PhoneCall, Sparkles } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectInPlanner: (serviceId: string) => void;
  onBookCall: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onSelectInPlanner,
  onBookCall
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1917]/50 backdrop-blur-md animate-fade-in">
      <div className="bg-[#ffffff] rounded-2xl border border-[#d4af37]/70 w-full max-w-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.18)] relative space-y-6 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#786b5b] hover:text-[#1c1917] hover:bg-[#faf4e6] transition-all border border-[#ebd8b0] cursor-pointer"
        >
          <X className="w-5 h-5 text-[#825e0e]" />
        </button>

        {/* Header */}
        <div className="space-y-2 border-b border-[#ebd7a7] pb-4 pr-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#825e0e] bg-[#fdf5e2] px-2.5 py-1 rounded-full border border-[#ecd59b] inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#cba135]" />
            Service Pillar Breakdown
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1c1917]">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#554d41] font-medium">
            {service.subtitle}
          </p>
        </div>

        {/* Details & Overview */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#faf6ed] border border-[#ebd8b0] space-y-2">
            <div className="text-xs font-bold text-[#1c1917] font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#cba135]" />
              Strategic Scope & Methodology:
            </div>
            <p className="text-xs sm:text-sm text-[#453e34] leading-relaxed">
              {service.details}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-[#1c1917] font-mono uppercase tracking-wider">
              Core Deliverables Pack:
            </div>
            <div className="space-y-2">
              {service.deliverables.map((del, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#383229] p-2.5 rounded-lg bg-[#ffffff] border border-[#ebd8b0] shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#b88a1b] shrink-0 mt-0.5" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#fcf6e9] border border-[#e5cb87] flex items-center justify-between text-xs sm:text-sm">
            <span className="text-[#554d41] font-medium">Proven Impact Target:</span>
            <span className="font-mono font-bold text-[#825e0e]">{service.impactMetric}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-[#ebd7a7]">
          <button
            onClick={() => {
              onSelectInPlanner(service.id);
              onClose();
            }}
            className="py-3 rounded-xl text-xs font-bold gold-gradient-btn transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#1a1506]" />
            <span>Select Module in Scope Planner</span>
          </button>

          <button
            onClick={() => {
              onBookCall();
              onClose();
            }}
            className="py-3 rounded-xl text-xs font-bold text-[#6a4f10] bg-[#ffffff] hover:bg-[#faf4e6] border border-[#d4af37]/70 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-[#825e0e]" />
            <span>Request Module Proposal</span>
          </button>
        </div>

      </div>
    </div>
  );
};
