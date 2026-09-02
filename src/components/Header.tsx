import React, { useState } from 'react';
import { TabType } from '../types';
import { PHONE_NUMBER, PHONE_CLICKABLE, WHATSAPP_CLICKABLE } from '../data/servicesData';
import { 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  Wrench, 
  Network, 
  Camera, 
  Layers, 
  Info, 
  Mail,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

interface HeaderProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  onOpenQuoteModal: () => void;
  onOpenChat: () => void;
  onOpenAdminPortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenQuoteModal,
  onOpenChat,
  onOpenAdminPortal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: ShieldCheck },
    { id: 'catalog', label: 'Product Catalog', icon: ShoppingBag },
    { id: 'cctv', label: 'CCTV Solutions', icon: Camera },
    { id: 'repairs', label: 'IT & Repairs', icon: Wrench },
    { id: 'networking', label: 'Networking', icon: Network },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (tabId: TabType) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-500/20 bg-[#030712]/90 backdrop-blur-xl transition-all">
      {/* Top Banner with Quick Phone & WhatsApp */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              SRI LANKA ISLANDWIDE SERVICE
            </span>
            <span className="hidden sm:inline text-slate-400">
              Homes, Offices, Shops, Hotels, Schools & Factories
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onOpenAdminPortal}
              id="top-header-admin-portal-link"
              className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900 transition-colors font-medium cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Staff & Billing Portal</span>
            </button>
            <a 
              href={PHONE_CLICKABLE} 
              id="top-header-phone-link"
              className="flex items-center gap-1.5 text-slate-200 hover:text-cyan-400 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{PHONE_NUMBER}</span>
            </a>
            <a 
              href={WHATSAPP_CLICKABLE} 
              target="_blank" 
              rel="noopener noreferrer"
              id="top-header-whatsapp-link"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            id="brand-logo-btn"
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Outfit',sans-serif] font-black text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  UNITY TECH HUB
                </span>
              </div>
              <p className="text-[11px] font-medium tracking-wider uppercase text-cyan-400/90 font-mono">
                Smart Technology. Secure Future.
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenChat}
              id="header-ai-chat-btn"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-all hover:border-cyan-400"
              title="Online AI Tech Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>AI Tech Chat</span>
            </button>
            <button
              onClick={onOpenQuoteModal}
              id="header-free-quote-btn"
              className="relative group overflow-hidden px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-md shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>GET A FREE QUOTE</span>
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenQuoteModal}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#030712]/98 px-4 pt-3 pb-6 space-y-2 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400"></span>}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdminPortal(); }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Staff & CCTV Billing Portal</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenChat(); }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-slate-900 border border-cyan-500/30 text-cyan-300"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Ask Unity AI Assistant</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenQuoteModal(); }}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 text-center"
            >
              GET A FREE QUOTE
            </button>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={PHONE_CLICKABLE}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call Us Now</span>
              </a>
              <a
                href={WHATSAPP_CLICKABLE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
