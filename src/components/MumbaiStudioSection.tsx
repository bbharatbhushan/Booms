import React from 'react';
import { MapPin, Film, Camera, Award, Cpu, ShieldCheck } from 'lucide-react';
import { COMPANY_CONTACT } from '../utils/portfolioData';

export const MumbaiStudioSection: React.FC = () => {
  const facilities = [
    {
      title: 'Bandra Cinema Soundstage',
      desc: '3,200 sq.ft acoustically treated studio with 24ft motorized lighting grid, motorized turntable for 360-degree liquid/product shots, and full green/black/white cyclorama.',
      specs: 'Aputure Electro Storm · Motorized Crane · 32A 3-Phase Power',
    },
    {
      title: 'Andheri Creator & Podcast Lab',
      desc: 'High-energy creator studio optimized for vertical TikTok/Instagram Reels production, multi-cam podcast recording, and high-frequency live streaming.',
      specs: 'Sony FX6 Cine Line · Shure SM7B Mics · Live Switcher',
    },
    {
      title: 'Lower Parel Post-Production Suite',
      desc: 'High-end color grading and audio mastering facility. DaVinci Resolve Advanced Panel calibrated to DCI-P3 and 7.1.4 Dolby Atmos monitoring.',
      specs: 'Mac Pro M2 Ultra Clusters · 10Gbps Fibre · DCI-P3 OLEDs',
    },
  ];

  const gearHighlights = [
    'RED Monstro 8K VV Cinema System',
    'ARRI Alexa Mini LF Cinema Package',
    'Cooke & Zeiss Cinema Prime Lenses',
    'DJI Ronin 2 3-Axis Gimbal & Car Mounts',
    'Aputure 1200d Pro & 600c Full Color Tubes',
    'High-Speed Phantom Flex 4K Liquid Rig',
  ];

  return (
    <section id="studio" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="border-t border-slate-800/80 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-2">
              <MapPin className="w-4 h-4" />
              <span>Production Infrastructure · Mumbai, India</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              Mumbai Cinema Studios &amp; In-House Gear
            </h2>
          </div>
          <div className="text-sm text-slate-300 max-w-md">
            We don&apos;t rent third-party equipment at marked-up rates. Booms owns its cinema cameras, lenses, and physical stages across Mumbai.
          </div>
        </div>

        {/* 2-Column Split: Facilities vs Gear & Production Standards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Facilities 7 cols */}
          <div className="lg:col-span-7 space-y-4">
            {facilities.map((f, i) => (
              <div
                key={f.title}
                className="bg-[#0F172A]/70 border border-slate-800 rounded-2xl p-6 transition-all hover:border-slate-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white font-display">
                    {f.title}
                  </h3>
                  <span className="text-xs font-mono text-sky-400 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded">
                    Studio 0{i + 1}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                  {f.desc}
                </p>
                <div className="text-xs font-mono text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Kit: </span>
                  <span className="text-slate-200">{f.specs}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Gear Vault 5 cols */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0F172A] to-[#090d16] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-widest mb-3">
                <Camera className="w-4 h-4" />
                <span>The Booms Cine Vault</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-display mb-3">
                Cinema-Grade Hardware
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Broadcast commercials and viral vertical reels require top-tier glass and sensor resolution. Our gear inventory is always set-ready.
              </p>

              <div className="space-y-3">
                {gearHighlights.map((gear) => (
                  <div key={gear} className="flex items-center gap-2.5 text-xs text-slate-200 bg-slate-900/60 border border-slate-800/80 px-3 py-2 rounded-lg">
                    <Film className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>{gear}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Headquartered in:</span>
              <span className="font-semibold text-white font-mono">Bandra-Kurla Complex (BKC), Mumbai</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
