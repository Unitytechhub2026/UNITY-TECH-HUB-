import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { 
  X, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  User, 
  Bot, 
  MessageSquare, 
  Phone, 
  RefreshCw,
  Zap,
  Camera,
  Laptop,
  Wifi
} from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_CLICKABLE } from '../data/servicesData';

interface AiChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: () => void;
}

export const AiChatbotDrawer: React.FC<AiChatbotDrawerProps> = ({
  isOpen,
  onClose,
  onOpenQuoteModal
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Ayubowan! Welcome to **UNITY TECH HUB AI Advisor**.\n\nI can help you with:\n• CCTV camera package selection & storage estimates\n• DVR/NVR troubleshooting & error diagnosis\n• Laptop/PC speed upgrades (SSD & RAM)\n• Structured office networking & mesh Wi-Fi\n\nHow can I help you protect your property or fix your tech today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        "How many CCTV cameras for a 2-story home?",
        "My DVR is beeping and not recording",
        "Upgrade my slow laptop with SSD",
        "Explain ColorVu 24/7 night vision"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: [...messages, userMsg].slice(-6)
        })
      });

      const data = await response.json();
      const botReply = data.reply || data.fallback || "Thank you for reaching out to Unity Tech Hub! Please call our technicians at 072 740 2288.";

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          "Get a custom CCTV quote",
          "WhatsApp our tech team directly",
          "Book an on-site technician visit"
        ]
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `Our engineers at Unity Tech Hub are ready to assist you! For immediate help with CCTV, laptop repairs, or Wi-Fi networking, please call or WhatsApp us at **${PHONE_NUMBER}**.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === "Get a custom CCTV quote") {
      onOpenQuoteModal();
      return;
    }
    if (suggestion === "WhatsApp our tech team directly") {
      window.open(WHATSAPP_CLICKABLE, '_blank');
      return;
    }
    handleSendMessage(suggestion);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg h-full bg-[#0b1120] border-l border-cyan-500/30 flex flex-col shadow-2xl">
        
        {/* Chat Drawer Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5">
              <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#030712] rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm font-['Outfit',sans-serif]">
                  Unity Tech Smart Assistant
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                AI Technical Advisor • Unity Tech Hub Sri Lanka
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-ai-chat-drawer-btn"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tech Actions Bar */}
        <div className="px-4 py-2 bg-slate-950 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => handleSendMessage("What CCTV setup is best for my house?")}
            className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
          >
            <Camera className="w-3 h-3 text-cyan-400" />
            <span>CCTV Guide</span>
          </button>
          <button
            onClick={() => handleSendMessage("How much does SSD upgrade cost for slow laptop?")}
            className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
          >
            <Laptop className="w-3 h-3 text-cyan-400" />
            <span>Laptop Speed</span>
          </button>
          <button
            onClick={() => handleSendMessage("How to eliminate Wi-Fi dead zones in office?")}
            className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
          >
            <Wifi className="w-3 h-3 text-cyan-400" />
            <span>Mesh Wi-Fi</span>
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs ${
                    isUser
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-800 border border-cyan-500/30 text-cyan-400'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[85%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl ${
                      isUser
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-medium rounded-tr-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                    }`}
                  >
                    <div className="whitespace-pre-line leading-relaxed">
                      {msg.text}
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 px-1 text-[10px] text-slate-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Suggestions Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(sug)}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900/90 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors text-left"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>Unity Tech AI is analyzing your technical query...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Escalation to Human Technicians */}
        <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Need live technician visit?</span>
          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP_CLICKABLE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp: {PHONE_NUMBER}</span>
            </a>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about CCTV cameras, laptop repairs, Wi-Fi..."
              className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs sm:text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              id="send-ai-chat-message-btn"
              className="p-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
