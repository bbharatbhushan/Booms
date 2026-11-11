import React, { useState } from 'react';
import { Phone, Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { COMPANY_CONTACT } from '../utils/portfolioData';
import { soundFx } from '../utils/soundEffects';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ soundEnabled, onToggleSound, onOpenDashboard }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Portfolio Reel', href: '#portfolio' },
    { label: 'Capabilities', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'ROI Estimator', href: '#calculator' },
    { label: 'Mumbai Studio', href: '#studio' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#07090e]/85 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Booms - Pure Wordmark, Mumbai removed) */}
        <a 
          href="#" 
          className="flex items-center gap-2 group text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0"
          onClick={() => soundFx.playClick(800)}
        >
          <span className="font-display tracking-wider text-2xl font-black bg-gradient-to-r from-white via-slate-100 to-sky-400 bg-clip-text text-transparent">
            BOOMS
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => soundFx.playClick(700)}
              className="hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 relative py-1 text-slate-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          {onOpenDashboard && (
            <button
              type="button"
              onClick={() => {
                soundFx.playClick(750);
                onOpenDashboard();
              }}
              className="px-2.5 py-1 text-xs font-mono font-semibold bg-[#0F172A] text-sky-400 hover:text-sky-300 border border-slate-700 hover:border-sky-500/60 rounded-md transition-colors cursor-pointer"
            >
              Dashboard
            </button>
          )}
        </nav>

        {/* Zone 3: 1 primary action + Sound toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute procedural sound effects' : 'Enable procedural sound effects'}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            title={soundEnabled ? 'Sound On' : 'Sound Muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-sky-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <a
            href={`tel:${COMPANY_CONTACT.phone}`}
            onClick={() => soundFx.playClick(900)}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#0F172A] hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg transition-all shadow-md whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            <span>Call +91 8006603090</span>
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d14] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                soundFx.playClick(700);
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 text-base font-medium text-slate-200 hover:text-sky-400 hover:bg-slate-900 rounded-md"
            >
              {link.label}
            </a>
          ))}
          {onOpenDashboard && (
            <button
              type="button"
              onClick={() => {
                soundFx.playClick(750);
                setMobileMenuOpen(false);
                onOpenDashboard();
              }}
              className="w-full text-left px-3 py-2 text-base font-medium text-sky-400 hover:bg-slate-900 rounded-md font-mono"
            >
              Client &amp; Studio Dashboard
            </button>
          )}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href={`tel:${COMPANY_CONTACT.phone}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#0F172A] border border-slate-700 rounded-lg shadow"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>Call +91 8006603090</span>
            </a>
            <a
              href={`mailto:${COMPANY_CONTACT.email}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-300 bg-slate-800/80 rounded-lg"
            >
              <span>info@booms.in</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
