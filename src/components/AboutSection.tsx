import React from 'react';
import { User, CheckCircle2, ShieldCheck, Linkedin, Award, Compass, ArrowUpRight, Trees, TreePine } from 'lucide-react';
import { KOHILYN_CREDENTIALS } from '../data/siteData';
import { CornerTreeAccent } from './TreeSilhouettes';

interface AboutSectionProps {
  onOpenContact?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <section id="about" className="py-20 border-b border-[#1f4230] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Profile Card / Badges */}
          <div className="lg:col-span-5 forest-card rounded-2xl p-8 border border-[#e5b958]/35 space-y-6 relative overflow-hidden">
            <CornerTreeAccent className="absolute top-2 right-2 opacity-15" />
            
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-display text-3xl font-bold text-[#f2faf5] flex items-center gap-2">
                  Koh I-Lyn
                  <TreePine className="w-5 h-5 text-[#90d0a7]" />
                </h3>
                <div className="text-xs text-[#90d0a7] mt-1 font-medium flex items-center gap-1.5">
                  <Trees className="w-3.5 h-3.5 text-[#90d0a7]" />
                  <span>Independent C-Suite & Board Specialist</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-[#1f4230]">
              <div className="text-sm font-bold font-mono text-[#f2faf5] uppercase tracking-wider">
                Professional Accreditations:
              </div>
              <div className="space-y-2">
                {KOHILYN_CREDENTIALS.map((cred) => (
                  <div key={cred.abbr} className="p-3.5 rounded-xl bg-[#0e2117] border border-[#224835] flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#f3d38c] shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-[#f2faf5] font-mono">{cred.abbr}</div>
                      <div className="text-xs text-[#b2c5b9]">{cred.title}</div>
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
                className="w-full py-3 rounded-xl text-sm font-bold text-[#f2faf5] bg-[#143122] hover:bg-[#1b402d] border border-[#90d0a7]/35 transition-all flex items-center justify-center gap-2"
              >
                <Linkedin className="w-4 h-4 text-[#90d0a7]" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#a8bba0]" />
              </a>
            </div>

          </div>

          {/* Philosophy & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#143122] border border-[#e5b958]/35 text-[#f3d38c] text-sm font-semibold">
              <Compass className="w-4 h-4 text-[#f3d38c]" />
              <span>Independent Corporate Practice</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#f2faf5] leading-tight">
              Audit-Grounded Solutions for C-Suites & Board Directors
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#c3d7cb] leading-relaxed font-sans">
              <p className="border-l-2 border-[#e5b958] pl-4 text-[#f2faf5] font-medium">
                I am a chartered accounting professional with cross-border experience spanning audit, assurance, financial reporting, and corporate finance across Malaysia and New Zealand, including relocating to New Zealand on a company-sponsored visa. I&apos;ve continued to broaden my perspective through executive education focused on sustainable corporate leadership, global economic policy, and international affairs, reflecting my belief that professionals today need to understand the wider forces — climate, geopolitics, governance — shaping the organizations they serve.
              </p>
              <p className="text-[#c3d7cb]">
                During my time at PwC, I gained extensive experience auditing multinational and large corporate clients, such as Bosch and Mattel. My work involved delivering high-quality financial audits, collaborating with cross-functional teams, and developing a strong understanding of complex business operations and financial reporting requirements. In addition to my audit responsibilities, I have championed the fusion of data analytics with traditional audit practice — improving audit quality, efficiency and insights.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1f4230]">
              <div className="p-4.5 rounded-xl bg-[#143122] border border-[#90d0a7]/30 space-y-1">
                <div className="text-sm font-bold text-[#90d0a7] font-mono">Agile Direct Access</div>
                <div className="text-sm text-[#e2f1e8]">Direct 1-on-1 collaboration with Koh I-Lyn for all high-level technical deliverables.</div>
              </div>

              <div className="p-4.5 rounded-xl bg-[#143122] border border-[#e5b958]/30 space-y-1">
                <div className="text-sm font-bold text-[#f3d38c] font-mono">Dual Qualification</div>
                <div className="text-sm text-[#e2f1e8]">Combining Chartered Accountant CA(M) rigor with Oxford Certified Sustainable Corporations Expert expertise.</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
