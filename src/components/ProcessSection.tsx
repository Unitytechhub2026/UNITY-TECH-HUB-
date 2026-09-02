import React from 'react';
import { PROCESS_STEPS } from '../data/servicesData';
import { 
  Headphones, 
  ClipboardCheck, 
  Wrench, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ProcessSectionProps {
  onOpenQuoteModal: () => void;
}

interface ProcessStepItem {
  step: string;
  title: string;
  desc: string;
  iconName?: string;
}

const defaultStepIcons = [Headphones, ClipboardCheck, Wrench, ShieldCheck];

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section className="py-20 bg-[#030712] relative overflow-hidden" id="process-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Seamless 4-Step Engineering Workflow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit',sans-serif] text-white tracking-tight">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Works</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From initial site inspection to neat wiring, precision calibration, and client training — we guarantee zero hassle.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = defaultStepIcons[idx] || Headphones;
            return (
              <div
                key={step.step}
                className="group relative p-7 rounded-3xl glass-panel glass-panel-hover border-slate-800/90 hover:border-cyan-500/50 flex flex-col justify-between"
              >
                {/* Step Number Watermark */}
                <div className="absolute top-4 right-5 text-4xl font-black font-mono text-slate-800/60 group-hover:text-cyan-500/20 transition-colors pointer-events-none">
                  0{step.step}
                </div>

                <div className="space-y-4">
                  {/* Step Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all shadow-lg shadow-cyan-500/10">
                    <Icon className="w-7 h-7" />
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                      Phase 0{step.step}
                    </span>
                    <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif] mt-0.5">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[10px]">Verified Milestone</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center mt-12">
          <button
            onClick={onOpenQuoteModal}
            className="px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-lg shadow-cyan-500/20 hover:scale-105"
          >
            Start Step 1: Request Free Consultation
          </button>
        </div>

      </div>
    </section>
  );
};
