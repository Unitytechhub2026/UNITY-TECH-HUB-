import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { SERVICES_LIST } from '../data/servicesData';
import { 
  ShieldCheck, 
  Wrench, 
  Settings2, 
  Smartphone, 
  Laptop, 
  Network, 
  HardDrive, 
  Headset, 
  Database, 
  Cpu, 
  ArrowRight, 
  Check, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenQuoteModal: (serviceName?: string) => void;
  onOpenRepairModal: (deviceName?: string) => void;
  onNavigateCctv: () => void;
  onNavigateRepairs: () => void;
  onNavigateNetworking: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  Wrench,
  Settings2,
  Smartphone,
  Laptop,
  Network,
  HardDrive,
  Headset,
  Database,
  Cpu,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenQuoteModal,
  onOpenRepairModal,
  onNavigateCctv,
  onNavigateRepairs,
  onNavigateNetworking
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'cctv' | 'repair' | 'networking' | 'it'>('all');

  const filteredServices = activeFilter === 'all' 
    ? SERVICES_LIST 
    : SERVICES_LIST.filter(s => s.category === activeFilter);

  const handleServiceAction = (service: ServiceItem) => {
    if (service.category === 'repair') {
      onOpenRepairModal(service.title.replace(/^\d+\.\s*/, ''));
    } else if (service.category === 'cctv') {
      onOpenQuoteModal(service.title.replace(/^\d+\.\s*/, ''));
    } else {
      onOpenQuoteModal(service.title.replace(/^\d+\.\s*/, ''));
    }
  };

  return (
    <section className="py-20 bg-[#030712] relative overflow-hidden" id="services-section">
      {/* Background visual elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Comprehensive Technology Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit',sans-serif] text-white tracking-tight">
            Our Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Services</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From complete high-definition CCTV security camera setups and component repairs to enterprise-grade networking and IT maintenance in Sri Lanka.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All 10 Services' },
              { id: 'cctv', label: 'CCTV & Security' },
              { id: 'repair', label: 'Computer & Laptop Repair' },
              { id: 'networking', label: 'Networking Solutions' },
              { id: 'it', label: 'IT Support & Data' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.iconName] || ShieldCheck;
            return (
              <div
                key={service.id}
                className="group relative rounded-2xl glass-panel p-6 sm:p-7 flex flex-col justify-between glass-panel-hover border-slate-800/90 hover:border-cyan-500/50 transition-all"
              >
                {/* Image Header with Badge */}
                <div className="relative h-44 -mx-6 -mt-6 mb-5 overflow-hidden rounded-t-2xl">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/60 to-transparent"></div>
                  
                  {service.popular && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-lg">
                      MOST POPULAR
                    </span>
                  )}

                  <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-950/90 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-md">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3.5 flex-1">
                  <h3 className="text-lg font-bold font-['Outfit',sans-serif] text-white group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {service.fullDesc}
                  </p>

                  {/* Feature bullet points */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleServiceAction(service)}
                    id={`service-btn-${service.id}`}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-cyan-500 text-slate-200 hover:text-slate-950 border border-slate-700 hover:border-cyan-400 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{service.category === 'repair' ? 'Book Repair' : 'Get Free Quote'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/94727402288?text=${encodeURIComponent(`Hi Unity Tech Hub, I am interested in ${service.title}. Please provide more details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-400 hover:text-white transition-all"
                    title="WhatsApp Inquiry"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Quick bottom callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0b1120] to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold font-['Outfit',sans-serif] text-white">
              Need a Custom Project or Enterprise AMC?
            </h3>
            <p className="text-xs text-slate-400">
              We provide tailored solutions for hotels, schools, multi-story offices, and factories across Sri Lanka.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenQuoteModal("Commercial Project Inquiry")}
              className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-md shadow-cyan-500/20"
            >
              Request Site Visit
            </button>
            <button
              onClick={onNavigateCctv}
              className="px-5 py-3 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
            >
              Explore CCTV Page
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
