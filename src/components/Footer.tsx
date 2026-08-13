import React from 'react';
import { ShieldCheck, Mail, Linkedin, ArrowUp, Trees, TreePine } from 'lucide-react';
import { VisitorCounter } from './VisitorCounter';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05100a] border-t border-[#1f4230] text-[#b2c5b9] pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start justify-between">
          
          {/* Brand Info */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#1d4631] border border-[#e5b958]/40 flex items-center justify-center text-[#f3d38c]">
                <TreePine className="w-5 h-5 text-[#90d0a7]" />
              </div>
              <span className="font-display text-2xl font-bold text-[#f2faf5] flex items-center gap-2">
                Koh I-Lyn & Co
                <Trees className="w-4 h-4 text-[#90d0a7]" />
              </span>
            </div>

            <p className="text-xs text-[#b2c5b9] max-w-md leading-relaxed">
              FCCA, CA(M), BA(Hons) UK, Oxford Certified Sustainable Corporations Expert Specialist providing direct, agile 1-on-1 solutions for Malaysian C-suites, CFOs, and Board Directors.
            </p>

            <div className="flex items-center gap-3 text-xs pt-1">
              <a
                href="mailto:connect@kohilyn.com"
                className="flex items-center gap-1.5 text-[#f3d38c] hover:text-[#fde68a] transition-colors font-medium"
              >
                <Mail className="w-3.5 h-3.5 text-[#f3d38c]" />
                <span>connect@kohilyn.com</span>
              </a>
              <span>•</span>
              <a
                href="https://www.linkedin.com/in/kohilyn"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[#90d0a7] hover:text-[#bbf7d0] transition-colors font-medium"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#90d0a7]" />
                <span>LinkedIn Profile</span>
              </a>
            </div>

            {/* Quick Links */}
            <div className="pt-2">
              <div className="text-xs font-bold text-[#f2faf5] font-mono uppercase tracking-wider mb-2">
                Quick Navigation
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                <a href="#scope-planner" className="hover:text-[#f3d38c] transition-colors">Scope Proposal Planner</a>
                <span>•</span>
                <a href="#about" className="hover:text-[#f3d38c] transition-colors">About Koh I-Lyn</a>
                <span>•</span>
                <a href="mailto:connect@kohilyn.com" className="hover:text-[#f3d38c] transition-colors">Direct Contact</a>
              </div>
            </div>
          </div>

          {/* Visitor Counter Analytics Card */}
          <div className="lg:col-span-6">
            <VisitorCounter variant="card" />
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
