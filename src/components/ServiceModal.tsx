import React from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, FileText, PhoneCall } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08150e]/85 backdrop-blur-md animate-fade-in">
      <div className="forest-card rounded-2xl border border-[#e5b958]/40 w-full max-w-2xl overflow-hidden shadow-2xl relative space-y-6 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#b2c5b9] hover:text-[#f2faf5] hover:bg-[#143122] transition-all border border-[#224835]"
        >
          <X className="w-5 h-5 text-[#f3d38c]" />
        </button>

        {/* Header */}
        <div className="space-y-2 border-b border-[#1f4230] pb-4 pr-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#f3d38c] bg-[#e5b958]/15 px-2.5 py-1 rounded border border-[#e5b958]/35">
            Service Pillar Breakdown
          </span>
          <h3 className="font-display text-2xl font-bold text-[#f2faf5]">
            {service.title}
          </h3>
          <p className="text-xs text-[#90d0a7] font-medium">
            {service.subtitle}
          </p>
        </div>

        {/* Details & Overview */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#0e2117] border border-[#224835] space-y-2">
            <div className="text-xs font-bold text-[#f2faf5] font-mono uppercase tracking-wider">
              Strategic Scope & Methodology:
            </div>
            <p className="text-xs text-[#e2f1e8] leading-relaxed">
              {service.details}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-[#f2faf5] font-mono uppercase tracking-wider">
              Core Deliverables Pack:
            </div>
            <div className="space-y-2">
              {service.deliverables.map((del, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#b2c5b9] p-2.5 rounded-lg bg-[#143122] border border-[#224835]">
                  <CheckCircle2 className="w-4 h-4 text-[#f3d38c] shrink-0 mt-0.5" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1d4631] border border-[#e5b958]/35 flex items-center justify-between text-xs">
            <span className="text-[#b2c5b9] font-medium">Proven Impact Target:</span>
            <span className="font-mono font-bold text-[#f3d38c]">{service.impactMetric}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-[#1f4230]">
          <button
            onClick={() => {
              onSelectInPlanner(service.id);
              onClose();
            }}
            className="py-3 rounded-xl text-xs font-bold gold-gradient-btn transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-[#08150e]" />
            <span>Select Module in Scope Planner</span>
          </button>

          <button
            onClick={() => {
              onBookCall();
              onClose();
            }}
            className="py-3 rounded-xl text-xs font-bold text-[#f2faf5] bg-[#143122] hover:bg-[#1b402d] border border-[#90d0a7]/35 transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-[#f3d38c]" />
            <span>Request Module Proposal</span>
          </button>
        </div>

      </div>
    </div>
  );
};
