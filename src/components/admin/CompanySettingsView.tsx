import React, { useState } from 'react';
import { 
  Building2, 
  Save, 
  Check, 
  Phone, 
  Mail, 
  CreditCard, 
  ShieldCheck, 
  FileText,
  Clock
} from 'lucide-react';
import { CompanySettings } from '../../types';
import { dbStore } from '../../data/dbStore';

export const CompanySettingsView: React.FC = () => {
  const [settings, setSettings] = useState<CompanySettings>(dbStore.getCompanySettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dbStore.saveCompanySettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleChange = (field: keyof CompanySettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-['Outfit',sans-serif] text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-cyan-400" />
            <span>Company Profile & Document Settings</span>
          </h1>
          <p className="text-xs text-slate-400">
            Configure header information, bank accounts, VAT details, and default quotation terms.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-1.5 animate-bounce">
            <Check className="w-4 h-4" />
            <span>Settings Saved Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        
        {/* Basic Company Identity */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Company Identity & Contact Header</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Head Office Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Branch Location</label>
              <input
                type="text"
                value={settings.branch}
                onChange={(e) => handleChange('branch', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Official Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Official Hotline</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Business Registration (BR Number)</label>
              <input
                type="text"
                value={settings.brNumber}
                onChange={(e) => handleChange('brNumber', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">VAT Number (Optional)</label>
              <input
                type="text"
                value={settings.vatNumber || ''}
                onChange={(e) => handleChange('vatNumber', e.target.value)}
                placeholder="e.g. 102938475-7000"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Bank Account Details */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>Bank Transfer Details (Printed on Invoices & Quotes)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Bank Name</label>
              <input
                type="text"
                value={settings.bankName}
                onChange={(e) => handleChange('bankName', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Branch</label>
              <input
                type="text"
                value={settings.bankBranch}
                onChange={(e) => handleChange('bankBranch', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Account Name</label>
              <input
                type="text"
                value={settings.bankAccountName}
                onChange={(e) => handleChange('bankAccountName', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-semibold"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Account Number</label>
              <input
                type="text"
                value={settings.bankAccountNumber}
                onChange={(e) => handleChange('bankAccountNumber', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono font-bold"
              />
            </div>
          </div>
        </div>

        {/* Default Document Terms */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-lg">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Default Quotation Terms & Policies</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Default Warranty Statement</label>
              <input
                type="text"
                value={settings.defaultWarranty}
                onChange={(e) => handleChange('defaultWarranty', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Default Quotation Validity (Days)</label>
              <input
                type="number"
                value={settings.defaultValidityDays || 14}
                onChange={(e) => handleChange('defaultValidityDays', Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Default Payment Terms Clause</label>
              <input
                type="text"
                value={settings.defaultPaymentTerms}
                onChange={(e) => handleChange('defaultPaymentTerms', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Default Notes & Conditions</label>
              <textarea
                rows={2}
                value={settings.defaultNotes}
                onChange={(e) => handleChange('defaultNotes', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white resize-none"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 stroke-[2.5]" />
            <span>Save Company Profile & Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
};
