import React from 'react';
import { Phone, Mail, Globe, MapPin, ArrowUp } from 'lucide-react';
import { COMPANY_CONTACT } from '../utils/portfolioData';
import { soundFx } from '../utils/soundEffects';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFx.playClick(800);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#05070a] border-t border-slate-800/80 pt-16 pb-12 z-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Info 5 cols */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display tracking-wider text-2xl font-black text-white">
                BOOMS
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Digital Marketing, Social Media Channel Management &amp; High-End Video Production Startup. Headquartered in Mumbai, producing campaigns across India and internationally.
            </p>
            <div className="pt-2 text-slate-300 font-mono space-y-1">
              <div>Phone: <a href={`tel:${COMPANY_CONTACT.phone}`} className="text-sky-400 hover:underline">{COMPANY_CONTACT.phoneFormatted}</a></div>
              <div>Email: <a href={`mailto:${COMPANY_CONTACT.email}`} className="text-white hover:underline">{COMPANY_CONTACT.email}</a></div>
              <div>Web: <a href={COMPANY_CONTACT.websiteUrl} className="text-white hover:underline">{COMPANY_CONTACT.website}</a></div>
            </div>
          </div>

          {/* Quick Links 3 cols */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono uppercase tracking-wider text-white font-semibold">
              Navigation
            </div>
            <ul className="space-y-2">
              <li><a href="#portfolio" className="hover:text-sky-400 transition-colors">Portfolio Reel</a></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Capabilities &amp; Services</a></li>
              <li><a href="#about" className="hover:text-sky-400 transition-colors">About Us</a></li>
              <li><a href="#calculator" className="hover:text-sky-400 transition-colors">Campaign ROI Estimator</a></li>
              <li><a href="#studio" className="hover:text-sky-400 transition-colors">Mumbai Cinema Studio</a></li>
              <li><a href="#contact" className="hover:text-sky-400 transition-colors">Get in Touch</a></li>
            </ul>
          </div>

          {/* Location 4 cols */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-mono uppercase tracking-wider text-white font-semibold">
              Mumbai Production Hub
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {COMPANY_CONTACT.address}
            </p>
            <div className="flex items-center gap-2 text-slate-400 pt-2">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Bandra West &amp; Lower Parel, Mumbai</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 font-mono">
            &copy; {new Date().getFullYear()} Booms (Booms.in). All rights reserved. Mumbai, India.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
