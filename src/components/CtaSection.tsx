import React from 'react';
import { 
  PHONE_NUMBER, 
  PHONE_CLICKABLE, 
  WHATSAPP_CLICKABLE 
} from '../data/servicesData';
import { 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  Sparkles,
  Lock,
  Headset
} from 'lucide-react';

interface CtaSectionProps {
  onOpenQuoteModal: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section className="py-20 relative overflow-hidden bg-[#030712]">
      {/* Background Graphic Grid and Radial Blur */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-teal-500/20 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 tech-grid-pattern opacity-40"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-14 rounded-3xl glass-panel border-cyan-500/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Fast Islandwide Deployment</span>
          </div>

          {/* Requested Headline */}
          <h2 className="text-3xl sm:text-5xl font-black font-['Outfit',sans-serif] text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Secure Your Property Today with <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
              Unity Tech Hub
            </span>
          </h2>

          {/* Requested Subtext */}
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Contact our expert team today for CCTV installation, computer repairs, and complete IT solutions.
          </p>

          {/* Requested Buttons: GET A FREE QUOTE, CALL NOW: 072 740 2288, WHATSAPP US */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenQuoteModal}
              id="cta-get-free-quote-btn"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-xl shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>GET A FREE QUOTE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={PHONE_CLICKABLE}
              id="cta-call-now-btn"
              className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm font-bold bg-slate-900 border border-slate-700 hover:border-cyan-400 text-white hover:bg-slate-800 transition-all flex items-center justify-center gap-2.5 shadow-lg"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>CALL NOW: {PHONE_NUMBER}</span>
            </a>

            <a
              href={WHATSAPP_CLICKABLE}
              target="_blank"
              rel="noopener noreferrer"
              id="cta-whatsapp-btn"
              className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/25 hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WHATSAPP US</span>
            </a>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>100% Genuine Branded Equipment</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Headset className="w-4 h-4 text-cyan-400" />
              <span>24/7 Priority Emergency Support</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>Free On-Site Inspection</span>
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
