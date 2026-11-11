import React, { useState } from 'react';
import { Calculator, ArrowRight, Zap, Target, Clock, Layers } from 'lucide-react';
import { calculateRoiEstimate, formatINR } from '../utils/campaignCalculator';
import { soundFx } from '../utils/soundEffects';

interface RoiEstimatorProps {
  onApplyPlanToForm?: (service: string, budget: string) => void;
}

export const RoiEstimator: React.FC<RoiEstimatorProps> = ({ onApplyPlanToForm }) => {
  const [budget, setBudget] = useState(250000); // 2.5 Lakhs default
  const [serviceType, setServiceType] = useState('video-ad-production');

  const estimate = calculateRoiEstimate(budget, serviceType);

  const services = [
    { id: 'video-ad-production', label: 'Video & Ad Production' },
    { id: 'social-media-management', label: 'Social Media Management' },
    { id: 'performance-marketing', label: 'Performance Ads & Funnels' },
    { id: 'influencer-creator-lab', label: 'Influencer Collaborations' },
  ];

  const handleServiceChange = (id: string) => {
    soundFx.playClick(650);
    setServiceType(id);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(e.target.value));
  };

  const handleApply = () => {
    soundFx.playBoom();
    if (onApplyPlanToForm) {
      onApplyPlanToForm(serviceType, formatINR(budget));
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="calculator" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="rounded-3xl bg-gradient-to-br from-[#0c101a] via-[#090d16] to-[#07090e] border border-slate-800 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-2">
              <Calculator className="w-4 h-4" />
              <span>Interactive Growth Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              Calculate Your Campaign Reach &amp; Production ROI
            </h2>
          </div>
          <p className="text-sm text-slate-300 max-w-md">
            Model projected Mumbai &amp; Pan-India performance based on our proprietary benchmark data across 500+ commercial campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls: Left 6 cols */}
          <div className="lg:col-span-6 space-y-6">
            {/* Service Focus Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-3 font-mono">
                1. Select Primary Growth Focus
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {services.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleServiceChange(s.id)}
                    className={`px-4 py-3 rounded-xl text-left text-xs font-semibold transition-all border cursor-pointer ${
                      serviceType === s.id
                        ? 'bg-[#0F172A] text-white border-slate-600 shadow-md'
                        : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-slate-300 font-mono">
                  2. Monthly Production &amp; Ad Budget
                </label>
                <span className="text-xl font-bold font-mono text-sky-400 tabular-nums">
                  {formatINR(budget)}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="25000"
                value={budget}
                onChange={handleSliderChange}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-300 mt-2">
                <span>₹50,000 (Starter)</span>
                <span>₹5,00,000 (Growth)</span>
                <span>₹20,00,000+ (Scale)</span>
              </div>
            </div>

            {/* Recommended Platform Mix */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mb-2 font-mono flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>Recommended Media &amp; Production Mix</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {estimate.recommendedMix.map((mix) => (
                  <span
                    key={mix}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium"
                  >
                    {mix}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Output Cards: Right 6 cols */}
          <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800/90 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 font-mono">
                Projected Monthly Outcomes
              </span>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                <span>90-Day Guaranteed Cadence</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0e131e] p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Estimated Impressions</div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white tabular-nums">
                  {(estimate.estimatedImpressions / 1000000).toFixed(2)}M
                </div>
                <div className="text-[11px] text-sky-400/90 mt-1">High-hook views</div>
              </div>

              <div className="bg-[#0e131e] p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Target Blended ROAS</div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-sky-400 tabular-nums">
                  {estimate.estimatedRoas}x
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Return on Ad Spend</div>
              </div>

              <div className="bg-[#0e131e] p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Projected Qualified Leads</div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-sky-400 tabular-nums">
                  {estimate.projectedLeads.toLocaleString('en-IN')}+
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Verified prospects</div>
              </div>

              <div className="bg-[#0e131e] p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Production Turnaround</div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tabular-nums">
                  {estimate.productionTimelineWeeks} Wks
                </div>
                <div className="text-[11px] text-slate-400 mt-1">From script to live</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleApply}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#0F172A] hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <span>Lock Strategy &amp; Request Custom Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
