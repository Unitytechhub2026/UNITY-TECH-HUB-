import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Wrench, Send, MessageSquare, Phone, CheckCircle2, Laptop, Monitor, ShieldAlert, Cpu, Wifi } from 'lucide-react';
import { PHONE_NUMBER } from '../data/servicesData';

interface BookRepairModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDevice?: string;
}

export const BookRepairModal: React.FC<BookRepairModalProps> = ({
  isOpen,
  onClose,
  defaultDevice = "Laptop"
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deviceCategory: defaultDevice,
    brandModel: '',
    issueSummary: '',
    serviceMode: 'onsite',
    preferredDate: '',
    location: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
          name: formData.name,
          phone: formData.phone,
          serviceType: `Tech Repair: ${formData.deviceCategory} (${formData.brandModel || 'General'})`,
          propertyType: 'Repair Center Booking',
          message: `Device: ${formData.deviceCategory} (${formData.brandModel}), Issue: ${formData.issueSummary}, Mode: ${formData.serviceMode}, Date: ${formData.preferredDate}, Location: ${formData.location}`
        })
      });
      const data = await res.json();
      setWaLink(data.whatsappUrl || `https://wa.me/94727402288?text=${encodeURIComponent(`Hi Unity Tech Hub, I want to book a repair for my ${formData.deviceCategory} (${formData.brandModel}). Issue: ${formData.issueSummary}. Contact: ${formData.name} - ${formData.phone}`)}`);
      setSubmitted(true);

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
      setSubmitted(true);
      setWaLink(`https://wa.me/94727402288?text=${encodeURIComponent(`Hi Unity Tech Hub, I want to book a repair for my ${formData.deviceCategory}. Contact: ${formData.name} - ${formData.phone}`)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0b1120] border border-cyan-500/30 shadow-2xl p-6 sm:p-8 my-8 text-slate-100 animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          id="book-repair-modal-close-btn"
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-cyan-400">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-['Outfit',sans-serif] text-white">
                  Book a Technical Repair
                </h3>
                <p className="text-xs text-cyan-400">
                  CCTV, DVR/NVR, Laptop, PC, Network & Windows Troubleshooting
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-6">
              Fast diagnostics, transparent pricing with original replacement parts and service warranty across Sri Lanka.
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
                    placeholder="e.g. Nimal Fernando"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
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
                    placeholder="e.g. 072 740 2288"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              {/* Device Category Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Device / System Type *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'Laptop', label: 'Laptop / Notebook', icon: Laptop },
                    { id: 'Desktop PC', label: 'Desktop PC', icon: Monitor },
                    { id: 'CCTV / DVR', label: 'CCTV & DVR/NVR', icon: ShieldAlert },
                    { id: 'Network/Router', label: 'Network / Router', icon: Wifi },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = formData.deviceCategory === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setFormData({ ...formData, deviceCategory: item.id })}
                        className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <Icon className="w-4 h-4 mb-1" />
                        <span className="text-[11px] font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Brand & Model (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.brandModel}
                    onChange={(e) => setFormData({ ...formData, brandModel: e.target.value })}
                    placeholder="e.g. Asus Vivobook, Hikvision DVR 8CH, Dell Inspiron"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Service Mode
                  </label>
                  <select
                    value={formData.serviceMode}
                    onChange={(e) => setFormData({ ...formData, serviceMode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="onsite">On-Site Technician Visit (Home/Office)</option>
                    <option value="dropoff">Bring to Unity Tech Hub Center</option>
                    <option value="pickup">Pickup & Delivery Service</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Describe the Issue or Problem Symptoms *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.issueSummary}
                  onChange={(e) => setFormData({ ...formData, issueSummary: e.target.value })}
                  placeholder="e.g. DVR beeping continuously / Laptop screen black / Very slow Windows boot / Camera 3 flickering..."
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Location in Sri Lanka
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Colombo, Gampaha, Kandy"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Service Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="confirm-book-repair-btn"
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Registering Repair Request...</span>
                  ) : (
                    <>
                      <Wrench className="w-4 h-4" />
                      <span>Confirm Repair Booking</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-xs text-slate-400">
                <span>Emergency Breakdown? Call <strong>{PHONE_NUMBER}</strong> for priority on-site visit</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold font-['Outfit',sans-serif] text-white">
              Repair Booking Confirmed!
            </h3>

            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you, <strong className="text-cyan-300">{formData.name}</strong>. Our hardware engineer will call you shortly to confirm your {formData.deviceCategory} repair diagnostics.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Notify Technician on WhatsApp</span>
              </a>
              <button
                onClick={() => { setSubmitted(false); onClose(); }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
