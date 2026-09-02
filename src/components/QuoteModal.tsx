import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  Phone, 
  CheckCircle2, 
  Sparkles,
  Building,
  Home,
  Store,
  Hotel,
  Factory
} from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_CLICKABLE } from '../data/servicesData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  defaultService = "CCTV Installation"
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    propertyType: 'home',
    serviceType: defaultService,
    cameraCount: '4',
    storagePreference: '1TB (30 Days Recording)',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  const [waLink, setWaLink] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: `${formData.serviceType} for ${formData.propertyType} in ${formData.location || 'Sri Lanka'}. Cameras: ${formData.cameraCount}, Storage: ${formData.storagePreference}. Notes: ${formData.notes}`
        })
      });
      const data = await res.json();
      
      setInquiryId(data.inquiryId || `UTH-${Math.floor(100000 + Math.random() * 900000)}`);
      setWaLink(data.whatsappUrl || `https://wa.me/94727402288?text=${encodeURIComponent(`Hi Unity Tech Hub, I need a quote for ${formData.serviceType} (${formData.propertyType}) in ${formData.location}. Phone: ${formData.phone}`)}`);
      setSubmitted(true);
      
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
      // Fallback
      setSubmitted(true);
      setWaLink(`https://wa.me/94727402288?text=${encodeURIComponent(`Hi Unity Tech Hub, I need a quote for ${formData.serviceType}. My name: ${formData.name}, Phone: ${formData.phone}`)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-xl rounded-2xl bg-[#0b1120] border border-cyan-500/30 shadow-2xl p-6 sm:p-8 my-8 text-slate-100 animate-in fade-in zoom-in duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="quote-modal-close-btn"
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-['Outfit',sans-serif] text-white">
                  Get a Free Custom Quote
                </h3>
                <p className="text-xs text-cyan-400">
                  Quick response within 15 minutes • Free site survey
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-6">
              Tell us about your property and security or IT requirements. Our certified technicians will provide a transparent, competitive estimate.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Kasun Perera"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 077 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Service Required *
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="CCTV Installation">CCTV Installation & Wiring</option>
                    <option value="CCTV Repair & Maintenance">CCTV Repair & Troubleshooting</option>
                    <option value="Computer & Laptop Repair">Computer & Laptop Repair</option>
                    <option value="Networking & Wi-Fi Setup">Networking & Wi-Fi Setup</option>
                    <option value="DVR / NVR Setup">DVR / NVR Setup</option>
                    <option value="Remote Mobile Monitoring Setup">Remote Mobile Monitoring Setup</option>
                    <option value="Smart Security & Biometrics">Smart Security & Biometrics</option>
                    <option value="General IT Support">General IT Support / AMC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Location / City in Sri Lanka *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Colombo 05, Kandy, Negombo"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Property Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Property / Business Type
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs">
                  {[
                    { id: 'home', label: 'Home/Villa', icon: Home },
                    { id: 'shop', label: 'Shop/Retail', icon: Store },
                    { id: 'office', label: 'Office', icon: Building },
                    { id: 'hotel', label: 'Hotel/Villa', icon: Hotel },
                    { id: 'factory', label: 'Factory', icon: Factory },
                  ].map((p) => {
                    const Icon = p.icon;
                    const isSelected = formData.propertyType === p.id;
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setFormData({ ...formData, propertyType: p.id as any })}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <Icon className="w-4 h-4 mb-1" />
                        <span className="text-[11px] font-medium">{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Camera Count for CCTV */}
              {formData.serviceType.includes('CCTV') && (
                <div className="grid grid-cols-2 gap-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <label className="block text-xs font-semibold text-cyan-400 mb-1">
                      Estimated Cameras Needed
                    </label>
                    <select
                      value={formData.cameraCount}
                      onChange={(e) => setFormData({ ...formData, cameraCount: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                    >
                      <option value="2 Cameras">2 Cameras (Small House/Counter)</option>
                      <option value="4 Cameras">4 Cameras (Standard Home/Shop)</option>
                      <option value="8 Cameras">8 Cameras (Large House/Office)</option>
                      <option value="16+ Cameras">16+ Cameras (Commercial/Factory)</option>
                      <option value="Need Advice">Need Technical Advice on site</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-cyan-400 mb-1">
                      Video Storage Plan
                    </label>
                    <select
                      value={formData.storagePreference}
                      onChange={(e) => setFormData({ ...formData, storagePreference: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                    >
                      <option value="1TB (30 Days Recording)">1TB HDD (~30 Days)</option>
                      <option value="2TB (60 Days Recording)">2TB HDD (~60 Days)</option>
                      <option value="4TB+ (Commercial Retention)">4TB+ HDD (90+ Days)</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Additional Notes / Specific Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Night vision needed for backyard, remote viewing on 3 mobile phones..."
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-quote-form-btn"
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Quote Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request Free Quote Now</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  Call Hotline: {PHONE_NUMBER}
                </span>
                <span>•</span>
                <span className="text-emerald-400">WhatsApp Instant Connect</span>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Success View */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold font-['Outfit',sans-serif] text-white">
              Quote Request Received!
            </h3>

            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you, <strong className="text-cyan-300">{formData.name}</strong>. Our security and IT team has received your inquiry for <strong>{formData.serviceType}</strong> in {formData.location}.
            </p>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 max-w-md mx-auto space-y-1">
              <div className="flex justify-between">
                <span>Reference ID:</span>
                <span className="font-mono text-cyan-400 font-bold">{inquiryId}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact Phone:</span>
                <span className="font-mono text-slate-200">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Expected Response:</span>
                <span className="text-emerald-400 font-semibold">Within 15 - 30 Minutes</span>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open Pre-filled WhatsApp Chat</span>
              </a>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
