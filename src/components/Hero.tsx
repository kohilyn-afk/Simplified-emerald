import React from 'react';
import { CheckCircle2, Award, Sparkles } from 'lucide-react';
import { KOHILYN_CREDENTIALS } from '../data/siteData';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#ebd7a7]">
      {/* Background Mesh Lighting with Pearl White & Champagne Gold Hues */}
      <div className="absolute inset-0 pointer-events-none opacity-70">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#f7e6bd]/45 blur-[130px] rounded-full" />
        <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-[#edd395]/40 blur-[110px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-[#faecd0]/50 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Executive Pill Header */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffffff] border border-[#d4af37]/50 text-[#825e0e] text-xs font-semibold shadow-sm">
            <Award className="w-4 h-4 text-[#cba135]" />
            <span className="font-serif-luxury tracking-wider text-sm font-bold uppercase">Executive Corporate Practice</span>
            <Sparkles className="w-3.5 h-3.5 text-[#cba135]" />
          </div>

          {/* Main Display Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1c1917] tracking-tight leading-[1.15]">
            Bridging <span className="gold-gradient-text">Sustainability Mandates</span>, Accounting & Data Analytics
          </h1>

          {/* Credentials Pills List */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-4xl mx-auto">
            {KOHILYN_CREDENTIALS.map((cred) => (
              <div key={cred.abbr} className="p-3.5 rounded-xl bg-[#ffffff]/95 backdrop-blur border border-[#e8d29b] hover:border-[#b88a1b] transition-all flex items-center gap-2.5 shadow-sm hover:shadow-md">
                <CheckCircle2 className="w-4 h-4 text-[#cba135] shrink-0" />
                <div>
                  <div className="text-sm font-bold text-[#825e0e] font-mono">{cred.abbr}</div>
                  <div className="text-xs text-[#5c5347] line-clamp-1">{cred.title}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
