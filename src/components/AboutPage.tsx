import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  Award, 
  Users, 
  MapPin, 
  Clock, 
  Sparkles, 
  Building, 
  CheckCircle2, 
  Phone, 
  MessageSquare,
  ArrowRight,
  HardDrive
} from 'lucide-react';
import { PHONE_NUMBER, PHONE_CLICKABLE, WHATSAPP_CLICKABLE } from '../data/servicesData';

interface AboutPageProps {
  onOpenQuoteModal: (service?: string) => void;
  onNavigateContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal, onNavigateContact }) => {
  const values = [
    {
      title: "Technical Integrity",
      desc: "We never compromise on equipment quality. Only genuine Hikvision, Dahua, WD Purple, and branded computer components are installed.",
      icon: ShieldCheck
    },
    {
      title: "Fast Turnaround",
      desc: "Emergency repair visits, rapid on-site CCTV troubleshooting, and express computer servicing to keep your business operating uninterrupted.",
      icon: Clock
    },
    {
      title: "Transparent Pricing",
      desc: "Detailed written quotes with itemized hardware and labor costs. No hidden fees or unexpected post-job add-ons.",
      icon: Award
    },
    {
      title: "Dedicated Aftercare",
      desc: "Comprehensive warranty support, free telephone assistance, and swift technician dispatch throughout Sri Lanka.",
      icon: Users
    }
  ];

  const targetClients = [
    { name: "Private Residences & Villas", desc: "Perimeter CCTV, gate intercoms, smart alarms, and whole-house mesh Wi-Fi." },
    { name: "Retail Stores & Supermarkets", desc: "POS cash-counter cameras, customer footfall monitoring & inventory security." },
    { name: "Corporate Offices", desc: "Structured Cat6 LAN cabling, biometric attendance, server racks & IT AMC." },
    { name: "Hotels & Guesthouses", desc: "Guest Wi-Fi captive portals, multi-building surveillance & uninterrupted coverage." },
    { name: "Schools & Educational Institutes", desc: "Campus-wide safety monitoring, computer lab networking & printer setups." },
    { name: "Factories & Warehouses", desc: "High-bay industrial CCTV, wireless point-to-point bridges & heavy-duty IT infrastructure." },
  ];

  return (
    <div className="bg-[#030712] min-h-screen text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mb-4">
          <span>HOME</span>
          <span>/</span>
          <span className="text-white">ABOUT UNITY TECH HUB</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl glass-panel p-8 sm:p-12 overflow-hidden border-cyan-500/30 mb-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Smart Technology. Secure Future.</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-['Outfit',sans-serif] tracking-tight text-white leading-tight">
              Sri Lanka’s Dedicated <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
                Security & Technology Partner
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Founded on the principles of engineering precision and customer-first support, <strong>UNITY TECH HUB</strong> delivers end-to-end electronic security systems, computer hardware engineering, enterprise networking, and managed IT services across the island.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenQuoteModal("General Consultation")}
                className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-lg shadow-cyan-500/25"
              >
                Work with Us
              </button>
              <a
                href={PHONE_CLICKABLE}
                className="px-5 py-3.5 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 hover:border-cyan-400 text-white flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call {PHONE_NUMBER}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mission & Vision Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-3xl glass-panel border-cyan-500/30 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-['Outfit',sans-serif] text-white">
              Our Mission
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              To empower Sri Lankan families and businesses with accessible, cutting-edge electronic surveillance and dependable IT infrastructure, ensuring absolute peace of mind through certified workmanship and unyielding technical support.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-panel border-blue-500/30 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-['Outfit',sans-serif] text-white">
              Our Vision
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              To be recognized as Sri Lanka’s most trusted multi-disciplinary technology hub, setting industry benchmarks for installation neatness, rapid breakdown response, and genuine hardware warranty transparency.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit',sans-serif] text-white">
              The Unity Tech Hub Standard
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Why Sri Lankan property owners and corporate decision makers choose our engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl glass-panel border-slate-800/80 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-['Outfit',sans-serif]">
                    {v.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Target Customers We Serve */}
        <div className="mb-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0b1120] to-slate-900 border border-cyan-500/30">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit',sans-serif] text-white">
              Clients & Environments We Secure
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Tailored technological specifications engineered for every property footprint.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetClients.map((client, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <h3 className="text-sm font-bold text-white font-['Outfit',sans-serif]">
                    {client.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-6">
                  {client.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage Map Callout */}
        <div className="p-8 rounded-3xl glass-panel border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                Islandwide Service Network
              </h3>
              <p className="text-xs text-slate-400">
                Active technician deployment across Western, Central, Southern, North Western & Sabaragamuwa provinces.
              </p>
            </div>
          </div>
          
          <button
            onClick={onNavigateContact}
            className="px-6 py-3 rounded-xl text-xs font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors shrink-0"
          >
            Contact Our Dispatch Team
          </button>
        </div>

      </div>
    </div>
  );
};
