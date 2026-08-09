import React from 'react';
import { ShieldCheck, Mail, Linkedin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05100a] border-t border-[#1f4230] text-[#b2c5b9] pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 justify-between">
          
          {/* Brand Info */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1d4631] border border-[#e5b958]/40 flex items-center justify-center text-[#f3d38c]">
                <ShieldCheck className="w-5 h-5 text-[#f3d38c]" />
              </div>
              <span className="font-display text-2xl font-bold text-[#f2faf5]">
                Koh I-Lyn & Co
              </span>
            </div>

            <p className="text-xs text-[#b2c5b9] max-w-md leading-relaxed">
              FCCA, CA(M), BA(Hons) UK, Oxford Certified Sustainable Corporations Expert Specialist providing direct, agile 1-on-1 advisory for Malaysian C-suites, CFOs, and Board Directors.
            </p>

            <div className="flex items-center gap-3 text-xs pt-1">
              <a
                href="mailto:connect@kohilyn.com"
                className="flex items-center gap-1.5 text-[#f3d38c] hover:text-[#fde68a] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#f3d38c]" />
                <span>connect@kohilyn.com</span>
              </a>
              <span>•</span>
              <a
                href="https://www.linkedin.com/in/kohilyn"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[#90d0a7] hover:text-[#bbf7d0] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#90d0a7]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-5 space-y-3">
            <div className="text-xs font-bold text-[#f2faf5] font-mono uppercase tracking-wider">
              Advisory Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#scope-planner" className="hover:text-[#f3d38c] transition-colors">Scope Proposal Planner</a></li>
              <li><a href="#about" className="hover:text-[#f3d38c] transition-colors">About Koh I-Lyn</a></li>
              <li><a href="mailto:connect@kohilyn.com" className="hover:text-[#f3d38c] transition-colors">Advisory Contact</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1f4230] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} Koh I-Lyn & Co. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#f3d38c] hover:text-[#fde68a] transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#f3d38c]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
