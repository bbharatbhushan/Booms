import React, { useState } from 'react';
import { MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { COMPANY_CONTACT } from '../utils/portfolioData';
import { soundFx } from '../utils/soundEffects';

export const WhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      aria-label="Direct WhatsApp contact options"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto"
      style={{ perspective: 1000 }}
    >
      {/* 3D Floating Tooltip card on Hover */}
      {isHovered && (
        <div
          className="mb-3 p-3.5 rounded-2xl bg-[#0F172A] border border-slate-700/80 shadow-2xl backdrop-blur-md text-xs text-slate-200 transition-all duration-300 w-64 animate-in fade-in slide-in-from-bottom-2"
          style={{
            transform: 'rotateX(6deg) rotateY(-8deg)',
            boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.7), 0 0 15px rgba(34, 197, 94, 0.2)',
          }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white font-mono text-[11px] uppercase tracking-wider">
              Booms WhatsApp Desk
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
            Chat directly with our Mumbai campaign director. Fast scope review &amp; quotes within 15 mins.
          </p>
          <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 font-bold border-t border-slate-800 pt-2">
            <span>+91 8006603090</span>
            <span className="flex items-center gap-0.5 text-slate-400 hover:text-white">
              Open Chat <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      )}

      {/* 3D Perspective Glowing WhatsApp Action Button */}
      <a
        href={COMPANY_CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Booms on WhatsApp +91 8006603090"
        onMouseEnter={() => {
          soundFx.playClick(850);
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => soundFx.playBoom()}
        className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold shadow-xl transition-all duration-300 active:scale-95 cursor-pointer"
        style={{
          transform: isHovered
            ? 'translateY(-4px) rotateX(8deg) rotateY(-10deg) scale(1.05)'
            : 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)',
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? '0 15px 30px rgba(16, 185, 129, 0.4), 0 0 25px rgba(20, 184, 166, 0.3)'
            : '0 8px 20px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Pulsing 3D Ring Halo */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 blur-sm group-hover:bg-emerald-400/50 transition-all pointer-events-none animate-pulse" />

        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white text-emerald-600 shadow-md">
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-600" />
        </div>

        <div className="relative hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold leading-tight tracking-wide">
            WhatsApp Chat
          </span>
          <span className="text-[10px] font-mono text-emerald-100 opacity-90">
            +91 8006603090
          </span>
        </div>
      </a>
    </aside>
  );
};
