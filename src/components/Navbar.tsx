import React, { useState } from 'react';
import { Menu, X, Layers, User, PhoneCall, Sparkles, Award } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { name: string; href: string; icon: React.ElementType; badge?: string }[] = [
    { name: 'Scope Planner', href: '#scope-planner', icon: Layers },
    { name: 'About Koh I-Lyn', href: '#about', icon: User },
    { name: 'Contact', href: 'mailto:connect@kohilyn.com', icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#ffffff]/92 backdrop-blur-md border-b border-[#edd8aa] transition-all shadow-[0_4px_20px_-4px_rgba(212,175,55,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Credentials */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffffff] via-[#fbf7ed] to-[#faedd0] border border-[#d4af37]/60 flex items-center justify-center text-[#997519] group-hover:border-[#b88a1b] transition-all gold-glow-subtle relative overflow-hidden shadow-sm">
              <Award className="w-5 h-5 text-[#b88a1b] group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl font-bold tracking-tight text-[#1c1917]">
                  Koh I-Lyn & Co
                </span>
                <span className="text-[11px] uppercase font-mono px-2 py-0.5 rounded-full border border-[#d4af37]/50 text-[#825e0e] bg-[#fdf5e2] font-bold flex items-center gap-1 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-[#cba135]" />
                  Advisory
                </span>
              </div>
              <p className="text-xs text-[#6e6355] tracking-wide font-medium hidden sm:block">
                Sustainability • Accounting • Data Analytics
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-4">
            <div className="flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-[#453e35] hover:text-[#8a6512] hover:bg-[#faf4e6] transition-all"
                  >
                    <Icon className="w-4 h-4 text-[#cba135]" />
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded-full bg-[#faecd0] text-[#7a5910] border border-[#edd28e] font-bold">
                        {link.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#453e35] hover:text-[#8a6512] hover:bg-[#faf4e6]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#ffffff] border-b border-[#edd8aa] px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-[#453e35] hover:text-[#8a6512] hover:bg-[#faf4e6]"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-[#cba135]" />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#faecd0] text-[#7a5910]">
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
