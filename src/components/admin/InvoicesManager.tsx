import React, { useState } from 'react';
import { 
  Receipt, 
  Plus, 
  Search, 
  Eye, 
  CreditCard, 
  Trash2, 
  MessageSquare, 
  Calendar, 
  Clock, 
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { Invoice } from '../../types';
import { dbStore, formatLKR } from '../../data/dbStore';

interface InvoicesManagerProps {
  onCreateNew: () => void;
  onViewInvoice: (id: string) => void;
  onRecordPayment: (invoiceId: string) => void;
}

export const InvoicesManager: React.FC<InvoicesManagerProps> = ({
  onCreateNew,
  onViewInvoice,
  onRecordPayment
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>(dbStore.getInvoices());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const refreshList = () => {
    setInvoices(dbStore.getInvoices());
  };

  const handleDelete = (id: string, number: string) => {
    if (confirm(`Are you sure you want to delete invoice ${number}?`)) {
      dbStore.deleteInvoice(id);
      refreshList();
    }
  };

  const filteredInvoices = invoices.filter((inv) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      inv.invoiceNumber.toLowerCase().includes(q) ||
      inv.customerName.toLowerCase().includes(q) ||
      (inv.customerCompany && inv.customerCompany.toLowerCase().includes(q)) ||
      inv.customerPhone.includes(q) ||
      (inv.quotationReference && inv.quotationReference.toLowerCase().includes(q));

    const matchesStatus = statusFilter === 'ALL' || inv.paymentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'PAID':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 border border-emerald-500/40 text-emerald-300">PAID</span>;
      case 'PARTIALLY PAID':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 border border-amber-500/40 text-amber-300">PARTIAL</span>;
      case 'UNPAID':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-950 border border-red-500/40 text-red-300">UNPAID</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-['Outfit',sans-serif] text-white tracking-tight flex items-center gap-2">
            <Receipt className="w-6 h-6 text-emerald-400" />
            <span>Tax Invoices & Billing Ledger</span>
          </h1>
          <p className="text-xs text-slate-400">
            Official customer bills, partial payment records, outstanding balance tracking, and PDF generation.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          id="create-new-invoice-btn"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ CREATE NEW INVOICE</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
          {[
            { id: 'ALL', label: `All (${invoices.length})` },
            { id: 'PAID', label: `Paid (${invoices.filter(i => i.paymentStatus === 'PAID').length})` },
            { id: 'PARTIALLY PAID', label: `Partial (${invoices.filter(i => i.paymentStatus === 'PARTIALLY PAID').length})` },
            { id: 'UNPAID', label: `Unpaid (${invoices.filter(i => i.paymentStatus === 'UNPAID').length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by invoice no, customer, quote ref..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            Showing {filteredInvoices.length} invoices
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <th className="p-4 font-semibold">Invoice / Date</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Total Amount</th>
                <th className="p-4 font-semibold">Paid / Balance</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                  
                  <td className="p-4">
                    <div className="font-mono font-bold text-emerald-300 text-sm">
                      {inv.invoiceNumber}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{inv.invoiceDate}</span>
                    </div>
                    {inv.quotationReference && (
                      <div className="text-[10px] text-cyan-400 font-mono">
                        Quote: {inv.quotationReference}
                      </div>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-white text-sm">
                      {inv.customerName}
                    </div>
                    {inv.customerCompany && (
                      <div className="text-[11px] text-slate-300">
                        {inv.customerCompany}
                      </div>
                    )}
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {inv.customerPhone}
                    </div>
                  </td>

                  <td className="p-4 font-mono font-bold text-white text-sm">
                    {formatLKR(inv.grandTotal)}
                  </td>

                  <td className="p-4 font-mono">
                    <div className="text-emerald-400 font-semibold">
                      Paid: {formatLKR(inv.amountPaid)}
                    </div>
                    {inv.balanceDue > 0 ? (
                      <div className="text-amber-400 font-bold text-[11px]">
                        Due: {formatLKR(inv.balanceDue)}
                      </div>
                    ) : (
                      <div className="text-emerald-500 text-[10px]">
                        Cleared In Full
                      </div>
                    )}
                  </td>

                  <td className="p-4">
                    {getPaymentBadge(inv.paymentStatus)}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      
                      {inv.balanceDue > 0 && (
                        <button
                          onClick={() => onRecordPayment(inv.id)}
                          title="Record Payment for this Invoice"
                          className="p-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-300 transition-colors cursor-pointer"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => onViewInvoice(inv.id)}
                        title="View & Print Invoice"
                        className="p-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(inv.id, inv.invoiceNumber)}
                        title="Delete Invoice"
                        className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
