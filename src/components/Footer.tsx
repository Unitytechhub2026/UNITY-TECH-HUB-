import React from 'react';
import { TabType } from '../types';
import { 
  PHONE_NUMBER, 
  PHONE_CLICKABLE, 
  WHATSAPP_NUMBER, 
  WHATSAPP_CLICKABLE, 
  EMAIL_ADDRESS, 
  OFFICE_ADDRESS, 
  BUSINESS_HOURS 
} from '../data/servicesData';
import { 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight,
  Shield,
  Facebook,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: TabType) => void;
  onOpenQuoteModal: () => void;
  onOpenAdminPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, onOpenQuoteModal, onOpenAdminPortal }) => {
  const handleNav = (tab: TabType) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020617] border-t border-cyan-500/20 text-slate-400 pt-16 pb-12 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="font-['Outfit',sans-serif] font-black text-xl text-white tracking-tight">
                  UNITY TECH HUB
                </span>
                <p className="text-xs text-cyan-400 font-mono">
                  Smart Technology. Secure Future.
                </p>
              </div>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              Sri Lanka’s dependable technology partner for high-definition CCTV security camera systems, rapid computer & laptop repairs, structured LAN/Wi-Fi networking, and business IT solutions.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Unity Tech Hub on Facebook"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Unity Tech Hub on Instagram"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Unity Tech Hub on LinkedIn"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Unity Tech Hub on YouTube"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-['Outfit',sans-serif] font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => handleNav('home')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500/60 group-hover:translate-x-1 transition-transform" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('about')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500/60 group-hover:translate-x-1 transition-transform" />
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('cctv')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500/60 group-hover:translate-x-1 transition-transform" />
                  <span>CCTV Solutions</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('repairs')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500/60 group-hover:translate-x-1 transition-transform" />
                  <span>IT & Repair Center</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('networking')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500/60 group-hover:translate-x-1 transition-transform" />
                  <span>Networking Solutions</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('services')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500/60 group-hover:translate-x-1 transition-transform" />
                  <span>All Services Catalog</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('contact')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-500/60 group-hover:translate-x-1 transition-transform" />
                  <span>Contact Us</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="text-white font-['Outfit',sans-serif] font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Core Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('cctv')} className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-left">
                  <span>• CCTV Installation & Wiring</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('cctv')} className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-left">
                  <span>• CCTV Troubleshooting & Repair</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('repairs')} className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-left">
                  <span>• Computer & PC Repairs</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('repairs')} className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-left">
                  <span>• Laptop Screen & Motherboard Repair</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('networking')} className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-left">
                  <span>• Office LAN & Mesh Wi-Fi Setup</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-left">
                  <span>• IT Support & Data Recovery</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div className="space-y-3.5">
            <h3 className="text-white font-['Outfit',sans-serif] font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Get in Touch
            </h3>

            <div className="flex items-start gap-3 text-sm">
              <Phone className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Phone Support</p>
                <a 
                  href={PHONE_CLICKABLE} 
                  id="footer-phone-number"
                  className="text-white font-semibold hover:text-cyan-400 transition-colors"
                >
                  {PHONE_NUMBER}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <MessageSquare className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">WhatsApp Hotline</p>
                <a 
                  href={WHATSAPP_CLICKABLE} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  id="footer-whatsapp-number"
                  className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
                >
                  {WHATSAPP_NUMBER}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <Mail className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Email Address</p>
                <a 
                  href={`mailto:${EMAIL_ADDRESS}`} 
                  className="text-slate-300 hover:text-cyan-400 transition-colors text-xs"
                >
                  {EMAIL_ADDRESS}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Service Coverage</p>
                <p className="text-slate-300 text-xs">{OFFICE_ADDRESS}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <Clock className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Operating Hours</p>
                <p className="text-slate-300 text-xs">{BUSINESS_HOURS.weekdays}</p>
                <p className="text-slate-400 text-[11px]">{BUSINESS_HOURS.sunday}</p>
              </div>
            </div>
          </div>

        </div>

        {/* SEO Keywords & Trust bar */}
        <div className="py-6 border-b border-slate-800/60 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-300 font-semibold">Specialties:</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">CCTV installation Sri Lanka</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">CCTV repair Sri Lanka</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">computer repair Sri Lanka</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">laptop repair Sri Lanka</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">networking solutions Sri Lanka</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">IT support Sri Lanka</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300">100% Genuine Hardware & Manufacturer Warranty</span>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} <strong className="text-slate-300">UNITY TECH HUB</strong>. All Rights Reserved. “Smart Technology. Secure Future.”</p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenQuoteModal} className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 cursor-pointer">
              Request Free Inspection
            </button>
            <span>•</span>
            <a href={WHATSAPP_CLICKABLE} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
              Direct WhatsApp Chat
            </a>
            {onOpenAdminPortal && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenAdminPortal}
                  id="footer-staff-login-btn"
                  className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Staff & Billing Portal</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
