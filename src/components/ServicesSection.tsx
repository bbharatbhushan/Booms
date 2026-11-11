import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle, Video, TrendingUp, Users, Smartphone, ShieldCheck } from 'lucide-react';
import { BOOMS_SERVICES } from '../utils/portfolioData';
import { soundFx } from '../utils/soundEffects';

export const ServicesSection: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState(BOOMS_SERVICES[0].id);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'video-ad-production':
        return <Video className="w-5 h-5 text-sky-400" />;
      case 'performance-marketing':
        return <TrendingUp className="w-5 h-5 text-indigo-400" />;
      case 'influencer-creator-lab':
        return <Users className="w-5 h-5 text-rose-400" />;
      case 'social-media-management':
      default:
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="border-t border-slate-800/80 pt-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-2">
              Capabilities &amp; Deliverables
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              End-to-End Digital Marketing &amp; Production
            </h2>
          </div>
          <p className="text-sm text-slate-300 max-w-md">
            From creative scriptwriting in our Bandra studio to algorithmic media buying, we own the entire execution chain without outsourcing.
          </p>
        </div>

        {/* Asymmetric Bento Grid of Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BOOMS_SERVICES.map((service, index) => {
            return (
              <div
                key={service.id}
                onMouseEnter={() => soundFx.playClick(600 + index * 50)}
                className={`relative rounded-2xl p-6 sm:p-8 bg-[#0F172A]/70 border transition-all duration-300 group flex flex-col justify-between ${
                  activeServiceId === service.id
                    ? 'border-sky-500/50 shadow-lg shadow-sky-500/5'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        {getServiceIcon(service.id)}
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        {service.number} · {service.subtitle}
                      </span>
                    </div>

                    <a
                      href="#contact"
                      onClick={() => soundFx.playClick(800)}
                      className="text-slate-400 group-hover:text-sky-400 transition-colors p-1"
                      aria-label={`Inquire about ${service.title}`}
                    >
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    {service.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle className="w-4 h-4 text-sky-400/80 shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Validated Impact:</span>
                  <span className="text-sky-400 font-semibold">{service.deliverableMetric}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
