import React from 'react';
import { PHONE_CLICKABLE, PHONE_NUMBER, WHATSAPP_CLICKABLE } from '../data/servicesData';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';

interface FloatingActionsProps {
  onOpenChat: () => void;
  isChatOpen: boolean;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenChat, isChatOpen }) => {
  return (
    <>
      {/* Desktop & Tablet Floating Action Stack (Bottom Right) */}
      <aside aria-label="Quick contact tools" className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-3">
        {/* Ask AI Assistant Floating Button */}
        {!isChatOpen && (
          <button
            onClick={onOpenChat}
            id="floating-ai-advisor-btn"
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/95 border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-slate-800 shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all hover:scale-105"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
            <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-bold tracking-wide">Unity Tech AI Assistant</span>
          </button>
        )}

        {/* Call Us Button */}
        <a
          href={PHONE_CLICKABLE}
          id="floating-call-btn"
          aria-label={`Call Unity Tech Hub at ${PHONE_NUMBER}`}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 transition-all hover:scale-105 active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Phone className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
          </div>
          <div className="text-left pr-1">
            <span className="block text-[10px] uppercase font-semibold tracking-wider text-cyan-200">Call Now</span>
            <span className="block text-xs font-bold font-mono">{PHONE_NUMBER}</span>
          </div>
        </a>

        {/* WhatsApp Us Button */}
        <a
          href={WHATSAPP_CLICKABLE}
          target="_blank"
          rel="noopener noreferrer"
          id="floating-whatsapp-btn"
          aria-label="WhatsApp Unity Tech Hub"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-xl shadow-emerald-600/30 hover:shadow-emerald-500/40 transition-all hover:scale-105 active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-left pr-1">
            <span className="block text-[10px] uppercase font-semibold tracking-wider text-emerald-100">Instant Chat</span>
            <span className="block text-xs font-bold">WhatsApp Us</span>
          </div>
        </a>
      </aside>

      {/* Mobile Persistent Floating Bottom Dock */}
      <nav aria-label="Mobile quick contact bar" className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#030712]/95 backdrop-blur-xl border-t border-cyan-500/30 px-3 py-2 shadow-2xl">
        <div className="grid grid-cols-3 gap-2">
          <a
            href={PHONE_CLICKABLE}
            id="mobile-bottom-call-btn"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30 active:scale-95 transition-all"
          >
            <Phone className="w-4 h-4 text-cyan-400 mb-0.5" />
            <span className="text-[10px] font-bold">Call Now</span>
            <span className="text-[9px] font-mono text-slate-400">072 740 2288</span>
          </a>

          <a
            href={WHATSAPP_CLICKABLE}
            target="_blank"
            rel="noopener noreferrer"
            id="mobile-bottom-whatsapp-btn"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 active:scale-95 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400 mb-0.5" />
            <span className="text-[10px] font-bold">WhatsApp Us</span>
            <span className="text-[9px] text-emerald-400/80">Online Now</span>
          </a>

          <button
            onClick={onOpenChat}
            id="mobile-bottom-ai-chat-btn"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600/30 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 mb-0.5" />
            <span className="text-[10px] font-bold">AI Tech Help</span>
            <span className="text-[9px] text-cyan-400/80">24/7 Advisor</span>
          </button>
        </div>
      </nav>
    </>
  );
};
