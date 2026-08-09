import React from 'react';
import { User, CheckCircle2, ShieldCheck, Linkedin, Award, Compass, ArrowUpRight } from 'lucide-react';
import { KOHILYN_CREDENTIALS } from '../data/siteData';

interface AboutSectionProps {
  onOpenContact?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <section id="about" className="py-20 border-b border-[#1f4230] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Profile Card / Badges */}
          <div className="lg:col-span-5 forest-card rounded-2xl p-8 border border-[#e5b958]/35 space-y-6 relative overflow-hidden">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-[#f2faf5]">Koh I-Lyn</h3>
                <p className="text-xs text-[#f3d38c] font-mono font-bold mt-0.5">
                  FCCA • CA(M) • BA(Hons) UK • Oxford Certified
                </p>
                <div className="text-[11px] text-[#90d0a7] mt-1 font-medium">
                  Independent C-Suite & Board Advisor
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-[#1f4230]">
              <div className="text-xs font-bold font-mono text-[#f2faf5] uppercase tracking-wider">
                Professional Accreditations:
              </div>
              <div className="space-y-2">
                {KOHILYN_CREDENTIALS.map((cred) => (
                  <div key={cred.abbr} className="p-3 rounded-xl bg-[#0e2117] border border-[#224835] flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#f3d38c] shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[#f2faf5] font-mono">{cred.abbr}</div>
                      <div className="text-[10px] text-[#b2c5b9]">{cred.title}</div>
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
                className="w-full py-2.5 rounded-xl text-xs font-bold text-[#f2faf5] bg-[#143122] hover:bg-[#1b402d] border border-[#90d0a7]/35 transition-all flex items-center justify-center gap-2"
              >
                <Linkedin className="w-4 h-4 text-[#90d0a7]" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#a8bba0]" />
              </a>
            </div>

          </div>

          {/* Philosophy & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#143122] border border-[#e5b958]/35 text-[#f3d38c] text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-[#f3d38c]" />
              <span>Independent Advisory Practice</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#f2faf5] leading-tight">
              Audit-Grounded Advisory for C-Suites & Board Directors
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#c3d7cb] leading-relaxed font-sans">
              <p className="border-l-2 border-[#e5b958] pl-4 text-[#f2faf5] font-medium">
                Bringing extensive audit experience with multinational industries since 2015 across multiple jurisdictions, I work directly with C-Suites and Board Directors to bridge the gap between environmental sustainability mandates and MFRS financial accounting controls. You receive direct, high-level strategic counsel and precise technical execution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1f4230]">
              <div className="p-4 rounded-xl bg-[#143122] border border-[#90d0a7]/30 space-y-1">
                <div className="text-xs font-bold text-[#90d0a7] font-mono">Agile Direct Access</div>
                <div className="text-xs text-[#e2f1e8]">Direct 1-on-1 collaboration with Koh I-Lyn for all high-level technical deliverables.</div>
              </div>

              <div className="p-4 rounded-xl bg-[#143122] border border-[#e5b958]/30 space-y-1">
                <div className="text-xs font-bold text-[#f3d38c] font-mono">Dual Qualification</div>
                <div className="text-xs text-[#e2f1e8]">Combining Chartered Accountant CA(M) rigor with Oxford Certified Sustainable Corporations Expert expertise.</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
