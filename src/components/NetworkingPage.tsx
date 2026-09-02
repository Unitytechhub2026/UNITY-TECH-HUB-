import React from 'react';
import { 
  Network, 
  Wifi, 
  Server, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  MessageSquare, 
  Building, 
  Home, 
  Hotel, 
  Factory,
  Globe,
  Radio,
  Sliders
} from 'lucide-react';
import { PHONE_NUMBER, PHONE_CLICKABLE, WHATSAPP_CLICKABLE } from '../data/servicesData';

interface NetworkingPageProps {
  onOpenQuoteModal: (serviceName?: string) => void;
  onOpenChat: () => void;
}

export const NetworkingPage: React.FC<NetworkingPageProps> = ({
  onOpenQuoteModal,
  onOpenChat
}) => {
  const networkSolutions = [
    {
      title: "Structured Cat6 / Cat6A Cabling",
      desc: "Clean concealed Ethernet drops with RJ45 punch down, patch panels, cable trays, and neat labeling.",
      icon: Network,
      bullets: ["Gigabit 1000Mbps transmission", "Fluke cable certification", "Concealed wall trunking"]
    },
    {
      title: "Long-Range Mesh Wi-Fi Systems",
      desc: "Zero dead-zones across multi-story houses, luxury villas, and expansive hotel resorts with seamless roaming.",
      icon: Wifi,
      bullets: ["Ubiquiti UniFi & TP-Link Omada", "Single unified SSID roaming", "High-density device support"]
    },
    {
      title: "Office Router & Managed Switch Setup",
      desc: "Enterprise network design with VLAN traffic segregation, guest portals, QoS priority, and firewall security.",
      icon: Server,
      bullets: ["Dual-WAN failover internet", "POS & CCTV network separation", "Bandwidth throttling per user"]
    },
    {
      title: "Server Rack & Cable Management",
      desc: "Reorganize messy bird-nest server cabinets into pristine, airflow-optimized, color-coded rack architectures.",
      icon: Radio,
      bullets: ["Wall-mount & floor-standing racks", "PDU power distribution & UPS", "Neat cable comb dressing"]
    },
    {
      title: "Point-to-Point Wireless Bridges",
      desc: "Connect two distant buildings (up to 5km - 15km) without expensive trench digging using wireless airMAX links.",
      icon: Globe,
      bullets: ["Factory to gatehouse link", "High-throughput 300-800Mbps", "Weatherproof outdoor antennas"]
    },
    {
      title: "VPN & Remote Office Connectivity",
      desc: "Secure encrypted site-to-site VPN tunnels connecting branch offices, retail shops, and remote workers to HQ.",
      icon: ShieldCheck,
      bullets: ["Encrypted remote desktop access", "Centralized accounting software", "Zero leak security"]
    }
  ];

  const deploymentSectors = [
    { name: "Corporate Offices", icon: Building, desc: "Fast LAN for 20-200 workstations, Zoom conferencing & server access." },
    { name: "Hotels & Resorts", icon: Hotel, desc: "Guest Wi-Fi captive portals, pool area coverage & billing system links." },
    { name: "Factories & Warehouses", icon: Factory, desc: "Interference-resistant fiber runs, barcode scanner Wi-Fi & perimeter IP." },
    { name: "Smart Homes & Villas", icon: Home, desc: "Multi-story unbroken Wi-Fi coverage for 4K streaming and smart devices." },
  ];

  return (
    <div className="bg-[#030712] min-h-screen text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mb-4">
          <span>HOME</span>
          <span>/</span>
          <span className="text-white">NETWORKING SOLUTIONS</span>
        </div>

        {/* Hero Banner */}
        <div className="relative rounded-3xl glass-panel p-8 sm:p-12 overflow-hidden border-cyan-500/30 mb-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
              <Network className="w-3.5 h-3.5 text-cyan-400" />
              <span>High-Speed Infrastructure & Seamless Connectivity</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-['Outfit',sans-serif] tracking-tight text-white leading-tight">
              Enterprise-Grade LAN & Wi-Fi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
                Networking Solutions in Sri Lanka
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Eliminate lagging Zoom calls, buffering CCTV feeds, and Wi-Fi dead spots. Unity Tech Hub designs, installs, and certifies structured network cabling and long-range wireless networks for residences and commercial businesses.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenQuoteModal("Networking & Wi-Fi Setup")}
                className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-lg shadow-cyan-500/25"
              >
                Request Network Survey
              </button>
              <a
                href={PHONE_CLICKABLE}
                className="px-5 py-3.5 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 hover:border-cyan-400 text-white flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call {PHONE_NUMBER}</span>
              </a>
              <button
                onClick={onOpenChat}
                className="px-5 py-3.5 rounded-xl text-xs font-bold bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-slate-800 transition-colors"
              >
                AI Network Planner
              </button>
            </div>
          </div>
        </div>

        {/* 6 Networking Pillars */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit',sans-serif] text-white">
              End-to-End Networking Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Designed for high throughput, heavy concurrency, and ironclad firewall security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {networkSolutions.map((net, idx) => {
              const Icon = net.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl glass-panel glass-panel-hover border-slate-800/90 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-base font-bold text-white font-['Outfit',sans-serif]">
                      {net.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {net.desc}
                    </p>

                    <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                      {net.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-1.5 text-xs text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => onOpenQuoteModal(`Networking: ${net.title}`)}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <span>Inquire Setup</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={WHATSAPP_CLICKABLE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sectors We Connect */}
        <div className="mb-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0b1120] to-slate-900 border border-cyan-500/30">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit',sans-serif] text-white">
              Who Relies On Our Networks?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Custom-engineered network architecture matched to your building topology and user density.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deploymentSectors.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div key={idx} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{sec.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{sec.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
