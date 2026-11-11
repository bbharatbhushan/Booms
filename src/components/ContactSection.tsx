import React, { useState } from 'react';
import { Phone, Mail, Globe, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import { COMPANY_CONTACT } from '../utils/portfolioData';
import { validateContactForm } from '../utils/campaignCalculator';
import { soundFx } from '../utils/soundEffects';

interface ContactSectionProps {
  initialService?: string;
  initialBudget?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = 'video-ad-production',
  initialBudget = '₹2,50,000',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    serviceType: initialService,
    budgetRange: initialBudget,
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick(700);

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      soundFx.playClick(300);
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      // Fallback
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundFx.playBoom();
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="border-t border-slate-800/80 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Mumbai HQ Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-2">
                Initiate Dialogue · Mumbai HQ
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display mb-4">
                Let&apos;s Create Something That Explodes.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether you need a commercial film production shoot, complete Instagram channel management, or high-ROAS performance scaling, our Mumbai team responds within 2 business hours.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              {/* Phone Card */}
              <a
                href={`tel:${COMPANY_CONTACT.phone}`}
                onClick={() => soundFx.playClick(900)}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#0F172A] border border-slate-800 hover:border-sky-500/60 transition-all group"
              >
                <div className="p-3 rounded-lg bg-slate-900 text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Direct Call / WhatsApp</div>
                  <div className="text-base font-bold text-white font-mono group-hover:text-sky-400 transition-colors">
                    {COMPANY_CONTACT.phoneFormatted}
                  </div>
                </div>
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${COMPANY_CONTACT.email}`}
                onClick={() => soundFx.playClick(750)}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#0c101a] border border-slate-800 hover:border-sky-400/60 transition-all group"
              >
                <div className="p-3 rounded-lg bg-sky-400/10 text-sky-400 group-hover:bg-sky-400 group-hover:text-slate-950 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Official Inquiries</div>
                  <div className="text-base font-bold text-white font-mono group-hover:text-sky-400 transition-colors">
                    {COMPANY_CONTACT.email}
                  </div>
                </div>
              </a>

              {/* Website Card */}
              <a
                href={COMPANY_CONTACT.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#0c101a] border border-slate-800 hover:border-slate-700 transition-all group"
              >
                <div className="p-3 rounded-lg bg-slate-800 text-slate-300 group-hover:text-white transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Website</div>
                  <div className="text-base font-bold text-white font-mono">
                    {COMPANY_CONTACT.website}
                  </div>
                </div>
              </a>

              {/* Physical Studio Address */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0c101a] border border-slate-800">
                <div className="p-3 rounded-lg bg-rose-400/10 text-rose-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-mono text-slate-400 mb-1">Physical Studios</div>
                  <div className="text-slate-200 leading-relaxed">
                    {COMPANY_CONTACT.address}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{COMPANY_CONTACT.hours}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="lg:col-span-7 bg-[#0a0e17] border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  Proposal Request Received!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. Our Mumbai production director will review your campaign scope and reach out at <span className="text-sky-400 font-mono">{formData.phone}</span> within 2 hours.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        companyName: '',
                        serviceType: 'video-ad-production',
                        budgetRange: '₹2,50,000',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-800 pb-4 mb-4">
                  <h3 className="text-xl font-bold text-white font-display">
                    Request a Custom Campaign Pitch
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Direct access to Booms creative directors &amp; performance leads.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. Vikram Singhania"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-sky-500'
                      }`}
                    />
                    {errors.fullName && <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Company / Brand Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                      Brand / Startup Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="e.g. Aura Lifestyle"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-sky-500 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="vikram@brand.in"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-sky-500'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 8006603090"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-sky-500'
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service Type */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                      Service Requirement *
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-sky-500 text-sm text-white focus:outline-none transition-colors"
                    >
                      <option value="video-ad-production">High-End Video &amp; Commercial Production</option>
                      <option value="social-media-management">Social Media Management &amp; Viral Reels</option>
                      <option value="performance-marketing">Performance Marketing &amp; Meta/Google Ads</option>
                      <option value="influencer-creator-lab">Influencer &amp; Creator Collaborations</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                      Target Monthly Budget
                    </label>
                    <select
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-sky-500 text-sm text-white focus:outline-none transition-colors"
                    >
                      <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 – ₹2,50,000 (Launch)</option>
                      <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 – ₹5,00,000 (Growth)</option>
                      <option value="₹5,00,000 - ₹15,00,000">₹5,00,000 – ₹15,00,000 (Scale)</option>
                      <option value="₹15,00,000+">₹15,00,000+ (Enterprise/Pan-India)</option>
                    </select>
                  </div>
                </div>

                {/* Brief Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                    Project Vision / Notes
                  </label>
                  <textarea
                    rows={3}
                    name="message"
                    placeholder="Tell us about your brand goals, target audience, or reference campaigns you admire..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-sky-500 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#0F172A] hover:bg-slate-800 border border-slate-700 hover:border-slate-500 disabled:opacity-50 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending Pitch Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Campaign Inquiry to Mumbai Team</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
