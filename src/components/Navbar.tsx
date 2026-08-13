import React, { useState } from 'react';
import { ShieldCheck, Menu, X, ArrowUpRight, Layers, User, PhoneCall, Award, Trees, TreePine } from 'lucide-react';
import { VisitorCounter } from './VisitorCounter';

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
    <header className="sticky top-0 z-50 bg-[#091710]/92 backdrop-blur-md border-b border-[#1f4230] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Credentials */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e4632] to-[#11271b] border border-[#e5b958]/40 flex items-center justify-center text-[#e2f1e8] group-hover:border-[#e5b958] transition-all gold-glow-subtle relative overflow-hidden">
              <TreePine className="w-5 h-5 text-[#90d0a7] group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl font-bold tracking-tight text-[#f2faf5]">
                  Koh I-Lyn & Co
                </span>
                <span className="text-xs uppercase font-mono px-1.5 py-0.5 rounded border border-[#e5b958]/40 text-[#f3d38c] bg-[#e5b958]/10 font-bold flex items-center gap-1">
                  <Trees className="w-3 h-3 text-[#90d0a7]" />
                  Practice
                </span>
              </div>
              <p className="text-xs text-[#a8bba0] tracking-wide font-medium hidden sm:block">
                Sustainability • Accounting • Data Analytics
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-4">
            <VisitorCounter variant="compact" />

            <div className="flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-[#b2c5b9] hover:text-[#f2faf5] hover:bg-[#143122] transition-all"
                  >
                    <Icon className="w-4 h-4 text-[#90d0a7]" />
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-[#e5b958]/20 text-[#f3d38c] border border-[#e5b958]/35 font-bold">
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
              className="p-2 rounded-lg text-[#b2c5b9] hover:text-[#f2faf5] hover:bg-[#143122]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d2217] border-b border-[#1f4230] px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-[#b2c5b9] hover:text-[#f2faf5] hover:bg-[#143122]"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-[#90d0a7]" />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#e5b958]/20 text-[#f3d38c]">
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
