import React from 'react';
import { Mail, Linkedin, ArrowUp, Sparkles, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#fbf8f2] border-t border-[#ebd7a7] text-[#554c41] pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          
          {/* Brand Info */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ffffff] border border-[#d4af37]/60 flex items-center justify-center text-[#825e0e] shadow-sm">
                <Award className="w-5 h-5 text-[#cba135]" />
              </div>
              <span className="font-display text-2xl font-bold text-[#1c1917] flex items-center gap-2">
                Koh I-Lyn & Co
                <Sparkles className="w-4 h-4 text-[#cba135]" />
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#5c5347] max-w-xl leading-relaxed">
              FCCA, CA(M), BA(Hons) UK, Oxford Certified Sustainable Corporations Expert Specialist providing direct, agile 1-on-1 advisory solutions for Malaysian C-suites, CFOs, and Board Directors.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
              <a
                href="mailto:connect@kohilyn.com"
                className="flex items-center gap-1.5 text-[#825e0e] hover:text-[#553c05] transition-colors font-semibold"
              >
                <Mail className="w-3.5 h-3.5 text-[#cba135]" />
                <span>connect@kohilyn.com</span>
              </a>
              <span>•</span>
              <a
                href="https://www.linkedin.com/in/kohilyn"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[#825e0e] hover:text-[#553c05] transition-colors font-semibold"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#cba135]" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>

          {/* Quick Links / Navigation Card */}
          <div className="md:col-span-5 bg-[#ffffff] p-6 rounded-2xl border border-[#ebd8b0] shadow-sm space-y-3">
            <div className="text-xs font-bold text-[#1c1917] font-mono uppercase tracking-wider">
              Quick Navigation
            </div>
            <div className="flex flex-col space-y-2 text-xs">
              <a href="#scope-planner" className="text-[#554c41] hover:text-[#825e0e] transition-colors font-medium flex items-center justify-between">
                <span>Scope Proposal Planner</span>
                <span className="font-mono text-[11px] text-[#825e0e]">Interactive Builder</span>
              </a>
              <div className="border-t border-[#f2e7cb]" />
              <a href="#about" className="text-[#554c41] hover:text-[#825e0e] transition-colors font-medium flex items-center justify-between">
                <span>About Koh I-Lyn</span>
                <span className="font-mono text-[11px] text-[#825e0e]">Accreditations</span>
              </a>
              <div className="border-t border-[#f2e7cb]" />
              <a href="mailto:connect@kohilyn.com" className="text-[#554c41] hover:text-[#825e0e] transition-colors font-medium flex items-center justify-between">
                <span>Direct Contact</span>
                <span className="font-mono text-[11px] text-[#825e0e]">connect@kohilyn.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#ebd8b0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#786b5c]">
          <div>
            © {new Date().getFullYear()} Koh I-Lyn & Co. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#825e0e] hover:text-[#553c05] font-semibold transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#cba135]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
