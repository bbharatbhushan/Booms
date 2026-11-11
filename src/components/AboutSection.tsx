import React from 'react';
import { Sparkles, Compass, Lightbulb, Target, Quote, MapPin, Building, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { COMPANY_CONTACT } from '../utils/portfolioData';
import { soundFx } from '../utils/soundEffects';

export const AboutSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Nitin Gupta',
      role: 'Founder, TIFL (Trinity Institute of Foreign Languages)',
      quote:
        'The team understood our vision perfectly and translated it into a compelling digital strategy. We saw a remarkable increase in student enrollments and brand recognition across Mumbai and beyond.',
      metric: '+140% Student Enrollments',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Rohit Sachdeva & Kshitija Saxena',
      role: 'Founders & MD, Illtill Chemist',
      quote:
        'Their innovative approach brought a fresh perspective to our brand. The results were outstanding, significantly boosting our market presence and customer engagement with cinema-grade vertical reels.',
      metric: '+42% Sales Conversion',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'B. Bhushan',
      role: 'Founder, Gratitude Films',
      quote:
        'Their creative prowess and technical skill in film production are unparalleled. They delivered a masterpiece that captured the emotional essence of our cinematic vision beautifully.',
      metric: 'Over 4 Festival Laurels',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Jessica Williams',
      role: 'Product Manager, NexGen',
      quote:
        'The user experience design and creative commercial production they delivered was intuitive and high-converting. An absolute pleasure to partner with.',
      metric: '4.9x Ad Return (ROAS)',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    },
  ];

  const pillars = [
    {
      icon: Compass,
      title: 'Strategy & Discovery',
      description:
        'We start by deeply understanding your brand, audience, and commercial goals to build a comprehensive roadmap for viral reach and measurable ROI.',
      highlight: 'Deep Brand Immersion',
    },
    {
      icon: Lightbulb,
      title: 'Creative Execution',
      description:
        'Our team brings ideas to life with precision and cinematic aesthetics, refining every frame and hook through an agile, collaborative feedback loop.',
      highlight: 'RED 8K & Studio Craft',
    },
    {
      icon: Target,
      title: 'Continuous Innovation',
      description:
        'We stay ahead of social algorithm shifts, constantly evolving our skills and technical workflows to deliver breakthrough campaigns.',
      highlight: 'Algorithmic ROAS Scaling',
    },
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-slate-800 pb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-sky-400 bg-[#0F172A] border border-slate-700 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Booms · Craft &amp; Vision Reference</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            Creative Agency for Brands That Refuse to Look Ordinary.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Born from passion and driven by innovation, Booms is a fresh creative startup that believes in doing things differently. We don't just follow trends—we create them.
          </p>
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <MapPin className="w-4 h-4 text-sky-400" />
            <span>Thane - Mumbai Studio HQ</span>
          </div>
          <div className="text-xs font-mono text-slate-500">
            Reference: Pixel Nudge (pixelnudge.in)
          </div>
        </div>
      </div>

      {/* Brand Story & Philosophy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
        {/* Left Column: Big Philosophy Card */}
        <div className="lg:col-span-7 bg-[#0F172A]/70 border border-slate-700/80 rounded-2xl p-8 sm:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-3">
              Our Core Philosophy
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display leading-snug mb-6">
              "We believe great work happens when bold creativity meets disciplined performance strategy."
            </h3>
            <p className="text-slate-300 leading-relaxed mb-6 text-sm sm:text-base">
              Every project is an opportunity to push creative boundaries and engineer something extraordinary that drives real business impact. Our team of young, talented directors, editors, visual designers, and performance media buyers brings together diverse disciplines in film production, fashion photography, and social growth to make brands stand out.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              From our physical studio facilities in Mira Road, Thane - Mumbai to client shoots across Pan-India, we maintain complete in-house ownership of cameras, soundstages, and post-production coloring suites.
            </p>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-sky-400">50+</div>
              <div className="text-xs text-slate-400 mt-1">Brands Transformed</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-sky-400">120M+</div>
              <div className="text-xs text-slate-400 mt-1">Audience Impressions</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-sky-400">4.8x</div>
              <div className="text-xs text-slate-400 mt-1">Average ROAS</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Strategic Pillars */}
        <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-[#0b101b] border border-slate-800 hover:border-slate-700 p-6 rounded-xl transition-all shadow-md group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0F172A] border border-slate-700 flex items-center justify-center text-sky-400 group-hover:border-sky-500/50 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-white font-display">
                      {pillar.title}
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-sky-400/90 bg-[#0F172A] px-2.5 py-0.5 rounded-full border border-slate-700">
                    {pillar.highlight}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-13">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Client Stories & Testimonials */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-1">
              Client Transformations
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              People Who Changed How They Do Business
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[#0c111c] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 sm:p-7 transition-all flex flex-col justify-between shadow-lg relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-700"
                    />
                    <div>
                      <div className="text-sm font-bold text-white font-display">{t.name}</div>
                      <div className="text-xs text-slate-400">{t.role}</div>
                    </div>
                  </div>
                  <Quote className="w-5 h-5 text-slate-600" />
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-sky-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {t.metric}
                </span>
                <span className="text-slate-500 font-mono text-[11px]">Verified Production Partner</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Physical Studio Address Box */}
      <div className="bg-[#0F172A] border border-slate-700 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-sky-400 shrink-0">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white font-display">
              Visit Booms Production Headquarters
            </h4>
            <p className="text-sm text-slate-300 mt-1">
              {COMPANY_CONTACT.address}
            </p>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Working Hours: {COMPANY_CONTACT.hours} · Direct Contact: {COMPANY_CONTACT.phone}
            </p>
          </div>
        </div>

        <a
          href="#contact"
          onClick={() => soundFx.playClick(800)}
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
        >
          <span>Schedule Studio Visit</span>
          <ArrowRight className="w-4 h-4 text-sky-400" />
        </a>
      </div>
    </section>
  );
};
