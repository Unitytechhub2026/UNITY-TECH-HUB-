import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Star, 
  Edit3, 
  Trash2, 
  MessageCircle, 
  ShieldCheck, 
  Tag, 
  Clock, 
  CheckCircle2,
  TrendingUp,
  CreditCard,
  X
} from 'lucide-react';
import { Supplier, PriceHistoryRecord } from '../../types';
import { dbStore, formatLKR } from '../../data/dbStore';

export const SuppliersManager: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(dbStore.getSuppliers());
  const [priceHistory, setPriceHistory] = useState<PriceHistoryRecord[]>(dbStore.getPriceHistory());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [brandsInput, setBrandsInput] = useState('');
  const [categoriesInput, setCategoriesInput] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('30 Days Credit / PDC');
  const [rating, setRating] = useState<number>(5);
  const [notes, setNotes] = useState('');

  const handleOpenAddModal = () => {
    setEditingSupplier(null);
    setName('');
    setCompany('');
    setPhone('');
    setWhatsapp('');
    setEmail('');
    setAddress('');
    setWebsite('');
    setBrandsInput('Hikvision, Dahua, Western Digital');
    setCategoriesInput('CCTV Cameras, Recorders (DVR/NVR), Storage & Hard Disks');
    setPaymentTerms('30 Days Credit / PDC');
    setRating(5);
    setNotes('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (sup: Supplier) => {
    setEditingSupplier(sup);
    setName(sup.name);
    setCompany(sup.company || '');
    setPhone(sup.phone);
    setWhatsapp(sup.whatsapp || '');
    setEmail(sup.email || '');
    setAddress(sup.address);
    setWebsite(sup.website || '');
    setBrandsInput(sup.brandsDistributed.join(', '));
    setCategoriesInput(sup.productCategories.join(', '));
    setPaymentTerms(sup.paymentTerms);
    setRating(sup.rating || 5);
    setNotes(sup.notes || '');
    setIsModalOpen(true);
  };

  const handleSaveSupplier = () => {
    if (!name || !phone || !address) {
      alert('Please fill in Supplier Name, Phone number, and Address.');
      return;
    }

    const brands = brandsInput.split(',').map(b => b.trim()).filter(Boolean);
    const categories = categoriesInput.split(',').map(c => c.trim()).filter(Boolean);

    const supplierData: Supplier = {
      id: editingSupplier ? editingSupplier.id : `sup-${Date.now()}`,
      supplierCode: editingSupplier ? editingSupplier.supplierCode : `SUP-${(suppliers.length + 1).toString().padStart(3, '0')}`,
      name,
      company,
      phone,
      whatsapp: whatsapp || phone,
      email,
      address,
      website,
      brandsDistributed: brands.length ? brands : ['Hikvision'],
      productCategories: categories.length ? categories : ['CCTV Cameras'],
      paymentTerms,
      rating,
      notes,
      createdAt: editingSupplier ? editingSupplier.createdAt : new Date().toISOString()
    };

    dbStore.saveSupplier(supplierData);
    setSuppliers(dbStore.getSuppliers());
    setIsModalOpen(false);
    setSuccessToast(`Supplier "${supplierData.name}" saved successfully!`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleDeleteSupplier = (id: string) => {
    if (window.confirm('Are you sure you want to remove this supplier?')) {
      dbStore.deleteSupplier(id);
      setSuppliers(dbStore.getSuppliers());
    }
  };

  const handleOpenWhatsApp = (wa: string, supName: string) => {
    const cleanNum = wa.replace(/[^0-9]/g, '');
    const fullNum = cleanNum.startsWith('0') ? `94${cleanNum.slice(1)}` : cleanNum;
    const msg = encodeURIComponent(`Hello ${supName}, I am contacting you from *UNITY TECH HUB* regarding CCTV hardware stock availability and dealer price quotes.`);
    window.open(`https://wa.me/${fullNum}?text=${msg}`, '_blank');
  };

  const filteredSuppliers = suppliers.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.brandsDistributed.some(b => b.toLowerCase().includes(searchTerm.toLowerCase())) ||
      s.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.company && s.company.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast */}
      {successToast && (
        <div className="fixed top-20 right-8 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span className="font-semibold text-sm">{successToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/70 to-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              Vendor & Supply Chain Directory
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Authorized Sri Lankan CCTV Distributors & Suppliers
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Directory of primary distributors (Redington SL, Metropolitan, Singer, Barclays, Winsoft) with direct WhatsApp chat, credit terms, and purchase price tracking.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            Add New Supplier
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search suppliers by name, brand (Hikvision, Dahua, WD), address..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="text-xs text-slate-400">
          Showing <strong className="text-white">{filteredSuppliers.length}</strong> Registered Authorized Vendors
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSuppliers.map((sup) => (
          <div
            key={sup.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-4 relative group"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-cyan-400 bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded">
                    {sup.supplierCode}
                  </span>
                  {sup.rating && (
                    <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                      {Array.from({ length: sup.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  )}
                </div>

                <h3 className="text-base font-black text-white mt-1">
                  {sup.name}
                </h3>
                {sup.company && (
                  <div className="text-xs text-slate-400 font-medium">
                    {sup.company}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => handleOpenEditModal(sup)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs cursor-pointer"
                  title="Edit Supplier"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteSupplier(sup.id)}
                  className="p-2 bg-slate-800 hover:bg-rose-950/40 text-rose-400 rounded-lg text-xs cursor-pointer"
                  title="Delete Supplier"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Brands Distributed */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-slate-500 font-medium mr-1">Brands:</span>
              {sup.brandsDistributed.map((brand, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-800/90 text-cyan-300 border border-slate-700"
                >
                  {brand}
                </span>
              ))}
            </div>

            {/* Contact details */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1.5 text-slate-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  Phone:
                </span>
                <span className="font-mono text-white font-bold">{sup.phone}</span>
              </div>

              {sup.email && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    Email:
                  </span>
                  <span className="text-slate-300 truncate max-w-[200px]">{sup.email}</span>
                </div>
              )}

              <div className="flex items-start justify-between gap-2">
                <span className="flex items-center gap-1.5 text-slate-400 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  Address:
                </span>
                <span className="text-slate-400 text-right">{sup.address}</span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <CreditCard className="w-3.5 h-3.5 text-slate-500" />
                  Payment Terms:
                </span>
                <span className="text-emerald-400 font-semibold">{sup.paymentTerms}</span>
              </div>
            </div>

            {sup.notes && (
              <p className="text-xs text-slate-400 italic">
                "{sup.notes}"
              </p>
            )}

            {/* Direct WhatsApp Action */}
            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleOpenWhatsApp(sup.whatsapp || sup.phone, sup.name)}
                className="flex-1 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Stock & Rate Inquiry
              </button>

              {sup.website && (
                <a
                  href={sup.website}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs flex items-center justify-center"
                  title="Visit Website"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Supplier Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-400" />
                {editingSupplier ? 'Edit Vendor / Supplier' : 'Register New Vendor / Supplier'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Supplier Name / Point of Contact *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Redington Sri Lanka (Pvt) Ltd"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Company / Group</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Redington Gulf"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Telephone / Hotline *</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 011 476 8000"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">WhatsApp Direct</label>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="e.g. 077 200 4500"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sales@supplier.lk"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Physical Address *</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. No. 320, T.B. Jayah Mawatha, Colombo 10"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Brands Distributed (Comma-separated)</label>
                  <input
                    type="text"
                    value={brandsInput}
                    onChange={(e) => setBrandsInput(e.target.value)}
                    placeholder="Hikvision, Dahua, WD Purple, D-Link"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Payment & Credit Terms</label>
                  <select
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                  >
                    <option value="30 Days Credit / PDC">30 Days Credit / PDC</option>
                    <option value="14 Days PDC">14 Days PDC</option>
                    <option value="7 Days Cheque">7 Days Cheque</option>
                    <option value="Immediate Bank Transfer / Cash">Immediate Bank Transfer / Cash</option>
                    <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Website URL</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://supplier.lk"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Top Tier Distributor)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars - Reliable)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars - Average)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Distributor Notes & Warranty Terms</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Direct warranty claim center in Colombo. Contact Kasun on WhatsApp for discounts."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveSupplier}
                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Save Supplier
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
