import React, { useState, useMemo } from 'react';
import { SerialNumberRecord, WarrantyClaim, Customer, Product } from '../../types';
import { dbStore, formatLKR } from '../../data/dbStore';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  X,
  Sparkles,
  Info,
  Check,
  Building,
  RotateCcw
} from 'lucide-react';

export const WarrantyManager: React.FC = () => {
  const [serials, setSerials] = useState<SerialNumberRecord[]>(() => dbStore.getSerialNumbers());
  const [claims, setClaims] = useState<WarrantyClaim[]>(() => dbStore.getWarrantyClaims());
  const [customers] = useState<Customer[]>(() => dbStore.getCustomers());
  const [products] = useState<Product[]>(() => dbStore.getProducts());

  const [activeTab, setActiveTab] = useState<'register' | 'claims' | 'lifespan-matrix'>('register');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'active' | 'expiring_30' | 'expiring_7' | 'expired'>('All');

  // Modals
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [editingClaim, setEditingClaim] = useState<WarrantyClaim | null>(null);

  // Form State for new/edit claim
  const [claimForm, setClaimForm] = useState<Partial<WarrantyClaim>>({
    customerId: '',
    customerName: '',
    customerPhone: '',
    productId: '',
    productName: '',
    brand: 'Hikvision',
    model: '',
    serialNumber: '',
    invoiceNumber: '',
    purchaseDate: new Date().toISOString().slice(0, 10),
    warrantyPeriod: '2 Years',
    warrantyEndDate: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10),
    problemDescription: '',
    claimDate: new Date().toISOString().slice(0, 10),
    technicianName: 'Kasun Jayawardena',
    status: 'OPEN',
    resolutionNotes: ''
  });

  // Calculate Metrics
  const metrics = useMemo(() => {
    const now = new Date();
    const in7Days = new Date(now.getTime() + 7 * 86400000);
    const in30Days = new Date(now.getTime() + 30 * 86400000);

    let activeCount = 0;
    let expiring7Count = 0;
    let expiring30Count = 0;
    let expiredCount = 0;

    serials.forEach(s => {
      if (!s.warrantyEndDate) return;
      const end = new Date(s.warrantyEndDate);

      if (end < now) {
        expiredCount++;
      } else {
        activeCount++;
        if (end <= in7Days) {
          expiring7Count++;
        } else if (end <= in30Days) {
          expiring30Count++;
        }
      }
    });

    const openClaims = claims.filter(c => c.status === 'OPEN' || c.status === 'UNDER REVIEW').length;

    return {
      totalTracked: serials.length,
      activeCount,
      expiring7Count,
      expiring30Count,
      expiredCount,
      openClaims
    };
  }, [serials, claims]);

  // Filtered Serials
  const filteredSerials = useMemo(() => {
    const now = new Date();
    const in7Days = new Date(now.getTime() + 7 * 86400000);
    const in30Days = new Date(now.getTime() + 30 * 86400000);

    return serials.filter(s => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = 
          s.serialNumber.toLowerCase().includes(q) ||
          s.productName.toLowerCase().includes(q) ||
          (s.customerName || '').toLowerCase().includes(q) ||
          (s.invoiceNumber || '').toLowerCase().includes(q);
        if (!match) return false;
      }

      if (statusFilter !== 'All') {
        if (!s.warrantyEndDate) return false;
        const end = new Date(s.warrantyEndDate);
        if (statusFilter === 'expired' && end >= now) return false;
        if (statusFilter === 'active' && end < now) return false;
        if (statusFilter === 'expiring_7' && (end < now || end > in7Days)) return false;
        if (statusFilter === 'expiring_30' && (end < now || end > in30Days)) return false;
      }

      return true;
    });
  }, [serials, searchQuery, statusFilter]);

  // Lifespan Reference Matrix
  const lifespanMatrix = [
    { category: 'Analog HD Cameras', typicalLife: '3 - 5 Years', replacementSignals: 'Night vision LED fading, lens clouding, color distortion', maintenanceTip: 'Clean front optical glass every 6 months, verify 12V DC power drop' },
    { category: 'IP / PoE Cameras', typicalLife: '4 - 6 Years', replacementSignals: 'PoE negotiation drops, intermittent RTSP streaming packet loss', maintenanceTip: 'Inspect RJ45 waterproof gland boot and apply silicone grease' },
    { category: 'Standalone DVR / NVR', typicalLife: '4 - 6 Years', replacementSignals: 'Repeated rebooting, cooling fan noise, HDMI output flicker', maintenanceTip: 'Blow dust from motherboard annually, check CPU heatsink airflow' },
    { category: 'Surveillance HDDs (WD Purple)', typicalLife: '4 - 5 Years (24/7)', replacementSignals: 'SMART bad sector warnings, recording gap glitches, high seek latency', maintenanceTip: 'Monitor SMART health metrics in NVR menu quarterly' },
    { category: 'Centralized SMPS Power Supplies', typicalLife: '2 - 3 Years', replacementSignals: 'Voltage drop under load below 11.5V, capacitor bulge, night IR cut resets', maintenanceTip: 'Ensure adequate ventilation in 4U rack cabinet' },
    { category: 'Pure Copper Cat6 Cabling', typicalLife: '8 - 10 Years', replacementSignals: 'Physical sheath degradation from direct sunlight / UV exposure', maintenanceTip: 'Enclose outdoor exposed runs inside UV-rated PVC conduit pipe' }
  ];

  const handleOpenNewClaim = (serial?: SerialNumberRecord) => {
    if (serial) {
      setClaimForm({
        customerId: serial.customerId || '',
        customerName: serial.customerName || '',
        customerPhone: '',
        productId: serial.productId,
        productName: serial.productName,
        brand: serial.brand || 'Hikvision',
        model: serial.model || '',
        serialNumber: serial.serialNumber,
        invoiceNumber: serial.invoiceNumber || '',
        purchaseDate: serial.purchaseDate || new Date().toISOString().slice(0, 10),
        warrantyPeriod: serial.warrantyPeriod || '2 Years',
        warrantyEndDate: serial.warrantyEndDate || new Date().toISOString().slice(0, 10),
        problemDescription: '',
        claimDate: new Date().toISOString().slice(0, 10),
        technicianName: 'Kasun Jayawardena',
        status: 'OPEN',
        resolutionNotes: ''
      });
    } else {
      setClaimForm({
        customerId: '',
        customerName: '',
        customerPhone: '',
        productId: products[0]?.id || '',
        productName: products[0]?.name || '',
        brand: 'Hikvision',
        model: '',
        serialNumber: '',
        invoiceNumber: '',
        purchaseDate: new Date().toISOString().slice(0, 10),
        warrantyPeriod: '2 Years',
        warrantyEndDate: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10),
        problemDescription: '',
        claimDate: new Date().toISOString().slice(0, 10),
        technicianName: 'Kasun Jayawardena',
        status: 'OPEN',
        resolutionNotes: ''
      });
    }
    setEditingClaim(null);
    setIsClaimModalOpen(true);
  };

  const handleEditClaim = (claim: WarrantyClaim) => {
    setEditingClaim(claim);
    setClaimForm(claim);
    setIsClaimModalOpen(true);
  };

  const handleSaveClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimForm.customerName || !claimForm.problemDescription) {
      alert("Please provide customer name and problem description.");
      return;
    }

    const claimToSave: WarrantyClaim = {
      id: editingClaim ? editingClaim.id : `clm-${Date.now()}`,
      claimNumber: editingClaim ? editingClaim.claimNumber : `CLM-2026-${Math.floor(100 + Math.random() * 900)}`,
      customerId: claimForm.customerId || '',
      customerName: claimForm.customerName || '',
      customerPhone: claimForm.customerPhone || '',
      productId: claimForm.productId || '',
      productName: claimForm.productName || 'CCTV Equipment',
      brand: claimForm.brand || 'Hikvision',
      model: claimForm.model || '',
      serialNumber: claimForm.serialNumber || '',
      invoiceNumber: claimForm.invoiceNumber || '',
      purchaseDate: claimForm.purchaseDate,
      warrantyPeriod: claimForm.warrantyPeriod || '2 Years',
      warrantyEndDate: claimForm.warrantyEndDate,
      problemDescription: claimForm.problemDescription || '',
      claimDate: claimForm.claimDate || new Date().toISOString().slice(0, 10),
      technicianName: claimForm.technicianName,
      status: claimForm.status || 'OPEN',
      resolutionNotes: claimForm.resolutionNotes || '',
      replacementSerialNumber: claimForm.replacementSerialNumber
    };

    dbStore.saveWarrantyClaim(claimToSave);
    setClaims(dbStore.getWarrantyClaims());
    setIsClaimModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold uppercase">Total Tracked</span>
          <div className="text-xl font-black text-white">{metrics.totalTracked}</div>
          <span className="text-[10px] text-slate-500">Hardware Units</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/20 space-y-1">
          <span className="text-[11px] text-emerald-400 font-semibold uppercase">Active Warranty</span>
          <div className="text-xl font-black text-emerald-300">{metrics.activeCount}</div>
          <span className="text-[10px] text-emerald-500/80">Full Coverage</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/20 space-y-1">
          <span className="text-[11px] text-amber-400 font-semibold uppercase">Expiring (30 Days)</span>
          <div className="text-xl font-black text-amber-300">{metrics.expiring30Count}</div>
          <span className="text-[10px] text-amber-400/80">Renewal Due</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-rose-500/30 space-y-1">
          <span className="text-[11px] text-rose-400 font-semibold uppercase">Expiring (7 Days)</span>
          <div className="text-xl font-black text-rose-300">{metrics.expiring7Count}</div>
          <span className="text-[10px] text-rose-400 font-bold">Urgent Follow-Up</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold uppercase">Expired</span>
          <div className="text-xl font-black text-slate-300">{metrics.expiredCount}</div>
          <span className="text-[10px] text-slate-500">Out of Warranty</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-1">
          <span className="text-[11px] text-cyan-400 font-semibold uppercase">Open Claims</span>
          <div className="text-xl font-black text-cyan-300">{metrics.openClaims}</div>
          <span className="text-[10px] text-cyan-400/80">In Progress</span>
        </div>
      </div>

      {/* Main Header & Sub Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('register')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Warranty Register ({filteredSerials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('claims')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'claims'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Warranty Claims / RMA ({claims.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('lifespan-matrix')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'lifespan-matrix'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Useful Life Reference Matrix</span>
          </button>
        </div>

        {/* Global Action Button */}
        <button
          onClick={() => handleOpenNewClaim()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 transition-all shadow-md shadow-cyan-500/25 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ LOG WARRANTY CLAIM</span>
        </button>
      </div>

      {/* TAB 1: WARRANTY REGISTER */}
      {activeTab === 'register' && (
        <div className="space-y-4">
          
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-cyan-400" />
              <input
                type="text"
                placeholder="Search serials, customer name, invoice, product..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e: any) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
              >
                <option value="All">All Warranty Statuses</option>
                <option value="active">Active Warranty</option>
                <option value="expiring_30">Expiring in 30 Days</option>
                <option value="expiring_7">Expiring in 7 Days (Critical)</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Serial Number & Product</th>
                    <th className="p-3.5">Customer & Site</th>
                    <th className="p-3.5">Invoice & Install Date</th>
                    <th className="p-3.5">Warranty End Date</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Estimated Useful Life</th>
                    <th className="p-3.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredSerials.map((s) => {
                    const now = new Date();
                    const end = s.warrantyEndDate ? new Date(s.warrantyEndDate) : null;
                    const isExpired = end && end < now;
                    const isExpiring7 = end && !isExpired && end <= new Date(now.getTime() + 7 * 86400000);
                    const isExpiring30 = end && !isExpired && !isExpiring7 && end <= new Date(now.getTime() + 30 * 86400000);

                    return (
                      <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 space-y-0.5">
                          <div className="font-mono font-bold text-cyan-300 text-sm">{s.serialNumber}</div>
                          <div className="font-semibold text-white">{s.productName}</div>
                          <div className="text-[10px] text-slate-400">{s.brand} {s.model ? `• ${s.model}` : ''}</div>
                        </td>

                        <td className="p-3.5 space-y-0.5">
                          {s.customerName ? (
                            <>
                              <div className="font-semibold text-slate-200">{s.customerName}</div>
                              <div className="text-slate-400 text-[10px] truncate max-w-[200px]">{s.siteAddress}</div>
                            </>
                          ) : (
                            <span className="text-slate-500 italic">In Stock Store</span>
                          )}
                        </td>

                        <td className="p-3.5 space-y-0.5 font-mono text-slate-300">
                          <div>{s.invoiceNumber || 'N/A'}</div>
                          <div className="text-[10px] text-slate-500">{s.installationDate || s.purchaseDate || 'N/A'}</div>
                        </td>

                        <td className="p-3.5 font-mono">
                          <div className={isExpired ? 'text-rose-400 font-bold' : isExpiring7 ? 'text-amber-300 font-bold' : 'text-emerald-400 font-semibold'}>
                            {s.warrantyEndDate || 'N/A'}
                          </div>
                          <div className="text-[10px] text-slate-500">{s.warrantyPeriod || '2 Years'}</div>
                        </td>

                        <td className="p-3.5">
                          {isExpired ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-500/30 text-[10px] font-bold">
                              EXPIRED
                            </span>
                          ) : isExpiring7 ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-rose-950 text-amber-300 border border-amber-500/30 text-[10px] font-bold animate-pulse">
                              EXPIRING IN 7 DAYS
                            </span>
                          ) : isExpiring30 ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                              EXPIRING IN 30 DAYS
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                              ACTIVE WARRANTY
                            </span>
                          )}
                        </td>

                        <td className="p-3.5 space-y-0.5">
                          <div className="text-slate-200 font-medium">{s.expectedUsefulLife || '3-5 Years (Estimated)'}</div>
                          <div className="text-[9px] text-slate-500 italic">Not a guaranteed replacement date</div>
                        </td>

                        <td className="p-3.5 text-center">
                          <button
                            onClick={() => handleOpenNewClaim(s)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 text-[11px] font-bold"
                            title="Log Claim for this device"
                          >
                            + Claim
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WARRANTY CLAIMS & RMA */}
      {activeTab === 'claims' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Claim # & Date</th>
                    <th className="p-3.5">Customer & Contact</th>
                    <th className="p-3.5">Hardware Item & S/N</th>
                    <th className="p-3.5">Problem Description</th>
                    <th className="p-3.5">Assigned Technician</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {claims.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-10 text-slate-500 italic">
                        No warranty claims currently registered.
                      </td>
                    </tr>
                  ) : (
                    claims.map((c) => {
                      const isClosed = c.status === 'CLOSED' || c.status === 'REPLACED' || c.status === 'REPAIRED';
                      return (
                        <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3.5 space-y-0.5">
                            <div className="font-mono font-bold text-cyan-300">{c.claimNumber}</div>
                            <div className="text-slate-500 text-[10px]">{c.claimDate}</div>
                          </td>

                          <td className="p-3.5 space-y-0.5">
                            <div className="font-semibold text-white">{c.customerName}</div>
                            <div className="text-slate-400 text-[10px]">{c.customerPhone}</div>
                          </td>

                          <td className="p-3.5 space-y-0.5">
                            <div className="font-semibold text-slate-200">{c.productName}</div>
                            <div className="font-mono text-cyan-400 text-[10px]">S/N: {c.serialNumber || 'N/A'}</div>
                          </td>

                          <td className="p-3.5 max-w-xs space-y-1">
                            <p className="text-slate-300 line-clamp-2">{c.problemDescription}</p>
                            {c.resolutionNotes && (
                              <p className="text-emerald-400 text-[10px] italic line-clamp-1">
                                Res: {c.resolutionNotes}
                              </p>
                            )}
                          </td>

                          <td className="p-3.5 text-slate-300">
                            {c.technicianName || 'Unassigned'}
                          </td>

                          <td className="p-3.5">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              c.status === 'OPEN'
                                ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                                : c.status === 'UNDER REVIEW'
                                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                                : c.status === 'APPROVED' || c.status === 'REPLACED' || c.status === 'REPAIRED'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-300'
                            }`}>
                              {c.status}
                            </span>
                          </td>

                          <td className="p-3.5 text-center">
                            <button
                              onClick={() => handleEditClaim(c)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
                              title="Update Claim Status"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LIFESPAN REFERENCE MATRIX */}
      {activeTab === 'lifespan-matrix' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <span className="font-bold text-white">Product Useful Life Guidelines vs. Warranty Period</span>
              <p className="text-slate-300 leading-relaxed">
                Warranty period (e.g. 2 Years) guarantees free repair/replacement for manufacturer defects. <strong>Estimated Useful Life</strong> indicates the typical expected operational duration before optical, electronic, or mechanical wear requires scheduled preventive replacement.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lifespanMatrix.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">{item.category}</h4>
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold">
                    {item.typicalLife}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block mb-0.5">End-of-Life Symptoms:</span>
                    <p className="text-slate-300">{item.replacementSignals}</p>
                  </div>

                  <div>
                    <span className="text-cyan-400 font-semibold block mb-0.5">Recommended Preventive Action:</span>
                    <p className="text-slate-400">{item.maintenanceTip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: LOG / EDIT WARRANTY CLAIM */}
      {isClaimModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-2xl p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    {editingClaim ? `Edit Claim ${editingClaim.claimNumber}` : 'Log New Warranty Claim'}
                  </h3>
                  <p className="text-xs text-slate-400">Record hardware fault and track replacement/repair cycle</p>
                </div>
              </div>
              <button onClick={() => setIsClaimModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClaim} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Customer Name *</label>
                  <input
                    type="text"
                    value={claimForm.customerName}
                    onChange={e => setClaimForm({ ...claimForm, customerName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Customer Phone</label>
                  <input
                    type="text"
                    value={claimForm.customerPhone}
                    onChange={e => setClaimForm({ ...claimForm, customerPhone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Product Description</label>
                  <input
                    type="text"
                    value={claimForm.productName}
                    onChange={e => setClaimForm({ ...claimForm, productName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Hardware S/N</label>
                  <input
                    type="text"
                    value={claimForm.serialNumber}
                    onChange={e => setClaimForm({ ...claimForm, serialNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Problem Description *</label>
                <textarea
                  rows={3}
                  value={claimForm.problemDescription}
                  onChange={e => setClaimForm({ ...claimForm, problemDescription: e.target.value })}
                  placeholder="e.g. Night vision IR LEDs flickering intermittently after storm"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Claim Status</label>
                  <select
                    value={claimForm.status}
                    onChange={(e: any) => setClaimForm({ ...claimForm, status: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="UNDER REVIEW">UNDER REVIEW</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REPAIRED">REPAIRED</option>
                    <option value="REPLACED">REPLACED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Assigned Technician</label>
                  <input
                    type="text"
                    value={claimForm.technicianName}
                    onChange={e => setClaimForm({ ...claimForm, technicianName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Resolution Notes</label>
                <input
                  type="text"
                  value={claimForm.resolutionNotes}
                  onChange={e => setClaimForm({ ...claimForm, resolutionNotes: e.target.value })}
                  placeholder="e.g. Replaced optical sensor board under distributor RMA"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsClaimModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30"
                >
                  Save Claim Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
