import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { KOHILYN_CREDENTIALS } from '../data/siteData';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#1f4230]">
      {/* Background Mesh Lighting with Pastel Forest Green and Gold Hues */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-[#295b43]/30 blur-[130px] rounded-full" />
        <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-[#e5b958]/15 blur-[110px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-[#90d0a7]/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Credentials Badge with Gold Accent */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#132d20] border border-[#e5b958]/35 text-[#e2f1e8] text-sm font-semibold shadow-inner">
            <Award className="w-4 h-4 text-[#f3d38c]" />
            <span className="text-[#f3d38c] font-mono font-bold">FCCA • CA(M) • BA(Hons) UK</span>
            <span className="hidden sm:inline text-[#a8dadc]">• Oxford Certified Sustainable Corporations Expert</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#f2faf5] tracking-tight leading-[1.15]">
            Bridging <span className="gold-gradient-text">Sustainability Mandates</span>, Accounting & Data Analytics
          </h1>

          {/* Credentials Pills List */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left max-w-4xl mx-auto">
            {KOHILYN_CREDENTIALS.map((cred) => (
              <div key={cred.abbr} className="p-3.5 rounded-xl bg-[#11261b] border border-[#224835] hover:border-[#e5b958]/30 transition-colors flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#90d0a7] shrink-0" />
                <div>
                  <div className="text-sm font-bold text-[#f3d38c] font-mono">{cred.abbr}</div>
                  <div className="text-xs text-[#a8bba0] line-clamp-1">{cred.title}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
