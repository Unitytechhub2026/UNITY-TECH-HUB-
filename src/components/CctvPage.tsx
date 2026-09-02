import React, { useState } from 'react';
import { CCTV_PRODUCTS } from '../data/servicesData';
import { 
  Camera, 
  ShieldCheck, 
  Eye, 
  Smartphone, 
  HardDrive, 
  Wrench, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Phone, 
  MessageSquare,
  Zap,
  Sliders,
  Check,
  Video,
  Layers
} from 'lucide-react';
import { PHONE_NUMBER, PHONE_CLICKABLE, WHATSAPP_CLICKABLE } from '../data/servicesData';

interface CctvPageProps {
  onOpenQuoteModal: (serviceName?: string) => void;
  onOpenChat: () => void;
}

export const CctvPage: React.FC<CctvPageProps> = ({ onOpenQuoteModal, onOpenChat }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Interactive CCTV Package Configurator
  const [selectedChannels, setSelectedChannels] = useState<number>(4);
  const [selectedTech, setSelectedTech] = useState<'colorvu' | 'ip_poe' | 'hd_1080p'>('colorvu');
  const [selectedHdd, setSelectedHdd] = useState<'1tb' | '2tb' | '4tb'>('1tb');
  const [withAudio, setWithAudio] = useState<boolean>(true);

  // Price calculations in LKR
  const calcPrice = () => {
    let base = selectedChannels === 2 ? 38500 : selectedChannels === 4 ? 64000 : selectedChannels === 8 ? 122000 : 225000;
    if (selectedTech === 'colorvu') base += selectedChannels * 2800;
    if (selectedTech === 'ip_poe') base += selectedChannels * 8500;
    if (selectedHdd === '2tb') base += 8000;
    if (selectedHdd === '4tb') base += 21000;
    if (withAudio) base += selectedChannels * 800;
    return base.toLocaleString('en-US');
  };

  const cctvOfferings = [
    { title: "CCTV Camera Installation", desc: "Complete turnkey installation with concealed weatherproof conduit piping.", icon: Camera },
    { title: "Indoor Dome Cameras", desc: "Discreet ceiling mount wide-angle cameras for rooms, shops and halls.", icon: Eye },
    { title: "Outdoor Bullet Cameras", desc: "Heavy-duty IP67 waterproof metal casing with long distance IR range.", icon: Shield },
    { title: "Night Vision & ColorVu", desc: "24/7 full-color footage even in total darkness without black & white grain.", icon: Sparkles },
    { title: "Digital IP & PoE Cameras", desc: "Studio-grade 4K digital clarity with single cable PoE simplicity.", icon: Video },
    { title: "HD-TVI / AHD Cameras", desc: "Cost-effective high definition 1080p & 5MP surveillance.", icon: Layers },
    { title: "Hybrid DVR Systems", desc: "4/8/16/32-channel recorders with smart AI motion filtering.", icon: HardDrive },
    { title: "PoE NVR Systems", desc: "Ultra HD network video recording for commercial & luxury properties.", icon: Zap },
    { title: "Remote Mobile Viewing", desc: "Instant live view & playback on iOS, Android, Windows and Mac.", icon: Smartphone },
    { title: "CCTV System Upgrades", desc: "Upgrade old blurry analog cameras to crystal clear 5MP ColorVu.", icon: RefreshCw },
    { title: "CCTV Hardware Repairs", desc: "Fix black screens, DVR beeping, damaged cables, and lost passwords.", icon: Wrench },
    { title: "Preventive Maintenance", desc: "Scheduled lens cleaning, HDD health checks and power testing.", icon: ShieldCheck },
  ];

  const cctvBenefits = [
    { title: "High-Quality Equipment", desc: "100% genuine Hikvision, Dahua & WD Purple with genuine manufacturer warranty.", icon: ShieldCheck },
    { title: "Professional Installation", desc: "Neat concealed casing, safety conduit pipes, and zero messy dangling wires.", icon: AwardIcon },
    { title: "Clear Night Vision", desc: "ColorVu and EXIR sensor technology ensuring recognizable faces in total darkness.", icon: Eye },
    { title: "Remote Mobile Access", desc: "Watch live camera feeds from anywhere in the world on your smartphone.", icon: Smartphone },
    { title: "Reliable Recording", desc: "Surveillance-grade hard drives for continuous 30 to 90 days footage preservation.", icon: HardDrive },
    { title: "Customized Security Solutions", desc: "Focal lenses and viewing angles strategically planned for your property layout.", icon: Sliders },
    { title: "After-Sales Technical Support", desc: "Dedicated Sri Lankan technician hotline and direct WhatsApp support whenever you need help.", icon: Phone },
  ];

  return (
    <div className="bg-[#030712] min-h-screen text-slate-100 py-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Badge */}
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mb-4">
          <span>HOME</span>
          <span>/</span>
          <span className="text-white">CCTV SECURITY SOLUTIONS</span>
        </div>

        {/* Hero title */}
        <div className="relative rounded-3xl glass-panel p-8 sm:p-12 overflow-hidden border-cyan-500/30 mb-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full-Spectrum Surveillance Engineering</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-['Outfit',sans-serif] tracking-tight text-white leading-tight">
              Advanced CCTV Security Systems <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
                Installed & Maintained Across Sri Lanka
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Protect your home, retail store, hotel, school, or factory with crystal-clear 24/7 night-vision cameras, smart AI human detection, and instant mobile phone remote monitoring.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenQuoteModal("CCTV System Installation")}
                className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-lg shadow-cyan-500/25"
              >
                Get a Free CCTV Quote
              </button>
              <a
                href={WHATSAPP_CLICKABLE}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Video Inquiry</span>
              </a>
              <button
                onClick={onOpenChat}
                className="px-5 py-3.5 rounded-xl text-xs font-bold bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-slate-800 transition-all"
              >
                Ask AI CCTV Advisor
              </button>
            </div>
          </div>
        </div>

        {/* 12 CCTV Offerings Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit',sans-serif] text-white">
              Complete CCTV Solutions & Hardware Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Every component tested for reliability, weather resistance, and tamper protection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cctvOfferings.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl glass-panel glass-panel-hover border-slate-800/80 hover:border-cyan-500/40 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white font-['Outfit',sans-serif]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-800/60">
                    <button
                      onClick={() => onOpenQuoteModal(item.title)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 group"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Custom CCTV Package Builder */}
        <div className="mb-20 p-8 sm:p-10 rounded-3xl glass-panel border-cyan-500/40 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                  Custom Surveillance Estimator
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-['Outfit',sans-serif] text-white">
                  Build Your Custom CCTV Security Package
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Select your required channel count, night vision technology, and recording capacity.
                </p>
              </div>

              {/* Channels */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Channel / Camera Quantity:
                </label>
                <div className="grid grid-cols-4 gap-2 text-xs font-bold">
                  {[2, 4, 8, 16].map((ch) => (
                    <button
                      key={ch}
                      onClick={() => setSelectedChannels(ch)}
                      className={`py-3 rounded-xl border transition-all ${
                        selectedChannels === ch
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {ch} Cameras
                    </button>
                  ))}
                </div>
              </div>

              {/* Technology Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Camera Model & Night Vision Tier:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'hd_1080p', label: '1080p Standard HD', sub: 'Infrared Black & White Night' },
                    { id: 'colorvu', label: '5MP ColorVu (Recommended)', sub: '24/7 Vivid Color Night Vision' },
                    { id: 'ip_poe', label: '4K Ultra IP & PoE', sub: 'Digital AI Human Detection' },
                  ].map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => setSelectedTech(tech.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedTech === tech.id
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold block text-white text-xs">{tech.label}</span>
                      <span className="text-[10px] text-slate-400">{tech.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Surveillance Hard Drive:
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[
                      { id: '1tb', label: '1TB', days: '~30 Days' },
                      { id: '2tb', label: '2TB', days: '~60 Days' },
                      { id: '4tb', label: '4TB', days: '~90+ Days' },
                    ].map((hdd) => (
                      <button
                        key={hdd.id}
                        onClick={() => setSelectedHdd(hdd.id as any)}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          selectedHdd === hdd.id
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div>{hdd.label}</div>
                        <div className="text-[9px] text-slate-400">{hdd.days}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Audio Recording Microphone:
                  </label>
                  <button
                    onClick={() => setWithAudio(!withAudio)}
                    className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      withAudio
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>Built-in Mic Audio Recording</span>
                    <span>{withAudio ? 'Included ✓' : 'Optional'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Price Output Column */}
            <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-6 border border-cyan-500/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono text-cyan-400 font-semibold">
                  Package Quotation Summary
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-900 text-cyan-300 text-[10px] font-mono">
                  1-Year Warranty
                </span>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black font-['Outfit',sans-serif] text-white">
                  LKR {calcPrice()}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Complete setup estimate (Equipment + Standard Concealed Installation)
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-900">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{selectedChannels}x {selectedTech === 'colorvu' ? '5MP ColorVu Full-Color' : selectedTech === 'ip_poe' ? '4K Ultra IP Digital' : '1080p HD'} Cameras</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{selectedChannels}-Channel DVR / NVR with AI Human Detection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Original {selectedHdd.toUpperCase()} WD Purple / SkyHawk HDD</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Mobile Phone Remote Viewing Configured (All Family Phones)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Free Site Inspection & After-Sales Technical Hotline</span>
                </div>
              </div>

              <div className="pt-3 space-y-2">
                <button
                  onClick={() => onOpenQuoteModal(`${selectedChannels}-Camera CCTV Package (${selectedTech})`)}
                  className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all text-center"
                >
                  Book Free Site Survey for this Setup
                </button>

                <a
                  href={`https://wa.me/94727402288?text=${encodeURIComponent(`Hi Unity Tech Hub, I built a CCTV package on your website: ${selectedChannels} Cameras, ${selectedTech} Tech, ${selectedHdd} HDD (${calcPrice()} LKR). Please send official invoice/details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp this Package to 072 740 2288</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Camera Models Showcase */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit',sans-serif] text-white">
              Surveillance Hardware Showcase
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Only authentic, surveillance-grade equipment engineered for tropical climates in Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CCTV_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="rounded-2xl glass-panel p-6 border-slate-800/90 flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 rounded-xl overflow-hidden mb-4 relative">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[10px]">
                      {prod.resolution}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-['Outfit',sans-serif] mb-1">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-slate-400 mb-3">
                    <strong className="text-slate-300">Best for:</strong> {prod.bestFor}
                  </p>

                  <div className="space-y-1 text-xs text-slate-300">
                    {prod.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onOpenQuoteModal(`Inquiry for ${prod.name}`)}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>Request Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={WHATSAPP_CLICKABLE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    WhatsApp Spec
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requested Section: “Why Choose Our CCTV Solutions?” */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0b1120] to-slate-900 border border-cyan-500/30">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <h2 className="text-3xl font-black font-['Outfit',sans-serif] text-white">
              Why Choose Our CCTV Solutions?
            </h2>
            <p className="text-sm text-slate-400">
              Trusted by 500+ homes, companies, hotels, and educational institutions across Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cctvBenefits.map((b, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <h4 className="text-sm font-bold text-white font-['Outfit',sans-serif]">
                    {b.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-7">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Need a technician to inspect your premises?</h4>
              <p className="text-xs text-slate-400">We offer free site visits in Colombo, Gampaha, Kandy and surrounding areas.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenQuoteModal("Site Survey Visit")}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300"
              >
                Schedule Site Survey
              </button>
              <a
                href={PHONE_CLICKABLE}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
              >
                Call: {PHONE_NUMBER}
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

function AwardIcon({ className }: { className?: string }) {
  return <ShieldCheck className={className} />;
}
