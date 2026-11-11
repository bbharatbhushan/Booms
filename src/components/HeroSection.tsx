import React from 'react';
import { Play, ArrowRight, Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import { COMPANY_CONTACT } from '../utils/portfolioData';
import { soundFx } from '../utils/soundEffects';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left 7 cols: Hero Typography & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Studio Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F172A] border border-slate-700/80 text-xs font-mono text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>Digital Marketing &amp; Cinema Production</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">Booms.in</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.08] text-balance">
            Digital Marketing &amp; Cinema Production Built to <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-rose-400 bg-clip-text text-transparent">Ignite Brands</span>.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Booms is a creative engine uniting 8K cinema production, viral social media management, and performance ad scaling. We engineer content that stops thumbs and drives measurable revenue.
          </p>

          {/* Quick Direct Contact Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 bg-[#0F172A]/90 border border-slate-800 p-3 rounded-xl backdrop-blur-sm max-w-xl">
            <a
              href={`tel:${COMPANY_CONTACT.phone}`}
              className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-semibold"
              onClick={() => soundFx.playClick(900)}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{COMPANY_CONTACT.phoneFormatted}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={`mailto:${COMPANY_CONTACT.email}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white"
              onClick={() => soundFx.playClick(700)}
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{COMPANY_CONTACT.email}</span>
            </a>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Mumbai Studio</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#portfolio"
              onClick={() => soundFx.playBoom()}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#0F172A] hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-xl transition-all shadow-lg shadow-black/40 active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-sky-400" />
              <span>Launch Portfolio Player</span>
            </a>

            <a
              href="#calculator"
              onClick={() => soundFx.playClick(600)}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all active:scale-95 cursor-pointer"
            >
              <span>Calculate Campaign ROI</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Right 5 cols: Interactive Reel Teaser Card */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0F172A]/70 backdrop-blur-md p-1 group shadow-2xl">
            <div className="relative aspect-4/3 rounded-xl overflow-hidden">
              <img
                src="/src/assets/images/hero_booms_studio_1794348322633.jpg"
                alt="Booms Studio Production Crew"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Booms Production Studio</span>
                </div>
                <h3 className="text-lg font-bold text-white font-display">
                  Where Cinema Rigs Meet Viral Hooks
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Bandra-Worli sea link set · RED 8K cinema setup
                </p>
              </div>

              {/* Direct Play Badge */}
              <a
                href="#portfolio"
                onClick={() => soundFx.playBoom()}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-[#0F172A]/90 backdrop-blur-md border border-slate-700 text-xs font-mono text-white flex items-center gap-1.5 hover:bg-slate-800 hover:border-sky-400 transition-colors"
              >
                <Play className="w-3 h-3 fill-current text-sky-400" />
                <span>Portfolio Reel Active</span>
              </a>
            </div>

            {/* Quick Micro-Stats Strip */}
            <div className="grid grid-cols-3 gap-2 p-3 text-center text-xs font-mono">
              <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                <div className="text-base font-bold text-sky-400">120M+</div>
                <div className="text-[10px] text-slate-400">Impressions</div>
              </div>
              <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                <div className="text-base font-bold text-slate-200">4.8x</div>
                <div className="text-[10px] text-slate-400">Avg. ROAS</div>
              </div>
              <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                <div className="text-base font-bold text-emerald-400">500+</div>
                <div className="text-[10px] text-slate-400">Films Produced</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
