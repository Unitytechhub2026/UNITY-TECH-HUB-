import React, { useState } from 'react';
import { 
  PHONE_NUMBER, 
  PHONE_CLICKABLE, 
  WHATSAPP_CLICKABLE 
} from '../data/servicesData';
import { 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Camera, 
  Zap, 
  Cpu, 
  Award,
  Lock,
  Eye,
  Sliders,
  Play
} from 'lucide-react';

interface HomeHeroProps {
  onOpenQuoteModal: () => void;
  onOpenChat: () => void;
  onNavigateCctv: () => void;
  onNavigateRepairs: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onOpenQuoteModal,
  onOpenChat,
  onNavigateCctv,
  onNavigateRepairs
}) => {
  // Quick interactive quote calculator inside hero
  const [cameraCount, setCameraCount] = useState<number>(4);
  const [resolution, setResolution] = useState<'2mp' | '5mp' | 'ip4k'>('5mp');
  const [storage, setStorage] = useState<'1tb' | '2tb'>('1tb');

  // Realistic Sri Lankan market pricing estimates (LKR)
  const calculateEstimate = () => {
    let base = cameraCount === 2 ? 38000 : cameraCount === 4 ? 65000 : cameraCount === 8 ? 125000 : 230000;
    if (resolution === '5mp') base += cameraCount * 3000;
    if (resolution === 'ip4k') base += cameraCount * 9500;
    if (storage === '2tb') base += 8500;
    return base.toLocaleString('en-US');
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-8 pb-16 lg:py-24">
      {/* Background Graphic & Blue Cyber Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Dark Tech Background Image with Cyber Blue Blend */}
        <img 
          src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=2000&q=85" 
          alt="CCTV Security and Technology Systems in Sri Lanka" 
          className="w-full h-full object-cover object-center opacity-20 filter contrast-125 saturate-150 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/90 to-[#030712]/70"></div>
        <div className="absolute inset-0 tech-grid-pattern opacity-60"></div>
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/3 right-1/10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Hero Copy & Trust Badges */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold tracking-wide shadow-sm shadow-cyan-500/20">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>SRI LANKA’S TRUSTED SECURITY & IT HUB</span>
            </div>

            {/* Requested Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Outfit',sans-serif] tracking-tight text-white leading-[1.15]">
              Protect Your World with <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                Smart Technology
              </span>
            </h1>

            {/* Requested Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Professional CCTV Security, Repairs, Networking & Complete IT Solutions for Homes and Businesses.
            </p>

            {/* Requested Primary Buttons: GET A FREE QUOTE, CALL US NOW, WHATSAPP US */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOpenQuoteModal}
                id="hero-get-quote-btn"
                className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-xl shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>GET A FREE QUOTE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={PHONE_CLICKABLE}
                id="hero-call-now-btn"
                className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-bold bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-white hover:bg-slate-800 transition-all flex items-center justify-center gap-2.5 shadow-lg"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>CALL US NOW</span>
              </a>

              <a
                href={WHATSAPP_CLICKABLE}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
                className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/20 hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WHATSAPP US</span>
              </a>
            </div>

            {/* Requested Trust Badges */}
            <div className="pt-6 border-t border-slate-800/80">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-mono mb-3 text-center lg:text-left">
                Guaranteed Service Excellence
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Professional Service", icon: Award, color: "text-cyan-400" },
                  { label: "Quality Products", icon: ShieldCheck, color: "text-blue-400" },
                  { label: "Fast Response", icon: Zap, color: "text-amber-400" },
                  { label: "Reliable Support", icon: CheckCircle, color: "text-emerald-400" },
                ].map((badge, idx) => {
                  const Icon = badge.icon;
                  return (
                    <div 
                      key={idx}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm"
                    >
                      <Icon className={`w-4 h-4 ${badge.color} shrink-0`} />
                      <span className="text-xs font-semibold text-slate-200">
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive CCTV Package Customizer & Live Feed Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl glass-panel p-6 sm:p-7 shadow-2xl border-cyan-500/30 overflow-hidden">
              {/* Card top banner */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-['Outfit',sans-serif]">
                      Instant Package Estimator
                    </h3>
                    <p className="text-[11px] text-cyan-400">
                      Configure your Home or Office CCTV in 10s
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold font-mono">
                  LIVE ESTIMATOR
                </span>
              </div>

              {/* Controls */}
              <div className="space-y-4 text-xs">
                {/* Cameras count selector */}
                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1.5">
                    <span>Number of Cameras:</span>
                    <span className="text-cyan-400 font-bold">{cameraCount} Cameras Setup</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[2, 4, 8, 16].map((num) => (
                      <button
                        key={num}
                        onClick={() => setCameraCount(num)}
                        className={`py-2 rounded-lg border font-bold transition-all ${
                          cameraCount === num
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/30'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {num} CH
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resolution selector */}
                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1.5">
                    <span>Camera Tech & Resolution:</span>
                    <span className="text-cyan-400 font-bold">
                      {resolution === '2mp' ? '1080p Full HD' : resolution === '5mp' ? '5MP ColorVu (24/7 Color)' : '4K Ultra IP PoE'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: '2mp', label: '1080p HD' },
                      { id: '5mp', label: '5MP ColorVu' },
                      { id: 'ip4k', label: '4K Digital IP' },
                    ].map((res) => (
                      <button
                        key={res.id}
                        onClick={() => setResolution(res.id as any)}
                        className={`py-2 px-1 rounded-lg border font-semibold text-center transition-all ${
                          resolution === res.id
                            ? 'bg-blue-600/30 border-cyan-400 text-cyan-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {res.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage selector */}
                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1.5">
                    <span>Surveillance Hard Drive:</span>
                    <span className="text-cyan-400 font-bold">{storage === '1tb' ? '1TB WD Purple (~30 Days)' : '2TB WD Purple (~60 Days)'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setStorage('1tb')}
                      className={`py-2 rounded-lg border font-semibold transition-all ${
                        storage === '1tb' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      1TB Storage (~30 Days)
                    </button>
                    <button
                      onClick={() => setStorage('2tb')}
                      className={`py-2 rounded-lg border font-semibold transition-all ${
                        storage === '2tb' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      2TB Storage (~60 Days)
                    </button>
                  </div>
                </div>

                {/* Live Output Price Box */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-mono block">Estimated Package Price</span>
                      <span className="text-2xl font-black font-['Outfit',sans-serif] text-white">
                        LKR {calculateEstimate()}{' '}
                        <span className="text-xs font-normal text-slate-400">approx.</span>
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-mono">
                      + Free Mobile App
                    </span>
                  </div>

                  <ul className="text-[11px] text-slate-300 space-y-1 pt-1 border-t border-slate-900">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{cameraCount}x Weatherproof Night-Vision Cameras</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Hybrid DVR/NVR + Surveillance Hard Drive</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Free Site Survey & Phone Remote App Setup</span>
                    </li>
                  </ul>
                </div>

                {/* Trigger Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={onOpenQuoteModal}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold hover:from-cyan-300 hover:to-blue-400 transition-all text-center"
                  >
                    Lock this Estimate
                  </button>
                  <a
                    href={`https://wa.me/94727402288?text=${encodeURIComponent(`Hi Unity Tech Hub, I calculated an estimate on your website for ${cameraCount} Cameras (${resolution}) with ${storage} HDD. Please send me the official quotation.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-1.5 transition-all text-center"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Quote</span>
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
