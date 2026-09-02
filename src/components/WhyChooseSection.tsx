import React from 'react';
import { WHY_CHOOSE_ITEMS } from '../data/servicesData';
import { 
  Users, 
  ShieldCheck, 
  Zap, 
  Award, 
  Sliders, 
  Sparkles, 
  CheckCircle2,
  Tag,
  Wrench,
  Headset,
  UserCheck,
  Shield
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  ShieldCheck,
  Shield,
  UserCheck,
  Zap,
  Award,
  Sliders,
  Tag,
  Wrench,
  Headset,
  CheckCircle2
};

export const WhyChooseSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#030712] via-[#070e1c] to-[#030712] relative overflow-hidden" id="why-choose-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>The Unity Advantage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit',sans-serif] text-white tracking-tight">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">UNITY TECH HUB</span>?
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            We merge cutting-edge security hardware with certified IT engineers to give you reliable protection, transparent billing, and dedicated after-sales support in Sri Lanka.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_ITEMS.map((item, idx) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            return (
              <div
                key={idx}
                className="group p-7 rounded-3xl glass-panel glass-panel-hover border-slate-800/90 hover:border-cyan-500/50 space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all shadow-md">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold font-['Outfit',sans-serif] text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>

                <div className="flex items-center gap-2 pt-2 text-xs text-cyan-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guaranteed Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistical Milestone Ribbon */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-cyan-500/30 text-center">
          <div className="space-y-1">
            <span className="text-2xl sm:text-4xl font-black font-['Outfit',sans-serif] text-cyan-400">
              500+
            </span>
            <span className="text-xs text-slate-400 block">Properties Secured</span>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-4xl font-black font-['Outfit',sans-serif] text-cyan-400">
              1,200+
            </span>
            <span className="text-xs text-slate-400 block">Laptops & PCs Repaired</span>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-4xl font-black font-['Outfit',sans-serif] text-cyan-400">
              99.8%
            </span>
            <span className="text-xs text-slate-400 block">Customer Satisfaction</span>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-4xl font-black font-['Outfit',sans-serif] text-cyan-400">
              15 Min
            </span>
            <span className="text-xs text-slate-400 block">Average Response Time</span>
          </div>
        </div>

      </div>
    </section>
  );
};
