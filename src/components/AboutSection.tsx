import React from 'react';
import { ShieldCheck, Linkedin, Compass, ArrowUpRight, Sparkles, Award } from 'lucide-react';
import { KOHILYN_CREDENTIALS } from '../data/siteData';

interface AboutSectionProps {
  onOpenContact?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <section id="about" className="py-20 border-b border-[#ebd7a7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Profile Card / Badges */}
          <div className="lg:col-span-5 bg-[#ffffff] rounded-2xl p-8 border border-[#d4af37]/60 shadow-[0_12px_36px_-8px_rgba(212,175,55,0.16)] space-y-6 relative overflow-hidden">
            
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-display text-3xl font-bold text-[#1c1917] flex items-center gap-2">
                  Koh I-Lyn
                  <Award className="w-5 h-5 text-[#cba135]" />
                </h3>
                <div className="text-xs text-[#825e0e] mt-1 font-semibold flex items-center gap-1.5 font-serif-luxury tracking-wide text-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#cba135]" />
                  <span>Independent C-Suite & Board Specialist</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-[#ebd8b0]">
              <div className="text-xs font-bold font-mono text-[#825e0e] uppercase tracking-wider">
                Professional Accreditations:
              </div>
              <div className="space-y-2.5">
                {KOHILYN_CREDENTIALS.map((cred) => (
                  <div key={cred.abbr} className="p-3.5 rounded-xl bg-[#faf6ed] border border-[#ebd8b0] hover:border-[#cba135] transition-all flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#cba135] shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-[#1c1917] font-mono">{cred.abbr}</div>
                      <div className="text-xs text-[#554c41]">{cred.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://www.linkedin.com/in/kohilyn"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl text-sm font-bold text-[#6a4c07] bg-[#fbf4e2] hover:bg-[#faedd0] border border-[#e5cb87] transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <Linkedin className="w-4 h-4 text-[#8a6512]" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8a6512]" />
              </a>
            </div>

          </div>

          {/* Philosophy & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffffff] border border-[#d4af37]/50 text-[#825e0e] text-xs font-semibold shadow-sm">
              <Compass className="w-4 h-4 text-[#cba135]" />
              <span className="font-serif-luxury tracking-wide text-sm font-bold uppercase">Independent Corporate Practice</span>
              <Sparkles className="w-3.5 h-3.5 text-[#cba135]" />
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#1c1917] leading-tight">
              Audit-Grounded Solutions for C-Suites & Board Directors
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#4a4237] leading-relaxed font-sans">
              <p className="border-l-3 border-[#cba135] pl-4 text-[#1c1917] font-medium bg-[#fcf9f2] py-2 rounded-r-lg">
                I am a chartered accounting professional with cross-border experience spanning audit, assurance, financial reporting, and corporate finance across Malaysia and New Zealand, including relocating to New Zealand on a company-sponsored visa. I&apos;ve continued to broaden my perspective through executive education focused on sustainable corporate leadership, global economic policy, and international affairs, reflecting my belief that professionals today need to understand the wider forces — climate, geopolitics, governance — shaping the organizations they serve.
              </p>
              <p className="text-[#4a4237]">
                During my time at PwC, I gained extensive experience auditing multinational and large corporate clients, such as Bosch and Mattel. My work involved delivering high-quality financial audits, collaborating with cross-functional teams, and developing a strong understanding of complex business operations and financial reporting requirements. In addition to my audit responsibilities, I have championed the fusion of data analytics with traditional audit practice — improving audit quality, efficiency and insights.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#ebd7a7]">
              <div className="p-4.5 rounded-xl bg-[#ffffff] border border-[#ebd8b0] shadow-sm space-y-1">
                <div className="text-sm font-bold text-[#825e0e] font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#cba135]" />
                  Agile Direct Access
                </div>
                <div className="text-sm text-[#4a4237]">Direct 1-on-1 collaboration with Koh I-Lyn for all high-level technical deliverables.</div>
              </div>

              <div className="p-4.5 rounded-xl bg-[#ffffff] border border-[#d4af37]/60 shadow-sm space-y-1">
                <div className="text-sm font-bold text-[#825e0e] font-mono flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#cba135]" />
                  Dual Qualification
                </div>
                <div className="text-sm text-[#4a4237]">Combining Chartered Accountant CA(M) rigor with Oxford Certified Sustainable Corporations Expert expertise.</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
