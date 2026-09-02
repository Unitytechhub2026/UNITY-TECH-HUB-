import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Building,
  Headphones,
  Check
} from 'lucide-react';
import { 
  PHONE_NUMBER, 
  PHONE_CLICKABLE, 
  WHATSAPP_CLICKABLE, 
  EMAIL_ADDRESS, 
  BUSINESS_HOURS, 
  SERVICE_LOCATIONS 
} from '../data/servicesData';

interface ContactPageProps {
  onOpenChat: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenChat }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceRequired: 'CCTV Installation',
    location: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryCode, setInquiryCode] = useState('');
  const [waLink, setWaLink] = useState('');

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
          email: formData.email,
          serviceType: formData.serviceRequired,
          location: formData.location,
          message: formData.message
        })
      });
      const data = await res.json();
      setInquiryCode(data.inquiryId || `UTH-${Math.floor(100000 + Math.random() * 900000)}`);
      setWaLink(data.whatsappUrl || `https://wa.me/94727402288?text=${encodeURIComponent(`Hi Unity Tech Hub, My name is ${formData.name}. I need ${formData.serviceRequired} in ${formData.location}. Message: ${formData.message}`)}`);
      setSubmitted(true);

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
      setSubmitted(true);
      setWaLink(`https://wa.me/94727402288?text=${encodeURIComponent(`Hi Unity Tech Hub, My name is ${formData.name}. Phone: ${formData.phone}. Need: ${formData.serviceRequired}`)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#030712] min-h-screen text-slate-100 py-12" id="contact-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mb-4">
          <span>HOME</span>
          <span>/</span>
          <span className="text-white">CONTACT & INQUIRIES</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Headphones className="w-3.5 h-3.5 text-cyan-400" />
            <span>Direct Sri Lankan Hotline & Field Dispatch</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-['Outfit',sans-serif] text-white tracking-tight">
            Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">UNITY TECH HUB</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Have a question about CCTV camera packages, computer repairs, or network upgrades? Call, WhatsApp, or send an inquiry below. We respond promptly.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Phone Card */}
          <a
            href={PHONE_CLICKABLE}
            className="p-6 rounded-2xl glass-panel glass-panel-hover border-slate-800 flex flex-col items-center text-center space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Telephone Hotline</span>
              <span className="text-base font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                {PHONE_NUMBER}
              </span>
            </div>
            <span className="text-xs text-cyan-400">Click to Call Directly</span>
          </a>

          {/* WhatsApp Card */}
          <a
            href={WHATSAPP_CLICKABLE}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl glass-panel glass-panel-hover border-slate-800 flex flex-col items-center text-center space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">WhatsApp Business</span>
              <span className="text-base font-bold font-mono text-white group-hover:text-emerald-300 transition-colors">
                {PHONE_NUMBER}
              </span>
            </div>
            <span className="text-xs text-emerald-400">Instant Chat & Photos</span>
          </a>

          {/* Business Hours Card */}
          <div className="p-6 rounded-2xl glass-panel border-slate-800 flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Operating Hours</span>
              <span className="text-xs font-bold text-white block mt-1">
                {BUSINESS_HOURS.regular}
              </span>
            </div>
            <span className="text-xs text-slate-400">Emergency Support Available</span>
          </div>

          {/* Service Area Card */}
          <div className="p-6 rounded-2xl glass-panel border-slate-800 flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Service Coverage</span>
              <span className="text-xs font-bold text-white block mt-1">
                Islandwide Sri Lanka
              </span>
            </div>
            <span className="text-xs text-slate-400">On-Site Dispatch Service</span>
          </div>
        </div>

        {/* Contact Form & Location Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Form (Section 6 requirement) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-panel border-cyan-500/30">
              {!submitted ? (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                      <Send className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold font-['Outfit',sans-serif] text-white">
                        Send an Official Inquiry
                      </h2>
                      <p className="text-xs text-cyan-400">
                        We will get back to you with quotation details within 15-30 minutes
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Ruwan Silva"
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
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
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. info@yourcompany.lk"
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          City / Location in Sri Lanka *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Colombo, Kandy, Gampaha, Galle"
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Service Required *
                      </label>
                      <select
                        value={formData.serviceRequired}
                        onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="CCTV Installation">CCTV Security Camera Installation</option>
                        <option value="CCTV Repair & Maintenance">CCTV System Repair & Diagnostics</option>
                        <option value="Computer & Laptop Repair">Laptop / Desktop Hardware Repair</option>
                        <option value="Networking Solutions">Office Networking & Wi-Fi Setup</option>
                        <option value="DVR / NVR Setup">DVR / NVR Configuration & Hard Drive Upgrade</option>
                        <option value="Remote Mobile Viewing">Remote Phone Viewing Setup</option>
                        <option value="Smart Security Solutions">Smart Home / Biometric Security</option>
                        <option value="IT Support & AMC">Corporate IT Support / Maintenance Agreement</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Message / Project Scope *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please describe your property type, number of cameras, or the symptoms of your tech issue..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        id="submit-contact-inquiry-btn"
                        className="w-full py-4 px-6 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Sending Inquiry to Unity Tech Hub...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Service Inquiry</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl font-bold text-white font-['Outfit',sans-serif]">
                    Inquiry Submitted Successfully!
                  </h3>

                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-cyan-300">{formData.name}</strong>. Reference ID: <strong className="font-mono text-white">{inquiryCode}</strong>. Our team will contact you on <strong>{formData.phone}</strong> shortly.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp Now</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Service Locations and FAQ */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Service Locations Box */}
            <div className="p-6 rounded-3xl glass-panel border-slate-800 space-y-4">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white font-['Outfit',sans-serif]">
                  Key Service Locations in Sri Lanka
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                {SERVICE_LOCATIONS.map((loc, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{loc}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                * We also cater to outstation commercial projects and hotel resorts across the island upon advance appointment.
              </p>
            </div>

            {/* Quick AI Advisor Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-500/30 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Need an Instant Technical Recommendation?</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use our automated AI security consultant to calculate required CCTV storage, diagnose laptop symptoms, or plan Wi-Fi coverage instantly.
              </p>
              <button
                onClick={onOpenChat}
                className="w-full py-2.5 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Unity Tech AI Assistant</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
