import React, { useState } from 'react';
import { REPAIR_SERVICES_CATALOG } from '../data/servicesData';
import { 
  Wrench, 
  Laptop, 
  Monitor, 
  ShieldAlert, 
  Zap, 
  Layers, 
  ShieldOff, 
  Printer, 
  Wifi, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Phone, 
  MessageSquare,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import { PHONE_NUMBER, PHONE_CLICKABLE, WHATSAPP_CLICKABLE } from '../data/servicesData';

interface RepairServicesPageProps {
  onOpenRepairModal: (deviceName?: string) => void;
  onOpenChat: () => void;
}

const repairIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldAlert,
  Laptop,
  Monitor,
  Zap,
  Layers,
  ShieldOff,
  Printer,
  Wifi,
};

export const RepairServicesPage: React.FC<RepairServicesPageProps> = ({
  onOpenRepairModal,
  onOpenChat
}) => {
  const [selectedIssueCategory, setSelectedIssueCategory] = useState<string>('all');
  
  // Interactive Diagnostic Wizard
  const [quickSymptom, setQuickSymptom] = useState<string>('slow_pc');

  const diagnosticsData: Record<string, { title: string; diagnosis: string; solution: string; estimatedTime: string; device: string }> = {
    slow_pc: {
      title: "Laptop / Desktop Takes 3-5 Mins to Start or Freezes",
      diagnosis: "Mechanical Hard Drive bottleneck (100% Disk Usage) or insufficient RAM memory.",
      solution: "Upgrade to ultra-fast M.2 NVMe SSD + 8GB/16GB DDR4 RAM. We clone your exact Windows & files with zero data loss! 10x faster speed guaranteed.",
      estimatedTime: "2 - 4 Hours",
      device: "Laptop / PC SSD Upgrade"
    },
    dvr_beep: {
      title: "CCTV DVR / NVR Beeping Continuously & Not Recording",
      diagnosis: "Hard drive failure / bad sectors, IP conflict, or corrupted firmware.",
      solution: "Diagnostic scan of surveillance HDD, bad sector recovery or WD Purple replacement, and firmware re-flash.",
      estimatedTime: "Same Day / Onsite",
      device: "CCTV & DVR Repair"
    },
    black_screen: {
      title: "Laptop Turns On, Fan Spins, but Screen is Blank / Black",
      diagnosis: "RAM oxidation, display flex cable damage, motherboard BIOS corruption, or graphics chip fault.",
      solution: "Precision micro-soldering, RAM socket re-seat, BIOS chip reprogramming, or LCD screen replacement.",
      estimatedTime: "1 - 2 Days",
      device: "Laptop Motherboard Repair"
    },
    wifi_drop: {
      title: "Frequent Wi-Fi Disconnections & Slow Speed in Back Rooms",
      diagnosis: "Channel congestion, thick concrete wall attenuation, or faulty router firmware.",
      solution: "Deploy dual-band seamless mesh Wi-Fi access points and structured Cat6 Gigabit backbone cabling.",
      estimatedTime: "Onsite Visit",
      device: "Router & Network Troubleshooting"
    },
    virus_popup: {
      title: "Spam Pop-ups, Ransomware Threats, or Browser Hijackers",
      diagnosis: "Malicious background Trojan, cryptominer, or corrupted browser extensions.",
      solution: "Deep boot-level disinfection, registry sanitation, Windows security hardening, and genuine antivirus setup.",
      estimatedTime: "1 - 3 Hours",
      device: "Virus & Malware Removal"
    }
  };

  const currentDiag = diagnosticsData[quickSymptom] || diagnosticsData.slow_pc;

  const filteredRepairs = selectedIssueCategory === 'all'
    ? REPAIR_SERVICES_CATALOG
    : REPAIR_SERVICES_CATALOG.filter(r => r.category === selectedIssueCategory);

  return (
    <div className="bg-[#030712] min-h-screen text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mb-4">
          <span>HOME</span>
          <span>/</span>
          <span className="text-white">TECH REPAIR CENTER</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl glass-panel p-8 sm:p-12 overflow-hidden border-cyan-500/30 mb-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
              <Wrench className="w-3.5 h-3.5 text-cyan-400" />
              <span>Certified Electronics & Hardware Diagnostics</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-['Outfit',sans-serif] tracking-tight text-white leading-tight">
              Unity Tech Repair Center: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
                Precision Hardware & Software Solutions
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Don't replace your expensive laptops, desktops, DVRs, or routers when you can repair or upgrade them at a fraction of the cost. Professional diagnostics with genuine replacement parts and service warranty in Sri Lanka.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenRepairModal("General Tech Repair")}
                id="hero-book-repair-btn"
                className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                <span>Book a Repair Now</span>
              </button>

              <a
                href={PHONE_CLICKABLE}
                className="px-5 py-3.5 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 hover:border-cyan-400 text-white flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call Technician: {PHONE_NUMBER}</span>
              </a>

              <button
                onClick={onOpenChat}
                className="px-5 py-3.5 rounded-xl text-xs font-bold bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-slate-800 transition-colors"
              >
                AI Symptom Checker
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Symptom Diagnosis Wizard */}
        <div className="mb-20 p-8 sm:p-10 rounded-3xl glass-panel border-cyan-500/40">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
              Smart Troubleshooting Wizard
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit',sans-serif] text-white">
              Identify Your Device Problem in 1 Click
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select your symptom below to see the probable root cause, repair roadmap, and turnaround time:
            </p>
          </div>

          {/* Symptom selector buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'slow_pc', label: 'Slow Laptop / PC Boots in Mins' },
              { id: 'dvr_beep', label: 'DVR Beeping / HDD Failure' },
              { id: 'black_screen', label: 'Blank Display / Won\'t Turn On' },
              { id: 'wifi_drop', label: 'Wi-Fi Drops & Dead Zones' },
              { id: 'virus_popup', label: 'Virus Pop-ups & Malware' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setQuickSymptom(s.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  quickSymptom === s.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Diagnostic Result Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-2xl bg-slate-950 border border-cyan-500/30">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                <AlertTriangle className="w-4 h-4" />
                <span>SYMPTOM: {currentDiag.title}</span>
              </div>
              
              <div>
                <span className="text-xs font-semibold text-slate-400 block">Root Cause Diagnosis:</span>
                <p className="text-sm text-slate-200 mt-0.5">{currentDiag.diagnosis}</p>
              </div>

              <div>
                <span className="text-xs font-semibold text-emerald-400 block">Unity Tech Hub Solution:</span>
                <p className="text-sm text-slate-300 mt-0.5">{currentDiag.solution}</p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-3">
              <div>
                <span className="text-slate-400 block text-[11px]">Typical Turnaround:</span>
                <span className="text-white font-bold text-sm flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  {currentDiag.estimatedTime}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Warranty Protection:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                  Included on Parts & Labor
                </span>
              </div>

              <button
                onClick={() => onOpenRepairModal(currentDiag.device)}
                className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold hover:from-cyan-300 hover:to-blue-400 transition-all text-center"
              >
                Book This Repair
              </button>
            </div>
          </div>
        </div>

        {/* All Repair Services Grid */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit',sans-serif] text-white">
                Comprehensive Repair Catalog
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Component level repair and software servicing for all brands.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: 'all', label: 'All Repairs' },
                { id: 'computer', label: 'Laptops & PCs' },
                { id: 'cctv', label: 'CCTV & DVRs' },
                { id: 'software', label: 'Windows & Software' },
                { id: 'network', label: 'Routers & Network' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedIssueCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                    selectedIssueCategory === cat.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRepairs.map((item) => {
              const IconComponent = repairIcons[item.iconName] || Wrench;
              return (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl glass-panel glass-panel-hover border-slate-800/90 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">
                        {item.turnaroundTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white font-['Outfit',sans-serif]">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-slate-800/80 space-y-1">
                      <span className="text-[11px] font-semibold text-cyan-400 block">Common Symptoms:</span>
                      {item.symptoms.slice(0, 3).map((sym, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                          <span className="text-cyan-400">•</span>
                          <span>{sym}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenRepairModal(item.title)}
                      className="flex-1 py-2 px-3 rounded-lg bg-slate-900 hover:bg-cyan-500 text-slate-200 hover:text-slate-950 border border-slate-700 hover:border-cyan-400 text-xs font-bold transition-all flex items-center justify-center gap-1"
                    >
                      <span>Book Repair</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    
                    <a
                      href={`https://wa.me/94727402288?text=${encodeURIComponent(`Hi Unity Tech Hub, I need repair assistance for ${item.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-400 hover:text-white transition-all"
                      title="WhatsApp Inquiry"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Repair with Unity Tech Hub */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0b1120] to-slate-900 border border-cyan-500/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Genuine Spare Parts</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We only source original screens, batteries, SSDs, power supply units, and camera lenses with warranty.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-cyan-400 mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Same-Day / Express Service</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Most laptop SSD upgrades, Windows installations, and CCTV DVR recoveries are completed within 2 to 4 hours.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Strict Data Privacy</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your personal documents, accounting records, and sensitive files remain 100% confidential and protected.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
