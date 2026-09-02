import React, { useState, useMemo } from 'react';
import { ServiceRecord, Customer, Product } from '../../types';
import { dbStore, formatLKR } from '../../data/dbStore';
import { 
  Wrench, 
  CheckCircle2, 
  Clock, 
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
  Trash2, 
  Layers, 
  Cpu, 
  DollarSign,
  Briefcase
} from 'lucide-react';

export const ServiceHistoryManager: React.FC = () => {
  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>(() => dbStore.getServiceRecords());
  const [customers] = useState<Customer[]>(() => dbStore.getCustomers());
  const [products] = useState<Product[]>(() => dbStore.getProducts());

  const [searchQuery, setSearchQuery] = useState('');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'COMPLETED' | 'IN_PROGRESS' | 'PENDING'>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ServiceRecord | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ServiceRecord>>({
    serviceCode: '',
    customerId: '',
    customerName: '',
    customerPhone: '',
    siteAddress: '',
    date: new Date().toISOString().slice(0, 10),
    technicianName: 'Kasun Jayawardena (Senior Technician)',
    serviceType: 'CCTV Repair & Maintenance',
    problem: '',
    solution: '',
    partsUsed: [],
    laborCharge: 2500,
    totalAmount: 2500,
    warrantyGiven: '3 Months Service Warranty',
    status: 'COMPLETED',
    notes: ''
  });

  // Calculate Metrics
  const metrics = useMemo(() => {
    let totalRevenue = 0;
    let completedCount = 0;
    let inProgressCount = 0;
    let pendingCount = 0;

    serviceRecords.forEach(r => {
      totalRevenue += r.totalAmount || 0;
      if (r.status === 'COMPLETED') completedCount++;
      else if (r.status === 'IN_PROGRESS') inProgressCount++;
      else if (r.status === 'PENDING') pendingCount++;
    });

    return {
      totalJobs: serviceRecords.length,
      completedCount,
      inProgressCount,
      pendingCount,
      totalRevenue
    };
  }, [serviceRecords]);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return serviceRecords.filter(r => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = 
          r.serviceCode.toLowerCase().includes(q) ||
          r.customerName.toLowerCase().includes(q) ||
          r.problem.toLowerCase().includes(q) ||
          (r.solution || '').toLowerCase().includes(q) ||
          (r.technicianName || '').toLowerCase().includes(q);
        if (!match) return false;
      }

      if (serviceTypeFilter !== 'All' && r.serviceType !== serviceTypeFilter) {
        return false;
      }

      if (statusFilter !== 'All' && r.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [serviceRecords, searchQuery, serviceTypeFilter, statusFilter]);

  const handleOpenCreate = () => {
    setEditingRecord(null);
    setFormData({
      serviceCode: `SRV-2026-${Math.floor(100 + Math.random() * 900)}`,
      customerId: customers[0]?.id || '',
      customerName: customers[0]?.name || '',
      customerPhone: customers[0]?.phone || '',
      siteAddress: customers[0]?.address || '',
      date: new Date().toISOString().slice(0, 10),
      technicianName: 'Kasun Jayawardena',
      serviceType: 'CCTV Repair & Troubleshooting',
      problem: '',
      solution: '',
      partsUsed: [],
      laborCharge: 2500,
      totalAmount: 2500,
      warrantyGiven: '3 Months Service Warranty',
      status: 'COMPLETED',
      notes: ''
    });
    setIsModalOpen(true);
  };

  const handleEditRecord = (record: ServiceRecord) => {
    setEditingRecord(record);
    setFormData(record);
    setIsModalOpen(true);
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm("Are you sure you want to delete this service record?")) {
      dbStore.deleteServiceRecord(id);
      setServiceRecords(dbStore.getServiceRecords());
    }
  };

  const handleAddPart = () => {
    const defaultProd = products[0];
    const newPart = {
      productId: defaultProd ? defaultProd.id : '',
      productName: defaultProd ? defaultProd.name : 'Replacement Item',
      qty: 1,
      unitPrice: defaultProd ? defaultProd.sellingPrice : 500,
      amount: defaultProd ? defaultProd.sellingPrice : 500
    };

    const updatedParts = [...(formData.partsUsed || []), newPart];
    const partsTotal = updatedParts.reduce((sum, p) => sum + p.amount, 0);
    const newTotal = (formData.laborCharge || 0) + partsTotal;

    setFormData({
      ...formData,
      partsUsed: updatedParts,
      totalAmount: newTotal
    });
  };

  const handleRemovePart = (index: number) => {
    const updatedParts = (formData.partsUsed || []).filter((_, i) => i !== index);
    const partsTotal = updatedParts.reduce((sum, p) => sum + p.amount, 0);
    const newTotal = (formData.laborCharge || 0) + partsTotal;

    setFormData({
      ...formData,
      partsUsed: updatedParts,
      totalAmount: newTotal
    });
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.problem) {
      alert("Customer name and problem description are required.");
      return;
    }

    const partsTotal = (formData.partsUsed || []).reduce((sum, p) => sum + p.amount, 0);
    const calculatedTotal = (formData.laborCharge || 0) + partsTotal;

    const recordToSave: ServiceRecord = {
      id: editingRecord ? editingRecord.id : `srv-${Date.now()}`,
      serviceCode: formData.serviceCode || `SRV-2026-${Math.floor(100 + Math.random() * 900)}`,
      customerId: formData.customerId || '',
      customerName: formData.customerName || '',
      customerPhone: formData.customerPhone || '',
      siteAddress: formData.siteAddress || '',
      date: formData.date || new Date().toISOString().slice(0, 10),
      technicianName: formData.technicianName || 'Kasun Jayawardena',
      serviceType: formData.serviceType || 'CCTV Service',
      problem: formData.problem || '',
      solution: formData.solution || '',
      partsUsed: formData.partsUsed || [],
      laborCharge: formData.laborCharge || 0,
      totalAmount: calculatedTotal,
      warrantyGiven: formData.warrantyGiven || '3 Months Service Warranty',
      status: formData.status || 'COMPLETED',
      notes: formData.notes || '',
      createdAt: editingRecord ? editingRecord.createdAt : new Date().toISOString()
    };

    dbStore.saveServiceRecord(recordToSave);
    setServiceRecords(dbStore.getServiceRecords());
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-semibold uppercase">Total Service Jobs</span>
          <div className="text-xl font-black text-white">{metrics.totalJobs}</div>
          <span className="text-[10px] text-cyan-400">All Time Logged</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/20 space-y-1">
          <span className="text-[11px] text-emerald-400 font-semibold uppercase">Completed Jobs</span>
          <div className="text-xl font-black text-emerald-300">{metrics.completedCount}</div>
          <span className="text-[10px] text-emerald-500/80">Closed & Handed Over</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/20 space-y-1">
          <span className="text-[11px] text-amber-400 font-semibold uppercase">Active / In Progress</span>
          <div className="text-xl font-black text-amber-300">{metrics.inProgressCount + metrics.pendingCount}</div>
          <span className="text-[10px] text-amber-400/80">Open Technical Work</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-1">
          <span className="text-[11px] text-cyan-400 font-semibold uppercase">Service Revenue</span>
          <div className="text-xl font-black text-cyan-300">{formatLKR(metrics.totalRevenue)}</div>
          <span className="text-[10px] text-slate-400">Labor & Spares</span>
        </div>
      </div>

      {/* Action and Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-cyan-400" />
            <input
              type="text"
              placeholder="Search service records by code, customer, technician, problem..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="All">All Job Statuses</option>
            <option value="COMPLETED">Completed</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 transition-all shadow-md shadow-cyan-500/25 cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>+ LOG SERVICE JOB</span>
        </button>
      </div>

      {/* Service Records Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-3.5">Code & Date</th>
                <th className="p-3.5">Customer & Site</th>
                <th className="p-3.5">Service Type</th>
                <th className="p-3.5">Problem & Solution</th>
                <th className="p-3.5">Technician</th>
                <th className="p-3.5 text-right">Amount</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-slate-500 italic">
                    No service records found.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => {
                  const isCompleted = r.status === 'COMPLETED';
                  const isInProgress = r.status === 'IN_PROGRESS';
                  return (
                    <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 space-y-0.5">
                        <div className="font-mono font-bold text-cyan-300">{r.serviceCode}</div>
                        <div className="text-slate-500 text-[10px]">{r.date}</div>
                      </td>

                      <td className="p-3.5 space-y-0.5">
                        <div className="font-semibold text-white">{r.customerName}</div>
                        <div className="text-slate-400 text-[10px] truncate max-w-[180px]">{r.siteAddress}</div>
                      </td>

                      <td className="p-3.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
                          {r.serviceType}
                        </span>
                      </td>

                      <td className="p-3.5 max-w-xs space-y-1">
                        <div className="text-slate-200 line-clamp-1 font-medium">{r.problem}</div>
                        <div className="text-slate-400 text-[10px] line-clamp-1 italic">{r.solution}</div>
                        {r.partsUsed && r.partsUsed.length > 0 && (
                          <div className="text-cyan-400 text-[10px]">
                            Parts: {r.partsUsed.map(p => `${p.qty}x ${p.productName}`).join(', ')}
                          </div>
                        )}
                      </td>

                      <td className="p-3.5 text-slate-300">
                        {r.technicianName}
                      </td>

                      <td className="p-3.5 text-right font-mono font-bold text-cyan-300">
                        {formatLKR(r.totalAmount)}
                      </td>

                      <td className="p-3.5 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isCompleted
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : isInProgress
                            ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {r.status}
                        </span>
                      </td>

                      <td className="p-3.5 text-center">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => handleEditRecord(r)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
                            title="Edit Service Record"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteRecord(r.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700"
                            title="Delete Service Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: CREATE / EDIT SERVICE RECORD */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-2xl p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    {editingRecord ? `Edit Service Job ${editingRecord.serviceCode}` : 'Log Technical Service & Repair Job'}
                  </h3>
                  <p className="text-xs text-slate-400">Record customer service visits, repairs, parts used & warranty</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRecord} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Customer *</label>
                  <select
                    value={formData.customerId}
                    onChange={e => {
                      const cust = customers.find(c => c.id === e.target.value);
                      setFormData({
                        ...formData,
                        customerId: e.target.value,
                        customerName: cust ? cust.name : '',
                        customerPhone: cust ? cust.phone : '',
                        siteAddress: cust ? cust.address : ''
                      });
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                    required
                  >
                    <option value="">-- Select Customer --</option>
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.phone})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Service Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Site Address</label>
                  <input
                    type="text"
                    value={formData.siteAddress}
                    onChange={e => setFormData({ ...formData, siteAddress: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Assigned Technician</label>
                  <input
                    type="text"
                    value={formData.technicianName}
                    onChange={e => setFormData({ ...formData, technicianName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Service Job Type</label>
                <select
                  value={formData.serviceType}
                  onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="CCTV Repair & Troubleshooting">CCTV Repair & Troubleshooting</option>
                  <option value="Camera Lens & Optical Cleaning">Camera Lens & Optical Cleaning</option>
                  <option value="DVR / NVR Configuration & Maintenance">DVR / NVR Configuration & Maintenance</option>
                  <option value="Surveillance Hard Disk Replacement">Surveillance Hard Disk Replacement</option>
                  <option value="Power Supply & SMPS Box Repair">Power Supply & SMPS Box Repair</option>
                  <option value="Cat6 Cabling / RJ45 Connector Re-termination">Cat6 Cabling / RJ45 Connector Re-termination</option>
                  <option value="Remote Mobile Live View Setup">Remote Mobile Live View Setup</option>
                  <option value="Preventive Annual Maintenance (AMC)">Preventive Annual Maintenance (AMC)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Reported Problem / Fault *</label>
                <textarea
                  rows={2}
                  value={formData.problem}
                  onChange={e => setFormData({ ...formData, problem: e.target.value })}
                  placeholder="e.g. Channel 3 camera video loss, power supply clicking noise"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Solution Provided / Work Done</label>
                <textarea
                  rows={2}
                  value={formData.solution}
                  onChange={e => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="e.g. Replaced faulty 12V 2A DC adaptor, re-crimped BNC connector with copper core"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Parts Used Section */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Parts Used from Inventory</span>
                  <button
                    type="button"
                    onClick={handleAddPart}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-400 hover:bg-slate-700 text-[11px] font-bold"
                  >
                    + Add Part
                  </button>
                </div>

                {(!formData.partsUsed || formData.partsUsed.length === 0) ? (
                  <p className="text-[11px] text-slate-500 italic py-1">No replacement parts logged for this job.</p>
                ) : (
                  <div className="space-y-2">
                    {formData.partsUsed.map((part, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <select
                          value={part.productId}
                          onChange={e => {
                            const p = products.find(prod => prod.id === e.target.value);
                            const updated = [...formData.partsUsed!];
                            updated[idx] = {
                              ...updated[idx],
                              productId: e.target.value,
                              productName: p ? p.name : '',
                              unitPrice: p ? p.sellingPrice : 0,
                              amount: (p ? p.sellingPrice : 0) * updated[idx].qty
                            };
                            const partsTotal = updated.reduce((s, it) => s + it.amount, 0);
                            setFormData({
                              ...formData,
                              partsUsed: updated,
                              totalAmount: (formData.laborCharge || 0) + partsTotal
                            });
                          }}
                          className="flex-1 p-2 rounded-lg bg-slate-900 border border-slate-800 text-white"
                        >
                          {products.map(p => (
                            <option key={p.id} value={p.id}>
                              {p.name} ({formatLKR(p.sellingPrice)})
                            </option>
                          ))}
                        </select>

                        <input
                          type="number"
                          min="1"
                          value={part.qty}
                          onChange={e => {
                            const qty = parseInt(e.target.value) || 1;
                            const updated = [...formData.partsUsed!];
                            updated[idx] = {
                              ...updated[idx],
                              qty,
                              amount: updated[idx].unitPrice * qty
                            };
                            const partsTotal = updated.reduce((s, it) => s + it.amount, 0);
                            setFormData({
                              ...formData,
                              partsUsed: updated,
                              totalAmount: (formData.laborCharge || 0) + partsTotal
                            });
                          }}
                          className="w-16 p-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-center font-mono"
                        />

                        <span className="font-mono text-cyan-300 w-24 text-right">
                          {formatLKR(part.amount)}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleRemovePart(idx)}
                          className="p-1.5 text-slate-400 hover:text-rose-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Financials & Warranty */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Labor Charge (LKR)</label>
                  <input
                    type="number"
                    value={formData.laborCharge}
                    onChange={e => {
                      const labor = parseFloat(e.target.value) || 0;
                      const partsTotal = (formData.partsUsed || []).reduce((s, it) => s + it.amount, 0);
                      setFormData({
                        ...formData,
                        laborCharge: labor,
                        totalAmount: labor + partsTotal
                      });
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Total Bill (LKR)</label>
                  <input
                    type="number"
                    value={formData.totalAmount}
                    readOnly
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Job Status</label>
                  <select
                    value={formData.status}
                    onChange={(e: any) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Service Warranty Given</label>
                <input
                  type="text"
                  value={formData.warrantyGiven}
                  onChange={e => setFormData({ ...formData, warrantyGiven: e.target.value })}
                  placeholder="e.g. 3 Months Service Warranty on work done"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30"
                >
                  Save Service Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
