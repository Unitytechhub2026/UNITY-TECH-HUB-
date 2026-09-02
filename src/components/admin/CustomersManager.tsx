import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Edit3, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  FileText, 
  Receipt, 
  Eye, 
  X, 
  Check, 
  DollarSign, 
  ShieldCheck,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { Customer } from '../../types';
import { dbStore, formatLKR } from '../../data/dbStore';

interface CustomersManagerProps {
  onCreateQuotationForCustomer: (customerId: string) => void;
  onCreateInvoiceForCustomer: (customerId: string) => void;
}

export const CustomersManager: React.FC<CustomersManagerProps> = ({
  onCreateQuotationForCustomer,
  onCreateInvoiceForCustomer
}) => {
  const [customers, setCustomers] = useState<Customer[]>(dbStore.getCustomers());
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [viewingCustomerHistory, setViewingCustomerHistory] = useState<Customer | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [nicBrNumber, setNicBrNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('Western Province');
  const [siteAddress, setSiteAddress] = useState('');
  const [notes, setNotes] = useState('');

  const refreshList = () => {
    setCustomers(dbStore.getCustomers());
  };

  const handleOpenAdd = () => {
    setEditingCustomer(null);
    setName('');
    setCompanyName('');
    setNicBrNumber('');
    setPhone('');
    setWhatsapp('');
    setEmail('');
    setAddress('');
    setCity('');
    setProvince('Western Province');
    setSiteAddress('');
    setNotes('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setName(customer.name);
    setCompanyName(customer.companyName || '');
    setNicBrNumber(customer.nicBrNumber || '');
    setPhone(customer.phone);
    setWhatsapp(customer.whatsapp || '');
    setEmail(customer.email || '');
    setAddress(customer.address);
    setCity(customer.city);
    setProvince(customer.province || 'Western Province');
    setSiteAddress(customer.siteAddress || '');
    setNotes(customer.notes || '');
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete customer "${name}"?`)) {
      dbStore.deleteCustomer(id);
      refreshList();
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill in the required fields: Customer Name, Phone, and Address.');
      return;
    }

    const customerData: Customer = {
      id: editingCustomer ? editingCustomer.id : `cust-${Date.now()}`,
      customerCode: editingCustomer ? editingCustomer.customerCode : `CUST-${(customers.length + 1).toString().padStart(3, '0')}`,
      name: name.trim(),
      companyName: companyName.trim() || undefined,
      nicBrNumber: nicBrNumber.trim() || undefined,
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || phone.trim(),
      email: email.trim() || undefined,
      address: address.trim(),
      city: city.trim() || 'Colombo',
      province: province,
      siteAddress: siteAddress.trim() || address.trim(),
      notes: notes.trim() || undefined,
      createdAt: editingCustomer ? editingCustomer.createdAt : new Date().toISOString()
    };

    dbStore.saveCustomer(customerData);
    refreshList();
    setIsModalOpen(false);
  };

  const filteredCustomers = customers.filter(c => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      (c.companyName && c.companyName.toLowerCase().includes(q)) ||
      c.phone.includes(q) ||
      (c.nicBrNumber && c.nicBrNumber.toLowerCase().includes(q)) ||
      c.city.toLowerCase().includes(q)
    );
  });

  // Calculate customer financial metrics
  const getCustomerMetrics = (customerId: string) => {
    const allQuotations = dbStore.getQuotations().filter(q => q.customerId === customerId);
    const allInvoices = dbStore.getInvoices().filter(i => i.customerId === customerId);
    const allPayments = dbStore.getPayments().filter(p => p.customerId === customerId);

    const totalBilled = allInvoices.reduce((sum, i) => sum + i.grandTotal, 0);
    const totalPaid = allInvoices.reduce((sum, i) => sum + i.amountPaid, 0);
    const outstandingBalance = Math.max(0, totalBilled - totalPaid);

    return {
      quotations: allQuotations,
      invoices: allInvoices,
      payments: allPayments,
      totalBilled,
      totalPaid,
      outstandingBalance
    };
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-['Outfit',sans-serif] text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            <span>Customer Directory & History</span>
          </h1>
          <p className="text-xs text-slate-400">
            Manage customer accounts, CCTV site locations, quotations, and outstanding ledgers.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          id="add-customer-main-btn"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ ADD NEW CUSTOMER</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, company, phone, NIC..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Showing {filteredCustomers.length} of {customers.length} registered customers
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <th className="p-4 font-semibold">Code / Name</th>
                <th className="p-4 font-semibold">Company / BR</th>
                <th className="p-4 font-semibold">Phone & WhatsApp</th>
                <th className="p-4 font-semibold">Location / Site</th>
                <th className="p-4 font-semibold">Outstanding Balance</th>
                <th className="p-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCustomers.map((cust) => {
                const metrics = getCustomerMetrics(cust.id);
                return (
                  <tr key={cust.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="font-mono text-[11px] text-cyan-400 font-bold">
                        {cust.customerCode}
                      </div>
                      <div className="font-bold text-white text-sm">
                        {cust.name}
                      </div>
                      {cust.email && (
                        <div className="text-[11px] text-slate-400">
                          {cust.email}
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      {cust.companyName ? (
                        <div>
                          <div className="font-semibold text-slate-200">{cust.companyName}</div>
                          {cust.nicBrNumber && <div className="text-[10px] text-slate-400 font-mono">BR: {cust.nicBrNumber}</div>}
                        </div>
                      ) : (
                        <span className="text-slate-500 italic">Individual Account</span>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-1 text-slate-200 font-mono font-medium">
                        <Phone className="w-3 h-3 text-cyan-400" />
                        <span>{cust.phone}</span>
                      </div>
                      {cust.whatsapp && (
                        <a 
                          href={`https://wa.me/${cust.whatsapp.replace(/[^0-9]/g, '')}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1 text-emerald-400 text-[11px] hover:underline"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="font-medium text-slate-300">{cust.city}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                        {cust.siteAddress || cust.address}
                      </div>
                    </td>

                    <td className="p-4">
                      {metrics.outstandingBalance > 0 ? (
                        <div className="font-mono font-bold text-amber-400">
                          {formatLKR(metrics.outstandingBalance)}
                          <div className="text-[10px] text-amber-300/80 font-normal">
                            {metrics.invoices.length} Invoices
                          </div>
                        </div>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                          CLEARED
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        <button
                          onClick={() => setViewingCustomerHistory(cust)}
                          title="View Full History & Orders"
                          className="p-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onCreateQuotationForCustomer(cust.id)}
                          title="Create Quotation for this Customer"
                          className="p-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-blue-300 transition-colors cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(cust)}
                          title="Edit Customer"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(cust.id, cust.name)}
                          title="Delete Customer"
                          className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0b1329] border border-cyan-500/40 rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative my-8 text-slate-100">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-['Outfit',sans-serif] text-white">
                  {editingCustomer ? 'Edit Customer Account' : 'Add New Customer'}
                </h2>
                <p className="text-xs text-slate-400">
                  Customer profile will be automatically linked to quotations and invoices.
                </p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Asela Jayawardena"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Jayawardena Healthcare Clinic"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    NIC / Business Registration (BR)
                  </label>
                  <input
                    type="text"
                    value={nicBrNumber}
                    onChange={(e) => setNicBrNumber(e.target.value)}
                    placeholder="e.g. 198520301928 / PV-94810"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 077 348 9102"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="e.g. +94773489102"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. customer@gmail.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Billing Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. No. 128, Galle Road, Colombo 03"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Colombo, Kandy, Galle, Gampaha"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  CCTV Site Installation Address (If different from Billing)
                </label>
                <input
                  type="text"
                  value={siteAddress}
                  onChange={(e) => setSiteAddress(e.target.value)}
                  placeholder="e.g. Supermarket Warehouse Floor, High Level Road"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Customer Notes & Special Technical Instructions
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Wants 8 cameras with color night vision; requires cable conduits painted white."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingCustomer ? 'Save Changes' : 'Create Customer'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Customer Profile & Complete History Modal */}
      {viewingCustomerHistory && (() => {
        const metrics = getCustomerMetrics(viewingCustomerHistory.id);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <div className="bg-[#0b1329] border border-cyan-500/40 rounded-3xl w-full max-w-3xl p-6 sm:p-8 shadow-2xl relative my-8 text-slate-100 space-y-6">
              
              <button
                onClick={() => setViewingCustomerHistory(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40">
                      {viewingCustomerHistory.customerCode}
                    </span>
                    <h2 className="text-xl font-bold font-['Outfit',sans-serif] text-white">
                      {viewingCustomerHistory.name}
                    </h2>
                  </div>
                  {viewingCustomerHistory.companyName && (
                    <p className="text-xs text-slate-300 mt-0.5">
                      {viewingCustomerHistory.companyName} {viewingCustomerHistory.nicBrNumber ? `(${viewingCustomerHistory.nicBrNumber})` : ''}
                    </p>
                  )}
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{viewingCustomerHistory.siteAddress || viewingCustomerHistory.address}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const id = viewingCustomerHistory.id;
                      setViewingCustomerHistory(null);
                      onCreateQuotationForCustomer(id);
                    }}
                    className="px-3 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>+ Quotation</span>
                  </button>
                  <button
                    onClick={() => {
                      const id = viewingCustomerHistory.id;
                      setViewingCustomerHistory(null);
                      onCreateInvoiceForCustomer(id);
                    }}
                    className="px-3 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>+ Invoice</span>
                  </button>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Total Billed</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-white">
                    {formatLKR(metrics.totalBilled)}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Total Paid</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-emerald-400">
                    {formatLKR(metrics.totalPaid)}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Outstanding Balance</div>
                  <div className={`text-base sm:text-lg font-bold font-mono ${metrics.outstandingBalance > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {formatLKR(metrics.outstandingBalance)}
                  </div>
                </div>
              </div>

              {/* Quotations History */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>Quotations History ({metrics.quotations.length})</span>
                </h3>
                {metrics.quotations.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No quotations created yet for this customer.</p>
                ) : (
                  <div className="space-y-2">
                    {metrics.quotations.map(q => (
                      <div key={q.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-mono font-bold text-cyan-300 mr-2">{q.quotationNumber}</span>
                          <span className="text-slate-400">{q.date}</span>
                          <div className="text-[11px] text-slate-300 mt-0.5">{q.items.length} CCTV hardware items + installation</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-white">{formatLKR(q.grandTotal)}</div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">{q.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Invoices History */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Receipt className="w-4 h-4" />
                  <span>Invoices & Billing History ({metrics.invoices.length})</span>
                </h3>
                {metrics.invoices.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No invoices issued yet for this customer.</p>
                ) : (
                  <div className="space-y-2">
                    {metrics.invoices.map(inv => (
                      <div key={inv.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-mono font-bold text-emerald-300 mr-2">{inv.invoiceNumber}</span>
                          <span className="text-slate-400">{inv.invoiceDate}</span>
                          <div className="text-[11px] text-slate-300 mt-0.5">Paid: {formatLKR(inv.amountPaid)} | Due: {formatLKR(inv.balanceDue)}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-white">{formatLKR(inv.grandTotal)}</div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${inv.paymentStatus === 'PAID' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'}`}>
                            {inv.paymentStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
};
